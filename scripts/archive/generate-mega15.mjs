import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Binary search trees/index.mdx': `---
title: Binary Search Trees (BST)
description: The fundamental non-linear data structure enabling O(log n) search, insertion, and deletion by enforcing a strict sorted property.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Binary Search Trees (BST)">

A **Binary Search Tree (BST)** is a node-based data structure where each node has at most two children (Left and Right). It enforces a strict mathematical property: 
For any given node, all elements in its **Left Subtree** must be strictly less than the node's value, and all elements in its **Right Subtree** must be strictly greater than the node's value.

## 1. The Core Operations

If the tree is perfectly balanced, a BST allows you to instantly discard half of the remaining data at every step (similar to Binary Search on an array).

<ComparisonTable 
  headers={['Operation', 'Time Complexity (Average)', 'Time Complexity (Worst)']} 
  rows={[
    ['Search', 'O(log n)', 'O(n)'],
    ['Insert', 'O(log n)', 'O(n)'],
    ['Delete', 'O(log n)', 'O(n)']
  ]} 
/>

### In-Order Traversal
Because of the BST property, performing an **In-Order Traversal** (Left -> Root -> Right) on a BST will naturally visit every single node in perfectly sorted, ascending order in exactly TICK1O(n)TICK1 time.

## 2. The Worst-Case Nightmare
The Achilles' heel of a standard BST is that it has no self-balancing mechanism. 
If you insert data that is already sorted (e.g., inserting 1, 2, 3, 4, 5 into a new BST), every new node is attached to the Right child. 

The BST violently degenerates into a **Linked List**. 
Your TICK1O(log n)TICK1 tree operations mathematically collapse into TICK1O(n)TICK1. Searching for "5" requires traversing every single node. 

<Callout icon="warning" title="The Balancing Solution">
Because a standard BST is mathematically vulnerable to TICK1O(n)TICK1 degeneration, it is almost never used in production software. Instead, engineers use **Self-Balancing BSTs** (like AVL Trees or Red-Black Trees) which detect when the tree is becoming lopsided and mathematically rotate the nodes to guarantee TICK1O(log n)TICK1 worst-case performance.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/AVL trees/index.mdx': `---
title: AVL Trees
description: The first self-balancing Binary Search Tree, mathematically guaranteeing a strict height differential to ensure O(log n) performance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="AVL Trees">

Invented in 1962 by Adelson-Velsky and Landis, the **AVL Tree** mathematically solves the primary flaw of a standard Binary Search Tree (degeneration into a Linked List).

## 1. The Balance Factor
To prevent degeneration, an AVL tree tracks the height of every node's subtrees. It defines a mathematical **Balance Factor**:
TICK1Balance Factor = Height(Left Subtree) - Height(Right Subtree)TICK1

An AVL tree enforces a strict mathematical invariant: **The Balance Factor of every single node must ALWAYS be -1, 0, or 1.**
If an insertion or deletion causes any node's balance factor to become 2 or -2, the tree instantly halts and performs a geometric **Rotation**.

## 2. Tree Rotations
Rotations are TICK1O(1)TICK1 pointer swaps that mathematically flatten the tree without breaking the BST sorted property.
There are four types of imbalances, solved by four specific rotations:
1. **Left-Left (LL)**: Fixed with a Single Right Rotation.
2. **Right-Right (RR)**: Fixed with a Single Left Rotation.
3. **Left-Right (LR)**: Fixed with a Left Rotation on the child, then a Right Rotation on the parent.
4. **Right-Left (RL)**: Fixed with a Right Rotation on the child, then a Left Rotation on the parent.

## 3. The Performance Tradeoff
Because the AVL tree mathematically guarantees that the tree is strictly balanced, lookups are blazingly fast. **Search is guaranteed TICK1O(log n)TICK1 worst-case.**

However, this strictness comes at a computational cost during writes. Every single insertion or deletion might trigger multiple cascading rotations all the way up to the root, burning CPU cycles.

<Callout icon="info" title="When to use AVL Trees?">
AVL Trees are heavily optimized for **Read-Heavy** workloads. If your application searches a database a billion times a second but only inserts data once an hour (like an in-memory language dictionary), AVL trees mathematically outperform Red-Black trees because their strict balancing creates slightly shorter trees.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Red-black trees/index.mdx': `---
title: Red-Black Trees
description: A practical self-balancing BST that trades strict height balancing for significantly faster mathematical insertion and deletion operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Red-Black Trees">

While AVL Trees enforce a strict mathematical height balance, **Red-Black Trees** adopt a looser, color-based rule system. This looser balancing mathematically reduces the number of structural rotations required during insertions, making it the dominant self-balancing tree in modern software architecture.

