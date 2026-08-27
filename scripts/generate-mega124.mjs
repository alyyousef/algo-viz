import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/4. Object-Oriented Programming/Static vs instance members/index.mdx': `---
title: Static vs Instance Members
description: The mathematical distinction between variables and methods that belong to the global Class blueprint itself (Static) versus those that belong strictly to uniquely instantiated Objects (Instance).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Static vs Instance Members"
  subtitle="Class Memory vs Object Memory"
  tags={['OOP', 'Memory Management', 'Architecture', 'Java']}
>

When a Class defines a variable, that variable must be mathematically assigned to a specific domain of memory. It either belongs to the singular Class, or it belongs to the infinite possible Instances.

## 1. Instance Members
By default, variables are **Instance Members**.
If a TICK1CarTICK1 class defines TICK1int speed;TICK1, every time you type TICK1new Car()TICK1, the CPU allocates a brand new, physically distinct integer in RAM. If you create 100 cars, you mathematically possess 100 distinct TICK1speedTICK1 variables. Changing the speed of Car A has absolutely zero effect on Car B.

## 2. Static Members
If a variable is declared with the TICK1staticTICK1 keyword (e.g., TICK1static int totalCarsBuilt;TICK1), it mathematically belongs to the Class blueprint itself, not the objects.
The CPU allocates memory for a TICK1staticTICK1 variable exactly **once**, usually in a special memory area (like the Metaspace in Java). If you create 100 cars, there is still only **one** TICK1totalCarsBuiltTICK1 variable in existence. If Car A increments the variable to 101, Car B mathematically sees the value 101 immediately, because they are both pointing to the exact same physical memory address.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/subtype)/index.mdx': `---
title: Subtype Polymorphism
description: The most common form of mathematical polymorphism in Object-Oriented Programming, allowing code written to operate on a parent type to seamlessly and safely operate on any inherited child type.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Subtype Polymorphism"
  subtitle="The Power of the Parent Interface"
  tags={['OOP', 'Polymorphism', 'Type Theory', 'Design Patterns']}
>

