import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Sets/index.mdx': `---
title: Sets
description: A collection data structure that mathematically guarantees all stored elements are entirely unique, typically backed by a Hash Table.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sets">

In mathematics, a **Set** is a collection of distinct objects. In Computer Science, a Set is a highly optimized data structure designed strictly to enforce uniqueness and provide blazing-fast membership testing.

## 1. The Core Operations
Sets completely abandon the concept of "order" or "indices" (you cannot ask a Set for the "5th element"). Instead, they optimize for three mathematical operations:
- TICK1Add(x)TICK1: Inserts TICK1xTICK1 only if TICK1xTICK1 does not already exist.
- TICK1Remove(x)TICK1: Deletes TICK1xTICK1 from the collection.
- TICK1Contains(x)TICK1: Returns TICK1TrueTICK1 if TICK1xTICK1 exists.

Because Sets are typically implemented using a Hash Table under the hood, all three of these operations mathematically execute in perfect **$O(1)$ time**.

## 2. Set Mathematics
Sets excel at relational algebra. If you have a Set of "Registered Users" and a Set of "Banned Users", you can instantly perform massive mathematical operations:
- **Intersection**: Find users who exist in *both* Sets.
- **Union**: Combine the Sets together, automatically destroying duplicates.
- **Difference**: Find users who exist in the first Set, but *not* the second.

## 3. The Implementation Trick
Under the hood, most programming languages (like Python or Java) implement a Set simply by creating a standard Hash Map, but mathematically throwing away the "Values." 
When you add TICK1"Alice"TICK1 to a Set, it hashes the string and stores it in the underlying Hash Map as TICK1{"Alice": NULL}TICK1, leveraging the Map's inherent key uniqueness to build the Set.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/open addressing)/index.mdx': `---
title: Collision Resolution (Open Addressing)
description: A Hash Table conflict strategy where colliding elements are systematically pushed into the next available adjacent memory slot rather than creating a secondary data structure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Collision Resolution (Open Addressing)">

When two completely different pieces of data are mathematically hashed into the exact same memory index of a Hash Table, a **Collision** occurs. **Open Addressing** solves this not by building secondary Linked Lists (Chaining), but by mathematically searching the existing array for the next empty slot.

## 1. Linear Probing
The simplest Open Addressing strategy. If you try to place TICK1"Apple"TICK1 into Index $5$, but Index $5$ is already taken by TICK1"Banana"TICK1, Linear Probing simply checks Index $6$. If $6$ is full, it checks $7$. It steps forward exactly $1$ slot at a time until it finds an empty space.
- **Advantage**: It is brutally fast for the CPU because it mathematically preserves perfectly contiguous **Cache Locality**.
- **Disadvantage (Clustering)**: If $50$ elements hash to Index $5$, they will fill indices $5$ through $54$. This creates a massive mathematical "blockade" (Primary Clustering), causing future insertions to slow down to $O(N)$ as they crawl over the cluster.

## 2. Quadratic Probing
To mathematically break apart clusters, Quadratic Probing changes the step size. Instead of checking $1, 2, 3, 4$ slots ahead, it checks $1^2, 2^2, 3^2, 4^2$ slots ahead ($+1, +4, +9, +16$). 
This violently scatters colliding elements across the array, preventing Primary Clustering, though it sacrifices a small amount of Cache Locality.

## 3. Double Hashing
The absolute mathematically superior form of Open Addressing. If a collision occurs, it does not step forward by a fixed number. It runs the data through a **Second Hash Function** to dynamically calculate the step size. 
Because every unique key will mathematically produce a completely different step size, it perfectly eliminates all forms of clustering, providing the absolute theoretical maximum efficiency for a Hash Table.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Multisets/index.mdx': `---
title: Multisets (Bags)
description: A mathematical generalization of a Set that permits duplicate elements, tracking the exact frequencies or counts of each unique item.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multisets (Bags)">