## 1. The Mathematical Invariants
Every node contains an extra bit of data: its Color (Red or Black). A valid Red-Black Tree must mathematically satisfy 5 strict rules:

1. Every node is either Red or Black.
2. The Root is always Black.
3. All empty leaves (NIL) are considered Black.
4. **No two Red nodes can be adjacent** (A Red node cannot have a Red parent or Red child).
5. **Black-Height Property**: Every mathematical path from a given node down to any of its descendant NIL leaves must contain the exact same number of Black nodes.

Because of Rule 4 and Rule 5, the longest possible path from the root to a leaf is mathematically bounded to be no more than exactly **twice** the length of the shortest path. 

## 2. AVL vs Red-Black

<ComparisonTable 
  headers={['Metric', 'AVL Tree', 'Red-Black Tree']} 
  rows={[
    ['Balancing Rules', 'Strict height difference of max 1.', 'Loose coloring rules (max path is 2x shortest path).'],
    ['Search Speed', 'Slightly faster (shorter, denser tree).', 'Slightly slower.'],
    ['Insert/Delete Speed', 'Slower (often requires cascading rotations up to root).', 'Significantly faster (requires max 3 rotations mathematically).'],
    ['Primary Use Case', 'Read-Heavy environments.', 'General purpose (Read/Write balanced).']
  ]} 
/>

<Callout icon="tip" title="Ubiquity in Systems Engineering">
Red-Black Trees are everywhere. When you use a TICK1std::mapTICK1 or TICK1std::setTICK1 in C++, or a TICK1TreeMapTICK1 in Java, you are mathematically instantiating a Red-Black Tree under the hood. The Completely Fair Scheduler (CFS) in the Linux Kernel uses a Red-Black tree to mathematically track CPU task execution times in TICK1O(log n)TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/B-trees/index.mdx': `---
title: B-Trees
description: The massively wide, disk-optimized search tree that mathematically powers global file systems and database indices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="B-Trees">

Binary Search Trees (like AVL and Red-Black) are mathematically perfect when data fits in RAM. However, RAM is expensive. When data exceeds RAM (e.g., a 10TB PostgreSQL database), it must be stored on a slow, spinning Hard Disk (or SSD). 
A Disk is highly optimized for reading massive sequential blocks of data (e.g., 4KB at a time), but terrible at tiny, random reads.

If you stored a 10TB index in a Binary Search Tree, searching for a user would require ~40 pointer hops. On disk, that requires 40 individual disk I/O operations, which is catastrophically slow.
**B-Trees** were invented to solve this exact bottleneck.

## 1. The Fat Node (High Arity)
Instead of a node holding exactly 1 value and 2 children (Binary), a B-Tree node is mathematically massive. 

A single B-Tree node is designed to perfectly match the size of a disk block (e.g., 4KB). 
A single node can hold **hundreds of sorted values** and **hundreds of child pointers**. 
Because each node branches out in hundreds of directions (High Arity/Degree), the tree becomes incredibly short and incredibly wide.

## 2. Disk I/O Minimization
If you insert 1 billion records into a standard Binary Tree, the tree height is ~30. (30 slow disk reads to find data).
If you insert 1 billion records into a B-Tree with a branching factor of 100, the tree height is only **4**.

Searching a B-Tree for a user ID involves loading the massive Root node into RAM (1 disk read). The CPU does a lightning-fast Binary Search over the hundreds of keys in RAM to find the correct child pointer. It then loads that child node from disk (Disk read 2), and so on. 
**You find your data out of 1 billion records with a mathematical maximum of 4 disk I/O operations.**

<Callout icon="warning" title="B-Tree Splitting">
B-Trees are self-balancing. When a node fills up completely (exceeds its mathematical capacity of keys), it physically splits in half, and promotes the middle median key up to its parent node. If the root fills up and splits, the tree mathematically grows taller by exactly 1 level.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/B+ trees/index.mdx': `---
title: B+ Trees
description: The ultimate optimization of the B-Tree, enforcing that all data exists only at the leaf level to mathematically maximize disk-read efficiency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="B+ Trees">

A **B+ Tree** is an architectural evolution of the B-Tree. It mathematically optimizes the structure specifically for relational databases (like MySQL and PostgreSQL) that require executing lightning-fast Range Queries (e.g., *"Select all users born between 1990 and 2000"*).

## 1. The Separation of Keys and Data
In a standard B-Tree, every single node (Root, Internal, Leaf) contains both the Search Key (User ID: 50) and the actual Data (The massive user profile string). 

In a **B+ Tree**, the mathematical structure is bifurcated:
1. **Internal Nodes**: Contain ONLY the Search Keys (used purely as a routing map). They store absolutely zero data.
2. **Leaf Nodes**: Contain all the actual Data.

