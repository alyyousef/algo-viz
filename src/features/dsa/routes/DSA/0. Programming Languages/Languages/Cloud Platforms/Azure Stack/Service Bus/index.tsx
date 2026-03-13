import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { JSX, MouseEvent } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type NarrativeSection = {
  id: string
  heading: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pageTitle = 'Azure Service Bus'
const pageSubtitle =
  'Managed enterprise message broker for durable queues, pub-sub topics, sessions, transactions, and reliable asynchronous integration.'

const introParagraphs = [
  "Azure Service Bus is Microsoft Azure's managed messaging broker for business-critical asynchronous communication. It provides durable queues and topics, brokered delivery semantics, dead-lettering, scheduling, duplicate detection, sessions for ordered workflows, and transactional features that help decouple services without giving up operational control over delivery behavior.",
  'The service is best understood as a reliable enterprise message bus, not as a generic event firehose and not as a simple storage queue. It is designed for command processing, workload buffering, multi-step workflows, back-end integration, request handoff, and publish-subscribe distribution where message durability, controlled settlement, retry behavior, and broker-side features matter.',
  'This page treats Azure Service Bus as a systems and platform topic: namespaces and tiers, queues, topics and subscriptions, settlement modes, locks, dead-letter queues, sessions, duplicate detection, transactions, autoforwarding, protocols, security, private connectivity, geo-recovery, cost, operational patterns, and the design tradeoffs that determine when Service Bus is the right broker and when another messaging service is a better fit.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Azure Service Bus is a brokered messaging service. Senders submit messages to a queue or topic, the broker durably stores those messages, and receivers pull and settle them according to explicit delivery semantics. This allows producers and consumers to run at different speeds, fail independently, and evolve separately while the broker preserves work in between.',
      'The key distinction is that Service Bus is not only transport. It also enforces delivery state, message locking, expiration, dead lettering, duplicate detection windows, ordering scopes through sessions, and routing through topics and subscriptions. Those broker behaviors are why teams choose it for operational workflows rather than only convenience messaging.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Service Bus when business operations must survive retries, temporary outages, receiver crashes, and rate mismatches between systems. Common examples include order processing, payment and fulfillment workflows, background jobs, command queues, claims processing, ticket creation, integration between SaaS and internal systems, and fan-out to multiple bounded consumers with subscription filters.',
      'It is also useful when the receiving side must control completion explicitly. A worker can receive a message, lock it, do the work, and then choose to complete, abandon, defer, or dead-letter it. That control is a major reason Service Bus remains relevant even when lighter messaging services exist.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The right mental model is durable work coordination through a broker. A sender is declaring that some unit of work or information transfer should happen asynchronously and reliably. The queue or subscription becomes the source of truth for work awaiting handling, while the consumer and its settlement behavior determine when the business operation is actually done.',
      'A healthy Service Bus design begins with message contract boundaries, idempotency assumptions, ordering needs, duplicate tolerance, throughput expectations, failure modes, and retry policy. Teams that start from client code alone often under-design the broker topology and then discover too late that sessions, subscriptions, dead-letter handling, or transaction boundaries should have been planned earlier.',
    ],
  },
  {
    title: 'Tiers and product direction',
    paragraphs: [
      'Service Bus is commonly discussed in Basic, Standard, and Premium tiers. Basic is intentionally limited. Standard supports the core queue and topic model with many broker features. Premium adds dedicated resources through messaging units, stronger isolation, JMS support scenarios, larger-scale enterprise patterns, and the features most teams reach for when they need predictable performance and higher-end networking or disaster recovery options.',
      'Current Microsoft guidance also matters operationally because there is a specific retirement deadline on September 30, 2026 for older Service Bus SDKs such as WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, alongside support ending for the SBMP protocol. New and maintained designs should be on the current Azure SDKs and AMQP-based paths well before that date.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      'The current Microsoft Learn material as checked on March 13, 2026 puts notable emphasis on Premium capabilities such as Geo-Replication, Private Link networking, and JMS 2.0 support, while also continuing to clarify reliability guidance around Geo-Disaster Recovery and failover planning. That reflects a product direction toward enterprise-grade isolation and regional resilience rather than only basic queue hosting.',
      'The documentation also now repeatedly highlights the September 30, 2026 retirement date for older SDKs and SBMP. That is not a minor note. It affects library choices, protocol assumptions, and modernization plans for any long-lived Service Bus integration still using the legacy client stack.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Namespace is the broker boundary',
    detail:
      'A namespace is the top-level resource that holds queues, topics, subscriptions, networking configuration, authentication, and tier-based capacity properties.',
  },
  {
    title: 'Queue is one-to-one work distribution',
    detail:
      'Each message is consumed by one receiver, making queues suitable for task distribution, buffering, and competing-consumer workloads.',
  },
  {
    title: 'Topic plus subscriptions is one-to-many distribution',
    detail:
      'A topic accepts one published message and fan-outs copies to subscriptions, each of which behaves much like a virtual queue.',
  },
  {
    title: 'Settlement is the reliability contract',
    detail:
      'Receivers explicitly complete, abandon, defer, or dead-letter messages, which is central to delivery correctness and retry behavior.',
  },
  {
    title: 'Sessions are the ordering scope',
    detail:
      'Session-enabled entities group related messages and allow ordered, mutually exclusive processing for that session key.',
  },
  {
    title: 'DLQ is the failure holding area',
    detail:
      'Dead-letter queues retain messages that expired, exceeded delivery attempts, or failed processing so operators can inspect and handle them deliberately.',
  },
]

