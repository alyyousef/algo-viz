export const messagingPages = [
  {
    rel: '43.3 Messaging & Streaming/AWS SNS/index.mdx',
    title: 'AWS SNS (Simple Notification Service)',
    description:
      'A managed pub-sub fan-out: one publish, many subscriptions — HTTP, email, SQS, Lambda — with topics as the routing key.',
    body: `
**Amazon SNS** is a pub-sub fan-out service. A publisher sends one message to a **topic**. SNS delivers copies to each **subscription**: SQS queues, Lambda, HTTPS, email, SMS, or Firehose. Publishers do not know the subscribers. That is the point.

## 1. Deep Dive and Mechanics

**Topics.** Standard topics retry and may reorder or duplicate. FIFO topics (with an SQS FIFO subscriber) keep order per message group and support exactly-once between SNS and SQS when both are FIFO.

**Fan-out.** The usual pattern is SNS to many SQS queues so each consumer team scales and fails on its own. Lambda subscribers work for small, fast handlers.

**Filtering.** Subscription filter policies drop messages the consumer does not want, so you do not pay a fleet to ignore fields.

**Delivery.** HTTPS subscribers must ack. Failed deliveries retry with backoff, then a dead-letter queue if you attach one. Email is not a system-of-record transport.

<Callout icon="warning" title="SNS is not a durable inbox for your service">
If you subscribe an HTTP URL and the app is down past retries, the message is gone unless a DLQ exists. Fan out to SQS when you need a backlog.
</Callout>

## 2. Mathematical / Theoretical Foundation

Pub-sub is a one-to-many broadcast on a topic name. Delivery is at-least-once for standard topics. Ordering is not a global clock; FIFO is per group id.

Fan-out cost is O(subscribers) publish work on the service side. Filter policies cut that for the subscriber, not for SNS's internal fan-out entirely.

<ComparisonTable
  headers={['Service', 'Model', 'Backlog', 'Typical pair']}
  rows={[
    ['SNS', 'Pub-sub', 'No (unless SQS)', 'Notify many'],
    ['SQS', 'Queue', 'Yes', 'Work items'],
    ['EventBridge', 'Event bus plus rules', 'Via targets', 'Org-wide events'],
    ['Kinesis', 'Stream', 'Yes, time/retention', 'Telemetry'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# boto3 sketch
# sns.publish(TopicArn=arn, Message=body, MessageAttributes=attrs)
TICK3

Put a correlation id in attributes. Subscribe SQS with raw message delivery only if you know how to parse the wrapper.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Pub[Publisher] --> T[SNS topic]
    T --> Q1[SQS billing]
    T --> Q2[SQS email]
    T --> L[Lambda]
TICK3

## 5. Interview Prep

**Q: SNS versus SQS?**
**A:** SNS fans out. SQS stores work for one consumer group. Most designs use both: SNS then SQS.

**Q: How do you get ordering?**
**A:** FIFO topic plus FIFO queue, same message group id. Throughput is lower. Standard is the default for a reason.

**Q: What happens if a subscriber is slow?**
**A:** HTTP/Lambda feel SNS retry pressure. SQS absorbs the pile. Prefer SQS for uneven consumers.

## 6. Production Use Cases

- **Fan-out of order.placed** to billing, mail, and search indexers.
- **Mobile push** and SMS (with care for consent).
- **Alarm actions** from CloudWatch.

<Callout icon="tip" title="Always attach a DLQ">
A topic without a DLQ on each critical subscription is how you lose billing events on a bad deploy.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/AWS SQS/index.mdx',
    title: 'AWS SQS (Simple Queue Service)',
    description:
      'A managed work queue with visibility timeouts, at-least-once delivery, and optional FIFO grouping — the usual buffer in front of workers.',
    body: `
**Amazon SQS** is a hosted queue. Producers send messages. Consumers **receive**, process, then **delete**. Until delete, a **visibility timeout** hides the message so another worker should not take it. If the worker dies, the message reappears. That is at-least-once.

## 1. Deep Dive and Mechanics

**Standard queues.** Huge throughput, at-least-once, occasional reordering and rare duplicates. Design handlers to be idempotent.

**FIFO queues.** Order per message group id, exactly-once processing between SQS and a careful consumer (dedup id window). Lower throughput than standard.

**Visibility timeout.** Set it longer than p99 work time, or use heartbeats (change visibility) for long jobs. Too short means two workers do the same job.

**DLQ.** After N receives, move the message. Without a DLQ, poison pills block a FIFO group or waste workers forever.

<Callout icon="warning" title="Receive is not consume">
If you crash after the side effect and before delete, SQS will deliver again. The database write or charge must use an idempotency key.
</Callout>

## 2. Mathematical / Theoretical Foundation

A queue is a durable bag (standard) or per-group log (FIFO). Visibility is a lease: duration T. If processing time exceeds T without extend, lease expires and the message is available — the duplicate.

Backoff on receive-empty is how you avoid hot-looping. Long polling (wait time seconds up to 20) cuts empty receives.

<ComparisonTable
  headers={['Queue', 'Order', 'Dups', 'Scale']}
  rows={[
    ['SQS standard', 'Best effort', 'Yes', 'Very high'],
    ['SQS FIFO', 'Per group', 'Dedup window', 'Limited'],
    ['Kafka topic', 'Per partition', 'At-least-once', 'Very high'],
    ['Rabbit work queue', 'Per queue', 'Ack rules', 'Cluster-sized'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def handle(msg, db):
    if db.seen(msg.dedup_id):
        return "delete"
    db.apply(msg)
    return "delete"
TICK3

Batch receive (up to 10) and batch delete. Lambda event-source mapping hides some of this; you still need idempotency.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Producer
    participant Q as SQS
    participant W as Worker
    P->>Q: send
    Q->>W: receive plus hide
    W->>W: process
    W->>Q: delete
TICK3

## 5. Interview Prep

**Q: Why did the job run twice?**
**A:** Visibility expired, or delete failed, or a standard-queue duplicate. All three are normal. Blame the handler if it is not idempotent.

**Q: SQS versus Kafka?**
**A:** SQS is a queue (competing consumers, delete on success). Kafka is a retained log (many consumer groups, offset). Pick Kafka when several teams independently replay.

**Q: How do you delay a retry?**
**A:** Visibility extend, delay seconds on send, or a delay queue plus DLQ hop. Do not sleep inside a Lambda far past timeout.

## 6. Production Use Cases

- **Async workers** behind APIs (thumbnails, mail, ETL).
- **SNS fan-out** target per team.
- **Decoupling autoscaling** producers from slow consumers.

<Callout icon="tip" title="Alarm on DLQ depth and age">
Oldest message age is the SLO, not just ApproximateNumberOfMessages.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/ActiveMQ/index.mdx',
    title: 'Apache ActiveMQ',
    description:
      'A JMS-family message broker (Classic and Artemis) for queues and topics inside JVM-centric enterprises that already speak JMS.',
    body: `
**Apache ActiveMQ** is a message broker in the JMS world. **Classic** is the older broker. **Artemis** is the newer core (donated HornetQ) and is what new deployments should mean. Clients open sessions, send to queues or topics, and ack according to JMS modes.

## 1. Deep Dive and Mechanics

**Queues versus topics.** Queue: competing consumers, one delivery of each message to one consumer. Topic: pub-sub. Durable topic subscriptions keep a backlog for an offline subscriber.

**JMS sessions.** AUTO_ACK, CLIENT_ACK, and transacted sessions change when a message is considered consumed. Transacted sessions pair well with a JDBC XA story — and with 2PC pain.

**Persistence.** Journal plus optional JDBC. Throughput dies if every message fsyncs through a remote database. Local journal is the default for speed.

**Artemis clustering.** Shared-nothing replication or shared store. Classic's network-of-brokers is a different, older model. Do not mix lore.

<Callout icon="info" title="ActiveMQ is not Kafka">
No long retained log for independent replay by many consumer groups. If that is the requirement, you picked the wrong broker.
</Callout>

## 2. Mathematical / Theoretical Foundation

JMS delivery is at-least-once with client ack; exactly-once needs a transaction that includes the consume and the side effect. Prefetch is a window: large prefetch raises throughput and duplicate risk on crash.

<ComparisonTable
  headers={['Broker', 'API', 'Strength', 'Watch-out']}
  rows={[
    ['ActiveMQ Artemis', 'JMS, core, AMQP', 'Java shops', 'Ops of the cluster'],
    ['RabbitMQ', 'AMQP 0-9-1', 'Routing, ops story', 'Not a log'],
    ['IBM MQ', 'JMS, MQ', 'Mainframe edges', 'License'],
    ['Kafka', 'Log API', 'Replay, scale', 'Not JMS queues'],
  ]}
/>

## 3. Real-World Implementation

TICK3java
// session.createQueue("orders");
// producer.send(session.createTextMessage(json));
TICK3

Cap prefetch. Set redelivery delay. Send poison messages to a DLQ after a bound.

## 4. Visualizations

TICK3mermaid
flowchart LR
    App --> Broker[Artemis]
    Broker --> Q[Queue orders]
    Q --> W1[Worker]
    Q --> W2[Worker]
TICK3

## 5. Interview Prep

**Q: Classic versus Artemis?**
**A:** Artemis is the current broker. Classic remains in old plants. New clusters should be Artemis unless a vendor pins Classic.

**Q: Durable subscription versus queue?**
**A:** Durable topic keeps per-subscriber cursors on a broadcast. A queue shares work. Pick queue for workers, topic for events.

**Q: How do you HA?**
**A:** Live-backup replication (Artemis) or a shared store. Test failover with in-flight acks; that is where dups appear.

## 6. Production Use Cases

- **Spring / Java EE** apps that already use JMS templates.
- **Bridge** to AMQP or STOMP clients.
- **Gradual migrate** off Classic onto Artemis or out to Kafka/SQS.

<Callout icon="tip" title="Treat the journal disk as sacred">
Broker disk full is a total outage. Alert before the volume hits 80 percent.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Apache Kafka/index.mdx',
    title: 'Apache Kafka',
    description:
      'A distributed commit log: topics split into partitions, ordered per partition, retained for time or size, consumed by independent groups.',
    body: `
**Apache Kafka** is a distributed **log**. Producers append records to a **topic**. A topic is split into **partitions**. Each partition is an ordered, immutable sequence with an offset. Consumer groups share partitions; different groups each replay the same log.

## 1. Deep Dive and Mechanics

**Partitions.** Parallelism unit. Order is guaranteed inside one partition, not across the topic. Keys hash to a partition so the same key stays ordered.

**ISR.** In-sync replicas. acks=all waits for the ISR. A replica that falls behind leaves the ISR; min.insync.replicas stops writes if too few remain.

**Consumers.** A group assigns each partition to one member. Commit offsets (auto or manual). Replay by seeking. Compaction keeps the latest value per key for changelog topics.

**Kafka versus a queue.** Kafka does not delete on consume. Retention is time, size, or compaction. That is why search and billing can both read orders.

<Callout icon="warning" title="acks=1 is not durable">
If the leader dies before followers have the record, the message can vanish. Use acks=all and a sensible min.insync.replicas for money events.
</Callout>

## 2. Mathematical / Theoretical Foundation

A partition is a totally ordered sequence. Throughput scales roughly with partition count if keys are balanced. Hot keys pin a partition.

End-to-end exactly-once needs idempotent producers plus transactional produce and consume (Kafka EOS). Most apps still do at-least-once plus idempotent writes.

<ComparisonTable
  headers={['Piece', 'Guarantees', 'Failure mode']}
  rows={[
    ['Partition log', 'Order, offset', 'Hot key, rebalance stall'],
    ['ISR + acks=all', 'No ack if under-replicated', 'Write unavailability'],
    ['Consumer group', 'Shared work', 'Stop-the-world rebalance'],
    ['Compaction', 'Latest per key', 'Not a full history'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# producer.send("orders", key=user_id, value=payload)
# consumer.subscribe(["orders"]); consumer.commit() after DB write
TICK3

Commit the offset only after the side effect. Store the offset in the same DB transaction when you can (outbox or transactional consume).

## 4. Visualizations

TICK3mermaid
flowchart TB
    P[Producer] --> T[Topic]
    T --> P0[Partition 0]
    T --> P1[Partition 1]
    P0 --> G1[Group billing]
    P1 --> G1
    P0 --> G2[Group search]
    P1 --> G2
TICK3

## 5. Interview Prep

**Q: How do you keep order for a user?**
**A:** Same key, hence same partition. Do not expect global order. If you need it, you need one partition — and a throughput cap.

**Q: What is a rebalance?**
**A:** Group membership change. Partitions pause and move. Cooperative sticky assignors reduce the pause. Long processing plus auto-commit is how you double-process.

**Q: Kafka versus Pulsar versus Kinesis?**
**A:** Same log idea. Kafka is the default ops skill. Kinesis is managed AWS shards. Pulsar separates storage (BookKeeper) and has first-class multi-tenancy.

## 6. Production Use Cases

- **Event backbone** for domain events and CDC (Debezium).
- **Stream processing** (Flink, Kafka Streams).
- **Changelog** for materialized views.

<Callout icon="tip" title="Partition count is a one-way door">
You can add partitions; you cannot re-order history. Start from expected throughput and key cardinality, then add headroom.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Azure Event Hubs/index.mdx',
    title: 'Azure Event Hubs',
    description:
      'Azure managed event ingestion with partitions and consumer groups — Kafka-protocol compatible telemetry at cloud scale.',
    body: `
**Azure Event Hubs** is a managed ingestion log. Producers send events into a namespace and hub. The hub is split into **partitions**. **Consumer groups** each read independently. The Kafka endpoint lets existing Kafka clients talk to Event Hubs with some feature gaps.

## 1. Deep Dive and Mechanics

**Throughput units / processing units / capacity.** You buy ingress. Throttle is a first-class outage mode. Autoscale exists; it is not instant.

**Partitions.** Choose at create time (can scale out on some SKUs). Partition key affinity keeps order per key, same as Kafka.

**Capture.** Optional archive to Blob or ADLS as a batch dump — good for lake ingestion without a long consumer.

**Checkpoints.** Event processor hosts store offsets in Blob. If you do not checkpoint, restarts replay from the beginning or from retention, depending on config.

<Callout icon="info" title="Event Hubs is not Service Bus">
Hubs are telemetry streams. Service Bus is queues, sessions, and business messaging. Mixing them in a design review is a common miss.
</Callout>

## 2. Mathematical / Theoretical Foundation

Same log math as Kafka: order per partition, scale by partition count, retention by time/size. Consumer lag is latest offset minus checkpoint.

Kafka compatibility is a protocol mapping, not a full Apache Kafka cluster. Compacted topics and some admin APIs differ.

<ComparisonTable
  headers={['Azure piece', 'Model', 'Use']}
  rows={[
    ['Event Hubs', 'Log, partitions', 'Telemetry, clickstream'],
    ['Service Bus queue', 'Competing consumers', 'Commands, jobs'],
    ['Service Bus topic', 'Pub-sub', 'Fan-out business events'],
    ['Event Grid', 'Reactive routing', 'Blob created, SaaS events'],
  ]}
/>

## 3. Real-World Implementation

TICK3csharp
// EventHubProducerClient.SendAsync(batch);
// EventProcessorClient with Blob checkpoint store
TICK3

Batch sends. Handle PartitionOwnership. Do not checkpoint before the DB write.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Apps --> EH[Event Hub]
    EH --> P0[Partition]
    EH --> P1[Partition]
    P0 --> CG[Consumer group]
    P1 --> CG
    EH --> Cap[Capture to ADLS]
TICK3

## 5. Interview Prep

**Q: Kafka on Event Hubs — any catch?**
**A:** It works for many produce/consume paths. Test compaction, transactions, and admin tools. Do not assume every Kafka feature exists.

**Q: How many partitions?**
**A:** Ingress target divided by per-partition limits, plus consumer parallelism. Too few and you throttle; too many and you pay and rebalance more.

**Q: Event Hubs versus Kinesis?**
**A:** Same niche on different clouds. Checkpoint stores and IAM differ. The design picture is identical.

## 6. Production Use Cases

- **IoT and click** ingestion.
- **Pipeline into Azure Stream Analytics or Spark**.
- **Capture** as a cheap lake feed.

<Callout icon="tip" title="Alert on throttled bytes">
Throttling looks like random timeouts in clients. Watch the metric before you scale the app.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Azure Service Bus/index.mdx',
    title: 'Azure Service Bus',
    description:
      'Azure enterprise messaging: queues, topics, sessions, duplicate detection, and peek-lock — closer to AMQP brokers than to Event Hubs.',
    body: `
**Azure Service Bus** is a managed AMQP broker for **business messages**. **Queues** give competing consumers. **Topics** plus **subscriptions** give pub-sub with SQL-style filters. **Sessions** keep order for a session id. **Peek-lock** is the visibility lease.

## 1. Deep Dive and Mechanics

**Peek-lock.** Receive locks the message. Complete deletes it. Abandon or lock expiry puts it back. Dead-letter after max delivery count.

**Sessions.** A session id pins ordered handling to one receiver at a time. Useful for per-user workflows. Throughput is per session, not global.

**Duplicate detection.** A window on message id so retries from the producer do not enqueue twice. It is not exactly-once end to end.

**Transactions.** Limited local transactions (complete plus send). Not a distributed saga replacement.

<Callout icon="warning" title="Lock expiry duplicates work">
Long handlers must renew the lock. Otherwise two workers will process the same payment instruction.
</Callout>

## 2. Mathematical / Theoretical Foundation

At-least-once with a lease of duration T. FIFO is per session, not per queue, unless you use one session. Filters on subscriptions are predicates evaluated at enqueue/fan-out time.

<ComparisonTable
  headers={['Feature', 'Service Bus', 'SQS', 'Event Hubs']}
  rows={[
    ['Queue', 'Yes', 'Yes', 'No'],
    ['Pub-sub filters', 'Rich', 'Via SNS', 'Consumer side'],
    ['Sessions / FIFO', 'Sessions', 'FIFO groups', 'Partition key'],
    ['Telemetry volume', 'Poor fit', 'OK', 'Yes'],
  ]}
/>

## 3. Real-World Implementation

TICK3csharp
// processor.ProcessMessageAsync += ...; args.CompleteMessageAsync(args.Message)
TICK3

Use the processor SDK so lock renewal is not a hand-rolled timer you forget.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Svc --> T[Topic]
    T --> SubA[Sub billing]
    T --> SubB[Sub audit]
    SubA --> W[Worker]
TICK3

## 5. Interview Prep

**Q: Service Bus versus Event Hubs?**
**A:** Commands, workflows, and filters: Service Bus. High-rate telemetry: Event Hubs. Do not ingest clickstreams on Service Bus.

**Q: How do you order per customer?**
**A:** Session id = customer id. One active processor per session. Watch session count as a scale limit.

**Q: Premium versus standard?**
**A:** Premium has reserved capacity, larger messages, and better isolation. Standard can noisy-neighbor under burst.

## 6. Production Use Cases

- **Order and payment commands** in Azure-native apps.
- **Topic fan-out** with per-team subscriptions.
- **Bridge** from on-prem AMQP.

<Callout icon="tip" title="Dead-letter is a product backlog">
Someone must own the DLQ. A full DLQ with no owner is a silent business outage.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Event streams/index.mdx',
    title: 'Event Streams',
    description:
      'An append-only, partitioned sequence of facts with retention — consumers keep cursors, they do not delete the producer history.',
    body: `
An **event stream** is an append-only log of facts: orders, clicks, CDC rows. Producers append. Consumers keep a **cursor** (offset, timestamp). The log remains for a retention window so new consumers can catch up. This is different from a queue, where consume removes the message from the shared backlog.

## 1. Deep Dive and Mechanics

**Facts versus commands.** A stream of OrderPlaced is a fact. A queue of SendEmail is a command. Facts can have many readers. Commands should have one successful worker.

**Partitions and keys.** Same key, same ordered slice. Global order is rare and expensive.

**Retention and compaction.** Time/size retention is history with a hole after expiry. Compaction keeps the latest state per key (KTables, changelogs).

**Replay.** The defining operation. A new indexer rebuilds from offset zero (or from a snapshot plus tail).

<Callout icon="info" title="A stream is not your warehouse">
Retention of days is not a seven-year audit store. Dump to object storage if you need forever.
</Callout>

## 2. Mathematical / Theoretical Foundation

A stream is a function from offset to record, monotonic append. Consumer lag = high-water mark minus committed cursor. Throughput is limited by the hottest partition.

Exactly-once across stream and database is a transaction or an idempotent apply. The stream alone does not make the DB exactly-once.

<ComparisonTable
  headers={['', 'Event stream', 'Message queue']}
  rows={[
    ['Remove on consume', 'No', 'Yes'],
    ['Many independent readers', 'Yes', 'Awkward'],
    ['Replay', 'Native', 'Only if you recopy'],
    ['Per-key order', 'Partition', 'FIFO group / session'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def apply_until(log, cursor, handler):
    for offset, rec in log.after(cursor):
        handler(rec)
        cursor = offset
    return cursor
TICK3

Checkpoint after a durable side effect, or in the same transaction.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Prod --> Log[Append-only log]
    Log --> C1[Cursor billing]
    Log --> C2[Cursor search]
    Log --> Lake[Expire to object store]
TICK3

## 5. Interview Prep

**Q: Stream versus queue in a design interview?**
**A:** Several teams must read the same history: stream. One worker pool must do a job: queue. Many systems have both.

**Q: What is a watermark?**
**A:** In stream processing, a time threshold that says "we believe no earlier event will arrive." Used to close windows. It can be wrong; late data needs a policy.

**Q: How do you handle poison events?**
**A:** Skip with a DLQ topic, or park the partition (halts everything on that key). Prefer a DLQ plus an alert.

## 6. Production Use Cases

- **Kafka / Kinesis / Event Hubs / Pulsar** backbones.
- **CDC** streams into search and warehouses.
- **Materialized views** built by replaying.

<Callout icon="tip" title="Name the cursor store">
Offsets in the broker, in Redis, or in the DB — pick one and make it crash-safe.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Event-driven systems/index.mdx',
    title: 'Event-Driven Architecture (EDA)',
    description:
      'Services communicate by publishing facts and reacting, instead of calling each other in a synchronous request chain.',
    body: `
**Event-driven architecture** means a component announces that something happened and does not wait for every listener. Listeners react, often through a broker or stream. The alternative is a synchronous chain of HTTP calls that fails when any hop is down.

## 1. Deep Dive and Mechanics

**Notification events.** Small "something changed, go look" messages. Easy, chatty, and racy if the look-up hits a replica that is behind.

**Event-carried state transfer.** The payload has the fields consumers need. Consumers can be autonomous. Schema becomes a contract (Avro, JSON Schema, Protobuf).

**Event sourcing.** The log is the store; current state is a fold. Powerful and easy to get wrong (PII, versioning, GDPR erase).

**Choreography versus orchestration.** EDA leans choreography. Add an orchestrator when the business process has a name and a compensation path.

<Callout icon="warning" title="Async does not remove coupling">
You still couple on event names and schemas. A rename can break five teams. Own a catalog and compatibility rules.
</Callout>

## 2. Mathematical / Theoretical Foundation

Causality is a partial order on events. Consumers that need "A then B" must share a partition key or use sagas. Dual writes (DB then publish) lose events unless you use an outbox.

End-to-end latency is queueing delay plus process time, not one RTT. Tail latency is dominated by retries and lag.

<ComparisonTable
  headers={['Style', 'Coupling', 'Failure', 'Best for']}
  rows={[
    ['Sync RPC chain', 'Runtime + API', 'Caller sees it', 'User-facing read'],
    ['EDA notification', 'Name + fetch', 'Listener lag', 'Simple hooks'],
    ['EDA with payload', 'Schema', 'Independent scale', 'Integrations'],
    ['Orchestrated saga', 'Process model', 'Compensations', 'Booked workflows'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# outbox in the same DB transaction as the write
# poller or CDC publishes to the broker
TICK3

Never publish then write, or write then publish without an outbox. Pick one atomic place.

## 4. Visualizations

TICK3mermaid
flowchart LR
    API --> DB
    DB --> Outbox
    Outbox --> Broker
    Broker --> Mail
    Broker --> Search
    Broker --> Analytics
TICK3

## 5. Interview Prep

**Q: When is EDA the wrong tool?**
**A:** The user must see a consistent result in one request (authz check, unique username). Also when the team cannot operate a broker.

**Q: How do you debug a flow?**
**A:** Correlation ids on every event, a trace that follows produce/consume, and a catalog of producers. Without ids, you grep and pray.

**Q: Dual write problem?**
**A:** Two stores cannot commit as one. Use transactional outbox or CDC from the WAL.

## 6. Production Use Cases

- **Commerce**: order events into many departments.
- **Platforms** that add consumers without changing the producer.
- **CQRS** read models fed by events.

<Callout icon="tip" title="Start with one event and two consumers">
A twelve-service choreography on day one is how EDA gets a bad name.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Exactly-once-at-least-once delivery semantics/index.mdx',
    title: 'Delivery Semantics',
    description:
      'At-most-once drops; at-least-once duplicates; exactly-once is an end-to-end protocol of idempotency, transactions, or both — not a broker checkbox.',
    body: `
Brokers advertise **delivery semantics**. **At-most-once** sends and forgets; crashes lose messages. **At-least-once** retries until ack; crashes duplicate. **Exactly-once** means the side effect happens once, which is a property of the whole path (producer, log, consumer, database), not of a single "EOS" flag.

## 1. Deep Dive and Mechanics

**At-least-once** is the default that scales. You make it safe with idempotency keys, unique constraints, and upserts.

**Broker exactly-once** (Kafka transactions, some JMS XA) prevents duplicates inside the log or between consume and produce. It does not update your Postgres by magic.

**Effectively once.** Dedup table with a TTL, or a unique payment intent id. This is what most companies ship.

**At-most-once.** Metrics you can drop, or fire-and-forget logs. Never money.

<Callout icon="warning" title="Exactly-once is not a checkbox on the queue UI">
If the consumer writes to two systems, you still have a dual-write problem. Name the transaction boundary.
</Callout>

## 2. Mathematical / Theoretical Foundation

In an unreliable network, you cannot know whether the other side applied a request if the ack is lost. Retries are required for liveness; retries create duplicates. Exactly-once = at-least-once + idempotent apply (or a distributed transaction).

Idempotence: f(f(x)) = f(x). Unique keys implement that for inserts.

<ComparisonTable
  headers={['Semantic', 'Lose msgs', 'Dup side effects', 'Use']}
  rows={[
    ['At-most-once', 'Yes', 'No', 'Metrics'],
    ['At-least-once', 'No', 'Yes unless idempotent', 'Default'],
    ['Exactly-once end to end', 'No', 'No', 'Hard, narrow path'],
    ['Effectively once', 'No', 'No after dedup', 'Payments, mail'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def apply_once(db, key, fn):
    if db.insert_dedup(key):
        fn()
TICK3

insert_dedup must be unique-constrained. A check-then-act without a unique index will race.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant B as Broker
    participant W as Worker
    participant D as DB
    B->>W: deliver
    W->>D: upsert id
    W--xB: crash before ack
    B->>W: redeliver
    W->>D: upsert same id
TICK3

## 5. Interview Prep

**Q: Does Kafka exactly-once mean my DB is safe?**
**A:** Only if the DB write is inside the same Kafka transaction story (or you consume transactionally into Kafka only). A separate SQL insert still needs a key.

**Q: Why not at-most-once for jobs?**
**A:** A deploy mid-send drops the job. Users see missing orders. Retries plus idempotency are cheaper than support tickets.

**Q: What is a poison message?**
**A:** A record that always crashes the handler. At-least-once will retry forever unless you have a DLQ and a max hop.

## 6. Production Use Cases

- **Payments**: intent id, unique charge.
- **Email**: message id, provider idempotency.
- **Kafka Streams EOS** for read-process-write in Kafka only.

<Callout icon="tip" title="Write the idempotency key on the whiteboard">
If you cannot name the key, you do not have exactly-once. You have hope.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Google Pub-Sub/index.mdx',
    title: 'Google Cloud Pub/Sub',
    description:
      'GCP global pub-sub with topics and subscriptions, ack deadlines, and optional exactly-once plus ordering keys.',
    body: `
**Google Cloud Pub/Sub** is a managed pub-sub. Publishers send to a **topic**. Each **subscription** gets its own backlog (push or pull). Ack **deadlines** work like a visibility timeout. Regional or global topics change latency and failure domains.

## 1. Deep Dive and Mechanics

**Pull versus push.** Pull: workers request messages. Push: Pub/Sub POSTs to your URL. Push needs auth and a handler that acks by HTTP status.

**Ack deadline.** Extend for long work. Expiry redelivers. Exactly-once subscriptions (where enabled) reduce duplicates on the ack path; your DB still needs a key.

**Ordering keys.** Same key, same ordering in a subscription, at a throughput cost. No key means no order.

**Seek and snapshots.** Replay a subscription to a time or snapshot. This is closer to a stream cursor than classic SQS.

<Callout icon="info" title="A topic with no subscription drops publishes">
Messages need a subscription at publish time (or they are discarded). Create the sub before you produce, or use a catch-all.
</Callout>

## 2. Mathematical / Theoretical Foundation

Each subscription is an independent cursor over the topic. At-least-once is the base. Ordering is per key, not global. Flow control limits outstanding messages so memory stays bounded (backpressure).

<ComparisonTable
  headers={['Cloud pub-sub', 'Backlog per subscriber', 'Order', 'Notes']}
  rows={[
    ['GCP Pub/Sub', 'Yes', 'Optional keys', 'Seek/snapshots'],
    ['AWS SNS', 'No (use SQS)', 'FIFO pair', 'Fan-out primitive'],
    ['AWS SQS', 'Yes (queue)', 'FIFO groups', 'Not pub-sub alone'],
    ['Azure Service Bus', 'Yes', 'Sessions', 'AMQP business msgs'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# subscriber.subscribe(sub, callback=handler)
# message.ack() after durable write
TICK3

Use flow-control max outstanding. Nack or extend instead of sleeping past the deadline.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Pub --> Topic
    Topic --> SubA[Subscription A]
    Topic --> SubB[Subscription B]
    SubA --> Pull[Pull workers]
    SubB --> Push[Push HTTPS]
TICK3

## 5. Interview Prep

**Q: Pub/Sub versus Kafka on GCP?**
**A:** Pub/Sub is fully managed and global-first. Kafka (or Managed Kafka / Pub/Sub Lite / Dataflow) fits when you need partitions you control and a Kafka ecosystem. Lite is a cheaper, zonal option.

**Q: Why duplicates with exactly-once on?**
**A:** Publisher retries, handler crashes after side effect, or a feature gap on the API you used. Still write idempotent handlers.

**Q: Push or pull?**
**A:** Pull for workers you scale. Push for simple endpoints and Cloud Functions, with care for retry storms.

## 6. Production Use Cases

- **GCP-native microservices** fan-out.
- **Dataflow** pipelines as a subscriber.
- **Push to Cloud Run** for small event handlers.

<Callout icon="tip" title="Alert on oldest unacked">
Subscription oldest age is the business lag metric. Depth alone hides a stuck key.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Message queues/index.mdx',
    title: 'Message Queues',
    description:
      'A durable buffer between producers and competing consumers: send, lease, ack or retry — the basic decoupling primitive.',
    body: `
A **message queue** stores work items until a consumer **acks**. Producers do not wait for the worker. Several workers compete; each message should be processed by one success path (plus retries). The queue absorbs bursts and outages.

## 1. Deep Dive and Mechanics

**Lifecycle.** Enqueue, lease (visibility), process, ack (delete) or fail (retry / DLQ). Crash before ack = redelivery.

**Competing consumers.** Scale by adding workers. Order is usually lost unless you add FIFO groups or sessions.

**Backpressure.** When the queue grows, producers should slow down or shed. A queue without a max depth is an unbounded memory leak on disk.

**Poison messages.** A payload that always crashes the worker. Max-receive plus DLQ is mandatory.

<Callout icon="info" title="A queue hides the worker; it does not hide bad contracts">
Schema errors still poison the DLQ. Version the payload.
</Callout>

## 2. Mathematical / Theoretical Foundation

Little's law: L = lambda times W. Queue depth is arrival rate times time-in-system. If process time is s and you want lag under T, you need about lambda times s workers, plus slack for jitter.

M/M/k sketches the same idea. Heavy tails need more slack than the mean suggests.

<ComparisonTable
  headers={['Property', 'Queue', 'Pub-sub', 'Log']}
  rows={[
    ['Who has the message', 'Broker until ack', 'Each sub', 'Everyone with a cursor'],
    ['Replay', 'No', 'If retained', 'Yes'],
    ['Work sharing', 'Native', 'Per sub', 'Consumer group'],
    ['User-facing wait', 'Often async', 'Async', 'Async'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def worker(q):
    msg = q.lease()
    try:
        do_work(msg)
        q.ack(msg)
    except Retryable:
        q.release(msg)
    except Fatal:
        q.dead_letter(msg)
TICK3

## 4. Visualizations

TICK3mermaid
flowchart LR
    API --> Q[Queue]
    Q --> W1[Worker]
    Q --> W2[Worker]
    Q --> DLQ[DLQ]
TICK3

## 5. Interview Prep

**Q: Queue versus stream?**
**A:** Queue: delete on success, one logical consumer group. Stream: retain, many groups, replay.

**Q: How do you size workers?**
**A:** Measure service time and target lag. Add autoscaling on age, not only on CPU. CPU can be idle while the queue is huge if workers are blocked on I/O.

**Q: Is the queue the source of truth?**
**A:** Only for in-flight work. Durable business state lives in a database. The outbox pattern ties them together.

## 6. Production Use Cases

- **Background jobs** (mail, PDF, webhooks).
- **Load leveling** in front of a fragile dependency.
- **SQS, Rabbit, Service Bus, ActiveMQ** as the product.

<Callout icon="tip" title="Page on age, not only depth">
A depth of 10 million tiny messages can be fine. Age of 2 hours on refunds is not.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/NATS/index.mdx',
    title: 'NATS',
    description:
      'A lightweight subject-based messaging system: core pub-sub, queue groups, and JetStream for persistence, replay, and exactly-once-ish work queues.',
    body: `
**NATS** is a small, fast messaging system built around **subjects** (dotted names, wildcards). **Core NATS** is at-most-once: if a subscriber is missing, the message is gone. **JetStream** adds persistence, consumers, replay, and work queues.

## 1. Deep Dive and Mechanics

**Subjects.** shop.order.created. Wildcards: star for one token, greater-than for a tail. Servers route by subject trie.

**Queue groups.** Several subscribers share a group name; one of them gets each message. That is competing consumers on core NATS, still without persistence.

**JetStream.** Streams capture subjects to disk or memory. Consumers (push/pull, durable) have ack policies. Work-queue retention deletes a message once it is acked by the consumer.

**KV and Object store.** JetStream features on top of streams. Handy, not a replacement for Postgres.

<Callout icon="warning" title="Core NATS will drop your payment">
If you did not enable JetStream (or another durable log), a brief disconnect loses messages. Use core for signals, JetStream for work.
</Callout>

## 2. Mathematical / Theoretical Foundation

Core delivery is fire-and-forget multicast on a subject. JetStream is a log per stream with sequence numbers. Ack wait is a lease. R3 file storage is a replicated log with a Raft group per stream/consumer in modern versions.

<ComparisonTable
  headers={['Mode', 'Durable', 'Replay', 'Use']}
  rows={[
    ['Core pub-sub', 'No', 'No', 'Presence, cache bust'],
    ['Core queue group', 'No', 'No', 'Best-effort workers'],
    ['JetStream interest', 'Yes', 'Yes', 'Events'],
    ['JetStream work queue', 'Yes', 'Until ack', 'Jobs'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# nc.publish("shop.order.created", payload)
# js.pull_subscribe("shop.order.created", durable="billing")
TICK3

Set max-deliver and a DLQ subject. Watch pending acks.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Pub --> NATS
    NATS --> Core[Core subscribers]
    NATS --> JS[JetStream]
    JS --> Durable[Durable consumer]
TICK3

## 5. Interview Prep

**Q: NATS versus Kafka?**
**A:** NATS is simpler ops and great for request/reply and light events. Kafka wins at huge retained logs, ecosystem, and multi-day replay for many groups.

**Q: Request/reply on NATS?**
**A:** Inbox subjects and a timeout. Fine for internal RPC. Do not confuse it with guaranteed async work.

**Q: How does clustering work?**
**A:** Core cluster gossips routes. JetStream uses Raft for the stream. Plan capacity for both.

## 6. Production Use Cases

- **Service mesh-adjacent** signaling and cache invalidation.
- **Edge / IoT** where a small binary matters.
- **JetStream jobs** when you do not want a full Kafka ops team.

<Callout icon="tip" title="Say core versus JetStream out loud">
Interviewers treat "we use NATS" as incomplete until you name durability.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/RabbitMQ/index.mdx',
    title: 'RabbitMQ',
    description:
      'An AMQP 0-9-1 broker: exchanges route to queues, consumers ack, and plugins add streams, federation, and shovel.',
    body: `
**RabbitMQ** is a broker best known for **AMQP 0-9-1**. Producers publish to an **exchange**. The exchange **routes** to **queues** by type (direct, topic, fanout, headers). Consumers ack. Classic queues and **quorum queues** (Raft) are the modern durability story.

## 1. Deep Dive and Mechanics

**Exchanges.** Direct: exact routing key. Topic: dot wildcards. Fanout: all bound queues. You can change fan-out by adding a binding, not by changing publishers.

**Acks and prefetch.** prefetch (QoS) is the window of unacked messages. Manual ack after the side effect. Publisher confirms tell the producer the broker persisted.

**Quorum queues.** Replicated via Raft. Use these for durable work. Classic mirrored queues are legacy.

**Streams plugin.** A Kafka-like log on Rabbit for replay. Different from classic queues.

<Callout icon="warning" title="A full disk or memory alarm blocks publishers">
Rabbit will block connections when it hits high watermarks. That is backpressure. Alert on alarms, not only on queue depth.
</Callout>

## 2. Mathematical / Theoretical Foundation

Routing is a bind-time function from (exchange, key, headers) to queue set. Delivery is at-least-once with manual ack. Quorum commit waits for a Raft majority.

Prefetch N means up to N in-flight per consumer; crash cost is up to N redeliveries.

<ComparisonTable
  headers={['Piece', 'Role', 'Failure note']}
  rows={[
    ['Exchange', 'Route', 'Misbind = silent drop if no alternate'],
    ['Classic queue', 'Buffer', 'Node-local unless mirrored (legacy)'],
    ['Quorum queue', 'Raft buffer', 'Minority cannot commit'],
    ['Stream', 'Log', 'Consumers have offsets'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# channel.exchange_declare(x, "topic", durable=True)
# channel.queue_bind(q, x, routing_key="order.#")
# channel.basic_consume(q, on_message, auto_ack=False)
TICK3

Enable publisher confirms. Set a dead-letter exchange. Prefer quorum for anything you would page on.

## 4. Visualizations

TICK3mermaid
flowchart LR
    P[Publisher] --> X[Topic exchange]
    X -->|order.created| Q1[Queue billing]
    X -->|order.*| Q2[Queue audit]
    Q1 --> C[Consumer]
TICK3

## 5. Interview Prep

**Q: What if no queue is bound?**
**A:** The message is dropped unless you set an alternate exchange or mandatory flag plus return. Silent drop is a common production bug.

**Q: Rabbit versus Kafka?**
**A:** Flexible routing and work queues versus long logs and replay. Many companies use Rabbit for commands and Kafka for facts.

**Q: How do you scale consumers?**
**A:** Add consumers on the same queue. For very high rates, shard routing keys into several queues. One giant classic queue is a single-node bottleneck.

## 6. Production Use Cases

- **Task queues** for web apps (often via Celery historically).
- **Topic routing** of domain events to teams.
- **Federation / shovel** across sites.

<Callout icon="tip" title="Use quorum queues by default">
If the interview stops at "durable classic queue," mention Raft quorum queues. That is the current advice.
</Callout>
`,
  },
  {
    rel: '43.3 Messaging & Streaming/Redis Streams/index.mdx',
    title: 'Redis Streams',
    description:
      'A Redis log type with IDs, consumer groups, and XACK — handy when you already run Redis and the stream volume fits in that cluster.',
    body: `
**Redis Streams** (XADD, XREADGROUP, XACK) are an append-only log inside Redis. Entries have ids (time-seq). **Consumer groups** share the stream like a Kafka group, with a **pending entries list** (PEL) for unacked messages.

## 1. Deep Dive and Mechanics

**XADD.** Append with optional MAXLEN ~ to cap memory. Redis is memory-first; an unbounded stream is an OOM.

**Groups.** XGROUP CREATE. XREADGROUP delivers new entries and tracks them in the PEL until XACK. Crashed consumers leave PEL items; XCLAIM or XAUTOCLAIM steals them after a min idle time.

**Versus Kafka.** No multi-week cheap disk log, no multi-AZ ISR story unless you build it with Redis replication/Cluster. Excellent for modest rates next to a cache.

**Versus Redis pub/sub.** Pub/sub is fire-and-forget. Streams persist (until trimmed).

<Callout icon="warning" title="MAXLEN is not a warehouse">
Approximate trim drops old entries. If you need audit, ship out to S3 or Kafka.
</Callout>

## 2. Mathematical / Theoretical Foundation

A stream is a radix-tree of ids. Group lag is last-id minus last-delivered. PEL size is in-flight risk: crash cost equals PEL entries for that consumer.

Replication is Redis async by default (PACELC EL). A failover can lose the tail of the stream.

<ComparisonTable
  headers={['Redis feature', 'Durable log', 'Groups', 'Use']}
  rows={[
    ['Pub/Sub', 'No', 'No', 'Live signals'],
    ['Lists / BRPOP', 'Yes', 'No (steal risk)', 'Simple queues'],
    ['Streams', 'Yes until trim', 'Yes', 'Jobs + light events'],
    ['Kafka', 'Disk retention', 'Yes', 'Platform backbone'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# r.xadd("orders", {"json": body}, maxlen=100000, approximate=True)
# r.xreadgroup("cg", "w1", streams={"orders": ">"}, count=10)
# r.xack("orders", "cg", msg_id)
TICK3

AClaim idle pending after a timeout. Monitor PEL length.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Producer
    participant S as Stream
    participant G as Group PEL
    P->>S: XADD
    S->>G: XREADGROUP
    G->>G: process
    G->>S: XACK
TICK3

## 5. Interview Prep

**Q: When do you pick Streams over SQS or Kafka?**
**A:** You already operate Redis, volume fits in memory plus trim, and you want one fewer vendor. Not for company-wide event history.

**Q: What is the PEL?**
**A:** The list of delivered-but-unacked ids. It is how Redis knows what to redeliver. If you never XACK, the PEL grows until Redis hurts.

**Q: At-least-once?**
**A:** Yes. XACK after the DB write. Same idempotency story as SQS.

## 6. Production Use Cases

- **Per-service job lists** next to cache.
- **Light fan-in** of device events before a flush to a lake.
- **Notifications** that must survive a brief subscriber restart.

<Callout icon="tip" title="Cap the stream and page on PEL">
Those two metrics decide whether Redis Streams stays boring.
</Callout>
`,
  },
]
