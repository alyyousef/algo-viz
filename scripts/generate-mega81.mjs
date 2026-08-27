import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/30. RAG & Retrieval/Knowledge graphs/index.mdx': `---
title: Knowledge Graphs
description: A semantic data architecture that mathematically models information not as flat tables or vectors, but as an interconnected network of exact logical relationships between entities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Knowledge Graphs">

Relational Databases (SQL) map data to tables. Vector Databases map data to geometry. Knowledge Graphs map data to human-like logical reasoning.

## 1. Nodes and Edges (RDF Triples)
The fundamental mathematical unit of a Knowledge Graph is the **Triple**: TICK1(Subject, Predicate, Object)TICK1.
- **Node (Subject)**: e.g., "Apple Inc."
- **Edge (Predicate)**: e.g., "Founded By"
- **Node (Object)**: e.g., "Steve Jobs"
Because every single fact is stored as an explicit, hardcoded mathematical vector (Edge) pointing from one concept to another, the database natively understands logic. It doesn't just know that "Apple" and "Steve Jobs" appear in the same paragraph; it knows the exact physical nature of their relationship.

## 2. Graph Traversal and Ontologies
Knowledge Graphs are powered by **Ontologies** (strict mathematical schemas defining what types of relationships are possible).
When queried (often using SPARQL or Cypher), the database performs **Graph Traversal**. If you ask, "Which CEOs of tech companies were born in California?", the engine does not scan text. It mathematically jumps from the "California" node, travels backward across all "Born In" edges to find People, filters them by traversing their "CEO Of" edges, and checks if the resulting Company node has a "Type" edge pointing to "Tech". This allows for mathematically perfect, hallucination-free logical deduction.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Multi-hop retrieval/index.mdx': `---
title: Multi-Hop Retrieval
description: An advanced RAG paradigm designed to answer complex questions that mathematically require the AI to synthesize partial answers spread across entirely disconnected documents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Hop Retrieval">

If you ask, *"Did the author of '1984' live in a country that fought in WWII?"*, a standard Vector Database will fail. There is no single document containing that exact sentence. The answer requires multiple logical "hops."

## 1. The Breakdown of Single-Pass Retrieval
A standard RAG pipeline will mathematically encode the entire question into one Vector. It will search for a document containing both "1984" and "WWII." It will fail to find it, and the LLM will hallucinate.
The mathematical reality is that this question requires two distinct queries:
1. Who is the author of '1984'? (Answer: George Orwell)
2. Where did George Orwell live? (Answer: UK)
3. Did the UK fight in WWII? (Answer: Yes)

## 2. Agentic Routing and Decomposition
To solve this, Multi-Hop architectures use an LLM not to answer the question, but to **Decompose** it.
The LLM mathematically analyzes the syntax of the prompt and breaks it into an array of sub-queries. It executes Query 1, reads the retrieved context, extracts "George Orwell", and then dynamically writes Query 2. This creates a recursive mathematical loop of Information Retrieval $\\rightarrow$ Synthesis $\\rightarrow$ New Query generation, allowing RAG systems to autonomously research highly complex, deeply nested logic puzzles.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Query expansion-rewriting/index.mdx': `---
title: Query Expansion and Rewriting
description: A pre-retrieval optimization technique that intercepts a user's prompt and mathematically alters, expands, or rewrites it to drastically improve Vector Database retrieval accuracy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Query Expansion and Rewriting">

Users are terrible at writing prompts. If a user types "app crashing", a Vector Database will only find documents physically clustered near those exact words. It will miss highly relevant documents about "iOS memory overflow" because the user lacked the vocabulary.

## 1. LLM-Based Query Rewriting
Before the query ever touches the Vector Database, it is intercepted by a smaller LLM. 
The LLM mathematically restructures the syntax. "app crashing" is rewritten into a highly formalized query: *"Mobile application unexpected termination, iOS memory overflow, Android segmentation fault, crash logs."*
By injecting this rich semantic vocabulary, the resulting Vector Embedding is mathematically "pulled" toward the absolute center of the relevant cluster in the Latent Space, ensuring massive retrieval accuracy.

