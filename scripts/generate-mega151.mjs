import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Average case/index.mdx': `---
title: Average Case
description: "A mathematical framework for analyzing the expected performance of an algorithm over all possible inputs, heavily utilizing probability theory and expected values."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Average Case Analysis"
  subtitle="Expected Value in Algorithms"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Probability']}
>

While Worst-Case (Big O) analysis guarantees the absolute maximum time an algorithm will take, it is often mathematically pessimistic. **Average Case** analysis provides the *expected* time complexity by averaging the cost over every single possible input, weighted by the probability of that input occurring.

## 1. The Mathematical Definition
If an algorithm takes time $T(I)$ for a specific input $I$, and the probability of $I$ occurring is $P(I)$, the Average Case Time Complexity is the mathematical Expected Value:
$E[T] = \\sum_{I} P(I) \\cdot T(I)$

## 2. Example: Quicksort
Quicksort is the most famous example of the difference between Worst-Case and Average-Case.
- **Worst-Case**: $O(N^2)$. If the array is already perfectly sorted, and you pick the last element as the pivot, Quicksort degrades into a mathematically disastrous $O(N^2)$ algorithm.
- **Average-Case**: $O(N \\log N)$. If we assume all $N!$ permutations of the array are equally likely, the math proves that the pivot will, on average, split the array roughly in the middle. The probability of hitting the worst-case consistently is so infinitesimally small that the Expected Value mathematically collapses to $O(N \\log N)$.

## 3. Why It Is Difficult
To perform Average-Case analysis, a mathematician must make assumptions about the probability distribution of the inputs (usually assuming a **Uniform Distribution** where all inputs are equally likely). If this assumption is wrong (e.g., in the real world, data is often already partially sorted), the mathematical average case completely breaks down. This is why engineers prefer Worst-Case bounds for mission-critical systems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Best case/index.mdx': `---
title: Best Case
description: "A mathematical bound describing the absolute minimum time an algorithm can take to execute, representing the most favorable possible input for that specific algorithm."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Best Case Analysis"
  subtitle="The Lower Bound of Execution"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Analysis']}
>

In Algorithm Analysis, the **Best Case** (often denoted formally by Big Omega $\\Omega$) represents the minimum number of operations an algorithm will execute given the absolutely perfect, optimal input.

## 1. The Concept
If Worst-Case analysis asks, "What is the absolute longest this could take?", Best-Case analysis asks, "If the universe aligns perfectly, how fast can this finish?"

## 2. Examples
- **Insertion Sort**: 
  - *Worst-Case*: $O(N^2)$ (Array is in reverse order).
  - *Best-Case*: $O(N)$ (Array is already perfectly sorted). The algorithm mathematically only needs to make $N$ comparisons to verify the sort and exits immediately.
