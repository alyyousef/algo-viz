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

const pageTitle = 'GCP Pub/Sub'
const pageSubtitle =
  'Managed asynchronous messaging for event fan-out, decoupled systems, streaming ingestion, and durable background delivery on Google Cloud.'

const introParagraphs = [
  'Google Cloud Pub/Sub is Google Cloud\'s managed asynchronous messaging service. It sits between producers and consumers so systems can exchange events without requiring the publisher to know which subscriber is online, how quickly it processes work, or even how many downstream consumers exist. That decoupling is the real architectural value. Messaging is only the mechanism.',
  'A Pub/Sub design begins with topics and subscriptions, but real production design goes deeper: pull versus push delivery, retention and replay strategy, dead-letter handling, filtering, ordering, exactly-once delivery boundaries, schema validation, export subscriptions, IAM, and observability. Teams that treat it as just a queue often miss the product\'s actual strengths and its operational edge cases.',
  'This page treats Pub/Sub as a platform component rather than a single API call. The goal is to explain where Pub/Sub fits in a GCP architecture, how delivery actually behaves, what the subscription types mean, how to reason about retries and replay, and when Pub/Sub is the right choice versus Cloud Tasks, Eventarc, or a different integration pattern entirely.',
]

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Pub/Sub is a managed, durable messaging service for asynchronous communication between systems. Publishers send messages to a topic. Subscribers consume those messages through subscriptions attached to that topic. The publisher does not send directly to the worker, webhook, analytics sink, or downstream service. It publishes once, and Pub/Sub handles delivery to each subscription independently.',
      'That independent subscription model is what makes Pub/Sub much more than a queue. A single published event can drive transactional processing, analytics export, audit capture, monitoring pipelines, and downstream enrichment at the same time, with each subscriber managing its own backlog, retry behavior, acknowledgement state, and failure handling.',
    ],
  },
  {
    title: 'Core mental model',
    paragraphs: [
      'The cleanest mental model is topic as event stream entry point and subscription as delivery contract. Topics receive messages. Subscriptions define how each consumer class sees those messages. A single topic can have many subscriptions, and each subscription is effectively its own view of delivery progress over the topic.',
      'This means backlog is per subscription, not per topic. A slow analytics subscription does not block a fast operational worker subscription. A broken push endpoint can fall behind while a streaming pull worker stays healthy. That separation is one of the biggest reasons Pub/Sub is attractive for fan-out architectures.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Pub/Sub to decouple systems in time, ownership, and scaling. Producers can publish events during traffic spikes without waiting for every downstream consumer. Consumers can scale horizontally, fail independently, or be added later. Platform teams can evolve architecture without rewriting every synchronous integration point.',
      'Pub/Sub is also valuable because it fits many delivery styles. Some consumers use pull or StreamingPull workers. Some use authenticated push webhooks. Some export directly to BigQuery or Cloud Storage. Some need ordered handling by entity key. Some need replay after a bug fix. Pub/Sub offers a common transport layer across those patterns.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'Pub/Sub is strong when an architecture is event-driven, fan-out oriented, bursty, or naturally asynchronous. It fits transaction event propagation, background processing, telemetry ingestion, audit pipelines, workflow triggers, data replication pipelines, and integration boundaries between independently deployable services.',
      'It also fits when teams want durable decoupling without running their own broker fleet. The Google-managed service removes broker operations, partition balancing, and node maintenance from the application team, while still exposing meaningful control over subscriptions, retries, replay, filtering, schemas, and delivery semantics.',
    ],
  },
  {
    title: 'When it is the wrong tool',
    paragraphs: [
      'Pub/Sub is not automatically the best answer for all background work. If a system needs per-task scheduling, explicit countdown delays, strong worker ownership of a single task queue, or request-level execution control, Cloud Tasks is often the better fit. If the need is higher-level event routing from Google event sources to destinations such as Cloud Run or Workflows, Eventarc can be the better abstraction.',
      'Pub/Sub is also a poor fit when a team secretly wants synchronous RPC with an event label on top. Event-driven systems require idempotency, retry tolerance, failure isolation, backlog visibility, and schema discipline. If those design habits are missing, Pub/Sub will expose that weakness rather than hide it.',
    ],
  },
]

