import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/4. Object-Oriented Programming/Method overriding/index.mdx': `---
title: Method Overriding
description: A fundamental feature of object-oriented polymorphism where a child class provides a completely new, mathematically distinct implementation for a method that is already defined in its parent class.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Method Overriding"
  subtitle="Runtime Mathematical Polymorphism"
  tags={['OOP', 'Polymorphism', 'Inheritance', 'Java']}
>

If a TICK1VehicleTICK1 parent class possesses a TICK1startEngine()TICK1 method, a TICK1TeslaTICK1 child class cannot use the default implementation, because an electric motor mathematically starts differently than a combustion engine.

## 1. The @Override Annotation
The child class mathematically intercepts the method call by defining a method with the exact same Signature (Name + Parameters) as the parent.
TICK3java
public class Tesla extends Vehicle {
    @Override
    public void startEngine() {
        System.out.println("Activating Battery Pack silently.");
    }
}
TICK3
The TICK1@OverrideTICK1 annotation is critical. It mathematically forces the compiler to verify that the parent class *actually* possesses a TICK1startEngine()TICK1 method. If the parent method is renamed or deleted, the compiler will instantly fail the build, preventing silent bugs.

## 2. Dynamic Dispatch (Late Binding)
Method Overriding relies on **Dynamic Dispatch** at runtime.
TICK3java
Vehicle myCar = new Tesla();
myCar.startEngine(); // Which method executes?
TICK3
The variable is typed as TICK1VehicleTICK1, but the actual object in RAM is a TICK1TeslaTICK1. The CPU cannot determine which method to call at compile-time. At runtime, the CPU mathematically inspects the actual object in memory via the **vtable** (virtual method table) and dynamically routes the execution to the Tesla's specific implementation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Mixins/index.mdx': `---
title: Mixins
description: An alternative to traditional inheritance in Object-Oriented Programming, mathematically allowing classes to incorporate isolated blocks of functionality without relying on a rigid, biological parent-child class taxonomy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Mixins"
  subtitle="Injecting Behavior Without Inheritance"
  tags={['OOP', 'Composition', 'Ruby', 'TypeScript']}
>

Because languages like Java, C#, and Ruby strictly forbid multiple inheritance (a class cannot mathematically have two parents), sharing behavior across unrelated classes becomes structurally impossible using pure inheritance.

## 1. The Cross-Cutting Problem
Imagine a TICK1LoggerTICK1 behavior. A TICK1UserTICK1 class needs to log, and a TICK1DatabaseConnectionTICK1 class needs to log. They have completely different mathematical parent classes. You cannot force them to inherit from a common TICK1BaseLoggerTICK1 class without destroying their primary inheritance trees.

## 2. The Mixin Solution
A Mixin mathematically injects behavior directly into a class as a module, bypassing the inheritance hierarchy.
In Ruby, this is done via TICK1includeTICK1:
TICK3ruby
module Loggable
  def log(msg)
    puts "[LOG]: #{msg}"
  end
end

class User
  include Loggable # Mathematically injects the methods
end
TICK3
The TICK1UserTICK1 class now possesses the TICK1log()TICK1 method, but it did not inherit it from a parent. Mixins are a pure mathematical implementation of "Composition over Inheritance," allowing developers to build objects like Lego sets rather than rigid taxonomies.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/multilevel)/index.mdx': `---
title: Multilevel Inheritance
description: An architectural pattern in Object-Oriented Programming where a class mathematically derives from a parent class, which itself derives from another parent class, creating a deep, cascading hierarchical chain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Multilevel Inheritance"
  subtitle="Deep Mathematical Taxonomies"
  tags={['OOP', 'Inheritance', 'Architecture', 'Design']}
>

Inheritance models an "Is-A" relationship. Multilevel Inheritance simply extends this mathematical chain vertically.

## 1. The Vertical Chain
Consider a biological taxonomy mathematically modeled in code:
- TICK1AnimalTICK1 (Grandparent: defines TICK1breathe()TICK1)
  - TICK1MammalTICK1 (Parent: inherits TICK1AnimalTICK1, defines TICK1produceMilk()TICK1)
    - TICK1DogTICK1 (Child: inherits TICK1MammalTICK1, defines TICK1bark()TICK1)

