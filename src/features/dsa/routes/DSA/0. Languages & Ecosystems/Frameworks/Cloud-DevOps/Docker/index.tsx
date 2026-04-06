import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type Section = { id: string; title: string; paragraphs: string[]; bullets?: string[] }
type Example = { id: string; title: string; description: string[]; code: string; notes: string[] }
type GlossarySection = { id: string; title: string; terms: Array<{ term: string; definition: string }> }

const PAGE_TITLE = 'Docker'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Docker is a container platform for building, packaging, distributing, and running applications in isolated environments. It is most often encountered through images, containers, Dockerfiles, registries, networks, volumes, and the Docker CLI, but the real value is that it standardizes how software is assembled and executed across developer machines, CI systems, and servers.',
  'The most useful mental model is not just "a way to run containers," but "a workflow for turning application source code into reproducible runnable artifacts." Docker defines how images are built, how containers start from those images, how data and network access are attached, and how teams share those artifacts across environments.',
  'This page keeps the main Docker ideas together: images, containers, Dockerfiles, layers, build context, registries, volumes, bind mounts, networks, Compose, runtime isolation, workflows, tradeoffs, examples, and glossary terms.',
] as const

const bigPictureSections: Section[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Docker became influential because deployment problems are often packaging problems. Teams used to spend large amounts of effort aligning operating-system packages, language runtimes, file layouts, and service dependencies across laptops, CI runners, and servers. Docker gave teams a standard unit for packaging and running software with those concerns already described.',
      'What matters most is not the command line itself, but the artifact model. A Docker image captures a filesystem plus metadata and startup behavior. A container is a running instance of that image with its own writable layer and runtime configuration. That model makes build, ship, and run workflows much more repeatable.',
    ],
    bullets: [
      'Standardizes application packaging and execution.',
      'Separates image creation from container runtime instances.',
      'Improves reproducibility across dev, CI, and deployment environments.',
      'Acts as a foundation for local development, CI pipelines, and platform tooling.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of Docker as an image and container workflow rather than a virtual machine platform. Images are immutable build artifacts composed from layers. Containers are isolated processes started from those images with configurable environment, mounts, network attachments, and resource limits.',
      'That is why Docker is best understood as a packaging and runtime system. The Dockerfile defines how an image is built. Registries distribute images. The Docker engine runs containers. Compose coordinates multiple services for local or lightweight multi-container environments.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Docker Fits Best',
    paragraphs: [
      'Docker fits best when teams need consistent packaging, portable runtime environments, fast onboarding, reliable CI builds, or a repeatable way to run application dependencies locally. It is especially effective for web services, APIs, background workers, databases in development environments, integration tests, and local stacks that involve several services.',
      'It also fits well as a lower-level building block beneath bigger systems. Many platforms, including Kubernetes-based ones, rely on container images as the packaging unit even when Docker itself is not the orchestrator in production.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Docker Is Not the Full Answer',
    paragraphs: [
      'Docker is not an orchestrator for large distributed systems by itself. It can run containers well, but service discovery, autoscaling, scheduling across clusters, policy-driven rollouts, and platform-wide traffic management require additional systems.',
      'It is also not a substitute for good image hygiene or good application design. A poorly structured application does not become production-ready just because it has a Dockerfile. Image size, startup behavior, health, secrets handling, and runtime expectations still need real engineering.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A normal Docker workflow starts with a Dockerfile that describes how to build the application image. The team builds that image, tags it, runs it locally for testing, and pushes it to a registry so CI or deployment systems can pull the same artifact later.',
      'When multiple services are involved, Docker Compose often coordinates local environments by defining several containers, their networks, their volumes, and their startup relationships in one configuration. That lets developers run realistic local stacks without manually wiring each component together.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Docker is fundamentally about reproducible software packaging and process isolation. Images are the durable artifact, containers are the running instances, and Dockerfiles are the build instructions that connect source code to executable runtime.',
      'Teams get the most value when they treat Dockerfiles as production artifacts, keep images small and explicit, separate build-time and run-time concerns cleanly, and design mounts, networking, and configuration injection deliberately instead of ad hoc.',
    ],
  },
]

