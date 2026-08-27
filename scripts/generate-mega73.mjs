import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/27. Natural Language Processing/Bag of words/index.mdx': `---
title: Bag of Words (BoW)
description: A foundational, mathematical NLP technique that completely ignores grammar and word order, treating a document simply as an unordered collection of word frequencies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bag of Words">

In order for a computer to analyze text, words must be mathematically converted into numbers. "Bag of Words" is the simplest algorithm to achieve this.

## 1. The Mathematical Vocabulary
If you have three sentences:
1. "The dog ran."
2. "The cat ran."
3. "The dog and the cat."
The algorithm first mathematically extracts the **Vocabulary** (every unique word): TICK1["The", "dog", "ran", "cat", "and"]TICK1.

## 2. The Vectorization Process
Next, the algorithm mathematically converts every sentence into a Vector (an array of numbers) by simply counting how many times each Vocabulary word appears in the sentence.
- Sentence 1 becomes: TICK1[1, 1, 1, 0, 0]TICK1
- Sentence 3 becomes: TICK1[2, 1, 0, 1, 1]TICK1
Because it physically ignores the order of the words, "The dog bit the man" and "The man bit the dog" will generate the exact same mathematical vector. Despite this massive structural flaw, BoW is highly effective for basic tasks like spam filtering, where the mere presence of the word "Viagra" is mathematically more important than the grammatical structure of the sentence.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Coreference resolution/index.mdx': `---
title: Coreference Resolution
description: The highly complex NLP task of mathematically determining which pronouns and noun phrases refer to the exact same physical entity in the real world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Coreference Resolution">

When humans read "John went to the store because he needed milk," we instantly know "he" refers to "John." For a computer, "he" is just a two-letter string completely mathematically decoupled from "John."

## 1. The Clustering Problem
Coreference Resolution is mathematically treated as a clustering problem. 
The algorithm scans a document and extracts every single Entity (Names, Pronouns, Noun Phrases like "The President"). It must then mathematically calculate the probability that Entity A and Entity B point to the same physical object in reality, grouping them into a single mathematical cluster.

## 2. The Winograd Schema
This is incredibly difficult because it requires mathematically modeling physical reality, not just grammar.
Consider the Winograd Schema: 
"The city councilmen refused the demonstrators a permit because **they** feared violence." (They = Councilmen).
"The city councilmen refused the demonstrators a permit because **they** advocated violence." (They = Demonstrators).
Grammatically, both sentences are mathematically identical. To resolve the coreference, the Neural Network must possess a mathematical understanding of human psychology (councilmen fear violence; demonstrators advocate it). Standard statistical NLP fails here; it requires massive, context-aware Transformer models.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Dependency parsing/index.mdx': `---
title: Dependency Parsing
description: The mathematical process of analyzing the grammatical structure of a sentence, defining direct, hierarchical relationships between "head" words and their dependents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dependency Parsing">

While a "Bag of Words" model destroys sentence structure, Dependency Parsing explicitly mathematically maps it, turning a flat string of text into a highly structured Directed Graph.

## 1. The Root and The Edges
In Dependency Parsing, a sentence is mathematically converted into a Tree.
Every sentence has a **Root** (usually the main verb). Every other word is mathematically linked to a "Head" word via a directed edge (an arrow). 
For the sentence "The fast car crashed," the Root is "crashed." "car" is the Subject of "crashed" (an edge exists from crashed -> car). "The" and "fast" are adjectives modifying "car" (edges exist from car -> the, car -> fast).

## 2. Information Extraction
Once a sentence is mathematically transformed into a Dependency Graph, it becomes infinitely easier to query.
If you want to extract features for a self-driving car AI, you don't search for the string "fast." You mathematically query the Dependency Tree for any adjectives directly pointing to the noun "car." This mathematical structure allows computers to extract precise relationships (Subject-Verb-Object) regardless of how wildly the human scrambled the word order in the original sentence.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/FastText/index.mdx': `---
title: FastText
description: An advanced Word Embedding library developed by Facebook that mathematically represents words as a sum of their sub-word characters, allowing it to understand misspelled or brand new words.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="FastText"
  subtitle="Sub-word NLP Embeddings"
  tags={['NLP', 'Machine Learning', 'Facebook', 'Embeddings']}
>

Traditional Word2Vec models are mathematically fragile: if they encounter a word they didn't see during training (Out-Of-Vocabulary), they completely crash because they have no mathematical vector for it. FastText solves this.

## 1. Sub-Word N-Grams
Instead of mathematically mapping the whole word "apple" to a vector, FastText breaks the word into character n-grams (e.g., 3-character chunks): TICK1<ap, app, ppl, ple, le>TICK1.
During training, the Neural Network mathematically assigns a vector to every single *n-gram*, not the whole word. The final vector for "apple" is mathematically calculated simply by adding the n-gram vectors together.

## 2. Handling the Unknown
This mathematical architecture gives FastText a massive advantage in the real world.
If a user typos the word "appple", a standard NLP model throws an error. FastText simply breaks it down: TICK1<ap, app, ppp, ppl, ple, le>TICK1. Because it recognizes 80% of the mathematical sub-vectors from the original word "apple", it mathematically calculates a vector for "appple" that is nearly identical to "apple," allowing the AI to perfectly understand the typo without needing an explicit spell-checker.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/GloVe/index.mdx': `---
title: GloVe (Global Vectors)
description: A groundbreaking NLP algorithm developed by Stanford that mathematically calculates Word Embeddings by analyzing the global co-occurrence matrix of a massive text corpus.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="GloVe"
  subtitle="Global Word Embeddings"
  tags={['NLP', 'Machine Learning', 'Stanford', 'Embeddings']}
