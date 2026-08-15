import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Ada/index.mdx': `---
title: Ada
description: "A highly robust, statically typed programming language designed by the US Department of Defense for mission-critical systems."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Ada"
  icon="shield"
>

Named after Ada Lovelace, the first computer programmer, **Ada** was developed in the late 1970s under a contract from the United States Department of Defense (DoD). Its primary goal was to replace the hundreds of different programming languages used across military hardware with a single, ultra-reliable standard.

## Built for Mission-Critical Systems

Ada is legendary for its strictness. If an Ada program compiles, it is incredibly unlikely to fail at runtime. It features built-in contract-based programming, extreme strong typing, and explicit concurrency (tasks).

Because of this, Ada is the language of choice for systems where human lives are on the line:
- Avionics (Boeing 777, Airbus A380 flight control systems)
- Air Traffic Control
- Satellites and Spacecraft (NASA, ESA)
- High-Speed Rail systems

## Syntax Example

Ada's syntax is heavily inspired by Pascal, prioritizing readability and explicit declarations over conciseness.

${TICK3}ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Hello is
   -- Variables are declared before the 'begin' block
   Message : constant String := "Hello, World!";
begin
   Put_Line (Message);
end Hello;
${TICK3}

<Callout icon="info" title="The SPARK Subset">
SPARK is a formally defined subset of the Ada language. It removes features that are hard to verify mathematically (like dynamic memory allocation) and allows developers to write mathematical proofs that guarantee the software will never experience a buffer overflow or runtime exception.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Ballerina/index.mdx': `---
title: Ballerina
description: "A modern, open-source programming language designed specifically for writing network-distributed applications and microservices."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Ballerina"
  icon="globe"
>

Developed by WSO2 and released in 2017, **Ballerina** is a general-purpose, statically typed, concurrent programming language with a very specific focus: **Cloud-Native Integration**. 

## The Network is Native

In languages like Java or Python, making an HTTP request or defining an API endpoint requires importing heavy external libraries (like Spring Boot or Flask). In Ballerina, the network is built directly into the language syntax.

Services, endpoints, JSON, and XML are native primitives.

## Syntax Example

Ballerina code is designed to look like sequence diagrams, making the flow of network calls explicitly clear.

${TICK3}ballerina
import ballerina/http;

// Define a network service listening on port 8080 natively
service /hello on new http:Listener(8080) {

    // Define a resource function (HTTP GET)
    resource function get greeting(string name) returns string {
        return "Hello, " + name + "!";
    }
}
${TICK3}

<Callout icon="tip" title="Graphical Programming">
Because of its strict syntax rules regarding network interactions, any Ballerina code can be automatically rendered into a highly accurate Sequence Diagram, allowing architects to visualize microservice communications instantly.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Crystal/index.mdx': `---
title: Crystal
description: "A language that aims to be as fast as C, but as elegant and expressive as Ruby."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Crystal"
  icon="cpu"
>

**Crystal** is a compiled, statically typed language that was explicitly designed to mimic the syntax of **Ruby**. 

Ruby is famous for its developer happiness and beautiful syntax, but infamous for being slow (as an interpreted language). Crystal solves this by using LLVM to compile Ruby-like syntax down to highly optimized, blazing-fast native machine code.

## Key Features

1. **Ruby-like Syntax**: Crystal is so similar to Ruby that many Ruby scripts will run perfectly in Crystal without any modifications.
2. **Static Typing & Inference**: Unlike Ruby, Crystal is statically typed. However, its type inference engine is so powerful that you rarely have to explicitly write types.
3. **Null Safety**: All types are non-nullable by default. If a value can be null, it must be explicitly defined as a Union type (e.g., TICK1String | NilTICK1).

## Syntax Example

${TICK3}crystal
# Looks exactly like Ruby, but compiles to C-level speeds
class Person
  # Properties are automatically strongly-typed based on usage
  property name : String
  property age : Int32

  def initialize(@name, @age)
  end

  def celebrate_birthday
    @age += 1
    puts "Happy birthday #{@name}! You are now #{@age}."
  end
