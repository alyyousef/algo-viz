import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/New Relic/index.mdx': `---
title: New Relic
description: A pioneering Application Performance Monitoring (APM) SaaS platform mathematically engineered to provide deep, code-level visibility into application performance, database queries, and user experience.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="New Relic"
  subtitle="Code-Level Application Performance Monitoring"
  tags={['Observability', 'APM', 'Monitoring', 'SaaS']}
>

Before New Relic, if a web application was slow, system administrators could only look at OS-level metrics (like CPU or RAM) or dig through unstructured text logs. They had no mathematical visibility into the actual code execution.

## 1. The Language Agent
New Relic changed the industry by introducing the mathematical **APM Agent**.
A developer installs the New Relic Ruby, Java, or Node.js agent directly into their application runtime. This agent mathematically hooks into the language's core libraries (like the HTTP router or the Database ORM). As the application runs, the agent measures the exact millisecond latency of specific code functions.

## 2. The Slow Query Trace
The most powerful mathematical feature of New Relic is the **Transaction Trace**.
If a user loads the "Shopping Cart" page and it takes 8 seconds, New Relic mathematically captures the entire execution path. An engineer can log into the dashboard and see a waterfall chart that proves: *"The Ruby code took 50ms, but the PostgreSQL TICK1SELECT * FROM cart_itemsTICK1 query took 7.95 seconds."* It provides undeniable mathematical proof of where the code is failing, allowing developers to instantly apply database indexes or optimize algorithms.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Structured logging/index.mdx': `---
title: Structured Logging
description: A mathematical approach to logging where application events are emitted as strictly formatted, machine-readable data structures (typically JSON) rather than chaotic, free-form text strings.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Structured Logging"
  subtitle="Machine-Readable Telemetry"
  tags={['Observability', 'Logging', 'Data Science', 'Best Practices']}
>

Historically, developers wrote logs as unstructured text: TICK1log.info("User 456 failed to login from IP 10.0.0.1")TICK1.
To search for all failed logins from a specific subnet, an engineer had to write complex, fragile Regular Expressions. If a developer changed the log string to "Login failed for User 456", the Regex mathematically broke.

## 1. The JSON Mandate
Structured logging solves this by enforcing a mathematical rule: **Logs must be key-value pairs (usually JSON).**
Instead of a string, the developer writes:
TICK3javascript
logger.info("login_failed", {
  user_id: 456,
  ip_address: "10.0.0.1",
  reason: "invalid_password"
});
TICK3

## 2. Instant Mathematical Indexing
When this JSON log hits Elasticsearch or Datadog, the database mathematically recognizes the keys. It instantly creates an index for TICK1user_idTICK1 and TICK1ip_addressTICK1. 
An engineer can now write a strict mathematical query: TICK1SELECT count(*) FROM logs WHERE reason = 'invalid_password' AND ip_address = '10.0.0.1'TICK1. The search returns instantly, without requiring any complex string parsing, making structured logging an absolute requirement for modern distributed systems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Tempo/index.mdx': `---
title: Tempo
description: A massive-scale, highly cost-effective distributed tracing backend developed by Grafana, mathematically engineered to store billions of traces in cheap object storage without requiring a complex database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Tempo"
  subtitle="High-Volume Distributed Tracing"
  tags={['Observability', 'Tracing', 'Grafana', 'Cost Optimization']}
>

Traditional distributed tracing backends (like Jaeger using Cassandra or Elasticsearch) face a severe mathematical problem at scale: indexing billions of traces is incredibly expensive. Most traces are of successful, fast requests that nobody will ever look at, making indexing them a waste of money.

## 1. The Key-Value Object Store Architecture
Grafana Tempo uses a mathematically brilliant cost-saving architecture: **It does not index traces.**
Instead of a complex database, Tempo writes the raw trace data directly to cheap, slow Object Storage (like AWS S3 or Google Cloud Storage) using a simple Key-Value format where the **Key** is the Trace ID.

## 2. The Discovery Workflow
Because Tempo doesn't index traces, you cannot query it by saying *"Show me all slow traces."* 
Tempo is mathematically designed to be used *in conjunction* with Logs (Loki) or Metrics (Prometheus). 
An engineer sees a spike in the Error Metric in Prometheus. They click the error, which links to an Error Log in Loki. The Error Log mathematically contains the Trace ID (e.g., TICK1T-1234TICK1). The engineer copies the Trace ID and pastes it into Tempo. Tempo performs a mathematically instant O(1) lookup in AWS S3 to retrieve that exact trace. This workflow reduces storage costs by 90% while preserving perfect observability.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Traces/index.mdx': `---
title: Traces
description: One of the three fundamental pillars of observability, mathematically representing the complete lifecycle and execution path of a single request as it propagates through a complex distributed system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Traces"
  subtitle="The Lifecycle of a Request"
  tags={['Observability', 'Tracing', 'Microservices', 'Architecture']}
>

If **Metrics** tell you *that* a system is broken, and **Logs** tell you *why* a specific function broke, **Traces** tell you *where* the request was when it broke.

