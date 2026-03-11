import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS EventBridge'
const pageSubtitle = 'Event routing, integration, scheduling, and event-driven coordination on AWS.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon EventBridge is AWS\'s event routing and event integration service. It receives events from AWS services, custom applications, SaaS partners, schedulers, and pipes, matches them against event patterns, and routes them to targets such as Lambda, Step Functions, SQS, API destinations, or other event buses.',
      'The key idea is decoupling by event contract. Producers publish events. Consumers subscribe through rules and targets. The event bus becomes the policy and routing layer rather than every producer needing to know every consumer directly.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'EventBridge fits in event-driven architectures where systems should react to facts rather than call each other synchronously for every downstream action. It commonly coordinates automation, notifications, workflow triggers, audit fan-out, integration between AWS accounts, and service-to-service events.',
      'It is not a queue and not a general-purpose stream processor. It routes discrete events and applies matching and target delivery behavior. That makes it complementary to services such as SQS, SNS, Step Functions, and Kinesis rather than a replacement for all of them.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use EventBridge because it reduces direct coupling. New consumers can be added by creating new rules and targets without changing the producers, and AWS service events can become part of the same integration surface as application events.',
      'It also centralizes event policy. Event buses, resource policies, retry behavior, dead-letter handling, archives, replay, and cross-account routing give teams a controlled event backbone rather than a pile of hidden point-to-point triggers.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'EventBridge is a poor fit when you really need a work queue with consumer-controlled pull semantics, strict ordering, or queue-specific redrive behavior. SQS is usually the right answer there. It is also a poor fit for high-throughput ordered stream analytics, where Kinesis or Kafka-like tooling is a better match.',
      'It is also easy to misuse EventBridge as a dumping ground for poorly defined events. If the event contract is vague, everything downstream becomes guesswork and debugging gets harder rather than easier.',
    ],
  },
]

const capabilityGuide = [
  {
    title: 'Event buses and rules',
    summary:
      'Core EventBridge behavior: receive events on a bus, match them with rules, and deliver to targets.',
    details: [
      'Supports AWS service events, custom application events, and partner events.',
      'Best when you want event routing by event pattern.',
      'The bus is the policy and routing boundary, not just a transport.',
    ],
  },
  {
    title: 'EventBridge Scheduler',
    summary:
      'Best when you need time-based invocation and event emission with flexible scheduling and target delivery.',
    details: [
      'Useful for one-time or recurring schedules.',
      'Separates time-based orchestration from application code.',
      'More expressive than forcing all schedules through application cron logic.',
    ],
  },
  {
    title: 'EventBridge Pipes',
    summary:
      'Best when you need point-to-point integration from a source to a target with optional filtering and enrichment.',
    details: [
      'Useful for connecting supported sources such as queues or streams to targets without writing glue code.',
      'Helps when the integration path is direct rather than bus-oriented.',
      'Not the same thing as a general event bus; it is a defined source-to-target pipeline.',
    ],
  },
]

const lifecycleFlow = [
  'An event is produced by an AWS service, a custom application, a SaaS partner, a schedule, or a pipe source.',
  'The event arrives on an event bus or enters a pipe or schedule path.',
  'Rules or filters decide whether the event matches and which targets should receive it.',
  'EventBridge applies target delivery behavior, including retries, dead-letter queues where configured, and any target-specific invocation settings.',
  'Downstream systems react independently, which is the whole reason the producer did not directly call all of them in the first place.',
]

const fitGuide = [
  {
    title: 'Need event routing by pattern across multiple producers and consumers',
    choice: 'Choose EventBridge.',
  },
  {
    title: 'Need durable pull-based work queues or queue redrive workflows',
    choice: 'Prefer SQS.',
  },
  {
    title: 'Need simple pub-sub fanout to endpoints like email, SMS, HTTP, Lambda, or SQS',
    choice: 'Consider SNS depending on delivery shape.',
  },
  {
    title: 'Need scheduled invocation without embedding cron logic in application code',
    choice: 'Use EventBridge Scheduler.',
  },
]

