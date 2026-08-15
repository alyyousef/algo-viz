import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Arrays/index.mdx': `---
title: Arrays
description: The most fundamental contiguous memory data structure, providing $O(1)$ random access to elements based on a mathematical index calculation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Arrays">

An **Array** is the most basic and hardware-friendly data structure in computer science. It is a collection of elements (usually of the same data type) stored in **contiguous memory locations**.

Because the memory is strictly contiguous, the computer does not need to search for an element. If you know the memory address of the first element, you can mathematically calculate the exact physical memory location of any other element instantly.

## 1. The $O(1)$ Lookup Math

If you declare an array of 32-bit integers (each taking 4 bytes of memory), and the array starts at memory address \`1000\`, the computer can find the 5th element (\`index 4\`) instantly:

\`\`\`text
Address = Base_Address + (Index * Element_Size)
Address = 1000 + (4 * 4 bytes)
Address = 1016
\`\`\`

Because this is a single CPU multiplication instruction, accessing *any* element by its index is strictly $O(1)$ time complexity, regardless of whether the array has 10 elements or 10 billion elements.

## 2. The Contiguous Penalty

The greatest strength of an array is also its greatest weakness. Because it must be contiguous, its size is absolutely fixed when it is created.

- **Insertion/Deletion**: If you have an array of 1,000 elements, and you want to insert a new element at index 0, you must physically move all 1,000 existing elements one slot to the right to make room. This takes $O(N)$ time.
- **Fixed Size**: If you create an array of size 10, and you want to add an 11th element, you cannot just append it to the end (the memory block right next to the array might already be owned by a different program). You must create a brand new, larger array and copy all the old elements over.

<Callout icon="tip" title="CPU Cache Locality">
  Arrays are significantly faster than Linked Lists in the real world, even when time complexity suggests they are equal. Because arrays are contiguous, modern CPUs can load entire chunks of the array into the ultra-fast L1 Cache in a single fetch (Spatial Locality). Linked Lists are scattered randomly across RAM, causing constant, slow cache misses.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Dynamic arrays/index.mdx': `---
title: Dynamic Arrays
description: A smart wrapper around a static array that automatically resizes itself when it runs out of capacity, providing the illusion of an infinitely expandable list.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dynamic Arrays (ArrayList, std::vector, list)">

