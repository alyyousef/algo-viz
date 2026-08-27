import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/async-await/index.mdx': `---
title: Async/Await
description: Syntactic sugar that mathematically transforms asynchronous, non-blocking code into a structure that looks and behaves like synchronous code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Async / Await">

Before TICK1async/awaitTICK1, handling asynchronous operations required chaining Promises (TICK1.then().catch()TICK1) or using deep Callback chains. TICK1async/awaitTICK1 mathematically flattens this complexity.

## 1. The Mathematical Illusion
When you write TICK1let data = await fetch(url);TICK1, the compiler plays a mathematical trick. 
It does not actually halt the CPU thread (which would freeze the entire application). Instead, the TICK1awaitTICK1 keyword acts as an invisible **Generator TICK1yieldTICK1**. The compiler mathematically slices your function into two parts right at the TICK1awaitTICK1 line. It saves all your local variables to the Heap, exits the function entirely, and hands control back to the Event Loop. 
When the network request finishes 50 milliseconds later, the Event Loop calls the second half of your function, pushing your variables back onto the Stack, maintaining the mathematical illusion that the function just "paused."

## 2. The Color of Functions
TICK1async/awaitTICK1 introduces a mathematical problem known as "Function Coloring."
If Function A is tagged as TICK1asyncTICK1, it is mathematically fundamentally different from a normal function (it returns a Promise, not raw data). Therefore, if Function B calls Function A, Function B *must* also become TICK1asyncTICK1 to use TICK1awaitTICK1. This mathematical infection spreads all the way up the Call Stack, forcing the entire architecture to be written asynchronously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Asynchronous programming/index.mdx': `---
title: Asynchronous Programming
description: A mathematical execution model where the CPU initiates long-running tasks and immediately moves on to other work, returning to the tasks only when they complete.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Asynchronous Programming">

In Synchronous programming, if you ask the CPU to read a 5GB file from the hard drive, the CPU mathematically halts. It sits completely idle for 3 seconds, unable to process user clicks or network requests until the file is loaded (Blocking I/O).

## 1. Non-Blocking I/O
Asynchronous programming solves this mathematical inefficiency.
When the program requests the 5GB file, the CPU fires off a command to the Hard Drive Controller (a separate piece of hardware). Because the hard drive handles the actual read, the CPU mathematically returns immediately to the main program, free to process millions of other instructions.

## 2. Interrupts and Context Switching
How does the CPU know when the file is ready? 
When the Hard Drive Controller finishes reading the 5GB into RAM, it sends a physical electrical **Hardware Interrupt** to the CPU. The CPU instantly drops what it is doing, saves its current mathematical state (Context Switch), and executes an Interrupt Handler routine (or pushes an Event into the Event Loop), allowing the program to safely resume processing the file data. This mathematical decoupling allows Node.js to handle 10,000 concurrent network connections on a single CPU thread.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Callbacks/index.mdx': `---
title: Callbacks
description: The foundational mathematical technique for asynchronous execution, where a function is passed as an argument to be executed at a later time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Callbacks">

A Callback is mathematically just a Memory Pointer to a function. Instead of executing the function immediately, you pass the pointer to another system, mathematically authorizing that system to execute your function when a specific event occurs.

## 1. The Mathematical Mechanism
In C, this is done via Function Pointers: TICK1void onClick(void (*callback)())TICK1.
When you pass a Callback, you are telling the CPU: "Do not execute this code now. But when the user clicks the mouse, jump to this memory address." This is the foundational mathematical concept that makes all UI frameworks and Event-Driven systems possible.

## 2. Callback Hell (Inversion of Control)
When Callbacks are nested deeply for asynchronous I/O (e.g., read a file, then query a database, then send an email), the mathematical flow of the code becomes inverted. 
Instead of the top-level program controlling the execution, the control is entirely handed off to the deepest nested function. This leads to "Callback Hell" (the Pyramid of Doom), where error handling becomes mathematically disjointed because a TICK1try-catchTICK1 block at the top level cannot mathematically catch an error thrown inside an asynchronous callback executed 50 milliseconds later.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Coroutines/index.mdx': `---
title: Coroutines
description: A form of cooperative multitasking where functions can mathematically yield control back and forth to each other without requiring the OS to manage physical threads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Coroutines">

A standard function executes from top to bottom. A Coroutine is a function that can mathematically pause its execution, yield control to another Coroutine, and later resume exactly where it left off.

