import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/4. Object-Oriented Programming/Constructors/index.mdx': `---
title: Constructors
description: Special mathematical methods within a class that are automatically invoked exactly once during the instantiation of an object, responsible for safely initializing the object's initial state in memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Constructors"
  subtitle="The Initialization Phase"
  tags={['OOP', 'Memory Management', 'Java', 'C++']}
>

When you allocate physical memory for a new object using TICK1new Car()TICK1, the memory initially contains random garbage data. The Constructor is the mathematical function responsible for wiping that garbage and setting a safe initial state before any other code is allowed to touch the object.

## 1. The Mathematical Guarantee
A Constructor has the exact same name as the Class and no return type.
TICK3java
public class BankAccount {
    private double balance;

    // The Constructor
    public BankAccount(double initialDeposit) {
        if (initialDeposit < 0) throw new Error();
        this.balance = initialDeposit;
    }
}
TICK3
By requiring TICK1initialDepositTICK1 in the constructor, the developer mathematically guarantees that it is impossible to create a TICK1BankAccountTICK1 object without providing a valid starting balance. The compiler will instantly reject TICK1new BankAccount()TICK1, eliminating entire categories of "Null Reference" or "Uninitialized State" bugs.

## 2. Constructor Overloading
A single class can mathematically possess multiple constructors, provided they have different parameter signatures (Overloading).
You could have TICK1public User(String email)TICK1 and TICK1public User(String email, String phone)TICK1. When you type TICK1new User("bob@a.com")TICK1, the compiler mathematically analyzes the arguments and routes the execution to the exact constructor that matches that specific mathematical signature.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Dependency injection/index.mdx': `---
title: Dependency Injection (DI)
description: A software design pattern where an object receives its dependencies (other objects it requires to function) from an external framework or constructor, rather than creating them internally, ensuring mathematical decoupling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Dependency Injection (DI)"
  subtitle="Mathematical Decoupling of State"
  tags={['OOP', 'Design Patterns', 'Architecture', 'Testing']}
>

If a TICK1CarTICK1 class mathematically instantiates an TICK1EngineTICK1 class inside its own constructor (TICK1this.engine = new Engine()TICK1), the TICK1CarTICK1 is permanently, rigidly coupled to that specific TICK1EngineTICK1. You can never test the TICK1CarTICK1 with a fake TICK1MockEngineTICK1.

## 1. Passing Dependencies In
Dependency Injection (DI) mathematically reverses this control. The TICK1CarTICK1 does not create the engine; the engine is *injected* into it from the outside.
TICK3java
public class Car {
    private Engine engine;

    // Dependency Injection via Constructor
    public Car(Engine externalEngine) {
        this.engine = externalEngine;
    }
}
TICK3
Because the dependency is injected, the TICK1CarTICK1 no longer cares *how* the engine is created. During production, you inject a TICK1V8EngineTICK1. During automated testing, you inject a TICK1MockEngineTICK1 that mathematically always returns "running = true" without actually burning CPU cycles.

## 2. DI Frameworks (IoC Containers)
In large enterprise applications (like Java Spring or Angular), manually injecting dependencies across 1,000 classes is a mathematical nightmare.
These ecosystems use **Inversion of Control (IoC) Containers**. You simply annotate the class (e.g., TICK1@InjectTICK1). When the application starts, the DI Framework mathematically analyzes the entire graph of dependencies, instantiates the TICK1EngineTICK1, and automatically injects it into the TICK1CarTICK1, abstracting away the mathematical complexity of object creation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Dependency inversion/index.mdx': `---
title: Dependency Inversion Principle (DIP)
description: The "D" in the SOLID principles; it states that high-level modules should not depend on low-level modules, but both should mathematically depend on abstractions (interfaces), flipping the traditional dependency graph.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Dependency Inversion Principle"
  subtitle="Flipping the Mathematical Graph"
  tags={['OOP', 'SOLID', 'Architecture', 'Design Patterns']}
>

In a naive, procedural architecture, high-level business logic mathematically depends directly on low-level implementation details.
For example, a TICK1ReportGeneratorTICK1 (High Level) might mathematically instantiate a TICK1MySQLDatabaseTICK1 (Low Level). If the company switches to MongoDB, the high-level code is completely destroyed and must be rewritten.

## 1. Inverting the Dependency
The Dependency Inversion Principle (DIP) dictates that both the High-Level logic and the Low-Level implementation must mathematically depend on a shared **Abstraction (Interface)**.
1. Define an interface: TICK1public interface IDatabase { void save(); }TICK1.
2. The Low-Level TICK1MySQLDatabaseTICK1 class *implements* TICK1IDatabaseTICK1.
3. The High-Level TICK1ReportGeneratorTICK1 class mathematically *depends* on TICK1IDatabaseTICK1, not MySQL.