## 2. Step-Back Prompting and HyDE
- **Step-Back Prompting**: The LLM rewrites the query to be mathematically *more abstract*. If the user asks about a specific Python bug, the LLM rewrites it to ask about the general principles of Python memory management, retrieving foundational context alongside specific fixes.
- **HyDE (Hypothetical Document Embeddings)**: Instead of embedding the user's question, the LLM is instructed to hallucinate a fake answer to the question. This fake answer is mathematically embedded and used to search the database. Because the fake answer shares the exact grammatical structure of the real documents, it acts as a perfect mathematical magnet, retrieving the true documents with shocking accuracy.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/RAG evaluation/index.mdx': `---
title: RAG Evaluation
description: The rigorous, mathematical framework used to quantitatively measure the accuracy, relevance, and groundedness of a Retrieval-Augmented Generation pipeline.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RAG Evaluation">

You cannot fix what you cannot measure. Because LLM outputs are non-deterministic text, you cannot write a simple TICK1assertEquals()TICK1 unit test. RAG requires specialized mathematical evaluation frameworks (like Ragas or TruLens).

## 1. The RAG Triad
Every RAG system must be mathematically evaluated on three distinct axes:
1. **Context Relevance**: Did the Vector Database retrieve the right documents? (Measures the math of the Embeddings).
2. **Groundedness (Faithfulness)**: Did the LLM strictly obey the retrieved documents, or did it hallucinate? (Measures the prompt constraints).
3. **Answer Relevance**: Did the final output actually answer the user's original question? (Measures the final LLM generation).

## 2. LLM-as-a-Judge
To calculate these scores, engineers use an incredibly powerful LLM (like GPT-4) as the automated judge. 
The Judge is given the User Prompt, the Retrieved Context, and the Final Answer. It is mathematically instructed to analyze them and output a strict integer from 1 to 5 for each axis of the Triad. By running a test dataset of 1,000 questions through the pipeline and averaging the Judge's scores, engineers can mathematically prove whether switching to a new Embedding Model or changing a Prompt actually improved the system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Reranking/index.mdx': `---
title: Reranking
description: A computationally expensive, hyper-accurate post-retrieval process that mathematically re-evaluates the relevance of retrieved documents using a Cross-Encoder Neural Network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reranking">

Vector Databases (Bi-Encoders) are incredibly fast, but mathematically shallow. They can search 1 billion documents in 10 milliseconds, but they often return documents that are tangentially related but ultimately unhelpful. Reranking fixes this.

## 1. Bi-Encoders vs. Cross-Encoders
- **Bi-Encoder (Vector DB)**: Embeds the Question into a Vector. Embeds the Document into a Vector. Calculates the angle between them. Fast, but lacks deep linguistic understanding.
- **Cross-Encoder (Reranker)**: Takes the physical text of the Question AND the physical text of the Document, concatenates them together (TICK1Question [SEP] DocumentTICK1), and feeds them simultaneously into a Transformer Neural Network. The Attention Mechanism mathematically calculates the relationship between every word in the question and every word in the document simultaneously. It is 10,000x slower, but mathematically perfect at understanding relevance.

## 2. The Two-Stage Pipeline
Because Cross-Encoders are too slow to run on 1 billion documents, production RAG uses a Two-Stage Pipeline.
1. The Vector DB retrieves the Top 100 documents (Fast, low accuracy).
2. Those 100 raw text documents are passed to the Reranker (Cross-Encoder).
3. The Reranker mathematically scores them from 0.0 to 1.0 and resorts the list (Slow, high accuracy).
The Top 5 documents are then extracted and fed to the LLM, guaranteeing the highest possible context quality.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Retrieval/index.mdx': `---
title: Retrieval Algorithms
description: The mathematical algorithms underlying search engines and AI pipelines that physically locate the most relevant data within massive, unstructured datasets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Retrieval Algorithms">

Retrieval is fundamentally a mathematical ranking problem. Given a Query $Q$ and a Database of millions of Documents $D$, what algorithm accurately assigns a Relevance Score to every document?

## 1. Lexical (Sparse) Retrieval
The foundation of traditional search (like Elasticsearch) is **TF-IDF** (Term Frequency - Inverse Document Frequency) and its successor, **BM25**.
- **TF**: If the query word appears 50 times in a document, the score goes up.
- **IDF**: If the query word is "the", it appears in every document, so its mathematical weight is heavily penalized. If the word is "Kubernetes", it is rare, so its mathematical weight skyrockets. 
Lexical retrieval maps documents to Sparse Vectors (arrays with millions of zeros, and a few numbers representing exact word frequencies). It is unmatched for exact keyword lookups but completely fails if synonyms are used.

## 2. Semantic (Dense) Retrieval
Modern AI uses Dense Retrieval. Documents are mapped to dense, high-dimensional arrays of floats (Embeddings) representing conceptual meaning.
The retrieval algorithm is **Cosine Similarity** or **Dot Product**. The database mathematically calculates the geometric angle between the Query Vector and the Document Vectors. Small angle = high semantic relevance. Dense retrieval understands that "puppy" and "young dog" are mathematically identical, but fails if the user requires an exact, non-semantic string match (like an API key).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Semantic search/index.mdx': `---
title: Semantic Search
description: A search paradigm that abandons exact character matching in favor of mathematically mapping the intent and contextual meaning of a user's query against an embedded Latent Space.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semantic Search">

If you search a traditional SQL database for "places to get coffee," and the database only contains the phrase "cafe," SQL returns 0 results. Semantic Search returns the cafe immediately because it understands the math of language.

## 1. Mapping Intent to Geometry
Semantic Search is entirely reliant on Neural Networks (Transformers). 
During ingestion, every document is passed through an Embedding Model, stripping away the ASCII characters and extracting pure mathematical meaning. This meaning is plotted as a coordinate in a 1,536-dimensional universe.
When a user types "places to get coffee," the system does not look for those words. It converts the query into a coordinate. Because the Neural Network was trained on billions of human conversations, it mathematically places the coordinate for the query exactly next to the coordinate for "cafe." 