## 1. Cooperative vs Preemptive Multitasking
In standard multithreading, the Operating System uses **Preemptive Multitasking**. The OS physically halts Thread A (Context Switch) and gives CPU time to Thread B, whether Thread A wanted to stop or not. This is mathematically expensive and requires Mutex locks to prevent data corruption.
Coroutines use **Cooperative Multitasking**. The OS doesn't intervene. Coroutine A explicitly, mathematically says TICK1yieldTICK1, voluntarily handing the CPU to Coroutine B. Because the coroutines never interrupt each other violently, you rarely need Mutex locks, resulting in insanely fast, lock-free concurrency.

## 2. Stackless vs Stackful
- **Stackless Coroutines** (e.g., C++20, Rust, Kotlin): The coroutine's state (its local variables) is mathematically packaged into an object and stored on the Heap when it pauses. It is highly memory efficient.
- **Stackful Coroutines** (Fibers, Go Goroutines): Each coroutine is assigned its own tiny, physical Stack in memory (e.g., 2KB). When it pauses, the CPU physically swaps the Stack Pointer to another coroutine's stack.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Event loops/index.mdx': `---
title: Event Loops
description: A mathematically continuous loop that acts as the absolute orchestrator of all asynchronous tasks, executing callbacks synchronously as hardware events complete.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Event Loops">

The Event Loop is the beating mathematical heart of single-threaded asynchronous architectures like Node.js, the Browser (JavaScript), and Python's TICK1asyncioTICK1.

## 1. The Single-Threaded Illusion
JavaScript has exactly one CPU thread. How can it download 10 files simultaneously?
The Event Loop relies on the Operating System's multithreaded Kernel (via TICK1epollTICK1 in Linux or TICK1kqueueTICK1 in Mac). When you execute TICK1fetch(url)TICK1, the Event Loop mathematically hands the work off to the OS and continues running your code.
The OS uses its own hidden threads to download the files. When a file finishes, the OS places the result (and your Callback) into the **Task Queue**. 

## 2. The Loop Mechanics
The Event Loop executes a mathematically infinite TICK1while(true)TICK1 cycle:
1. Is the Call Stack completely empty?
2. If yes, pull the oldest Callback out of the Task Queue.
3. Push it onto the Call Stack and execute it completely (Run-to-Completion).
This mathematical guarantee (Run-to-Completion) means that while your Callback is executing, no other JavaScript code in the universe can interrupt it. You never have to worry about data races or Mutex locks, but if you accidentally write an infinite TICK1whileTICK1 loop in your Callback, you mathematically block the Event Loop, freezing the entire application forever.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Green threads-fibers/index.mdx': `---
title: Green Threads / Fibers
description: User-space threads managed entirely by the language's runtime engine, allowing developers to spawn millions of concurrent tasks without overwhelming the Operating System.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Green Threads / Fibers">

Green Threads (called Goroutines in Go, or Processes in Erlang) look and feel exactly like OS Threads to the developer, but mathematically, they are completely different.

## 1. The Heavy Cost of OS Threads
When you spawn a native OS Thread (e.g., TICK1pthreadTICK1 in C or Java), the Operating System gets involved. It mathematically allocates a massive 1-Megabyte physical Stack in RAM for the thread. If you try to spawn 100,000 OS Threads to handle 100,000 network connections, you instantly consume 100GB of RAM and crash the server.

## 2. The M:N Scheduler
Green Threads solve this by ignoring the OS. 
The Go Runtime Engine allocates maybe 4 native OS Threads (one for each physical CPU core). It then mathematically spawns 100,000 Goroutines (Green Threads) inside its own memory space. A Goroutine only uses 2-Kilobytes of RAM. 
The Go Runtime acts as a mini-Operating System (an M:N Scheduler). It mathematically multiplexes the 100,000 Goroutines onto the 4 physical OS threads. If one Goroutine blocks (waiting for a network packet), the Go Runtime instantly hot-swaps it off the OS thread and swaps a ready Goroutine in, allowing massive concurrency with near-zero mathematical overhead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.6 Concurrency Basics/Promises-Futures/index.mdx': `---
title: Promises / Futures
description: Mathematical proxy objects that act as a placeholder for a value that is currently unknown but is guaranteed to be resolved at some point in the future.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Promises / Futures">

Promises (JavaScript) and Futures (Rust, Java, C++) are the mathematical objects used to escape Callback Hell. They provide a standardized structure for handling asynchronous state.

## 1. The Three Mathematical States
A Promise is a State Machine. It can only mathematically exist in one of three states:
1. **Pending**: The async operation is still running in the background.
2. **Fulfilled (Resolved)**: The operation succeeded, and the Promise mathematically locks in the resulting data.
3. **Rejected**: The operation failed, and the Promise mathematically locks in the Error object.
Because this state transition is mathematically one-way, a Promise can never change its value once it is resolved, making it incredibly predictable and thread-safe.

