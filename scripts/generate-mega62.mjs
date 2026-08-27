import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/Fortran/index.mdx': `---
title: Fortran (Legacy)
description: The oldest high-level programming language, originally designed in 1957, still maintained in legacy enterprise and scientific systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fortran (Legacy)">

While modern Fortran is heavily used in supercomputing, there are massive amounts of Legacy Fortran (Fortran 77 and earlier) deeply embedded in legacy enterprise and academic systems.

## 1. Fixed-Format Source Code
Before modern text editors, programmers wrote Fortran on physical punch cards. 
Because of this physical reality, legacy Fortran is **Fixed-Format**. 
The mathematical column where a character is typed is strictly enforced by the compiler:
- Column 1: A "C" mathematically indicates a comment.
- Columns 1-5: Used for numeric statement labels (for TICK1GOTOTICK1 jumps).
- Column 6: Any character here mathematically indicates the line is a continuation of the previous line.
- Columns 7-72: The actual programming logic.
If a developer accidentally types a command in column 6, the entire mathematical structure of the program instantly collapses.

## 2. COMMON Blocks
Legacy Fortran did not have modern Object-Oriented structures or dynamic memory allocation. 
To share memory globally between functions, developers used **COMMON blocks**. They mathematically defined a contiguous chunk of physical RAM, and different subroutines would map their own local variables to the exact same physical byte offsets. While incredibly memory-efficient, any mathematical mistake in aligning the bytes between two files would cause silent data corruption, making legacy Fortran extremely difficult to refactor.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/JCL/index.mdx': `---
title: JCL
description: Job Control Language, the highly structured scripting language used by IBM mainframes to mathematically instruct the operating system how to run batch jobs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JCL (Job Control Language)">

JCL is the scripting language used on IBM mainframe operating systems (like z/OS). While a COBOL program contains the mathematical business logic (e.g., "calculate payroll"), JCL contains the mathematical instructions for the operating system (e.g., "allocate 50 gigabytes of tape drive storage, load this COBOL program, run it, and print the output to this printer").

## 1. Batch Processing
Mainframes are mathematically optimized for massive, high-throughput batch processing, not interactive typing. 
A bank does not manually run payroll for a million customers one by one. They submit a "Job" to the mainframe using JCL. The JCL script mathematically defines every single physical and virtual resource the job will need *before* it runs. The operating system (JES2/JES3) mathematically reads all the submitted JCLs, schedules them based on resource availability, and executes them in the middle of the night.

## 2. The Positional Syntax
Because JCL was designed for 80-column punch cards in the 1960s, its syntax is incredibly rigid and notoriously difficult to read.
TICK3jcl
//PAYROLL JOB (ACCT), 'PAY RUN', CLASS=A, MSGCLASS=X
//STEP1   EXEC PGM=CALCPAY
//INPUT   DD DSN=BANK.DATA.IN, DISP=SHR
//OUTPUT  DD DSN=BANK.DATA.OUT, DISP=(NEW,CATLG,DELETE)
TICK3
The TICK1DDTICK1 (Data Definition) statement is the most critical mathematical concept in JCL. It mathematically binds a physical dataset (a file on a hard drive) to a logical variable expected by the COBOL program, completely decoupling the software logic from the physical hardware storage.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/Natural/index.mdx': `---
title: Natural
description: A 4GL (Fourth-Generation Language) developed by Software AG, heavily used in conjunction with the Adabas database for enterprise legacy systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Natural">

Released in 1979 by Software AG, Natural is a 4th Generation Language (4GL). It was mathematically designed to be a significantly more productive alternative to COBOL for building enterprise applications, specifically on IBM Mainframes.

## 1. The Adabas Connection
Natural is almost always used in conjunction with **Adabas**, a highly specialized, insanely fast NoSQL (pre-relational) database. 
Unlike COBOL, which required massive amounts of boilerplate code to read and write database records, Natural was mathematically integrated with Adabas. A developer could write a single TICK1FINDTICK1 or TICK1READTICK1 loop in Natural, and the compiler would automatically handle the complex mathematical memory buffering and I/O required to interact with the Adabas data structures.

