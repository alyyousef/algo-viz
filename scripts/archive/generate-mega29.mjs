import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices
description: "An architectural style that structures an application as a collection of loosely coupled, independently deployable services."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Microservices Architecture">

Historically, applications were built as **Monoliths**: a single, massive codebase containing all the UI logic, business logic, and database access code, compiled into a single executable and deployed to a single server.

**Microservices** split that massive application into dozens (or hundreds) of small, independent services. Each service represents a specific business capability (e.g., an "Authentication Service", a "Payment Service", an "Inventory Service").

## 1. Monolith vs Microservices

<ComparisonTable 
  headers={['Feature', 'Monolith', 'Microservices']} 
  rows={[
    ['Codebase', 'Single, unified repository.', 'Multiple repositories, one per service.'],
    ['Deployment', 'Deploy the entire application at once.', 'Deploy individual services independently without downtime.'],
    ['Scaling', 'Scale the entire application vertically or horizontally.', 'Scale only the specific services under heavy load (e.g., scale the Payment service 10x on Black Friday, leave the User Profile service alone).'],
    ['Technology Stack', 'Forces a single language and framework across the board.', 'Each service can use the best tool for the job (e.g., Node.js for real-time chat, Python for AI, Go for high-throughput processing).']
  ]} 
/>

## 2. The Trade-offs

