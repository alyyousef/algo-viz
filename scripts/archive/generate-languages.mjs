import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '1. Programming Languages/1.1 General-Purpose/C#/index.mdx': `---
title: C# (C-Sharp)
description: A modern, object-oriented, and type-safe programming language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="C#">

C# (pronounced "C-Sharp") is a modern, object-oriented, and type-safe programming language created by Microsoft. It runs on the .NET framework (and the open-source, cross-platform .NET Core/.NET 5+). It is deeply integrated into the Windows ecosystem but has become a dominant language in backend development and game development globally.

<Callout icon="info" title="The Enterprise Standard">
  Alongside Java, C# is one of the most widely used languages for large-scale enterprise application development, particularly backend APIs via ASP.NET Core.
</Callout>

## Key Features

<ComparisonTable 
  headers={['Feature', 'Description', 'Benefit']}
  rows={[
    ['LINQ (Language Integrated Query)', 'Provides native query syntax directly in C# for filtering and projecting arrays/databases.', 'Readability and compile-time checking of queries.'],
    ['Properties', 'First-class getters and setters.', 'Eliminates the need to write boiler-plate \`getName()\` methods.'],
    ['Async/Await', 'C# pioneered the async/await syntax that JavaScript later adopted.', 'Clean, non-blocking asynchronous programming.'],
    ['Garbage Collection', 'Automatic memory management by the .NET runtime.', 'No manual memory leaks like in C/C++.']
  ]}
/>

## Example: LINQ and Properties

\`\`\`csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class User
{
    // Auto-implemented property
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Program
{
    public static void Main()
    {
        var users = new List<User>
        {
            new User { Name = "Alice", Age = 25 },
            new User { Name = "Bob", Age = 17 },
            new User { Name = "Charlie", Age = 30 }
        };

        // LINQ query to find adults
        var adults = users.Where(u => u.Age >= 18).OrderBy(u => u.Name);

        foreach (var adult in adults)
        {
            Console.WriteLine(adult.Name);
        }
    }
}
\`\`\`

## Common Use Cases

<ArchitectureDiagram chart={\`
graph TD
  CSharp[C# Language]
  
  subgraph Ecosystem
    ASP[ASP.NET Core\\nBackend APIs]
    Unity[Unity Game Engine\\nGame Dev]
    MAUI[.NET MAUI\\nMobile/Desktop Apps]
    Blazor[Blazor\\nWebAssembly Frontend]
  end
  
  CSharp --> ASP
  CSharp --> Unity
  CSharp --> MAUI
  CSharp --> Blazor
\`} />

</TechnologyTemplate>
`,
  '1. Programming Languages/1.1 General-Purpose/C++/index.mdx': `---
title: C++
description: A general-purpose programming language created as an extension of the C programming language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="C++">

C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language ("C with Classes"). It is an incredibly powerful, compiled language that gives developers near absolute control over system resources and memory.

<Callout icon="warning" title="With Great Power...">
  Because C++ gives you direct access to raw memory and pointers without garbage collection, it is very easy to cause memory leaks or segmentation faults (crashes). Developers must manually manage memory using \`new\` and \`delete\`, or modern smart pointers.
</Callout>

## Manual Memory Management vs Smart Pointers

Modern C++ (C++11 and later) highly discourages raw pointers, instead utilizing Smart Pointers that automatically clean up memory when they go out of scope.

<ComparisonTable 
  headers={['Type', 'Syntax', 'Behavior']}
  rows={[
    ['Raw Pointer (Legacy)', \`int* ptr = new int(10);\`, 'Must manually call \`delete ptr;\` or it will leak.'],
    ['Unique Pointer', \`std::unique_ptr<int> ptr = std::make_unique<int>(10);\`, 'Automatically deleted when scope ends. Cannot be copied.'],
    ['Shared Pointer', \`std::shared_ptr<int> ptr = std::make_shared<int>(10);\`, 'Maintains a reference count. Deleted when count hits 0.']
  ]}
/>

## Example: Classes and Smart Pointers

\`\`\`cpp
#include <iostream>
#include <memory>
#include <string>

class Player {
private:
    std::string name;
public:
    Player(std::string n) : name(n) {
        std::cout << name << " spawned!" << std::endl;
    }
    ~Player() {
        std::cout << name << " destroyed!" << std::endl;
    }
    void attack() {
        std::cout << name << " attacks!" << std::endl;
    }
};

int main() {
    {
        // Modern C++: Memory is safely allocated
        std::unique_ptr<Player> p1 = std::make_unique<Player>("Hero");
        p1->attack();
    } // p1 goes out of scope here. The destructor (~Player) is automatically called.
    
    return 0;
}
\`\`\`

## Why use C++?

C++ is used wherever performance and resource efficiency are absolutely critical:
- **Game Engines**: Unreal Engine, Unity Core, custom AAA engines.
- **High-Frequency Trading**: Financial systems where nanoseconds matter.
- **Embedded Systems**: Microcontrollers, automotive systems.
- **Operating Systems & Browsers**: Windows, Chrome (V8 Engine).

</TechnologyTemplate>
`,
  '1. Programming Languages/1.1 General-Purpose/Go/index.mdx': `---
title: Go (Golang)
description: An open-source programming language supported by Google.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Go">

Go (often referred to as Golang) is a statically typed, compiled high-level programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.

<Callout icon="tip" title="Simplicity by Design">
  Go intentionally leaves out many features found in modern languages (like classes, inheritance, map/filter/reduce, and complex generics) to force a simple, readable, and highly maintainable codebase.
</Callout>

## Goroutines & Channels

Go's biggest selling point is its incredible concurrency model, allowing millions of concurrent tasks with minimal memory overhead.

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Goroutines', 'Lightweight threads managed by the Go runtime. Started simply by putting the \`go\` keyword in front of a function call. They consume only ~2KB of RAM compared to standard OS threads (1-2MB).'],
    ['Channels', 'Pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values in another.']
  ]}
/>

## Example: Concurrency

\`\`\`go
package main

import (
	"fmt"
	"time"
)

// A function that simulates work
func worker(id int, ch chan string) {
	time.Sleep(time.Second)
	ch <- fmt.Sprintf("Worker %d finished", id)
}

func main() {
	// Create a channel of strings
	messages := make(chan string)

	// Launch 3 goroutines concurrently
	for i := 1; i <= 3; i++ {
		go worker(i, messages)
	}

	// Wait for and print the 3 messages
	for i := 1; i <= 3; i++ {
		msg := <-messages
		fmt.Println(msg)
	}
}
\`\`\`

## Error Handling

Unlike Java or C# which use \`try/catch\` blocks for exceptions, Go treats errors as standard return values. This forces developers to explicitly handle errors at the point of origin.

\`\`\`go
f, err := os.Open("filename.ext")
if err != nil {
    log.Fatal(err)
}
// Do something with f
\`\`\`

</TechnologyTemplate>
`,
  '1. Programming Languages/1.1 General-Purpose/Rust/index.mdx': `---
title: Rust
description: A language empowering everyone to build reliable and efficient software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Rust">

Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency. Rust is syntactically similar to C++, but guarantees memory safety by using a **Borrow Checker** to validate references, eliminating entire classes of bugs (like dangling pointers and data races) without needing a Garbage Collector.

<Callout icon="warning" title="Fighting the Borrow Checker">
  Rust has a notoriously steep learning curve. The compiler is extremely strict and will refuse to compile code that breaks memory safety rules, a phenomenon developers jokingly refer to as "fighting the borrow checker."
</Callout>

## Ownership and Borrowing

Rust's memory safety is governed by three simple rules:
1. Each value in Rust has an **Owner**.
2. There can only be **one** Owner at a time.
3. When the Owner goes out of scope, the value is dropped (memory is freed).

<ComparisonTable 
  headers={['Concept', 'Syntax', 'Meaning']}
  rows={[
    ['Move', \`let a = b;\`, 'Ownership transfers from \`b\` to \`a\`. \`b\` can no longer be used.'],
    ['Immutable Borrow', \`let a = &b;\`, 'Creates a read-only reference to \`b\`. You can have infinite immutable borrows.'],
    ['Mutable Borrow', \`let a = &mut b;\`, 'Creates a read-write reference. You can only have ONE mutable borrow at a time.']
  ]}
/>

## Example: Safe Concurrency

Because of the borrowing rules, it is physically impossible to write a data race in safe Rust.

\`\`\`rust
use std::thread;
use std::sync::{Arc, Mutex};

fn main() {
    // Arc (Atomic Reference Counted) safely shares the Mutex across threads
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter);
        
        let handle = thread::spawn(move || {
            // Lock the mutex before modifying. 
            // If another thread has the lock, this thread will wait.
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap()); // Prints 10
}
\`\`\`

</TechnologyTemplate>
`,
  '1. Programming Languages/1.1 General-Purpose/TypeScript/index.mdx': `---
title: TypeScript
description: JavaScript with syntax for types.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="TypeScript">

TypeScript is a free and open-source high-level programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.

<Callout icon="info" title="Compilation (Transpilation)">
  Browsers cannot execute TypeScript natively. TypeScript code is processed by a compiler (like \`tsc\`, \`esbuild\`, or \`swc\`) that strips away all the type information and spits out pure, standard JavaScript. 
</Callout>

## Why use TypeScript?

JavaScript is dynamically typed, meaning a variable can be a string, and then later become an array, which leads to massive runtime errors in large applications.

<ComparisonTable 
  headers={['Feature', 'Benefit']}
  rows={[
    ['Compile-time Errors', 'Catch typos and mismatched types in your editor before you even run the code.'],
    ['Rich IDE Support', 'Types provide incredible autocomplete, intellisense, and safe refactoring in VSCode.'],
    ['Self-Documenting', 'Interfaces and types explicitly document the shape of your data and API responses.']
  ]}
/>

## Example: Interfaces and Types

TypeScript allows you to define the exact "shape" that an object must have.

\`\`\`typescript
// Define the shape of a User object
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // Optional property
}

// Function requires an argument that matches the User interface
function sendEmail(user: User) {
  console.log(\`Sending email to \${user.email}\`);
}

// ✅ Valid
const myUser: User = { id: 1, name: "Alice", email: "alice@test.com" };
sendEmail(myUser);

// ❌ TypeScript Error: Property 'email' is missing
const badUser: User = { id: 2, name: "Bob" }; 
// sendEmail(badUser); // Would not compile!
\`\`\`

## Architecture

TypeScript sits strictly in the development workflow.

<ArchitectureDiagram chart={\`
graph LR
  TS[TypeScript Code\\n(.ts / .tsx)]
  TSC[TypeScript Compiler\\n(Type Checking)]
  JS[JavaScript Code\\n(.js)]
  Browser[Browser Engine\\n(V8)]
  
  TS --> TSC
  TSC -- Transpiles --> JS
  JS --> Browser
\`} />

</TechnologyTemplate>
`,
}

async function generateLanguages() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateLanguages().catch(console.error)
