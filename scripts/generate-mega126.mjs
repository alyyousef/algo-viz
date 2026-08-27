import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Waterfall/index.mdx': `---
title: Waterfall
description: A traditional, linear, and highly sequential Software Development Life Cycle methodology where each phase of engineering must be mathematically and absolutely completed before the next phase can begin.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Waterfall Methodology"
  subtitle="The Linear Engineering Process"
  tags={['Process', 'SDLC', 'Project Management', 'Legacy']}
>

Before Agile existed, software was built using the Waterfall methodology, heavily borrowed from the construction and aerospace industries. If you are building a physical bridge, you mathematically cannot start pouring concrete (Implementation) until the structural blueprints (Design) are 100% finished.

## 1. The Strict Sequential Phases
In Waterfall, the SDLC phases cascade downwards, and you mathematically cannot flow backward:
1. Requirements (6 months of writing documentation).
2. Design (6 months of drawing UML diagrams).
3. Implementation (1 year of writing code in total isolation).
4. Testing (3 months of QA).
5. Deployment.

## 2. The Mathematical Flaw
Waterfall is highly effective for building NASA space shuttles (where requirements mathematically cannot change). It is a disaster for commercial software.
Because testing and customer feedback only occur at the very end of the 2-year cycle, if the initial requirements were slightly wrong, the mathematical cost to fix the software is astronomical. The team has built a perfectly engineered system that the customer no longer wants. This inflexible risk profile is exactly what led the industry to invent iterative Agile development.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Bounded contexts/index.mdx': `---
title: Bounded Contexts
description: A central architectural pattern in Domain-Driven Design (DDD) that mathematically isolates complex business models by defining strict, explicit boundaries within which a specific domain term has a singular, unambiguous meaning.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bounded Contexts"
  subtitle="Mathematical Domain Isolation"
  tags={['Architecture', 'DDD', 'Microservices', 'Design Patterns']}
>

In a massive enterprise system, trying to define a single, universal TICK1UserTICK1 or TICK1ProductTICK1 class is a catastrophic mathematical mistake that leads to "God Classes."

## 1. The Semantic Ambiguity
To the "Shipping" department, a "Product" is mathematically defined by its physical weight and physical dimensions. 
To the "Sales" department, a "Product" is mathematically defined by its price, discount tier, and marketing description. Sales does not care about physical weight. 
If you try to combine these into a single TICK1ProductTICK1 class, you create a massive, fragile entity that violates the Single Responsibility Principle.

## 2. The Context Boundary
Domain-Driven Design (DDD) solves this via **Bounded Contexts**.
The architect mathematically splits the system. The "Shipping Context" has its own completely isolated TICK1Shipping.ProductTICK1 class and its own isolated database table. The "Sales Context" has its own TICK1Sales.ProductTICK1 class. The word "Product" means something completely different depending on which Bounded Context you are currently inside. 
When translating this to modern infrastructure, Bounded Contexts form the exact mathematical boundary lines for creating Microservices.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Clean architecture/index.mdx': `---
title: Clean Architecture
description: A software architectural philosophy created by "Uncle Bob" Martin that mathematically decouples the core business logic from external frameworks, databases, and user interfaces using a strict dependency rule.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Clean Architecture"
  subtitle="The Framework-Agnostic Core"
  tags={['Architecture', 'Design Patterns', 'SOLID', 'Clean Code']}
>

In a standard web application, developers often write SQL database queries directly inside the HTTP routing controller. This mathematically binds the business logic to both the Web Framework (Spring/Express) and the Database (MySQL).

## 1. The Concentric Circles
Clean Architecture visualizes the system as mathematical concentric circles:
- **Entities (Center)**: Pure business rules (e.g., calculating interest on a loan). Mathematically ignorant of everything else.
- **Use Cases**: Application-specific rules (e.g., "Transfer Money").
- **Interface Adapters**: Controllers and Presenters.
- **Frameworks & Drivers (Outer)**: The Database, the UI, the Web Framework.

## 2. The Dependency Rule
The single most important mathematical rule of Clean Architecture is the **Dependency Rule**: *Source code dependencies must only point inward, toward higher-level policies.*
An Entity (inner circle) mathematically cannot import or know about a Database (outer circle). 
To make this work, the architect relies heavily on the **Dependency Inversion Principle (DIP)**. The Use Case defines an interface (e.g., TICK1IUserRepositoryTICK1). The outer Database layer implements that interface. The core business logic remains perfectly mathematically isolated, meaning you can swap the UI from a Web App to a CLI, and swap the database from MySQL to Mongo, without touching a single line of business logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Client-server/index.mdx': `---
title: Client-Server Architecture
description: The foundational distributed computing model where mathematical workloads are strictly partitioned between a centralized resource provider (the Server) and a distributed service requester (the Client).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Client-Server Architecture"
  subtitle="The Foundation of the Web"
  tags={['Architecture', 'Networking', 'Distributed Systems', 'Fundamentals']}
>

Before Client-Server, systems used a Mainframe architecture, where dumb terminals merely displayed pixels while the central mainframe performed 100% of the mathematical processing. 