Because of the mathematical properties of transitive relations, the TICK1DogTICK1 class implicitly and inescapably possesses all three methods: TICK1breathe()TICK1, TICK1produceMilk()TICK1, and TICK1bark()TICK1.

## 2. The Fragile Base Class Problem
While mathematically sound, deep multilevel inheritance trees are considered a dangerous architectural anti-pattern in modern software design.
This leads to the **Fragile Base Class Problem**. If a developer makes a small modification to the TICK1AnimalTICK1 Grandparent class, that single mathematical change cascades down the entire tree, potentially breaking the compilation or runtime behavior of 500 different Child classes that rely on the exact original behavior of the Grandparent. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/multiple/index.mdx': `---
title: Multiple Inheritance
description: A controversial Object-Oriented feature, supported in languages like C++ and Python, where a single child class is mathematically permitted to inherit state and behavior from two or more completely distinct parent classes simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Multiple Inheritance"
  subtitle="The Mathematical Diamond Problem"
  tags={['OOP', 'Inheritance', 'C++', 'Python']}
>

If a TICK1SmartphoneTICK1 is mathematically both a TICK1ComputerTICK1 and a TICK1PhoneTICK1, it logically makes sense to have the TICK1SmartphoneTICK1 class inherit from both parent classes. 

## 1. The Deadly Diamond of Death
However, Multiple Inheritance introduces a catastrophic mathematical ambiguity known as the **Diamond Problem**.
Imagine TICK1ComputerTICK1 and TICK1PhoneTICK1 both inherit from a grand-parent class called TICK1ElectronicDeviceTICK1. The TICK1ElectronicDeviceTICK1 class has a TICK1turnOn()TICK1 method.
Both TICK1ComputerTICK1 and TICK1PhoneTICK1 override the TICK1turnOn()TICK1 method with their own custom logic.
If TICK1SmartphoneTICK1 inherits from both, and the developer calls TICK1mySmartphone.turnOn()TICK1, which mathematical implementation does the CPU execute? The Computer's or the Phone's? The compiler physically cannot resolve the ambiguity.

## 2. The Modern Solution
Because this ambiguity caused massive bugs in early C++ systems, modern languages like Java and C# fundamentally mathematically outlaw Multiple Inheritance for classes.
They solve the requirement by allowing a class to inherit from exactly ONE parent class, but implement INFINITE **Interfaces**, forcing the developer to provide the concrete logic themselves to mathematically guarantee zero ambiguity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Multiple dispatch/index.mdx': `---
title: Multiple Dispatch
description: An advanced mathematical feature of dynamic polymorphism where the specific method implementation invoked is determined at runtime based on the runtime types of multiple arguments, rather than just the type of the receiver object.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Multiple Dispatch"
  subtitle="Multi-Variable Runtime Polymorphism"
  tags={['OOP', 'Polymorphism', 'Julia', 'Advanced']}
>

In standard Object-Oriented languages (Java, C++), dynamic polymorphism relies on **Single Dispatch**. 
When you call TICK1spaceship.collideWith(asteroid)TICK1, the CPU mathematically looks at the runtime type of TICK1spaceshipTICK1 to determine which method to execute. It completely ignores the runtime type of the TICK1asteroidTICK1 argument until the method has already started running.

## 1. The Collision Problem
If you have a video game with TICK1SpaceshipTICK1, TICK1AsteroidTICK1, and TICK1LaserTICK1 objects, handling collisions via Single Dispatch requires massive, ugly TICK1if (obj instanceof Asteroid)TICK1 chains inside the method, mathematically ruining the polymorphism.

