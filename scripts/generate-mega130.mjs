import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Proxy/index.mdx': `---
title: Proxy Pattern
description: A Structural Design Pattern from the Gang of Four (GoF) that mathematically provides a surrogate or placeholder for another object to control access to it, enabling lazy initialization, logging, or access control.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Proxy Pattern"
  subtitle="The Mathematical Interceptor"
  tags={['Design Patterns', 'Structural', 'GoF', 'Architecture']}
>

If you have a massive TICK1HighResImageTICK1 object that takes 5 seconds to load from the hard drive, and a user scrolls through a gallery of 1,000 images, instantiating all 1,000 objects will mathematically freeze the application.

## 1. The Surrogate Object
The Proxy pattern solves this by putting a fake "bodyguard" object in front of the real object.
Both the TICK1HighResImageTICK1 and the TICK1ImageProxyTICK1 mathematically implement the exact same TICK1IImageTICK1 interface (which has a TICK1display()TICK1 method).
When the gallery loads, it instantiates 1,000 TICK1ImageProxyTICK1 objects. This takes 1 millisecond, because the Proxy mathematically contains no image data; it just contains the file path.

## 2. Lazy Initialization
When the user actually scrolls to Image #42, the gallery calls TICK1proxy.display()TICK1.
The Proxy mathematically intercepts the call. It checks if the real TICK1HighResImageTICK1 exists in RAM. It doesn't. So, the Proxy pauses, instantiates the heavy real object, loads the 5MB file from disk, and then mathematically forwards the TICK1display()TICK1 call to the real object. The client code is completely ignorant that it was talking to a surrogate.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Repository/index.mdx': `---
title: Repository Pattern
description: An architectural design pattern that mathematically abstracts data access logic, acting as an in-memory domain object collection, mediating between the domain and data mapping layers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Repository Pattern"
  subtitle="Abstracting the Database"
  tags={['Design Patterns', 'Architecture', 'DDD', 'Databases']}
>

If you write raw SQL queries directly inside your Business Logic classes, your business rules are mathematically permanently coupled to that specific SQL dialect. 

## 1. The Collection Illusion
The Repository pattern solves this by tricking the Business Logic into thinking the Database is just a simple, in-memory Array.
The architect creates an interface: TICK1IUserRepositoryTICK1 with methods like TICK1findById(id)TICK1 and TICK1save(User u)TICK1.
The Business Logic simply executes: TICK1User u = repository.findById(42);TICK1.

## 2. Isolating the SQL
The actual concrete implementation (TICK1PostgresUserRepositoryTICK1) mathematically implements the interface and hides all the ugly JDBC/SQL logic inside it. 
This provides two massive architectural advantages:
1. **Testing**: You can create an TICK1InMemoryUserRepositoryTICK1 for Unit Tests, completely bypassing the physical database.
2. **Swapping**: If the company migrates from PostgreSQL to MongoDB, you simply write a TICK1MongoUserRepositoryTICK1 class. You do not have to mathematically alter a single line of your core Business Logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Singleton/index.mdx': `---
title: Singleton Pattern
description: A Creational Design Pattern from the Gang of Four (GoF) that mathematically restricts the instantiation of a class to one "single" instance, providing a global point of access to that instance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Singleton Pattern"
  subtitle="The Global State Object"
  tags={['Design Patterns', 'Creational', 'GoF', 'Anti-Pattern']}
>

If an application needs exactly one connection pool to the database, or exactly one file logger, instantiating multiple TICK1DatabasePoolTICK1 objects will mathematically corrupt the data or crash the server.

## 1. The Private Constructor
The Singleton mathematically prevents multiple instantiations by making the constructor strictly TICK1privateTICK1. The outside world literally cannot use the TICK1newTICK1 keyword.
Instead, the class contains a TICK1private staticTICK1 variable of itself, and a TICK1public static getInstance()TICK1 method.
TICK3java
public class Logger {
    private static Logger instance;
    private Logger() {} // Private!
    public static Logger getInstance() {
        if (instance == null) { instance = new Logger(); }
        return instance;
    }
}
TICK3

## 2. The Anti-Pattern Controversy
While famous, Singleton is widely considered a dangerous **Anti-Pattern** in modern architecture.
Because it provides global mathematical access (any file can call TICK1Logger.getInstance()TICK1 anywhere), it acts exactly like a Global Variable. This creates hidden dependencies, makes automated Unit Testing extremely difficult (because state carries over between tests), and introduces catastrophic mathematical Race Conditions in multi-threaded environments if not locked perfectly. Modern systems use Dependency Injection instead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Specification pattern/index.mdx': `---
title: Specification Pattern
description: A Domain-Driven Design pattern that mathematically encapsulates a piece of domain knowledge into a single, highly reusable Boolean logic object, determining whether another object satisfies a specific criteria.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Specification Pattern"
  subtitle="Encapsulating Boolean Logic"
  tags={['Design Patterns', 'DDD', 'Architecture', 'Clean Code']}
>

