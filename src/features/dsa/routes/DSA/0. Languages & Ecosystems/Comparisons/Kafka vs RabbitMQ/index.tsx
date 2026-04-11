import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Kafka and RabbitMQ are both messaging technologies, but they are not optimized for the same job. Kafka is fundamentally a distributed event streaming platform built around durable append-only logs, partitions, and replayable consumption. RabbitMQ is fundamentally a message broker built around queues, exchanges, routing, acknowledgements, and flexible delivery patterns. That distinction matters more than raw popularity or branding.',
  'The useful comparison is not Which one is universally better. The useful comparison is what kind of messaging problem the system has. If the system needs durable event streams, replay, consumer groups, and high-throughput data pipelines, Kafka usually fits better. If it needs flexible routing, classic queue semantics, work distribution, and broker-style messaging patterns, RabbitMQ usually fits better.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kafka is centered on topics partitioned into durable ordered logs. Consumers read from offsets and can replay history, which makes Kafka especially useful for event streaming, analytics pipelines, event sourcing, and systems where multiple independent consumers need to process the same event stream at different speeds.',
      'RabbitMQ is centered on exchanges, queues, bindings, and acknowledgements. Producers publish messages to exchanges, exchanges route those messages to queues, and consumers process and acknowledge them. This makes RabbitMQ especially useful for task queues, broker-style integration, and complex routing patterns.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both systems decouple producers from consumers, help smooth bursts of work, and allow asynchronous communication between parts of a system. Both can improve reliability and scaling when direct synchronous calls would be too fragile or too tightly coupled.',
      'That overlap is why teams compare them, but the overlap should not hide the deeper difference: Kafka thinks in streams and replayable logs, while RabbitMQ thinks in brokered messages flowing through queues and routing rules.',
    ],
    bullets: [
      'Both support asynchronous communication.',
      'Both help decouple producers from consumers.',
      'Both can improve resilience and throughput under load.',
      'Both require operational discipline around retries, failures, and observability.',
    ],
  },
  {
    id: 'bp-when-kafka-fits',
    title: 'When Kafka Is Usually the Better Fit',
    paragraphs: [
      'Kafka is usually the better fit when the system needs durable streams of events that can be consumed by multiple downstream services, replayed later, and processed at very high throughput. It is especially strong for event-driven architectures, analytics ingestion, audit streams, CDC pipelines, and large-scale data integration.',
      'It is also attractive when the system benefits from treating data as an append-only stream rather than as transient broker-delivered messages that disappear after consumption.',
    ],
    bullets: [
      'High-throughput event streaming.',
      'Replayable event history and offset-based consumption.',
      'Multiple independent consumers reading the same event stream.',
      'Data pipelines, event sourcing, and stream processing workflows.',
    ],
  },
  {
    id: 'bp-when-rabbit-fits',
    title: 'When RabbitMQ Is Usually the Better Fit',
    paragraphs: [
      'RabbitMQ is usually the better fit when the problem looks like classic brokered messaging: send work to queues, route messages by rules, distribute tasks to workers, and acknowledge processing explicitly. It is especially strong for task queues, background jobs, request distribution, and messaging patterns where routing flexibility matters.',
      'It is also attractive when teams want a straightforward message broker with well-understood queueing semantics rather than a distributed event log platform.',
    ],
    bullets: [
      'Work queues and background job distribution.',
      'Broker-style routing and exchange patterns.',
      'Task acknowledgement and redelivery semantics.',
      'Systems where transient message delivery is more important than replayable event history.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose based on message shape, retention expectations, consumer model, and operational goals. Kafka is strongest when the message should become part of a durable stream. RabbitMQ is strongest when the message should be brokered to the right consumer and treated as a unit of work.',
    ],
    bullets: [
      'Choose Kafka for streams, replay, and durable event history.',
      'Choose RabbitMQ for brokered routing and work-queue semantics.',
      'Choose Kafka when many consumers need the same event independently.',
      'Choose RabbitMQ when the goal is moving work reliably to workers.',
      'Treat throughput, retention, and routing needs as first-class architecture inputs.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-data-model',
    title: 'Data Model and Mental Model',
    paragraphs: [
      'Kafka stores records in ordered partitions within topics. Consumers track offsets, which means a consumer can resume from a known position or replay earlier data if the retention window still contains it. This log-based model is a defining feature, not an implementation detail.',
      'RabbitMQ routes messages from exchanges to queues, then consumers receive and acknowledge them. The primary mental model is message delivery and routing rather than retained ordered history. Once processed and acknowledged, the message is usually treated as consumed work rather than replayable system history.',
    ],
  },
  {
    id: 'core-delivery-semantics',
    title: 'Delivery Semantics',
    paragraphs: [
      'Kafka is designed around durable logs and consumer position tracking. This makes it natural for at-least-once processing patterns, replay, backfills, and fan-out consumption across several independent services. The system is optimized for sequential partition consumption and long-lived stream processing behavior.',
      'RabbitMQ is designed around message acknowledgement, broker routing, and queue consumption. This makes it natural for worker-based processing, retries, dead-lettering, and classic queue semantics where one consumer or worker pool takes responsibility for processing a message.',
    ],
  },
  {
    id: 'core-ordering-throughput',
    title: 'Ordering, Throughput, and Scale',
    paragraphs: [
      'Kafka is especially strong when throughput and partitioned ordering matter. Ordering is preserved within a partition, and the platform is built to handle large volumes of event data efficiently across distributed brokers.',
      'RabbitMQ can certainly handle serious workloads, but it is typically chosen more for routing flexibility and queue semantics than for very large-scale event-stream throughput. Its strengths are different, not merely smaller.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Topology',
    paragraphs: [
      'RabbitMQ has a richer broker-style routing model out of the box through exchanges and bindings. This makes it attractive when the application needs direct, topic, fanout, or pattern-based routing with a message-broker mindset.',
      'Kafkaâ€™s routing model is more stream-oriented. Producers write to topics and partitions, and consumer groups process streams. This is simpler and more durable for event pipelines, but less broker-flexible than RabbitMQâ€™s classic routing patterns.',
    ],
  },
  {
    id: 'core-retention-replay',
    title: 'Retention and Replay',
    paragraphs: [
      'Kafkaâ€™s retention and replay model is one of its defining strategic strengths. Events remain in the log for a configured window, and consumers can re-read them. That enables rebuilding projections, recovering downstream systems, and onboarding new consumers to existing history.',
      'RabbitMQ is not generally chosen for replayable historical streams. Its default mental model is successful delivery and acknowledgement, not long-lived retained event history for many future readers.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-operations',
    title: 'Operations and Platform Complexity',
    paragraphs: [
      'Kafka is powerful, but it often comes with more operational weight because the platform is built for distributed logs, partition management, retention, broker clusters, and stream-oriented workloads. Teams adopting Kafka should do so because they need its model, not just because it is popular.',
      'RabbitMQ is often easier to justify when the messaging need is more classical and bounded. The operational model is still serious, but the conceptual burden is usually lower when the requirement is queueing and routing rather than event streaming infrastructure.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Case Fit',
    paragraphs: [
      'Kafka is a strong fit for event buses, immutable audit streams, CDC pipelines, telemetry ingestion, streaming analytics, and architectures where many services need access to the same stream of events over time.',
      'RabbitMQ is a strong fit for async task execution, background jobs, worker pools, service integration, RPC-style broker mediation, and cases where routing flexibility or straightforward queue delivery matters more than historical replay.',
    ],
  },
  {
    id: 'core-failure-retries',
    title: 'Failure Handling and Retries',
    paragraphs: [
      'RabbitMQ fits naturally with acknowledgement-driven retry flows, dead-letter queues, and worker recovery patterns. These are common operational needs in task-processing systems, which is one reason RabbitMQ remains a strong broker choice.',
      'Kafka also supports resilient processing patterns, but the operational shape is different because consumers manage offsets and stream progression rather than working purely from queue acknowledgements. Retry strategy must be designed with stream semantics in mind.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team and Organization Fit',
    paragraphs: [
      'Kafka tends to fit organizations ready to think in terms of event streams, consumer groups, replay, schemas, and durable data pipelines. It often pays off most in organizations with enough scale and enough downstream consumers to justify its model.',
      'RabbitMQ tends to fit teams that need a reliable message broker without adopting the full conceptual and operational model of event streaming infrastructure. It is often the more straightforward answer for conventional async job and integration problems.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Kafka often wins on throughput, stream retention, replay, and fan-out consumption over time. RabbitMQ often wins on routing flexibility, work-queue clarity, and a more direct broker mental model. These are different strengths, not versions of the same strength.',
      'The main mistake is using Kafka just to move background jobs because it is fashionable, or using RabbitMQ for event-stream history and replay when the architecture actually wants a durable log. Good choices come from matching the systemâ€™s messaging shape to the platformâ€™s native model.',
    ],
    bullets: [
      'Choose Kafka for streams, retention, and replay.',
      'Choose RabbitMQ for routing, queues, and worker distribution.',
      'Do not force a queue problem into a streaming platform.',
      'Do not force a replayable event-stream problem into a transient broker.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the system needs an event backbone that many services can consume independently over time, Kafka is usually the right architectural center. If the system needs messages routed to the correct workers with acknowledgement and queue semantics, RabbitMQ is usually the right architectural center.',
      'Some organizations use both: RabbitMQ for operational task distribution and Kafka for long-lived event streams and analytics pipelines. That is often a sign that the two technologies are solving genuinely different problems rather than acting as interchangeable substitutes.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-kafka-stream',
    title: 'Kafka Event Stream Shape',
    description: [
      'Kafka is strongest when one produced event should become durable stream data that multiple downstream consumers can process independently.',
    ],
    code: `Order Service --> topic: orders
                    |--> Billing Consumer Group
                    |--> Analytics Consumer Group
                    |--> Notification Consumer Group`,
    notes: [
      'Each consumer group can read the same event stream independently.',
      'Events remain available for replay within retention windows.',
      'This is a stream-oriented architecture rather than a single-work-item queue.',
    ],
  },
  {
    id: 'examples-rabbit-work-queue',
    title: 'RabbitMQ Work Queue Shape',
    description: [
      'RabbitMQ is strongest when messages should be routed to queues and processed as units of work by worker pools.',
    ],
    code: `API --> exchange --> queue: image-jobs --> worker pool
                \\--> queue: email-jobs --> worker pool`,
    notes: [
      'Routing rules determine which queue receives the message.',
      'Workers acknowledge processing success or failure.',
      'This is ideal for async job execution and broker-style fanout patterns.',
    ],
  },
  {
    id: 'examples-replay-vs-ack',
    title: 'Replay Versus Acknowledgement Thinking',
    description: [
      'One of the clearest distinctions is how each system wants developers to think about message lifetime.',
    ],
    code: `Kafka mindset:
keep events in a durable log
let consumers track offsets
allow replay and backfill

RabbitMQ mindset:
deliver message to queue
process and acknowledge
retry or dead-letter on failure`,
    notes: [
      'This difference often decides the architecture more than any benchmark does.',
      'Choose the mental model that matches the real business need.',
    ],
  },
  {
    id: 'examples-dual-usage',
    title: 'Using Both in One System',
    description: [
      'Mature systems sometimes use both technologies because the workloads are genuinely different.',
    ],
    code: `Kafka:
event history
analytics pipeline
service fan-out

RabbitMQ:
background jobs
email queue
image processing workers`,
    notes: [
      'This can be sensible when the business has both streaming and queueing needs.',
      'The important part is not tool count but architectural clarity.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-kafka',
    title: 'Kafka Terms',
    terms: [
      {
        term: 'Topic',
        definition: 'A named stream of records in Kafka.',
      },
      {
        term: 'Partition',
        definition:
          'An ordered subset of a Kafka topic that provides parallelism and ordering within that partition.',
      },
      {
        term: 'Offset',
        definition:
          'The position of a record within a Kafka partition used by consumers to track progress.',
      },
      {
        term: 'Consumer Group',
        definition: 'A group of consumers that cooperatively process partitions of a topic.',
      },
    ],
  },
  {
    id: 'glossary-rabbitmq',
    title: 'RabbitMQ Terms',
    terms: [
      {
        term: 'Exchange',
        definition:
          'A RabbitMQ routing component that receives published messages and routes them to queues.',
      },
      {
        term: 'Queue',
        definition:
          'A RabbitMQ structure that holds messages for consumption by workers or consumers.',
      },
      {
        term: 'Binding',
        definition: 'A routing rule connecting an exchange to a queue.',
      },
      {
        term: 'Acknowledgement',
        definition:
          'A signal from a consumer indicating that a message was processed successfully.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Messaging Terms',
    terms: [
      {
        term: 'Dead-Letter Queue',
        definition: 'A queue used to hold messages that could not be processed normally.',
      },
      {
        term: 'At-Least-Once Delivery',
        definition:
          'A delivery model where messages may be delivered more than once, so consumers must handle duplicates safely.',
      },
      {
        term: 'Fan-Out',
        definition: 'Sending one produced message or event to multiple downstream consumers.',
      },
      {
        term: 'Backpressure',
        definition:
          'The effect of downstream systems processing data more slowly than it is produced.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-kafka-fits', label: 'When Kafka Fits' },
    { id: 'bp-when-rabbit-fits', label: 'When RabbitMQ Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-data-model', label: 'Data Model and Mental Model' },
    { id: 'core-delivery-semantics', label: 'Delivery Semantics' },
    { id: 'core-ordering-throughput', label: 'Ordering, Throughput, and Scale' },
    { id: 'core-routing', label: 'Routing and Topology' },
    { id: 'core-retention-replay', label: 'Retention and Replay' },
    { id: 'core-operations', label: 'Operations and Platform Complexity' },
    { id: 'core-use-cases', label: 'Use Case Fit' },
    { id: 'core-failure-retries', label: 'Failure Handling and Retries' },
    { id: 'core-team-fit', label: 'Team and Organization Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-kafka-stream', label: 'Kafka Event Stream Shape' },
    { id: 'examples-rabbit-work-queue', label: 'RabbitMQ Work Queue Shape' },
    { id: 'examples-replay-vs-ack', label: 'Replay Versus Acknowledgement' },
    { id: 'examples-dual-usage', label: 'Using Both in One System' },
  ],
  glossary: [
    { id: 'glossary-kafka', label: 'Kafka Terms' },
    { id: 'glossary-rabbitmq', label: 'RabbitMQ Terms' },
    { id: 'glossary-shared', label: 'Shared Messaging Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kafka-rabbit-help-section">
      <h2 className="kafka-rabbit-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="kafka-rabbit-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kafka-rabbit-help-section">
      <h2 className="kafka-rabbit-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="kafka-rabbit-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="kafka-rabbit-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kafka-rabbit-help-section">
      <h2 className="kafka-rabbit-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="kafka-rabbit-help-divider" />}
    </section>
  )
}

export default function KafkaVsRabbitMqPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Kafka vs RabbitMQ',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Kafka vs RabbitMQ"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Kafka vs RabbitMQ</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
