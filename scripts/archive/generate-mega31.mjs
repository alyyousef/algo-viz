import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Lexical analysis/index.mdx': `---
title: Lexical Analysis (Lexing)
description: "The first phase of a compiler, converting a sequence of characters into a sequence of tokens."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Lexical Analysis">

When you feed a source code file (like TICK1main.cTICK1) into a compiler, the compiler initially just sees a massive, meaningless string of raw characters.

The **Lexer** (or Scanner) performs **Lexical Analysis**. Its job is to read this raw string character by character, strip out whitespace and comments, and group the remaining characters into meaningful chunks called **Tokens**.

## Example

Given the raw source string:
${TICK3}c
int main() {
  return 0;
}
${TICK3}

The Lexer will output a stream of tokens that looks something like this:
1. TICK1[KEYWORD, "int"]TICK1
2. TICK1[IDENTIFIER, "main"]TICK1
3. TICK1[PUNCTUATION, "("]TICK1
4. TICK1[PUNCTUATION, ")"]TICK1
5. TICK1[PUNCTUATION, "{"]TICK1
6. TICK1[KEYWORD, "return"]TICK1
7. TICK1[NUMBER_LITERAL, "0"]TICK1
8. TICK1[PUNCTUATION, ";"]TICK1
9. TICK1[PUNCTUATION, "}"]TICK1

## How it Works
Lexers are almost always implemented using **Finite Automata** (specifically, Deterministic Finite Automata or DFAs). The lexer defines a set of **Regular Expressions** for each valid token type in the language.

<ComparisonTable 
  headers={['Token Type', 'Regular Expression Example', 'Matches']} 
  rows={[
    ['Identifier', '[a-zA-Z_][a-zA-Z0-9_]*', 'myVariable, _private_val'],
    ['Number Literal', '[0-9]+', '42, 1000'],
    ['String Literal', '"[^"]*"', '"Hello World"']
  ]} 
/>

If the Lexer encounters a character that does not match any valid rule (e.g., an illegal symbol like TICK1@TICK1 in C), it throws a **Syntax Error** and halts compilation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Parsers/index.mdx': `---
title: Parsing (Syntax Analysis)
description: "The second phase of a compiler, analyzing a stream of tokens to determine its grammatical structure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Parsing (Syntax Analysis)">

After the Lexer converts raw text into a flat list of Tokens, the **Parser** takes over. The Parser's job is to verify that these tokens form valid sentences according to the formal grammar of the programming language.

While a Lexer uses Regular Expressions (which can only match simple patterns), a Parser uses **Context-Free Grammars (CFGs)**, which can handle complex nested structures like TICK1ifTICK1 statements inside TICK1whileTICK1 loops.

## Types of Parsers

<ComparisonTable 
  headers={['Type', 'Direction', 'Description', 'Examples']} 
  rows={[
    ['Top-Down', 'Root to Leaves', 'Starts at the highest level grammar rule (e.g., "Program") and works down to the individual tokens. Easier to write by hand.', 'Recursive Descent, LL(k)'],
    ['Bottom-Up', 'Leaves to Root', 'Starts with the tokens and shifts them onto a stack, reducing them into higher-level grammar rules. More powerful, but usually machine-generated.', 'LR(1), LALR (Yacc/Bison)']
  ]} 
/>

## Recursive Descent
The most intuitive way to build a parser by hand is **Recursive Descent**. You write one function for every rule in your grammar.

${TICK3}javascript
// Parsing the grammar rule: Assignment -> Identifier "=" Expression ";"
function parseAssignment() {
  const id = match(TOKEN_IDENTIFIER);
  match(TOKEN_EQUALS);
  const expr = parseExpression(); // Recursive call!
  match(TOKEN_SEMICOLON);
  
  return new AssignmentNode(id, expr);
}
${TICK3}

