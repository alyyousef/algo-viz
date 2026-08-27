import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/SOA/index.mdx': `---
title: SOA (Service-Oriented Architecture)
description: The architectural predecessor to Microservices, where an enterprise's software components mathematically expose their functionality as distinct, network-accessible services via a centralized Enterprise Service Bus (ESB).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SOA (Service-Oriented Architecture)"
  subtitle="The Enterprise Service Bus"
  tags={['Architecture', 'Enterprise', 'Legacy', 'Distributed Systems']}
>

In the early 2000s, massive corporations needed a way to make their ancient Mainframes talk to their new Java applications. They invented SOA (Service-Oriented Architecture).

## 1. The Enterprise Service Bus (ESB)
In SOA, services do not communicate with each other directly. They mathematically route all communication through a massive, centralized piece of middleware called the **Enterprise Service Bus (ESB)**.
The ESB acts as a universal translator. If the Java app sends XML, the ESB intercepts it, mathematically translates the XML into a legacy COBOL format, and routes it to the Mainframe.

## 2. The Smart Pipe Flaw
SOA ultimately failed because of a mathematical anti-pattern: "Smart Pipes, Dumb Endpoints."
Because the ESB handled all translation, routing, and business logic orchestration, the ESB itself became a massive, unmaintainable Monolith. If the ESB crashed, the entire global enterprise went mathematically offline. 
Modern Microservices mathematically inverted this to "Dumb Pipes, Smart Endpoints" (using dumb routers like API Gateways and putting the translation logic strictly inside the services themselves).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.2 Software Architecture/Ubiquitous language/index.mdx': `---
title: Ubiquitous Language
description: The foundational practice of Domain-Driven Design (DDD) where software engineers and business domain experts mathematically agree on a strict, shared vocabulary that is identical in both spoken conversation and source code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Ubiquitous Language"
  subtitle="Synchronizing Code and Conversation"
  tags={['Architecture', 'DDD', 'Clean Code', 'Communication']}
>

The single greatest source of mathematical bugs in enterprise software is the translation layer between what the business asks for and what the developer types.

## 1. The Translation Penalty
If a banking executive says, *"A client can overdraft their account,"* and the developer writes TICK1user.setBalance(user.getBalance() - amount)TICK1, the developer has mathematically failed. The developer translated the business concept of an "Overdraft" into a generic mathematical subtraction. Next year, when the business changes the rules for an "Overdraft," the developer will have to hunt down every subtraction in the codebase.

## 2. Enforcing the Dictionary
Ubiquitous Language solves this by enforcing a strict dictionary.
If the business uses the word "Overdraft," the developer must mathematically create an TICK1OverdraftTICK1 class or method. The code must look exactly like the conversation: TICK1account.applyOverdraft(amount)TICK1. 
If an engineer uses a word in a variable name that the business experts do not understand, the code is mathematically rejected. This ensures the architecture perfectly mirrors the real-world domain.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Abstract Factory/index.mdx': `---
title: Abstract Factory Pattern
description: A Creational Design Pattern from the Gang of Four (GoF) that mathematically provides an interface for creating families of related or dependent objects without specifying their exact concrete classes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Abstract Factory Pattern"
  subtitle="Families of Objects"
  tags={['Design Patterns', 'Creational', 'GoF', 'Architecture']}
>

If you are building a cross-platform UI framework, you need to create Buttons, Checkboxes, and TextFields. However, a Windows Button mathematically renders completely differently than a macOS Button.

## 1. The Family Problem
If you use raw instantiation (TICK1new WindowsButton()TICK1), your business logic is mathematically tightly coupled to the Windows OS. If you run the code on a Mac, it crashes. You need a way to mathematically guarantee that you always create a complete "family" of matching UI components.

## 2. The Abstract Factory
The architect creates an Interface called TICK1IGUIFactoryTICK1, which mathematically guarantees three methods: TICK1createButton()TICK1, TICK1createCheckbox()TICK1, and TICK1createTextField()TICK1.
You then create concrete implementations: TICK1WindowsFactoryTICK1 and TICK1MacFactoryTICK1.
When the application starts, it checks the OS and injects the correct Factory into the business logic. The business logic simply calls TICK1factory.createButton()TICK1. It has absolutely zero mathematical knowledge of whether it is receiving a Windows button or a Mac button, completely fulfilling the Open-Closed Principle.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Adapter/index.mdx': `---
title: Adapter Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically allows objects with incompatible interfaces to collaborate by wrapping one of the objects in an adapter to make it compatible with the other.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Adapter Pattern"
  subtitle="The Software Translator"
  tags={['Design Patterns', 'Structural', 'GoF', 'Architecture']}
>

Just like a physical power adapter allows a European plug to physically connect to an American wall socket, the Adapter Pattern mathematically connects incompatible APIs.

