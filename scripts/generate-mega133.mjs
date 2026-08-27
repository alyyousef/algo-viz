import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Code smells/index.mdx': `---
title: Code Smells
description: "Mathematical and structural indicators in a codebase that suggest a deeper architectural flaw, serving as warning signs that refactoring is necessary before the system becomes unmaintainable."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Code Smells"
  subtitle="Detecting Architectural Decay"
  tags={['Process', 'Clean Code', 'Architecture', 'Refactoring']}
>

A "Code Smell" is not a bug; the code mathematically compiles and works perfectly. However, the *structure* of the code emits a "smell" that indicates it is highly susceptible to future bugs.

## 1. Bloaters
These are smells representing code that has mathematically grown so large it cannot be effectively managed.
- **Long Method**: A function that spans 500 lines. The mathematical probability of introducing a regression when modifying it approaches 100%.
- **Large Class (God Class)**: A single file containing 5,000 lines and 50 methods, violating the Single Responsibility Principle.
- **Primitive Obsession**: Using raw mathematical primitives (TICK1StringTICK1, TICK1intTICK1) instead of small Objects for domain concepts (e.g., using a TICK1StringTICK1 for a Zip Code instead of a TICK1ZipCodeTICK1 class that guarantees 5 digits).

## 2. Object-Orientation Abusers
These smells indicate that the developer did not understand mathematical polymorphism.
- **Switch Statements**: Having massive TICK1switchTICK1 or TICK1if/elseTICK1 chains scattered across the codebase based on an object's "type". This violates the Open-Closed Principle (solved by the State or Strategy pattern).
- **Refused Bequest**: A child class inherits from a parent, but mathematically only uses 10% of the parent's methods, throwing TICK1NotImplementedExceptionTICK1 for the rest. This indicates inheritance was the wrong mathematical choice (favor Composition).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Cohesion/index.mdx': `---
title: Cohesion
description: "A mathematical measurement in software engineering describing the degree to which the elements inside a single module or class belong together and serve a single, well-defined purpose."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Cohesion"
  subtitle="The Mathematical Strength of a Module"
  tags={['Architecture', 'Clean Code', 'Design Principles', 'Metrics']}
>

In software architecture, the ultimate goal is **High Cohesion and Low Coupling**. 
Cohesion measures the internal mathematical gravity of a single file.

## 1. High Cohesion
A class has High Cohesion if every single method and variable mathematically revolves around the exact same physical concept.
Imagine a TICK1CreditCardValidatorTICK1 class. It has three methods: TICK1checkLength()TICK1, TICK1verifyLuhnAlgorithm()TICK1, and TICK1checkExpiration()TICK1. All three methods mathematically act upon the exact same TICK1cardNumberTICK1 state variable. This is highly cohesive. If the credit card rules change, the developer only modifies this one file.

## 2. Low Cohesion (The Anti-Pattern)
A class has Low Cohesion if it acts as a generic dumping ground.
Imagine a TICK1StringUtilsTICK1 class containing TICK1capitalize()TICK1, TICK1validateEmail()TICK1, and TICK1generateUUID()TICK1. These methods have absolutely zero mathematical relation to each other. They do not share state. 
Worse is the "God Class" (e.g., TICK1UserTICK1) that handles password hashing, database saving, and UI rendering. When a class has Low Cohesion, it has multiple reasons to change (violating the Single Responsibility Principle), making the codebase fragile.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Coupling/index.mdx': `---
title: Coupling
description: "A mathematical measurement of the degree of interdependence between different software modules; tight coupling means a change in one module forces a cascading change in another."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Coupling"
  subtitle="The Interdependence of Code"
  tags={['Architecture', 'Clean Code', 'Design Principles', 'Metrics']}
>

If Cohesion measures how well a class is structured internally, **Coupling** measures how mathematically entangled it is externally.