## 1. The Mathematical Structure
A trace is not a single data point; it is a mathematical Directed Acyclic Graph (DAG) composed of **Spans**.
- **Trace ID**: A globally unique 128-bit integer representing the entire request.
- **Span**: A single logical unit of work (e.g., an HTTP call to a downstream service, or a database query).
- **Span ID**: A unique identifier for that specific unit of work.
- **Parent Span ID**: Mathematically establishes the relationship between spans (e.g., "The API Gateway Span spawned the Auth Service Span").

## 2. The Waterfall Visualization
Traces are almost universally visualized as a Gantt chart (a "Waterfall").
The mathematical length of a bar represents the duration of the Span. If the "User Service" bar is 5 seconds long, but the "Database Query" bar nested inside it is 4.9 seconds long, the trace mathematically proves that the User Service itself is fast, but it is being blocked by a slow database. This eliminates finger-pointing between engineering teams.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Zipkin/index.mdx': `---
title: Zipkin
description: A pioneering distributed tracing system developed by Twitter, mathematically designed to gather timing data needed to troubleshoot latency problems in microservice architectures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Zipkin"
  subtitle="The First-Generation Tracing System"
  tags={['Observability', 'Tracing', 'Java', 'Legacy']}
>

Before Jaeger existed, Twitter faced the mathematical nightmare of debugging latency across hundreds of Java microservices. In 2012, based on the famous Google Dapper paper, Twitter open-sourced Zipkin.

## 1. The B3 Propagation Standard
Zipkin's most lasting mathematical contribution to the industry was the **B3 Propagation Specification**.
To mathematically trace a request across network boundaries, the Trace ID must be passed in the HTTP headers. Zipkin standardized the TICK1X-B3-TraceIdTICK1, TICK1X-B3-SpanIdTICK1, and TICK1X-B3-SampledTICK1 headers. Even modern systems that do not use the Zipkin backend still heavily rely on the B3 mathematical header format to propagate context between microservices.

## 2. Sampling and Mathematical Overhead
If Twitter traced every single HTTP request, the tracing backend would mathematically require more servers than the actual application.
Zipkin solved this using **Sampling**. The first service to receive a request (e.g., the API Gateway) mathematically flips a weighted coin (e.g., a 1% sample rate). If the coin lands on heads, it sets TICK1X-B3-Sampled: 1TICK1. Every downstream service respects this flag. This mathematical sampling ensures that the tracing infrastructure only processes 1% of total traffic, providing enough statistical data to find bottlenecks without overloading the network.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Capacity planning/index.mdx': `---
title: Capacity Planning
description: The mathematical and statistical discipline of determining the precise amount of computing resources (CPU, RAM, Disk, Network) required to support a software system under future anticipated load.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Capacity Planning"
  subtitle="Mathematical Infrastructure Scaling"
  tags={['SRE', 'Architecture', 'Scaling', 'Mathematics']}
>

If an e-commerce website expects a 500% increase in traffic during Black Friday, simply "guessing" how many servers to add is a recipe for catastrophic failure. Capacity Planning is the mathematical antidote to guessing.

## 1. Load Testing and Profiling
To mathematically plan, an SRE must first determine the baseline cost of a request.
Using tools like Apache JMeter or k6, the SRE blasts a test server with traffic until it crashes. By looking at the metrics, they mathematically prove: *"One web server with 4 CPUs can handle exactly 500 requests per second (RPS) before latency exceeds 200ms."* 

## 2. The Scaling Calculation
Once the baseline is known, planning becomes a mathematical formula.
If the marketing team projects 10,000 RPS for Black Friday, the SRE performs the calculation: TICK110,000 / 500 = 20TICK1. The system mathematically requires 20 web servers. 
However, capacity planning must account for redundancy (N+1). If an Availability Zone fails, 30% of the servers might die. Therefore, the SRE provisions 26 servers to mathematically guarantee that even under partial infrastructure failure, the system can still process the 10,000 RPS peak load.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Chaos engineering/index.mdx': `---
title: Chaos Engineering
description: The disciplined, mathematical practice of intentionally injecting failures into a production system to empirically prove its resilience and identify hidden architectural weaknesses before they cause real-world outages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Chaos Engineering"
  subtitle="Empirical Resilience Testing"
  tags={['SRE', 'Reliability', 'Testing', 'Architecture']}
>

Engineers often write retry logic and circuit breakers in their code, but until the database actually explodes in production, those safety mechanisms are purely theoretical. Chaos Engineering transforms theoretical resilience into mathematical proof.

## 1. The Chaos Monkey
The discipline was popularized by Netflix with their tool, **Chaos Monkey**.
Chaos Monkey is a script that runs in production. Every hour, it mathematically selects a random AWS EC2 server and instantly terminates it. 
Because Netflix engineers know that their servers are constantly being murdered, they are mathematically forced to design their microservices to be entirely stateless and highly redundant. If the system survives Chaos Monkey without users noticing, the architecture is mathematically proven to be fault-tolerant.

