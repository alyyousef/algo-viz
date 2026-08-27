import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Maintenance/index.mdx': `---
title: Maintenance
description: The longest and most mathematically expensive phase of the Software Development Life Cycle, involving the continuous modification of a software product after delivery to correct faults, improve performance, or adapt to a changing environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Software Maintenance"
  subtitle="The Long-Term Cost of Code"
  tags={['Process', 'SDLC', 'Engineering', 'Architecture']}
>

Writing the initial 100,000 lines of code for a new application accounts for roughly 20% of the total mathematical cost of the software. The remaining 80% of the cost is spent on **Maintenance** over the next decade.

## 1. The Four Categories of Maintenance
Maintenance is mathematically categorized into four distinct types:
- **Corrective**: Fixing active mathematical defects (bugs) that users found in production.
- **Adaptive**: Modifying the system to keep it mathematically compatible with a changing environment (e.g., upgrading from Python 2 to Python 3, or migrating to a new AWS region).
- **Perfective**: Improving the mathematical performance, maintainability, or UX of the system without changing its core functional requirements (e.g., optimizing a slow SQL query).
- **Preventive**: Refactoring legacy code to prevent future mathematical failures before they occur (e.g., paying down Technical Debt).

## 2. The Maintenance Burden
If software is written with poor architecture (e.g., violating SOLID principles, lacking automated tests, or using monolithic state), the mathematical cost of Adaptive and Perfective maintenance skyrockets. 
Eventually, the cost to modify a single line of code becomes so mathematically expensive that the business is forced to declare bankruptcy on the codebase and initiate a complete rewrite, highlighting why upfront architectural cleanliness is a financial imperative.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Refactoring/index.mdx': `---
title: Refactoring
description: The disciplined, mathematical process of restructuring existing computer code—changing the internal factoring—without changing its external behavior, specifically to improve nonfunctional attributes of the software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Refactoring"
  subtitle="Mathematical Code Restructuring"
  tags={['Process', 'Clean Code', 'Architecture', 'Maintenance']}
>

Martin Fowler famously defined Refactoring as: *"A change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior."*

## 1. The Mathematical Requirement of Testing
You cannot mathematically refactor code if you do not have automated tests.
If you take a 500-line function and fracture it into 5 elegant 100-line functions, how do you mathematically prove you didn't break the application? You run the Unit Test suite. If the tests pass, you have mathematical proof that the external behavior remains identical, even though the internal architecture was drastically altered. Without tests, "refactoring" is just a dangerous, unproven mutation of code.

## 2. Code Smells
Refactoring is driven by identifying mathematical patterns known as **Code Smells**.
- **Long Method**: A method that is 1,000 lines long. (Refactoring technique: *Extract Method*).
- **Duplicated Code**: The exact same mathematical logic exists in 3 different files. (Refactoring technique: *Extract Class* or *Pull Up Method*).
- **Primitive Obsession**: Using raw Strings and Integers to represent complex domain concepts like a Zip Code. (Refactoring technique: *Replace Data Value with Object*).
By constantly applying small mathematical refactorings, engineers prevent the codebase from slowly rotting into an unmaintainable legacy state.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Release management/index.mdx': `---
title: Release Management
description: The mathematical and procedural orchestration of planning, scheduling, and controlling a software build through different stages and environments, culminating in a safe deployment to the production environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Release Management"
  subtitle="Orchestrating the Deployment Pipeline"
  tags={['Process', 'DevOps', 'CI/CD', 'Operations']}
>

Writing code is an engineering problem. Moving that code into the hands of 10 million users without crashing their devices is a massive logistical and mathematical problem solved by Release Management.

## 1. The Environment Pipeline
A release never goes straight to production. It must mathematically traverse a strict pipeline of environments:
1. **Development**: Where engineers test raw code locally.
2. **QA/Staging**: An exact mathematical replica of the production environment, heavily populated with mock data, where automated integration tests and manual QA testers attempt to break the build.
3. **Production**: The live environment serving real users.

## 2. Release Strategies
To mathematically minimize risk during the final push to Production, Release Managers utilize advanced deployment strategies:
- **Blue/Green Deployment**: Two identical production environments exist (Blue and Green). Blue is live. The new code is deployed to Green (which is mathematically idle). Once Green is verified, the Load Balancer mathematically flips 100% of the traffic from Blue to Green instantly.
- **Canary Release**: The new code is deployed to a single server. The Load Balancer routes exactly 1% of live user traffic to the new server. The system mathematically monitors the Error Budget. If errors spike, the release is automatically rolled back. If successful, it mathematically ramps up to 10%, 50%, and 100%.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Requirements engineering/index.mdx': `---
title: Requirements Engineering
description: The systematic, rigorous process of eliciting, documenting, analyzing, and managing the exact mathematical and functional expectations of stakeholders before a single line of code is written.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Requirements Engineering"
  subtitle="Defining Mathematical Intent"
  tags={['Process', 'SDLC', 'Product Management', 'Architecture']}
>

The most mathematically expensive bug in software engineering is building the wrong product flawlessly. If the code is perfect but it does not solve the user's actual problem, the entire engineering effort is a mathematical waste of capital.