A standard Set strictly destroys duplicates (inserting TICK1"Apple"TICK1 five times results in exactly one TICK1"Apple"TICK1). A **Multiset** (also known as a Bag) is a data structure that allows duplicates, but mathematically compresses them by tracking their frequencies.

## 1. The Key-Value Compression
Instead of storing TICK1["Apple", "Apple", "Apple"]TICK1 as a massive Array (which consumes vast amounts of memory), a Multiset implements itself as a Hash Map where the Key is the item, and the Value is an integer representing its count:
TICK1{"Apple": 3}TICK1.

When you add another TICK1"Apple"TICK1, the Multiset instantly looks up the key in $O(1)$ time and mathematically increments the integer to $4$.

## 2. Fast Frequency Analytics
Multisets are the absolute standard for generating rapid statistical distributions. If you scrape 10 million words from a Wikipedia article, dumping them into a Multiset mathematically generates a perfect word-frequency distribution in $O(N)$ time. 
You can instantly query TICK1count("the")TICK1 and receive the exact frequency in $O(1)$ time, a process that would take a standard Array $O(N)$ time to count manually.

## 3. Multiset Mathematics
Multisets support complex combinatorial logic:
- **Sum**: Adding two Multisets together mathematically adds their frequencies. (TICK1{A: 2} + {A: 3} = {A: 5}TICK1)
- **Intersection**: mathematically takes the *minimum* frequency of the shared elements. (TICK1{A: 2} ∩ {A: 3} = {A: 2}TICK1)

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Multimaps/index.mdx': `---
title: Multimaps
description: A dictionary-like data structure that mathematically permits a single key to map to multiple different values simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multimaps">

In a standard Hash Map (Dictionary), keys must be mathematically unique. If you map TICK1"Alice" -> "Admin"TICK1, and then later map TICK1"Alice" -> "User"TICK1, the standard Map will violently overwrite the first value. A **Multimap** is designed to allow a single Key to mathematically hold an entire collection of different Values.

## 1. The Implementation
Under the hood, a Multimap does not actually break the mathematical rules of Hashing. It simply changes the data type of the Value. 
Instead of mapping a String to a String, it maps a String to a **List** or a **Set**.
TICK1{"Alice": ["Admin", "User", "Billing"]}TICK1

When you insert a new value for TICK1"Alice"TICK1, the structure mathematically fetches the underlying List in $O(1)$ time, and dynamically appends the new value to it.

## 2. Graph Adjacency Lists
Multimaps are the absolute core of Graph Theory. To represent a massive social network where a single person has thousands of friends, the Graph is mathematically constructed as a Multimap where the Key is a User ID, and the Values are a List of all their friends' User IDs. 

## 3. Reverse Indexing
When building a Search Engine, you must map a single word (like TICK1"Algorithm"TICK1) to the thousands of different websites that contain that word. This is mathematically impossible with a standard Hash Map. A Multimap allows you to instantly build a massive **Reverse Index**, mapping one keyword to an infinitely expanding list of URLs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/HyperLogLog/index.mdx': `---
title: HyperLogLog
description: An incredibly advanced probabilistic algorithm that mathematically estimates the number of unique elements in a massive dataset using almost zero memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HyperLogLog">

If you want to count exactly how many *unique* users visited a website today, the standard approach is to push every IP address into a Set and count the size of the Set. 
If Google wants to do this for 10 Billion visitors, the Set would require hundreds of gigabytes of RAM just to store the unique IPs. **HyperLogLog** is a mathematical miracle that estimates the exact same number with 99% accuracy using roughly **1.5 Kilobytes** of RAM.

## 1. The Mathematical Coin Flip
HyperLogLog relies on the mathematical properties of uniform randomness. 
Imagine flipping a coin. Seeing one "Heads" is common. Seeing 10 "Heads" in a row is mathematically incredibly rare (a 1 in 1024 chance). 
HyperLogLog hashes every incoming IP address into a massive binary string (e.g., TICK101001110...TICK1). The Hash Function acts perfectly like a coin flip. 