end

john = Person.new("John", 30)
john.celebrate_birthday
${TICK3}

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/D/index.mdx': `---
title: D (Dlang)
description: "A systems programming language with C-like syntax and static typing, combining performance with modern abstractions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="D"
  icon="cpu"
>

Created by Walter Bright in 2001, **D** (often called Dlang) was envisioned as the true successor to C++. It aimed to maintain the high performance and low-level control of C++ while drastically improving compilation speeds and adding modern conveniences like garbage collection and modules.

## The Dual Nature of D

D allows developers to write code in multiple paradigms:
- **High-Level**: You can write D like Java or C#, utilizing its built-in Garbage Collector, classes, and dynamic arrays for rapid prototyping.
- **Low-Level**: Using the TICK1@nogcTICK1 attribute, you can explicitly disable the garbage collector, managing memory manually just like C for extreme performance optimization.

## Syntax Example

${TICK3}d
import std.stdio;

// A simple function utilizing D's powerful 'auto' type inference
auto multiply(T)(T a, T b) {
    return a * b;
}

void main() {
    // Standard high-level D
    writeln("Hello, D!");
    
    // The template function works for both ints and floats
    writeln(multiply(5, 5));     // 25
    writeln(multiply(2.5, 2.0)); // 5.0
}
${TICK3}

<Callout icon="warning" title="Adoption Challenges">
Despite its excellent design, D struggled to gain massive industry adoption. It was caught between C++ (which companies were hesitant to abandon) and newer languages like Rust and Go, which had the backing of massive tech giants (Mozilla and Google, respectively).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Delphi-Object Pascal/index.mdx': `---
title: Delphi & Object Pascal
description: "The rapid application development language that dominated the 1990s Windows software ecosystem."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Delphi & Object Pascal"
  icon="window"
>

**Object Pascal** is an extension of the classic Pascal language that adds Object-Oriented capabilities. **Delphi** is the famous Integrated Development Environment (IDE) and visual framework created by Borland in 1995 to compile Object Pascal.

## The King of the 90s

Before web apps, almost all business software consisted of desktop applications. Delphi revolutionized Windows development by introducing **Rapid Application Development (RAD)**. Developers could literally drag and drop buttons, text boxes, and database grids onto a canvas, double-click them, and instantly write Object Pascal code to handle the events.

It compiled instantly into a single standalone TICK1.exeTICK1 file without needing heavy runtime frameworks (unlike Visual Basic or Java).

## Syntax Example

Object Pascal is famously verbose, using english keywords (TICK1beginTICK1, TICK1endTICK1) instead of curly braces.

${TICK3}pascal
program HelloDelphi;

// Explicit variable declaration block
var
  Message: string;
  i: integer;

begin
  Message := 'Hello from Object Pascal!';
  
  for i := 1 to 3 do
  begin
    Writeln(Message);
  end;
end.
${TICK3}

<Callout icon="info" title="Where is it now?">
While Delphi's popularity plummeted with the rise of C# (.NET) and web applications, millions of lines of legacy enterprise Delphi code still run heavily in medical, point-of-sale, and financial systems globally.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Groovy/index.mdx': `---
title: Groovy
description: "A dynamic, agile language for the Java Virtual Machine, widely used for build scripts and CI/CD pipelines."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Groovy"
  icon="cpu"
>

**Apache Groovy** is an optionally-typed, dynamic language that runs on the Java Virtual Machine (JVM). It was created to bring the flexibility and conciseness of languages like Ruby and Python into the rigid Java ecosystem.

## The Power of Groovy

1. **Java Compatibility**: Groovy compiles directly to Java bytecode. Almost any valid Java code is also valid Groovy code.
2. **Dynamic Typing**: You can drop the verbose Java types and just use TICK1defTICK1.
3. **Closures**: Groovy introduced powerful anonymous functions (closures) long before Java 8 finally added lambdas.

## Syntax Example

Notice how Groovy drops the boilerplate (semicolons, explicit types, public modifiers) required by traditional Java.

${TICK3}groovy
// Java style (also valid Groovy)
String name = "World";
System.out.println("Hello " + name);

// Groovy style
def groovyName = "World"
println "Hello ${'$'}groovyName" // String interpolation

// Closures (similar to Lambdas)
def numbers = [1, 2, 3, 4]
numbers.each { num -> 
    println num * 2 
}
${TICK3}

<Callout icon="tip" title="The Language of DevOps">
While Groovy is rarely used to build primary backend applications anymore (Kotlin largely won that battle), it remains universally relevant because it is the primary scripting language for **Jenkins pipelines (Jenkinsfile)** and **Gradle build scripts**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Nim/index.mdx': `---
title: Nim
description: "A statically typed, compiled systems programming language combining successful concepts from Python, Ada, and Modula."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Nim"
  icon="cpu"