## 2. 4GL Abstraction
A 3rd Generation Language (like C or Java) requires you to mathematically describe *how* to do something (imperative). A 4th Generation Language attempts to let you describe *what* you want.
Natural mathematically abstracted away the complexities of mainframe screen design (CICS/BMS maps). A developer could write a TICK1INPUTTICK1 statement, and Natural would mathematically generate the physical green-screen terminal interface, process the user's keystrokes, and map the data directly back into the variables, allowing massive banking applications to be built in a fraction of the time it took in COBOL.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/PL-I/index.mdx': `---
title: PL/I
description: Programming Language One, an immensely massive language designed by IBM to replace both Fortran and COBOL by combining all their features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PL/I">

Created by IBM in the 1960s, PL/I (Programming Language One) was mathematically intended to be the ultimate programming language. IBM realized their customers were split: Scientists used Fortran (for math), and Businesses used COBOL (for record keeping). IBM attempted to build one massive language that could do both.

## 1. The Kitchen Sink Language
PL/I is mathematically enormous. It took the scientific features of Fortran, the record-handling features of COBOL, and the block-structured logic of ALGOL, and jammed them all into a single compiler.
It had hundreds of built-in keywords, complex exception handling (TICK1ON ERRORTICK1 conditions), multi-threading capabilities (TICK1TASKSTICK1), and incredibly complex pointer arithmetic.

## 2. The Collapse of Complexity
Because the mathematical specification was so massive, the PL/I compiler was notoriously slow and required massive amounts of physical RAM, which was exorbitantly expensive in the 1960s. 
Furthermore, because it had so many features, it was almost impossible for a single programmer to master the entire language. Different teams would use completely different mathematical subsets of PL/I, leading to unmaintainable codebases. While it is still used today in some deeply legacy banking systems, its massive complexity prevented it from successfully replacing COBOL and Fortran.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/PowerBuilder/index.mdx': `---
title: PowerBuilder
description: A wildly popular, legacy Rapid Application Development (RAD) tool used heavily in the 1990s to build data-driven Windows applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PowerBuilder">

Released in 1991, PowerBuilder (currently owned by SAP/Appeon) was the absolute king of enterprise client-server architecture in the 1990s, directly competing with Visual Basic and Delphi.

## 1. The DataWindow
The mathematical core of PowerBuilder's massive success was a patented object called the **DataWindow**.
Before the DataWindow, if a developer wanted to pull 500 rows from an Oracle database and display them in a grid on a Windows screen, they had to mathematically write hundreds of lines of C code to manage the ODBC connection, parse the memory, and paint the pixels on the screen.
In PowerBuilder, the developer dragged a DataWindow onto the screen, pointed it at the database, and clicked "Run." The DataWindow mathematically handled the SQL generation, the network fetching, the UI rendering, and even the TICK1UPDATE/INSERTTICK1 logic when the user edited a cell, reducing months of engineering work to a few minutes.

## 2. PowerScript
The logic in PowerBuilder is written in **PowerScript**, an Object-Oriented language similar to BASIC. While incredibly productive for throwing together UI screens (Rapid Application Development), PowerScript was mathematically slow (it was interpreted/P-Code, not compiled to native machine code). When the industry shifted from Desktop Client-Server apps to Web-based Cloud architecture, PowerBuilder's mathematical foundation became obsolete, stranding massive enterprise applications in legacy Desktop environments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/RPG/index.mdx': `---
title: RPG
description: Report Program Generator, a legacy language intimately tied to the IBM AS/400 (IBM i) architecture, still heavily used in manufacturing and retail.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RPG (Report Program Generator)">

Created by IBM in 1959, RPG is the primary programming language for the legendary IBM AS/400 (now IBM i) midrange server architecture. It is heavily utilized in global manufacturing, warehousing, and retail (e.g., Costco).

## 1. The Fixed-Format Cycle
Historically, RPG was not a procedural language. It was a **Cycle-Driven** language based on physical punch cards. 
The RPG compiler mathematically enforced a rigid, implicit loop (The Cycle). The developer did not write a TICK1while(read_file)TICK1 loop. They simply defined the input file, the output report, and the mathematical calculations to perform on each record. The operating system automatically fed the records into the program, calculated the totals, and printed the report.

## 2. RPG IV (ILE RPG)
In 1994, IBM released RPG IV. It completely mathematically overhauled the language, moving away from the punch-card fixed format and introducing Free-Format coding. 
Modern Free-Format RPG looks very similar to C or Java. It supports Object-Oriented concepts, native SQL integration, and REST API calls. Despite its modern capabilities, millions of lines of the original, rigid, cycle-driven RPG code still mathematically execute daily in warehouses around the world, making it a critical legacy language.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/block)/index.mdx': `---
title: Blocks and Scoping
description: The fundamental mathematical concept of grouping statements together and how compilers calculate the lifespan and visibility of variables.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Blocks and Scoping">

In computer science, a Block (often denoted by curly braces TICK1{}TICK1 or indentation) is a lexical structure that mathematically groups a sequence of statements together into a single compound statement.

## 1. The Mathematical Boundary
Blocks create mathematical boundaries for the compiler. If an TICK1ifTICK1 statement evaluates to true, the compiler must know exactly which instructions to execute. By wrapping 10 instructions in a block, the compiler mathematically treats all 10 instructions as a single, atomic execution unit tied to that condition.

