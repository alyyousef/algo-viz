import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Environment management/index.mdx': `---
title: Environment Management
description: The rigorous mathematical discipline of provisioning, configuring, and maintaining isolated application tiers (Dev, Test, Staging, Prod) to ensure predictable software lifecycles.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Environment Management"
  subtitle="Isolating Software Lifecycles"
  tags={['DevOps', 'Environments', 'Infrastructure', 'Testing']}
>

Software cannot be developed and tested in the exact same physical space where live users interact with it. Environment Management is the mathematical practice of creating strict, isolated tiers.

## 1. The Standard Tier Hierarchy
A professional pipeline mathematically isolates environments to prevent contamination:
1. **Local/Dev**: The developer's laptop. It runs mocking frameworks and tiny subsets of data.
2. **Test/QA**: An automated environment where the CI pipeline executes integration tests. It is mathematically wiped and rebuilt daily to ensure a clean state.
3. **Staging (UAT)**: A mathematical clone of Production. It uses the exact same hardware specs and sanitized production data. This is the final manual validation gate.
4. **Production**: The live, highly-available environment handling real user traffic.

## 2. The Golden Rule of Environment Parity
The leading cause of deployment failure is **Environment Drift**—when Staging is subtly mathematically different from Production (e.g., Staging runs Postgres 13.2, Production runs Postgres 13.4). 
DevOps engineers enforce **Environment Parity** by using Infrastructure as Code (Terraform) and Containers (Docker). By deploying the exact same TICK1main.tfTICK1 file to AWS for both Staging and Production, you mathematically guarantee that the underlying hardware and OS configurations are identical, completely eliminating "It worked in Staging" errors.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Feature flags/index.mdx': `---
title: Feature Flags
description: A software engineering technique that mathematically decouples code deployment from feature release by wrapping execution paths in dynamic toggles, enabling dark launches and instant kill switches.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Feature Flags"
  subtitle="Decoupling Deployment from Release"
  tags={['DevOps', 'Engineering', 'Agile', 'Continuous Deployment']}
>

Before Feature Flags, if a new checkout system was only 50% finished, it could not be merged into the TICK1mainTICK1 branch. It had to sit on a long-lived feature branch, eventually causing a catastrophic mathematical merge conflict.

## 1. The Dynamic Toggle
A Feature Flag (or Toggle) is simply a mathematical TICK1if/elseTICK1 block wrapping a new feature, controlled by an external service (like LaunchDarkly) or a database value.
You merge the half-finished code into TICK1mainTICK1 today. You deploy it to Production today. But because the mathematical flag is set to TICK1falseTICK1, the code is "dark"—it physically exists on the server but is never executed by a user request. 

## 2. Advanced Rollouts and Kill Switches
Feature Flags provide immense mathematical control over risk:
- **Canary Launches**: You can configure the flag so it evaluates to TICK1trueTICK1 only for internal employees, or only for 1% of randomized public traffic.
- **The Instant Kill Switch**: If the new feature causes a 20% spike in database CPU, you do not need to write a rollback commit, wait for CI/CD, and deploy. You simply click a button in the Feature Flag dashboard to flip it to TICK1falseTICK1. The code stops executing instantly, providing a mathematical sub-second rollback.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/GitOps/index.mdx': `---
title: GitOps
description: An operational framework where a Git repository serves as the absolute, single mathematical source of truth for declarative infrastructure and applications, relying on automated reconciliation loops.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GitOps"
  subtitle="Infrastructure via Pull Requests"
  tags={['DevOps', 'GitOps', 'Kubernetes', 'Automation']}
>

GitOps is the mathematical evolution of Infrastructure as Code. In traditional DevOps, an engineer runs TICK1kubectl applyTICK1 or TICK1terraform applyTICK1 from their laptop or a CI server to push changes to the cluster. This "Push" model is a security risk and can lead to configuration drift.

