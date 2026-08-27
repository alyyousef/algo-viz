import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Blue-green deployment/index.mdx': `---
title: Blue-Green Deployment
description: A mathematically safe release strategy that utilizes two identical production environments to guarantee zero-downtime deployments and instant, perfect rollbacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Blue-Green Deployment"
  subtitle="Zero-Downtime Release Strategy"
  tags={['DevOps', 'Deployment', 'Architecture', 'Safety']}
>

Historically, deploying new code meant taking the server offline for 10 minutes, resulting in mathematical downtime. Blue-Green deployment completely eliminates this by doubling the physical infrastructure during the release window.

## 1. The Dual-Environment Architecture
You maintain two exact, mathematically identical production environments: **Blue** (currently live) and **Green** (idle).
When version 2.0 of your application is ready, you deploy it entirely to the Green environment. Green is completely isolated; no public users can reach it. 
Your QA engineers run mathematical integration and smoke tests against the Green environment to ensure version 2.0 functions perfectly against the live database.

## 2. The Atomic Router Switch
Once Green is verified, the deployment is executed not by moving code, but by modifying the **Load Balancer**.
You mathematically flip the Load Balancer routing rules to instantly point 100% of public internet traffic to the Green environment. 
- The downtime is mathematically **zero milliseconds**.
- If a catastrophic bug is discovered 5 minutes later, you do not write a revert commit. You simply flip the Load Balancer back to Blue. Because Blue is still running version 1.0 completely untouched, the rollback is instantaneous and mathematically guaranteed to succeed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Build automation/index.mdx': `---
title: Build Automation
description: The mathematical process of scripting the compilation, linking, and packaging of source code into executable artifacts without human intervention, ensuring absolute deterministic reproducibility.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Build Automation"
  subtitle="Deterministic Code Compilation"
  tags={['DevOps', 'CI/CD', 'Automation', 'Engineering']}
>

If a developer compiles code on their local laptop, the resulting binary is mathematically contaminated by their specific OS version, globally installed packages, and local environment variables. "It works on my machine" is the enemy of DevOps.

## 1. The Build Script
Build Automation forces the compilation process into a strictly version-controlled script (e.g., a TICK1MakefileTICK1, a TICK1pom.xmlTICK1, or a TICK1build.gradleTICK1).
When code is pushed to Git, a CI server (like Jenkins or GitHub Actions) pulls the code into a pristine, mathematically sterile environment. It executes the build script. The script mathematically dictates exactly which compiler version to use, downloads the exact dependency versions from an artifact registry, compiles the source, and runs the unit tests.

## 2. Determinism and Idempotency
A properly engineered automated build must be **mathematically deterministic**.
If you feed the exact same Git commit hash into the build system 100 times, you must get the exact same byte-for-byte output binary 100 times. This eliminates "flaky builds." 
The resulting artifact (a Docker container or a TICK1.jarTICK1 file) is then cryptographically hashed and stored in an immutable registry. This mathematically guarantees that what QA tested in Staging is the exact same binary that is executing in Production.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Canary deployment/index.mdx': `---
title: Canary Deployment
description: A highly mathematical risk-mitigation strategy where new code is deployed to a tiny subset of real users to measure error rates before rolling out to the entire infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Canary Deployment"
  subtitle="Statistical Release Verification"
  tags={['DevOps', 'Deployment', 'Monitoring', 'Safety']}
>

Blue-Green deployments shift 100% of traffic instantly. If there is a bug that QA missed, 100% of your users experience a crash. Canary deployments mathematically limit the blast radius of undetected bugs.

## 1. Statistical Traffic Shaping
When version 2.0 is ready, you deploy it alongside version 1.0. 
You instruct the Load Balancer to route exactly **5% of traffic** to version 2.0 (the Canary), while 95% remains on version 1.0. 
This is not A/B testing for marketing; this is a strict mathematical test of system stability. The monitoring system (like Prometheus) continuously analyzes the telemetry from the 5% bucket. 