If a bank requires that a user is "Eligible for a Loan," the rules might be: ` + '`' + `creditScore > 700 AND income > 50000 AND (not bankrupt)` + '`' + `.
If you write this massive TICK1ifTICK1 statement directly inside the TICK1LoanServiceTICK1, and then you need the exact same logic in the TICK1MarketingServiceTICK1, you will mathematically duplicate the rules. If the bank lowers the credit score requirement to 650, you must find and update it in 15 different files.

## 1. The Specification Object
The Specification pattern extracts this boolean logic into a standalone mathematical Object.
You create a class called TICK1IsEligibleForLoanSpecTICK1 that implements a single method: TICK1isSatisfiedBy(User u)TICK1 returning a Boolean.

## 2. Chainable Logic
Because the rules are now Objects, they can be mathematically chained using Composite Specifications (AND, OR, NOT).
You can write: TICK1var isEligible = new HighCreditSpec().and(new HighIncomeSpec()).and(new NotBankruptSpec().not());TICK1
The Business Logic simply executes: TICK1if (isEligible.isSatisfiedBy(user))TICK1. The complex mathematical rules are perfectly centralized, highly testable, and instantly reusable across the entire architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/State/index.mdx': `---
title: State Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically allows an object to completely alter its behavior when its internal state changes, appearing as if the object changed its class.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="State Pattern"
  subtitle="Object-Oriented Finite State Machines"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Architecture']}
>

If you are programming a Vending Machine, its behavior drastically changes based on its state. If the state is TICK1NO_COINTICK1, pressing the "Dispense" button must mathematically fail. If the state is TICK1HAS_COINTICK1, pressing "Dispense" must succeed and change the state to TICK1DISPENSINGTICK1.

## 1. The Switch-Statement Nightmare
Developers usually solve this with massive TICK1switch(currentState)TICK1 blocks inside every single method (TICK1insertCoin()TICK1, TICK1dispense()TICK1). If you add a new state, you must mathematically update 15 different switch statements, violating the Open-Closed Principle.

## 2. Polymorphic States
The State pattern solves this by converting the States into concrete Objects.
You create an TICK1IStateTICK1 interface with methods for every action (TICK1insert()TICK1, TICK1dispense()TICK1).
You create concrete classes for the states: TICK1NoCoinStateTICK1 and TICK1HasCoinStateTICK1.
The VendingMachine object just holds a pointer to an TICK1IStateTICK1 object. When the user presses "Dispense", the VendingMachine blindly delegates the call: TICK1this.currentState.dispense()TICK1. 
The TICK1HasCoinStateTICK1 object executes the logic and mathematically injects the new TICK1DispensingStateTICK1 object into the VendingMachine, elegantly replacing complex branching logic with polymorphism.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Strategy/index.mdx': `---
title: Strategy Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Strategy Pattern"
  subtitle="Interchangeable Mathematical Algorithms"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Architecture']}
>

If an e-commerce checkout system needs to process payments, it might need to support Credit Cards, PayPal, and Bitcoin. 
If the TICK1CheckoutServiceTICK1 uses a massive TICK1if (type == "paypal") { ... } else if (type == "bitcoin") { ... }TICK1 block, it violates the Open-Closed Principle. Adding Apple Pay requires modifying the core file.

## 1. Encapsulating the Algorithm
The Strategy pattern solves this by extracting each algorithm into its own file.
You create an TICK1IPaymentStrategyTICK1 interface with a TICK1pay(amount)TICK1 method.
You create three completely separate classes: TICK1PayPalStrategyTICK1, TICK1BitcoinStrategyTICK1, and TICK1CreditCardStrategyTICK1.

## 2. Runtime Injection
The TICK1CheckoutServiceTICK1 simply holds a reference to an TICK1IPaymentStrategyTICK1 object.
At runtime, when the user clicks the PayPal radio button on the UI, the system mathematically injects the TICK1PayPalStrategyTICK1 object into the CheckoutService.
The service blindly executes TICK1this.strategy.pay(100)TICK1. It has absolutely zero mathematical knowledge of *how* the payment is being processed. To add Apple Pay next year, you simply write a new Strategy class; the core CheckoutService file is never mathematically touched again.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Template Method/index.mdx': `---
title: Template Method Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically defines the skeleton of an algorithm in a base superclass, allowing child subclasses to override specific steps of the algorithm without changing its overall structure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Template Method Pattern"
  subtitle="The Inverted Mathematical Skeleton"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Inheritance']}
>

Imagine you have two classes: TICK1DataMinerPDFTICK1 and TICK1DataMinerCSVTICK1.
Both algorithms follow the exact same mathematical skeleton:
1. Open File.
2. Extract Data (Different logic).
3. Analyze Data (Same logic).
4. Close File.

