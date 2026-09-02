import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Sets/index.mdx': `---
title: Sets
description: "A well-defined collection of distinct mathematical objects, considered as an object in its own right, forming the foundation of modern mathematics and database theory."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Sets"
  subtitle="The Foundation of Mathematics"
  tags={['Mathematics', 'Discrete Math', 'Data Structures', 'Databases']}
>

In mathematics and computer science, a **Set** is an unordered collection of distinct, unique objects. It is arguably the most fundamental concept in modern mathematics (Set Theory), serving as the foundational building block for relations, functions, and relational databases (SQL).

## 1. Core Properties

Unlike an Array or a List, a Set has two strict mathematical rules:
1. **Unordered**: The Set $\\\\{1, 2, 3\\\\}$ is mathematically identical to $\\\\{3, 1, 2\\\\}$. There is no concept of an "index".
2. **Unique**: A Set cannot contain duplicates. If you attempt to add the number $2$ to $\\\\{1, 2, 3\\\\}$, the Set remains $\\\\{1, 2, 3\\\\}$.

## 2. Set Operations

Sets are highly useful because of the mathematical operations you can perform on them:

- **Union ($A \\\\cup B$)**: Combines all elements from both Sets. If $A = \\\\{1, 2\\\\}$ and $B = \\\\{2, 3\\\\}$, $A \\\\cup B = \\\\{1, 2, 3\\\\}$. (Equivalent to SQL TICK1FULL OUTER JOINTICK1).
- **Intersection ($A \\\\cap B$)**: Only the elements that exist in *both* Sets. $A \\\\cap B = \\\\{2\\\\}$. (Equivalent to SQL TICK1INNER JOINTICK1).
- **Difference ($A - B$)**: Elements in A that are *not* in B. $A - B = \\\\{1\\\\}$. (Equivalent to SQL TICK1LEFT JOIN WHERE B IS NULLTICK1).
- **Subset ($A \\\\subseteq B$)**: A Boolean operation. Is every element in A also found inside B?

## 3. Usage in Computer Science

Every modern programming language has a native TICK1SetTICK1 data structure (e.g., TICK1new Set()TICK1 in JavaScript, TICK1set()TICK1 in Python).
They are typically implemented under the hood as Hash Tables. This means checking if an item exists in a Set (TICK1mySet.has(x)TICK1) is an $O(1)$ operation, making them vastly superior to Arrays ($O(N)$) for checking memberships or instantly removing duplicates from a dataset.

<Callout type="info" title="Russell's Paradox">
  In 1901, Bertrand Russell broke mathematics by asking: *"Does the set of all sets that do not contain themselves, contain itself?"* If it does, it doesn't. If it doesn't, it does. This paradox destroyed the original "Naive Set Theory", forcing mathematicians to invent the highly strict Zermelo-Fraenkel (ZFC) axioms to prevent self-referential paradoxes in computer logic.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Recurrence relations/index.mdx': `---
title: Recurrence Relations
description: "Mathematical equations that recursively define a sequence based on its previous terms, fundamentally used to calculate the Time Complexity of recursive algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Recurrence Relations"
  subtitle="The Mathematics of Recursion"
  tags={['Mathematics', 'Discrete Math', 'Algorithms', 'Big O']}
>

A **Recurrence Relation** is an equation that recursively defines a mathematical sequence. Instead of giving you a formula for the $n^{th}$ term directly, it defines the $n^{th}$ term as a function of the preceding terms. 

In computer science, they are the absolute most critical tool for determining the $O(N)$ Time Complexity of recursive algorithms like Merge Sort or Binary Search.

## 1. The Fibonacci Sequence

The most famous recurrence relation in the world is the Fibonacci sequence:
$F_n = F_{n-1} + F_{n-2}$ (with base cases $F_0 = 0$, $F_1 = 1$).

If you write a naive recursive function to calculate Fibonacci, the time complexity of the algorithm *is* this exact recurrence relation. Solving this relation mathematically proves that the time complexity is $O(2^N)$, which is exponential and terrible.

