export const theoryPages = [
  {
    rel: '43.2 Distributed Systems Theory/Byzantine fault tolerance/index.mdx',
    title: 'Byzantine Fault Tolerance',
    description:
      'Agreement that survives nodes which crash, lie, or send conflicting messages — the hostile-fault model behind PBFT, Tendermint, and many blockchains.',
    body: `
**Byzantine fault tolerance (BFT)** is agreement when some nodes misbehave arbitrarily: crash, equivocate, or send different votes to different peers. The name comes from the Byzantine Generals problem. Crash-fault protocols (Raft) assume a node is either correct or silent. BFT assumes a node may be an adversary.

## 1. Deep Dive and Mechanics

A correct BFT protocol guarantees **safety** (honest nodes never decide different values) if fewer than one third of nodes are Byzantine, and **liveness** under partial synchrony (timeouts eventually work). Classic PBFT uses three phases: pre-prepare, prepare, commit, plus view changes when the leader is suspected.

**Quorums.** With n = 3f + 1, any two quorums of 2f + 1 intersect in at least one honest node. That intersection is why two decisions cannot diverge.

**Cost.** Extra rounds, signatures or MACs, and O(n^2) all-to-all chatter in naive PBFT. Modern chains batch, rotate leaders, and use threshold signatures to shrink messages.

<Callout icon="info" title="Most business systems are not Byzantine">
Your own data center replicas fail by crash and bad deploys, not by secretly forking the log. Use Raft unless the participants do not trust each other.
</Callout>

## 2. Mathematical / Theoretical Foundation

Lamport, Shostak, and Pease showed that with unauthenticated messages you need more than 3f nodes to tolerate f traitors. With signatures, the bound can relax in some models, but practical state-machine BFT still uses n = 3f + 1 for the usual partial-synchrony setting.

FLP still applies: you cannot guarantee progress in a fully asynchronous network. BFT protocols add timers and view changes.

<ComparisonTable
  headers={['Model', 'Bad node does', 'Typical quorum', 'Example']}
  rows={[
    ['Crash-stop', 'Silent', 'Majority n=2f+1', 'Raft, Paxos'],
    ['Byzantine', 'Anything', '2f+1 of 3f+1', 'PBFT, Tendermint'],
    ['Authenticated crash', 'Silent or lost', 'Varies', 'Some WAN Paxos'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual: accept a value only after 2f+1 matching prepares
def can_commit(prepares, n, f):
    need = 2 * f + 1
    if n < 3 * f + 1:
        return False
    return len(prepares) >= need
TICK3

Real implementations add view-change logs, signed messages, and replay protection. Do not invent a BFT coin in an application repo.

## 4. Visualizations

TICK3mermaid
flowchart TD
    L[Leader pre-prepare] --> A[Replicas prepare]
    A --> B[Replicas commit]
    B --> D[Decide if 2f+1]
    L --> V[View change if silent]
    V --> L2[New leader]
TICK3

## 5. Interview Prep

**Q: Why 3f + 1, not 2f + 1?**
**A:** A Byzantine node can vote both ways. Majority-of-crash math is not enough. You need enough honest overlap after subtracting f liars.

**Q: Is Bitcoin BFT?**
**A:** Nakamoto consensus is a probabilistic, incentive-based protocol with a different model (eventual common prefix, energy or stake). It is not PBFT. Do not equate "blockchain" with "BFT quorum."

**Q: When do you need BFT in a company?**
**A:** Multi-party settlement, consortium ledgers, or components that must survive a compromised replica that still has keys. Internal microservice A talking to B does not need BFT.

## 6. Production Use Cases

- **Permissioned ledgers** (Fabric, Tendermint-based chains) among institutions.
- **Certificate and timestamp authorities** that vote on inclusion.
- **Hostile-WAN control planes** where a vendor node is not fully trusted.

<Callout icon="tip" title="Measure f you can actually run">
n = 4 tolerates one liar and is already chatty. n = 22 is a research ops problem. Size from trust boundaries, not from hype.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/CAP theorem/index.mdx',
    title: 'CAP Theorem',
    description:
      'During a network partition, a replicated store must choose between linearizable consistency and remaining available for both sides of the cut.',
    body: `
The **CAP theorem** (Brewer; proved by Gilbert and Lynch) says that a linearizable distributed object cannot also stay available if the network partitions. You do not pick two of three like a menu. Partitions happen. When they do, you either refuse some operations (keep consistency) or serve possibly stale or split state (keep availability).

## 1. Deep Dive and Mechanics

**C** here means linearizability: a read sees the latest committed write as if there were one copy. **A** means every request to a non-crashed node returns a response. **P** means the protocol still meets its C or A claim when messages between nodes are dropped.

**CA is not a real WAN product.** If you assume no partitions, you assumed a single reliable network. That is a rack, not a planet. Production systems are CP or AP during a partition, and they still make latency-versus-consistency choices when the network is healthy (see PACELC).

**Examples.** ZooKeeper and etcd refuse writes without a majority (CP). Dynamo-style stores accept writes on both sides and repair later (AP). Many databases let you pick per call (quorum R + W, tunable).

<Callout icon="warning" title="CAP is about a partition, not about your SLA">
A CP system can be highly available in the no-partition case. CAP does not say CP is always down. It says what you sacrifice when the cable is cut.
</Callout>

## 2. Mathematical / Theoretical Foundation

Gilbert and Lynch formalize C as atomic objects and A as termination on every request to a correct node. In an asynchronous partitioned run, a write on one side cannot be visible to a read on the other without communication. If both must return, C is lost. If you wait, A is lost.

PACELC (Abadi) adds: else, when not partitioned, you still choose latency versus consistency (sync replication versus async).

<ComparisonTable
  headers={['During partition', 'Writes', 'Reads', 'Examples']}
  rows={[
    ['CP', 'Need quorum; may fail', 'May fail or stale-forbid', 'etcd, ZooKeeper, Raft DBs'],
    ['AP', 'Accept locally', 'May be stale or conflicting', 'Dynamo, Cassandra hinted'],
    ['CA (no P)', 'Single network assumed', 'Single copy feel', 'Single-node DB'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Tunable quorum: W + R > N is a common CP-leaning read
def is_strong_quorum(n, r, w):
    return r + w > n
TICK3

If N=3, R=2, W=2, a partition that isolates one node still lets the majority proceed. A partition that splits 1 and 1 with one down loses writes. That is the CAP choice in numbers.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Cut[Network partition] --> SideA[Partition A]
    Cut --> SideB[Partition B]
    SideA --> CP[CP: refuse or wait]
    SideB --> CP
    SideA --> AP[AP: accept both sides]
    SideB --> AP
TICK3

## 5. Interview Prep

**Q: Can we have all three?**
**A:** Not for linearizability and availability during a partition. You can have eventual consistency and high availability. You can have linearizability when a majority is reachable. You cannot have both guarantees on both sides of a cut.

**Q: Is MongoDB CP or AP?**
**A:** It depends on write concern, read concern, and whether a primary is elected. Answer with the settings, not a logo.

**Q: How is this different from ACID C?**
**A:** ACID consistency is about constraints on a transaction. CAP C is linearizability of a replicated register. Different letters, different theorems.

## 6. Production Use Cases

- **Config and locks** (CP): wrong answers are worse than a brief refusal.
- **Shopping carts** (often AP): take the add-to-cart, merge later.
- **Multi-region databases** with explicit failover and RPO, which is CAP plus ops.

<Callout icon="tip" title="Say what you refuse">
"We are CP" means "writes fail if we lose quorum." Write that in the runbook so on-call does not "fix" it by forcing a minority primary.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/CRDTs (Conflict-free Replicated Data Types)/index.mdx',
    title: 'CRDTs',
    description:
      'Data types that merge concurrent replica updates with a mathematically convergent join, so AP systems can accept writes without a central lock.',
    body: `
**CRDTs** (conflict-free replicated data types) are structures whose concurrent updates always merge to the same result. Replicas can accept writes while partitioned. When they gossip state or operations, a join (or a commutative apply) converges. You give up arbitrary invariants (the last remaining seat) unless you encode them in the type.

## 1. Deep Dive and Mechanics

**State-based (CvRDT).** Each replica stores a payload that is a join-semilattice. Merge is least-upper-bound: max of clocks, union of sets, etc. Merge is associative, commutative, and idempotent — gossip can be sloppy.

**Op-based (CmRDT).** Replicas ship operations that must be delivered reliably and, for some types, without duplication. Ops commute by construction.

**Useful types.** G-Counter (grow-only). PN-Counter (plus and minus via two G-Counters). G-Set and 2P-Set. OR-Set (add-wins with unique tags). LWW-Register (timestamp, needs careful clocks). RGA / WOOT for text.

<Callout icon="warning" title="Convergence is not your business rule">
Two replicas can both sell the last item if the type is a counter. A CRDT converges to "sold twice." Inventory still needs reservations or a CP path.
</Callout>

## 2. Mathematical / Theoretical Foundation

A state CRDT is a join-semilattice: partial order and a least upper bound for every pair. Idempotent commutative monoids (Shapiro et al.) classify the op side. Causal delivery can be required for some op-based types; state-based merges are tolerant of reorder and replay.

Tombstones and unique ids are how deletes stay safe. Without them, a late add can resurrect a removed element (the classic set bug).

<ComparisonTable
  headers={['Type', 'Merge idea', 'Deletes', 'Fit']}
  rows={[
    ['G-Counter', 'Per-replica max then sum', 'No', 'Impressions'],
    ['OR-Set', 'Tagged adds, remove tags', 'Yes', 'Tags, ACLs'],
    ['LWW-Register', 'Highest timestamp wins', 'Overwrite', 'Profile fields'],
    ['RGA', 'Position ids', 'Tombstones', 'Collaborative text'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# G-Counter: each replica only increments its own slot
class GCounter:
    def __init__(self, replica, slots=None):
        self.replica = replica
        self.slots = dict(slots or {})

    def inc(self):
        self.slots[self.replica] = self.slots.get(self.replica, 0) + 1

    def merge(self, other):
        keys = set(self.slots) | set(other.slots)
        self.slots = {k: max(self.slots.get(k, 0), other.slots.get(k, 0)) for k in keys}

    def value(self):
        return sum(self.slots.values())
TICK3

In application code, use a library (Automerge, Yjs, Redis CRDTs) rather than a hand-rolled set.

## 4. Visualizations

TICK3mermaid
flowchart LR
    A[Replica A +1] --> M[Merge max per slot]
    B[Replica B +1] --> M
    M --> V[Value 2 everywhere]
TICK3

## 5. Interview Prep

**Q: CRDT versus operational transform?**
**A:** OT transforms incoming ops against concurrent ops (Google Docs history). CRDTs converge by type laws and are easier to reason about offline. Both can edit text; the engineering cultures differ.

**Q: Do CRDTs need vector clocks?**
**A:** Many use dots or version vectors to identify ops. You need enough causal metadata to not drop a concurrent add. A wall clock LWW is a CRDT only if you accept clock-skew losers.

**Q: When not to use one?**
**A:** Unique inventory, money movement, or any invariant that is not preserved by the join. Also huge tombstone growth if you delete a lot.

## 6. Production Use Cases

- **Collaborative editors** (Yjs, Automerge) in the browser.
- **Edge counters and presence** in AP stores (Riak, Redis CRDT types).
- **Shopping-cart sets** that merge on reconnect, with a CP checkout at the end.

<Callout icon="tip" title="Pick the type from the invariant">
If add-wins is wrong, an OR-Set will make you sad. Write the conflict example on the whiteboard before you pick a library.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Consensus algorithms/index.mdx',
    title: 'Consensus Algorithms',
    description:
      'Protocols that make a set of machines agree on one value or log despite crashes, forming the core of etcd, ZooKeeper, and Raft-based databases.',
    body: `
**Consensus** is the problem of getting processes to decide the same value, with at most one decision, and with a valid value proposed by someone. Replicated state machines implement consensus on a **log**: first agree the next entry, then apply it. Paxos, Raft, Zab, and Viewstamped Replication are the industrial family for crash faults.

## 1. Deep Dive and Mechanics

A round has proposals, votes, and a commit rule that uses a **majority**. Because any two majorities intersect, two different values cannot both commit. Leaders (Raft) or ballots (Paxos) serialize proposals so the common case is one round-trip from the leader to a majority.

**Logs.** Agreement is not one register; it is a sequence. Snapshots truncate the prefix. Membership changes are themselves log entries (joint consensus in Raft) so the set of voters does not split-brain.

**What consensus is not.** Gossip. Primary-backup without quorum. A load balancer. Those can look "agreed" until a partition.

<Callout icon="info" title="Majority is a liveness tax">
If you need 2 of 3, one node can be down. If two are down, you cannot commit. You bought safety with that refusal.
</Callout>

## 2. Mathematical / Theoretical Foundation

Safety: agreement and validity. Liveness: eventually decide, under partial synchrony and a bound on faults f with n >= 2f + 1 for crash-stop. FLP: no deterministic algorithm guarantees termination in a fully async model with one crash. Timeouts are not a hack; they are the model.

Paxos is a single-decree core plus Multi-Paxos for a log. Raft specifies leader election, log repair, and snapshotting as one comprehensible package.

<ComparisonTable
  headers={['Protocol', 'Faults', 'Leader', 'Where you meet it']}
  rows={[
    ['Multi-Paxos', 'Crash', 'Stable proposer', 'Chubby, Spanner lineage'],
    ['Raft', 'Crash', 'Strong leader', 'etcd, Consul, Cockroach'],
    ['Zab', 'Crash', 'Primary', 'ZooKeeper'],
    ['PBFT', 'Byzantine', 'Primary + views', 'Permissioned chains'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def majority(n):
    return n // 2 + 1

def can_commit(acks, n):
    return len(acks) >= majority(n)
TICK3

Production code is the log, the term checks, and the disk. Use etcd or the Raft library in your database; do not ship a weekend consensus for money.

## 4. Visualizations

TICK3mermaid
flowchart TD
    C[Client write] --> L[Leader]
    L --> Q[Append to majority]
    Q --> Commit[Commit index advances]
    Commit --> Apply[Apply to state machine]
    Apply --> C
TICK3

## 5. Interview Prep

**Q: Consensus versus replication?**
**A:** Replication copies bytes. Consensus decides a single order of those bytes under faults. Async replicas replicate without consensus and can diverge on failover.

**Q: Why is Raft more popular in new systems?**
**A:** Same safety goals as Multi-Paxos, with a more complete spec (elections, log repair, membership) that engineers can implement and test. Not because Paxos is wrong.

**Q: Can you consensus across regions?**
**A:** Yes, at the cost of a WAN RTT on the commit path. That is a product choice (Spanner-style) versus async DR.

## 6. Production Use Cases

- **Coordination services** (locks, config, leader keys).
- **Database commit logs** for linearizable SQL.
- **Service discovery** that must not flap on a split.

<Callout icon="tip" title="Test partition plus old leader">
The exam question is a paused leader that wakes. If your suite never does that, you have a happy-path log, not consensus.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Distributed computing/index.mdx',
    title: 'Distributed Computing',
    description:
      'Computation across multiple machines that do not share memory, so every design must account for partial failure, latency, and no global clock.',
    body: `
**Distributed computing** is work split across machines that communicate by messages. There is no shared RAM, no common clock, and no atomic view of "the system." The fallacies of distributed computing (reliable network, zero latency, one admin) are still how outages start.

## 1. Deep Dive and Mechanics

You distribute to get **capacity**, **locality**, or **isolation**. The tax is partial failure: one node, one link, or one disk fails while the rest keep going. Callers must timeout. State must be replicated or accepted lost. Clocks cannot order events by themselves (see Lamport and true time).

**Models.** Synchronous (known delay bounds — rare). Asynchronous (no bounds — FLP bites). Partial synchrony (bounds eventually hold — what Raft assumes). Shared-memory versus message-passing; real networks are message-passing with a lot of caching on top.

**Layers.** HPC (MPI, tight clusters), data processing (MapReduce, Spark), and service-oriented request/response are all distributed computing with different failure and latency budgets.

<Callout icon="info" title="A remote call is not a function call">
It can return once, twice, or never, and the callee may have done the work. Idempotency and timeouts are part of the type signature.
</Callout>

## 2. Mathematical / Theoretical Foundation

Complexity is often counted in rounds and bits, not RAM. Lower bounds (set agreement, FLP, CAP) tell you what you cannot have. Happens-before (Lamport) is the causal order you actually get from messages.

Amdahl and USL still apply: serial work and coherency traffic cap speedup. Distribution that adds more chatter than parallelism makes programs slower.

<ComparisonTable
  headers={['Style', 'Coupling', 'Failure unit', 'Example']}
  rows={[
    ['Shared-memory threads', 'Tight', 'Process', 'One VM'],
    ['RPC microservices', 'Request', 'Service / instance', 'HTTP, gRPC'],
    ['Dataflow / batch', 'Dataset', 'Task / executor', 'Spark, MapReduce'],
    ['Actor / message', 'Mailbox', 'Actor', 'Erlang, Akka'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Partial failure: never wait forever
import socket

def rpc_call(host, payload, timeout_s=0.2):
    sock = socket.create_connection((host, 443), timeout=timeout_s)
    sock.settimeout(timeout_s)
    sock.sendall(payload)
    return sock.recv(4096)
TICK3

Wrap with retries only when idempotent. Treat "no response" as unknown, not as "callee did nothing."

## 4. Visualizations

TICK3mermaid
flowchart LR
    C[Client] --> N1[Node 1]
    C --> N2[Node 2]
    N1 <-->|messages| N2
    N1 --> F[Partial failure]
    N2 --> F
TICK3

## 5. Interview Prep

**Q: Why not one bigger computer?**
**A:** Fault isolation, data gravity, and a ceiling on one box. Distribution is not a fashion; it is what remains after vertical scale and a single failure domain fail the SLO.

**Q: What is the first principle?**
**A:** Assume messages drop, reorder, and delay, and that the other side may have crashed after doing the work. Design APIs for that world.

**Q: Shared-nothing versus shared-disk?**
**A:** Shared-nothing partitions state and scales out. Shared-disk (or a SAN) centralizes consistency and the failure domain. Cloud object stores are a modern shared disk with different SLOs.

## 6. Production Use Cases

- **Internet services** split by stateless compute and sharded data.
- **Analytics clusters** that ship compute to data.
- **Edge plus cloud** splits for latency and sovereignty.

<Callout icon="tip" title="Name the failure you ignore">
Every design ignores some faults (Byzantine, solar flare). Write them down so a later team does not assume you handled them.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Distributed transactions/index.mdx',
    title: 'Distributed Transactions',
    description:
      'Atomic updates across more than one shard or store, via 2PC, 3PC, or sagas — each with a different failure and locking cost.',
    body: `
A **distributed transaction** makes several resource managers commit or abort together. The user wants "card charged and order created, or neither." Across processes, that is a protocol, not a BEGIN on one Postgres. The protocol you pick decides who blocks, what you lose on crash, and how long locks live.

## 1. Deep Dive and Mechanics

**Two-phase commit.** A coordinator asks participants to prepare (vote yes and persist). If all yes, it commits; else abort. Participants that voted yes must wait for the decision — they are **uncertain** if the coordinator dies after prepare. Recovery requires the coordinator log or a human.

**Three-phase commit** adds a pre-commit to reduce some blocking in a synchronous model; it is uncommon in the wild and still unhappy under partitions.

**Sagas.** A sequence of local transactions with compensations (undo). No global lock. You get eventual consistency and must make compensations real (refund, not "delete the charge if we remember").

**Percolator / MVCC + locks** and Spanner-style TrueTime are how some global SQL layers implement serializable distributed txn without a naive 2PC on the hot path.

<Callout icon="warning" title="2PC holds locks while the network thinks">
A slow or dead coordinator extends row locks across services. That is how a payment outage becomes a warehouse outage.
</Callout>

## 2. Mathematical / Theoretical Foundation

Atomic commit is consensus-adjacent: all honest participants decide the same commit/abort. Blocking 2PC is not partition-tolerant in the CAP sense: a participant cannot safely decide alone after a yes vote.

Sagas trade atomicity for isolation. Intermediate states are visible. Isolation anomalies are a product concern.

<ComparisonTable
  headers={['Approach', 'Atomic', 'Isolation', 'Failure mode']}
  rows={[
    ['Local ACID', 'Yes one store', 'Strong', 'One node'],
    ['2PC', 'Yes', 'Locks across', 'Coordinator block'],
    ['Saga', 'Eventual', 'Weak / app', 'Compensations'],
    ['Global SQL (Spanner)', 'Yes', 'Serializable*', 'WAN latency'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def saga_place_order(order, pay, reserve):
    oid = order.create()
    try:
        pay.charge(oid)
        reserve.stock(oid)
    except Exception:
        pay.refund(oid)
        order.mark_failed(oid)
        raise
TICK3

charge and refund must be idempotent. stock should fail if inventory is gone; do not compensate by pretending you never charged if refund can fail.

## 4. Visualizations

TICK3mermaid
flowchart TD
    C[Coordinator] --> P1[Prepare RM1]
    C --> P2[Prepare RM2]
    P1 --> D{All yes}
    P2 --> D
    D -->|yes| Commit[Commit both]
    D -->|no| Abort[Abort both]
TICK3

## 5. Interview Prep

**Q: Why not 2PC everywhere?**
**A:** Latency, lock time, and a coordinator as a single point of blocking. Fine inside one data-center DB cluster; painful as a web of microservices.

**Q: Are sagas transactions?**
**A:** They are a workflow with undo. They do not give ACID isolation. Say that clearly.

**Q: Outbox pattern?**
**A:** Write the business row and an event in one local transaction, then publish. That is how you avoid 2PC between DB and broker. Downstream still needs idempotency.

## 6. Production Use Cases

- **XA 2PC** between a DB and a legacy JMS broker inside one app server.
- **Order sagas** across payment, inventory, and shipping services.
- **Spanner / Cockroach** multi-shard SQL for products that need global serializability and can pay the RTT.

<Callout icon="tip" title="Keep the happy path on one shard">
If the shard key puts order and payment line on one node, you may not need a distributed txn at all.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Eventual consistency/index.mdx',
    title: 'Eventual Consistency',
    description:
      'A liveness promise that replicas converge if writes stop — not a bound on how stale a given read is unless you add extra session guarantees.',
    body: `
**Eventual consistency** says that if no new writes arrive, all replicas eventually agree. It does not say when. It does not say a read after a write on another socket will see that write. It is a convergence property, popular in AP stores, DNS, and caches. Treat "eventual" as incomplete until you add a bound or a session model.

## 1. Deep Dive and Mechanics

Replicas apply writes in different orders or at different times. Anti-entropy (repair, gossip, Merkle trees) and read repair close the gaps. Conflicts use LWW, vector clocks, CRDTs, or application merge.

**Session guarantees** (Terry et al.) make eventual usable: read-your-writes, monotonic reads, monotonic writes, writes-follow-reads. You get them with sticky routing, version tokens, or causal metadata — not from the word "eventual" alone.

**How stale.** Measure replication lag and repair age. If you cannot graph it, you cannot sell it as an SLO.

<Callout icon="warning" title="Eventual plus a user refresh loop is a bug">
A client that writes and immediately reads another replica will flap or retry forever. Pin the session or wait for a version.
</Callout>

## 2. Mathematical / Theoretical Foundation

Convergence requires that concurrent updates are somehow joinable (CRDT, LWW, or human). Without a join, "eventual" can be "eventual split brain."

CAP: eventual is the usual AP story during partition. PACELC: even without partition you may choose stale reads for latency (async replicas).

<ComparisonTable
  headers={['Guarantee', 'Stale read', 'Extra machinery']}
  rows={[
    ['Eventual only', 'Yes, unbounded', 'Repair'],
    ['Bounded staleness', 'Up to T or versions', 'Sync or watermarks'],
    ['Read-your-writes', 'Not for that client', 'Sticky or token'],
    ['Linearizable', 'No', 'Quorum / lease'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def read_profile(replicas, user_id, seen_ver=0):
    row = replicas.any().get(user_id)
    if row.ver < seen_ver:
        row = replicas.primary().get(user_id)
    return row
TICK3

Store seen_ver in the session. This is not linearizability across devices; it is read-your-writes for one client.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant W as Writer
    participant A as Replica A
    participant B as Replica B
    W->>A: write v2
    W->>B: read may see v1
    A->>B: anti-entropy
    W->>B: later read v2
TICK3

## 5. Interview Prep

**Q: Is eventual consistency bad?**
**A:** It is wrong for ledgers and right for view counts, DNS, and many caches. The mistake is using it silently on a workflow that the user thinks is strong.

**Q: How does Dynamo resolve conflicts?**
**A:** Vector clocks detect concurrent versions; the application or LWW merges. Sibling values are a feature until they surprise a product manager.

**Q: Eventual versus causal?**
**A:** Causal does not show you a reply before the message it replies to. Eventual might, briefly. Causal is stronger and costs metadata.

## 6. Production Use Cases

- **CDN and DNS** records with TTL-bound staleness.
- **Social counters and feeds** with repair.
- **Multi-region caches** that accept a few seconds of lag.

<Callout icon="tip" title="Put a number on eventual">
"Typically under 2 s, 99th under 30 s, repair job hourly" is a design. The adjective alone is not.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Gossip protocols/index.mdx',
    title: 'Gossip Protocols',
    description:
      'Epidemic information spread where each node periodically exchanges state with random peers until the cluster converges, used for membership and anti-entropy.',
    body: `
**Gossip** (epidemic protocol) spreads information the way a rumor does: each node periodically talks to a random peer and they merge what they know. There is no leader and no full mesh of constant heartbeats. Membership, failure detection, and anti-entropy in Dynamo-style stores all lean on gossip.

## 1. Deep Dive and Mechanics

**Push, pull, and push-pull.** Push sends what I know. Pull asks for what you know. Push-pull converges faster and is common. Payloads are digests (hashes, Merkle roots, version vectors) so you do not ship the whole database every round.

**Membership.** SWIM-style gossip carries membership plus a suspicion mechanism: ping, ping-req via a third party, then declare dead. That reduces false death versus a single missed heartbeat.

**Load.** Each node sends O(1) or O(log n) messages per period. Infection time is logarithmic in cluster size with high probability under uniform peer choice.

<Callout icon="info" title="Gossip is eventual">
A just-joined node is unknown until rumor reaches you. Design so a slightly stale membership map is safe (or wait for a stronger source of truth).
</Callout>

## 2. Mathematical / Theoretical Foundation

Epidemic models: if each infected node contacts a random peer, the fraction infected follows a logistic-like curve; time to infect all is O(log n) rounds with high probability. Bandwidth per node stays flat if message size is bounded (hence digests and compaction).

False-positive failure detection is a trade of timeout versus detection speed. Overlay bias (only gossip to nearby racks) can partition the rumor unless you add a few long-distance links.

<ComparisonTable
  headers={['Style', 'Messages per node', 'Convergence', 'Use']}
  rows={[
    ['Full mesh heartbeat', 'O(n)', 'Fast, expensive', 'Tiny clusters'],
    ['Gossip membership', 'O(1) to O(log n)', 'O(log n) rounds', 'Cassandra, Consul'],
    ['Central registry', 'O(1) to registry', 'Registry RTT', 'Classic SD'],
    ['Merkle anti-entropy', 'O(log keys) on diff', 'Repair-driven', 'Riak, Cassandra'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import random

def gossip_round(self, peers):
    other = random.choice(peers)
    mine = self.digest()
    theirs = other.exchange(mine)
    self.merge(theirs)
TICK3

Bound digest size. If merge is not idempotent and commutative, gossip will not converge; you have a heisenbug cluster.

## 4. Visualizations

TICK3mermaid
flowchart TD
    N1[Node 1 rumor] --> N3[Node 3]
    N1 --> N7[Node 7]
    N3 --> N4[Node 4]
    N7 --> N2[Node 2]
    N4 --> N8[Node 8]
TICK3

## 5. Interview Prep

**Q: Gossip versus Raft for membership?**
**A:** Raft is strong and limited in size. Gossip scales membership and accepts brief disagreement. Many systems gossip for liveliness and use Raft for a small config that must be true.

**Q: Why random peers, not a tree?**
**A:** Trees have bottlenecks and break on failure. Random (or random plus a few structured edges) is robust. Trees appear inside a single repair, not as the only path.

**Q: Can gossip replace a load balancer health check?**
**A:** It can feed a suspicion list. Clients still need a rule for "too new" and "recently dead" to avoid flapping.

## 6. Production Use Cases

- **Cassandra / Riak** membership and repair.
- **SWIM** in Nomad, Serf, and parts of Consul.
- **Telemetry fan-out** of non-critical state (feature seeds, peer lists).

<Callout icon="tip" title="Cap rumor size">
A gossip payload that grows with the whole dataset will melt the network. Gossip metadata; repair bulk data out of band.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Lamport clocks/index.mdx',
    title: 'Lamport Clocks',
    description:
      'A scalar logical clock that captures happens-before: increment on each event and take max plus one on receive, so causality is never reversed.',
    body: `
A **Lamport clock** is a counter each process keeps. You increment on every local event. When you send a message, you attach the counter. When you receive, you set clock = max(local, received) + 1. If event a happens-before event b, then C(a) is less than C(b). The converse is false: smaller counters do not prove causality.

## 1. Deep Dive and Mechanics

Happens-before (Lamport 1978) is the transitive closure of program order and message send/receive. Logical clocks track that relation without synchronized wall clocks.

**What they cannot do.** Concurrent events can get any two numbers; the smaller one is not "earlier in real time." Two writes with C=5 and C=7 might be concurrent if they never talked. Last-write-wins on a Lamport clock will invent an order and can drop a concurrent write silently.

**Vector clocks** add one slot per process so you can detect concurrency (incomparable vectors) instead of forcing a total order.

<Callout icon="info" title="Wall clocks lie in a different way">
NTP skew of tens of milliseconds is enough to reorder two writes. Lamport clocks refuse to use those timestamps for causality. They still do not give you real-time linearizability.
</Callout>

## 2. Mathematical / Theoretical Foundation

Clock condition: a -> b implies C(a) < C(b). This is a homomorphism from the happens-before poset into the integers. It is not an isomorphism: many incomparable pairs get comparable integers.

Total-order broadcast can be built by ordering (timestamp, process-id) pairs and delaying delivery until no earlier stamp can arrive — that needs extra buffering and is not free.

<ComparisonTable
  headers={['Clock', 'Detects causality', 'Detects concurrent', 'Cost']}
  rows={[
    ['Wall / NTP', 'No', 'No', 'Skew'],
    ['Lamport scalar', 'One way', 'No', 'One integer'],
    ['Vector clock', 'Yes', 'Yes', 'O(n) metadata'],
    ['TrueTime / Hybrid', 'Approx real time', 'Bounded', 'Special infra'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
class Lamport:
    def __init__(self):
        self.t = 0

    def on_local(self):
        self.t += 1
        return self.t

    def send(self):
        self.t += 1
        return self.t

    def receive(self, other_t):
        self.t = max(self.t, other_t) + 1
        return self.t
TICK3

Attach t to every message. Do not sort user-visible history by t alone if concurrent edits must both appear.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Process P
    participant Q as Process Q
    P->>P: local t=1
    P->>Q: send t=2
    Q->>Q: receive max(0,2)+1 = 3
    Q->>P: send t=4
    P->>P: receive max(2,4)+1 = 5
TICK3

## 5. Interview Prep

**Q: If C(a) is less than C(b), did a happen before b?**
**A:** Not necessarily. Only the converse is guaranteed. This is the most common trap.

**Q: Why not just use timestamps?**
**A:** Without a bound on skew (TrueTime), a later real-time event can carry an earlier wall clock. Lamport at least never reverses a message chain.

**Q: When do you upgrade to vectors?**
**A:** When you must detect concurrent updates (siblings in a store) instead of picking a winner. Metadata grows with the number of writers unless you compact.

## 6. Production Use Cases

- **Debug traces** that order logs along causal chains.
- **Lightweight version tags** when you only need a total order and accept arbitrary concurrent ties.
- **Teaching and interviews** as the base before vector clocks and CRDTs.

<Callout icon="tip" title="Name concurrent events in the design">
If two cashiers can update the same SKU without talking, a scalar clock will hide that. Draw the pair before you pick LWW.
</Callout>
`,
  },
]