## 1. Elicitation and Analysis
Users rarely know exactly what they want in mathematical terms. They say: *"The app needs to be fast."*
The Requirements Engineer must translate that vague desire into a strict, testable mathematical requirement: *"When a user clicks 'Load Dashboard', the API must return the JSON payload in under 200 milliseconds at the P95 latency percentile."* This provides the engineering team with a concrete, physical target.

## 2. Functional vs Non-Functional Requirements
Requirements are strictly divided into two categories:
- **Functional Requirements**: What the system mathematically *does*. (e.g., "The system must calculate sales tax based on the user's zip code.")
- **Non-Functional Requirements (NFRs)**: How the system mathematically *behaves*. (e.g., Security, Scalability, Reliability). "The system must encrypt passwords using Argon2" or "The system must support 10,000 concurrent TCP connections." NFRs are often more mathematically complex to implement than the functional requirements.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Scrum/index.mdx': `---
title: Scrum
description: The most widely adopted framework within Agile methodology, providing a strict, time-boxed mathematical structure of roles, events, and artifacts to help teams deliver complex software iteratively.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Scrum"
  subtitle="The Agile Timebox Framework"
  tags={['Process', 'Agile', 'Project Management', 'Frameworks']}
>

Agile is a philosophy (the Agile Manifesto). Scrum is a specific, rigid mathematical framework used to physically implement that philosophy.

## 1. The Mathematical Roles
Scrum defines exactly three roles, preventing corporate hierarchy from destroying engineering velocity:
- **Product Owner (PO)**: The single mathematical authority on *what* gets built. They maintain the Product Backlog and prioritize features based on business value.
- **Scrum Master**: The mathematical enforcer of the Scrum process. Their job is not to manage the engineers, but to remove physical blockers (like a broken CI/CD pipeline) so the engineers can code.
- **Development Team**: A self-organizing group of 3 to 9 engineers who determine *how* to build the software.

## 2. The Sprint
Scrum revolves around the **Sprint** (a strict timebox, usually exactly 2 weeks).
At the start of the Sprint, the team mathematically commits to pulling X amount of "Story Points" from the Backlog. 
Crucially, once the Sprint begins, the Sprint Backlog is mathematically **locked**. The CEO cannot walk in on Wednesday and demand a new feature be added to the current Sprint. This mathematical boundary protects the engineers' cognitive focus, ensuring they can actually finish the work they started.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/SDLC/index.mdx': `---
title: SDLC (Software Development Life Cycle)
description: The overarching mathematical framework and structured methodology used by organizations to plan, create, test, deploy, and maintain high-quality software systems, encompassing all phases from inception to retirement.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SDLC (Software Development Life Cycle)"
  subtitle="The Macro Engineering Framework"
  tags={['Process', 'SDLC', 'Architecture', 'Management']}
>

Writing code is just one small phase of software engineering. The SDLC provides the complete mathematical blueprint for managing a software asset from the moment it is an idea until the day it is deleted.

## 1. The Core Mathematical Phases
Regardless of whether an organization uses Waterfall, Agile, or DevOps, the SDLC mathematically requires the following phases:
1. **Planning & Requirements**: Calculating the mathematical ROI, gathering stakeholder needs, and defining the scope.
2. **Design**: Creating the architectural blueprints (UML, Database Schemas, API contracts).
3. **Implementation (Coding)**: Translating the mathematical design into physical source code.
4. **Testing**: Mathematically proving the code works (Unit, Integration, Security).
5. **Deployment**: Orchestrating the release to the physical production servers.
6. **Maintenance**: Monitoring, patching, and paying down technical debt.

## 2. The Evolution of the Cycle
In the 1990s, the SDLC was linear (Waterfall). Phase 3 could not begin until Phase 2 was mathematically 100% complete.
In the modern era, the SDLC is an infinite, rapid loop (DevOps/CI-CD). A developer can traverse the entire SDLC—from gathering a small requirement, to coding it, testing it, and deploying it to 10 million users—in a single afternoon, mathematically maximizing business agility.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Software design/index.mdx': `---
title: Software Design
description: The critical architectural phase of the SDLC where high-level business requirements are mathematically translated into precise technical blueprints, establishing the structural foundation of the system before coding begins.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Software Design"
  subtitle="The Translation to Architecture"
  tags={['Process', 'Architecture', 'Design Patterns', 'UML']}
>

If Requirements Engineering defines *what* the system must do, Software Design mathematically defines *how* the system will do it. 

## 1. High-Level Design (HLD)
Software Design begins at the macro level. The architect mathematically determines the physical shape of the system.
- Will it be a Monolith or Microservices?
- Will the database be Relational (PostgreSQL) or NoSQL (DynamoDB)?
- How will the system mathematically scale? (Load balancers, caching layers like Redis, asynchronous message queues like Kafka).
The HLD provides the "10,000-foot view" of the infrastructure, ensuring the system can mathematically handle the required traffic and latency constraints.