## 2. Solving Recurrences for Algorithms

When analyzing an algorithm (like Merge Sort), you write its runtime as a recurrence relation:
$T(n) = 2T(n/2) + O(n)$

This translates to: *"The total time to sort $n$ items is equal to the time it takes to sort two halves of size $n/2$, plus $O(n)$ time to merge them back together."*

To solve this equation and find the final Big O notation, computer scientists use three methods:
1. **The Substitution Method**: Guess the mathematical answer and prove it using Mathematical Induction.
2. **The Recursion Tree Method**: Draw the algorithm execution as a tree, sum up the time taken at each level, and calculate the sum of the series.
3. **The Master Theorem**: A "cheat code" formula that instantly solves almost all standard Divide-and-Conquer recurrence relations. (Using the Master Theorem instantly proves that $T(n) = 2T(n/2) + O(n)$ evaluates to $O(N \\\\log N)$).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/tabulation)/index.mdx': `---
title: Tabulation
description: "The bottom-up approach to Dynamic Programming, building solutions iteratively using an array or table to avoid the overhead of recursive function calls."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Tabulation (Dynamic Programming)"
  subtitle="The Bottom-Up Approach"
  tags={['Algorithms', 'Dynamic Programming', 'Optimization']}
>

Dynamic Programming (DP) is a strategy for solving massive problems by breaking them down into smaller overlapping subproblems. There are two ways to code DP: Top-Down (Memoization) and Bottom-Up (**Tabulation**).

## 1. How Tabulation Works

Instead of starting at the massive target problem and recursively calling the function downwards, **Tabulation starts at the absolute smallest base case (index 0) and iterates upwards using a loop.**

It literally builds a "table" (an Array or Matrix) of answers.
To calculate Fibonacci(5), you don't call TICK1fib(4) + fib(3)TICK1. You create an array:
TICK1[0, 1]TICK1.
Then you run a loop from $i=2$ to $5$:
TICK1dp[i] = dp[i-1] + dp[i-2]TICK1.

## 2. Tabulation vs Memoization

Why use Tabulation instead of Memoization?
- **No Stack Overflow**: Memoization relies on Recursion. If you try to calculate TICK1fib(10000)TICK1 recursively, you will exceed the Maximum Call Stack Size and crash the program. Tabulation is just a standard TICK1forTICK1 loop, so it never overflows the call stack.
- **Speed**: While both are $O(N)$ time complexity, Tabulation is practically faster because it avoids the CPU overhead of repeatedly allocating and destroying recursive function frames in memory.
- **State Space Optimization**: With Tabulation, you can often optimize the memory from $O(N)$ to $O(1)$. In the Fibonacci loop, you don't actually need to keep the entire array of 10,000 numbers in memory; you only need to keep track of the *last two* variables. This trick is nearly impossible to implement cleanly using Top-Down Memoization.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.2 Graph Algorithms/union by rank)/index.mdx': `---
title: Union by Rank
description: "An optimization technique for the Disjoint Set (Union-Find) data structure that prevents the internal trees from becoming highly unbalanced."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Union by Rank"
  subtitle="Optimizing Disjoint Sets"
  tags={['Algorithms', 'Graph Theory', 'Data Structures']}
>

The **Disjoint Set (Union-Find)** data structure is used to group items into non-overlapping clusters (like finding connected components in a network). It supports two operations: TICK1Find(x)TICK1 (which cluster is X in?) and TICK1Union(x, y)TICK1 (merge X's cluster with Y's cluster).

Under the hood, these clusters are represented as Trees. If you merge them naively, you can accidentally create a tree that is just a single straight line (a linked list). If this happens, TICK1Find(x)TICK1 degrades from $O(1)$ to a terrible $O(N)$ time complexity.

## 1. The Optimization

**Union by Rank** fixes this by ensuring the trees always remain shallow and wide.

When merging two trees, the algorithm looks at their "Rank" (an approximation of the tree's depth).
- It takes the root of the **shorter** tree and permanently attaches it as a child to the root of the **taller** tree.
- Because the shorter tree is swallowed by the taller tree, the overall maximum depth of the merged tree *does not increase*.
- The rank only increases by 1 if you happen to merge two trees that are the exact same height.

## 2. The Resulting Time Complexity

By strictly using Union by Rank, the maximum height of any tree with $N$ nodes is mathematically capped at $O(\\\\log N)$.
When combined with another optimization called **Path Compression**, the time complexity of the TICK1Find()TICK1 operation becomes $O(\\\\alpha(N))$, where $\\\\alpha$ is the Inverse Ackermann function. 

For all practical numbers in the physical universe, $\\\\alpha(N) \\\\le 4$, making the operation effectively **$O(1)$ Constant Time**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/DIP)/index.mdx': `---
title: Dependency Inversion Principle (DIP)
description: "The 'D' in SOLID, stating that high-level modules should not depend on low-level modules, but both should depend on abstractions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Dependency Inversion Principle (DIP)"
  subtitle="Decoupling Architecture"
  tags={['OOP', 'Design Patterns', 'Architecture', 'SOLID']}