## 1. Tight Coupling (The Danger)
If Class A instantiates Class B directly using the TICK1newTICK1 keyword, Class A is mathematically **Tightly Coupled** to Class B.
TICK3java
class OrderService {
    void process() {
        MySQLDatabase db = new MySQLDatabase(); // Tight Coupling!
        db.save();
    }
}
TICK3
If the company migrates to MongoDB, the developer must open the TICK1OrderServiceTICK1 file and physically rewrite the business logic to remove MySQL. The core business rules are held mathematically hostage by the database infrastructure.

## 2. Loose Coupling (The Solution)
Loose Coupling is achieved through Interfaces and Dependency Injection.
TICK3java
class OrderService {
    private IDatabase db; // Loose Coupling
    public OrderService(IDatabase db) { this.db = db; }
}
TICK3
Now, TICK1OrderServiceTICK1 is mathematically completely ignorant of whether the database is MySQL or Mongo. You can completely delete the MySQL library from the codebase, and the TICK1OrderServiceTICK1 file does not need a single line changed. This provides ultimate architectural flexibility.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Defensive programming/index.mdx': `---
title: Defensive Programming
description: "A rigorous programming methodology where engineers mathematically assume that external data, dependencies, and users are actively malicious or broken, writing code to survive catastrophic edge cases."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Defensive Programming"
  subtitle="Assuming the Worst-Case Scenario"
  tags={['Process', 'Security', 'Clean Code', 'Architecture']}
>

The core tenet of Defensive Programming is: *"Anything that can mathematically fail, will mathematically fail."*

## 1. Guard Clauses
Defensive programming replaces deep, nested TICK1ifTICK1 statements with immediate **Guard Clauses**.
Instead of writing:
TICK3java
if (user != null) {
    if (user.age > 18) {
        // 50 lines of logic
    }
}
TICK3
A defensive programmer mathematically inverts the logic to fail as fast as possible:
TICK3java
if (user == null) throw new ArgumentNullException();
if (user.age <= 18) throw new InvalidAgeException();
// 50 lines of logic execute safely at the root indentation level
TICK3
This mathematically guarantees that the core logic is never polluted by invalid state.

