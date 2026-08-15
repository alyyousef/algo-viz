import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Trees/index.mdx': `---
title: Trees (General)
description: A fundamental hierarchical data structure consisting of nodes connected by edges, simulating a branching tree structure originating from a single root.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Trees (General)">

If Arrays and Linked Lists represent flat, one-dimensional data, **Trees** represent hierarchical, multi-dimensional data. A Tree is a non-linear data structure that simulates a biological hierarchy, mathematically constructed of **Nodes** connected by **Edges**.

## 1. The Anatomy of a Tree
Every Tree is strictly governed by biological and architectural terminology:
- **Root**: The absolute top node. A Tree must have exactly one Root.
- **Child / Parent**: A node mathematically directly underneath another is its Child. The node above it is its Parent.
- **Leaf**: A node with absolutely zero children (the end of a branch).
- **Subtree**: Every child node is mathematically the Root of its own perfectly formed Subtree.
- **Height/Depth**: The maximum number of edges from the Root to the furthest Leaf.

## 2. Acyclicity
Mathematically, a Tree is a specialized form of a **Graph**. However, Trees have a strict mathematical restriction: **They cannot contain cycles**. 
There must be exactly one unique path from the Root to any specific node. If a Leaf mathematically loops back and connects to the Root, the structure is instantly destroyed as a Tree and becomes a standard Graph.

## 3. Real-World Architecture
Trees are the absolute foundation of hierarchical computing.
- **The DOM**: Every HTML website is rendered as a Tree (the Document Object Model), where TICK1<html>TICK1 is the Root, and TICK1<body>TICK1 and TICK1<head>TICK1 are its children.
- **File Systems**: Linux and Windows organize all folders as a massive Tree.
- **JSON**: Every JSON object mathematically forms a Tree.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Binary trees/index.mdx': `---
title: Binary Trees
description: A specialized tree structure where each node is mathematically restricted to having at most two children, strictly designated as left and right.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Binary Trees">

A standard Tree can have infinite children per node (like a folder containing 500 files). A **Binary Tree** applies a massive mathematical restriction: every node can have a **maximum of exactly two children**, strictly labeled as the **Left Child** and the **Right Child**.

## 1. Binary Architecture
Because the branching factor is mathematically capped at $2$, Binary Trees are incredibly predictable. A "Perfect" Binary Tree is one where every single internal node has exactly two children, and all leaves are exactly on the same level.
In a Perfect Binary Tree of height $H$, the total number of nodes is mathematically guaranteed to be exactly $2^{H+1} - 1$. This exponential growth allows massive amounts of data to be stored with incredibly short paths to the Root.

## 2. Tree Traversals
Because Arrays are linear, you just read them left to right. Because Binary Trees are 2D, traversing them requires mathematical algorithms. The three classic **Depth-First Traversals** are:
- **In-Order**: (Left, Root, Right).
- **Pre-Order**: (Root, Left, Right). Heavily used to physically copy a Tree.
- **Post-Order**: (Left, Right, Root). Heavily used to safely delete a Tree from the bottom up.

## 3. The Foundation for Search
A pure Binary Tree does not enforce any rules about *where* data goes (a $10$ could be the child of a $2$). Without sorting rules, searching a Binary Tree takes a brutally slow $O(N)$ time. 
However, the Binary Tree is the absolute architectural foundation for the **Binary Search Tree (BST)**, which applies strict mathematical sorting rules to achieve blazing-fast $O(\log N)$ performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Splay trees/index.mdx': `---
title: Splay Trees
description: A self-adjusting binary search tree with the unique property that recently accessed elements are dynamically moved to the root for blazing-fast subsequent access.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Splay Trees">

Standard balanced trees (like AVL or Red-Black Trees) strictly enforce perfect mathematical balance to guarantee $O(\log N)$ time. **Splay Trees** take a completely different, psychological approach. They do not enforce strict balance; instead, they mathematically self-optimize based on **Temporal Locality** (the assumption that if you access data once, you will likely access it again soon).

## 1. The "Splaying" Operation
When you search for, insert, or access a specific node in a Splay Tree, the tree violently reacts. It mathematically triggers a cascading series of tree rotations (called a **Splay**) that physically drags that specific node all the way up to become the absolute **Root** of the entire tree.

## 2. Unbeatable Cache Performance
Because the most recently accessed node becomes the Root, the *next* time you search for it, the lookup time is mathematically an instant $O(1)$. 
If a company has 10 million users, but $80\\%$ of traffic comes from just $20\\%$ of VIP users, the Splay Tree will naturally push those VIP users to the absolute top of the tree, creating a massive performance boost that standard balanced trees cannot match.