const deliveryGuide = [
  {
    title: 'Pull and StreamingPull subscriptions',
    summary:
      'Best for worker fleets that need direct control over concurrency, flow control, acknowledgement timing, batching, and backpressure.',
    details: [
      'Ordinary pull works well for simple polling patterns and controlled batch fetch loops.',
      'StreamingPull is the common high-throughput worker pattern because it avoids constant request polling overhead.',
      'Exactly-once delivery is available only for pull-style subscriptions, not push export styles.',
    ],
  },
  {
    title: 'Push subscriptions',
    summary:
      'Best when Pub/Sub should deliver directly to an HTTPS endpoint and the consumer prefers inbound webhooks over polling workers.',
    details: [
      'Push delivery depends on endpoint availability and response handling.',
      'Authenticated push requests can include a JWT that the receiver validates.',
      'Push simplifies consumer infrastructure but gives less direct control than pull workers.',
    ],
  },
  {
    title: 'BigQuery subscriptions',
    summary:
      'Best when the main goal is to write topic data directly into analytics tables without building a separate consumer application.',
    details: [
      'Useful for event capture, reporting pipelines, and downstream SQL analysis.',
      'BigQuery subscriptions are at-least-once, so downstream logic still needs duplicate awareness.',
      'Schema discipline matters because the subscription is writing into a table contract rather than just delivering opaque bytes.',
    ],
  },
  {
    title: 'Cloud Storage subscriptions',
    summary:
      'Best when the main goal is durable object export for archival, batch processing, or later offline analysis.',
    details: [
      'Useful for raw event retention outside operational consumers.',
      'The storage target becomes a data sink rather than an interactive message consumer.',
      'This is often paired with operational subscriptions on the same topic so one publish feeds both processing and archival needs.',
    ],
  },
]

const lifecycleFlow = [
  'A publisher sends a message to a topic with a payload and optional attributes, ordering key, or schema-compatible structure.',
  'Pub/Sub durably stores the published message and makes it available to each subscription attached to that topic.',
  'Each subscription applies its own delivery model, filters, retry policy, retention settings, dead-letter behavior, and acknowledgement lifecycle.',
  'Consumers receive messages through pull, StreamingPull, push, BigQuery export, or Cloud Storage export depending on the subscription type.',
  'Successful handling results in an acknowledgement or equivalent successful delivery state; failure leads to redelivery, retry backoff, or eventual dead-letter routing if configured.',
  'Operators can later inspect backlog, replay with seek, recover with snapshots, or add new subscriptions so future events fan out to new consumers without changing the publisher.',
]

