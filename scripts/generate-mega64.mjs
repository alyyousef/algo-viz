import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Loops (for/index.mdx': `---
title: For Loops
description: The primary mathematical structure for definite iteration, allowing precise control over initialization, conditions, and indexing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="For Loops">

A TICK1forTICK1 loop is the mathematical standard for Definite Iteration—used when you know exactly how many times a block of code should execute.

## 1. The Three-Part Structure
In C-style languages, a TICK1forTICK1 loop is mathematically broken into three distinct execution phases: TICK1for (initialization; condition; increment)TICK1.
1. **Initialization** (TICK1int i = 0TICK1): Mathematically executes exactly once before the loop starts, allocating the index variable on the stack.
2. **Condition** (TICK1i < 10TICK1): Mathematically evaluates before every single iteration. If false, the loop instantly terminates.
3. **Increment** (TICK1i++TICK1): Mathematically executes at the very end of the loop block, just before jumping back to the condition.

## 2. Array Traversal and Cache Hits
The TICK1forTICK1 loop is mathematically inseparable from Arrays. 
Because an array is a contiguous block of memory, a TICK1forTICK1 loop incrementing an integer index (TICK1i++TICK1) mathematically accesses RAM in a perfectly predictable, linear pattern. Modern CPUs detect this mathematical pattern instantly and use **Hardware Prefetching** to load the next 64 bytes of the array into the L1 Cache before the loop even asks for it, making standard TICK1forTICK1 loops the fastest possible way to process data on bare metal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Multiple return values/index.mdx': `---
title: Multiple Return Values
description: Techniques used to mathematically circumvent the standard limitation of returning only a single value from a function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multiple Return Values">

Historically, standard CPU calling conventions (like the C ABI) mathematically dictate that a function can only return a single value (usually placed in the TICK1EAXTICK1 or TICK1RAXTICK1 register). However, modern programming often requires returning multiple distinct pieces of data.

## 1. Out Parameters (Pointers)
In C or C++, you mathematically bypass the single-return limit using Pointers (Out Parameters). 
You pass the memory addresses of empty variables into the function (TICK1void calculate(int* outA, int* outB)TICK1). The function mathematically writes the results directly into those physical memory addresses and returns void. While memory-efficient, this is considered a mathematical "Side Effect" and violates pure functional programming principles.

## 2. Tuples and Destructuring
Modern languages (like Python, Go, and Rust) support multiple returns natively.
TICK3python
def get_coordinates():
    return 10, 20
x, y = get_coordinates()
TICK3
Under the hood, the Python compiler mathematically wraps the TICK110TICK1 and TICK120TICK1 into a single Composite Type (a Tuple). It returns the single Tuple object to satisfy the CPU, and then immediately mathematically "destructures" the Tuple, unpacking the values into the local variables TICK1xTICK1 and TICK1yTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/mutual/index.mdx': `---
title: Mutual Recursion
description: A complex mathematical pattern where two or more functions recurse by calling each other in an alternating cycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mutual Recursion">

Standard recursion occurs when Function A mathematically calls Function A. 
**Mutual Recursion** occurs when Function A calls Function B, and Function B calls Function A, creating an alternating mathematical cycle.

## 1. State Machine Modeling
Mutual recursion is mathematically elegant for modeling State Machines.
For example, determining if a number is even or odd without using the modulo operator:
TICK3javascript
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);
}
function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);
}
TICK3
The mathematical state bounces back and forth between the two functions until the base case is reached.

## 2. The Stack Overflow Danger
Mutual recursion is mathematically dangerous in languages that do not support Tail-Call Optimization (like Java or Python). Because Function A cannot mathematically finish until Function B finishes, and Function B cannot finish until Function A finishes, the Call Stack grows exponentially with every bounce. If you pass TICK110000TICK1 into TICK1isEvenTICK1, the compiler will mathematically blow up the Stack and crash the program.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Operator precedence/index.mdx': `---
title: Operator Precedence
description: The strict mathematical ruleset compilers use to determine the order in which operators are evaluated in complex expressions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Operator Precedence">

When a compiler encounters a mathematical expression like TICK13 + 4 * 5TICK1, it cannot simply evaluate it left-to-right (which would yield 35). It must mathematically adhere to Operator Precedence.

