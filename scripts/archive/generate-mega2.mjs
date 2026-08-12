import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.2 Distributed Systems Theory/CAP theorem/index.mdx': `---
title: CAP Theorem
description: A fundamental theorem in theoretical computer science about distributed data stores.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="CAP Theorem">

The CAP theorem, also named Brewer's theorem, states that any distributed data store can only provide two of the following three guarantees: Consistency, Availability, and Partition tolerance.

<Callout icon="error" title="The Harsh Reality of Physics">
  Because networks are inherently unreliable (cables get cut, routers crash), **Partition Tolerance is mandatory** for any distributed system. Therefore, when a network partition occurs, a distributed system must choose either Consistency (cancel the request to avoid stale data) or Availability (return the stale data). You cannot have both.
</Callout>

## The Three Guarantees

<ComparisonTable 
  headers={['Guarantee', 'Description']}
  rows={[
    ['Consistency (C)', 'Every read receives the most recent write or an error. All nodes see the exact same data at the exact same time.'],
    ['Availability (A)', 'Every request receives a (non-error) response, without the guarantee that it contains the most recent write.'],
    ['Partition Tolerance (P)', 'The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.']
  ]}
/>

## Common Databases

- **CP (Consistency + Partition Tolerance)**: MongoDB, Redis, HBase. (If the network fails, they stop answering queries to protect data integrity).
- **AP (Availability + Partition Tolerance)**: Cassandra, DynamoDB, CouchDB. (If the network fails, they keep answering queries, even if the data is slightly out of date).

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Client[Client Request]
  
  subgraph Network Partition
    NodeA[(Node A\\nHas newest data)]
    NodeB[(Node B\\nDisconnected from A)]
    
    NodeA -.-x |Network Cable Cut| NodeB
  end
  
  Client -- Requests data from Node B --> NodeB
  NodeB -- "Consistency Choice: Error" --> Client
  NodeB -- "Availability Choice: Return Old Data" --> Client
\`} />

</TechnologyTemplate>
`,
  '40. Software Engineering - Process & Architecture/40.2 Software Architecture/Microservices/index.mdx': `---
title: Microservices Architecture
description: An architectural style that structures an application as a collection of loosely coupled, independently deployable services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Microservices Architecture">

Microservices are an architectural and organizational approach to software development where software is composed of small independent services that communicate over well-defined APIs. These services are owned by small, self-contained teams.

<Callout icon="tip" title="Conway's Law">
  "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure." 
  Microservices perfectly align large engineering departments by allowing Team A to deploy the Billing Service using Go, while Team B deploys the User Service using Node.js, completely independently of each other.
</Callout>

## Monolith vs Microservices

<ComparisonTable 
  headers={['Aspect', 'Monolithic Architecture', 'Microservices Architecture']}
  rows={[
    ['Deployment', 'Entire app must be deployed at once. If 1 line of code changes, the whole app restarts.', 'Individual services can be deployed instantly with zero downtime to the rest of the app.'],
    ['Scaling', 'Must scale the entire app across multiple servers, even if only the Image Processing module needs more CPU.', 'Scale only the specific service that is under heavy load.'],
    ['Complexity', 'Simple to develop and debug initially, but becomes a tangled "Big Ball of Mud" over time.', 'Codebases stay small and clean, but operations (DevOps) and debugging across networks becomes insanely complex.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Client[Mobile / Web Client]
  Gateway[API Gateway / Load Balancer]
  
  ServiceA[User Service\\n(Node.js)]
  DB_A[(PostgreSQL)]
  
  ServiceB[Billing Service\\n(Go)]
  DB_B[(Stripe API)]
  
  ServiceC[Inventory Service\\n(Java)]
  DB_C[(MongoDB)]
  
  Client --> Gateway
  Gateway --> ServiceA
  Gateway --> ServiceB
  Gateway --> ServiceC
  
  ServiceA --> DB_A
  ServiceB --> DB_B
  ServiceC --> DB_C
\`} />

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/DNS/index.mdx': `---
title: DNS (Domain Name System)
description: The phonebook of the Internet, translating human-readable domain names into machine-readable IP addresses.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="DNS (Domain Name System)">

The Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates easily memorized domain names to the numerical IP addresses needed for the purpose of locating and identifying computer services and devices with the underlying network protocols.

<Callout icon="info" title="Why DNS?">
  Humans are great at remembering names like \`google.com\`. Computers are strictly numbers-based and need IP addresses like \`142.250.190.46\`. DNS bridges this gap.
</Callout>

## The Resolution Process

When you type a URL into your browser, a massively complex, millisecond-fast lookup occurs across the globe.

<ComparisonTable 
  headers={['Server', 'Role']}
  rows={[
    ['1. Recursive Resolver', 'Usually operated by your ISP (or Google 8.8.8.8). It takes your request and tracks down the IP address by asking the other servers in order.'],
    ['2. Root Name Server', 'The absolute top of the internet. It doesn\\'t know the IP, but it knows exactly who handles ".com", ".org", etc., and points the resolver to them.'],
    ['3. TLD Name Server', 'The Top-Level Domain server (e.g., the .com server). It knows exactly which specific nameserver manages "google.com".'],
    ['4. Authoritative Name Server', 'The final stop. It holds the actual DNS records (A, CNAME, TXT) and returns the specific IP address to the resolver.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  Browser[Browser requests google.com]
  Resolver[Recursive Resolver]
  Root[Root Server (.)]
  TLD[TLD Server (.com)]
  Auth[Authoritative Server (google.com)]
  
  Browser -- 1. Query --> Resolver
  Resolver -- 2. Ask for .com --> Root
  Root -- 3. Returns TLD IP --> Resolver
  
  Resolver -- 4. Ask for google.com --> TLD
  TLD -- 5. Returns Auth IP --> Resolver
  
  Resolver -- 6. Ask for specific IP --> Auth
  Auth -- 7. Returns 142.250.190.46 --> Resolver
  
  Resolver -- 8. Returns IP --> Browser
\`} />

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Turing machines/index.mdx': `---
title: Turing Machines
description: A mathematical model of computation that defines an abstract machine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Turing Machines">

A Turing machine is a mathematical model of computation describing an abstract machine that manipulates symbols on a strip of tape according to a table of rules. Despite its simplicity, a Turing machine can be adapted to simulate the logic of *any* computer algorithm, and is particularly useful in explaining the functions of a CPU inside a computer.

<Callout icon="info" title="The Church-Turing Thesis">
  Invented in 1936 by Alan Turing, the Turing Machine is the foundational concept of all modern Computer Science. The Church-Turing thesis states that if an algorithm can be computed by *anything* in the universe, it can be computed by a Turing Machine. 
  
  If a programming language can simulate a Turing Machine, it is called **Turing Complete** (meaning it can theoretically solve any computable problem).
</Callout>

## The Components

A Turing Machine is delightfully simple. It consists of:

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['An Infinite Tape', 'An infinitely long strip of paper divided into cells. Each cell contains a symbol (e.g., 0, 1, or Blank). This is the "RAM".'],
    ['A Head', 'Can read the symbol on the current cell, write a new symbol, and move exactly one cell left or right.'],
    ['A State Register', 'Stores the current "state" of the machine (e.g., State 1, State 2, Halt).'],
    ['A Finite Table of Rules', 'The "code". For example: "If in State 1 and reading a 0, write a 1, move Right, and transition to State 2."']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  subgraph The Tape (Infinite)
    C1[0] -.- C2[1] -.- C3[1] -.- C4[Blank] -.- C5[0]
  end
  
  Head[Read/Write Head]
  
  subgraph Control Unit
    State[Current State: Q2]
    Rules[Rule Table]
  end
  
  Head --> C3
  ControlUnit --> Head
