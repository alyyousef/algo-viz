import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/27. Natural Language Processing/TF-IDF/index.mdx': `---
title: TF-IDF (Term Frequency - Inverse Document Frequency)
description: A foundational mathematical algorithm that scores the absolute importance of a word within a document by balancing how often it appears against how rare it is across the entire corpus.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TF-IDF">

If a document mentions the word "the" 1,000 times, and the word "Quantum" 5 times, a simple frequency counter (Bag of Words) mathematically assumes "the" is the most important topic. TF-IDF corrects this mathematical flaw.

## 1. Term Frequency (TF)
The first half of the equation is Term Frequency: $TF = (Count of word X in document) / (Total words in document)$.
If "Quantum" appears 5 times in a 100-word document, its TF is 0.05. It mathematically rewards words that appear frequently *in the current document*.

## 2. Inverse Document Frequency (IDF)
The second half is Inverse Document Frequency: $IDF = \\log(Total Documents / Documents containing word X)$.
If you have 1,000,000 documents, and the word "the" appears in all 1,000,000, its IDF is $\\log(1) = 0$. 
If "Quantum" only appears in 10 documents, its IDF is $\\log(1,000,000 / 10) = 5$.
When you multiply them ($TF \\times IDF$), the score for "the" mathematically drops to 0. The score for "Quantum" skyrockets. The algorithm mathematically proves that "Quantum" is the true keyword of the document because it is highly frequent locally, but extremely rare globally.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Tokenisation/index.mdx': `---
title: Tokenization
description: The critical first step in NLP where a continuous string of text is mathematically shattered into discrete, analyzable units (words, sub-words, or characters).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tokenization">

A Neural Network cannot mathematically ingest the raw string TICK1"Don't panic!"TICK1. The string must be physically broken apart into Tokens before any AI processing can begin.

## 1. Word and Character Tokenization
- **Word Tokenization**: Splitting by spaces (TICK1["Don't", "panic!"]TICK1). This is mathematically fragile. It fails to separate the punctuation from the word (treating "panic" and "panic!" as two entirely different mathematical entities), and fails on languages without spaces (like Chinese).
- **Character Tokenization**: Splitting into individual letters (TICK1["D", "o", "n", "'", "t"]TICK1). This solves the punctuation and Out-of-Vocabulary problem, but mathematically destroys the semantic meaning of the words, forcing the Neural Network to re-learn basic spelling from scratch.