## 1. The Incompatible Interface
Imagine your application uses an TICK1IXMLProcessorTICK1 interface that mathematically requires an TICK1analyze(String xml)TICK1 method.
You discover a brilliant open-source library that does exactly what you need, but it is an TICK1AdvancedJSONProcessorTICK1 that mathematically only accepts JSON. You cannot modify the open-source library (it is closed), and you cannot rewrite your entire application to use JSON.

## 2. The Wrapper
You build an Adapter. You create a new class TICK1JSONToXMLAdapterTICK1 that mathematically implements your TICK1IXMLProcessorTICK1 interface.
Inside the Adapter's TICK1analyze(String xml)TICK1 method, you write the mathematical logic to parse the XML, convert it into JSON, and pass it to the open-source library.
Your application is completely ignorant of the translation. It thinks it is talking to a standard XML processor, allowing you to integrate third-party code without mathematically corrupting your core architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Bridge/index.mdx': `---
title: Bridge Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically decouples an abstraction from its implementation so that the two can vary and evolve independently.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bridge Pattern"
  subtitle="Decoupling Abstraction from Implementation"
  tags={['Design Patterns', 'Structural', 'GoF', 'Architecture']}
>

The Bridge pattern solves the mathematical explosion of subclassing that occurs when a class has two orthogonal dimensions of variance.

## 1. The Cartesian Explosion
Imagine a TICK1ShapeTICK1 class. You want to add dimensions for "Shape Type" (Circle, Square) and "Color" (Red, Blue).
If you use standard inheritance, you mathematically must create a TICK1RedCircleTICK1, TICK1BlueCircleTICK1, TICK1RedSquareTICK1, and TICK1BlueSquareTICK1. If you add a "Triangle" and the color "Green", you now have 9 classes. This is a mathematical Cartesian product explosion (N x M).

## 2. The Bridge Solution
The Bridge pattern mathematically severs the inheritance tree into two separate hierarchies.
You create a TICK1ShapeTICK1 hierarchy (Circle, Square) and a completely separate TICK1IColorTICK1 hierarchy (Red, Blue).
The TICK1ShapeTICK1 base class is given a mathematical reference (a bridge pointer) to an TICK1IColorTICK1 object.
Now, if you want a Blue Circle, you simply instantiate a TICK1CircleTICK1 and inject the TICK1BlueTICK1 object into its bridge pointer. Adding "Triangle" and "Green" now only requires creating exactly 2 new classes instead of 5, mathematically converting N x M into N + M.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Builder/index.mdx': `---
title: Builder Pattern
description: A Creational Design Pattern from the Gang of Four (GoF) that mathematically separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Builder Pattern"
  subtitle="Constructing Complex Objects"
  tags={['Design Patterns', 'Creational', 'GoF', 'Clean Code']}
>

Creating an object using the TICK1newTICK1 keyword is easy, unless the object mathematically requires 15 different configuration parameters to be properly initialized.

## 1. The Telescoping Constructor Anti-Pattern
If a TICK1HouseTICK1 class requires parameters for walls, doors, windows, roof, and pool, developers often mathematically create a massive constructor: TICK1new House(4, 2, 8, true, false, null, null)TICK1. This is mathematically unreadable. What does TICK1trueTICK1 mean?

## 2. The Fluent Builder
The Builder pattern solves this by extracting the object construction code out of its own class and into a separate TICK1HouseBuilderTICK1 object.
The Builder provides a mathematically "fluent" API (methods that return TICK1thisTICK1) allowing for step-by-step configuration:
TICK3java
House myHouse = new HouseBuilder()
    .setWalls(4)
    .setDoors(2)
    .addPool()
    .build();
TICK3
This mathematically eliminates the telescoping constructor, makes the code perfectly readable, and allows the Builder to enforce strict validation logic before mathematically allocating the final TICK1HouseTICK1 object via the TICK1build()TICK1 method.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Chain of Responsibility/index.mdx': `---
title: Chain of Responsibility Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically lets you pass requests along a chain of handlers, where each handler decides either to process the request or to pass it to the next handler.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Chain of Responsibility Pattern"
  subtitle="Passing the Baton"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Architecture']}
>

In a web application, an incoming HTTP request mathematically requires several checks before the business logic executes: Is it authenticated? Is it authorized? Is the JSON valid? Does it pass the rate limiter?

## 1. The Monolithic If-Statement
If you put all this logic in the controller, you get a massive, mathematically fragile TICK1if (auth) { if (valid) { if (rate) { ... } } }TICK1 block. This violates the Single Responsibility Principle.