\`} />

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Halting problem/index.mdx': `---
title: The Halting Problem
description: The problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running or continue to run forever.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="The Halting Problem">

In computability theory, the halting problem is the problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running, or continue to run forever. 

Alan Turing proved in 1936 that a general algorithm to solve the halting problem for *all* possible program-input pairs **cannot exist**.

<Callout icon="error" title="Mathematically Impossible">
  It is mathematically proven that you cannot write a program (a compiler, a linter, an AI) that can look at *any* arbitrary piece of code and guarantee 100% whether that code will eventually finish, or get stuck in an infinite loop.
</Callout>

## The Proof by Contradiction

Turing proved this using a brilliant paradox.

1. Assume there exists a perfect function called \`halts(program)\` that returns \`true\` if the program finishes, and \`false\` if it loops forever.
2. Now, write a malicious new program called \`paradox()\`:

\`\`\`python
def paradox():
    if halts(paradox) == true:
        while True: pass # If halts() says we finish, we loop forever!
    else:
        return # If halts() says we loop forever, we finish!
\`\`\`

3. What happens if you run \`halts(paradox)\`? 
   - If \`halts\` says it finishes, the code hits the \`while True\` and loops forever. (\`halts\` is wrong).
   - If \`halts\` says it loops forever, the code hits \`return\` and finishes. (\`halts\` is wrong).

Because the perfect \`halts()\` function can be used to contradict itself, it is mathematically proven that the perfect \`halts()\` function cannot exist in this universe.

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/AST/index.mdx': `---
title: Abstract Syntax Trees (AST)
description: A tree representation of the abstract syntactic structure of source code written in a programming language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Abstract Syntax Trees (AST)">

In computer science, an abstract syntax tree (AST) is a tree representation of the abstract syntactic structure of source code written in a programming language. Each node of the tree denotes a construct occurring in the source code. 

The syntax is "abstract" in the sense that it does not represent every detail appearing in the real syntax, but rather just the structural or content-related details. For instance, grouping parentheses are implicit in the tree structure, so they do not need to be represented as separate nodes.

<Callout icon="info" title="The Backbone of Tooling">
  ASTs are the magic behind virtually every developer tool you use. When you run Prettier, it parses your code into an AST, ignores your formatting, and prints the AST back out with perfect formatting. When you use ESLint, it traverses the AST looking for nodes that violate rules.
</Callout>

## The Compilation Pipeline

Where does the AST fit into a compiler (like GCC or V8)?

<ComparisonTable 
  headers={['Phase', 'Action']}
  rows={[
    ['1. Lexical Analysis', 'The Lexer takes raw text (e.g., \`let x = 5;\`) and turns it into a flat array of Tokens ([\`KEYWORD_LET\`, \`IDENTIFIER_X\`, \`EQUALS\`, \`NUMBER_5\`]).'],
    ['2. Syntax Analysis', 'The Parser takes the flat array of Tokens and builds the 3D Abstract Syntax Tree, ensuring the grammar is valid.'],
    ['3. Semantic Analysis', 'The compiler walks the AST to check for type errors (e.g., trying to add a string to a boolean).'],
    ['4. Code Generation', 'The compiler traverses the validated AST and spits out Machine Code or Bytecode.']
  ]}
/>

## Architecture of an AST

For the simple code: \`while (x < 10) { x = x + 1; }\`

<ArchitectureDiagram chart={\`
graph TD
  While[WhileStatement]
  Cond[BinaryExpression: <]
  Body[BlockStatement]
  
  While --> Cond
  While --> Body
  
  Cond --> X1[Identifier: x]
  Cond --> Num10[Literal: 10]
  
  Body --> Assign[AssignmentExpression: =]
  
  Assign --> X2[Identifier: x]
  Assign --> Add[BinaryExpression: +]
  
  Add --> X3[Identifier: x]
  Add --> Num1[Literal: 1]
\`} />

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/JIT compilation/index.mdx': `---
title: JIT Compilation (Just-In-Time)
description: A way of executing computer code that involves compilation during execution of a program – at run time.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="JIT Compilation (Just-In-Time)">

