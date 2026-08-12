import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/B-trees/index.mdx': `---
title: B-Trees
description: A self-balancing search tree optimized for systems that read and write large blocks of data, like databases and file systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="B-Trees">

A **B-Tree** is a generalized self-balancing search tree. Unlike a standard Binary Search Tree where each node has at most two children, a node in a B-Tree can have a large, variable number of keys and children (often hundreds or thousands).

<Callout icon="info" title="The Disk Optimization">
  B-Trees were explicitly invented to solve the "Disk I/O problem." Reading from a physical hard drive is incredibly slow compared to reading from RAM. A standard binary search tree is deep, requiring many separate disk reads. A B-Tree is extremely wide and shallow, allowing massive amounts of data to be searched with very few disk reads.
</Callout>

## Properties of a B-Tree

A B-Tree of order $m$ satisfies the following properties:
1. **Node Capacity**: Every node has at most $m$ children.
2. **Minimum Capacity**: Every internal node (except the root) has at least $\\lceil m/2 \\rceil$ children.
3. **Key Count**: A node with $k$ children contains exactly $k-1$ sorted keys.
4. **Leaf Depth**: All leaf nodes appear on the exact same level (the tree is perfectly balanced).

## How Searching Works

Searching a B-Tree is similar to a binary search tree, just generalized:
1. Start at the root node.
2. Compare your target value to the sorted keys in the current node.
3. If the value matches a key, return it.
4. If the value is less than the first key, follow the leftmost child pointer.
5. If the value falls between two keys, follow the pointer between them.
6. Repeat until the value is found or you hit a leaf node and the value isn't there.

## Time Complexity

<ComparisonTable 
  headers={['Operation', 'Average Case', 'Worst Case']}
  rows={[
    ['Search', '$O(\\log n)$', '$O(\\log n)$'],
    ['Insert', '$O(\\log n)$', '$O(\\log n)$'],
    ['Delete', '$O(\\log n)$', '$O(\\log n)$']
  ]}
/>

*(Note: The base of the logarithm is the branching factor of the tree, which is often very large, making the tree depth extremely shallow).*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/B+ trees/index.mdx': `---
title: B+ Trees
description: A crucial variation of the B-Tree where all values are stored in the leaf nodes, forming the backbone of modern relational databases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="B+ Trees">

A **B+ Tree** is an advanced variation of a B-Tree. It is the absolute standard data structure used by almost all relational databases (like MySQL, PostgreSQL, and SQL Server) to store and index tables.

<Callout icon="success" title="The Key Difference">
  In a standard B-Tree, both keys and actual data records can be stored in *any* node (internal or leaf). 
  In a **B+ Tree**, internal nodes ONLY store keys for routing. The actual data records are ONLY stored in the leaf nodes. Furthermore, the leaf nodes are linked together in a doubly-linked list.
</Callout>

## Why is it better for databases?

### 1. Higher Fanout (Shallower Tree)
Because internal nodes don't waste space storing actual data records, they can store vastly more routing keys per block. This means a B+ Tree has a much higher "fanout" (branching factor) than a B-Tree. 
A B+ Tree with millions of records might only be 3 or 4 levels deep, meaning finding any record requires a maximum of 4 disk reads.