## 2. Counting the Zeroes
The algorithm simply looks at the binary hash and counts the maximum number of **leading zeroes** it has ever seen. 
If the maximum leading zeroes it ever saw was $3$ (TICK10001...TICK1), it mathematically assumes it has processed roughly $2^3 = 8$ unique items. 
If it suddenly sees a hash with $20$ leading zeroes, it mathematically knows that an event that rare could only happen if it had processed roughly $2^{20}$ (1 Million) unique items. 

## 3. The Bucketing Trick
Relying on a single hash is statistically dangerous (a random fluke could ruin the estimate). HyperLogLog uses the first few bits of the hash to mathematically split the data into thousands of different "Buckets". It tracks the maximum leading zeroes for every bucket independently, and then uses a **Harmonic Mean** to average them all together, mathematically neutralizing outliers and achieving a staggering 99% accuracy while consuming virtually zero memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Hash functions/index.mdx': `---
title: Hash Functions
description: The foundational mathematical algorithms that deterministically compress arbitrary data into a fixed-size integer, forming the core of all Hash Tables and Cryptography.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hash Functions">

A **Hash Function** is a strict mathematical algorithm that takes an input of absolutely any size (a 3-letter word, or a 50-Gigabyte 4K movie), violently scrambles it, and outputs a fixed-size integer or string (the Hash). 

## 1. The Three Mathematical Rules
To be viable for Data Structures, a Hash Function must strictly obey three laws:
1. **Deterministic**: If you input the exact same file 1,000 times, it must mathematically output the exact same Hash 1,000 times.
2. **Fixed Size**: The output must always be the exact same length, regardless of the input size.
3. **Avalanche Effect**: Changing a single microscopic bit in a 50GB file must mathematically completely destroy and scramble the final Hash, making it completely unrecognizable from the original.

## 2. Hash Tables (Non-Cryptographic)
For data structures like Hash Maps, the algorithm does not need to be secure; it just needs to be incredibly fast. 
Algorithms like **MurmurHash** or **CityHash** are heavily optimized to mathematically scramble strings into 32-bit integers in nanoseconds. This integer is then passed through a Modulo operator (TICK1Hash % Array_SizeTICK1) to instantly calculate the exact memory array index where the data should be stored.

## 3. Cryptographic Hashes (SHA-256)
If you are storing Passwords or generating Bitcoin, speed is actually your enemy (it makes brute-forcing easier). 
Cryptographic functions like **SHA-256** apply massive, mathematically irreversible algebraic transformations. It is mathematically impossible (even with every supercomputer on Earth) to take a SHA-256 Hash and reverse-engineer it back into the original password, making it the absolute foundation of global cybersecurity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Cuckoo filters/index.mdx': `---
title: Cuckoo Filters
description: A highly advanced probabilistic data structure that improves upon Bloom Filters by mathematically allowing the deletion of elements while maintaining massive space efficiency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cuckoo Filters">

A **Bloom Filter** is a famous probabilistic data structure that can tell you if an element exists using almost zero memory. However, Bloom Filters have a fatal mathematical flaw: you can *never* delete an element from them. Because multiple elements mathematically share the same bits, turning a bit back to $0$ might accidentally corrupt other elements. 
**Cuckoo Filters** solve this completely.

## 1. The Fingerprint
Instead of turning single bits to $1$ (like a Bloom Filter), a Cuckoo Filter mathematically hashes the data into a tiny, compressed "Fingerprint" (e.g., an 8-bit integer). 
It then stores this physical 8-bit fingerprint inside a massively compressed array. Because the actual fingerprint is stored, the algorithm can easily find it and mathematically delete it later.

