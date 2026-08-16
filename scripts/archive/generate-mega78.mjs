import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '44. Compilers, Interpreters & Theory of Computation/44.1 Compilers/Clang/index.mdx': `---
title: Clang
description: A compiler front end for the C, C++, Objective-C, and Objective-C++ programming languages, as well as the OpenMP, OpenCL, RenderScript, SYCL, and CUDA frameworks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Clang"
  subtitle="The modern, modular C++ compiler"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Clang_logo.svg/512px-Clang_logo.svg.png"
  description="Clang is the official C, C++, and Objective-C Front-End for the LLVM compiler infrastructure. Originally built by Apple to replace GCC, it is now the default compiler on macOS and FreeBSD, and heavily used at Google."
  yearCreated={2007}
  creator="Chris Lattner (Apple)"
  isOpenSource={true}
  websiteUrl="https://clang.llvm.org/"
>

For 20 years, GCC held a mathematical monopoly over C/C++ compilation. However, GCC's monolithic architecture made it impossible to use its internal parser to build IDE tools (like autocompletion or static analysis).

Apple created **Clang** specifically to solve this. Clang is designed as a set of highly modular, mathematically strict C++ libraries.

<Callout icon="success" title="World-Class Diagnostics">
  Because Clang retains the exact mathematical structure of the original source code in its AST (unlike GCC, which historically stripped it early), Clang became famous for producing highly human-readable error messages. If you miss a semicolon, Clang doesn't just crash; it mathematically points to the exact column in the code where the semicolon should be.
</Callout>

## The Clang Ecosystem

Because Clang is a library, the C++ ecosystem exploded with powerful tools mathematically built on top of its parser:
- **Clangd:** A Language Server (LSP) that provides flawless C++ autocomplete in VS Code.
- **Clang-Tidy:** A world-class linter that mathematically proves logic errors in C++ code.
- **Clang-Format:** The absolute industry standard for mathematically formatting C++ source files.

</TechnologyTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Finite automata/index.mdx': `---
title: Finite Automata (DFA & NFA)
description: A mathematical model of computation consisting of a finite number of states, transitions between those states, and actions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Finite Automata (DFA & NFA)">

A **Finite Automaton** (or Finite State Machine) is the simplest mathematical model of a computer. It has no physical RAM, no hard drive, and no memory of the past (other than the single "State" it is currently in).

