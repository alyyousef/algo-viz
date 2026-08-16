import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.4 Caching/Application cache/index.mdx': `---
title: Application Caching
description: Caching data directly within the memory space of the application server itself, rather than an external distributed cache.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Application Caching">

While Redis (a distributed cache) is incredibly fast (~1ms), the fastest mathematical network request is the one that never leaves the CPU. 

**Application Caching** (also known as Local Caching or In-Memory Caching) stores data directly in the RAM of the running Node.js, Python, or Java process itself. Accessing a local variable in RAM takes approximately **0.0001 milliseconds**.

<Callout icon="warning" title="The Consistency Nightmare">
  If you have 50 load-balanced Node.js servers, and each one caches the "Admin Users List" locally, what happens when you promote a new Admin? Server 1 updates its local cache, but Servers 2 through 50 still have the old list. This is why Local Caching must be used with extreme caution.
</Callout>

## When to use Application Caching

Because of the severe consistency issues in a distributed system, you should only use Local Caching for data that meets strict mathematical criteria:

1. **Immutable Data:** Data that literally never changes (e.g., Country ISO Codes).
2. **Highly Tolerant Data:** Data where being out-of-sync for a few minutes mathematically does not impact the business (e.g., the total count of registered users shown on a marketing homepage).

*Note: You can combine architectures by using a Two-Tier Cache: The App checks Local RAM first. If Miss, it checks Redis. If Miss, it checks PostgreSQL.*

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Database cache/index.mdx': `---
title: Database Caching
description: Internal memory management mechanisms used by database management systems to hold frequently accessed data in RAM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Database Caching">

Before you ever deploy a Redis cluster, you should mathematically ensure you are fully utilizing your database's built-in caching mechanisms. 

Modern databases like PostgreSQL and MySQL are incredibly sophisticated. They do not read directly from the physical hard drive on every query. They reserve a massive chunk of the server's RAM to act as an internal **Buffer Pool**.