## 1. The Precedence Table
Every programming language mathematically defines a rigid Precedence Table. 
Typically, multiplication (TICK1*TICK1) has higher mathematical precedence than addition (TICK1+TICK1), so the compiler calculates TICK14 * 5TICK1 first. 
Parentheses (TICK1()TICK1) have the absolute highest mathematical precedence. They physically alter the Abstract Syntax Tree (AST), forcing the compiler to evaluate the inner nodes before the outer nodes. 

## 2. Associativity
If two operators have the exact same precedence, the compiler uses **Associativity** to break the tie.
- **Left-to-Right**: Mathematical operators (TICK1-TICK1, TICK1/TICK1) are evaluated left-to-right. TICK110 - 5 - 2TICK1 is mathematically TICK1(10 - 5) - 2 = 3TICK1.
- **Right-to-Left**: Assignment operators (TICK1=TICK1) are evaluated right-to-left. In C, TICK1a = b = 5TICK1 mathematically means TICK1b = 5TICK1 evaluates first, returning 5, which is then assigned to TICK1aTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Operators/index.mdx': `---
title: Operators
description: Built-in mathematical symbols that instruct the compiler to perform specific logical or computational manipulations on data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Operators">

Operators are the fundamental mathematical verbs of a programming language. They take one or more Operands (values) and mathematically compute a new result.

## 1. Classifications
- **Unary Operators**: Operate mathematically on a single value (e.g., TICK1!trueTICK1, TICK1-5TICK1, TICK1x++TICK1).
- **Binary Operators**: Operate mathematically on two values. These include Arithmetic (TICK1+TICK1, TICK1-TICK1, TICK1*TICK1), Logical (TICK1&&TICK1, TICK1||TICK1), and Relational (TICK1==TICK1, TICK1>TICK1).
- **Ternary Operator**: Operates mathematically on three values (TICK1condition ? true_val : false_valTICK1), acting as a compact TICK1if/elseTICK1 expression.

## 2. Short-Circuit Evaluation
Logical operators (TICK1&&TICK1, TICK1||TICK1) utilize a mathematical optimization called **Short-Circuiting**.
In the expression TICK1if (A && B)TICK1, if the CPU evaluates TICK1ATICK1 and it is mathematically TICK1falseTICK1, it is physically impossible for the entire expression to be true. The compiler mathematically aborts the evaluation instantly. It never even looks at TICK1BTICK1. This allows developers to write safe code like TICK1if (obj != null && obj.value == 5)TICK1 without risking a Null Pointer Exception.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Parameters/index.mdx': `---
title: Parameters
description: Mathematical placeholders defined in a function signature that dictate the types and structure of the input data the function requires.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Parameters (vs Arguments)">

In programming theory, there is a strict mathematical distinction between a Parameter and an Argument.
- **Parameter**: The mathematical variable defined in the function signature (e.g., TICK1function add(x, y)TICK1). TICK1xTICK1 and TICK1yTICK1 are parameters.
- **Argument**: The physical, actual data passed into the function when it is called (e.g., TICK1add(5, 10)TICK1). TICK15TICK1 and TICK110TICK1 are arguments.

## 1. Pass-by-Value
In Pass-by-Value, when a function is called, the CPU mathematically clones the Argument in memory and passes the copy into the Parameter. If the function modifies the Parameter, it only modifies the local copy on its own Stack frame. The original Variable in the caller's scope remains mathematically untouched.

## 2. Pass-by-Reference
In Pass-by-Reference, the CPU does not clone the data. It mathematically passes the actual physical Memory Address (Pointer) of the caller's Variable into the Parameter. If the function modifies the Parameter, it is mathematically mutating the exact bytes in memory that the caller is pointing to, creating a Side Effect.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Primitive types/index.mdx': `---
title: Primitive Types
description: The most basic, mathematically irreducible data types provided natively by the CPU and the programming language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Primitive Types">

Primitive Types are the absolute mathematical atoms of computer science. They are not Objects, they have no Methods, and they are usually mathematically mapped directly to the hardware registers of the CPU.

## 1. Memory Footprint
Every primitive type mathematically occupies a strictly defined number of bytes in RAM:
- **Boolean**: Theoretically 1 bit (0 or 1), but mathematically padded to 1 byte (8 bits) by the compiler because CPUs cannot physically address single bits in RAM.
- **Integer (32-bit)**: Mathematically occupies 4 bytes. It can represent exactly 4,294,967,296 unique states.
- **Float (64-bit Double)**: Mathematically occupies 8 bytes, formatted according to the IEEE 754 standard (Sign, Exponent, Mantissa).

## 2. The Stack vs The Heap
Because the byte-size of primitive types is mathematically fixed and perfectly known at compile time, compilers almost always allocate Primitive variables directly on the **Stack**. This makes creating and destroying Primitives mathematically instantaneous compared to allocating dynamic Composite Types (like Objects or Strings) on the slower, fragmented Heap.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Recursion (direct/index.mdx': `---
title: Direct Recursion
description: A mathematical programming technique where a function calls itself to break down a massive problem into identical, smaller sub-problems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Direct Recursion">

