import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '40. Software Engineering - Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices Architecture
description: An architectural style that structures an application as a collection of loosely coupled, independently deployable services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Microservices Architecture">

Microservices are an architectural and organizational approach to software development where software is composed of small independent services that communicate over well-defined APIs.

<Callout icon="warning" title="The Complexity Tax">
  Microservices solve organizational scaling problems (100+ engineers), but they introduce massive technical complexity. You now have to deal with network latency, distributed tracing, partial failures, and complex deployments. Don't start with Microservices.
</Callout>

## Core Characteristics

<ComparisonTable 
  headers={['Characteristic', 'Description']}
  rows={[
    ['Independently Deployable', 'You can update the Billing service without touching or restarting the User service.'],
    ['Decentralized Data', 'Each microservice owns its own database. The Billing service cannot run a SQL JOIN on the User database.'],
    ['Technology Agnostic', 'The Billing service can be written in Java with PostgreSQL, while the User service is written in Go with MongoDB.']
  ]}
/>

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.2 Software Architecture/Event-driven architecture/index.mdx': `---
title: Event-Driven Architecture (EDA)
description: A software architecture paradigm promoting the production, detection, consumption of, and reaction to events.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Event-Driven Architecture (EDA)">

Event-driven architecture (EDA) is a software architecture paradigm promoting the production, detection, consumption of, and reaction to events. An event can be defined as "a significant change in state".

<Callout icon="success" title="Extreme Decoupling">
  In a traditional system, the Checkout Service explicitly calls the Email Service (\`sendReceipt()\`). If the Email Service is down, Checkout fails.
  
  In EDA, the Checkout Service simply shouts, "Order Placed!" into a message broker (like Kafka) and immediately responds to the user. The Email Service listens for that event and processes it whenever it has capacity.
</Callout>

## Core Components

<ComparisonTable 
  headers={['Component', 'Description', 'Examples']}
  rows={[
    ['Event Producer', 'The system that detects a state change and emits an event.', 'Checkout Service, IoT Thermostat.'],
    ['Event Broker', 'The middleware router that receives the event and distributes it to interested parties.', 'Apache Kafka, RabbitMQ, AWS EventBridge.'],
    ['Event Consumer', 'The system that reacts to the event.', 'Email Service, Data Warehouse, Fraud Detection.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/Monolith vs microservices/index.mdx': `---
title: Monolith vs Microservices
description: A comparison of the two primary software architecture strategies.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Monolith vs Microservices">

The debate between Monolithic and Microservices architecture is one of the most consequential decisions a software team will make.

<Callout icon="tip" title="The Majestic Monolith">
  Many of the world's most successful startups (Shopify, StackOverflow, early Instagram) were built as Monoliths. A well-structured, modular Monolith is vastly superior to a poorly designed, tightly-coupled Microservice architecture (often called a "Distributed Monolith").
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'Monolithic Architecture', 'Microservices Architecture']}
  rows={[
    ['Codebase', 'A single, unified codebase containing all features.', 'Dozens or hundreds of small, isolated codebases.'],
    ['Deployment', 'Deploying means copying the entire app to the server. Very simple.', 'Requires complex orchestration (Kubernetes, CI/CD pipelines).'],
    ['Scaling', 'Scale the entire app by running it on a bigger server (Vertical).', 'Scale only the bottlenecked services (e.g., spin up 100 Image Processing containers, but keep 1 User container).'],
    ['Team Structure', 'Best for small teams (1-20 engineers).', 'Best for massive organizations where independent teams need autonomy.']
  ]}
/>

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.4 API Design/gRPC/index.mdx': `---
title: gRPC
description: A high-performance, open-source universal RPC framework developed by Google.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="gRPC">

gRPC is a modern, open-source Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication.

<Callout icon="info" title="Under the Hood">
  gRPC uses HTTP/2 for transport (which allows multiplexing and streaming) and Protocol Buffers (Protobuf) as the interface description language and message format.
</Callout>

## Why gRPC over REST?

