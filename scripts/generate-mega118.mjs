import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Distributed tracing/index.mdx': `---
title: Distributed Tracing
description: A mathematical observability methodology designed for microservice architectures, tracking a single user request as it traverses across dozens of decoupled servers, capturing exact latency and errors at every network hop.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Distributed Tracing"
  subtitle="Mathematical Request Tracking"
  tags={['Observability', 'Microservices', 'Performance', 'Architecture']}
>

In a monolith, if a request takes 5 seconds, you look at the logs on the single server. In a microservices architecture, a single user click might mathematically trigger 20 different HTTP calls across 15 different servers (Auth, Cart, Inventory, Payment). If the request takes 5 seconds, which of the 15 servers was slow?

## 1. The Trace ID and Span IDs
Distributed Tracing solves this using mathematical correlation IDs.
When the user clicks, the API Gateway (or a proxy like Envoy) generates a globally unique mathematical **Trace ID** (e.g., TICK1T-1234TICK1). 
As the request hits the "Auth" service, Auth creates a **Span ID** (TICK1S-01TICK1), logs how many milliseconds it took, and mathematically injects the Trace ID into the HTTP headers (e.g., TICK1x-b3-traceid: T-1234TICK1) before calling the "Cart" service.

## 2. Mathematical Reconstruction
Every service asynchronously flushes its "Spans" to a central tracing backend (like Jaeger or DataDog).
The tracing backend mathematically groups all spans sharing the same Trace ID and renders a Gantt chart. An engineer can look at the chart and mathematically prove: *"The total request took 5 seconds. Auth took 10ms. Cart took 15ms. The Payment service mathematically consumed 4.97 seconds waiting on a slow database query."*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Dynatrace/index.mdx': `---
title: Dynatrace
description: A premier, AI-powered enterprise observability platform mathematically engineered for massive scale, providing automatic full-stack topology mapping and deterministic root-cause analysis.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Dynatrace"
  subtitle="AI-Driven Enterprise Observability"
  tags={['Observability', 'Monitoring', 'Enterprise', 'AI']}
>

While tools like Prometheus require engineers to manually write complex mathematical alert queries (PromQL) and manually instrument code, Dynatrace is designed to be mathematically autonomous.

## 1. The OneAgent and PurePath
A DevOps team installs a single mathematical binary, the **OneAgent**, onto a host server.
Without a single line of code modification, the OneAgent mathematically injects itself into running Java, Node, or Python processes at the OS level. It utilizes **PurePath** technology to automatically capture distributed traces. It mathematically maps the entire topology of the infrastructure—drawing a live graph showing exactly which microservices are talking to which databases.

## 2. Deterministic AI (Davis)
Other monitoring tools use correlation (e.g., "CPU spiked at the same time errors spiked, so they might be related"). Dynatrace's AI engine (Davis) uses **Deterministic Causality**.
Because Dynatrace possesses the exact mathematical dependency graph, if a database slows down, Davis doesn't just alert that the database is slow. It traces the mathematical graph backward, instantly generating an alert that says: *"The Checkout microservice is failing because of a slow query on the Orders database, which was mathematically caused by a code deployment made 3 minutes ago by User X."*

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Filebeat/index.mdx': `---
title: Filebeat
description: A highly lightweight, Go-based mathematical log shipper developed by Elastic, specifically designed to tail massive volumes of log files and securely forward them to Logstash or Elasticsearch.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Filebeat"
  subtitle="The Lightweight Log Shipper"
  tags={['Observability', 'Logging', 'Elastic', 'Data Pipeline']}
>

If you have 1,000 Linux servers generating Nginx logs, you cannot install a massive Java application (like Logstash) on every server just to read text files, as it would mathematically consume too much RAM.

