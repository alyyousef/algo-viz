import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Dependency Injection/index.mdx': `---
title: Dependency Injection (DI)
description: A software design pattern that physically implements Inversion of Control (IoC), resolving dependencies by mathematically injecting them into a class rather than allowing the class to instantiate them itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Dependency Injection (DI)"
  subtitle="The Eradication of the New Keyword"
  tags={['Design Patterns', 'Architecture', 'SOLID', 'Clean Code']}
>

If a TICK1UserServiceTICK1 class needs to save data, and it executes TICK1Database db = new MySQLDatabase();TICK1 internally, it is mathematically tightly coupled to MySQL. You cannot test this class without spinning up a physical MySQL server.

## 1. Injecting via Constructor
Dependency Injection solves this by mathematically forbidding the use of the TICK1newTICK1 keyword for dependencies.
Instead, the TICK1UserServiceTICK1 demands its dependency via its constructor:
TICK3java
public class UserService {
    private IDatabase db;
    public UserService(IDatabase db) { this.db = db; }
}
TICK3
The class is now perfectly mathematically isolated. When running in production, the DI Framework (like Spring or NestJS) automatically instantiates the real TICK1MySQLDatabaseTICK1 and injects it into the constructor.

## 2. The Power of Mocks
Because the class only asks for an TICK1IDatabaseTICK1 interface, when a developer writes a Unit Test, they instantiate a TICK1MockDatabaseTICK1 (which just saves data to a temporary RAM array) and mathematically inject it into the TICK1UserServiceTICK1 constructor. The code compiles, runs in 1 millisecond, and tests the core business logic perfectly without ever touching a real database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Facade/index.mdx': `---
title: Facade Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically provides a simplified, higher-level interface to a complex subsystem of classes, making the subsystem easier to use and reducing dependencies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Facade Pattern"
  subtitle="Simplifying Mathematical Complexity"
  tags={['Design Patterns', 'Structural', 'GoF', 'Clean Code']}
>

Imagine a complex 3D Video Rendering library. To render a video, you mathematically must initialize a TICK1CodecFactoryTICK1, configure a TICK1BitrateReaderTICK1, instantiate an TICK1AudioMixerTICK1, and orchestrate 15 different classes in a very specific order.

## 1. The Burden of Complexity
If every developer in the company has to memorize this 15-step mathematical initialization process to render a video, the codebase will become bloated with duplicated boilerplate code, and inevitable bugs will occur when someone forgets to call TICK1AudioMixer.sync()TICK1.

## 2. The Simple Interface
The Facade pattern solves this by creating a single, simple wrapper class: TICK1VideoConverterTICK1.
The TICK1VideoConverterTICK1 mathematically encapsulates all the complex subsystem logic behind a single, elegant method: TICK1convert(filename, format)TICK1.
The rest of the application mathematically interacts *only* with the Facade. It isolates the broader application from changes in the underlying 3D rendering library. If the third-party library changes its API, you only have to update the Facade class, mathematically protecting the rest of your codebase.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Factory Method/index.mdx': `---
title: Factory Method Pattern
description: A Creational Design Pattern from the Gang of Four (GoF) that mathematically defines an interface for creating an object, but defers the exact instantiation logic to subclasses, allowing for dynamic, polymorphic object creation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Factory Method Pattern"
  subtitle="Polymorphic Instantiation"
  tags={['Design Patterns', 'Creational', 'GoF', 'Architecture']}
>

If you are building a Logistics application that calculates shipping routes, you initially write the code using a TICK1TruckTICK1 class. Later, the business asks to add maritime shipping via a TICK1ShipTICK1 class. If your core logic is littered with TICK1new Truck()TICK1, you mathematically have to rewrite the entire application.

## 1. The Virtual Constructor
The Factory Method solves this by mathematically replacing direct constructor calls with a method call.
You create an abstract TICK1LogisticsAppTICK1 class with a method TICK1createTransport()TICK1 that returns the generic interface TICK1ITransportTICK1.
The core logic of the app calls TICK1ITransport transport = createTransport(); transport.deliver();TICK1.

## 2. Deferring to Subclasses
To actually run the code, you create subclasses: TICK1RoadLogisticsTICK1 (where TICK1createTransport()TICK1 mathematically returns TICK1new Truck()TICK1) and TICK1SeaLogisticsTICK1 (where it returns TICK1new Ship()TICK1).
The core mathematical delivery algorithm is perfectly decoupled from the specific type of transport being instantiated. You can add TICK1AirLogisticsTICK1 (returning TICK1new Airplane()TICK1) next year without modifying the core logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Flyweight/index.mdx': `---
title: Flyweight Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that minimizes RAM usage by mathematically sharing as much data as possible with similar objects, crucial when dealing with massive quantities of objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Flyweight Pattern"
  subtitle="Mathematical Memory Compression"
  tags={['Design Patterns', 'Structural', 'GoF', 'Performance']}
