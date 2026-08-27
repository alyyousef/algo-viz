import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Blockly/index.mdx': `---
title: Blockly
description: A visual, block-based programming language and library created by Google, designed to teach programming concepts to beginners.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Blockly">

Created by Google, Blockly is not a standalone application, but rather a client-side JavaScript library for adding a visual, block-based code editor to web and mobile apps. It is the underlying technology powering massive educational platforms like Code.org and MIT Scratch (3.0+).

## 1. Visual Syntax
Instead of typing text, users drag and drop interlocking graphical blocks to construct programs. 
Because the blocks are designed like puzzle pieces, it is mathematically impossible for a user to make a syntax error (e.g., trying to place a string block into a math block). This eliminates the frustration of missed semicolons, allowing beginners to focus entirely on logic.

## 2. Code Generation
Unlike Scratch, which executes the blocks directly in its own engine, Blockly is fundamentally a **code generator**. 
It can take a visual tree of blocks and mathematically compile them down into completely valid JavaScript, Python, PHP, Lua, or Dart code. 
This provides a crucial bridge for students, allowing them to visually construct logic and immediately see the equivalent text-based syntax.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Brainfuck/index.mdx': `---
title: Brainfuck
description: An infamous esoteric programming language famous for extreme minimalism, using exactly 8 commands to create Turing-complete chaos.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Brainfuck">

Created in 1993 by Urban Müller, Brainfuck is the most famous "Esoteric Programming Language" (esolang) in existence. It was designed purely to challenge and amuse programmers, with the specific goal of having the smallest possible compiler in the world (the original was 296 bytes).

## 1. The Turing Machine Architecture
Brainfuck operates on a mathematically pure Turing Machine model.
It provides an array of 30,000 bytes, all initialized to zero, and a single data pointer.

