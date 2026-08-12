import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '40. Software Engineering - Process & Architecture/40.4 API Design/GraphQL/index.mdx': `---
title: GraphQL
description: A query language for your API, and a server-side runtime for executing queries using a type system you define for your data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GraphQL">

GraphQL is a data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. It allows clients to define the structure of the data required, and exactly that structure of the data is returned from the server.

<Callout icon="success" title="No More Over-fetching">
  Unlike REST, where calling \`/api/users/1\` might return 50 fields (including their entire purchase history when you just needed their username), GraphQL lets the frontend say: \`query { user(id: 1) { username } }\`. The server returns *exactly* that and nothing more, saving massive amounts of bandwidth.
</Callout>

## The Three Core Operations

<ComparisonTable 
  headers={['Operation', 'Purpose', 'REST Equivalent']}
  rows={[
    ['Query', 'Fetching data (read-only).', 'GET'],
    ['Mutation', 'Modifying data (Create, Update, Delete) and returning the updated data.', 'POST, PUT, PATCH, DELETE'],
    ['Subscription', 'Maintaining a persistent connection (WebSocket) to receive real-time updates when data changes.', 'Webhooks or Server-Sent Events (SSE)']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Client[React Frontend]
  
  subgraph GraphQL Server
    Resolver1[User Resolver]
    Resolver2[Post Resolver]
    Resolver3[Payment Resolver]
  end
  
  DB1[(PostgreSQL)]
  DB2[(MongoDB)]
  API[(Stripe API)]
  
  Client -- "query { user { posts, billing } }" --> GraphQLServer
  Resolver1 --> DB1
  Resolver2 --> DB2
  Resolver3 --> API
\`} />

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.4 API Design/REST/index.mdx': `---
title: REST (Representational State Transfer)
description: A software architectural style that was created to guide the design and development of the architecture for the World Wide Web.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="REST (Representational State Transfer)">

Representational state transfer (REST) is a software architectural style that describes a uniform interface between physically separate components, often across the Internet in a Client-Server architecture.

<Callout icon="info" title="Statelessness">
  The core constraint of REST is that it is **Stateless**. The server must not store any state about the client session on the server-side. Every single request from the client must contain all the information necessary for the server to understand and process the request (like a JWT token).
</Callout>

## HTTP Methods

REST relies heavily on standard HTTP verbs to describe the action being taken on a Resource (a URL).

<ComparisonTable 
  headers={['Method', 'CRUD Operation', 'Idempotent?']}
  rows={[
    ['GET', 'Read a resource', 'Yes (Calling it 100 times has the exact same result as calling it 1 time)'],
    ['POST', 'Create a new resource', 'No (Calling it 100 times creates 100 records)'],
    ['PUT', 'Completely replace a resource', 'Yes'],
    ['PATCH', 'Partially update a resource', 'No'],
    ['DELETE', 'Delete a resource', 'Yes']
  ]}
/>

## REST URL Design Guidelines

1. **Use Nouns, Not Verbs**: \`/users/123\`, not \`/getUserById/123\`
2. **Use Plurals**: \`/users\`, not \`/user\`
3. **Nest Logically**: \`/users/123/posts/456\`

</TechnologyTemplate>
`,
  '13. Computer Networks/13.2 Application-Layer Protocols/WebSockets/index.mdx': `---
title: WebSockets
description: A computer communications protocol, providing full-duplex communication channels over a single TCP connection.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="WebSockets">

WebSocket is a communications protocol providing full-duplex communication channels over a single TCP connection. It enables two-way, ongoing conversation between a web browser and a server.

<Callout icon="tip" title="Overcoming HTTP Limitations">
  HTTP is strictly **unidirectional**: the Client asks a question, the Server answers, and the connection drops. If the Server wants to tell the Client "You have a new message!", it can't. The Client has to constantly ask "Do I have a message?" (Polling). WebSockets solve this by keeping a permanent tunnel open.
</Callout>

## The Handshake

WebSockets actually start their life as a standard HTTP request!

1. The client sends a standard HTTP GET request with the headers \`Upgrade: websocket\` and \`Connection: Upgrade\`.
2. If the server supports WebSockets, it responds with \`HTTP 101 Switching Protocols\`.
3. The HTTP connection is instantly converted into a binary WebSocket connection, and they can send data back and forth infinitely without HTTP overhead.

## Architecture

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: HTTP GET (Upgrade: websocket)
    Server-->>Client: HTTP 101 Switching Protocols
    
    Note over Client,Server: WebSocket Connection Established
    
    Server->>Client: "New notification!"
    Client->>Server: "User typed a message"
    Server->>Client: "Message delivered"
\`} />

</TechnologyTemplate>
`,
  '1. Programming Languages/1.3 Systems - Low-Level/WebAssembly (WASM)/index.mdx': `---
title: WebAssembly (WASM)
description: A binary instruction format for a stack-based virtual machine, designed as a portable compilation target for programming languages.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="WebAssembly (WASM)">

WebAssembly (WASM) is a binary instruction format for a stack-based virtual machine. It is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

<Callout icon="success" title="Near-Native Performance">
  Before WASM, JavaScript was the *only* language that could run in a web browser. With WASM, you can write a video editing engine in C++ or Rust, compile it to a tiny WASM binary, and run it in the browser at near-native CPU speeds. (Figma and AutoCAD Web run on WASM).
</Callout>

## Characteristics

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Format', 'WASM is a binary format (not human readable like JS). It decodes significantly faster than JS can be parsed.'],
    ['Security', 'It executes in a memory-safe, sandboxed execution environment. It cannot access the DOM or the user\\'s hard drive directly.'],
    ['Language Agnostic', 'C, C++, Rust, Go, and C# can all compile directly to WASM.']
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/CDNs/index.mdx': `---
title: Content Delivery Networks (CDN)
description: A geographically distributed network of proxy servers and their data centers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Content Delivery Networks (CDN)">

