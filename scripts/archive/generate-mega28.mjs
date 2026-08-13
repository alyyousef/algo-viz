import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Nginx/index.mdx': `---
title: Nginx
description: "A high-performance web server, reverse proxy, and load balancer known for its event-driven architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Nginx (Engine-X)">

**Nginx** is one of the most popular web servers in the world. Originally created to solve the "C10k problem" (handling 10,000 concurrent connections on a single server), Nginx achieved this by abandoning the traditional process-per-connection model in favor of an asynchronous, event-driven architecture.

## 1. Event-Driven Architecture
Older web servers (like Apache HTTP Server) spawned a new OS thread or process for every single incoming HTTP request. If 10,000 people connected, the server needed 10,000 threads, which consumed massive amounts of RAM and CPU context-switching time.

Nginx uses a single master process and a small number of **worker processes** (usually one per CPU core). Each worker uses a non-blocking event loop (like Node.js) to handle thousands of connections simultaneously within a single thread.

## 2. Primary Use Cases

<ComparisonTable 
  headers={['Use Case', 'Description']} 
  rows={[
    ['Static File Serving', 'Serving HTML, CSS, JS, and images directly from the filesystem with extreme efficiency.'],
    ['Reverse Proxy', 'Sitting in front of backend application servers (like Node.js or Python Gunicorn) to handle HTTP parsing and security.'],
    ['Load Balancing', 'Distributing incoming traffic across multiple identical backend servers to ensure high availability.'],
    ['TLS Termination', 'Handling the CPU-intensive SSL/TLS encryption handshake, passing unencrypted HTTP traffic to the backend.']
  ]} 
/>

## 3. Basic Configuration
Nginx is configured via text files (usually located in TICK1/etc/nginx/nginx.confTICK1), using a declarative, block-based syntax.

