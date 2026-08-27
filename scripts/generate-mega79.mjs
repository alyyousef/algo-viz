import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/BNF-EBNF/index.mdx': `---
title: BNF and EBNF
description: The formal mathematical metasyntaxes used to unambiguously define the grammar and rules of programming languages, network protocols, and data formats.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BNF and EBNF">

How does a compiler know what a valid TICK1ifTICK1 statement looks like? It does not use regular expressions. It uses Backus-Naur Form (BNF) or Extended BNF (EBNF), mathematically rigorous grammar definition languages.

## 1. Terminals and Non-Terminals
A BNF grammar consists of mathematical **Production Rules**.
- **Terminals**: The actual, physical characters in the language (like TICK1"if"TICK1, TICK1"+"TICK1, or TICK1"1"TICK1).
- **Non-Terminals**: Abstract mathematical concepts enclosed in angle brackets (like TICK1<digit>TICK1 or TICK1<statement>TICK1).
A rule mathematically defines a Non-Terminal: TICK1<digit> ::= "0" | "1" | "2"TICK1. The compiler replaces the left side with one of the options on the right side. 

## 2. Recursive Grammars
BNF's absolute mathematical power comes from Recursion. 
You can define an expression like this: 
TICK1<expr> ::= <digit> | <expr> "+" <expr>TICK1
Because TICK1<expr>TICK1 is defined using itself, this single, tiny mathematical rule allows the compiler to perfectly parse an infinitely long addition string (e.g., TICK11+2+3+4+5TICK1). Without mathematical recursion, parsing modern programming languages would be impossible. EBNF simply adds modern syntactical sugar (like TICK1[]TICK1 for optional elements and TICK1{}TICK1 for repetition) to make BNF human-readable.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Category theory basics (functors/index.mdx': `---
title: Category Theory (Functors)
description: A highly abstract branch of mathematics that formalizes the structure and relationships between different mathematical spaces, forming the deep theoretical foundation of Functional Programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Category Theory (Functors)">

Category Theory is the "mathematics of mathematics." In Functional Programming (like Haskell), it provides the absolute theoretical framework for how data and functions interact.

## 1. Categories and Morphisms
In Category Theory, a **Category** consists of "Objects" and "Morphisms" (arrows between objects).
In programming, the Objects are **Types** (like TICK1IntTICK1 or TICK1StringTICK1), and the Morphisms are **Functions** (a function that converts an TICK1IntTICK1 to a TICK1StringTICK1). The fundamental mathematical law is Composition: if you have a function $A \\rightarrow B$ and a function $B \\rightarrow C$, you are mathematically guaranteed to be able to compose them into a new function $A \\rightarrow C$.

## 2. Functors (The Mapping Interface)
A **Functor** is a mathematical mapping between two different Categories that perfectly preserves their structure.
In programming, a Functor is any Type that implements the TICK1map()TICK1 function (like an Array, or a Promise). 
If you have a function that converts an TICK1IntTICK1 to a TICK1StringTICK1, and you have an TICK1Array<Int>TICK1, you cannot pass the Array into the function directly (Type Error). The Functor (Array) mathematically "lifts" the function inside itself, applies it to the internal elements, and returns an TICK1Array<String>TICK1, perfectly preserving the structural geometry of the Array.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Combinatory logic/index.mdx': `---
title: Combinatory Logic
description: A foundational mathematical notation designed to eliminate the need for quantified variables in mathematical logic, heavily influencing the design of functional programming languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Combinatory Logic">

Introduced by Moses Schönfinkel and Haskell Curry, Combinatory Logic was designed to strip mathematics down to its absolute barest, variable-free essence. 

## 1. Eliminating Variables
In standard Lambda Calculus, you define a function using variables: $f(x) = x$. 
Combinatory Logic proves that variables are mathematically unnecessary. It replaces them with a small set of primitive, hardcoded functions called **Combinators**. 
The most famous are $S$, $K$, and $I$. 
- The $I$ combinator is the Identity function: $I x = x$. 
Instead of writing a function that explicitly references the variable $x$, you just mathematically compose standard Combinators together to achieve the exact same computational result.

## 2. SKI Combinator Calculus
Turing proved that the $S$ and $K$ combinators alone are Turing Complete. 
This means that literally any computer program in existence—from a web browser to an operating system—can be mathematically compiled down into an unimaginably massive string containing nothing but the letters $S$ and $K$ and parentheses. While no human writes code in SKI calculus, it provides the mathematical proof that complex variable management in compilers can be systematically eliminated and optimized into pure function application.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Curry-Howard correspondence/index.mdx': `---
title: Curry-Howard Correspondence
description: The profound mathematical discovery proving that writing a computer program and proving a mathematical theorem are exactly the same physical and logical action.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Curry-Howard Correspondence">

The Curry-Howard Isomorphism is one of the most beautiful discoveries in theoretical computer science. It proves a direct, perfect mathematical bridge between Logic and Computation.

## 1. Types are Propositions
In formal logic, you have a Proposition (a statement that is either True or False). In programming, you have a Type (like TICK1StringTICK1). 
Curry-Howard mathematically proves they are identical. A Type is a Proposition. If you write the type signature TICK1A -> BTICK1 (a function that takes A and returns B), it is mathematically identical to the logical implication $A \\implies B$ (If A is true, then B is true).

## 2. Programs are Proofs
If Types are Propositions, what is the actual Code? 
The Code is the mathematical **Proof**. 
If the compiler successfully compiles your function TICK1A -> BTICK1 without throwing a Type Error, you have physically, mathematically proven that the logical statement $A \\implies B$ is True. If your program doesn't compile, your mathematical proof is flawed. This isomorphism birthed advanced proof assistants (like Coq and Agda), where mathematicians write code, and if it compiles, they have unassailably proven highly complex theorems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Denotational semantics/index.mdx': `---
title: Denotational Semantics
description: A highly formal approach to programming language theory that mathematically defines the meaning of a computer program by mapping it directly to rigorous mathematical objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Denotational Semantics">

How do you formally describe what a computer program *means*? Operational Semantics describes the step-by-step state changes of a machine. Denotational Semantics ignores the machine entirely and defines meaning using pure mathematical functions.

## 1. Mapping Syntax to Math
In Denotational Semantics, every piece of syntax in a programming language is assigned a **Denotation** (a strict mathematical object).
If your language has the syntax TICK1x + yTICK1, the semantic theory defines a mapping function (usually denoted by double brackets: $ [[ ]] $). 
$[[ x + y ]] = [[ x ]] +_{math} [[ y ]]$.
This proves that the physical string TICK1"x + y"TICK1 in the source code maps perfectly to the abstract platonic concept of mathematical addition.

## 2. Analyzing Infinite Loops
The hardest part of Denotational Semantics is dealing with TICK1whileTICK1 loops and recursion. How do you mathematically map an infinite loop? 
Scientists use Domain Theory and mathematical Fixed Points (specifically, the Least Fixed Point). They model the loop as an infinite sequence of mathematical approximations. By applying formal limits (like in Calculus), they can mathematically prove the behavior of recursive functions, ensuring the foundational theory of the programming language contains no logical paradoxes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Domain-specific languages (DSLs)/index.mdx': `---
title: Domain-Specific Languages (DSLs)
description: Highly specialized, mathematically constrained programming languages designed to solve problems in one specific industry or domain, prioritizing expressiveness over general-purpose utility.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Domain-Specific Languages (DSLs)">

Java and Python are General-Purpose Languages (GPLs); they are Turing Complete and can theoretically build anything, but their syntax is bloated for specific mathematical tasks. DSLs are custom-built for one exact purpose.

## 1. Internal vs. External DSLs
- **External DSLs**: Languages that have their own custom parser and compiler. SQL is the most famous external DSL. You cannot build a web server in SQL, but its syntax is mathematically perfected for querying relational data. HTML and CSS are also external DSLs.
- **Internal DSLs**: Languages built entirely within the syntax of an existing host language. Ruby is famous for this. Frameworks like RSpec allow you to write TICK1expect(user).to be_validTICK1. It reads like plain English, but mathematically it is just highly chained Ruby methods acting as a DSL for software testing.

## 2. The Abstraction Trade-off
Building a DSL introduces a strict mathematical trade-off. 
By constraining the language, you prevent the developer from making certain architectural errors (you cannot cause a Memory Leak in SQL). You also allow domain experts (like Accountants or Biologists) to read the code. However, if the business requirements suddenly expand outside the mathematical boundaries of the DSL, developers hit a catastrophic wall, forcing them to either abandon the DSL or write horrific, hacky extensions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Formal grammars/index.mdx': `---
title: Formal Grammars
description: The absolute mathematical rules defining which sequences of characters are valid in a language, categorized by Noam Chomsky into a strict hierarchy of computational complexity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Formal Grammars">

A language is just an infinite set of valid strings. A Formal Grammar is the finite set of mathematical rules (Productions) that generates all of those valid strings, and instantly rejects any invalid string (Syntax Errors).

## 1. The Chomsky Hierarchy
In 1956, Noam Chomsky mathematically proved that all grammars exist in a strict hierarchy of four levels, dictating the complexity of the machine required to parse them:
- **Type 3 (Regular Grammars)**: The weakest. Can be parsed by a simple State Machine. Used for Regex (e.g., validating an email address).
- **Type 2 (Context-Free Grammars)**: Can be parsed by a Pushdown Automaton (a machine with a Stack). This is the mathematical foundation of almost all modern programming languages (parsed via BNF/EBNF).
- **Type 1 (Context-Sensitive)**: Requires a Turing machine with bounded memory.
- **Type 0 (Recursively Enumerable)**: The absolute peak. Any language that can be computed by a Turing Machine.

## 2. The HTML Regex Fallacy
This mathematical hierarchy explains a famous programming paradox: *You cannot parse HTML with Regular Expressions.*
Regex is mathematically locked to Type 3 (Regular Grammars). HTML allows infinitely nested tags (e.g., TICK1<div><div></div></div>TICK1), which requires a mathematical memory Stack to keep track of the nesting depth. Therefore, HTML is mathematically a Type 2 (Context-Free) grammar. Attempting to parse Type 2 structures with a Type 3 Regex engine guarantees eventual, catastrophic mathematical failure.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Lambda calculus/index.mdx': `---
title: Lambda Calculus
description: The absolute mathematical bedrock of computer science, invented by Alonzo Church in the 1930s, proving that all computation can be expressed purely through anonymous functions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lambda Calculus">

In 1936, Alan Turing invented the Turing Machine (an imaginary physical tape drive) to define what computation is. Simultaneously, Alonzo Church invented Lambda Calculus (a pure mathematical equation) to define the exact same thing. They are mathematically identical.

## 1. The Three Rules
Lambda Calculus is shockingly simple, consisting of only three mathematical rules:
1. **Variables**: $x, y, z$
2. **Abstraction (Function Definition)**: $\\lambda x. M$ (A function that takes an argument $x$, and returns the expression $M$).
3. **Application (Function Call)**: $M N$ (Apply function $M$ to argument $N$).
There are no numbers, no booleans, no TICK1ifTICK1 statements, and no loops. Everything must be built out of pure functions.

## 2. Church Encoding
How do you write TICK1if(true)TICK1 without booleans? You use **Church Encoding**.
Church mathematically defined TICK1TrueTICK1 as a function that takes two arguments and always returns the first: $\\lambda x. \\lambda y. x$.
He defined TICK1FalseTICK1 as a function that returns the second: $\\lambda x. \\lambda y. y$.
By passing different functions into each other (Higher-Order Functions), Church mathematically proved you can build full arithmetic and branching logic using absolutely nothing but pure, anonymous functions. This is the origin of all Functional Programming (Lisp, Haskell).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Language interoperability (FFI)/index.mdx': `---
title: Foreign Function Interface (FFI)
description: The highly complex, low-level mathematical bridge that allows code written in a high-level language to directly execute machine code compiled from a different language (usually C).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Language Interoperability (FFI)">

Python is mathematically incredibly slow. To achieve high performance in AI, Python must call libraries written in C++ (like TensorFlow). It does this using a Foreign Function Interface (FFI).

## 1. The C ABI (Application Binary Interface)
To cross language boundaries, you cannot pass Java Objects to Rust; the memory layouts are mathematically completely different. 
Instead, almost all languages use the **C ABI** as the universal mathematical lingua franca. The C ABI strictly defines exactly how memory is laid out and exactly which CPU registers hold which arguments. 
If Python wants to call Rust, the Rust compiler mathematically strips away all of Rust's advanced types and exposes a raw, C-compatible memory pointer. Python uses FFI to bind to that raw pointer and execute the machine code.

## 2. The Cost of Crossing the Boundary
FFI is not free. When Python calls a C function, the CPU must mathematically halt, perform a Context Switch, marshal the data (convert Python's memory layout into C's memory layout), execute the C code, and marshal the result back. 
If you use FFI to call a massive matrix multiplication, the math is 1,000x faster, making the FFI overhead irrelevant. But if you write a TICK1forTICK1 loop in Python that calls a C function 1 million times, the FFI marshaling overhead will mathematically cause the program to run vastly slower than if you had just written the math in pure Python.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/monads/index.mdx': `---
title: Monads
description: A mathematically rigorous design pattern from Category Theory that wraps side-effects (like I/O or state changes) into pure, chainable computational sequences.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monads">

A famous joke states: *"A monad is just a monoid in the category of endofunctors, what's the problem?"* In reality, Monads are a mathematical solution to the biggest flaw in Functional Programming: Side Effects.

## 1. The Pure Function Problem
In pure Functional Programming (Haskell), functions must be mathematically pure: $f(x)$ must always return the exact same output, and it cannot mutate the outside world.
But real software *must* mutate the world (write to databases, print to screens, read user input). How do you do this without breaking the pure mathematics? You use a Monad.

## 2. The Wrapper (Bind and Return)
A Monad is essentially a mathematical Box.
Instead of a function writing to the database directly, it returns an TICK1IO MonadTICK1 (a Box containing a set of instructions). Because it just returns a Box, the function remains mathematically pure.
The magic is the **Bind** operator (TICK1>>=TICK1). Bind allows you to mathematically chain these Boxes together. You pass the output of Box A into Box B. The Haskell compiler gathers this massive chain of Monads, and at the very end of the program, the Runtime Engine physically executes the Box, safely decoupling the dirty real-world I/O from the pure, provable mathematics of the application logic. (In JavaScript, Promises are the most common example of Monadic architecture).

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