const fitGuide = [
  {
    title: 'Need asynchronous fan-out from one producer to many independent consumers',
    choice: 'Use Pub/Sub.',
  },
  {
    title: 'Need durable event transport with pull workers, push webhooks, and analytics export from the same event source',
    choice: 'Pub/Sub is a strong fit because subscriptions provide separate delivery contracts over one topic.',
  },
  {
    title: 'Need explicit deferred task execution with countdown scheduling and queue-by-queue worker control',
    choice: 'Prefer Cloud Tasks over Pub/Sub.',
  },
  {
    title: 'Need Google event routing and trigger orchestration more than raw messaging',
    choice: 'Consider Eventarc as the higher-level event-routing abstraction.',
  },
  {
    title: 'Need synchronous request-response or immediate transactional confirmation from a downstream service',
    choice: 'Use a direct API or RPC path instead of pretending Pub/Sub is synchronous.',
  },
]
const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-architecture',
    heading: 'Architecture, Durability, and Delivery Semantics',
    paragraphs: [
      'Pub/Sub is fundamentally an asynchronous transport layer. The publisher emits an event to a topic and does not wait for every subscriber to finish business logic. That makes producer and consumer lifecycles independent, which is why Pub/Sub absorbs bursts and allows downstream systems to scale at different speeds.',
      'The default delivery model is at-least-once. A consumer must expect duplicate delivery and make handlers idempotent. Message acknowledgement is the dividing line: until the message is acknowledged successfully for a subscription, Pub/Sub can redeliver it. That is a feature, not a bug. Reliability comes from durable storage plus retry, not from assuming exactly one perfect first delivery.',
      'This delivery model changes how systems should be designed. Consumers should treat messages as retriable work items backed by durable event history. Side effects such as database updates, emails, or external API calls need deduplication strategy, idempotency keys, or state checks so redelivery does not produce corrupt outcomes.',
    ],
  },
  {
    id: 'core-topics',
    heading: 'Topics, Messages, Attributes, and Event Shape',
    paragraphs: [
      'A topic is the named entry point that publishers target. A message consists of a data payload plus optional attributes. Attributes are especially important because filters, routing choices, downstream categorization, and debugging often depend on them. A payload alone is usually not enough for a healthy event contract.',
      'Published messages also carry service-managed metadata such as a message ID and publish time. Application teams often add domain identifiers such as order ID, tenant ID, or event type inside the payload or attributes. Those identifiers are essential for traceability, deduplication, and ordering strategies.',
      'Good event shape design matters more than many teams expect. A Pub/Sub topic that mixes unrelated event types with unclear attributes, no schema discipline, and no versioning strategy quickly becomes expensive to consume. A topic is not just transport. It is part of the interface contract between teams and systems.',
    ],
  },
  {
    id: 'core-subscriptions',
    heading: 'Subscriptions and Fan-Out Delivery',
    paragraphs: [
      'Subscriptions are where delivery semantics actually live. Each subscription attached to a topic receives its own copy of every matching message and maintains its own acknowledgement state. This means one topic can drive many downstream systems without coupling their runtime behavior to one another.',
      'That independence is central to Pub/Sub architecture. A fast pull worker, a slow push webhook, a BigQuery export, and a Cloud Storage archive can all subscribe to the same topic. Each one sees the message stream through its own contract rather than sharing a single consumer offset or queue state.',
      'The practical result is cleaner platform boundaries. Publishers publish once. Subscriber teams own their own subscription configuration, replay behavior, backlog response, and failure handling. The moment a team thinks about Pub/Sub this way, the service starts looking less like a queue and more like a delivery fabric.',
    ],
  },
  {
    id: 'core-delivery',
    heading: 'Pull, StreamingPull, Push, BigQuery, and Cloud Storage Delivery Modes',
    paragraphs: [
      'Pull delivery lets consumers request messages directly. It offers strong control over fetch loops, worker concurrency, and acknowledgement timing. StreamingPull is the high-throughput evolution of that model and is the usual choice for long-running worker services because the client library maintains a stream rather than repeatedly polling.',
      'Push delivery reverses the direction: Pub/Sub sends messages to an HTTPS endpoint. This is convenient for services that want webhook-style integration instead of persistent worker infrastructure. The tradeoff is reduced control over flow management and greater dependence on endpoint response behavior, network reachability, and push authentication configuration.',
      'BigQuery and Cloud Storage subscriptions turn Pub/Sub into an export path rather than an application callback path. BigQuery subscriptions write to tables for analytics. Cloud Storage subscriptions write objects for archival or batch processing. These are operationally different from workers, but they still inherit the same topic-centered event architecture.',
    ],
  },
  {
    id: 'core-acks',
    heading: 'Acknowledgement Deadlines, Lease Management, and Redelivery',
    paragraphs: [
      'The acknowledgement deadline is the window in which a subscriber is expected to confirm successful processing. Pub/Sub defaults the subscription acknowledgement deadline to 10 seconds, and the service supports acknowledgement deadlines from 10 to 600 seconds. That deadline should reflect realistic processing behavior, not wishful thinking.',
      'High-level client libraries often handle lease management automatically by extending acknowledgement deadlines while a handler is still running. That helps for long-running processing, but it does not remove the need to understand delivery timing. If a consumer crashes or misses the lease extension window, Pub/Sub can redeliver the message.',
      'Nack and acknowledgement timeout are both effectively signals for retry. Redelivery is normal. Consumer logic should be built around safe reprocessing and visibility into attempts, backlog age, and poisoned messages rather than around the assumption that a message will only ever show up once.',
    ],
  },
  {
    id: 'core-ordering',
    heading: 'Message Ordering and Exactly-Once Delivery',
    paragraphs: [
      'Pub/Sub supports ordered delivery using ordering keys. Messages that share an ordering key are delivered in order for that key, which is useful for per-entity workflows such as account updates, shopping-cart state changes, or event streams tied to a single business object. Ordered delivery is not a global ordering guarantee across all messages in a topic.',
      'Ordering has operational constraints. Ordered publishing and ordered subscription handling should stay within the same region, and throughput is bounded per ordering key. The design lesson is to choose keys that reflect true serialization needs rather than forcing unrelated traffic through one giant ordered lane.',
      'Exactly-once delivery is available for pull and StreamingPull subscriptions and is scoped to a cloud region. It helps reduce duplicate acknowledgement outcomes, but it does not remove the need for sound application design. Side effects, downstream APIs, and multi-system workflows can still require idempotency and careful state handling.',
    ],
  },
  {
    id: 'core-controls',
    heading: 'Filtering, Retry Policy, Dead-Letter Topics, and Failure Isolation',
    paragraphs: [
      'Subscription filters let a topic carry a broader event stream while each subscription receives only the subset it cares about. That is useful when teams want one publishing surface but many targeted downstream consumers. The important design point is that filtering happens at the subscription contract, not by asking publishers to know every consumer.',
      'Retry policy lets teams control redelivery backoff behavior, and dead-letter topics isolate messages that repeatedly fail. Without dead-letter strategy, poison messages can recycle through the same consumer indefinitely and hide more useful backlog signals. With dead-letter routing, a team gets a clear place to inspect, repair, or replay failed events.',
      'These features are what make Pub/Sub production-ready for messy real systems. Happy-path message delivery is easy. Operational quality comes from what happens when handlers are broken, dependencies are down, schemas drift, or a specific event permanently violates consumer expectations.',
    ],
  },
  {
    id: 'core-replay',
    heading: 'Retention, Subscription Expiration, Snapshots, Seek, and Replay',
    paragraphs: [
      'Pub/Sub retains unacknowledged messages for a subscription and can optionally retain acknowledged messages for replay use cases. The default message retention duration is 7 days, and the service supports retention from 10 minutes up to 31 days. Retention is a product capability, but it is also an architectural decision about recovery windows and operational cost.',
      'Subscription expiration is separate from message retention. Idle subscriptions can expire unless configured otherwise, and the default expiration policy is 31 days. That matters for temporary experiments, low-volume integrations, and disaster-recovery subscriptions that teams expect to keep around even when traffic is sparse.',
      'Snapshots capture the acknowledgement state of a subscription at a point in time. Seek lets a subscription move its delivery cursor to a snapshot or timestamp, which is how teams replay traffic after a bug fix, rehydrate a downstream system, or investigate historical behavior. Replay strategy is one of Pub/Sub\'s most important advantages over simpler queue models.',
    ],
  },
  {
    id: 'core-schemas',
    heading: 'Schemas, Validation, Revisions, and Single Message Transforms',
    paragraphs: [
      'Pub/Sub supports schemas so publishers can validate message structure against Avro or Protocol Buffer definitions. That changes a topic from being a bag of bytes into a governed contract. Schemas do not guarantee perfect data quality, but they do prevent many classes of producer drift and consumer breakage from entering the system unchecked.',
      'Schema revisions matter because event contracts evolve. A mature topic strategy includes versioning, compatibility expectations, and rollout planning so consumers can absorb change safely. Teams that ignore versioning often end up breaking downstream systems with what looked like a harmless producer update.',
      'Pub/Sub also supports single message transforms on topics and subscriptions. These transforms are useful for lightweight normalization, attribute enrichment, or format adjustment at the messaging layer. They should be treated as focused plumbing tools, not as a replacement for real application logic or data contracts.',
    ],
  },
  {
    id: 'core-security',
    heading: 'IAM, Push Authentication, and Access Boundaries',
    paragraphs: [
      'Security in Pub/Sub begins with IAM. Publishers need permission to publish to a topic. Subscribers need permission to consume from a subscription. Export subscriptions and push integrations often need additional service-account design so the writing or delivery path is explicit and auditable.',
      'Push subscriptions deserve particular scrutiny because they cross from managed messaging into application endpoints. Pub/Sub can send authenticated push requests, and receivers should verify the token, audience, and endpoint assumptions rather than trusting inbound traffic just because it appears to come from Google Cloud.',
      'The broader security lesson is that topic ownership, subscription ownership, and service-account usage should be treated as platform boundaries. If every team can create arbitrary subscriptions or publish into shared topics without contract review, the messaging layer becomes a security and governance blind spot.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Observability, Backlog Management, Throughput, and Cost',
    paragraphs: [
      'Operating Pub/Sub well requires visibility into backlog depth, oldest unacknowledged message age, acknowledgement latency, delivery attempts, push response status, dead-letter volume, and subscriber health. A topic can look healthy from the publisher side while a specific subscription is silently drowning in retries.',
      'Throughput tuning often comes down to batching, flow control, handler concurrency, and event shape. Ordering keys and exactly-once delivery are useful features, but they introduce tradeoffs and should be enabled because the business contract requires them, not because they sound safer in the abstract.',
      'Cost and performance are linked. Too many tiny topics, poor batching, noisy retries, excessive retention, or consumers that repeatedly nack the same poison traffic create operational waste. Pub/Sub is managed, but a poorly designed event topology still becomes expensive and hard to reason about.',
    ],
  },
]
const operationsNotes = [
  {
    title: 'Design for idempotency first',
    detail:
      'At-least-once delivery means duplicate messages are normal. Message handlers should tolerate replay without corrupting state or repeating unsafe side effects.',
  },
  {
    title: 'Make event types obvious',
    detail:
      'Use clear topic naming, structured attributes, and explicit schema or version signals so consumers can reason about what a message means.',
  },
  {
    title: 'Monitor backlog age, not just publish success',
    detail:
      'A successful publisher does not prove consumers are healthy. Subscription-specific lag is the operational metric that shows real delivery health.',
  },
  {
    title: 'Treat dead-letter topics as active workflows',
    detail:
      'A dead-letter topic is not a trash can. Someone should own inspection, replay decisions, and root-cause analysis for messages that land there.',
  },
  {
    title: 'Use filters carefully',
    detail:
      'Filters reduce downstream noise, but they also become part of the delivery contract. Keep the filter logic visible and aligned with event taxonomy.',
  },
  {
    title: 'Prefer pull workers for complex consumers',
    detail:
      'If a consumer needs precise concurrency, batching, flow control, or long processing windows, pull or StreamingPull usually offers better operational control than push.',
  },
]

