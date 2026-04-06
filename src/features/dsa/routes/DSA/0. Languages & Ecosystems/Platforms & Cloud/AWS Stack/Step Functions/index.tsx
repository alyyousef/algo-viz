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

const pageTitle = 'AWS Step Functions'
const pageSubtitle = 'Visual workflow orchestration on AWS for durable processes, service coordination, and large-scale parallel jobs.'

const introParagraphs = [
  'AWS Step Functions is AWS\'s workflow orchestration service. It lets you define state machines in Amazon States Language, coordinate work across AWS services and HTTPS APIs, apply retries and fallback logic declaratively, and visualize execution progress without writing a custom orchestration engine from scratch.',
  'The core value is not just "run steps in order." The real value is durable workflow state, structured error handling, service integrations, long-running orchestration, visual debugging, and clean separation between orchestration logic and the workers or services that do the actual business work.',
  'This page focuses on Step Functions as a systems-design tool: Standard vs Express workflows, state types, data flow, JSONPath and JSONata, service integration patterns, retries and callbacks, Distributed Map, observability, deployment safety, and the production mistakes that usually matter most.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Step Functions is a managed stateful workflow service. You describe a state machine in Amazon States Language, and Step Functions handles execution tracking, state persistence, retries, error transitions, and service-to-service orchestration.',
      'This is fundamentally different from gluing services together with ad hoc Lambda code or cron jobs. The workflow definition becomes a first-class artifact that can be reviewed, versioned, monitored, and reasoned about explicitly.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Step Functions when business processes or technical workflows span multiple services, have non-trivial failure paths, or require long-running coordination. It is common in serverless applications, ETL pipelines, approval workflows, remediation runbooks, document processing, payment or order flows, ML pipelines, and large-scale distributed processing jobs.',
      'It is especially useful when the alternative would be embedding orchestration state into application code, queues, and callback handlers in a way that becomes hard to debug or change safely over time.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Step Functions is an orchestrator, not the worker itself. Lambda, ECS, Batch, Glue, Bedrock, HTTP APIs, or SDK service calls do the real work. Step Functions decides what happens next, what to retry, what to do on failure, what to wait for, and what data shape moves between steps.',
      'That mental split is healthy. Orchestration logic belongs in the workflow. Compute-heavy or service-specific logic belongs in the integrated task. When that separation holds, workflows stay readable and workers stay simpler.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'Step Functions fits when the workflow itself has business value: branching logic, retries, approvals, human callbacks, child workflow fan-out, or explicit failure recovery. It is a strong fit for workflows that must be observable, resumable, auditable, or operationally durable.',
      'It is a poor fit when the workflow is just one synchronous function call, when a queue plus stateless worker is enough, or when orchestration overhead would be higher than the actual work. Not every sequence of three API calls deserves a state machine.',
    ],
  },
  {
    title: 'What changed in the platform recently',
    paragraphs: [
      'The Step Functions developer model is broader than older tutorials suggest. In addition to classic JSONPath-based state machines, AWS now recommends JSONata as the query language for data transformation and variable handling in new workflows, while still supporting JSONPath for compatibility and incremental migration.',
      'The service has also added deployment-oriented features such as versions and aliases, operational recovery features such as redrive for failed Standard executions, and higher-scale workflow patterns such as Distributed Map for large parallel data processing.',
    ],
  },
]

const workflowTypeGuide = [
  {
    title: 'Standard workflows',
    detail:
      'Durable, auditable, long-running workflows for up to one year. Standard workflows use an exactly-once execution model for steps unless you explicitly configure retries, making them the natural fit for non-idempotent orchestration such as payments, provisioning, approvals, and long business processes.',
  },
  {
    title: 'Express workflows',
    detail:
      'High-volume, short-duration workflows for up to five minutes. Express uses at-least-once semantics for asynchronous executions and is better suited to idempotent, high-throughput event handling, transformations, and request bursts where low per-execution overhead matters more than long-term history retention.',
  },
  {
    title: 'Synchronous Express execution',
    detail:
      'Express workflows can also run synchronously through StartSyncExecution for request-response style orchestration up to five minutes. This is useful when an API caller needs a fast orchestrated result, but it still inherits Express workflow tradeoffs rather than becoming a Standard workflow.',
  },
  {
    title: 'Workflow type immutability',
    detail:
      'AWS documents that the workflow type cannot be changed after the state machine is created. Choosing Standard versus Express is therefore an architectural decision, not a casual toggle you plan to revisit later without migration work.',
  },
]