## 2. Sub-Word Tokenization (BPE)
Modern LLMs (like GPT-4) use **Byte-Pair Encoding (BPE)**, a sub-word tokenizer.
It mathematically analyzes a massive corpus and merges frequent character pairs into single Tokens. 
It might tokenize "unbelievable" into TICK1["un", "believ", "able"]TICK1. 
Because these sub-words are mathematically highly frequent across the English language, the Neural Network can easily learn their semantic meaning, providing a perfect mathematical balance between Vocabulary size and Semantic retention.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Topic modelling (LDA/index.mdx': `---
title: Latent Dirichlet Allocation (LDA)
description: A highly complex probabilistic generative model used in Topic Modeling to mathematically discover hidden thematic structures within massive, unlabelled document collections.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Latent Dirichlet Allocation (LDA)">

If you are handed 50,000 legal emails and asked, "What are these about?", reading them is impossible. LDA is an unsupervised mathematical algorithm that automatically groups them by topic.

## 1. The Generative Assumption
LDA operates on a mathematically bizarre assumption: It assumes that the documents were *generated* by a specific mathematical process.
It assumes that a human author first selected a "Topic Mixture" (e.g., 60% Finance, 40% Law). Then, based on those percentages, the author randomly pulled words from "Topic Bins" to form the document. LDA's job is to mathematically reverse-engineer this assumed process to discover what the original Topic Bins contained.

## 2. Dirichlet Distributions
LDA uses complex Bayesian mathematics (Dirichlet Distributions). 
It mathematically forces two constraints:
1. Every document is a sparse mixture of Topics (most documents only discuss 2 or 3 topics, not 50).
2. Every Topic is a sparse mixture of Words (the word "Bankrupt" belongs strongly to the Finance topic, and weakly to everything else).
By iteratively tweaking probabilities (using Gibbs Sampling), LDA mathematically converges on a set of Topics (clusters of words) that perfectly describe the hidden themes of the massive corpus.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Word embeddings/index.mdx': `---
title: Word Embeddings
description: The revolutionary mathematical paradigm where words are transformed into dense, continuous vectors in a high-dimensional space, capturing their deepest semantic and syntactic meanings.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Word Embeddings">

Before Embeddings, NLP used "One-Hot Encoding", where every word was a massive vector of zeros with a single 1. Mathematically, the distance between "Dog" and "Cat" was exactly the same as the distance between "Dog" and "Car." Embeddings fixed this catastrophic flaw.

## 1. The High-Dimensional Latent Space
In a Word Embedding model, every word is mathematically projected into a dense vector space (e.g., 300 dimensions). 
These dimensions are not human-readable (e.g., Dimension 4 isn't explicitly "Fluffiness"), but they mathematically represent abstract semantic concepts learned from reading billions of sentences.

## 2. Mathematical Semantics
Because words are just points in a 300-dimensional coordinate system, you can use standard Geometry (Cosine Similarity) to measure their meaning.
The mathematical distance (angle) between the vector for "Dog" and "Cat" is incredibly small (they appear in similar contexts). The distance between "Dog" and "Car" is massive. 
Furthermore, the mathematical *relationships* are preserved. If you calculate the vector path from "Man" to "King", and apply that exact same mathematical trajectory starting from "Woman", you land precisely on the vector for "Queen". The Neural Network has mathematically codified human logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Word2Vec/index.mdx': `---
title: Word2Vec
description: The pioneering Neural Network architecture created by Google that first popularized Word Embeddings by mathematically predicting surrounding words based on context.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Word2Vec"
  subtitle="Neural Word Embeddings"
  tags={['NLP', 'Machine Learning', 'Google', 'Embeddings']}
>

Created by Tomas Mikolov at Google in 2013, Word2Vec changed the trajectory of Artificial Intelligence forever by proving that shallow Neural Networks could capture deep semantic meaning.

## 1. CBOW (Continuous Bag of Words)
Word2Vec is actually two different mathematical algorithms. 
The first is CBOW. The Neural Network is given the surrounding context words (e.g., "The cat sat on the ___") and must mathematically predict the missing target word ("mat"). By forcing the network to guess the middle word millions of times, the internal weights of the network mathematically adjust to represent the semantic meaning of the words.

## 2. Skip-Gram
The second algorithm is Skip-Gram, which is the exact mathematical inverse of CBOW. 
The network is given a single target word (e.g., "mat") and must mathematically predict all the surrounding context words ("The", "cat", "sat", "on"). 
Skip-Gram is mathematically much harder, but it produces vastly superior embeddings for rare words. The final resulting weights from the network's hidden layer become the 300-dimensional Word Embeddings that can be exported and used in any other NLP system.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Agentic workflows/index.mdx': `---
title: Agentic Workflows
description: Advanced architectural patterns where LLMs are not just passive text generators, but active decision-makers that can mathematically route tasks, use tools, and loop autonomously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agentic Workflows">

If you ask a standard LLM to "deploy my website," it simply prints out a list of instructions. In an Agentic Workflow, the LLM physically executes the deployment.

## 1. The ReAct Pattern (Reason + Act)
The foundational mathematical pattern for Agents is **ReAct**.
The Agent operates in a mathematically strict loop:
1. **Thought**: The LLM analyzes the current state and reasons about what to do next.
2. **Action**: The LLM outputs a specific, parseable command (like TICK1call_function("search_web", "AWS deployment")TICK1).
3. **Observation**: The system physically executes the command and feeds the raw mathematical output back into the LLM's context window.
The loop mathematically repeats until the LLM determines the overarching goal has been achieved.

## 2. Multi-Agent Orchestration
Advanced systems (like AutoGen or CrewAI) do not rely on a single Agent. They mathematically partition the logic.
You spawn a "Researcher Agent" (prompted to be skeptical and thorough) and a "Coder Agent" (prompted to write optimized Python). 
The Orchestrator mathematically routes data between them. The Coder writes the code, hands it to the Researcher, who physically runs it, observes a crash, and hands the error log back to the Coder. This multi-agent debate mathematically reduces Hallucinations and dramatically increases complex task success rates.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/AI agents/index.mdx': `---
title: AI Agents
description: Autonomous software entities driven by Large Language Models, equipped with physical tools, memory, and the mathematical capacity to execute complex, multi-step goals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AI Agents">

An AI Agent transforms a static Neural Network into a dynamic, acting entity. It bridges the gap between mathematically predicting the next word, and physically interacting with the real world.

## 1. The Core Components
An AI Agent mathematically consists of three architectural pillars:
- **The Brain (LLM)**: The central processing unit that provides reasoning, planning, and mathematical breakdown of user intents.
- **Memory**: Short-term memory (the Context Window for the current task) and Long-term memory (Vector Databases mathematically storing past experiences and user preferences for future retrieval).
- **Tools (Function Calling)**: The APIs the Agent is mathematically authorized to invoke (e.g., executing Python code, reading files, sending emails, browsing the web).

## 2. Autonomous Planning
Unlike a script that executes hardcoded TICK1if/elseTICK1 logic, an Agent mathematically generates its own plan.
Given the prompt "Plan a trip to Tokyo," the Agent mathematically decomposes the root node into a Directed Acyclic Graph (DAG) of sub-tasks: 1) Search flights, 2) Search hotels, 3) Check weather. It then autonomously traverses the graph, invoking the Web Search Tool for each node, synthesizing the results, and taking physical action (like booking the ticket) without human intervention.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Audio generation/index.mdx': `---
title: Audio Generation
description: The highly computationally intensive AI process of synthesizing mathematically complex, high-fidelity acoustic waveforms (speech, music, sound effects) from text prompts or latent noise.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Audio Generation">

