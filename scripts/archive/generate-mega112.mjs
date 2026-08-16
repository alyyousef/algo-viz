import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '57. Formal Methods & Verification/Formal verification/index.mdx': `---
title: Formal verification
description: The act of proving or disproving the correctness of intended algorithms underlying a system with respect to a certain formal specification or property, using formal methods of mathematics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Formal Verification">

In standard software engineering, we use Unit Tests. A Unit Test biologically proves that the code works for *one specific input*. 

If you are programming the autopilot software for a Boeing 737, testing 10,000 inputs is mathematically insufficient, because the 10,001st input might crash the plane.

<Callout icon="success" title="Mathematical Certainty">
  **Formal Verification** abandons testing entirely. 
  
  Instead of running the code, it treats the code as a mathematical theorem. Using pure logic, it mathematically proves that the software is 100% correct for *every single possible infinite input* in the universe. If the proof compiles, it is physically impossible for the software to contain a bug related to that specification.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Hoare logic/index.mdx': `---
title: Hoare logic
description: A formal system with a set of logical rules for reasoning rigorously about the correctness of computer programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hoare Logic">

Invented by Tony Hoare in 1969, **Hoare Logic** is the foundational mathematics that makes Formal Verification possible.

<Callout icon="info" title="The Hoare Triple">
  It operates on the mathematical concept of the **Hoare Triple**: \`{P} C {Q}\`.
  
  - **P (Precondition)**: The mathematical state of the world *before* the code runs (e.g., \`x > 0\`).
  - **C (Command)**: The actual code (e.g., \`y = x * 2\`).
  - **Q (Postcondition)**: The mathematical state of the world *after* the code runs (e.g., \`y > 0\`).
  
  By chaining thousands of these triples together, a computer can mathematically trace the logic of an entire application from start to finish, proving that if P is true, Q will *always* biologically be true.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Design by contract/index.mdx': `---
title: Design by contract
description: A software correctness methodology that uses preconditions and postconditions to document the change in state caused by a piece of a program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Design by Contract (DbC)">

**Design by Contract** takes the mathematical theory of Hoare Logic and embeds it directly into biological programming languages (like Eiffel or Ada).

<Callout icon="tip" title="Enforceable Promises">
  When writing a function, the developer writes a strict, mathematical **Contract**.
  
  They explicitly define the \`require\` (Precondition) and the \`ensure\` (Postcondition). If another developer calls the function but violates the \`require\` condition, the program mathematically refuses to compile or violently throws an exception immediately. It enforces biological accountability—the function guarantees exactly what it will do, but only if you provide exactly what it asks for.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Static program verification/index.mdx': `---
title: Static program verification
description: The process of verifying code properties without executing the program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static Program Verification">

Modern TypeScript or Rust compilers perform a lightweight version of this, but true **Static Program Verification** goes much deeper than checking if a variable is a \`string\`.

<Callout icon="success" title="Automated Logic Checking">
  Static verifiers mathematically read the source code and convert the entire control flow into mathematical formulas. 
  
  They then feed these formulas into a solver. The solver mathematically proves that certain catastrophic biological events (like a Null Pointer Dereference, a Buffer Overflow, or an Array Out Of Bounds error) can *never* occur, regardless of what input the user types into the keyboard.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/SAT solvers/index.mdx': `---
title: SAT solvers
description: A program that solves the Boolean satisfiability problem, determining if there exists an interpretation that satisfies a given Boolean formula.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SAT Solvers">

At the absolute bottom of computer science is the **Boolean Satisfiability Problem (SAT)**.

You are given a massive mathematical formula consisting of thousands of \`AND\`, \`OR\`, and \`NOT\` gates. The question is: *Is there any possible combination of True/False inputs that makes the final output True?*

<Callout icon="warning" title="The NP-Complete Engine">
  SAT is the defining NP-Complete problem. It is mathematically terrifying because the number of combinations grows exponentially.
  
  However, modern **SAT Solvers** (like MiniSat) use brilliant biological heuristics to solve formulas with millions of variables in seconds. These solvers are the hidden mathematical engines that power modern package managers (like \`npm\` or \`cargo\`) to resolve dependency version conflicts, and are used to verify the physical silicon logic gates in Intel CPUs.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/SMT solvers/index.mdx': `---
