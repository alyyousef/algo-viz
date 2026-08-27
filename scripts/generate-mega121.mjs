import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/SRE/index.mdx': `---
title: SRE (Site Reliability Engineering)
description: A software engineering approach to IT operations, originally pioneered by Google, that uses algorithms, coding, and mathematical metrics to manage massive, complex systems more reliably than traditional system administration.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SRE (Site Reliability Engineering)"
  subtitle="Operations as Software Engineering"
  tags={['SRE', 'Operations', 'DevOps', 'Architecture']}
>

Google VP Ben Treynor Sloss famously defined SRE as: *"What happens when you ask a software engineer to design an operations team."*

## 1. Replacing Manual Labor with Code
Traditional System Administrators ("SysAdmins") solve problems manually. If a server is full, they SSH into it and delete logs. 
Site Reliability Engineers solve problems using software. If a server is full, they write a Python script that mathematically monitors disk space and automatically provisions a larger EBS volume via the AWS API before the disk ever reaches 100%. The core mathematical goal of SRE is the relentless elimination of **Toil** (repetitive, manual, non-creative operational work).

## 2. The Core Mathematical Tenets
SRE replaces subjective operational arguments with objective mathematics:
- **SLIs/SLOs/Error Budgets**: Engineers cannot argue about whether a system is "stable enough" to push a new feature. They look at the Error Budget. If the budget is > 0, deploy. If the budget is < 0, freeze. The math dictates the action.
- **Monitoring vs Observability**: SREs don't just set up pings to see if a server is online. They mathematically instrument the application code to track latency distributions (P99, P95) and error rates across highly distributed microservice topologies.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Abstract classes/index.mdx': `---
title: Abstract Classes
description: A foundational Object-Oriented Programming concept defining a class that cannot be instantiated itself, serving as a strict mathematical blueprint that forces child classes to implement specific behaviors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Abstract Classes"
  subtitle="The Incomplete Blueprint"
  tags={['OOP', 'Architecture', 'Java', 'C++']}
>

If you are building a physics engine, you might have an entity called TICK1ShapeTICK1. It makes mathematical sense to ask a TICK1CircleTICK1 or a TICK1SquareTICK1 to calculate its area. It makes zero mathematical sense to ask a generic TICK1ShapeTICK1 to calculate its area, because a generic shape has no defined geometry.

## 1. Preventing Instantiation
An Abstract Class solves this by mathematically forbidding instantiation.
TICK3java
public abstract class Shape {
    // Abstract method: No body, forces children to implement
    public abstract double calculateArea(); 
    
    // Concrete method: Already implemented, shared by all children
    public void printLabel() {
        System.out.println("I am a shape.");
    }
}
TICK3
If a developer types TICK1new Shape()TICK1, the compiler mathematically blocks it. You cannot create a pure TICK1ShapeTICK1.

## 2. The Contract of Implementation
When a developer creates a TICK1CircleTICK1 class and extends TICK1ShapeTICK1, they are signing a mathematical contract. The compiler will refuse to compile the TICK1CircleTICK1 class unless the developer provides a concrete implementation for the TICK1calculateArea()TICK1 method. This guarantees that any object that claims to be a TICK1ShapeTICK1 mathematically possesses the ability to calculate its area.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Abstraction/index.mdx': `---
title: Abstraction
description: One of the four core pillars of Object-Oriented Programming, mathematically reducing complexity by hiding unnecessary internal implementation details and exposing only the essential, high-level interfaces to the user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Abstraction"
  subtitle="Hiding Mathematical Complexity"
  tags={['OOP', 'Design Patterns', 'Architecture', 'Clean Code']}
>

When you press the brake pedal in a car, you apply a high-level abstraction. You do not need to understand the mathematical fluid dynamics of the hydraulic brake lines or the friction coefficients of the brake pads. You just press the pedal.

