import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '60. Search, Retrieval & Recommender Systems/Full-text search/index.mdx': `---
title: Full-text search
description: Searching a single computer-stored document or a collection in a full-text database by examining all of the words in every stored document as it tries to match search criteria.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Full-Text Search">

If you want to find a string in a SQL database, you mathematically write \`SELECT * FROM users WHERE bio LIKE '%developer%'\`. 

<Callout icon="warning" title="The Substring Bottleneck">
  This biological approach forces the SQL database to scan every single row one by one, which is mathematically $O(N)$. If you have 10 million users, the query will take several seconds.
  
  **Full-Text Search** engines (like Elasticsearch or Solr) abandon row-scanning. They pre-process every document upon insertion, biologically breaking paragraphs down into individual tokens (words), removing punctuation, and stemming verbs (converting "running" to "run"). This enables sub-millisecond search across billions of documents.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Inverted indexes/index.mdx': `---
title: Inverted indexes
description: A database index storing a mapping from content, such as words or numbers, to its locations in a table, or in a document or a set of documents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Inverted Indexes">

The **Inverted Index** is the mathematical data structure that makes Full-Text Search possible. It is exactly like the biological index at the back of a textbook.

<Callout icon="success" title="Reversing the Map">
  A normal database maps a \`Document_ID\` to a list of words.
  An Inverted Index maps a \`Word\` to a list of \`Document_IDs\`.
  
  If the word "apple" appears in Document 4, 9, and 20, the Inverted Index stores: \`"apple" -> [4, 9, 20]\`. When a user searches for "apple", the engine biologically skips searching; it just mathematically looks up the word in a Hash Map in $O(1)$ time, instantly returning the three Document IDs.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/TF-IDF/index.mdx': `---
title: TF-IDF
description: Term frequency-inverse document frequency is a numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TF-IDF">

If a user searches for "the computer", an Inverted Index will return 100,000 documents containing the word "the" and 50 documents containing the word "computer". How do we mathematically rank them?

<Callout icon="info" title="Weighing Rarity">
  **TF-IDF** (Term Frequency - Inverse Document Frequency) solves this.
  
  It biologically counts how often a word appears in the current document (TF). It then mathematically divides that by how often the word appears in the *entire database* (IDF). Because the word "the" appears in every document, its IDF score is near zero, rendering it mathematically worthless. Because the word "computer" is rare, its IDF score is massive, forcing the search engine to rank those 50 documents at the very top.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/BM25/index.mdx': `---
title: BM25
description: A ranking function used by search engines to estimate the relevance of documents to a given search query, representing the state-of-the-art in TF-IDF-like retrieval.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BM25">

While TF-IDF is biologically foundational, it mathematically fails on massive documents. If a document is a 10,000-page book, the word "computer" might appear 500 times just by pure chance, giving it an artificially high TF score.

**Okapi BM25** is the modern mathematical upgrade, and the default algorithm in Elasticsearch. It biologically introduces **term frequency saturation**. After a word appears ~3 times in a document, BM25 mathematically caps its score. It also normalizes based on document length, preventing a 10,000-page book from always outranking a highly relevant 2-page article.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Semantic search/index.mdx': `---
title: Semantic search
description: Search techniques that seek to improve search accuracy by understanding the searcher's intent and the contextual meaning of terms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semantic Search">

BM25 is a "Lexical" search engine. It biologically looks for exact keyword matches. If a user searches for "funny dog", BM25 will mathematically ignore a document about a "hilarious puppy" because the exact characters do not match.

**Semantic Search** abandons exact string matching. It mathematically attempts to understand the biological *meaning* of the query. By converting both the query and the documents into mathematical Vectors, the search engine realizes that "dog" and "puppy" occupy the exact same region of mathematical space, allowing it to return the "hilarious puppy" document.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Vector search/index.mdx': `---
title: Vector search
description: A method for finding similar items by representing them as dense vectors in a high-dimensional space and measuring the distance between them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vector Search">

**Vector Search** is the mathematical engine that powers Semantic Search and modern AI RAG pipelines.

