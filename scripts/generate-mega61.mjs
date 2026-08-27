import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Cairo/index.mdx': `---
title: Cairo
description: A Turing-complete language for writing provable programs on StarkNet, leveraging ZK-Rollup mathematics to scale Ethereum.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cairo">

Developed by StarkWare in 2020, Cairo is not just a smart contract language; it is a mathematically revolutionary programming language designed specifically for **Zero-Knowledge (ZK) Proofs**. 

## 1. Provable Execution
When a smart contract runs on Ethereum (Solidity), all 10,000 nodes on the network must mathematically execute the exact same computation to verify it is correct, which causes massive network congestion and high fees.
Cairo (CPU Algebraic Intermediate Representation) changes the mathematics. 
When a Cairo program executes on StarkNet, it does not just output the answer; it mathematically generates a cryptographic "STARK" proof that the computation was executed correctly. This allows a massive computation (like a decentralized exchange matching engine) to run off-chain, and Ethereum only needs to mathematically verify the tiny proof, scaling the network exponentially.

## 2. A New Mathematical Paradigm
Because Cairo is designed to generate algebraic proofs, its original syntax was heavily constrained by polynomial mathematics (e.g., memory was mathematically immutable; you could not overwrite a variable). However, Cairo 1.0 (released in 2023) completely overhauled the syntax to resemble Rust, making it accessible to standard developers while retaining its mathematically provable properties.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Clarity/index.mdx': `---
title: Clarity
description: A decidable, mathematically predictable smart contract language designed to bring decentralized logic directly to the Bitcoin blockchain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Clarity">

Developed by Stacks and Algorand, Clarity is a smart contract language explicitly designed to interact with Bitcoin. Its defining feature is a rigid, mathematical rejection of Turing completeness.

## 1. Decidability over Completeness
Solidity is Turing-complete. This means you can write a TICK1whileTICK1 loop that runs forever. Because of this, it is mathematically impossible to know exactly what a Solidity contract will do, or how much gas it will cost, until you actually execute it on the network.
Clarity is mathematically **Decidable**. It intentionally removes unbounded loops and recursion. By sacrificing Turing completeness, Clarity mathematically guarantees that developers can analyze the code and know exactly what it will do, and exactly how much it will cost, before it is ever executed.

## 2. Interpreted, Not Compiled
When you deploy a Solidity contract, the compiler translates your readable code into unreadable bytecode, which is what actually lives on the blockchain. If a user wants to audit the contract, they have to trust the compiler wasn't compromised.
Clarity is mathematically interpreted. The exact, human-readable source code you write is the exact text that is permanently etched into the blockchain. There is no compiler, mathematically eliminating a massive vector for software supply-chain attacks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Michelson/index.mdx': `---
title: Michelson
description: The deeply mathematical, stack-based smart contract language of the Tezos blockchain, designed specifically for Formal Verification.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Michelson">

Michelson is the native, low-level smart contract language for the Tezos blockchain. It is heavily inspired by functional programming and is mathematically structured to prevent catastrophic financial hacks.

## 1. Stack-Based Execution
Like Forth or the JVM, Michelson is a stack-based language. There are no variables. You mathematically push data onto a stack, execute an instruction (like TICK1ADDTICK1 or TICK1DUPTICK1), which pops the data off the stack, performs the math, and pushes the result back on.
Because it lacks variables and side-effects, the state of the contract at any given instruction is mathematically pure and explicitly defined by the state of the stack.

## 2. Formal Verification
The Tezos foundation chose Michelson because its mathematical purity makes it ideal for **Formal Verification**. 
In standard testing, you write 100 tests to check 100 possible scenarios. 
In Formal Verification, you use a theorem prover (like Coq) to mathematically prove that a bug (like an integer overflow or a reentrancy attack) is physically impossible to execute under *any* scenario, providing institutional-grade security for billion-dollar DeFi contracts.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Move/index.mdx': `---
title: Move
description: A highly secure, resource-oriented smart contract language originally developed by Facebook for the Diem blockchain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Move">

Originally developed by Facebook (Meta) in 2019 for the ill-fated Diem (Libra) project, Move survived the project's cancellation and is now the native mathematical language for advanced blockchains like Aptos and Sui.

