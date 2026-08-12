import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '21. Databases - Fundamentals/ACID/index.mdx': `---
title: ACID Properties
description: A set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="ACID Properties">

In computer science, ACID is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps. In the context of databases, a sequence of database operations that satisfies the ACID properties (which can be perceived as a single logical operation on the data) is called a transaction.

<Callout icon="error" title="The Banking Example">
  If you transfer $100 from Account A to Account B, the database must subtract $100 from A, and add $100 to B. If the server power cord is unplugged exactly between those two steps, ACID guarantees that when the server reboots, the entire transaction is rolled back as if it never happened. You never lose the $100.
</Callout>

## The Four Properties

<ComparisonTable 
  headers={['Property', 'Description']}
  rows={[
    ['Atomicity', 'All or Nothing. Either every step in the transaction succeeds, or the entire transaction fails and is rolled back completely.'],
    ['Consistency', 'The database must always transition from one valid state to another valid state. It cannot break constraints (like negative balances).'],
    ['Isolation', 'Concurrent transactions executing at the exact same time will not interfere with each other. They will act as if they executed sequentially.'],
    ['Durability', 'Once a transaction is committed, it remains committed even in the event of a total system crash (saved to persistent disk).']
  ]}
/>

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/Transactions/index.mdx': `---
title: Database Transactions
description: A unit of work performed within a database management system against a database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Database Transactions">

A database transaction symbolizes a unit of work performed within a database management system (or similar system) against a database, and treated in a coherent and reliable way independent of other transactions. 

<Callout icon="tip" title="Commit or Rollback">
  A transaction usually starts with \`BEGIN TRANSACTION\`. You then issue several \`UPDATE\` or \`INSERT\` statements. Finally, you issue a \`COMMIT\` (to permanently save them) or \`ROLLBACK\` (to undo them all instantly).
</Callout>

## Transaction Isolation Levels

High isolation prevents race conditions but destroys database performance. Databases let you tune this tradeoff:

<ComparisonTable 
  headers={['Isolation Level', 'Phenomena Allowed', 'Performance']}
  rows={[
    ['Read Uncommitted', 'Dirty Reads (reading data that another transaction hasn\\'t committed yet)', 'Maximum Speed'],
    ['Read Committed', 'Non-repeatable Reads (data changes between two queries in the same transaction)', 'Fast (Default in Postgres)'],
    ['Repeatable Read', 'Phantom Reads (new rows magically appear in a range query)', 'Slow'],
    ['Serializable', 'None. Strict sequential execution.', 'Extremely Slow']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/SQL vs NoSQL/index.mdx': `---
title: SQL vs NoSQL Databases
description: A comparison between Relational (SQL) and Non-Relational (NoSQL) database paradigms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SQL vs NoSQL Databases">

The database landscape is broadly divided into SQL (Relational) and NoSQL (Non-relational) databases. Choosing between them is one of the most critical architectural decisions in system design.

<Callout icon="info" title="The Golden Rule">
  Start with PostgreSQL (SQL). Only move to NoSQL if you have a specific, undeniable reason (e.g., you need to ingest 100,000 JSON documents per second, or you have highly unstructured data).
</Callout>

## Key Differences

<ComparisonTable 
  headers={['Aspect', 'SQL (PostgreSQL, MySQL)', 'NoSQL (MongoDB, DynamoDB)']}
  rows={[
    ['Data Structure', 'Strict Tables, Rows, and Columns (Schemas).', 'Flexible JSON Documents, Key-Value pairs, or Graphs.'],
    ['Scaling', 'Vertically (add more RAM to the server).', 'Horizontally (add 100 cheap servers).'],
    ['Relationships', 'Excellent. Optimized for complex JOINs across multiple tables.', 'Poor. Data is usually duplicated (denormalized) to avoid JOINs.'],
    ['ACID Guarantees', 'Strict ACID compliance.', 'Usually relaxed (Eventual Consistency) in favor of high Availability.']
  ]}
/>