>

The **Dependency Inversion Principle (DIP)** is the "D" in the famous SOLID principles of Object-Oriented Programming. It is the core architectural rule that allows large-scale enterprise software to remain flexible and easily testable.

## 1. The Rule

The principle states two things:
1. High-level modules (business logic) should not depend on low-level modules (databases, APIs, UI). Both should depend on **Abstractions** (Interfaces).
2. Abstractions should not depend on details. Details should depend on abstractions.

## 2. The Bad Way (Tight Coupling)

Imagine a TICK1CheckoutServiceTICK1 that calculates cart totals. Inside the class, you write TICK1const stripe = new StripeAPI()TICK1.
The high-level checkout logic is now hard-coded and tightly coupled to the low-level Stripe API. If the company decides to switch to PayPal next year, you have to rip open the core business logic file and rewrite it, risking massive bugs. Furthermore, you cannot run automated Unit Tests on the checkout logic without accidentally charging a real credit card.

## 3. The Good Way (Inversion)

Instead, you create an Interface called TICK1IPaymentGatewayTICK1 with a TICK1charge()TICK1 method.
You rewrite the TICK1CheckoutServiceTICK1 so it only accepts the Interface via its constructor (Dependency Injection).

Now, the CheckoutService has no idea what "Stripe" is. It just knows it has *some* object that fulfills the IPaymentGateway contract.
- To run production, you pass in the Stripe class.
- To switch to PayPal, you pass in a new PayPal class. The CheckoutService file remains 100% untouched.
- To run automated tests, you pass in a "FakePaymentGateway" that just returns TICK1trueTICK1, allowing instant testing without hitting the internet.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Propositional logic/index.mdx': `---
title: Propositional Logic
description: "The branch of mathematical logic concerned with the study of propositions (statements that are either true or false) and their combination using logical operators."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Propositional Logic"
  subtitle="The Algebra of Truth"
  tags={['Mathematics', 'Discrete Math', 'Logic', 'Computer Architecture']}
>

**Propositional Logic** (also called Boolean Logic) is the absolute foundation of all computer science. Underneath the Python, the C++, and the Operating System, a computer is just billions of microscopic electrical switches calculating Propositional Logic.

## 1. Propositions

A proposition is a declarative statement that is definitively **True** or **False**, but not both.
- "The sky is blue" (Proposition: True)
- "2 + 2 = 5" (Proposition: False)
- "What time is it?" (Not a proposition, it cannot be True/False).

## 2. Logical Operators

We combine simple propositions into massive, complex circuits using operators:
- **Conjunction (AND / $\\\\land$)**: True only if both sides are True.
- **Disjunction (OR / $\\\\lor$)**: True if at least one side is True.
- **Negation (NOT / $\\\\lnot$)**: Flips True to False, and False to True.
- **Implication (IF...THEN / $\\\\rightarrow$)**: "If it rains, then the ground is wet." This is mathematically False *only* when the condition is True but the result is False.
- **XOR (Exclusive OR / $\\\\oplus$)**: True if *exactly one* side is True. (Critically used in Cryptography).

