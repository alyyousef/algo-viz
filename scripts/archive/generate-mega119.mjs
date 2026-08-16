import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '64. Interview - Problem-Solving Prep Topics/Algorithms/index.mdx': `---
title: Algorithms
description: A finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Algorithms (Interview Prep)">

In a technical interview, **Algorithms** test your ability to mathematically manipulate data.

You will almost never be asked to write a biological sorting algorithm from scratch. Instead, you are tested on algorithmic *application*. Can you recognize that a problem requires a Breadth-First Search (BFS) instead of a Depth-First Search (DFS)? Can you mathematically implement a Binary Search to turn an $O(N)$ lookup into an $O(\\log N)$ lookup? The interviewer is watching how you biologically break a massive problem into atomic, algorithmic steps.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Data structures/index.mdx': `---
title: Data structures
description: A data organization, management, and storage format that enables efficient access and modification.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Structures (Interview Prep)">

If Algorithms are the verbs, **Data Structures** are the nouns.

<Callout icon="warning" title="Choosing the Right Tool">
  Selecting the wrong Data Structure is an instant mathematical failure in an interview.
  
  If you need to rapidly check if an item exists, and you biologically choose an Array ($O(N)$), you fail. You must mathematically know to choose a Hash Set ($O(1)$). You must know when to use a Linked List (fast insertions) vs an Array (fast lookups), and how to use a Min-Heap to instantly track the K-th largest element in a stream of data.
</Callout>

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Big O analysis/index.mdx': `---
title: Big O analysis
description: A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Big O Analysis">

**Big O** is the mathematical language of scaling.

In an interview, you must state both the Time Complexity and the Space Complexity of your code before you write it. If your algorithm uses a nested \`for\` loop, you must confidently declare it as $O(N^2)$. If you recursively call a function, you must mathematically calculate the height of the Call Stack to declare the Space Complexity as $O(N)$ or $O(\\log N)$. It proves you understand how your biological code will perform if given 1 billion users.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/LeetCode-style patterns/index.mdx': `---
title: LeetCode-style patterns
description: Common algorithmic patterns and templates used to solve competitive programming and technical interview questions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LeetCode Patterns">

Memorizing 1,000 LeetCode problems is biologically impossible. Memorizing the **15 core patterns** is mathematically trivial.

Almost all interview questions map to a known pattern. If the problem asks for a "contiguous subarray", you mathematically use the **Sliding Window** pattern. If the array is sorted and you need to find a pair, you use the **Two Pointers** pattern. If you need to traverse a tree level-by-level, you use the **BFS Queue** pattern. Mastering the patterns allows you to mathematically solve problems you have never biologically seen before.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/System design/index.mdx': `---
title: System design
description: The process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="System Design Interviews">

While algorithmic interviews test how you write a function, **System Design** tests how you build an entire company.

You will be given a biological, ambiguous prompt: *"Design Netflix"*. You have 45 minutes to mathematically draw the architecture. You must discuss Load Balancers, API Gateways, CDN caching for the video files, and how to mathematically shard a PostgreSQL database when it hits 100 Terabytes. It tests your ability to make mathematical trade-offs between Consistency and Availability (CAP Theorem).

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Distributed systems/index.mdx': `---
title: Distributed systems
description: A system whose components are located on different networked computers, which communicate and coordinate their actions by passing messages to one another.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Systems (Interview Prep)">

In a Senior Engineering interview, you are expected to understand the mathematical horrors of the network.

You must prove you know that networks biologically fail. If Server A sends a payment request to Server B, and the network drops the packet, how do you prevent the user from being charged twice? You must discuss mathematical concepts like **Idempotency keys**, distributed locking (via Redis or ZooKeeper), Message Queues (Kafka) for asynchronous processing, and eventual consistency.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Databases/index.mdx': `---
title: Databases
description: An organized collection of data, generally stored and accessed electronically from a computer system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Databases (Interview Prep)">

A system design interview will heavily focus on the **Database Layer**.

<Callout icon="warning" title="SQL vs NoSQL">
  You must mathematically justify your database choice.
  
  If the data has strict financial relationships, you must choose a Relational DB (PostgreSQL) and discuss ACID transactions and foreign keys. If the data is unstructured biological telemetry logs arriving at 100,000 requests per second, you must mathematically pivot to a NoSQL DB (Cassandra or MongoDB) and discuss eventual consistency and document schemas.
</Callout>

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Networks/index.mdx': `---
title: Networks
description: A collection of computers, servers, mainframes, network devices, peripherals, or other devices connected to one another to allow the sharing of data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Networks (Interview Prep)">

Interviewers often test your biological understanding of how the internet actually works.