In computing, just-in-time (JIT) compilation (also known as dynamic translation or run-time compilation) is a way of executing computer code that involves compilation during the execution of a program (at run time) rather than before execution.

<Callout icon="tip" title="The Best of Both Worlds">
  **AOT (Ahead-of-Time) Compilers** like C++ are extremely fast but require the developer to compile a new binary for every OS (Windows, Mac, Linux). 
  
  **Interpreters** like Python are highly portable but painfully slow.
  
  **JIT Compilers** (Java JVM, C# CLR, JavaScript V8) combine both. The code is distributed as portable Bytecode. When the user runs the app, the JIT compiler instantly turns that Bytecode into blazing-fast machine code specifically optimized for that exact user's CPU.
</Callout>

## How JIT Works (The V8 Engine)

Modern engines like Google Chrome's V8 use extremely advanced, multi-tier JIT systems.

<ComparisonTable 
  headers={['Component', 'Role']}
  rows={[
    ['Interpreter (Ignition)', 'Starts running the code instantly to get the web page loading. It is slow, but requires zero startup time.'],
    ['Profiler', 'Silently watches the interpreter. It counts which functions are executed the most (identifying "Hot" code).'],
    ['Optimizing JIT (TurboFan)', 'Takes the "Hot" code and spends CPU cycles to compile it into highly optimized, bare-metal Machine Code. Next time the function runs, it runs at C++ speeds.']
  ]}
/>

## Deoptimization (Bailing Out)

Because JavaScript is dynamically typed, the JIT might optimize a function assuming the variable \`x\` is always an Integer. If, 10 minutes later, you pass a String into that function, the JIT throws away the optimized machine code (Deoptimizes) and falls back to the slow interpreter.

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Virtual machines/index.mdx': `---
title: Virtual Machines (Process vs System)
description: The virtualization or emulation of a computer system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Virtual Machines (Process vs System)">

In computer science, the term "Virtual Machine" (VM) is heavily overloaded. It generally means an emulation of a computer system, but it is split into two wildly different categories: System Virtual Machines and Process Virtual Machines.

<Callout icon="info" title="Write Once, Run Anywhere">
  Java's famous slogan was based entirely on the Process Virtual Machine (the JVM). Because the JVM abstracts away the underlying hardware, a Java developer doesn't care if the server is running Linux, Windows, or Solaris.
</Callout>

## System VMs vs Process VMs

<ComparisonTable 
  headers={['Type', 'Description', 'Examples']}
  rows={[
    ['System Virtual Machine', 'Provides a complete substitute for a real machine. It runs a full operating system (Guest OS) on top of a Hypervisor. Used heavily in cloud computing.', 'VMware, VirtualBox, AWS EC2.'],
    ['Process Virtual Machine', 'Designed to execute a single computer program by providing a platform-independent programming environment. It starts when the program starts, and dies when the program exits.', 'Java Virtual Machine (JVM), .NET Common Language Runtime (CLR), WebAssembly.']
  ]}
/>

## Architecture of a System VM

<ArchitectureDiagram chart={\`
graph TD
  subgraph Physical Server
    Hardware[Bare Metal Hardware\\n(CPU, RAM)]
    HostOS[Host Operating System]
    Hypervisor[Hypervisor]
    
    subgraph VM 1
      GuestOS1[Ubuntu Linux]
      App1[Node.js App]
      GuestOS1 --> App1
    end
    
    subgraph VM 2
      GuestOS2[Windows Server]
      App2[IIS Web Server]
      GuestOS2 --> App2
    end
    
    Hardware --> HostOS --> Hypervisor
    Hypervisor --> GuestOS1
    Hypervisor --> GuestOS2
  end
\`} />

</TechnologyTemplate>
`,
}

async function generateMega2() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega2().catch(console.error)