Subtype polymorphism (often simply called "Polymorphism" in Java/C#) is the mathematical mechanism that makes the Dependency Inversion Principle (DIP) and the Open-Closed Principle (OCP) physically possible.

## 1. The Mathematical Guarantee
If you write a function TICK1public void drawShape(Shape s)TICK1, the compiler mathematically guarantees that whatever object is passed in will possess the methods defined in the TICK1ShapeTICK1 interface.
Because a TICK1CircleTICK1 is a mathematical subtype of TICK1ShapeTICK1, you can pass a TICK1CircleTICK1 into this function. The function is completely ignorant of the fact that it is interacting with a Circle. It only knows it is holding a Shape.

## 2. Late Binding (Dynamic Dispatch)
When the function executes TICK1s.draw()TICK1, the CPU performs **Late Binding**.
It mathematically pauses, looks at the actual object sitting in RAM (the Circle), looks up the Circle's specific TICK1draw()TICK1 method in the virtual method table (vtable), and executes it. This allows the architect to write rigid, type-safe code (TICK1drawShape(Shape s)TICK1) while allowing the program to exhibit highly dynamic, flexible behavior at runtime.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Traits/index.mdx': `---
title: Traits
description: A structural feature in languages like Scala and Rust that mathematically resolves the multiple inheritance problem by allowing isolated bundles of behavior to be securely composed into a class without traditional inheritance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Traits"
  subtitle="Safe Mathematical Composition"
  tags={['OOP', 'Scala', 'Rust', 'Architecture']}
>

Languages like Java outlawed Multiple Inheritance to avoid the Diamond Problem, replacing it with Interfaces. However, Interfaces mathematically cannot contain state (variables), which forces developers to duplicate code across multiple classes. Traits were invented to solve this exact architectural gap.

## 1. Behavior and State
A Trait is mathematically similar to a Mixin, but with stricter compiler enforcement.
Unlike a Java Interface, a Trait in Scala or Rust can contain fully implemented methods *and* state variables.
TICK3scala
trait Logger {
  var logCount = 0 // State
  def log(msg: String): Unit = { // Behavior
    println(s"[$logCount] $msg")
    logCount += 1
  }
}
TICK3

## 2. Linearization (Solving the Diamond Problem)
If a class mixes in two Traits that both have a TICK1log()TICK1 method, how does the compiler mathematically avoid the Diamond Problem?
Languages that use Traits use an algorithm called **Linearization**. The compiler mathematically analyzes the order in which the Traits were mixed into the class (e.g., TICK1class User extends Entity with Logger with AuditorTICK1) and mathematically flattens them into a strict, linear hierarchy. If a conflict occurs, the compiler deterministically chooses the implementation from the right-most Trait, eliminating ambiguity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Agile/index.mdx': `---
title: Agile
description: An iterative, empirical methodology for software development that mathematically prioritizes rapid, continuous delivery of working software over massive, upfront theoretical planning phases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Agile Methodology"
  subtitle="Iterative Empirical Development"
  tags={['Process', 'SDLC', 'Project Management', 'Agile']}
>

In the 1990s, software was built using the **Waterfall** methodology: 1 year of writing architectural documentation, followed by 1 year of coding. By the time the software shipped in Year 2, the market had completely changed, making the software mathematically useless. Agile was created to stop this financial waste.

## 1. The Agile Manifesto (2001)
Agile is not a specific mathematical process; it is a philosophy defined by the Agile Manifesto. It dictates four core values:
1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.

## 2. The Iterative Loop
Instead of building a massive software system in one monolithic 2-year block, Agile mathematically fractures the development into short, distinct time boxes (called **Sprints** in Scrum), usually lasting 2 weeks.
At the end of the 2-week Sprint, the engineering team *must* deliver a mathematically functional, tested piece of software to the customer. The customer provides immediate feedback. If the customer hates it, the company has only wasted 2 weeks of engineering time, rather than 2 years.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Code review/index.mdx': `---
title: Code Review
description: A mandatory mathematical and psychological quality-gate in the Software Development Life Cycle where peer engineers rigorously scrutinize newly written code for bugs, architectural flaws, and security vulnerabilities before it merges into production.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Code Review"
  subtitle="The Peer-Driven Quality Gate"
  tags={['Process', 'Quality Assurance', 'Git', 'Security']}
>

No matter how brilliant a software engineer is, they mathematically possess blind spots. They will accidentally write O(N^2) algorithms, forget to close database connections, or expose an API route without authentication. Code Review is the structural defense against human error.

## 1. The Pull Request (PR)
In modern SDLC (Software Development Life Cycle), Code Review is enforced via the **Pull Request** (or Merge Request).
The developer writes their code on an isolated Git branch. They cannot push this branch directly to the TICK1mainTICK1 production branch; the Git server mathematically rejects it. They must open a PR.
The CI/CD pipeline runs automated tests, but the actual merge is physically blocked until at least one (often two) senior peer engineers mathematically review the diff, highlight architectural flaws, and click "Approve."

## 2. Psychological Safety
Code Review is not a mathematical compiler; it is a human interaction.
If reviews are used to mock or punish junior developers, the organization's culture will collapse. Strict engineering guidelines mandate that code reviews must focus on the code, not the coder. Reviews should rely on automated linters (like ESLint or SonarQube) to argue about syntax, freeing the human reviewers to focus strictly on high-level mathematical logic, business requirements, and architectural integrity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Debugging/index.mdx': `---
title: Debugging
description: The rigorous, empirical, and mathematical process of identifying, isolating, and resolving defects (bugs) within a software system, transforming unexpected behavior back into predictable mathematical logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Debugging"
  subtitle="The Empirical Resolution of Failure"
  tags={['Process', 'Development', 'Troubleshooting', 'Logic']}
>

Brian Kernighan famously said: *"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."*

## 1. The Scientific Method
Debugging is not random guessing; it is the strict application of the scientific method.
1. **Observe**: The application crashes with a TICK1NullPointerExceptionTICK1 on line 42.
2. **Hypothesize**: The TICK1UserTICK1 object returned from the database on line 40 must mathematically be null.
3. **Experiment**: The developer attaches a step-through debugger to the runtime, sets a **Breakpoint** on line 40, and intentionally triggers the crash.
4. **Analyze**: The debugger pauses the CPU. The developer mathematically inspects the memory state. They see the database query returned null because the SQL variable was malformed.

## 2. The Binary Search (Git Bisect)
When a bug exists in production but the developer has no idea which code commit caused it, they use mathematical reduction via **Git Bisect**.
If commit v1.0 is mathematically known to be good, and commit v2.0 is known to be bad, there might be 1,000 commits between them. Git Bisect uses a Binary Search algorithm (O(log N)) to jump to commit 500. The developer tests it. If it's bad, the bug is between 1 and 500. It jumps to 250. This mathematically locates the exact line of code that caused the bug in exactly 10 steps, saving days of manual searching.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/DevSecOps/index.mdx': `---
title: DevSecOps
description: The architectural philosophy of mathematically integrating automated security practices directly into the Continuous Integration/Continuous Deployment (CI/CD) pipeline, shifting security "left" in the software development lifecycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="DevSecOps"
  subtitle="Shifting Security Left"
  tags={['Security', 'DevOps', 'Process', 'Architecture']}
>

In the 2010s, "DevOps" merged Development and Operations to deploy code 100 times a day. However, the Security team was left behind. If Security performs a manual penetration test right before a release, they mathematically destroy the speed of DevOps. DevSecOps was created to automate security.

## 1. Shifting Left
The core mathematical principle of DevSecOps is "Shifting Left."
In a standard timeline (left to right), writing code happens on the left, and deploying happens on the right. If you find a severe SQL injection vulnerability on the right (during deployment), it is mathematically 100x more expensive to fix than if you found it on the left (while the developer was typing).
DevSecOps shifts the security checks all the way to the developer's laptop and the initial Git commit.

## 2. SAST and DAST
DevSecOps relies on automated mathematical pipelines:
- **SAST (Static Application Security Testing)**: When a developer opens a Pull Request, a tool like SonarQube or Checkmarx mathematically scans the raw source code for known vulnerabilities (like hardcoded AWS keys or buffer overflows) and blocks the merge if found.
- **DAST (Dynamic Application Security Testing)**: Once the code deploys to a staging environment, an automated tool mathematically attacks the running application (firing payloads at the REST API) to find runtime vulnerabilities before production deployment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Documentation/index.mdx': `---
title: Documentation
description: The mathematical and architectural translation of raw source code intent into human-readable formats, critical for preventing tribal knowledge silos and ensuring the long-term maintainability of enterprise software systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Documentation"
  subtitle="The Preservation of Intent"
  tags={['Process', 'Architecture', 'Clean Code', 'Knowledge Management']}
>

Source code mathematically describes *how* a system works. Documentation is the only mechanism that explains *why* the system was built that way. Without the "why," future engineers will mathematically destroy the architecture trying to fix it.

## 1. The Architecture Decision Record (ADR)
In modern software engineering, the most critical piece of documentation is the **ADR (Architecture Decision Record)**.
When a team decides to use PostgreSQL instead of MongoDB, they write a 1-page markdown document explaining the mathematical reasoning, the alternatives considered, and the date. Two years later, when a new Senior Engineer asks *"Why didn't we use MongoDB?"*, they read the ADR. This prevents the team from endlessly debating solved problems and mathematically preserves the historical context of the system.

## 2. Docs-as-Code
Historically, documentation was written in MS Word and stored in a dusty SharePoint drive where it immediately became obsolete.
Modern teams use **Docs-as-Code**. Documentation is written in Markdown (or AsciiDoc) and committed directly into the Git repository alongside the source code. If a developer alters the API logic in a Pull Request but fails to update the corresponding Markdown file, the Code Reviewer mathematically rejects the PR, ensuring the documentation and the code evolve synchronously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Extreme Programming/index.mdx': `---
title: Extreme Programming (XP)
description: A highly disciplined, mathematically rigorous subset of Agile development that pushes traditional software engineering practices (like testing, code review, and customer integration) to their absolute logical extremes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Extreme Programming (XP)"
  subtitle="Agile Taken to the Mathematical Limit"
  tags={['Process', 'Agile', 'Development', 'Kent Beck']}
>

Created by Kent Beck in the 1990s, Extreme Programming (XP) looked at the things that made software successful and mathematically pushed them to their absolute maximum limits.

## 1. The Mathematical Extremes
XP is defined by taking standard practices and turning the dial to 10:
- If **Code Review** is good, we should do it 100% of the time. The result: **Pair Programming** (two engineers mathematically share one keyboard and screen, continuously reviewing every single line of code as it is typed).
- If **Testing** is good, we should do it before we even write the code. The result: **Test-Driven Development (TDD)** (mathematically forcing the engineer to write the failing test first).
- If **Integration** is good, we should do it constantly. The result: **Continuous Integration** (merging code into the main branch dozens of times a day).

## 2. The Cost of Change Curve
Traditional engineering believed that the cost to change software mathematically exploded exponentially over time. XP challenged this.
By enforcing TDD, Pair Programming, and continuous Refactoring, XP mathematically flattens the "Cost of Change" curve. It guarantees that the codebase remains so mathematically clean and highly covered by automated tests that modifying the architecture in Year 5 is just as cheap and safe as modifying it in Year 1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.1 SDLC & Process/Kanban/index.mdx': `---
title: Kanban
description: A visual, pull-based workflow management framework originating from Toyota manufacturing, mathematically designed to maximize engineering throughput by strictly limiting the amount of Work In Progress (WIP).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Kanban"
  subtitle="Mathematical Flow Optimization"
  tags={['Process', 'Agile', 'Project Management', 'Workflow']}
>

While Scrum uses rigid 2-week timeboxes (Sprints), Kanban is a continuous, fluid mathematical flow. It is heavily utilized by SRE and DevOps teams where unpredictable incidents make rigid 2-week planning mathematically impossible.

## 1. Limiting Work In Progress (WIP)
The core mathematical principle of Kanban is Little's Law, which proves that the more things you work on simultaneously, the longer everything takes to finish.
Kanban enforces strict **WIP Limits**. A Kanban board has columns (e.g., Todo, In Progress, Review, Done). The team places a mathematical limit on the "In Progress" column (e.g., a maximum of 3 tickets). 
If there are 3 tickets in progress, a developer is mathematically forbidden from pulling a 4th ticket from Todo. They *must* swarm with the team to finish one of the active tickets and move it to "Review" before the system can accept new work. This prevents context-switching and mathematically forces the completion of tasks.

## 2. Pull-Based Architecture
Kanban is a **Pull** system, not a Push system.
A Project Manager cannot "push" a ticket onto a developer's desk. The developer mathematically "pulls" the ticket from the backlog only when their personal WIP limit allows it. This ensures the engineering team is never mathematically overloaded beyond their physical capacity, ensuring a sustainable, continuous flow of high-quality code.

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