title: SMT solvers
description: Satisfiability Modulo Theories solvers determine whether a mathematical formula is satisfiable, extending SAT solvers to include theories like integers, real numbers, and arrays.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SMT Solvers">

A SAT solver mathematically only understands \`True\` and \`False\`. If your software uses numbers (like \`x + y > 10\`), a SAT solver is biologically useless.

<Callout icon="success" title="Z3 and the Infinite Numbers">
  **SMT (Satisfiability Modulo Theories)** solvers extend SAT solvers to understand complex mathematics: integers, real numbers, bit-vectors, and arrays.
  
  The most famous is **Z3**, built by Microsoft Research. You can feed Z3 a terrifying piece of C++ code, and ask: *"Is there any possible integer X that causes this function to return a negative number?"* Z3 will mathematically rip apart the universe of integers and either return \`UNSAT\` (proving the code is safe), or return \`SAT: X = 42\`, providing you the exact input that triggers the bug.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Model checking/index.mdx': `---
title: Model checking
description: An automated technique that, given a finite-state model of a system and a formal property, systematically checks whether this property holds for a given state in that model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Checking">

If you write a concurrent, multi-threaded application, biological Unit Testing is impossible. A race condition bug might only occur if Thread 1 pauses for exactly 3 milliseconds while Thread 2 writes to the database.

<Callout icon="warning" title="State Space Explosion">
  **Model Checking** mathematically explores the application.
  
  It generates a massive state machine of every possible state the program could ever enter. It mathematically forces Thread 1 and Thread 2 to interleave in every possible microscopic combination. If even one of those billions of combinations leads to a Deadlock, the Model Checker finds it. The mathematical challenge is the "State Space Explosion"—complex programs have more states than atoms in the universe, requiring massive RAM to verify.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Software model checkers/index.mdx': `---
title: Software model checkers
description: Tools that apply model checking techniques directly to software source code (e.g., C, Java) rather than abstract mathematical models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Model Checkers">

Historically, Model Checking required you to mathematically translate your software into a weird, abstract mathematical language first.

**Software Model Checkers** (like CBMC or Java Pathfinder) changed the industry.

<Callout icon="tip" title="Direct Code Verification">
  They directly ingest raw, biological C++ or Java source code. 
  
  They mathematically unravel the \`while\` loops and \`if\` statements, translating them directly into SAT/SMT formulas. NASA uses these tools extensively. Before the Mars Rover is launched, the exact C code running the landing sequence is fed into a Software Model Checker to mathematically guarantee it will not crash due to a null pointer.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Theorem proving/index.mdx': `---
title: Theorem proving
description: The process of finding a proof of a mathematical theorem using a computer program.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Theorem Proving">

Model Checkers are completely automated, but they mathematically fail if the program has infinite states (they run out of RAM).

**Theorem Proving** is not automated. It is a biological partnership between a human mathematician and a computer.

<Callout icon="info" title="Interactive Mathematics">
  The human writes the software, and then manually writes the mathematical proof that the software is correct. The computer acts as a relentless, unforgiving judge that checks the logic of the proof step-by-step. It requires PhD-level mathematical skill, but it can mathematically verify infinitely complex systems that Model Checkers cannot handle, such as entire Operating System kernels.
</Callout>

</ConceptTemplate>
`,
  '57. Formal Methods & Verification/Coq/index.mdx': `---
title: Coq
description: An interactive theorem prover that allows the expression of mathematical assertions, mechanically checks proofs of these assertions, helps to find formal proofs, and extracts a certified program from the constructive proof of its formal specification.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Coq"
  subtitle="The French Theorem Prover"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coq_Logo.svg/512px-Coq_Logo.svg.png"
  description="Coq is an interactive theorem prover mathematically famous for verifying the CompCert C compiler, proving that the compiler itself has absolutely zero translation bugs."
  yearCreated={1989}
  creator="INRIA"
  isOpenSource={true}
  websiteUrl="https://coq.inria.fr/"
>

Writing code in Coq is not standard software engineering. You are mathematically writing the Calculus of Inductive Constructions.

When you finish writing a function in Coq, and successfully write the mathematical proof that it works, Coq biologically performs "Code Extraction". It mathematically translates your perfect, bug-free proof directly into running OCaml or Haskell code. The resulting software is mathematically certified to be flawless.

