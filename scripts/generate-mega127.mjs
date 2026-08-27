import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices
description: A distributed architectural style that structures an application as a collection of mathematically isolated, independently deployable, and loosely coupled services organized around specific business capabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Microservices Architecture"
  subtitle="Mathematical Decentralization"
  tags={['Architecture', 'Microservices', 'Distributed Systems', 'Cloud']}
>

In a Monolith, if the "PDF Generation" module mathematically consumes 100% of the CPU, the entire application (including the "Login" module) crashes, because they share the same physical RAM.

## 1. Absolute Isolation
Microservices solve this by physically and mathematically fracturing the Monolith.
The PDF Generator becomes its own distinct application, running in its own Docker container, with its own dedicated Database, scaling independently on AWS. The Login system is completely separate. If PDF generation crashes or gets hit by a DDoS attack, the Login system is mathematically unaffected.

## 2. The Cost of Distributed Computing
While Microservices provide ultimate scalability and team autonomy, they introduce massive mathematical complexity known as the **Fallacies of Distributed Computing**.
Because the services are physically separated, they must communicate over a network (TCP/HTTP/gRPC) instead of a simple memory pointer.
- Network calls can fail (requiring Retries and Circuit Breakers).
- Transactions cannot easily span multiple databases (requiring complex distributed Saga patterns instead of simple ACID SQL transactions).
- Debugging requires distributed tracing (like Jaeger) instead of a simple local stack trace.
Microservices are mathematically an organizational scaling tool, not a default starting point.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Modular monolith/index.mdx': `---
title: Modular Monolith
description: A pragmatic architectural pattern that provides the strict mathematical boundaries and clean separation of concerns of Microservices, while maintaining the deployment simplicity and transactional safety of a single Monolith.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Modular Monolith"
  subtitle="The Best of Both Worlds"
  tags={['Architecture', 'Monolith', 'Design Patterns', 'Enterprise']}
>

Many companies switch to Microservices too early, instantly crushing their engineering velocity under the mathematical weight of Kubernetes, network latency, and distributed transactions.

## 1. Strict Logical Boundaries
A Modular Monolith solves the "Spaghetti Code" problem without leaving a single server.
Instead of one massive codebase where any class can mathematically call any other class, the Monolith is strictly divided into **Modules** (e.g., TICK1BillingModuleTICK1, TICK1ShippingModuleTICK1).
The compiler is configured (via Java Modules or TypeScript strict boundaries) to mathematically forbid the Shipping Module from importing a class from the Billing Module. They must communicate through strict, explicitly defined internal API interfaces, exactly as they would in Microservices.

## 2. The Refactoring Pivot
Because the mathematical boundaries are already perfectly enforced by the compiler, if the TICK1BillingModuleTICK1 eventually needs to scale independently, an engineer can easily highlight the folder, cut it, paste it into a new repository, and instantly deploy it as a Microservice. The Modular Monolith is the perfect architectural stepping stone.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Monolith/index.mdx': `---
title: Monolith
description: A unified software architecture where all functional components (UI, business logic, and database access) are mathematically compiled, packaged, and deployed as a single, indivisible executable unit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Monolithic Architecture"
  subtitle="The Unified Executable"
  tags={['Architecture', 'Deployment', 'Monolith', 'Legacy']}
>

Despite the modern hype around Microservices, the Monolith remains the mathematically correct architectural choice for 90% of new software projects, providing unmatched development speed and simplicity.

## 1. The Power of Shared Memory
In a Monolith, the "Order" logic and the "Shipping" logic live in the exact same physical RAM space.
When the Order code calls the Shipping code, it takes exactly **one CPU instruction** (a memory pointer jump). In a Microservice, that same call requires serializing JSON, executing a TCP handshake, sending data over a fiber-optic cable, and deserializing on the other end, introducing mathematically massive latency and a 10% chance of network failure. 

## 2. The Big Ball of Mud
The danger of a Monolith is not performance; it is architectural entropy.
Because everything shares the same memory space, lazy developers will bypass proper interfaces and write "Spaghetti Code" where the UI mathematically modifies the database directly. Over 5 years, the Monolith degenerates into a "Big Ball of Mud," where changing a button color accidentally breaks the payroll calculation. This is solved by discipline (Layered Architecture or Modular Monoliths), not necessarily by Microservices.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/MVC/index.mdx': `---
title: MVC (Model-View-Controller)
description: A foundational architectural pattern for user interfaces that mathematically divides an application into three interconnected parts, separating internal representations of information from the ways information is presented to the user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="MVC (Model-View-Controller)"
  subtitle="The Trinity of UI Architecture"
  tags={['Architecture', 'Design Patterns', 'UI', 'Web']}
