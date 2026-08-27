import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/monoids)/index.mdx': `---
title: Monoids (Category Theory)
description: A fundamental algebraic structure from Category Theory that guarantees safe, associative combination of mathematical elements, crucial for parallel data processing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monoids (Category Theory)">

A Monoid is an abstract mathematical concept that describes how to combine things together perfectly. It is the mathematical reason why Big Data frameworks (like Hadoop MapReduce) can safely process terabytes of data across thousands of servers.

## 1. The Two Laws of a Monoid
For a Type and an Operator to mathematically qualify as a Monoid, they must satisfy two absolute laws:
1. **Associativity**: The grouping of the operations does not matter. $(A + B) + C = A + (B + C)$. 
2. **Identity Element**: There must exist a "Zero" element that, when combined with another element, leaves it unchanged. $A + 0 = A$. 

## 2. Parallel Processing
Why do programmers care about this? If you have an Array of 1 billion numbers, and you want to sum them, a standard loop forces you to do it sequentially on one CPU core.
Because Integer Addition forms a mathematical Monoid (it is Associative and its Identity is 0), you are mathematically guaranteed that you can chop the Array into 1,000 chunks, send them to 1,000 different servers, sum them independently, and then sum the results together. The final answer will be mathematically flawless. If the operation was not a Monoid (like Subtraction, which is not Associative), parallelizing the computation would mathematically corrupt the final result.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Operational semantics/index.mdx': `---
title: Operational Semantics
description: A method of formalizing the meaning of a programming language by mathematically modeling exactly how a theoretical machine physically executes the code, step by step.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Operational Semantics">

While Denotational Semantics translates code into abstract math, Operational Semantics translates code into the physical state transitions of a theoretical computer.

## 1. Structural Operational Semantics (SOS)
Invented by Gordon Plotkin, SOS defines the meaning of code by defining a transition relation: $\\langle C, \\sigma \\rangle \\rightarrow \\langle C', \\sigma' \\rangle$.
- $C$ is the code currently executing.
- $\\sigma$ is the current State of the machine (e.g., RAM, registers).
The mathematical rule states: "If the machine executes Command $C$ in State $\\sigma$, it will physically transition to a new State $\\sigma'$, with the remaining code $C'$ left to execute."

## 2. Small-Step vs. Big-Step
- **Small-Step**: Describes the execution mathematically at the lowest possible level. It defines exactly how an expression like TICK1(2 + 3) * 4TICK1 reduces to TICK15 * 4TICK1 and then to TICK120TICK1, one atomic mathematical operation at a time.
- **Big-Step (Natural Semantics)**: Skips the intermediate steps. It provides a mathematical proof that the entire complex expression TICK1(2 + 3) * 4TICK1 will ultimately evaluate directly to the final state TICK120TICK1. Small-step is essential for proving the thread safety of concurrent programs, while Big-step is used to mathematically prove the final correctness of a compiler.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Syntax vs semantics/index.mdx': `---
title: Syntax vs. Semantics
description: The fundamental dichotomy in language theory separating the physical spelling and grammar of a program (Syntax) from its actual mathematical meaning and execution behavior (Semantics).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Syntax vs. Semantics">

A program can be syntactically perfect and semantically catastrophic. Understanding the mathematical difference between the two is the foundation of writing a compiler.

## 1. Syntax (The Grammar)
Syntax is purely structural. It is the mathematical rules defining which characters are allowed to follow other characters (defined by BNF Grammars).
The sentence: *"The purple math ate a silent car"* is syntactically perfect English. It has a Subject, Verb, and Object. A compiler's **Parser** will successfully read this and build an Abstract Syntax Tree (AST) with zero errors.

## 2. Semantics (The Meaning)
Semantics is the actual logic. The sentence above is semantically meaningless. 
In programming, TICK1String x = 5 / 0;TICK1 is syntactically flawless (Type Variable = Expression). However, the **Semantic Analyzer** in the compiler will instantly reject it for two mathematical reasons:
1. **Static Semantics (Compile-Time)**: You cannot assign an Integer result to a String variable (Type Mismatch).
2. **Dynamic Semantics (Run-Time)**: You cannot mathematically divide by Zero (State Violation). Syntax dictates *how* you write it; Semantics dictates *what* it actually does to the CPU.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.2 Language Design & Theory/Type theory/index.mdx': `---
title: Type Theory
description: The branch of mathematics and formal logic that studies type systems, providing the absolute theoretical foundation for memory safety and program correctness in compiled languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Type Theory">

Before Type Theory, memory was just an infinite, chaotic array of raw 1s and 0s. Type Theory imposes rigorous mathematical boundaries on that memory, preventing catastrophic execution errors.

## 1. Preventing Nonsense
At the hardware level, the binary string TICK101000001TICK1 could be the integer 65, the character 'A', or a memory address. 
Type Theory attaches a mathematical metadata tag (a Type) to that memory location. If you attempt to mathematically divide the character 'A' by 2, the CPU would blindly do it and crash. The Type System mathematically intercepts the action at compile-time, proving that the operation $Division(Character, Integer)$ is formally undefined, and halts compilation.