</TechnologyTemplate>
`,
  '57. Formal Methods & Verification/Isabelle/index.mdx': `---
title: Isabelle
description: A generic proof assistant. It allows mathematical formulas to be expressed in a formal language and provides tools for proving those formulas in a logical calculus.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Isabelle / HOL"
  subtitle="The Higher-Order Logic Prover"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Isabelle_logo.svg/512px-Isabelle_logo.svg.png"
  description="Isabelle is Coq's primary biological rival, highly favored in academia and used to mathematically verify the seL4 microkernel."
  yearCreated={1986}
  creator="Lawrence Paulson"
  isOpenSource={true}
  websiteUrl="https://isabelle.in.tum.de/"
>

The crowning achievement of Isabelle was the mathematical verification of **seL4**. 

seL4 is an operating system microkernel. Using Isabelle, mathematicians proved that the 10,000 lines of C code running the OS contain absolutely zero buffer overflows, zero memory leaks, and mathematically cannot crash. It is the most biologically secure piece of software on Earth, completely immune to standard hacking techniques.

</TechnologyTemplate>
`,
  '57. Formal Methods & Verification/Lean/index.mdx': `---
title: Lean
description: A functional programming language and theorem prover aimed at mathematical formalization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Lean"
  subtitle="The Modern Mathematician's Prover"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Lean_logo.svg/512px-Lean_logo.svg.png"
  description="Lean is a modern, rapidly growing theorem prover mathematically designed to be highly accessible to standard mathematicians, backed by Microsoft Research."
  yearCreated={2013}
  creator="Leonardo de Moura"
  isOpenSource={true}
  websiteUrl="https://leanprover.github.io/"
>

While Coq and Isabelle are biologically ancient and difficult to use, Lean is incredibly modern.

It has massive momentum in the pure mathematics community. The **mathlib** project is currently using Lean to mathematically digitize and verify all known human mathematics. If a mathematician claims to have solved a famous unsolved problem, the new standard is to write the proof in Lean; if Lean compiles it, the proof is mathematically absolute and the debate is instantly over.

</TechnologyTemplate>
`,
  '57. Formal Methods & Verification/TLA+/index.mdx': `---
title: TLA+
description: A formal specification language developed by Leslie Lamport to design, model, document, and verify concurrent systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="TLA+"
  subtitle="The Logic of Time and Action"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tla-logo.svg/512px-Tla-logo.svg.png"
  description="Invented by Turing Award winner Leslie Lamport, TLA+ is the mathematical industry standard for verifying massive, distributed cloud systems."
  yearCreated={1999}
  creator="Leslie Lamport"
  isOpenSource={true}
  websiteUrl="https://lamport.azurewebsites.net/tla/tla.html"
>

TLA+ is biologically heavily used by Amazon Web Services (AWS) to verify S3 and DynamoDB.

You do not write C++ in TLA+. You write mathematical formulas that describe the *architecture* of your system. You describe how Server A talks to Server B. The TLA+ Model Checker then mathematically explores every single possible network delay, server crash, and dropped packet. It mathematically guarantees that even if 5 data centers catch fire simultaneously, your database will never biologically corrupt user data.

</TechnologyTemplate>
`,
  '57. Formal Methods & Verification/Alloy/index.mdx': `---
title: Alloy
description: A declarative specification language for expressing complex structural constraints and behavior in a software system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Alloy"
  subtitle="Lightweight Relational Modeling"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Alloy_logo.png/512px-Alloy_logo.png"
  description="Alloy is a lightweight formal methods tool mathematically designed by MIT to find logical flaws in software designs before a single line of code is written."
  yearCreated={1997}
  creator="Daniel Jackson (MIT)"
  isOpenSource={true}
  websiteUrl="https://alloytools.org/"
>

While TLA+ is mathematically terrifying and requires months to learn, Alloy is biologically easy.

It uses simple relational logic. If you are designing an Access Control system, you write a short Alloy script detailing the rules (\`Users can belong to Groups\`, \`Only Admins can delete Files\`). You hit a button, and the Alloy Analyzer mathematically attempts to find a loophole where a normal User can delete a File. If it finds one, it biologically draws a visual graph showing you exactly how the exploit works.

</TechnologyTemplate>
`,
}

async function generateMega112() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega112().catch(console.error)
