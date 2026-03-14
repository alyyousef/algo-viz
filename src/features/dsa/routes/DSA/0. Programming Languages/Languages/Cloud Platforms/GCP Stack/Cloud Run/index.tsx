import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const cloudRunHelpStyles = `
.cloudrun-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cloudrun-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.cloudrun-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cloudrun-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.cloudrun-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cloudrun-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.cloudrun-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cloudrun-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.cloudrun-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.cloudrun-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.cloudrun-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.cloudrun-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cloudrun-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloudrun-help-toc-list li {
  margin: 0 0 8px;
}

.cloudrun-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.cloudrun-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.cloudrun-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.cloudrun-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.cloudrun-help-section {
  margin: 0 0 20px;
}

.cloudrun-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cloudrun-help-content p,
.cloudrun-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cloudrun-help-content p {
  margin: 0 0 10px;
}

.cloudrun-help-content ul,
.cloudrun-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cloudrun-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.cloudrun-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.cloudrun-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .cloudrun-help-main {
    grid-template-columns: 1fr;
  }

  .cloudrun-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .cloudrun-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

const bigPictureSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cloud Run is Google Cloud\'s managed serverless container platform. The simplest mental model is that you provide a container that listens for HTTP requests or runs a task, and Google Cloud runs it on demand without asking you to manage servers or cluster nodes.',
      'Cloud Run supports two major workload shapes: services and jobs. Services are request-driven and usually expose an HTTP endpoint. Jobs are task-oriented and run to completion without acting as a long-lived web service.',
      'The platform is strongest when a workload fits inside a container boundary but the team still wants serverless scaling, managed revisions, IAM integration, and a simpler operational model than full Kubernetes.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'A large amount of modern backend work wants container flexibility without container orchestration complexity. Teams want to bring any language and framework, but they do not always want to run GKE or manage long-lived VM fleets.',
      'Cloud Run matters because it sits in that middle space. It preserves container packaging and broad framework freedom while removing much of the infrastructure work associated with managing cluster-based application platforms.',
      'In a GCP architecture, Cloud Run often becomes the default place to host HTTP APIs, internal microservices, background workers, task processors, and event-driven containerized workloads that are larger than a single function but smaller than a full platform team investment in Kubernetes.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Cloud Run is strongest for stateless HTTP services, internal APIs, event consumers, webhook endpoints, containerized background processing, and jobs that can start, do work, and stop cleanly.',
      'It is especially useful when the team wants full control over the application process and dependencies through a container image, but still wants serverless scaling and managed revisions.',
      'It is a weaker fit for systems that need very specialized node-level control, heavy daemon patterns, privileged execution, or tightly managed cluster primitives. Those needs are usually a better match for Kubernetes or VM-based infrastructure.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common Cloud Run workflow is: build a container image, push it to a registry, deploy it as a Cloud Run service, and let the platform manage revisions, traffic, scaling, and request routing.',
      'Another common pattern is to deploy a Cloud Run job for containerized batch or operational work such as migrations, scheduled processing, report generation, or asynchronous data maintenance.',
      'This matters because Cloud Run is both an application hosting surface and a delivery model. Revision history, image provenance, traffic control, and IAM all become part of normal service operation.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Cloud Run as serverless containers for services and jobs.',
      'The core contract is container-oriented: your process must satisfy the Cloud Run runtime model and container contract.',
      'Revisions, traffic splitting, concurrency, and identity are core platform concepts, not optional extras.',
      'Cloud Run is a strong default for containerized stateless backends that do not justify full Kubernetes operations.',
      'Good Cloud Run design depends on clean container boundaries, explicit runtime assumptions, and disciplined release workflows.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Cloud Run is service hosting, not just container execution',
    detail:
      'A container image is the package, but the platform model also includes revisions, traffic management, scaling, identity, logs, and networking.',
  },
  {
    title: 'The container contract is part of the application',
    detail:
      'Your app must listen correctly, start correctly, and behave well under request-driven serverless execution. Container behavior is part of correctness.',
  },
  {
    title: 'Revisions are first-class release units',
    detail:
      'Deployments create revisions. Those revisions can receive traffic, be rolled back to, and be reasoned about as concrete release artifacts.',
  },
  {
    title: 'Concurrency changes architecture',
    detail:
      'One instance can serve more than one request depending on configuration. That affects throughput, latency, memory pressure, and downstream dependency behavior.',
  },
  {
    title: 'Serverless does not remove capacity thinking',
    detail:
      'You still need to think about min instances, max instances, cold starts, request bursts, and how downstream systems respond under load.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-architecture',
    title: 'Architecture and resource model',
    paragraphs: [
      'Cloud Run exposes multiple workload types, but the two most important are services and jobs. Services are long-lived serverless endpoints that respond to requests. Jobs are task-oriented containers that run to completion and do not behave like HTTP services.',
      'The main operational resources are service definitions, revisions, traffic assignments, jobs, executions, service accounts, and container images. Together they describe how an application is packaged, deployed, invoked, and observed.',
      'The architectural consequence is that Cloud Run is more than “run this image.” It is a managed application platform with release units, identity, scaling rules, and integration points that shape how the software behaves in production.',
    ],
  },
  {
    id: 'core-contract',
    title: 'Container contract and runtime expectations',
    paragraphs: [
      'Cloud Run is flexible because it accepts ordinary containers, but that flexibility sits inside a strict runtime contract. The application process must start correctly, listen on the expected port for services, and behave in a way that fits the request-driven serverless model.',
      'This is why the container contract matters. A container that works locally but ignores the platform runtime expectations is not truly deployable to Cloud Run.',
      'A useful design habit is to treat the container image as part of the application source, not as an afterthought. Startup command, health assumptions, environment variables, and port handling all belong in design review.',
    ],
  },
  {
    id: 'core-services',
    title: 'Services, revisions, and traffic management',
    paragraphs: [
      'Cloud Run services create revisions on deployment. Each revision represents a specific deployable version of the container plus its runtime configuration.',
      'Traffic management is one of Cloud Run\'s most important ideas. Teams can send traffic to the latest revision, split traffic between revisions, or roll back by shifting traffic back to a prior known-good release.',
      'This gives Cloud Run a stronger release model than a simple “replace the running app” workflow. Revisions make progressive delivery and rollback much easier to reason about.',
    ],
  },
  {
    id: 'core-jobs',
    title: 'Jobs and run-to-completion workloads',
    paragraphs: [
      'Cloud Run jobs are the batch and operational counterpart to services. Instead of exposing an HTTP endpoint, a job starts a containerized task, performs the work, and exits.',
      'This is useful for migrations, scheduled data processing, offline generation tasks, maintenance routines, and other containerized operations that need the serverless platform model without acting as a web service.',
      'The key distinction is lifecycle. A service is request-serving infrastructure. A job is execution-to-completion infrastructure.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency, scaling, and instance behavior',
    paragraphs: [
      'Cloud Run scaling is automatic, but concurrency is configurable and architecturally important. One instance can handle multiple requests concurrently depending on configuration, which can improve efficiency but also increase contention inside the process.',
      'Concurrency interacts with CPU usage, memory pressure, runtime characteristics, and downstream dependency load. A container that behaves well at low concurrency may behave very differently under higher concurrent request counts.',
      'Min and max instance settings also matter. They affect cold starts, cost, and the shape of traffic bursts seen by downstream systems.',
    ],
  },
  {
    id: 'core-network',
    title: 'Networking, ingress, and private access',
    paragraphs: [
      'Cloud Run can serve public traffic, internal traffic, or more controlled ingress patterns depending on configuration. Networking decisions are therefore part of service design, not just deployment boilerplate.',
      'Private backends, VPC connectivity, internal APIs, and egress control all shape whether a service is safe and usable in production.',
      'A useful rule is to decide explicitly who should be able to reach a service and from where. In serverless environments, public by default is often convenient, but it is not always correct.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Service identity, IAM, and invocation control',
    paragraphs: [
      'Every Cloud Run service or job runs with an identity, and that identity controls what the workload can access across Google Cloud. Least-privilege IAM is therefore part of application design.',
      'Invocation control matters too. Some Cloud Run services are public web endpoints. Others are intended only for authenticated users, internal systems, or service-to-service communication.',
      'A common mistake is to think only about what the service does, not who is allowed to call it and what it is allowed to do when it runs.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration, environment, and deployment parameters',
    paragraphs: [
      'Cloud Run behavior depends on more than the image. CPU, memory, region, environment variables, request timeout, concurrency, min instances, max instances, and service account all shape runtime behavior.',
      'That means deployment configuration belongs in the engineering model. A release is not only a new container image; it is a revision with explicit operational settings.',
      'Good Cloud Run design keeps this configuration intentional and reviewable rather than buried in ad hoc manual console actions.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Logs, metrics, tracing, and operational visibility',
    paragraphs: [
      'A production service needs logs, latency visibility, error context, and operational signals that distinguish one revision or execution from another.',
      'Cloud Run integrates well with logging and monitoring, which is important because serverless applications can scale and shift revisions quickly. Without strong observability, that flexibility becomes difficult to operate safely.',
      'A practical habit is to treat revision and request metadata as part of the production record. If traffic changes, the platform should make it obvious which revision handled what.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and efficiency',
    paragraphs: [
      'Cloud Run performance is shaped by container startup time, dependency footprint, request concurrency, external call behavior, and how well the service uses the resources allocated to it.',
      'Cold starts, image size, and heavy runtime initialization matter, especially for spiky services. For steady traffic, concurrency tuning and process-level behavior often matter more.',
      'The best optimization strategy is usually not premature micro-tuning. It is choosing sane defaults, keeping the container lean, and testing the service under the concurrency and traffic patterns it will actually see.',
    ],
  },
  {
    id: 'core-delivery',
    title: 'Delivery workflow and release engineering',
    paragraphs: [
      'Cloud Run works best with disciplined CI/CD. The normal path is to build an image, publish it, deploy a new revision, and control traffic explicitly.',
      'This is why Cloud Build, Artifact Registry, and revision-aware rollout practices matter so much with Cloud Run. The platform is designed for image-based release flow, not for informal mutable server drift.',
      'A good Cloud Run workflow makes it easy to answer which image, revision, and config produced the current service behavior.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and adjacent services',
    paragraphs: [
      'Cloud Run commonly appears beside Artifact Registry, Cloud Build, Eventarc, Pub/Sub, Secret Manager, Cloud SQL, and VPC integration features. That is because application hosting is only one part of the platform story.',
      'This ecosystem fit is one of Cloud Run\'s main strengths. It can host HTTP services, consume events, run jobs, and integrate naturally with the rest of a managed Google Cloud stack.',
      'The result is a platform that is especially attractive for teams that want container flexibility with serverless operations and a strong delivery path.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with Cloud Functions, Cloud Run offers a broader containerized service model and is often better for richer HTTP applications or multi-route services. Cloud Functions can still be simpler for very small event handlers.',
      'Compared with GKE, Cloud Run removes most cluster operations and is usually faster to adopt, but it gives up some orchestration depth and lower-level infrastructure control.',
      'Compared with Compute Engine, Cloud Run removes nearly all server management but assumes the application can fit the serverless container model cleanly.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Treating Cloud Run as a generic VM replacement instead of designing around the serverless container model.',
      'Ignoring concurrency and then discovering the app behaves poorly under shared-instance load.',
      'Shipping very heavy containers with large startup cost for latency-sensitive services.',
      'Using mutable manual console changes instead of revision-aware release discipline.',
      'Giving services broad IAM permissions that exceed their real runtime needs.',
      'Forgetting that traffic, revisions, and config are part of the release, not just the image.',
      'Choosing Cloud Run for workloads that really need deeper cluster-level or host-level control.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Choose Cloud Run when you want serverless hosting for a stateless containerized service or job.',
      'Choose Cloud Functions when the workload is better expressed as a narrow handler than a fuller containerized service.',
      'Choose GKE when you need broader orchestration, lower-level control, or platform primitives beyond the Cloud Run model.',
      'Treat concurrency, identity, ingress, and revision behavior as core design elements.',
      'Keep containers lean and startup-aware if latency and burst handling matter.',
      'Use image-based CI/CD and revision-aware rollout practices from the beginning.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Cloud Run, they usually adopt revision-aware rollout strategies, service-to-service IAM, stronger networking controls, dedicated job workflows, and more deliberate concurrency tuning.',
      'These capabilities matter because Cloud Run often becomes the default application platform for many internal and external services. Once that happens, platform consistency matters more than ad hoc per-service habits.',
      'The practical lesson is that Cloud Run is simple to start with, but it becomes most valuable when treated as a disciplined application platform rather than a quick place to toss containers.',
    ],
  },
]

const examples = [
  {
    title: 'Deploy a container image as a Cloud Run service',
    code: `gcloud run deploy my-api \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/apps/my-api:$COMMIT_SHA \
  --region us-central1 \
  --allow-unauthenticated`,
    explanation:
      'This is the basic Cloud Run service flow: build an image, push it to a registry, and deploy it as a revision-backed service.',
  },
  {
    title: 'Deploy with explicit concurrency and instance controls',
    code: `gcloud run deploy my-api \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/apps/my-api:$COMMIT_SHA \
  --region us-central1 \
  --concurrency 20 \
  --min-instances 1 \
  --max-instances 10`,
    explanation:
      'Concurrency and instance settings are real architectural controls. They shape latency, cold-start behavior, and how much pressure reaches downstream systems.',
  },
  {
    title: 'Listen on the Cloud Run port in an app server',
    code: `const express = require('express');