>

If you are building a video game forest with 1 million TICK1TreeTICK1 objects, and each object contains an 8MB 3D mesh for the leaves and a 2MB texture for the bark, allocating 1 million trees requires 10 Terabytes of RAM. The computer will mathematically crash instantly.

## 1. Intrinsic vs Extrinsic State
The Flyweight pattern mathematically divides object state into two categories:
- **Intrinsic State**: Data that is constant across all objects. (e.g., The 8MB 3D mesh and 2MB texture of an Oak Tree).
- **Extrinsic State**: Data that is unique to each object. (e.g., The X, Y coordinates and current health of *this specific* tree).

## 2. The Shared Reference
Instead of storing the heavy Intrinsic State inside the TICK1TreeTICK1 object, you mathematically extract it into a single TICK1TreeModelTICK1 object. You only instantiate exactly *one* TICK1TreeModelTICK1 in RAM (10MB).
The 1 million TICK1TreeTICK1 objects now only store their Extrinsic State (X, Y coordinates = 16 bytes) and a lightweight memory pointer (8 bytes) to the shared TICK1TreeModelTICK1. 
The total RAM usage drops from 10 Terabytes to mathematically less than 30 Megabytes, making the game playable.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Iterator/index.mdx': `---
title: Iterator Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically provides a standard way to sequentially access the elements of an aggregate object without exposing its underlying internal representation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Iterator Pattern"
  subtitle="Standardizing Sequential Traversal"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Data Structures']}
>

If a developer needs to loop through a standard Array, they use a standard TICK1for(int i=0; i<length; i++)TICK1 loop. But what if the underlying data structure is a complex mathematical Graph, a Binary Search Tree, or a Linked List?

## 1. The Traversal Problem
If the client code manually writes the complex depth-first search logic to traverse a Graph, the client code becomes mathematically tightly coupled to the Graph's internal memory layout. If you later swap the Graph for an Array to improve performance, the client code breaks.

## 2. The Universal Interface
The Iterator pattern solves this by extracting the traversal behavior into a separate TICK1IteratorTICK1 object.
The Iterator implements a standard mathematical interface with two methods: TICK1hasNext()TICK1 and TICK1getNext()TICK1.
TICK3java
Iterator<User> iter = userDatabase.createIterator();
while(iter.hasNext()) {
    System.out.println(iter.getNext());
}
TICK3
The client code can now iterate over the collection using the exact same TICK1whileTICK1 loop, completely mathematically ignorant of whether it is traversing a contiguous array in RAM or performing a complex pre-order traversal of a balanced binary tree. (This pattern is built directly into almost all modern programming languages).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Mediator/index.mdx': `---
title: Mediator Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically reduces chaotic, direct dependencies between communicating objects by forcing them to collaborate exclusively through a central mediator object.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Mediator Pattern"
  subtitle="The Mathematical Traffic Cop"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Architecture']}
>

Imagine the UI for an airplane cockpit or a complex form. If checking the "Is Married" Checkbox must enable the "Spouse Name" TextField, and checking the "Is Employed" Checkbox must disable the "Unemployment Benefits" Dropdown.

## 1. The Spiderweb of Dependencies
If the Checkbox object has a direct mathematical pointer to the TextField object, and the Dropdown object has a direct pointer to the Checkbox, you create an unmaintainable mathematical spiderweb. If you delete one UI component, five others crash because their direct pointers become null.

## 2. The Central Hub
The Mediator pattern extracts all direct communication.
UI components are mathematically forbidden from knowing about each other. Instead, they only know about the **Mediator** (e.g., a TICK1FormControllerTICK1).
When the "Is Married" Checkbox is clicked, it simply says: TICK1mediator.notify("CheckboxClicked", true)TICK1.
The Mediator holds all the complex mathematical routing logic. It receives the event, looks at its rules, and executes TICK1spouseTextField.enable()TICK1. By centralizing the chaos into a single hub, the individual UI components remain mathematically independent and highly reusable.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Memento/index.mdx': `---
title: Memento Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically allows you to capture and externalize an object's internal state so that the object can be restored to this state later, without violating encapsulation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Memento Pattern"
  subtitle="The Mathematical Snapshot"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Data Structures']}
>

Implementing an "Undo" feature in a text editor or a video game save system is mathematically difficult. You need to save the exact internal state of the TICK1EditorTICK1 object.

## 1. The Encapsulation Violation
You could have the UI simply copy all the variables out of the TICK1EditorTICK1 and store them in an array. However, this mathematically violates encapsulation. The TICK1EditorTICK1 would have to make all its private, internal variables (like the cursor position or the hidden text buffer) public.