- **Linear Search**:
  - *Worst-Case*: $O(N)$ (The item is at the very end of the array, or doesn't exist).
  - *Best-Case*: $O(1)$ (The item is literally the very first element in the array).

## 3. The Uselessness in Engineering
In practical software engineering, Best-Case analysis is mathematically **almost entirely useless**. You cannot design a nuclear reactor's cooling system based on the assumption that the data it receives will always be perfectly optimal. We mathematically must design systems around the Worst-Case (Big O) or Average-Case (Expected Value) to guarantee stability.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Big O/index.mdx': `---
title: Big O Notation
description: "The foundational mathematical notation of Computer Science, used to describe the asymptotic upper bound (worst-case scenario) of an algorithm's time or space complexity as the input approaches infinity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Big O Notation"
  subtitle="Asymptotic Upper Bounds"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Fundamentals']}
>

Big O ($O$) is the standard mathematical language used by software engineers to communicate how an algorithm scales. It strictly defines the **Asymptotic Upper Bound**—the absolute worst-case scenario as the input size $N$ becomes infinitely large.

## 1. The Formal Mathematical Definition
Let $f(n)$ and $g(n)$ be functions mapping positive integers to positive real numbers.
We say $f(n) = O(g(n))$ if there exist positive constants $c$ and $n_0$ such that:
$0 \\le f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.

In plain English: Past a certain point ($n_0$), the function $f(n)$ will **never** grow faster than $g(n)$ multiplied by some constant. $g(n)$ is the absolute ceiling.

## 2. Dropping Constants and Lower Terms
Because Big O is concerned with infinity, we mathematically drop all constants and non-dominant terms.
If an algorithm takes exactly $5N^2 + 100N + 999$ operations, the Big O is simply **$O(N^2)$**. 
As $N$ approaches a billion, the $100N$ and the $999$ become mathematically microscopic, and the constant $5$ does not change the fundamental geometric shape of the curve.

## 3. Common Time Complexities (Fastest to Slowest)
1. **$O(1)$ - Constant**: Hash Map lookup. (Instant, regardless of size).
2. **$O(\\log N)$ - Logarithmic**: Binary Search. (Incredibly fast; 1 billion items takes 30 operations).
3. **$O(N)$ - Linear**: Iterating through an array.
4. **$O(N \\log N)$ - Linearithmic**: Merge Sort, Heap Sort. (The fastest possible comparison sorts).
5. **$O(N^2)$ - Quadratic**: Bubble Sort, 2D Matrix traversal. (Dangerous at scale).
6. **$O(2^N)$ - Exponential**: Recursive Fibonacci. (Mathematically disastrous; 50 items will take years).
7. **$O(N!)$ - Factorial**: Traveling Salesperson brute force. (Will outlast the universe).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Big Omega/index.mdx': `---
title: Big Omega
description: "The mathematical notation used to describe the asymptotic lower bound of an algorithm, proving that an algorithm will take at least a certain amount of time to execute."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Big Omega (Ω)"
  subtitle="Asymptotic Lower Bounds"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Formal Logic']}
>

While Big O ($O$) provides the ceiling (the worst-case), **Big Omega ($\\Omega$)** mathematically provides the floor. It defines the **Asymptotic Lower Bound**.

## 1. The Formal Mathematical Definition
Let $f(n)$ and $g(n)$ be functions. We say $f(n) = \\Omega(g(n))$ if there exist positive constants $c$ and $n_0$ such that:
$0 \\le c \\cdot g(n) \\le f(n)$ for all $n \\ge n_0$.

In plain English: Past a certain point ($n_0$), the function $f(n)$ will **always** take at least as long as $g(n)$. $g(n)$ is the absolute mathematical floor.

## 2. Big Omega vs Best Case
It is a massive misconception that Big Omega *only* describes the Best-Case scenario. Big Omega describes a mathematical boundary.
For example, consider an algorithm that simply prints every element in an array of size $N$.
- What is the Best-Case? It must print every element. That takes $N$ operations.
- What is the Worst-Case? It must print every element. That takes $N$ operations.
We can mathematically state that the time complexity of printing an array is **$\\Omega(N)$**. It will *at least* take linear time, no matter what.

## 3. The Sorting Lower Bound
One of the most famous proofs in computer science uses Big Omega. It is mathematically proven that any sorting algorithm that relies on comparing elements (like Merge Sort or Quick Sort) must make at least $N \\log N$ comparisons in the worst case. 
Therefore, the mathematical lower bound for comparison-based sorting is **$\\Omega(N \\log N)$**. It is physically impossible to sort faster than this using comparisons.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Big Theta/index.mdx': `---
title: Big Theta
description: "The mathematical notation for a tight asymptotic bound, used when an algorithm's worst-case (Big O) and best-case (Big Omega) scale exactly the same way."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Big Theta (Θ)"
  subtitle="Tight Asymptotic Bounds"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Formal Logic']}
>

In casual software engineering interviews, people often say "Big O" when they mathematically mean **Big Theta ($\\Theta$)**. Big Theta is a **Tight Bound**, meaning the algorithm scales *exactly* at a specific rate—no faster, no slower.

## 1. The Formal Mathematical Definition
A function $f(n) = \\Theta(g(n))$ if and only if it is mathematically bounded from both above and below.
Specifically, $f(n)$ must be both $O(g(n))$ **AND** $\\Omega(g(n))$.
There must exist positive constants $c_1$, $c_2$, and $n_0$ such that:
$c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$ for all $n \\ge n_0$.

In plain English: The algorithm is sandwiched mathematically between two constants of the exact same function.

## 2. Examples of Tight Bounds
Consider **Merge Sort**. 
- In the absolute worst case, Merge Sort takes $N \\log N$ time. ($O(N \\log N)$).
- In the absolute best case (the array is already sorted), Merge Sort *still* recursively divides the array and merges it back together, taking $N \\log N$ time. ($\\Omega(N \\log N)$).
Because the ceiling and the floor are exactly the same, we can definitively state that Merge Sort runs in **$\\Theta(N \\log N)$** time. It is a tight bound.

## 3. When Theta Fails
Consider **Insertion Sort**.
- Worst case (reversed array): $O(N^2)$
- Best case (sorted array): $\\Omega(N)$
Because the ceiling ($N^2$) and the floor ($N$) are mathematically different, you **cannot** describe Insertion Sort using Big Theta. You must use Big O to describe its worst case and Big Omega to describe its best case.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/co-NP/index.mdx': `---
title: co-NP
description: "A fundamental Complexity Class representing problems where, if the answer is 'NO', a computer can mathematically verify that 'NO' answer in polynomial time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="co-NP"
  subtitle="The Mathematics of Falsification"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Computer Science']}
>

To understand **co-NP**, you must first understand NP. 
**NP** is the class of decision problems where, if the answer is **YES**, there is a mathematical proof that can be verified in fast, polynomial time. (e.g., "Is there a path shorter than 50 miles?" If I give you a path that is 40 miles, you can instantly verify it).

**co-NP** is the exact inverse. It is the class of problems where, if the answer is **NO**, there is a mathematical counterexample that can be verified in polynomial time.

## 1. The Prime Example: Primality Testing
Consider the question: *"Is the number X a prime number?"*
- If the answer is **NO** (meaning it is a composite number), I can hand you two numbers, $A$ and $B$. You can simply multiply $A \\times B = X$ to instantly verify that $X$ is not prime. 
- Because a **NO** answer is trivially easy to verify, the problem of Composite Numbers is in **NP**.
- Therefore, the problem of Primes (the exact inverse) is mathematically in **co-NP**.

## 2. The Great Mathematical Unknown (NP vs co-NP)
We mathematically know that $P \\subseteq NP \\cap co-NP$ (if a problem is easy to solve, it's easy to verify both YES and NO).
However, one of the greatest unsolved problems in mathematics is whether $NP = co-NP$. 
If a problem is easy to verify a YES answer, is it mathematically guaranteed to be easy to verify a NO answer? Most computer scientists strongly believe $NP \\neq co-NP$, meaning there are problems where finding a YES proof is easy, but proving a NO answer is astronomically difficult.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Complexity classes hierarchy/index.mdx': `---
title: Complexity Classes Hierarchy
description: "The grand architectural map of theoretical computer science, categorizing all mathematical problems by the fundamental limits of time and space required to solve them."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Complexity Classes Hierarchy"
  subtitle="The Architecture of the Impossible"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Theory']}
>

Complexity Theory mathematically groups computational problems into nested classes based on the absolute limits of Time (CPU cycles) and Space (RAM) required to solve them as the input size scales to infinity.

## 1. The Core Hierarchy
1. **P (Polynomial Time)**: Problems a computer can *solve* quickly (e.g., Sorting, Shortest Path). The bedrock of modern software.
2. **NP (Nondeterministic Polynomial Time)**: Problems a computer can *verify* quickly if given the correct answer (e.g., Sudoku, Traveling Salesperson). Note: $P \\subseteq NP$.
3. **NP-Complete**: The mathematically hardest problems inside NP. If you find a fast algorithm for *one* NP-Complete problem, you have mathematically solved *all* of them, proving P = NP.
4. **NP-Hard**: Problems that are at least as hard as the hardest problems in NP, but they don't even have to be verifiable in polynomial time (e.g., The Halting Problem).

## 2. Space Complexity Classes
Time is not the only limit; RAM is finite.
- **PSPACE (Polynomial Space)**: Problems that can be solved using a reasonable (polynomial) amount of memory, even if they take billions of years to compute.
- **NPSPACE**: Nondeterministic Polynomial Space. (By Savitch's Theorem, it is mathematically proven that PSPACE = NPSPACE).
- **The Hierarchy**: $P \\subseteq NP \\subseteq PSPACE \\subseteq EXPTIME$.

## 3. The P vs NP Problem
The million-dollar mathematical question: Does $P = NP$? 
If every problem whose solution can be quickly verified (NP) can also be quickly solved from scratch (P), it means human creativity, mathematical proofs, and encryption are fundamentally trivial to automate. The entire cryptography architecture of the global banking system relies entirely on the assumption that $P \\neq NP$.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Cook-Levin theorem/index.mdx': `---
title: Cook-Levin Theorem
description: "The foundational proof of computational complexity theory, mathematically demonstrating that the Boolean Satisfiability Problem (SAT) is NP-Complete, forming the basis for all modern NP-Hard proofs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Cook-Levin Theorem"
  subtitle="The Birth of NP-Completeness"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Theory']}
>

In 1971, Stephen Cook and Leonid Levin independently published the most important mathematical theorem in computer science history. They proved the existence of **NP-Complete** problems—a class of "master problems" that perfectly encode the mathematical difficulty of every other problem in the universe.

## 1. The SAT Problem
The theorem revolves around the **Boolean Satisfiability Problem (SAT)**. 
Given a massive mathematical logic formula (e.g., $(A \\lor B) \\land (\\neg A \\lor C) \\land ...$), is there a combination of True/False values for the variables that makes the entire formula True?

## 2. The Genius of the Proof
Cook and Levin didn't just prove that SAT was hard. They proved that **every single problem in the class NP can be mathematically reduced (translated) into a SAT problem in polynomial time.**
- If you have a Sudoku puzzle, you can write a fast script to translate it into a SAT logic formula.
- If you have a Traveling Salesperson graph, you can translate it into a SAT logic formula.
- They proved that a Turing Machine's execution itself can be mathematically encoded into Boolean logic.

## 3. The Ramifications
Because every single NP problem can be translated into SAT, SAT is mathematically the "hardest" problem in NP. We call this **NP-Complete**.
If a genius ever invents a fast ($O(N^3)$) algorithm to solve SAT, they can instantly use it to solve Sudoku, Traveling Salesperson, and break RSA Encryption. The Cook-Levin theorem mathematically chained the fate of thousands of completely unrelated computational problems to a single logic puzzle.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/EXPTIME/index.mdx': `---
title: EXPTIME
description: "The complexity class of computationally apocalyptic problems that mathematically require exponential time (O(2^n)) to solve, rendering them practically impossible for large inputs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="EXPTIME"
  subtitle="The Apocalyptic Complexity Class"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Theory']}
>

While the P vs NP debate focuses on problems that *might* be solvable quickly, **EXPTIME** (Exponential Time) represents the mathematical abyss. These are problems that are mathematically proven to absolutely require exponential time $O(2^{p(n)})$ to solve. 

## 1. The Mathematical Reality of Exponential Growth
An $O(N^2)$ algorithm given an input of $N=100$ takes 10,000 operations (a microsecond).
An $O(2^N)$ algorithm given an input of $N=100$ takes $1.26 \\times 10^{30}$ operations. If you used the fastest supercomputer on earth, it would mathematically take billions of times longer than the current age of the universe to finish.

## 2. Perfect Information Games
The most famous examples of EXPTIME-Complete problems are generalized board games. 
- **Generalized Chess**: If you play Chess on an $N \\times N$ board, determining if Player 1 has a guaranteed winning strategy is EXPTIME-Complete. You mathematically must simulate every possible branching timeline of moves, which grows exponentially with the board size.
- **Checkers and Go**: Generalized versions of these games are similarly proven to be EXPTIME-Complete.

## 3. The Hierarchy Theorem
Unlike $P$ vs $NP$ (which remains a mystery), the **Time Hierarchy Theorem** mathematically proves that $P \\neq EXPTIME$. We absolutely, definitively know that there are problems in EXPTIME that cannot be solved quickly. The limits of computation are mathematically rigid.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Little o/index.mdx': `---
title: Little o
description: "A strict asymptotic notation used in mathematics to define a function that grows strictly and definitively slower than another, completely removing the possibility of them growing at the same rate."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Little o Notation"
  subtitle="Strict Asymptotic Upper Bounds"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Calculus']}
>

In Big O ($O$), a function is allowed to grow at the *same* rate as the bound. (e.g., $N^2$ is technically $O(N^2)$). 
**Little o ($o$)** is the mathematically strict version. It defines an upper bound that is absolutely, definitively larger. The algorithm must scale **strictly slower** than the bound.

## 1. The Formal Mathematical Definition (Using Limits)
Let $f(n)$ and $g(n)$ be functions. We say $f(n) = o(g(n))$ if and only if:
$\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$

In plain English: As $N$ approaches infinity, $g(n)$ becomes so unfathomably larger than $f(n)$ that the fraction collapses to exactly zero. 

## 2. Examples
- **$2N = o(N^2)$**: True. As $N$ goes to infinity, $2N / N^2 = 2/N$, which converges to $0$. Linear time is strictly slower than quadratic time.
- **$N^2 = o(N^2)$**: False. The limit of $N^2 / N^2$ is 1, not 0. They grow at the exact same rate. (This is why Big O is used more often; it allows for tight bounds. Little o forbids them).
- **$N \\log N = o(N^2)$**: True. By L'Hôpital's rule, the limit converges to 0.

## 3. The Analogy to Real Numbers
If Asymptotic Notations were inequality symbols:
- **Big O ($O$)** is equivalent to $\\le$ (Less than or equal to).
- **Big Omega ($\\Omega$)** is equivalent to $\\ge$ (Greater than or equal to).
- **Big Theta ($\\Theta$)** is equivalent to $=$ (Exactly equal to).
- **Little o ($o$)** is equivalent to $<$ (Strictly less than).
- **Little omega ($\\omega$)** is equivalent to $>$ (Strictly greater than).

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