## 1. The Separation of Concerns
Client-Server architecture mathematically divides the labor:
- **The Client (e.g., a Web Browser, an iOS App)**: Responsible for the UI, accepting user input, and performing lightweight presentation mathematics (like rendering CSS or validating that an email has an '@' symbol).
- **The Server (e.g., an AWS EC2 instance)**: Responsible for heavy mathematical computation, accessing the central database, and enforcing strict security authorization rules.

## 2. The Stateless Contract
In modern web architecture (REST), the communication between Client and Server is mathematically **stateless**.
When a Client makes an HTTP request, the Server mathematically forgets the Client exists the moment it sends the response. This statelessness allows the Server to handle requests from 10,000 different Clients simultaneously without mathematically blowing up its RAM trying to remember who is who. If the Client needs the Server to remember them, the Client must mathematically send a Token (like a JWT or Session Cookie) with every single request.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/CQRS/index.mdx': `---
title: CQRS (Command Query Responsibility Segregation)
description: An advanced architectural pattern that mathematically separates the data mutation operations (Commands) from the data retrieval operations (Queries) into completely distinct, independent software and database models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="CQRS"
  subtitle="Segregating Reads from Writes"
  tags={['Architecture', 'Design Patterns', 'Databases', 'Scaling']}
>

In a standard CRUD (Create, Read, Update, Delete) application, both the Read operations and the Write operations mathematically hit the exact same database table using the exact same Object-Oriented Entity class.

## 1. The Asymmetrical Workload
In high-scale systems (like Twitter), the mathematical workload is wildly asymmetrical. The system might execute 10,000 Reads for every 1 Write. 
If you use the same database for both, the heavy Write operations will lock tables, mathematically destroying the latency of the Read operations. Furthermore, the data structure optimized for fast Writes (Normalized SQL) is mathematically terrible for fast Reads.

## 2. The CQRS Split
CQRS (Command Query Responsibility Segregation) splits the architecture in half:
- **The Command Side (Writes)**: Accepts input, executes complex business logic, and writes to a highly normalized PostgreSQL database.
- **The Query Side (Reads)**: Uses a completely different class structure to read from a mathematically denormalized, flattened database (like Elasticsearch or Redis) optimized purely for instant UI rendering.
An asynchronous message bus (like Kafka) listens to the Command Side. When a Write occurs, it mathematically synchronizes the data to the Query Side in the background, achieving massive scalability at the cost of Eventual Consistency.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Domain-driven design (DDD)/index.mdx': `---
title: Domain-Driven Design (DDD)
description: A holistic software engineering philosophy introduced by Eric Evans that mathematically centers the entire architecture, naming conventions, and code structure around the core business domain and its complex logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Domain-Driven Design (DDD)"
  subtitle="Modeling Software on Business Reality"
  tags={['Architecture', 'Design Patterns', 'Methodology', 'Enterprise']}
>

Software often fails because engineers write code using highly technical mathematical language (e.g., TICK1updateUserRow()TICK1), while the business experts talk in domain language (e.g., *"Promote the user to a Premium Subscriber"*). The translation between the two mathematically guarantees bugs.

## 1. The Ubiquitous Language
DDD solves this by forcing the creation of a **Ubiquitous Language**.
Engineers and Business Experts must agree on a strict dictionary of terms. If the business calls it a "Subscriber," the engineers are mathematically forbidden from naming the database table TICK1usersTICK1. The code must perfectly reflect the business language. The method must be TICK1subscriber.promoteToPremium()TICK1, not TICK1user.setStatus(1)TICK1.