## 1. The Pull-Based Reconciliation Loop
In GitOps (pioneered by Weaveworks), the cluster itself reaches out to Git.
You install a software agent (like ArgoCD or Flux) *inside* your Kubernetes cluster. You configure the agent with a mathematical rule: *"Your desired state is defined in this specific Git repository."*
The agent continuously polls Git. If a developer merges a Pull Request changing the deployment replica count from 3 to 5, the agent mathematically detects the drift between Git (Desired State) and the Cluster (Actual State). It automatically "pulls" the changes and modifies the cluster to match Git.

## 2. Security and Auditability
GitOps mathematically removes human access to production. 
No engineer has SSH access. No engineer has the Kubernetes Admin password. If an engineer wants to scale up a server, they must open a Git Pull Request. This mathematically forces all infrastructure changes to undergo peer review, CI testing, and leaves a perfect, immutable Git commit log for security auditors.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Infrastructure as Code/index.mdx': `---
title: Infrastructure as Code (IaC)
description: The methodology of provisioning and managing hardware, networks, and cloud resources through human-readable, mathematical machine-consumable definition files rather than physical hardware configuration or interactive configuration tools.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Infrastructure as Code (IaC)"
  subtitle="Programmable Cloud Environments"
  tags={['DevOps', 'Infrastructure', 'Terraform', 'Cloud']}
>

Clicking buttons in the AWS Web Console to create a database is fundamentally flawed. It is mathematically unrepeatable, un-testable, and undocumented. Infrastructure as Code (IaC) replaces manual clicking with code.

## 1. Declarative Provisioning
Tools like Terraform, AWS CloudFormation, or Pulumi use declarative programming.
Instead of writing a script that says *"Click create server, then wait 5 minutes, then attach a hard drive"* (Imperative), you write a mathematical declaration: *"I require a server with exactly 16GB of RAM attached to a 100GB hard drive."* (Declarative).
The IaC engine calculates the mathematical dependency graph (e.g., the network must be created before the server can be placed inside it) and provisions the resources via Cloud APIs.

## 2. Reproducibility and Disaster Recovery
Because your entire data center is defined in 500 lines of text code, it can be version-controlled in Git.
If your production AWS region in Virginia is destroyed by a natural disaster, you do not panic. You simply change the region variable in your IaC code to "Ireland" and run TICK1terraform applyTICK1. Within minutes, the IaC engine mathematically reconstructs the exact same complex VPC architecture, subnets, and server clusters on a different continent.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Logging/index.mdx': `---
title: Logging
description: The deterministic practice of emitting timestamped, structured text records of discrete events occurring within a software application to mathematically reconstruct system behavior during an incident.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Logging"
  subtitle="The System's Audit Trail"
  tags={['DevOps', 'Observability', 'Telemetry', 'SRE']}
>

When a microservice architecture fails at 3:00 AM, you cannot attach a debugger. The only way to mathematically reconstruct the past is through the logs the system left behind.

## 1. Structured Logging
Historically, developers wrote logs like: TICK1User John just logged in from IP 1.2.3.4TICK1. This is human-readable, but mathematically useless for a machine to query.
Modern DevOps demands **Structured Logging** (typically JSON).
TICK3json
{
  "timestamp": "2023-10-25T14:32:01Z",
  "level": "INFO",
  "event": "user_login",
  "user_id": 9872,
  "ip_address": "1.2.3.4",
  "latency_ms": 45
}
TICK3
By emitting JSON, a centralized logging server (like Elasticsearch or Splunk) can mathematically index every field. You can instantly query: *"Show me all ERROR logs where user_id=9872 between 2:00 PM and 3:00 PM."*

## 2. Centralization and Correlation
In a distributed system, a single user click might travel through 5 different microservices. 
If service 4 fails, you must mathematically trace the failure back to the origin. This requires a **Correlation ID** (Trace ID). The API Gateway generates a unique UUID when the request arrives and mathematically passes it in the HTTP headers to every subsequent service. Every service includes this UUID in their logs, allowing the DevOps engineer to stitch the distributed story back together perfectly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Monitoring/index.mdx': `---
title: Monitoring
description: The continuous, mathematical collection and visualization of system metrics (CPU, memory, request rates) to evaluate the real-time health and performance of an infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Monitoring"
  subtitle="Real-Time System Health"
  tags={['DevOps', 'Observability', 'Metrics', 'SRE']}
