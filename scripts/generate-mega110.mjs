import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Bamboo/index.mdx': `---
title: Bamboo
description: A legacy, enterprise-grade continuous integration and deployment server developed by Atlassian, mathematically integrated with Jira and Bitbucket for highly regulated, on-premises environments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Bamboo"
  subtitle="Atlassian's On-Premises CI/CD Server"
  tags={['DevOps', 'CI/CD', 'Atlassian', 'Legacy']}
>

Before the rise of cloud-hosted YAML pipelines (like GitHub Actions), enterprise CI/CD required heavily customized, on-premises physical servers. Bamboo was Atlassian's flagship product for this era.

## 1. Deep Atlassian Integration
Bamboo's mathematical superiority historically came from its native integration with the Atlassian stack.
If a pipeline failed, Bamboo could automatically execute a mathematical API call to Jira to transition a ticket from "In Testing" back to "In Progress," and assign it to the developer who broke the build. This reduced administrative overhead in massive corporations.

## 2. The Migration to the Cloud
Unlike modern systems that use a simple text file (TICK1.ymlTICK1) in the repository to define the pipeline, Bamboo historically relied on a massive GUI web interface where administrators manually clicked to create build steps. This violated the mathematical principle of "Configuration as Code."
While Bamboo is still used in highly secure, air-gapped data centers (like defense contractors), Atlassian has largely shifted its focus to **Bitbucket Pipelines** for its modern, cloud-native customer base.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Buildkite/index.mdx': `---
title: Buildkite
description: A highly scalable hybrid CI/CD platform that mathematically separates the orchestration (cloud) from the execution (on-premises agents), enabling massive parallel builds while maintaining strict security.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Buildkite"
  subtitle="Hybrid CI/CD Orchestration"
  tags={['DevOps', 'CI/CD', 'Platform', 'Security']}
>

If a healthcare company uses GitHub Actions, their proprietary source code and database passwords must be mathematically transmitted to Microsoft's cloud servers to execute the tests, violating HIPAA compliance in some scenarios.

## 1. The Hybrid Architecture
Buildkite solves this through a brilliant mathematical architecture split.
- **The Orchestrator (Cloud)**: Buildkite hosts the web UI, the mathematical DAG logic, and the reporting dashboards on their cloud.
- **The Agents (On-Premises)**: The customer installs Buildkite Agents on their own private, firewalled servers (e.g., inside their own AWS VPC).
When a pipeline triggers, the cloud Orchestrator sends a mathematical signal to the private Agent: *"Run this script."* The Agent pulls the code directly from the private Git repo, runs the tests, and only sends pure text logs back to the Orchestrator. The proprietary source code mathematically never leaves the customer's secure network.

## 2. Infinite Concurrency
Because the customer provides their own compute power, Buildkite allows mathematically infinite concurrency. 
A company like Shopify can spin up 10,000 ephemeral AWS EC2 instances, install the Buildkite Agent on all of them simultaneously, and execute 10,000 parallel test suites in 3 seconds, a scale that would be prohibitively expensive on fully cloud-hosted CI platforms.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/CircleCI/index.mdx': `---
title: CircleCI
description: A leading cloud-native continuous integration and delivery platform renowned for its mathematical speed, containerized execution model, and sophisticated pipeline caching mechanisms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="CircleCI"
  subtitle="High-Velocity Cloud CI/CD"
  tags={['DevOps', 'CI/CD', 'Platform', 'Automation']}
>

CircleCI was one of the first platforms to aggressively champion the **Docker-first** mathematical execution model, pulling developers away from the nightmare of managing massive, brittle Jenkins servers.

## 1. The Executor Model
In CircleCI's TICK1.circleci/config.ymlTICK1, every job explicitly defines a mathematical **Executor** (typically a Docker image). 
For example, a job might declare: *"Execute this step inside TICK1cimg/node:18.0TICK1."* CircleCI instantly pulls that pristine container and runs the commands inside it. This guarantees that the CI environment is mathematically identical every single time, completely eliminating "flaky builds" caused by leftover files from a previous run.

