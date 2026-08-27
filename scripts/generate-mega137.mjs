import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/ActiveMQ/index.mdx': `---
title: Apache ActiveMQ
description: "A popular, open-source, multi-protocol, Java-based message broker that fully implements the Java Message Service (JMS) API, providing reliable, asynchronous communication for enterprise enterprise applications."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Apache ActiveMQ"
  subtitle="The Enterprise Message Broker"
  tags={['System Design', 'Messaging', 'Java', 'Architecture']}
>

Before modern distributed stream processing platforms like Kafka took over, traditional Message Brokers like ActiveMQ (and RabbitMQ) formed the backbone of enterprise messaging.

## 1. Traditional Message Brokering
ActiveMQ is designed for "Smart Broker, Dumb Consumer" architectures.
When a Microservice sends a message to an ActiveMQ Queue, the broker is mathematically responsible for knowing exactly which consumers have read the message. Once the consumer processes the message and sends an TICK1ACKTICK1 (acknowledgement), ActiveMQ physically deletes the message from the queue. This mathematically guarantees that a specific task (like "Process Payment #123") is executed exactly once by exactly one worker.

## 2. Multi-Protocol Support
Because it is a legacy enterprise tool, ActiveMQ's greatest strength is its mathematical flexibility. It acts as a universal translator.
A legacy Java monolith can send a message using the strict JMS (Java Message Service) API. ActiveMQ receives it, and mathematically translates it so a modern Node.js microservice can read it using AMQP, STOMP, or MQTT protocols, allowing wildly different architectural eras to communicate seamlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/AWS SNS/index.mdx': `---
title: AWS SNS (Simple Notification Service)
description: "A fully managed, highly available Pub/Sub messaging service provided by Amazon Web Services, mathematically designed for pushing high-throughput messages to massive numbers of distributed subscribers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="AWS SNS (Simple Notification Service)"
  subtitle="Cloud-Native Pub/Sub"
  tags={['System Design', 'AWS', 'Messaging', 'Cloud']}
>

In a Microservice architecture, an "Order Service" needs to announce "Order Created" to the "Shipping Service", the "Email Service", and the "Inventory Service." If the Order Service calls them via synchronous HTTP REST APIs, it becomes mathematically tightly coupled to all three.

## 1. The Pub/Sub Paradigm
AWS SNS solves this using the Publish/Subscribe (Pub/Sub) pattern.
The Order Service (Publisher) mathematically does not know who is listening. It simply publishes a single JSON message to an SNS "Topic" named TICK1order_createdTICK1.
The Shipping, Email, and Inventory services (Subscribers) have all mathematically attached themselves to that Topic. SNS instantly "fans out" the message, pushing a perfect mathematical clone of the message to all three services simultaneously.

## 2. Fan-Out to SQS
SNS is a "Push" mechanism. It attempts to mathematically push the message to the subscriber. If the Email Service is temporarily offline, the message might be lost.
To prevent this, architects use the **SNS-to-SQS Fan-Out Pattern**.
Instead of subscribing the microservices directly to SNS, you subscribe AWS SQS Queues to the SNS Topic. SNS pushes the message to the SQS Queues. The microservices then pull the messages from their respective queues at their own pace, mathematically guaranteeing 100% reliable delivery even if the microservices go offline.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/AWS SQS/index.mdx': `---
title: AWS SQS (Simple Queue Service)
description: "A fully managed message queuing service by Amazon Web Services that mathematically decouples microservices and distributed systems, allowing them to communicate asynchronously via a highly reliable polling mechanism."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="AWS SQS (Simple Queue Service)"
  subtitle="Cloud-Native Message Queuing"
  tags={['System Design', 'AWS', 'Messaging', 'Cloud']}
>

AWS SQS is the oldest AWS service (launched in 2004, before EC2 or S3). It solves a fundamental mathematical problem in distributed systems: temporary load spikes.