## 2. The Multiple Dispatch Solution
Languages like Julia or Common Lisp support **Multiple Dispatch**.
When a developer calls TICK1collide(objectA, objectB)TICK1, the compiler and runtime mathematically analyze the exact runtime types of *both* arguments simultaneously.
TICK3julia
collide(a::Spaceship, b::Asteroid) = println("Ship destroyed!")
collide(a::Laser, b::Asteroid) = println("Asteroid destroyed!")
collide(a::Spaceship, b::Laser) = println("Shields depleted!")
TICK3
The CPU mathematically routes the execution to the exact specific function signature based on the combination of all arguments, completely eliminating complex TICK1if/elseTICK1 type-checking trees and creating mathematically elegant physics engines.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Object pooling/index.mdx': `---
title: Object Pooling
description: A creational design pattern that mathematically recycles and reuses expensive, resource-heavy objects rather than continuously instantiating and destroying them, drastically reducing Garbage Collection overhead and CPU latency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Object Pooling"
  subtitle="Mathematical Memory Recycling"
  tags={['OOP', 'Design Patterns', 'Performance', 'Architecture']}
>

In Java or C#, creating a simple string object is mathematically instantaneous. However, creating a TICK1DatabaseConnectionTICK1 object is a catastrophic mathematical bottleneck. It requires performing DNS lookups, executing a 3-way TCP handshake, and performing TLS cryptographic negotiation. If you create a new connection object for every user HTTP request, the database will mathematically collapse under the latency.

## 1. The Pool Architecture
Object Pooling solves this via recycling.
When the application starts, it mathematically pre-instantiates 50 TICK1DatabaseConnectionTICK1 objects and places them in a "Pool" (usually a Thread-Safe Queue).
When a user requests data, the thread asks the Pool for a connection. The Pool mathematically removes a connection from the queue and hands it over. The thread runs the SQL query.

## 2. The Return Phase
Crucially, when the thread is done, it does **not** destroy the connection. It mathematically resets the object's internal state (clears old SQL variables) and returns the object to the Pool. This allows a single heavy object to mathematically service 10,000 distinct user requests per minute, completely bypassing the massive CPU cost of continuous instantiation and Garbage Collection.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Objects/index.mdx': `---
title: Objects
description: The fundamental runtime entities in Object-Oriented Programming; distinct, mathematically allocated blocks of memory that encapsulate specific state (data) and behavior (methods) defined by their parent Class blueprint.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Objects"
  subtitle="The Instantiated Reality"
  tags={['OOP', 'Memory Management', 'Fundamentals', 'Architecture']}
>

A Class is just a theoretical blueprint in a text file. An Object is the physical, mathematical realization of that blueprint loaded into the physical RAM of the computer during runtime.

## 1. Memory Allocation and the Heap
When a CPU executes the instruction TICK1Car myCar = new Car();TICK1, a specific mathematical sequence occurs:
1. The CPU mathematically calculates the exact number of bytes required to hold all the state variables defined in the TICK1CarTICK1 class (e.g., 4 bytes for an integer TICK1speedTICK1, 8 bytes for a TICK1colorTICK1 reference).
2. It asks the Operating System to allocate that contiguous block of bytes on the **Heap** (the dynamic memory space).
3. It executes the Constructor to initialize the bytes.
4. It mathematically returns a physical memory address (a pointer/reference) and stores it in the TICK1myCarTICK1 variable on the **Stack**.

## 2. Independent State
The defining mathematical characteristic of Objects is absolute state isolation.
If you instantiate two objects: TICK1Car a = new Car(); Car b = new Car();TICK1, they represent two completely distinct, mathematically segregated blocks of RAM. If you execute TICK1a.speed = 100;TICK1, it has absolutely zero mathematical effect on the TICK1speedTICK1 variable inside object TICK1bTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/OCP/index.mdx': `---
title: Open-Closed Principle (OCP)
description: The "O" in the SOLID principles, mathematically dictating that software entities (classes, modules, functions) should be open for extension, but strictly closed for modification, preventing the breakage of existing systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Open-Closed Principle (OCP)"
  subtitle="Extending Without Modifying"
  tags={['OOP', 'SOLID', 'Architecture', 'Clean Code']}
>

If an application works flawlessly in production, opening up the core classes and modifying the mathematical logic to add a new feature guarantees that you will eventually inject a bug that breaks the existing functionality.

## 1. The Closed Modification
A class is "Closed for Modification." Once it is written, tested, and deployed, you mathematically refuse to touch the source code inside that file ever again, unless fixing an explicit bug.

