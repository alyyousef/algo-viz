import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Circuit breakers/index.mdx': `---
title: Circuit Breakers
description: A design pattern used in software architecture to prevent an application from repeatedly trying to execute an operation that's likely to fail.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Circuit Breakers">

In a microservices architecture, if Service A calls Service B, and Service B is mathematically dead, Service A will sit there waiting for a network timeout (e.g., 30 seconds). If 1,000 users hit Service A, it will open 1,000 pending connections to Service B, exhausting its own RAM and causing Service A to crash as well. This is known as a **Cascading Failure**.

The **Circuit Breaker** pattern mathematically prevents this by monitoring failure rates and instantly "tripping" to cut off the connection before the entire system melts down.

<Callout icon="success" title="The Fail-Fast Philosophy">
  Instead of waiting 30 seconds for a guaranteed timeout, an open Circuit Breaker instantly returns an error (or a cached fallback response) in 1 millisecond. This saves Service A's resources and gives Service B time to recover.
</Callout>

## The Three Mathematical States

A Circuit Breaker operates exactly like an electrical breaker in your house:

<ComparisonTable 
  headers={['State', 'Mechanism', 'Action Taken']}
  rows={[
    ['CLOSED', 'Everything is healthy. The failure rate is below the mathematical threshold (e.g., < 5%).', 'Requests pass through normally.'],
    ['OPEN', 'Failures spiked above the threshold. The circuit is mathematically broken.', 'Requests instantly fail without ever touching the network. Service A returns a fallback UI to the user.'],
    ['HALF-OPEN', 'After a timeout period (e.g., 60 seconds), the breaker allows *exactly one* test request through.', 'If it succeeds, the breaker resets to CLOSED. If it fails, it snaps back to OPEN immediately.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Bulkhead pattern/index.mdx': `---
title: Bulkhead Pattern
description: A software design pattern that isolates elements of an application into pools so that if one fails, the others will continue to function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bulkhead Pattern">

On a submarine, the hull is mathematically divided into separate, watertight compartments called **Bulkheads**. If a torpedo blasts a hole in Compartment 3, you seal the heavy steel doors. Compartment 3 floods, but the rest of the submarine remains perfectly buoyant.

In System Design, the Bulkhead Pattern applies this exact physical principle to software architecture to prevent **Cascading Failures**.

<Callout icon="warning" title="The Threat of Thread Exhaustion">
  Imagine a single web server that handles two APIs: \`/checkout\` and \`/generate-pdf\`. If the PDF library freezes, 100 users trying to generate PDFs will mathematically consume all 100 available Apache worker threads. Now, even though \`/checkout\` works perfectly, no one can buy anything because the server has zero threads left to accept new connections.
</Callout>

## Software Bulkhead Implementations

To mathematically guarantee survival, engineers separate resources:

1. **Thread Pool Bulkheads:** Assign exactly 80 threads to \`/checkout\` and a strict maximum of 20 threads to \`/generate-pdf\`. Even if the PDF service completely locks up, it can only consume its 20 threads, leaving the checkout system 100% operational.
2. **Database Bulkheads:** Instead of putting all microservices on a massive single PostgreSQL cluster, give the highly-critical Payment service its own physically separate database cluster. If the Analytics microservice executes a terrible query and crashes its database, Payments are mathematically unaffected.
3. **Hardware Bulkheads:** Deploying software across multiple isolated Availability Zones (AZs) so a localized power failure cannot sink the entire fleet.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Backpressure/index.mdx': `---
title: Backpressure
description: A mechanism used to handle situations where a data producer generates data faster than a consumer can process it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Backpressure">

In an event-driven system, you often have a fast Producer (e.g., an IoT sensor streaming 10,000 logs per second) and a slow Consumer (e.g., a Python script writing those logs to a slow hard drive at 1,000 logs per second).

Because the Producer is mathematically 10x faster than the Consumer, the unhandled data builds up in a buffer in RAM. Eventually, the RAM hits 100%, and the system violently crashes with an Out Of Memory (OOM) error.

**Backpressure** is the mathematical mechanism where the Consumer signals upstream to the Producer: *"Stop! I am choking. Slow down your transmission rate."*

<Callout icon="info" title="The Analogy: A Funnel">
  If you pour a bucket of water into a tiny funnel too fast, the water spills everywhere (OOM Error). Backpressure is mathematically equivalent to the funnel shouting at you to stop pouring until the water drains.
</Callout>

## How Systems Handle Backpressure

<ComparisonTable 
  headers={['Strategy', 'Mechanism', 'Trade-off']}
  rows={[
    ['Drop Data (Load Shedding)', 'If the buffer is full, simply delete the new incoming packets mathematically.', 'Data is permanently lost, but the system survives (useful for video streaming frames).'],
    ['Buffer (Queuing)', 'Place the data in a massive, durable queue like Kafka or RabbitMQ.', 'No data is lost, but the system experiences massive mathematical latency as the backlog grows.'],
    ['Block / Throttle', 'The TCP protocol mathematically shrinks its window size, physically forcing the Producer\\'s CPU to pause until the Consumer catches up.', 'The entire pipeline slows down to the speed of the slowest mathematical bottleneck.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Retry strategies/index.mdx': `---
title: Retry Strategies
description: Architectural patterns for automatically retrying failed operations in a distributed system to handle transient network errors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Retry Strategies">

In a distributed system, network packets travel across thousands of miles of physical cables and routers. A router might mathematically drop a packet due to a temporary 2-millisecond power fluctuation. These are called **Transient Failures**.

If an API call fails due to a transient error, the mathematically correct response is to simply try it again. However, if done poorly, retries can inadvertently execute a self-inflicted DDoS attack against your own servers.

<Callout icon="error" title="The Retry Storm">
  If 10,000 mobile clients lose connection to the server for 5 seconds, and their code simply loops \`while(failed) { retry(); }\`, the moment the server comes back online, it will mathematically be crushed by 10,000 simultaneous connections and instantly crash again.
</Callout>

## Safe Mathematical Retry Patterns

<ComparisonTable 
  headers={['Pattern', 'Mathematical Formula', 'Effect']}
  rows={[
    ['Exponential Backoff', 'Wait \`2^attempt * base_delay\`. (e.g., 1s, 2s, 4s, 8s, 16s).', 'Gives the struggling backend server mathematically increasing amounts of time to recover before hitting it again.'],
    ['Jitter (Randomization)', 'Wait \`ExponentialBackoff + Random(-1s to 1s)\`.', 'Mathematically de-synchronizes the clients. Instead of 10,000 clients all retrying at exactly 2.000 seconds, they retry scattered randomly between 1.0 and 3.0 seconds, smoothing the load.'],
    ['Idempotency Keys', 'Send a unique UUID with the request.', 'Ensures that if a retry is sent for a credit card charge, the server mathematically guarantees it will not charge the card twice.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Distributed locks/index.mdx': `---
title: Distributed Locks
description: A mechanism for controlling access to a shared resource by multiple independent processes running in a distributed system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Locks">

If you run a single Python script on a single server, and two threads want to edit a file, you use a simple Mutex (Mutual Exclusion lock) in local RAM. 

But what if you have 50 independent Python servers running in the cloud, and they all want to edit the exact same row in a database? A local Mutex is mathematically useless because the servers do not share RAM. You need a **Distributed Lock**.

<Callout icon="warning" title="The Race Condition">
  If User A has $100, and two servers simultaneously try to deduct $10, without a lock, they will both mathematically read $100, deduct $10, and write back $90. The user was charged twice, but only $10 was deducted.
</Callout>

## Implementing Distributed Locks

To acquire a lock, all 50 servers must talk to a single, mathematically consistent external system.

<ComparisonTable 
  headers={['Mechanism', 'How it Works', 'Drawbacks']}
  rows={[
    ['Redis (Redlock Algorithm)', 'A server writes a key to Redis with a strict Time-To-Live (TTL): \`SET lock_key 1 NX PX 5000\`. The \`NX\` flag mathematically guarantees only the first server succeeds.', 'Redis is generally fast, but the Redlock algorithm is controversial in high-stakes mathematical safety scenarios due to clock drift.'],
    ['ZooKeeper / Etcd', 'Uses a pure consensus algorithm (Raft/ZAB) to mathematically guarantee absolute safety.', 'Slower than Redis, requires maintaining a complex cluster.'],
    ['Database Row Locks', '\`SELECT ... FOR UPDATE\` in PostgreSQL.', 'Easy to implement, but mathematically locks the database row, crushing throughput.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Queues/index.mdx': `---
title: Message Queues
description: A form of asynchronous service-to-service communication used in serverless and microservices architectures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Message Queues">

In a synchronous architecture, if the Web Server calls the Email Server to send a receipt, the Web Server mathematically blocks its own execution until the email is sent. If the Email Server crashes, the Web Server crashes.

A **Message Queue** introduces mathematical **Decoupling**.

<Callout icon="success" title="Asynchronous Reliability">
  The Web Server simply drops a JSON message ("Send Receipt to User A") into the Queue and instantly returns an HTTP 200 OK to the user. The Web Server's job is done. A separate Worker process will mathematically pull the message from the queue and send the email at its own pace.
</Callout>

## Core Queue Mechanics

<ComparisonTable 
  headers={['Concept', 'Description', 'Real-world Analogy']}
  rows={[
    ['Point-to-Point', 'A message mathematically goes to exactly one consumer. If you have 5 workers, only one worker will process the "Send Email" task.', 'A line at a grocery store checkout. One cashier serves one customer.'],
    ['Durability', 'The queue writes messages to a physical hard drive. If the queue server loses power, the messages are mathematically saved and restored on reboot.', 'Writing tasks down in a physical notebook instead of keeping them in your head.'],
    ['Dead Letter Queue (DLQ)', 'If a worker mathematically fails to process a message 5 times in a row, the queue moves the message to the DLQ so human engineers can debug it without blocking the main queue.', 'A post office "Return to Sender" bin for letters with invalid addresses.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Pub-sub/index.mdx': `---
title: Publish-Subscribe (Pub/Sub)
description: A messaging pattern where senders (publishers) categorize published messages into classes without knowledge of which subscribers, if any, there may be.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Publish-Subscribe (Pub/Sub)">

While a Message Queue (like RabbitMQ or SQS) is mathematically designed for **Point-to-Point** task distribution (one message goes to exactly one worker), **Pub/Sub** is designed for **Fan-Out** broadcasting.

In Pub/Sub, a Publisher generates an event and mathematically broadcasts it to a "Topic". Any number of completely independent Microservices (Subscribers) can listen to that Topic and react simultaneously.

<Callout icon="tip" title="Ultimate Decoupling">
  When the \`OrderService\` publishes a \`checkout_complete\` event, it has absolutely zero mathematical knowledge of who is listening. The \`EmailService\` can listen to send a receipt, the \`InventoryService\` can listen to deduct stock, and the \`AnalyticsService\` can listen to update a dashboard—all perfectly parallelized.
</Callout>

## Pub/Sub Mechanics

<ComparisonTable 
  headers={['Component', 'Mathematical Role', 'Example']}
  rows={[
    ['Topic', 'The central named channel where messages are broadcast.', '\`topic/user_signups\`'],
    ['Publisher', 'The system that mathematically generates the data and fires it into the topic.', 'The Frontend Web Server.'],
    ['Subscriber', 'The system that registers a mathematical interest in a topic. Every subscriber gets a perfect clone of every message.', 'The Welcome Email microservice.']
  ]}
/>

*Popular Technologies:* AWS SNS, Google Cloud Pub/Sub, Redis Pub/Sub.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Event streaming/index.mdx': `---
title: Event Streaming
description: The practice of capturing data in real-time from event sources and storing them durably for later retrieval.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event Streaming">

A traditional Message Queue is like a mathematical to-do list: once a worker processes a message, the message is **permanently deleted**.

**Event Streaming** (championed by Apache Kafka) fundamentally alters this paradigm. An Event Stream is an **Append-Only, Immutable Log**. Messages are mathematically written to a physical hard drive in strict chronological order and are *never* deleted when read.

<Callout icon="success" title="The Power of Replay">
  Because the events are never deleted, a brand new microservice spun up today can mathematically "Rewind the Tape" to the beginning of the year, replaying every single business event that ever happened to perfectly reconstruct its database state.
</Callout>

## Kafka vs. Traditional Queues (RabbitMQ)

<ComparisonTable 
  headers={['Feature', 'Message Queue (RabbitMQ)', 'Event Stream (Kafka)']}
  rows={[
    ['Data Retention', 'Messages are mathematically deleted instantly after successful processing (ACK).', 'Messages are retained on disk for a configured mathematical duration (e.g., 7 days, or forever).'],
    ['Processing Model', 'Dumb Pipe, Smart Consumers. The queue pushes data to workers.', 'Smart Pipe, Dumb Consumers. Consumers mathematically "pull" data and track their own cursor (offset) in the log.'],
    ['Primary Use Case', 'Task distribution, asynchronous background jobs (e.g., sending emails).', 'Real-time data pipelines, Event Sourcing, massive log aggregation.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Lamport clocks/index.mdx': `---
title: Lamport Clocks
description: A simple logical clock algorithm used to determine the order of events in a distributed computer system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lamport Clocks">

In a single computer, if Event A happens before Event B, you mathematically know this because the CPU clock records \`09:00:01\` and \`09:00:02\`. 

In a distributed system, Server 1 in New York and Server 2 in Tokyo have different physical quartz clocks. Due to mathematical "Clock Drift", Server 2's clock might be 5 seconds faster. It is mathematically impossible to use physical timestamps to perfectly order events across a network.

To solve this, Leslie Lamport invented the **Logical Clock**.

<Callout icon="tip" title="The Core Insight">
  Lamport realized that we don't actually care about the *physical time* an event happened. We only mathematically care about **Causality**—did Event A *cause* Event B? If they are completely unrelated, the order doesn't matter.
</Callout>

## The Algorithm

A Lamport Clock is just a simple mathematical integer counter.

1. **Local Increment:** Every time a process does *anything*, it mathematically increments its local counter by 1.
2. **Piggybacking:** When Process A sends a network message to Process B, it attaches its current counter value (e.g., \`T=5\`).
3. **Synchronization:** When Process B receives the message, it looks at the attached timestamp (\`5\`). It updates its own local counter to be mathematically greater than *both* its current value and the received value: \`counter = MAX(local_counter, received_time) + 1\`.

This mathematically guarantees that if Event A caused Event B, the timestamp of A will always be strictly less than B.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/Vector clocks/index.mdx': `---
title: Vector Clocks
description: An algorithm for generating a partial ordering of events in a distributed system and detecting causality violations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vector Clocks">

Lamport Clocks have a mathematical flaw: If Event A has timestamp \`5\` and Event B has timestamp \`10\`, Lamport guarantees that A *might* have caused B, but it cannot mathematically prove it. They might be completely independent events that just happened to get those numbers.

**Vector Clocks** mathematically solve this. Instead of a single integer, every node in the cluster maintains an entire array (a vector) of integers—one for every node in the system.

<Callout icon="warning" title="Conflict Detection (DynamoDB)">
  Vector clocks are the exact mathematical foundation of Amazon DynamoDB's conflict resolution. If two users simultaneously update the same shopping cart on different servers, the system uses the vector clock to mathematically prove there was a "Concurrent Write" conflict, forcing the application to resolve it.
</Callout>

## The Algorithm

Imagine a 3-Node cluster. Every node has an array: \`[0, 0, 0]\`.

1. **Local Action:** If Node 0 does work, it increments its own slot: \`[1, 0, 0]\`.
2. **Sending a Message:** Node 0 sends a message to Node 1, attaching \`[1, 0, 0]\`.
3. **Receiving a Message:** Node 1 receives it, and mathematically takes the \`MAX()\` of every single slot in the array independently: \`[MAX(1,0), MAX(0,0), MAX(0,0)]\`. Then it increments its own slot. The new vector on Node 1 is \`[1, 1, 0]\`.

By mathematically comparing the arrays later, a database can definitively prove if one array is a direct ancestor of another, or if they branched off concurrently (a conflict).

</ConceptTemplate>
`,
}

async function generateMega72() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega72().catch(console.error)