const fitGuide = [
  {
    title: 'Need long-running, durable, auditable orchestration with explicit error paths',
    choice: 'Choose Standard workflows.',
  },
  {
    title: 'Need very high event rate orchestration for short idempotent tasks',
    choice: 'Choose Express workflows.',
  },
  {
    title: 'Need callback tokens or .sync job waiting patterns',
    choice: 'Use Standard workflows, because Express does not support those patterns.',
  },
  {
    title: 'Need to coordinate large parallel work across S3 data sets',
    choice: 'Evaluate Distributed Map in a Standard workflow.',
  },
  {
    title: 'Need a small amount of synchronous application code orchestration with no real workflow value',
    choice: 'A state machine may be unnecessary. Simpler application logic or direct service integration may be enough.',
  },
  {
    title: 'Need deployment-safe routing between workflow revisions',
    choice: 'Use Step Functions versions and aliases rather than invoking only the mutable latest definition.',
  },
]

const keyTakeaways = [
  'Step Functions is an orchestrator, not a worker runtime.',
  'Standard and Express workflows solve different operational problems and have different execution guarantees.',
  'State machine data flow design is as important as control flow design.',
  'Retries, catches, callbacks, and integration patterns should be chosen per failure model, not copied blindly.',
  'The biggest Step Functions failures usually come from poor idempotency assumptions, overly chatty workflows, or using the wrong workflow type.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-asl',
    heading: 'Amazon States Language and the State Machine Model',
    paragraphs: [
      'A Step Functions workflow is defined in Amazon States Language, or ASL. The definition declares states, transitions, start state, end conditions, error handling, timeouts, and how input and output data move through the machine.',
      'The important engineering advantage is that orchestration becomes declarative. Instead of embedding retries, waits, branch logic, and service fan-out across many code paths, the control plane is visible in one state-machine definition.',
      'A good ASL definition is readable by operators and reviewers, not just by the original author. If the workflow cannot be understood without reading five worker functions and a deployment wiki, the orchestration boundary is too blurry.',
    ],
  },
  {
    id: 'core-state-types',
    heading: 'Core State Types',
    paragraphs: [
      'Step Functions supports several core state types. Task performs work through a service integration or compute target. Choice branches on conditions. Parallel runs branches concurrently. Map iterates over items. Pass reshapes or forwards data. Wait pauses execution. Succeed and Fail terminate the workflow intentionally.',
      'AWS also documents Distributed Map as a higher-scale Map processing mode for large data sets and child-workflow fan-out. This matters because ordinary Map is not the same thing as large-scale distributed data processing.',
      'Choosing the right state type keeps the workflow honest. If a Task state hides complicated orchestration logic that should really be a Choice or Map in the state machine, the design loses visibility and becomes harder to operate.',
    ],
  },
  {
    id: 'core-data-flow',
    heading: 'Input, Output, Paths, Variables, and Data Shape',
    paragraphs: [
      'Every Step Functions state receives input JSON and usually produces output JSON. Data shaping is therefore part of the workflow contract, not an implementation detail. Poor data-flow discipline creates bloated payloads, confusing state transitions, and expensive debugging.',
      'Historically many workflows used JSONPath features such as InputPath, Parameters, ResultPath, and OutputPath. AWS now documents JSONata and variables as the recommended path for new state machines, while JSONPath remains supported. That means new designs should think deliberately about which query language they want, instead of inheriting JSONPath by accident from old examples.',
      'The broader lesson is that data flow should be minimized. Pass only what each state needs, preserve only what later states require, and avoid carrying giant payloads through the entire execution when an identifier or S3 object key would do.',
    ],
  },
  {
    id: 'core-jsonata',
    heading: 'JSONPath, JSONata, and Variables',
    paragraphs: [
      'JSONPath-based state machines are still common and valid. They use path fields and intrinsic functions to select and transform data. This model is familiar to many existing Step Functions users and still appears in plenty of deployed workflows.',
      'AWS now recommends JSONata for new state machines because it provides a more expressive and consistent transformation model and works with variables. Variables make it easier to preserve values for later use without forcing them to remain threaded awkwardly through every state input and output.',
      'The practical advice is simple: if you are starting fresh, evaluate JSONata first. If you already have a working JSONPath-heavy fleet, migrate only when the benefits justify the change and the team can support both models safely during the transition.',
    ],
  },
  {
    id: 'core-integrations',
    heading: 'Service Integrations and Task Execution Patterns',
    paragraphs: [
      'Step Functions can integrate directly with many AWS services through optimized integrations and AWS SDK integrations. That means a Task state often does not need a Lambda wrapper just to call another AWS API. Removing unnecessary Lambda glue usually makes workflows cheaper, simpler, and easier to observe.',
      'AWS documents three main service integration patterns: request-response, run a job, and wait for callback with task token. Request-response moves on after the API returns. Run a job waits for a long-running integrated job to finish. Callback waits for an external actor to report completion using a task token.',
      'Picking the right pattern is a correctness decision. If the service starts a long-running job, request-response is usually the wrong pattern because the workflow will advance before the job is actually complete. If a human or external system must signal completion, callback is often the correct orchestration shape.',
    ],
  },
  {
    id: 'core-standard-express',
    heading: 'Standard vs Express Workflow Semantics',
    paragraphs: [
      'Standard workflows are durable and execution-history rich. They are built for business processes and long-running orchestration. Express workflows are built for very high rate, short-duration orchestration where throughput and cost profile matter more than long-term execution history.',
      'AWS documents an exactly-once model for Standard workflow steps unless you configure retries, and at-least-once semantics for asynchronous Express executions. That means idempotency requirements differ. An Express workflow that triggers a side effect should assume duplication is possible and design for safe repeats.',
      'The workflow type is also tied to feature support. Callback and .sync patterns are not supported in Express workflows, and Express durations are capped at five minutes. The workflow type is therefore not just a billing choice.',
    ],
  },
  {
    id: 'core-errors',
    heading: 'Retries, Catchers, Timeouts, and Failure Design',
    paragraphs: [
      'Step Functions has first-class retry and catch behavior. Retries allow backoff-based recovery for transient faults. Catch blocks route failures into compensating or diagnostic paths. This is one of the main reasons to use an orchestrator instead of hand-rolling retries in worker code only.',
      'But retries are not automatically safe. They multiply side-effect risk if the downstream action is not idempotent. Before you add a retry block, ask whether the task can safely run again and what state the world might already be in when the second attempt starts.',
      'Timeouts matter too. A workflow without explicit timeout thinking can hang operationally even if it never truly fails. Long-running waits should be intentional and paired with observability and escalation paths.',
    ],
  },
  {
    id: 'core-map-parallel',
    heading: 'Map, Parallel, and Distributed Map',
    paragraphs: [
      'Parallel states run independent branches concurrently. Map states iterate over a collection. Distributed Map takes the pattern further and can process very large data sets by reading from S3 data sources and starting child workflow executions at scale.',
      'This matters because not all parallelism is equal. A small in-memory item loop fits ordinary Map. Massive file-driven or high-cardinality workloads often want Distributed Map, especially when the input data already lives in S3 and each item can be handled independently.',
      'The failure design also changes with fan-out. A workflow that spawns hundreds or thousands of child units of work needs a clear stance on partial failure, concurrency limits, redrive, cost, and how much result aggregation is actually necessary.',
    ],
  },
  {
    id: 'core-callbacks',
    heading: 'Callbacks, Human-in-the-Loop, and External Coordination',
    paragraphs: [
      'Task token callbacks are one of Step Functions\' most powerful orchestration tools. The workflow issues work to another system, includes a task token, and waits until that system calls back with success or failure. This is ideal for approvals, external processors, third-party coordination, and asynchronous workflows that cannot complete within one synchronous request.',
      'The important rule is to secure and scope task-token handling carefully. A callback token is effectively part of the workflow control plane. If it is exposed carelessly or mixed across tenants, you can complete the wrong execution or introduce security problems.',
      'This pattern usually beats homegrown callback tables and ad hoc polling because the workflow waiting state remains visible and durable inside Step Functions itself.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Execution History, Logging, Metrics, and X-Ray',
    paragraphs: [
      'Step Functions gives you visual execution history, which is one of its biggest operational advantages. You can inspect the path an execution took, which state failed, what data entered and left a state, and how long each transition took. This is far more useful than trying to reconstruct orchestration from scattered worker logs alone.',
      'CloudWatch Logs, CloudWatch metrics, and X-Ray integration extend that visibility. The design goal should be correlated observability: workflow execution ID, downstream task logs, and business identifiers should all be traceable together so incidents can be diagnosed quickly.',
      'A workflow is only as operable as its execution data model. If state input and output are either too thin to diagnose issues or too bloated to read safely, debugging suffers in both directions.',
    ],
  },
  {
    id: 'core-deployment',
    heading: 'Versions, Aliases, and Deployment Safety',
    paragraphs: [
      'AWS Step Functions supports versions and aliases so you can publish immutable state machine versions and route invocations through stable alias names. This is useful for staged rollout, rollback, and avoiding accidental dependence on the mutable latest definition only.',
      'This matters more than many teams expect. Workflows are business logic. Changing them in place without a safe rollout path can break live orchestration in ways that are harder to reverse than a normal application deployment.',
      'If the state machine is mission critical, deployment safety should include definition review, versioning, alias-based invocation, and compatibility thinking for any in-flight executions or external callers.',
    ],
  },
  {
    id: 'core-redrive',
    heading: 'Redrive and Operational Recovery',
    paragraphs: [
      'AWS documents redrive support for failed, aborted, or timed-out Standard workflow executions within a defined redrivable period. This lets operators restart from the failed state rather than replaying the entire workflow from the beginning in some cases.',
      'Operationally, that is powerful, but it does not excuse poor task design. A redriven execution still depends on task idempotency, external-state correctness, and whether replaying from the failed point is actually safe.',
      'The right mindset is that redrive is an operator recovery aid, not a substitute for clear retries, compensating logic, or business-safe recovery procedures.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, IAM, and Least Privilege',
    paragraphs: [
      'A Step Functions state machine runs with an IAM execution role. That role needs permission to invoke the integrated services in the workflow. If the role is too broad, the workflow becomes an over-privileged control plane for your AWS environment.',
      'Least privilege matters because Step Functions often touches many services: Lambda, DynamoDB, SNS, ECS, Batch, Glue, EventBridge, Bedrock, and HTTP endpoints. A workflow can become a very powerful coordinator quickly, which means role design and resource scoping deserve serious attention.',
      'Security also includes data handling. Workflow inputs, outputs, and logs may contain sensitive business data if you are not careful. Keep sensitive payloads small, prefer references over raw bulk data when possible, and design logging with privacy in mind.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Cost Discipline',
    paragraphs: [
      'Standard workflows are billed by state transition. Express workflows are billed by execution count, duration, and memory. This means the cheapest architecture depends on workflow shape, not just service preference.',
      'A chatty Standard workflow with many tiny Pass or transformation states can become more expensive than necessary. A poorly designed Express workflow that retries non-idempotent side effects or pushes too much work through orchestration can also become expensive in failure handling and debugging cost even if the direct bill looks smaller at first.',
      'The real optimization is to keep Step Functions focused on orchestration. Do not turn it into a string of decorative micro-steps if a single integrated Task or a child workflow would express the same business boundary more cleanly.',
    ],
  },
  {
    id: 'core-anti-patterns',
    heading: 'Where Step Functions Is the Wrong Tool',
    paragraphs: [
      'Step Functions is the wrong tool when there is no meaningful workflow. If the application just needs one synchronous service call or one queue consumer, adding a state machine can create ceremony without operational benefit.',
      'It is also the wrong tool for arbitrarily high-frequency, ultra-low-latency request handling where orchestration durability is unnecessary. In those cases direct code or event processing may be simpler and faster.',
      'Another anti-pattern is pushing every line of business logic into Lambda tasks invoked by a giant state machine. If the workflow contains so many tiny orchestration-adjacent steps that it obscures the business process, the design has overfit the tool.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Direct service integrations before Lambda glue',
    detail:
      'Prefer native service integrations or AWS SDK integrations when the workflow is only coordinating AWS APIs. Lambda should add value, not just act as a thin pass-through wrapper for another AWS call.',
  },
  {
    title: 'Identifiers over giant payloads',
    detail:
      'Keep state payloads lean. Pass record IDs, S3 keys, or references instead of dragging large documents through every state unless the workflow truly needs the whole object in memory.',
  },
  {
    title: 'Child workflows for complex reuse',
    detail:
      'Break up large orchestration domains into child workflows or reusable boundaries when one monolithic state machine becomes difficult to reason about operationally.',
  },
  {
    title: 'Version and alias production workflows',
    detail:
      'Invoke stable aliases in production so rollout and rollback are controlled instead of tying critical callers directly to mutable latest definitions.',
  },
  {
    title: 'Design retries around idempotency',
    detail:
      'Treat retry configuration as part of task correctness. A retry-safe task and a non-idempotent task should not share the same retry assumptions.',
  },
  {
    title: 'Use Distributed Map only when scale justifies it',
    detail:
      'Distributed Map is powerful, but it is not a default replacement for ordinary Map. Use it when the data volume, S3-driven fan-out, or concurrency need is genuinely large.',
  },
]

const operationalChecklist = [
  'Choose Standard versus Express deliberately and document why the semantics match the workload.',
  'Keep workflow input and output minimal and explicit so execution history stays useful.',
  'Use direct service integrations where possible and reserve Lambda for actual business logic or protocol adaptation.',
  'Review retry and catch rules state by state, especially for side-effecting tasks.',
  'Ensure downstream tasks are idempotent if retries, Express semantics, or redrive are in play.',
  'Use versions and aliases for important production workflows instead of mutating a single live definition blindly.',
  'Correlate execution IDs with downstream logs, metrics, and business identifiers.',
  'Test failure paths, callback timeouts, Map concurrency, and operator recovery procedures before production incidents force them.',
]

const pitfalls = [
  'Choosing Express for a workflow that actually needs callback tokens, long duration, or detailed durable history.',
  'Choosing Standard for a huge firehose of tiny idempotent events when Express would fit better.',
  'Adding Lambda wrappers around simple SDK calls and turning the workflow into unnecessary glue code.',
  'Passing oversized payloads through many states instead of using compact references.',
  'Using retries on non-idempotent tasks without understanding duplicate side effects.',
  'Building giant monolithic state machines that mix orchestration and business logic until neither is clear.',
  'Treating Step Functions as a queue or stream processor instead of as an orchestrator.',
  'Ignoring security boundaries on execution roles, task tokens, and sensitive workflow data.',
  'Assuming visual execution history alone is enough without downstream log correlation.',
  'Using Distributed Map or high fan-out patterns without clear concurrency, failure, and cost controls.',
]

const compareNotes = [
  {
    title: 'Step Functions vs Lambda orchestration in code',
    detail:
      'Step Functions externalizes orchestration into a durable managed workflow. Lambda-only orchestration keeps everything in code, which can be simpler for tiny flows but usually becomes harder to inspect and recover as branching and retries grow.',
  },
  {
    title: 'Step Functions vs EventBridge',
    detail:
      'EventBridge routes events. Step Functions orchestrates multi-step workflows. They complement each other: EventBridge can start a state machine, and the state machine can then coordinate the actual process.',
  },
  {
    title: 'Step Functions vs SQS-based worker choreography',
    detail:
      'Queues excel at decoupled work distribution. Step Functions excels at explicit workflow control and state visibility. If the main problem is work buffering, use a queue. If the main problem is orchestrating multi-step logic, use a workflow.',
  },
  {
    title: 'Standard vs Express',
    detail:
      'Standard prioritizes durable long-running orchestration and richer history. Express prioritizes throughput and lower overhead for short-running idempotent workflows.',
  },
]

const examples: ExampleSection[] = [
  {
    id: 'ex-basic-flow',
    title: 'Basic request-response orchestration',
    code: '{\n  "StartAt": "ValidateOrder",\n  "States": {\n    "ValidateOrder": {\n      "Type": "Task",\n      "Resource": "arn:aws:states:::lambda:invoke",\n      "Next": "ChargeCard"\n    },\n    "ChargeCard": {\n      "Type": "Task",\n      "Resource": "arn:aws:states:::lambda:invoke",\n      "Next": "CreateShipment"\n    },\n    "CreateShipment": {\n      "Type": "Task",\n      "Resource": "arn:aws:states:::lambda:invoke",\n      "End": true\n    }\n  }\n}',
    explanation:
      'This is the simplest orchestration shape: sequential tasks with the workflow, not the application code, deciding the order. In production you would add retries, catches, and tighter data shaping.',
  },
  {
    id: 'ex-choice-retry',
    title: 'Branching with retries and fallback',
    code: 'ChargeCard:\n  Type: Task\n  Retry:\n    - ErrorEquals: ["States.Timeout", "Payments.Transient"]\n      IntervalSeconds: 2\n      BackoffRate: 2.0\n      MaxAttempts: 3\n  Catch:\n    - ErrorEquals: ["Payments.Declined"]\n      Next: MarkOrderFailed\n    - ErrorEquals: ["States.ALL"]\n      Next: SendToManualReview',
    explanation:
      'This is where Step Functions becomes valuable: retry transient failures, route business declines differently from system failures, and keep the recovery logic visible in the workflow definition.',
  },
  {
    id: 'ex-callback',
    title: 'Human approval with task token callback',
    code: 'Workflow\n  -> Task sends approval request with task token\n  -> waits in callback state\n  -> reviewer system calls SendTaskSuccess or SendTaskFailure\n  -> workflow continues or fails',
    explanation:
      'This is the canonical human-in-the-loop pattern. The workflow remains durable while waiting, instead of forcing custom polling tables or ad hoc callback state in application code.',
  },
  {
    id: 'ex-map',
    title: 'Map versus Distributed Map mindset',
    code: 'Small batch already in input JSON\n  -> ordinary Map state\n\nHuge S3-backed item set\n  -> Distributed Map\n  -> child workflows per shard or item\n  -> aggregate success/failure policy',
    explanation:
      'Choose the scaling primitive based on the size and source of the data set, not because one pattern sounds more advanced than the other.',
  },
  {
    id: 'ex-direct-sdk',
    title: 'Use direct SDK integration instead of Lambda glue',
    code: 'Task state\n  -> call DynamoDB PutItem through AWS SDK integration\n  -> call EventBridge PutEvents\n  -> call SNS Publish\n\nNo Lambda wrapper needed unless custom logic is required',
    explanation:
      'This reduces code surface area and often improves cost and observability. Lambda should exist for logic, not because every workflow step must call a function.',
  },
  {
    id: 'ex-version-alias',
    title: 'Version and alias deployment shape',
    code: 'State machine definition v12 published\n  -> alias prod points to v12\n  -> alias beta points to v13 candidate\n  -> callers use alias ARN, not mutable latest\n  -> rollback is alias movement, not emergency definition surgery',
    explanation:
      'Production workflow deployment should look more like application deployment discipline and less like editing a live control script in place.',
  },
]

const glossaryTerms = [
  {
    term: 'State machine',
    definition: 'A workflow definition in Step Functions written in Amazon States Language.',
  },
  {
    term: 'Execution',
    definition: 'A running or completed instance of a state machine with specific input and history.',
  },
  {
    term: 'Amazon States Language (ASL)',
    definition: 'The JSON-based language used to define Step Functions workflows.',
  },
  {
    term: 'Standard workflow',
    definition: 'The durable long-running Step Functions workflow type, suitable for executions up to one year.',
  },
  {
    term: 'Express workflow',
    definition: 'The high-throughput Step Functions workflow type for short executions up to five minutes.',
  },
  {
    term: 'Task state',
    definition: 'The state type that performs work through a service integration, SDK call, or compute target.',
  },
  {
    term: 'Choice state',
    definition: 'The state type that branches workflow control based on conditions.',
  },
  {
    term: 'Map state',
    definition: 'The state type that iterates over a collection of items.',
  },
  {
    term: 'Distributed Map',
    definition: 'The higher-scale Map mode that can process large data sets using child workflow executions.',
  },
  {
    term: 'Task token',
    definition: 'A token used by callback patterns so an external system can resume a waiting workflow task.',
  },
  {
    term: 'JSONPath',
    definition: 'A query and path model used in older and still-supported Step Functions data-flow definitions.',
  },
  {
    term: 'JSONata',
    definition: 'The newer recommended query language in Step Functions for many new workflows and variable-based data handling.',
  },
  {
    term: 'Redrive',
    definition: 'An operational recovery feature for restarting eligible failed Standard executions from the failed point.',
  },
  {
    term: 'Version',
    definition: 'An immutable published revision of a Step Functions state machine definition.',
  },
  {
    term: 'Alias',
    definition: 'A stable named pointer to one or more published Step Functions versions, used for controlled routing and deployment.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/statemachine-structure.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/state-task.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/workflow-variables.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/execution-redrive.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-state-machine-version.html',
  'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-state-machine-alias.html',
  'https://aws.amazon.com/step-functions/',
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
    { id: 'bp-workflow-types', label: 'Workflow Types' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-asl', label: 'Amazon States Language' },
    { id: 'core-state-types', label: 'State Types' },
    { id: 'core-data-flow', label: 'Data Flow' },
    { id: 'core-jsonata', label: 'JSONPath and JSONata' },
    { id: 'core-integrations', label: 'Service Integrations' },
    { id: 'core-standard-express', label: 'Standard vs Express' },
    { id: 'core-errors', label: 'Errors and Retries' },
    { id: 'core-map-parallel', label: 'Map and Parallel' },
    { id: 'core-callbacks', label: 'Callbacks' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-deployment', label: 'Versions and Aliases' },
    { id: 'core-redrive', label: 'Redrive' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-anti-patterns', label: 'Anti-Patterns' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.aws-step-functions-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.aws-step-functions-help-page .win98-window {
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

.aws-step-functions-help-page .win98-titlebar {
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

.aws-step-functions-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.aws-step-functions-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.aws-step-functions-help-page .win98-control {
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

.aws-step-functions-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.aws-step-functions-help-page .win98-tab {
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
.aws-step-functions-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.aws-step-functions-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.aws-step-functions-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.aws-step-functions-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.aws-step-functions-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.aws-step-functions-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.aws-step-functions-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.aws-step-functions-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.aws-step-functions-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.aws-step-functions-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.aws-step-functions-help-page .win98-section {
  margin: 0 0 22px;
}

.aws-step-functions-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.aws-step-functions-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.aws-step-functions-help-page .win98-content p,
.aws-step-functions-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.aws-step-functions-help-page .win98-content p {
  margin: 0 0 10px;
}

.aws-step-functions-help-page .win98-content ul,
.aws-step-functions-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.aws-step-functions-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.aws-step-functions-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.aws-step-functions-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.aws-step-functions-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .aws-step-functions-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .aws-step-functions-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .aws-step-functions-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AWSStepFunctionsPage(): JSX.Element {
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
    <div className="aws-step-functions-help-page">
      <style>{win98HelpStyles}</style>
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

                <section id="bp-workflow-types" className="win98-section">
                  <h2 className="win98-heading">Workflow Types</h2>
                  {workflowTypeGuide.map((item) => (
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
                    This content was compiled from official AWS documentation current as checked on March 12, 2026.
                    Step Functions features and integration support can change, so production decisions should always be
                    verified against the current service and Region documentation.
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