## 2. Monadic Chaining
Unlike Callbacks, Promises are mathematically composable (like Monads).
When you call TICK1promise.then(callback)TICK1, it does not mutate the original Promise. It mathematically generates and returns a brand new Promise. This allows you to chain operations sequentially: TICK1fetch().then(parse).then(save)TICK1. If an error occurs at any point in the chain, it mathematically skips the remaining TICK1.then()TICK1 blocks and falls perfectly into the single TICK1.catch()TICK1 block at the end, restoring centralized, linear error handling to asynchronous code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/A-B testing/index.mdx': `---
title: A/B Testing
description: The rigorous mathematical process of comparing two versions of a system (A and B) to determine which performs statistically better in a live environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="A/B Testing">

In modern software engineering, you do not guess if a red button is better than a blue button. You use A/B Testing to mathematically prove it using live user data and statistical significance.

## 1. Randomized Control Trials
A/B Testing is essentially a medical clinical trial applied to software.
The system mathematically routes 50% of incoming users to the Control Group (Version A - the current blue button), and 50% to the Treatment Group (Version B - the new red button). 
The system tracks a specific mathematical KPI (e.g., Click-Through Rate). If Version A gets a 5% CTR, and Version B gets a 5.5% CTR, is Version B actually better, or is that 0.5% difference just random noise?

## 2. Statistical Significance (P-Value)
To answer that, Data Scientists calculate the **P-Value**. 
The P-Value mathematically calculates the probability that the 0.5% increase was purely a random coincidence. 
If the P-Value is 0.02 (2%), it means there is a 98% mathematical certainty that the red button physically caused the increase in clicks. The industry standard threshold for Statistical Significance is a P-Value of < 0.05. Only when this mathematical threshold is crossed does the engineering team permanently deploy the red button to 100% of the user base.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Business intelligence (BI)/index.mdx': `---
title: Business Intelligence (BI)
description: The architecture and mathematical modeling used to extract, transform, and visualize massive datasets to drive executive-level decision making.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Business Intelligence (BI)">

Software engineering generates the data; Business Intelligence (BI) mathematically analyzes it to extract actionable human insight. BI is the bridge between raw server logs and corporate strategy.

## 1. The ETL Pipeline
BI relies on a highly mathematical pipeline known as ETL (Extract, Transform, Load).
- **Extract**: Pulling raw data from fragmented sources (Production SQL databases, JSON logs, external APIs).
- **Transform**: The most mathematically complex phase. Data is cleaned, normalized, and aggregated (e.g., converting 10 million raw HTTP requests into a daily average latency metric).
- **Load**: Inserting the transformed data into a highly optimized Data Warehouse (like Snowflake or BigQuery).

## 2. Data Cubes and OLAP
Production databases use OLTP (Online Transaction Processing), mathematically optimized for quickly inserting single rows. 
BI Warehouses use OLAP (Online Analytical Processing), mathematically optimized for running massive aggregations across billions of rows.
BI engineers build **Data Cubes**—multidimensional mathematical arrays. Instead of calculating total sales per region per month on the fly (which would take hours), the Data Cube mathematically pre-calculates the intersections of all dimensions. When an executive opens a Tableau or PowerBI dashboard, the charts render in milliseconds because the complex mathematics have already been solved.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Causal inference/index.mdx': `---
title: Causal Inference
description: The advanced mathematical field that seeks to prove a definitive cause-and-effect relationship between variables, moving beyond simple statistical correlation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Causal Inference">

"Correlation does not imply causation." Causal Inference is the rigorous mathematical framework (championed by Judea Pearl) used to prove that A actually *causes* B, rather than A and B just happening to occur at the same time.

## 1. Confounding Variables
If a data scientist analyzes a dataset and finds a massive mathematical correlation between "Ice Cream Sales" and "Shark Attacks," a naive algorithm would conclude that eating ice cream attracts sharks.
Causal Inference introduces the concept of a **Confounder** (e.g., "Summer Weather"). Hot weather independently causes both ice cream sales and beach visits (which lead to shark attacks). The math must mathematically isolate and control for the Confounder to prove the true causal link between the two target variables is actually zero.

## 2. Causal Diagrams (DAGs)
To solve these problems, scientists use Directed Acyclic Graphs (DAGs). 
A DAG is a mathematical model where variables are nodes, and arrows represent assumed causal direction. By applying "Do-Calculus" (simulating a physical intervention, like TICK1P(Y | do(X))TICK1), algorithms can mathematically sever the confounding pathways in the graph. This allows Data Scientists to extract true causal effects from raw observational data, even in situations where a randomized A/B test is physically or ethically impossible.

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