## 2. The Architectural Firewall
By doing this, the mathematical dependency graph is inverted. 
The high-level business logic is protected behind an architectural firewall. You can physically delete the TICK1MySQLDatabaseTICK1 file from the codebase, write a brand new TICK1MongoDatabaseTICK1 file, and as long as Mongo implements TICK1IDatabaseTICK1, the TICK1ReportGeneratorTICK1 will mathematically continue to function flawlessly without a single line of code changing in the high-level module.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Destructors-finalizers/index.mdx': `---
title: Destructors / Finalizers
description: Mathematical methods invoked automatically when an object is being destroyed and removed from memory, used to safely release unmanaged resources like open file handles or network sockets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Destructors & Finalizers"
  subtitle="The Mathematical Cleanup Phase"
  tags={['OOP', 'Memory Management', 'C++', 'Java']}
>

When an object dies, the memory it occupied in RAM is freed. However, if the object had opened a physical file on the hard drive, freeing the RAM does *not* automatically close the file lock, mathematically resulting in a resource leak.

## 1. Deterministic Destructors (C++)
In languages without Garbage Collection (like C++ or Rust), the destruction of an object is mathematically **deterministic**.
When an object goes out of scope, the compiler instantly and predictably executes a **Destructor** (denoted by a tilde: TICK1~FileHandler()TICK1). The developer writes code inside the destructor to mathematically close the file handle. Because the timing is exact, resource leaks are prevented.

