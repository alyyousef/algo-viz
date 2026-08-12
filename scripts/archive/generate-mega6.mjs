import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '40. Software Engineering - Process & Architecture/40.5 Coding Quality/SOLID/index.mdx': `---
title: SOLID Principles
description: Five design principles intended to make software designs more understandable, flexible, and maintainable.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SOLID Principles">

In software engineering, SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable. Promoted by Robert C. Martin (Uncle Bob), they form the core philosophy of object-oriented design.

<Callout icon="info" title="Why use SOLID?">
  Without these principles, codebases often rot into a "Big Ball of Mud", where changing one line of code in the User class inexplicably breaks the Billing system. SOLID enforces strict decoupling.
</Callout>

## The Five Principles

<ComparisonTable 
  headers={['Letter', 'Principle', 'Meaning']}
  rows={[
    ['S', 'Single Responsibility (SRP)', 'A class should have one, and only one, reason to change. (A User class should not handle database connections).'],
    ['O', 'Open-Closed (OCP)', 'Software entities should be open for extension, but closed for modification. (Add new features by writing new classes, not editing existing ones).'],
    ['L', 'Liskov Substitution (LSP)', 'If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering the correctness of the program.'],
    ['I', 'Interface Segregation (ISP)', 'Clients should not be forced to depend on interfaces they do not use. (Don\\'t put \`fly()\` and \`swim()\` in an \`IAnimal\` interface if a Dog class has to implement it).'],
    ['D', 'Dependency Inversion (DIP)', 'High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).']
  ]}
/>

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.3 Design Patterns/Singleton/index.mdx': `---
title: Singleton Pattern
description: A creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Singleton Pattern">

The Singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system.

<Callout icon="warning" title="The Anti-Pattern Debate">
  Many modern developers consider the Singleton an anti-pattern. It is essentially a glorified Global Variable, which makes unit testing extremely difficult because tests can bleed state into each other through the shared Singleton. Modern Dependency Injection (DI) is preferred.
</Callout>

## Common Use Cases

<ComparisonTable 
  headers={['Use Case', 'Why Singleton?']}
  rows={[
    ['Database Connections', 'Opening a connection to PostgreSQL is extremely slow. A Singleton ensures you open it exactly once, and all classes share that one open pipe.'],
    ['Logging Services', 'You want a single file lock on the \`server.log\` file, and you want any class anywhere to be able to call \`Logger.info()\`.'],
    ['Hardware Interfaces', 'If you have a robot arm, you only want one class controlling it. If two instances tried to send instructions to the arm simultaneously, it would crash.']
  ]}
/>

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.3 Design Patterns/Factory Method/index.mdx': `---
title: Factory Method Pattern
description: A creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Factory Method Pattern">

The Factory Method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created.

<Callout icon="tip" title="Decoupling Creation">
  Instead of using \`new Car()\`, you call \`VehicleFactory.create("car")\`. This means if you later want to change the underlying implementation to a \`FastCar\`, you only have to change the factory, not the 100 places in your code that called \`new\`.
</Callout>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Client[Client Code]
  Factory[VehicleFactory]
  
  subgraph Products
    Car[Car]
    Truck[Truck]
    Bike[Bike]
  end
  
  Client -- "create('truck')" --> Factory
  Factory -. Instantiates .-> Truck
  Truck -. Returns Instance .-> Client
\`} />

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.3 Design Patterns/Observer/index.mdx': `---
title: Observer Pattern
description: A behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Observer Pattern">

The Observer pattern is a software design pattern in which an object, named the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

<Callout icon="success" title="The Core of UI Frameworks">
  This is the exact pattern that powers React, Vue, and Angular reactivity. When the internal state (Subject) changes, it immediately fires an event to the UI components (Observers) to re-render themselves.
</Callout>

## Mechanism

<ComparisonTable 
  headers={['Component', 'Role']}
  rows={[
    ['Subject (Publisher)', 'Holds the main state. It has \`subscribe(observer)\` and \`unsubscribe(observer)\` methods.'],
    ['Observer (Subscriber)', 'Implements an \`update()\` method. When the Subject changes, it loops through its array of Observers and calls \`update()\` on all of them.']
  ]}
/>

</TechnologyTemplate>
`,
  '37. Containers & Kubernetes/Docker/index.mdx': `---
title: Docker
description: A set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Docker">

Docker is a platform for developers and sysadmins to build, run, and share applications with containers. The use of containers to deploy applications is called containerization. Containers are not new, but their use for easily deploying applications was heavily popularized by Docker.

<Callout icon="info" title="Containers vs Virtual Machines">
  A Virtual Machine includes the App, the Binaries, AND a massive 10GB Guest Operating System (Windows/Ubuntu).
  
  A Docker Container shares the host machine's OS kernel. It only includes the App and its exact dependencies. It boots in 50 milliseconds and is usually under 100MB.
</Callout>

## Key Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Dockerfile', 'A simple text file containing the instructions to build a Docker Image. (e.g., \`FROM node:18\`, \`COPY . .\`)'],
    ['Image', 'A read-only, frozen snapshot of your application and its dependencies. It is the blueprint.'],
    ['Container', 'A running instance of an Image. You can run 50 identical containers from 1 Image.'],
    ['Docker Hub', 'The public registry where developers upload and download pre-built images (like npm, but for entire operating environments).']
  ]}
/>

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Kubernetes/index.mdx': `---
title: Kubernetes (K8s)
description: An open-source container orchestration system for automating software deployment, scaling, and management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Kubernetes (K8s)">

