import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Ada/index.mdx',
    content: `---
title: Ada
description: "A highly robust, statically typed programming language designed by the US Department of Defense for mission-critical systems."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Ada">
      {children}
    </ConceptTemplate>
  )
}

Named after Ada Lovelace, the first computer programmer, **Ada** was developed in the late 1970s under a contract from the United States Department of Defense (DoD). Its primary goal was to replace the hundreds of different programming languages used across military hardware with a single, ultra-reliable standard.

## 1. Deep Dive & Mechanics

Ada is a structured, statically typed, imperative, and object-oriented high-level programming language. It is built around the philosophy that **code is read much more often than it is written**. Because of this, Ada prioritizes verbosity, extreme strong typing, and explicit declarations over syntactic sugar or conciseness.

Under the hood, the Ada compiler acts as an aggressive static analyzer. It forces the developer to define exact bounds for data types. If an integer is supposed to represent a day of the month, you do not declare it as an \`int\` (which could hold millions of values). You declare it as a restricted range: \`type Day is range 1 .. 31;\`.

If the program attempts to assign the value \`32\` to a \`Day\` variable, the program will throw a constraint error. The SPARK subset of Ada takes this further, allowing developers to mathematically prove that these boundary violations can *never happen at runtime*.

## 2. Mathematical / Theoretical Foundation

Ada's design is heavily influenced by **Design by Contract (DbC)**. A contract is a formal agreement between a software component and its callers. In Ada, this is implemented via pre-conditions and post-conditions.

When writing an algorithm, you mathematically guarantee its correctness. For example, if a function calculates the square root of a number $x$, the pre-condition mathematically states $x \\ge 0$, and the post-condition states $result \\times result \\approx x$.

## 3. Real-World Implementation

Here is an example of Ada's strict range typing and task concurrency (multithreading). Notice the explicit verbosity.

\`\`\`ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Launch_System is

   -- 1. Strictly defined bounds
   type Altitude is range 0 .. 100_000;
   Current_Alt : Altitude := 0;

   -- 2. Concurrency (Tasks)
   task Engine_Monitor;
   
   task body Engine_Monitor is
   begin
      Put_Line("Engine Monitor Started.");
      -- Monitor logic here
   end Engine_Monitor;

begin
   Current_Alt := 50_000;
   Put_Line("Altitude reached: " & Altitude'Image(Current_Alt));
   
   -- Attempting Current_Alt := 150_000; would result in a fatal error!
end Launch_System;
\`\`\`

## 4. Visualizations

\`\`\`mermaid
architecture-beta
    group compiler(cloud)[Ada Compilation Workflow]

    service src(document)[Source Code] in compiler
    service parser(server)[Lexical Analysis] in compiler
    service binder(server)[Binder] in compiler
    service spark(server)[SPARK Prover] in compiler
    service exec(disk)[Executable] in compiler

    src:R --> L:parser
    parser:R --> L:binder
    parser:B --> T:spark
    binder:R --> L:exec
\`\`\`

## 5. Interview Prep

**Q: What is the SPARK subset of Ada?**
**A:** SPARK is a formally defined computer programming language based on a subset of Ada. It removes features that are hard to verify (like dynamic memory allocation) and allows developers to write mathematical proofs. This guarantees the software will be free from runtime exceptions like buffer overflows, division by zero, or null pointer dereferences.

**Q: Explain Ada's approach to concurrency.**
**A:** Ada has built-in concurrency at the language level using constructs called "Tasks" and "Protected Objects," rather than relying entirely on OS-level threading libraries (like \`pthreads\` in C). Tasks communicate via a mechanism called "Rendezvous," ensuring safe synchronization without manual mutex locks.

**Q: Why is Ada considered more readable than C for critical systems?**
**A:** Ada avoids cryptic symbols and relies on explicit English keywords (\`begin\`, \`end loop\`, \`procedure\`). It also forbids implicit type conversions (coercion), meaning you cannot accidentally add a float to an integer without an explicit cast, preventing massive scientific computing errors.

## 6. Production Use Cases

Ada is not used for typical web development or mobile apps. It is the gold standard for **High-Assurance Systems**.

- **Avionics:** The Boeing 777 fly-by-wire flight software is heavily written in Ada. The Airbus A380 also relies on it for critical flight control.
- **Space Exploration:** NASA and the European Space Agency (ESA) use Ada for satellite control and spacecraft.
- **Air Traffic Control:** The UK's NATS (National Air Traffic Services) uses heavily verified Ada software to manage millions of flights safely.

<Callout icon="shield" title="The Ariane 5 Explosion">
Ironically, one of the most famous software bugs in history occurred in an Ada system. The Ariane 5 rocket exploded 40 seconds after launch because a 64-bit floating-point number was converted into a 16-bit integer, causing an overflow. The variable was not protected by Ada's strict constraints because the engineers disabled the check to save CPU cycles!
</Callout>
`,
  },
  {
    path: 'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Ballerina/index.mdx',
    content: `---
title: Ballerina
description: "A modern, open-source programming language designed specifically for cloud-native applications and network integration."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Ballerina">
      {children}
    </ConceptTemplate>
  )
}

**Ballerina** is a relatively new, open-source, statically typed programming language developed by WSO2. Unlike general-purpose languages like Python or Java that treat networking as an afterthought handled by third-party libraries, Ballerina treats **networking as a first-class citizen**.

It is uniquely designed for the modern cloud-native era, where microservices, API integrations, JSON, and network resilience are the core requirements of almost every application.

## 1. Deep Dive & Mechanics

In most languages, making an HTTP request or handling a JSON payload requires importing libraries, setting up complex I/O streams, and manually serializing objects.

In Ballerina, networking concepts (APIs, JSON, XML, endpoints) are built directly into the language's syntax and type system. 

Ballerina uses a **Structural Type System** rather than a Nominal one (like Java). This means that shapes of data (like a JSON payload) can be directly validated against a type definition without writing boilerplate parsing logic. If an API returns a JSON object with a string \`name\` and int \`age\`, Ballerina natively understands this shape at compile time.

Additionally, Ballerina programs are automatically visualizable. Every piece of Ballerina code can be instantly translated into a Sequence Diagram, making it incredibly easy to document and understand microservice interactions.

## 2. Mathematical / Theoretical Foundation

Ballerina's approach to network communication is rooted in **Sequence Calculus** and **Actor Models**. When services communicate over a network, Ballerina represents these interactions geometrically. 

Because network calls are guaranteed to fail eventually (due to latency, DNS drops, etc.), Ballerina natively implements the theoretical principles of **Fault Tolerance** directly in the syntax, providing native language constructs for Retries, Timeouts, and Circuit Breakers without needing a library like resilience4j or Istio.

## 3. Real-World Implementation

Here is an example of a simple HTTP API built in Ballerina. Notice how HTTP concepts are native keywords, and JSON is deeply integrated.

\`\`\`ballerina
import ballerina/http;
import ballerina/io;

// Define a network-bound service on port 8080
service /store on new http:Listener(8080) {

    // A resource function responding to HTTP GET requests
    resource function get products(http:Caller caller, http:Request req) returns error? {
        
        // Native JSON manipulation
        json payload = {
            id: 101,
            name: "Cloud-Native Book",
            price: 29.99
        };

        // Send response back to caller
        check caller->respond(payload);
        io:println("Response sent successfully.");
    }
}
\`\`\`

## 4. Visualizations

Because Ballerina is designed to be visual, its core execution model looks exactly like a sequence diagram between distributed systems.

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant StoreService (Port 8080)
    participant Database

    Client->>StoreService: HTTP GET /store/products
    StoreService->>Database: Query Product ID 101
    Database-->>StoreService: Return Record
    StoreService-->>Client: HTTP 200 OK (JSON Payload)
\`\`\`

## 5. Interview Prep

**Q: What does it mean that Ballerina treats networking as a "first-class citizen"?**
**A:** It means network concepts like Services, Endpoints, HTTP protocols, and data formats (JSON, XML) are part of the core language syntax, not imported as external libraries. The compiler deeply understands network interactions.

**Q: How does Ballerina handle distributed transactions?**
**A:** Ballerina provides native support for distributed transactions, allowing developers to define a transaction block. If an error occurs in one service, Ballerina can automatically coordinate rollbacks across multiple microservices without requiring the developer to write manual compensation logic (like the Saga pattern).

**Q: Explain Ballerina's structural typing vs Java's nominal typing.**
**A:** In Java (nominal), two classes with identical fields are considered different types because they have different names. In Ballerina (structural), types are defined by their structure. If a JSON payload matches the exact fields of a Ballerina \`record\`, the compiler accepts it, making API data binding incredibly seamless.

## 6. Production Use Cases

Ballerina is utilized heavily in enterprise integration and cloud orchestration:
- **API Gateways:** Acting as a secure, fast proxy between client applications and internal microservices.
- **Enterprise Service Buses (ESB) Replacement:** Modernizing legacy architectures by replacing heavy ESBs with lightweight, scalable Ballerina microservices.
- **Data Integration:** Rapidly pulling data from Salesforce, transforming the JSON/XML payloads, and pushing it to an internal SQL database.

<Callout icon="info" title="The Sequence Diagram Equivalency">
WSO2 built Ballerina with a powerful IDE plugin. You can drag and drop visual nodes to create a sequence diagram, and the plugin will automatically generate the Ballerina source code. Conversely, you can write the source code, and it will generate the diagram. They have true 1:1 equivalency.
</Callout>
`,
  },
  {
    path: 'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/C++/index.mdx',
    content: `---
title: C++
description: "A high-performance, compiled, object-oriented systems programming language created by Bjarne Stroustrup as an extension of C."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="C++">
      {children}
    </ConceptTemplate>
  )
}

Created by Bjarne Stroustrup in 1979 at Bell Labs, **C++** was originally named "C with Classes." It was designed to add object-oriented programming (OOP) and high-level abstractions to the lightning-fast, hardware-level capabilities of the C language.

Today, C++ is the undisputed king of performance-critical software. From AAA video games to high-frequency trading platforms, C++ provides developers with unparalleled control over system memory and CPU cycles.

## 1. Deep Dive & Mechanics

C++ is a statically typed, compiled, multi-paradigm language. Unlike managed languages (like Java or C#) that run on a Virtual Machine and use a Garbage Collector to automatically clean up memory, C++ compiles directly down to raw machine code specific to the target architecture (x86, ARM, etc.).

This raw execution speed comes with immense responsibility. Developers must manually manage the heap using \`new\` and \`delete\` (or modern smart pointers). 

Modern C++ (C++11, C++14, C++20) introduced a paradigm shift away from manual raw pointers, introducing RAII (Resource Acquisition Is Initialization). In RAII, resource lifecycle (memory, file handles, mutexes) is bound to the lifespan of an object. When the object goes out of scope, its destructor is automatically called, instantly freeing the resource without the non-deterministic lag of a garbage collector.

## 2. Mathematical / Theoretical Foundation

At a theoretical level, C++'s greatest achievement is **Zero-Cost Abstractions**. 
In computer science, abstraction (like using generic templates, classes, or polymorphism) usually incurs a runtime performance penalty. 

Stroustrup's foundational rule for C++ was: *"What you don't use, you don't pay for. And further: What you do use, you couldn't hand code any better."* 

When a developer uses a C++ \`template\` to create a generic data structure, the compiler generates a heavily optimized, type-specific version of that code at compile-time (Monomorphization). The resulting machine code executes exactly as fast as if the developer had manually written the raw C code for that specific type, ensuring absolute mathematical efficiency ($O(1)$ overhead).

## 3. Real-World Implementation

Here is an example of Modern C++ utilizing RAII with Smart Pointers to ensure memory safety without a garbage collector.

\`\`\`cpp
#include <iostream>
#include <memory>
#include <string>

class HighPerformanceEngine {
public:
    HighPerformanceEngine() {
        std::cout << "Engine initialized in memory." << std::endl;
    }
    ~HighPerformanceEngine() {
        std::cout << "Engine destroyed, memory freed safely." << std::endl;
    }
    void rev() {
        std::cout << "Vroom!" << std::endl;
    }
};

int main() {
    // A scope block
    {
        // Using C++14 std::make_unique. 
        // This allocates memory on the heap safely.
        std::unique_ptr<HighPerformanceEngine> engine = std::make_unique<HighPerformanceEngine>();
        
        engine->rev();
        
    } // The scope ends here. 'engine' goes out of scope.
      // The destructor is automatically called, and memory is instantly freed!

    std::cout << "Program exiting cleanly." << std::endl;
    return 0;
}
\`\`\`

## 4. Visualizations

\`\`\`mermaid
flowchart TD
    A[C++ Source Code .cpp] -->|Compiler gcc/clang| B(Object Files .o)
    B -->|Linker| C(Executable Binary)
    C -->|OS Loader| D[CPU Registers & RAM]
    D --> E{Runtime Execution}
    E -->|Manual Allocation| F[Heap Memory]
    E -->|Function Calls| G[Stack Memory]
    F -->|Explicit Delete / RAII| H[Memory Freed]
\`\`\`

## 5. Interview Prep

**Q: What is a Virtual Function, and how does a VTable work?**
**A:** A virtual function allows a derived class to override a base class method, achieving runtime polymorphism. Under the hood, the compiler creates a Virtual Table (VTable) for the class—an array of function pointers. When the virtual function is called on an object pointer, the program looks up the actual function address in the VTable at runtime. This incurs a slight performance penalty (dynamic dispatch).

**Q: Explain RAII (Resource Acquisition Is Initialization).**
**A:** RAII is the core memory management philosophy of C++. It dictates that a resource (memory, file, socket) should be acquired in an object's constructor and released in its destructor. Since C++ guarantees that destructors are called when an object goes out of scope, resources are deterministically freed without needing a Garbage Collector.

**Q: What is the difference between \`std::unique_ptr\` and \`std::shared_ptr\`?**
**A:** \`unique_ptr\` represents exclusive ownership of a heap object; it cannot be copied, only moved, and has zero runtime overhead. \`shared_ptr\` allows multiple pointers to own the same object, using an internal reference counter. When the reference count drops to zero, the memory is freed.

## 6. Production Use Cases

If you need pure performance, you write it in C++:
- **Video Game Engines:** Unreal Engine is entirely written in C++. Games require rendering 60+ frames per second, making garbage collection pauses unacceptable.
- **High-Frequency Trading (HFT):** Wall Street trading algorithms that must execute trades in microseconds use C++ to minimize network and memory latency.
- **Operating Systems & Browsers:** Portions of Windows, macOS, and the core rendering engines of Chrome (Blink/V8) and Firefox (Gecko) are built in C++.

<Callout icon="warning" title="Memory Leaks & Segfaults">
Because C++ gives you raw access to memory via pointers, accessing memory that has already been freed or attempting to read past the bounds of an array results in an immediate Segmentation Fault, crashing the entire application. Modern C++ mitigates this via Smart Pointers, but the danger is always present.
</Callout>
`,
  },
  {
    path: 'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/C/index.mdx',
    content: `---
title: C
description: "The foundational procedural systems programming language that powers modern operating systems, created by Dennis Ritchie in 1972."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="C">
      {children}
    </ConceptTemplate>
  )
}

Created by Dennis Ritchie at Bell Labs in 1972 to rewrite the UNIX operating system, **C** is arguably the most important programming language in history. 

It acts as the bedrock of modern computing. Almost every modern higher-level language (Python, Java, JavaScript) has its core interpreter or virtual machine written in C. It provides the closest possible interaction with hardware while remaining human-readable.

## 1. Deep Dive & Mechanics

C is a compiled, imperative, procedural language. It does not have objects, classes, or garbage collection. It views data as raw bytes in memory.

The defining characteristic of C is its extensive use of **Pointers**. A pointer is a variable that stores the raw hexadecimal memory address of another variable in RAM. By manipulating pointers, a developer can traverse arrays, construct linked lists, and interact directly with hardware registers without any abstraction getting in the way.

C relies heavily on the Standard Library (\`libc\`), which provides fundamental functions like \`printf\` for console output and \`malloc\` / \`free\` for dynamic heap memory allocation. Because C trusts the programmer implicitly, it does absolutely no bounds checking. If you allocate an array of 5 integers and write to the 10th index, C will happily overwrite random memory, potentially corrupting the OS or causing a catastrophic security vulnerability (Buffer Overflow).

## 2. Mathematical / Theoretical Foundation

C's architecture is deeply tied to the **Von Neumann Architecture** of modern computers, consisting of a CPU, memory, and I/O devices. 

When analyzing the time and space complexity of algorithms in C, developers must consider the hardware-level implications of memory access. For example, traversing a contiguous array in C is mathematically $O(N)$, but due to **CPU Cache Spatial Locality**, it executes significantly faster in hardware than traversing a Linked List, even though a Linked List traversal is also theoretically $O(N)$. C forces the developer to understand how the L1/L2 processor caches fetch blocks of bytes.

## 3. Real-World Implementation

Here is an example demonstrating manual memory allocation and pointers. Notice the raw interaction with bytes using the \`sizeof\` operator.

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // 1. A pointer that will hold the memory address of our array
    int *array;
    int size = 5;

    // 2. Dynamically allocate memory on the Heap
    // We request (5 * 4 bytes) = 20 bytes of continuous memory
    array = (int*) malloc(size * sizeof(int));

    if (array == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // 3. Populate the array via pointer arithmetic
    for (int i = 0; i < size; i++) {
        array[i] = i * 10;
        printf("Address: %p | Value: %d\n", (void*)&array[i], array[i]);
    }

    // 4. Manual cleanup is strictly required to prevent a Memory Leak
    free(array);

    return 0;
}
\`\`\`

## 4. Visualizations

\`\`\`mermaid
architecture-beta
    group ram(disk)[System RAM]

    service stack(server)[Stack Memory] in ram
    service heap(database)[Heap Memory] in ram

    stack:R --> L:heap
\`\`\`
*(When \`malloc\` is called, a pointer is stored in the Stack, but the actual data payload is reserved in the Heap).*

## 5. Interview Prep

**Q: What is a pointer, and how does it differ from a reference?**
**A:** A pointer is a variable that stores a raw memory address. You can perform arithmetic on pointers (e.g., \`ptr + 1\` moves to the next memory block) and they can be reassigned or be NULL. C does not have references (those were introduced in C++). A reference acts as an immutable alias to an existing variable and cannot be NULL.

**Q: Explain what a Buffer Overflow vulnerability is.**
**A:** Because C does no bounds checking, if a user provides an input string that is larger than the memory buffer allocated to store it (e.g., using the unsafe \`gets()\` function), the excess data will spill over and overwrite adjacent memory. Attackers use this to overwrite the function return pointer, hijacking execution to run malicious shellcode.

**Q: What is a Memory Leak in C?**
**A:** A memory leak occurs when a programmer allocates heap memory using \`malloc\` or \`calloc\`, but forgets to release it using \`free\` before the pointer goes out of scope. The memory remains locked and inaccessible. If this happens repeatedly (e.g., inside a loop or server process), the system will eventually run out of RAM and crash.

## 6. Production Use Cases

C is utilized wherever the highest possible efficiency and minimal footprint are required:
- **Operating Systems:** The Linux Kernel, Windows core, and macOS XNU kernel are primarily written in C.
- **Embedded Systems:** Microcontrollers in cars, microwaves, and pacemakers run C code because it operates beautifully with only a few kilobytes of RAM.
- **Interpreters:** CPython (the standard implementation of Python) and the JVM (Java Virtual Machine) are written in C/C++.

<Callout icon="danger" title="Undefined Behavior">
The C standard frequently uses the phrase "Undefined Behavior" (UB). If a program performs an illegal operation (like shifting an integer by a negative number, or reading an uninitialized variable), the compiler is not required to throw an error. It is allowed to do absolutely anything—crash, produce random numbers, or appear to work normally. Finding UB bugs is notoriously difficult.
</Callout>
`,
  },
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    await fs.writeFile(filePath, file.content, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  // Update progress
  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  // Remove the processed files from pending and add to completed
  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
