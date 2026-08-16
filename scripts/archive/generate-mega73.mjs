import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Two-phase commit/index.mdx': `---
title: Two-Phase Commit (2PC)
description: A distributed algorithm that coordinates all the processes that participate in a distributed atomic transaction on whether to commit or abort the transaction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Two-Phase Commit (2PC)">

In a single database, an ACID transaction guarantees that all operations succeed or all fail together. But what if a user buys a product, and you mathematically must deduct $100 from the Payments Database AND deduct 1 inventory from the Shipping Database? 

If the Shipping DB crashes halfway through, you cannot leave the user missing $100 with no product. You need a **Distributed Transaction**. The most famous algorithm for this is the **Two-Phase Commit (2PC)**.

<Callout icon="warning" title="The Coordinator Bottleneck">
  2PC mathematically requires a central "Coordinator" node. This Coordinator becomes a massive Single Point of Failure (SPOF) and a severe performance bottleneck.
</Callout>

## The Two Phases

<ComparisonTable 
  headers={['Phase', 'Action', 'Analogy']}
  rows={[
    ['Phase 1: Prepare', 'The Coordinator mathematically sends a "Prepare" message to all participating databases. Each DB locks its rows and replies "Ready to Commit" or "Abort".', 'A wedding priest asking both the Bride and Groom: "Do you take this person...?"'],
    ['Phase 2: Commit', 'If ALL databases replied "Ready", the Coordinator mathematically broadcasts "Commit". If even ONE replied "Abort", the Coordinator broadcasts "Rollback" to everyone.', 'If both say "I do", the priest says "I now pronounce you married". If one says "No", the wedding is canceled.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Three-phase commit/index.mdx': `---
title: Three-Phase Commit (3PC)
description: A distributed algorithm that extends the two-phase commit protocol to avoid blocking failures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Three-Phase Commit (3PC)">

The mathematical flaw of the Two-Phase Commit (2PC) is that it is a **Blocking Protocol**. If the Coordinator node mathematically crashes *after* sending the "Prepare" message but *before* sending the "Commit" message, all the participating databases sit there indefinitely with their rows locked, completely freezing the system.

The **Three-Phase Commit (3PC)** was mathematically designed to solve this by adding a timeout mechanism and an extra phase.

<Callout icon="info" title="Theoretical, but rarely used">
  While 3PC mathematically solves the blocking problem of 2PC, it requires even more network round-trips, making it far too slow for modern high-throughput systems. Most engineers simply accept the risks of 2PC or move entirely to asynchronous patterns like the Saga Pattern.
</Callout>

## The Three Phases

1. **CanCommit:** The Coordinator asks all nodes "Are you alive and capable of committing?" (Nodes do *not* lock rows yet).
2. **PreCommit:** If everyone says yes, the Coordinator tells nodes to "Prepare to commit". Nodes lock rows and reply "Ready".
3. **DoCommit:** The Coordinator broadcasts "Commit".

*The Magic:* Because of the extra phase, if the Coordinator crashes during Phase 2, the nodes can mathematically time-out and safely Abort, knowing that Phase 3 (the actual commit) never started anywhere in the cluster.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Replication strategies/index.mdx': `---
title: Replication Strategies
description: The specific mathematical algorithms and architectural patterns used to keep multiple copies of data synchronized across a distributed cluster.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Replication Strategies">

To achieve Fault Tolerance and low Latency, databases must mathematically maintain identical copies (replicas) of their data on different physical servers. 

However, keeping distributed copies perfectly in sync over an unreliable network introduces profound mathematical challenges.

<Callout icon="tip" title="Synchronous vs. Asynchronous">
  In **Synchronous Replication**, the primary database mathematically waits for the replicas to acknowledge the write before returning success to the user (Safe, but slow). In **Asynchronous Replication**, the primary writes locally and returns success instantly, replicating in the background (Fast, but risks data loss if the primary explodes).
</Callout>

## Core Replication Topologies

<ComparisonTable 
  headers={['Strategy', 'How it Works', 'Use Case / Drawback']}
  rows={[
    ['Single-Leader (Master-Slave)', 'One node accepts all writes and mathematically streams them to Read-Only replicas.', 'Standard default for Postgres/MySQL. Easy to reason about, but the Leader is a Write bottleneck.'],
    ['Multi-Leader (Master-Master)', 'Multiple nodes can accept writes simultaneously. They asynchronously sync with each other.', 'Useful for massive global apps (one leader in US, one in EU). Drawback: Extremely complex mathematical conflict resolution if two users edit the same row on different leaders.'],
    ['Leaderless (Dynamo-style)', 'Any node can accept writes. The client mathematically broadcasts the write to multiple nodes simultaneously using a Quorum (e.g., waiting for 2 out of 3 nodes to ACK).', 'Amazon DynamoDB, Cassandra. Maximum availability, but heavily reliant on Vector Clocks to resolve eventual consistency issues.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Raft/index.mdx': `---
title: Raft Consensus Algorithm
description: A consensus algorithm designed to be easy to understand. It is equivalent to Paxos in fault-tolerance and performance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Raft Consensus Algorithm">

For decades, the Paxos algorithm was the mathematical gold standard for distributed consensus, but it was so notoriously complicated that almost no one could implement it correctly in software.

In 2013, Diego Ongaro and John Ousterhout published **Raft**, an algorithm explicitly designed to be mathematically equivalent to Paxos, but vastly easier to understand. Today, Raft is the engine that mathematically powers modern infrastructure like **etcd** (Kubernetes), **Consul**, and modern **MongoDB**.

<Callout icon="success" title="The Dictator Model">
  Raft simplifies consensus by relying entirely on strict **Leader Election**. In Raft, the Leader is an absolute dictator. All logs mathematically flow in one direction: from the Leader down to the Followers.
</Callout>

## The Raft Election Process

Nodes in Raft exist in one of three mathematical states: Follower, Candidate, or Leader.

1. **The Timer:** Every Follower has a randomized mathematical countdown timer (e.g., 150ms to 300ms).
2. **The Heartbeat:** As long as the Leader is alive, it mathematically sends a "Heartbeat" ping every 50ms, resetting all Follower timers.
3. **The Election:** If the Leader crashes, the Heartbeats stop. The Follower whose randomized timer hits zero first mathematically transitions to a Candidate. It votes for itself and requests votes from the cluster.
4. **The Quorum:** If the Candidate receives a mathematical majority of votes, it instantly becomes the new dictator (Leader).

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Paxos/index.mdx': `---
title: Paxos
description: A family of protocols for solving consensus in a network of unreliable processors, discovered by Leslie Lamport.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Paxos">

In 1989, legendary computer scientist Leslie Lamport published a paper detailing the **Paxos** algorithm. It was the first mathematically rigorous solution to the problem of distributed consensus in an asynchronous network where nodes might crash or messages might be delayed.

For 25 years, Paxos was the undisputed king of distributed systems theory, serving as the mathematical foundation for Google's Spanner database and Amazon's original Dynamo architecture.

<Callout icon="error" title="The Notorious Complexity">
  Lamport originally explained Paxos using a metaphor about a fictional Greek parliament on the island of Paxos. The metaphor was so mathematically obtuse that no one understood the paper, forcing him to rewrite it years later. It remains incredibly difficult to implement correctly in C++ or Java.
</Callout>

## The Mathematical Mechanism

Unlike Raft, which relies on a strict Leader Dictator, basic Paxos is mathematically a multi-phase democratic voting protocol:

1. **Phase 1 (Prepare):** A Proposer asks the cluster: "I want to propose a value with Proposal Number N. Will you listen to me?"
2. **Phase 2 (Accept):** If a mathematical Quorum (majority) of nodes reply "Yes, N is the highest number I have seen", the Proposer sends the actual value. If a Quorum accepts the value, consensus is mathematically achieved.

*Because Paxos allows multiple Proposers to shout at the same time, it can mathematically lead to "Dueling Proposers" (livelock), where they constantly out-bid each other's Proposal Numbers without ever committing.*

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Partition tolerance/index.mdx': `---
title: Partition Tolerance
description: The mathematical requirement that a distributed system must continue to operate despite an arbitrary number of messages being dropped or delayed by the network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Partition Tolerance">

In the context of the famous **CAP Theorem**, a **Partition** occurs when a network connection mathematically fails between two or more nodes in a distributed cluster.

For example, if Node A is in New York and Node B is in London, and the undersea fiber optic cable is cut by a submarine, the network is "Partitioned." Both Node A and Node B are perfectly healthy and powered on, but they cannot mathematically communicate with each other.

<Callout icon="warning" title="Not an Option">
  In the CAP Theorem (Consistency, Availability, Partition Tolerance), engineers often incorrectly debate "Choosing CA". You cannot choose CA over a wide area network. Partitions are a physical reality of the universe. Therefore, a distributed system *must* be Partition Tolerant, forcing the mathematical choice between Consistency (CP) and Availability (AP).
</Callout>

## Handling a Partition

When a partition occurs, the system must mathematically execute one of two strategies:

1. **Cancel the Operation (CP):** The system realizes it cannot sync data with the other node. To prevent mathematically conflicting data states, it throws a 500 Error and refuses to accept writes until the network heals.
2. **Proceed Anyway (AP):** The system accepts the write locally to ensure high availability. The New York node and the London node mathematically "diverge" in state. When the network heals hours later, complex algorithms (like Vector Clocks) must be used to mathematically merge the conflicting data.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Gossip protocols/index.mdx': `---
title: Gossip Protocols
description: A class of computer-to-computer communication protocols based on the way epidemics spread.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gossip Protocols">

In a massive distributed system with 10,000 servers (like Amazon's Dynamo or Apache Cassandra), having a central "Master Server" mathematically track the health of every single node is impossible; the Master would become a massive bottleneck.

**Gossip Protocols** (also known as Epidemic Protocols) solve this by using decentralized, randomized mathematical communication—exactly how a rumor spreads through a high school or a virus spreads through a population.

<Callout icon="success" title="Mathematical Convergence">
  Because exponential mathematical growth is so powerful, a rumor starting at 1 node in a 10,000-node cluster will mathematically reach every single node in just \`O(log N)\` rounds of communication (usually less than a second).
</Callout>

## How it Works

1. **Random Selection:** Every second, Node A mathematically selects 1 or 2 random peers from its known list.
2. **State Sync:** Node A connects to the random peers and swaps "Gossip State" (e.g., "I saw Node 50 crash 2 seconds ago. I saw Node 102 boot up 5 seconds ago").
3. **Exponential Spread:** In the next second, those 2 peers pick 2 random peers, spreading the news to 4, then 8, then 16.
4. **Result:** Without any central server, the entire 10,000-node cluster mathematically achieves a unified view of which servers are healthy and which are dead.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Distributed transactions/index.mdx': `---
title: Distributed Transactions
description: Transactions that alter data on multiple databases mathematically simultaneously, requiring complex coordination to maintain ACID properties.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Transactions">

In a Microservices architecture, you intentionally slice your database into smaller, isolated databases (e.g., a dedicated PostgreSQL server for Orders, and a dedicated PostgreSQL server for Inventory). 

While this mathematically improves horizontal scalability, it creates a massive engineering nightmare: **Distributed Transactions**.

If an Order requires deducting $50 and deducting 1 item, how do you mathematically guarantee that BOTH databases commit the change, or BOTH databases rollback the change?

<Callout icon="error" title="The Microservices Trap">
  Many engineers enthusiastically split their monolithic database into microservices without realizing they have mathematically destroyed ACID transactional guarantees. Without a distributed transaction strategy, you will inevitably encounter "partial failures" resulting in severe data corruption.
</Callout>

## Mathematical Strategies

<ComparisonTable 
  headers={['Strategy', 'How it works', 'Verdict']}
  rows={[
    ['Two-Phase Commit (2PC)', 'A central coordinator mathematically locks rows across all databases, asks if they are ready, and then broadcasts a global commit.', 'Synchronous, highly consistent, but terribly slow. Creates massive mathematical bottlenecks.'],
    ['Saga Pattern', 'An asynchronous sequence of local transactions. Service A commits its local DB, then fires an Event to Service B. If Service B fails, it fires a "Compensating Event" to Service A to mathematically reverse the first transaction.', 'Complex to build, but highly scalable and performant. The modern standard for microservices.'],
    ['Outbox Pattern', 'Writing the business data AND the "Event message" to the exact same local database table in one single local ACID transaction. A background worker reads the table and forwards the message to the queue.', 'Mathematically guarantees that the event is fired if and only if the data is saved.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Distributed computing/index.mdx': `---
title: Distributed Computing
description: A field of computer science that studies distributed systems—systems whose components are located on different networked computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Computing">

**Distributed Computing** is the mathematical and architectural discipline of taking a massive computational problem, breaking it into thousands of smaller chunks, and distributing those chunks across thousands of independent computers over a network.

Whether it is Google indexing the entire internet, CERN analyzing petabytes of particle collision data, or a cluster rendering CGI frames for a movie, the fundamental mathematical principles are the same.

<Callout icon="info" title="The Fallacies of Distributed Computing">
  In 1994, Peter Deutsch formulated the mathematical fallacies that inexperienced engineers often falsely assume when moving from a single server to a distributed cluster:
  1. The network is reliable.
  2. Latency is zero.
  3. Bandwidth is infinite.
  4. The network is secure.
</Callout>

## Core Paradigms

<ComparisonTable 
  headers={['Paradigm', 'Description', 'Real-world Tech']}
  rows={[
    ['MapReduce', 'A mathematical programming model where data is "Mapped" (filtered and sorted across thousands of nodes) and then "Reduced" (summarized into a final result).', 'Apache Hadoop.'],
    ['Microservices', 'Splitting a monolithic application into dozens of small, independently deployable services that communicate via HTTP or RPC.', 'Kubernetes, gRPC.'],
    ['Edge Computing', 'Moving the physical computation mathematically closer to the user (IoT devices, CDN edge nodes) rather than sending data all the way back to a central cloud.', 'Cloudflare Workers, AWS Greengrass.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/CRDTs (Conflict-free Replicated Data Types)/index.mdx': `---
title: Conflict-Free Replicated Data Types (CRDTs)
description: A data structure that can be replicated across multiple computers in a network, where replicas can be updated independently and concurrently without coordination.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Conflict-Free Replicated Data Types (CRDTs)">

In distributed databases (like DynamoDB), if two users edit the exact same document simultaneously, the system uses Vector Clocks to mathematically detect a "Conflict," and then forces the application engineer to write custom code to resolve it.

**Conflict-Free Replicated Data Types (CRDTs)** are mathematically magical data structures that automatically resolve conflicts without any human intervention. They guarantee that no matter what order the concurrent edits arrive, all nodes will mathematically converge to the exact same final state.

<Callout icon="tip" title="Collaborative Editing">
  CRDTs are the mathematical foundation of modern collaborative software. When 10 people are typing in a Google Doc or Figma canvas simultaneously, CRDTs mathematically ensure that everyone sees the exact same document without locking the system.
</Callout>

## The Mathematics of Commutativity

CRDTs work because they rely on mathematical operations that are **Commutative** (meaning the order of operations doesn't matter: A + B = B + A).

<ComparisonTable 
  headers={['CRDT Type', 'How it Works', 'Example']}
  rows={[
    ['Grow-Only Counter (G-Counter)', 'A distributed counter where nodes can only ADD, never subtract. Every node mathematically tracks its own count, and the total is the MAX of all nodes.', 'A YouTube Video View Counter.'],
    ['Positive-Negative Counter (PN-Counter)', 'A combination of two G-Counters (one for Adds, one for Subtracts). The final value is the mathematical difference between the two.', 'A Reddit Upvote/Downvote system.'],
    ['Observed-Remove Set (OR-Set)', 'A set where items can be added and removed. Every element is tagged with a mathematically unique UUID upon insertion to avoid deletion conflicts.', 'A distributed Shopping Cart.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Byzantine fault tolerance/index.mdx': `---
title: Byzantine Fault Tolerance (BFT)
description: The dependability of a fault-tolerant computer system where components may fail and there is imperfect information on whether a component has failed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Byzantine Fault Tolerance (BFT)">

Traditional distributed systems (like databases using Raft or Paxos) are designed to survive **Fail-Stop** errors. They mathematically assume a server might explode or lose power, but they assume the server *is not actively trying to lie or sabotage the network*.

**Byzantine Fault Tolerance (BFT)** is the infinitely more difficult mathematical discipline of achieving consensus when nodes might be actively malicious, sending fake data, or conspiring to destroy the system.

<Callout icon="warning" title="The Byzantine Generals Problem">
  The mathematical thought experiment: Several generals are surrounding a city. They must agree to attack simultaneously, or they will lose. They communicate via messengers. However, one or more generals are traitors actively sending forged messages to confuse the loyal generals. How do the loyal generals mathematically reach a consensus to attack?
</Callout>

## The BFT Threshold

Mathematical proofs demonstrate that a network can only survive Byzantine failures if the number of malicious nodes (\`f\`) is strictly less than one-third of the total nodes (\`n\`).

**Formula: \`n >= 3f + 1\`**

If you have 4 nodes, you can survive 1 malicious node. If you have 2 malicious nodes, consensus is mathematically impossible.

## Blockchain and Proof of Work

For decades, BFT was mostly a theoretical curiosity used in aerospace (where radiation might cause a sensor to actively output malicious values). 

In 2008, Satoshi Nakamoto invented **Bitcoin**, which utilized **Proof-of-Work (PoW)**. PoW is essentially a massive, global BFT consensus algorithm that allows thousands of mutually distrustful computers to mathematically agree on a financial ledger without a central bank.

</ConceptTemplate>
`,
}

async function generateMega73() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega73().catch(console.error)