const app = express();

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(\`Listening on \${port}\`);
});`,
    explanation:
      'The runtime contract matters. A Cloud Run service must listen on the expected port so the platform can route requests correctly.',
  },
  {
    title: 'Split traffic between revisions',
    code: `gcloud run services update-traffic my-api \
  --region us-central1 \
  --to-revisions my-api-00010=90,my-api-00011=10`,
    explanation:
      'Traffic splitting is one of the most valuable Cloud Run release features. It supports gradual rollout and safer rollback without treating deployment as an all-or-nothing event.',
  },
  {
    title: 'Create and execute a Cloud Run job',
    code: `gcloud run jobs create nightly-report \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/jobs/report-runner:latest \
  --region us-central1

gcloud run jobs execute nightly-report --region us-central1`,
    explanation:
      'Jobs are the run-to-completion counterpart to services. They are a good fit for operational tasks, scheduled processing, and containerized batch work.',
  },
  {
    title: 'Use authenticated service-to-service invocation',
    code: `gcloud run deploy internal-api \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/apps/internal-api:$COMMIT_SHA \
  --region us-central1 \
  --no-allow-unauthenticated \
  --service-account internal-api-sa@$PROJECT_ID.iam.gserviceaccount.com`,
    explanation:
      'Cloud Run is often used for internal services, not only public endpoints. Invocation control and service identity are part of the platform model.',
  },
]