## 1. The Polling Mechanism
Unlike SNS (which pushes messages), SQS is a "Pull" mechanism.
If a video processing API suddenly receives 10,000 video uploads in one second, the backend servers will crash.
Instead, the API gateway simply drops all 10,000 requests into an SQS Queue as JSON messages. SQS can mathematically absorb infinite throughput.
Behind the queue, a cluster of 5 backend worker servers actively **polls** the SQS queue, pulling 1 message at a time, processing the video, and deleting the message. The system mathematically levels out the massive load spike into a manageable, steady stream of work.

## 2. Visibility Timeout
When Worker A pulls a message from SQS, the message is not immediately deleted. SQS mathematically initiates a **Visibility Timeout** (e.g., 30 seconds). During this time, the message becomes "invisible" to Worker B and Worker C.
If Worker A successfully processes the video, it sends a DELETE API call to SQS.
If Worker A crashes mid-processing, it never sends the DELETE call. The 30-second timer mathematically expires, and the message suddenly becomes visible in the queue again, allowing Worker B to safely retry the job, mathematically guaranteeing no data is lost.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Azure Event Hubs/index.mdx': `---
title: Azure Event Hubs
description: "A highly scalable data streaming platform and event ingestion service in Microsoft Azure, mathematically capable of receiving and processing millions of events per second, designed as Microsoft's equivalent to Apache Kafka."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Azure Event Hubs"
  subtitle="Massive Scale Event Ingestion"
  tags={['System Design', 'Azure', 'Streaming', 'Big Data']}
>

If you are building an IoT architecture with 10 million smart thermostats sending temperature data every second, a standard message queue (like Azure Service Bus or AWS SQS) will mathematically collapse under the load. 

## 1. The Append-Only Log
Event Hubs is not a Message Broker; it is a **Stream Processing Platform** (architecturally identical to Kafka).
Instead of tracking which specific consumer read which specific message (which requires massive database locks), Event Hubs is a simple, distributed, append-only log.
When 10 million thermostats send data, Event Hubs mathematically blasts the data onto disk sequentially across multiple partitions. It does not delete the data when read; the data stays on disk for a configured retention period (e.g., 7 days).

## 2. Consumer Checkpointing
Because the data is not deleted, the mathematical responsibility shifts to the Consumer.
The Consumer must keep track of its own "Offset" (the index number of the last message it read). If the Consumer crashes at offset 5,000, it restarts, reads its local checkpoint, and mathematically asks Event Hubs: *"Give me everything from offset 5,001."* This allows multiple different analytics teams to mathematically replay the exact same stream of data from the beginning of time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Azure Service Bus/index.mdx': `---
title: Azure Service Bus
description: "A fully managed, highly reliable enterprise message broker in Microsoft Azure, providing complex Pub/Sub routing, strict ordering, and ACID-compliant transactional messaging for decoupling mission-critical microservices."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Azure Service Bus"
  subtitle="The Enterprise Cloud Broker"
  tags={['System Design', 'Azure', 'Messaging', 'Enterprise']}
>

While Azure Event Hubs is designed for massive, high-throughput Big Data streams (like Kafka), **Azure Service Bus** is designed for high-value, complex enterprise messaging (like RabbitMQ or ActiveMQ).

## 1. High-Value vs High-Volume
Use Event Hubs for telemetry (TICK1Temperature=72TICK1). If you lose one message out of 10 million, the math averages out.
Use Service Bus for financial transactions (TICK1Transfer $5,000TICK1). If you lose one message, the business mathematically fails.
Service Bus provides deep mathematical guarantees:
- **Strict FIFO Ordering**: Guarantees messages are processed in the exact mathematical order they were sent.
- **Dead-Letter Queues (DLQ)**: If a message repeatedly causes the consumer to crash (a "poison pill"), Service Bus mathematically quarantines the message in a DLQ for human inspection, rather than letting it block the queue.