<Callout icon="tip" title="High-Dimensional Geometry">
  An LLM converts a paragraph of text into an array of floating-point numbers (e.g., \`[0.24, -0.81, 0.99...]\`). This array represents a single coordinate point in a 1,536-dimensional mathematical universe.
  
  When a user searches, their query is also converted into a point in that universe. The database (like Pinecone or Milvus) mathematically calculates the **Cosine Similarity** between the query point and all document points. The points physically closest to the query point are the most biologically relevant results.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Hybrid search/index.mdx': `---
title: Hybrid search
description: A search strategy that combines traditional keyword-based (lexical) search with modern vector-based (semantic) search to achieve the highest possible relevance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hybrid Search">

Neither BM25 nor Vector Search is mathematically perfect. 
- BM25 fails if the user biologically types a synonym.
- Vector Search mathematically fails if the user types an exact serial number (like "iPhone 15 Pro Max"), because the LLM might return an "iPhone 14" since they are semantically similar.

**Hybrid Search** mathematically combines them. It biologically runs both a BM25 query and a Vector query simultaneously, and then mathematically merges the result sets using an algorithm like **Reciprocal Rank Fusion (RRF)** to guarantee the absolute best results.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Candidate generation/index.mdx': `---
title: Candidate generation
description: The first stage of a modern recommendation system, designed to rapidly retrieve a small subset of hundreds of items from a massive corpus of millions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Candidate Generation">

When you open YouTube, the recommendation system mathematically has 50 milliseconds to pick 10 videos out of a database of 2 Billion videos. It is biologically impossible to run complex AI models on all 2 Billion videos.

<Callout icon="warning" title="The Funnel Architecture">
  The system uses a mathematical funnel. **Candidate Generation** is the top of the funnel.
  
  It uses highly biological, lightweight algorithms (like Collaborative Filtering or approximate nearest neighbors) to ruthlessly filter the 2 Billion videos down to a pool of ~500 "Candidates". These 500 videos are roughly relevant to you, mathematically eliminating 99.9% of the database in less than 10 milliseconds.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Ranking/index.mdx': `---
title: Ranking
description: The second stage of a recommendation system, where a sophisticated machine learning model assigns a precise score to each candidate item to determine the final display order.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ranking (Scoring)">

Once Candidate Generation has mathematically narrowed the pool down to 500 videos, the **Ranking** stage takes over.

Because 500 is a biologically small number, the system can afford to run massive, mathematically expensive Deep Neural Networks. The Ranking model looks at thousands of features: your past watch history, the video's click-through rate, the time of day, and the thumbnail colors. It mathematically assigns an exact probability score (e.g., \`0.92% chance to click\`) to all 500 videos, and sorts them from highest to lowest.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Reranking/index.mdx': `---
title: Reranking
description: The final stage of a recommendation system, applying business logic and diversity constraints to the mathematically ranked list before displaying it to the user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reranking (Filtering)">

The Ranking stage is mathematically pure—it only cares about maximizing your click probability. However, this leads to a biological disaster: the top 10 videos might all be mathematically identical (e.g., 10 different videos of the exact same Minecraft gameplay).

**Reranking** applies human biological business logic at the very end.
It mathematically forces diversity (ensuring no more than 2 videos from the same creator), removes videos you biologically already watched, injects sponsored ads into specific slots, and filters out clickbait or mathematically flagged toxic content.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Collaborative filtering/index.mdx': `---
title: Collaborative filtering
description: A method of making automatic predictions (filtering) about the interests of a user by collecting preferences or taste information from many users (collaborating).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Collaborative Filtering">

**Collaborative Filtering** is the mathematical algorithm that made Amazon and Netflix famous. It powers the *"People who bought this also bought..."* feature.

<Callout icon="success" title="The Wisdom of Crowds">
  Crucially, Collaborative Filtering knows biologically *nothing* about the items themselves. 
  
  If User A likes Movie 1 and Movie 2, and User B likes Movie 1, the algorithm mathematically assumes User B will also like Movie 2. It doesn't know that the movies are Sci-Fi; it only looks at the mathematical overlap of human behavior.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Content-based filtering/index.mdx': `---
title: Content-based filtering
description: A recommendation method that uses item features to recommend other items similar to what the user likes, based on their previous actions or explicit feedback.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Content-Based Filtering">

While Collaborative Filtering relies on other humans, **Content-Based Filtering** relies purely on the biological attributes of the item itself.

If you watch a video tagged \`[Cooking, Italian, 10-minutes]\`, the algorithm mathematically searches the database for other videos with the exact same tags. It is mathematically excellent at recommending niche, highly specific content, but it biologically creates an "Echo Chamber"—if you only watch Cooking videos, it will never mathematically realize that you might also enjoy a video about Baking, because the tags do not match.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Matrix factorisation/index.mdx': `---
title: Matrix factorisation
description: A class of collaborative filtering algorithms used in recommender systems that factorizes the user-item interaction matrix into the product of two lower-dimensional rectangular matrices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Matrix Factorization">

Imagine a massive Excel spreadsheet where rows are 100,000 Users and columns are 10,000 Movies. The cells contain ratings (1-5 stars). Most cells are biologically empty because nobody has watched every movie.

**Matrix Factorization** (made famous during the Netflix Prize) is the hardcore linear algebra used to mathematically fill in the blanks. It mathematically decomposes the massive sparse matrix into two smaller, dense matrices (User embeddings and Item embeddings). By multiplying these smaller matrices back together, it mathematically predicts exactly what rating User 42 would give Movie 99, even if they have never seen it.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Embedding-based recommendations/index.mdx': `---
title: Embedding-based recommendations
description: Recommendation systems that represent users and items as dense vectors (embeddings) in a shared latent space, allowing for similarity calculations via dot products.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Embedding-Based Recommendations">

Modern deep learning replaces classic Matrix Factorization with **Embeddings**.

<Callout icon="info" title="The Shared Latent Space">
  An AI model mathematically converts both the User and the Item into 128-dimensional vectors. 
  
  These vectors are biologically plotted in the exact same mathematical universe. If User A loves Action movies, the AI moves User A's vector physically closer to the vector for "Die Hard". To generate recommendations, the system just performs a rapid Nearest Neighbor mathematical search around the User's vector, instantly returning the 50 closest items.
</Callout>

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Learning to rank/index.mdx': `---
title: Learning to rank
description: The application of machine learning, typically supervised, semi-supervised or reinforcement learning, in the construction of ranking models for information retrieval systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Learning to Rank (LTR)">

In the 1990s, search engine ranking formulas were biologically written by humans (e.g., \`score = BM25 + (PageRank * 0.5)\`). This mathematically failed as the web grew too complex.

**Learning to Rank (LTR)** uses Machine Learning to mathematically discover the perfect ranking formula. Engineers feed the AI thousands of search queries alongside biological human ratings of the results. The AI (often using algorithms like XGBoost or RankNet) mathematically figures out exactly how to weigh Title matches vs URL matches vs Recency to produce the perfect Search Engine Results Page (SERP).

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Personalisation/index.mdx': `---
title: Personalisation
description: The process of tailoring a service or a product to accommodate specific individuals, sometimes tied to groups or segments of individuals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Personalization">

**Personalization** is the biological transition from "Search" to "Recommendation".

If two different users type the exact same query "Apple" into Google, a non-personalized engine mathematically returns the exact same results. A Personalized engine mathematically analyzes the users' embeddings. If User A is a software engineer and User B is a farmer, the system biologically reranks the results, showing the iPhone to User A and fruit orchards to User B.

</ConceptTemplate>
`,
  '60. Search, Retrieval & Recommender Systems/Cold-start problem/index.mdx': `---
title: Cold-start problem
description: A potential problem in computer-based information systems which involves a degree of automated data modelling, occurring when the system cannot draw any inferences for users or items about which it has not yet gathered sufficient information.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cold-Start Problem">

The **Cold-Start Problem** is the greatest biological nightmare of recommendation systems.

If a completely new User signs up for Spotify, the Collaborative Filtering matrix is entirely blank. The system mathematically has absolutely zero behavioral data to generate recommendations. Similarly, if a creator uploads a brand new Video, it has zero views, so the system mathematically doesn't know who to show it to. 

Systems must rely on biological hacks to survive cold-starts: asking the new user to pick 3 genres during onboarding, or using pure Content-Based Filtering to randomly push the new video to a small test audience to mathematically gather initial data.

</ConceptTemplate>
`,
}

async function generateMega115() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega115().catch(console.error)