## 1. The Abstract Skeleton
If you duplicate this 4-step workflow in both classes, you violate DRY (Don't Repeat Yourself).
Instead, you create an abstract base class TICK1DataMinerTICK1. Inside it, you write the **Template Method**:
TICK3java
public final void mineData() {
    openFile();
    extractData(); // Abstract method!
    analyzeData();
    closeFile();
}
TICK3
The TICK1mineData()TICK1 method is marked TICK1finalTICK1; child classes are mathematically forbidden from overriding the core 4-step sequence.

## 2. The Hollywood Principle
The child class (TICK1DataMinerPDFTICK1) mathematically inherits the base class, but it only implements the specific TICK1extractData()TICK1 method.
This follows the **Hollywood Principle**: *"Don't call us, we'll call you."* The child class does not control the execution flow. The parent class mathematically orchestrates the algorithm and calls down to the child class's specific implementation exactly when needed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Unit of Work/index.mdx': `---
title: Unit of Work Pattern
description: An architectural design pattern that mathematically maintains a list of objects affected by a business transaction and coordinates the writing out of all changes in one atomic database operation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Unit of Work Pattern"
  subtitle="Mathematical Transactional Integrity"
  tags={['Design Patterns', 'Architecture', 'Databases', 'Enterprise']}
>

If a user buys a TV, the code must deduct money from their TICK1UserTICK1 account and remove the TV from the TICK1InventoryTICK1.
If you execute TICK1userRepository.save(user)TICK1 and it succeeds, but then TICK1inventoryRepository.save(tv)TICK1 crashes, the database is mathematically corrupted. The money is gone, but the TV is still in the warehouse.

## 1. The In-Memory Ledger
The Unit of Work pattern prevents this by halting immediate database writes.
When you modify the User and the Inventory objects in RAM, they mathematically register themselves with a central TICK1UnitOfWorkTICK1 object (acting like an in-memory ledger). It records: "User is modified, Inventory is modified."

## 2. The Atomic Flush
When the business transaction is complete, the application calls TICK1unitOfWork.commit()TICK1.
The Unit of Work opens exactly ONE database transaction, mathematically translates all the in-memory changes into SQL updates, and executes them in a single batch. If any part fails, the database mathematically rolls back the entire transaction. (This pattern is built directly into modern ORMs like Entity Framework and Hibernate via the TICK1SaveChanges()TICK1 or TICK1flush()TICK1 methods).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.3 Design Patterns/Visitor/index.mdx': `---
title: Visitor Pattern
description: A Behavioral Design Pattern from the Gang of Four (GoF) that mathematically separates an algorithm from the object structure on which it operates, allowing you to add new operations to classes without modifying them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Visitor Pattern"
  subtitle="Mathematical Double Dispatch"
  tags={['Design Patterns', 'Behavioral', 'GoF', 'Advanced']}
>

Imagine you have a complex mathematical tree of Objects (e.g., a Document containing TICK1ParagraphTICK1, TICK1ImageTICK1, and TICK1TableTICK1 objects). You want to add a feature to export the document to XML.
If you add an TICK1exportXML()TICK1 method to all three classes, you violate the Single Responsibility Principle. If you later need to export to PDF, you have to modify the classes again.

## 1. The Visitor Object
The Visitor pattern extracts the operation. You create an TICK1IXMLVisitorTICK1 interface with methods: TICK1visit(Paragraph p)TICK1, TICK1visit(Image i)TICK1.
The core classes only implement a single, permanent method: TICK1accept(IVisitor v)TICK1.

## 2. Double Dispatch
When you run the algorithm, you pass the Visitor into the object: TICK1image.accept(xmlVisitor)TICK1.
Inside the TICK1ImageTICK1 class, the TICK1acceptTICK1 method simply executes: TICK1visitor.visit(this)TICK1.
This is **Double Dispatch**. The CPU mathematically bounces the execution: the client calls the Object, and the Object instantly bounces the execution back to the Visitor's highly specific TICK1visit(Image i)TICK1 method. You can now add a TICK1PDFVisitorTICK1 next week, and the original Domain classes remain completely untouched.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/API gateways/index.mdx': `---
title: API Gateways
description: A crucial architectural component in Microservices that acts as the single mathematical entry point for all client requests, routing traffic, enforcing security, and providing rate limiting before requests reach the internal services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="API Gateways"
  subtitle="The Front Door of Microservices"
  tags={['API', 'Microservices', 'Architecture', 'Security']}
>

If an enterprise has 500 different Microservices, requiring a mobile app to mathematically know the IP address and port number of all 500 services is impossible. If the "Inventory Service" changes its IP address, all mobile apps in the world instantly break.

## 1. The Reverse Proxy
An API Gateway (like AWS API Gateway, Kong, or NGINX) acts as a mathematical Reverse Proxy.
The mobile app only knows **one** URL: TICK1api.company.comTICK1.
When the app requests TICK1/ordersTICK1, the request hits the Gateway. The Gateway mathematically inspects the URL, looks up its internal routing table, and forwards the TCP packet to the correct internal, hidden Microservice.

## 2. Centralized Cross-Cutting Concerns
If you do not have a Gateway, every one of the 500 Microservices must independently implement mathematical logic for JWT Authentication, SSL Termination, and Rate Limiting.
The API Gateway centralizes this. It mathematically terminates the HTTPS connection. It verifies the JWT signature. If the token is invalid, the Gateway immediately drops the packet and returns a 401 error. The internal Microservices receive clean, verified traffic and can focus purely on business logic.

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