>

**Nim** is a highly expressive, statically typed compiled programming language. It aims to offer the performance of C, the expressiveness of Python, and the extensibility of Lisp.

## The Transpilation Engine
Unlike most compilers that turn source code directly into Assembly/Machine Code via LLVM, the Nim compiler primarily transpiles Nim code into optimized **C, C++, or JavaScript**. This allows Nim to be compiled on virtually any platform that has a C compiler, and guarantees rock-solid interoperability with existing C libraries.

## Key Features
1. **Python-Like Syntax**: It relies on indentation rather than curly braces.
2. **Metaprogramming**: Nim has an incredibly powerful macro system. Macros can manipulate the Abstract Syntax Tree (AST) at compile time, allowing developers to create entire Domain Specific Languages (DSLs) within Nim.
3. **Memory Management**: Nim allows developers to choose between multiple garbage collection strategies or entirely manual memory management (TICK1--gc:arcTICK1 or TICK1--gc:noneTICK1) for real-time systems.

## Syntax Example

${TICK3}nim
# Define a procedure (function)
proc greet(name: string) =
  echo "Hello, ", name, "!"

# Calling the procedure
greet("World")

# Uniform Function Call Syntax (UFCS)
# This allows calling functions like methods, making chaining elegant
"Nimlang".greet()
${TICK3}

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Objective-C/index.mdx': `---
title: Objective-C
description: "The primary programming language utilized by Apple for macOS and iOS operating systems before the advent of Swift."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Objective-C"
  icon="smartphone"
>

Developed in the early 1980s, **Objective-C** is a strict superset of C that adds Smalltalk-style messaging capabilities. It was famously adopted by NeXT (Steve Jobs' company after leaving Apple) for its NeXTSTEP operating system, which eventually became the foundation for Apple's **macOS** and **iOS**.

## The Messaging Paradigm
Unlike C++ or Java where you "call a method" on an object, in Objective-C you "send a message" to an object. 
If an object doesn't understand a message, the application doesn't necessarily crash immediately; the message can be forwarded or ignored dynamically at runtime. This dynamic nature gave Apple's UI frameworks (Cocoa and Cocoa Touch) incredible flexibility.

## Syntax Example
Objective-C is famous for its verbose, bracket-heavy syntax, which many developers found intimidating.

${TICK3}objc
#import <Foundation/Foundation.h>

// Interface (Header)
@interface Person : NSObject
@property NSString *name;
- (void)sayHello;
@end

// Implementation
@implementation Person
- (void)sayHello {
    // Sending the 'NSLog' message
    NSLog(@"Hello, my name is %@", self.name);
}
@end

int main() {
    @autoreleasepool {
        // Nested bracket syntax for allocation and initialization
        Person *steve = [[Person alloc] init];
        steve.name = @"Steve";
        
        // Sending the 'sayHello' message
        [steve sayHello];
    }
    return 0;
}
${TICK3}

<Callout icon="info" title="Replaced by Swift">
In 2014, Apple introduced **Swift** to replace Objective-C. Swift removed the brackets, added type safety, and eliminated manual memory management headers. While Apple now strongly recommends Swift for all new apps, millions of lines of Objective-C still power core Apple operating system frameworks today.
</Callout>

</ConceptTemplate>
`,
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