## 2. Advanced Routing (Topics and Subscriptions)
Unlike AWS (which forces you to glue SNS to SQS for fan-out), Azure Service Bus mathematically combines them into a single entity: Topics and Subscriptions.
A publisher sends a message to a Topic. Multiple Subscriptions pull from that Topic. Crucially, Subscriptions can have mathematical **SQL Filters**. You can route messages where TICK1Amount > 10000TICK1 to the "Fraud Detection" subscription, and all others to the standard "Processing" subscription, moving complex routing logic out of your code and into the cloud infrastructure.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Event streams/index.mdx': `---
title: Event Streams
description: "An architectural data paradigm where information is modeled as a continuous, mathematically unbounded sequence of immutable events ordered by time, rather than discrete rows in a static relational database."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Event Streams"
  subtitle="Data in Constant Motion"
  tags={['System Design', 'Streaming', 'Architecture', 'Data']}
>

Historically, software engineering treated data as static state. You query a database table, and it returns a mathematically finite set of rows representing the "current" state of the world.

## 1. The Unbounded Log
**Event Streaming** mathematically inverts this paradigm. Data is not a static pool; it is a river.
Instead of storing TICK1{ User: Alice, Balance: 100 }TICK1, an Event Stream stores the immutable history of exactly how that state was reached:
1. TICK1UserCreated(Alice)TICK1
2. TICK1Deposited(50)TICK1
3. TICK1Deposited(50)TICK1
This stream of events is mathematically append-only and unbounded (it theoretically never ends).

## 2. Stream Processing
In a traditional architecture, a nightly batch job (like Hadoop) wakes up at 3:00 AM, queries the static database, and mathematically calculates the daily analytics.
In an Event Streaming architecture (using Kafka, Flink, or Spark Streaming), the analytics engine mathematically processes the data *as it flows through the network in real-time*. When a user clicks a button, the event enters the stream, and the real-time analytics dashboard updates 10 milliseconds later, enabling instant fraud detection, live recommendations, and real-time algorithmic trading.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Event-driven systems/index.mdx': `---
title: Event-Driven Architecture (EDA)
description: "A dominant software architecture paradigm promoting the production, detection, and consumption of events, mathematically decoupling services by having them react to state changes rather than relying on synchronous API calls."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Event-Driven Architecture (EDA)"
  subtitle="Reacting to State Changes"
  tags={['System Design', 'Architecture', 'Microservices', 'Messaging']}
>

In a standard Synchronous Microservice Architecture, if the User Service creates a user, it must execute a synchronous REST API call to the Email Service to send the welcome email.
If the Email Service is mathematically offline, the User Service HTTP request times out, and the entire user creation process fails. This is catastrophic tight coupling.

## 1. The Asynchronous Decoupling
In an **Event-Driven Architecture**, the User Service mathematically does not know the Email Service exists.
When a user is created, the User Service simply publishes a JSON message (an "Event") to a central Message Broker (like Kafka or RabbitMQ) saying: TICK1{ "event": "UserCreated", "userId": 123 }TICK1.
The User Service instantly returns a success response to the frontend.

## 2. Event Choreography
The Email Service is mathematically subscribed to the TICK1UserCreatedTICK1 event. It pulls the event from the broker and sends the email asynchronously in the background.
If the Email Service is offline, the broker simply holds the event safely on disk. When the Email Service boots back up 3 hours later, it pulls the event and sends the email. The system is mathematically resilient, fault-tolerant, and perfectly decoupled.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Exactly-once-at-least-once delivery semantics/index.mdx': `---
title: Delivery Semantics
description: "The three mathematical guarantees (At-Most-Once, At-Least-Once, Exactly-Once) that govern how messaging systems handle network failures, dictating the ultimate architectural reliability of distributed communications."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Delivery Semantics"
  subtitle="The Math of Network Reliability"
  tags={['System Design', 'Messaging', 'Distributed Systems', 'Architecture']}
>

When Server A sends a message to Server B over a TCP network, the network might drop the message, or it might drop the ACK (acknowledgement) returning to Server A. Messaging systems must mathematically choose how to handle this uncertainty.

## 1. At-Most-Once (Fire and Forget)
The publisher sends the message exactly once and mathematically never retries.
- **Result**: Some messages will be permanently lost due to network blips.
- **Use Case**: Telemetry data, video frame streaming. (If you lose 1 frame of a 60fps video, nobody cares).