<ComparisonTable 
  headers={['Feature', 'REST (JSON)', 'gRPC (Protobuf)']}
  rows={[
    ['Format', 'JSON (Text-based, human-readable).', 'Protobuf (Binary, completely unreadable to humans, highly compressed).'],
    ['Speed', 'Fast, but requires parsing JSON strings into objects.', 'Extremely fast. Binary serialization is roughly 5x to 10x faster.'],
    ['Contracts', 'OpenAPI/Swagger (Optional).', 'Strictly typed \`.proto\` files (Mandatory). The compiler automatically generates client code in Python, Go, Java, etc.'],
    ['Streaming', 'Generally limited to Client-to-Server requests.', 'Supports Bi-directional streaming natively via HTTP/2.']
  ]}
/>

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.4 API Design/Webhooks/index.mdx': `---
title: Webhooks
description: User-defined HTTP callbacks triggered by specific events.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Webhooks">

A webhook in web development is a method of augmenting or altering the behavior of a web page or web application with custom callbacks. These callbacks may be maintained, modified, and managed by third-party users and developers who may not necessarily be affiliated with the originating website or application.

<Callout icon="success" title="Push vs Pull">
  **Without Webhooks (Polling):** Your app asks Stripe every 5 minutes, "Did the user pay yet?" (Wastes massive amounts of server resources).
  
  **With Webhooks:** You give Stripe a URL (\`https://yourapp.com/api/stripe-webhook\`). When the user pays, Stripe instantly POSTs the payment data to your URL.
</Callout>

## Security Considerations

Because Webhooks are public URLs that accept data, they must be secured:

<ComparisonTable 
  headers={['Security Method', 'Description']}
  rows={[
    ['Secret Signatures', 'The sender (e.g., Stripe) hashes the payload using a secret key only you both know. You verify the hash before processing the payload.'],
    ['IP Whitelisting', 'Your server only accepts POST requests to the webhook URL if the traffic originates from known, published IP addresses of the provider.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/gRPC vs REST vs GraphQL/index.mdx': `---
title: gRPC vs REST vs GraphQL
description: A comparison of the three dominant API paradigms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="gRPC vs REST vs GraphQL">

Choosing the right API architecture depends entirely on who is consuming the API and what the performance constraints are.

<Callout icon="info" title="The Rule of Thumb">
  Use **REST** for public, external-facing APIs.
  Use **GraphQL** when building complex Mobile or Web frontends that need highly specific data shapes.
  Use **gRPC** for internal, backend-to-backend microservice communication where raw speed is critical.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['API Style', 'Primary Data Format', 'Best Use Case', 'Drawback']}
  rows={[
    ['REST', 'JSON', 'Public APIs (Stripe, Twilio). Everyone understands it.', 'Over-fetching (getting too much data) and Under-fetching (having to make 5 requests to get what you need).'],
    ['GraphQL', 'JSON', 'Frontend Data Fetching. The client asks for exactly what it wants in a single query.', 'Extremely difficult to cache responses at the network (CDN) level.'],
    ['gRPC', 'Protocol Buffers (Binary)', 'Internal Microservices.', 'Browsers cannot easily speak raw HTTP/2 and Protobuf; it is strictly for server-to-server.']
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Apache Kafka/index.mdx': `---
title: Apache Kafka
description: An open-source distributed event streaming platform used for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Apache Kafka">

Apache Kafka is an open-source distributed event streaming platform developed by LinkedIn and donated to the Apache Software Foundation. It is designed to handle trillions of events a day.

<Callout icon="warning" title="Not a Message Queue">
  Kafka is technically an **Append-Only Distributed Log**. Unlike RabbitMQ, where a message is deleted after it is read, Kafka retains the message on disk for a configured time (e.g., 7 days). This allows new services to "replay" history.
</Callout>

## Core Concepts

<ComparisonTable 
  headers={['Term', 'Description']}
  rows={[
    ['Topic', 'A logical channel where events are published. (e.g., \`user-clicks\`).'],
    ['Partition', 'Topics are split into multiple Partitions across different servers. This allows Kafka to scale horizontally to massive throughput.'],
    ['Producer', 'The application sending data into a Kafka Topic.'],
    ['Consumer Group', 'A group of applications reading from a Topic. Kafka ensures that each Partition is only read by ONE consumer in the group, ensuring work is balanced and never duplicated.']
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Message queues/index.mdx': `---
title: Message Queues
description: A form of asynchronous service-to-service communication used in serverless and microservices architectures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Message Queues">

Message queues provide an asynchronous communications protocol, meaning that the sender and receiver of the message do not need to interact with the message queue at the same time. Messages placed onto the queue are stored until the recipient retrieves them.

<Callout icon="success" title="Traffic Spikes">
  If you sell Taylor Swift tickets, 1 million people will hit "Buy" at exactly 9:00 AM. If your database processes 1,000 orders/sec, it will instantly crash.
  
  A Message Queue absorbs the 1 million requests instantly (because memory is fast), and then drips them to the database at a safe 1,000/sec over the next 15 minutes.
</Callout>

## Leading Technologies

<ComparisonTable 
  headers={['Queue', 'Characteristics']}
  rows={[
    ['RabbitMQ', 'The industry standard. Uses the AMQP protocol. Highly reliable, supports complex routing rules (exchanges).'],
    ['AWS SQS', 'A fully managed queue by Amazon. Practically infinite scalability, but lacks complex routing logic.'],
    ['Redis (Pub/Sub)', 'In-memory. Blisteringly fast, but if the Redis server reboots before the message is read, it is permanently lost.']
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Redis/index.mdx': `---
title: Redis
description: An open-source, in-memory data structure store, used as a database, cache, and message broker.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Redis (Remote Dictionary Server)">

Redis is an open-source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams.

<Callout icon="info" title="In-Memory Speed">
  Because Redis stores all data directly in RAM, it responds to queries in sub-milliseconds. It is commonly used as a caching layer in front of a slow SQL database to store highly accessed data (like user session tokens or top 10 leaderboards).
</Callout>

## Data Structures

Redis is not just a simple string Key-Value store; it supports complex structures:

<ComparisonTable 
  headers={['Structure', 'Use Case']}
  rows={[
    ['Strings', 'Caching raw JSON payloads, incrementing view counters.'],
    ['Lists', 'A queue system, storing a timeline of recent events.'],
    ['Hashes', 'Storing object data (e.g., a User object with \`name\`, \`email\`, \`age\` fields).'],
    ['Sorted Sets', 'Automatically sorting data by a score. Perfect for gaming Leaderboards or Priority Queues.']
  ]}
/>

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Serverless/index.mdx': `---
title: Serverless Architecture
description: A cloud computing execution model in which the cloud provider dynamically manages the allocation and provisioning of servers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Serverless Architecture">

Serverless computing is a cloud computing execution model in which the cloud provider dynamically manages the allocation and provisioning of servers. A serverless application runs in stateless compute containers that are event-triggered, ephemeral (may last for one invocation), and fully managed by the cloud provider.

<Callout icon="warning" title="Cold Starts">
  If no one has called your Serverless Function in 15 minutes, the Cloud Provider shuts it down to save money. The next user who calls it will experience a "Cold Start"—a 1 to 3 second delay while the provider boots up a fresh container just for them.
</Callout>

## Key Characteristics

<ComparisonTable 
  headers={['Characteristic', 'Description']}
  rows={[
    ['No Server Management', 'You do not patch Linux, configure SSH, or worry about hard drive space. You just upload your code.'],
    ['Pay-as-you-go', 'You are billed down to the millisecond of actual compute time used. If your app gets 0 traffic at 3 AM, you pay exactly $0.00.'],
    ['Auto-scaling', 'If 10,000 people click a button at once, the cloud provider instantly spins up 10,000 isolated instances of your function.']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega8() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega8().catch(console.error)