<Callout icon="tip" title="The 80/20 Rule of RAM">
  A common mathematical rule of thumb for database server tuning is allocating 80% of the physical server RAM directly to the Database Cache (e.g., PostgreSQL's \`shared_buffers\`).
</Callout>

## Types of Internal Database Caches

<ComparisonTable 
  headers={['Cache Type', 'Mechanism', 'Details']}
  rows={[
    ['Buffer Pool / Page Cache', 'The DB mathematically caches the raw 8KB blocks of disk data in RAM.', 'If a user queries User #123, the DB loads the entire 8KB block containing User 123 into RAM. The next 1,000 queries for that user will hit RAM, bypassing the disk.'],
    ['Query Result Cache', 'The DB hashes the exact SQL string (e.g., \`SELECT COUNT(*) FROM Users\`) and caches the final number.', 'MySQL famously deprecated and removed this feature in version 8.0 because the mathematical overhead of invalidating the cache every time a new user signed up became slower than just running the query.'],
    ['Index Cache', 'Holding B-Tree indexes entirely in RAM.', 'Mathematically critical. If an index does not fit entirely in RAM, the DB will physically Thrash the hard drive to find records, crushing performance.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Eviction policies/index.mdx': `---
title: Cache Eviction Policies
description: Mathematical algorithms used by a cache to decide which data to delete when the cache's memory is completely full.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache Eviction Policies">

A cache (like Redis) operates entirely in RAM. RAM is mathematically expensive and physically limited. If you have 16GB of RAM, and you try to insert 17GB of data, the system will crash. 

To prevent this, the cache uses an **Eviction Policy**—an algorithm that mathematically determines which data is the "least valuable" and deletes it to make room for new data.

<Callout icon="info" title="Eviction vs. Expiration">
  Expiration (TTL) is when a key voluntarily dies because its timer ran out. Eviction is when a key is violently murdered by the system because it ran out of physical space.
</Callout>

## The Primary Mathematical Algorithms

<ComparisonTable 
  headers={['Algorithm', 'How it Works', 'Use Case']}
  rows={[
    ['LRU (Least Recently Used)', 'The system tracks the exact timestamp of the last *Read* operation. It deletes the item that hasn\\'t been looked at for the longest time.', 'The default and most mathematically optimal policy for 90% of web applications.'],
    ['LFU (Least Frequently Used)', 'The system maintains a mathematical counter of how many *total times* an item was read. It deletes the item with the lowest score.', 'Useful for CDN caches protecting viral content. If a video goes viral, its LFU score skyrockets, making it mathematically immune to eviction.'],
    ['FIFO (First In, First Out)', 'A simple queue. The oldest item inserted into the cache is the first one deleted, regardless of how popular it is.', 'Rarely used in modern systems because it mathematically deletes highly popular data just because it is old.'],
    ['Random Replacement', 'Selects a completely random key and deletes it.', 'Incredibly low CPU overhead. Useful when the access pattern is completely unpredictable.']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Lexers/index.mdx': `---
title: Lexical Analysis (Lexing)
description: The first phase of a compiler that converts a sequence of characters into a sequence of lexical tokens.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lexical Analysis (Lexing)">

When you write \`let x = 10;\`, the CPU does not see a variable. It mathematically sees an array of 12 ASCII bytes: \`[108, 101, 116, 32, 120, 32, 61, 32, 49, 48, 59]\`.

The very first step of any Compiler or Interpreter is the **Lexer** (or Scanner). Its job is to mathematically group these raw characters into meaningful chunks called **Tokens**, stripping away useless whitespace and comments.

<Callout icon="success" title="The Token Output">
  The Lexer mathematically transforms the string \`let x = 10;\` into a structured array of objects:
  \`[ KEYWORD("let"), IDENTIFIER("x"), ASSIGN, NUMBER(10), SEMICOLON ]\`
</Callout>

## The Mathematics of Lexing

Lexers are mathematically built using **Finite Automata** (specifically Deterministic Finite Automata or DFAs) and **Regular Expressions**. 

Because they only need to identify patterns at the character level, they do not require memory of previous tokens (they are mathematically "State-less" Context-Free processes).

<ComparisonTable 
  headers={['Input Character', 'Lexer Action', 'Resulting Token']}
  rows={[
    ['\`l\`, \`e\`, \`t\`', 'Continues reading until whitespace. Checks internal dictionary.', '\`KEYWORD("let")\`'],
    ['\` \` (Space)', 'Mathematically ignores and advances the cursor.', '*(None)*'],
    ['\`1\`, \`0\`', 'Recognizes digits, continues until a non-digit.', '\`NUMBER(10)\`'],
    ['\`/\`, \`/\`', 'Recognizes a comment trigger. Mathematically drops all characters until a newline (\`\\n\`).', '*(None)*']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Parsing/index.mdx': `---
title: Parsing (Syntax Analysis)
description: The second phase of a compiler that analyzes the string of tokens to determine its grammatical structure with respect to a given formal grammar.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Parsing (Syntax Analysis)">

Once the Lexer has converted the raw text into a flat array of Tokens, the **Parser** takes over. 

The Parser's mathematical job is to verify that the tokens follow the strict grammatical rules of the programming language. If the Lexer hands the Parser the tokens: \`[ KEYWORD("let"), NUMBER(10), ASSIGN, IDENTIFIER("x") ]\` (which represents \`let 10 = x;\`), the Parser throws a **Syntax Error**, because mathematically, a number cannot be the target of an assignment.

<Callout icon="tip" title="The Abstract Syntax Tree (AST)">
  The primary output of the Parser is a massive, multi-level mathematical tree structure called the **AST**. Every node in the tree represents a construct in the code (e.g., a \`BinaryExpressionNode\` with a left child \`x\`, right child \`10\`, and operator \`+\`).
</Callout>

## Formal Grammars

Parsers rely on mathematical **Context-Free Grammars (CFGs)**. A language defines mathematical rules for how constructs can be nested:

- \`Expression -> Expression + Expression\`
- \`Expression -> NUMBER\`
- \`Expression -> ( Expression )\`

Because the grammar allows recursion (expressions inside expressions), a Parser mathematically requires a Stack data structure (a Pushdown Automaton) to keep track of nested parentheses or brackets. A simple Regex is mathematically incapable of parsing HTML or modern programming languages.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Semantic analysis/index.mdx': `---
title: Semantic Analysis
description: The phase of a compiler that adds semantic information to the parse tree and builds the symbol table, checking for type consistency and scoping rules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semantic Analysis">

The Parser verifies that a sentence is *grammatically* correct. But grammatical correctness does not guarantee *logical* meaning.

The phrase "Colorless green ideas sleep furiously" is grammatically flawless, but mathematically meaningless. In code, \`"hello" * 5\` is grammatically valid (String times Number), but logically invalid in many languages.

The **Semantic Analyzer** walks through the AST generated by the Parser and mathematically enforces the logic and type rules of the language.

<Callout icon="error" title="Type Errors vs. Syntax Errors">
  If you forget a semicolon, the Parser throws a **Syntax Error**. If you try to divide a String by a Boolean, the Parser succeeds, but the Semantic Analyzer throws a **Type Error**.
</Callout>

## The Symbol Table

The primary mathematical tool of the Semantic Analyzer is the **Symbol Table**.

As the analyzer walks the AST, it records every variable declaration in a dictionary, tracking its name, mathematical Type (Integer, String), and Scope Level.

<ComparisonTable 
  headers={['Code Example', 'Semantic Analyzer Check', 'Outcome']}
  rows={[
    ['\`let x = 10; let x = 20;\`', 'Checks Symbol Table for current scope.', 'Throws Error: Variable \`x\` is mathematically already defined in this scope.'],
    ['\`print(y);\`', 'Looks up \`y\` in Symbol Table.', 'Throws Error: \`y\` is undefined.'],
    ['\`let z: Int = "hello";\`', 'Compares the Right-Hand-Side mathematical type (String) to the Left-Hand-Side type (Int).', 'Throws Type Mismatch Error.']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Optimisation passes/index.mdx': `---
title: Optimization Passes
description: The compiler phase that transforms the intermediate representation into mathematically equivalent but more efficient code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Optimization Passes">

A human programmer writes code to be readable. The CPU needs code to be fast. 

The **Optimizer** is the mathematical heart of a modern compiler (like GCC or LLVM). It takes the Abstract Syntax Tree (or an Intermediate Representation) and mathematically mutates it over dozens of "passes" to reduce execution time and memory footprint, without altering the program's output.

<Callout icon="success" title="The Golden Rule of Optimization">
  An optimization pass is mathematically invalid if it changes the observable behavior of the program. If \`x\` was supposed to output \`5\`, the optimized code must mathematically output exactly \`5\`.
</Callout>

## Common Mathematical Optimizations

<ComparisonTable 
  headers={['Optimization', 'Mechanism', 'Example']}
  rows={[
    ['Constant Folding', 'If the compiler sees \`x = 1000 * 60 * 60\`, it mathematically calculates the result at compile-time.', 'The CPU receives \`x = 3600000\`, saving three math operations at runtime.'],
    ['Dead Code Elimination', 'Mathematically proves that a block of code can never be reached (e.g., \`if (false) { ... }\`).', 'The code is completely deleted from the final binary, saving disk space and RAM.'],
    ['Loop Unrolling', 'If a loop runs exactly 4 times, the compiler mathematically copies the loop body 4 times and removes the jumping logic.', 'Increases binary size, but drastically improves CPU pipeline speed by removing branching.']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Code generation/index.mdx': `---
title: Code Generation
description: The final phase of a compiler that converts the optimized intermediate representation into the target machine code or bytecode.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Code Generation">

Once the compiler has Lexed, Parsed, Analyzed, and mathematically Optimized the code, it must translate that abstract mathematical structure into the brutal reality of physical silicon.

The **Code Generator** translates the Intermediate Representation (IR) into the target language—whether that is x86 Assembly for an Intel CPU, ARM64 Assembly for an Apple Silicon chip, or WebAssembly for a browser.

<Callout icon="warning" title="Register Allocation">
  The hardest mathematical problem in Code Generation is **Register Allocation**. A CPU only has a tiny number of ultra-fast physical memory slots (Registers), e.g., 16 on x86-64. If your program uses 100 variables simultaneously, the Code Generator must mathematically calculate which variables get to live in the fast Registers, and which get "spilled" to the slower RAM.
</Callout>

## The Translation Process

Imagine the IR instruction: \`z = x + y\`

The Code Generator must physically map this to the CPU architecture:
1. Load the mathematical value of \`x\` from RAM into physical CPU Register \`R1\`.
2. Load \`y\` from RAM into Register \`R2\`.
3. Issue the physical \`ADD\` electrical instruction to the Arithmetic Logic Unit (ALU), storing the result in \`R3\`.
4. Store \`R3\` back into the RAM address allocated for \`z\`.

*Note: In languages like Java or C#, the Code Generator targets an imaginary CPU (the JVM or CLR), outputting Bytecode instead of physical Assembly.*

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Linking/index.mdx': `---
title: Linking
description: The process of combining multiple compiled object files into a single executable binary.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Linking">

When you compile a massive C++ video game, the compiler does not process the entire 1,000,000 lines of code at once. It mathematically compiles each \`.cpp\` file individually into an isolated binary chunk called an **Object File** (\`.o\` or \`.obj\`).

If \`player.cpp\` calls a mathematical function \`drawScreen()\` which is physically located in \`graphics.cpp\`, the compiler leaves a blank placeholder in the \`player.o\` binary, essentially saying: *"I don't know where this function is in RAM, someone else needs to figure out the memory address later."*

The **Linker** is the final tool in the toolchain. It mathematically stitches all the disparate Object Files together into one final \`.exe\` or \`ELF\` executable.

<Callout icon="info" title="Static vs. Dynamic Linking">
  In **Static Linking**, the linker physically copies the mathematical code of the standard library (like \`printf\`) directly into your \`.exe\`, making it massive but portable. In **Dynamic Linking**, the \`.exe\` just contains a mathematical pointer to a shared library file (\`.dll\` on Windows, \`.so\` on Linux) that the Operating System will load into RAM at runtime.
</Callout>

## The Linker's Mathematical Job

1. **Symbol Resolution:** It matches every undefined function call in File A to the actual mathematical definition of that function in File B. If it can't find it, it throws the infamous \`Undefined Reference to Symbol\` Linker Error.
2. **Relocation:** It mathematically shifts the memory addresses of the compiled code so that File B perfectly aligns after File A in the final contiguous binary file.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Interpreters/index.mdx': `---
title: Interpreters
description: A computer program that directly executes instructions written in a programming or scripting language, without requiring them previously to have been compiled into a machine language program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interpreters">

A **Compiler** translates your entire source code into mathematical CPU instructions (a binary \`.exe\`) *before* the user ever runs it. 

An **Interpreter** translates and executes the source code mathematically *line-by-line, while the program is actually running*.

Languages like Python, Ruby, and JavaScript are historically Interpreted. Languages like C, C++, and Rust are Compiled.

<Callout icon="warning" title="The Performance Penalty">
  Because an Interpreter must physically run the Lexer, Parser, and execution logic *while* the user is waiting, interpreted languages are mathematically 10x to 100x slower than compiled languages.
</Callout>

## The Evolution of Execution

1. **Pure Tree-Walk Interpreters:** The oldest and slowest mathematical method. The interpreter builds the Abstract Syntax Tree (AST), and then recursively walks the tree, executing C++ code for every node it touches.
2. **Bytecode Interpreters:** Python uses this. It compiles the code into an intermediate mathematical bytecode (e.g., \`.pyc\` files) and then runs a virtual machine (a massive \`switch\` statement) to execute the bytecode. It is faster than Tree-Walking.
3. **Just-In-Time (JIT) Compilers:** The modern miracle behind JavaScript (V8 Engine). It starts by interpreting the bytecode. But if it mathematically detects a \`for\` loop running 10,000 times, it pauses, instantly compiles that specific loop into ultra-fast physical Machine Code, and swaps it out. JIT achieves near-native C++ speeds in interpreted languages.

</ConceptTemplate>
`,
}

async function generateMega76() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega76().catch(console.error)