Microservices solve scaling and organizational problems (allowing a 500-person engineering team to work without stepping on each other's toes), but they introduce massive operational complexity.

Instead of calling a function in memory (TICK1calculateTax()TICK1), you are now making a network request (HTTP GET over the unpredictable public internet). You must now handle:
- **Network Latency & Timeouts**
- **Distributed Tracing**: Figuring out where a request failed when it touches 7 different services.
- **Eventual Consistency**: You can no longer use simple database ACID transactions across services. You must use complex patterns like Sagas.

<Callout icon="warning" title="The Microservice Premium">
Do not start with microservices. Martin Fowler coined the "Microservice Premium": the baseline overhead of infrastructure (Kubernetes, CI/CD, API Gateways) required to run microservices makes them much slower to build initially than a monolith. Start with a well-structured monolith and extract services only when organizational scaling demands it.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.2 Software Architecture/Event-driven architecture/index.mdx': `---
title: Event-Driven Architecture (EDA)
description: "A software architecture paradigm promoting the production, detection, and reaction to events."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Event-Driven Architecture (EDA)">

In traditional request-response architectures (like REST APIs), Service A actively calls Service B and waits for an answer. This creates **tight coupling**. 

In an **Event-Driven Architecture**, services communicate by emitting and listening to **Events** via a central message broker (like Apache Kafka, RabbitMQ, or AWS EventBridge).

## 1. How It Works
1. **The Producer**: A user completes a checkout. The Checkout Service emits an event: TICK1{"event": "OrderPlaced", "orderId": 123}TICK1 into the message broker. It does not know or care who is listening.
2. **The Broker**: The message broker durably stores the event.
3. **The Consumers**: 
   - The Inventory Service listens for TICK1OrderPlacedTICK1 and deducts stock.
   - The Email Service listens for TICK1OrderPlacedTICK1 and sends a receipt.
   - The Analytics Service listens for TICK1OrderPlacedTICK1 to update the daily dashboard.

## 2. Request-Driven vs Event-Driven

<ComparisonTable 
  headers={['Feature', 'Request-Driven (REST)', 'Event-Driven (Pub/Sub)']} 
  rows={[
    ['Coupling', 'High. The caller must know the IP address and API schema of the receiver.', 'Low. Producers and Consumers are completely decoupled.'],
    ['Failure Handling', 'If the receiver is down, the HTTP request fails immediately (Cascading Failure).', 'If the receiver is down, the broker holds the message. When the receiver boots back up, it processes the backlog.'],
    ['Extensibility', 'Adding a new feature requires modifying the Producer to make a new HTTP call.', 'Adding a new feature is zero-touch. You just spin up a new Consumer listening to the existing event stream.']
  ]} 
/>

<Callout icon="info" title="Event Sourcing">
A more extreme pattern of EDA is **Event Sourcing**. Instead of storing the *current state* of an entity in a database (e.g., TICK1balance: $50TICK1), you store the *entire history of events* that led to that state (TICK1Deposited $100TICK1, TICK1Withdrew $50TICK1). The current state is calculated by replaying the events.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.4 API Design/REST/index.mdx': `---
title: REST (Representational State Transfer)
description: "The architectural style that defines how modern web APIs are designed using standard HTTP methods."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="RESTful APIs">

Coined by Roy Fielding in 2000, **REST (Representational State Transfer)** is a set of architectural constraints for building web APIs. True REST relies entirely on the built-in features of the HTTP protocol.

## 1. Resources and URIs
In REST, everything is a **Resource** (e.g., a User, an Article, a Comment). Resources are identified by standard URLs (URIs). Nouns are used, never verbs.
- ✅ TICK1/users/123TICK1
- ❌ TICK1/getUserById?id=123TICK1 (This is RPC style, not REST)

## 2. HTTP Methods (CRUD)
REST uses standard HTTP methods to map directly to CRUD (Create, Read, Update, Delete) database operations:

<ComparisonTable 
  headers={['HTTP Method', 'CRUD Operation', 'Example URI', 'Description']} 
  rows={[
    ['POST', 'Create', '/users', 'Creates a new user. Not idempotent.'],
    ['GET', 'Read', '/users/123', 'Retrieves user 123. Safe and idempotent (does not modify state).'],
    ['PUT', 'Update', '/users/123', 'Replaces the entire user 123 object. Idempotent.'],
    ['PATCH', 'Update', '/users/123', 'Partially updates user 123 (e.g., only changing the email).'],
    ['DELETE', 'Delete', '/users/123', 'Deletes user 123.']
  ]} 
/>

## 3. Statelessness
A core constraint of REST is that the server must be completely **stateless**. The server cannot store session data (like a logged-in user's state) in its local memory. Every single HTTP request from the client must contain all the information necessary to authenticate and process the request (usually via a JWT in the TICK1AuthorizationTICK1 header). This allows REST APIs to scale horizontally with ease.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.4 API Design/GraphQL/index.mdx': `---
title: GraphQL
description: "A query language for APIs developed by Facebook that allows clients to request exactly the data they need, and nothing more."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="GraphQL">

Created by Facebook in 2012 to optimize data fetching for their mobile apps, **GraphQL** is an alternative to REST. While REST forces the server to define the structure of the response, GraphQL empowers the *client* to dictate exactly what data it wants.

## 1. The Problems with REST
- **Over-fetching**: You hit TICK1/users/123TICK1 to get a user's name, but the REST API returns a massive JSON object with 50 fields (address, preferences, history) that you waste bandwidth downloading.
- **Under-fetching (N+1 Problem)**: To render a blog post page, you hit TICK1/posts/1TICK1. Then you need the author data, so you hit TICK1/users/5TICK1. Then you need the comments, so you hit TICK1/posts/1/commentsTICK1. Rendering one screen required 3 separate HTTP network round-trips.

## 2. The GraphQL Solution
In GraphQL, there is only **one** endpoint (usually TICK1POST /graphqlTICK1). The client sends a query specifying exactly the graph of data it needs in a single request.

${TICK3}graphql
# The Client Query
query {
  post(id: 1) {
    title
    author {
      name
    }
    comments(limit: 2) {
      body
    }
  }
}
${TICK3}

The server responds with a JSON object that exactly matches the shape of the query, solving both over-fetching and under-fetching simultaneously.

## 3. Operations

<ComparisonTable 
  headers={['GraphQL Operation', 'REST Equivalent', 'Purpose']} 
  rows={[
    ['Query', 'GET', 'Fetching data without modifying it.'],
    ['Mutation', 'POST, PUT, DELETE', 'Modifying data on the server and returning the updated result.'],
    ['Subscription', 'WebSockets / SSE', 'Opening a real-time connection to receive live updates when data changes.']
  ]} 
/>

<Callout icon="warning" title="The Trade-off">
GraphQL shifts the complexity from the network to the server. Writing efficient "Resolvers" on the backend to fulfill complex nested GraphQL queries without crushing your SQL database requires advanced techniques like DataLoader to batch database queries.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.4 API Design/gRPC/index.mdx': `---
title: gRPC
description: "A high-performance, open-source Remote Procedure Call (RPC) framework developed by Google."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="gRPC">

While REST and GraphQL are the standards for external APIs (frontend-to-backend), **gRPC** has become the industry standard for internal, backend-to-backend microservice communication.

gRPC is a modern evolution of the classic **RPC (Remote Procedure Call)** model, where a client application directly calls a function on a remote server as if it were a local object.

## 1. Protocol Buffers (Protobuf)
REST uses JSON. JSON is a text-based format that is human-readable but slow to parse and large over the wire.

gRPC uses **Protocol Buffers (Protobuf)**, a strictly typed, binary serialization format. 
1. You define your API schema and data types in a TICK1.protoTICK1 text file.
2. The Protobuf compiler automatically generates the client and server code in 10+ languages (Java, Go, Python, Node.js).
3. The data is serialized into tiny, lightning-fast binary payloads before being sent over the network.

## 2. HTTP/2 by Default
gRPC is built strictly on top of HTTP/2. This provides massive performance benefits over HTTP/1.1 (which REST usually uses):
- **Multiplexing**: Sending multiple requests simultaneously over a single TCP connection.
- **Header Compression**: Reducing bandwidth.
- **Bi-directional Streaming**: The client and server can stream continuous flows of messages back and forth simultaneously.

## 3. gRPC vs REST

<ComparisonTable 
  headers={['Feature', 'REST (JSON)', 'gRPC (Protobuf)']} 
  rows={[
    ['Payload Format', 'Text (JSON) - Slow to parse, large size.', 'Binary - Extremely fast serialization, compact size.'],
    ['Contract / Schema', 'Optional (OpenAPI/Swagger).', 'Strictly enforced by TICK1.protoTICK1 files. Generates SDKs automatically.'],
    ['Transport Protocol', 'Usually HTTP/1.1.', 'Strictly HTTP/2.'],
    ['Best Use Case', 'Public-facing APIs, Browser clients.', 'Internal microservice-to-microservice communication.']
  ]} 
/>

<Callout icon="info" title="Browser Support">
Standard gRPC uses HTTP/2 features that web browsers do not fully expose to JavaScript. Therefore, you cannot easily use gRPC directly from a React frontend without setting up a translation proxy (like **gRPC-Web** or Envoy).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.4 API Design/Webhooks/index.mdx': `---
title: Webhooks
description: "User-defined HTTP callbacks used to enable real-time, event-driven communication between different web services."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Webhooks">

Also known as "Reverse APIs", **Webhooks** are a way for an application to push real-time data to other applications when a specific event occurs.

## 1. Polling vs Webhooks
Imagine you are building an e-commerce app using Stripe for payments. You need to know exactly when a user's credit card charge is approved so you can ship the product.

- **The Bad Way (Polling)**: Your server runs a loop, sending a REST API request to Stripe every 10 seconds: *"Is order 123 paid yet?"*. This wastes immense amounts of bandwidth and CPU on both ends.
- **The Webhook Way (Push)**: You register a URL on your server (e.g., TICK1https://myapp.com/api/webhooks/stripeTICK1) in the Stripe dashboard. When the payment finally succeeds, Stripe makes an HTTP POST request *to your server* containing the payment details.

## 2. Implementing a Webhook Endpoint
Because you are exposing a public URL that expects to receive data, you must handle security carefully. If a malicious user discovers your Stripe webhook URL, they could send fake "Payment Successful" payloads to give themselves free items.

To secure Webhooks, providers (like Stripe, GitHub, Slack) include a cryptographic signature in the HTTP headers (e.g., TICK1Stripe-SignatureTICK1). Your server must use a pre-shared secret key to verify this signature before processing the request.

${TICK3}javascript
// Example Express.js Webhook Handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  try {
    // Cryptographically verify the payload is genuinely from Stripe
    const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    
    if (event.type === 'payment_intent.succeeded') {
       fulfillOrder(event.data.object);
    }
    
    // Always return a 200 OK immediately so Stripe knows you received it
    res.status(200).send();
  } catch (err) {
    res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
});
${TICK3}

<Callout icon="warning" title="Idempotency">
Webhook providers often guarantee "at least once" delivery. If a network glitch occurs, Stripe might send you the exact same "Payment Successful" webhook twice. Your application logic must be **Idempotent**—it must be able to safely handle duplicate webhooks without shipping the product twice.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.3 Design Patterns/Singleton/index.mdx': `---
title: Singleton Pattern
description: "A creational design pattern that restricts the instantiation of a class to one single instance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Singleton Pattern">

The **Singleton** is the most famous (and most controversial) design pattern from the original Gang of Four book. It ensures that a class has only one single instance throughout the entire lifecycle of an application, and provides a global point of access to it.

## 1. The Implementation
To create a Singleton, you must:
1. Make the constructor private (so no one can use the TICK1newTICK1 keyword).
2. Create a static method that acts as a constructor. This method creates the object the first time it is called, saves it in a private static field, and returns that cached instance on all subsequent calls.

${TICK3}typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;

  // 1. Private constructor prevents direct instantiation
  private constructor() {
    console.log("Initializing database connection...");
  }

  // 2. Static access method
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string) {
    // Execute query
  }
}

