import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Time complexity/index.mdx': `---
title: Time Complexity & Big O Notation
description: A rigorous mathematical foundation of algorithmic efficiency, asymptotic behavior, and upper bounds using Big O notation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Time Complexity & Big O Notation">

Time complexity is the mathematical study of how the runtime of an algorithm scales as the size of the input (TICK1nTICK1) approaches infinity. It does not measure the exact execution time in seconds, but rather the **rate of growth** in the number of fundamental operations performed.

## 1. Asymptotic Analysis
When analyzing algorithms, we are rarely concerned with constant factors or lower-order terms. If an algorithm takes TICK1f(n) = 3n^2 + 5n + 10TICK1 operations, the TICK1n^2TICK1 term will mathematically dominate as TICK1nTICK1 grows massive. We say this algorithm has a quadratic time complexity.

### Big O Notation (O)
Big O notation defines the **asymptotic upper bound** of an algorithm. It guarantees that the runtime will not grow faster than a specific mathematical function, up to a constant factor.

**Formal Definition**: 
TICK1f(n) = O(g(n))TICK1 if there exist positive constants TICK1cTICK1 and TICK1n_0TICK1 such that TICK10 <= f(n) <= c * g(n)TICK1 for all TICK1n >= n_0TICK1.

## 2. Common Complexity Classes

<ComparisonTable 
  headers={['Complexity', 'Name', 'Example Algorithm']} 
  rows={[
    ['O(1)', 'Constant', 'Accessing an array element by index'],
    ['O(log n)', 'Logarithmic', 'Binary Search'],
    ['O(n)', 'Linear', 'Finding the max element in an unsorted array'],
    ['O(n log n)', 'Linearithmic', 'Merge Sort, Quick Sort (average)'],
    ['O(n^2)', 'Quadratic', 'Bubble Sort, Insertion Sort'],
    ['O(2^n)', 'Exponential', 'Naive recursive Fibonacci'],
    ['O(n!)', 'Factorial', 'Generating all permutations of a string']
  ]} 
/>

<Callout icon="warning" title="The Curse of Exponential Growth">
An O(2^n) algorithm might seem manageable for n=10, taking a fraction of a millisecond. However, at n=100, the universe will mathematically end before the algorithm completes execution on the fastest supercomputer.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Space complexity/index.mdx': `---
title: Space Complexity
description: Understanding auxiliary memory consumption, the trade-off between time and space, and memory allocation limits in algorithms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Space Complexity">

While Time Complexity measures execution speed, **Space Complexity** mathematically quantifies the total amount of memory (RAM) an algorithm requires as a function of the input size TICK1nTICK1.

## 1. Auxiliary Space vs Total Space
- **Total Space**: The total memory required, including the memory used to simply store the input dataset.
- **Auxiliary Space**: The extra, temporary memory allocated *exclusively* by the algorithm during its execution (e.g., creating a hash map, utilizing the call stack for recursion).

When comparing algorithms, we typically analyze **Auxiliary Space**. If an algorithm modifies the input array in-place, its auxiliary space is TICK1O(1)TICK1.

## 2. The Call Stack (Implicit Space)
A critical pitfall in space complexity analysis is forgetting the **Call Stack** during recursion.

TICK3python
# Naive Recursive Factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
TICK3

Although no explicit arrays or data structures are created, this function has an auxiliary space complexity of TICK1O(n)TICK1. The operating system mathematically pushes TICK1nTICK1 execution frames onto the call stack before returning. If TICK1nTICK1 is 1,000,000, this will trigger a catastrophic **Stack Overflow**.

## 3. Time-Space Tradeoff
In Computer Science, there is a fundamental mathematical tension between time and space. You can often dramatically reduce an algorithm's execution time by consuming significantly more memory.

