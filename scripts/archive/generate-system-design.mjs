import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: Distributing network traffic across multiple servers to ensure reliability and performance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Load Balancing">

A Load Balancer acts as the "traffic cop" sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization. It ensures that no single server bears too much demand.

<Callout icon="info" title="No Single Point of Failure">
  If a single server goes down, the load balancer redirects traffic to the remaining online servers. If a new server is added to the server group, the load balancer automatically starts to send requests to it.
</Callout>

## Types of Load Balancers

Load balancers operate at different layers of the OSI model.

<ComparisonTable 
  headers={['Type', 'OSI Layer', 'Description']}
  rows={[
    ['Application Load Balancer (ALB)', 'Layer 7 (HTTP/HTTPS)', 'Inspects the URL/Headers. Can route \`/api\` to Server A and \`/images\` to Server B. Great for microservices.'],
    ['Network Load Balancer (NLB)', 'Layer 4 (TCP/UDP)', 'Only inspects IP and Port. Extremely fast, capable of handling millions of requests per second. Used for gaming/IoT.'],
    ['DNS Load Balancing', 'Layer 7 (DNS)', 'Returns different IP addresses for the same domain name (e.g., Round Robin DNS).']
  ]}
/>

## Common Algorithms

How does the load balancer choose which server receives the next request?

<ComparisonTable 
  headers={['Algorithm', 'How it works']}
  rows={[
    ['Round Robin', 'Requests are distributed sequentially across the group of servers.'],
    ['Least Connections', 'A new request is sent to the server with the fewest current connections.'],
    ['IP Hash', 'The IP address of the client is used to determine which server receives the request. Guarantees a specific user always hits the same server.']
  ]}
/>

## Architecture

A standard Highly Available (HA) web architecture heavily relies on load balancing at multiple tiers.

<ArchitectureDiagram chart={\`
graph TD
  Internet((Internet))
  ALB{Application Load Balancer}
  
  subgraph Web Tier
    Web1[Web Server 1]
    Web2[Web Server 2]
    Web3[Web Server 3]
  end
  
  InternalLB{Internal Load Balancer}
  
  subgraph App Tier
    App1[App Server 1]
    App2[App Server 2]
  end
  
  Internet --> ALB
  ALB -- Round Robin --> Web1
  ALB -- Round Robin --> Web2
  ALB -- Round Robin --> Web3
  
  Web1 --> InternalLB
  Web2 --> InternalLB
  Web3 --> InternalLB
  
  InternalLB -- Least Conn --> App1
  InternalLB -- Least Conn --> App2
\`} />

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/API gateways/index.mdx': `---
title: API Gateways
description: The single entry point for all clients into a microservices architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="API Gateways">

An API Gateway sits between clients and services. It acts as a reverse proxy, routing requests from clients to services. It may also perform various cross-cutting tasks such as authentication, SSL termination, and rate limiting.

<Callout icon="tip" title="Decoupling">
  By using an API Gateway, the client doesn't need to know the IP address or hostnames of 50 different microservices. It just talks to one endpoint (e.g., \`api.example.com\`), and the Gateway handles the internal routing.
</Callout>

## Core Responsibilities

An API Gateway does much more than simple routing.

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Routing', 'Mapping \`/users\` to the User Service and \`/orders\` to the Order Service.'],
    ['Authentication / Authorization', 'Validating JWTs before the request even reaches the internal service.'],
    ['Rate Limiting', 'Preventing DDoS attacks or API abuse by throttling requests per IP/User.'],
    ['Request Aggregation', 'Hitting 3 different microservices and returning a single, unified JSON response to the client.']
  ]}
/>

## API Gateway vs Load Balancer

While they sound similar, they solve different problems.

- **Load Balancers** are dumb pipes. They don't care *what* the request is, they just want to distribute it evenly to prevent servers from crashing.
- **API Gateways** are smart. They understand the business logic of the request (e.g., "Is this user allowed to access the /admin endpoint?").

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Mobile[Mobile App]
  Web[Web App]
  
  Gateway{API Gateway\\n(Kong / AWS API Gateway)}
  
  subgraph Internal Microservices
    Auth[Auth Service]
    User[User Service]
    Order[Order Service]
  end
  
  Mobile --> Gateway
  Web --> Gateway
  
  Gateway -- /auth --> Auth
  Gateway -- /users --> User
  Gateway -- /orders --> Order
\`} />

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Apache Kafka/index.mdx': `---
title: Apache Kafka
description: A distributed event streaming platform capable of handling trillions of events a day.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Apache Kafka">

Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

<Callout icon="warning" title="Not a Message Queue">
  Unlike traditional message queues (like RabbitMQ) where a message is deleted after it is read, Kafka is an **Append-Only Log**. Events are stored persistently for a configured amount of time (e.g., 7 days) and can be replayed by multiple independent consumers.
</Callout>

## Core Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Topic', 'A category or feed name to which records are published (e.g., \`user-clicks\`).'],
    ['Partition', 'Topics are broken down into partitions for horizontal scalability across multiple brokers.'],
    ['Producer', 'Applications that publish (write) events to a Kafka topic.'],
    ['Consumer', 'Applications that subscribe to (read) events from a Kafka topic.'],
    ['Broker', 'A single Kafka server. A Kafka cluster is made up of multiple Brokers.']
  ]}
/>

## The Partition Model

Kafka achieves its massive throughput by partitioning topics. If a topic has 3 partitions, 3 different consumer instances can read from the topic completely in parallel.

