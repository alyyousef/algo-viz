import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Event-driven systems/index.mdx': `---
title: Event-Driven Systems
description: A software architecture paradigm promoting the production, detection, consumption of, and reaction to events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event-Driven Systems">

In a traditional **Request-Driven** architecture, services synchronously command each other to do things (e.g., the Checkout Service mathematically commands the Email Service: "Send this receipt now!"). This creates tight mathematical coupling and brittle systems.

In an **Event-Driven** architecture, services don't command each other. Instead, they simply announce that something happened in the past (e.g., "Checkout #123 Completed"). They broadcast this event to a central nervous system (a message broker), and they do not care who listens.

<Callout icon="success" title="The Power of Decoupling">
  If you want to add a new "Fraud Detection" microservice later, you don't need to rewrite the Checkout Service to call it. The Fraud service simply subscribes to the existing "Checkout Completed" events. The Checkout Service remains completely unaware of its existence.
</Callout>

## Core Components

<ComparisonTable 
  headers={['Component', 'Role', 'Example']}
  rows={[
    ['Event Producer', 'The entity that mathematically detects a state change and fires the event.', 'The Shopping Cart Microservice.'],
    ['Event Broker', 'The central mathematical router that accepts the event and distributes it to interested parties.', 'Apache Kafka, RabbitMQ, AWS EventBridge.'],
    ['Event Consumer', 'The independent entity that mathematically reacts to the event.', 'The Inventory Management Service.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Event streams/index.mdx': `---
title: Event Streams
description: The continuous, unbounded flow of data records that represent events occurring in real-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event Streams">

A traditional Message Queue (like RabbitMQ) treats messages as transient tasks: once a worker processes the "Send Email" message, the queue mathematically deletes it.

An **Event Stream** (like Apache Kafka) fundamentally alters this paradigm. A stream is an **immutable, append-only log**. Events are mathematically written to a physical hard drive in strict chronological order and are *never* deleted when read.

<Callout icon="tip" title="Event Sourcing">
  Because the stream is immutable and persistent, the stream itself mathematically becomes the Source of Truth. Instead of storing the current state of a bank account ($100), you store the *stream of events* (+$50, +$100, -$50). To find the balance, you simply replay the stream.
</Callout>

## Stream Mechanics

1. **Immutability:** Once an event is written to the log, it mathematically cannot be changed. If you made a mistake, you must append a new "Correction Event".
2. **Replayability:** A brand new microservice spun up today can mathematically "Rewind the Tape" to the beginning of the year, replaying every single business event to perfectly reconstruct its database state.
3. **Consumer Offsets:** Because the broker doesn't delete messages, it is the Consumer's responsibility to mathematically track its own "cursor" (offset) in the log.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Exactly-once-at-least-once delivery semantics/index.mdx': `---
title: Message Delivery Semantics
description: The mathematical guarantees provided by a messaging system regarding how many times a message will be delivered to a consumer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Message Delivery Semantics">

When sending data over an unreliable network, packets will drop. A message broker must mathematically decide how to handle failure. 

There are exactly three mathematical paradigms for message delivery:

<ComparisonTable 
  headers={['Semantic', 'Guarantee', 'Mathematical Reality']}
  rows={[
    ['At-Most-Once (Fire and Forget)', 'The message is delivered 0 or 1 times. It will never be duplicated, but it might be lost entirely.', 'The sender fires the packet and never waits for an ACK. Used for IoT sensor telemetry where dropping a single temperature reading doesn\\'t matter.'],
    ['At-Least-Once', 'The message is delivered 1 or more times. It will never be lost, but it might be duplicated.', 'The sender fires the packet and waits for an ACK. If the ACK times out, the sender fires it again. If the original packet actually succeeded and only the ACK was lost, the consumer mathematically receives the message twice.'],
    ['Exactly-Once', 'The Holy Grail. The message is processed exactly 1 time. No losses, no duplicates.', 'Mathematically impossible to achieve purely via the network. It requires building complex Idempotency Keys into both the Producer and Consumer logic.']
  ]}
/>

<Callout icon="warning" title="The Idempotency Requirement">
  Because "Exactly-Once" is mathematically a myth at the network level, you *must* design your consumers to be **Idempotent**. If a consumer receives the "Charge Credit Card $50" message twice, the consumer's mathematical logic must recognize the duplicate UUID and gracefully ignore the second message.
</Callout>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/ActiveMQ/index.mdx': `---
title: Apache ActiveMQ
description: An open-source, multi-protocol, Java-based message broker.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Apache ActiveMQ"
  subtitle="The legacy enterprise message broker"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/41/ActiveMQ_logo.svg"
  description="ActiveMQ is one of the oldest and most mature open-source message brokers. Written in Java, it was the backbone of Enterprise Service Bus (ESB) architectures for over a decade."
  yearCreated={2004}
  creator="LogicBlaze (now Apache)"
  isOpenSource={true}
  websiteUrl="https://activemq.apache.org/"
>

ActiveMQ was built in an era when monolithic Java Enterprise applications needed a reliable way to communicate. It mathematically implements the Java Message Service (JMS) API flawlessly.

While modern startups almost exclusively choose Kafka or RabbitMQ, ActiveMQ is still mathematically powering thousands of legacy banking and telecom systems worldwide.

## Key Features

- **JMS Compliance:** The absolute gold standard for mathematically implementing the JMS 1.1 and 2.0 specifications.
- **Protocol Support:** It speaks mathematically every language: AMQP, MQTT, OpenWire, STOMP, and even REST.
- **ActiveMQ Artemis:** The modern, high-performance rewrite of ActiveMQ, designed to handle non-blocking asynchronous IO to compete with modern brokers.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/AWS SNS/index.mdx': `---
title: Amazon Simple Notification Service (SNS)
description: A fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Amazon SNS"
  subtitle="The cloud-native Pub/Sub engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"
  description="AWS SNS is Amazon's fully managed Pub/Sub messaging service. It is designed for massive mathematical fan-out, taking one incoming message and broadcasting it to millions of subscribers instantly."
  yearCreated={2010}
  creator="Amazon Web Services"
  isOpenSource={false}
  websiteUrl="https://aws.amazon.com/sns/"
>

SNS is purely a **Push-Based** system. When you publish a message to an SNS "Topic", SNS immediately mathematically pushes that message to all registered subscribers.

<Callout icon="warning" title="No Persistence">
  SNS is NOT a queue. If an HTTP subscriber is mathematically offline when SNS pushes the message, that message is permanently lost. This is why SNS is almost always paired directly with SQS.
</Callout>

## The SNS-to-SQS Pattern

This is the most common mathematical architectural pattern in AWS:

1. **Publish:** The Checkout microservice publishes an event to the \`Orders\` SNS Topic.
2. **Fan-Out:** SNS pushes the event to 3 different SQS Queues (one for Email, one for Inventory, one for Analytics).
3. **Queueing:** The SQS queues mathematically persist the message to disk, allowing the worker microservices to pull the data reliably at their own pace.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/AWS SQS/index.mdx': `---
title: Amazon Simple Queue Service (SQS)
description: A fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Amazon SQS"
  subtitle="The oldest and most reliable AWS service"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"
  description="SQS was actually the very first AWS service ever launched (predating EC2 and S3). It is a bulletproof, fully managed distributed message queue designed to mathematically guarantee decoupling."
  yearCreated={2004}
  creator="Amazon Web Services"
  isOpenSource={false}
  websiteUrl="https://aws.amazon.com/sqs/"
>

Unlike SNS, which pushes data, SQS is mathematically a **Pull-Based** system. Consumers must constantly ask SQS: *"Do you have any new messages for me?"* (known as Polling).

## Core Mechanisms

- **Visibility Timeout:** When a worker mathematically pulls a message from SQS, SQS hides that message from all other workers for a set time (e.g., 30 seconds). If the worker successfully processes it, it mathematically deletes the message. If the worker crashes, the timeout expires, and the message magically re-appears in the queue for another worker to grab.
- **Standard Queues:** Offers near-infinite mathematical throughput (100,000+ msgs/sec), but only guarantees *At-Least-Once* delivery, meaning you might get duplicates.
- **FIFO Queues:** Mathematically guarantees *Exactly-Once* processing and strict chronological ordering, but is severely limited in throughput (usually maxing out at 3,000 msgs/sec).

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Azure Event Hubs/index.mdx': `---
title: Azure Event Hubs
description: A big data streaming platform and event ingestion service capable of receiving and processing millions of events per second.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Azure Event Hubs"
  subtitle="Microsoft's answer to Apache Kafka"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
  description="Azure Event Hubs is a fully managed, real-time data ingestion service that is mathematically equivalent to Apache Kafka. It is designed to stream millions of events per second from telemetry and IoT devices."
  yearCreated={2014}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://azure.microsoft.com/en-us/services/event-hubs/"
>

If you are building an IoT platform tracking the real-time speed of 100,000 delivery trucks, a traditional message queue (like Service Bus) will mathematically melt under the load.

Event Hubs uses a **Partitioned Consumer Pattern**. It mathematically divides the incoming firehose of data into chunks (partitions), allowing multiple consumer servers to read the stream in parallel.

<Callout icon="tip" title="Kafka Compatibility">
  Microsoft mathematically engineered Event Hubs to expose a native Kafka API endpoint. You can take an existing application written for Apache Kafka, point the connection string at Azure Event Hubs, and it will work perfectly without changing a single line of code.
</Callout>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Azure Service Bus/index.mdx': `---
title: Azure Service Bus
description: A fully managed enterprise message broker with message queues and publish-subscribe topics.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Azure Service Bus"
  subtitle="Enterprise-grade reliable messaging"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
  description="While Azure Event Hubs is built for massive Big Data telemetry streams, Azure Service Bus is built for high-value enterprise business transactions (like processing credit card orders) where absolute mathematical reliability is required."
  yearCreated={2010}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://azure.microsoft.com/en-us/services/service-bus/"
>

Service Bus is the Azure equivalent of combining AWS SQS (Queues) and AWS SNS (Topics) into a single, cohesive enterprise product. 

It heavily relies on the **AMQP 1.0** protocol and provides advanced mathematical guarantees that simple brokers lack.

## Enterprise Features

- **Message Sessions:** Allows you to mathematically group a series of related messages together (e.g., all events for "Order #123") and guarantee they are processed strictly in chronological order by a single consumer.
- **Dead-Lettering:** Built-in mathematical routing for "poison messages" that fail to process after X attempts, moving them to a secure queue for human inspection.
- **Scheduled Delivery:** You can mathematically instruct the broker: "Hold this message in RAM, and do not make it visible to consumers until exactly 3:00 PM tomorrow."

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Google Pub-Sub/index.mdx': `---
title: Google Cloud Pub/Sub
description: An asynchronous and scalable messaging service that decouples services producing messages from services processing those messages.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Google Cloud Pub/Sub"
  subtitle="Global-scale asynchronous messaging"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png"
  description="Google Cloud Pub/Sub is GCP's fully managed real-time messaging service. It seamlessly merges the mathematical properties of a message queue (worker distribution) with an event stream (massive fan-out) into a single product."
  yearCreated={2015}
  creator="Google"
  isOpenSource={false}
  websiteUrl="https://cloud.google.com/pubsub"
>

Unlike AWS, which forces you to mathematically stitch together SNS (Topics) and SQS (Queues), Google built Pub/Sub to handle both paradigms natively.

<Callout icon="success" title="Global by Default">
  In AWS, an SQS queue is mathematically locked to a specific geographic region (e.g., \`us-east-1\`). Google Pub/Sub is a globally distributed system. You publish a message to a single topic, and Google's private fiber network instantly routes it to subscribers in Tokyo, London, and New York simultaneously.
</Callout>

## Mathematical Guarantees

- Pub/Sub mathematically guarantees **At-Least-Once** delivery.
- It provides built-in message storage (retention) for up to 31 days, allowing consumers to "replay" unacknowledged messages.
- It seamlessly integrates with Google Dataflow, allowing you to run complex mathematical streaming SQL analytics directly on the messages as they fly through the broker.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/NATS/index.mdx': `---
title: NATS
description: A connective technology built for the ever increasingly hyper-connected world. It is a single technology that enables applications to securely communicate across any combination of cloud vendors.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="NATS"
  subtitle="The ultra-lightweight, lightning-fast broker"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/NATS_Logo.svg/512px-NATS_Logo.svg.png"
  description="Written in Go, NATS is a connective technology designed to be incredibly simple, unbelievably fast, and highly secure. It is increasingly popular in Kubernetes and Edge computing environments."
  yearCreated={2010}
  creator="Derek Collison"
  isOpenSource={true}
  websiteUrl="https://nats.io/"
>

If Apache Kafka is a massive, complex freight train, NATS is a lightweight mathematical bullet train. A NATS server binary is less than 15MB, boots up in milliseconds, and can mathematically route millions of messages per second on a single CPU core.

## The NATS Philosophy

Core NATS mathematically adheres to the **At-Most-Once** (Fire and Forget) delivery model. It is designed as a pure "dial-tone" for microservices. If the network drops a packet, NATS does not care. It is built for absolute speed.

### JetStream

Because enterprise users eventually need mathematical guarantees, the creators built **JetStream** as an add-on to NATS. 

JetStream adds disk persistence, mathematically turning NATS into a highly available Event Stream (competing with Kafka) with *At-Least-Once* and *Exactly-Once* guarantees, while retaining its incredibly lightweight footprint.

</TechnologyTemplate>
`,
}

async function generateMega74() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega74().catch(console.error)