Because the Internal Nodes no longer waste precious 4KB disk block space holding bulky data payloads, they can mathematically pack thousands of more routing keys into a single disk block. This exponentially increases the branching factor, making a B+ Tree physically shorter than a B-Tree, further reducing Disk I/O.

## 2. The Leaf Linked List
Because all the actual data mathematically resides entirely in the bottom Leaf level, B+ Trees implement one final optimization: **The leaves are physically connected together via a Doubly-Linked List.**

<ComparisonTable 
  headers={['Operation', 'Standard B-Tree', 'B+ Tree']} 
  rows={[
    ['Point Query (Find ID 50)', 'Might find it early in the Root node (Fast).', 'Must mathematically traverse all the way down to the Leaf (Slightly slower).'],
    ['Range Query (Find IDs 50 to 900)', 'Requires mathematically traversing up and down the tree branches repeatedly (In-Order Traversal), causing chaotic, random disk reads (Extremely Slow).', 'Traverse down to ID 50. Then, simply iterate right across the Leaf Linked List on disk. This results in mathematically perfect sequential disk reads (Blazingly Fast).']
  ]} 
/>

<Callout icon="tip" title="The Database Standard">
Almost every major relational database on Earth (PostgreSQL, MySQL InnoDB, SQLite) utilizes B+ Trees as their default mathematical indexing structure. Their unrivaled dominance in sequential disk scanning makes them the backbone of global data storage.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Tries/index.mdx': `---
title: Tries (Prefix Trees)
description: A highly specialized, multi-way tree structure optimized exclusively for string manipulation, autocomplete, and prefix-matching.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Tries (Prefix Trees)">

A **Trie** (pronounced "try", from re**trie**val) is a deterministic finite automaton represented as a tree. Unlike a BST where a node mathematically contains an entire word (e.g., "APPLE"), in a Trie, each node represents a **single mathematical character** (e.g., 'A'). 

The word is defined by the mathematical *path* taken from the Root to the Leaf.

## 1. The Structure
1. The Root node is empty.
2. Each node contains an array (or hash map) of pointers to its children (e.g., 26 pointers for the English alphabet).
3. Each node contains a boolean TICK1isEndOfWordTICK1 flag.

If you insert "CAT" and "CAR", the tree mathematically shares the 'C' and 'A' nodes. At the 'A' node, it branches: one pointer leads to 'T' (where TICK1isEndOfWord = trueTICK1), and another leads to 'R' (where TICK1isEndOfWord = trueTICK1).

## 2. Time Complexity Magic
If you store 10 million English words in a Binary Search Tree, searching for a word takes TICK1O(log N)TICK1 string comparisons, where TICK1NTICK1 is 10 million.

If you store 10 million words in a Trie, searching for a word mathematically takes **TICK1O(L)TICK1**, where TICK1LTICK1 is the length of the word you are searching for (e.g., 5 characters). It is completely, mathematically independent of how many millions of words are in the dictionary. It is blisteringly fast.

## 3. Autocomplete (Prefix Matching)
If a user types "APP" into a search bar, a database TICK1LIKE 'APP%'TICK1 query requires scanning thousands of rows. 

In a Trie, you mathematically traverse down to the 'P' node (3 operations). To provide autocomplete suggestions, you simply execute a Depth-First Search (DFS) from that 'P' node downward, immediately yielding "APPLE", "APPLICATION", and "APPROACH".

<Callout icon="warning" title="The Memory Cost">
Tries trade mathematical time complexity for extreme memory consumption. If every node contains a 26-element array of pointers, and most pointers are null, the tree wastes massive amounts of RAM. Modern engines optimize this by using **Compressed Tries (Radix Trees)**, which mathematically merge long chains of single-child nodes (e.g., merging 'A'->'P'->'P'->'L'->'E' into a single "APPLE" node) to save space.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Segment trees/index.mdx': `---
title: Segment Trees
description: A highly specialized algorithmic tree designed to mathematically execute lightning-fast range queries over an array while supporting rapid updates.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Segment Trees">

Imagine you have a massive array of 100,000 numbers. You need to repeatedly answer queries like, *"What is the sum of all numbers between index 400 and index 90,000?"* 

If you just run a mathematical TICK1forTICK1 loop, the query takes TICK1O(N)TICK1 time. If you do this 100,000 times, your algorithm becomes TICK1O(N^2)TICK1 and your server times out. 

A **Segment Tree** mathematically pre-calculates the answers to segments of the array, allowing you to answer any range query in **TICK1O(log N)TICK1** time.

## 1. Mathematical Construction
A Segment Tree is a perfectly balanced Binary Tree. 
- The Root node mathematically contains the sum (or Min/Max) of the *entire* array TICK1[0, N-1]TICK1.
- The Root splits the array in half. The Left child handles TICK1[0, N/2]TICK1, the Right child handles TICK1[N/2 + 1, N-1]TICK1.
- This recursive mathematical splitting continues until the Leaf nodes, which each represent a single array index.