const designPatterns = [
  {
    title: 'Operational plus analytics fan-out',
    detail:
      'Publish once to a topic, attach a pull subscription for operational processing, and add a BigQuery subscription for analytics without forcing the producer to know both consumers exist.',
  },
  {
    title: 'Event sourcing edge stream',
    detail:
      'Use Pub/Sub as the transport for domain events emitted by services, with per-team subscriptions that derive search indexes, notifications, or projections from the same source events.',
  },
  {
    title: 'Webhook simplification with push',
    detail:
      'Use authenticated push subscriptions when a service wants inbound HTTPS event delivery without maintaining a dedicated polling worker fleet.',
  },
  {
    title: 'Replayable bug-fix pipeline',
    detail:
      'Retain messages, snapshot acknowledgement state, and use seek to replay a subscription after fixing a broken consumer release or downstream data bug.',
  },
  {
    title: 'Filtered shared event bus',
    detail:
      'Use one topic for a related domain stream and attach filtered subscriptions so downstream teams only receive the event families they actually own.',
  },
  {
    title: 'Archival plus processing',
    detail:
      'Attach a Cloud Storage subscription for raw event retention while pull workers handle real-time processing from the same topic.',
  },
]

const compareNotes = [
  {
    title: 'Pub/Sub vs Cloud Tasks',
    detail:
      'Pub/Sub is event fan-out and asynchronous messaging. Cloud Tasks is explicit task dispatch with stronger queue-level execution control, scheduling semantics, and one-task-to-one-handler mental model.',
  },
  {
    title: 'Pub/Sub vs Eventarc',
    detail:
      'Pub/Sub is the messaging substrate. Eventarc is a higher-level event routing and trigger system that often uses Pub/Sub underneath but focuses on source-to-target event workflows.',
  },
  {
    title: 'Pub/Sub vs direct HTTP or RPC',
    detail:
      'HTTP and RPC are better when the caller needs immediate response semantics. Pub/Sub is better when producer and consumer should be decoupled in time and scaling.',
  },
  {
    title: 'Pub/Sub vs self-managed brokers',
    detail:
      'Self-managed brokers may offer deeper low-level control, but Pub/Sub removes infrastructure operations and integrates cleanly with Google Cloud identity, export sinks, and managed delivery features.',
  },
]