## 1. Managing Cognitive Load
In software, abstraction is the primary mathematical tool for managing cognitive load.
If you are writing a TICK1DatabaseTICK1 class, the internal implementation might involve complex TCP socket management, connection pooling, and binary packet parsing. 
TICK3java
// The Abstraction (What the user sees)
public interface Database {
    void save(User user);
}
TICK3
The developer using the TICK1DatabaseTICK1 class only sees the TICK1save()TICK1 method. The thousands of lines of mathematical complexity required to execute that save are hidden behind the abstraction barrier.

## 2. Interface vs Implementation
Abstraction allows you to mathematically decouple the *what* from the *how*.
Because the user is only interacting with the high-level TICK1save()TICK1 abstraction, you can completely rip out the underlying MySQL implementation and replace it with a MongoDB implementation. As long as the new implementation still honors the TICK1save()TICK1 interface contract, the rest of the application mathematically does not need to change.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Access modifiers/index.mdx': `---
title: Access Modifiers
description: Keywords in Object-Oriented Programming (such as public, private, and protected) that mathematically enforce encapsulation by restricting the visibility and mutability of a class's internal state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Access Modifiers"
  subtitle="Mathematical State Protection"
  tags={['OOP', 'Encapsulation', 'Java', 'C#']}
>

If a TICK1BankAccountTICK1 class has a variable called TICK1balanceTICK1, and that variable is universally accessible, any other part of the codebase can mathematically execute TICK1account.balance = 1000000TICK1, instantly destroying the integrity of the financial system.

## 1. The Principle of Least Privilege
Access modifiers prevent this by mathematically locking down the state:
- **TICK1privateTICK1**: The strictest modifier. The variable or method is mathematically invisible to the outside world. It can only be accessed by code written *inside* the exact same class.
- **TICK1protectedTICK1**: The variable is invisible to the outside world, but it *is* visible to any child class that inherits from this class.
- **TICK1publicTICK1**: The variable or method is completely open and accessible from anywhere in the application.

## 2. Enforcing Encapsulation
By making the TICK1balanceTICK1 variable TICK1privateTICK1, the developer mathematically forces the outside world to use a TICK1publicTICK1 method to interact with it.
TICK3java
public class BankAccount {
    private double balance; // Hidden

    public void deposit(double amount) {
        if (amount > 0) { // Mathematical validation
            this.balance += amount;
        }
    }
}
TICK3
The external code cannot modify the balance directly. It must call the TICK1deposit()TICK1 method, which mathematically guarantees that negative money cannot be deposited.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Aggregation/index.mdx': `---
title: Aggregation
description: A specific "has-a" relationship in Object-Oriented Programming representing a weak mathematical association where the child object can exist completely independently of the parent object's lifecycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Aggregation"
  subtitle="Independent Mathematical Association"
  tags={['OOP', 'UML', 'Design Patterns', 'Architecture']}
>

In Object-Oriented Design, a TICK1UniversityTICK1 class *has a* TICK1ProfessorTICK1 class. But the mathematical lifecycle of these two objects is loosely coupled.

## 1. The "Has-A" Relationship
Aggregation models a relationship where one class is a collection or container of other classes, but it does not mathematically own them.
TICK3java
public class Department {
    // The Department aggregates Professors
    private List<Professor> professors; 

    public Department(List<Professor> profs) {
        this.professors = profs;
    }
}
TICK3
The TICK1DepartmentTICK1 object holds a list of TICK1ProfessorTICK1 objects, but it did not create them.

## 2. Independent Lifecycles
The defining mathematical characteristic of Aggregation is the lifecycle independence.
If the university goes bankrupt and the TICK1DepartmentTICK1 object is mathematically destroyed (garbage collected) by the system, the TICK1ProfessorTICK1 objects **do not die**. They still exist in memory and can be assigned to a different TICK1DepartmentTICK1 or a different TICK1UniversityTICK1 entirely. They are aggregated, not owned.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Association/index.mdx': `---
title: Association
description: The broadest category of relationship in Object-Oriented Programming, mathematically defining any scenario where objects of one class interact with, use, or know about objects of another class.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Association"
  subtitle="Mathematical Object Interaction"
  tags={['OOP', 'UML', 'Design Patterns', 'Architecture']}