>

Logging tells you *what* specific event happened. Monitoring tells you the mathematical *trend* of what is happening across the entire system.

## 1. Time-Series Metrics
Monitoring relies on **Time-Series Databases** (like Prometheus). 
Instead of collecting large text strings, a monitoring system collects pure mathematical data points tied to a timestamp:
- TICK1cpu_usage{server="web-01"}TICK1 -> TICK185%TICK1 @ TICK110:00:01TICK1
- TICK1http_requests_total{status="500"}TICK1 -> TICK142TICK1 @ TICK110:00:01TICK1
Because this data is purely numeric, the database can mathematically compress millions of points per second and execute complex aggregations (e.g., *"Calculate the 99th percentile of HTTP latency over the last 5 minutes"*).

## 2. Alerting and Dashboards
Monitoring data is mathematically useless if humans have to stare at it.
DevOps teams build visualizations (using Grafana) to see system health at a glance. More importantly, they define mathematical **Alerting Rules**. 
*"If the 5-minute moving average of HTTP 500 errors exceeds 2%, page the on-call engineer."* 
Monitoring shifts the paradigm from reactive (a customer calling to say the site is down) to proactive (the mathematical alert firing 10 minutes before the database runs completely out of memory).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Observability/index.mdx': `---
title: Observability
description: A superset of monitoring that mathematically defines a system's capability to allow its internal states to be inferred from knowledge of its external outputs (Logs, Metrics, and Traces).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Observability"
  subtitle="Understanding the Unknown Unknowns"
  tags={['DevOps', 'Observability', 'SRE', 'Architecture']}
>

Monitoring answers the question: *"Is the system broken?"* 
Observability answers the mathematical question: *"Why is the system broken, specifically in a way we never predicted?"*

## 1. The Three Pillars
Observability is mathematically constructed from three telemetry pillars:
1. **Metrics**: Aggregated mathematical trends (e.g., "CPU is at 99%"). They tell you there is a problem.
2. **Logs**: Discrete, timestamped event records (e.g., "Database connection failed"). They provide deep context.
3. **Traces**: The mathematical journey of a single request across a distributed microservice architecture. Traces tell you exactly which specific microservice out of 50 caused the CPU spike.

## 2. High Cardinality Data
Traditional monitoring systems fail when you need to group data by millions of unique user IDs. 
True Observability platforms (like Honeycomb or Datadog) support **High Cardinality**. If the system is slow, an Observability platform allows you to slice the telemetry mathematically: *"Is the system slow for everyone, or only for users in Germany, using the iOS App, on version 2.4, executing the checkout query?"*
By correlating the three pillars mathematically without losing high-cardinality context, engineers can debug "Unknown Unknowns"—bizarre edge-case failures that were never explicitly anticipated by a static dashboard.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Orchestration/index.mdx': `---
title: Orchestration
description: The automated configuration, coordination, and mathematical management of computer systems and software, particularly focusing on the lifecycle of thousands of distributed containers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Orchestration"
  subtitle="Managing the Distributed Fleet"
  tags={['DevOps', 'Kubernetes', 'Containers', 'Automation']}
>

A developer can easily run TICK1docker runTICK1 on their laptop to start one container. But if you have a microservice architecture consisting of 50 services, each requiring 10 replicas to handle Black Friday traffic, human management becomes mathematically impossible.

## 1. The Container Orchestrator
An Orchestrator (like **Kubernetes** or **Docker Swarm**) is the mathematical brain of the cluster.
You do not tell the Orchestrator *how* to do its job; you declare a Desired State: *"I mathematically require 5 copies of the Frontend container to be running at all times."*
The Orchestrator communicates with all physical servers (Nodes) in the cluster, evaluates their available CPU and RAM mathematically, and automatically schedules the 5 containers onto the most optimal machines.