// Usage:
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true! They point to the exact same object in memory.
${TICK3}

## 2. Common Use Cases
- Managing a single shared Database connection pool.
- Centralized Application Configuration or Logging services.
- Hardware interface access (e.g., you only have one physical printer, so you only want one PrinterSpooler object).

<Callout icon="warning" title="The Anti-Pattern Debate">
Many modern developers consider the Singleton an **Anti-Pattern**. It introduces hidden global state, makes unit testing incredibly difficult (because state bleeds between tests), and tightly couples your code. In modern applications, Singletons are usually replaced by **Dependency Injection** frameworks, which handle the object lifecycle and guarantee a single instance without hardcoding it into the class itself.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.3 Design Patterns/Factory Method/index.mdx': `---
title: Factory Method Pattern
description: "A creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Factory Method Pattern">

When writing clean code, calling the TICK1newTICK1 keyword directly inside your business logic tightly couples your code to specific concrete classes. 

The **Factory Method** solves this by replacing direct object construction calls with calls to a special "factory" method. 

## 1. The Problem
Imagine a logistics application. Initially, it only handles truck delivery.

${TICK3}typescript
class LogisticsApp {
  planDelivery() {
    // Tightly coupled to the concrete Truck class!
    const vehicle = new Truck(); 
    vehicle.deliver();
  }
}
${TICK3}