## 2. Advanced Caching and Orbs
CircleCI is mathematically optimized for speed.
Downloading TICK1node_modulesTICK1 can take 3 minutes. CircleCI uses advanced **Dependency Caching**. It computes a mathematical hash of the TICK1package-lock.jsonTICK1 file. If the hash hasn't changed since the last build, it instantly injects the cached TICK1node_modulesTICK1 into the container, saving massive amounts of compute time.
Additionally, CircleCI introduced **Orbs**—reusable, open-source mathematical YAML snippets. Instead of writing 50 lines of code to deploy to AWS S3, a developer imports the AWS Orb and executes the deployment in 2 lines.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Drone CI/index.mdx': `---
title: Drone CI
description: A modern, container-native continuous delivery platform mathematically engineered to execute entire CI/CD pipelines as a series of isolated, ephemeral Docker containers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Drone CI"
  subtitle="Container-Native Orchestration"
  tags={['DevOps', 'CI/CD', 'Docker', 'Containers']}
>

Traditional CI systems (like Jenkins) run scripts directly on the host server's operating system, leading to mathematical dependency hell if Project A requires Java 8 and Project B requires Java 17 on the exact same build agent.

## 1. Everything is a Container
Drone CI enforces a strict, elegant mathematical rule: **Every single step in your pipeline is a Docker container.**
Your TICK1.drone.ymlTICK1 file does not define bash scripts; it defines an array of containers. 
1. Step 1 spins up a Node container to run tests.
2. Step 2 spins up a custom AWS CLI container to deploy the code.
Because every step executes inside its own mathematically isolated user-space, dependency conflicts are physically impossible. 

## 2. Self-Hosted Simplicity
Drone (acquired by Harness) is incredibly popular for self-hosting due to its lightweight mathematical footprint.
Unlike GitLab CI, which requires massive memory, Drone is written in Go and deploys as a single tiny Docker container. It natively integrates with GitHub, Gitea, and Bitbucket using Webhooks, providing enterprise-grade containerized pipelines for small startups without the cloud-hosting fees.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Flux/index.mdx': `---
title: Flux
description: An open-source, extensible GitOps toolkit specifically designed to mathematically reconcile Kubernetes cluster state with configuration files stored in external Git repositories.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Flux"
  subtitle="The GitOps Brain for Kubernetes"
  tags={['DevOps', 'Kubernetes', 'GitOps', 'Automation']}
>

Flux (alongside Argo CD) is the mathematical engine powering the GitOps revolution. Developed by Weaveworks, it eliminates the need to grant CI systems direct administrative access to Kubernetes clusters.

## 1. The Pull Mechanism
Traditional deployments use a "Push" model: Jenkins runs TICK1kubectl applyTICK1 to push changes into the cluster. This mathematically requires giving Jenkins the cluster's root admin token, a massive security vulnerability.
Flux uses a "Pull" model. You install the Flux agent *inside* the cluster. Flux reaches out to GitHub. It mathematically calculates the diff between the Git repo (Desired State) and the cluster (Live State). If they diverge, Flux automatically pulls the changes and applies them internally. The cluster is mathematically sealed; no external system can push to it.

