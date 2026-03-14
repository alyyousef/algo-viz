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

const cloudBuildHelpStyles = `
.cloudbuild-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cloudbuild-help-window {
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

.cloudbuild-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cloudbuild-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.cloudbuild-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cloudbuild-help-control {
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

.cloudbuild-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cloudbuild-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.cloudbuild-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.cloudbuild-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.cloudbuild-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.cloudbuild-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cloudbuild-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloudbuild-help-toc-list li {
  margin: 0 0 8px;
}

.cloudbuild-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.cloudbuild-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.cloudbuild-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.cloudbuild-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.cloudbuild-help-section {
  margin: 0 0 20px;
}

.cloudbuild-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cloudbuild-help-content p,
.cloudbuild-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cloudbuild-help-content p {
  margin: 0 0 10px;
}

.cloudbuild-help-content ul,
.cloudbuild-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cloudbuild-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.cloudbuild-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.cloudbuild-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .cloudbuild-help-main {
    grid-template-columns: 1fr;
  }

  .cloudbuild-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .cloudbuild-help-title {
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
      'Cloud Build is Google Cloud\'s managed build and CI service. The simplest mental model is that it executes a build as a sequence of containerized steps, records the job as a managed build, and integrates that work with the rest of a GCP delivery pipeline.',
      'It is used for continuous integration, image builds, test execution, packaging, artifact publishing, and deployment orchestration. Teams can start builds manually, from source repository triggers, from automation, or from other platform events.',
      'Adopting Cloud Build usually means standardizing how software moves from source to artifact. The center of gravity shifts away from self-hosted CI runners and toward build configs, triggers, service accounts, artifact destinations, logs, and delivery governance.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'Delivery systems become fragile when every repository invents its own build process, credentials, runners, and deployment conventions. Cloud Build matters because it provides one managed execution surface for repeatable build pipelines.',
      'It packages several hard concerns together: isolated step execution, source integration, artifact production, IAM-based access, logging, trigger automation, and interoperability with services such as Artifact Registry and Cloud Run.',
      'In a typical GCP platform, Cloud Build becomes the automation layer that turns source changes into verified deployable outputs. That makes it a core service for release engineering, not just a convenience wrapper around shell scripts.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Cloud Build is strongest when a team wants managed CI/CD infrastructure, container-native build steps, repository triggers, and close integration with GCP runtime and artifact services.',
      'It is a strong fit for container image pipelines, application test-and-package jobs, deployment automation, and platform-standardized delivery workflows across many repositories.',
      'It is a weaker fit when a team expects an all-in-one developer platform with heavy built-in workflow UX comparable to full DevOps suites. Cloud Build is intentionally focused on the build-and-delivery execution layer.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common workflow is: a repository event triggers a build, Cloud Build checks out source, runs build steps described in a `cloudbuild.yaml` file, stores logs, pushes artifacts, and optionally deploys or triggers downstream stages.',
      'Another common pattern is manual or API-triggered builds used by platform tooling. In that model, a build is a reusable execution primitive that other systems call when they need packaging, testing, or release automation.',
      'This matters because Cloud Build is not only about compiling code. It is a job orchestration surface for software delivery, policy enforcement, promotion flow, and repeatable environment preparation.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Cloud Build as a managed build runner that executes pipelines as container steps.',
      'The core unit is a build defined by config, parameters, identity, logs, and artifact outputs.',
      'Good Cloud Build design depends on reproducible build steps, least-privilege service accounts, and clean artifact boundaries.',
      'Triggers and substitutions turn one build config into many automated delivery entry points.',
      'Cloud Build is most effective when paired with artifact storage, deployment targets, and platform governance practices.',
    ],
  },
]

const mentalModels = [
  {
    title: 'A build is a managed job',
    detail:
      'Cloud Build tracks builds as first-class jobs with status, logs, identity, source context, outputs, and policy implications.',
  },
  {
    title: 'Each step is a container',
    detail:
      'The pipeline is defined as ordered containerized steps. This keeps execution explicit and makes the build environment easier to reason about.',
  },
  {
    title: 'Build config is delivery code',
    detail:
      'A `cloudbuild.yaml` or JSON build definition is part of the system design. It deserves the same review discipline as application code.',
  },
  {
    title: 'Identity is part of the pipeline',
    detail:
      'The service account used by a build defines what that build is allowed to access or deploy. CI/CD security is therefore tightly coupled to IAM design.',
  },
  {
    title: 'Artifacts are the product of CI',
    detail:
      'The build is not only about passing tests. Its real output is trusted artifacts, metadata, logs, and a traceable promotion path toward deployment.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-architecture',
    title: 'Architecture and execution model',
    paragraphs: [
      'Cloud Build executes a build as a sequence of steps described in a build config. Each step names a container image and the command or arguments to run. The platform provisions the build environment, executes the steps, and records logs and metadata.',
      'The main resources to reason about are build configs, triggers, build history, service accounts, logs, and artifact outputs. Together they define how source turns into something deployable and auditable.',
      'The practical architectural implication is that Cloud Build sits between source control and runtime environments. It is the control point where tests, packaging, security checks, approvals, and deployment commands can be standardized.',
    ],
  },
  {
    id: 'core-config',
    title: 'Build configs, steps, and syntax',
    paragraphs: [
      'Cloud Build build definitions are usually written in `cloudbuild.yaml`, though JSON is also supported. The file describes steps, images, commands, substitutions, artifacts, timeout behavior, and other build-level settings.',
      'A build step is just a container invocation. That means teams can use Google-provided builders, official language tooling images, or custom images that encapsulate internal tooling. This is one of the service\'s biggest strengths: the pipeline environment is explicit and reproducible.',
      'Build configs should be treated as delivery source code. If the pipeline controls what gets built and deployed, then the config deserves versioning, review, testing, and ownership just like application code.',
    ],
  },
  {
    id: 'core-source',
    title: 'Source integration and triggers',
    paragraphs: [
      'Cloud Build can start builds manually, through APIs, and through triggers tied to repository events. Triggers are central in day-to-day use because they connect source changes to automated delivery behavior.',
      'A trigger is effectively a rule plus a build definition: when a source event matches a branch, tag, pull request, webhook, or other configured input, Cloud Build runs the associated build using the chosen config and substitutions.',
      'This is why trigger design matters. Good trigger naming, branch targeting, approval policy, and parameterization help teams distinguish validation builds, release builds, preview builds, and environment-specific deployments clearly.',
    ],
  },
  {
    id: 'core-substitutions',
    title: 'Substitutions, parameters, and reuse',
    paragraphs: [
      'Substitutions let one build config support multiple contexts. Instead of hard-coding every environment or image tag, the config can receive values from trigger context or custom substitution variables.',
      'This matters because mature CI/CD systems try to minimize duplicated pipeline files. One carefully designed config can validate pull requests, build mainline images, and promote release candidates by varying substitutions and trigger wiring.',
      'The main design rule is to keep the config readable. Parameterization is valuable when it reduces duplication, but not when it turns a build file into a maze of hidden behavior.',
    ],
  },
  {
    id: 'core-artifacts',
    title: 'Artifacts, images, and outputs',
    paragraphs: [
      'Most Cloud Build pipelines produce artifacts: container images, language packages, generated bundles, or deployable release outputs. The build should make those outputs explicit and publish them to a stable destination such as Artifact Registry.',
      'A good pipeline draws a clear line between source, build workspace, and promoted artifact. That is what makes deployments reproducible. The deployment should consume the built artifact, not rebuild application logic again in some later environment.',
      'This distinction is one of the biggest maturity markers in CI/CD. If a team cannot say exactly which artifact a release came from, the delivery system is still under-specified.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Service accounts, permissions, and secret access',
    paragraphs: [
      'Cloud Build security is strongly tied to identity. The service account used by the build determines what the pipeline can read, write, deploy, or administer. That makes least-privilege IAM a central part of pipeline design.',
      'A build that only compiles and tests code should not automatically have production deployment permissions. Separate triggers, service accounts, and environment boundaries are often the right way to keep validation and release responsibilities distinct.',
      'Secrets should also be treated carefully. The build system often needs credentials for registries, signing, package publication, or deployment, but those credentials should be explicitly managed and exposed only where necessary.',
    ],
  },
  {
    id: 'core-logs',
    title: 'Logs, observability, and auditability',
    paragraphs: [
      'Every serious build system needs more than pass or fail. Teams need logs, timestamps, step-level visibility, failure context, and a historical record of what happened and who initiated it.',
      'Cloud Build integrates with managed logging and storage options for build logs. This makes troubleshooting, audit review, and operational visibility much easier than ad hoc self-hosted runner setups.',
      'A useful operational habit is to treat build logs as part of the release record. If a deployment exists, the platform should be able to show which build produced it and what happened during that build.',
    ],
  },
  {
    id: 'core-pools',
    title: 'Private pools, isolation, and networking',
    paragraphs: [
      'The default managed execution environment is enough for many pipelines, but some organizations need stronger network control, private connectivity, or execution isolation. That is where private pools become important.',
      'Private pools let teams run builds in more controlled environments while still using the managed Cloud Build model. This is relevant for enterprise networking requirements, internal package repositories, and private dependency access.',
      'The design tradeoff is flexibility versus simplicity. The more network and environment control you need, the more delivery infrastructure becomes part of the platform architecture.',
    ],
  },
  {
    id: 'core-delivery',
    title: 'Deployment patterns and release flow',
    paragraphs: [
      'Cloud Build is often used not only to compile and package software, but also to deploy it. Common patterns include building and pushing a container image, then deploying it to Cloud Run, GKE, or another runtime target.',
      'A good release flow separates validation, build, and deploy concerns cleanly. For example, pull request builds may run tests only, main-branch builds may publish artifacts, and protected release triggers may deploy approved artifacts.',
      'This is where approvals and release gating become important. Mature teams usually want promotion logic that reflects trust boundaries rather than one giant trigger that can do everything from every branch.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Build performance and pipeline efficiency',
    paragraphs: [
      'CI speed matters because build latency directly affects developer feedback loops and release throughput. In Cloud Build, efficiency comes from pipeline design more than from manual runner tuning.',
      'The high-value optimizations are straightforward: avoid unnecessary work, cache or reuse what makes sense, split slow validation from fast validation, use appropriate base images, and publish stable build tooling in reusable builder images when that reduces repeated setup time.',
      'The right performance mindset is not to make every build do everything. It is to design multiple build paths so that quick checks stay quick while deeper release pipelines remain explicit and trustworthy.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and surrounding services',
    paragraphs: [
      'Cloud Build rarely stands alone. It is commonly paired with Artifact Registry for image and package storage, Cloud Run or GKE for deployment targets, Secret Manager for credentials, and source repositories or GitHub connections for event-driven automation.',
      'It also works well as a shared platform primitive. Internal tooling, platform teams, and repository templates can all standardize on Cloud Build as the execution backend for delivery tasks.',
      'That ecosystem fit is one of the service\'s strengths. The value comes not only from step execution, but from how naturally it fits into a larger delivery platform on Google Cloud.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with self-hosted CI runners, Cloud Build removes operational overhead and improves standardization, but it gives up some of the unconstrained control teams may have in entirely self-managed environments.',
      'Compared with larger all-in-one DevOps suites, Cloud Build is narrower and more infrastructure-oriented. That is often a strength for platform teams that want composable services rather than one monolithic tool.',
      'Compared with local build scripts, Cloud Build adds repeatability, identity-aware execution, logs, and centralized policy. The tradeoff is that pipeline logic must be formalized instead of living as implicit tribal knowledge.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Letting one build service account have broad permissions for validation, publishing, and production deployment.',
      'Hard-coding environment-specific values in many slightly different build configs instead of using clean substitutions and trigger design.',
      'Rebuilding artifacts during deployment rather than promoting previously built outputs.',
      'Treating the build config as an afterthought instead of reviewed, versioned delivery code.',
      'Running every expensive test and packaging step on every source event, which makes CI slow and noisy.',
      'Using triggers without clear naming and branch intent, leaving it unclear which pipeline is responsible for what.',
      'Ignoring logs and provenance, then struggling to answer which build produced a release.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Use Cloud Build when you want managed CI/CD execution, especially for container-native or GCP-centric delivery workflows.',
      'Use distinct service accounts or trigger boundaries when validation and deployment have different trust levels.',
      'Treat artifacts as the output of CI and promote them consistently through environments.',
      'Use substitutions when they reduce duplication, but keep build files readable and explicit.',
      'Use private pools when networking, isolation, or compliance requirements justify the added platform complexity.',
      'Design builds around fast feedback for developers and explicit control for releases.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Cloud Build, they usually adopt trigger specialization, private pools, approval gates, reusable builder images, multi-environment release templates, and stronger provenance around artifacts and deployments.',
      'These capabilities matter because delivery platforms tend to become shared infrastructure. A small repository build script can become an organizational release system if the underlying model is stable enough.',
      'The practical lesson is to design Cloud Build pipelines as long-lived platform assets. Naming, review discipline, identity boundaries, and artifact flow matter more as more teams depend on the same delivery system.',
    ],
  },
]

const examples = [
  {
    title: 'Run a basic test-and-build pipeline',
    code: `steps:
- name: 'node:20'
  entrypoint: npm
  args: ['ci']

- name: 'node:20'
  entrypoint: npm
  args: ['test']

- name: 'node:20'
  entrypoint: npm
  args: ['run', 'build']`,
    explanation:
      'This is the simplest Cloud Build mental model: a build is just ordered container steps. Each step declares its image and command, and the platform manages the execution.',
  },
  {
    title: 'Build and push a container image',
    code: `steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/$PROJECT_ID/app/web:$COMMIT_SHA', '.']

- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'us-central1-docker.pkg.dev/$PROJECT_ID/app/web:$COMMIT_SHA']

images:
- 'us-central1-docker.pkg.dev/$PROJECT_ID/app/web:$COMMIT_SHA'`,
    explanation:
      'This pattern makes the artifact explicit. The build produces a versioned image, pushes it to Artifact Registry, and records it as an output of the build.',
  },
  {
    title: 'Use substitutions for environment-aware deployment',
    code: `substitutions:
  _SERVICE_NAME: my-api
  _REGION: us-central1

steps:
- name: 'gcr.io/cloud-builders/gcloud'
  args:
    [
      'run', 'deploy', '$_SERVICE_NAME',
      '--image', 'us-central1-docker.pkg.dev/$PROJECT_ID/app/web:$COMMIT_SHA',
      '--region', '$_REGION'
    ]`,
    explanation:
      'Substitutions let one build config support multiple services or environments without cloning the file for every variation.',
  },
  {
    title: 'Add a trigger-friendly branch gate',
    code: `steps:
- name: 'bash'
  entrypoint: 'bash'
  args:
    - '-c'
    - |
      if [[ "$BRANCH_NAME" != "main" ]]; then
        echo "Not a release branch. Running validation only."
        exit 0
      fi

- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/$PROJECT_ID/app/web:$COMMIT_SHA', '.']`,
    explanation:
      'Trigger context can shape behavior. This kind of pattern is useful, but it should stay understandable. In many cases, separate triggers are clearer than too much conditional logic in one file.',
  },
  {
    title: 'Use a custom builder for internal tooling',
    code: `steps:
- name: 'us-central1-docker.pkg.dev/$PROJECT_ID/platform/custom-builder:latest'
  args: ['release', '--config', 'release.yaml']`,
    explanation:
      'Custom builder images are useful when teams want to package internal tooling once and reuse it across many repositories instead of rebuilding environment setup logic repeatedly.',
  },
  {
    title: 'Store release metadata alongside the build',
    code: `steps:
- name: 'bash'
  entrypoint: 'bash'
  args:
    - '-c'
    - |
      printf '{"commit":"%s","build":"%s"}\n' "$COMMIT_SHA" "$BUILD_ID" > release-metadata.json

artifacts:
  objects:
    location: 'gs://$PROJECT_ID-build-metadata/releases/'
    paths: ['release-metadata.json']`,
    explanation:
      'A mature pipeline records more than binary outputs. Build metadata improves traceability and makes later auditing or incident review much easier.',
  },
]