If the parser encounters a token it wasn't expecting (e.g., an TICK1=TICK1 instead of a TICK1;TICK1), it throws a Syntax Error.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/AST/index.mdx': `---
title: Abstract Syntax Trees (AST)
description: "A tree representation of the abstract syntactic structure of source code written in a programming language."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Abstract Syntax Tree (AST)">

When the Parser successfully verifies the grammar of the token stream, its ultimate output is an **Abstract Syntax Tree (AST)**. 

The AST is a hierarchical, tree-based data structure that perfectly represents the logical structure of the program. It is "Abstract" because it strips away all the superficial punctuation (like semicolons, parentheses, and braces) that were only necessary for the parser to do its job.

## Example

Consider the code:
${TICK3}javascript
x = 5 + (3 * y);
${TICK3}

The resulting AST looks like an inverted tree:
${TICK3}text
      [AssignmentNode]
      /              \\
 [Identifier: x]   [BinaryOp: +]
                   /           \\
           [Literal: 5]     [BinaryOp: *]
                            /           \\
                    [Literal: 3]   [Identifier: y]
${TICK3}

## Why the AST is Critical
The AST is the central hub of modern compilers and tooling. Once the AST is generated:
- **Linters** (like ESLint) walk the tree to find bad patterns (e.g., "Find all AssignmentNodes where the left side is a constant").
- **Formatters** (like Prettier) read the tree and print it back out as perfectly indented text.
- **The Compiler** takes the AST, performs Semantic Analysis (like Type Checking to ensure you aren't adding a string to a number), and then translates the AST into Intermediate Representation or Machine Code.

<Callout icon="tip" title="AST Explorer">
You can explore the AST of almost any language directly in your browser using the incredible tool at **astexplorer.net**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Intermediate representation/index.mdx': `---
title: Intermediate Representation (IR)
description: "A data structure or code used internally by a compiler to represent source code before translating it into the target machine code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Intermediate Representation (IR)">

Instead of translating the AST directly into Intel x86 machine code, modern compilers first translate the AST into an **Intermediate Representation (IR)**.

IR looks like a simplified, generic assembly language. It is independent of the original source language (like C++ or Rust) and independent of the target CPU architecture (like x86 or ARM).

## The "M x N" Problem
Imagine you want to build a compiler that supports 3 languages (C, C++, Rust) and outputs to 3 CPU architectures (x86, ARM, RISC-V).
- **Without IR**: You must write 9 distinct compilers (C to x86, C to ARM, Rust to ARM, etc).
- **With IR**: You write 3 "Frontends" that convert the source code to IR. You write 3 "Backends" that convert IR to machine code. You only wrote 6 components, but you get all 9 combinations for free!

## Three-Address Code
A very common form of IR is **Three-Address Code (TAC)**. Every instruction is broken down so it has at most two operands and one result.

*Source Code:*
${TICK3}c
x = a + b * c;
${TICK3}

*Intermediate Representation:*
${TICK3}text
t1 = b * c
x = a + t1
${TICK3}

<ComparisonTable 
  headers={['Compiler Phase', 'Input', 'Output']} 
  rows={[
    ['Frontend', 'Source Code (C++, Swift)', 'Abstract Syntax Tree (AST) -> IR'],
    ['Middle-end', 'Unoptimized IR', 'Optimized IR (Dead code removed, loops unrolled)'],
    ['Backend', 'Optimized IR', 'Machine Code (x86, ARM, WebAssembly)']
  ]} 
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/LLVM/index.mdx': `---
title: LLVM
description: "A collection of modular and reusable compiler and toolchain technologies used to build modern programming languages."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="LLVM">

Originally standing for "Low Level Virtual Machine" (a name that is now officially obsolete), **LLVM** is the most important piece of compiler infrastructure in modern software engineering.

Before LLVM, if you invented a new programming language, you had to write your own parser, figure out how to optimize code, and learn the dense machine-code manuals for Intel, AMD, and ARM processors just to get your language to run.

## The LLVM Revolution
LLVM solved this by providing a world-class **Middle-end** and **Backend**. 