## 2. Kustomize and Helm Integration
Flux does not just blindly apply raw YAML.
It mathematically natively integrates with **Kustomize** and **Helm**. If a developer commits an update to a Helm Chart's TICK1values.yamlTICK1 file, Flux detects the change, mathematically re-renders the entire Helm chart into raw Kubernetes resources, and applies the update gracefully without human intervention.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/GitLab CI/index.mdx': `---
title: GitLab CI
description: A highly sophisticated, mathematically robust Continuous Integration and Continuous Deployment engine built natively into the GitLab application, renowned for its enterprise scaling capabilities.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="GitLab CI"
  subtitle="Native Monolithic Orchestration"
  tags={['DevOps', 'CI/CD', 'GitLab', 'Platform']}
>

Because GitLab CI is not a separate application (like Jenkins or CircleCI) but rather baked directly into the GitLab source code manager, the mathematical synergy between code, tickets, and deployments is unparalleled.

## 1. The Auto-DevOps Algorithm
GitLab CI features a mathematically fascinating capability called **Auto-DevOps**.
If a developer pushes a new repository without a TICK1.gitlab-ci.ymlTICK1 file, GitLab analyzes the codebase. If it detects a TICK1package.jsonTICK1, it mathematically assumes it is a Node.js project. It automatically generates a hidden pipeline that builds the code, runs security scans, packages it into a Docker image, and deploys it to a connected Kubernetes cluster—all without the developer writing a single line of CI configuration.

## 2. Advanced Multi-Project Pipelines
In enterprise microservices, mathematical dependencies are complex. 
If the TICK1Core-APITICK1 repository is updated, the TICK1Frontend-AppTICK1 must be rebuilt to test for breaking API changes. GitLab CI natively supports cross-project pipeline triggers. The completion of a pipeline in Repo A mathematically executes an API call to trigger a pipeline in Repo B, passing artifacts between them securely, enabling massive, interconnected corporate release trains.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Jenkins/index.mdx': `---
title: Jenkins
description: An open-source, Java-based automation server that historically dominated the CI/CD landscape, relying on a massive ecosystem of plugins to mathematically orchestrate complex build processes.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Jenkins"
  subtitle="The Grandfather of Automation"
  tags={['DevOps', 'CI/CD', 'Java', 'Legacy']}
>

Created in 2004 (originally named Hudson), Jenkins is the single most mathematically influential automation tool in software history. It taught the industry how to automate software delivery.

## 1. The Plugin Ecosystem
Jenkins is fundamentally a blank mathematical engine. Its power comes from its **Plugin Ecosystem**.
There are over 1,800 community-built plugins. If you need to mathematically connect a 20-year-old SVN repository to a modern AWS Kubernetes cluster, there is a Jenkins plugin for it. This immense flexibility made it the default choice for massive enterprises with complex, heterogenous legacy systems.

## 2. The Groovy Nightmare
Jenkins' greatest strength became its mathematical downfall.
Modern CI/CD uses declarative YAML (like GitHub Actions). Jenkins relies on **Jenkinsfiles**, written in a Turing-complete programming language called Groovy.
Developers ended up writing thousands of lines of complex Groovy code just to deploy a website. Furthermore, Jenkins servers mathematically suffer from "Plugin Hell"—updating one plugin often breaks three others, turning the Jenkins server itself into a fragile, legacy application that requires dedicated teams just to keep it alive. The industry is currently in a massive mathematical migration away from Jenkins toward cloud-native solutions.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Spinnaker/index.mdx': `---
title: Spinnaker
description: An open-source, multi-cloud continuous delivery platform originally created by Netflix, mathematically designed to execute complex, high-velocity deployments across thousands of servers safely.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Spinnaker"
  subtitle="Enterprise Multi-Cloud Delivery"
  tags={['DevOps', 'Continuous Delivery', 'Netflix', 'Cloud']}
>

Jenkins is mathematically excellent at Continuous *Integration* (compiling and testing code). Spinnaker (built by Netflix) was designed because Jenkins is mathematically terrible at Continuous *Deployment* (managing live cloud infrastructure).

## 1. The Multi-Cloud Abstraction
Netflix needed to mathematically deploy applications across AWS, Google Cloud, and Kubernetes simultaneously.
Spinnaker provides a unified mathematical abstraction layer over all major cloud providers. A developer creates a pipeline that says *"Deploy this Docker image."* Spinnaker automatically translates that command into the specific API calls required by AWS EC2, GCP Compute Engine, or Kubernetes, entirely decoupling the deployment logic from the underlying cloud provider.

