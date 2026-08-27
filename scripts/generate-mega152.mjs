import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/PSPACE/index.mdx': `---
title: PSPACE
description: "The complexity class representing problems that can be solved using a polynomial amount of memory, highlighting the fundamental difference between the limits of Time and the limits of Space."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PSPACE"
  subtitle="The Limits of Memory"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Theory']}
>

While $P$, $NP$, and $EXPTIME$ classify problems based on the amount of **Time** (CPU cycles) they require, **PSPACE** (Polynomial Space) classifies problems based entirely on the amount of **Memory** (RAM) they consume.

## 1. The Mathematical Definition
A problem is in PSPACE if an algorithm can solve it using at most $O(N^k)$ memory space, where $k$ is a constant.
Crucially, PSPACE does **not** care how long the algorithm takes. The algorithm could mathematically take 10 billion years to finish, but as long as it never consumes more than a polynomial amount of RAM, it belongs in PSPACE.

## 2. The Relationship to Time
- **$P \\subseteq PSPACE$**: If an algorithm finishes in Polynomial Time, it physically cannot consume more than a polynomial amount of memory (it doesn't have enough time to write that much data).
- **$NP \\subseteq PSPACE$**: Even brute-forcing a Traveling Salesperson problem ($O(N!)$ time) only requires you to remember the *current* best path and the path you are currently exploring. Thus, it only uses $O(N)$ space. Therefore, every single problem in $NP$ can be solved in PSPACE.
- **$PSPACE \\subseteq EXPTIME$**: It is mathematically proven that an algorithm using $O(N^k)$ space can only enter a finite number of distinct physical states (specifically $2^{O(N^k)}$ states). If it runs longer than that, it must be stuck in an infinite loop. Thus, PSPACE is bounded by Exponential Time.

## 3. PSPACE-Complete
The hardest problems in PSPACE are **PSPACE-Complete**. The most famous examples are two-player games where the entire board must be evaluated, but the board size is finite. For example, determining if the first player has a winning strategy in a generalized game of **Othello** or **Hex** on an $N \\times N$ board is PSPACE-Complete. You can mathematically simulate the entire game tree using Depth-First Search (using very little memory), but it will take an astronomically long time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Randomised algorithms/index.mdx': `---
title: Randomised Algorithms
description: "A mathematical strategy that intentionally introduces randomness (coin flips) into the logic of an algorithm to achieve vastly superior average-case time complexity or to bypass mathematical worst-cases."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Randomised Algorithms"
  subtitle="The Power of Coin Flips"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Probability']}
>

A traditional (Deterministic) algorithm will do the exact same thing every single time you run it on the same input. A **Randomised Algorithm** mathematically rolls dice during execution. Counterintuitively, this intentional chaos often results in vastly faster and more secure algorithms.

## 1. Las Vegas Algorithms
These algorithms always produce the **mathematically perfect, 100% correct answer**, but their *runtime* depends on randomness.
- **Example: Randomized Quicksort**. A malicious user could intentionally feed Quicksort a specifically crafted array to trigger its catastrophic $O(N^2)$ worst-case. To defeat this, Randomized Quicksort mathematically chooses a completely random element as the pivot. The math proves that the probability of a user forcing the worst-case drops to virtually zero, guaranteeing a lightning-fast $O(N \\log N)$ average runtime.

## 2. Monte Carlo Algorithms
These algorithms have a strictly guaranteed, fast runtime, but the **answer might mathematically be wrong** (with a small, calculable probability).
- **Example: Miller-Rabin Primality Test**. If you want to know if a 2048-bit number is prime, deterministic math is too slow. Miller-Rabin uses random numbers to test primality. If it says "Composite," it is 100% correct. If it says "Prime," there is a $1/4$ chance it is wrong. 
- **The Magic of Iteration**: If you run Miller-Rabin 40 times, the probability that it lied to you 40 times in a row is $(1/4)^{40}$. This probability is mathematically smaller than the chance of a cosmic ray flipping a bit in your CPU. It is "practically" perfect, and runs infinitely faster than a deterministic algorithm.

## 3. The Philosophy
Randomness allows algorithms to mathematically "break symmetry" and escape worst-case traps. It is heavily utilized in Cryptography, load balancing, and Machine Learning (e.g., Random Forests, Stochastic Gradient Descent).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Recurrence relations/index.mdx': `---
title: Recurrence Relations
description: "The mathematical equations used to rigorously define and solve the time complexity of recursive algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Recurrence Relations"
  subtitle="The Math of Recursion"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Calculus']}
>

When you analyze a standard TICK1forTICK1 loop, counting operations is trivial. However, when a function mathematically calls *itself* (Recursion), you cannot just count operations. You must model the algorithm as a **Recurrence Relation**—a mathematical equation that defines a sequence based on its previous terms.

## 1. The Structure of a Recurrence
A recurrence relation defines the time $T(n)$ taken for an input of size $n$.
For **Merge Sort**, the algorithm splits the array exactly in half, sorts both halves, and then merges them in linear time.
The mathematical relation is: 
$T(n) = 2T(n/2) + O(n)$
(Two subproblems, each half the size, plus $O(n)$ work to merge).

For **Binary Search**, the algorithm splits the array in half, but mathematically only explores *one* of the halves, doing constant work.
$T(n) = T(n/2) + O(1)$

## 2. Solving Recurrences
To convert a recurrence relation into a definitive Big O bound, mathematicians use three primary techniques:
1. **The Substitution Method**: Mathematically guess the answer (e.g., guess $O(N \\log N)$), and then use Mathematical Induction to formally prove the guess is correct.
2. **The Recursion Tree Method**: Draw a literal branching tree of the recursive calls. Calculate the amount of work done at each "level" of the tree, calculate the total height of the tree (usually $\\log_2 N$), and sum the infinite series.
3. **The Master Theorem**: A plug-and-play mathematical formula that instantly solves recurrences of the form $T(n) = aT(n/b) + O(n^d)$. (e.g., It instantly proves Merge Sort is $O(N \\log N)$).

## 3. The Fibonacci Disaster
The naïve recursive Fibonacci algorithm is: $T(n) = T(n-1) + T(n-2) + O(1)$.
If you solve this recurrence using the characteristic equation of linear difference equations, the mathematical root is the Golden Ratio ($\\phi \\approx 1.618$). The time complexity is mathematically proven to be $O(1.618^n)$, an exponential disaster.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/7. Algorithm Analysis & Complexity Theory/Reductions/index.mdx': `---
title: Reductions
description: "The fundamental mathematical technique of Complexity Theory, used to prove the difficulty of a new problem by translating it into a known, already-solved problem."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Reductions"
  subtitle="Translating Mathematical Difficulty"
  tags={['Algorithms', 'Mathematics', 'Complexity', 'Theory']}
>

In algorithm design and complexity theory, a **Reduction** is a mathematical transformation. If you can translate Problem A into Problem B, you have mathematically proven that Problem A cannot possibly be harder than Problem B.

## 1. Algorithmic Reductions (Solving Problems)
Imagine you need to find the Median of an array (Problem A). 
You already possess a blisteringly fast algorithm that Sorts an array (Problem B).
You can **reduce** finding the median to sorting:
1. Run the Sorting Algorithm.
2. Pick the exact middle element.
By mathematically reducing the Median problem to the Sorting problem, you prove that finding the median takes $O(N \\log N)$ time. (Note: Median can actually be solved in $O(N)$ without sorting, but the reduction is still mathematically valid).

## 2. Polynomial-Time Reductions (Proving Hardness)
Reductions are the entire foundation of **NP-Completeness**. 
Suppose you invent a new, weird puzzle game (Problem X), and you want to mathematically prove to the world that it is NP-Hard (meaning no fast algorithm exists).
1. You take a famous, proven NP-Hard problem (like 3-SAT or Traveling Salesperson).
2. You write a fast (polynomial time) algorithm that mathematically translates any valid Traveling Salesperson graph into a board state for your new puzzle game.
3. **The Proof**: Because Traveling Salesperson is mathematically proven to be impossible to solve quickly, and you can instantly turn it into your game, your game *must* also be impossible to solve quickly. If your game were easy, you could use it to quickly solve Traveling Salesperson. 

Through reductions, computer scientists have mathematically linked thousands of disparate problems (Sudoku, Protein Folding, Routing) into a single, unified web of complexity.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Boolean algebra/index.mdx': `---
title: Boolean Algebra
description: "The mathematical foundation of digital logic, using variables that evaluate strictly to True (1) or False (0), forming the physical architecture of all modern computer processors."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Boolean Algebra"
  subtitle="The Mathematics of 1s and 0s"
  tags={['Mathematics', 'Discrete Math', 'Logic', 'Architecture']}
>

Invented by George Boole in 1847, Boolean Algebra mathematically formalized human logic. Today, it is not just abstract math; it is the literal physical blueprint used to construct transistors and logic gates in every CPU on earth.

## 1. The Core Operators
Unlike standard algebra (which uses addition and multiplication over infinite numbers), Boolean Algebra operates strictly on a set of two values: $\\{0, 1\\}$.
- **AND (Conjunction, $\\land$, $\\cdot$)**: Outputs 1 only if *both* inputs are 1.
- **OR (Disjunction, $\\lor$, $+$)**: Outputs 1 if *at least one* input is 1.
- **NOT (Negation, $\\neg$, $\\overline{A}$)**: Inverts the input (1 becomes 0).

## 2. Fundamental Mathematical Laws
Because Boolean Algebra is a formal mathematical structure, it obeys strict algebraic laws, allowing engineers to mathematically simplify complex circuits before physically building them.
- **Identity**: $A + 0 = A$, $A \\cdot 1 = A$
- **Idempotence**: $A + A = A$, $A \\cdot A = A$
- **Complementarity**: $A + \\overline{A} = 1$, $A \\cdot \\overline{A} = 0$

## 3. De Morgan's Laws
The most critical theorems for software engineers, used daily to refactor massive TICK1ifTICK1 statements in code.
1. **$\\neg(A \\lor B) = \\neg A \\land \\neg B$** (NOT (A OR B) is exactly the same as (NOT A) AND (NOT B)).
2. **$\\neg(A \\land B) = \\neg A \\lor \\neg B$** (NOT (A AND B) is exactly the same as (NOT A) OR (NOT B)).
If a junior engineer writes TICK1if (!(isRaining || isSnowing))TICK1, a senior engineer mathematically simplifies it using De Morgan to TICK1if (!isRaining && !isSnowing)TICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Combinations/index.mdx': `---
title: Combinations
description: "The mathematical study of selecting subsets from a larger set where the order of selection is strictly irrelevant, forming the foundation of probability and binomial expansion."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Combinations"
  subtitle="Selection Without Order"
  tags={['Mathematics', 'Discrete Math', 'Combinatorics', 'Probability']}
>

In combinatorics, a **Combination** answers a specific mathematical question: "How many ways can I choose a subset of items from a larger pool, if I mathematically do not care about the order?"

## 1. The Mathematical Difference: Permutation vs Combination
- If you are electing a President, Vice President, and Treasurer from a group of 10 people, the order absolutely matters. (Alice as President is different from Alice as Treasurer). This is a **Permutation**.
- If you are simply selecting a 3-person committee from a group of 10 people, the order does not matter. (Alice, Bob, Charlie is the exact same committee as Bob, Charlie, Alice). This is a **Combination**.

## 2. The Formula (n Choose k)
The number of ways to choose $k$ items from a set of $n$ items is mathematically denoted as $\\binom{n}{k}$ or $^nC_k$.
The formula is:
$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$

**Example**: You have a standard deck of 52 cards. How many possible 5-card poker hands exist?
Order doesn't matter (a Royal Flush is a Royal Flush, regardless of how you hold the cards).
$\\binom{52}{5} = \\frac{52!}{5!(47)!} = 2,598,960$ possible hands.

## 3. Pascal's Triangle and Binomials
Combinations are mathematically identical to the coefficients in Pascal's Triangle. 
If you expand the algebraic binomial $(x+y)^4$, the coefficients are $1, 4, 6, 4, 1$. 
These are mathematically exactly $\\binom{4}{0}, \\binom{4}{1}, \\binom{4}{2}, \\binom{4}{3}, \\binom{4}{4}$. This deep connection is called the **Binomial Theorem**, heavily used in Algorithm Analysis and Probability Theory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Combinatorics/index.mdx': `---
title: Combinatorics
description: "The broad mathematical field dedicated to counting, arranging, and structuring finite sets, providing the absolute foundation for probability, cryptography, and algorithm analysis."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Combinatorics"
  subtitle="The Mathematics of Counting"
  tags={['Mathematics', 'Discrete Math', 'Theory', 'Computer Science']}
>

Combinatorics is the overarching mathematical study of discrete, finite structures. Whenever a computer scientist asks "How many ways can this algorithm branch?" or "How many possible keys exist for this encryption?", they are mathematically invoking Combinatorics.

## 1. The Fundamental Counting Principle
If Event A can happen in $M$ ways, and Event B can happen in $N$ ways, then the sequence of A followed by B can mathematically happen in $M \\times N$ ways.
- **Example**: If a password requires 8 lowercase letters, and each letter has 26 possibilities, there are mathematically $26^8$ ($208,827,064,576$) possible passwords.

## 2. The Pigeonhole Principle
One of the most famous, deceptively simple mathematical theorems in computer science: *"If you have $N$ pigeons and $M$ pigeonholes, and $N > M$, then at least one hole must mathematically contain more than one pigeon."*
- **Application in Hashing**: If you have a Hash Table with 10,000 slots ($M$), and you insert 10,001 items ($N$), the Pigeonhole Principle mathematically guarantees that a **Hash Collision** *must* occur.

## 3. Permutations and Arrangements
When the mathematical order of elements matters, we use Permutations.
- The number of ways to arrange $N$ unique items in a row is **$N!$ (Factorial)**.
- If you have an array of 5 elements, there are $5! = 120$ possible ways to shuffle it. This factorial growth is why algorithms like the naive Traveling Salesperson ($O(N!)$) are mathematically catastrophic. 

Combinatorics provides the exact mathematical bounds required to analyze the time complexity of loops and recursive trees.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Functions/index.mdx': `---
title: Functions (Discrete Math)
description: "The formal mathematical definition of mappings between sets, categorizing relations into Injective (one-to-one), Surjective (onto), and Bijective, underpinning cryptography and hashing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Functions"
  subtitle="Mathematical Mappings"
  tags={['Mathematics', 'Discrete Math', 'Theory', 'Set Theory']}
>

In programming, a function is a block of code. In Discrete Mathematics, a **Function** (or mapping) is a strict relation between two sets that assigns exactly one output (from the Codomain) to every valid input (from the Domain).

## 1. The Strict Definition
For a relation $f: A \\to B$ to be a valid mathematical function, **every single element** in set $A$ must map to **exactly one** element in set $B$. An input cannot mathematically yield two different outputs.

## 2. Injective (One-to-One)
A function is Injective if no two different inputs ever map to the exact same output.
- Mathematically: If $f(x) = f(y)$, then it must be strictly true that $x = y$.
- **Computer Science**: A perfect **Cryptographic Hash Function** must be Injective. If the password "admin" and the password "password" both hashed to the exact same database string, the security architecture would mathematically collapse.

## 3. Surjective (Onto)
A function is Surjective if every single element in the output set (Codomain) is mapped to by at least one input.
- Mathematically: The Range is exactly equal to the Codomain.
- **Computer Science**: A **Load Balancer** distributing traffic across 5 servers should ideally be Surjective, mathematically ensuring no server sits completely idle.

## 4. Bijective (Perfect Mapping)
A function is Bijective if it is both Injective AND Surjective. It represents a mathematically perfect, 1-to-1 pairing between two sets.
- **Computer Science**: Every single form of reversible **Encryption** (like AES or RSA) must mathematically be Bijective. If it isn't Injective, you couldn't decrypt the message (two different messages would decrypt to the same text). If it isn't Surjective, parts of the algorithm would be mathematically useless.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/GCD-LCM/index.mdx': `---
title: GCD and LCM
description: "The fundamental mathematical concepts of the Greatest Common Divisor and Least Common Multiple, featuring the Euclidean Algorithm, which forms the bedrock of RSA encryption."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GCD and LCM"
  subtitle="Number Theory Fundamentals"
  tags={['Mathematics', 'Discrete Math', 'Algorithms', 'Number Theory']}
>

The Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are the pillars of Number Theory, universally required for cryptography, modular arithmetic, and distributed system clock synchronization.

## 1. GCD (Greatest Common Divisor)
The GCD of two integers $a$ and $b$ is the largest positive integer that mathematically divides both numbers with exactly zero remainder.
- Example: $GCD(12, 18) = 6$. 

### The Euclidean Algorithm
Finding the GCD by manually listing factors is $O(N)$. In 300 BC, Euclid invented a blisteringly fast $O(\\log(\\min(a, b)))$ algorithm based on the mathematical theorem that $GCD(a, b) = GCD(b, a \\pmod b)$.
TICK3python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
TICK3
This single, mathematically beautiful loop is the engine that drives modern cryptography.

## 2. LCM (Least Common Multiple)
The LCM is the smallest positive integer that is a perfect multiple of both $a$ and $b$.
- Example: $LCM(4, 6) = 12$.
- **The Mathematical Link**: You never calculate the LCM directly. It is mathematically proven that $LCM(a, b) = \\frac{|a \\cdot b|}{GCD(a, b)}$. You use the blazing-fast Euclidean algorithm to find the GCD, and instantly compute the LCM.

## 3. Co-Primes and RSA Encryption
If $GCD(a, b) = 1$, the numbers are mathematically **Co-Prime** (they share no common factors other than 1).
The entire architecture of **RSA Public-Key Encryption** (which secures all HTTPS internet traffic) relies on generating two massive prime numbers and ensuring that the public encryption key $e$ is mathematically co-prime to a specific calculated value (Euler's Totient). The Euclidean Algorithm is used to mathematically generate and verify these keys.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Generating functions/index.mdx': `---
title: Generating Functions
description: "An advanced mathematical bridge between discrete combinatorics and continuous calculus, using infinite polynomials to solve incredibly complex recurrence relations."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Generating Functions"
  subtitle="The Calculus of Discrete Math"
  tags={['Mathematics', 'Discrete Math', 'Calculus', 'Combinatorics']}
>

In advanced computer science, some recursive sequences (like counting the exact number of ways to make change for a dollar, or finding closed-form solutions to chaotic algorithms) are too complex for standard algebra. **Generating Functions** are a mathematical trick that translates a discrete sequence of numbers into an infinite continuous polynomial, allowing mathematicians to use Calculus to solve it.

## 1. The Mathematical Concept
Given a discrete sequence of numbers: $a_0, a_1, a_2, a_3, ...$
We construct a formal infinite power series, treating the sequence numbers as the coefficients:
$G(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + ... = \\sum_{n=0}^{\\infty} a_nx^n$

**The Trick**: We mathematically do not care what the variable $x$ actually is. We are using the structure of the polynomial purely as a "clothesline" to hang our sequence on.

## 2. The Fibonacci Example
If you want to find a direct, $O(1)$ mathematical formula for the $N$th Fibonacci number, you can use Generating Functions.
1. Create a polynomial where the coefficients are the Fibonacci sequence: $F(x) = 0 + 1x + 1x^2 + 2x^3 + 3x^4...$
2. Through algebra, you can mathematically prove that this infinite polynomial strictly equals the closed-form fraction: $F(x) = \\frac{x}{1 - x - x^2}$
3. By factoring that denominator (using the roots of $1 - x - x^2$), you mathematically extract the Golden Ratio, leading directly to **Binet's Formula**, the closed-form equation for Fibonacci.

## 3. Why It Matters
Generating functions allow computer scientists to take operations on discrete data structures (like Convolutions in signal processing or merging Data Trees) and translate them into simple polynomial multiplication. It is the mathematical bridge that allows continuous Calculus and Taylor Series to solve discrete computer problems.

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