## 2. Non-Deterministic Finalizers (Java/C#)
In Garbage Collected languages (like Java or C#), you do not control exactly when an object is destroyed from memory; the Garbage Collector (GC) decides.
Therefore, these languages use **Finalizers** (or TICK1finalize()TICK1). Because the execution is mathematically non-deterministic (the GC might wait 5 minutes before destroying the object), Finalizers are widely considered dangerous. If you wait for the GC to close the file handle, the system might mathematically run out of available file handles before the GC ever runs. This is why modern C#/Java relies on TICK1usingTICK1 blocks or TICK1try-with-resourcesTICK1 to force deterministic closure of resources.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/DIP)/index.mdx': `---
title: DIP (Dependency Inversion Principle)
description: A redirect to the core Dependency Inversion Principle concept, representing the final pillar of the SOLID object-oriented design methodology.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="DIP"
  subtitle="See: Dependency Inversion Principle"
  tags={['SOLID', 'OOP', 'Architecture']}
>

*This topic is fully covered under the **Dependency Inversion** section.* 

DIP is the foundational mathematical rule that prevents "spaghetti code" by forcing all dependencies to point inward toward abstract interfaces, rather than outward toward concrete implementations.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Interfaces/index.mdx': `---
title: Interfaces
description: Pure mathematical contracts in Object-Oriented Programming that define exactly what methods a class must implement, without providing any of the underlying implementation logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Interfaces"
  subtitle="The Pure Mathematical Contract"
  tags={['OOP', 'Architecture', 'Java', 'Design Patterns']}
>

An Abstract Class can contain a mix of unimplemented methods and fully implemented methods. An Interface is mathematically pure: it contains **zero** implementation. It is nothing but a list of signatures.

## 1. The Strict Contract
TICK3java
public interface Printable {
    void print();
}
TICK3
If a class declares TICK1class Document implements PrintableTICK1, the compiler enforces a strict mathematical contract. If the TICK1DocumentTICK1 class fails to contain a method named TICK1print()TICK1 that takes zero arguments and returns TICK1voidTICK1, the compiler will refuse to build the software. The Interface mathematically guarantees behavior without dictating *how* that behavior is achieved.

## 2. Multiple Inheritance 
In languages like Java and C#, a class can mathematically only inherit from **one** parent class (preventing the infamous "Diamond Problem" of multiple inheritance).
However, a class can implement **infinite** Interfaces. 
A TICK1SmartphoneTICK1 class can inherit from TICK1ComputerTICK1, but it can implement TICK1ICameraTICK1, TICK1IGPSLocationTICK1, and TICK1IPhoneTICK1. This allows developers to mathematically compose wildly different behaviors onto a single object without building deep, brittle inheritance trees.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/ISP/index.mdx': `---
title: Interface Segregation Principle (ISP)
description: The "I" in the SOLID principles; it mathematically dictates that no client should be forced to depend on methods it does not use, advocating for many small, hyper-focused interfaces rather than one massive, generic interface.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Interface Segregation Principle (ISP)"
  subtitle="Mathematical Interface Decoupling"
  tags={['OOP', 'SOLID', 'Architecture', 'Clean Code']}
>

Imagine a massive interface called TICK1IMachineTICK1 that contains three methods: TICK1print()TICK1, TICK1scan()TICK1, and TICK1fax()TICK1. 

## 1. The Fat Interface Problem
If a developer builds a simple TICK1BasicPrinterTICK1 class, they must mathematically implement TICK1IMachineTICK1.
Because they signed the contract, the compiler forces them to write a TICK1fax()TICK1 method. But a basic printer cannot fax. The developer is mathematically forced to write TICK1public void fax() { throw new Error("Not Supported"); }TICK1. This is a violation of the Interface Segregation Principle. The code is now lying to the compiler.

## 2. Mathematical Segregation
ISP solves this by mathematically fracturing the fat interface into hyper-specific micro-contracts.
You create three distinct interfaces: TICK1IPrinterTICK1, TICK1IScannerTICK1, and TICK1IFaxTICK1. 
The TICK1BasicPrinterTICK1 class only implements TICK1IPrinterTICK1. 
An TICK1AdvancedMultiFunctionPrinterTICK1 class implements all three: TICK1implements IPrinter, IScanner, IFaxTICK1.
By segregating the interfaces, you mathematically guarantee that classes only depend on the exact behaviors they actually possess, eliminating "Not Supported" runtime exceptions entirely.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Law of Demeter/index.mdx': `---
title: Law of Demeter
description: A software design guideline, also known as the Principle of Least Knowledge, mathematically restricting how deeply objects are allowed to reach into the internal structures of other objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Law of Demeter"
  subtitle="The Principle of Least Knowledge"
  tags={['OOP', 'Architecture', 'Clean Code', 'Encapsulation']}
>

The Law of Demeter (LoD) mathematically dictates that an object should only talk to its immediate friends, and never to strangers.

## 1. The Train Wreck Anti-Pattern
A violation of the Law of Demeter is mathematically identifiable by "Train Wreck" code, characterized by multiple consecutive dot operations.
TICK3java
// A mathematical violation of the Law of Demeter
customer.getWallet().getMoney().subtract(10);
TICK3
The calling code does not just know about the TICK1CustomerTICK1. It possesses deep mathematical knowledge of the internal architecture of the customer (that they have a Wallet, and that the Wallet has a Money object). If the Customer switches from a Wallet to a Bank Account, the calling code mathematically shatters.

## 2. Talk to Immediate Friends
The Law of Demeter mathematically restricts method calls. A method TICK1MTICK1 of an object TICK1OTICK1 may only invoke the methods of:
1. TICK1OTICK1 itself.
2. Parameters passed directly to TICK1MTICK1.
3. Objects instantiated directly within TICK1MTICK1.
4. Direct attributes (properties) of TICK1OTICK1.
To fix the train wreck, you add a high-level abstraction: TICK1customer.charge(10);TICK1. The caller tells the customer what to do, and the customer handles the internal mathematical delegation to the wallet.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/LSP/index.mdx': `---
title: Liskov Substitution Principle (LSP)
description: The "L" in the SOLID principles, mathematically establishing that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application or altering the correctness of the program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Liskov Substitution Principle (LSP)"
  subtitle="The Mathematics of Subtyping"
  tags={['OOP', 'SOLID', 'Architecture', 'Barbara Liskov']}
>

Introduced by computer scientist Barbara Liskov in 1987, this principle mathematically defines what it actually means to create a subclass.

## 1. The Square-Rectangle Problem
The classic violation of LSP is the Square-Rectangle problem.
In mathematics, a Square is a Rectangle. So a developer makes TICK1SquareTICK1 inherit from TICK1RectangleTICK1. 
A TICK1RectangleTICK1 has methods TICK1setWidth(w)TICK1 and TICK1setHeight(h)TICK1. But for a TICK1SquareTICK1 to remain a square, setting the width *must* automatically change the height to match. 
If an external function expects a generic TICK1RectangleTICK1, sets the width to 5, sets the height to 10, and mathematically calculates the area as 50, passing in a TICK1SquareTICK1 will break the function (the area will calculate as 100). The TICK1SquareTICK1 mathematically failed substitution.

## 2. Behavioral Subtyping
LSP dictates that a child class must honor the mathematical **Preconditions** and **Postconditions** of its parent.
If a parent method TICK1process(String data)TICK1 promises to never return TICK1nullTICK1, the child class overriding that method cannot suddenly start returning TICK1nullTICK1. If it does, the substitution fails, the application mathematically throws a TICK1NullPointerExceptionTICK1, and the inheritance tree is proven to be architecturally invalid.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Method overloading/index.mdx': `---
title: Method Overloading
description: A mathematical feature in strongly-typed programming languages allowing multiple methods to possess the exact same name within a single class, provided their parameter signatures are distinct.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Method Overloading"
  subtitle="Compile-Time Mathematical Polymorphism"
  tags={['OOP', 'Polymorphism', 'Java', 'C++']}
>

Method Overloading is a form of mathematical polymorphism resolved entirely at **Compile-Time** (Static Polymorphism).

## 1. Distinct Mathematical Signatures
The compiler mathematically identifies a method not just by its name (TICK1printTICK1), but by its **Signature** (Name + Parameter Types + Parameter Order).
TICK3java
public class Printer {
    public void print(String text) { ... }
    public void print(int number) { ... }
    public void print(String text, int count) { ... }
}
TICK3
To a human, these are three methods with the same name. To the compiler, these are three mathematically entirely different entities: TICK1print_StringTICK1, TICK1print_intTICK1, and TICK1print_String_intTICK1.

## 2. Compile-Time Resolution
When the developer types TICK1printer.print(5)TICK1, the compiler mathematically analyzes the argument (TICK15TICK1 is an TICK1intTICK1). 
During compilation, it permanently wires that specific line of code to the TICK1print(int number)TICK1 implementation. Unlike Method *Overriding* (which requires the CPU to determine which child class to call while the program is actually running), Overloading requires zero runtime overhead, making it mathematically highly efficient.

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