### 2. Fast Range Queries
Databases frequently need to execute range queries (e.g., \`SELECT * FROM Users WHERE Age > 20 AND Age < 30\`). 
In a standard B-Tree, finding all these users requires constantly traversing up and down the tree branches. 
In a B+ Tree, you simply traverse down to find the first user (Age 21), and because the leaves form a linked list, you just sequentially read across the leaf nodes until you hit Age 30. It is incredibly fast.

<ArchitectureDiagram chart={\`
graph TD
  Root[Internal Node: Keys Only] --> Child1[Internal Node: Keys Only]
  Root --> Child2[Internal Node: Keys Only]
  Child1 --> Leaf1[Leaf: Data Records]
  Child1 --> Leaf2[Leaf: Data Records]
  Child2 --> Leaf3[Leaf: Data Records]
  Child2 --> Leaf4[Leaf: Data Records]
  Leaf1 <--> Leaf2
  Leaf2 <--> Leaf3
  Leaf3 <--> Leaf4
\`} />

## Time Complexity

<ComparisonTable 
  headers={['Operation', 'Time Complexity', 'Explanation']}
  rows={[
    ['Search (Exact Match)', '$O(\\log n)$', 'Traverse down the tree to the specific leaf node.'],
    ['Search (Range)', '$O(\\log n + k)$', 'Traverse to the start of the range, then sequential read $k$ elements via the linked list.'],
    ['Insert/Delete', '$O(\\log n)$', 'Leaf node splitting or merging might cascade up to the root, but the depth is logarithmic.']
  ]}
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Tries/index.mdx': `---
title: Tries (Prefix Trees)
description: A specialized tree data structure used for efficient retrieval of strings and prefix matching.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tries (Prefix Trees)">

A **Trie** (pronounced "try", from the word re*trie*val) is a specialized tree data structure designed to store a dynamic set of strings. Unlike a binary search tree, nodes in a trie do not store the key associated with that node; instead, its position in the tree defines the key with which it is associated.

<Callout icon="info" title="The Autocomplete Structure">
  If you have ever used a search engine or texted on a smartphone, you have used a Trie. They are the underlying data structure used to power fast **autocomplete** and spell-checking features.
</Callout>

## How a Trie Works

1. **The Root**: The root node represents an empty string.
2. **Edges**: Each edge represents a single character.
3. **Nodes**: Each node represents the string prefix formed by the path from the root to that node.
4. **Word Termination**: A boolean flag (or a special character) is stored at specific nodes to indicate that the path to this node constitutes a complete, valid word.

### Example
If we insert the words "CAT", "CAR", and "DOG" into a Trie:
- The root will have two children: 'C' and 'D'.
- 'C' will have a child 'A'.
- 'A' will have two children: 'T' (marked as a complete word) and 'R' (marked as a complete word).

## Time Complexity

The major advantage of a Trie over a Hash Table or Binary Search Tree is its time complexity regarding string length.

<ComparisonTable 
  headers={['Operation', 'Time Complexity', 'Variables']}
  rows={[
    ['Insert', '$O(m)$', '$m$ = length of the string being inserted.'],
    ['Search (Exact Word)', '$O(m)$', '$m$ = length of the string being searched for.'],
    ['Search (Prefix)', '$O(m)$', '$m$ = length of the prefix. Very fast for finding all words starting with "app".']
  ]}
/>

*Notice that the time complexity is entirely independent of $n$ (the total number of words in the Trie). Searching a dictionary of 10 words takes the exact same time as searching a dictionary of 10 million words.*

## Space Complexity Trade-off

The primary downside of a standard Trie is its high memory consumption. If you have many words that don't share common prefixes, you end up creating a massive amount of nodes, each allocating an array of pointers (e.g., 26 pointers for the English alphabet), most of which are null. Variations like the **Radix Tree** (Compressed Trie) are often used to merge single-child nodes and save space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Red-black trees/index.mdx': `---
title: Red-Black Trees
description: A self-balancing binary search tree that ensures $O(\\log n)$ operations using color properties.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Red-Black Trees">

A **Red-Black Tree** is a sophisticated type of self-balancing binary search tree. In a standard binary search tree, inserting sorted data can cause the tree to degrade into a linked list, ruining performance to $O(n)$. Red-Black Trees solve this by strictly enforcing a set of coloring rules that guarantee the tree remains relatively balanced.

<Callout icon="info" title="Industry Adoption">
  Red-Black trees are one of the most practically used data structures in computer science. They are the underlying implementation for the \`std::map\` and \`std::set\` in C++, the \`TreeMap\` in Java, and the Completely Fair Scheduler (CFS) used in the Linux Kernel.
</Callout>

## The 5 Rules of Red-Black Trees

Every node in the tree contains an extra bit of data denoting its color (Red or Black). The tree maintains its balance by rigorously enforcing these rules during every insertion and deletion:

1. Every node is colored either **Red** or **Black**.
2. The root node is always **Black**.
3. All leaf nodes (NIL nodes) are considered **Black**.
4. If a node is **Red**, both of its children must be **Black**. *(No two consecutive red nodes on a path).*
5. Every path from a node to any of its descendant NIL leaves must contain the **exact same number of Black nodes**. (This is called the "Black Depth").

## Balancing Operations

When you insert a new node, it is initially colored Red. If this violates Rule 4 (its parent is also Red), the tree must rebalance itself using two operations:
1. **Recoloring**: Flipping the colors of the parent, uncle, and grandparent nodes.
2. **Rotations**: Changing the structural pointers (Left-Rotate or Right-Rotate) to restructure the tree while preserving binary search ordering.

## Time Complexity

Because of Rule 4 and Rule 5, the longest possible path from the root to a leaf is no more than twice as long as the shortest possible path. Therefore, the tree is guaranteed to be $O(\\log n)$ in depth.

<ComparisonTable 
  headers={['Operation', 'Worst-Case Time Complexity']}
  rows={[
    ['Search', '$O(\\log n)$'],
    ['Insert', '$O(\\log n)$'],
    ['Delete', '$O(\\log n)$']
  ]}
/>

Compared to AVL Trees, Red-Black Trees are slightly less strictly balanced. This means searches might take slightly longer, but insertions and deletions are faster because fewer structural rotations are required.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/AVL trees/index.mdx': `---
title: AVL Trees
description: The first invented self-balancing binary search tree, optimized for fast lookups.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AVL Trees">

Invented in 1962 by Adelson-Velsky and Landis (hence "AVL"), the **AVL Tree** was the first data structure designed to solve the problem of unbalanced binary search trees.

An AVL tree is a self-balancing binary search tree where the difference in heights between the left and right subtrees of *any* node is at most 1.

<Callout icon="info" title="The Balance Factor">
  Every node in an AVL tree maintains a "Balance Factor," which is calculated as:
  \`BalanceFactor = Height(Left Subtree) - Height(Right Subtree)\`
  In a valid AVL tree, the Balance Factor of every node must be either -1, 0, or 1.
</Callout>

## How it Maintains Balance (Rotations)

When a node is inserted or deleted, the heights of the ancestors are updated. If any ancestor's Balance Factor becomes -2 or +2, the tree is unbalanced and must immediately fix itself using **Tree Rotations**.

There are four cases of imbalance, solved by four specific rotations:
1. **Left-Left (LL) Case**: Solved by a single Right Rotation.
2. **Right-Right (RR) Case**: Solved by a single Left Rotation.
3. **Left-Right (LR) Case**: Solved by a Left Rotation on the child, followed by a Right Rotation on the parent.
4. **Right-Left (RL) Case**: Solved by a Right Rotation on the child, followed by a Left Rotation on the parent.

## AVL vs. Red-Black Trees

Both AVL and Red-Black trees provide $O(\\log n)$ worst-case time complexity, but they are used in different scenarios based on their structural strictness.

<ComparisonTable 
  headers={['Feature', 'AVL Trees', 'Red-Black Trees']}
  rows={[
    ['Balancing Strictness', 'Very strict (height diff max 1).', 'Less strict (longest path max 2x shortest).'],
    ['Lookup Speed', 'Faster (due to stricter balance/shorter depth).', 'Slightly slower.'],
    ['Insert/Delete Speed', 'Slower (requires more rotations to maintain strict balance).', 'Faster (requires fewer rotations).'],
    ['Memory Overhead', 'Requires storing an integer (height) per node.', 'Requires storing a single bit (color) per node.'],
    ['Ideal Use Case', 'Read-heavy applications (e.g., dictionaries).', 'Write-heavy applications (e.g., OS schedulers).']
  ]}
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Bloom filters/index.mdx': `---
title: Bloom Filters
description: A space-efficient probabilistic data structure used to test set membership.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bloom Filters">

A **Bloom filter** is a highly space-efficient probabilistic data structure invented by Burton Howard Bloom in 1970. It is used to answer a very specific question: **"Is this element a member of a set?"**

<Callout icon="warning" title="The Probabilistic Trade-off">
  Because Bloom filters use a fraction of the memory of a hash table, they make a mathematical compromise:
  - **False Positives are possible**: The filter might say "Yes, the item is in the set" when it actually isn't.
  - **False Negatives are impossible**: If the filter says "No, the item is not in the set", it is 100% guaranteed to not be there.
</Callout>

## How it Works

A Bloom filter consists of two things:
1. A bit array of $m$ bits, all initially set to 0.
2. $k$ different hash functions.

### Insertion
To add the word "apple" to the filter:
1. Run "apple" through all $k$ hash functions.
2. Each hash function outputs an index number between $0$ and $m-1$.
3. Go to the bit array and change the bits at those $k$ specific indices to 1.

### Checking Membership
To check if "banana" is in the filter:
1. Run "banana" through the exact same $k$ hash functions.
2. Check the bit array at the resulting indices.
3. If **ANY** of the bits are 0, "banana" is definitively NOT in the set.
4. If **ALL** of the bits are 1, "banana" *might* be in the set. (It is a false positive if those bits were accidentally flipped to 1 by the prior insertions of other words).

## Practical Use Cases

Bloom filters are used to prevent expensive operations (like a slow database query or a slow disk read) by putting a fast Bloom filter in front of them.

1. **Malicious URLs (Web Browsers)**: Chrome used to use a Bloom filter to check if a URL was malicious. If the filter said "No", Chrome loaded the page instantly. If the filter said "Yes", Chrome would do a slower network request to Google's servers to verify if it was a true positive.
2. **Databases (Cassandra / Postgres)**: Before doing an expensive disk seek to find a row, the database checks a Bloom filter in RAM. If the filter says "No", it skips the disk read entirely.
3. **Username Registration**: Checking if "user123" is already taken without hitting the central database.

## Tuning the Filter

You can control the false positive rate by tuning the size of the bit array ($m$) and the number of hash functions ($k$) relative to how many items you expect to insert ($n$). A larger bit array results in fewer false positives but uses more RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Hash tables/index.mdx': `---
title: Hash Tables
description: A data structure that implements an associative array abstract data type, mapping keys to values using a hash function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hash Tables">

A **Hash Table** is one of the most important and frequently used data structures in computer science. It implements the associative array (dictionary) abstract data type, allowing you to map keys to values with extraordinary speed.

<Callout icon="success" title="The Magic of O(1)">
  In an array, finding a specific value by scanning takes $O(n)$ time. A Hash Table allows you to find, insert, or delete a value based on its key in **$O(1)$ average time**, meaning it is practically instantaneous regardless of whether the table has 10 items or 10 billion items.
</Callout>

## The Anatomy of a Hash Table

A Hash Table consists of three primary components:
1. **The Array (Buckets)**: The underlying data structure that stores the actual data in indexed slots.
2. **The Hash Function**: A mathematical algorithm that takes a key (like a string "user_id") and scrambles it into an integer.
3. **The Modulo Operation**: The integer is divided by the size of the array, and the remainder is used as the exact index where the value will be stored.

\`Index = hash_function(key) % array_size\`

## Hash Collisions

Because the array has a limited size, and there are an infinite number of possible keys, it is a mathematical certainty (Pigeonhole Principle) that eventually, two different keys will hash to the exact same index. This is called a **Collision**.

Hash Tables must implement a strategy to resolve collisions.

### 1. Separate Chaining
Instead of storing the value directly in the array slot, each array slot holds a pointer to a Linked List. If a collision occurs, the new key-value pair is simply appended to the end of the linked list at that slot.
- **Pros**: Easy to implement; the table never physically fills up.
- **Cons**: Cache performance is poor due to pointers; if many collisions happen, lookup degrades to $O(n)$ as you traverse the linked list.

### 2. Open Addressing (Linear Probing)
All values are stored directly within the array. If a collision occurs at Index 5, the algorithm simply looks at Index 6. If 6 is full, it looks at 7, and so on, until it finds an empty slot.
- **Pros**: Excellent CPU cache performance (memory locality).
- **Cons**: Subject to "clustering" (long continuous blocks of filled slots) which drastically slows down future insertions.

## The Load Factor and Resizing

The **Load Factor** is the ratio of stored items to the total size of the array ($n/k$). 

If a hash table using Open Addressing has a capacity of 100 slots and you insert 95 items, every new insertion will cause massive collision chains. To prevent this, when the Load Factor reaches a certain threshold (usually 0.7 or 70%), the Hash Table will automatically **Resize**.

It allocates a new array double the size of the old one, and completely re-hashes every single item from the old array into the new one. This is an expensive $O(n)$ operation, but because it happens infrequently, the *amortized* cost of insertion remains $O(1)$.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Hash maps/index.mdx': `---
title: Hash Maps
description: The specific implementation and API of a Hash Table used in modern programming languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hash Maps">

While "Hash Table" refers to the underlying algorithmic data structure, a **Hash Map** generally refers to the specific API and object implementation provided by standard libraries in modern programming languages (e.g., \`HashMap\` in Java, \`dict\` in Python, \`Map\` in JavaScript, \`unordered_map\` in C++).

<Callout icon="info" title="Terminology Nuance">
  In general computer science discussions, Hash Table and Hash Map are used interchangeably. However, in specific ecosystems (like Java), there are historical differences: \`Hashtable\` is an older, thread-safe (synchronized) class that doesn't allow nulls, while \`HashMap\` is newer, unsynchronized (faster), and permits null keys.
</Callout>

## Common Operations

A Hash Map provides a key-value mapping interface. The underlying structure handles hashing, collision resolution, and resizing transparently to the developer.

<ComparisonTable 
  headers={['Operation', 'Description', 'Average Time']}
  rows={[
    ['Put / Set', 'Inserts a new key-value pair, or overwrites the value if the key already exists.', '$O(1)$'],
    ['Get', 'Retrieves the value associated with a specific key. Returns null/undefined if not found.', '$O(1)$'],
    ['Delete / Remove', 'Removes the key-value pair from the map.', '$O(1)$'],
    ['Contains Key', 'Checks if a specific key exists in the map without retrieving its value.', '$O(1)$']
  ]}
/>

## When NOT to use a Hash Map

Despite their incredible speed, Hash Maps are not the solution to every problem:

1. **Ordering**: Standard Hash Maps do not maintain the insertion order of elements. If you iterate over the keys, they will come out in seemingly random order based on their hash values. (Note: Some modern implementations, like Python 3.7+ \`dict\` and JS \`Map\`, maintain insertion order via an auxiliary linked list, but standard theory hash maps do not).
2. **Range Queries**: You cannot easily ask a Hash Map for "all keys between 10 and 20". You would have to scan the entire map $O(n)$. If you need range queries, use a Tree-based map (like Java's \`TreeMap\` which uses a Red-Black Tree).
3. **Memory Overhead**: Hash Maps require allocating a large underlying array, much of which remains empty to maintain a low Load Factor. They use significantly more memory than a standard array.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Directed graphs/index.mdx': `---
title: Directed Graphs (Digraphs)
description: A graph data structure where the edges have a specific direction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Directed Graphs (Digraphs)">

A **Directed Graph** (often abbreviated as **Digraph**) is a set of vertices (nodes) connected by edges, where the edges have a direction associated with them. 

<Callout icon="info" title="The One-Way Street">
  Think of a directed graph like a city map with only one-way streets. If there is a road from City A to City B, you can drive from A to B, but you cannot drive from B to A unless there is a separate road pointing back.
</Callout>

## Representation

In a directed graph, an edge is represented as an ordered pair $(u, v)$, meaning the edge strictly originates at vertex $u$ and terminates at vertex $v$. 
- $u$ is the **tail**.
- $v$ is the **head**.

### Indegree and Outdegree
Because edges have direction, we measure the connections of a vertex in two ways:
- **Indegree**: The number of edges pointing *in* to a vertex.
- **Outdegree**: The number of edges pointing *out* from a vertex.

## Common Use Cases

Directed graphs are used to model relationships that are fundamentally asymmetrical or one-way:

1. **The World Wide Web**: A web page (vertex) contains a hyperlink (directed edge) to another web page.
2. **Twitter/X Followers**: You follow a celebrity (directed edge), but they do not necessarily follow you back.
3. **State Machines**: Modeling the transitions from one state to another.
4. **Task Scheduling**: A task cannot begin until its prerequisite task is finished (this specifically requires a DAG—a directed graph with no cycles).

## Traversal

Traversing a directed graph requires algorithms like **Breadth-First Search (BFS)** or **Depth-First Search (DFS)**. 
However, algorithms must be careful to track which nodes have been visited. Because edges only flow in one direction, it is entirely possible that a DFS starting at Node A cannot reach Node B, even though both exist in the same graph. Furthermore, directed cycles (A -> B -> C -> A) can cause infinite loops if visited nodes are not tracked.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Undirected graphs/index.mdx': `---
title: Undirected Graphs
description: A graph data structure where the edges represent bidirectional relationships.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Undirected Graphs">

An **Undirected Graph** is a set of vertices (nodes) connected by edges, where the edges have no specific direction. The relationship between the two connected nodes is entirely symmetric.

<Callout icon="info" title="The Two-Way Street">
  Think of an undirected graph like a standard two-way road. If a road connects City A and City B, you can freely travel from A to B, and you can freely travel from B to A.
</Callout>

## Representation

In an undirected graph, an edge is represented as an unordered pair $\{u, v\}$. It implies that $u$ is adjacent to $v$, and $v$ is adjacent to $u$.

Because the relationship is symmetric, we do not separate "indegree" and "outdegree." We only measure the **Degree** of a vertex, which is the total number of edges connected to it.

## Common Use Cases

Undirected graphs model relationships that are inherently mutual or bidirectional:

1. **Facebook Friends**: If Alice is friends with Bob, then Bob is inherently friends with Alice. (Compared to Twitter, which is a Directed Graph).
2. **Computer Networks**: If a physical Ethernet cable connects Router A and Router B, data can flow in both directions.
3. **Map Routing**: Standard road networks (ignoring one-way streets) for GPS navigation algorithms like Dijkstra's or A*.
4. **Social Network Analysis**: Finding clusters or cliques of people who all know each other.

## Data Structures in Code

To implement an undirected graph in code, you generally use one of two representations:

### 1. Adjacency Matrix
A 2D array of size $V \\times V$ (where $V$ is the number of vertices). If there is an edge between $i$ and $j$, \`matrix[i][j]\` is set to 1.
- Because the graph is undirected, the matrix is perfectly symmetric across its diagonal (\`matrix[i][j] == matrix[j][i]\`).
- **Pros**: $O(1)$ edge lookup.
- **Cons**: $O(V^2)$ memory usage (terrible for sparse graphs).

### 2. Adjacency List
An array (or hash map) of lists. Each vertex has a list containing all its adjacent vertices.
- Because the graph is undirected, every edge is stored twice. If $\{A, B\}$ exists, B is added to A's list, and A is added to B's list.
- **Pros**: Optimal $O(V + E)$ memory usage for most real-world sparse graphs.
- **Cons**: $O(E)$ worst-case to check if a specific edge exists.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/DAGs/index.mdx': `---
title: Directed Acyclic Graphs (DAGs)
description: A directed graph with no directed cycles, fundamentally used for modeling dependencies and topological sorting.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Directed Acyclic Graphs (DAGs)">

A **Directed Acyclic Graph (DAG)** is a specific type of Directed Graph that has absolutely **no directed cycles**. This means if you start at any vertex $v$ and follow the one-way edges, it is mathematically impossible to ever loop back to vertex $v$.

<Callout icon="success" title="The Dependency Structure">
  DAGs are the ultimate data structure for modeling **dependencies**. If Task A must be done before Task B, you draw an arrow A -> B. Because it is a DAG, you are guaranteed that there are no circular dependencies (e.g., A needs B, B needs C, C needs A), which would make execution impossible.
</Callout>

## Topological Sorting

The defining algorithm associated with DAGs is the **Topological Sort**. 

A topological sort takes a DAG and produces a linear, flat list of the vertices such that for every directed edge $u \\to v$, vertex $u$ comes before vertex $v$ in the list.

- **Example**: If the DAG represents a university course prerequisite structure, the topological sort gives you the exact order you should take the classes semester by semester to graduate.
- **Note**: A topological sort is *only possible* if the graph is a DAG. If a cycle exists, the sort is impossible.

## Real-World Use Cases

DAGs are everywhere in modern software engineering:

1. **Git Version Control**: The history of Git commits forms a DAG. Branches diverge and merge, but time only flows forward; a commit cannot be its own ancestor.
2. **Build Systems (Make, Webpack, Maven)**: When you compile code, the build tool creates a DAG of file dependencies to figure out exactly which order to compile the files.
3. **Data Engineering Pipelines**: Tools like Apache Airflow explicitly use DAGs to orchestrate ETL jobs (Extract, Transform, Load).
4. **Spreadsheets**: When you type a formula in Excel, it builds a DAG of cell dependencies to know what other cells need to be recalculated when one changes. (If you create a circular dependency, Excel throws an error).

## Finding Cycles

To verify if a directed graph is a valid DAG, you use **Depth-First Search (DFS)**. During the traversal, you keep track of the current path in a "recursion stack." If you ever encounter a node that is already currently in the recursion stack, you have found a back-edge, proving a cycle exists and the graph is not a DAG.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/Disjoint sets - Union-Find/index.mdx': `---
title: Disjoint Sets (Union-Find)
description: A data structure that tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Disjoint Sets (Union-Find)">

The **Disjoint Set** data structure (often called the **Union-Find** data structure) is a specialized tool used to keep track of a set of elements partitioned into non-overlapping subsets. It provides near-instantaneous answers to the question: "Are these two items in the same group?"

<Callout icon="info" title="The Core Operations">
  The structure is defined by two primary operations:
  1. **Find**: Determine which subset a particular element is in. This is usually implemented by returning a "representative" or "root" element of that subset.
  2. **Union**: Join two subsets into a single subset.
</Callout>

## How it Works (Tree Representation)

Unlike traditional trees, Union-Find is often implemented using a simple flat array where \`parent[i]\` points to the parent of node \`i\`.
- Initially, every element is in its own subset, so \`parent[i] = i\` (every node is its own root).
- To **Union** $A$ and $B$, you find the root of $A$'s tree, and point it to the root of $B$'s tree.

## The Two Crucial Optimizations

A naive Union-Find implementation can degrade into a linked list, making operations $O(n)$. However, two brilliant optimizations make the time complexity practically constant.

### 1. Path Compression (Optimizing \`Find\`)
When you execute \`Find(x)\`, the algorithm traverses up the tree to find the root. **Path Compression** modifies the tree during this traversal: every node visited along the way is directly reattached to the root node. The next time you call \`Find\` on any of those nodes, it takes $O(1)$ time.

### 2. Union by Rank (Optimizing \`Union\`)
When joining two trees, if you attach a tall tree under a short tree, the overall height increases. **Union by Rank** keeps track of the depth (rank) of each tree. It always attaches the root of the shorter tree to the root of the taller tree, ensuring the tree remains as flat as possible.

## Time Complexity (Inverse Ackermann)

By combining Path Compression and Union by Rank, the time complexity of operations becomes $O(\\alpha(n))$, where $\\alpha$ is the **Inverse Ackermann function**.
This function grows so incredibly slowly that for all practical values of $n$ (even the number of atoms in the universe), $\\alpha(n) < 5$. Therefore, the operations take **amortized $O(1)$ time**.

## Practical Use Cases

1. **Kruskal's Algorithm**: Finding the Minimum Spanning Tree of a graph. Union-Find is used to quickly check if adding an edge will create a cycle.
2. **Cycle Detection**: Quickly detecting cycles in an undirected graph.
3. **Image Processing**: Finding connected components (like the "paint bucket" fill tool in Photoshop).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/Binary heaps/index.mdx': `---
title: Binary Heaps
description: A complete binary tree that satisfies the heap property, commonly used for priority queues.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Binary Heaps">

A **Binary Heap** is a specialized tree-based data structure that satisfies two specific properties: the Shape Property and the Heap Property. It is the most common implementation of a **Priority Queue**.

## The Two Rules of a Heap

1. **Shape Property (Complete Binary Tree)**: The tree is completely filled on all levels except possibly the lowest, which is filled from left to right. This guarantees the tree is perfectly balanced and its height is exactly $\\log_2(n)$.
2. **Heap Property**: 
   - **Max-Heap**: The key of a node is always $\\ge$ the keys of its children. The absolute largest element is always at the root.
   - **Min-Heap**: The key of a node is always $\\le$ the keys of its children. The absolute smallest element is always at the root.

<Callout icon="info" title="The Array Implementation">
  Because a binary heap is a *complete* tree, it is almost never implemented with node objects and pointers. It is implemented flatly inside a standard **Array**.
  For an element at index $i$:
  - Left child is at index $2i + 1$
  - Right child is at index $2i + 2$
  - Parent is at index $\\lfloor (i - 1) / 2 \\rfloor$
</Callout>

## Operations

### Insert: $O(\\log n)$
1. Add the new element to the very end of the array (bottom-right of the tree).
2. **"Bubble Up" (Heapify-up)**: Compare the new element with its parent. If it violates the heap property (e.g., it is larger than its parent in a Max-Heap), swap them. Repeat until the property is restored.

### Extract Max/Min: $O(\\log n)$
1. Remove the root element (index 0).
2. Take the very last element in the array and move it to the root.
3. **"Bubble Down" (Heapify-down)**: Compare the new root with its children. Swap it with the larger child (in a Max-Heap). Repeat until the property is restored.

## The Genius of Heapify: $O(n)$

If you have an unsorted array of $n$ elements and you want to turn it into a heap, you could insert them one by one, taking $O(n \\log n)$ time.
However, there is an algorithm called **Floyd's \`build_heap\`** which can take an entire unsorted array and reorganize it into a valid heap in strictly **$O(n)$ time** by running "Bubble Down" on internal nodes starting from the bottom up. This is a common technical interview trivia point.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/Fibonacci heaps/index.mdx': `---
title: Fibonacci Heaps
description: A collection of trees satisfying the minimum heap property, optimized for theoretical amortized time complexity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fibonacci Heaps">

A **Fibonacci Heap** is a highly advanced data structure for priority queues. Invented by Michael L. Fredman and Robert E. Tarjan in 1984, it was specifically designed to improve the asymptotic running time of network optimization algorithms like Dijkstra's shortest path and Prim's minimum spanning tree.

<Callout icon="warning" title="Theory vs. Practice">
  Fibonacci heaps are famous for having spectacular theoretical $O(1)$ time complexity for operations that take $O(\\log n)$ in standard Binary Heaps. However, they are notoriously complex to code and have high constant-factor overhead (lots of pointers and memory management). In real-world software, simpler data structures (like standard Binary Heaps or Pairing Heaps) often run faster in practice.
</Callout>

## Structure

Unlike a Binary Heap (which is a single tree in an array), a Fibonacci Heap is a **lazy, unstructured forest of trees**.
- It consists of a circular doubly linked list of tree roots.
- The trees are not necessarily binary; a node can have any number of children.
- It maintains a single pointer to the Minimum Node in the entire forest.

## The "Lazy" Philosophy

The genius of the Fibonacci heap is its laziness. When you insert items, it doesn't bother doing the hard math to organize them into trees immediately. It just lazily throws them into the root list. It only pays the computational price to consolidate and organize the trees when you force it to by extracting the minimum element.

## Time Complexity Comparison

The primary reason Fibonacci Heaps exist is the **Decrease Key** operation. In Dijkstra's algorithm, you frequently find a shorter path to a node and need to decrease its distance in the priority queue. 
A Binary Heap takes $O(\\log n)$ to do this. A Fibonacci Heap does it in $O(1)$ amortized time, mathematically dropping Dijkstra's time complexity from $O(E \\log V)$ down to $O(E + V \\log V)$.

<ComparisonTable 
  headers={['Operation', 'Binary Heap (Worst-Case)', 'Fibonacci Heap (Amortized)']}
  rows={[
    ['Find Minimum', '$O(1)$', '$O(1)$'],
    ['Insert', '$O(\\log n)$', '$O(1)$'],
    ['Decrease Key', '$O(\\log n)$', '$O(1)$  ⭐'],
    ['Merge (Meld)', '$O(n)$', '$O(1)$'],
    ['Extract Min', '$O(\\log n)$', '$O(\\log n)$']
  ]}
/>

*(Note: Amortized means that some individual operations might be very slow, but mathematically over a long sequence of operations, the average cost per operation is bounded to $O(1)$).*

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
