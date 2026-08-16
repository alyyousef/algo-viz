import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/FaaS/index.mdx': `---
title: FaaS (Function as a Service)
description: A category of cloud computing services that provides a platform allowing customers to develop, run, and manage application functionalities without the complexity of building and maintaining the infrastructure typically associated with developing and launching an app.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Function as a Service (FaaS)">

In the IaaS (Infrastructure as a Service) era, you rented a virtual Linux server and had to manage the OS, the networking, and the scaling.

**FaaS** mathematically abstracts the server entirely.

<Callout icon="success" title="The Micro-Container Paradigm">
  With FaaS, the developer writes a single, stateless mathematical function (e.g., \`function processPayment() { ... }\`). 
  
  When an HTTP request arrives, the cloud provider dynamically spins up a micro-container in 50 milliseconds, executes the function, returns the response, and instantly destroys the container. You are billed purely for the execution time, usually measured in increments of 1 millisecond.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/AWS Lambda/index.mdx': `---
title: AWS Lambda
description: An event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="AWS Lambda"
  subtitle="The pioneer of Serverless computing"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/512px-Amazon_Lambda_architecture_logo.svg.png"
  description="Launched in 2014, AWS Lambda mathematically revolutionized the cloud industry by introducing the FaaS model, proving that developers no longer needed to provision or manage EC2 instances."
  yearCreated={2014}
  creator="Amazon Web Services"
  isOpenSource={false}
  websiteUrl="https://aws.amazon.com/lambda/"
>

AWS Lambda is deeply integrated into the entire AWS ecosystem. 

It mathematically relies on **Event-Driven Execution**. A Lambda function sits completely idle (costing $0.00) until a biological trigger occurs. If a user uploads an image to an S3 Bucket, that event mathematically triggers a Lambda function to compress the image and save it to DynamoDB, all occurring invisibly without a single dedicated server.

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Azure Functions/index.mdx': `---
title: Azure Functions
description: A serverless solution that allows you to write less code, maintain less infrastructure, and save on costs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Azure Functions"
  subtitle="Microsoft's Serverless Platform"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/512px-Microsoft_Azure_Logo.svg.png"
  description="Microsoft's direct competitor to AWS Lambda, mathematically integrated tightly with the .NET ecosystem and Azure enterprise services."
  yearCreated={2016}
  creator="Microsoft"
  isOpenSource={true}
  websiteUrl="https://azure.microsoft.com/en-us/products/functions/"
>

Unlike AWS Lambda (which is a proprietary black box), the core runtime of Azure Functions is mathematically Open Source. 

This means enterprises can run Azure Functions code locally on their laptops, or even deploy the exact same serverless runtime onto their own on-premise Kubernetes clusters using KEDA (Kubernetes-based Event Driven Autoscaling), solving the biological fear of vendor lock-in.

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Google Cloud Functions/index.mdx': `---
title: Google Cloud Functions
description: A serverless execution environment for building and connecting cloud services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Google Cloud Functions"
  subtitle="GCP's Event-Driven FaaS"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png"
  description="Google's Serverless offering, designed for mathematical simplicity and massive horizontal scalability, primarily used for gluing together Google's advanced Data and ML services."
  yearCreated={2017}
  creator="Google"
  isOpenSource={false}
  websiteUrl="https://cloud.google.com/functions"
>

Google Cloud Functions (GCF) is mathematically optimized to respond to Firebase events (like a new user signing up on a mobile app) or Pub/Sub messages. 

It is heavily utilized in Data Engineering pipelines: if 10,000 IoT devices upload telemetry data simultaneously, GCF will automatically scale from 0 to 10,000 parallel function executions in milliseconds, process the math, insert the data into BigQuery, and instantly scale back to 0.

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/OCI Functions/index.mdx': `---
title: OCI Functions
description: A serverless, highly scalable, fully managed Functions-as-a-Service platform.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="OCI Functions"
  subtitle="Oracle's Open-Source Backed Serverless"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png"
  description="Oracle Cloud Infrastructure's FaaS offering, which is biologically unique because it is entirely powered by the open-source Fn Project."
  yearCreated={2019}
  creator="Oracle"
  isOpenSource={true}
  websiteUrl="https://www.oracle.com/cloud/cloud-native/functions/"
>

Oracle took a mathematically different approach to FaaS. Instead of building a proprietary runtime, they based OCI Functions entirely on Docker containers and the open-source Fn Project.

When you deploy an OCI Function, it is mathematically just a standard Docker container. This means developers can write functions in any language (Java, Python, Go) and have absolute biological certainty that they can migrate their workloads off Oracle Cloud at any time.

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Event-driven execution/index.mdx': `---
title: Event-driven execution
description: A software architecture paradigm promoting the production, detection, consumption of, and reaction to events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event-Driven Execution">

Serverless architecture fundamentally mathematically requires an **Event-Driven** model.

In a traditional web server (like Express.js), a process sits biologically idle in an infinite \`while(true)\` loop, waiting for an HTTP request to arrive. You pay for this idle time.

<Callout icon="info" title="The Trigger Mechanism">
  In an Event-Driven model, the code is literally turned off. 
  
  The cloud provider monitors an Event Source (like an S3 bucket, an API Gateway, or a Kafka queue). When an event occurs (a file is uploaded, a message arrives), the cloud provider intercepts the event, boots the serverless function, hands it the event payload as a JSON object, and shuts it down. It is a strictly reactive mathematical model.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Cold starts/index.mdx': `---
title: Cold starts
description: The latency experienced when a serverless function is invoked after being idle, requiring the cloud provider to spin up a new container.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cold Starts">

The biological flaw of Serverless computing is the **Cold Start**.

When a function scales to zero, the physical container is destroyed. When a new user hits the API, the cloud provider must mathematically provision a new container, download the code, boot the Node.js or Java runtime, and execute the function. 

<Callout icon="warning" title="The Latency Penalty">
  This provisioning process takes time. For a lightweight Go or Node.js function, a cold start might add 300 milliseconds of latency. But for a heavy Java Spring Boot function, a cold start can mathematically freeze the user's API request for up to 5 full seconds.
  
  Once the container is warm, subsequent requests execute in 10ms. To combat cold starts, engineers mathematically configure "Provisioned Concurrency" (paying a small fee to keep a few containers permanently warm), completely negating the original point of Serverless.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Serverless databases/index.mdx': `---
title: Serverless databases
description: Database systems that automatically scale compute and storage resources independently, scaling down to zero when not in use.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Serverless Databases">

If you architect a mathematically brilliant Serverless API using AWS Lambda that scales from 0 to 10,000 concurrent requests in two seconds, but you connect it to a traditional, static Amazon RDS PostgreSQL database, your architecture will biologically fail. 

10,000 Lambdas opening 10,000 simultaneous TCP connections will instantly mathematically crash the static database.

<Callout icon="success" title="The Connectionless Solution">
  **Serverless Databases** (like Amazon DynamoDB or PlanetScale) solve this. 
  
  They are mathematically designed to handle stateless, massive concurrency. They scale their internal read/write capacity dynamically per millisecond, and they communicate via HTTP connection pools instead of persistent TCP sockets, ensuring the database scales as infinitely as the Serverless compute layer.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Edge servers/index.mdx': `---
title: Edge servers
description: Computing servers located close to the end user (at the edge of the network) to reduce latency and bandwidth use.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Edge Servers">

The Speed of Light dictates that a user in Australia mathematically cannot communicate with a server in New York faster than 200 milliseconds. 

**Edge Servers** bypass this physical limitation by pushing the compute biologically closer to the user.

<Callout icon="tip" title="The Point of Presence (PoP)">
  Instead of one centralized data center, companies like Cloudflare operate 300 Edge Servers in 300 different cities globally.
  
  When an Australian user makes an API request, they mathematically hit the Edge Server located in Sydney. The entire computation happens 10 miles away from their house, reducing the mathematical latency from 200ms down to a biologically imperceptible 15ms.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/CDN compute/index.mdx': `---
title: CDN compute
description: Executing application logic directly within the Content Delivery Network infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CDN Compute">

Historically, a **CDN** (Content Delivery Network) was incredibly dumb. It could only mathematically cache static files (like PNG images or CSS stylesheets) at the Edge.

<Callout icon="success" title="Programmable Edges">
  Modern **CDN Compute** transforms the dumb cache into a programmable computer.
  
  Developers can write mathematical logic (like A/B testing, JWT authentication validation, or geographic redirects) and deploy it directly into the CDN's hardware. When a user requests a file, the CDN biologically executes the code at the Edge in 1 millisecond to dynamically alter the HTTP response before sending it to the user, completely avoiding the origin server.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Lambda@Edge/index.mdx': `---
title: Lambda@Edge
description: A feature of Amazon CloudFront that lets you run code closer to users of your application, which improves performance and reduces latency.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Lambda@Edge"
  subtitle="AWS's Edge Computing Solution"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/512px-Amazon_Lambda_architecture_logo.svg.png"
  description="Lambda@Edge allows developers to mathematically deploy AWS Lambda functions directly into the CloudFront CDN edge locations."
  yearCreated={2017}
  creator="Amazon Web Services"
  isOpenSource={false}
  websiteUrl="https://aws.amazon.com/lambda/edge/"
>

If you have a global application and you want to mathematically block users from specific countries from downloading a file, routing that request all the way back to a centralized \`us-east-1\` server just to say "No" is a massive waste of bandwidth.

With **Lambda@Edge**, you intercept the HTTP request at the exact moment it hits the CloudFront server in the user's local city. The function executes, mathematically checks their IP address, and blocks them locally in 5 milliseconds.

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Cloudflare Workers/index.mdx': `---
title: Cloudflare Workers
description: A serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Cloudflare Workers"
  subtitle="The V8 Isolate Revolution"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/512px-Cloudflare_Logo.svg.png"
  description="Cloudflare mathematically solved the Serverless 'Cold Start' problem by abandoning Docker containers entirely in favor of V8 Isolates."
  yearCreated={2017}
  creator="Cloudflare"
  isOpenSource={false}
  websiteUrl="https://workers.cloudflare.com/"
>

AWS Lambda biologically suffers from 300ms Cold Starts because it spins up a full Linux MicroVM for every function. 

<Callout icon="success" title="0ms Cold Starts">
  Cloudflare Workers run directly inside the Chrome **V8 JavaScript Engine**. 
  
  Instead of booting an OS, Cloudflare mathematically spawns a new V8 "Isolate" (a tiny, secure memory context) within an already-running process. This reduces the boot time from 300ms down to **under 5 milliseconds**, effectively creating 0ms Cold Starts at the Edge.
</Callout>

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Vercel Functions/index.mdx': `---
title: Vercel Functions
description: Serverless functions optimized for frontend frameworks and deployed at the edge.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Vercel Functions"
  subtitle="Serverless for the Frontend"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/512px-Vercel_logo_black.svg.png"
  description="Vercel mathematically abstracted the complexity of AWS Lambda, packaging it specifically for Next.js and frontend developers."
  yearCreated={2018}
  creator="Vercel"
  isOpenSource={false}
  websiteUrl="https://vercel.com/docs/functions"
>

If a frontend developer wants to create a simple API endpoint to send an email, forcing them to biologically configure AWS IAM roles, API Gateways, and Terraform is mathematically abusive.

Vercel solved this. The developer simply creates a file named \`app/api/email/route.ts\` in their Next.js project. When they run \`git push\`, Vercel automatically detects the file, compiles it, provisions the AWS infrastructure invisibly, and deploys it globally as a Serverless Function. It is the absolute pinnacle of Developer Experience (DX).

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/Edge AI/index.mdx': `---
title: Edge AI
description: The deployment of artificial intelligence applications in devices throughout the physical world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Edge AI">

If a self-driving car biologically detects a pedestrian, it mathematically cannot send the video feed to an AWS server in Virginia, wait for the ML model to process the image, and wait for the "Brake" command to return over a 5G network. The 200ms latency will result in a fatal collision.

<Callout icon="warning" title="Local Inferencing">
  **Edge AI** mathematically mandates that the Machine Learning inference runs *locally* on the device's physical hardware. 
  
  The AI model is trained on massive GPUs in the cloud, but the final, compressed mathematical weights are downloaded to the car. The car uses an embedded Neural Processing Unit (NPU) to execute the math locally in 2 milliseconds, requiring zero internet connection.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/IoT edge computing/index.mdx': `---
title: IoT edge computing
description: A distributed computing paradigm that brings computation and data storage closer to the sources of data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IoT Edge Computing">

A modern factory might have 10,000 biological sensors monitoring the temperature of industrial drills, generating 5 Gigabytes of telemetry data per second. 

Mathematically transmitting 5GB/sec of data over an LTE connection to a centralized cloud database is financially impossible.

<Callout icon="tip" title="Data Filtering at the Edge">
  **IoT Edge Computing** solves this by placing a small physical server (an Edge Gateway) directly inside the factory. 
  
  The 10,000 sensors send their data to the local gateway. The gateway mathematically filters out the "normal" data (99.9% of it). If a drill's temperature spikes, the gateway instantly triggers an alarm locally, and *only* uploads the anomalous data to the cloud for long-term storage, mathematically reducing network bandwidth costs by 99%.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.4 Serverless & Edge/TinyML/index.mdx': `---
title: TinyML
description: A subfield of machine learning focused on developing models that can be executed on small, low-power microcontrollers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TinyML (Tiny Machine Learning)">

Running an AI model like ChatGPT requires a massive, 400-watt Nvidia GPU. 

But what if you want to run an ML model inside a biological hearing aid, powered by a tiny battery that must last for 3 years, mathematically constrained to 256 Kilobytes of RAM?

<Callout icon="success" title="Microcontroller Intelligence">
  **TinyML** is the extreme mathematical optimization of Neural Networks. 
  
  Using techniques like **Quantization** (converting 32-bit floating-point numbers to 8-bit integers) and **Pruning** (deleting useless neural connections), engineers can biologically shrink an audio-recognition AI model to 15KB. This allows a $2 microcontroller to constantly listen for the wake-word *"Hey Siri"* while mathematically consuming less than 1 milliwatt of power.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega108() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega108().catch(console.error)