## 2. At-Least-Once (The Standard)
The publisher sends the message. If it doesn't receive an ACK within 5 seconds, it mathematically assumes the message was lost and sends it again.
- **Result**: No messages are lost, but consumers will mathematically receive **Duplicates** (if the original message arrived, but only the ACK was lost).
- **Use Case**: 99% of all message queues (AWS SQS, RabbitMQ). To survive this, the Consumer *must* be mathematically Idempotent (able to process the same message twice safely).

## 3. Exactly-Once (The Holy Grail)
The system guarantees the message is delivered and processed mathematically exactly one time, with zero data loss and zero duplicates.
- **Reality**: In distributed systems, true network-level Exactly-Once delivery is mathematically impossible (the Two Generals' Problem). However, systems like Kafka achieve *effective* Exactly-Once semantics by combining At-Least-Once delivery with strict Transactional IDs, mathematically deduplicating the data on the server side.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/Google Pub-Sub/index.mdx': `---
title: Google Cloud Pub/Sub
description: "A fully-managed, highly scalable real-time messaging service provided by Google Cloud, mathematically designed to ingest and distribute massive streams of data with extremely low latency and high durability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Google Cloud Pub/Sub"
  subtitle="Global-Scale Messaging"
  tags={['System Design', 'GCP', 'Messaging', 'Cloud']}
>

Google Cloud Pub/Sub is mathematically designed to combine the "Push" fan-out capabilities of AWS SNS with the "Pull" queueing durability of AWS SQS into a single, globally scalable service.

## 1. Global by Default
Unlike AWS (which strictly ties SQS queues to a specific geographic Region like TICK1us-east-1TICK1), Google Pub/Sub is mathematically global.
You publish an event to a single Topic, and Google's internal fiber-optic network automatically routes that message to subscribers sitting in data centers in Tokyo, London, and New York. The architecture mathematically abstracts away regional boundaries.

## 2. Push and Pull Subscriptions
When a Topic receives a message, it distributes it to Subscriptions. Google Pub/Sub mathematically supports both modes:
- **Pull Subscriptions**: Your microservices actively poll the subscription (like AWS SQS). Excellent for throttling heavy workloads.
- **Push Subscriptions**: Google Pub/Sub actively fires an HTTP POST request to your microservice's web server (like AWS SNS or Webhooks). Excellent for serverless architectures (like Google Cloud Functions), because the HTTP request mathematically wakes up the serverless function instantly without requiring a background polling daemon.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/43. System Design & Distributed Systems/43.3 Messaging & Streaming/NATS/index.mdx': `---
title: NATS
description: "A lightweight, high-performance, open-source messaging system written in Go, mathematically engineered for extreme simplicity, lightning-fast pub/sub, and decentralized cloud-native microservice communication."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="NATS"
  subtitle="Hyper-Fast Nervous System for Microservices"
  tags={['System Design', 'Messaging', 'Golang', 'Architecture']}
>

If Kafka is a massive, heavy freight train designed to permanently store petabytes of data, NATS is a mathematical fiber-optic cable designed strictly for extreme speed and low latency.

## 1. Extreme Simplicity (Core NATS)
Core NATS is a pure "Fire and Forget" (At-Most-Once) Pub/Sub system.
It mathematically does not use the hard drive. It keeps everything in RAM.
Because it avoids the extreme overhead of disk I/O and complex locking mechanisms, a single NATS server can mathematically route **millions of messages per second** with microsecond latency. It acts as the high-speed nervous system connecting Kubernetes microservices.

## 2. JetStream (Persistence)
Historically, if a NATS subscriber was offline, the message was mathematically lost forever.
To solve this, NATS introduced **JetStream**. JetStream adds mathematical persistence (writing to disk), At-Least-Once delivery guarantees, and stream replay (like Kafka), while maintaining a much smaller, easier-to-manage architectural footprint than a massive Zookeeper/Kafka JVM cluster.

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