>

While Word2Vec uses a local, sliding window (a Neural Network looking at 5 words at a time) to learn embeddings, GloVe (Global Vectors for Word Representation) uses massive, global matrix mathematics.

## 1. The Co-occurrence Matrix
GloVe starts by building a gigantic mathematical table. 
If the vocabulary has 100,000 words, it builds a 100k x 100k matrix. It scans Wikipedia, and every time the word "Ice" appears near the word "Solid," it increments that specific cell in the matrix. 
After scanning billions of words, this matrix contains the absolute mathematical probability of every word appearing next to every other word.

## 2. Dimensionality Reduction
A 100k x 100k matrix is mathematically too massive to use in real-time AI. 
GloVe uses advanced linear algebra (similar to Singular Value Decomposition) to compress this massive matrix down into a dense 300-dimensional vector for each word. The resulting vectors possess incredible mathematical properties. If you take the GloVe vector for "King," subtract the vector for "Man," and add the vector for "Woman," the resulting mathematical coordinates will land almost exactly on the vector for "Queen." The math has physically mapped human semantic meaning.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Information extraction/index.mdx': `---
title: Information Extraction (IE)
description: The automated mathematical process of scanning unstructured human text (like PDFs or emails) and converting it into highly structured, relational database tables.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Information Extraction">

The vast majority of human knowledge (medical records, legal contracts, news articles) is unstructured text. SQL databases cannot query it. Information Extraction (IE) bridges this mathematical gap.

## 1. The IE Pipeline
IE is not a single algorithm; it is a pipeline of mathematical models.
1. **Named Entity Recognition (NER)**: Mathematically identifies nouns (People, Organizations, Dates).
2. **Coreference Resolution**: Mathematically links pronouns back to the Entities.
3. **Relation Extraction**: The most difficult step. If the text says, "Elon Musk founded SpaceX in 2002," the model must mathematically map the relationship: TICK1FounderOf(Elon Musk, SpaceX)TICK1 and TICK1FoundedIn(SpaceX, 2002)TICK1.

## 2. Knowledge Graphs
The output of an IE pipeline is not a flat file; it is a mathematical **Knowledge Graph**.
By extracting millions of relationships from Wikipedia, IE pipelines generate massive mathematical webs of Nodes (Entities) and Edges (Relationships). When you search Google for "Who is the CEO of Apple?", Google doesn't actually read a webpage. It mathematically queries its pre-compiled Knowledge Graph, instantly traversing the edge TICK1CEO_OfTICK1 between the node "Tim Cook" and the node "Apple," providing the answer in milliseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Lemmatization/index.mdx': `---
title: Lemmatization
description: A linguistically aware mathematical algorithm that reduces words to their absolute base dictionary form (lemma), taking into account context and part-of-speech.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lemmatization">

In NLP, "running," "runs," and "ran" are mathematically treated as three entirely different words, which dilutes the predictive power of a model. We must reduce them to their base form.

## 1. Stemming vs. Lemmatization
**Stemming** is a dumb, brute-force mathematical hack. It simply chops the ends off words. A stemmer chops "Caring" into "Car," which completely destroys the semantic meaning.
**Lemmatization** uses a massive, pre-compiled dictionary (like WordNet) and mathematical morphological analysis. It analyzes the context of the sentence. If it sees "He is caring," it knows "caring" is an adjective and correctly reduces it to the lemma "care," completely avoiding the "car" mistake.

## 2. The Computational Cost
Because Stemming is just a simple Regex chop, it is mathematically instantaneous. 
Lemmatization requires the computer to first run a Part-of-Speech Tagger (to figure out if the word is a noun or a verb), and then mathematically query a massive dictionary database. Therefore, Lemmatization is significantly slower and more CPU-intensive, but absolutely mandatory for high-accuracy NLP tasks like Sentiment Analysis or Machine Translation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Machine translation/index.mdx': `---
title: Machine Translation
description: The immensely complex AI task of mathematically decoding a sentence in a Source language and generating a semantically identical sentence in a Target language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Machine Translation">