</TechnologyTemplate>
`,
  '3. Programming Paradigms & Language Theory/3.1 Paradigms/Object-oriented programming/index.mdx': `---
title: Object-Oriented Programming (OOP)
description: A programming paradigm based on the concept of "objects", which can contain data and code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Object-Oriented Programming (OOP)">

Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).

<Callout icon="info" title="The Core Four">
  OOP is defined by four foundational pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.
</Callout>

## Common Paradigms

<ComparisonTable 
  headers={['Paradigm', 'Philosophy']}
  rows={[
    ['Procedural (C, Go)', 'Code is a list of instructions. State is separate from the functions that mutate it.'],
    ['Object-Oriented (Java, C#)', 'State and the functions that mutate it are bundled together into "Objects". Objects talk to each other.'],
    ['Functional (Haskell, Clojure)', 'State is immutable. Functions are pure. Data flows through pipelines of functions without side-effects.']
  ]}
/>

</TechnologyTemplate>
`,
  '4. Object-Oriented Programming/Encapsulation/index.mdx': `---
title: Encapsulation
description: The bundling of data with the methods that operate on that data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Encapsulation">

In object-oriented programming, encapsulation refers to the bundling of data with the methods that operate on that data, or the restricting of direct access to some of an object's components.

<Callout icon="tip" title="Data Hiding">
  By making a class's variables \`private\` and forcing outside code to use \`public\` Getters and Setters, the class protects its internal state. A \`BankAccount\` class can throw an error in \`setBalance(amount)\` if the amount is negative, preventing invalid states.
</Callout>

## Access Modifiers

<ComparisonTable 
  headers={['Modifier', 'Accessibility']}
  rows={[
    ['Public', 'Accessible from anywhere in the codebase.'],
    ['Protected', 'Accessible only within the class itself, and by subclasses (children) that inherit from it.'],
    ['Private', 'Accessible ONLY within the exact class where it is declared.']
  ]}
/>

</TechnologyTemplate>
`,
  '4. Object-Oriented Programming/Inheritance (single/index.mdx': `---
title: Inheritance
description: The mechanism of basing an object or class upon another object or class, retaining similar implementation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Inheritance">

In object-oriented programming, inheritance is the mechanism of basing an object or class upon another object (prototype-based inheritance) or class (class-based inheritance), retaining similar implementation.