## 2. Automated Self-Healing
Hardware fails. If a physical server catches fire and dies, the 2 Frontend containers running on it instantly die.
Without an Orchestrator, an engineer gets paged at 3:00 AM. 
With an Orchestrator, the Control Plane mathematically detects that the actual state (3 containers) no longer matches the desired state (5 containers). Within milliseconds, the Orchestrator automatically spins up 2 replacement containers on healthy servers, mathematically healing the system before the human engineer even wakes up.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Pipelines/index.mdx': `---
title: CI/CD Pipelines
description: The mathematical orchestration of sequential automated stages (Build, Test, Deploy) that source code must pass through to transform from a raw Git commit into a live production artifact.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="CI/CD Pipelines"
  subtitle="The Conveyor Belt of Software"
  tags={['DevOps', 'CI/CD', 'Automation', 'Engineering']}
>

A Pipeline is the physical manifestation of Continuous Integration and Continuous Deployment. It is a strictly defined, mathematical directed acyclic graph (DAG) of tasks that code must successfully navigate.

## 1. The Pipeline Stages
A standard enterprise pipeline mathematically enforces these sequential gates:
1. **Source**: The pipeline is triggered by a Git push.
2. **Build**: The compiler translates code to a binary. If it fails (Syntax Error), the pipeline halts.
3. **Unit Test**: The code logic is mathematically verified in isolation. If coverage drops below 80%, the pipeline halts.
4. **Security Scan**: Static Analysis (SAST) checks for known vulnerabilities (e.g., SQL injection).
5. **Package**: The binary is wrapped into an immutable Docker Container.
6. **Deploy to Staging**: The container is pushed to a QA environment.
7. **E2E Test**: Headless browsers test the UI.
8. **Deploy to Prod**: The container goes live.

## 2. Fail-Fast Methodology
Pipelines are mathematically engineered to **fail as quickly as possible**.
You do not want a developer waiting 45 minutes for a massive End-to-End test to fail, only to realize they missed a semicolon. 
Therefore, pipelines execute mathematically lightweight, highly deterministic tasks (Linting, Unit Tests) in seconds at the very beginning. Only if those pass does the pipeline invest expensive compute resources into spinning up databases for heavy integration testing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Platform engineering/index.mdx': `---
title: Platform Engineering
description: The discipline of designing and building mathematical Internal Developer Platforms (IDPs) to reduce cognitive load on developers, allowing them to self-serve infrastructure without needing deep DevOps expertise.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Platform Engineering"
  subtitle="DevOps as a Product"
  tags={['DevOps', 'Platform', 'Architecture', 'Developer Experience']}
>

As Kubernetes, Terraform, and Cloud Networking became mathematically complex, a new problem emerged: "You build it, you run it" forced standard developers to spend 40% of their time writing YAML configuration files instead of Java business logic.

## 1. The Internal Developer Platform (IDP)
Platform Engineering aims to solve this by treating developers as "Customers." 
Instead of filing a Jira ticket to ask the Ops team for a database (which takes 3 days), or forcing the Java developer to write 500 lines of Terraform (which causes mathematical anxiety), the Platform Engineering team builds a self-service portal (an IDP, like Backstage).
The developer clicks a button: *"Give me a Postgres database."* The IDP mathematically abstracts the complexity, automatically generating the Terraform, provisioning the AWS resource, injecting the secrets into Vault, and wiring it to the developer's application in 3 minutes.

## 2. Paved Roads (Golden Paths)
Platform Engineering defines **"Golden Paths."**
If a developer chooses to use the company's standardized IDP pipeline, everything is mathematically handled for them: automatic CI/CD, automatic Grafana dashboards, automatic security scanning. They stay on the paved road.
They are mathematically allowed to go off-road (e.g., manually deploying a weird esoteric database), but if they do, they lose the platform team's support and must manage the infrastructure entirely themselves. This mathematically incentivizes standardization across massive enterprises.

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