If you invent a new language today, you only have to write the **Frontend**: a parser that converts your syntax into **LLVM IR** (LLVM's Intermediate Representation). 

Once you hand that IR to LLVM, LLVM automatically:
1. Runs decades of state-of-the-art optimizations on your code.
2. Translates it perfectly to x86, ARM, WebAssembly, or almost any other hardware architecture.

## Languages Powered by LLVM
Because LLVM makes building high-performance compilers so accessible, it powered an explosion of modern languages:
- **Rust**: Uses LLVM as its primary backend.
- **Swift**: Created by Apple using LLVM.
- **Clang**: The LLVM-based C/C++ frontend that replaced GCC on macOS.
- **Julia**: Uses LLVM for JIT compilation.

<Callout icon="info" title="LLVM IR">
LLVM IR is strongly typed and uses **Static Single Assignment (SSA)** form, meaning every variable is assigned a value exactly once. This mathematical property makes it incredibly easy for the optimizer to analyze and transform the code without making mistakes.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/JIT compilation/index.mdx': `---
title: JIT Compilation
description: "Just-In-Time compilation, a method of executing code where the source or bytecode is compiled into machine code at runtime."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Just-In-Time (JIT) Compilation">

To run code, you traditionally have two choices:
1. **AOT (Ahead-of-Time) Compilation**: Like C or Rust. You compile the code entirely into native machine code *before* you ship it. It is incredibly fast, but tied to a specific CPU architecture.
2. **Interpretation**: Like Python or Ruby. A program (the Interpreter) reads the source code line-by-line and executes it on the fly. It is highly portable but notoriously slow.

**JIT (Just-In-Time) Compilation** is the hybrid approach used by Java, C#, and JavaScript (V8) to get the best of both worlds.

## How JIT Works

<ComparisonTable 
  headers={['Step', 'Action']} 
  rows={[
    ['1. Bytecode', 'The source code is quickly converted into an intermediate format (like Java Bytecode).'],
    ['2. Interpretation', 'The program starts running immediately via a fast interpreter.'],
    ['3. Profiling', 'As the program runs, the runtime "watches" it. It identifies "Hot Paths"—functions that are executed thousands of times (like a sorting algorithm).'],
    ['4. JIT Compilation', 'In the background, the JIT Compiler takes that specific "Hot" bytecode and compiles it down to highly optimized, native machine code.'],
    ['5. Swap', 'The runtime seamlessly swaps out the slow interpreted function for the lightning-fast machine code version.']
  ]} 
/>

## The JIT Advantage
Surprisingly, JIT-compiled code can sometimes run **faster** than AOT-compiled C++. 

Because the JIT compiler is running *on the exact machine* the user owns, it can look at the specific CPU (e.g., "Ah, this is an Intel i9") and utilize ultra-modern vector instructions (AVX-512) that an AOT compiler couldn't safely assume were available when the software was packaged months ago.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Turing machines/index.mdx': `---
title: Turing Machines
description: "An abstract mathematical model of computation that defines the limits of what can be computed by a machine."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Turing Machines">

Invented by Alan Turing in 1936 (years before physical computers existed), a **Turing Machine** is not a physical device, but a mathematical abstraction. It is the fundamental theoretical foundation of all modern computer science.

## The Model
A Turing Machine consists of:
1. **An Infinite Tape**: Divided into cells, each containing a symbol (like TICK10TICK1, TICK11TICK1, or blank). This represents infinite memory.
2. **A Read/Write Head**: A scanner that points to a single cell on the tape. It can read the symbol, write a new symbol, and move one step left or right.
3. **A State Register**: The current "mood" or state of the machine (e.g., State A, State B).
4. **A Table of Rules (The Program)**: A strict set of instructions based on the current state and the symbol being read. (e.g., *"If in State A and reading a 1: Write a 0, move Right, switch to State B"*).

## Turing Completeness
Despite its primitive simplicity, a Turing Machine can compute **anything that is computable in the universe**. 

If a programming language can simulate a Turing Machine, it is called **Turing Complete**. C, Python, Java, and JavaScript are all Turing Complete. This means that, ignoring limitations of time and memory, any program written in Python can mathematically be written in C, and vice versa. They are fundamentally equal in computational power.

<Callout icon="warning" title="Accidental Turing Completeness">
Many systems that were never meant to be programming languages accidentally became Turing Complete by adding too many features over the years. HTML and CSS (when combined), Microsoft Excel, and even the game Minecraft (via Redstone) are fully Turing Complete.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Halting problem/index.mdx': `---
title: The Halting Problem
description: "A foundational theorem proving that it is impossible to write a program that can perfectly determine if another program will eventually stop running or run forever."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Halting Problem">

Can we write a magical debugger program—let's call it TICK1halts(code, input)TICK1—that analyzes any piece of source code and tells us **True** (the code will eventually finish) or **False** (the code contains an infinite loop and will run forever)?

In 1936, Alan Turing mathematically proved that **no such program can ever exist**. This is the **Halting Problem**.

## The Proof by Contradiction

Turing used a brilliant paradox to prove this. 
Assume the magical TICK1halts()TICK1 function *does* exist. We then write a malicious new program called TICK1paradox()TICK1 that uses it:

${TICK3}python
def paradox(code):
    if halts(code, code) == True:
        # If the analyzer says this code WILL stop, 
        # we purposely loop forever!
        while True: 
            pass 
    else:
        # If the analyzer says this code will loop FOREVER, 
        # we purposely stop immediately!
        return 
${TICK3}

Now, what happens if we feed the TICK1paradoxTICK1 program into itself? 
TICK1paradox(paradox)TICK1

- If TICK1haltsTICK1 says the paradox *will stop*, the TICK1ifTICK1 statement executes and the paradox loops forever. (TICK1haltsTICK1 was wrong).
- If TICK1haltsTICK1 says the paradox *will run forever*, the TICK1elseTICK1 statement executes and the paradox stops immediately. (TICK1haltsTICK1 was wrong).

## The Implications
Because TICK1halts()TICK1 can be mathematically tricked, it cannot be perfectly accurate. Therefore, a universal program that can predict the behavior of all other programs is impossible. 

This proves that there are fundamental, mathematical limits to what computers can do. For example, it is theoretically impossible to write a perfect anti-virus software or a perfect static analysis tool.

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