If the company expands to sea freight, you have to modify the core TICK1planDelivery()TICK1 logic to add complex TICK1if (type === 'sea') return new Ship()TICK1 statements, violating the Open/Closed Principle.

## 2. The Solution
We define a base TICK1LogisticsTICK1 creator class with an abstract TICK1createTransport()TICK1 method. The core business logic interacts only with the abstract TICK1TransportTICK1 interface.

${TICK3}typescript
// 1. The Common Interface
interface Transport {
  deliver(): void;
}

// 2. Concrete Products
class Truck implements Transport {
  deliver() { console.log("Delivering by land in a box."); }
}
class Ship implements Transport {
  deliver() { console.log("Delivering by sea in a container."); }
}

// 3. The Creator (Factory)
abstract class Logistics {
  // The Factory Method
  abstract createTransport(): Transport;

  // Core business logic relies on the interface, not concrete classes
  planDelivery() {
    const transport = this.createTransport();
    transport.deliver();
  }
}

// 4. Concrete Creators
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}
${TICK3}

By isolating the creation logic into specific Factory classes, adding a new transportation method (e.g., TICK1AirLogisticsTICK1 returning a TICK1PlaneTICK1) requires zero changes to the existing business logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.3 Design Patterns/Observer/index.mdx': `---
title: Observer Pattern
description: "A behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Observer Pattern">

The **Observer Pattern** (also known as Pub/Sub) establishes a one-to-many relationship between a **Subject** (the state holder) and multiple **Observers** (the listeners). When the Subject changes state, all registered Observers are automatically notified and updated.

## 1. Real-World Analogy
If you subscribe to a newspaper, you don't go to the printing press every day to ask if the new edition is ready (polling). Instead, the publisher maintains a list of subscribers. When a new edition is printed, they push it directly to your mailbox.

## 2. Implementation
The Subject maintains a list of observer references and provides methods to subscribe and unsubscribe.

${TICK3}typescript
interface Observer {
  update(temperature: number): void;
}

class WeatherStation {
  private observers: Observer[] = [];
  private temperature: number;

  public subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // When state changes, notify everyone!
  public setTemperature(temp: number) {
    this.temperature = temp;
    this.notifyObservers();
  }

  private notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }
}