## 3. Amortized Time Complexity
Because a Splay Tree does not enforce strict mathematical balance, it is entirely possible for the tree to temporarily degrade into a straight line (a Linked List), taking $O(N)$ time to find a node. 
However, because finding that deep node mathematically *splays* it to the top (cutting the depth of the entire path in half), the tree instantly self-heals. The mathematical average across multiple operations is strictly guaranteed to be an **Amortized $O(\log N)$**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Treaps/index.mdx': `---
title: Treaps
description: A brilliant mathematical fusion of a Binary Search Tree and a Heap, using randomized priorities to probabilistically guarantee O(log N) balance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Treaps">

Balancing a Binary Search Tree (like an AVL or Red-Black Tree) requires terrifyingly complex mathematical rotation logic. The **Treap** (Tree + Heap) provides an incredibly elegant alternative. It abandons strict algorithmic balancing and relies entirely on the mathematical laws of **Probability and Randomness** to stay balanced.

## 1. The Dual-Property Architecture
Every node in a Treap holds exactly two distinct values:
1. **The Key**: (e.g., $50$). The tree must strictly obey standard **Binary Search Tree** rules for the Keys (Left is smaller, Right is larger).
2. **The Priority**: A completely random integer generated by the CPU at the exact moment of insertion. The tree must strictly obey **Max-Heap** rules for the Priorities (Parents must have a higher priority than their children).

## 2. Randomized Balancing
If you insert data in sorted order ($1, 2, 3, 4, 5$) into a standard BST, it degrades into a Linked List ($O(N)$). 
If you insert $1$ into a Treap, it generates a random priority (e.g., $14$). You insert $2$, it generates a random priority (e.g., $88$). 
Because the Treap mathematically *must* obey Max-Heap rules for the priorities, the Treap will violently rotate the $2$ above the $1$. 
Because the priorities are perfectly random, it mathematically simulates inserting the data in a completely random order, probabilistically guaranteeing the tree remains highly balanced with an expected height of $O(\log N)$.

## 3. Cartesian Trees
A Treap is mathematically a specialized form of a **Cartesian Tree**. They are highly popular in competitive programming because they are significantly easier to code from scratch than a Red-Black tree, but offer the exact same blazing-fast expected performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Suffix trees/index.mdx': `---
title: Suffix Trees
description: A massively powerful compressed trie containing all the suffixes of a given string, allowing incredibly fast pattern matching and substring analytics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Suffix Trees">

If you want to search a massive $3$-Billion letter DNA sequence for a specific $10$-letter pattern, scanning the string from left to right takes millions of CPU cycles. A **Suffix Tree** is a massive, pre-computed data structure that mathematically answers substring queries in $O(M)$ time, where $M$ is simply the length of your search pattern, completely ignoring the massive $3$-Billion letter length of the original string.

## 1. The Architectural Index
A Suffix Tree mathematically breaks a string (like TICK1"BANANA$"TICK1) into every possible suffix:
- TICK1"BANANA$"TICK1
- TICK1"ANANA$"TICK1
- TICK1"NANA$"TICK1
- TICK1"ANA$"TICK1
- TICK1"NA$"TICK1
- TICK1"A$"TICK1
- TICK1"$"TICK1 (The mathematical terminator)

It then inserts every single one of these strings into a highly compressed Trie. 

## 2. O(M) Pattern Matching
To check if the word TICK1"NAN"TICK1 exists inside TICK1"BANANA"TICK1, you do not search the original string. You simply walk down the Suffix Tree looking for the path TICK1N -> A -> NTICK1. Because the depth of the tree only matters up to the length of your query ($M = 3$), the search is mathematically guaranteed to finish in exactly $O(M)$ time, which is practically instantaneous.

## 3. Ukkonen's Algorithm
The biggest barrier to Suffix Trees was their construction time. Generating all suffixes of a length $N$ string takes $O(N^2)$ time. In 1995, Esko Ukkonen mathematically revolutionized the field by inventing a terrifyingly complex algorithm that builds the entire Suffix Tree in strict, linear **$O(N)$ time**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Suffix arrays/index.mdx': `---
title: Suffix Arrays
description: A highly space-efficient alternative to Suffix Trees, consisting of a mathematically sorted array of all suffixes of a string, easily searchable via binary search.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Suffix Arrays">

