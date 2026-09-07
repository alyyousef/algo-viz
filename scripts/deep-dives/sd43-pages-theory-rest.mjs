export const theoryRestPages = [
  {
    rel: '43.2 Distributed Systems Theory/PACELC theorem/index.mdx',
    title: 'PACELC Theorem',
    description:
      'If partitioned, choose availability or consistency. Else, when the network is healthy, still choose latency or consistency on every write path.',
    body: `
**PACELC** (Abadi) extends CAP. If there is a Partition, choose Availability or Consistency. Else, even when every replica can talk, choose Latency or Consistency. CAP only talks about the cut. Most of the day there is no cut, and you still pay for sync replication or you serve stale reads.

## 1. Deep Dive and Mechanics

**PA/EL.** During a partition, stay up and accept divergent writes. In the healthy case, acknowledge before all replicas catch up. Dynamo-style stores and default Cassandra sit here.

**PC/EC.** During a partition, refuse writes without a quorum. In the healthy case, wait for a sync majority before success. etcd, ZooKeeper, and Spanner-style systems sit here.

**Mixed knobs.** Many products are not one letter pair. DynamoDB lets you pick consistent reads. MongoDB can be PC/EC with majority write concern or PA/EL with w=1. The useful interview move is to name the default and the override.

<Callout icon="info" title="CAP is the outage; PACELC is the Tuesday">
A CP database can still be fast when the network is fine if it only waits for a nearby quorum. PACELC is about that wait, not about whether the product is down forever.
</Callout>

## 2. Mathematical / Theoretical Foundation

CAP: in an asynchronous partitioned run, a linearizable object cannot also terminate every request at every correct node. PACELC adds the no-partition case: the write's critical path either includes remote acknowledgments (consistency, higher latency) or does not (latency, weaker visibility).

Round-trip cost is the model. Sync replication latency is at least the RTT to the farthest replica you wait for. Async replication latency is local disk plus a later catch-up risk.

<ComparisonTable
  headers={['Class', 'If partitioned', 'Else (healthy)', 'Typical product']}
  rows={[
    ['PA/EL', 'Serve both sides', 'Async / local ack', 'Cassandra default, Dynamo'],
    ['PC/EC', 'Refuse minority writes', 'Sync quorum', 'etcd, Cockroach, Spanner'],
    ['PA/EC', 'Available, then sync later', 'Rare combo', 'Unusual; name it if you claim it'],
    ['PC/EL', 'Refuse, but async when up', 'Odd default', 'Usually a misconfig'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def classify(partition_pref, healthy_pref):
    # partition_pref: "A" or "C"
    # healthy_pref: "L" or "C"
    return f"P{partition_pref}/E{healthy_pref}"

assert classify("A", "L") == "PA/EL"
assert classify("C", "C") == "PC/EC"
TICK3

Map each API call: write concern, read concern, and whether the client retries on timeout. Timeouts are how PACELC shows up in SLOs.

## 4. Visualizations

TICK3mermaid
flowchart TD
    P{Partition?}
    P -->|yes| AC{Keep A or C?}
    P -->|no / Else| LC{Keep L or C?}
    AC -->|A| Split[Accept both sides]
    AC -->|C| Quorum[Need majority]
    LC -->|L| Async[Ack before replicas]
    LC -->|C| Sync[Wait for replicas]
TICK3

## 5. Interview Prep

**Q: Does PACELC replace CAP?**
**A:** No. CAP is the partition impossibility. PACELC names the everyday latency-versus-consistency choice that CAP does not mention.

**Q: Is DynamoDB PA/EL?**
**A:** Default reads can be eventually consistent and writes ack after a small replica set. Strongly consistent reads move a call toward C at extra latency. Say "tunable," then name the default.

**Q: Can a CP system still choose L when healthy?**
**A:** If it only waits for a local majority and async-replicates elsewhere, healthy-path latency can stay low while partition behavior stays CP. That is PC/EL-ish; be precise per region.

## 6. Production Use Cases

- **Checkout and ledgers** usually want PC/EC on the money path.
- **Feed counters and presence** often accept PA/EL.
- **Multi-region SQL** products advertise the PACELC pair in the docs; read that page before you promise RPO zero.

<Callout icon="tip" title="Write the pair on the whiteboard">
Interviewers want PA/EL versus PC/EC, one product each, and one sentence on what the user sees when a replica is slow.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Partition tolerance/index.mdx',
    title: 'Partition Tolerance',
    description:
      'The system keeps its consistency or availability claim when messages between replicas are delayed or dropped — not a feature you can turn off on a WAN.',
    body: `
**Partition tolerance** means the protocol's guarantees still hold when the network drops or delays messages between nodes. CAP's P is not optional on a real WAN. You do not "choose not to be partition tolerant." You choose what to sacrifice when a partition happens.

## 1. Deep Dive and Mechanics

A **partition** is a cut in the communication graph: A cannot reach B for long enough that timeouts fire. Causes include switch failure, BGP, overloaded NICs, and GC pauses that look like silence.

**What P does not mean.** It does not mean "the app stays up." A CP system is partition tolerant and will refuse writes on the minority side. That is still P.

**False partitions.** Slow disks and stop-the-world GC make a node look dead. Fencing and leader leases exist so two leaders do not both accept writes during a false cut.

<Callout icon="warning" title="The network is not a light switch">
Most partitions are partial: some packets get through, some are delayed 2 seconds. Protocols that assume clean fail-stop will double-process or split-brain unless they use quorums and fencing.
</Callout>

## 2. Mathematical / Theoretical Foundation

In the asynchronous model there is no bound on message delay, so a crashed node and a slow node are indistinguishable. FLP says consensus cannot be both safe and always live in that model. Partial synchrony (GST after which delays are bounded) is how Raft and Paxos recover liveness.

A partition of duration T with sync replication of RTT r stalls the minority (or both sides) for about T. Async replication instead accumulates a lag of roughly the unsent log.

<ComparisonTable
  headers={['View', 'Meaning of P', 'What you drop']}
  rows={[
    ['CAP formal', 'Spec holds under message loss', 'C or A'],
    ['Ops slang', 'We keep serving', 'Often C, silently'],
    ['CP product', 'Minority refuses writes', 'Availability on that side'],
    ['AP product', 'Both sides accept', 'One-copy consistency'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def side_can_write(have_quorum, prefer_consistency):
    if have_quorum:
        return True
    return not prefer_consistency
TICK3

Health checks must use the same quorum the write path uses. A load balancer that marks a minority primary "healthy" will send traffic into a fence.

## 4. Visualizations

TICK3mermaid
flowchart LR
    subgraph Left[AZ-a]
      A[Replica A]
    end
    subgraph Right[AZ-b]
      B[Replica B]
    end
    A x-- dropped --x B
    Client --> A
    Client --> B
TICK3

## 5. Interview Prep

**Q: Can I pick CA and skip P?**
**A:** Only if you assume the network never fails. That is a single rack with one switch, not a multi-AZ service. On a WAN, CA is a fiction.

**Q: Is a partition the same as a node crash?**
**A:** A crash is silence from one node. A partition can leave two live groups that cannot talk. Split-brain is the partition problem.

**Q: How do you detect a partition?**
**A:** You do not detect it perfectly. You use heartbeats, leases, and quorums, then fence the old leader. Detection is a timeout, not a proof.

## 6. Production Use Cases

- **Multi-AZ databases** that lose the inter-AZ link and must pick quorum or dual-write.
- **Mobile clients** that are partitioned from the API for hours and need CRDTs or queues.
- **Service meshes** that shed or fail closed when a dependency's region disappears.

<Callout icon="tip" title="Draw the cut first">
Before naming CAP letters, draw which clients can still reach which replicas. The letters follow the picture.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Paxos/index.mdx',
    title: 'Paxos',
    description:
      'Lamport consensus: proposers compete with rising ballots, acceptors promise and accept, and a majority intersection makes the chosen value unique.',
    body: `
**Paxos** (Lamport) is the classic crash-fault consensus protocol. A value is chosen when a majority of acceptors accept it under the same ballot. Any two majorities intersect, so two different values cannot both be chosen. Multi-Paxos runs the same idea for a log of slots.

## 1. Deep Dive and Mechanics

**Roles.** Proposers try to get a value chosen. Acceptors remember the highest promise and the highest accepted proposal. Learners hear the outcome. One node can play every role.

**Phase 1 (prepare).** Proposer picks ballot n higher than any it has seen, asks acceptors to promise not to accept below n. Each reply includes any value already accepted.

**Phase 2 (accept).** If a majority promised, the proposer must propose the value from the highest-numbered prior accept (or its own value if none). Acceptors accept if they have not promised a higher ballot.

**Why it is hard.** Duelling proposers can livelock. Real systems elect a stable leader (Multi-Paxos) so phase 1 is rare. Chubby, Spanner's Paxos groups, and early Megastore are in this family.

<Callout icon="info" title="Paxos chooses a value; it does not store your table">
Consensus is one replicated log. Your SQL, lock, or config sits on top. Do not "run Paxos" on every user write without a log and a state machine.
</Callout>

## 2. Mathematical / Theoretical Foundation

Safety: if proposal (n, v) is chosen, every higher-numbered chosen proposal has value v. Proof is by majority intersection plus the rule that phase 2 must reuse the highest accepted value from phase 1.

Liveness: not guaranteed in a fully asynchronous network (FLP). With a single live leader and eventual timely messages, progress resumes.

<ComparisonTable
  headers={['Flavor', 'What it adds', 'Where you see it']}
  rows={[
    ['Single-decree', 'One value', 'Proofs, teaching'],
    ['Multi-Paxos', 'Stable leader, log slots', 'Chubby, Spanner groups'],
    ['Cheap Paxos', 'F+1 acceptors + extras', 'WAN cost cuts'],
    ['Raft', 'Same quorum idea, more ops-friendly', 'etcd, Consul'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def can_accept(promise_n, accept_n, incoming_n):
    return incoming_n >= promise_n and incoming_n >= accept_n
TICK3

Production code is about persistence: promise and accept records must hit stable storage before you reply, or a crash can accept two values.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Proposer
    participant A as Acceptor majority
    P->>A: prepare n
    A-->>P: promise plus prior value
    P->>A: accept n, v
    A-->>P: accepted
TICK3

## 5. Interview Prep

**Q: Why a majority?**
**A:** Any two majorities share a node. That node carries the previously chosen value into the next prepare, so the value cannot flip.

**Q: Paxos versus Raft?**
**A:** Same quorum intersection idea. Raft specifies leader election, log roles, and membership changes in one package. Paxos is a family; Multi-Paxos is the production form.

**Q: What is a ballot number?**
**A:** A totally ordered proposal id, usually (counter, proposer-id). Higher ballots preempt lower ones so a new leader can finish an incomplete round.

## 6. Production Use Cases

- **Google Chubby / Spanner** Paxos groups for locks and tablets.
- **Azure and AWS** internal control planes (variants).
- **Teaching the proof** before you operate Raft in prod.

<Callout icon="tip" title="Name Multi-Paxos in interviews">
Single-decree Paxos is the proof. The product is a leader driving a log. Say both.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Raft/index.mdx',
    title: 'Raft',
    description:
      'Consensus via an elected leader, a replicated log, and majority votes — designed so operators can follow elections, terms, and commits.',
    body: `
**Raft** (Ongaro and Ousterhout) is crash-fault consensus with a strong leader. Clients talk to the leader. The leader appends to its log and commits an entry when a majority of voting members have stored it. Terms increase on each election so stale leaders cannot overwrite committed data.

## 1. Deep Dive and Mechanics

**States.** Follower, candidate, leader. Followers grant votes and accept appends. A follower that times out becomes a candidate and starts an election for term T+1.

**Election.** A candidate wins with a majority of votes. A node votes at most once per term, and only if the candidate's log is at least as up to date (higher last term, or same term and longer or equal index).

**Replication.** The leader sends AppendEntries with previous index and term. If they do not match, the follower rejects and the leader walks back. Commit index is the highest entry known to be on a majority in the current term.

**Membership.** Joint consensus (old and new configs) avoids a two-majority split during add/remove.

<Callout icon="warning" title="A lone leader is not committed">
An entry on the leader disk is not committed. If that leader dies before a majority stores it, the next leader may not have it. Clients must retry with idempotency.
</Callout>

## 2. Mathematical / Theoretical Foundation

Safety: at most one leader per term; committed entries in term t persist in all later leaders' logs (Leader Completeness). Election restriction plus majority votes give the proof.

Liveness: under partial synchrony and randomized timeouts, a leader is elected with high probability. Split votes resolve when timeouts differ.

<ComparisonTable
  headers={['Piece', 'Raft rule', 'Why']}
  rows={[
    ['Term', 'Monotonic epoch', 'Fence old leaders'],
    ['Majority', 'Votes and commits', 'Intersection'],
    ['Log match', 'Prev index plus term', 'No holes, no forks of committed prefix'],
    ['Up-to-date vote', 'Last term then length', 'New leader has all commits'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def log_ok(cand_last_term, cand_last_idx, my_last_term, my_last_idx):
    if cand_last_term != my_last_term:
        return cand_last_term > my_last_term
    return cand_last_idx >= my_last_idx
TICK3

etcd, Consul, CockroachDB ranges, and RethinkDB use Raft. Keep the voting set small (3 or 5). Learners can receive the log without voting.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> Follower
    Follower --> Candidate: election timeout
    Candidate --> Leader: majority votes
    Candidate --> Follower: higher term seen
    Leader --> Follower: higher term seen
TICK3

## 5. Interview Prep

**Q: Why odd replica counts?**
**A:** 3 nodes tolerate 1 failure; 5 tolerate 2. Even counts waste a vote without extra fault budget. Quorum is still majority, so 4 nodes only tolerate 1.

**Q: Can two leaders exist?**
**A:** Briefly, a partitioned old leader may still think it is leader until its term is beaten. It cannot commit new entries without a majority. Clients that talk to it may time out.

**Q: Raft versus Multi-Paxos?**
**A:** Same intersection math. Raft fixes the leader, log, and reconfiguration story so implementations converge. Paxos papers leave more choices.

## 6. Production Use Cases

- **etcd / Kubernetes** control plane.
- **Consul** catalog and sessions.
- **Distributed SQL** range groups (Cockroach, TiKV).

<Callout icon="tip" title="Never hide the term in metrics">
If term is climbing, elections are looping. That is the first graph to page on.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Replication strategies/index.mdx',
    title: 'Replication Strategies',
    description:
      'How copies stay in sync: single-leader, multi-leader, or leaderless quorums, plus sync versus async on the acknowledge path.',
    body: `
**Replication** keeps copies of the same data on more than one node. The strategy is the pairing of topology (who accepts writes) and durability (when you tell the client OK). Topology without the ack rule is incomplete.

## 1. Deep Dive and Mechanics

**Single-leader (primary/secondary).** All writes go to one primary. Secondaries pull or receive a stream. Simple conflict story. Failover needs fencing so the old primary cannot keep writing.

**Multi-leader.** Several primaries accept writes, often one per region. Conflicts are resolved with LWW, versions, or CRDTs. Good for write-local latency; bad if you pretend there are no conflicts.

**Leaderless.** Clients write to a quorum (W) and read from a quorum (R). If R + W is greater than N, reads overlap a write. Sloppy quorums and hinted handoff keep availability during a partition.

**Sync versus async.** Sync waits for replicas (PACELC: C). Async returns after local persist (L) and risks RPO greater than zero.

<Callout icon="warning" title="Async replica is not a zero-RPO DR plan">
If the primary dies before the stream lands, those writes are gone. Call it a read scale replica, not disaster recovery, unless the business accepts the lag.
</Callout>

## 2. Mathematical / Theoretical Foundation

Quorum: R + W greater than N implies a read sees at least one node that saw the write (for a single key, ignoring concurrent writers and hinted handoff). Concurrent writes still need timestamps or vector clocks.

Sync replication commit latency is at least the RTT to the slowest replica in the wait set. Availability of a single-leader system is gated by primary health plus failover time.

<ComparisonTable
  headers={['Strategy', 'Write path', 'Conflicts', 'Typical use']}
  rows={[
    ['Single-leader sync', 'Primary plus replicas', 'None', 'Money, config'],
    ['Single-leader async', 'Primary then stream', 'None until failover', 'Read replicas'],
    ['Multi-leader', 'Local primary', 'Yes', 'Multi-region active-active'],
    ['Leaderless quorum', 'W of N', 'Yes', 'Dynamo, Cassandra'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def quorum_read_fresh(n, r, w):
    return r + w > n
TICK3

Postgres streaming, MySQL binlog, Kafka ISR, and Cassandra replication factor are all this table with different defaults.

## 4. Visualizations

TICK3mermaid
flowchart TB
    C[Client]
    C --> L[Leader]
    L -->|sync ack| R1[Replica]
    L -->|async stream| R2[Read replica]
TICK3

## 5. Interview Prep

**Q: When do you pick multi-leader?**
**A:** When write latency must be regional and conflict rate is low or mergeable. Calendars and documents yes; unique inventory counts no unless you serialize.

**Q: What is chain replication?**
**A:** Writes flow down a chain; the tail serves reads. Strong sequential story, sensitive to tail failure.

**Q: Replica lag versus consistency?**
**A:** Lag is a time number. Consistency is a guarantee about what a read can see. You can have small lag and still serve a stale read if the router is wrong.

## 6. Production Use Cases

- **OLTP primary plus analytics replica** (async).
- **Multi-AZ sync** for RPO zero inside a region.
- **Dynamo-style** stores with tunable R and W.

<Callout icon="tip" title="State RPO and RTO with the topology">
Interviewers want seconds of data loss and minutes of failover, not just "we replicate."
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Saga pattern/index.mdx',
    title: 'Saga Pattern',
    description:
      'A long-running workflow of local transactions plus compensating actions, used when a single distributed lock-and-commit would hold too long.',
    body: `
A **saga** is a sequence of local transactions. Each step publishes or records that it succeeded. If a later step fails, earlier steps run **compensations** that semantically undo (refund, cancel, release). There is no single global lock and no two-phase commit across services.

## 1. Deep Dive and Mechanics

**Choreography.** Each service listens for the previous event and emits the next. Few moving parts, hard to see the whole graph, easy to cycle.

**Orchestration.** A coordinator (state machine, Temporal, Step Functions) tells each service what to do and records progress. Easier timeouts, retries, and human replay.

**Compensation is not rollback.** You cannot un-send an email. You send an apology. You cannot un-charge if the acquirer already settled; you refund. Design compensations as first-class APIs.

**Idempotency.** Every step and compensation must be safe to retry. Sagas retry.

<Callout icon="warning" title="A failed compensation is an incident">
If refund fails after ship fails, you have money and goods in an unknown state. Put compensations on a dead-letter path with paging, not a log line.
</Callout>

## 2. Mathematical / Theoretical Foundation

Sagas (Garcia-Molina and Salem) trade atomicity for isolation. The global history is not serializable: other readers can see a booking that later cancels. You get eventual semantic consistency if every forward step has a compensation that converges.

Name the isolation holes: dirty business state, lost uniqueness if two sagas book the last seat. Use reservations with TTLs to close the seat race.

<ComparisonTable
  headers={['Approach', 'Atomicity', 'Holds locks', 'Best for']}
  rows={[
    ['2PC', 'Yes', 'Yes, across nodes', 'One DB vendor, short'],
    ['Saga choreography', 'Semantic undo', 'No', 'Simple linear flows'],
    ['Saga orchestration', 'Semantic undo', 'No', 'Timeouts, humans, many steps'],
    ['Outbox plus queue', 'Per service', 'Local only', 'The usual glue'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def run_saga(steps):
    done = []
    try:
        for step in steps:
            step.forward()
            done.append(step)
    except Exception:
        for step in reversed(done):
            step.compensate()
        raise
TICK3

Persist the saga state before each call. In-memory "done" lists die with the process.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant O as Orchestrator
    participant P as Payments
    participant I as Inventory
    O->>P: charge
    O->>I: reserve
    I-->>O: fail
    O->>P: refund
TICK3

## 5. Interview Prep

**Q: Saga versus 2PC?**
**A:** 2PC keeps locks and blocks on a coordinator. Sagas finish local commits and repair with compensations. Use sagas across services; use 2PC inside one database product if you must.

**Q: What if compensation cannot exist?**
**A:** That step should be last, or you need a reservation that expires, or you should not split the transaction across systems.

**Q: How do you make it idempotent?**
**A:** Saga id plus step name as a unique key. Store outcome. Retries read the row instead of charging twice.

## 6. Production Use Cases

- **Order, pay, allocate, ship** in commerce.
- **Provision then bill** in cloud control planes.
- **Temporal / Cadence / Step Functions** as the orchestrator.

<Callout icon="tip" title="Write the unhappy path on the ticket">
If the design doc only has the happy sequence, it is not a saga design yet.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Strong consistency/index.mdx',
    title: 'Strong Consistency',
    description:
      'Reads that behave as if there were one copy: linearizability or a named sequential model, not just a primary you hope is up to date.',
    body: `
**Strong consistency** in interviews usually means **linearizability**: a read returns the latest completed write, and the real-time order of non-overlapping operations is respected. Weaker "strong" slogans (read-your-writes, monotonic reads) are session guarantees, not one-copy linearizability.

## 1. Deep Dive and Mechanics

**Linearizability** (Herlihy and Wing) places each operation at a single point between invoke and response. Once a write returns, every later read in real time sees it (or a later write).

**Sequential consistency** (Lamport) preserves each process's order but may reorder concurrent clients relative to real time. CPUs often give this; geo-databases often do not.

**How stores implement it.** Single leader plus sync quorum; or consensus on every write (Raft, Paxos); or TrueTime-bounded commit waits (Spanner). Reads may go to the leader or to a replica that has applied the commit index.

<Callout icon="info" title="Majority write is not enough if reads skip the quorum">
W=majority and R=1 can miss the write. Strong reads need a quorum that intersects, or a lease that pins a leader you always read from.
</Callout>

## 2. Mathematical / Theoretical Foundation

A history is linearizable if it is equivalent to a legal sequential history that respects real-time precedence. CAP says you cannot keep this and stay available on both sides of a partition.

Session guarantees (Terry et al.) sit below linearizability: read-your-writes, monotonic reads, causal. PACELC: keeping linearizability when healthy costs the sync RTT.

<ComparisonTable
  headers={['Model', 'Real-time order', 'Session order', 'Typical API']}
  rows={[
    ['Linearizable', 'Yes', 'Yes', 'etcd, Spanner, ZooKeeper'],
    ['Sequential', 'No', 'Per client', 'Some multiprocessor specs'],
    ['Causal', 'Causal only', 'Yes', 'COPS, some mobile stores'],
    ['Eventual', 'No', 'No', 'DNS, async replicas'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def read_linearizable(leader, key):
    # must see commit index that includes all completed writes
    return leader.get(key)
TICK3

Postgres with sync replicas and reads on the primary is a common approximation. Replica reads are not linearizable unless you wait for apply.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C1 as Client A
    participant S as Linearizable store
    participant C2 as Client B
    C1->>S: write x=1
    S-->>C1: ok
    C2->>S: read x
    S-->>C2: 1
TICK3

## 5. Interview Prep

**Q: Is primary-reads strong consistency?**
**A:** Yes only if all writes completed on that primary and no stale failover. A client that still talks to a deposed primary is not linearizable.

**Q: Linearizable versus serializable?**
**A:** Serializability is about transactions as a unit. Linearizability is about single-object real-time order. You can have one without the other. Strict serializability is both.

**Q: Why do people pay for this?**
**A:** Unique constraints, leader election, config, money. "Try again" is cheaper than two accepted primary keys.

## 6. Production Use Cases

- **Metadata and locks** (etcd, ZooKeeper).
- **Banking ledgers** and inventory reservations.
- **Feature-flag truth** that must not flap across regions.

<Callout icon="tip" title="Ask what the read is allowed to miss">
If the answer is "nothing after a successful write," you are in linearizability land. Price the quorum.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Three-phase commit/index.mdx',
    title: 'Three-Phase Commit (3PC)',
    description:
      'A non-blocking extra phase over 2PC that still fails under real partitions and is rarely what you ship instead of consensus or sagas.',
    body: `
**Three-phase commit** adds a **pre-commit** (prepared-to-commit) phase so that, in a synchronous failure model, a surviving cohort can decide without blocking forever on a dead coordinator. In real networks with partitions, 3PC can still block or decide inconsistently unless you add extra assumptions. Production systems almost never ship textbook 3PC.

## 1. Deep Dive and Mechanics

**Phases.** CanCommit (vote), PreCommit (coordinator learned yes from all), DoCommit. Participants that see PreCommit know that everyone voted yes, so a timeout after PreCommit can commit. Participants that never left CanCommit can abort.

**The hope.** 2PC blocks if the coordinator dies after some participants prepared. 3PC tries to make the recovery rule local.

**The catch.** If the network partitions, one side may PreCommit and commit while the other never heard PreCommit and aborts. Skeen's conditions assume no partitions or a synchronous model. That is not the WAN.

<Callout icon="warning" title="3PC is not the fix for 2PC on microservices">
If you need progress under partitions, use consensus (Paxos/Raft) for a commit record, or use sagas. Do not add a third network round and call it solved.
</Callout>

## 2. Mathematical / Theoretical Foundation

Skeen: a non-blocking atomic commit protocol exists in a synchronous model with reliable failure detection. In an asynchronous network, atomic commit is as hard as consensus. 3PC's extra state does not beat FLP or CAP.

Timeout-based "I am the new coordinator" without a quorum is how split decisions happen.

<ComparisonTable
  headers={['Protocol', 'Rounds', 'Blocking', 'Partition story']}
  rows={[
    ['2PC', '2', 'Yes if coordinator gone', 'Unsafe if you guess'],
    ['3PC', '3', 'Better in sync model', 'Can split on a cut'],
    ['Paxos commit', 'Consensus', 'Live with majority', 'Minority waits'],
    ['Saga', 'N local', 'No global lock', 'Compensations'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
STATES = ("working", "prepared", "precommitted", "committed", "aborted")
TICK3

If you find a 3PC library, treat it as a history lesson. XA in databases is still 2PC. Cloud orchestrators use logs, not 3PC.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> CanCommit
    CanCommit --> Aborted: any no or timeout
    CanCommit --> PreCommit: all yes
    PreCommit --> Committed: doCommit
    PreCommit --> Aborted: coordinator abort
TICK3

## 5. Interview Prep

**Q: Why did people invent 3PC?**
**A:** To reduce blocking when the coordinator crashes after a unanimous yes. It assumes you can tell crash from delay.

**Q: Why don't we use it?**
**A:** Partitions look like crashes. Extra latency. Consensus on a transaction log is the robust version of "non-blocking commit."

**Q: Is Spanner 3PC?**
**A:** No. Spanner uses Paxos per group and 2PC across groups, with TrueTime to bound uncertainty.

## 6. Production Use Cases

- **Exam answers** and protocol surveys.
- **Not** a recommended cross-service default.
- **Historical papers** next to 2PC and Paxos commit.

<Callout icon="tip" title="Say 2PC then consensus then saga">
That ranking is what interviewers want. 3PC is the footnote.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Two-phase commit/index.mdx',
    title: 'Two-Phase Commit (2PC)',
    description:
      'Atomic commit across resource managers: vote, then commit or abort, with locks held while the coordinator and network decide.',
    body: `
**Two-phase commit** is the classic atomic commit protocol. In **prepare**, every resource manager votes yes (durable prepared state, locks held) or no. In **commit**, the coordinator writes a decision and tells everyone. All yes plus a commit record means commit; any no means abort.

## 1. Deep Dive and Mechanics

**Coordinator.** Collects votes, persists the decision, then informs participants. The commit record is the truth. If the coordinator dies after writing commit, recovery must finish the commit, not abort.

**Participants.** On yes, they cannot forget: they must be able to commit or abort when told. That is why locks and undo/redo live across the wait.

**Blocking.** If the coordinator vanishes after some prepared yes votes, participants cannot safely pick a side without talking to someone who saw the decision. This is the famous 2PC block.

**XA.** Databases expose this as XA transactions. It works inside one vendor's RM set. Across microservices with HTTP, 2PC becomes a distributed lock on the user request.

<Callout icon="warning" title="Prepared is not committed">
A process that crashes in prepare must still be able to abort or commit on recovery. If you ack yes before the prepare record is durable, you can commit on one side and lose the other.
</Callout>

## 2. Mathematical / Theoretical Foundation

Atomic commit: all correct participants decide the same, commit only if all voted yes, and (in a good run) commit when all voted yes and no failures. Gray and others showed 2PC is blocking. Non-blocking atomic commit needs extra models or consensus.

Latency is at least two extra round trips plus fsyncs on every participant.

<ComparisonTable
  headers={['Concern', '2PC', 'Saga', 'Consensus log']}
  rows={[
    ['Atomicity', 'Yes', 'Compensation', 'Yes for one log'],
    ['Lock time', 'Until decision', 'Local only', 'Until commit index'],
    ['Partition', 'Blocks', 'Diverges then repairs', 'Majority progress'],
    ['Ops cost', 'Dreaded', 'Workflow ops', 'Well understood'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def two_phase(participants):
    votes = [p.prepare() for p in participants]
    if all(votes):
        for p in participants:
            p.commit()
        return "commit"
    for p in participants:
        p.abort()
    return "abort"
TICK3

Real coordinators persist the decision before the second loop. The in-memory version is a teaching sketch.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Coordinator
    participant A as RM A
    participant B as RM B
    C->>A: prepare
    C->>B: prepare
    A-->>C: yes
    B-->>C: yes
    C->>C: write commit
    C->>A: commit
    C->>B: commit
TICK3

## 5. Interview Prep

**Q: When is 2PC acceptable?**
**A:** Short transactions, one data-center, participants that share an XA coordinator, and a team that can unblock in-doubt transactions. Not as the default between HTTP services.

**Q: What is an in-doubt transaction?**
**A:** A participant that voted yes and has not heard the decision. DBAs resolve these with the coordinator log.

**Q: 2PC versus Raft?**
**A:** Raft replicates one state machine. 2PC spans independently prepared resources. Spanner uses both: Paxos inside a group, 2PC across groups.

## 6. Production Use Cases

- **XA between a database and a message broker** in older enterprise apps.
- **Spanner / Cockroach** distributed SQL commit (with consensus underneath).
- **Avoid** for checkout across five microservices; use a saga.

<Callout icon="tip" title="Measure prepare time">
If prepare waits on a user or an external HTTP call, you have locked rows across a WAN. That is the 2PC outage story.
</Callout>
`,
  },
  {
    rel: '43.2 Distributed Systems Theory/Vector clocks/index.mdx',
    title: 'Vector Clocks',
    description:
      'A version vector per writer that detects happens-before and concurrency, so siblings can be merged instead of silently overwritten.',
    body: `
A **vector clock** (or version vector) is a map from process id to counter. Increment your own slot on a local event. On receive, take the element-wise max, then increment yourself. Event a happens-before b if Va is less than or equal to Vb in every slot and strictly less in at least one. If neither dominates, the events are concurrent.

## 1. Deep Dive and Mechanics

**Why scalars fail.** Lamport clocks totally order events. Concurrent writes get an arbitrary winner under last-write-wins. Vector clocks keep both as siblings.

**Version vectors versus full vector clocks.** Stores often track one counter per replica (version vector) for a key, not a clock for every event in the system. Same dominance test.

**Growth.** One slot per writer. Churned clients explode metadata. Dynamo-style systems prune, gossip, and sometimes fall back to timestamps when the vector is too wide.

<Callout icon="info" title="Incomparable means keep both">
If neither vector dominates, do not pick a winner in the storage layer unless the product says LWW. Surface siblings to the app or a merge function.
</Callout>

## 2. Mathematical / Theoretical Foundation

Happens-before is a partial order. Vector clocks are an order-embedding into N^k (Fidge, Mattern). Dominance is componentwise. Concurrent pairs are incomparable.

Storage cost is O(n) integers per object for n writers. Dotted version vectors and interval tree clocks compress some cases.

<ComparisonTable
  headers={['Clock', 'Causality', 'Concurrency', 'Size']}
  rows={[
    ['Lamport', 'One way', 'Hidden', '1 int'],
    ['Vector / version', 'Yes', 'Yes', 'O(writers)'],
    ['LWW timestamp', 'No', 'Dropped', '1 stamp'],
    ['CRDT', 'Merge law', 'Commutes', 'Type-specific'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def dominates(a, b):
    keys = set(a) | set(b)
    ge = all(a.get(k, 0) >= b.get(k, 0) for k in keys)
    gt = any(a.get(k, 0) > b.get(k, 0) for k in keys)
    return ge and gt

def concurrent(a, b):
    return not dominates(a, b) and not dominates(b, a)
TICK3

Riak and classic Dynamo expose siblings this way. Cassandra mostly uses timestamps instead.

## 4. Visualizations

TICK3mermaid
flowchart LR
    A["A: 1,0"] --> C["A: 2,1"]
    B["B: 0,1"] --> C
    A -.->|concurrent| B
TICK3

## 5. Interview Prep

**Q: If Va is less than Vb in every coordinate, did a happen before b?**
**A:** Yes, that is the dominance test. The Lamport trap does not apply the same way.

**Q: Why not vector clocks on every HTTP client?**
**A:** Cardinality. Prefer replica-id vectors, or a causal CRDT, or accept LWW for low-stakes fields.

**Q: Vector clock versus CRDT?**
**A:** Vectors detect conflict. CRDTs define a merge that always exists. Many CRDTs use dots (replica, counter) internally.

## 6. Production Use Cases

- **Riak / Dynamo** sibling reconciliation.
- **File sync** and multi-master documents before a CRDT.
- **Debug** of causal history in traces.

<Callout icon="tip" title="Always define the merge">
A vector without a merge function is just a way to know you are in trouble. Write the merge on the design doc.
</Callout>
`,
  },
]