<Callout icon="tip" title="Dynamic Programming">
Dynamic Programming is the ultimate realization of the Time-Space tradeoff. By allocating an extra array TICK1O(n)TICK1 to cache intermediate subproblems (Memoization), we can mathematically reduce an algorithm's time complexity from TICK1O(2^n)TICK1 down to TICK1O(n)TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Master theorem/index.mdx': `---
title: The Master Theorem
description: The mathematical formula for instantly determining the time complexity of Divide and Conquer recurrence relations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="The Master Theorem">

When analyzing the time complexity of recursive **Divide and Conquer** algorithms (like Merge Sort or Binary Search), you encounter mathematical Recurrence Relations (e.g., TICK1T(n) = 2T(n/2) + O(n)TICK1).

The **Master Theorem** provides a fast, direct mathematical formula for asymptotically solving these recurrences without expanding the recursive tree by hand.

## 1. The Standard Form
The Master Theorem applies to recurrences of the strict mathematical form:

**TICK1T(n) = aT(n/b) + f(n)TICK1**

Where:
- TICK1nTICK1 = Size of the problem
- TICK1aTICK1 = Number of subproblems in the recursion (must be >= 1)
- TICK1bTICK1 = The factor by which the problem size is divided (must be > 1)
- TICK1f(n)TICK1 = The cost of the work done *outside* the recursive calls (usually merging or dividing), represented as TICK1O(n^d)TICK1.

## 2. The Three Mathematical Cases
To solve the recurrence, you compare the work done at the leaves of the recursion tree against the work done combining them. We calculate the critical exponent: **TICK1c_{crit} = log_b(a)TICK1**.

<ComparisonTable 
  headers={['Case', 'Mathematical Condition', 'Time Complexity T(n)']} 
  rows={[
    ['1. Leaves Dominate', 'd < log_b(a)', 'O(n^{log_b(a)})'],
    ['2. Work is Evenly Distributed', 'd = log_b(a)', 'O(n^d * log(n))'],
    ['3. Root Dominates', 'd > log_b(a)', 'O(f(n)) or O(n^d)']
  ]} 
/>

## 3. Practical Examples

### Example A: Merge Sort
The recurrence is TICK1T(n) = 2T(n/2) + O(n)TICK1.
- TICK1a = 2TICK1, TICK1b = 2TICK1, TICK1f(n) = O(n^1)TICK1 so TICK1d = 1TICK1.
- TICK1log_2(2) = 1TICK1.
- Since TICK1d = 1TICK1 and TICK1log_2(2) = 1TICK1, we are in **Case 2**.
- Complexity: TICK1O(n^1 * log(n)) = O(n log n)TICK1.

### Example B: Binary Search
The recurrence is TICK1T(n) = 1T(n/2) + O(1)TICK1.
- TICK1a = 1TICK1, TICK1b = 2TICK1, TICK1f(n) = O(n^0)TICK1 so TICK1d = 0TICK1.
- TICK1log_2(1) = 0TICK1.
- Since TICK1d = 0TICK1 and TICK1log_2(1) = 0TICK1, we are in **Case 2**.
- Complexity: TICK1O(n^0 * log(n)) = O(log n)TICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/P vs NP/index.mdx': `---
title: P vs NP Problem
description: The most famous unsolved problem in Computer Science and Mathematics, carrying a $1,000,000 Millennium Prize.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="P vs NP Problem">

The **P vs NP problem** is the absolute holy grail of theoretical computer science. It asks a profound philosophical and mathematical question: 

*If a solution to a problem can be easily **verified** by a computer, can the solution also be easily **discovered** by a computer?*

## 1. The Complexity Class 'P' (Polynomial Time)
**P** stands for **Polynomial Time**.
This class contains all mathematical problems that can be *solved* efficiently (in polynomial time, like TICK1O(n)TICK1, TICK1O(n^2)TICK1, TICK1O(n^3)TICK1) on a standard, deterministic computer.

Examples of problems in **P**:
- Sorting an array (TICK1O(n log n)TICK1).
- Finding the shortest path in a graph using Dijkstra's Algorithm (TICK1O(V + E log V)TICK1).

## 2. The Complexity Class 'NP' (Nondeterministic Polynomial Time)
**NP** stands for **Nondeterministic Polynomial Time**.
This class contains all mathematical problems where, if you are *given a proposed solution*, you can efficiently **verify** if it is correct in polynomial time.

<Callout icon="info" title="Important Misconception">
NP does NOT mean "Non-Polynomial". NP simply means you can verify the answer efficiently. By definition, every problem in P is also in NP, because if you can *solve* it efficiently, you can certainly *verify* it efficiently.
</Callout>