const glossaryTerms = [
  {
    term: 'Build',
    definition: 'A managed Cloud Build job that executes ordered steps and records logs, status, identity, and outputs.',
  },
  {
    term: 'Build step',
    definition: 'A single containerized command within a build pipeline.',
  },
  {
    term: 'Build config',
    definition: 'The YAML or JSON definition that describes how a build should run.',
  },
  {
    term: 'Trigger',
    definition: 'A rule that starts a build in response to a source event or other configured input.',
  },
  {
    term: 'Substitution',
    definition: 'A variable value injected into a build so one config can be reused across multiple contexts.',
  },
  {
    term: 'Artifact',
    definition: 'A build output such as a container image, package, binary, or generated release bundle.',
  },
  {
    term: 'Artifact Registry',
    definition: 'A common destination for images and packages produced by Cloud Build pipelines.',
  },
  {
    term: 'Private pool',
    definition: 'A more controlled Cloud Build execution environment used for stronger isolation or networking requirements.',
  },
  {
    term: 'Service account',
    definition: 'The identity a build uses to access resources, push artifacts, or perform deployments.',
  },
  {
    term: 'Approval gate',
    definition: 'A control that requires explicit approval before a build proceeds to sensitive stages.',
  },
  {
    term: 'Builder image',
    definition: 'The container image used to run a build step, whether Google-provided, third-party, or custom.',
  },
  {
    term: 'Build logs',
    definition: 'The execution record of a build, used for troubleshooting, auditing, and operational visibility.',
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
    { id: 'core-architecture', label: 'Architecture and Execution' },
    { id: 'core-config', label: 'Build Configs and Steps' },
    { id: 'core-source', label: 'Source and Triggers' },
    { id: 'core-substitutions', label: 'Substitutions and Reuse' },
    { id: 'core-artifacts', label: 'Artifacts and Outputs' },
    { id: 'core-identity', label: 'Identity and Secrets' },
    { id: 'core-logs', label: 'Logs and Auditability' },
    { id: 'core-pools', label: 'Private Pools' },
    { id: 'core-delivery', label: 'Deployment Patterns' },
    { id: 'core-performance', label: 'Performance' },
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

export default function GCPCloudBuildPage(): JSX.Element {
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
    document.title = `GCP Cloud Build (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Cloud Build',
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
    <div className="cloudbuild-help-page">
      <style>{cloudBuildHelpStyles}</style>
      <div className="cloudbuild-help-window" role="presentation">
        <header className="cloudbuild-help-titlebar">
          <span className="cloudbuild-help-title">GCP Cloud Build</span>
          <div className="cloudbuild-help-controls">
            <button className="cloudbuild-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="cloudbuild-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cloudbuild-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`cloudbuild-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cloudbuild-help-main">
          <aside className="cloudbuild-help-toc" aria-label="Table of contents">
            <h2 className="cloudbuild-help-toc-title">Contents</h2>
            <ul className="cloudbuild-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cloudbuild-help-content">
            <h1 className="cloudbuild-help-doc-title">GCP Cloud Build</h1>
            <p className="cloudbuild-help-doc-subtitle">Managed CI and build automation built around containerized pipeline steps</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact Cloud Build manual: what the service is,
              how builds are modeled, how triggers and identities work, how teams produce and promote artifacts, and which design
              choices matter for secure and maintainable delivery pipelines.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="cloudbuild-help-section">
                    <h2 className="cloudbuild-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="cloudbuild-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="cloudbuild-help-section">
                  <h2 className="cloudbuild-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="cloudbuild-help-section">
                    <h2 className="cloudbuild-help-heading">{section.title}</h2>
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
                  <section key={example.title} id={`example-${index + 1}`} className="cloudbuild-help-section">
                    <h2 className="cloudbuild-help-heading">{example.title}</h2>
                    <div className="cloudbuild-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cloudbuild-help-section">
                <h2 className="cloudbuild-help-heading">Glossary</h2>
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