Kubernetes (commonly stylized as K8s) is an open-source container orchestration system for automating software deployment, scaling, and management. Originally designed by Google, the project is now maintained by the Cloud Native Computing Foundation.

<Callout icon="tip" title="Why K8s?">
  Docker is great for running 1 container on your laptop. But if you have 5,000 containers running across 100 servers in AWS, and 3 servers catch on fire, how do you automatically restart those containers on the surviving servers? That is what Kubernetes does.
</Callout>

## Core Architecture

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['Control Plane (Master)', 'The brain. It makes global decisions (scheduling, detecting crashes, scaling up).'],
    ['Kubelet (Worker Node)', 'An agent that runs on every physical server. It listens to the Master and ensures the containers on its specific machine are healthy.'],
    ['Pod', 'The smallest deployable unit in Kubernetes. A Pod usually contains exactly 1 Docker container.'],
    ['Deployment', 'A declarative file (YAML) where you tell K8s: "I always want exactly 5 replicas of my web app running." K8s makes it happen.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Master[Control Plane / Master Node]
  
  subgraph Worker Node 1
    Kubelet1[Kubelet]
    Pod1(Pod - Web App)
    Pod2(Pod - Web App)
  end
  
  subgraph Worker Node 2
    Kubelet2[Kubelet]
    Pod3(Pod - Web App)
    Pod4(Pod - Database)
  end
  
  Master --> Kubelet1
  Master --> Kubelet2
\`} />

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.1 SDLC & Process/Agile/index.mdx': `---
title: Agile Software Development
description: An iterative approach to project management and software development that helps teams deliver value to their customers faster and with fewer headaches.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Agile Software Development">

Agile software development comprises various approaches to software development under which requirements and solutions evolve through the collaborative effort of self-organizing and cross-functional teams and their customer(s)/end user(s).

<Callout icon="warning" title="Agile vs Waterfall">
  **Waterfall**: Spend 6 months writing a 500-page design document. Spend 1 year coding it. Release it. Realize the customer changed their mind 14 months ago.
  
  **Agile**: Build a tiny, ugly version in 2 weeks. Show the customer. Get feedback. Make it slightly better in the next 2 weeks. Repeat.
</Callout>

## The Agile Manifesto (2001)

The four core values of Agile are:

1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.1 SDLC & Process/Scrum/index.mdx': `---
title: Scrum
description: A lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Scrum">

Scrum is an agile framework for developing, delivering, and sustaining complex products, with an initial emphasis on software development, although it has been used in other fields. It is designed for teams of ten or fewer members, who break their work into goals that can be completed within time-boxed iterations.

<Callout icon="info" title="Sprints">
  The heart of Scrum is the Sprint: a fixed length of time (usually 2 weeks) during which the team locks in their tasks and builds a usable increment of the software.
</Callout>

## Roles and Artifacts

<ComparisonTable 
  headers={['Category', 'Item', 'Description']}
  rows={[
    ['Role', 'Product Owner', 'Decides *WHAT* needs to be built. Prioritizes the backlog based on business value.'],
    ['Role', 'Scrum Master', 'A servant-leader who protects the team from distractions and removes blockers.'],
    ['Artifact', 'Product Backlog', 'The master list of every feature, bug, and requirement for the entire product.'],
    ['Artifact', 'Sprint Backlog', 'The small subset of items the team commits to finishing in the current 2-week Sprint.']
  ]}
/>

</TechnologyTemplate>
`,
  '41. Testing/Test-driven development (TDD)/index.mdx': `---
title: Test-Driven Development (TDD)
description: A software development process relying on software requirements being converted to test cases before software is fully developed.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Test-Driven Development (TDD)">

Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases.

<Callout icon="tip" title="Red, Green, Refactor">
  TDD enforces a very strict, extremely short micro-cycle of development known as "Red, Green, Refactor".
</Callout>

## The TDD Cycle

<ComparisonTable 
  headers={['Step', 'Action', 'Why?']}
  rows={[
    ['1. Red', 'Write a test for a feature that doesn\\'t exist yet. Run it, and watch it fail.', 'Proves the test actually works and isn\\'t a false positive.'],
    ['2. Green', 'Write the absolute minimum, ugliest amount of code required to make the test pass.', 'Ensures you only write code to fulfill requirements.'],
    ['3. Refactor', 'Clean up the ugly code, safe in the knowledge that if you break it, the test will instantly tell you.', 'Improves software architecture without fear of regressions.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/Flutter vs React Native/index.mdx': `---
title: Flutter vs React Native
description: A comparison of the two dominant cross-platform mobile development frameworks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Flutter vs React Native">

When building mobile applications for both iOS and Android without writing two completely separate codebases (Swift and Kotlin), the industry has settled on two massive frameworks: React Native (by Meta) and Flutter (by Google).

<Callout icon="info" title="The Rendering Difference">
  **React Native** translates your JavaScript code into actual, native iOS and Android buttons. It feels 100% native.
  
  **Flutter** draws every single pixel on the screen itself using the Skia graphics engine (like a video game). It bypasses the native OS UI entirely.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'React Native', 'Flutter']}
  rows={[
    ['Language', 'JavaScript / TypeScript', 'Dart'],
    ['Creator', 'Meta (Facebook)', 'Google'],
    ['Performance', 'Great, but heavily relies on the "JS Bridge" communicating with the Native thread, which can bottleneck complex animations.', 'Incredible. Because it draws its own pixels in C++, it consistently hits 60/120 FPS easily.'],
    ['Ecosystem', 'Massive. Access to almost the entire NPM ecosystem.', 'Growing rapidly, but Dart is still much smaller than JS.']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega6() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega6().catch(console.error)
