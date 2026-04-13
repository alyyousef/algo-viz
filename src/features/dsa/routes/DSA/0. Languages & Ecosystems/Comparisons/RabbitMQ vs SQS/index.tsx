import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'RabbitMQ and Amazon SQS are both messaging technologies, but they sit in meaningfully different architectural categories. RabbitMQ is a message broker you run or consume as infrastructure and design around exchanges, queues, bindings, acknowledgements, and broker features. Amazon SQS is a fully managed AWS queueing service designed around simple queue semantics, elastic service operation, and deep AWS integration.',
      'That means the practical question is not only which one can move messages. The real question is whether the system needs a broker with flexible routing topologies and protocol-level messaging features, or a highly managed queue service that removes most broker operations and fits naturally into AWS-native architectures.',
      'This help-style reference covers RabbitMQ vs SQS across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-rabbitmq',
    title: 'When RabbitMQ Fits Better',
    paragraphs: [
      'RabbitMQ is often the stronger fit when the application wants broker-side routing, flexible messaging patterns, protocol features, fine-grained acknowledgement control, or topologies built around exchanges and bindings. It is attractive when one publish may need to fan out, route by key, or be handled through broker-configured messaging semantics rather than only by queue consumers.',
      'It is also often preferred when the team wants a messaging platform that can express richer delivery patterns directly, rather than composing multiple AWS services or building routing behavior in surrounding application infrastructure.',
    ],
  },
  {
    id: 'bp-sqs',
    title: 'When SQS Fits Better',
    paragraphs: [
      'Amazon SQS is often the stronger fit when the team wants a durable managed queue with minimal operational overhead and deep AWS integration. It is especially attractive for decoupling services, background job pipelines, Lambda-driven processing, and high-scale cloud-native workloads where managed reliability is more important than broker topology flexibility.',
      'It is also the natural choice when the organization is already strongly AWS-centered and wants queueing without operating brokers, clusters, upgrades, or queue internals directly. The strongest case for SQS is usually operational simplicity and cloud-native alignment.',
    ],
  },
  {
    id: 'bp-same-word',
    title: 'Same Word, Different Shape',
    paragraphs: [
      'People often call both systems message queues, but RabbitMQ is more accurately discussed as a broker platform while SQS is more accurately discussed as a managed queueing service. RabbitMQ gives you broker concepts such as exchanges, routing keys, bindings, and consumer acknowledgements. SQS gives you queue types, visibility timeouts, polling, dead-letter queues, and service-managed scaling.',
      'That difference matters because the surrounding system design changes. With RabbitMQ, the broker is part of the applications messaging logic. With SQS, the queue is usually one AWS service in a broader event or processing pipeline.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'One common mistake is to compare them as if they are drop-in equivalents. They overlap, but they do not begin from the same abstraction. RabbitMQ is stronger when broker behavior itself matters. SQS is stronger when managed queueing and operational simplicity matter.',
      'Another mistake is to ignore the rest of the platform. In AWS-native systems, SQS often pairs naturally with Lambda, IAM, CloudWatch, DLQs, and surrounding services. In broker-centric systems, RabbitMQ often wins because exchanges and routing rules are central to the design itself.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose RabbitMQ when routing flexibility, broker features, and messaging topology are part of the applications core design.',
      'Choose SQS when you want a durable managed queueing service with very low operational burden and strong AWS integration.',
      'If the main problem is durable decoupling in AWS, SQS is often the easier answer. If the main problem is rich broker-mediated messaging, RabbitMQ is often the better fit.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both RabbitMQ and SQS can decouple producers from consumers, absorb bursts, support retry patterns, and improve resilience by making work asynchronous. Both can also be paired with dead-letter handling and consumer-side idempotency.',
      'That shared ground is important, but the systems differ sharply in control surface. RabbitMQ exposes more messaging mechanics directly. SQS deliberately hides more of the machinery behind a managed service model.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture',
    paragraphs: [
      'RabbitMQ is a broker. Producers publish to exchanges, exchanges route to queues, and consumers read from queues. The broker participates actively in delivery behavior and routing topology.',
      'SQS is a queue service. Producers send messages to a queue, consumers poll that queue, and the queue service coordinates durability and delivery state. There is no RabbitMQ-style exchange and binding model inside SQS itself.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Topology',
    paragraphs: [
      'RabbitMQ is much stronger when routing complexity matters. Exchanges, binding keys, direct and topic patterns, fanout behavior, and broker-side topology are fundamental to how RabbitMQ is used.',
      'SQS is intentionally simpler. If the system needs publish-subscribe fanout or broader event routing, AWS teams often introduce adjacent services rather than expecting SQS alone to act like a full broker with rich routing semantics.',
    ],
  },
  {
    id: 'core-delivery',
    title: 'Delivery Semantics',
    paragraphs: [
      'RabbitMQ emphasizes acknowledgements, prefetch, publisher confirms, and consumer control over how deliveries are handled. It gives teams more immediate broker-level tools for tuning reliability and throughput tradeoffs.',
      'SQS emphasizes queue type choices and visibility semantics. Standard queues are at-least-once and best-effort ordered, while FIFO queues are designed for ordered, deduplicated processing with message-group based sequencing.',
    ],
  },
  {
    id: 'core-consumption',
    title: 'Push vs Pull Consumption',
    paragraphs: [
      'RabbitMQ commonly pushes deliveries to registered consumers, with acknowledgement control and prefetch helping manage consumer load. That makes it feel like a true broker coordinating active message flow.',
      'SQS is pull-based from the consumer perspective. Consumers call ReceiveMessage, use visibility timeout to process, and delete on success. Long polling reduces empty receives and cost, but the overall feel is still service polling rather than broker push delivery.',
    ],
  },
  {
    id: 'core-ordering',
    title: 'Ordering and Duplication',
    paragraphs: [
      'RabbitMQ ordering depends on queue behavior, consumer setup, acknowledgements, and topology. It can support ordered consumption patterns, but the actual guarantees depend on how the queue and consumers are configured.',
      'SQS makes the distinction explicit at the queue-type level. Standard queues prioritize scale with at-least-once delivery and possible duplicate or out-of-order delivery. FIFO queues trade off for ordering and deduplication behavior through message groups and FIFO semantics.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Ownership',
    paragraphs: [
      'RabbitMQ requires broker ownership. Whether self-managed or provider-managed, teams still think about broker behavior, queue types, durability, clustering decisions, upgrades, monitoring, and operational failure modes.',
      'SQS removes most of that burden. You create queues, set policies and parameters, and rely on AWS for service operation. This is often the deciding advantage in teams that want queueing without becoming broker operators.',
    ],
  },
  {
    id: 'core-scale',
    title: 'Scale and Throughput Mindset',
    paragraphs: [
      'RabbitMQ can handle serious workloads, but scale planning remains part of broker design and operations. Teams need to think about topology, consumers, queue behavior, acknowledgements, and operational tuning as load grows.',
      'SQS standard queues are designed for very high scale with service-managed durability and elasticity. That makes SQS especially attractive for straightforward decoupling pipelines where the system mainly needs a reliable, scalable queue rather than broker-rich behavior.',
    ],
  },
  {
    id: 'core-retries',
    title: 'Retries, Visibility, and Dead Letters',
    paragraphs: [
      'RabbitMQ retry behavior is often built through acknowledgement and requeue patterns, TTL, dead-letter exchanges, and topology choices. It gives flexibility, but teams must design the policy carefully.',
      'SQS bakes retry handling into visibility timeouts, receive counts, and dead-letter queues. This often feels simpler operationally, but the model is narrower and more queue-service oriented than broker-topology oriented.',
    ],
  },
  {
    id: 'core-platform-fit',
    title: 'Platform and Ecosystem Fit',
    paragraphs: [
      'RabbitMQ fits well in environments that want broker-centric messaging as a distinct architectural capability, especially when routing sophistication matters or when the system spans more than one application style or protocol expectation.',
      'SQS fits best in AWS-native systems where queueing is one building block among IAM, Lambda, CloudWatch, DLQs, autoscaling consumers, and surrounding service patterns. The more AWS-native the platform, the stronger SQS usually looks.',
    ],
  },
  {
    id: 'core-latency',
    title: 'Latency and Interaction Style',
    paragraphs: [
      'RabbitMQ often feels more immediate for broker-mediated workflows because consumers subscribe and the broker actively manages delivery. That can be useful when the system wants broker participation in flow and routing.',
      'SQS interactions are shaped by polling, visibility timeout, and queue retrieval behavior. This model is durable and simple, but it feels more like service-based work retrieval than like a live broker orchestrating message flow.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward RabbitMQ if the design depends on exchanges, bindings, push-style broker delivery, routing keys, or richer broker semantics.',
      'Lean toward SQS if the main problem is durable managed queueing in AWS and the team wants minimal broker operations.',
      'If the system needs advanced routing and queueing at the same time, ask whether broker topology is truly central. If yes, RabbitMQ is often the better answer. If no, SQS often wins on operational efficiency.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-consume',
    title: 'Basic Produce and Consume Flow',
    description:
      'The programming feel diverges quickly: RabbitMQ is broker-centric with acknowledgements, while SQS is queue-service centric with receive and delete.',
    snippets: [
      {
        label: 'RabbitMQ',
        code: `channel.queueDeclare("jobs", true, false, false, null)
channel.basicConsume("jobs", false, (tag, delivery) -> {
  process(delivery.getBody())
  channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false)
}, tag -> {})`,
      },
      {
        label: 'Amazon SQS',
        code: `ReceiveMessageResponse response = sqs.receiveMessage(request)

for (Message message : response.messages()) {
  process(message.body())
  sqs.deleteMessage(deleteRequestFor(message))
}`,
      },
    ],
    takeaway:
      'RabbitMQ exposes broker acknowledgement semantics directly. SQS exposes receipt and deletion around visibility timeout.',
  },
  {
    id: 'examples-routing',
    title: 'Routing Topology vs Simple Queueing',
    description:
      'RabbitMQ treats routing as a first-class broker concern. SQS treats queueing as the first-class concern and keeps routing much simpler.',
    snippets: [
      {
        label: 'RabbitMQ',
        code: `channel.exchangeDeclare("events", "topic", true)
channel.queueDeclare("billing-q", true, false, false, null)
channel.queueBind("billing-q", "events", "order.*")`,
      },
      {
        label: 'Amazon SQS',
        code: `# Create one queue per workload
aws sqs create-queue --queue-name billing-jobs

# Producer sends directly to the queue URL
aws sqs send-message --queue-url "$BILLING_QUEUE_URL" --message-body '{"type":"order.created"}'`,
      },
    ],
    takeaway:
      'If broker-side routing is central, RabbitMQ is structurally stronger. If direct queue-based decoupling is enough, SQS is often simpler.',
  },
  {
    id: 'examples-fifo',
    title: 'Ordered Processing',
    description:
      'Ordered processing exists in both ecosystems, but SQS exposes it through queue type and message groups while RabbitMQ exposes it through queue and consumer behavior.',
    snippets: [
      {
        label: 'RabbitMQ',
        code: `channel.basicQos(1)
channel.basicConsume("account-events", false, consumer)

# Single active consumer pattern or careful consumer design
# is typically used when strict per-queue order matters`,
      },
      {
        label: 'Amazon SQS FIFO',
        code: `aws sqs send-message \\
  --queue-url "$FIFO_QUEUE_URL" \\
  --message-body '{"accountId":"42","event":"credited"}' \\
  --message-group-id "account-42" \\
  --message-deduplication-id "evt-123"`,
      },
    ],
    takeaway:
      'SQS makes ordered queue behavior explicit through FIFO queues and message groups. RabbitMQ gives more flexibility, but the ordering story is more topology-dependent.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb keeps the comparison grounded in shape of system rather than generic messaging hype.',
    snippets: [
      {
        label: 'RabbitMQ Rule',
        code: `If the system needs broker routing,
exchange-based topology,
and richer messaging semantics:
  choose RabbitMQ`,
      },
      {
        label: 'SQS Rule',
        code: `If the system needs managed durable queues
with deep AWS integration
and minimal broker operations:
  choose SQS`,
      },
    ],
    takeaway:
      'The better tool depends on whether broker behavior or managed queueing is the real center of gravity.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Broker',
    definition:
      'A messaging system that actively routes, stores, and delivers messages according to configurable topology and protocol behavior.',
  },
  {
    term: 'Queue Service',
    definition:
      'A managed service that provides queue-based message storage and retrieval without exposing broker internals as deeply.',
  },
  {
    term: 'Exchange',
    definition:
      'A RabbitMQ routing component that receives published messages and routes them to queues based on bindings and exchange type.',
  },
  {
    term: 'Binding',
    definition:
      'A RabbitMQ association between an exchange and a queue or another exchange, often using a routing key or pattern.',
  },
  {
    term: 'Routing Key',
    definition: 'A message attribute used by RabbitMQ exchanges to decide routing behavior.',
  },
  {
    term: 'Visibility Timeout',
    definition:
      'The period during which an SQS message remains hidden from other consumers after being received.',
  },
  {
    term: 'Long Polling',
    definition:
      'An SQS receive strategy that waits for messages to arrive, reducing empty responses and request cost.',
  },
  {
    term: 'DLQ',
    definition: 'Dead-letter queue, a destination for messages that fail processing repeatedly.',
  },
  {
    term: 'Publisher Confirm',
    definition:
      'A RabbitMQ broker acknowledgement that a published message has been accepted safely enough for the chosen queue semantics.',
  },
  {
    term: 'Prefetch',
    definition:
      'A RabbitMQ consumer setting that limits unacknowledged deliveries in flight to a consumer.',
  },
  {
    term: 'FIFO Queue',
    definition:
      'An SQS queue type designed for ordered, deduplicated processing using message groups.',
  },
  {
    term: 'Standard Queue',
    definition:
      'The default SQS queue type, designed for high scale with at-least-once delivery and possible out-of-order or duplicate delivery.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function RabbitMqVsSqsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'RabbitMQ vs SQS',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="RabbitMQ vs SQS"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">RabbitMQ vs SQS</h1>
      <p className="bin98-doc-subtitle">
        Manual-style comparison of broker architecture, managed queueing, delivery semantics, and
        operational tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