<Callout icon="warning" title="Composition over Inheritance">
  Modern software engineering strongly prefers Composition over Inheritance. Deep inheritance trees (e.g., \`Animal -> Mammal -> Dog -> Poodle\`) become incredibly rigid and difficult to refactor. It is better to build a \`Poodle\` by giving it a \`BarkBehavior\` and a \`FurAttribute\`.
</Callout>

## Types of Inheritance

<ComparisonTable 
  headers={['Type', 'Description']}
  rows={[
    ['Single Inheritance', 'A subclass inherits from exactly one parent superclass. (Java, C#).'],
    ['Multiple Inheritance', 'A subclass inherits from two or more parent superclasses. Often leads to the "Diamond Problem" of ambiguity. (C++, Python).']
  ]}
/>

</TechnologyTemplate>
`,
  '4. Object-Oriented Programming/Polymorphism (ad-hoc/index.mdx': `---
title: Polymorphism
description: The provision of a single interface to entities of different types.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Polymorphism">

In programming languages and type theory, polymorphism is the provision of a single interface to entities of different types, or the use of a single symbol to represent multiple different types.

<Callout icon="tip" title="The Power of Interfaces">
  If you have an array of \`IShape\` objects, you can loop through the array and call \`.draw()\` on every item. The \`Circle\` object will draw a circle, and the \`Square\` object will draw a square. The calling code doesn't need to know what specific shape it is dealing with.
</Callout>

## Types of Polymorphism

<ComparisonTable 
  headers={['Type', 'Description']}
  rows={[
    ['Subtype (Runtime)', 'Method Overriding. A child class replaces the implementation of a parent class method.'],
    ['Ad-hoc (Compile-time)', 'Method Overloading. Having three functions named \`add()\`, but one takes ints, one takes floats, one takes strings.'],
    ['Parametric', 'Generics. Writing a single \`List<T>\` class that works for any type T.']
  ]}
/>

</TechnologyTemplate>
`,
  '2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Garbage collection (mark-sweep/index.mdx': `---
title: Garbage Collection (Mark and Sweep)
description: A form of automatic memory management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Garbage Collection (Mark and Sweep)">

In computer science, garbage collection (GC) is a form of automatic memory management. The garbage collector attempts to reclaim garbage, or memory occupied by objects that are no longer in use by the program.

<Callout icon="warning" title="Stop-the-World Pauses">
  In heavy applications, the Garbage Collector occasionally has to freeze the entire application ("stop-the-world") for a few milliseconds to safely scan memory and delete dead objects. This can cause stuttering in high-performance games or trading systems.
</Callout>

## The Mark and Sweep Algorithm

The most common GC algorithm works in two distinct phases:

<ComparisonTable 
  headers={['Phase', 'Action']}
  rows={[
    ['1. Mark', 'The GC starts at the "Roots" (global variables, active stack frames) and traverses all references, marking every object it can reach as "Alive".'],
    ['2. Sweep', 'The GC scans the entire Heap memory. Any object that is NOT marked as "Alive" is immediately deleted and its memory is reclaimed for future use.']
  ]}
/>

</TechnologyTemplate>
`,
  '2. Programming Fundamentals & Language Concepts/2.3 Memory & Execution Model/Pointers/index.mdx': `---
title: Pointers
description: A programming language object that stores the memory address of another value located in computer memory.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Pointers">

In computer science, a pointer is an object in many programming languages that stores a memory address. This can be that of another value located in computer memory, or in some cases, that of memory-mapped computer hardware.

<Callout icon="error" title="Null Pointer Exception">
  Invented by Tony Hoare in 1965, the Null Pointer is famously called his "Billion Dollar Mistake". Trying to read data from a pointer that points to 'null' (memory address 0) will instantly crash the program.
</Callout>

## Value vs Reference

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Pass by Value', 'The function receives a complete, independent copy of the data. Modifying it does not affect the original data.'],
    ['Pass by Reference', 'The function receives a Pointer (a memory address). Modifying the data modifies the original, exact data in memory. Highly efficient for massive arrays (no copying needed).']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph LR
  subgraph CPU Registers
    Ptr[Pointer Variable: 0x2A3F]
  end
  
  subgraph RAM Memory
    Addr1[0x2A3E: 10]
    Addr2[0x2A3F: 42 (The actual data)]
    Addr3[0x2A40: 99]
  end
  
  Ptr --> Addr2
\`} />

</TechnologyTemplate>
`,
  '9. Computer Architecture/Registers/index.mdx': `---
title: CPU Registers
description: The fastest and smallest tier of memory inside a computer, located directly on the CPU.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="CPU Registers">

A processor register is a quickly accessible location available to a computer's central processing unit (CPU). Registers usually consist of a small amount of fast storage, although some registers have specific hardware functions, and may be read-only or write-only.

<Callout icon="success" title="The Speed Hierarchy">
  Accessing data in a CPU Register takes ~1 CPU cycle (instant). Accessing L1 Cache takes ~4 cycles. Accessing main RAM takes ~100 cycles. Accessing an SSD takes ~100,000 cycles. Registers are the absolute peak of hardware speed.
</Callout>

## Common Types of Registers

<ComparisonTable 
  headers={['Register Name', 'Function']}
  rows={[
    ['Program Counter (PC)', 'Holds the memory address of the very next instruction the CPU needs to execute.'],
    ['Instruction Register (IR)', 'Holds the current instruction that is currently being executed or decoded.'],
    ['Accumulator', 'Where intermediate arithmetic and logic results are stored.'],
    ['General Purpose Registers', 'Used by compilers and assembly programmers to temporarily hold data during calculations (e.g., RAX, RBX in x86).']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega4() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega4().catch(console.error)