While Suffix Trees offer massive theoretical performance, they have a fatal engineering flaw: they consume an apocalyptic amount of memory (often 20x the size of the original string due to Node pointers). The **Suffix Array** was mathematically invented to provide the exact same analytical power as a Suffix Tree, but using drastically less memory and maintaining perfect CPU Cache Locality.

## 1. The Sorted Array
Instead of building a massive Tree, a Suffix Array mathematically extracts all suffixes of a string and simply sorts them alphabetically into a standard Array.
For TICK1"BANANA$"TICK1, the sorted suffixes are:
1. TICK1"$"TICK1 (Index 6)
2. TICK1"A$"TICK1 (Index 5)
3. TICK1"ANA$"TICK1 (Index 3)
4. TICK1"ANANA$"TICK1 (Index 1)
5. TICK1"BANANA$"TICK1 (Index 0)
6. TICK1"NA$"TICK1 (Index 4)
7. TICK1"NANA$"TICK1 (Index 2)

To save memory, the array does not store the actual massive strings. It mathematically only stores the **Integer Starting Indices**: TICK1[6, 5, 3, 1, 0, 4, 2]TICK1.

## 2. O(M log N) Search
To search for the pattern TICK1"NAN"TICK1, you simply perform a standard **Binary Search** over the Suffix Array. 
Because binary search halves the search space $O(\log N)$ times, and comparing your string takes $O(M)$ time, the total search time is mathematically $O(M \log N)$. 

## 3. LCP Arrays (Longest Common Prefix)
While slightly slower than a Suffix Tree in raw theory, Suffix Arrays are heavily augmented with an **LCP Array** (which mathematically tracks how many letters adjacent suffixes share). By combining a Suffix Array with an LCP array, algorithms can mathematically emulate the exact traversal logic of a Suffix Tree with significantly less memory overhead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Radix-Patricia trees/index.mdx': `---
title: Radix Trees (Patricia Tries)
description: A space-optimized Trie where nodes with only one child are mathematically merged with their parents, drastically reducing memory consumption.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Radix Trees (Patricia Tries)">

A standard **Trie** is incredibly fast for routing and autocomplete, but mathematically incredibly wasteful. If you insert the word TICK1"ALGORITHM"TICK1 into an empty Trie, it creates 9 completely separate nodes. The nodes TICK1L-G-O-R-I-T-H-MTICK1 each have exactly one child. A **Radix Tree** (also known as a Patricia Trie) mathematically compresses this waste.

## 1. Mathematical Compression
A Radix Tree enforces a strict architectural rule: **No node can exist if it has exactly one child.** 
If a parent has only one child, the tree violently merges the child into the parent. 
Instead of a chain of 9 nodes, the Radix Tree mathematically merges them into a single node holding the entire string: TICK1"ALGORITHM"TICK1.

## 2. Branching on Divergence
If you later insert the word TICK1"ALGEBRA"TICK1, the tree mathematically calculates the exact point of divergence. 
It splits the merged node at the letters TICK1"ALG"TICK1. TICK1"ALG"TICK1 becomes the parent node, branching into two children: TICK1"ORITHM"TICK1 and TICK1"EBRA"TICK1. 
This dynamic splitting and merging ensures the tree only uses memory at mathematical points of decision.

## 3. Operating System Routing
Radix Trees are not academic toys; they run the entire internet. Linux mathematically relies on highly optimized Radix Trees for **IP Routing** and **Page Cache Mapping**. Because they heavily compress long, singular paths, they allow the OS to perform blazing-fast longest-prefix matches on IP addresses using a fraction of the memory of a standard Trie.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Interval trees/index.mdx': `---
title: Interval Trees
description: A specialized augmented tree structure mathematically designed to hold overlapping intervals and execute blazing-fast intersection queries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interval Trees">

If you want to build a calendar application, and you need to mathematically check if a new meeting ($1:00$ PM to $3:00$ PM) overlaps with any of the 10,000 existing meetings in your database, a standard Binary Search Tree will fail, because data is not a single point (like $50$), but a mathematical range ($[A, B]$). The **Interval Tree** solves this.

## 1. Augmenting the BST
An Interval Tree is mathematically built on top of a standard Red-Black Tree. 
- The tree is strictly sorted by the **Low Point** of the interval (e.g., $1:00$ PM).
- **The Augmentation**: Every single node is mathematically augmented to track the **Maximum High Point** of any interval residing in its entire subtree. 