## 2. The Opaque Snapshot
The Memento pattern solves this. The TICK1EditorTICK1 (the Originator) is the *only* class allowed to create the snapshot.
When the user types, the UI asks the Editor for a Memento. The Editor mathematically packages its own private state into a TICK1MementoTICK1 object and hands it to the UI (the Caretaker).
Crucially, the TICK1MementoTICK1 object is mathematically opaque to the UI. The UI cannot read or modify the variables inside it; it can only store it in an Undo stack. When the user hits CTRL+Z, the UI hands the Memento back to the Editor, which mathematically unpacks it and restores its own private state.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Null Object/index.mdx': `---
title: Null Object Pattern
description: A Behavioral Design Pattern that mathematically replaces dangerous null references with a neutral, "do nothing" object that implements the expected interface, eliminating the need for constant null-checking logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Null Object Pattern"
  subtitle="Eliminating the Billion Dollar Mistake"
  tags={['Design Patterns', 'Behavioral', 'Clean Code', 'Architecture']}
>

Tony Hoare famously called the invention of the TICK1nullTICK1 reference the "Billion Dollar Mistake" due to the catastrophic number of crashes (NullPointerExceptions) it has caused in software history.

## 1. The Defensive Coding Nightmare
If a method returns a TICK1LoggerTICK1 object, but logging is disabled, the method returns TICK1nullTICK1.
Now, every single place in the codebase that uses the logger must mathematically execute: TICK1if (logger != null) { logger.log("msg"); }TICK1. This pollutes the business logic with endless defensive checks.

## 2. The Neutral Implementation
The Null Object pattern solves this by providing a polymorphic alternative to TICK1nullTICK1.
You create a TICK1NullLoggerTICK1 class that mathematically implements the TICK1ILoggerTICK1 interface. Its TICK1log()TICK1 method is completely empty; it does absolutely nothing.
When logging is disabled, the method returns the TICK1NullLoggerTICK1 object instead of TICK1nullTICK1.
The client code blindly executes TICK1logger.log("msg")TICK1. The code mathematically succeeds without crashing, entirely eliminating the need for the TICK1if (logger != null)TICK1 check and cleaning up the architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Observer/index.mdx': `---
title: Observer Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically establishes a one-to-many subscription mechanism to notify multiple objects automatically about any state changes in the object they are observing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Observer Pattern"
  subtitle="Mathematical Event Subscription"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Reactive']}
>

In an e-commerce app, when a TICK1CustomerTICK1 changes their address, the TICK1ShippingServiceTICK1, the TICK1BillingServiceTICK1, and the TICK1MarketingServiceTICK1 all need to know.

## 1. The Polling Anti-Pattern
If the BillingService mathematically polls the Customer object every 5 seconds (TICK1if (addressChanged())TICK1), it burns massive amounts of CPU cycles for no reason. 

## 2. The Publish-Subscribe Mechanism
The Observer pattern perfectly solves this.
The TICK1CustomerTICK1 (the Subject) maintains an internal array of TICK1IObserverTICK1 interface pointers.
The three services mathematically "subscribe" by passing their pointer to the Customer: TICK1customer.subscribe(billingService)TICK1.
When the address is updated, the TICK1CustomerTICK1 iterates over its internal array and mathematically executes TICK1observer.notify(newAddress)TICK1 on every object in the list. The services instantly receive the data without polling, and the TICK1CustomerTICK1 remains decoupled because it only knows it is talking to a generic TICK1IObserverTICK1, not a specific Billing Service. (This is the mathematical foundation of RxJS and Event Listeners in JavaScript).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Prototype/index.mdx': `---
title: Prototype Pattern
description: A Creational Design Pattern from the Gang of Four (GoF) that mathematically allows you to copy or clone existing objects without making your code dependent on their specific, concrete classes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Prototype Pattern"
  subtitle="Mathematical Cloning"
  tags={['Design Patterns', 'Creational', 'GoF', 'Memory']}
>

Creating a new object from scratch using the TICK1newTICK1 keyword can sometimes be mathematically expensive, especially if the object requires pulling 5MB of configuration data from a database during its constructor phase.

## 1. The Cloning Problem
If you already have a fully configured TICK1MonsterTICK1 object in RAM and you need 10 more identical monsters, you could try to manually instantiate a new monster and copy the variables over one by one. But if some of those variables are mathematically TICK1privateTICK1, the external code cannot access them, making a perfect copy impossible.

## 2. The Prototype Interface
The Prototype pattern solves this by delegating the cloning process to the object itself.
The object implements an TICK1IPrototypeTICK1 interface requiring a TICK1clone()TICK1 method.
Because the TICK1clone()TICK1 method exists *inside* the object, it has full mathematical access to its own private fields. It creates a new instance of itself, deeply copies all its own variables, and returns the perfect clone. The client code simply executes TICK1Monster m2 = m1.clone()TICK1, bypassing the expensive database constructor entirely.

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