>

In a complex software system, objects rarely exist in isolation. They must mathematically interact to achieve a goal. Association is the generic term for this interaction.

## 1. Multiplicity and Direction
An Association is mathematically defined by two properties:
- **Multiplicity**: How many objects are involved? (One-to-One, One-to-Many, Many-to-Many). A TICK1PatientTICK1 can be associated with many TICK1DoctorTICK1s.
- **Direction (Navigability)**: Who knows about whom? If a TICK1CustomerTICK1 has a reference to an TICK1OrderTICK1, but the TICK1OrderTICK1 has no reference back to the TICK1CustomerTICK1, it is a Unidirectional Association. If they both have references to each other, it is Bidirectional.

## 2. The Umbrella Term
Association is the parent mathematical concept. **Aggregation** and **Composition** are simply specific, stricter subsets of Association.
- If a TICK1DoctorTICK1 uses a TICK1StethoscopeTICK1 during a checkup, that is a pure **Association** (the Doctor uses it temporarily, neither owns the other).
- If a TICK1DepartmentTICK1 contains a TICK1ProfessorTICK1, that is **Aggregation** (a weak ownership association).
- If a TICK1HouseTICK1 contains a TICK1RoomTICK1, that is **Composition** (a strict, life-and-death ownership association).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Class diagrams - UML/index.mdx': `---
title: Class Diagrams (UML)
description: The standard mathematical visual language (Unified Modeling Language) used by software architects to map out the structure of an Object-Oriented system, detailing classes, attributes, operations, and their precise relationships.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Class Diagrams (UML)"
  subtitle="The Blueprints of Object-Oriented Design"
  tags={['OOP', 'UML', 'Architecture', 'Design']}
>

Before writing 50,000 lines of Java code, software architects use UML (Unified Modeling Language) Class Diagrams to mathematically map the system, just as an architect draws a blueprint before pouring concrete.

## 1. The Class Box
In UML, a class is mathematically represented as a box divided into three horizontal compartments:
1. **Top**: The Class Name (e.g., TICK1BankAccountTICK1).
2. **Middle**: The Attributes (State). Visibility is mathematically denoted using symbols: TICK1-TICK1 for private (TICK1- balance: doubleTICK1), TICK1+TICK1 for public.
3. **Bottom**: The Operations (Methods). E.g., TICK1+ deposit(amount: double): voidTICK1.

## 2. Mathematical Relationship Connectors
The true power of a Class Diagram is how it models the relationships between boxes using specific lines and arrows:
- **Inheritance**: A solid line with a hollow, unfilled arrow pointing to the parent class.
- **Implementation (Interfaces)**: A dashed line with a hollow arrow.
- **Association**: A simple solid line connecting two classes.
- **Aggregation**: A solid line with a hollow diamond touching the "container" class.
- **Composition**: A solid line with a solid, filled-in black diamond touching the "owner" class.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Classes/index.mdx': `---
title: Classes
description: The fundamental building blocks of Object-Oriented Programming; mathematical templates or blueprints that define the initial state (data) and behavior (methods) for creating instantiated objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Classes"
  subtitle="The Mathematical Blueprint"
  tags={['OOP', 'Programming', 'Architecture', 'Fundamentals']}
>

If an **Object** is a physical house you can walk into, the **Class** is the architectural blueprint drawn on paper. You cannot walk into a blueprint, but the blueprint mathematically defines exactly how the house must be built.

## 1. State and Behavior
A Class is a mathematical structure that binds two things together into a single cohesive unit:
- **State (Attributes/Fields)**: The data the object holds. (e.g., a TICK1CarTICK1 class has state variables for TICK1colorTICK1 and TICK1currentSpeedTICK1).
- **Behavior (Methods/Functions)**: The mathematical operations that can mutate that state. (e.g., the TICK1CarTICK1 class has a TICK1accelerate()TICK1 method that increases the TICK1currentSpeedTICK1).