A content delivery network (CDN) refers to a geographically distributed group of servers which work together to provide fast delivery of Internet content. 

<Callout icon="info" title="The Speed of Light">
  If your server is in New York, and a user is in Tokyo, it takes physically ~200 milliseconds for light (fiber optics) to travel that distance. By placing a CDN server in Tokyo that caches your images and CSS, the user in Tokyo downloads them in 10ms instead.
</Callout>

## Push vs Pull CDNs

<ComparisonTable 
  headers={['Type', 'How it Works', 'Best For']}
  rows={[
    ['Pull CDN', 'The CDN is empty. When a user requests an image, the CDN pulls it from your Origin server, serves it, and caches it for the next user.', 'Small to medium traffic, frequently changing assets.'],
    ['Push CDN', 'You manually upload your files (images, videos) directly to the CDN servers before anyone requests them.', 'Massive traffic, large static files (Netflix video files, software patches).']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Origin[Origin Server (New York)]
  
  subgraph CDN Edge Servers
    EdgeEU[Edge Server (London)]
    EdgeASIA[Edge Server (Tokyo)]
    EdgeUS[Edge Server (LA)]
  end
  
  UserEU((European User))
  UserASIA((Asian User))
  UserUS((California User))
  
  Origin -- Caches Content --> EdgeEU
  Origin -- Caches Content --> EdgeASIA
  Origin -- Caches Content --> EdgeUS
  
  UserEU -- Requests 10ms --> EdgeEU
  UserASIA -- Requests 10ms --> EdgeASIA
  UserUS -- Requests 10ms --> EdgeUS
\`} />

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Load balancing/index.mdx': `---
title: Load Balancing
description: The process of distributing a set of tasks over a set of resources, with the aim of making their overall processing more efficient.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Load Balancing">

Load balancing refers to efficiently distributing incoming network traffic across a group of backend servers, also known as a server farm or server pool.

<Callout icon="tip" title="The Traffic Cop">
  A load balancer sits in front of your servers and routes client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization, ensuring that no one server is overworked (which could degrade performance).
</Callout>

## Common Routing Algorithms

<ComparisonTable 
  headers={['Algorithm', 'Description']}
  rows={[
    ['Round Robin', 'Requests are distributed across the group of servers sequentially (Server 1, then 2, then 3, then 1...).'],
    ['Least Connections', 'A new request is sent to the server with the fewest current connections to clients.'],
    ['IP Hash', 'The IP address of the client is used to determine which server receives the request. (Ensures the same user always hits the same server).']
  ]}
/>

## L4 vs L7 Load Balancing

- **Layer 4 (Transport):** Routes traffic based purely on IP address and TCP port. It doesn't look at the content of the request. Extremely fast.
- **Layer 7 (Application):** Routes traffic based on the actual content of the HTTP request (e.g., if the URL is \`/video\`, route it to the Video Server pool. If \`/api\`, route to API pool). Slower, but much smarter.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Horizontal scaling/index.mdx': `---
title: Horizontal Scaling (Scale-Out)
description: Adding more machines to your pool of resources.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Horizontal Scaling (Scale-Out)">

Horizontal scaling (or scaling out) means that you scale by adding more machines into your pool of resources.

<Callout icon="success" title="Infinite Scalability">
  Unlike Vertical Scaling (which is limited by the maximum size of a single motherboard), Horizontal Scaling is theoretically infinite. You can string together 10,000 cheap, commodity computers to create a supercomputer.
</Callout>

## Pros and Cons

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['No Single Point of Failure (If one server dies, the others take over).', 'Requires a Load Balancer to route traffic.'],
    ['Theoretically infinite scalability.', 'Data consistency becomes very difficult (CAP Theorem).'],
    ['Cheaper (using commodity hardware).', 'Code must be written to be Stateless.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  LoadBalancer[Load Balancer]
  
  S1[Server 1]
  S2[Server 2]
  S3[Server 3]
  S4[Server 4]
  
  LoadBalancer --> S1
  LoadBalancer --> S2
  LoadBalancer --> S3
  LoadBalancer --> S4
\`} />

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Vertical scaling/index.mdx': `---
title: Vertical Scaling (Scale-Up)
description: Adding more power (CPU, RAM) to an existing machine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Vertical Scaling (Scale-Up)">

Vertical scaling (or scaling up) means that you scale by adding more power (CPU, RAM, Storage) to an existing machine.

<Callout icon="warning" title="The Hard Limit">
  Vertical scaling has a hard hardware limit. Eventually, you cannot buy a bigger CPU or fit more RAM into a single server chassis. Furthermore, it retains a Single Point of Failure: if that one massive server crashes, your entire company goes offline.
</Callout>

## Pros and Cons

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['Extremely easy to implement (just slide a slider in AWS).', 'Strict hardware limits.'],
    ['No architectural code changes required.', 'Single Point of Failure.'],
    ['Inter-process communication is instant (all on same motherboard).', 'Downtime is often required to upgrade the hardware.']
  ]}
/>

</TechnologyTemplate>
`,
  '25. Machine Learning/25.1 Core Concepts/Supervised learning/index.mdx': `---
title: Supervised Learning
description: A machine learning paradigm where the model is trained on a labeled dataset.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Supervised Learning">

Supervised learning is the machine learning task of learning a function that maps an input to an output based on example input-output pairs. It infers a function from *labeled* training data consisting of a set of training examples.

<Callout icon="info" title="The Teacher Metaphor">
  It is called "supervised" because the process of an algorithm learning from the training dataset can be thought of as a teacher supervising the learning process. We know the correct answers; the algorithm iteratively makes predictions on the training data and is corrected by the teacher.
</Callout>

## Classification vs Regression

Supervised learning problems can be further grouped into two main categories:

<ComparisonTable 
  headers={['Type', 'Description', 'Example']}
  rows={[
    ['Classification', 'The output variable is a category (discrete).', '"Is this email Spam or Not Spam?"'],
    ['Regression', 'The output variable is a real value (continuous).', '"What will the price of this house be in dollars?"']
  ]}
/>

## Common Algorithms
- Linear Regression
- Logistic Regression
- Support Vector Machines (SVM)
- Random Forests

</TechnologyTemplate>
`,
  '25. Machine Learning/25.1 Core Concepts/Unsupervised learning/index.mdx': `---
title: Unsupervised Learning
description: A machine learning paradigm where the model is trained on an unlabeled dataset.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Unsupervised Learning">

Unsupervised learning is a type of machine learning that looks for previously undetected patterns in a data set with no pre-existing labels and with a minimum of human supervision.

<Callout icon="tip" title="Finding Hidden Structure">
  Unlike Supervised Learning, there are no "correct answers" provided. The algorithm's job is simply to group the data, find anomalies, or compress the data by discovering inherent structures within it.
</Callout>

## Common Use Cases

<ComparisonTable 
  headers={['Type', 'Description', 'Example']}
  rows={[
    ['Clustering', 'Grouping unlabeled data into subsets based on similarity.', 'Customer Segmentation (grouping shoppers by purchasing habits).'],
    ['Anomaly Detection', 'Identifying rare items or events which raise suspicions by differing significantly from the majority of the data.', 'Credit Card Fraud Detection.'],
    ['Dimensionality Reduction', 'Compressing data while retaining its core mathematical essence.', 'Principal Component Analysis (PCA).']
  ]}
/>

## Common Algorithms
- K-Means Clustering
- Hierarchical Clustering
- Autoencoders

</TechnologyTemplate>
`,
}

async function generateMega3() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega3().catch(console.error)