const pitfalls = [
  'Using Pub/Sub for work that actually needs request-response rather than asynchronous event handling.',
  'Building non-idempotent consumers and then acting surprised by duplicate delivery.',
  'Putting many unrelated event families into one topic with no schema discipline or attribute taxonomy.',
  'Ignoring backlog age until a subscriber falls far behind under traffic spikes.',
  'Creating push endpoints that do not verify authentication and audience correctly.',
  'Letting poison messages recycle forever because there is no dead-letter strategy.',
  'Enabling ordering when the application did not truly need serialization, then creating avoidable throughput bottlenecks.',
  'Assuming exactly-once delivery removes every need for downstream deduplication or workflow safety checks.',
]
const examples: ExampleSection[] = [
  {
    id: 'example-create-publish',
    title: 'Create a topic, create a pull subscription, and publish an event',
    code: `
gcloud pubsub topics create orders

gcloud pubsub subscriptions create orders-worker \
  --topic=orders

gcloud pubsub topics publish orders \
  --message='{"orderId":"A123","status":"CREATED"}' \
  --attribute=eventType=order.created,source=checkout
`,
    explanation:
      'This is the smallest useful Pub/Sub flow: a topic as the publish surface, a subscription as the delivery contract, and a published event with both payload and attributes so downstream systems can classify it cleanly.',
  },
  {
    id: 'example-filtered-dlq',
    title: 'Create a filtered subscription with dead-letter handling and retry backoff',
    code: `
gcloud pubsub topics create orders-dead-letter

gcloud pubsub subscriptions create order-created-worker \
  --topic=orders \
  --message-filter='attributes.eventType="order.created"' \
  --dead-letter-topic=orders-dead-letter \
  --max-delivery-attempts=10 \
  --min-retry-delay=10s \
  --max-retry-delay=300s
`,
    explanation:
      'This subscription only receives creation events, retries with bounded backoff, and isolates repeatedly failing messages into a dead-letter topic instead of cycling them forever through the main worker.',
  },
  {
    id: 'example-push',
    title: 'Create an authenticated push subscription',
    code: `
gcloud pubsub subscriptions create billing-webhook \
  --topic=billing-events \
  --push-endpoint=https://api.example.com/hooks/pubsub \
  --push-auth-service-account=pubsub-push@example-project.iam.gserviceaccount.com \
  --push-auth-token-audience=https://api.example.com/hooks/pubsub
`,
    explanation:
      'Push is useful when the consumer wants Pub/Sub to call an HTTPS endpoint directly. The receiving service should still verify the JWT and confirm the expected audience before trusting the request.',
  },
  {
    id: 'example-replay',
    title: 'Snapshot and replay a subscription after fixing a consumer bug',
    code: `
gcloud pubsub snapshots create orders-worker-snap \
  --subscription=orders-worker

gcloud pubsub subscriptions seek orders-worker \
  --snapshot=orders-worker-snap

gcloud pubsub subscriptions seek orders-worker \
  --time=2026-03-15T09:00:00Z
`,
    explanation:
      'Snapshots preserve acknowledgement state, while seek lets operators replay from a snapshot or timestamp. This is one of the strongest operational features in Pub/Sub because it turns subscriber recovery into an explicit workflow instead of an improvised incident response hack.',
  },
  {
    id: 'example-schema-consumer',
    title: 'Attach a schema to a topic and consume with a streaming worker',
    code: `
gcloud pubsub schemas create order-created-schema \
  --type=protocol-buffer \
  --definition-file=order_created.proto

gcloud pubsub topics create typed-orders \
  --schema=order-created-schema \
  --message-encoding=json
`,
    explanation:
      'Schema validation gives the topic a real contract boundary. In production that usually pairs with long-running pull or StreamingPull workers that ack only after successful, idempotent processing.',
  },
]