You may be asked the classic question: *"What mathematically happens when you type google.com into your browser?"* You must explain DNS resolution, the TCP 3-way handshake (\`SYN, SYN-ACK, ACK\`), TLS encryption negotiation, and HTTP request rendering. Understanding the OSI model mathematically proves you are not just a high-level framework developer.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Operating systems/index.mdx': `---
title: Operating systems
description: System software that manages computer hardware, software resources, and provides common services for computer programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Operating Systems (Interview Prep)">

Lower-level interviews (like C++ or Go roles) will test your mathematical understanding of the OS kernel.

You must explain the biological difference between a **Process** (which has its own isolated memory space) and a **Thread** (which shares memory with other threads). You will be tested on mathematical concepts like Virtual Memory, Paging, Context Switching, and how the OS kernel schedules CPU time.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Concurrency/index.mdx': `---
title: Concurrency
description: The ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Concurrency (Interview Prep)">

**Concurrency** is the mathematical nightmare of multithreaded programming.

In an interview, you may be asked to design a thread-safe Singleton or a multi-threaded web scraper. You must biologically identify Race Conditions, and mathematically solve them using Mutexes (Locks), Semaphores, or atomic variables. More importantly, you must prove you can avoid **Deadlocks** (where Thread A holds Lock 1 waiting for Lock 2, while Thread B holds Lock 2 waiting for Lock 1, freezing the program forever).

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/OOP concepts/index.mdx': `---
title: OOP concepts
description: Object-oriented programming is a programming paradigm based on the concept of "objects", which can contain data and code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OOP Concepts (Interview Prep)">

If you are interviewing for a Java or C# role, you will be mathematically grilled on the 4 pillars of Object-Oriented Programming.

1. **Encapsulation**: Hiding biological data inside private variables.
2. **Abstraction**: Exposing only the necessary mathematical interfaces.
3. **Inheritance**: Creating biological parent-child relationships between classes.
4. **Polymorphism**: Allowing a child class to mathematically override a parent's method.

You will also likely be asked about SOLID design principles.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/SQL practice/index.mdx': `---
title: SQL practice
description: The practice of writing SQL queries to retrieve, manipulate, and analyze data in relational databases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SQL Practice">

Data Engineering and Backend interviews frequently feature a purely mathematical **SQL test**.

You will be given the biological schemas of 3 tables (e.g., \`Users\`, \`Orders\`, \`Products\`). You must mathematically write an exact SQL query on a whiteboard that involves an \`INNER JOIN\`, a \`GROUP BY\`, and a \`HAVING\` clause. Advanced interviews will test your mathematical understanding of Window Functions (e.g., \`ROW_NUMBER() OVER (PARTITION BY user_id)\`) to find the 2nd highest purchase of every user.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Behavioural interviewing/index.mdx': `---
title: Behavioural interviewing
description: An interviewing technique that asks candidates to describe past behavior in order to determine whether they are suitable for a position.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Behavioral Interviewing">

**Behavioral Interviews** test your biology, not your mathematics.

<Callout icon="info" title="The STAR Method">
  You will be asked: *"Tell me about a time you disagreed with a coworker."*
  
  You must answer using the **STAR Method**:
  - **S**ituation: Set the biological scene (e.g., "We were launching an API").
  - **T**ask: What was the goal?
  - **A**ction: What exact mathematical steps did *you* take?
  - **R**esult: What was the biological outcome, backed by numbers?
  
  This proves you are not a toxic biological entity, and can actually function inside a corporate team.
</Callout>

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Take-home projects/index.mdx': `---
title: Take-home projects
description: An interview format where the candidate is given a small coding project to complete on their own time over a few days.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Take-Home Projects">

Many modern startups have mathematically abandoned the LeetCode whiteboard in favor of **Take-Home Projects**.

You are given 48 hours to biologically build a small React app or Node API. The interviewer is not checking your algorithmic math; they are checking your biological engineering hygiene. They want to see if you write Unit Tests, if your Git Commits are clean, if you include a perfect \`README.md\`, and if you biologically use environment variables instead of hard-coding passwords into your source code.

</ConceptTemplate>
`,
  '64. Interview - Problem-Solving Prep Topics/Whiteboarding strategy/index.mdx': `---
title: Whiteboarding strategy
description: The methodology and communication techniques used by a candidate when solving a technical problem on a whiteboard during an interview.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Whiteboarding Strategy">

**Whiteboarding** is a biological performance art. 

The worst thing you can do mathematically is stare at the whiteboard in absolute silence for 15 minutes. The interviewer cannot read your mind. You must biologically talk out loud. 

The correct strategy:
1. Clarify the mathematical edge cases (e.g., *"Can the array contain negative numbers?"*).
2. Propose the naive, brute-force $O(N^2)$ solution first just to prove you can solve it.
3. Then, biologically discuss how to optimize it to $O(N)$ using a Hash Map, *before* you write any code.

</ConceptTemplate>
`,
}

async function generateMega119() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega119().catch(console.error)