Direct Recursion occurs when a function mathematically invokes its own definition within its own body.

## 1. The Two Mathematical Rules
For a recursive function to be mathematically sound (and not crash the computer), it must have two things:
1. **The Base Case**: A mathematical condition that stops the recursion. (e.g., TICK1if (n <= 1) return 1;TICK1).
2. **The Recursive Step**: The function must mathematically alter the state (e.g., TICK1n - 1TICK1) and pass the new state into itself, mathematically guaranteeing that it will eventually hit the Base Case.

## 2. The Call Stack Overhead
Recursion is mathematically elegant (it is how trees and graphs are naturally traversed), but it is physically expensive. 
Every time a function calls itself, the CPU must mathematically allocate a brand new Stack Frame in RAM to hold the local variables for that specific invocation. If you recursively calculate the factorial of 10,000, you will mathematically generate 10,000 stacked frames in memory. The operating system will detect that you have exhausted the memory allocated for the Stack and mathematically terminate the program with a **Stack Overflow Error**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Return values/index.mdx': `---
title: Return Values
description: The mathematical mechanism by which a function passes its computed result back to the specific memory location of its caller.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Return Values">

A Return Value is the mathematical output of a function, representing the collapse of the function's internal logic into a single piece of data.

## 1. The Hardware Implementation
When a function executes the TICK1returnTICK1 statement, the CPU performs a specific mathematical sequence.
First, it places the data to be returned into a dedicated, mathematically agreed-upon CPU Register (in x86-64, this is usually the TICK1RAXTICK1 register).
Next, it destroys its own Stack Frame.
Finally, it executes a TICK1RETTICK1 assembly instruction, which pops the Return Address off the stack and jumps back to the caller. The caller immediately reads the TICK1RAXTICK1 register, extracting the mathematical result and continuing its own execution.

## 2. Void and Early Returns
- **Void**: If a function does not mathematically return a value, it is a Void function. At the hardware level, it still executes the TICK1RETTICK1 instruction to jump back to the caller, it simply leaves garbage data in the TICK1RAXTICK1 register.
- **Early Return**: A highly recommended mathematical pattern (Guard Clauses). Instead of wrapping an entire function in a massive TICK1if (valid)TICK1 block, you check for invalid data at the very top of the function and instantly TICK1return;TICK1. This mathematically terminates the function early, reducing nested complexity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Scope (lexical/index.mdx': `---
title: Lexical Scope
description: The mathematical rules defining the visibility of variables based on where they are physically typed in the source code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lexical Scope (Static Scope)">

Lexical Scope (also called Static Scope) means that the mathematical visibility of a variable is determined by its physical location in the source code during compilation, not by the execution path during runtime.

## 1. The Scope Chain
When a compiler sees a variable being used (e.g., TICK1console.log(x)TICK1), it must mathematically resolve what TICK1xTICK1 is. 
It performs a lexical lookup:
1. It mathematically checks the immediate Local Scope (the current function or block).
2. If it is not there, it mathematically steps out to the Parent Scope (the block that physically surrounds the current block in the text file).
3. It repeats this mathematical climb until it reaches the Global Scope. If it still cannot find TICK1xTICK1, it throws a Reference Error.

## 2. Shadowing
Because of the Scope Chain, mathematical **Shadowing** occurs. If you declare a global variable TICK1let x = 10;TICK1, and then inside a function you declare TICK1let x = 5;TICK1, the inner TICK1xTICK1 mathematically shadows the outer TICK1xTICK1. When the function looks for TICK1xTICK1, it finds the local one instantly and stops climbing the chain, mathematically preventing the function from ever seeing the global TICK110TICK1.

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