## 2. Automated Rollback (The Circuit Breaker)
The DevOps team defines mathematical baselines: *"If the Canary HTTP 500 error rate exceeds 1%, or if CPU usage spikes above 80%, mathematically destroy the Canary."*
If the new code is flawed, the monitoring system instantly trips a circuit breaker, routing all traffic back to 1.0. Only 5% of users experienced a temporary glitch. If the mathematical telemetry remains stable for 10 minutes, the automated system gradually scales the Canary to 20%, then 50%, and finally 100%, completing a mathematically verified, zero-downtime release.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/CD/index.mdx': `---
title: Continuous Deployment (CD)
description: The absolute culmination of the DevOps pipeline, where code that mathematically passes all automated tests is instantly deployed to production without any human approval or manual intervention.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Continuous Deployment (CD)"
  subtitle="Zero-Touch Production Releases"
  tags={['DevOps', 'CI/CD', 'Automation', 'Engineering']}
>

While Continuous *Delivery* means code is *ready* to deploy, Continuous *Deployment* removes the final human barrier. Every single commit that mathematically passes the CI pipeline is automatically pushed to live users in Production.

## 1. The Mathematical Prerequisite: Perfect Testing
You cannot implement Continuous Deployment if your test suite is weak.
To allow a machine to push code to production automatically, you must have absolute, mathematical confidence in your test coverage. This requires:
- **Unit Tests**: Proving the logic works in isolation.
- **Integration Tests**: Proving the database queries are valid.
- **End-to-End (E2E) Tests**: Spinning up a headless browser to mathematically prove a user can actually click the "Checkout" button.
If the test suite is mathematically rigorous, human manual QA becomes a bottleneck, and Continuous Deployment becomes safe.

## 2. The Feedback Loop
Continuous Deployment radically alters engineering psychology.
Instead of deploying massive "Releases" once a month containing 10,000 lines of code (which are mathematically impossible to debug if they fail), developers merge tiny, 20-line pull requests 10 times a day. If a deployment causes a bug, the blast radius is tiny, the offending commit is instantly obvious, and the developer can push a fix that will be live in Production 3 minutes later.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/CI/index.mdx': `---
title: Continuous Integration (CI)
description: The foundational DevOps practice of merging all developer code copies into a shared mainline several times a day, mathematically validated by automated builds and rigorous unit testing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Continuous Integration (CI)"
  subtitle="Automated Code Validation"
  tags={['DevOps', 'CI/CD', 'Git', 'Testing']}
>

Historically, developers would work on isolated feature branches for weeks. When they finally tried to merge their code together on "Release Day," they encountered "Merge Hell"—massive, mathematically complex code conflicts that took days to resolve.

## 1. The Frequent Merge Paradigm
Continuous Integration (CI) demands that developers merge their code into the TICK1mainTICK1 branch multiple times a day.
By merging tiny, incremental changes constantly, mathematical divergence between branches is minimized, and massive merge conflicts are entirely prevented. 

## 2. The Automated Gatekeeper
Because code is constantly merging into TICK1mainTICK1, you must mathematically guarantee that no single merge breaks the application.
Every time a developer opens a Pull Request, the CI Server (e.g., GitHub Actions, GitLab CI) wakes up. It mathematically acts as a gatekeeper:
1. It pulls the proposed code.
2. It executes the build script.
3. It runs the entire suite of unit tests.
4. It runs static analysis (Linting, SonarQube) to check for security flaws.
If even one mathematical test fails, the CI server physically blocks the "Merge" button, ensuring the TICK1mainTICK1 branch is mathematically protected from broken code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Configuration management/index.mdx': `---
title: Configuration Management
description: The systematic engineering practice of maintaining computer systems, servers, and software in a desired, mathematically consistent state using infrastructure-as-code tools like Ansible, Chef, or Puppet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Configuration Management"
  subtitle="Enforcing System State"
  tags={['DevOps', 'Infrastructure', 'Automation', 'State']}