## 2. Why Not Just Prefix Sums?
You might think, *"I can just pre-calculate a Prefix Sum array in TICK1O(N)TICK1, and then answer range queries in TICK1O(1)TICK1 by subtracting prefix[R] - prefix[L-1]."*

This works perfectly... **if the array never changes**. 
But what if the user constantly updates the array? *"Change the value at index 500 to 99."*
If you update an array, a Prefix Sum array must mathematically be recalculated from index 500 all the way to 100,000, taking TICK1O(N)TICK1 time per update.

<ComparisonTable 
  headers={['Data Structure', 'Update Time', 'Range Query Time']} 
  rows={[
    ['Standard Array (For Loop)', 'O(1)', 'O(N)'],
    ['Prefix Sum Array', 'O(N)', 'O(1)'],
    ['Segment Tree', 'O(log N)', 'O(log N)']
  ]} 
/>

## 3. The Power of Segment Trees
Segment Trees provide a mathematically perfect compromise. When you update a value at a leaf, you only need to traverse up the tree to the root, updating the sums of its parents. Because the tree is balanced, this takes exactly TICK1O(log N)TICK1 time.

<Callout icon="info" title="Lazy Propagation">
Standard Segment Trees update one element at a time. What if you need to execute a Range Update? *"Add +5 to all numbers between index 1,000 and 9,000."* Updating 8,000 leaves individually takes TICK1O(N log N)TICK1. 
Advanced algorithms use **Lazy Propagation**: the tree mathematically applies the +5 to a high-level parent node, flags it as "lazy", and stops. It only mathematically pushes the +5 down to the children later if a specific query demands it, bringing Range Updates back to a blistering TICK1O(log N)TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Fenwick trees (BIT)/index.mdx': `---
title: Fenwick Trees (Binary Indexed Tree)
description: A mathematically elegant, bitwise optimization of the Segment Tree that computes prefix sums in O(log N) using minimal memory and code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Fenwick Trees (Binary Indexed Tree)">

Invented by Peter Fenwick in 1994, the **Fenwick Tree** (or Binary Indexed Tree) solves the exact same problem as a Segment Tree (Range Sum Queries and Point Updates). However, it uses profound mathematical bitwise operations to compress the tree directly into a standard 1D array.

## 1. The Memory Optimization
A standard Segment Tree requires an array of size TICK14 * NTICK1 to store all the parent and leaf nodes safely. It requires complex recursive functions to traverse.

A Fenwick tree mathematically drops all the right-child nodes. It requires an array of exactly size **TICK1NTICK1**. It is implemented using extremely tight, non-recursive TICK1whileTICK1 loops.

## 2. The Mathematical Magic (LSB)
The entire architecture of a Fenwick Tree relies on the mathematical extraction of the **Least Significant Bit (LSB)**. 
Using Two's Complement binary math, a computer can instantly isolate the lowest set bit of an integer TICK1iTICK1 using the formula:
TICK1LSB(i) = i & (-i)TICK1

Every index TICK1iTICK1 in the Fenwick array does not store just one value; it mathematically stores the sum of a specific range of values. The length of that range is exactly equal to its LSB.
- If TICK1i = 12TICK1 (Binary TICK11100TICK1), the LSB is 4 (Binary TICK1100TICK1). Therefore, index 12 stores the sum of the last 4 elements TICK1[9, 10, 11, 12]TICK1.

## 3. Core Operations

### Point Update (Add +X to index i)
To update the tree, you must mathematically add X to index TICK1iTICK1, and then traverse "up" the conceptual tree to update all parent nodes that rely on TICK1iTICK1.
You do this by continuously **adding** the LSB to TICK1iTICK1 until you exceed the array size.
TICK1i = i + (i & -i)TICK1

### Prefix Query (Sum from 1 to i)
To calculate the sum from 1 to TICK1iTICK1, you mathematically traverse "down" the tree, adding up the pre-calculated chunks.
You do this by continuously **subtracting** the LSB from TICK1iTICK1 until TICK1iTICK1 reaches 0.
TICK1i = i - (i & -i)TICK1

<Callout icon="tip" title="Segment Tree vs Fenwick Tree">
A Fenwick Tree takes 5 lines of code to write, uses 75% less memory, and executes bitwise operations much faster than a recursive Segment Tree. However, Fenwick Trees mathematically require the operation to be **invertible**. You can use them for Range Sum (because subtraction exists). You **cannot** easily use them for Range Max or Range Min. If you need Range Max, you must write a bulky Segment Tree.
</Callout>

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