Examples of problems in **NP**:
- **Sudoku**: Solving a massive 100x100 Sudoku puzzle is computationally horrifying. But if someone hands you a completed grid, you can verify it is correct instantly.
- **The Traveling Salesman Problem (Decision Version)**: "Is there a route connecting these 50 cities that is shorter than 1,000 miles?" If I hand you a route, you can verify its length instantly.

## 3. The Core Question: Does P = NP?
The $1,000,000 question asks: **Are there problems in NP that are strictly NOT in P?** 
If P = NP, it mathematically means that for every problem where we can easily *verify* an answer, there exists a hidden, highly efficient algorithm to *find* the answer.

<Callout icon="warning" title="The Consequences of P = NP">
If a brilliant mathematician proves tomorrow that P = NP, the world changes instantly.
All modern cryptography (RSA, AES) relies on the assumption that factoring large prime numbers is hard to solve but easy to verify. If P = NP, encryption is mathematically broken, crashing the global financial system. However, we could also efficiently solve cancer protein folding and optimal logistics.
</Callout>

The vast majority of computer scientists mathematically assume that **P ≠ NP**, meaning some problems are intrinsically hard to solve.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/NP-complete/index.mdx': `---
title: NP-Complete
description: Understanding the hardest problems in NP. The linchpin of complexity theory where solving one solves them all.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="NP-Complete">

Within the universe of **NP** problems (problems whose solutions can be verified efficiently), there exists an elite, mathematically terrifying sub-category: the **NP-Complete** problems.

## 1. The Definition
A problem is mathematically classified as **NP-Complete** if it satisfies two strict conditions:
1. It is in the class **NP** (a given solution can be verified in polynomial time).
2. Every other problem in NP can be mathematically reduced (transformed) into this problem in polynomial time.

## 2. The Universal Skeleton Key
The second condition is what makes NP-Complete profound. 
Because *every* problem in NP can be transformed into an NP-Complete problem, an NP-Complete problem is mathematically proven to be the **absolute hardest problem in NP**.

<Callout icon="tip" title="The Domino Effect">
If you ever discover an efficient, polynomial-time algorithm (class **P**) to solve just **ONE** NP-Complete problem, you have mathematically proven that P = NP. Your algorithm could be instantly used to efficiently solve every other NP problem in existence.
</Callout>

## 3. Famous NP-Complete Problems
Thousands of seemingly distinct problems have been mathematically proven to be identical (NP-Complete).

- **Boolean Satisfiability (SAT)**: The first problem ever proven to be NP-Complete (Cook-Levin Theorem, 1971). Given a complex boolean logic circuit, is there an input of 1s and 0s that outputs a 1?
- **Traveling Salesman (Decision Version)**: "Does there exist a path visiting all cities exactly once with a distance less than X?"
- **Knapsack Problem (Decision Version)**: "Can a subset of these items fit in the bag and yield a value greater than V?"
- **Graph Coloring**: "Can we color the nodes of this massive map with exactly 3 colors such that no two adjacent nodes share a color?"

## 4. How Engineers Handle NP-Complete Problems
If you are writing software and realize your task maps to an NP-Complete problem, **STOP**. Do not try to invent an efficient exact algorithm; you will fail. Instead, you must rely on:
1. **Heuristics / Approximation Algorithms**: Accept an answer that is "good enough" (e.g., within 5% of the optimal solution).
2. **Small Inputs**: The exponential explosion only kills you on massive datasets. For small inputs (N < 20), a brute-force TICK1O(2^n)TICK1 algorithm is perfectly fine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/NP-hard/index.mdx': `---
title: NP-Hard
description: Exploring computational problems that are at least as hard as the hardest problems in NP, and potentially impossible to verify.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="NP-Hard">

While **NP-Complete** represents the hardest problems *within* NP, the class **NP-Hard** represents the bleeding edge of computational intractability. 

## 1. The Mathematical Definition
A problem is **NP-Hard** if every problem in NP can be reduced (transformed) into it in polynomial time.
Crucially, **an NP-Hard problem does NOT have to be in NP**. 