## 2. Instantiation
The Class itself consumes virtually no memory. It is just a definition.
When a developer uses the TICK1newTICK1 keyword (e.g., TICK1Car myHonda = new Car();TICK1), the runtime environment reads the Class blueprint and allocates physical RAM to create an **Instance** (an Object). You can use the single TICK1CarTICK1 class blueprint to mathematically instantiate 1,000 completely independent TICK1CarTICK1 objects, each possessing its own unique memory space and its own unique TICK1colorTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Composition/index.mdx': `---
title: Composition
description: A strict "has-a" relationship in Object-Oriented Programming representing absolute mathematical ownership, where the child object's lifecycle is entirely bound to the parent object's lifecycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Composition"
  subtitle="Strict Mathematical Ownership"
  tags={['OOP', 'UML', 'Design Patterns', 'Architecture']}
>

If Aggregation is a university and a professor (the professor survives if the university closes), Composition is a House and a Room. If the physical house is mathematically destroyed, the room ceases to exist.

## 1. The Life-and-Death Bound
In Composition, the parent class is strictly responsible for the creation and destruction of the child class.
TICK3java
public class House {
    private Room livingRoom;

    public House() {
        // The House creates the Room. 
        // The Room cannot exist outside the House.
        this.livingRoom = new Room("Living Room");
    }
}
TICK3
Because the TICK1HouseTICK1 instantiates the TICK1RoomTICK1 internally, no outside class has a reference to that TICK1RoomTICK1. If the TICK1HouseTICK1 object is deleted from memory, the Garbage Collector will automatically and mathematically delete the TICK1RoomTICK1 object.

## 2. Preventing Shared State
Composition is mathematically safer than Aggregation.
In Aggregation, you pass an existing object in via the constructor. This means some *other* part of the code also holds a reference to that object, leading to complex shared-state bugs if multiple threads modify it. Composition mathematically guarantees absolute isolation; the parent uniquely owns the child.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/4. Object-Oriented Programming/Composition over inheritance/index.mdx': `---
title: Composition Over Inheritance
description: A fundamental software design principle advocating that polymorphic behavior and code reuse should be achieved by assembling smaller, decoupled objects (Composition) rather than building deep, rigid parent-child class hierarchies (Inheritance).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Composition Over Inheritance"
  subtitle="The Antidote to the Gorilla-Banana Problem"
  tags={['OOP', 'Design Patterns', 'Architecture', 'Clean Code']}
>

In the 1990s, Inheritance was viewed as the ultimate mathematical solution to code reuse. By the 2010s, the industry realized that deep inheritance trees cause catastrophic architectural rigidity. 

## 1. The Gorilla-Banana Problem
Inheritance forces you to inherit the *entire* mathematical history of a parent class.
As Joe Armstrong (creator of Erlang) famously said: *"You wanted a banana but what you got was a gorilla holding the banana and the entire jungle."*
If you have a TICK1BirdTICK1 class with a TICK1fly()TICK1 method, and you inherit to make an TICK1OstrichTICK1, your Ostrich mathematically inherits the ability to fly, which is logically incorrect. You are now forced to override TICK1fly()TICK1 and throw an Exception, breaking the Liskov Substitution Principle.

## 2. The Composition Solution
The principle of "Composition Over Inheritance" solves this by building behavior from Lego blocks.
Instead of inheriting TICK1BirdTICK1, you compose objects based on what they *do*, not what they *are*.
TICK3java
public class Ostrich {
    private WalkingBehavior walker;
    // An Ostrich HAS-A WalkingBehavior, it does not HAVE-A FlyingBehavior
}

public class Eagle {
    private WalkingBehavior walker;
    private FlyingBehavior flyer;
}
TICK3
By using Composition, you mathematically inject only the exact behaviors required. The architecture remains flat, modular, and highly testable, completely avoiding the rigid biological taxonomies of Inheritance.

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
