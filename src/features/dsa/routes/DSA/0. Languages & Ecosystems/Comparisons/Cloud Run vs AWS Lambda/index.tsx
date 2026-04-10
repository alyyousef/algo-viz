import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  cloudRunCode: string
  lambdaCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Cloud Run vs AWS Lambda'
const pageSubtitle =
  'Comparing a container-native serverless platform with a function-native serverless platform.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cloud Run and AWS Lambda are both serverless platforms, but they represent two different ideas of what serverless compute should feel like. AWS Lambda is function-first. It expects code to run inside a Lambda execution environment and to react to invocations through a handler model. Cloud Run is container-first. It expects your code to run in a sandboxed container instance and, for services, to listen on an HTTP port. Both remove server management. The practical difference is what unit of software the platform considers primary: a function invocation or a containerized service.',
      'That difference changes almost everything downstream. Lambda tends to feel natural when the workload is event-driven and AWS-native: S3 notifications, queue messages, API Gateway requests, EventBridge rules, or stream records. Cloud Run tends to feel natural when the workload is already shaped like an HTTP service, API, webhook consumer, or containerized backend. In both cases the cloud provider handles scaling, infrastructure management, and much of the operational plumbing. The key divergence is the runtime boundary you are coding against.',
      'A useful shorthand is this: Lambda is the archetypal function-native serverless platform, while Cloud Run is the archetypal serverless container platform. Neither framing means one is more modern than the other. It means they optimize for different programming models, different team habits, and different architectural centers of gravity.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Lambda is built around the idea that the platform invocation is the main primitive. Even if you package the code in a container image, the platform still expects Lambda semantics: a handler, an invocation event, runtime initialization, and Lambda-managed scaling rules. The container image is a delivery format into the Lambda function model, not a general-purpose container host.',
      'Cloud Run starts from the opposite assumption. Google describes Cloud Run as a fully managed application platform that runs your code, function, or container on top of Google infrastructure, and the Cloud Run service contract is still fundamentally about running sandboxed container instances. For services, your responsibility is to make sure the code listens on a TCP port and handles HTTP requests. That makes Cloud Run feel closer to normal application hosting, only with serverless autoscaling and managed infrastructure wrapped around it.',
      'This is why Lambda often feels more provider-event-native, while Cloud Run often feels more application-shaped and container-shaped. Lambda wants work to look like invocations. Cloud Run wants work to look like a deployable service or job living inside a container boundary.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'AWS Lambda is strongest when the architecture is centered on events and on the AWS service ecosystem. It is especially compelling when functions are triggered by queues, object storage events, schedules, streams, or managed AWS integrations. If the workload is naturally decomposed into discrete functions that run in response to clearly defined triggers, Lambda often fits with very little conceptual friction.',
      'Cloud Run is strongest when the workload is naturally a service, an API, a webhook target, a small web application, a gRPC endpoint, or any other ordinary containerized workload that you want to run serverlessly. It is also attractive when you already have container habits, want a familiar deployment artifact, or want a serverless target that behaves more like regular application hosting than like a specialized function platform.',
      'If the real question is Which platform should I use for AWS-centric event-driven functions, Lambda usually wins. If the real question is Which platform should I use for serverless deployment of regular HTTP-speaking containers, Cloud Run usually wins. The decision boundary is not serverless versus not serverless. The decision boundary is function-first versus container-first.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose AWS Lambda when AWS-native events and function-shaped units of work are the natural fit.',
      'Choose Cloud Run when containerized HTTP services or web backends are the natural fit.',
      'Choose Lambda when you want the serverless platform deeply embedded in the AWS trigger ecosystem.',
      'Choose Cloud Run when you want serverless that still feels like deploying a normal containerized application.',
      'If the debate is really function-first versus container-first, that is the real architecture decision.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Lambda is function-native',
    detail:
      'Its core abstraction is the handler and the invocation lifecycle, even when the package happens to be a container image.',
  },
  {
    title: 'Cloud Run is container-native',
    detail:
      'Its core abstraction is a container instance that obeys the runtime contract and, for services, serves requests on a port.',
  },
  {
    title: 'Concurrency behaves differently',
    detail:
      'Lambda primarily scales by adding more execution environments, while Cloud Run can let one instance serve multiple requests concurrently depending on configuration.',
  },
  {
    title: 'HTTP service fit is not symmetrical',
    detail:
      'Cloud Run directly resembles web service hosting. Lambda can serve HTTP well, but the HTTP story is mediated by invocation semantics and AWS entry-point services.',
  },
  {
    title: 'Container image support does not erase platform identity',
    detail:
      'A Lambda container image still runs as a Lambda function. A Cloud Run container still runs as a Cloud Run service, job, or worker-oriented resource.',
  },
  {
    title: 'Cold starts are different kinds of startup cost',
    detail:
      'Lambda cold starts are tied to execution environment initialization. Cloud Run startup cost is tied more directly to container startup and instance provisioning.',
  },
  {
    title: 'Portability follows the software boundary',
    detail:
      'Cloud Run often feels more portable because the deployed artifact is a normal containerized application. Lambda couples more directly to AWS function and trigger semantics.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-execution',
    title: 'Execution Model and Lifecycle',
    paragraphs: [
      'Lambda documentation explicitly describes an execution environment lifecycle with phases such as Init, Invoke, and Shutdown. That is not just implementation detail. It is one of the defining characteristics of the product. Your code is loaded into a Lambda-managed runtime, initialization happens under Lambda rules, invocations occur inside that execution environment, and the environment may later be reused or shut down by the platform. Many Lambda performance techniques are really about understanding that lifecycle and writing code that behaves well inside it.',
      'Cloud Run feels closer to ordinary service hosting. Google documents Cloud Run services as reliable HTTPS endpoints backed by sandboxed container instances, and your main responsibility is to ensure the code listens on the configured port and handles requests. When an instance starts, it looks a lot more like a normal process starting inside a container. The platform still manages scaling, routing, and shutdown, but the userland programming model feels more like a service process than a function invocation lifecycle.',
      'This leads to a practical architectural distinction. In Lambda, you reason in terms of invocation boundaries and execution environment reuse. In Cloud Run, you reason in terms of instance startup, request handling, and service behavior. That one shift changes how caching, connection reuse, request multiplexing, and even local development tend to feel.',
    ],
  },
  {
    id: 'core-packaging',
    title: 'Packaging Model and Deployment Boundary',
    paragraphs: [
      'Lambda historically centers on zipped deployment packages plus a configured runtime and handler. AWS also supports container images, including images up to large sizes, but the platform documentation still frames those images as Lambda function packages. The important point is that Lambda container support does not turn Lambda into generic container hosting. You are packaging a Lambda function in a different way, not escaping the Lambda platform model.',
      'Cloud Run is built around the container boundary. Google explicitly says that code always ends up running in sandboxed container instances, and that even source-based deployment is ultimately building containers for you. This gives teams a very familiar deployment artifact. If the app can be containerized and can satisfy the Cloud Run contract, it is conceptually aligned with the platform from the start.',
      'That difference is often decisive in migrations. Existing services can frequently move toward Cloud Run with minimal conceptual translation because they are already application-shaped. Existing Lambda code is usually already function-shaped. The two platforms reward software that is already organized in their preferred unit.',
    ],
  },
  {
    id: 'core-http',
    title: 'HTTP Services, APIs, and Web Backend Fit',
    paragraphs: [
      'Cloud Run is unusually natural for HTTP APIs because the service model is directly about an HTTPS endpoint backed by container instances. Google documents features such as custom domains, WebSockets, HTTP/2, gRPC, traffic splitting, gradual rollouts, and request-based autoscaling. If you already have a Flask app, Express app, Go HTTP server, or Java web service, Cloud Run often feels like a direct serverless home.',
      'Lambda can also serve HTTP APIs very effectively, but the mental model is usually Lambda plus an entry layer such as API Gateway, Lambda Function URLs, or another AWS integration. The result can be excellent, but the developer experience is still centered on handler invocation rather than on a continuously listening web server process. Your framework choices, middleware patterns, and testing shape often follow from that difference.',
      'If the workload wants to behave like a conventional web service, Cloud Run usually feels cleaner. If the workload wants to be invoked as a discrete unit behind AWS-managed HTTP integration, Lambda often feels more native. Both can expose APIs. The question is what kind of API host the software wants to be.',
    ],
  },
  {
    id: 'core-events',
    title: 'Events, Triggers, and Architectural Center of Gravity',
    paragraphs: [
      'Lambda is one of the defining event-driven products in cloud architecture. The AWS ecosystem gives it rich trigger integration: object events, queues, schedules, streams, API events, and many more. That creates a strong architectural style in which small compute units react to provider-native events with very little glue code. For many AWS teams, this is not a side feature. It is the central reason Lambda exists.',
      'Cloud Run supports event-driven systems too. Google documents integrations with Eventarc, Pub/Sub push, scheduled invocations, asynchronous tasks, and Cloud Run jobs. The difference is not absence of event support. The difference is that Cloud Run usually begins as a service or a job, and events are a way to reach or activate that workload. Lambda more often begins with the event itself, and the function is a narrowly scoped reaction to it.',
      'That makes Lambda especially strong when events are the architecture. Cloud Run is especially strong when a service is the architecture and events are one way to feed that service. The distinction sounds subtle, but it shapes everything from code organization to retry strategy to how teams talk about ownership.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Scaling Behavior',
    paragraphs: [
      'Cloud Run exposes concurrency as a service-level design choice. Google documents maximum concurrent requests per instance, which means a single Cloud Run instance can often serve multiple requests at once. That is a familiar and powerful property for ordinary application servers. It lets teams think in terms closer to standard web-service concurrency, resource pooling, and instance utilization.',
      'Lambda treats concurrency differently. AWS documents concurrent executions as a first-class quota and scaling concept, and also documents per-function concurrency scaling behavior. Each invocation is conceptually isolated inside Lambda execution semantics, even when the platform reuses an execution environment across requests. That means concurrency usually feels like more concurrent function environments rather than one service instance multiplexing many simultaneous web requests.',
      'This distinction has real consequences for CPU saturation, memory behavior, connection management, and cost shape. Cloud Run often rewards code that can efficiently serve parallel requests from the same process. Lambda often rewards code that treats each invocation as a clean, isolated unit of work and lets the platform fan out horizontally.',
    ],
  },
  {
    id: 'core-coldstart',
    title: 'Cold Starts, Warm Capacity, and Startup Strategy',
    paragraphs: [
      'Lambda cold starts are tied to the execution environment lifecycle. The AWS docs call out initialization steps such as starting extensions, bootstrapping the runtime, and running static initialization code. If initialization is expensive, that cost is visible in first-invocation latency. AWS also offers tools such as provisioned concurrency and, in some cases, SnapStart to reduce startup penalties, which shows how central startup behavior is to Lambda operations.',
      'Cloud Run cold-start behavior is more directly about container startup and instance creation. Google documents scale to zero, minimum instances, and the fact that the first request after idle may incur extra latency while a new instance becomes ready. The performance question is therefore closely tied to how quickly the container boots, how heavy the framework stack is, and whether you keep minimum instances around.',
      'Both platforms can be tuned, but the knobs map to different mental models. Lambda asks, How expensive is my function initialization? Cloud Run asks, How expensive is starting my service container and how much idle capacity do I want to keep warm?',
    ],
  },
  {
    id: 'core-runtime',
    title: 'Runtime Freedom and Language Flexibility',
    paragraphs: [
      'Lambda supports multiple managed runtimes and also custom runtimes, but it still expects code to conform to the Lambda invocation model. The freedom is real, yet it is freedom inside a function platform. This is often excellent for event-driven units of work, but it means even custom runtime choices are still subordinate to handler invocation semantics, deployment rules, and Lambda execution constraints.',
      'Cloud Run usually feels freer because the software boundary is the container. Any language or framework that can run in a container and satisfy the service or job contract can generally fit. That often makes Cloud Run attractive for unusual framework combinations, self-hosted binaries, opinionated web frameworks, gRPC servers, or applications that expect more direct control over process startup and HTTP stack behavior.',
      'This difference does not mean Lambda is weak on runtime support. It means the control surface is framed differently. Lambda says, Bring code into the Lambda model. Cloud Run says, Bring a containerized application into the Cloud Run model. For many teams, that second statement feels closer to how they already build software.',
    ],
  },
  {
    id: 'core-background',
    title: 'Background Work, Batch Jobs, and Non-HTTP Tasks',
    paragraphs: [
      'Lambda is very strong for short-lived background work triggered by queues, object changes, schedules, or workflow steps. That is one of its natural shapes. A message arrives, the function processes it, perhaps writes a result, and exits. The unit of background work is already function-shaped, so the platform model and workload model align cleanly.',
      'Cloud Run can handle background and batch workloads too, but it does so through a broader container-oriented vocabulary. Services can be invoked asynchronously, and Cloud Run Jobs exist for workloads that run to completion without serving requests. This is powerful because it keeps the same container packaging model across both service-style and job-style compute.',
      'The architectural consequence is important. Lambda encourages you to think of background work as event reaction. Cloud Run lets you think of background work either as a service endpoint receiving tasks or as a job running inside the same general container ecosystem. Teams with strong container habits often find that consistency valuable.',
    ],
  },
  {
    id: 'core-timeouts',
    title: 'Duration Limits and Long-Running Request Shape',
    paragraphs: [
      'Lambda has a hard maximum function timeout of 900 seconds, or 15 minutes, according to AWS documentation. That is enough for many tasks, but it is still a hard boundary that pushes longer workflows toward orchestration, chunking, or other services. This is one reason Lambda is best when units of work are naturally bounded and discrete.',
      'Cloud Run services and jobs also have request or task duration limits, but the important practical feeling is different: Cloud Run often feels more suitable for service-shaped request handling and for containerized processes that need a somewhat broader application-hosting environment. Even when limits exist, the software still behaves more like a service process than like a bare invocation handler.',
      'If the workload is drifting toward long-lived application behavior, Lambda can start to feel cramped. If the workload is truly a finite request-response or bounded job, both platforms can work well, but they express those boundaries through different runtime idioms.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking, Identity, and Provider Integration Shape',
    paragraphs: [
      'Cloud Run services are exposed as managed HTTPS endpoints and integrate with Google Cloud identity, service accounts, VPC connectivity options, and the broader Google networking model. Because the service already looks like an HTTP endpoint, many networking conversations feel similar to ordinary application deployment, only wrapped in provider-managed ingress and scaling behavior.',
      'Lambda networking often depends heavily on which trigger invokes it and whether the function needs VPC access. The surrounding AWS architecture is therefore tightly coupled to API Gateway design, event source configuration, IAM permissions, and private resource connectivity. That can be extremely powerful, but it also means Lambda networking design is usually inseparable from the rest of the AWS service topology.',
      'In short, Cloud Run networking feels service-centric. Lambda networking feels trigger-centric and ecosystem-centric. Neither is simpler in every case, but they demand different design instincts.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability and Day-2 Operations',
    paragraphs: [
      'Lambda observability is tied to invocation-level thinking. Logs, metrics, traces, and error handling often revolve around function executions, trigger retries, dead-letter or replay patterns, and per-invocation latency. This makes great sense when the system is composed of many small reactions, but it can also fragment the operational picture if teams do not build strong tracing and ownership discipline.',
      'Cloud Run observability feels closer to service operations. Teams monitor request latency, instance behavior, concurrency, rollout health, error rates, and traffic distribution across revisions. Because the workload often remains application-shaped, logging and tracing strategies can look more like ordinary service observability, just within a serverless control plane.',
      'The important difference is not which cloud has logs and metrics. The difference is whether you are operating a fleet of event-driven functions or a fleet of serverless services and jobs. The operational dashboards, failure narratives, and on-call instincts tend to follow that difference.',
    ],
  },
  {
    id: 'core-cost',
    title: 'Pricing Shape and Efficiency Intuition',
    paragraphs: [
      'Lambda pricing is naturally tied to invocation-oriented thinking: request count, execution duration, configured memory, and concurrency-related operational choices. This often maps well to bursty event workloads because idle cost can be extremely low when nothing is running. The cost model feels very granular and closely coupled to units of function work.',
      'Cloud Run pricing is shaped more like managed service compute with serverless scaling. Request load, CPU and memory allocation behavior, concurrency configuration, and minimum-instance strategy all affect the bill. Because one instance can serve multiple requests, utilization strategy can matter in a way that feels more like web-service efficiency tuning than function-per-invocation accounting.',
      'Neither platform is automatically cheaper. Cost depends on traffic shape, startup behavior, concurrency efficiency, and how cleanly the software matches the platform. Lambda often looks excellent for sparse event traffic. Cloud Run often looks excellent for containerized services that can use concurrency well. A bad fit can be expensive on either side.',
    ],
  },
  {
    id: 'core-portability',
    title: 'Portability and Lock-In Pattern',
    paragraphs: [
      'All managed serverless platforms impose some coupling, but the shape of the coupling matters. Lambda couples the codebase strongly to AWS event contracts, IAM behavior, invocation semantics, and service-trigger conventions. That is often an acceptable and even desirable trade because the whole point is deep AWS-native leverage. But teams should be honest about the specificity of that leverage.',
      'Cloud Run also couples you to Google Cloud operations, deployment surface, service identity, and autoscaling behavior. Even so, many teams perceive Cloud Run as more portable because the userland artifact is a normal containerized application. The code often looks closer to mainstream application hosting, which makes conceptual migration easier even if production parity elsewhere still requires work.',
      'This is why Cloud Run is often described as more portable in spirit, while Lambda is often described as more natively serverless in spirit. Both statements are oversimplifications, but they capture something real about the software boundary each platform encourages you to adopt.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operational Fit and Team Habits',
    paragraphs: [
      'Cloud Run often fits teams that already know containers, already think in terms of services, and want less infrastructure burden without abandoning the familiar shape of application deployment. For those teams, Cloud Run feels like a natural continuation of Docker and service-platform habits, just with more infrastructure automation and less cluster management.',
      'Lambda often fits teams that already think in AWS building blocks and event-driven workflows. In those environments Lambda is not merely a compute product. It is part of an AWS-native design language involving API Gateway, SQS, SNS, EventBridge, DynamoDB streams, S3 notifications, and IAM-driven integration. Teams fluent in that language can move very quickly.',
      'So the question is not Which platform is easier. The real question is Which platform already matches the way your team decomposes work: as services or as functions. When the team model and platform model agree, both products feel simpler than they do on a feature checklist.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Cloud Run can be a poor fit when teams treat it as a magical replacement for every kind of compute without thinking about request-driven scaling, startup cost, instance lifecycle, and the realities of running containerized services under serverless constraints. It is still a managed service platform, not a free-form replacement for every cluster, daemon, or stateful environment.',
      'Lambda can be a poor fit when teams force obviously service-shaped workloads into a function model simply because Lambda is available. If the codebase wants process identity, rich framework middleware, shared in-memory state across many requests, or conventional application-host behavior, the function boundary can become awkward or overly fragmented.',
      'The real failure mode in both products is using them against the grain. Cloud Run fails when you ignore that it is still an autoscaled request and job platform. Lambda fails when you ignore that it is still a function invocation platform. Matching the software shape to the platform shape matters more than ideology about serverless.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Cloud Run when the workload is naturally a containerized HTTP service, API, or serverless web backend.',
      'Choose AWS Lambda when the workload is naturally a function reacting to AWS-native events.',
      'Prefer Cloud Run when concurrency per instance, normal web frameworks, and container packaging are important.',
      'Prefer Lambda when trigger richness, invocation isolation, and AWS ecosystem integration are the center of the design.',
      'Prefer Cloud Run when your team already thinks in services and containers.',
      'Prefer Lambda when your team already thinks in event flows and provider-managed functions.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-http',
    title: 'Expose a Simple HTTP Endpoint',
    summary:
      'Both platforms can return hello-world JSON, but one expects a server and the other expects a handler.',
    cloudRunCode: `from flask import Flask

app = Flask(__name__)

@app.get('/')
def hello():
    return {'message': 'hello from cloud run'}`,
    lambdaCode: `export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello from lambda' }),
  }
}`,
    explanation:
      'Cloud Run expects a normal web app that listens for HTTP traffic. Lambda expects a function entry point that returns a response object under Lambda invocation semantics.',
  },
  {
    id: 'ex-container',
    title: 'Look at the Deployment Artifact',
    summary: 'Both can use container images, but the platform meaning of the image is different.',
    cloudRunCode: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "server.js"]`,
    lambdaCode: `FROM public.ecr.aws/lambda/nodejs:22
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["index.handler"]`,
    explanation:
      'On Cloud Run the image is the application host boundary. On Lambda the image is a package format that still lands inside Lambda function rules.',
  },
  {
    id: 'ex-background',
    title: 'Process Asynchronous Work',
    summary: 'Background processing exists on both platforms, but the orchestration style differs.',
    cloudRunCode: `# Cloud Run service triggered by Pub/Sub push or an HTTP task queue
@app.post('/process')
def process_job():
    do_work()
    return ('', 204)`,
    lambdaCode: `export const handler = async (event) => {
  for (const record of event.Records) {
    await doWork(record.body)
  }
}`,
    explanation:
      'Cloud Run background work often still looks like sending work to a service or running a job. Lambda background work often looks like reacting directly to a provider-native event batch.',
  },
  {
    id: 'ex-concurrency',
    title: 'Reason About Parallel Traffic',
    summary: 'The concurrency model changes how you design performance and resource usage.',
    cloudRunCode: `# One Cloud Run instance may handle multiple requests concurrently
# depending on the configured concurrency value.
@app.get('/items/<id>')
def get_item(id):
    return load_item(id)`,
    lambdaCode: `// Lambda scales by adding concurrent executions.
export const handler = async (event) => {
  return await loadItem(event.pathParameters.id)
}`,
    explanation:
      'Cloud Run can multiplex requests within an instance like an ordinary service. Lambda usually scales by creating more concurrent function execution environments.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Container runtime contract',
    definition:
      'The Cloud Run rules that define how a container must start, listen, and behave on the platform.',
  },
  {
    term: 'Execution environment',
    definition: 'The Lambda runtime environment in which initialization and invocation happen.',
  },
  {
    term: 'Handler',
    definition: 'The Lambda entry point that receives an invocation event and returns a result.',
  },
  {
    term: 'Concurrent execution',
    definition: 'The Lambda measure of how many invocations are being processed at the same time.',
  },
  {
    term: 'Cloud Run concurrency',
    definition: 'The number of requests a single Cloud Run instance may serve simultaneously.',
  },
  {
    term: 'Cold start',
    definition:
      'Extra startup latency when a new execution environment or container instance must be initialized.',
  },
  {
    term: 'Scale to zero',
    definition: 'A serverless behavior where running capacity can drop to zero when idle.',
  },
  {
    term: 'Event-driven architecture',
    definition:
      'A design style where work is triggered by events from services, queues, streams, schedules, or storage changes.',
  },
  {
    term: 'Serverless container',
    definition:
      'A containerized workload deployed to a platform that manages scaling and infrastructure automatically.',
  },
  {
    term: 'Function-native platform',
    definition:
      'A platform whose primary abstraction is the function invocation rather than the service process.',
  },
  {
    term: 'Provisioned concurrency',
    definition:
      'An AWS Lambda feature for keeping execution environments initialized to reduce startup latency.',
  },
  {
    term: 'Cloud Run Job',
    definition:
      'A Cloud Run workload type for containerized tasks that run to completion instead of serving requests continuously.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-execution', label: 'Execution Model' },
    { id: 'core-packaging', label: 'Packaging Boundary' },
    { id: 'core-http', label: 'HTTP Services' },
    { id: 'core-events', label: 'Events and Triggers' },
    { id: 'core-concurrency', label: 'Concurrency and Scaling' },
    { id: 'core-coldstart', label: 'Cold Starts' },
    { id: 'core-runtime', label: 'Runtime Freedom' },
    { id: 'core-background', label: 'Background Work' },
    { id: 'core-timeouts', label: 'Duration Limits' },
    { id: 'core-networking', label: 'Networking and Identity' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-cost', label: 'Pricing Shape' },
    { id: 'core-portability', label: 'Portability' },
    { id: 'core-ops', label: 'Operational Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CloudRunVsAwsLambdaPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Cloud Run Vs Aws Lambda Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cloud Run Vs Aws Lambda Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="cloudrun-lambda-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Cloud Run and AWS Lambda as two different ways to do serverless compute.
        The point is not to memorize product marketing. The point is to understand the deeper
        tradeoffs: execution model, packaging boundary, request handling, event integration,
        concurrency behavior, startup profile, portability, operational fit, and the type of team
        each platform usually serves best.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">Cloud Run</h3>
              <div className="bin98-codebox">
                <code>{example.cloudRunCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">AWS Lambda</h3>
              <div className="bin98-codebox">
                <code>{example.lambdaCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

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
