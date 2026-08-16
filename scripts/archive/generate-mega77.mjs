import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/AST/index.mdx': `---
title: Abstract Syntax Tree (AST)
description: A tree representation of the abstract syntactic structure of source code written in a programming language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Abstract Syntax Tree (AST)">

When the Compiler's Lexer breaks raw text (\`let x = 5 + 5;\`) into a flat array of Tokens, that array is mathematically useless for understanding the *logic* of the program because it lacks hierarchy.

The Parser mathematically transforms the flat token array into an **Abstract Syntax Tree (AST)**. The AST is the central nervous system of modern compilers, interpreters, and developer tools (like ESLint and Prettier).

<Callout icon="tip" title="Why is it 'Abstract'?">
  It is abstract because it mathematically strips away all syntax details that don't affect logic. Parentheses, semicolons, and commas exist only to help the human or the Parser. Once the AST is built, the structural hierarchy inherently represents the order of operations, so the parentheses are discarded.
</Callout>

## The Structure of an AST

Every node in the tree represents a specific mathematical or structural operation.

For the code \`5 + (10 * 2)\`, the AST looks mathematically like this:

1. **Root Node:** \`BinaryExpression\` (Operator: \`+\`)
   - **Left Child:** \`Literal\` (Value: \`5\`)
   - **Right Child:** \`BinaryExpression\` (Operator: \`*\`)
     - **Left Child:** \`Literal\` (Value: \`10\`)
     - **Right Child:** \`Literal\` (Value: \`2\`)

Because the AST is a mathematical tree, the Interpreter can execute the code using a simple post-order traversal (evaluate children first, then evaluate the parent).

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Intermediate representation/index.mdx': `---
title: Intermediate Representation (IR)
description: The data structure or code used internally by a compiler or virtual machine to represent source code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Intermediate Representation (IR)">

Early compilers (in the 1970s) translated C source code directly into x86 Assembly language. This created an \`M * N\` mathematical problem: If you have 5 languages (C, C++, Rust, Swift, Go) and 4 CPU architectures (x86, ARM, PowerPC, MIPS), you have to write 20 completely independent, massive compilers.

Modern compilers (like LLVM) solve this using an **Intermediate Representation (IR)**.

<Callout icon="success" title="The Universal Hub">
  IR is a mathematically pure, generalized, and highly optimized assembly language that does not exist on any physical CPU. 
  
  Now, you only need to write a "Front-End" to translate Rust to IR. And you write a "Back-End" to translate IR to ARM. If Apple invents a new CPU, you only write ONE new Back-End, and suddenly all 5 languages can run on it perfectly.
</Callout>

## LLVM IR

LLVM IR is the most famous Intermediate Representation in the world. It looks mathematically similar to assembly, but with a few magical differences:

- **Infinite Registers:** Physical CPUs have 16 or 32 registers. LLVM IR mathematically assumes you have infinite registers (numbered \`%1\`, \`%2\`, \`%3\`). The Code Generator maps these to the physical constraints later.
- **Static Single Assignment (SSA):** A mathematical rule stating that every register can only be assigned a value *exactly once*. If you want to change a value, you mathematically must create a new register (\`%4 = add i32 %3, 1\`). SSA makes the Optimization Passes vastly faster and more mathematically provable.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Recursive descent/index.mdx': `---
title: Recursive Descent Parsing
description: A kind of top-down parser built from a set of mutually recursive procedures where each procedure implements one of the nonterminals of the grammar.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Recursive Descent Parsing">

There are many mathematical algorithms used to parse a flat list of tokens into an AST (LL, LR, LALR). However, the most universally loved and widely used technique in handwritten compilers (like V8, GCC, and Clang) is **Recursive Descent**.

<Callout icon="tip" title="Why is it so popular?">
  Unlike automated parser generators (like Yacc or Bison) that produce mathematically unreadable C code, a Recursive Descent parser is just normal, clean code. It is incredibly easy to debug, and it provides world-class error messages (e.g., "Expected semicolon on line 45").