const fitGuide = [
  {
    title: 'Need durable asynchronous commands or jobs with explicit completion semantics',
    choice: 'Azure Service Bus is a strong fit.',
  },
  {
    title: 'Need pub-sub fan-out with filters and independent receivers',
    choice: 'Topics and subscriptions are designed for that pattern.',
  },
  {
    title: 'Need ordered handling for related work items',
    choice: 'Sessions are a major reason to choose Service Bus.',
  },
  {
    title: 'Need very high-throughput telemetry or log ingestion',
    choice: 'Event Hubs is often a better fit than Service Bus.',
  },
  {
    title: 'Need lightweight storage-backed queueing at minimal cost with fewer broker features',
    choice: 'Azure Queue Storage may be simpler than Service Bus.',
  },
  {
    title: 'Need push-style event notification rather than brokered work coordination',
    choice: 'Event Grid may be a better fit than Service Bus.',
  },
]

const keyTakeaways = [
  'Service Bus is an enterprise message broker with explicit delivery state, not just a queue API.',
  'Queues, topics, subscriptions, sessions, DLQs, and settlement semantics are the main design vocabulary.',
  'Idempotency and dead-letter handling are still application responsibilities even though the broker is durable.',
  'Premium matters when isolation, JMS, Private Link, or stronger disaster recovery features are required.',
  'The legacy Service Bus SDKs and SBMP protocol reach retirement on September 30, 2026, so current Azure SDKs and AMQP should be the default path.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-namespace',
    heading: 'Namespaces, Tiers, and the Capacity Boundary',
    paragraphs: [
      'A Service Bus namespace is the top-level administrative and runtime boundary. It contains queues, topics, and subscriptions, along with authentication settings, network controls, and any tier-specific performance or isolation characteristics. Namespace placement matters because limits, networking, disaster recovery topology, and governance all attach here rather than to individual messages.',
      'Tier choice changes the architecture. Basic is intentionally sparse. Standard supports the mainstream broker features used by many business applications. Premium allocates dedicated messaging resources through messaging units, supports more demanding enterprise scenarios, and is the tier to reach for when predictable isolation, private networking patterns, or advanced recovery features are essential.',
      'This means teams should choose the namespace and tier boundary deliberately. Treating namespaces as disposable buckets creates drift and governance problems, while over-consolidating unrelated systems into one namespace can create noisy-neighbor risk, quota pressure, and unpleasant migration work later.',
    ],
  },
  {
    id: 'core-entities',
    heading: 'Queues, Topics, Subscriptions, and When to Use Each',
    paragraphs: [
      'Queues provide one-to-one message consumption. A sender places a message into the queue, and one competing receiver ultimately processes it. This is the right fit for work distribution, command execution, background processing, and any pattern where only one worker should own the message outcome.',
      'Topics and subscriptions provide one-to-many distribution. A sender publishes once to the topic, and each subscription receives its own copy subject to filter rules. This allows multiple downstream systems to react independently without the sender knowing who they all are. A billing system, analytics pipeline, notifications processor, and fraud workflow can all subscribe to the same business event without tight coupling at the publisher.',
      'Subscriptions behave like virtual queues. They preserve many of the same receive and settlement patterns as queues, which is why Service Bus topics are often easier to operationalize than bespoke fan-out logic built in application code.',
    ],
  },
  {
    id: 'core-settlement',
    heading: 'Receive Modes, Locks, Completion, Abandon, Defer, and Dead-Letter',
    paragraphs: [
      'Service Bus supports receive-and-delete and peek-lock style consumption. Receive-and-delete is fast but blunt: once the broker hands out the message, it is gone. Peek-lock is the normal production mode because it lets a receiver lock a message, attempt work, and then explicitly settle it when the outcome is known.',
      'Settlement choices matter. Complete marks the work item as done. Abandon releases the lock so the message can be retried. Defer sets the message aside for later retrieval when the application knows it cannot process it yet but does not consider it poison. Dead-letter moves the message to the dead-letter queue with reason metadata so it stops cycling through normal delivery.',
      "The lock model is one of Service Bus's core strengths, but it does not remove the need for idempotent handlers. A lock can expire, the process can crash after the side effect but before completion, or the network can break during settlement. Application handlers must be prepared for retries and duplicates even in well-designed systems.",
    ],
  },
  {
    id: 'core-sessions',
    heading: 'Sessions, FIFO Thinking, and Ordered Workflow Processing',
    paragraphs: [
      'Sessions allow Service Bus to group related messages by session identifier and deliver them under an exclusive session lock. This is the mechanism used when ordered handling matters for a logical stream such as a customer workflow, order lifecycle, or saga-like process.',
      'It is important to be precise here: Service Bus is not a global ordering service. Sessions create scoped ordering for related messages. If the system requires all messages across the entire queue to process in one single total order, that is usually a sign that the workload is serialized too broadly. Sessions work best when each business key defines its own ordered lane.',
      'Sessions are also stateful in an operational sense. A receiver can accept a session, process its messages in order, and use session state to persist workflow context. That makes Service Bus useful for long-running coordination patterns without forcing every state transition into a separate database round trip.',
    ],
  },
  {
    id: 'core-advanced-delivery',
    heading: 'Scheduling, TTL, Dead-Letter Queues, Deferral, and Duplicate Detection',
    paragraphs: [
      'Advanced delivery features are where Service Bus becomes more than a simple queue. Messages can be scheduled for future delivery, given a time-to-live, deferred when temporarily unprocessable, automatically dead-lettered on expiration or repeated delivery failures, and protected by duplicate detection windows in supported tiers.',
      'The dead-letter queue is especially important operationally. It is not a trash can to ignore. It is where poison messages, repeatedly failing workflows, expired commands, or malformed payloads accumulate for inspection and remediation. Production teams need explicit runbooks for DLQ inspection, re-drive, alerting, and data retention.',
      'Duplicate detection is valuable when sender retries leave uncertainty about whether a prior send actually succeeded. But it should be understood as a broker-side safety window, not a replacement for application idempotency. Outside that configured window, or across different business conditions, duplicates can still exist and must be tolerated correctly.',
    ],
  },
  {
    id: 'core-routing',
    heading: 'Subscription Filters, Actions, and Broker-Side Message Routing',
    paragraphs: [
      'Topics support subscription rules that filter which messages land in each subscription and can optionally annotate those messages through actions. This allows a single published stream to be partitioned into consumer-specific views without requiring the publisher to send many separate messages.',
      'This is useful when multiple bounded contexts care about different slices of the same event set. For example, a high-value order may go to fraud review, while all orders go to billing, and only retail-region orders go to a specific fulfillment system. Subscription rules let the broker own that fan-out and filtering behavior.',
      'The tradeoff is governance. Complex rule sets scattered across subscriptions can become hidden application logic. Teams should keep filters deliberate, documented, and observable rather than letting business routing disappear into forgotten broker configuration.',
    ],
  },
  {
    id: 'core-transactions',
    heading: 'Transactions, Autoforwarding, and Coordinated Messaging Work',
    paragraphs: [
      'Service Bus supports transactions for a set of messaging operations, which matters when the system needs all-or-nothing behavior around send, complete, abandon, dead-letter, or transfer operations. This is especially useful when processing one message must atomically emit another message or move the workflow forward only if the current step is settled correctly.',
      'Autoforwarding can chain entities so that messages arriving at one queue or subscription are forwarded to another queue or topic. This can simplify staging or fan-in patterns, but it should not be treated as an excuse to build opaque chains that nobody can reason about. Microsoft documentation also notes functional constraints such as autoforwarding not being supported for session-enabled queues or subscriptions.',
      'The right approach is to use broker features to simplify a clear topology, not to create a maze. If understanding where a message ultimately goes requires reading five chained entities and several transactions, the design likely needs to be simplified.',
    ],
  },
  {
    id: 'core-protocols',
    heading: 'Protocols, Clients, AMQP, HTTPS, JMS, and the 2026 Retirement Deadline',
    paragraphs: [
      'AMQP 1.0 is the primary protocol model for Service Bus and the correct default for modern clients. HTTPS and REST are available for some scenarios, but serious brokered messaging work is generally built on the current Azure SDKs over AMQP.',
      'Premium also supports JMS 1.1 and JMS 2.0 scenarios for Java workloads, which matters in enterprise migration and integration cases where JMS is already the application model. That support makes Service Bus viable in environments that need to preserve Java messaging semantics while moving to Azure-managed infrastructure.',
      'The current Microsoft documentation is explicit that older libraries such as WindowsAzure.ServiceBus, Microsoft.Azure.ServiceBus, and com.microsoft.azure.servicebus, along with the SBMP protocol, reach retirement on September 30, 2026. Designs that still depend on those paths have a concrete modernization deadline, not an abstract future recommendation.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, Entra ID, SAS, Managed Identity, and Private Connectivity',
    paragraphs: [
      'Service Bus supports Shared Access Signatures and Microsoft Entra ID role-based access control, with managed identities fitting naturally for Azure-hosted applications. Modern application designs should prefer Entra-backed identity and managed identities where possible rather than distributing long-lived shared keys across many services.',
      'Network security also matters. Private endpoints, firewall posture, and newer network security perimeter guidance allow a namespace to be constrained beyond raw credential checks. If a high-value messaging backbone is reachable broadly from the internet, the security model is weaker than it needs to be.',
      'Good Service Bus security is therefore identity plus network control plus least privilege. Sender, receiver, operator, and observability roles should not all share one broad connection string with namespace-wide power.',
    ],
  },
  {
    id: 'core-reliability',
    heading: 'Reliability, Geo-Disaster Recovery, Geo-Replication, and Regional Design',
    paragraphs: [
      'Regional resilience in Service Bus requires understanding that not all disaster recovery features are identical. Geo-Disaster Recovery focuses on namespace metadata pairing and alias-based failover. Geo-Replication, according to current Microsoft documentation, replicates both metadata and message data and is positioned as a Premium capability for stronger outage insulation.',
      'That distinction matters. Some systems only need a namespace failover model and can tolerate message movement or recovery complexity. Others need stronger continuity of broker state and in-flight data. The right answer depends on recovery objectives, business impact of message loss or delay, and how much topology complexity the team can actually operate.',
      'Private endpoints also complicate regional failover and must be planned on both sides of a paired or replicated design. Disaster recovery for Service Bus is not finished when the namespace objects exist in a second region. Clients, DNS, private connectivity, and application failover behavior all need to be designed and tested together.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Throughput, Partitioning, Quotas, and Performance Tuning',
    paragraphs: [
      'Performance in Service Bus is shaped by tier, entity design, concurrency, message size, session usage, transaction behavior, and whether the namespace has dedicated Premium capacity. Standard is often enough for typical business workflows, but Premium becomes attractive when latency consistency, isolation, or sustained throughput matter materially.',
      'Partitioning can improve resilience and scale characteristics for certain workloads, but it interacts with other features such as duplicate detection and sessions. Microsoft documentation explicitly notes uniqueness behavior changes when partitioning is enabled, which means partition choice is not a hidden implementation detail; it affects correctness assumptions.',
      'Teams should also design with current quotas and entity limits in mind. A messaging topology that looks elegant in a whiteboard diagram may behave poorly if it creates too many entities, overly large messages, excessive dead-letter growth, or too many session hot spots in one namespace.',
    ],
  },
  {
    id: 'core-ops',
    heading: 'Monitoring, Insights, and Day-2 Operations',
    paragraphs: [
      'Operating Service Bus well means monitoring active messages, dead-letter counts, transfer queues, throttling behavior, connection trends, and processing latency, not only whether the namespace exists. Azure Monitor insights and diagnostic logs should be part of the normal observability path for any production namespace.',
      'The most useful operational signals usually come from the combination of broker and application metrics: queue depth, age of oldest message, completion rate, dead-letter inflow, handler failure rate, and recovery time after incidents. Queue length by itself is not enough. A deep queue can be fine for a batch system and disastrous for a low-latency command workflow.',
      'Runbooks should cover DLQ inspection, replay policy, poison-message triage, lock-lost troubleshooting, credential rotation or Entra assignment issues, failover procedures, and client library version policy. These concerns are not rare edge cases; they are normal broker operations.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Choosing the Right Tier',
    paragraphs: [
      'Service Bus cost follows tier and usage shape rather than only message count. Standard is often enough for many business systems, while Premium charges for dedicated messaging units that buy performance isolation and advanced capability headroom. The cheapest architecture on paper is not necessarily the cheapest architecture after operational failures, retries, and downtime are considered.',
      'The real question is which tier matches the business criticality and behavior of the system. If a workload needs Private Link, JMS support, more predictable throughput, or stronger disaster recovery options, Premium often becomes the rational choice. If the workload is modest and mostly needs durable async processing, Standard may be entirely appropriate.',
      'Do not choose only from intuition. Estimate entity count, peak backlog, concurrency, average and maximum message size, retry behavior, regional posture, and dead-letter handling expectations before locking in the design.',
    ],
  },
]

const compareNotes = [
  {
    title: 'Service Bus vs Azure Queue Storage',
    detail:
      'Queue Storage is simpler and cheaper for basic asynchronous work, but Service Bus offers richer broker semantics such as topics, subscriptions, sessions, transactions, duplicate detection, and dead-letter management.',
  },
  {
    title: 'Service Bus vs Event Grid',
    detail:
      'Event Grid is optimized for event notification and reactive integration, not brokered command processing with explicit settlement and durable pull-based consumption.',
  },
  {
    title: 'Service Bus vs Event Hubs',
    detail:
      'Event Hubs is for high-throughput event streaming and log-style ingestion. Service Bus is for enterprise messaging workflows where broker features and controlled delivery semantics matter more than stream throughput.',
  },
  {
    title: 'Service Bus vs RabbitMQ or self-managed brokers',
    detail:
      'Self-managed brokers offer flexibility and ecosystem portability, but Service Bus removes broker operations, integrates deeply with Azure identity and networking, and provides managed durability and platform tooling.',
  },
]

const designPatterns = [
  {
    title: 'Competing consumers for background jobs',
    detail:
      'Use a queue with peek-lock receivers so multiple workers compete for tasks while each message is processed by only one worker.',
  },
  {
    title: 'Business event fan-out',
    detail:
      'Publish once to a topic and let subscriptions feed downstream billing, analytics, notifications, and audit systems independently.',
  },
  {
    title: 'Per-aggregate ordered processing',
    detail:
      'Use sessions keyed by order ID, account ID, or workflow ID to preserve ordered handling without serializing the entire system.',
  },
  {
    title: 'Retry with poison-message isolation',
    detail:
      'Let transient failures retry through lock release or abandon, and route repeated failures into the DLQ for investigation rather than endless redelivery.',
  },
  {
    title: 'Transactional workflow handoff',
    detail:
      'Complete an inbound message and send the next stage message in one transaction when a multi-step process must move forward atomically.',
  },
]

const operationalChecklist = [
  'Choose queue versus topic based on ownership semantics before writing client code.',
  'Define message IDs, idempotency rules, and duplicate tolerance before enabling retries.',
  'Use DLQ monitoring and replay procedures as a first-class production concern.',
  'Adopt current Azure SDKs and AMQP now if any legacy SDK or SBMP usage still exists.',
  'Use sessions only where ordered handling is truly needed, not as a default on every entity.',
  'Prefer Entra ID and managed identities over broad shared connection strings when possible.',
  'Review quota and tier implications before concentrating many entities into one namespace.',
  'Test disaster recovery and private connectivity assumptions rather than only configuring them.',
]

const pitfalls = [
  'Treating Service Bus like a simple queue and ignoring settlement, retries, and dead-letter behavior.',
  'Assuming duplicate detection removes the need for idempotent consumers.',
  'Using sessions everywhere and accidentally creating hot ordered lanes that throttle throughput.',
  'Ignoring the DLQ until production incidents make recovery urgent and manual.',
  'Building opaque autoforward or topic-rule topologies that nobody can reason about.',
  'Keeping legacy SDKs or SBMP in production past the September 30, 2026 retirement deadline.',
  'Leaving access on broad SAS keys when managed identity and RBAC are feasible.',
]
const examples: ExampleSection[] = [
  {
    id: 'example-csharp-send',
    title: 'C# Example for Sending a Command Message',
    code: `
using Azure.Messaging.ServiceBus;

var client = new ServiceBusClient(connectionString);
var sender = client.CreateSender("orders");

var message = new ServiceBusMessage("{\"orderId\":\"A1024\",\"action\":\"reserve-inventory\"}")
{
    MessageId = "order-A1024-reserve",
    Subject = "OrderCommand",
    CorrelationId = "checkout-7f84"
};

await sender.SendMessageAsync(message);
`,
    explanation:
      'This uses the current Azure SDK and sets identifiers that help with tracing and idempotency. In real systems the payload contract, message ID strategy, and correlation strategy should be defined centrally rather than ad hoc.',
  },
  {
    id: 'example-csharp-receive',
    title: 'C# Peek-Lock Receiver with Explicit Settlement',
    code: `
using Azure.Messaging.ServiceBus;

var client = new ServiceBusClient(connectionString);
var processor = client.CreateProcessor("orders", new ServiceBusProcessorOptions
{
    AutoCompleteMessages = false,
    MaxConcurrentCalls = 8
});

processor.ProcessMessageAsync += async args =>
{
    try
    {
        await HandleOrderAsync(args.Message);
        await args.CompleteMessageAsync(args.Message);
    }
    catch (KnownBusinessException ex)
    {
        await args.DeadLetterMessageAsync(args.Message, "BusinessRule", ex.Message);
    }
    catch
    {
        await args.AbandonMessageAsync(args.Message);
    }
};

processor.ProcessErrorAsync += args =>
{
    LogError(args.Exception);
    return Task.CompletedTask;
};

await processor.StartProcessingAsync();
`,
    explanation:
      'This shows the operationally important pattern: process under lock, then settle explicitly. Business-poison messages move to the DLQ, while transient failures are retried through abandon semantics.',
  },
  {
    id: 'example-topic-filter',
    title: 'Azure CLI Example for a Topic Subscription with a SQL Filter',
    code: `
az servicebus namespace create \
  --resource-group rg-messaging \
  --name sb-prod \
  --sku Premium

az servicebus topic create \
  --resource-group rg-messaging \
  --namespace-name sb-prod \
  --name orders

az servicebus topic subscription create \
  --resource-group rg-messaging \
  --namespace-name sb-prod \
  --topic-name orders \
  --name fraud-review

az servicebus topic subscription rule create \
  --resource-group rg-messaging \
  --namespace-name sb-prod \
  --topic-name orders \
  --subscription-name fraud-review \
  --name HighValueOrders \
  --filter-sql-expression "amount >= 1000"
`,
    explanation:
      'The broker can route messages to consumer-specific subscriptions without requiring the publisher to understand every downstream consumer. That is one of the cleanest reasons to use topics rather than custom fan-out code.',
  },
  {
    id: 'example-session',
    title: 'Session-Aware Pattern for Ordered Processing',
    code: `
message.SessionId = orderId;

await sender.SendMessageAsync(message);

var processor = client.CreateSessionProcessor("order-workflow", new ServiceBusSessionProcessorOptions
{
    AutoCompleteMessages = false,
    MaxConcurrentSessions = 16,
    MaxConcurrentCallsPerSession = 1
});
`,
    explanation:
      'The key idea is scoped ordering. Messages for one order are processed sequentially within that session while other orders can proceed in parallel across other sessions.',
  },
]

const glossaryTerms = [
  {
    term: 'Namespace',
    definition:
      'The top-level Azure Service Bus resource containing entities, networking settings, authentication configuration, and tier capacity.',
  },
  {
    term: 'Queue',
    definition:
      'A one-to-one brokered entity where each message is ultimately processed by a single receiver.',
  },
  {
    term: 'Topic',
    definition: 'A publish-subscribe entity that fan-outs messages to one or more subscriptions.',
  },
  {
    term: 'Subscription',
    definition:
      'A durable view of a topic that receives messages according to its rules and behaves much like a queue for consumers.',
  },
  {
    term: 'Peek-Lock',
    definition:
      'A receive mode in which the broker locks a message for processing and requires explicit settlement by the receiver.',
  },
  {
    term: 'Dead-Letter Queue',
    definition:
      'A holding area for messages that could not be processed normally because of expiration, repeated failures, or explicit dead-lettering.',
  },
  {
    term: 'Session',
    definition:
      'A grouping identifier that gives ordered, exclusive processing semantics to related messages.',
  },
  {
    term: 'Duplicate Detection',
    definition:
      'A broker feature that suppresses repeated sends of the same message ID within a configured time window.',
  },
  {
    term: 'Messaging Unit',
    definition:
      'A Premium tier capacity unit that provides dedicated broker resources for a namespace.',
  },
  {
    term: 'Geo-Disaster Recovery',
    definition:
      'A paired-namespace failover model centered on metadata recovery and alias-based switchover.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/advanced-features-overview',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-sessions',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-transactions',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-geo-disaster-recovery',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-geo-replication',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/private-link-service',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/network-security-perimeter',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quotas',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-performance-improvements',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-migrate-2026',
  'https://learn.microsoft.com/en-us/azure/service-bus-messaging/jms-developer-guide',
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-namespace', label: 'Namespaces and Tiers' },
    { id: 'core-entities', label: 'Queues and Topics' },
    { id: 'core-settlement', label: 'Settlement' },
    { id: 'core-sessions', label: 'Sessions' },
    { id: 'core-advanced-delivery', label: 'Advanced Delivery' },
    { id: 'core-routing', label: 'Filters and Routing' },
    { id: 'core-transactions', label: 'Transactions' },
    { id: 'core-protocols', label: 'Protocols and SDKs' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-reliability', label: 'Reliability and DR' },
    { id: 'core-performance', label: 'Performance and Quotas' },
    { id: 'core-ops', label: 'Operations' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-service-bus-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-service-bus-help-page .win98-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.azure-service-bus-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-service-bus-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-service-bus-help-page .win98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.azure-service-bus-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-service-bus-help-page .win98-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.azure-service-bus-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-service-bus-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-service-bus-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-service-bus-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-service-bus-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-service-bus-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-service-bus-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-service-bus-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-service-bus-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-service-bus-help-page .win98-content p,
.azure-service-bus-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-service-bus-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-service-bus-help-page .win98-content ul,
.azure-service-bus-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-service-bus-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-service-bus-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-service-bus-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-service-bus-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-service-bus-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-service-bus-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-service-bus-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureServiceBusPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromSearch(location.search))

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const url = new URL(window.location.href)
    const nextSearch = new URLSearchParams(url.search)
    const shouldClearHash = url.hash.length > 0
    if (nextSearch.get('tab') !== activeTab || shouldClearHash) {
      nextSearch.set('tab', activeTab)
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel])

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)
    if (!currentHash) {
      return
    }

    const container = contentRef.current
    const target = document.getElementById(currentHash)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })
  }, [activeTab])

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) {
      return
    }

    setActiveTab(tabId)
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })

    const url = new URL(window.location.href)
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="azure-service-bus-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main ref={contentRef} className="win98-content">
            <h1 className="win98-doc-title">{pageTitle}</h1>
            <p className="win98-doc-subtitle">{pageSubtitle}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="win98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="win98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-model" className="win98-section">
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="win98-divider" />

                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-ops-checklist" className="win98-section">
                  <h2 className="win98-heading">Operational Checklist</h2>
                  <ul>
                    {operationalChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="win98-section">
                    <h2 className="win98-heading">{example.title}</h2>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-sources" className="win98-section">
                  <h2 className="win98-heading">Primary Sources</h2>
                  <p>
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure Service Bus features, quotas, networking, and
                    retirement guidance can change, so production decisions should always be
                    revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