## 1. Resource-Oriented Programming
In Solidity, a token (like a stablecoin) is just an integer in a hash map mapping user addresses to balances. If a bug in the code accidentally adds 10 to a balance without subtracting it elsewhere, money is mathematically printed out of thin air.
Move changes the fundamental mathematics using **Resources**. 
A Resource is a special data type inspired by Linear Logic. If you create a "Token" Resource, the Move compiler mathematically guarantees it can never be copied, cloned, or silently dropped. It can only be mathematically *moved* from one storage location to another.

## 2. Security by Default
By enforcing linear logic, Move mathematically eliminates the most common and devastating smart contract vulnerabilities. Reentrancy attacks (where a hacker repeatedly withdraws funds before the balance updates) and double-spending are physically prevented by the compiler's strict resource rules, making Move one of the safest languages in Web3.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Plutus (Haskell-Cardano)/index.mdx': `---
title: Plutus (Haskell-Cardano)
description: The purely functional, Haskell-based smart contract language driving the Cardano blockchain, utilizing the eUTXO model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Plutus (Haskell-Cardano)">

Plutus is the smart contract language for the Cardano blockchain. It is deeply mathematical because it is essentially a highly customized dialect of **Haskell**, a purely functional programming language.

## 1. The eUTXO Model
Ethereum uses an "Account" model (like a bank account where a global balance goes up and down). Cardano uses the **Extended Unspent Transaction Output (eUTXO)** model (like cash, where you hand a bartender a $20 bill and get a $10 bill back).
Plutus mathematically governs these eUTXOs. A Plutus script is essentially a mathematical lock placed on a piece of digital cash. To spend the cash, a user must submit a transaction that mathematically satisfies the pure functional logic of the Plutus script.

## 2. On-Chain and Off-Chain Unity
Writing a decentralized application usually requires writing Solidity for the blockchain and Javascript for the frontend, causing a massive disconnect in types and logic.
Plutus mathematically solves this. You write both the on-chain logic and the off-chain application logic in the exact same Haskell file. The Plutus compiler mathematically dissects the file, compiling the core logic into Plutus Core (to be stored on the blockchain) and compiling the rest into an executable application, ensuring mathematically perfect type safety across the entire application stack.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Rust (Solana-CosmWasm)/index.mdx': `---
title: Rust (Solana-CosmWasm)
description: The systems programming titan, adopted by high-performance blockchains like Solana and Cosmos to execute lightning-fast smart contracts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rust (Solana-CosmWasm)">

While Ethereum invented specialized languages (Solidity) for its virtual machine, newer "Layer 1" blockchains like Solana and the Cosmos ecosystem (CosmWasm) made a different architectural choice: use **Rust**, a mainstream, high-performance systems language.

## 1. Bare Metal Performance
Solidity runs on the EVM (Ethereum Virtual Machine), which is an isolated, slow, mathematically clunky execution environment. 
Solana requires contracts to execute in fractions of a millisecond to achieve 50,000 transactions per second. Rust compiles directly down to highly optimized eBPF (Extended Berkeley Packet Filter) or WebAssembly (Wasm) bytecode. Because Rust mathematically guarantees memory safety without a garbage collector, the contracts run at bare-metal speeds with absolute determinism.

## 2. The Learning Curve
Writing a smart contract in Rust is significantly harder than writing one in Solidity. 
In Solana, developers must explicitly define and pass every single mathematical account (memory location) their contract intends to read from or write to before the transaction executes. While this makes the code much more complex, it is a mathematical necessity: because the blockchain knows exactly which accounts will be touched in advance, it can safely execute thousands of independent Rust contracts *in parallel* across multiple CPU cores, achieving massive scalability.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Solidity/index.mdx': `---
title: Solidity
description: The undisputed king of Web3, an object-oriented language created specifically to write smart contracts on the Ethereum Virtual Machine (EVM).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Solidity">

Created by Gavin Wood in 2014, Solidity is the language that gave birth to Decentralized Finance (DeFi) and NFTs. It is statically typed, object-oriented, and heavily influenced by C++ and JavaScript.

## 1. The EVM Environment
Solidity is mathematically constrained by the Ethereum Virtual Machine (EVM). 
In standard programming, memory is cheap. In Solidity, every single mathematical operation (addition, memory allocation, reading from disk) costs a specific amount of "Gas," which translates to physical money (Ether) paid by the user. 
Therefore, Solidity developers must constantly optimize their mathematical logic. For example, storing a boolean in a TICK1uint256TICK1 instead of a TICK1uint8TICK1 might cost the user an extra $5 every time the function is called.