// Concrete Observers
class PhoneDisplay implements Observer {
  update(temp: number) { console.log(\`Phone updated: \${temp}°C\`); }
}
class WindowDisplay implements Observer {
  update(temp: number) { console.log(\`Window updated: \${temp}°C\`); }
}

// Usage
const station = new WeatherStation();
const phone = new PhoneDisplay();
station.subscribe(phone);
station.subscribe(new WindowDisplay());

// Automatically triggers updates on both displays
station.setTemperature(25); 
${TICK3}

<Callout icon="info" title="Frontend Frameworks">
If you have used React (TICK1useEffectTICK1), Vue, or RxJS, you are using advanced variations of the Observer pattern. The UI components are "Observers" that subscribe to changes in the Application State (the "Subject").
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.1 SDLC & Process/Agile/index.mdx': `---
title: Agile Methodology
description: "An iterative approach to software development emphasizing flexibility, cross-functional collaboration, and continuous delivery of working software."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Agile">

Before 2001, the software industry was dominated by the **Waterfall** methodology: a highly rigid, sequential process where teams spent months writing 500-page requirement documents before a single line of code was written. This resulted in massive projects that took years to launch, only to realize the market's needs had changed entirely.

In 2001, a group of developers met in Utah and published the **Agile Manifesto**, fundamentally shifting how software is built.

## 1. The Agile Manifesto Core Values
1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.

## 2. Iterative Development
Instead of trying to build the entire product in one massive 2-year cycle, Agile teams work in short, iterative cycles (usually 2 to 4 weeks). 

At the end of each cycle, the team must deliver a small, functional, deployable piece of software. This allows them to gather immediate feedback from real users and pivot the direction of the project if necessary.

## 3. Agile vs Waterfall

<ComparisonTable 
  headers={['Feature', 'Waterfall', 'Agile']} 
  rows={[
    ['Planning', 'Upfront, rigid, months-long planning phase.', 'Continuous, adaptive planning at the start of every short iteration.'],
    ['Delivery', 'One massive "Big Bang" release at the very end.', 'Continuous, incremental delivery of small features.'],
    ['Testing', 'Testing happens only at the very end of the project.', 'Testing is continuous and integrated into every sprint.'],
    ['Risk', 'High. You don\\'t know if you built the wrong thing until year 2.', 'Low. If you build the wrong thing, you only wasted 2 weeks.']
  ]} 
/>

Note that "Agile" is a mindset and a set of principles, not a specific step-by-step instruction manual. Frameworks like **Scrum** and **Kanban** are the specific implementations teams use to actually "do" Agile.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering - Process & Architecture/40.1 SDLC & Process/Scrum/index.mdx': `---
title: Scrum
description: "The most popular Agile framework, organizing work into short, time-boxed iterations called Sprints."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Scrum">

**Scrum** is the most widely utilized framework for implementing Agile development. It provides a lightweight structure consisting of specific Roles, Artifacts, and Ceremonies (meetings) designed to help teams deliver value iteratively.

## 1. The Sprints
In Scrum, all work is executed in time-boxed iterations called **Sprints**, typically lasting exactly 2 weeks. At the end of the Sprint, the team must produce a potentially shippable increment of the product. 

Once a Sprint begins, the goal is locked in—management is not allowed to add new surprise tasks to the team's plate mid-sprint.

## 2. The Three Roles

<ComparisonTable 
  headers={['Role', 'Responsibilities']} 
  rows={[
    ['Product Owner', 'Represents the business and the customer. Owns the "What" and the "Why". Prioritizes the backlog.'],
    ['Scrum Master', 'The facilitator. Protects the team from outside interruptions, removes blockers, and ensures Scrum rules are followed.'],
    ['Developers', 'The engineers, designers, and QA who do the actual work. They own the "How" and estimate how much work they can take on.']
  ]} 
/>

## 3. The Ceremonies (Meetings)
Scrum defines four specific meetings to structure the feedback loop:

1. **Sprint Planning**: At the start of the Sprint. The team looks at the prioritized Backlog and agrees on what they can realistically complete in the next 2 weeks.
2. **Daily Stand-up**: A strictly 15-minute daily sync. Each member states: What did I do yesterday? What will I do today? Am I blocked by anything?
3. **Sprint Review (Demo)**: At the end of the Sprint. The team demonstrates the working software they just built to stakeholders.
4. **Sprint Retrospective**: A private team meeting to reflect on the process itself. What went well? What went poorly? How can we improve our workflow next sprint?

<Callout icon="warning" title="Story Points & Velocity">
Scrum teams rarely estimate tasks in "Hours", because humans are terrible at absolute time estimation. Instead, they use **Story Points** (often following the Fibonacci sequence: 1, 2, 3, 5, 8) to estimate the *relative complexity* of a task. The total number of points a team completes in a sprint is their **Velocity**.
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