>

If an administrator manually SSHes into a server to edit an Nginx configuration file, that server becomes a "Snowflake"—a unique, mathematically untrackable entity. If that server dies, it is impossible to perfectly recreate it. Configuration Management solves this.

## 1. Declarative Desired State
Configuration Management tools (like Ansible, Puppet, and Chef) use code to define a **Desired State**.
You write a mathematical declaration in YAML or Ruby: *"The Nginx package MUST be installed. The file TICK1/etc/nginx.confTICK1 MUST exactly match this template. The Nginx service MUST be running."*
You store this code in Git. When the tool runs against 100 servers, it mathematically evaluates each server's current state. If a server is missing Nginx, the tool installs it. If the server already has Nginx running, the tool mathematically does nothing (Idempotency).

## 2. Eliminating Configuration Drift
Over time, servers experience **Configuration Drift** (e.g., a developer logs in and temporarily disables a firewall rule but forgets to turn it back on).
Configuration Management tools run continuously in the background (or on a cron schedule). If they detect that the actual state of the server has mathematically drifted away from the Git repository's defined state, they aggressively revert the unauthorized changes, ensuring 100% mathematical compliance across the entire fleet.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Containerisation/index.mdx': `---
title: Containerisation
description: An OS-level virtualization methodology that packages an application and its exact mathematical dependencies into an isolated, lightweight executable unit that runs identically on any environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Containerisation"
  subtitle="The Portable Executable Unit"
  tags={['DevOps', 'Docker', 'Virtualization', 'Architecture']}
>

Historically, deploying Python code required the DevOps team to carefully manually install the correct version of Python and system libraries directly onto the Linux host OS, leading to massive mathematical dependency conflicts if two apps required different versions of the same library.

## 1. OS-Level Isolation (cgroups and namespaces)
Containerisation (popularized by Docker) solves this using Linux kernel features: **namespaces** (for isolation) and **cgroups** (for resource limits).
Unlike a Virtual Machine (which boots an entire heavy, mathematical copy of an operating system kernel), a Container shares the host OS kernel but runs in a perfectly isolated user space. A container thinks it is the only program running on the machine. It has its own isolated file system, its own isolated network interface, and its own isolated process tree.

## 2. The Immutable Image
A container is built from a **Dockerfile**. 
The Dockerfile mathematically describes the exact environment: *"Start with Ubuntu 22.04, install Python 3.9, copy my code, and run it."*
This builds an **Immutable Image**. Because the application and its entire OS-level dependency tree are mathematically fused into a single binary, you can test the image on a developer's laptop, and then deploy that exact same image to an AWS server. It is mathematically guaranteed to execute identically, completely eliminating the "It works on my machine" paradigm.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Continuous delivery/index.mdx': `---
title: Continuous Delivery
description: The DevOps practice of ensuring that software is always mathematically in a deployable state, with all code changes automatically built, tested, and packaged for release to a production environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Continuous Delivery (CD)"
  subtitle="Always Ready for Production"
  tags={['DevOps', 'CI/CD', 'Release Management', 'Engineering']}
>

Continuous Delivery is the bridge between Continuous Integration (CI) and Continuous Deployment. While CI ensures the code compiles and tests pass, Continuous Delivery ensures the resulting binary is perfectly packaged and physically staged for deployment.

## 1. The Artifact Repository
When a developer merges code, CI tests it. Continuous Delivery takes the next mathematical step: it builds the final executable (e.g., a Docker Image) and pushes it to an **Artifact Repository** (like AWS ECR, Nexus, or Artifactory).
This artifact is mathematically tagged with a semantic version or a Git commit hash. The critical rule of Continuous Delivery is that this artifact is **immutable**. You never rebuild the code for staging and then rebuild it again for production. You promote the exact same mathematical binary artifact through the environments.