It is mathematically defined by exactly 5 things:
1. A finite set of **States**.
2. A finite set of input symbols (the **Alphabet**).
3. A starting state.
4. A set of mathematical **Transitions** (if in State A and input is \`1\`, go to State B).
5. A set of "Accepting" (or success) states.

<Callout icon="info" title="The Limit of Power">
  Because a Finite Automaton has zero memory, it is mathematically impossible for it to count. A Finite Automaton cannot solve the problem: *"Ensure there are an equal number of opening and closing parentheses in this code."*
</Callout>

## DFA vs NFA

<ComparisonTable 
  headers={['Type', 'Mathematical Definition', 'Implication']}
  rows={[
    ['DFA (Deterministic)', 'For every state and every possible input symbol, there is mathematically exactly ONE transition path.', 'Extremely fast to execute in software (e.g., Lexers in compilers). Every string follows a single, predictable path.'],
    ['NFA (Non-Deterministic)', 'For a given state and input, there might be ZERO transitions, or MULTIPLE transitions. The machine mathematically "guesses" which path to take.', 'In software, an NFA must mathematically simulate exploring multiple branches simultaneously (using backtracking), making it slower.'],
    ['Equivalence Theorem', 'Any NFA can be mathematically converted into a DFA.', 'While NFAs are easier for humans to design (like writing Regex), compilers always convert them to DFAs under the hood for maximum execution speed.']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Pushdown automata/index.mdx': `---
title: Pushdown Automata
description: A type of automaton that employs a stack data structure to recognize context-free languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pushdown Automata">

A Finite Automaton is mathematically weak because it has no memory. It cannot count. 

A **Pushdown Automaton (PDA)** is mathematically created by taking a Finite Automaton and giving it exactly one infinite strip of memory: a **Stack**. 

<Callout icon="success" title="The Power to Count">
  With a Stack, a computer can mathematically solve the parentheses problem! When it reads an \`(\`, it pushes a token onto the Stack. When it reads a \`)\`, it pops a token off. If the string ends and the Stack is empty, the parentheses are perfectly balanced.
</Callout>

## Mathematical Mechanics

At any given moment, a PDA mathematically decides its next move based on three things:
1. Its current **State**.
2. The current **Input Symbol** being read.
3. The symbol currently at the **Top of the Stack**.

This mathematical architecture is exactly how **Parsers** in modern compilers (like GCC or V8) process nested code blocks (e.g., \`if\` statements inside \`while\` loops inside \`functions\`). Every programming language on Earth is mathematically designed to be parsed by a Pushdown Automaton.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Regular languages/index.mdx': `---
title: Regular Languages
description: A formal language that can be expressed using a regular expression, or mathematically generated by a regular grammar.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Regular Languages">

In the mathematical hierarchy of formal languages (the Chomsky Hierarchy), **Regular Languages** are the weakest and simplest class of languages.

A language is mathematically "Regular" if and only if it can be perfectly processed by a **Finite Automaton** (a machine with zero memory).

<Callout icon="warning" title="The Regex Trap">
  Software engineers use Regular Expressions (Regex) every day. But mathematically, you cannot parse HTML using a Regular Expression. HTML allows infinite nesting (\`<div><div>...</div></div>\`). Because Regular Languages have no memory, they mathematically cannot track the depth of nesting.
</Callout>

## Real-World Applications

Even though they are mathematically weak, Regular Languages are incredibly useful because they execute at blazing speeds (using DFAs).

They are used exclusively for **Lexical Analysis**. When a compiler groups raw characters into tokens (e.g., recognizing that \`123.45\` is a Number, or that \`return\` is a Keyword), it mathematically uses Regular Languages.

*Note: Modern PCRE (Perl Compatible Regular Expressions) in languages like Python or JS have mathematically "cheated" by adding features like backreferences. Therefore, modern software Regex is actually mathematically more powerful than true academic "Regular Languages".*

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Context-free grammars/index.mdx': `---
title: Context-Free Grammars
description: A formal grammar in which every production rule is of the form A → α, where A is a single nonterminal symbol and α is a string of terminals and/or nonterminals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Context-Free Grammars (CFG)">

A level above Regular Languages in the mathematical Chomsky Hierarchy lies the **Context-Free Grammar (CFG)**.

A CFG is a set of recursive mathematical rules that completely define a language. It is called "Context-Free" because the rules apply universally, regardless of the surrounding context. 

If a rule states that a \`String\` is a valid \`Expression\`, then a \`String\` is mathematically valid anywhere an \`Expression\` is allowed, period.

<Callout icon="tip" title="The Language of Parsers">
  Almost every programming language (C, Java, Python) is mathematically defined using a Context-Free Grammar. This is why we can write Parsers (Pushdown Automata) to mathematically construct Abstract Syntax Trees from source code.
</Callout>

## Anatomy of a CFG

A CFG is mathematically defined by four components:
1. **Terminals:** The literal characters or tokens (e.g., \`if\`, \`+\`, \`123\`).
2. **Non-Terminals:** Abstract placeholders that can be replaced (e.g., \`Expression\`, \`Statement\`).
3. **Production Rules:** The mathematical mapping (e.g., \`Expression -> Expression + Expression\`).
4. **Start Symbol:** The single Non-Terminal that represents the entire program.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Turing machines/index.mdx': `---
title: Turing Machines
description: A mathematical model of computation that defines an abstract machine which manipulates symbols on a strip of tape according to a table of rules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Turing Machines">

Invented by Alan Turing in 1936, the **Turing Machine** is the absolute pinnacle of the theoretical computer. 

It mathematically consists of:
1. A **State Machine** (the CPU).
2. An **Infinite Tape** divided into discrete cells (the infinite RAM/Hard Drive).
3. A **Read/Write Head** that can move left or right along the tape.

<Callout icon="success" title="The Ultimate Limit">
  A Turing Machine is mathematically capable of simulating the execution logic of ANY computer algorithm in the universe. If a mathematical problem cannot be solved by a Turing Machine, it cannot be solved by an Intel Core i9, an Apple M3, or a massive supercomputer cluster. 
</Callout>

## Turing Completeness

A programming language or system is mathematically deemed **"Turing Complete"** if it is theoretically capable of simulating a Turing Machine.

- **Turing Complete:** C++, Python, JavaScript, Java. (They can theoretically calculate anything, given infinite time and RAM).
- **Accidentally Turing Complete:** Excel Spreadsheets, CSS3 (using complex animations), Magic: The Gathering (the card game).
- **NOT Turing Complete:** Standard HTML, Standard Regular Expressions. (They are mathematically incapable of infinite arbitrary logic).

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Church-Turing thesis/index.mdx': `---
title: Church-Turing Thesis
description: A hypothesis about the nature of computable functions, stating that a function on the natural numbers can be calculated by an effective method if and only if it is computable by a Turing machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Church-Turing Thesis">

In the 1930s, Alonzo Church mathematically defined computation using Lambda Calculus. A few months later, Alan Turing mathematically defined computation using a mechanical tape machine (the Turing Machine).

They both proved that their completely different mathematical systems had the exact same limits. 

The **Church-Turing Thesis** fundamentally asserts that *any real-world mathematical calculation that can be performed by any mechanical or biological process can be perfectly simulated by a Turing Machine.*

<Callout icon="info" title="A Thesis, Not a Proof">
  It is called a "Thesis" (or hypothesis) because you mathematically cannot prove it. To prove it, you would have to discover every possible algorithm in the universe and verify a Turing Machine can run it. However, in 90 years, no one has ever found a mechanical algorithm that a Turing Machine cannot simulate.
</Callout>

## Implications for Software Engineering

This thesis is why software engineers don't care about the physical hardware when designing algorithms. 

Because of the Church-Turing Thesis, we mathematically know that a Python script running on a $5 Raspberry Pi can compute the exact same algorithms as a $50,000 AWS GPU cluster. The GPU cluster is just physically faster; mathematically, their power is identical.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Computability/index.mdx': `---
title: Computability
description: The branch of the theory of computation that studies which problems are computationally solvable using different models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computability">

**Computability Theory** is the mathematical study of the absolute limits of software. It asks a profound question: *"Are there mathematical problems that computers simply cannot solve, even with infinite time and infinite RAM?"*

The shocking mathematical answer is: **Yes. Most mathematical problems are uncomputable.**

<Callout icon="error" title="The Cantor Diagonalization Reality">
  Mathematically, the number of possible computer programs is Countably Infinite (like the set of integers: 1, 2, 3...). However, the number of possible mathematical problems is Uncountably Infinite (like the set of real numbers). Because Uncountable sets are mathematically vastly larger than Countable sets, there are simply not enough computer programs in existence to solve every problem.
</Callout>

## Computable vs. Uncomputable

<ComparisonTable 
  headers={['Classification', 'Definition', 'Example']}
  rows={[
    ['Computable', 'A Turing Machine can mathematically guarantee an answer in a finite amount of time.', 'Sorting a list of 1 billion numbers. It might take a long time, but it is mathematically guaranteed to finish.'],
    ['Uncomputable', 'It is mathematically impossible to write a computer program that can solve the problem for all possible inputs.', 'Writing a script that analyzes other code to see if it has an infinite loop (The Halting Problem).']
  ]}
/>

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Halting problem/index.mdx': `---
title: Halting Problem
description: The problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running, or continue to run forever.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Halting Problem">

The **Halting Problem**, proved by Alan Turing in 1936, is the most famous uncomputable problem in Computer Science.

It asks: *"Can you write a compiler tool (let's call it \`doesItHalt(code)\`) that reads the source code of another program, mathematically analyzes it, and returns \`true\` if the code will eventually finish, or \`false\` if it contains an infinite loop?"*

Turing mathematically proved that such a tool is **impossible to build**.

<Callout icon="warning" title="The Paradox Proof">
  Turing proved it using a paradox. Imagine you successfully built \`doesItHalt()\`. 
  
  I write a malicious program called \`Paradox\`:
  \`\`\`javascript
  function Paradox() {
    if ( doesItHalt(Paradox) == true ) {
       while(true) {} // trigger an infinite loop!
    } else {
       return; // halt immediately!
    }
  }
  \`\`\`
  If your tool says my code *will* halt, my code intentionally loops forever. If your tool says my code *will loop forever*, my code intentionally halts. Your tool is mathematically forced to be wrong 100% of the time.
</Callout>

## Engineering Impact

Because of the Halting Problem, it is mathematically impossible to write a perfect Static Analyzer (like ESLint). We cannot mathematically prove if a piece of code is perfectly safe, free of deadlocks, or free of infinite loops without actually running it.

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Decidability/index.mdx': `---
title: Decidability
description: The property of a formal system or logical problem wherein there exists an effective method for determining whether a given formula is a theorem of the system or whether the problem has a solution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Decidability">

In Computability Theory, a problem is mathematically considered **Decidable** if it is possible to construct a Turing Machine that will always halt and return a correct YES or NO answer for every single possible input.

If a problem might cause the Turing Machine to loop forever without ever finding the answer, the problem is mathematically **Undecidable**.

<Callout icon="info" title="The Subset Relationship">
  The Halting Problem is the most famous example of an Undecidable problem. Alan Turing proved that no algorithm can reliably output YES or NO for every possible input program.
</Callout>

## Semi-Decidability

There is a mathematical grey area called **Semi-Decidability** (or Turing-Recognizability).

For a Semi-Decidable problem:
- If the true answer is YES, the computer will mathematically find it and halt.
- If the true answer is NO, the computer might mathematically loop forever, fruitlessly searching for a YES that doesn't exist. You will never know if the answer is actually NO, or if the computer just needs more time.

*Example: "Does the number 7 exist in the digits of Pi?" We can write a program to search Pi. If it finds a 7, it halts (YES). If Pi didn't contain a 7, our program would loop until the universe died.*

</ConceptTemplate>
`,
  '44. Compilers, Interpreters & Theory of Computation/44.2 Theory of Computation/Complexity theory/index.mdx': `---
title: Computational Complexity Theory
description: The branch of the theory of computation that focuses on classifying computational problems according to their resource usage (time and space).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computational Complexity Theory">

Computability Theory asks: *"Can this mathematical problem be solved at all?"*

**Complexity Theory** accepts that a problem can be solved, and instead asks: *"Is the universe going to die of heat death before the computer finishes the calculation?"*

Complexity Theory classifies algorithms mathematically based on how the required execution Time (or RAM) scales as the size of the input (\`n\`) grows. This is the foundation of **Big-O Notation**.

<Callout icon="error" title="P vs NP">
  The Millennium Prize Problem "P vs NP" is the most important unsolved problem in theoretical computer science. 
  - **P:** Problems a computer can *solve* quickly (e.g., sorting an array).
  - **NP:** Problems a computer can *verify* quickly, but might take billions of years to *solve* (e.g., decrypting an AES-256 password).
  
  If someone mathematically proves P = NP, it means every encryption algorithm on Earth can be instantly broken.
</Callout>

## Mathematical Complexity Classes

<ComparisonTable 
  headers={['Class', 'Mathematical Definition', 'Examples']}
  rows={[
    ['P (Polynomial Time)', 'Algorithms that scale mathematically in \`O(n^k)\`. They are considered "fast" and efficiently solvable by modern computers.', 'Sorting algorithms, Shortest Path (Dijkstra), Hash Map lookups.'],
    ['NP (Nondeterministic Polynomial)', 'If you are mathematically handed the correct answer, you can *verify* it is correct in Polynomial Time (\`P\`).', 'Sudoku. Solving a massive Sudoku board is brutally hard. But if someone hands you the completed board, verifying no numbers repeat takes 2 seconds.'],
    ['NP-Complete', 'The mathematically hardest problems in \`NP\`. If you find a fast algorithm for one NP-Complete problem, you instantly solve ALL of them.', 'The Traveling Salesperson Problem, Knapsack Problem, Boolean Satisfiability (SAT).']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega78() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega78().catch(console.error)