## 3. Truth Tables

Because propositions can only be True or False, there are a finite number of possible outcomes for any equation. Mathematicians map every single possible combination in a **Truth Table**.

If you have 3 variables ($P, Q, R$), the Truth Table will have exactly $2^3 = 8$ rows.
By mapping out Truth Tables, hardware engineers can mathematically prove that a massive, complicated logic circuit is equivalent to a smaller, simpler one, allowing them to optimize the physical silicon inside a CPU.

<Callout type="warning" title="De Morgan's Laws">
  A critical theorem for software developers trying to simplify messy TICK1ifTICK1 statements:
  TICK1!(A || B)TICK1 is mathematically identical to TICK1!A && !BTICK1
  TICK1!(A && B)TICK1 is mathematically identical to TICK1!A || !BTICK1
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/64. Interview - Problem-Solving Prep Topics/Operating systems/index.mdx': `---
title: Operating Systems (Interview Prep)
description: "A summary of the core OS concepts frequently tested in systems engineering and low-level software engineering interviews."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Operating Systems (Interview Prep)"
  subtitle="Mastering the Kernel"
  tags={['Interviews', 'Operating Systems', 'Systems Design']}
>

While frontend and web development interviews focus heavily on React or JavaScript, backend, infrastructure, and C++/Go/Rust interviews will deeply test your knowledge of Operating Systems. You must understand how the Kernel mathematically interacts with the physical hardware.

## 1. Processes vs. Threads

This is the most common OS interview question in the world.
- **Process**: A program in execution. It has its own totally isolated memory space (Heap), its own File Descriptors, and its own Stack. If Process A crashes, it has zero impact on Process B. However, because they are isolated, processes communicating with each other (IPC) is extremely slow and expensive.
- **Thread**: The smallest unit of CPU execution. Threads exist *inside* a Process. All threads inside a process share the exact same Heap memory and File Descriptors (though they have their own Stack). Because they share memory, they can communicate instantly, but if two threads try to write to the same memory address simultaneously without a Mutex lock, it causes a catastrophic Race Condition.

## 2. Concurrency vs. Parallelism

- **Concurrency**: The OS is juggling. You have 1 CPU Core, but you are running 10 apps. The OS kernel rapidly context-switches between the apps every few milliseconds. They are not running at the exact same time, but they *appear* to be.
- **Parallelism**: True simultaneous execution. You have 4 physical CPU Cores, and 4 threads are actively executing physical electrical instructions at the exact same picosecond.

## 3. Virtual Memory & Paging