## 2. Lexical Scoping
Blocks fundamentally define **Scope**—the mathematical visibility and lifespan of a variable in memory.
When a compiler encounters a new block, it mathematically pushes a new frame onto the Stack. Any variable created inside that block (Local Scope) is mathematically bound to that frame. When the block ends, the compiler pops the frame, and the memory is instantly destroyed. This prevents a variable named TICK1indexTICK1 in one TICK1forTICK1 loop from mathematically corrupting a variable named TICK1indexTICK1 in another function.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Closures/index.mdx': `---
title: Closures
description: A brilliant mathematical construct where a function remembers and retains access to the variables in its surrounding lexical scope, even after that scope has finished executing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Closures">

A Closure is a first-class function with an associated mathematical environment. It allows a function to "close over" and capture the state of the variables that were in scope at the exact moment the function was created.

## 1. The Mathematical Magic
Normally, when a function finishes executing, all of its local variables are mathematically destroyed (popped off the stack).
TICK3javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}
const myCounter = createCounter();
TICK3
When TICK1createCounter()TICK1 finishes, TICK1countTICK1 should theoretically be destroyed. However, because we returned an inner function that references TICK1countTICK1, the compiler mathematically generates a **Closure**. It physically moves TICK1countTICK1 from the temporary Stack into the permanent Heap, permanently attaching it to the TICK1myCounterTICK1 function. 

## 2. Encapsulation without Classes
Closures are the mathematical foundation of functional state management. They allow developers to create truly private variables (like TICK1countTICK1) that can only be mathematically altered by the specific function returned, providing Object-Oriented encapsulation without the heavy boilerplate of classes or TICK1thisTICK1 context binding.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Composite types/index.mdx': `---
title: Composite Types
description: Complex data structures formed by mathematically combining primitive types into larger, cohesive memory blocks like Structs, Arrays, and Tuples.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Composite Types">

In computer science, primitive types (integers, booleans, floats) are the mathematical atoms of memory. Composite types are the molecules—structures created by mathematically combining multiple primitives.

## 1. Records (Structs)
A Record (or Struct in C/Rust) mathematically groups related variables of *different* types under a single name.
If you have a TICK1UserTICK1, they have a TICK1nameTICK1 (String) and an TICK1ageTICK1 (Integer). 
Instead of passing two separate variables around, a Struct mathematically forces the compiler to allocate the String and the Integer physically next to each other in RAM. When you pass the TICK1UserTICK1 to a function, you are mathematically passing a single memory pointer that the compiler knows how to safely offset to read the underlying data.

## 2. Arrays and Tuples
- **Arrays**: Mathematically group elements of the *same* type. Because every element is the exact same byte size, the CPU can mathematically calculate the exact physical RAM address of TICK1array[5000]TICK1 instantly via pointer arithmetic (Base Address + (5000 * Element Size)).
- **Tuples**: Mathematically group a fixed number of elements of *different* types. They are heavily used in functional languages (like Haskell or Python) to mathematically return multiple distinct values from a single function without the overhead of declaring a formal Struct.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/2. Programming Fundamentals & Language Concepts/2.1 Core Building Blocks/Conditionals/index.mdx': `---
title: Conditionals
description: The mathematical bedrock of computational logic, allowing CPUs to dynamically alter their execution path based on boolean expressions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Conditionals">

At a hardware level, a CPU just executes instructions sequentially. Conditionals (TICK1if/elseTICK1, TICK1switchTICK1) are the mathematical constructs that give software intelligence, allowing the CPU to jump to different code paths based on dynamic data.

## 1. Branching in Assembly
When a compiler sees an TICK1if (x > 5)TICK1 statement, it mathematically translates this into two assembly instructions:
1. **Compare (CMP)**: The ALU (Arithmetic Logic Unit) subtracts 5 from x and updates a mathematical flag in the CPU register.
2. **Jump if Greater (JG)**: If the flag is set, the CPU physically changes its Instruction Pointer to jump to a different memory address, skipping the TICK1elseTICK1 block.

## 2. Branch Prediction
Because jumping to a different memory address breaks the CPU pipeline (the CPU has to throw away the upcoming instructions it had already started decoding), Conditionals are mathematically expensive.
Modern CPUs utilize **Branch Prediction**. When the CPU encounters an TICK1ifTICK1 statement inside a loop, it uses a mathematical heuristic to guess which path will be taken before the math is even calculated. If it guesses right, execution is lightning fast. If it guesses wrong, it suffers a massive performance penalty. This is why sorting an array *before* running an TICK1ifTICK1 statement on it can mathematically make the code run 5x faster in languages like C++.

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