## 2. Tactical Patterns
To implement this cleanly, DDD provides strict mathematical architectural patterns:
- **Entities**: Objects that have a distinct identity (e.g., a TICK1UserTICK1 with an ID).
- **Value Objects**: Immutable objects defined only by their attributes (e.g., a TICK1MoneyTICK1 object with amount and currency; if you change the amount, it is mathematically a new object).
- **Aggregates**: A cluster of domain objects treated as a single mathematical unit for data changes, protecting absolute transactional consistency (e.g., an TICK1OrderTICK1 aggregate mathematically protects its TICK1OrderLineItemsTICK1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Event sourcing/index.mdx': `---
title: Event Sourcing
description: A radically different data architecture where the current state of a system is not stored in a database row, but is instead mathematically calculated dynamically by replaying an immutable append-only log of every state-changing event.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Event Sourcing"
  subtitle="The Immutable Ledger of State"
  tags={['Architecture', 'Databases', 'Design Patterns', 'Data']}
>

In a standard SQL database, if a user changes their name from "Alice" to "Bob", you execute an TICK1UPDATETICK1 statement. The data "Alice" is mathematically destroyed forever. You have lost historical context.

## 1. The Append-Only Ledger
Event Sourcing (often used heavily in banking and accounting) forbids TICK1UPDATETICK1 and TICK1DELETETICK1 operations.
Instead, the database is an immutable, append-only log of mathematical **Events**:
1. TICK1UserCreated(id: 1, name: "Alice")TICK1
2. TICK1UserNameChanged(id: 1, name: "Bob")TICK1

## 2. Rehydrating State
To find out the user's current name, the application does not query a "Users" table. 
The application queries the Event Store, pulls every event that ever happened to ID 1, and mathematically executes a left-fold (a **Reduce** function). It replays history from the beginning of time. It sees "Alice", then applies "Bob". The final, dynamically calculated state is "Bob".
Because the raw mathematical events are never destroyed, developers get perfect auditing, and the ability to "time travel" the database by mathematically replaying events up to a specific timestamp.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Event-driven architecture/index.mdx': `---
title: Event-Driven Architecture (EDA)
description: A distributed architectural pattern where system components mathematically decouple by communicating exclusively through the asynchronous production, detection, and consumption of state-change events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Event-Driven Architecture (EDA)"
  subtitle="Asynchronous System Decoupling"
  tags={['Architecture', 'Distributed Systems', 'Microservices', 'Messaging']}
>

In a synchronous Request-Response architecture (like REST), if the "Order Service" needs to tell the "Shipping Service" to ship a package, it makes an HTTP call. If the Shipping Service is offline, the Order Service mathematically crashes.

## 1. The Event Broker
Event-Driven Architecture (EDA) breaks this mathematical coupling.
When an order is placed, the Order Service does not call the Shipping Service. Instead, it emits a mathematical fact (an Event) to a central **Event Broker** (like Apache Kafka or RabbitMQ): TICK1{ type: "OrderPlaced", id: 123 }TICK1.
The Order Service's job is mathematically complete. It does not care who is listening.

## 2. Asynchronous Consumption
The Shipping Service, the Analytics Service, and the Billing Service are all mathematically subscribed to the Broker.
They consume the TICK1OrderPlacedTICK1 event asynchronously. If the Shipping Service is offline, Kafka mathematically holds the event safely on disk. When the Shipping Service boots back up, it pulls the event and processes it. EDA provides ultimate mathematical resilience, as the producer and the consumers are totally isolated in both time and space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Hexagonal architecture/index.mdx': `---
title: Hexagonal Architecture
description: Also known as "Ports and Adapters," an architectural pattern designed by Alistair Cockburn that mathematically isolates core domain logic from external agents by routing all input and output through strict interface contracts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Hexagonal Architecture (Ports & Adapters)"
  subtitle="Isolating the Core Domain"
  tags={['Architecture', 'Design Patterns', 'Clean Code', 'DDD']}
>

Hexagonal Architecture is the mathematical predecessor to (and largely synonymous with) Clean Architecture. It solves the exact same problem: preventing external UI and Database code from bleeding into pure business logic.

## 1. The Core and the Ports
At the center of the hexagon is the pure mathematical domain logic (e.g., Java code that calculates interest rates). This code has zero dependencies.
To communicate with the outside world, the core defines **Ports** (which are mathematically just Interfaces in Java/C#).
- A **Driving Port** defines how the outside world can send commands *into* the core (e.g., an TICK1IOrderServiceTICK1 interface).
- A **Driven Port** defines how the core asks the outside world for data (e.g., an TICK1IOrderRepositoryTICK1 interface).

## 2. The Adapters
The outside edge of the hexagon consists of **Adapters**.
An HTTP REST Controller is a Driving Adapter; it parses JSON and mathematically calls the Driving Port. 
A PostgreSQL class is a Driven Adapter; it implements the Driven Port interface and executes SQL. Because the Core mathematically only knows about Ports, you can swap the REST Adapter for a gRPC Adapter, or the PostgreSQL Adapter for a MongoDB Adapter, without changing a single line of the core domain logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Layered architecture/index.mdx': `---
title: Layered Architecture
description: The most traditional and widely used software architectural pattern, mathematically organizing code into distinct horizontal tiers (Presentation, Business, Data) to enforce a strict separation of concerns.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Layered Architecture (N-Tier)"
  subtitle="The Horizontal Stack"
  tags={['Architecture', 'Design Patterns', 'Enterprise', 'Fundamentals']}
>

Also known as N-Tier architecture, this is the default architectural pattern for almost all standard enterprise monolithic applications (like Ruby on Rails or Spring Boot).

## 1. The Mathematical Tiers
The application is physically and logically partitioned into horizontal layers:
1. **Presentation Layer (UI/Controllers)**: Handles HTTP requests, HTML rendering, or JSON serialization.
2. **Business Logic Layer (Services)**: Contains the core mathematical rules (e.g., "A user cannot withdraw more money than their balance").
3. **Data Access Layer (Repositories/DAOs)**: Handles the raw SQL translation and TCP communication with the database.
4. **Database Layer**: The actual physical SQL server.

## 2. The Strict Dependency Rule
The defining mathematical characteristic of Layered Architecture is the flow of dependency: **A layer can only depend on the layer immediately below it.**
The Presentation Layer can call the Business Layer, but it is mathematically forbidden from calling the Data Access Layer directly. This strict separation of concerns ensures that a developer can completely rewrite the UI (Presentation) without accidentally breaking the database queries (Data Access).

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