## 2. Advanced Deployment Strategies
Spinnaker is mathematically engineered for release safety.
It natively understands **Canary Deployments**. You can configure a Spinnaker pipeline to route 2% of traffic to a new release. Spinnaker will mathematically hook into your Prometheus monitoring system, analyze the HTTP 500 error rate for 30 minutes, and if the mathematical baseline is breached, it will automatically roll back the deployment and destroy the new servers without human intervention.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/TeamCity/index.mdx': `---
title: TeamCity
description: A commercial, enterprise-grade continuous integration server developed by JetBrains, renowned for its mathematical stability, deep IDE integration, and out-of-the-box intelligence.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="TeamCity"
  subtitle="JetBrains' Premium CI/CD Engine"
  tags={['DevOps', 'CI/CD', 'JetBrains', 'Enterprise']}
>

While Jenkins requires 50 plugins to function, TeamCity (by JetBrains, the creators of IntelliJ and Kotlin) is designed to mathematically work perfectly out-of-the-box, aimed at enterprises willing to pay for stability and premium developer experience.

## 1. Deep IDE Integration
TeamCity's mathematical superiority lies in its integration with developers' daily workflows.
If a developer writes code in IntelliJ IDEA, they can run a **Remote Run**. The IDE mathematically sends their uncommitted code to the TeamCity server. TeamCity runs the massive 3-hour integration test suite in the cloud and reports the results back directly inside the developer's IDE. This allows developers to mathematically guarantee their code will pass CI *before* they even push a commit to Git.

## 2. Intelligent Build Chains
TeamCity handles mathematical **Build Chains** (DAGs) natively and elegantly.
If a project consists of 10 microservices, TeamCity mathematically tracks the snapshot dependencies between them. If a developer only alters the Frontend code, TeamCity's engine is intelligent enough to realize the Backend artifacts haven't changed. It mathematically reuses the cached Backend binaries and only recompiles the Frontend, saving massive amounts of enterprise compute time.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Tekton/index.mdx': `---
title: Tekton
description: An open-source, Kubernetes-native framework for creating continuous integration and delivery systems, mathematically executing all pipeline steps as standard Kubernetes Pods.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Tekton"
  subtitle="Kubernetes-Native Pipelines"
  tags={['DevOps', 'Kubernetes', 'CI/CD', 'Cloud Native']}
>

Tekton (a founding project of the Continuous Delivery Foundation) represents a massive mathematical paradigm shift: why run a separate CI/CD server if you already have a massive Kubernetes cluster?

## 1. Pipelines as Custom Resource Definitions (CRDs)
In Tekton, you do not write a Jenkinsfile. You mathematically extend the Kubernetes API itself.
Tekton installs Custom Resource Definitions (CRDs) into the cluster, creating new Kubernetes object types: TICK1TaskTICK1, TICK1PipelineTICK1, and TICK1PipelineRunTICK1. 
You define your CI/CD pipeline using pure, mathematical Kubernetes YAML. 
When a pipeline triggers, Tekton mathematically translates every step into a standard Kubernetes **Pod**. The cluster schedules these Pods across its nodes exactly like it schedules standard web applications, utilizing the immense, auto-scaling compute power of the existing cluster.

## 2. Serverless Execution
Because pipelines are just Kubernetes Pods, Tekton is mathematically **Serverless**.
There is no central "Jenkins Master Server" constantly consuming 16GB of RAM while waiting for jobs. The Tekton controller sleeps until a webhook arrives. It mathematically spawns a Pod, executes the build, and destroys the Pod, consuming exactly zero compute resources when the pipeline is idle. This mathematical efficiency is why major cloud providers (like Google Cloud Build and Red Hat OpenShift) rebuilt their managed CI/CD offerings on top of the Tekton engine.

</TechnologyTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