</Callout>

## How it mathematically works

A Recursive Descent parser is just a collection of standard functions that mathematically map 1-to-1 with the rules of the language grammar. 

Because expressions can contain other expressions, these functions naturally call each other mathematically in a recursive loop.

1. The compiler calls \`parseExpression()\`.
2. It sees a \`{\`, so it calls \`parseBlockStatement()\`.
3. Inside the block, it sees a variable, so it calls \`parseExpression()\` again.
4. As the recursive functions mathematically \`return\` their nodes, the AST tree naturally builds itself from the bottom up, mirroring the Call Stack.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/LL parsing/index.mdx': `---
title: LL Parsing (Top-Down)
description: A top-down parser for a subset of context-free grammars that parses the input from Left to right, performing Leftmost derivation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LL Parsing (Top-Down)">

In compiler theory, **LL** stands for:
- **L:** Read the tokens from **L**eft to right.
- **L:** Construct a **L**eftmost derivation of the tree.

LL Parsers (which include Recursive Descent) are mathematically considered **Top-Down Parsers**. They start at the very top of the AST (the root "Program" node) and mathematically guess which child nodes to build as they read tokens.

<Callout icon="warning" title="The Left-Recursion Problem">
  LL Parsers have a severe mathematical flaw: they cannot handle "Left-Recursive" grammars. If a rule says \`Expression -> Expression + Number\`, an LL parser will see "Expression", recursively call \`parseExpression()\`, which sees "Expression", and recursively calls \`parseExpression()\`, resulting in an instant infinite mathematical loop (Stack Overflow).
</Callout>

## LL(k) Lookahead

Because an LL parser mathematically guesses what node to build *before* reading the entire sentence, it often has to "look ahead" at the next tokens to make the correct choice.

- **LL(1):** The parser only needs to look at the next 1 token to know exactly what grammatical rule applies. This is the mathematically fastest parser.
- **LL(k):** The parser mathematically requires looking \`k\` tokens ahead.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/LR parsing/index.mdx': `---
title: LR Parsing (Bottom-Up)
description: A type of bottom-up parser that reads input from Left to right and produces a Rightmost derivation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LR Parsing (Bottom-Up)">

In compiler theory, **LR** stands for:
- **L:** Read the tokens from **L**eft to right.
- **R:** Construct a **R**ightmost derivation of the tree in reverse.

Unlike LL parsers (which start at the root and mathematically guess downward), LR Parsers are **Bottom-Up Parsers**. They read tokens and pile them onto a mathematical Stack. Once the pile of tokens exactly matches a known grammatical rule, they "Reduce" the pile into a single AST node, building the tree from the leaves up to the root.

<Callout icon="success" title="Mathematical Superiority">
  LR Parsers are mathematically superior to LL parsers. They can parse a vastly larger set of grammars, they completely ignore the Left-Recursion infinite loop problem, and they never have to "guess" what rule to apply. 
</Callout>

## Why aren't they used everywhere?

If LR is mathematically superior, why do GCC and Clang use handwritten Recursive Descent (LL)?

Because LR parsers are essentially massive, complex mathematical State Machines (Pushdown Automata). They are so complicated that humans cannot write them by hand. You must use a tool (like YACC or Bison) to automatically generate the parser code. The resulting code is mathematically impossible for humans to read, making it brutally difficult to output high-quality, human-readable syntax error messages.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/JIT compilation/index.mdx': `---
title: Just-In-Time (JIT) Compilation
description: A way of executing computer code that involves compilation during execution of a program (at run time) rather than before execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Just-In-Time (JIT) Compilation">