${TICK3}nginx
server {
    listen 80;
    server_name myapp.com;

    # Serve static frontend files
    location / {
        root /var/www/html;
        index index.html;
    }

    # Proxy API requests to a Node.js backend running on port 3000
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
${TICK3}

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Reverse proxies/index.mdx': `---
title: Reverse Proxies
description: "An intermediary server that sits in front of backend application servers, intercepting and routing client requests."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Reverse Proxies">

In modern web architecture, users rarely connect directly to the server running your actual application code (e.g., your Node.js or Java process). Instead, they connect to a **Reverse Proxy**.

A Reverse Proxy is an intermediary server (like Nginx, HAProxy, or Envoy) that sits at the edge of your network, receives all incoming HTTP requests, and forwards them to the appropriate backend server.

## 1. Forward Proxy vs Reverse Proxy

<ComparisonTable 
  headers={['Type', 'Who it protects', 'Use Case']} 
  rows={[
    ['Forward Proxy', 'The Client (User).', 'A corporate VPN proxy that hides the employee\\'s IP address from the websites they visit.'],
    ['Reverse Proxy', 'The Server (Backend).', 'Nginx hiding your internal database and application servers from the public internet.']
  ]} 
/>

## 2. Why use a Reverse Proxy?

1. **Security & Anonymity**: The public internet only sees the proxy's IP address. Your internal application servers can remain safely hidden on a private subnet.
2. **TLS/SSL Termination**: HTTPS decryption is CPU-intensive. The proxy handles the decryption, allowing your application servers to focus entirely on running business logic (receiving plain HTTP).
3. **Caching**: If 100 users request the exact same image or API response, the proxy can cache the first response and serve it to the next 99 users instantly, without even waking up your application server.
4. **Load Balancing**: The proxy can distribute incoming requests evenly across 5 different backend servers.

<Callout icon="info" title="API Gateways">
An **API Gateway** (like AWS API Gateway or Kong) is essentially an advanced Reverse Proxy that adds developer-focused features like rate-limiting, API key authentication, and request/response transformation.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.1 Web Servers - Proxies/Load balancing algorithms/index.mdx': `---
title: Load Balancing Algorithms
description: "The mathematical strategies used by proxies to determine which backend server should receive the next incoming request."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Load Balancing Algorithms">

When a Reverse Proxy (or Load Balancer) receives an HTTP request, and there are 5 healthy backend servers available, how does it decide which server gets the request? It relies on a **Load Balancing Algorithm**.

## 1. Static Algorithms
These algorithms do not care about the current CPU load or health of the backend servers.

<ComparisonTable 
  headers={['Algorithm', 'How it works', 'Best For']} 
  rows={[
    ['Round Robin', 'Iterates through the list of servers sequentially (A, B, C, A, B, C).', 'Identical servers handling predictable, uniform requests.'],
    ['Weighted Round Robin', 'Assigns more requests to servers with higher weights (e.g., A gets 3x more traffic than B).', 'Clusters with mixed hardware (Server A is 3x more powerful than B).'],
    ['IP Hash', 'Uses a hash of the client\\'s IP address to always route that specific user to the exact same server.', 'Legacy applications requiring "Sticky Sessions" (state stored in local RAM).']
  ]} 
/>

## 2. Dynamic Algorithms
These algorithms actively monitor the state of the backend servers to make intelligent routing decisions.

<ComparisonTable 
  headers={['Algorithm', 'How it works', 'Best For']} 
  rows={[
    ['Least Connections', 'Routes the request to the server with the fewest active, open connections.', 'Long-lived connections (WebSockets, database queries).'],
    ['Least Time (Latency)', 'Routes to the server with the lowest average response time (fastest historical performance).', 'Geographically distributed servers or highly variable workloads.']
  ]} 
/>

## 3. Health Checks
No algorithm matters if a server is dead. Load balancers constantly perform **Active Health Checks** (pinging TICK1/healthTICK1 every 5 seconds). If a server fails 3 consecutive pings, the load balancer temporarily removes it from the rotation until it recovers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Logs/index.mdx': `---
title: Logs, Metrics, and Traces
description: "The three pillars of Observability required to understand the internal state of a complex distributed system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The Three Pillars of Observability">

Monitoring tells you *when* a system is broken. **Observability** tells you *why* it is broken. 

In a modern microservices architecture, understanding the internal state of your system relies on the telemetry data generated by three core pillars: Logs, Metrics, and Traces.

## 1. The Three Pillars

<ComparisonTable 
  headers={['Pillar', 'What is it?', 'Primary Question Answered', 'Example Tool']} 
  rows={[
    ['Metrics', 'Aggregated numerical data measured over time (Counters, Gauges, Histograms).', '"Are we failing right now? Is CPU usage spiking?"', 'Prometheus, Datadog'],
    ['Logs', 'Immutable, timestamped records of discrete events that happened in the application.', '"What specific error message was thrown when we failed?"', 'Elasticsearch, Loki'],
    ['Traces', 'A representation of a single user\\'s request as it travels across multiple microservices.', '"Where exactly is the latency happening in this 5-service chain?"', 'Jaeger, Zipkin']
  ]} 
/>

## 2. The Observability Workflow
During a 3:00 AM production outage, an SRE (Site Reliability Engineer) uses all three pillars in a specific order:

1. **Metrics (The Alert)**: A Grafana dashboard flashes red. The metric TICK1http_error_rateTICK1 has spiked from 1% to 15%. Metrics are cheap to store and fast to query, making them perfect for triggering alerts.
2. **Traces (The Location)**: The SRE opens the tracing tool to look at recent failed requests. They see the request hits the TICK1API-GatewayTICK1 (fast), then the TICK1Auth-ServiceTICK1 (fast), but hangs and times out in the TICK1Payment-ServiceTICK1. They have isolated the bottleneck.
3. **Logs (The Root Cause)**: The SRE filters the central logging system for TICK1Payment-ServiceTICK1 logs during the last 5 minutes. They see a specific error: TICK1Connection refused: database_timeoutTICK1. They now know exactly what to fix.

<Callout icon="tip" title="Structured Logging">
Never write logs as plain text strings (TICK1"User 123 failed to login at 5pm"TICK1). Always use **Structured Logging** (JSON). Writing TICK1{"event": "login_fail", "user_id": 123}TICK1 allows your central logging system to instantly parse, index, and query the data.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Prometheus/index.mdx': `---
title: Prometheus
description: "An open-source systems monitoring and alerting toolkit built for highly dynamic containerized environments."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Prometheus">

Originally built at SoundCloud and now a CNCF graduated project, **Prometheus** is the industry standard for gathering and storing **Metrics** in Kubernetes and cloud-native environments.

## 1. The Pull Model (Scraping)
Traditional monitoring agents (like New Relic or Datadog) use a *Push* model: the application actively sends its metrics over the network to the central monitoring server.

Prometheus uses a **Pull** model. 
Your application exposes a simple HTTP endpoint (usually TICK1/metricsTICK1) that prints out its current state in plain text. The Prometheus server periodically (e.g., every 15 seconds) makes an HTTP GET request to that endpoint, "scrapes" the data, and saves it to its internal time-series database.

${TICK3}text
# Example Prometheus Metrics format
http_requests_total{method="GET", status="200"} 1053
http_requests_total{method="POST", status="500"} 12
node_memory_Active_bytes 4.294967296e+09
${TICK3}

## 2. PromQL (Prometheus Query Language)
Prometheus stores data in a multidimensional time-series database. You query this data using **PromQL**, a powerful functional query language.

Instead of writing SQL, you write mathematical queries to aggregate data over time.
- **TICK1http_requests_totalTICK1**: Returns the raw counter value.
- **TICK1rate(http_requests_total[5m])TICK1**: Calculates the per-second rate of requests over the last 5 minutes (ignoring server restarts).

## 3. The Alertmanager
Prometheus itself just stores data and evaluates PromQL rules. If a rule evaluates to true (e.g., TICK1cpu_usage > 90TICK1), it fires an alert to a separate component called the **Alertmanager**. The Alertmanager handles deduplicating the alerts, grouping them together, and routing them to Slack, PagerDuty, or email.

<Callout icon="info" title="Why Pull over Push?">
The Pull model is perfect for Kubernetes. When 50 new Pods spin up, they don't need to be configured with the IP address of the monitoring server. Prometheus simply asks the Kubernetes API "what Pods exist?", discovers them automatically, and starts scraping them.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Grafana/index.mdx': `---
title: Grafana
description: "The industry-standard open-source platform for visualizing metrics, logs, and traces through interactive dashboards."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Grafana">

While Prometheus is incredible at storing and querying metrics, its built-in UI is extremely basic. **Grafana** is the visualization layer that sits on top of Prometheus (and dozens of other databases).

Grafana allows you to build rich, interactive dashboards containing graphs, gauges, heatmaps, and tables.

## 1. Data Source Agnostic
Grafana does not store any data itself. It acts as a universal visualization engine for your entire observability stack. You can connect it to multiple **Data Sources** simultaneously:
- **Metrics**: Prometheus, InfluxDB, Datadog.
- **Logs**: Elasticsearch, Loki, Splunk.
- **Traces**: Jaeger, Tempo.
- **Relational Data**: PostgreSQL, MySQL.

This allows an SRE to build a single "single pane of glass" dashboard that displays a Prometheus CPU graph right next to a table of recent Elasticsearch error logs.

## 2. Dashboards as Code
Because clicking through a UI to create 50 identical graphs for 50 microservices is tedious, Grafana fully supports "Dashboards as Code."
You can define your entire dashboard layout in a JSON file and provision it automatically using tools like Terraform or Kubernetes ConfigMaps.

## 3. The Grafana Stack (PLG)
While Grafana initially only focused on visualization, the company behind it (Grafana Labs) has built a complete, highly-integrated open-source observability stack:
- **Prometheus** (Metrics)
- **Loki** (Logs - designed to be highly cost-effective by only indexing metadata, not the full log text)
- **Grafana** (Visualization)

This combination is widely known as the **PLG Stack**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/Elastic Stack (ELK)/index.mdx': `---
title: Elastic Stack (ELK)
description: "A powerful suite of tools used for searching, analyzing, and visualizing massive volumes of log data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Elastic Stack (ELK)">

If you have 50 microservices spread across 200 servers, you cannot SSH into individual machines and run TICK1grepTICK1 to find error logs. You need a centralized logging solution. The most famous architecture for this is the **ELK Stack**.

## 1. The ELK Components

<ComparisonTable 
  headers={['Component', 'Role', 'Metaphor']} 
  rows={[
    ['Logstash (or Beats)', 'The Data Shipper / Pipeline. Runs on the application servers, reads the local log files, parses them, and sends them over the network.', 'The Delivery Truck.'],
    ['Elasticsearch', 'The highly-scalable, distributed NoSQL search engine. It indexes every single word of the logs for lightning-fast full-text search.', 'The Warehouse / Library.'],
    ['Kibana', 'The web interface used by humans to search the logs, build dashboards, and create visualizations.', 'The Librarian / Search UI.']
  ]} 
/>

## 2. How it works
1. Your Node.js app writes a JSON log to TICK1/var/log/app.logTICK1.
2. A lightweight agent (like **Filebeat**) running on the same server notices the new log line and forwards it to **Logstash**.
3. Logstash parses the JSON, perhaps adds geographical data based on an IP address, and inserts it into **Elasticsearch**.
4. An engineer opens **Kibana**, types TICK1user_id: 123 AND status: errorTICK1, and Elasticsearch instantly returns the result out of billions of stored logs.

## 3. The Cost Problem
Elasticsearch is incredibly powerful because it indexes *everything*. However, maintaining a massive Elasticsearch cluster requires huge amounts of RAM and expensive SSDs. For many companies, storing application logs in ELK becomes more expensive than running the actual application itself.

<Callout icon="info" title="Alternatives">
Due to the high cost and complexity of running ELK, many teams have migrated to SaaS solutions like **Datadog** or **Splunk**, or cheaper open-source alternatives like **Grafana Loki** (which heavily sacrifices search speed in exchange for drastically lower storage costs using AWS S3).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.2 Observability/OpenTelemetry/index.mdx': `---
title: OpenTelemetry (OTel)
description: "A vendor-neutral standard for generating, collecting, and exporting telemetry data (logs, metrics, and traces)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="OpenTelemetry">

Historically, the observability industry was plagued by vendor lock-in. If you wanted to use Datadog, you had to install the Datadog SDK in your application code. If you later decided to switch to New Relic, you had to rewrite thousands of lines of code to remove the Datadog SDK and install the New Relic SDK.

**OpenTelemetry (OTel)** is a CNCF project created to solve this problem. It provides a single, vendor-neutral standard for instrumenting applications.

## 1. The OTel Architecture

OpenTelemetry consists of two main parts:

### The OTel SDKs
You install the standard OTel SDK into your Node.js, Python, or Java application. Your application uses this SDK to generate metrics and traces. The application *does not know* where this data is going.

### The OTel Collector
The Collector is a proxy server that sits between your application and the observability vendors.
1. Your application sends its telemetry data to the OTel Collector using the standard OTLP protocol.
2. The Collector receives the data, processes it (filtering out sensitive info like passwords), and then **exports** it to any backend you configure.
3. You can configure the Collector to send Traces to Jaeger, Metrics to Prometheus, and *everything* to Datadog simultaneously.

## 2. Breaking Lock-in
With OpenTelemetry, changing observability vendors is trivial. You do not touch your application code. You simply update the configuration YAML file of the OTel Collector to point to a new vendor's API endpoint, and the data instantly starts flowing there.

<Callout icon="tip" title="Auto-Instrumentation">
For languages like Java and Python, OTel supports "Auto-Instrumentation". It hooks into the runtime environment and automatically generates traces for incoming HTTP requests, database queries, and Redis calls without you writing a single line of instrumentation code.
</Callout>

</ConceptTemplate>
`,
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