## 2. The Open Extension
How do you add a new feature if you cannot modify the file? The class must be "Open for Extension" via mathematical polymorphism (Interfaces or Abstract Classes).
Imagine a TICK1PaymentProcessorTICK1 class that has an TICK1if (type == "credit")TICK1 and TICK1else if (type == "paypal")TICK1 block. If you want to add Bitcoin, violating OCP means modifying the file to add another TICK1else ifTICK1. 
To honor OCP, you mathematically abstract the payment logic into an interface: TICK1public interface PaymentStrategy { void pay(); }TICK1. The processor blindly executes TICK1strategy.pay()TICK1. To add Bitcoin, you simply write a brand new TICK1BitcoinStrategyTICK1 file. The new code extends the system's capability without mathematically touching the core processor file, achieving absolute architectural safety.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/parametric/index.mdx': `---
title: Parametric Polymorphism
description: A highly advanced mathematical concept in type theory (implemented as Generics in Java/C# and Templates in C++) allowing developers to write classes and methods that operate perfectly on types that are not specified until instantiation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Parametric Polymorphism"
  subtitle="Generics and Templates"
  tags={['OOP', 'Polymorphism', 'Type Theory', 'Generics']}
>

If you want to build a reusable TICK1ListTICK1 class that holds data, writing a TICK1StringListTICK1 and an TICK1IntegerListTICK1 requires mathematically duplicating the exact same array-resizing logic twice. This is an architectural failure.

## 1. The Generic Parameter
Parametric Polymorphism (Generics) solves this by allowing the Class itself to accept a mathematical variable representing a Type, usually denoted as TICK1<T>TICK1.
TICK3java
public class List<T> {
    private T[] elements;
    public void add(T item) { ... }
}
TICK3
The class is mathematically ignorant of what TICK1TTICK1 actually is. It simply promises the compiler that whatever TICK1TTICK1 is, it will handle it consistently.

## 2. Compile-Time Type Safety
When a developer instantiates the class: TICK1List<String> myList = new List<>();TICK1, the compiler mathematically substitutes TICK1StringTICK1 into the TICK1TTICK1 variable throughout the entire class.
If the developer attempts to execute TICK1myList.add(5)TICK1, the compiler throws a fatal mathematical error. The developer achieved total code reusability without sacrificing a single degree of strict, compile-time type safety.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/SOLID principles (SRP/index.mdx': `---
title: Single Responsibility Principle (SRP)
description: The "S" in the SOLID principles, mathematically dictating that a class should have one, and only one, reason to change, enforcing strict cohesion and preventing the creation of massive "God Classes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Single Responsibility Principle (SRP)"
  subtitle="Mathematical Cohesion"
  tags={['OOP', 'SOLID', 'Architecture', 'Clean Code']}
>

The primary cause of legacy "Spaghetti Code" is the mathematical accumulation of unrelated responsibilities within a single file, eventually creating an unmaintainable "God Class" (e.g., a TICK1UserTICK1 class that is 10,000 lines long).

## 1. The Reason to Change
Robert C. Martin mathematically defined SRP as: *"A class should have only one reason to change."*
Imagine an TICK1EmployeeTICK1 class that contains three methods: TICK1calculatePay()TICK1, TICK1saveToDatabase()TICK1, and TICK1generateTaxReport()TICK1.
This class has three mathematically distinct reasons to change:
1. The CFO changes the overtime payroll rules.
2. The DBA migrates the database from MySQL to PostgreSQL.
3. The IRS changes the tax reporting format.

## 2. Enforcing Cohesion
Because the TICK1EmployeeTICK1 class is handling business logic, database logic, and presentation logic, it violates SRP. To fix it, the architect mathematically fractures the class into three highly cohesive classes: TICK1EmployeeTICK1 (holds state), TICK1EmployeeRepositoryTICK1 (handles SQL), and TICK1TaxReportFormatterTICK1 (handles PDF generation). 
Now, if the database changes, the developer only modifies the TICK1EmployeeRepositoryTICK1 file, mathematically guaranteeing that they cannot accidentally break the payroll logic.

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