A traditional Interpreter executes code mathematically line-by-line. If a \`for\` loop runs 100,000 times, the interpreter must re-translate the exact same mathematical addition instruction 100,000 times, wasting massive amounts of CPU cycles.

**Just-In-Time (JIT) Compilation** is the miracle technology that bridges the mathematical gap between slow Interpreters (JavaScript, Python) and blazing-fast Ahead-Of-Time (AOT) Compilers (C++, Rust).

<Callout icon="tip" title="The Best of Both Worlds">
  JIT allows JavaScript to start running instantly (because it doesn't wait for a 5-minute C++ compile step), but achieves near-native C++ performance within seconds of execution.
</Callout>

## How JIT Mathematically Works (The V8 Engine)

1. **Ignition (The Interpreter):** The code starts executing immediately using a fast, unoptimized Bytecode Interpreter.
2. **The Profiler:** As the code runs, the JIT mathematically watches the execution. It counts how many times a function is called. If a function is called thousands of times, it mathematically marks it as **"Hot"**.
3. **TurboFan (The Optimizer):** The JIT sends the "Hot" function to a background thread. It mathematically compiles that specific function directly into physical x86/ARM Machine Code.
4. **On-Stack Replacement (OSR):** The next time the code calls that function, the JIT seamlessly swaps out the slow interpreter bytecode and executes the blazing-fast physical machine code instead.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Virtual machines/index.mdx': `---
title: Virtual Machines (Language Level)
description: A software-based theoretical computer that executes programs like a physical machine, providing platform independence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Machines (Language Level)">

When we talk about Compilers, a **Virtual Machine (VM)** does not mean a hardware VM like VMware or VirtualBox. It refers to a **Process Virtual Machine** (like the Java Virtual Machine (JVM) or the V8 JavaScript Engine).

A Process VM is a mathematically simulated CPU written in software. It has its own mathematical Instruction Set (Bytecode), its own simulated Registers or Stack, and its own simulated RAM (Garbage Collector).

<Callout icon="success" title="Write Once, Run Anywhere">
  If you compile Java directly to x86 Machine Code, it will crash if you send it to an Apple M1 (ARM) chip. Instead, Java compiles to mathematical JVM Bytecode. As long as Apple has written a JVM for the M1 chip, the Java Bytecode will run flawlessly on it. The JVM mathematically absorbs the hardware differences.
</Callout>

## Stack-Based vs. Register-Based VMs

There are two primary mathematical architectures for building a Language VM:

<ComparisonTable 
  headers={['Architecture', 'How it works', 'Examples']}
  rows={[
    ['Stack-Based VM', 'All mathematical operations (\`ADD\`, \`MUL\`) pop operands off the top of a simulated Stack, calculate the result, and push it back on top.', 'Java Virtual Machine (JVM), WebAssembly (Wasm). Smaller bytecode size, easier to write compilers for.'],
    ['Register-Based VM', 'Simulates physical CPU registers. Operations explicitly declare which registers to use (e.g., \`ADD R1, R2, R3\`).', 'LuaJIT, Android Dalvik/ART. Requires more mathematical optimization, but executes significantly faster because it mimics physical CPUs.']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Bytecode design/index.mdx': `---
title: Bytecode Design
description: The design of instruction sets for software interpreters and virtual machines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bytecode Design">

**Bytecode** is the mathematical Instruction Set Architecture (ISA) of a software Virtual Machine. It is called "bytecode" because each instruction opcode is typically mathematically encoded into a single 8-bit byte.

Because it is an intermediate format, Bytecode must balance two mathematically opposing forces:
1. It must be high-level enough that the Compiler can generate it quickly.
2. It must be low-level enough that the Virtual Machine can execute it (or JIT compile it) at blazing speeds.

<Callout icon="tip" title="Security and Sandboxing">
  Bytecode provides a massive security advantage. You cannot safely download physical x86 Assembly from a website and run it; it could format your hard drive. But you can download WebAssembly Bytecode. The browser's VM mathematically analyzes the bytecode before execution, guaranteeing it cannot escape the secure sandbox.
</Callout>

## Anatomy of a Bytecode Instruction

A typical bytecode instruction consists of an **Opcode** (the action) followed by **Operands** (the targets).

For example, compiling \`x = 5 + 5\`:
1. \`PUSH_CONST 5\`
2. \`PUSH_CONST 5\`
3. \`ADD\`
4. \`STORE_VAR x\`

Inside the Virtual Machine (usually written in C++), executing the bytecode is essentially a massive mathematical \`while\` loop wrapped around a giant \`switch\` statement:

\`\`\`cpp
while (true) {
  byte opcode = bytecode[ip++]; // increment instruction pointer
  switch (opcode) {
    case OP_ADD:
      stack.push(stack.pop() + stack.pop());
      break;
  }
}
\`\`\`

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/GCC/index.mdx': `---
title: GNU Compiler Collection (GCC)
description: An open-source optimizing compiler produced by the GNU Project supporting various programming languages, hardware architectures and operating systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="GNU Compiler Collection (GCC)"
  subtitle="The compiler that built the open-source world"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/GNU_Compiler_Collection_logo.svg/512px-GNU_Compiler_Collection_logo.svg.png"
  description="GCC is arguably one of the most important pieces of software ever written. Released by Richard Stallman in 1987, it was the first free compiler, and it became the mathematical foundation upon which the entire Linux kernel and open-source ecosystem was built."
  yearCreated={1987}
  creator="Richard Stallman (GNU Project)"
  isOpenSource={true}
  websiteUrl="https://gcc.gnu.org/"
>

GCC is a behemoth. It is mathematically capable of compiling C, C++, Objective-C, Fortran, Ada, Go, and D, and generating highly optimized machine code for almost every CPU architecture on Earth.

<Callout icon="info" title="The Monolithic Architecture">
  For decades, GCC was intentionally designed as a mathematically monolithic block of code. Richard Stallman did this on purpose to prevent proprietary tech companies from using GCC's internal parsers in closed-source software. While politically successful, it made the GCC codebase notoriously difficult to maintain or use as a library.
</Callout>

## The Challenge from LLVM

Because GCC was mathematically monolithic, it was impossible for companies like Apple to extract just the C++ Parser to build IDE tools (like code completion or syntax highlighting). 

This architectural decision is what ultimately caused Apple and Google to heavily fund **LLVM and Clang**, a highly modular modern compiler infrastructure, which has since overtaken GCC in many modern toolchains.

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/LLVM/index.mdx': `---
title: LLVM
description: A set of compiler and toolchain technologies, which can be used to develop a front end for any programming language and a back end for any instruction set architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="LLVM"
  subtitle="The modular heart of modern compilation"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/LLVM_Logo.svg/512px-LLVM_Logo.svg.png"
  description="LLVM (originally Low Level Virtual Machine) revolutionized compiler architecture. Instead of a massive monolith like GCC, LLVM is a collection of mathematically strict, independent C++ libraries."
  yearCreated={2003}
  creator="Chris Lattner"
  isOpenSource={true}
  websiteUrl="https://llvm.org/"
>

LLVM brought mathematical sanity to compiler development by strictly enforcing the **Three-Phase Architecture**.

1. **Front-Ends:** You write a parser for your new language (Rust, Swift, Zig) and have it output standard mathematical LLVM IR.
2. **The Optimizer:** LLVM takes your IR and runs it through decades of world-class mathematical optimization passes, completely independent of the source language.
3. **Back-Ends:** LLVM translates the optimized IR into physical Machine Code for x86, ARM, WebAssembly, or GPUs.

<Callout icon="success" title="The Cambrian Explosion of Languages">
  Before LLVM, creating a new compiled language like Rust would require an army of engineers 10 years to write optimizations and target different CPUs. Because of LLVM, the Rust team only had to write the Front-End. They mathematically inherited 20 years of Apple and Google's optimization logic and hardware support for free.
</Callout>

## Major LLVM Projects

- **Clang:** The C/C++ Front-End for LLVM (built by Apple to replace GCC).
- **Rustc:** The official Rust compiler.
- **Swift:** Apple's proprietary language, written by Chris Lattner alongside LLVM.
- **Julia:** A scientific language that mathematically JIT-compiles via LLVM.

</TechnologyTemplate>
`,
}

async function generateMega77() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega77().catch(console.error)