const coreConceptSections = [
  {
    id: 'core-bus',
    heading: 'Event Buses',
    paragraphs: [
      'An event bus is the logical boundary where events are received and rules are evaluated. The default bus commonly receives AWS service events, while custom buses are often used for application-domain events or clearer organizational separation.',
      'Treat event buses as policy boundaries. Permissions, rule ownership, cross-account access, and event contract governance become easier when buses represent real domains rather than one giant undifferentiated event dumping ground.',
    ],
  },
  {
    id: 'core-rules',
    heading: 'Rules and Event Patterns',
    paragraphs: [
      'Rules are how EventBridge decides what to do with events. A rule usually matches an event pattern and forwards matching events to one or more targets. Event patterns should be specific enough to reflect actual business intent rather than broad patterns that accidentally catch unrelated events.',
      'Weak patterns are one of the most common EventBridge problems. If the pattern is too broad, unrelated events fire the same automation. If it is too narrow or tied to unstable fields, important events get lost from the intended workflow.',
    ],
  },
  {
    id: 'core-targets',
    heading: 'Targets and Delivery',
    paragraphs: [
      'Targets are the systems EventBridge invokes after a rule match. Common targets include Lambda, Step Functions, SQS, SNS, API destinations, ECS tasks, and other EventBridge buses. Target choice matters because each target implies a different failure and operational model.',
      'EventBridge routing is not the same as successful business completion. A rule match and target invocation still need downstream idempotency, observability, and failure handling. Event-driven design works only when the consumer contract is operationally sound.',
    ],
  },
  {
    id: 'core-retries',
    heading: 'Retries, DLQs, and Delivery Semantics',
    paragraphs: [
      'EventBridge can retry event delivery to targets for retriable failures according to target retry policy, and you can configure dead-letter queues for failed deliveries. This is essential because an event-driven system without failure capture is just a quiet data-loss system.',
      'Not every failure path behaves identically. Some failures are retriable, others are sent directly to a DLQ when configured, and some upstream AWS service events are delivered on either best-effort or durable semantics depending on the service. Teams should understand those guarantees before treating every event as equally reliable.',
    ],
  },
  {
    id: 'core-cross-account',
    heading: 'Cross-Account and Cross-Region Routing',
    paragraphs: [
      'EventBridge can send events between accounts and, in supported patterns, between Regions through event bus targets. Resource policies on event buses are central here because the receiving bus must explicitly allow who may put events or manage relevant rule and target operations.',
      'Cross-account routing is powerful for platform architectures, but it also raises governance stakes. If the account boundary matters, rules should usually match on the `account` field or other identifying dimensions deliberately rather than assuming every permitted event source is equally trusted.',
    ],
  },
  {
    id: 'core-scheduler',
    heading: 'EventBridge Scheduler',
    paragraphs: [
      'EventBridge Scheduler is the time-based side of the platform. It creates one-time or recurring schedules that invoke supported targets without forcing scheduling logic into application code or requiring a permanently running cron host.',
      'This matters because time-based automation is also event orchestration. A schedule should be treated as a first-class integration contract with permissions, retry behavior, target ownership, and observability, not as a hidden timer buried inside one service.',
    ],
  },
  {
    id: 'core-pipes',
    heading: 'EventBridge Pipes',
    paragraphs: [
      'EventBridge Pipes connect a supported source directly to a target with optional filtering and enrichment. Pipes are useful when the integration path is naturally source-to-target and you do not need the broader fanout and routing model of an event bus.',
      'A common design mistake is forcing everything through a bus when the actual requirement is a simple ingestion pipeline, or forcing everything into a pipe when multiple consumers and domain-level event routing are the real need. Pipes and buses solve related but different problems.',
    ],
  },
  {
    id: 'core-archives',
    heading: 'Archives and Replay',
    paragraphs: [
      'EventBridge archives let you retain matched events from a bus so they can be replayed later. Replay is useful for recovering from consumer bugs, backfilling new consumers, testing event-driven fixes, or rebuilding downstream state after an incident.',
      'Replay changes the operational model because consumers must be ready for duplicated or historical events. If downstream handlers are not idempotent or do not understand event time versus processing time, replay can create a second incident while trying to fix the first one.',
    ],
  },
  {
    id: 'core-schemas',
    heading: 'Schemas and Event Contracts',
    paragraphs: [
      'Event-driven systems become healthier when event shape is treated as a contract rather than tribal knowledge. EventBridge schema discovery and registry features can help teams understand and generate code from event formats, but the larger point is governance: event fields, versioning, and meaning need to stay coherent over time.',
      'Good event contracts are specific, stable, and business meaningful. An event named after an internal implementation detail usually ages badly because downstream consumers end up coupled to something the producer never intended to make durable.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability and Day-Two Operations',
    paragraphs: [
      'EventBridge systems are harder to debug than synchronous request paths because the producer and consumer are decoupled in time and responsibility. Good observability therefore needs structured event detail, target-level failure visibility, dead-letter inspection, trace or correlation identifiers, and enough logging in consumers to reconstruct event handling.',
      'Day-two operations also include rule ownership, target drift review, archive retention choices, replay runbooks, and a clear model for how event contracts are versioned or retired. Event platforms fail socially as often as they fail technically.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security and Governance',
    paragraphs: [
      'Security on EventBridge is mostly about permissions and trust boundaries: who may put events, who may create or alter rules, what cross-account routes are allowed, and which targets can be invoked. Event buses should be protected with resource policies and least-privilege IAM rather than treated as open internal plumbing.',
      'Governance matters because routing logic becomes powerful quickly. A broad rule with a sensitive target can turn an innocent-looking event into a privileged action path. Event-driven automation should be reviewed like any other production control path.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Use explicit event domains',
    detail:
      'Separate domain events, platform events, and noisy internal diagnostics where possible. One giant bus with vague event names becomes hard to govern quickly.',
  },
  {
    title: 'Design for idempotency',
    detail:
      'Consumers should be able to tolerate duplicate delivery and replay. Event-driven systems are safer when handling an event twice is not catastrophic.',
  },
  {
    title: 'Own rule sprawl',
    detail:
      'Rules accumulate quietly over time. Review who owns them, what they target, and whether they still reflect intended business behavior.',
  },
  {
    title: 'Watch target failure paths',
    detail:
      'If retries and dead-letter queues are not monitored, failed automation paths become silent operational debt rather than visible incidents.',
  },
  {
    title: 'Treat schemas as contracts',
    detail:
      'Version event shape intentionally. Consumers should not reverse-engineer meaning from unstable payload details or implementation-specific field names.',
  },
]

const designPatterns = [
  {
    title: 'Domain event backbone',
    detail:
      'Services publish domain events such as order-created or invoice-paid onto a custom bus, and downstream consumers attach their own rules independently for notifications, analytics, workflow, and audit processing.',
  },
  {
    title: 'Platform automation bus',
    detail:
      'AWS service events and operational custom events trigger remediation, compliance checks, or operational workflows without every producer directly knowing every automation target.',
  },
  {
    title: 'Scheduler-driven orchestration',
    detail:
      'Time-based jobs are expressed as EventBridge schedules that invoke Step Functions, Lambda, or APIs, keeping schedule logic outside the application runtime.',
  },
  {
    title: 'Pipe-based source-to-target integration',
    detail:
      'A source such as SQS or DynamoDB Streams is connected to a single target through filtering and enrichment without needing a full event-bus fanout pattern.',
  },
]

const pitfalls = [
  'Treating EventBridge like a queue and then being surprised by queue-specific semantics that it does not provide.',
  'Publishing poorly defined events whose meaning is obvious only to the original producer team.',
  'Writing overly broad event patterns that match unrelated traffic and trigger incorrect automations.',
  'Ignoring DLQs, retries, and failure visibility until important events start disappearing into the void.',
  'Assuming cross-account routing is safe without carefully designed event-bus resource policies and filtering.',
  'Building consumers that are not idempotent and then failing badly during retries or replay.',
  'Using replay without understanding historical event effects and event-time versus processing-time assumptions.',
  'Letting rule ownership drift until nobody knows why a target still fires.',
]

const examples = [
  {
    id: 'ex-custom-event',
    title: 'Custom application event',
    code: `{
  "Source": "com.example.orders",
  "DetailType": "order.created",
  "Detail": "{\\"orderId\\":\\"123\\",\\"customerId\\":\\"c-42\\"}",
  "EventBusName": "app-domain-bus"
}`,
    explanation:
      'A custom event should have a stable source, a meaningful detail type, and a payload that describes a business fact rather than an internal implementation accident.',
  },
  {
    id: 'ex-pattern',
    title: 'Event pattern shape',
    code: `{
  "source": ["com.example.orders"],
  "detail-type": ["order.created"],
  "detail": {
    "priority": ["high"]
  }
}`,
    explanation:
      'Patterns should be selective enough to reflect actual intent. Good patterns route business meaning, not vague payload coincidence.',
  },
  {
    id: 'ex-cross-account',
    title: 'Cross-account event path',
    code: `Producer account
  -> custom event bus
  -> rule
  -> target: event bus in consumer account

Consumer account
  -> event bus resource policy allows source account
  -> local rules route to targets`,
    explanation:
      'Cross-account routing works best when the bus boundary is explicit and the receiving account owns its own downstream rules.',
  },
  {
    id: 'ex-pipe',
    title: 'Pipe mental model',
    code: `Source
  -> filter
  -> optional enrichment
  -> target

Use when:
  one source
  one target path
  no broad fanout requirement`,
    explanation:
      'Pipes are useful when the integration path is direct. They are not a universal substitute for event buses.',
  },
]

const glossaryTerms = [
  {
    term: 'Event bus',
    definition:
      'The EventBridge boundary where events are received and rules are evaluated.',
  },
  {
    term: 'Rule',
    definition:
      'The EventBridge routing object that matches an event pattern and forwards matching events to one or more targets.',
  },
  {
    term: 'Target',
    definition:
      'A downstream service or endpoint that EventBridge invokes after a rule match.',
  },
  {
    term: 'Event pattern',
    definition:
      'The matching expression used by a rule to decide whether an event should trigger a target.',
  },
  {
    term: 'Scheduler',
    definition:
      'The EventBridge capability for one-time or recurring time-based invocation of targets.',
  },
  {
    term: 'Pipe',
    definition:
      'A source-to-target integration path with optional filtering and enrichment.',
  },
  {
    term: 'Archive',
    definition:
      'An EventBridge feature that stores events from a bus for later replay.',
  },
  {
    term: 'Replay',
    definition:
      'The process of resending archived events back through matching rules to re-drive downstream processing.',
  },
  {
    term: 'API destination',
    definition:
      'An EventBridge target type used to invoke external HTTP APIs as part of event delivery.',
  },
  {
    term: 'DLQ',
    definition:
      'A dead-letter queue used to capture failed target deliveries for later inspection and recovery.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-replay.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema.html',
  'https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html',
  'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html',
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
    { id: 'bp-capabilities', label: 'Capabilities' },
    { id: 'bp-flow', label: 'Lifecycle Flow' },
    { id: 'bp-fit', label: 'When to Choose EventBridge' },
  ],
  'core-concepts': [
    { id: 'core-bus', label: 'Event Buses' },
    { id: 'core-rules', label: 'Rules and Patterns' },
    { id: 'core-targets', label: 'Targets' },
    { id: 'core-retries', label: 'Retries and DLQs' },
    { id: 'core-cross-account', label: 'Cross-Account Routing' },
    { id: 'core-scheduler', label: 'Scheduler' },
    { id: 'core-pipes', label: 'Pipes' },
    { id: 'core-archives', label: 'Archives and Replay' },
    { id: 'core-schemas', label: 'Schemas' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const eventBridgeHelpStyles = `
.eventbridge-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.eventbridge-help-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.eventbridge-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.eventbridge-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.eventbridge-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.eventbridge-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
}

.eventbridge-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.eventbridge-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.eventbridge-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.eventbridge-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.eventbridge-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.eventbridge-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.eventbridge-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.eventbridge-help-toc-list li {
  margin: 0 0 8px;
}

.eventbridge-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.eventbridge-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.eventbridge-help-title-main {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.eventbridge-help-section {
  margin: 0 0 20px;
}

.eventbridge-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.eventbridge-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.eventbridge-help-content p,
.eventbridge-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.eventbridge-help-content p {
  margin: 0 0 10px;
}

.eventbridge-help-content ul,
.eventbridge-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.eventbridge-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.eventbridge-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.eventbridge-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.eventbridge-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .eventbridge-help-main {
    grid-template-columns: 1fr;
  }

  .eventbridge-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsEventBridgePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

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
    <div className="eventbridge-help-page">
      <style>{eventBridgeHelpStyles}</style>
      <div className="eventbridge-help-window" role="presentation">
        <header className="eventbridge-help-titlebar">
          <span className="eventbridge-help-title">{pageTitle}</span>
          <div className="eventbridge-help-controls">
            <button className="eventbridge-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="eventbridge-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="eventbridge-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`eventbridge-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="eventbridge-help-main">
          <aside className="eventbridge-help-toc" aria-label="Table of contents">
            <h2 className="eventbridge-help-toc-title">Contents</h2>
            <ul className="eventbridge-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="eventbridge-help-content">
            <h1 className="eventbridge-help-title-main">{pageTitle}</h1>
            <p className="eventbridge-help-subheading">{pageSubtitle}</p>
            <p>
              This page treats EventBridge as an event platform rather than as a single AWS checkbox. The important questions are
              event contract quality, rule and target ownership, delivery semantics, cross-account governance, and whether the
              service is actually being used for the right event-driven job.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="eventbridge-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="eventbridge-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="eventbridge-help-divider" />
                <section id="bp-capabilities" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Capabilities</h2>
                  {capabilityGuide.map((item) => (
                    <div key={item.title}>
                      <h3 className="eventbridge-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <hr className="eventbridge-help-divider" />
                <section id="bp-flow" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Lifecycle Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <hr className="eventbridge-help-divider" />
                <section id="bp-fit" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">When to Choose EventBridge</h2>
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
                  <section key={section.id} id={section.id} className="eventbridge-help-section">
                    <h2 className="eventbridge-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="eventbridge-help-section">
                  <h2 className="eventbridge-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="eventbridge-help-section">
                    <h2 className="eventbridge-help-heading">{example.title}</h2>
                    <div className="eventbridge-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="eventbridge-help-section">
                <h2 className="eventbridge-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="eventbridge-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="eventbridge-help-inline-link" target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