const coreConceptSections: Section[] = [
  {
    id: 'core-images-containers',
    title: 'Images and Containers',
    paragraphs: [
      'An image is a packaged filesystem plus metadata such as entrypoint, command, environment defaults, and exposed ports. A container is a running or stopped instance created from an image with a writable layer on top. The same image can produce many containers with different runtime settings.',
      'This distinction matters because teams often blur build-time and run-time thinking. Images should be treated as reproducible artifacts. Containers should be treated as disposable runtime instances configured by environment, mounts, networks, and startup flags.',
    ],
    bullets: [
      'Images are build artifacts and containers are runtime instances.',
      'Images are layered and mostly immutable after build.',
      'Containers add runtime configuration and a writable layer.',
      'Many containers can be started from one image tag.',
    ],
  },
  {
    id: 'core-dockerfile',
    title: 'Dockerfiles and Build Semantics',
    paragraphs: [
      'A Dockerfile is a sequence of build instructions that define how an image is produced. Instructions such as FROM, COPY, RUN, WORKDIR, ENV, EXPOSE, CMD, and ENTRYPOINT are combined into a build graph that produces image layers and metadata.',
      'Good Dockerfiles separate dependency installation from source-code copy steps when possible, use small base images deliberately, and keep runtime images focused on what the application actually needs. Multi-stage builds are especially important because they let teams compile or package software in one stage and ship a smaller runtime image in another.',
    ],
  },
  {
    id: 'core-layers-buildkit',
    title: 'Layers, Cache, and BuildKit',
    paragraphs: [
      'Docker image builds are layer-oriented. Each meaningful build step can be cached and reused if the relevant inputs have not changed. That means Dockerfile structure has direct impact on build speed, CI performance, and the size and cleanliness of produced images.',
      'Modern Docker builds commonly use BuildKit, which improves build performance and adds more capable features. The practical takeaway is that build systems reward deliberate ordering: put stable expensive steps earlier, isolate changing app source where possible, and avoid invalidating the cache unnecessarily.',
    ],
  },
  {
    id: 'core-filesystem-data',
    title: 'Bind Mounts, Volumes, and Container Filesystems',
    paragraphs: [
      'Containers start with the image filesystem plus a writable layer. For persistent or shared data, Docker supports bind mounts and volumes. Bind mounts point to a host path directly, while volumes are Docker-managed storage objects.',
      'This difference matters in real workflows. Bind mounts are common in development because they make local code live inside the container immediately. Volumes are common for managed persistent data and are usually a better default when host-path coupling should be minimized.',
    ],
    bullets: [
      'Bind mounts couple a container directly to a host path.',
      'Volumes are managed by Docker and are better suited for durable container data.',
      'Container writable layers are not a good long-term persistence strategy.',
      'Filesystem design affects portability, repeatability, and data safety.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Service Connectivity',
    paragraphs: [
      'Docker provides virtual networking so containers can communicate with each other and with the host in controlled ways. Bridge networking is common by default, while custom networks are often created so related containers can resolve one another and communicate predictably.',
      'Port publishing maps container ports to host ports. This is simple but easy to misuse when teams forget that published ports are part of the runtime contract, not image semantics alone.',
    ],
  },
  {
    id: 'core-registries',
    title: 'Registries, Tags, and Distribution',
    paragraphs: [
      'Registries store and distribute images. Teams build images locally or in CI, tag them, and push them to registries such as Docker Hub or private registries. Other environments then pull those same artifacts rather than rebuilding them independently.',
      'Tagging strategy matters. Floating tags such as latest can be useful for convenience but are weak for reproducibility. Immutable or versioned tags are much better for deployment safety and traceability.',
    ],
  },
  {
    id: 'core-compose',
    title: 'Docker Compose and Multi-Container Workflows',
    paragraphs: [
      'Docker Compose describes multi-container applications as one unit. It defines services, networks, volumes, environment variables, port mappings, and build or image sources in a YAML file so developers can run realistic local stacks with a single workflow.',
      'Compose is especially valuable for local development and integration testing because many applications depend on databases, caches, message brokers, and auxiliary services that would otherwise require a lot of manual setup.',
    ],
  },
  {
    id: 'core-isolation-runtime',
    title: 'Isolation, Resource Controls, and Runtime Reality',
    paragraphs: [
      'Containers are isolated processes, not full virtual machines. They rely on kernel features such as namespaces and cgroups for isolation and resource control. That makes them lighter than VMs but also means they share the host kernel and should not be reasoned about as if they are complete operating systems.',
      'This distinction matters for security, performance, and debugging. Many beginner mistakes come from expecting container boundaries to behave like VM boundaries or from assuming that everything should run as root just because the image build works that way.',
    ],
  },
  {
    id: 'core-dev-prod',
    title: 'Development Versus Production Concerns',
    paragraphs: [
      'Docker is often introduced in development first, but development conveniences do not automatically translate into good production practice. Bind mounts, debug-friendly images, root users, oversized images, and mutable runtime assumptions may all be fine locally and poor choices in production.',
      'Good teams keep the artifact consistent while still separating concerns: development may use Compose, live code mounts, and debug tooling, while production uses tested image tags, stricter runtime config, and more controlled orchestration.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Comparisons',
    paragraphs: [
      'Compared with virtual machines, Docker containers are lighter and faster to start, but they provide a different isolation model and share the host kernel. Compared with language-specific packaging alone, Docker is stronger at whole-environment reproducibility. Compared with full orchestrators, Docker is simpler but less capable for large multi-host operations.',
      'The main failure mode is assuming Docker solves every operational problem. It solves packaging and local or single-host runtime problems extremely well, but orchestration, secret governance, scaling policy, and fleet-level service management still require surrounding systems.',
    ],
  },
]

const exampleSections: Example[] = [
  {
    id: 'ex-dockerfile',
    title: 'Basic Dockerfile',
    description: [
      'This example shows a straightforward production-oriented Dockerfile for a Node service. It installs dependencies, copies the app, and defines a clear runtime entrypoint.',
      'The important point is that the image becomes the deployable artifact rather than a sequence of shell steps re-run differently in every environment.',
    ],
    code: `FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]`,
    notes: [
      'The order of COPY and RUN affects layer cache reuse.',
      'CMD defines the default container start command but can be overridden at runtime.',
    ],
  },
  {
    id: 'ex-multistage',
    title: 'Multi-Stage Build',
    description: [
      'Multi-stage builds separate heavy build dependencies from the final runtime image. This is one of the most important Dockerfile techniques for smaller and cleaner production artifacts.',
      'The builder stage can compile or package the application, while the runtime stage contains only what is needed to execute it.',
    ],
    code: `FROM golang:1.24 AS builder
WORKDIR /src
COPY . .
RUN go build -o app ./cmd/api

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /src/app ./app
CMD ["./app"]`,
    notes: [
      'Multi-stage builds reduce runtime image size and attack surface.',
      'The final image does not need compilers or build tools if the artifact is already produced.',
    ],
  },
  {
    id: 'ex-run-volume',
    title: 'Run a Container with Port Publishing and a Volume',
    description: [
      'Runtime behavior is configured when a container is started. Port publishing exposes a container port on the host, and a named volume preserves application data outside the container writable layer.',
      'This pattern is common for local databases and other stateful development services.',
    ],
    code: `docker volume create pgdata

docker run -d ^
  --name postgres ^
  -e POSTGRES_PASSWORD=secret ^
  -p 5432:5432 ^
  -v pgdata:/var/lib/postgresql/data ^
  postgres:16`,
    notes: [
      'Named volumes survive container recreation unless explicitly removed.',
      'Published ports are part of runtime configuration, not image identity.',
    ],
  },
  {
    id: 'ex-compose',
    title: 'Docker Compose for a Small Local Stack',
    description: [
      'Compose is the common way to coordinate several related containers in local development. A single file defines services, images, builds, ports, dependencies, and environment values.',
      'This makes local full-stack development much more reproducible than a long readme of manual startup steps.',
    ],
    code: `services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis

  redis:
    image: redis:7-alpine`,
    notes: [
      'Compose is especially useful for local and CI integration environments.',
      'Service names on the same Compose network can usually resolve each other directly.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-artifacts',
    title: 'Artifact Terms',
    terms: [
      { term: 'Image', definition: 'A layered packaged filesystem and metadata artifact used to start containers.' },
      { term: 'Container', definition: 'A running or stopped instance of an image with runtime configuration and a writable layer.' },
      { term: 'Dockerfile', definition: 'The build instruction file that defines how an image is created.' },
      { term: 'Layer', definition: 'A reusable filesystem change unit within an image build.' },
      { term: 'Tag', definition: 'A human-readable reference used to identify an image version in a registry.' },
      { term: 'Registry', definition: 'A service that stores and distributes container images.' },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime Terms',
    terms: [
      { term: 'Bind mount', definition: 'A direct mapping between a host filesystem path and a path inside a container.' },
      { term: 'Volume', definition: 'Docker-managed persistent storage attached to one or more containers.' },
      { term: 'Port publishing', definition: 'Mapping a container port to a port on the host machine.' },
      { term: 'ENTRYPOINT', definition: 'The configured executable that defines the container startup program.' },
      { term: 'CMD', definition: 'The default command arguments or fallback start command for a container.' },
      { term: 'Build context', definition: 'The set of files sent to the Docker build process for use by the Dockerfile.' },
    ],
  },
  {
    id: 'glossary-workflows',
    title: 'Workflow Terms',
    terms: [
      { term: 'BuildKit', definition: 'The modern Docker build engine that improves performance and supports advanced build features.' },
      { term: 'Compose', definition: 'A Docker tool and file format for defining and running multi-container applications.' },
      { term: 'Multi-stage build', definition: 'A Dockerfile pattern that uses more than one FROM stage to separate build and runtime concerns.' },
      { term: 'Base image', definition: 'The starting image referenced by FROM when building a new image.' },
      { term: 'Container runtime', definition: 'The software layer responsible for executing and managing containers on a host.' },
      { term: 'Immutable artifact', definition: 'A build artifact meant to be reused as-is rather than modified after distribution.' },
    ],
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

const dockerHelpStyles = `
.docker-help98-page{min-height:100dvh;background:#c0c0c0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.docker-help98-window{width:100%;min-height:100dvh;display:flex;flex-direction:column;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;box-sizing:border-box;}
.docker-help98-titlebar{position:relative;display:flex;align-items:center;min-height:24px;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.docker-help98-title{position:absolute;left:50%;transform:translateX(-50%);font-size:14px;white-space:nowrap;}
.docker-help98-controls{display:flex;gap:2px;margin-left:auto;}
.docker-help98-control{width:18px;height:16px;display:inline-flex;align-items:center;justify-content:center;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;font:inherit;font-size:11px;line-height:1;text-decoration:none;cursor:pointer;}
.docker-help98-tabs{display:flex;flex-wrap:wrap;gap:1px;padding:6px 8px 0;background:#c0c0c0;}
.docker-help98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;color:#000;font:inherit;font-size:12px;cursor:pointer;}
.docker-help98-tab.active{position:relative;top:1px;background:#fff;}
.docker-help98-main{display:grid;grid-template-columns:240px minmax(0,1fr);flex:1;min-height:0;border-top:1px solid #404040;background:#fff;}
.docker-help98-toc{overflow:auto;padding:12px;background:#f2f2f2;border-right:1px solid #808080;}
.docker-help98-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.docker-help98-toc-list{margin:0;padding:0;list-style:none;}
.docker-help98-toc-list li{margin:0 0 8px;}
.docker-help98-toc-list a{color:#000;font-size:12px;text-decoration:none;}
.docker-help98-content{overflow:auto;padding:14px 20px 24px;}
.docker-help98-doc-title{margin:0 0 12px;font-size:20px;font-weight:700;}
.docker-help98-section{margin:0 0 20px;}
.docker-help98-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.docker-help98-content p,.docker-help98-content li,.docker-help98-content dd,.docker-help98-content dt{font-size:12px;line-height:1.5;}
.docker-help98-content p,.docker-help98-content dd{margin:0 0 10px;}
.docker-help98-content ul{margin:0 0 10px 18px;padding:0;}
.docker-help98-divider{margin:14px 0;border:0;border-top:1px solid #d0d0d0;}
.docker-help98-codebox{margin:8px 0 10px;padding:8px;background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;}
.docker-help98-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;line-height:1.45;}
.docker-help98-glossary{margin:0;}
.docker-help98-glossary dt{margin:0 0 2px;font-weight:700;}
@media (max-width:900px){.docker-help98-main{grid-template-columns:1fr;}.docker-help98-toc{border-right:none;border-bottom:1px solid #808080;}.docker-help98-content{padding:14px 14px 20px;}}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderSection(section: Section, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="docker-help98-section">
      <h2 className="docker-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
      {!isLast ? <hr className="docker-help98-divider" /> : null}
    </section>
  )
}

function renderExample(section: Example, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="docker-help98-section">
      <h2 className="docker-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="docker-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>{section.notes.map((note) => <li key={note}>{note}</li>)}</ul>
      {!isLast ? <hr className="docker-help98-divider" /> : null}
    </section>
  )
}

function renderGlossary(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="docker-help98-section">
      <h2 className="docker-help98-heading">{section.title}</h2>
      <dl className="docker-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="docker-help98-divider" /> : null}
    </section>
  )
}

export default function DockerPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${PAGE_TITLE} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: PAGE_TITLE,
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
    <div className="docker-help98-page">
      <style>{dockerHelpStyles}</style>
      <div className="docker-help98-window" role="presentation">
        <header className="docker-help98-titlebar">
          <span className="docker-help98-title">{PAGE_TITLE}</span>
          <div className="docker-help98-controls">
            <button className="docker-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="docker-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="docker-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`docker-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="docker-help98-main">
          <aside className="docker-help98-toc" aria-label="Table of contents">
            <h2 className="docker-help98-toc-title">Contents</h2>
            <ul className="docker-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="docker-help98-content">
            <h1 className="docker-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="docker-help98-divider" />

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) => renderSection(section, index === bigPictureSections.length - 1))
              : null}
            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) => renderSection(section, index === coreConceptSections.length - 1))
              : null}
            {activeTab === 'examples'
              ? exampleSections.map((section, index) => renderExample(section, index === exampleSections.length - 1))
              : null}
            {activeTab === 'glossary'
              ? glossarySections.map((section, index) => renderGlossary(section, index === glossarySections.length - 1))
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