const glossaryTerms = [
  {
    term: 'Topic',
    definition:
      'The named resource that publishers write to. It is the event ingress point, not the backlog view for a consumer.',
  },
  {
    term: 'Subscription',
    definition:
      'The delivery contract attached to a topic. Each subscription has its own acknowledgement state, backlog, retry behavior, and delivery type.',
  },
  {
    term: 'Pull subscription',
    definition:
      'A subscription where the consumer requests messages directly from Pub/Sub and controls acknowledgement timing itself.',
  },
  {
    term: 'StreamingPull',
    definition:
      'A long-lived pull model used by client libraries for higher throughput and lower polling overhead.',
  },
  {
    term: 'Push subscription',
    definition:
      'A subscription where Pub/Sub sends messages to an HTTPS endpoint instead of waiting for a worker to pull them.',
  },
  {
    term: 'Ack deadline',
    definition:
      'The time window in which the subscriber should acknowledge successful processing before Pub/Sub becomes free to redeliver the message.',
  },
  {
    term: 'Dead-letter topic',
    definition:
      'A topic that receives messages which exceeded the configured delivery-attempt threshold on a subscription.',
  },
  {
    term: 'Ordering key',
    definition:
      'A publisher-supplied key that requests ordered delivery for related messages within that key, rather than across the entire topic.',
  },
  {
    term: 'Exactly-once delivery',
    definition:
      'A pull-subscription feature that strengthens acknowledgement semantics within a cloud region, but does not remove the need for sound downstream workflow design.',
  },
  {
    term: 'Filter',
    definition:
      'A subscription-level expression that restricts which messages from the topic are delivered to that subscription.',
  },
  {
    term: 'Snapshot',
    definition:
      'A saved acknowledgement state for a subscription that can later be used as a replay point with seek.',
  },
  {
    term: 'Seek',
    definition:
      'An operation that repositions a subscription to a snapshot or timestamp so previously retained messages can be replayed.',
  },
  {
    term: 'Schema',
    definition:
      'An Avro or Protocol Buffer contract that Pub/Sub can use to validate published messages for a topic.',
  },
  {
    term: 'Single message transform',
    definition:
      'A lightweight transformation applied by Pub/Sub on a topic or subscription to adjust or enrich messages in transit.',
  },
]