If your computer has 8GB of physical RAM, how can you run a 12GB video game?
The OS uses **Virtual Memory**. It gives the video game a fake, mathematical memory address space. The OS's Memory Management Unit (MMU) chunks the physical RAM into 4KB "Pages". It keeps the active parts of the game in physical RAM, and silently writes the inactive 4KB chunks out to the physical Hard Drive (Swapping/Paging). When the game needs that memory again, the OS triggers a "Page Fault" and swaps it back into RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/64. Interview - Problem-Solving Prep Topics/Networks/index.mdx': `---
title: Networks (Interview Prep)
description: "A summary of the core computer networking concepts frequently tested in backend, infrastructure, and SRE interviews."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Networks (Interview Prep)"
  subtitle="Mastering Internet Protocols"
  tags={['Interviews', 'Networking', 'Systems Design']}
>

If you are interviewing for a Backend, DevOps, or Site Reliability Engineering (SRE) role, you will be deeply tested on exactly how data physically travels across the internet. 

## 1. TCP vs. UDP

This is the absolute most common networking interview question. You must know the tradeoffs:
- **TCP (Transmission Control Protocol)**: A connection-oriented protocol. It performs a "3-Way Handshake" (SYN, SYN-ACK, ACK) before sending data. It guarantees delivery (if a packet is dropped, TCP autonomously retransmits it), guarantees order, and prevents network congestion. Used for HTTP (Websites), Emails, and File Downloads where dropping a single byte corrupts the file.
- **UDP (User Datagram Protocol)**: A connectionless protocol. It just blindly blasts packets at the IP address as fast as possible. No handshakes, no guarantee of delivery, no ordering. Used for Video Calls (Zoom) and Multiplayer Gaming, where speed is critical and if a packet drops, you don't care, you just drop the video frame and move on.

## 2. The OSI Model

You are often asked to explain the 7 layers of the OSI model, or at least the critical ones:
- **Layer 2 (Data Link)**: MAC Addresses. Switches. How data moves physically across a local office room.
- **Layer 3 (Network)**: IP Addresses. Routers. How data finds its way across the global internet (BGP).
- **Layer 4 (Transport)**: TCP and UDP. Ports (80, 443).
- **Layer 7 (Application)**: HTTP, HTTPS, DNS, SSH, WebSockets.

## 3. DNS (Domain Name System)

*Question: "What happens exactly when you type google.com into your browser?"*
You must explain the DNS resolution process. The browser checks its local cache. If empty, it asks the OS. The OS asks the ISP's DNS Resolver. The Resolver recursively queries the global Root Name Servers, then the TICK1.comTICK1 Top-Level Domain servers, and finally Google's Authoritative Name Server to mathematically map TICK1google.comTICK1 to the IP Address TICK1142.250.190.46TICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/64. Interview - Problem-Solving Prep Topics/SQL practice/index.mdx': `---
title: SQL Practice (Interview Prep)
description: "A guide to the most common SQL query patterns and database concepts tested in software engineering and data science interviews."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SQL Practice (Interview Prep)"
  subtitle="Mastering the Relational Query"
  tags={['Interviews', 'SQL', 'Databases', 'Data Science']}
>

Almost every backend engineering or data science interview will include a live SQL coding round. You are expected to be able to write complex queries on a whiteboard or in a shared CoderPad without relying on an ORM like Prisma or Hibernate.

## 1. The Core Operations

You must have these deeply memorized:
- **GROUP BY & HAVING**: The interviewer will ask: *"Find all departments that have more than 5 employees."* You must know that you cannot use the TICK1WHERETICK1 clause for aggregates. You must TICK1GROUP BY department_idTICK1 and use TICK1HAVING COUNT(employee_id) > 5TICK1.
- **The JOINs**:
  - TICK1INNER JOINTICK1: Only returns rows that have a match in both tables.
  - TICK1LEFT JOINTICK1: Returns all rows from the left table, and fills with NULLs if there is no match on the right. (Crucial for questions like *"Find all users who have NEVER made a purchase"*).

## 2. Window Functions (The Differentiator)

If you are interviewing for a Senior or Data role, standard GROUP BY is not enough. You will be tested on **Window Functions**.
*Question: "Find the 2nd highest paid employee in every single department."*
You cannot easily do this with standard SQL. You must use TICK1DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)TICK1. Window functions allow you to perform calculations across a set of rows related to the current row, without actually collapsing the rows like a TICK1GROUP BYTICK1 does.

## 3. Indexing and Performance

Backend interviews will test your understanding of Database execution plans:
- **B-Tree Indexes**: You must explain that creating an Index mathematically creates a B-Tree data structure under the hood, changing a query's search time from $O(N)$ (a Full Table Scan) to $O(\\\\log N)$.
- **The Tradeoff**: You must explain to the interviewer that you shouldn't just index every column, because while Indexes make TICK1SELECTTICK1 lightning fast, they make TICK1INSERTTICK1 and TICK1UPDATETICK1 much slower (because the database now has to physically re-balance the B-Tree structure on the hard drive).

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    finalContent = finalContent.replace(/\\\\\\{/g, '\\\\lbrace ').replace(/\\\\\\}/g, '\\\\rbrace ')
    finalContent = finalContent.replace(/\r\n/g, '\n')
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