## 2. The Dark Forest of Security
Because Solidity is Turing-complete and handles billions of dollars, it is the most hostile programming environment on earth.
If a developer fails to follow the Checks-Effects-Interactions mathematical pattern, a hacker can use a "Reentrancy Attack"—calling a function to withdraw money, and before the contract updates its balance, the hacker's contract mathematically calls the withdraw function again, draining the entire protocol in a single transaction.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.8 Smart Contracts - Web3/Vyper/index.mdx': `---
title: Vyper
description: A Pythonic, highly secure alternative to Solidity for the EVM, designed to mathematically prioritize auditability over complex features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vyper">

Created as a direct alternative to Solidity for the Ethereum Virtual Machine (EVM), Vyper is heavily influenced by Python. Its entire architectural philosophy is based on **Security and Readability**.

## 1. Less is More
Solidity includes massive Object-Oriented features like multiple inheritance, operator overloading, and inline assembly. While powerful, these features can mathematically hide malicious logic from auditors.
Vyper mathematically removes all of these features. 
There is no inheritance. There are no modifiers. There is no inline assembly. 
By strictly limiting the mathematical expressiveness of the language, Vyper ensures that the code you read is exactly what the EVM will execute, making it significantly easier for human auditors to spot billion-dollar vulnerabilities.

## 2. Gas Optimization
Because Vyper's mathematical features are so strictly constrained, the compiler can generate incredibly optimized EVM bytecode. Historically, many of the most complex mathematical contracts in DeFi (like the heavily optimized bonding curves in Curve Finance) were written in Vyper precisely because it allowed developers to minimize gas costs while maintaining absolute mathematical certainty over the execution path.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/ABAP/index.mdx': `---
title: ABAP
description: Advanced Business Application Programming, the proprietary language powering the SAP ecosystem and managing the global supply chain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ABAP">

Created in the 1980s by SAP (a massive German software corporation), ABAP is the programming language that quietly runs a staggering percentage of the global economy. If a multi-national corporation manufactures cars or ships cargo, they almost certainly use SAP software customized by ABAP.

## 1. Deep Database Integration
In modern web development, the Database and the Application Code are completely separate systems (e.g., Node.js talking to PostgreSQL via an ORM).
ABAP was mathematically designed to be inseparable from the database. 
You can write SQL queries directly inside an ABAP TICK1IFTICK1 statement without importing any libraries or managing database connections. The ABAP runtime mathematically handles the database cursors, memory buffering, and transactional locking automatically. This deep integration allows massive corporations to process payroll for 100,000 employees overnight with flawless mathematical precision.

## 2. The Legacy Burden
ABAP has evolved over 40 years. It started as a procedural macro language and eventually added massive Object-Oriented (OO-ABAP) capabilities. However, because multi-billion-dollar companies mathematically refuse to rewrite working code, a modern SAP system often contains a mix of brilliant, modern OO-ABAP alongside archaic, procedural code written in 1995, requiring a highly specialized (and highly paid) workforce to maintain.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.9 Legacy - Enterprise/COBOL/index.mdx': `---
title: COBOL
description: Common Business-Oriented Language, the ancient, heavily verbose mainframe language that still silently processes trillions of dollars in global financial transactions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="COBOL">

Designed in 1959 by a committee led by Grace Hopper, COBOL is one of the oldest programming languages in existence. Despite its age, it remains the mathematical bedrock of the global financial system, processing an estimated $3 trillion in commerce every single day.

## 1. English-Like Syntax
In 1959, the mathematical goal of COBOL was to allow non-programmers (like bankers and accountants) to read the code. 
Instead of writing mathematical symbols (TICK1x = y + zTICK1), COBOL is heavily verbose:
TICK3cobol
ADD Y TO Z GIVING X.
TICK3
The code is rigidly structured into "Divisions" (Identification, Environment, Data, Procedure). While modern developers find the syntax agonizingly slow to write, its strict, rigid nature ensures that the code behaves exactly as expected for decades.

## 2. Fixed-Point Mathematics
Why do banks still use a language from 1959 instead of Python or Java?
Modern languages use Floating-Point mathematics (IEEE 754). If you ask Python to add TICK10.1 + 0.2TICK1, the mathematical result is TICK10.30000000000000004TICK1. In a bank processing billions of transactions, those microscopic rounding errors compound into millions of missing dollars.
COBOL natively uses **Fixed-Point Decimal Mathematics**. It calculates numbers exactly the way a human accountant does on paper, mathematically guaranteeing absolute, to-the-penny precision for financial data.

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