## 2. Overcoming the Vocabulary Gap
The primary architectural goal of Semantic Search is to solve the **Vocabulary Gap**—the mathematical reality that the person asking the question rarely uses the exact same terminology as the person who wrote the answer. By abstracting language into pure geometric space, Semantic Search makes systems incredibly resilient to typos, synonyms, and drastically different phrasings.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Vector databases/index.mdx': `---
title: Vector Databases
description: Highly specialized, mathematically optimized database architectures designed exclusively to store, index, and rapidly search massive, high-dimensional floating-point arrays (Embeddings).
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Vector Databases"
  subtitle="The Storage Engine of AI"
  tags={['Database', 'AI', 'Embeddings', 'Infrastructure']}
>

You cannot store 1,536-dimensional arrays in a standard PostgreSQL table and expect to search them quickly. To find the Cosine Similarity of 1 billion vectors, a CPU would have to perform 1.5 trillion math operations for every single search query. Vector Databases solve this using Approximate Nearest Neighbor (ANN) algorithms.

## 1. HNSW (Hierarchical Navigable Small World)
The industry-standard algorithm for Vector indexing is HNSW. 
Instead of mathematically comparing the Query Vector to all 1 billion Database Vectors (k-NN), HNSW builds a mathematical graph with multiple layers.
The top layer contains only a few, highly scattered "Highway" nodes. The query mathematically drops into the top layer, rapidly moving toward the closest Highway node. It then drops to a lower, denser layer, refining its search, until it reaches the bottom layer. This hierarchical graph traversal reduces the search time from $O(N)$ (scanning everything) to $O(\\log N)$, returning results in milliseconds.

## 2. Production Systems
Purpose-built Vector Databases (like Pinecone, Milvus, and Qdrant) are engineered specifically to manage these massive HNSW graphs in RAM. 
They also solve the **Metadata Filtering** problem. If a user searches for a vector but adds a SQL constraint (TICK1WHERE date > 2023TICK1), standard HNSW graphs break. Modern Vector DBs use mathematical "pre-filtering" or "post-filtering" architectures to seamlessly blend exact relational logic with high-dimensional geometric searches.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/30. RAG & Retrieval/Vector search/index.mdx': `---
title: Vector Search
description: The specific mathematical execution of querying a Latent Space to locate the nearest geometric neighbors to a given embedded query.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vector Search">

Vector Search is the physical engine that makes RAG (Retrieval-Augmented Generation) possible. It is the mathematical act of measuring the distance between points in an unimaginably vast geometric space.

## 1. Distance Metrics
To determine which documents are "closest" to the query, the database must use a mathematical Distance Metric:
- **Cosine Similarity**: Measures the angle between two vectors. If they point in the exact same direction, similarity is 1.0. This is the industry standard for NLP because it ignores the *magnitude* (length) of the vector, focusing purely on the semantic direction.
- **Euclidean Distance (L2)**: Measures the absolute physical straight-line distance between two points using the Pythagorean theorem. Used more frequently in image retrieval.
- **Dot Product**: Multiplies the vectors together. If the vectors are normalized, this is mathematically identical to Cosine Similarity, but computationally much faster for the CPU to execute.

## 2. The K-Nearest Neighbors (k-NN) Problem
The theoretical goal is **k-NN**: calculating the exact distance to every point to find the absolute Top K best matches.
Because AI vectors are massive (often requiring 6 kilobytes of RAM per vector), a database of 100 million vectors consumes 600 Gigabytes of RAM. Computing k-NN on 600GB of RAM for every single user query is mathematically impossible for real-time systems. Therefore, Vector Search is always a trade-off: using algorithms like HNSW (Approximate Nearest Neighbors) to sacrifice 2% of mathematical accuracy in exchange for a 10,000x increase in execution speed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Agent evaluation/index.mdx': `---
title: Agent Evaluation
description: The highly complex, non-deterministic mathematical framework used to evaluate autonomous AI systems that execute multi-step logic, use tools, and interact with live environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agent Evaluation">

Evaluating a standard LLM is easy: "Did it output the right text?" Evaluating an Agent is exponentially harder. An Agent might output the correct final text, but it might have mathematically wasted 50 API calls, deleted a file, and hallucinated twice along the way.

## 1. Trajectory Evaluation
Agents are evaluated not on their final answer, but on their **Trajectory** (the sequence of steps they took).
Evaluators use directed mathematical graphs to trace the Agent's logic. 
- **Tool Selection Accuracy**: Did the Agent mathematically select the correct API for the current sub-task?
- **Logic Branching**: When the API returned an error, did the Agent's logic branch correctly (Recovery), or did it get trapped in a mathematical loop (Thrashing)?
You must mathematically score the efficiency of the path taken, heavily penalizing unnecessary actions.

## 2. Environment Sandboxes
Because Agents interact with the world, they cannot be evaluated in static text files. They must be evaluated inside **Sandboxes** (like Docker containers).
The evaluation framework mathematically measures the State of the Sandbox before and after the Agent runs. If the prompt was "Refactor this code," the evaluator doesn't just read the Agent's response; it physically compiles the code inside the Sandbox and runs Unit Tests. This ensures the Agent is graded on actual, mathematically provable physical outcomes, not just semantic promises.

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