## 2. Soundness and Completeness
A Type System is a formal mathematical theorem prover. 
- **Soundness**: If a program passes the Type Checker, it is mathematically guaranteed *never* to have a type error at runtime (e.g., Rust is highly sound; JavaScript is fundamentally unsound).
- **Completeness**: If a program is theoretically safe to run, the Type Checker will *always* allow it. 
No production type system is perfectly Complete. To maintain Soundness, compilers (like Java or C#) will sometimes reject perfectly valid, safe code simply because the mathematical proof of its safety is too complex for the compiler to deduce.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Chunking strategies/index.mdx': `---
title: Chunking Strategies (RAG)
description: The algorithmic process of mathematically dividing massive text documents into optimized, semantic fragments to maximize the accuracy of Vector Database retrieval.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Chunking Strategies (RAG)"
  subtitle="Optimizing Semantic Retrieval"
  tags={['RAG', 'Vector Database', 'NLP', 'Data Processing']}
>

If you embed an entire 500-page book into a single Vector, the math becomes "muddy"; the resulting vector points to everything and nothing. If you embed a single word, there is no context. Chunking is the mathematical art of finding the perfect balance.

## 1. Fixed-Size vs. Semantic Chunking
- **Fixed-Size Chunking**: The simplest algorithm. You mathematically split the text every 500 tokens. However, this risks slicing a crucial paragraph in half, destroying the semantic meaning. To mitigate this, developers use **Overlap** (e.g., 500 tokens, with a 50-token overlap), ensuring the mathematical context bleeds across the cuts.
- **Semantic Chunking**: A more advanced algorithm. It uses a smaller NLP model to mathematically detect sentence or paragraph boundaries. It refuses to cut a chunk until it reaches a logical breakpoint (like a double newline or a specific markdown header).

## 2. Parent-Child (Hierarchical) Chunking
A major problem in RAG: Small chunks retrieve highly accurate answers, but lack broad context. Large chunks have context, but are hard for the vector math to locate precisely.
**Parent-Child Chunking** solves this. You mathematically chunk a document into large 1,000-token blocks (Parents), and then subdivide those into 200-token blocks (Children). 
When the user asks a question, the Vector Database mathematically searches *only* the Children (ensuring hyper-accurate retrieval). However, when a Child is found, the system actually returns the *Parent* chunk to the LLM, providing the exact answer surrounded by massive, perfect context.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Citation grounding/index.mdx': `---
title: Citation Grounding
description: The architectural requirement in Retrieval-Augmented Generation (RAG) that mathematically forces the LLM to explicitly link its generated claims to the exact source documents provided.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Citation Grounding">

The primary purpose of RAG is to prevent Hallucinations. However, even if you provide an LLM with perfect context, it might still hallucinate a false answer. Citation Grounding forces mathematical accountability.

## 1. Prompt Engineering for Grounding
You must explicitly alter the System Prompt. 
Instead of "Answer the question," the mathematical instruction becomes: *"You must ONLY answer using the provided Context. If the context does not contain the answer, you must output 'I do not know'. For every claim you make, you must append a citation bracket [Doc X] pointing to the source."*
By forcing the model to mathematically output the physical string TICK1[Doc X]TICK1 immediately after a claim, it drastically reduces the probability path (the Softmax distribution) of generating an unverified hallucination.

## 2. Post-Generation Verification
Advanced RAG pipelines do not trust the LLM. 
They employ a secondary, smaller AI model (an Evaluator) to mathematically verify the grounding. 
The Evaluator takes the LLM's final answer, extracts the citation TICK1[Doc 2]TICK1, and mathematically compares the semantic meaning of the generated sentence against the original text of Doc 2 using Cross-Encoders (NLI - Natural Language Inference). If the Evaluator detects a mathematical contradiction between the generation and the source, the pipeline flags the answer as an ungrounded hallucination and refuses to show it to the user.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Context construction/index.mdx': `---
title: Context Construction
description: The critical engineering step in a RAG pipeline where retrieved chunks are dynamically ordered, filtered, and formatted into the exact mathematical Prompt structure required by the LLM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Context Construction">

Retrieving 10 highly relevant chunks from a Vector Database is only half the battle. If you just paste them into the LLM randomly, the LLM will suffer from severe cognitive overload and fail to answer the prompt.

## 1. The "Lost in the Middle" Phenomenon
Mathematical studies on LLM Attention Mechanisms have proven the "Lost in the Middle" effect. 
If you feed an LLM a massive prompt containing 10 chunks, it will mathematically pay extreme attention to Chunk 1 (the beginning) and Chunk 10 (the end). It will almost completely ignore Chunks 4, 5, and 6. 
Therefore, Context Construction algorithms must mathematically reorder the retrieved documents. The most relevant chunk must be placed at the very beginning or the very end of the prompt window, never in the middle.

## 2. Context Window Optimization
Tokens are expensive, and context windows are finite. 
If the retrieved chunks exceed the LLM's maximum token limit (e.g., 8,000 tokens), the Context Constructor must mathematically truncate the data. 
Advanced pipelines use **Summarization Chains**. Before injecting the chunks into the final prompt, a smaller, cheaper LLM is used to summarize each 1,000-token chunk into a 100-token bulleted list. The Constructor then injects these hyper-dense summaries into the final prompt, mathematically preserving the semantic information while radically reducing the token count.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Embeddings/index.mdx': `---
title: Vector Embeddings
description: The foundational mathematics of modern AI, where words, sentences, or images are translated into massive, high-dimensional arrays of numbers representing pure semantic meaning.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vector Embeddings">

A computer cannot mathematically compare the word "King" to the word "Queen." It only sees ASCII characters. To understand meaning, AI uses Vector Embeddings to map human concepts onto a massive geometric graph.

## 1. High-Dimensional Latent Space
An Embedding Model (like OpenAI's TICK1text-embedding-3TICK1) takes a sentence and mathematically converts it into an Array of floating-point numbers (a Vector), usually containing 1,536 dimensions. 
Imagine a 1,536-dimensional graph. The Vector is a specific coordinate in that space. 
The Neural Network is trained so that concepts with similar semantic meanings are mathematically pushed close together in this geometry. The Vector for "Dog" will be physically adjacent to the Vector for "Puppy." The Vector for "Car" will be millions of units away.

## 2. Mathematical Relationships
Because meaning is now physical geometry, you can perform actual math on human concepts.
The most famous proof of this is the equation: $Vector("King") - Vector("Man") + Vector("Woman") \\approx Vector("Queen")$.
If you take the coordinate for King, subtract the mathematical direction representing masculinity, and add the direction representing femininity, you land exactly on the coordinate for Queen. 
In RAG, when a user asks a question, the question is turned into a Vector. The database calculates the **Cosine Similarity** (the physical angle between the vectors) to instantly find the documents that are mathematically closest in meaning to the question.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Graph RAG/index.mdx': `---
title: Graph RAG
description: A cutting-edge retrieval architecture that augments standard Vector Search by mathematically mapping the entities within the documents into a structured, interconnected Knowledge Graph.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Graph RAG"
  subtitle="Knowledge Graph Augmented Retrieval"
  tags={['RAG', 'Knowledge Graph', 'AI', 'Architecture']}
>

Standard Vector RAG is excellent at answering direct questions ("What is the capital of France?"). However, it mathematically fails at multi-hop reasoning ("Which company was founded by the person who invested in OpenAI?"). Graph RAG solves this.

## 1. The Entity Extraction Phase
During the ingestion of documents, Graph RAG does not just blindly create Vectors. It uses an LLM to mathematically parse every sentence and extract **Entities** (People, Companies, Locations) and **Relationships** (Founded, Invested In, Located In).
It stores this data in a Graph Database (like Neo4j), creating a massive, interconnected web of physical Nodes and Edges, running parallel to the standard Vector chunks.

## 2. Multi-Hop Graph Traversal
When the user asks a complex question, the system queries the Graph.
It mathematically locates the Node for "OpenAI". It then physically traverses the mathematical Edge labeled "Invested By", arriving at the Node "Microsoft". It then traverses the Edge "Founded By", arriving at the Nodes "Bill Gates" and "Paul Allen". 
The system extracts these specific Nodes, converts their structured data back into text, and feeds it into the LLM as context. By mathematically tracing the exact relationships across thousands of documents, Graph RAG achieves a level of deep, deductive reasoning that pure Vector Similarity search cannot mathematically accomplish.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Hybrid search/index.mdx': `---
title: Hybrid Search
description: A retrieval architecture that mathematically merges the semantic understanding of Vector Search with the absolute precision of traditional Keyword (Lexical) Search to eliminate blind spots.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hybrid Search">

Vector Search is mathematically brilliant at understanding concepts. If you search for "fast car," it will successfully return documents containing "speeding automobile." However, Vector Search is mathematically terrible at exact terminology (like finding a specific error code TICK1ERR_7X9TICK1 or a specific person's name).

## 1. The Dual Engine Approach
Hybrid Search runs two entirely separate mathematical engines simultaneously:
- **Dense Retrieval (Vector Search)**: Calculates Cosine Similarity on embeddings to find semantic meaning.
- **Sparse Retrieval (Keyword Search)**: Uses algorithms like BM25 (TF-IDF) to mathematically calculate the exact frequency and rarity of the physical characters in the search query across the document. 

## 2. Reciprocal Rank Fusion (RRF)
If Engine A returns a list of 100 documents, and Engine B returns a different list of 100 documents, how do you combine them?
You use **Reciprocal Rank Fusion**. 
RRF is a mathematical algorithm that looks at a document's rank in both lists. If Document X is ranked #2 by the Vector Engine (great semantic match) and #5 by the Keyword Engine (exact word match), RRF mathematically calculates a combined score (e.g., $1/(k+2) + 1/(k+5)$). This algorithm automatically mathematically bubbles the absolute best documents to the very top, perfectly balancing deep semantic understanding with exact physical keyword precision.

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