>

Invented in the 1970s for desktop applications, MVC became the mathematically dominant architecture for early web frameworks (Ruby on Rails, Django, ASP.NET MVC).

## 1. The Three Pillars
MVC strictly separates concerns:
- **Model**: The pure mathematical data and business rules (e.g., a TICK1UserTICK1 class that knows how to save itself to SQL). It is completely ignorant of the UI.
- **View**: The visual representation (e.g., an HTML/CSS template). It is mathematically dumb; it just displays whatever variables it is handed.
- **Controller**: The brain. It intercepts user input (an HTTP POST request), asks the Model to update its state, and then mathematically passes the new Model to the View to be rendered.

## 2. Preventing Tightly Coupled UI
Before MVC, developers wrote "Server Pages" (like early PHP or ASP) where raw SQL queries, business logic TICK1if/elseTICK1 statements, and HTML TICK1<div>TICK1 tags were mathematically scrambled together in a single file. MVC mathematically forces the developer to extract the SQL into the Model, the HTML into the View, and the routing into the Controller, allowing designers to edit the HTML without mathematically destroying the database queries.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/MVP/index.mdx': `---
title: MVP (Model-View-Presenter)
description: A derivative of the MVC architectural pattern used primarily for building heavy desktop or mobile user interfaces, mathematically designed to facilitate automated unit testing of presentation logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="MVP (Model-View-Presenter)"
  subtitle="Testable UI Architecture"
  tags={['Architecture', 'Design Patterns', 'UI', 'Mobile']}
>

In classic MVC, the View is often tightly coupled to the Controller or the Model, making it mathematically impossible to write automated Unit Tests for the UI logic without spinning up a real, physical screen.

## 1. The Passive View
MVP solves this by making the View mathematically "Passive."
The View (the physical screen) implements a strict Interface (e.g., TICK1ILoginViewTICK1 with methods like TICK1showSpinner()TICK1 and TICK1showError()TICK1). The View has absolutely zero business logic; it merely listens for physical button clicks and immediately passes them to the **Presenter**.

## 2. The Dominant Presenter
The Presenter is a pure mathematical class with no dependencies on the Android SDK or Windows GUI libraries. 
When the user clicks "Login", the View tells the Presenter. The Presenter checks the Model. If the password fails, the Presenter executes TICK1view.showError()TICK1.
Because the Presenter only knows about the TICK1ILoginViewTICK1 interface, an engineer can mathematically write a Unit Test that passes in a "Mock View" and verifies the Presenter's logic in 2 milliseconds, without ever rendering a real pixel.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/MVVM/index.mdx': `---
title: MVVM (Model-View-ViewModel)
description: A modern UI architectural pattern created by Microsoft that utilizes declarative mathematical data-binding to automatically synchronize the View and the ViewModel, eliminating the need for manual UI update code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="MVVM (Model-View-ViewModel)"
  subtitle="The Data-Binding Revolution"
  tags={['Architecture', 'UI', 'Frontend', 'Design Patterns']}
>

In MVC and MVP, the Controller/Presenter must explicitly write mathematical code to update the UI (e.g., TICK1document.getElementById("name").innerText = user.nameTICK1). As UIs become complex, this imperative DOM-manipulation code becomes unmaintainable.

## 1. The ViewModel
The **ViewModel** is a pure mathematical representation of the View's state. If the screen has a text box and a checkbox, the ViewModel is a class with a TICK1StringTICK1 and a TICK1BooleanTICK1.

## 2. Two-Way Data Binding
The defining mathematical feature of MVVM is the **Binder** (the engine).
The developer declaratively binds the HTML text box to the ViewModel's String variable. 
If the user types in the text box on the screen, the Binder mathematically updates the String variable in RAM instantly.
If the background thread updates the String variable in RAM, the Binder mathematically updates the pixels on the screen instantly.
The developer never writes code to update the UI; they strictly mutate the mathematical ViewModel, and the framework handles the rendering. (This is the underlying architectural theory behind React, Vue, and Angular).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Onion architecture/index.mdx': `---
title: Onion Architecture
description: An architectural pattern formulated by Jeffrey Palermo that mathematically enforces the Dependency Inversion Principle, structuring the application in concentric layers where all dependencies strictly flow toward the domain core.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Onion Architecture"
  subtitle="Dependency Inversion at Scale"
  tags={['Architecture', 'Clean Code', 'SOLID', 'Design Patterns']}
>

Onion Architecture is conceptually identical to Clean Architecture and Hexagonal Architecture. It was designed to mathematically eliminate the fatal flaw of traditional Layered Architecture.