## 1. The Mathematical Shipper
Filebeat (part of the Elastic Beats family) solves this. It is a single, compiled Go binary. 
It consumes virtually zero CPU or RAM. You configure Filebeat to mathematically watch a specific directory (e.g., TICK1/var/log/nginx/*.logTICK1). It constantly tails the files. When a new line is written, Filebeat grabs the raw text and mathematically ships it over the network to a central server.

## 2. Backpressure Management
Filebeat's greatest mathematical feature is how it handles network failure.
If the central Logstash server goes offline, a naive log shipper would keep reading logs and mathematically run out of memory, or drop the logs entirely (data loss). Filebeat uses a mathematical registry file to track exactly which byte offset it has read up to. If the network dies, Filebeat mathematically halts reading. It simply waits. When the network returns, it resumes from the exact byte offset, mathematically guaranteeing zero data loss.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Fluent Bit/index.mdx': `---
title: Fluent Bit
description: An ultra-lightweight, C-based open-source log processor and forwarder, mathematically optimized for edge computing and massive Kubernetes clusters where resource constraints are critical.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Fluent Bit"
  subtitle="The Micro-Log Processor"
  tags={['Observability', 'Logging', 'Kubernetes', 'Edge Computing']}
>

As Kubernetes became the dominant mathematical architecture for the cloud, running heavy logging agents on every Worker Node became unfeasible. The industry required a log shipper that could process gigabytes of data while consuming almost zero memory.

## 1. The C-Based Architecture
Fluent Bit is the younger, much faster sibling of Fluentd. While Fluentd is written in Ruby (which requires a heavy runtime and garbage collection), Fluent Bit is written entirely in **pure C**.
It mathematically consumes less than 1MB of memory. It can be deployed as a DaemonSet on a Kubernetes cluster with 5,000 nodes, tailing logs from 100,000 containers simultaneously, without mathematically impacting the compute resources available for the actual user applications.

## 2. In-Stream Processing
Despite its microscopic size, Fluent Bit is not a dumb pipe.
It possesses mathematical processing capabilities. Before sending a log to Elasticsearch, Fluent Bit can parse the raw JSON, drop mathematical keys (like stripping out a user's credit card number for PCI compliance), append Kubernetes metadata (like adding the Pod Name and Namespace to the log), and route specific logs to different destinations (e.g., errors to Elasticsearch, access logs to AWS S3).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Fluentd/index.mdx': `---
title: Fluentd
description: A highly extensible, open-source data collector mathematically designed to unify logging infrastructure, transforming wildly different log formats into a standardized JSON structure for centralized analysis.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Fluentd"
  subtitle="The Unified Logging Hub"
  tags={['Observability', 'Logging', 'Data Pipeline', 'CNCF']}
>

Before Fluentd (a CNCF graduated project), logging was a mathematical nightmare. Nginx logs are plain text. MySQL logs are multi-line. Custom app logs are CSV. A central database cannot mathematically query this chaos.

## 1. The Unified JSON Layer
Fluentd operates on a strict mathematical principle: **Everything must become JSON.**
You deploy Fluentd as a central aggregator. It ingests the raw Nginx text logs and uses Regular Expressions (Regex) to mathematically parse them into structured JSON.
TICK3json
{
  "time": "1422490582",
  "remote_addr": "192.168.0.1",
  "method": "GET",
  "path": "/"
}
TICK3
Once mathematically converted into JSON, the data can be easily shipped to any storage backend (MongoDB, Elasticsearch, Hadoop) and queried instantly.

## 2. The Plugin Ecosystem
Fluentd is written in C and Ruby, and its power lies in its mathematical extensibility.
It features over 1,000 community-built plugins. It can mathematically ingest data from syslog, TCP, or HTTP. It can filter, anonymize, and buffer the data, and then route it to over 50 different destinations, acting as the ultimate mathematical router for telemetry data in complex enterprise environments.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Graylog/index.mdx': `---
title: Graylog
description: A powerful, centralized log management platform built on Java and Elasticsearch, mathematically engineered to quickly parse, search, and alert on massive volumes of structured machine data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Graylog"
  subtitle="Centralized Log Management"
  tags={['Observability', 'Logging', 'Analytics', 'Security']}
>

While the ELK stack (Elasticsearch, Logstash, Kibana) is a collection of three separate tools stitched together, Graylog was mathematically designed from day one to be a single, cohesive log management application.

## 1. The Processing Engine
Graylog relies on Elasticsearch (or OpenSearch) for raw mathematical storage, but Graylog itself handles the complex processing.
When raw logs hit Graylog, they pass through **Pipelines**. Pipelines are defined using a mathematical rule-based language. 
An engineer can write a rule: *"If the log message contains the string 'Failed password', mathematically extract the source IP address using a Grok pattern, query an external Threat Intelligence API to see if the IP is malicious, and if so, append a TICK1threat=highTICK1 flag to the log before saving it."*

## 2. Stream Routing and Alerting
Graylog mathematically organizes logs into **Streams** (e.g., the "Database Errors" stream, or the "Firewall Access" stream).
Instead of forcing a human to search for errors, Graylog runs continuous mathematical queries against these Streams. If the "Firewall Access" stream registers more than 50 failed logins from a single IP within 60 seconds, Graylog mathematically triggers an alert (Slack, PagerDuty, or Email), enabling real-time security response.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Jaeger/index.mdx': `---
title: Jaeger
description: An open-source, end-to-end distributed tracing platform originally created by Uber, mathematically designed to monitor and troubleshoot transactions in complex microservices environments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Jaeger"
  subtitle="Distributed Tracing at Uber Scale"
  tags={['Observability', 'Tracing', 'Microservices', 'CNCF']}
>

Uber's architecture consisted of thousands of microservices. When a user requested a ride and the app hung for 10 seconds, it was mathematically impossible to use standard logs to find which of the thousands of services was the bottleneck. Uber built Jaeger to solve this.

## 1. The OpenTracing Standard
Jaeger (now a CNCF graduated project) mathematically tracks requests across service boundaries using standardized Trace IDs.
When a developer instruments their Go or Java code with the Jaeger client (or OpenTelemetry), every HTTP request, database query, and gRPC call is mathematically wrapped in a "Span." These Spans are asynchronously flushed over UDP to the Jaeger Collector, ensuring that the mathematical overhead of tracing does not slow down the actual user application.

## 2. Root Cause Analysis
The Jaeger UI mathematically reconstructs these spans into a visual timeline.
An engineer does not have to guess. They look at the Jaeger UI and mathematically observe: *"Service A called Service B. Service B made 50 sequential SQL queries to the database instead of 1 batched query (the N+1 mathematical query problem). The 50 sequential queries caused the 10-second delay."* Jaeger provides undeniable mathematical proof of where latency exists in a distributed system.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Logstash/index.mdx': `---
title: Logstash
description: A heavy, Java-based server-side data processing pipeline that ingests data from a multitude of sources simultaneously, mathematically transforms it, and sends it to a "stash" like Elasticsearch.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Logstash"
  subtitle="The Heavyweight Data Pipeline"
  tags={['Observability', 'Logging', 'Data Pipeline', 'Elastic']}
>

Logstash is the "L" in the famous **ELK stack** (Elasticsearch, Logstash, Kibana). It is the mathematical workhorse responsible for taking chaotic, unstructured data from the outside world and perfectly formatting it for Elasticsearch.

## 1. The Pipeline Architecture
A Logstash configuration is mathematically divided into three phases:
1. **Inputs**: "Where is the data coming from?" (e.g., listening on a TCP port for Filebeat, pulling from a Kafka queue, or querying an AWS S3 bucket).
2. **Filters**: "How do we mathematically alter the data?" (e.g., parsing raw Nginx text into JSON, translating an IP address into physical GPS coordinates using a GeoIP database).
3. **Outputs**: "Where does the data go?" (e.g., indexing it into Elasticsearch, or forwarding it to a Slack channel).

## 2. Grok and Mathematical Parsing
Logstash's most famous feature is the **Grok filter**.
Grok is a massive library of pre-compiled Regular Expressions (Regex). Instead of writing a 100-character, mathematically unreadable Regex string to parse an Apache log, a developer simply writes TICK1%{COMBINEDAPACHELOG}TICK1. Logstash mathematically applies the underlying Regex, instantly structuring the chaotic text into clean, queryable JSON fields, making the data highly valuable for analytics.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Loki/index.mdx': `---
title: Loki
description: A horizontally-scalable, highly-available log aggregation system built by Grafana, mathematically inspired by Prometheus and designed specifically to be highly cost-effective by not indexing the contents of logs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Loki"
  subtitle="Prometheus-Style Log Aggregation"
  tags={['Observability', 'Logging', 'Grafana', 'Cost Optimization']}
>

Elasticsearch is the industry standard for logs, but it is mathematically incredibly expensive to run. It performs a full-text index on every single word in every single log, which requires massive amounts of RAM and expensive SSDs.

## 1. The Mathematical Compromise
Grafana Loki achieves extreme cost reduction by making a specific mathematical compromise: **It does not index the text of the logs.**
Instead, Loki only indexes the *metadata* (the labels). If you send an Nginx log to Loki, Loki indexes the labels TICK1{app="frontend", environment="prod"}TICK1, but it compresses the actual log text ("GET /api/users 200 OK") into a highly compressed block and writes it to cheap, slow storage like AWS S3.

## 2. Label-Based Querying
When an engineer needs to search for an error, they don't do a full-text search across 5TB of data. 
They use **LogQL**. They mathematically filter down to the exact specific stream using labels: TICK1{app="frontend", environment="prod"}TICK1. Loki grabs that specific compressed block from S3, decompresses it in memory, and then runs a mathematical regex grep across that tiny subset of logs to find the word "Error". This architecture allows companies to store petabytes of logs for a fraction of the mathematical cost of Elasticsearch.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Metrics/index.mdx': `---
title: Metrics
description: A fundamental pillar of observability consisting of numerical data mathematically aggregated over distinct time intervals, used to track system health, trigger alerts, and analyze long-term trends.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Metrics"
  subtitle="The Mathematical Pulse of Systems"
  tags={['Observability', 'Monitoring', 'Data Science', 'Performance']}
>

Observability relies on three mathematical pillars: Logs, Traces, and Metrics. Logs tell you *why* something broke. Traces tell you *where* it broke. Metrics tell you *that* it broke in the first place.

## 1. Time-Series Mathematics
A metric is fundamentally a time-series mathematical data point. 
It consists of a name, a timestamp, and a numerical value.
TICK3text
http_requests_total{app="frontend"} 10452 @ 1692120000
TICK3
Because metrics are purely numerical, they are mathematically incredibly cheap to store and compress. You can store 5 years of CPU metrics for a server using less disk space than 1 day of raw text logs.

## 2. The Four Golden Signals
Google SRE dictates that every system must mathematically track the "Four Golden Signals" via metrics:
1. **Latency**: The time it takes to service a request (e.g., P99 latency is 150ms).
2. **Traffic**: A measure of how much demand is placed on the system (e.g., 5,000 HTTP requests per second).
3. **Errors**: The rate of requests that fail (e.g., 2% of requests return an HTTP 500).
4. **Saturation**: How "full" the system is (e.g., CPU is at 95%, or the database connection pool is 100% utilized). If these mathematical metrics cross a threshold, an alert is triggered.

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
