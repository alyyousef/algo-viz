import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/AKS/index.mdx': `---
title: Azure Kubernetes Service (AKS)
description: Microsoft Azure's fully managed container orchestration service, deeply integrated with the Microsoft ecosystem and Active Directory for enterprise-grade Kubernetes deployments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Kubernetes Service (AKS)"
  subtitle="Managed Kubernetes on Azure"
  tags={['Azure', 'Kubernetes', 'Containers', 'Compute']}
>

While AWS EKS requires you to manually manage many networking and identity integrations, Azure Kubernetes Service (AKS) was mathematically designed to offer a smoother, more highly automated developer experience for deploying upstream Kubernetes.

## 1. The Free Control Plane
In Kubernetes, the Control Plane (the Master Nodes that run the API and etcd database) is notoriously difficult to manage.
Like AWS EKS, AKS mathematically abstracts the Control Plane away from you. However, historically, Azure offered the AKS Control Plane entirely for **free** (unlike AWS which charged an hourly fee), only charging you for the physical virtual machines (Worker Nodes) your containers actually consumed. (Azure has since introduced paid SLA tiers, but the free tier remains a massive draw).

## 2. Deep Active Directory Integration
The strongest mathematical advantage of AKS is its native integration with **Azure Active Directory (Entra ID)**.
If an enterprise already uses Office 365, all their employee identities are in Active Directory. AKS natively links Kubernetes Role-Based Access Control (RBAC) directly to Active Directory Groups. An administrator does not have to create custom Kubernetes service accounts; they simply decree: *"Any human in the 'Developers' AD Group is mathematically allowed to run TICK1kubectl deployTICK1 in the 'Staging' namespace."* When a developer leaves the company and their AD account is disabled, their Kubernetes access is instantly mathematically revoked.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/App Service/index.mdx': `---
title: Azure App Service
description: A fully managed Platform as a Service (PaaS) that allows developers to deploy web applications and REST APIs without managing any underlying Linux or Windows infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure App Service"
  subtitle="Managed Web Hosting"
  tags={['Azure', 'PaaS', 'Web', 'Compute']}
>

If you want to host a .NET or Node.js web API, you could rent a Virtual Machine, install the OS, install the runtime, configure Nginx, and manage SSL certificates. Azure App Service mathematically automates all of this, reducing deployment to a single Git push.

## 1. Platform as a Service (PaaS)
App Service handles the mathematical drudgery of infrastructure.
You simply provide your source code (or a Docker container). Azure automatically provisions the underlying compute, injects your code, binds the SSL certificates, and exposes a secure HTTPS endpoint. It natively supports Windows and Linux environments. If the underlying OS requires a critical security patch, Azure mathematically executes a zero-downtime rolling update in the background; you never even know it happened.

## 2. Deployment Slots
Updating a live production server is dangerous. App Service solves this with **Deployment Slots**.
A Slot is a mathematically identical clone of your production environment running on a hidden URL. You deploy V2 of your app to the "Staging Slot." You test it thoroughly. When ready, you click "Swap." 
Azure mathematically reroutes the internal load balancer. The Staging Slot instantly becomes Production, and Production becomes Staging. If V2 immediately crashes, you click "Swap" again, mathematically executing a 1-second rollback.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Application Gateway/index.mdx': `---
title: Azure Application Gateway
description: A highly scalable, Layer 7 web traffic load balancer and Web Application Firewall (WAF) designed to mathematically route HTTP/HTTPS requests based on URL paths and headers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Application Gateway"
  subtitle="Layer 7 Web Load Balancer"
  tags={['Azure', 'Networking', 'Load Balancing', 'Security']}
>

A standard Load Balancer operates at Layer 4 (TCP/UDP), blindly forwarding packets based on IP addresses. Azure Application Gateway operates at Layer 7 (HTTP), meaning it mathematically understands the actual content of the web request.