## 2. Trust Nothing
- **Never trust user input**: Always assume SQL Injection or XSS payloads. Mathematically sanitize and parameterize every input.
- **Never trust the network**: If you make an HTTP call to a payment API, assume the network will instantly drop. Wrap the call in a mathematically proven Retry mechanism with an Exponential Backoff and a Circuit Breaker.
- **Never trust the database**: Assume the database connection will be null. 
By mathematically assuming absolute failure at every boundary, the application achieves extreme resilience.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/DRY/index.mdx': `---
title: DRY (Don't Repeat Yourself)
description: "A foundational principle of software development mathematically dictating that every piece of knowledge or logic must have a single, unambiguous, authoritative representation within a system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="DRY (Don't Repeat Yourself)"
  subtitle="The Single Source of Truth"
  tags={['Process', 'Clean Code', 'Design Principles', 'Architecture']}
>

If the mathematical logic to calculate Sales Tax exists in both the TICK1ShoppingCartTICK1 class and the TICK1InvoiceGeneratorTICK1 class, the codebase has mathematically violated DRY.

## 1. The Maintenance Nightmare
When the government changes the Sales Tax rate from 5% to 6%, the developer will search the codebase, find the TICK1ShoppingCartTICK1 file, and update the math.
Because the developer mathematically does not know the TICK1InvoiceGeneratorTICK1 also contains a copy of the logic, they will fail to update it. Tomorrow, the company will mathematically overcharge the customer on the UI, but generate an invoice with a different number, causing an accounting disaster.

## 2. WET (Write Everything Twice)
The opposite of DRY is WET (Write Everything Twice, or We Enjoy Typing).
To fix a DRY violation, the engineer must mathematically extract the duplicated logic into a single, authoritative location (e.g., a TICK1TaxCalculatorTICK1 service) and inject it into both the Cart and the Invoice.
However, engineers must be careful of **Premature Abstraction**. If two pieces of code look identical today, but serve fundamentally different business domains, merging them mathematically couples two unrelated domains (a violation of Bounded Contexts). As the rule goes: *"A little duplication is cheaper than the wrong abstraction."*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Error handling patterns/index.mdx': `---
title: Error Handling Patterns
description: "The mathematical and architectural strategies used to elegantly capture, log, and recover from runtime failures without crashing the application or exposing stack traces to the end user."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Error Handling Patterns"
  subtitle="Managing Mathematical Failure"
  tags={['Process', 'Clean Code', 'Architecture', 'Patterns']}
>

When a database connection drops, throwing a raw SQL Exception directly to the UI mathematically breaks the application and exposes critical security vulnerabilities to hackers.

## 1. Exceptions vs Return Codes
In C and Go, errors are mathematically handled via **Return Codes**: TICK1result, err := db.Query()TICK1. The developer is mathematically forced to check TICK1if (err != nil)TICK1 immediately.
In Java, Python, and C#, errors are handled via **Exceptions**. 
Exceptions should mathematically only be used for *Exceptional* circumstances.
- **Bad**: Throwing an exception when a user types the wrong password (this is expected business logic, not a system failure).
- **Good**: Throwing an exception when the hard drive is physically full.

## 2. The Global Exception Handler
In modern web APIs, wrapping every single controller method in a TICK1try/catchTICK1 block mathematically violates DRY.
Instead, architects use a **Global Exception Handler** (Middleware).
The controllers execute pure business logic. If an exception occurs, it mathematically bubbles up to the framework. The Global Middleware catches it, logs the massive Stack Trace to Datadog for the engineers, and mathematically returns a clean, sanitized HTTP 500 JSON response to the user: TICK1{ "error": "Internal Server Error" }TICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/KISS/index.mdx': `---
title: KISS (Keep It Simple, Stupid)
description: "A design principle originating from the US Navy stating that systems work best when they are mathematically simple rather than complex, warning against over-engineering and premature optimization."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="KISS (Keep It Simple, Stupid)"
  subtitle="The War on Over-Engineering"
  tags={['Process', 'Clean Code', 'Design Principles', 'Philosophy']}
>

Junior engineers write complex code to prove they are smart. Senior engineers write mathematically simple code because they know they have to debug it at 3:00 AM on a Sunday.

## 1. Premature Complexity
If a startup needs a simple CRUD application for 50 internal employees, the mathematically correct solution is a Ruby on Rails monolith deployed to a single $10/month Heroku server.
If an architect builds a 15-microservice Kubernetes cluster using Kafka and Cassandra to handle 50 users, they have mathematically violated KISS. They have introduced catastrophic "accidental complexity" that will bankrupt the engineering team's time.

## 2. YAGNI (You Aren't Gonna Need It)
KISS is closely tied to the YAGNI principle.
Developers often write complex abstraction layers "just in case we need to support Oracle databases in the future."
YAGNI dictates that you must mathematically assume you will *never* need it. Write the simplest possible code to solve today's exact problem. When the business requirement mathematically changes in two years, you refactor it then. Code should be easy to delete, not perfectly abstracted for futures that never arrive.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Naming conventions/index.mdx': `---
title: Naming Conventions
description: "The mathematical and linguistic rule sets used to standardize the names of variables, functions, and classes across a codebase, critical for ensuring readability and developer cognitive efficiency."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Naming Conventions"
  subtitle="The Syntax of Human Readability"
  tags={['Process', 'Clean Code', 'Standards', 'Linguistics']}
>

Phil Karlton famously said: *"There are only two hard things in Computer Science: cache invalidation and naming things."*

## 1. Casing Standards
To prevent mathematical chaos, languages enforce strict visual structures:
- **camelCase**: Used for variables and functions in JS/Java (TICK1calculateTotalTax()TICK1).
- **PascalCase**: Used for Classes and Interfaces (TICK1ShoppingCartTICK1).
- **snake_case**: Used heavily in Python and databases (TICK1calculate_total_tax()TICK1).
- **UPPER_SNAKE_CASE**: Mathematically reserved for absolute Constants (TICK1MAX_TIMEOUT_MSTICK1).

## 2. Linguistic Meaning
The compiler doesn't care about names, but humans mathematically require strict linguistic rules:
- **Classes are Nouns**: TICK1UserTICK1, TICK1AccountTICK1. Never TICK1ProcessUserTICK1.
- **Methods are Verbs**: TICK1deleteUser()TICK1, TICK1calculateInterest()TICK1. 
- **Booleans are Predicates**: TICK1isActiveTICK1, TICK1hasChildrenTICK1. If a variable is named TICK1statusTICK1, the developer mathematically does not know if it is a boolean, an integer, or a string.
- **Avoid Disinformation**: Do not name a variable TICK1accountListTICK1 if the underlying mathematical data structure is actually a TICK1HashSetTICK1. Name it TICK1accountsTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Refactoring techniques/index.mdx': `---
title: Refactoring Techniques
description: "Specific, mathematically proven code transformations that improve the internal structure of a codebase without altering its external behavior, used to eliminate code smells and pay down technical debt."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Refactoring Techniques"
  subtitle="Mathematical Code Transformations"
  tags={['Process', 'Clean Code', 'Architecture', 'Refactoring']}
>

Martin Fowler codified dozens of exact mathematical maneuvers that allow engineers to safely dismantle and rebuild complex "Spaghetti Code."

## 1. Extract Method
The most heavily used refactoring technique.
If a function is 100 lines long and contains an inline mathematical algorithm for calculating standard deviation, the developer highlights those 15 lines, cuts them, and pastes them into a new private method named TICK1calculateStandardDeviation()TICK1. The original function is mathematically replaced by a single, highly readable function call.

## 2. Other Core Techniques
- **Extract Class**: If a TICK1UserTICK1 class contains 15 variables related to an address (street, city, zip), mathematically extract them into a separate TICK1AddressTICK1 class, improving Cohesion.
- **Replace Magic Number with Symbolic Constant**: If the code says TICK1if (weight > 9.81)TICK1, mathematically replace TICK19.81TICK1 with TICK1GRAVITY_CONSTANTTICK1 to provide human context.
- **Replace Conditional with Polymorphism**: If a massive TICK1switchTICK1 statement checks object types, mathematically replace it using the Strategy or State pattern, enforcing the Open-Closed Principle.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Separation of concerns/index.mdx': `---
title: Separation of Concerns (SoC)
description: "A foundational architectural principle that mathematically mandates partitioning a computer program into distinct sections, such that each section addresses a separate and specific domain of functionality."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Separation of Concerns (SoC)"
  subtitle="The Principle of Isolation"
  tags={['Process', 'Clean Code', 'Architecture', 'Design Principles']}
>

If an HTML file contains raw JavaScript logic embedded in the TICK1<button onclick="...">TICK1 tags, and raw CSS embedded in TICK1style="..."TICK1 tags, it mathematically violates the Separation of Concerns.

## 1. Architectural Partitioning
SoC is the mathematical driving force behind almost all modern architectural patterns (Layered Architecture, MVC, Microservices).
- The CSS file is mathematically responsible *only* for presentation.
- The HTML file is mathematically responsible *only* for structure.
- The JavaScript file is mathematically responsible *only* for behavior.
By mathematically isolating these concerns, the graphic designer can rewrite the CSS file without any risk of accidentally introducing a logical bug in the JavaScript payment processing code.

## 2. Micro-Level Separation (SRP)
At the macro level, SoC creates entire isolated layers (e.g., keeping SQL out of the UI layer).
At the micro level, SoC is synonymous with the **Single Responsibility Principle (SRP)**. If a single class parses a CSV file and also saves the data to the database, it is blending two mathematically distinct concerns (Data Parsing vs Data Storage). The engineer must split them to achieve true architectural separation.

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