A standard Array is fixed in size. If you allocate space for 10 items, you cannot add an 11th. 
A **Dynamic Array** (known as \`ArrayList\` in Java, \`std::vector\` in C++, and simply \`list\` in Python) solves this by automatically managing memory reallocation behind the scenes.

## 1. How It Works (The Growth Factor)

Under the hood, a dynamic array is just a standard, fixed-size static array combined with two integer variables:
- \`Size\`: The number of items currently inside the array.
- \`Capacity\`: The physical size of the underlying static array.

When you append items, the \`Size\` increases. When \`Size == Capacity\`, the dynamic array executes its resize routine:
1. It requests a brand new, larger block of contiguous memory from the OS (usually double the current capacity, a **growth factor of 2**).
2. It copies every single element from the old array into the new array.
3. It deletes the old array and frees the memory.

## 2. Amortized $O(1)$ Time Complexity

Wait, if resizing requires copying every element, isn't appending an item $O(N)$? 
Yes, the *worst-case* append is $O(N)$. However, because the array doubles in size every time, these expensive resizes happen exponentially less frequently as the array grows.

If you average out the cost of all the cheap $O(1)$ appends and the rare $O(N)$ resizes over time, the average cost per append mathematically approaches a constant time. This is called **Amortized $O(1)$** complexity.

<Callout icon="warning" title="The Capacity Trap">
  If you know you are going to add 1 million items to a dynamic array, do not just blindly append them in a loop. The array will have to resize and copy memory roughly 20 times. Always pre-allocate the capacity if you know the final size in advance (e.g., \`new ArrayList<>(1000000)\`).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Linked lists (singly/index.mdx': `---
title: Singly Linked Lists
description: A dynamic, linear data structure where elements are scattered across memory and connected via pointers, allowing for extremely fast insertions and deletions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Singly Linked Lists">

Unlike Arrays, which require a single block of contiguous memory, a **Linked List** allows data to be scattered randomly across RAM. 

Each element in a linked list is a **Node**. A node contains two things:
1. **The Data**: The actual value being stored (e.g., the number 42).
2. **The Pointer (Next)**: The memory address of the *next* node in the sequence.

The very first node is tracked by a variable called the \`Head\`. The final node's pointer points to \`Null\`.

## 1. Trade-offs vs Arrays

Because nodes are connected by pointers, Linked Lists completely flip the performance characteristics of Arrays:

- **Inserts/Deletes are Fast ($O(1)$)**: If you want to insert a new node in the middle of a linked list, you do not need to physically shift thousands of elements. You simply update two pointers to "wire in" the new node. 
- **Lookups are Slow ($O(N)$)**: You cannot mathematically jump to index 500. Because the memory is scattered, the only way to find the 500th element is to start at the \`Head\` and follow the pointers, one by one, 500 times. 

## 2. Memory Overhead

Linked lists are significantly less memory-efficient than arrays. If you store 1 million 32-bit integers in an array, it takes exactly 4MB of RAM. 
If you store them in a Singly Linked List on a 64-bit machine, every integer requires an additional 64-bit pointer. This triples your memory usage (4MB for data + 8MB for pointers = 12MB).

<Callout icon="info" title="Doubly Linked Lists">
  A Singly Linked List only points forward. If you are at Node 50, you cannot go backwards to Node 49. A **Doubly Linked List** adds a second \`Prev\` pointer to every node, allowing bi-directional traversal at the cost of even more memory overhead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Queues/index.mdx': `---
title: Queues
description: A strict FIFO (First-In-First-Out) data structure used to process items in the exact order they arrived, essential for task scheduling and breadth-first search.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Queues (FIFO)">

A **Queue** is an abstract data structure that perfectly mimics a line of people waiting at a grocery store checkout. It operates on a strict **First-In-First-Out (FIFO)** principle. 

The first item added to the queue will absolutely be the first item removed. You cannot skip the line.

## 1. The Core Operations

A queue is heavily restricted. You are only allowed to perform two primary actions, both of which operate in strictly $O(1)$ time:
- **Enqueue**: Add a new item to the absolute *back* of the line (the "Tail").
- **Dequeue**: Remove and return the item at the absolute *front* of the line (the "Head").

## 2. Common Use Cases

Queues are heavily used in operating systems and distributed architectures whenever a system is receiving work faster than it can process it.

1. **Task Scheduling**: A printer queue holds documents in the exact order they were submitted by different users.
2. **Breadth-First Search (BFS)**: The BFS graph algorithm relies on a queue to explore neighboring nodes level-by-level before moving deeper.
3. **Message Brokers**: Enterprise systems like Apache Kafka or RabbitMQ are essentially massive, distributed queues that ensure millions of API events are processed in chronological order.

<Callout icon="error" title="The Array Dequeue Problem">
  Do not implement a Queue using a standard Array! If you \`Dequeue\` the item at index 0, you must physically shift every other item in the array to the left, resulting in an incredibly slow $O(N)$ operation. Queues should always be implemented using a Linked List, or a specialized **Circular Buffer**, to ensure $O(1)$ dequeues.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Stacks/index.mdx': `---
title: Stacks
description: A strict LIFO (Last-In-First-Out) data structure used to track states, handle function calls, and manage deeply nested recursive algorithms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stacks (LIFO)">

A **Stack** perfectly mimics a physical stack of dinner plates. If you want a plate, you must take the one directly off the top. You cannot pull a plate from the bottom without breaking the entire stack.

It operates on a strict **Last-In-First-Out (LIFO)** principle. The most recently added item is the first one removed.

## 1. The Core Operations

Like Queues, Stacks restrict your access to the data. You are only allowed two primary $O(1)$ operations:
- **Push**: Add a new item to the top of the stack.
- **Pop**: Remove and return the item from the top of the stack.
- *(Optional) **Peek**: Look at the top item without actually removing it.*

## 2. Common Use Cases

Stacks are the fundamental backbone of program execution and state management.

1. **The Call Stack**: Whenever a function calls another function, the CPU "Pushes" the current state (local variables and the return memory address) onto the Call Stack. When the function finishes, the CPU "Pops" that state off the stack to resume exactly where it left off.
2. **Undo/Redo Mechanisms**: Every action you take in a text editor is pushed onto a stack. When you hit Ctrl+Z, the editor pops the most recent action off the stack and reverses it.
3. **Depth-First Search (DFS)**: The DFS algorithm uses a stack (either explicitly, or implicitly via recursion) to plunge as deep into a graph as possible before backtracking.

<Callout icon="warning" title="Stack Overflow">
  The OS limits the physical RAM allocated to the Call Stack (often just a few megabytes). If you write a recursive function that never hits its base case, the CPU will continuously push new frames onto the stack until it physically runs out of memory, instantly crashing the program with a **Stack Overflow** error.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.2 Hash-Based/Hash tables/index.mdx': `---
title: Hash Tables
description: The ultimate key-value data structure, providing magical O(1) average time complexity for inserts, deletes, and lookups by passing keys through a mathematical hashing function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hash Tables (Hash Maps / Dictionaries)">

If you want to find an employee's salary using their ID number, an Array forces you to check every single element ($O(N)$). If the data is sorted, Binary Search gets it down to $O(\\log N)$. 

A **Hash Table** allows you to find the exact salary in **$O(1)$ constant time**, regardless of whether the company has 10 employees or 10 million. 

## 1. How It Works (The Hash Function)

A Hash Table is fundamentally just an array under the hood. The magic is how it decides *where* in the array to put the data.

1. **The Key**: You want to store the key-value pair \`("Alice", $90000)\`.
2. **The Hash Function**: You pass the string "Alice" into a mathematical Hash Function. It scrambles the letters and deterministically spits out a massive integer: \`84729104\`.
3. **The Modulo**: You take that massive integer and use the modulo operator against the size of your array (e.g., \`84729104 % 10 = 4\`).
4. **Storage**: The Hash Table instantly stores Alice's salary at Array Index 4.

When you want to look up Alice later, you don't search the array. You just hash "Alice" again, the math instantly gives you Index 4, and you grab the data directly.

## 2. Collisions

What happens if the hash function calculates Index 4 for "Alice", but later calculates Index 4 for "Bob" as well? This is a **Collision**.

You cannot put two items in the same array slot. Hash Tables handle collisions using two main strategies:
- **Chaining**: Index 4 stops holding a raw value, and instead holds a Linked List. Both Alice and Bob are appended to the linked list at Index 4. 
- **Open Addressing**: If Index 4 is taken, the algorithm simply probes forward (checking Index 5, then Index 6) until it finds an empty slot for Bob.

<Callout icon="error" title="Worst-Case Complexity">
  While Hash Tables are famous for $O(1)$ lookups, if you use a terrible hash function that puts *every single item* into the exact same array slot (a 100% collision rate), the Hash Table degrades into a single massive Linked List, resulting in a catastrophic $O(N)$ lookup time. 
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Binary search trees/index.mdx': `---
title: Binary Search Trees (BST)
description: A node-based tree structure that maintains sorted data in memory, allowing for fast O(log N) searches, insertions, and deletions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Binary Search Trees (BST)">

An Array provides fast lookups but terrible $O(N)$ insertions. A Linked List provides fast insertions but terrible $O(N)$ lookups. 
A **Binary Search Tree (BST)** bridges this gap, providing $O(\\log N)$ time complexity for *both* lookups and insertions.

## 1. The Golden Rule of a BST

A BST is composed of Nodes. Every Node has a value, a Left pointer, and a Right pointer. 
To qualify as a valid BST, the tree must strictly obey one mathematically invariant rule:

For any given Node:
1. **Every** value in its entire Left Subtree must be **less** than the Node's value.
2. **Every** value in its entire Right Subtree must be **greater** than the Node's value.

## 2. The $O(\\log N)$ Search

If you are looking for the number 42 in a BST:
1. You start at the Root Node (e.g., 50).
2. Because 42 is less than 50, you know with absolute certainty that 42 cannot be on the right side of the tree. You move Left.
3. You are now at Node 30. 42 is greater than 30, so you move Right.
4. You instantly found 42.

Every time you make a decision, you eliminate exactly half of the remaining tree from consideration. This halving mechanism is what provides the logarithmic $O(\\log N)$ speed.

<Callout icon="warning" title="The Unbalanced Degeneration">
  If you insert pre-sorted data (e.g., 1, 2, 3, 4, 5) into a naive BST, it will exclusively build down the right side. It degrades into a straight line (a Linked List), utterly destroying its efficiency and resulting in $O(N)$ lookups. In production environments, engineers never use naive BSTs; they use **Self-Balancing Trees** (like AVL Trees or Red-Black Trees) that automatically rotate their nodes to guarantee the tree never becomes lopsided.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.3 Trees/Tries/index.mdx': `---
title: Tries (Prefix Trees)
description: A highly specialized tree structure designed specifically for lightning-fast string retrieval and prefix matching, forming the backbone of autocomplete engines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tries (Prefix Trees)">

If you type "App" into a search bar, how does Google instantly suggest "Apple", "App Store", and "Application" out of millions of possibilities? 
It doesn't use a Hash Table (which can only do exact matches). It uses a **Trie** (pronounced "Try", derived from "re**trie**val").

## 1. How Tries Store Strings

In a BST, an entire word is stored inside a single node. In a Trie, the word is violently shattered. **Every node represents a single character.**

To store the word "CAT":
1. The Root is an empty node.
2. It has a child node 'C'.
3. 'C' has a child node 'A'.
4. 'A' has a child node 'T'.
5. 'T' contains a special boolean flag: \`isEndOfWord = true\`.

If you also want to store "CAR", you don't create three new nodes. The Trie reuses the existing 'C' and 'A' nodes, and simply branches off a new 'R' node from the 'A'.

## 2. Performance (Speed over Space)

Tries are memory hogs. Every single character node might have an array of 26 pointers (one for every letter of the alphabet), taking up massive amounts of RAM.

However, their speed is staggering.
To search for the word "Zebra" in a database of 10 million words, a BST would require dozens of expensive, full-string alphabetical comparisons. 
A Trie only requires **5 pointer hops**. The time complexity to search for a word in a Trie is strictly $O(L)$, where $L$ is the length of the word you are searching for. It does not matter if the Trie contains 10 words or 10 billion words; the search time never increases.

<Callout icon="tip" title="Prefix Matching">
  Tries are the only data structure that natively excels at Prefix Matching. If a user types "CA", you just traverse down to the 'A' node. From that node, if you run a quick Depth-First Search, you can instantly collect every single valid word in the dictionary that starts with "CA".
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.4 Heaps/Binary heaps/index.mdx': `---
title: Binary Heaps
description: A specialized, complete binary tree prioritizing the rapid retrieval of the maximum or minimum element, serving as the core engine for Priority Queues.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Binary Heaps">

A **Binary Heap** looks exactly like a Binary Search Tree visually, but its mathematical rules are completely different. While a BST organizes data left-to-right for fast searching, a Heap organizes data top-to-bottom for fast prioritization.

Heaps are the underlying implementation for **Priority Queues** (where the highest priority task always jumps to the front of the line).

## 1. The Heap Property

There are two types of Heaps: Max-Heaps and Min-Heaps. 
In a **Max-Heap**, the fundamental rule is: *Every parent node must be greater than or equal to its children.*

Because this rule applies to the entire tree, **the absolute maximum value in the entire dataset is always sitting directly at the Root Node.** 
You can retrieve the maximum value in absolute $O(1)$ time. 

*(A Min-Heap is the exact reverse; the smallest value is at the root).*

## 2. Insertion and Deletion ($O(\\log N)$)

When you extract the maximum value from the root, the tree is broken. The Heap must repair itself:
1. It takes the very last leaf node at the bottom of the tree and moves it to the Root.
2. It executes a **"Heapify Down"** operation: the new root compares itself to its children. If it is smaller, it swaps places with the larger child, bubbling down the tree until the Heap Property is restored.

When you insert a new value, the opposite happens (**"Heapify Up"**): the new value is added to the bottom of the tree, and it bubbles up, swapping with its parent until it settles into the correct priority tier.

<Callout icon="success" title="The Array Implementation">
  Because a Binary Heap must always be a "Complete" tree (all levels fully populated left-to-right), it does not actually use Node objects or Pointers! Heaps are almost exclusively implemented under the hood using a flat, contiguous **Array**. Mathematical formulas (like \`LeftChild = 2i + 1\`) are used to traverse the tree, making it incredibly fast and cache-efficient.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.5 Graphs/DAGs/index.mdx': `---
title: Directed Acyclic Graphs (DAGs)
description: A directed graph with absolutely no loops or cycles, forming the mathematical foundation for dependency resolution, data pipelines, and Git commit histories.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Directed Acyclic Graphs (DAGs)">

A Graph is a collection of Nodes (Vertices) connected by Edges. 
A **Directed Acyclic Graph (DAG)** is a highly restrictive, specialized graph that must obey two absolute laws:

1. **Directed**: Every edge is a one-way street (an arrow). You can go from Node A to Node B, but you cannot go backwards.
2. **Acyclic**: There are absolutely no cycles. If you start at Node A and follow the arrows, it is mathematically impossible to ever return to Node A. 

## 1. Why are DAGs Important?

DAGs are the mathematical model used for anything that involves **Dependencies**, **Prerequisites**, or **Chronological Time**.

- **University Courses**: You must take Calculus 101 before Calculus 102. (A directed arrow). You cannot have a cycle where 101 requires 102, and 102 requires 101, otherwise you could never graduate.
- **Git Commit History**: Every commit points backwards to its parent commit. Time only flows in one direction. It is a DAG.
- **Data Engineering (Airflow)**: Massive ETL pipelines run thousands of scripts. Script C might require the output of Script A and Script B. The pipeline is modeled as a DAG to ensure the scripts execute in the exact correct order.

## 2. Topological Sorting

The most important algorithm associated with DAGs is the **Topological Sort**. 
Because a DAG has no cycles, it is always possible to flatten the entire graph into a single, straight line (an array) such that every single arrow points perfectly from left to right. 

If a compiler is trying to build a massive project with 500 interdependent files, it runs a Topological Sort on the DAG. The resulting linear array is the exact chronological order the files must be compiled in to avoid "Missing Dependency" errors.

<Callout icon="info" title="The Cycle Detection Trap">
  You cannot run a Topological Sort on a standard graph. If there is even one cycle (A -> B -> C -> A), the topological sort will fail instantly, because it is logically impossible to put them in a straight line where every prerequisite is satisfied. You must use algorithms like Kahn's Algorithm or DFS to verify a graph is a valid DAG before sorting it.
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