## 2. Cuckoo Hashing (The Eviction)
What happens if the array slot is already full? 
The filter mathematically acts like a Cuckoo bird (which famously kicks other birds' eggs out of their nests). 
Every fingerprint is mathematically assigned exactly two possible array slots. If slot A is full, the new fingerprint violently kicks the old fingerprint out of the slot. The old fingerprint is then mathematically forced to fly to its alternate slot B. If slot B is full, it kicks *that* fingerprint out. This chain reaction mathematically cascades through the array until an empty slot is found, ensuring the array remains densely packed.

## 3. Superiority to Bloom Filters
Cuckoo Filters are rapidly replacing Bloom Filters in modern databases. 
- They allow perfect mathematical $O(1)$ deletions.
- They are significantly faster for lookup queries.
- If the filter is relatively full (under 95%), they actually consume mathematically *less* memory than a Bloom Filter for the exact same False Positive rate.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Count-min sketch/index.mdx': `---
title: Count-Min Sketch
description: A probabilistic data structure that uses multiple hash functions to mathematically estimate the frequencies of events in a massive continuous data stream using constant memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Count-Min Sketch">

If you want to track the exact view count of every single video on YouTube, using a standard Hash Map (Multiset) would require terrifying amounts of RAM (billions of keys). 
The **Count-Min Sketch** is a probabilistic data structure that mathematically estimates the frequencies of everything in a massive, infinite data stream using a tiny, strictly fixed amount of memory.

## 1. The Mathematical Grid
A Count-Min Sketch physically consists of a 2D Array of integers (e.g., 4 rows and 1000 columns). 
Each of the 4 rows is mathematically paired with a completely different Hash Function. 
When a user watches a video (e.g., TICK1"Video_A"TICK1), the algorithm hashes the string 4 different times. It uses the resulting hashes to find 4 specific columns, and mathematically adds $+1$ to all four cells.

## 2. The Overestimation Problem
Because there are billions of videos and only 1000 columns, massive mathematical collisions will occur. TICK1"Video_B"TICK1 might accidentally hash into the exact same cell as TICK1"Video_A"TICK1. 
This means the cells will accidentally count views from *multiple* different videos. Therefore, the number in any given cell is mathematically guaranteed to be an **Overestimation** of the true frequency. It can never be an underestimation.

## 3. The Minimum Trick
To query the view count of TICK1"Video_A"TICK1, the algorithm hashes it 4 times and checks the 4 specific cells. 
Because every cell suffers from random collision noise, the algorithm mathematically selects the **Absolute Minimum** value among the 4 cells. The minimum value mathematically contains the *least amount of collision noise*, providing a highly accurate estimate of the true frequency using virtually zero memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Collision resolution (chaining/index.mdx': `---
title: Collision Resolution (Chaining)
description: A Hash Table conflict strategy where colliding elements are mathematically stored together in a Linked List hanging off the target memory slot.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Collision Resolution (Chaining)">

When two completely different pieces of data are mathematically hashed into the exact same memory index of a Hash Table, a **Collision** occurs. **Separate Chaining** is the most robust and widely used architectural solution to this mathematical inevitability.

## 1. The Linked List Strategy
Instead of forcing the colliding element to search for a new empty slot in the array (Open Addressing), Chaining mathematically changes the architecture of the Array itself. 
Every single slot in the Array does not store the data directly; it stores a pointer to the **Head of a Linked List**. 
If TICK1"Apple"TICK1 and TICK1"Banana"TICK1 both mathematically hash to Index $5$, they are simply both appended to the Linked List living at Index $5$. 

## 2. Graceful Degradation
The massive advantage of Chaining is that the Hash Table can mathematically never become "full." You can insert 10,000 elements into an Array of size 10. The table will not crash; it will simply grow 10 massive Linked Lists. 
However, if a specific Linked List becomes 1,000 elements long, searching it mathematically degrades from blazing-fast $O(1)$ to brutally slow $O(N)$ time.

## 3. The Java 8 Tree Optimization
To protect against catastrophic performance degradation (and malicious DDoS attacks designed to intentionally cause hash collisions), modern languages upgraded their Chaining architecture. 
In Java 8, if a specific bucket's Linked List mathematically exceeds 8 elements, the Hash Table instantly dynamically destroys the Linked List and replaces it with a **Red-Black Tree**. This guarantees that even in the absolute worst-case scenario of massive mathematical collisions, the lookup time is bounded to a highly efficient $O(\log N)$.

</ConceptTemplate>
`,
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