## 1. URL Path-Based Routing
Because it understands HTTP, Application Gateway can mathematically route traffic based on the URL.
- If a user requests TICK1api.com/video/*TICK1, the Gateway routes the traffic to a specific backend pool of heavy, GPU-optimized servers.
- If a user requests TICK1api.com/images/*TICK1, it mathematically routes the traffic to a different pool of lightweight servers.
This allows you to host dozens of distinct microservices behind a single, unified public IP address.

## 2. Web Application Firewall (WAF)
The Application Gateway is often the first line of defense against hackers.
It includes an integrated WAF that mathematically inspects every incoming HTTP packet against the OWASP Top 10 threat rules. If a hacker attempts a SQL Injection (e.g., passing TICK1' OR 1=1TICK1 in a URL parameter), the WAF mathematically detects the malicious string and instantly drops the connection, returning a 403 Forbidden before the packet ever reaches your vulnerable backend servers.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Application Insights/index.mdx': `---
title: Azure Application Insights
description: An incredibly powerful Application Performance Management (APM) service that mathematically injects telemetry into live code to track request rates, dependency failures, and unhandled exceptions in real-time.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Application Insights"
  subtitle="Deep Application Telemetry"
  tags={['Azure', 'Monitoring', 'APM', 'Observability']}
>

If an API request is slow, standard server monitoring will tell you the CPU is at 50%. This is useless. Application Insights mathematically traces the exact millisecond execution of your code to tell you *why* it is slow.

## 1. Auto-Instrumentation and the Application Map
For languages like .NET, Java, and Node.js, Application Insights can be enabled without changing a single line of your source code (Auto-Instrumentation).
The agent attaches to the runtime and mathematically tracks every outgoing HTTP call and SQL query. It uses this data to automatically draw an **Application Map**—a visual, mathematical graph showing how your microservices connect. If your Web API is taking 4 seconds to load, the Map will visually highlight a red line pointing to a specific slow SQL database, instantly identifying the mathematical bottleneck.

## 2. Kusto Query Language (KQL)
Application Insights ingests millions of telemetry events (page views, exceptions, custom events).
To query this, Azure provides **KQL**, an incredibly fast, pipe-based mathematical query language. You can write a query to instantly isolate the exact stack trace of every TICK1NullReferenceExceptionTICK1 that occurred specifically for users on Safari browsers in the last 15 minutes, allowing engineers to debug production issues mathematically rather than guessing.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/ARM templates/index.mdx': `---
title: Azure Resource Manager (ARM) Templates
description: The native Infrastructure as Code (IaC) engine for Azure, allowing developers to mathematically define and deploy complex cloud architectures using declarative JSON files.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Resource Manager (ARM) Templates"
  subtitle="Declarative Azure Infrastructure"
  tags={['Azure', 'IaC', 'JSON', 'DevOps']}
>

ARM Templates are Azure's exact equivalent to AWS CloudFormation. Instead of manually clicking in the Azure Portal to create databases and virtual networks, you define the absolute mathematical state of your architecture in JSON.

## 1. Declarative Idempotency
ARM Templates are strictly **Idempotent**. 
If you run an ARM template that says "Create a Storage Account", Azure creates it. If you run the exact same ARM template again 5 minutes later, Azure mathematically calculates the difference between the template and reality. Because the difference is zero, Azure does absolutely nothing. This guarantees that you can run your deployment pipeline 1,000 times a day safely; it will only execute mathematical changes when the JSON is updated.

## 2. Bicep (The JSON Alternative)
Writing pure JSON for complex ARM templates is mathematically brutal (requiring massive nested arrays and string-escaped functions).
To solve this, Microsoft invented **Bicep**, a domain-specific language (DSL). Bicep looks similar to Terraform or TypeScript. You write clean, readable Bicep code, and the compiler mathematically transcompiles it into the massive, ugly ARM JSON required by the Azure APIs. Bicep drastically reduced the cognitive load of managing Azure Infrastructure as Code.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure DevOps/index.mdx': `---
title: Azure DevOps
description: A comprehensive, enterprise-grade suite of software development tools providing Git repositories, Agile boards, and massive CI/CD pipelines to mathematically orchestrate the software release lifecycle.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure DevOps"
  subtitle="The Enterprise SDLC Platform"
  tags={['Azure', 'DevOps', 'CI/CD', 'Git']}
>

While GitHub is focused heavily on open-source code hosting, Azure DevOps (formerly TFS/VSTS) is a massive, highly structured platform designed to mathematically manage the entire Software Development Life Cycle (SDLC) for strict enterprises.

## 1. Azure Boards and Repos
Azure DevOps tightly couples project management with code.
- **Azure Boards**: An Agile/Scrum tracking system.
- **Azure Repos**: Enterprise Git hosting.
The true mathematical power is traceability. When a developer commits code, they tag the Git commit with TICK1#1234TICK1. The system mathematically links the code change directly to the Bug Ticket (#1234). Auditors can look at a production deployment and mathematically trace it backward through the CI pipeline, to the exact Git commit, to the exact Jira/Board ticket, proving exactly *why* a line of code was changed.

## 2. Azure Pipelines
Azure Pipelines is one of the most powerful CI/CD engines on the market.
You define your build and release processes using declarative YAML. Pipelines can mathematically compile code on Windows, Linux, and macOS agents simultaneously. It includes incredibly robust **Release Gates**. You can mathematically define a rule: *"Before deploying to Production, query the Azure Monitor API. If CPU usage on the Staging server was above 50%, mathematically reject the deployment."* This allows for entirely automated, zero-touch, mathematically safe continuous delivery.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure Files/index.mdx': `---
title: Azure Files
description: A fully managed, cloud-based Server Message Block (SMB) file system that can be concurrently mounted by cloud virtual machines and on-premise corporate workstations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Files"
  subtitle="Managed SMB File Shares"
  tags={['Azure', 'Storage', 'File', 'SMB']}
>

If an enterprise has a physical server in their office acting as an "F: Drive" (a shared network folder for employees), migrating that to the cloud is incredibly difficult because standard Object Storage (Blob/S3) does not function like a hard drive. Azure Files solves this.

## 1. The SMB Protocol
Unlike Azure Blob Storage (which requires API calls), Azure Files exposes a standard **Server Message Block (SMB)** protocol over the internet (Port 445).
An employee sitting in an office in New York can open Windows Explorer, type TICK1\\\\myaccount.file.core.windows.net\\myshareTICK1, and mathematically mount the cloud storage directly to their computer as a Z: Drive. Simultaneously, an Azure Virtual Machine in the cloud can mount that exact same drive. They can read and write files concurrently with strict mathematical file-locking semantics.

## 2. Azure File Sync
For companies with terrible internet bandwidth, mounting a cloud drive directly is too slow.
Azure provides **File Sync**. You keep a physical Windows Server in your local office. Employees save files to the local server at gigabit LAN speeds. In the background, an Azure agent mathematically calculates the byte-level changes and seamlessly syncs the data up to Azure Files in the cloud. If the physical office burns down, 100% of the data is mathematically safe in Azure, and employees can mount the cloud drive from home.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure Functions/index.mdx': `---
title: Azure Functions
description: Microsoft's premier event-driven, serverless compute platform, enabling developers to run localized blocks of code that mathematically scale from zero to tens of thousands of concurrent executions.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Functions"
  subtitle="Event-Driven Serverless Compute"
  tags={['Azure', 'Serverless', 'Compute', 'Events']}
>

Azure Functions is the exact equivalent of AWS Lambda. It allows you to write a piece of code (C#, Python, JavaScript) and mathematically execute it only when an event occurs, without ever provisioning or paying for an idle server.

## 1. Triggers and Bindings
Azure Functions abstracts away API boilerplate using a mathematical concept called **Bindings**.
- **Trigger**: What causes the function to run (e.g., An HTTP request, a new message on a Service Bus queue, or a timer).
- **Input/Output Bindings**: If your function needs to save data to a database, you do *not* write database connection code. You configure an Output Binding in a JSON file. Your function simply mathematically returns a JSON object; the Azure runtime intercepts the return value and automatically executes the complex network math to securely insert it into CosmosDB.

## 2. Consumption vs. Premium Plans
- **Consumption Plan**: Pure serverless. You pay exactly per execution millisecond. The math scales to infinity, but suffers from "Cold Starts" (taking a few seconds to boot the code if it hasn't been run recently).
- **Premium Plan**: You mathematically reserve a pool of pre-warmed instances. You pay a higher baseline cost, but you completely eliminate Cold Starts, and your Functions can securely access resources inside isolated private Virtual Networks.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure ML/index.mdx': `---
title: Azure Machine Learning (Azure ML)
description: An enterprise-grade, comprehensive MLOps platform that mathematically orchestrates the entire AI lifecycle, providing drag-and-drop designers, automated ML, and distributed GPU training clusters.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Machine Learning"
  subtitle="The Enterprise MLOps Suite"
  tags={['Azure', 'MLOps', 'AI', 'Training']}
>

Training a neural network requires GPUs. Deploying it requires Kubernetes. Tracking its metrics requires databases. Azure ML unifies these chaotic, disparate mathematical processes into a single, cohesive governance platform.

## 1. Automated Machine Learning (AutoML)
For tabular data, manually guessing the correct mathematical algorithm (Random Forest vs. XGBoost vs. SVM) is incredibly inefficient.
Azure provides **AutoML**. You simply upload a dataset and define the target column. AutoML spins up a massive compute cluster, automatically tests dozens of different mathematical algorithms in parallel, optimizes their hyperparameters using Bayesian math, and hands you the absolute best performing model, complete with a deployment-ready REST API.

## 2. Compute Clusters and MLOps Pipelines
For custom Deep Learning (PyTorch/TensorFlow), Azure ML provides managed **Compute Clusters**.
A Data Scientist can write code on a tiny, cheap VM. When they hit "Train," Azure ML automatically packages the code into a Docker container, mathematically provisions a cluster of 8 NVIDIA A100 GPUs, runs the training script, logs the Loss curves to the central MLflow-compatible tracking server, saves the TICK1.ptTICK1 weights to the Model Registry, and destroys the GPUs to save money.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.2 Microsoft Azure/Azure Monitor/index.mdx': `---
title: Azure Monitor
description: The comprehensive mathematical telemetry and observability platform for Azure, aggregating metrics and logs from every cloud resource into a centralized, queryable analytics workspace.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Monitor"
  subtitle="Full-Stack Cloud Telemetry"
  tags={['Azure', 'Monitoring', 'Logs', 'Metrics']}
>

If an application crashes, the error could be in the frontend JavaScript, the backend C# API, the SQL Database, or the underlying Virtual Machine. Azure Monitor is the single mathematical pane of glass that ingests telemetry from all of them to find the root cause.

## 1. Metrics vs. Logs
Azure Monitor mathematically splits the world into two data types:
- **Metrics**: Numerical values recorded at specific intervals (e.g., CPU% = 80 at 12:00PM). These are highly optimized for near real-time alerting. If a metric crosses a mathematical threshold, Azure Monitor triggers an Action Group to SMS an engineer.
- **Logs**: Massive streams of unstructured or JSON text (e.g., Apache access logs). These are routed into a **Log Analytics Workspace**.

## 2. Log Analytics and KQL
The true mathematical power of Azure Monitor is the Log Analytics Workspace, powered by the **Kusto Query Language (KQL)**.
If you have 10,000 servers generating 5 Terabytes of logs a day, searching them with standard tools is impossible. KQL is a highly optimized, columnar query language. You can mathematically pipe data: *"Take the 5TB of raw logs | filter where EventType == 'Error' | summarize the count by ServerIP | render a timechart."* Azure mathematically executes this query across terabytes of data in seconds, providing instant visibility into distributed system failures.

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