const pageSources = [
  'https://cloud.google.com/pubsub/docs/overview',
  'https://cloud.google.com/pubsub/docs/publish',
  'https://cloud.google.com/pubsub/docs/choose-subscription-type',
  'https://cloud.google.com/pubsub/docs/subscription-properties',
  'https://cloud.google.com/pubsub/docs/lease-management',
  'https://cloud.google.com/pubsub/docs/dead-letter-topics',
  'https://cloud.google.com/pubsub/docs/subscription-message-filter',
  'https://cloud.google.com/pubsub/docs/exactly-once-delivery',
  'https://cloud.google.com/pubsub/docs/ordering',
  'https://cloud.google.com/pubsub/docs/replay-overview',
  'https://cloud.google.com/pubsub/docs/schemas',
  'https://cloud.google.com/pubsub/docs/topic-properties',
  'https://cloud.google.com/pubsub/docs/subscription-overview',
  'https://cloud.google.com/pubsub/docs/authenticate-push-subscriptions',
  'https://cloud.google.com/pubsub/docs/bigquery',
  'https://cloud.google.com/tasks/docs/comp-pub-sub',
  'https://cloud.google.com/eventarc/docs/eventarc-and-pubsub',
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
    { id: 'bp-delivery', label: 'Subscription Choices' },
    { id: 'bp-flow', label: 'Delivery Flow' },
    { id: 'bp-fit', label: 'When to Use Pub/Sub' },
  ],
  'core-concepts': [
    { id: 'core-architecture', label: 'Architecture' },
    { id: 'core-topics', label: 'Topics and Messages' },
    { id: 'core-subscriptions', label: 'Subscriptions' },
    { id: 'core-delivery', label: 'Delivery Modes' },
    { id: 'core-acks', label: 'Acks and Redelivery' },
    { id: 'core-ordering', label: 'Ordering and Exactly-Once' },
    { id: 'core-controls', label: 'Filters, Retry, Dead-Letter' },
    { id: 'core-replay', label: 'Retention and Replay' },
    { id: 'core-schemas', label: 'Schemas and Transforms' },
    { id: 'core-security', label: 'Security and IAM' },
    { id: 'core-operations', label: 'Operations and Cost' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-compare', label: 'Compare and Contrast' },
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

const pubSubHelpStyles = `
.gcp-pubsub-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.gcp-pubsub-help-page .win98-window {
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

.gcp-pubsub-help-page .win98-titlebar {
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

.gcp-pubsub-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.gcp-pubsub-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.gcp-pubsub-help-page .win98-control {
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
  font-family: inherit;
  padding: 0;
}

.gcp-pubsub-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.gcp-pubsub-help-page .win98-tab {
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

.gcp-pubsub-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.gcp-pubsub-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.gcp-pubsub-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.gcp-pubsub-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-pubsub-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.gcp-pubsub-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.gcp-pubsub-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.gcp-pubsub-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.gcp-pubsub-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.gcp-pubsub-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-pubsub-help-page .win98-section {
  margin: 0 0 22px;
}

.gcp-pubsub-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.gcp-pubsub-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.gcp-pubsub-help-page .win98-content p,
.gcp-pubsub-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.gcp-pubsub-help-page .win98-content p {
  margin: 0 0 10px;
}

.gcp-pubsub-help-page .win98-content ul,
.gcp-pubsub-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.gcp-pubsub-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.gcp-pubsub-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.gcp-pubsub-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.gcp-pubsub-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .gcp-pubsub-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .gcp-pubsub-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .gcp-pubsub-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

export default function GcpPubSubPage(): JSX.Element {
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
      window.history.replaceState(window.history.state, '', `${url.pathname}?${nextSearch.toString()}`)
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
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}#${sectionId}`)
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
    <div className="gcp-pubsub-help-page">
      <style>{pubSubHelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
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
                  <a href={`#${section.id}`} onClick={(event) => handleSectionJump(event, section.id)}>
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

                <section id="bp-delivery" className="win98-section">
                  <h2 className="win98-heading">Subscription Choices</h2>
                  {deliveryGuide.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-flow" className="win98-section">
                  <h2 className="win98-heading">Delivery Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use Pub/Sub</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
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

                <section id="core-ops" className="win98-section">
                  <h2 className="win98-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
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

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
                    This page was compiled against official Google Cloud documentation checked on March 15, 2026.
                    Pub/Sub delivery features, limits, and subscription capabilities can change, so production decisions
                    should always be verified against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a href={source} className="win98-inline-link" target="_blank" rel="noreferrer">
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