## 2. The Linked List Chain
The Chain of Responsibility mathematically solves this by modeling the handlers as a Linked List.
You create standalone classes: TICK1AuthHandlerTICK1, TICK1ValidationHandlerTICK1, and TICK1RateLimitHandlerTICK1. Each class mathematically possesses a pointer to the TICK1nextTICK1 handler in the chain.
When the request arrives, it hits the TICK1AuthHandlerTICK1. If authentication fails, the handler immediately returns a 401 Error, mathematically terminating the chain. If it succeeds, it calls TICK1next.handle(request)TICK1, passing it to the ValidationHandler.
This allows architects to mathematically snap new filters into the chain at runtime without altering the core controller logic. (This pattern is the exact mathematical foundation of "Middleware" in Express.js).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Command/index.mdx': `---
title: Command Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically encapsulates a request as a stand-alone object containing all information about the request, allowing for parameterization, queueing, and undo operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Command Pattern"
  subtitle="Objectifying Actions"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Architecture']}
>

In a text editor, a user can copy text by clicking a button in the UI, pressing CTRL+C on the keyboard, or selecting it from a context menu. If you write the "Copy" logic directly inside the UI Button's onClick event, the Keyboard listener mathematically cannot reuse it.

## 1. The Command Object
The Command pattern mathematically extracts the action itself into a standalone object.
You create an TICK1ICommandTICK1 interface with an TICK1execute()TICK1 method. You then create a TICK1CopyCommandTICK1 class that implements it.
Now, the UI Button, the Keyboard shortcut, and the Context Menu all simply hold a reference to the TICK1CopyCommandTICK1 object. When triggered, they blindly call TICK1command.execute()TICK1.

## 2. Queues and Undos
Because the action is now a physical, mathematical Object in RAM, you can do things you mathematically cannot do with a standard method call.
You can place the Command objects into an Array (a Queue) and execute them later. More importantly, if you add an TICK1undo()TICK1 method to the interface, you can maintain a Stack of executed Command objects. If the user presses CTRL+Z, you simply pop the last Command object off the Stack and execute its mathematical TICK1undo()TICK1 logic, effortlessly building a robust History system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Composite/index.mdx': `---
title: Composite Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically allows you to compose objects into tree structures to represent part-whole hierarchies, treating individual objects and compositions uniformly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Composite Pattern"
  subtitle="The Mathematical Tree"
  tags={['Design Patterns', 'Structural', 'GoF', 'Data Structures']}
>

If you are building a File System or a UI DOM tree, you mathematically possess two types of objects: Leaves (a File) and Branches (a Folder, which contains Files and other Folders).

## 1. The Type-Checking Problem
If you need to calculate the total size of a Folder, you must iterate through its contents. If the iteration requires mathematical type-checking (TICK1if (item is File) { add size } else if (item is Folder) { recursion }TICK1), the code becomes fragile and complex.

## 2. The Uniform Component
The Composite pattern solves this by forcing both the Leaf (File) and the Branch (Folder) to mathematically implement the exact same Interface (e.g., TICK1IFileSystemNodeTICK1), which guarantees a TICK1getSize()TICK1 method.
- The File's TICK1getSize()TICK1 mathematically returns its byte size (e.g., 100).
- The Folder's TICK1getSize()TICK1 mathematically iterates over its internal array of TICK1IFileSystemNodeTICK1 children, calling TICK1getSize()TICK1 on each one and summing the result.
The client code (the OS) simply calls TICK1rootNode.getSize()TICK1. It mathematically does not care if the node is a single file or a folder containing 10,000 nested sub-folders. The polymorphism perfectly handles the recursive mathematics.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Decorator/index.mdx': `---
title: Decorator Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically allows behavior to be added to an individual object, dynamically at runtime, without affecting the behavior of other objects from the same class.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Decorator Pattern"
  subtitle="Dynamic Mathematical Wrapping"
  tags={['Design Patterns', 'Structural', 'GoF', 'Architecture']}
>

If you have a TICK1CoffeeTICK1 class and you want to add Milk, Sugar, or Vanilla, using mathematical inheritance requires creating TICK1CoffeeWithMilkTICK1, TICK1CoffeeWithMilkAndSugarTICK1, etc. This causes a mathematical explosion of subclasses.

## 1. The Wrapper
The Decorator pattern solves this using Composition. You create a TICK1CoffeeDecoratorTICK1 class that mathematically implements the exact same TICK1ICoffeeTICK1 interface as the base TICK1CoffeeTICK1 class, but it *also* takes an TICK1ICoffeeTICK1 object in its constructor (wrapping it).

## 2. Runtime Stacking
If you create a TICK1MilkDecoratorTICK1, its TICK1getCost()TICK1 method mathematically executes TICK1return this.wrappedCoffee.getCost() + 0.50;TICK1.
At runtime, you can instantiate a base TICK1CoffeeTICK1, wrap it in a TICK1MilkDecoratorTICK1, and then wrap *that* in a TICK1SugarDecoratorTICK1. 
The client simply calls TICK1getCost()TICK1 on the outermost wrapper. The call mathematically drills down through the layers like a Matryoshka doll, returning the dynamically calculated total, completely bypassing the need for static inheritance. (This is the architectural basis of Java's TICK1InputStreamTICK1 libraries).

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