## 1. The Flaw in Layered Architecture
In traditional Layered Architecture, the Business Logic layer depends on the Database layer. This means if the Database layer changes, the Business Logic mathematically breaks. The most important code (the business rules) is at the mercy of the least important code (the SQL infrastructure).

## 2. Inverting the Onion
Onion Architecture mathematically flips this.
The core of the Onion contains the Domain Entities (pure business logic with zero dependencies).
The next layer contains Domain Services (Interfaces).
The outermost layer contains the UI, the Tests, and the Database infrastructure.
Because dependencies can only point inward, the Database layer now mathematically depends on the Core Interfaces. The Core is totally ignorant of the Database, allowing the business logic to remain perfectly insulated from external technological changes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Peer-to-peer/index.mdx': `---
title: Peer-to-Peer (P2P) Architecture
description: A decentralized network architecture where mathematical workloads are partitioned among equally privileged, equipotent peers, eliminating the need for a central server to coordinate or store data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Peer-to-Peer (P2P) Architecture"
  subtitle="Mathematical Decentralization"
  tags={['Architecture', 'Networking', 'Distributed Systems', 'Blockchain']}
>

In a Client-Server architecture, if the central server is destroyed or goes offline, 100% of the clients instantly lose mathematical functionality. It is a single point of failure.

## 1. The Distributed Mesh
In a Peer-to-Peer network (like BitTorrent or Bitcoin), there is no central server.
Every node (laptop, phone) on the network is mathematically both a Client and a Server simultaneously. When Node A wants a file, it does not ask a central server; it asks Node B, Node C, and Node D for mathematical fragments of the file. As Node A downloads the fragments, it instantly begins serving those fragments to Node E.

## 2. Unstoppable Resilience
P2P mathematically provides absolute resilience and infinite scalability. The more users that join the network, the more Server capacity the network mathematically possesses. To destroy a Client-Server network, you simply unplug the main server. To destroy a true P2P network, you must physically unplug every single participating laptop on Earth simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Plug-in architecture/index.mdx': `---
title: Plug-in Architecture
description: An extensible architectural pattern where a core system is mathematically designed to allow external, uncompiled modules (plugins) to be dynamically loaded at runtime to add new features without altering the core executable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Plug-in Architecture"
  subtitle="Runtime Mathematical Extension"
  tags={['Architecture', 'Extensibility', 'Design Patterns', 'Microkernel']}
>

Also known as the **Microkernel Architecture**, this pattern is used by systems like VS Code, Eclipse, or web browsers, where the creators cannot mathematically anticipate every feature the users will ever want.

## 1. The Core System
The core application (the Microkernel) contains only the absolute minimum mathematical logic required to run (e.g., rendering a blank window and managing memory). It also publishes a strict, mathematically defined **Extension API** (a set of interfaces).

## 2. Dynamic Loading
A third-party developer writes a Plugin (a separate DLL or JS file) that conforms perfectly to the Extension API. 
When the user installs the Plugin, the core system uses Reflection or dynamic linking to mathematically load the new code into RAM while the application is running. This perfectly fulfills the Open-Closed Principle: the core system is completely closed to modification, but infinitely open to extension by anyone in the world.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Serverless architecture/index.mdx': `---
title: Serverless Architecture
description: A cloud-native execution model where the cloud provider mathematically manages the dynamic allocation and provisioning of servers, allowing developers to write and deploy code without ever configuring physical or virtual infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Serverless Architecture"
  subtitle="Ephemeral Compute and Pure Code"
  tags={['Architecture', 'Cloud', 'AWS', 'Microservices']}
>

In a standard cloud deployment (like AWS EC2), you rent a virtual server. Even if no users visit your website at 3:00 AM, the server mathematically sits there, burning electricity and costing you money.

## 1. Function as a Service (FaaS)
Serverless (like AWS Lambda) eliminates the idle server.
You upload a raw zip file containing a single Python function. There are no servers running.
When a user clicks a button on the UI, AWS mathematically intercepts the HTTP request, instantly spins up an ephemeral Micro-VM, executes your Python function, returns the result, and instantly destroys the VM. You are billed mathematically by the millisecond of execution time. At 3:00 AM, your cost is exactly $0.00.

## 2. Infinite Scaling
If a system goes viral and receives 10,000 concurrent requests, a traditional server mathematically crashes. In Serverless, AWS instantly spins up 10,000 independent, parallel VMs. The architecture mathematically scales from zero to infinity automatically, forcing engineers to adopt highly stateless, event-driven designs.

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