const glossaryTerms = [
  {
    term: 'Service',
    definition: 'A Cloud Run resource that serves requests as a serverless HTTP workload.',
  },
  {
    term: 'Job',
    definition: 'A Cloud Run resource that runs a containerized task to completion instead of serving requests continuously.',
  },
  {
    term: 'Revision',
    definition: 'An immutable deployed version of a Cloud Run service and its runtime configuration.',
  },
  {
    term: 'Traffic splitting',
    definition: 'The ability to send percentages of traffic to different revisions of the same service.',
  },
  {
    term: 'Container contract',
    definition: 'The runtime expectations a container must satisfy in order to work correctly on Cloud Run.',
  },
  {
    term: 'Concurrency',
    definition: 'The number of simultaneous requests a single instance may handle.',
  },
  {
    term: 'Min instances',
    definition: 'A setting that keeps a baseline number of instances available to reduce cold-start latency.',
  },
  {
    term: 'Max instances',
    definition: 'A setting that limits how many instances the platform may start.',
  },
  {
    term: 'Ingress',
    definition: 'The configured set of sources allowed to send traffic to a Cloud Run service.',
  },
  {
    term: 'Service account',
    definition: 'The identity a Cloud Run service or job uses to access Google Cloud resources.',
  },
  {
    term: 'Execution',
    definition: 'A specific run of a Cloud Run job.',
  },
  {
    term: 'Artifact Registry',
    definition: 'A common registry destination for container images deployed to Cloud Run.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-fit', label: 'Where It Fits Best' },
    { id: 'bp-workflow', label: 'Typical Workflow' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Architecture and Resources' },
    { id: 'core-contract', label: 'Container Contract' },
    { id: 'core-services', label: 'Services and Revisions' },
    { id: 'core-jobs', label: 'Jobs' },
    { id: 'core-concurrency', label: 'Concurrency and Scaling' },
    { id: 'core-network', label: 'Networking and Ingress' },
    { id: 'core-identity', label: 'Identity and IAM' },
    { id: 'core-config', label: 'Configuration' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-delivery', label: 'Delivery Workflow' },
    { id: 'core-ecosystem', label: 'Ecosystem' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-antipatterns', label: 'Common Mistakes' },
    { id: 'core-decision', label: 'Decision Checklist' },
    { id: 'core-advanced', label: 'Advanced Capabilities' },
  ],
  examples: examples.map((example, index) => ({
    id: `example-${index + 1}`,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GCPCloudRunPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `GCP Cloud Run (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Cloud Run',
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="cloudrun-help-page">
      <style>{cloudRunHelpStyles}</style>
      <div className="cloudrun-help-window" role="presentation">
        <header className="cloudrun-help-titlebar">
          <span className="cloudrun-help-title">GCP Cloud Run</span>
          <div className="cloudrun-help-controls">
            <button className="cloudrun-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="cloudrun-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cloudrun-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`cloudrun-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cloudrun-help-main">
          <aside className="cloudrun-help-toc" aria-label="Table of contents">
            <h2 className="cloudrun-help-toc-title">Contents</h2>
            <ul className="cloudrun-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cloudrun-help-content">
            <h1 className="cloudrun-help-doc-title">GCP Cloud Run</h1>
            <p className="cloudrun-help-doc-subtitle">Serverless containers for stateless services and run-to-completion jobs</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact Cloud Run manual: what the platform is,
              how services and jobs differ, how revisions and traffic work, and which design choices matter for correctness,
              performance, release safety, and operational simplicity.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="cloudrun-help-section">
                    <h2 className="cloudrun-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="cloudrun-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="cloudrun-help-section">
                  <h2 className="cloudrun-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="cloudrun-help-section">
                    <h2 className="cloudrun-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
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
                {examples.map((example, index) => (
                  <section key={example.title} id={`example-${index + 1}`} className="cloudrun-help-section">
                    <h2 className="cloudrun-help-heading">{example.title}</h2>
                    <div className="cloudrun-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cloudrun-help-section">
                <h2 className="cloudrun-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