## 2. The Blast Radius
Chaos Engineering is not random sabotage; it is the scientific method.
You form a hypothesis: *"If the Redis cache dies, the application will fallback to the SQL database seamlessly."* 
You then run the experiment, but you must mathematically control the **Blast Radius**. You do not kill the production Redis cluster immediately. You route 1% of production traffic to an isolated cluster, kill that cluster, and observe the metrics. If the hypothesis fails, you abort the experiment instantly, mathematically limiting the damage to only 1% of users.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Disaster recovery/index.mdx': `---
title: Disaster Recovery
description: The mathematical frameworks and predefined procedures an organization uses to restore critical IT infrastructure and data following a catastrophic event, such as a datacenter fire, earthquake, or ransomware attack.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Disaster Recovery (DR)"
  subtitle="Catastrophic Failure Mitigation"
  tags={['SRE', 'Architecture', 'Security', 'Compliance']}
>

High Availability (HA) protects against a single server dying. Disaster Recovery (DR) is the mathematical plan for what happens when an entire AWS Region (e.g., TICK1us-east-1TICK1) is physically destroyed by a hurricane.

## 1. RPO (Recovery Point Objective)
RPO is a mathematical measurement of **allowable data loss**.
If your database backups run once every 24 hours (at midnight), and the datacenter burns down at 11:59 PM, you have mathematically lost 23 hours and 59 minutes of customer data. If the business dictates an RPO of 5 minutes, you cannot use daily backups. You are mathematically forced to implement asynchronous database replication to a geographically distant datacenter.

## 2. RTO (Recovery Time Objective)
RTO is a mathematical measurement of **allowable downtime**.
If the datacenter burns down, how long does it take to spin up new servers in Europe and point DNS to them? If the business dictates an RTO of 15 minutes, you cannot manually click buttons in the AWS console. You are mathematically forced to use Infrastructure as Code (Terraform) and fully automated CI/CD pipelines to instantly recreate the entire architecture in a new region.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Error budgets/index.mdx': `---
title: Error Budgets
description: A core mathematical concept in Site Reliability Engineering that quantifies the acceptable level of unreliability in a system, balancing the velocity of new feature development against the requirement for system stability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Error Budgets"
  subtitle="The Mathematical Balance of Reliability"
  tags={['SRE', 'Management', 'Metrics', 'SLO']}
>

Google SRE asserts that 100% reliability is the wrong mathematical target. Pushing a system from 99.9% to 99.99% costs 10x more money and drastically slows down the release of new features, yet users on flaky mobile connections mathematically cannot tell the difference.

## 1. Calculating the Budget
If a team agrees to a Service Level Objective (SLO) of **99.9% uptime** for the month, they have a mathematical **Error Budget of 0.1%**.
In a 30-day month (43,200 minutes), 0.1% equates to **43.2 minutes of allowable downtime**. 
This 43.2 minutes is a physical currency. When developers deploy a new feature, they spend a few minutes of that budget due to brief deployment instability or minor bugs.

## 2. The Enforcement Mechanism
The Error Budget acts as an objective, mathematical referee between Development (who want to move fast) and Operations (who want stability).
If the Development team pushes buggy code and burns through all 43.2 minutes of the budget by the 15th of the month, the Error Budget is depleted. The mathematical rule is enforced: **All feature deployments are instantly frozen.** For the rest of the month, the Development team is only allowed to deploy bug fixes and reliability improvements until the mathematical budget resets on the 1st of the next month.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Incident management/index.mdx': `---
title: Incident Management
description: The highly structured, psychological, and procedural framework used by engineering teams to rapidly respond to, mitigate, and learn from catastrophic software or infrastructure failures in production.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Incident Management"
  subtitle="Structured Outage Resolution"
  tags={['SRE', 'Operations', 'Process', 'Culture']}
>

When the database goes down and the company is losing $10,000 per minute, engineering teams cannot rely on chaotic Slack messages. Incident Management provides a military-grade, mathematically rigid structure to resolve the chaos.

## 1. The Incident Commander (IC)
The core of incident management is the **Incident Commander**.
The IC is the absolute authority during the outage. The IC does not write code, and they do not look at logs. Their singular mathematical purpose is communication and delegation. They assign a "Subject Matter Expert" to investigate the database. They assign a "Communications Lead" to update the public status page. By abstracting the decision-making away from the engineers looking at the code, the IC prevents cognitive overload and mathematically drastically reduces the time to resolution (MTTR).

## 2. Blameless Post-Mortems
Once the incident is resolved, SRE culture mandates a **Blameless Post-Mortem**.
The mathematical premise is that human error does not exist; only system design flaws exist. If an engineer typed TICK1DROP TABLETICK1 on production, the post-mortem does not blame the engineer. It mathematically interrogates the system: *"Why did the system architecture allow a human to execute that command without a secondary approval process?"* By blaming the system instead of the human, engineers freely admit mistakes, allowing the organization to mathematically patch the architectural vulnerabilities.

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