## 2. O(log N) Overlap Queries
If you query the tree for overlaps with $[1:00, 3:00]$, the algorithm looks at the Root. 
If the Root's left child has a "Maximum High Point" that is strictly less than your "Low Point" ($1:00$), you mathematically guarantee that absolutely nothing in the entire left subtree can possibly overlap with your meeting. You can instantly discard half the database in $O(1)$ time. 
This culling logic allows the Interval Tree to find all overlapping meetings in blazing-fast $O(\log N + K)$ time, where $K$ is the number of overlaps found.

## 3. 1D Spatial Logic
Interval Trees are the mathematical foundation for 1-dimensional spatial queries. They are heavily used in geometric algorithms, calendar systems, and physics engines to quickly perform bounding-box collision detection on a single axis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/K-d trees/index.mdx': `---
title: K-D Trees (K-Dimensional Trees)
description: A space-partitioning data structure for mathematically organizing points in a k-dimensional space, heavily used in nearest neighbor searches.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="K-D Trees (K-Dimensional Trees)">

A standard Binary Search Tree can mathematically sort 1-dimensional numbers. But what if your data has multiple dimensions? (e.g., A coordinate with an $X$, $Y$, and $Z$ axis). If you want to find the closest coffee shop to your GPS location, you cannot sort the tree by $X$ without destroying the sorting of $Y$. The **K-D Tree** solves this by rotating the axis of sorting at every level.

## 1. Cycling the Dimensions
A K-D Tree is mathematically a binary tree, but the sorting rule physically changes at every depth level:
- **Level 0 (Root)**: Splits data exactly by the $X$-axis. Left child is smaller $X$, Right is larger $X$.
- **Level 1**: Splits data exactly by the $Y$-axis. 
- **Level 2**: Splits data exactly by the $Z$-axis.
- **Level 3**: Mathematically loops back and splits by the $X$-axis again.

## 2. Spatial Partitioning
Because every node mathematically draws a physical line (or plane) through the space, the K-D Tree violently cuts the multidimensional universe into smaller and smaller geometric boxes. 

## 3. Nearest Neighbor Search (KNN)
If you ask the tree to find the closest point to your location, it walks down the tree to find the geometric box you are standing in. 
It finds the closest point in that box. But then it performs a massive mathematical optimization: it mathematically calculates if a closer point could possibly exist on the *other side* of the geometric plane it just crossed. If the distance to the splitting plane is larger than the distance to your current best point, the algorithm can instantly discard the entire other half of the universe, resulting in blistering fast $O(\log N)$ search times.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Quad trees/index.mdx': `---
title: Quadtrees
description: A 2D spatial partitioning tree where each internal node has exactly four children, perfectly mathematically subdividing a two-dimensional plane.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quadtrees">

While K-D Trees rotate their splitting axis, a **Quadtree** mathematically splits both the $X$ and $Y$ axis simultaneously. It is heavily optimized for massive 2-dimensional planes, completely dominating modern 2D game engines and image compression logic.

## 1. The Four Quadrants
A Quadtree starts by bounding the entire 2D universe in a single massive square (the Root). 
If too many entities (like game enemies) enter that square, it mathematically violently shatters the square into exactly four equal sub-squares (Northwest, Northeast, Southwest, Southeast). These become the four children of the Root. 
If one of those sub-squares gets too crowded, it shatters again into four smaller squares. 

## 2. Collision Detection Optimization
If you have 10,000 asteroids in a 2D space game, checking every asteroid against every other asteroid for collisions requires an apocalyptic $100,000,000$ mathematical checks per frame ($O(N^2)$).
By inserting all asteroids into a Quadtree, the physics engine only checks asteroids that share the exact same geometric leaf square. Asteroids in different squares are mathematically guaranteed not to collide, dropping the calculations to $O(N \log N)$ and allowing the game to run at 60 FPS.

## 3. Image Compression
Quadtrees can mathematically compress images. If a $1024 \\times 1024$ image has a massive section of pure black sky, a Quadtree does not need a million pixels. It simply creates a single massive square node representing the entire sky block, and only shatters into smaller pixels when it hits areas with high detail.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Octrees/index.mdx': `---
title: Octrees
description: The 3D mathematical equivalent of a Quadtree, subdividing three-dimensional space into exactly eight distinct octants for rendering and physics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Octrees">

An **Octree** is the absolute mathematical escalation of a Quadtree into the 3rd dimension. It forms the backbone of almost all modern 3D game engines (like Unreal Engine and Unity), 3D rendering, and voxel-based worlds like Minecraft.

## 1. The Eight Octants
Instead of a 2D square splitting into $4$, an Octree bounds the 3D universe in a massive Cube. 
When the cube becomes crowded, it mathematically shatters across the $X$, $Y$, and $Z$ axes simultaneously, splitting into exactly **8 smaller cubes (Octants)**. 