There are exactly 8 commands in the entire language:
- TICK1>TICK1 : Move pointer right.
- TICK1<TICK1 : Move pointer left.
- TICK1+TICK1 : Increment the byte at the pointer.
- TICK1-TICK1 : Decrement the byte at the pointer.
- TICK1.TICK1 : Output the byte at the pointer (as an ASCII character).
- TICK1,TICK1 : Accept one byte of input, storing it at the pointer.
- TICK1[TICK1 : Jump forward to the matching TICK1]TICK1 if the byte at the pointer is zero.
- TICK1]TICK1 : Jump backward to the matching TICK1[TICK1 if the byte at the pointer is non-zero.

## 2. Hello World
Because there are no strings or numbers, printing "Hello World" requires mathematically calculating the exact ASCII integer values (72 for 'H', 101 for 'e') by looping increments.
TICK3brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Forth/index.mdx': `---
title: Forth
description: A uniquely powerful, stack-based language created in the 1970s, famous for its extreme minimalism and hardware proximity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Forth">

Created by Charles Moore in 1970, Forth is an interactive, extensible, stack-based programming language. It is incredibly minimalist, historically used in embedded systems, astronomy (telescope control), and spacecraft.

## 1. Stack-Oriented Architecture
In languages like C, mathematical operations are written as TICK11 + 2TICK1.
Forth uses **Reverse Polish Notation (RPN)**. Operations are performed by pushing numbers onto a Last-In-First-Out (LIFO) stack, and commands pull from that stack.
To add 1 and 2, you write: TICK11 2 +TICK1.
1. Push 1 to stack.
2. Push 2 to stack.
3. TICK1+TICK1 command pops the top two values, adds them, and pushes the result (3) back onto the stack.

## 2. Extensibility (The Dictionary)
Forth does not have a traditional syntax tree. It has a "Dictionary" of words (commands).
You define new words by combining old words. 
TICK3forth
: SQUARE dup * ;
TICK3
This mathematically defines a new word TICK1SQUARETICK1. It takes the top number on the stack, duplicates it (TICK1dupTICK1), and multiplies them (TICK1*TICK1). You have just extended the compiler itself. Because of this, Forth programs are incredibly small and fast.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/J/index.mdx': `---
title: J
description: An ultra-dense, array-oriented programming language designed as a modern, ASCII-only successor to APL.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="J">

Designed by Kenneth Iverson and Roger Hui in 1990, J is an array programming language. Iverson created it to solve the primary complaint about his earlier language, APL: APL required an entirely custom keyboard to type Greek/math symbols. J uses only standard ASCII characters.

## 1. Tacit (Point-Free) Programming
Like APL, J operates heavily on matrices and arrays without requiring loops. 
Furthermore, J highly encourages **Tacit Programming**. In tacit programming, you define mathematical functions without ever specifying the arguments (the variables). You define purely how functions combine together.

## 2. The ASCII Digraphs
To replace APL's symbols, J combines standard punctuation marks into digraphs.
- TICK1+/TICK1 : Sum an array (equivalent to APL's +/)
- TICK1#:TICK1 : Convert to binary
- TICK1i.TICK1 : Generate an array of integers

While mathematically elegant for high-level statistics and data manipulation, it results in code that looks like line noise to C or Java programmers (e.g., TICK1+/ i. 10TICK1 to sum numbers 0 through 9).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/K/index.mdx': `---
title: K
description: A commercial, extremely high-performance array language used heavily in finance and high-frequency trading.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="K">

Developed by Arthur Whitney (who previously worked on APL and J), K is an esoteric, commercial array language. It is the underlying language of **kdb+**, an incredibly fast time-series database used by Wall Street banks to process billions of financial ticks per second.

## 1. The Pursuit of Speed
K is mathematically obsessed with raw execution speed. 
It achieves this by being incredibly tiny. The entire K interpreter is only a few hundred kilobytes. Because the interpreter and the data structures are so small, the entire environment easily fits inside the L1/L2 cache of a modern CPU, avoiding slow RAM lookups entirely.

## 2. APL Lineage
Like APL and J, K is heavily array-oriented, reading right-to-left. 
Unlike J, which uses a massive vocabulary of ASCII digraphs, K minimizes the core primitive set. 
K code is notoriously unreadable, often consisting of a dense string of symbols (e.g., TICK1+/xTICK1), but a single line of K can replace 50 lines of C code and execute 10 times faster due to its inherent vectorization and cache locality.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Logo/index.mdx': `---
title: Logo
description: An educational programming language famously known for its "Turtle Graphics", used to teach children computational thinking.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Logo">

Created in 1967 by Wally Feurzeig, Seymour Papert, and Cynthia Solomon, Logo is a dialect of Lisp specifically adapted for educational use. It is profoundly influential in the history of computer science education.

## 1. Turtle Graphics
Logo is universally associated with the **Turtle**.
Instead of printing text to a screen, children control a virtual cursor (the turtle) on a canvas. They write simple commands:
TICK3logo
FORWARD 100
RIGHT 90
TICK3
By mathematically looping these commands (e.g., TICK1REPEAT 4 [FORWARD 100 RIGHT 90]TICK1), a child can visually draw a square. This provides immediate, visual gratification and a tangible understanding of geometric mathematics and state management.

## 2. Lisp Lineage
Despite its reputation as a toy for drawing shapes, Logo is mathematically a fully functional language derived from Lisp. It supports first-class functions, lexical scoping, and advanced list processing, making it capable of complex AI research.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/LOLCODE/index.mdx': `---
title: LOLCODE
description: A joke esoteric programming language heavily inspired by the "lolcat" internet meme culture of the late 2000s.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LOLCODE">

Created in 2007 by Adam Lindsay, LOLCODE is an esoteric programming language built purely as a joke. Its syntax is mathematically mapped to the broken English associated with internet "lolcat" memes (e.g., "I Can Has Cheezburger?").

## 1. The Syntax
While completely absurd, LOLCODE is a Turing-complete language capable of standard logical operations.
- Program Start: TICK1HAI 1.2TICK1
- Print: TICK1VISIBLE "HELLO WORLD!"TICK1
- Variable Declaration: TICK1I HAS A VAR ITZ 5TICK1
- Loop: TICK1IM IN YR LOOP ... IM OUTTA YR LOOPTICK1
- Program End: TICK1KTHXBYETICK1

## 2. Value as an Esolang
While no one uses LOLCODE for production systems, it serves as a fascinating educational case study in parser construction. Writing an interpreter for LOLCODE is a common university assignment, teaching students how to mathematically map abstract syntax trees onto bizarre, non-standard grammar rules.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Malbolge/index.mdx': `---
title: Malbolge
description: The ultimate esoteric programming language, explicitly designed to be mathematically impossible for a human to write code in.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Malbolge">

Created in 1998 by Ben Olmstead, Malbolge is named after the eighth circle of Hell in Dante's Inferno. It was mathematically designed to be the worst, most difficult programming language in human history. 

## 1. Cryptographic Chaos
In most esoteric languages (like Brainfuck), the commands are strange but deterministic. 
In Malbolge, the execution environment is mathematically hostile:
- **Self-Modifying**: After an instruction is executed, it mathematically encrypts/modifies itself. The same command will do something completely different the next time the loop hits it.
- **Base-3 Mathematics**: It operates on a trinary (Base-3) virtual machine, rather than standard binary, breaking all standard bitwise logic.

## 2. The Unsolvable Hello World
When Olmstead created the language, he mathematically could not write a program for it. 
It took two years before another programmer used a beam search algorithm (an AI technique) to mathematically brute-force a program that simply printed "Hello, World!". To this day, complex Malbolge programs are exclusively generated by other computer programs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Modula-2/index.mdx': `---
title: Modula-2
description: A highly structured systems programming language developed by Niklaus Wirth as the successor to Pascal.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Modula-2">

Created in 1978 by Niklaus Wirth (the creator of Pascal), Modula-2 was designed to solve the critical architectural flaws of Pascal, specifically for writing entire operating systems.

## 1. The Module Architecture
As the name implies, Modula-2 introduced the concept of **Modules**. 
In the 1970s, managing large codebases was mathematically chaotic. Modula-2 strictly enforced separating a program into independent Modules. 
Crucially, it forced the separation of a Module's **Definition** (the interface, what other code can see) from its **Implementation** (the hidden inner code). This heavily influenced modern package systems in Ada, Python, and Go.

## 2. Systems Programming
Unlike Pascal (which was mostly educational), Modula-2 was a bare-metal systems language. It included mathematically precise facilities for memory addresses, interrupts, and concurrency (coroutines), making it capable of writing device drivers and embedded systems before C took over the world.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Prolog/index.mdx': `---
title: Prolog
description: A groundbreaking logic programming language used heavily in Artificial Intelligence, computational linguistics, and expert systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Prolog">

Created in 1972, Prolog (Programming in Logic) completely abandons the imperative programming model (like C or Java, where you tell the computer *how* to do something). Instead, Prolog is a declarative logic language: you mathematically declare the facts and the rules, and you ask the compiler a question.

## 1. Facts and Rules
You do not write functions in Prolog. You write a mathematical knowledge base.
- **Fact**: TICK1parent(john, mary).TICK1 (John is the parent of Mary).
- **Rule**: TICK1grandparent(X, Y) :- parent(X, Z), parent(Z, Y).TICK1 (X is the grandparent of Y IF X is the parent of Z, AND Z is the parent of Y).

## 2. The Inference Engine
Once you declare the knowledge, you query it: TICK1?- grandparent(john, alice).TICK1
Prolog uses a mathematical algorithm called **Unification** and **Backtracking**. It searches through all known facts, attempting to mathematically prove the statement. If it hits a dead end, it backtracks and tries another logical path until it either proves the statement true, or exhausts all possibilities and returns false.

This makes Prolog astonishingly powerful for writing Expert Systems, pathfinding algorithms, and processing natural language grammars.

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