This means that for an NP-Hard problem:
1. It is at least as computationally difficult as the hardest problems in NP.
2. If someone hands you a proposed solution, it might be mathematically impossible to even **verify** if it is correct in polynomial time.

<ComparisonTable 
  headers={['Complexity Class', 'Solvable in Polynomial Time?', 'Verifiable in Polynomial Time?']} 
  rows={[
    ['P', 'Yes', 'Yes'],
    ['NP', 'Maybe (If P=NP)', 'Yes'],
    ['NP-Complete', 'Maybe (If P=NP)', 'Yes'],
    ['NP-Hard', 'Maybe (If P=NP)', 'Not Guaranteed (Could be impossible)']
  ]} 
/>

## 2. Examples of NP-Hard Problems
NP-Hard problems are often optimization problems, whereas NP-Complete problems are strictly "Yes/No" decision problems.

### The Traveling Salesman Problem (Optimization Version)
- **NP-Complete Version (Decision)**: "Is there a route strictly shorter than 500 miles? (Yes/No)" If I give you a route, you can easily verify it.
- **NP-Hard Version (Optimization)**: "What is the absolute shortest possible route?" If I hand you a route and claim it is the absolute shortest, there is no fast mathematical way to verify my claim without effectively checking all other possible routes.

### The Halting Problem
Alan Turing mathematically proved that it is impossible to write a general computer program that can inspect another program and definitively state whether it will eventually halt (finish running) or loop infinitely.
The Halting Problem is **NP-Hard** (it is universally hard), but it is not NP-Complete because it is mathematically uncomputable, so it cannot possibly be verified in polynomial time (thus not in NP).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Worst case/index.mdx': `---
title: Worst, Average, and Best Case Analysis
description: Differentiating the performance bounds of algorithms depending on the structure and entropy of the input dataset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Worst, Average, and Best Case Analysis">

When defining the Time Complexity of an algorithm, citing a single Big O notation is often mathematically incomplete. An algorithm's execution time can drastically shift depending on the specific structure, sorting, or entropy of the input data.

We formalize this using three distinct bounds: **Best Case**, **Average Case**, and **Worst Case**.

## 1. Worst Case (Big O - O)
The **Worst Case** mathematically guarantees the absolute maximum time an algorithm will execute, regardless of the input. In software engineering, mission-critical systems (like pacemakers or aviation software) exclusively care about the Worst Case.

**Example: Linear Search**
Searching an array of TICK1nTICK1 items one by one.
- **Worst Case**: The target element is at the absolute end of the array, or does not exist at all.
- Complexity: TICK1O(n)TICK1.

## 2. Best Case (Big Omega - Ω)
The **Best Case** defines the absolute minimum execution time. The input is perfectly aligned to trigger the earliest possible exit condition. This metric is usually mathematically useless in the real world, as you cannot rely on perfect inputs.

**Example: Linear Search**
- **Best Case**: The target element happens to be the very first element in the array.
- Complexity: TICK1Ω(1)TICK1.

## 3. Average Case (Big Theta - Θ)
The **Average Case** applies probability theory to calculate the expected execution time across all possible valid mathematical permutations of the input. This is often the most realistic metric for scalable web architectures.

<Callout icon="warning" title="The Quick Sort Paradox">
**Quick Sort** is universally used in standard libraries (like V8 JavaScript) because its Average Case is a blazing fast TICK1O(n log n)TICK1. However, if you feed Quick Sort an array that is *already sorted* (and you pick a bad pivot), its mathematical Worst Case geometrically degrades into a catastrophic TICK1O(n^2)TICK1. 
</Callout>

## 4. Amortized Analysis
A special subset of Average Case is **Amortized Analysis**.
When appending an item to a Dynamic Array (like an ArrayList or a JavaScript Array), it takes TICK1O(1)TICK1 time. However, if the underlying RAM block is full, the array must mathematically allocate a new block of double the size and copy all elements over. This single operation is suddenly a Worst Case of TICK1O(n)TICK1.

Amortized analysis mathematically proves that because this resizing happens so rarely, the TICK1O(n)TICK1 penalty is dispersed (amortized) across all the cheap TICK1O(1)TICK1 insertions, yielding an *amortized worst-case* of TICK1O(1)TICK1.

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