## 2. Frustum Culling
When a 3D camera looks into a massive world, the GPU cannot afford to render millions of objects behind the player's back. 
The camera projects a 3D mathematical cone of vision called a **Frustum**. The game engine tests the Frustum against the massive Root cube of the Octree. If the Frustum completely misses a child cube, the engine mathematically instantly discards millions of objects inside that cube without checking them individually.

## 3. Voxel Engines
Games like Minecraft use highly specialized Octrees called **Sparse Voxel Octrees (SVO)**. 
Because $90\\%$ of the sky in Minecraft is empty air, and the deep underground is solid rock, the SVO merges massive $16 \\times 16 \\times 16$ chunks of identical blocks into a single node. The tree only shatters down to the individual block level when there is a sudden mathematical change in materials (like a cave wall intersecting the stone).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/R-trees/index.mdx': `---
title: R-Trees
description: A massive spatial index structure used heavily in databases to quickly query spatial data like geometric bounding boxes and geographical polygons.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="R-Trees">

While K-D trees organize points, and Quadtrees divide space rigidly, **R-Trees (Rectangle Trees)** are specifically designed to organize dynamic **Bounding Boxes**. They are the absolute mathematical foundation of spatial databases like **PostGIS** and systems like Google Maps.

## 1. Bounding Box Hierarchies
Instead of mathematically slicing the world in half, an R-Tree mathematically groups nearby objects and wraps them in a **Minimum Bounding Rectangle (MBR)**. 
The leaf nodes contain the actual geometric objects (like the outline of a specific coffee shop). The parent nodes contain a massive Bounding Box that completely encloses all the coffee shops in that neighborhood. The Root node contains a gigantic Bounding Box covering the entire city.

## 2. Overlapping Regions
Unlike Quadtrees, the bounding boxes in an R-Tree can mathematically overlap. If you search for "restaurants in this 5-mile radius", the database checks the Root. If your search radius overlaps with two different neighborhood bounding boxes, the algorithm mathematically descends into both branches simultaneously. 

## 3. Database Optimization (Disk I/O)
Quadtrees are great for RAM, but terrible for hard drives. R-Trees are mathematically designed exactly like **B-Trees**. They have massive branching factors (e.g., 50 children per node), ensuring the tree is incredibly wide and extremely shallow. This guarantees that finding a spatial object on a physical hard drive takes at most 3 or 4 mathematical disk reads.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Van Emde Boas trees/index.mdx': `---
title: Van Emde Boas Trees (vEB Trees)
description: A terrifyingly complex integer-based tree structure that achieves mind-bending O(log log M) performance for all operations by mathematically restricting the universe of keys.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Van Emde Boas Trees (vEB Trees)">

A standard Binary Search Tree achieves $O(\log N)$ performance, where $N$ is the number of elements currently stored. The **Van Emde Boas Tree** completely destroys this paradigm. It mathematically achieves **$O(\log \log M)$** performance, where $M$ is the maximum possible integer size.

## 1. The Mathematical Universe
A vEB Tree mathematically forbids strings or floating-point numbers. It strictly only accepts integers from a fixed "Universe" (e.g., $0$ to $M-1$). 
Because it only cares about the maximum possible integer ($M$), the performance is completely unaffected by how many items you insert. You can insert 10 items or 10 Billion items; the lookup time mathematically remains identical.

## 2. O(log log M) Velocity
$O(\log \log M)$ is an astronomically fast mathematical curve. 
If your universe is all 32-bit integers ($M = 4,294,967,296$), the $\log_2$ of $M$ is $32$. The $\log_2$ of $32$ is **$5$**. 
A vEB tree mathematically guarantees it can find, insert, delete, or find the nearest neighbor of any 32-bit integer in the universe in a strict maximum of **$5$ CPU operations**. For 64-bit integers, it takes a maximum of exactly **$6$ operations**. It is virtually indistinguishable from $O(1)$ time.

## 3. Recursive Square Roots
To achieve this, the vEB tree relies on mathematical recursion. A tree of size $M$ mathematically splits itself into $\sqrt{M}$ smaller vEB trees, each of size $\sqrt{M}$. 
When you search for a number, the algorithm splits the integer into its high bits and low bits. The high bits instantly tell it which sub-tree to enter, and the low bits tell it exactly where to look. Because the size of the mathematical universe is square-rooted at every single step, the recursion depth is staggeringly shallow.

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