<ArchitectureDiagram chart={\`
graph LR
  P1[Producer 1]
  P2[Producer 2]
  
  subgraph Kafka Cluster (Topic: user_clicks)
    Part0[Partition 0\\n[Msg1, Msg4]]
    Part1[Partition 1\\n[Msg2, Msg5]]
    Part2[Partition 2\\n[Msg3, Msg6]]
  end
  
  subgraph Consumer Group A
    C1[Consumer 1]
    C2[Consumer 2]
    C3[Consumer 3]
  end
  
  P1 --> Part0
  P1 --> Part1
  P2 --> Part2
  
  Part0 --> C1
  Part1 --> C2
  Part2 --> C3
\`} />

## Guarantees

- Messages sent to a specific topic partition will be appended in the order they are sent.
- A consumer instance sees records in the exact order they are stored in the log.
- For a topic with replication factor N, Kafka tolerates up to N-1 server failures without losing any messages committed to the log.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/RabbitMQ/index.mdx': `---
title: RabbitMQ
description: The most widely deployed open source message broker.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="RabbitMQ">

RabbitMQ is an open-source message broker software that implements the Advanced Message Queuing Protocol (AMQP). It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.

<Callout icon="tip" title="Smart Broker, Dumb Consumer">
  RabbitMQ is designed as a "Smart Broker". It keeps track of exactly which consumer has read which message. Once a consumer successfully processes and acknowledges a message, RabbitMQ permanently deletes it from the queue.
</Callout>

## Exchanges and Queues

Unlike Kafka where producers write directly to Topics, in RabbitMQ, producers never send messages directly to a queue. They send messages to an **Exchange**, which then routes the messages to zero or more **Queues** based on routing rules.

<ComparisonTable 
  headers={['Exchange Type', 'Routing Behavior']}
  rows={[
    ['Direct', 'Routes messages to a queue whose binding key exactly matches the routing key of the message.'],
    ['Fanout', 'Broadcasts all messages to all connected queues, ignoring the routing key.'],
    ['Topic', 'Routes messages based on wildcard matching between the routing key and the queue binding (e.g., \`logs.*.error\`).'],
    ['Headers', 'Routes based on message header attributes instead of the routing key.']
  ]}
/>

## Architecture

RabbitMQ is perfect for task-queue workflows, like processing background video encoding jobs or sending emails asynchronously.

<ArchitectureDiagram chart={\`
graph LR
  Producer[Web Server\\n(Producer)]
  
  subgraph RabbitMQ Broker
    Exchange{Exchange\\n(Type: Direct)}
    Queue1[(Queue: PDF Processing)]
    Queue2[(Queue: Email Sending)]
  end
  
  Worker1[Worker Node A\\n(PDF Generator)]
  Worker2[Worker Node B\\n(Email Sender)]
  
  Producer -- "pdf.create" --> Exchange
  Producer -- "email.send" --> Exchange
  
  Exchange -- Routes "pdf.*" --> Queue1
  Exchange -- Routes "email.*" --> Queue2
  
  Queue1 -- Pops message --> Worker1
  Queue2 -- Pops message --> Worker2
\`} />

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices
description: An architectural style that structures an application as a collection of loosely coupled services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Microservices">

Microservice architecture is an approach to developing a single application as a suite of small, independently deployable services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API or message queue.

<Callout icon="error" title="Not a Silver Bullet">
  Microservices solve organizational scaling problems, not necessarily technical ones. If you have a small team of 3 developers, building 15 microservices will create a "Distributed Monolith" that is significantly harder to debug and deploy than a standard Monolith.
</Callout>

## Monolith vs Microservices

<ComparisonTable 
  headers={['Attribute', 'Monolithic Architecture', 'Microservices Architecture']}
  rows={[
    ['Codebase', 'One single repository for the entire app.', 'Multiple independent repositories.'],
    ['Deployment', 'Must deploy the entire application at once.', 'Can deploy a single service independently.'],
    ['Scaling', 'Must scale the entire app horizontally.', 'Can scale specific high-traffic services individually.'],
    ['Database', 'Usually a single shared relational database.', 'Each service should ideally own its own database schema.']
  ]}
/>

## The Database per Service Pattern

The golden rule of Microservices is that **Service A should NEVER query Service B's database directly**. If Service A needs Service B's data, it must make an API request or listen to an event stream. This ensures loose coupling.

<ArchitectureDiagram chart={\`
graph TD
  Client[Web Client]
  Gateway{API Gateway}
  
  subgraph Microservices Architecture
    User[User Service]
    UserDB[(User DB\\nPostgreSQL)]
    
    Order[Order Service]
    OrderDB[(Order DB\\nMongoDB)]
    
    Inventory[Inventory Service]
    InventoryDB[(Inventory DB\\nRedis)]
  end
  
  Client --> Gateway
  Gateway --> User
  Gateway --> Order
  Gateway --> Inventory
  
  User --> UserDB
  Order --> OrderDB
  Inventory --> InventoryDB
  
  Order -. API Call .-> User
  Order -. API Call .-> Inventory
\`} />

## Common Fallacies of Distributed Computing

When moving to Microservices, developers often falsely assume:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.

You must build retries, circuit breakers, and distributed tracing to combat these realities.

</TechnologyTemplate>
`,
}

async function generateSystemDesign() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateSystemDesign().catch(console.error)