## 2. The Manual Push-Button Release
The defining mathematical difference between Continuous *Delivery* and Continuous *Deployment* is a manual approval gate.
In Continuous Delivery, the code is fully built, tested, and deployed automatically to Staging. However, the final pipeline step to Production halts. It requires a human (a Release Manager or Product Owner) to physically click a "Deploy" button. This is mathematically necessary for enterprises that require manual compliance sign-offs or coordinated marketing launches.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Continuous deployment/index.mdx': `---
title: Continuous Deployment
description: A highly automated software release strategy where every code change that passes the automated testing suite is mathematically guaranteed to be deployed directly to production users immediately.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Continuous Deployment"
  subtitle="Fully Automated Production Releases"
  tags={['DevOps', 'CI/CD', 'Automation', 'Agile']}
>

*(Note: While similar to Continuous Delivery, Continuous Deployment removes the final human interaction step, representing the ultimate mathematical culmination of the DevOps philosophy).*

## 1. Removing the Human Bottleneck
Humans are mathematically slow, error-prone, and require sleep. 
In a Continuous Deployment pipeline, there are no "Release Boards," no "Change Approval Meetings," and no manual QA testers. If a developer pushes a commit at 3:00 AM on a Sunday, the CI pipeline runs the tests. If the mathematical tests return TICK1trueTICK1, the orchestration engine (like ArgoCD or Spinnaker) instantly deploys the new containers to the production Kubernetes cluster. The entire process from Git Push to live public availability takes minutes.

## 2. Feature Flags (Decoupling Release from Deployment)
If code goes live instantly, how do you release a massive feature that isn't finished yet?
Continuous Deployment relies heavily on **Feature Flags** (Toggles). 
The developer wraps the new feature in a mathematical TICK1if (feature_flag_enabled)TICK1 block. The code is continuously deployed to production, but the feature flag is turned off in the database. The code is physically on the production servers, but mathematically invisible to users. Once the feature is fully complete, the Product Manager flips the flag to TICK1trueTICK1 in a web dashboard, instantly releasing the feature without requiring a new deployment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/DevOps culture/index.mdx': `---
title: DevOps Culture
description: The philosophical and organizational shift that mathematically destroys the silos between Software Development (Dev) and IT Operations (Ops), promoting shared responsibility and extreme automation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="DevOps Culture"
  subtitle="Bridging the Dev and Ops Divide"
  tags={['DevOps', 'Culture', 'Agile', 'Engineering']}
>

DevOps is not a specific tool (like Docker or Jenkins); it is a cultural and mathematical re-engineering of how a technology company operates. 

## 1. Destroying the Silo
Historically, companies operated in strict silos. 
**Developers** were incentivized mathematically to release features as fast as possible. 
**Operations** (SysAdmins) were incentivized mathematically to ensure server stability (which meant resisting change).
Developers would write code, "throw it over the wall" to Operations, and go home. If the code crashed the server at 2:00 AM, Operations suffered. 
DevOps culture destroys this wall. It mandates **Shared Responsibility**. Developers are now on-call for the code they write. If it crashes, their pager goes off. This mathematically forces developers to write cleaner, safer, more highly-instrumented code.

## 2. The Three Ways
DevOps is often defined by the "Three Ways" (popularized by The Phoenix Project):
1. **Flow (Left to Right)**: Mathematically optimizing the speed at which a feature moves from development to production through extreme CI/CD automation.
2. **Feedback (Right to Left)**: Ensuring mathematical telemetry (Logging, Monitoring) flows instantly back from Production to Development, allowing teams to detect and fix bugs before users notice them.
3. **Continuous Learning**: Creating a blameless culture. If a deployment brings down the database, you do not fire the engineer; you conduct a blameless post-mortem to mathematically engineer the CI pipeline so that specific human error can never occur again.

</ConceptTemplate>
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