Generating an image requires mathematically calculating a 1024x1024 grid of pixels. Generating 1 minute of CD-quality Audio requires mathematically predicting 2,646,000 sequential data points (44,100 samples per second).

## 1. Autoregressive Audio Models
Early breakthroughs in Audio Generation (like DeepMind's WaveNet) used Autoregressive mathematical models.
Just like an LLM predicts the next *word* based on the previous words, WaveNet predicts the exact physical air pressure of the *next audio sample* based on the previous thousands of samples. Because it must execute this mathematical prediction 44,100 times for a single second of audio, inference was originally massively slower than real-time, requiring enormous GPU clusters.

## 2. Audio Diffusion Models
Modern generation (like Suno or AudioLDM) applies the exact same mathematical principles used in Image Diffusion (like Midjourney).
Instead of generating the audio sample-by-sample, the AI mathematically generates a **Mel-Spectrogram** (a 2D image representing audio frequencies). It starts with an image of pure, mathematical static noise. Over 50 denoising steps, the neural network mathematically subtracts the noise based on the text prompt ("Jazz music with a saxophone"), eventually resolving into a clear Spectrogram, which is then mathematically inverted back into raw audio waveforms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/DALL-E/index.mdx': `---
title: DALL-E
description: OpenAI's flagship Generative Image model, renowned for mathematically linking massive Large Language Models with Diffusion architecture to generate highly accurate, photorealistic images from text.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="DALL-E"
  subtitle="Text-to-Image Generation"
  tags={['AI', 'OpenAI', 'Diffusion', 'Multimodal']}
>

DALL-E 3 solved the biggest flaw of early AI image generators: Prompt Adherence. If you asked older models for "a red cube on a blue sphere," the math often broke, and you got a blue cube. DALL-E fixed this using LLM integration.

## 1. The CLIP Paradigm
DALL-E's foundational mathematics rely on **CLIP (Contrastive Language-Image Pre-training)**.
During training, OpenAI mathematically projected both Text (captions) and Images into the exact same high-dimensional Latent Space. The Neural Network was trained to mathematically pull the vector for the image of a dog and the vector for the text "a dog" as physically close together as possible. This forced the mathematical architecture to deeply understand the visual reality of human words.

## 2. LLM Prompt Rewriting
DALL-E 3's secret weapon is that humans do not actually prompt the Image Generator directly.
When you type a prompt, it first goes to ChatGPT (the LLM). ChatGPT mathematically expands and highly details your prompt, enforcing strict spatial reasoning and descriptive constraints. That mathematically superior, highly verbose prompt is then fed into the underlying Diffusion model, resulting in generation accuracy that vastly outstrips models that rely on raw human inputs.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Diffusion models/index.mdx': `---
title: Diffusion Models
description: The mathematical architecture dominating Generative AI (Images/Video), where a neural network learns to reverse a thermodynamic noise-injection process to synthesize high-fidelity data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Diffusion Models">

Diffusion Models (like Midjourney, Stable Diffusion, and Sora) mathematically replaced GANs (Generative Adversarial Networks) because their training process is vastly more stable and mathematically provable.

## 1. The Forward Process (Destroying Data)
The training phase relies on the mathematics of Non-Equilibrium Thermodynamics.
You start with a pristine image of a cat. In step 1, you mathematically add a tiny amount of Gaussian Noise (static). In step 2, you add slightly more. After 1,000 steps, the image is physically obliterated; it is pure, mathematical static noise. This Forward Process requires no AI; it is a hardcoded mathematical equation (a Markov Chain).

## 2. The Reverse Process (Generating Data)
The Neural Network (usually a U-Net architecture) is trained to do exactly one thing: mathematically predict the noise that was added in the *previous* step.
During Generation (Inference), you give the AI a grid of pure, random mathematical static, and a text prompt ("A cat"). The U-Net mathematically predicts the noise that contradicts the concept of "Cat", and subtracts it. It loops this mathematical subtraction 50 times. By systematically reversing the entropy, the random static slowly, mathematically coalesces into a photorealistic, brand new image.

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