## 2. Low-Level Design (LLD)
Once the HLD is approved, the engineers move to the Low-Level Design. This is the microscopic mathematical blueprint for the actual code.
- Defining the exact REST API JSON payloads (OpenAPI/Swagger specs).
- Designing the internal Object-Oriented class hierarchies and applying SOLID principles.
- Selecting specific mathematical Design Patterns (e.g., using the Strategy Pattern to handle different payment gateways).
A rigorous LLD ensures that when the developers finally open their IDEs, they are not guessing; they are simply implementing a mathematically proven blueprint.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Technical debt/index.mdx': `---
title: Technical Debt
description: A powerful mathematical metaphor describing the implied cost of future refactoring required when a development team chooses a fast, hacky implementation over a rigorous, architecturally sound approach to meet an immediate deadline.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Technical Debt"
  subtitle="The Financial Metaphor of Code"
  tags={['Process', 'Architecture', 'Clean Code', 'Management']}
>

Coined by Ward Cunningham (inventor of the Wiki), Technical Debt borrows a concept from finance to explain a mathematical reality of software engineering to non-technical executives.

## 1. Taking on Debt
If the marketing team needs a feature launched by Friday, the engineering team has two choices:
1. Spend 2 weeks building a mathematically perfect, highly scalable microservice. (Miss the deadline).
2. Spend 2 days writing a hacky, unscalable script directly inside the legacy monolith. (Hit the deadline).
Option 2 is taking on **Technical Debt**. You gained immediate speed, but you borrowed mathematical stability from the future.

## 2. The Mathematical Interest Rate
Just like financial debt, Technical Debt accrues **Interest**.
Because the hacky script is fragile and lacks tests, every time an engineer has to modify that code in the future, it takes them 3 days instead of 3 hours. That lost time is the mathematical interest payment.
If a company continuously takes on Technical Debt without ever pausing to refactor (pay down the principal), the interest payments mathematically overwhelm the engineering team. Eventually, 100% of the team's capacity is spent fixing bugs and dealing with fragile architecture, reducing feature velocity to zero (Technical Bankruptcy).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Testing/index.mdx': `---
title: Testing
description: The rigorous mathematical process of empirically verifying that a software system behaves exactly as designed, utilizing automated code execution to uncover logic flaws, edge cases, and architectural regressions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Software Testing"
  subtitle="The Empirical Proof of Logic"
  tags={['Process', 'Quality Assurance', 'CI/CD', 'TDD']}
>

Writing code without automated tests is mathematically equivalent to building a bridge without calculating the load-bearing capacity of the steel. It might look fine on day one, but it will eventually collapse under pressure.

## 1. The Testing Pyramid
Testing is mathematically structured into a pyramid, based on execution speed and cost:
- **Unit Tests (The Base)**: Testing a single, isolated function (e.g., TICK1add(2,2)TICK1 mathematically must return TICK14TICK1). You should have thousands of these. They execute in milliseconds.
- **Integration Tests (The Middle)**: Testing how two mathematical components interact (e.g., does the API successfully write data to the real PostgreSQL database?). You have hundreds of these.
- **End-to-End / E2E (The Peak)**: Using an automated browser (like Playwright) to mathematically simulate a real user clicking buttons on the UI. These are slow and brittle, so you only write dozens of them to test critical user flows.

## 2. Test Coverage and Regressions
The primary mathematical value of testing is not finding bugs today; it is preventing **Regressions** tomorrow.
If an application has 90% Code Coverage, it means 90% of the logical branches in the codebase are mathematically proven to work by an automated script. If a new developer joins the team and accidentally alters a core mathematical algorithm, the CI/CD pipeline will instantly run the tests, mathematically detect the regression, and block the deployment, providing ultimate architectural safety.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Version control/index.mdx': `---
title: Version Control
description: The foundational mathematical system (like Git) used to track, manage, and merge every single modification made to a software codebase over time, enabling massive parallel collaboration among distributed engineering teams.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Version Control"
  subtitle="The Mathematical Timeline of Code"
  tags={['Process', 'Git', 'Collaboration', 'DevOps']}
>

Without Version Control, software engineering at scale is mathematically impossible. If 50 developers try to edit the same TICK1index.jsTICK1 file on a shared network drive simultaneously, the code will be instantly corrupted by overwrites.

## 1. The Directed Acyclic Graph (DAG)
Modern distributed version control systems (like Git) do not just save files; they mathematically model the entire history of the project as a **Directed Acyclic Graph (DAG)**.
Every time a developer "commits" code, Git calculates a cryptographic SHA-1 hash of the file contents and the parent commit. This creates an immutable, mathematically verifiable timeline. If a bug is introduced, an engineer can mathematically traverse the DAG backward in time to instantly locate the exact user, time, and keystroke that caused the defect.

## 2. Branching and Merging
Version control allows developers to mathematically split the universe.
A developer creates a **Branch**. They are now working in a parallel mathematical universe where they can delete files and rewrite architecture without affecting the main production code. When they are finished, the Version Control system performs a mathematical **Merge**. It calculates the exact line-by-line differences (the diff) and mathematically splices the developer's parallel universe back into the main timeline, flagging any logical conflicts for human review.

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