Early translation systems (like old Google Translate) used Statistical MT, which mathematically mapped phrases from English to French using a massive dictionary. This resulted in robotic, grammatically broken translations.

## 1. Sequence-to-Sequence (Seq2Seq)
Modern translation uses Neural Machine Translation (NMT), specifically the Seq2Seq architecture.
The system uses two separate Neural Networks. 
1. **The Encoder**: Reads the English sentence one word at a time. It mathematically compresses the *meaning* of the entire sentence into a single, dense, high-dimensional vector (the Context Vector).
2. **The Decoder**: Takes that purely mathematical Context Vector and generates the French sentence, one word at a time. The Decoder has no idea what the original English words were; it is translating pure mathematical thought.

## 2. The Attention Mechanism
The original Seq2Seq had a massive mathematical bottleneck: forcing a 100-word paragraph into a single Context Vector caused the network to "forget" the beginning of the sentence.
In 2014, the **Attention Mechanism** was invented. Instead of one vector, the Decoder mathematically looks at *all* the vectors from the Encoder simultaneously. When translating the French word for "Apple," the math explicitly forces the Decoder to focus 99% of its computational "attention" on the specific English word "Apple," solving the memory bottleneck and paving the way for the Transformer architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Named entity recognition (NER)/index.mdx': `---
title: Named Entity Recognition (NER)
description: A sequence-labeling algorithm that mathematically scans a block of text and categorizes specific nouns into predefined classes like People, Organizations, and Locations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Named Entity Recognition">

If you feed a 500-page legal contract into a computer, it just sees 10 million meaningless ASCII characters. NER is the mathematical flashlight that highlights the important data.

## 1. Sequence Labeling (BIO Tagging)
NER is mathematically modeled as a Token Classification problem.
The sentence is split into words (Tokens). The Neural Network must assign a mathematical label to every single word. 
It uses the BIO format (Begin, Inside, Outside). 
For "Tim Cook is the CEO of Apple Inc":
- Tim: TICK1B-PERTICK1 (Beginning of a Person)
- Cook: TICK1I-PERTICK1 (Inside a Person)
- is the CEO of: TICK1OTICK1 (Outside any entity)
- Apple: TICK1B-ORGTICK1 (Beginning of an Organization)
- Inc: TICK1I-ORGTICK1 (Inside an Organization)

## 2. Context is Everything
A simple dictionary lookup cannot solve NER. If the algorithm sees the word "Apple," is it a fruit (TICK1OTICK1) or a corporation (TICK1B-ORGTICK1)? 
Modern NER uses bi-directional mathematical models (like BERT or Bi-LSTMs). The algorithm physically reads the words *before* "Apple" and the words *after* "Apple" simultaneously. By mathematically processing the surrounding context, the model can accurately deduce whether the entity is a piece of fruit or a trillion-dollar tech company.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/NMF)/index.mdx': `---
title: Non-Negative Matrix Factorization (NMF)
description: An advanced linear algebra technique used in NLP Topic Modeling to mathematically decompose a massive document matrix into constituent topics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Non-Negative Matrix Factorization">

If you have 10,000 news articles, how do you mathematically categorize them into "Sports," "Politics," and "Tech" without a human reading them? You use Topic Modeling algorithms like NMF.

## 1. The Matrix Decomposition
You start with a massive matrix $V$ (Documents x Words). Every cell is the frequency of a word in a document.
NMF uses iterative mathematical optimization to split $V$ into two smaller matrices: $W$ and $H$.
- $W$ (Documents x Topics): Mathematically shows how much of each Topic is inside each Document.
- $H$ (Topics x Words): Mathematically shows which Words belong to which Topic.
Crucially, $V \\approx W \\times H$.

## 2. The Power of Non-Negativity
Why use NMF instead of standard PCA (Principal Component Analysis)?
PCA allows negative numbers. A topic could mathematically be defined as "0.5 * Ball - 0.2 * Government." Negative words make absolutely no sense in human linguistics.
NMF mathematically forces all numbers in the matrices to be positive (Non-Negative). Therefore, a Topic is modeled purely as an additive combination of words (e.g., "0.8 * Goal + 0.5 * Penalty + 0.3 * Referee"). This mathematical constraint forces the algorithm to generate topics that are highly interpretable by human analysts.

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
