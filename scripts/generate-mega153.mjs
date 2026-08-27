import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Graph theory/index.mdx': `---
title: Graph Theory
description: "The mathematical study of networks, defining structures as collections of Vertices connected by Edges, serving as the absolute foundation for internet routing, social networks, and modern databases."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Graph Theory"
  subtitle="The Mathematics of Networks"
  tags={['Mathematics', 'Discrete Math', 'Graphs', 'Theory']}
>

Graph Theory is the branch of discrete mathematics that models pairwise relationships between objects. Whenever you use Google Maps to find a route, or a database queries a relational join, it mathematically translates the problem into a Graph.

## 1. The Mathematical Definition
A Graph $G$ is formally defined as an ordered pair $G = (V, E)$.
- **$V$ (Vertices/Nodes)**: The set of objects (e.g., Cities, IP Addresses, People).
- **$E$ (Edges/Links)**: The set of connections between those objects.

## 2. Types of Graphs
- **Directed vs Undirected**: In an Undirected graph, if Node A is connected to B, B is connected to A (e.g., a Two-way street). In a Directed Graph (Digraph), the connection has a strict direction (e.g., a One-way street, or Twitter followers).
- **Weighted vs Unweighted**: In a Weighted graph, every edge has a numerical cost (e.g., the distance in miles between two cities). Unweighted graphs treat all connections equally.
- **Cyclic vs Acyclic**: A Cycle exists if you can start at Node A, follow a path of edges, and mathematically return to Node A. A Directed Acyclic Graph (DAG) explicitly forbids this, which is why git commit histories and blockchain ledgers must mathematically be DAGs.

## 3. The Seven Bridges of Königsberg
Graph theory was invented by Leonhard Euler in 1736 to solve a puzzle: *"Is it possible to walk through the city of Königsberg crossing its 7 bridges exactly once?"*
Euler mathematically abstracted the landmasses into Vertices and the bridges into Edges. He proved that an "Eulerian Path" is mathematically impossible if more than two Vertices have an odd number of connecting Edges. By removing the geographical map and abstracting it to pure nodes and links, Euler birthed modern Topology and Computer Science.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Mathematical induction/index.mdx': `---
title: Mathematical Induction
description: "The foundational proof technique in discrete mathematics, used to rigorously prove that a theorem is true for an infinite sequence of numbers by proving a base case and a cascading logical step."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Mathematical Induction"
  subtitle="The Infinite Domino Effect"
  tags={['Mathematics', 'Discrete Math', 'Proof Techniques', 'Logic']}
>

If a computer scientist writes a recursive algorithm and wants to formally prove to a bank that it will *always* produce the correct answer for *any* input size $N$, they use **Mathematical Induction**.

## 1. The Analogy (Dominoes)
If you have an infinite line of dominoes, how do you mathematically prove that *every single domino* will fall over? You cannot test them all individually (infinity).
Instead, you only need to prove two things:
1. **The Base Case**: You prove that you can knock over the very first domino.
2. **The Inductive Step**: You prove a rule: *"If domino $k$ falls, it is mathematically guaranteed to knock over domino $k+1$."*
If both are true, logic dictates that domino 1 knocks over 2, which knocks over 3, cascading to infinity.

## 2. The Formal Structure
Let $P(n)$ be a mathematical statement (e.g., "The sum of the first $n$ integers is $\\frac{n(n+1)}{2}$").
1. **Base Case**: Prove $P(1)$ is true.
   - For $n=1$, the sum is $1$. The formula gives $\\frac{1(2)}{2} = 1$. The base case holds.
2. **Inductive Hypothesis**: Assume $P(k)$ is true for some arbitrary integer $k$.
   - Assume: $1 + 2 + ... + k = \\frac{k(k+1)}{2}$
3. **Inductive Step**: Using that assumption, algebraically prove $P(k+1)$ is true.
   - We must prove: $1 + ... + k + (k+1) = \\frac{(k+1)(k+2)}{2}$
   - Substituting our assumption: $\\frac{k(k+1)}{2} + (k+1)$
   - Finding a common denominator: $\\frac{k(k+1) + 2(k+1)}{2}$
   - Factoring: $\\frac{(k+1)(k+2)}{2}$. The proof is complete.

## 3. Application in Computer Science
Every time you write a Recursive function, you are mathematically implementing Induction. The Base Case of induction is the Base Case of the recursion. The Inductive Step is the recursive call. If the math holds, the algorithm is proven correct.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Modular arithmetic/index.mdx': `---
title: Modular Arithmetic
description: "The mathematics of 'clock arithmetic', where numbers wrap around after reaching a certain limit, serving as the absolute foundation for cryptography, hashing, and pseudo-random number generation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Modular Arithmetic"
  subtitle="The Mathematics of Wrapping Around"
  tags={['Mathematics', 'Discrete Math', 'Number Theory', 'Cryptography']}
>

In standard arithmetic, numbers grow infinitely. In **Modular Arithmetic**, numbers wrap around in a circle upon reaching a specific threshold called the Modulus. It is the mathematical engine behind all modern cybersecurity.

## 1. The Concept (Clock Math)
If it is currently 10:00 AM, and you add 5 hours, it is not 15:00 AM. The clock "wraps around" at 12, so the answer is 3:00 PM.
Mathematically, we write this as:
$10 + 5 \\equiv 3 \\pmod{12}$
(15 is "congruent" to 3, modulo 12).

The modulo operator (TICK1%TICK1 in most programming languages) mathematically yields the **Remainder** of a division operation. $15 / 12$ leaves a remainder of $3$.

## 2. Cryptographic Properties
Modular arithmetic is heavily used in cryptography because it acts as a mathematically perfect **One-Way Function**.
- In standard math, if I tell you $X \\times 7 = 35$, you can instantly divide to find $X = 5$.
- In modular math, if I tell you $X \\times 7 \\equiv 2 \\pmod{11}$, finding $X$ is significantly harder (it's 5, because $35 / 11$ leaves a remainder of 2).
- When the modulus is a 2048-bit prime number, reversing modular exponentiation ($X^e \\equiv C \\pmod N$) becomes the **Discrete Logarithm Problem**. There is no known fast algorithm in the universe to reverse it, which is exactly why RSA Encryption is secure.

## 3. Hash Tables
Every Hash Table (Dictionaries in Python, HashMaps in Java) relies on modular arithmetic to map infinite data into a finite array.
If you have an array of size $M$, and a Hash Function generates a massive integer $H$ for a string, the exact array index is mathematically assigned using:
$Index = H \\pmod M$

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Number theory/index.mdx': `---
title: Number Theory
description: "The branch of pure mathematics devoted entirely to the properties of integers (especially primes), historically considered 'useless' until it became the foundation of modern internet security."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Number Theory"
  subtitle="The Queen of Mathematics"
  tags={['Mathematics', 'Discrete Math', 'Theory', 'Cryptography']}
>

For 2,000 years, mathematicians studied **Number Theory** (the properties of integers, divisibility, and primes) purely for its own beautiful, abstract sake. In 1940, G.H. Hardy famously boasted that Number Theory was the purest math because it had "no practical application in war or industry." 
Thirty years later, the invention of Public-Key Cryptography transformed Number Theory into the most militarily and economically critical mathematical field on earth.

## 1. The Core Subjects
Number Theory focuses almost entirely on the Set of Integers ($\\mathbb{Z}$). It fundamentally ignores fractions, decimals, and continuous calculus. 
Key concepts include:
- **Divisibility and Factors**
- **Prime Numbers and Prime Factorization**
- **Modular Arithmetic** (Congruences)
- **Diophantine Equations** (Equations where only integer solutions are allowed).

## 2. The Fundamental Theorem of Arithmetic
The most critical theorem in Number Theory states that **every integer greater than 1 is either a prime itself, or can be uniquely factored into a product of primes.**
- Example: $60 = 2^2 \\times 3 \\times 5$. 
Primes are mathematically the "atoms" of the number system. This unique factorization is the exact mathematical vulnerability that quantum computers (using Shor's Algorithm) exploit to break encryption.

## 3. Euler's Totient Function ($\\phi(N)$)
A massive breakthrough in Number Theory was Euler's Totient function. $\\phi(N)$ counts how many integers less than $N$ are co-prime to $N$.
If $N$ is a prime number $P$, then mathematically: $\\phi(P) = P - 1$.
If $N$ is the product of two primes ($P \\times Q$), then mathematically: $\\phi(N) = (P-1)(Q-1)$.
This specific Number Theory equation is the hidden mathematical trapdoor used to generate the private decryption key in RSA.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Permutations/index.mdx': `---
title: Permutations
description: "The mathematical study of arranging a set of objects into a specific sequence, where the exact order of the arrangement is strictly and fundamentally important."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Permutations"
  subtitle="Arrangements and Ordered Sets"
  tags={['Mathematics', 'Discrete Math', 'Combinatorics', 'Probability']}
>

In combinatorics, a **Permutation** defines the number of ways a set of items can be arranged when the mathematical **Order Absolutely Matters**. (A password of "123" is mathematically different from "321").

## 1. Full Permutations (Factorials)
If you have $N$ distinct objects, and you want to arrange *all* of them in a line, the first slot has $N$ options, the second has $N-1$ options, etc. 
The mathematical formula is **$N!$ (N Factorial)**.
- Example: How many ways can you shuffle a deck of 52 cards?
- Answer: $52!$ (A number so astronomically massive, approximately $8 \\times 10^{67}$, that every time you shuffle a deck of cards, you are almost certainly creating an arrangement that has mathematically never existed in the history of the universe).

## 2. Partial Permutations (n Pick k)
If you have $N$ objects, but you only want to arrange $K$ of them (e.g., picking a 1st, 2nd, and 3rd place winner from a race of 10 people), you use the Permutation formula (often denoted as $^nP_k$):
$P(n, k) = \\frac{n!}{(n-k)!}$

- Example: $P(10, 3) = \\frac{10!}{7!} = 10 \\times 9 \\times 8 = 720$ possible podium finishes.

## 3. Permutations with Repetition
If the items are not distinct (e.g., arranging the letters in the word "MISSISSIPPI"), standard factorials mathematically overcount the duplicates (swapping the first 'S' with the second 'S' does not create a new word). 
You must mathematically divide by the factorial of the counts of each repeated item:
$\\frac{N!}{n_1! n_2! ... n_k!}$
For "MISSISSIPPI" (11 letters, 4 'S's, 4 'I's, 2 'P's):
$\\frac{11!}{4! 4! 2!} = 34,650$ unique permutations.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Pigeonhole principle/index.mdx': `---
title: Pigeonhole Principle
description: "A deceptively simple yet profoundly powerful mathematical theorem proving that if you distribute N items into M containers where N > M, at least one container must mathematically hold multiple items."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Pigeonhole Principle"
  subtitle="The Inevitability of Collisions"
  tags={['Mathematics', 'Discrete Math', 'Combinatorics', 'Logic']}
>

The Pigeonhole Principle, formalized by Peter Gustav Lejeune Dirichlet in 1834, is one of the most intuitive statements in mathematics. Yet, it is used to formally prove incredibly complex theorems in compression algorithms, cryptography, and graph theory.

## 1. The Formal Definition
If $N$ objects are placed into $M$ containers, and $N > M$, then at least one container must contain strictly more than one object.
- **Example**: There are exactly 366 possible birthdays (including leap years). If you put 367 people in a room, it is a mathematical certainty that at least two people share the exact same birthday. (No calculus required, just the Pigeonhole Principle).

## 2. The Generalized Principle
If $N$ objects are placed into $M$ containers, then at least one container must hold at least $\\lceil N / M \\rceil$ objects.
- **Example**: If you distribute 10 balls into 3 boxes, at least one box must contain $\\lceil 10 / 3 \\rceil = 4$ balls.

## 3. Applications in Computer Science
- **Hash Collisions**: If a hash function generates a 256-bit output, there are exactly $2^{256}$ possible unique hashes. If you hash $2^{256} + 1$ distinct files, the Pigeonhole Principle mathematically guarantees that two completely different files will produce the exact same hash (a collision).
- **Lossless Compression limits**: It is mathematically impossible to build a lossless compression algorithm (like ZIP) that guarantees it will shrink *every* file. If an algorithm shrinks all files of size $N$ to size $N-1$, you are mapping $2^N$ possible files into $2^{N-1}$ possible outputs. By the Pigeonhole Principle, multiple large files would compress to the exact same small file, making it mathematically impossible to decompress them accurately.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Predicate logic/index.mdx': `---
title: Predicate Logic
description: "An advanced system of formal logic (First-Order Logic) that extends propositional logic by introducing variables and quantifiers ('For All' and 'There Exists') to evaluate complex mathematical statements."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Predicate Logic"
  subtitle="First-Order Logic and Quantifiers"
  tags={['Mathematics', 'Discrete Math', 'Logic', 'Formal Verification']}
>

Basic Boolean Algebra (Propositional Logic) can only evaluate simple, fixed statements (e.g., $P = \text{It is raining}$). It cannot handle variables. **Predicate Logic** introduces mathematical functions that return True or False based on variable inputs, forming the foundation of database querying (SQL) and formal software verification.

## 1. Predicates
A Predicate is a statement containing a variable that evaluates to True or False. 
- Example: $P(x) = "x > 5"$. 
- If $x=6$, $P(6)$ is True. If $x=2$, $P(2)$ is False.

## 2. The Quantifiers
Predicate logic introduces two fundamental mathematical symbols to define the scope of variables over a set (domain).

### The Universal Quantifier ($\\forall$)
Reads as: **"For All"** or **"For Every"**.
- Statement: $\\forall x \\in \\mathbb{R}, x^2 \\ge 0$
- Translation: "For every real number $x$, $x$ squared is greater than or equal to zero." (This is mathematically True).

### The Existential Quantifier ($\\exists$)
Reads as: **"There Exists"** or **"For At Least One"**.
- Statement: $\\exists x \\in \\mathbb{Z}, x^2 = 25$
- Translation: "There exists at least one integer $x$ such that $x$ squared equals 25." (True, $x=5$).

## 3. Negating Quantifiers (De Morgan's Laws for Quantifiers)
A massive source of bugs in programming is incorrectly negating logical statements. In Predicate logic, when you apply a NOT ($\\neg$) operation, it mathematically flips the quantifiers:
- $\\neg(\\forall x, P(x))$ becomes $\\exists x, \\neg P(x)$. (Saying "Not everyone passed the test" is exactly equivalent to saying "There exists at least one person who failed the test").
- $\\neg(\\exists x, P(x))$ becomes $\\forall x, \\neg P(x)$. (Saying "There does not exist a black swan" is exactly equivalent to saying "For all swans, they are not black").

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Prime numbers/index.mdx': `---
title: Prime Numbers
description: "The mathematical 'atoms' of the integer system, numbers divisible only by 1 and themselves, whose unpredictable distribution acts as the entire security layer for the modern internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Prime Numbers"
  subtitle="The Atoms of Mathematics"
  tags={['Mathematics', 'Discrete Math', 'Number Theory', 'Cryptography']}
>

A **Prime Number** is a natural number strictly greater than 1 that has exactly two distinct positive divisors: 1 and itself. (e.g., 2, 3, 5, 7, 11). Numbers that are not prime are called **Composite**.

## 1. The Mathematical Foundation
The **Fundamental Theorem of Arithmetic** proves that every single integer can be mathematically broken down into a unique multiplication of prime numbers. 
For example: $100 = 2 \\times 2 \\times 5 \\times 5$. 
Because you can build any number by multiplying primes, they are mathematically considered the building blocks (atoms) of the number system.

## 2. The Great Mystery: The Prime Number Theorem
There is no mathematical formula that can instantly generate the $N$th prime number. Their exact distribution along the number line appears completely chaotic.
However, in 1896, mathematicians proved the **Prime Number Theorem**, which states that as numbers get larger, the mathematical density of primes asymptotically approaches $\\frac{1}{\\ln(N)}$. 
This guarantees to cryptographers that even when dealing with insanely massive 2048-bit numbers, primes are still mathematically common enough to find quickly using randomized algorithms.

## 3. Cryptographic Security
The entire modern economy (Banking, HTTPS, Bitcoin) relies on a single mathematical asymmetry regarding primes:
- **Multiplication is easy**: If I give a computer two massive 1024-bit prime numbers, it can multiply them together to create a 2048-bit composite number in nanoseconds.
- **Factoring is impossible**: If I give a computer the resulting 2048-bit composite number, there is no known classical mathematical algorithm that can figure out which two primes created it. Brute-forcing it would take longer than the lifespan of the universe. This mathematical "trapdoor" is the bedrock of **RSA Public-Key Encryption**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Proof by contradiction/index.mdx': `---
title: Proof by Contradiction
description: "An incredibly elegant mathematical proof technique where you assume the exact opposite of what you want to prove, and demonstrate that this assumption leads to a mathematically impossible, exploding paradox."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Proof by Contradiction"
  subtitle="Reductio ad Absurdum"
  tags={['Mathematics', 'Discrete Math', 'Proof Techniques', 'Logic']}
>

In Discrete Mathematics, **Proof by Contradiction** (Reductio ad Absurdum) is a formal logical strategy. If a direct mathematical proof is too difficult, you simply assume your theorem is False. You follow the strict rules of algebra, and if your math eventually outputs something insane (like $1 = 0$ or "an integer is both even and odd"), your initial assumption *must* have been wrong. Therefore, your theorem must be True.

## 1. The Classic Proof: The Irrationality of $\\sqrt{2}$
Around 500 BC, the Pythagoreans used contradiction to prove a terrifying truth: $\\sqrt{2}$ cannot be written as a fraction.
1. **The Assumption**: Assume $\\sqrt{2}$ is rational. Therefore, it can be written as a perfect fraction $\\frac{a}{b}$, where the fraction is completely simplified (meaning $a$ and $b$ share no common factors).
2. **The Algebra**: 
   - $\\sqrt{2} = \\frac{a}{b}$
   - Square both sides: $2 = \\frac{a^2}{b^2}$
   - Rearrange: $a^2 = 2b^2$
3. **The Logical Step**: Because $a^2$ equals 2 times something, $a^2$ must be an Even number. Mathematically, if a square is even, its root ($a$) must also be Even.
4. **The Cascade**: Since $a$ is even, we can write it as $2k$. 
   - Substitute: $(2k)^2 = 2b^2$ $\\implies 4k^2 = 2b^2$ $\\implies b^2 = 2k^2$
   - This proves $b^2$ is Even, meaning $b$ must also be Even.
5. **The Contradiction**: We just mathematically proved that both $a$ and $b$ are Even (divisible by 2). But in Step 1, we explicitly defined $\\frac{a}{b}$ as a completely simplified fraction sharing *no* common factors! This is a mathematical paradox.
6. **The Conclusion**: The only way to escape the paradox is to admit our very first assumption was wrong. $\\sqrt{2}$ mathematically cannot be a fraction.

## 2. Usage in Computer Science
Contradiction is heavily used in Computability Theory. The most famous theorem in Computer Science, Alan Turing's **Halting Problem** (proving that it is mathematically impossible to write a program that checks if another program has an infinite loop), is proven entirely by contradiction. Turing assumed such a program existed, fed it into itself, and created a universe-breaking paradox, proving the program cannot exist.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Proof techniques/index.mdx': `---
title: Proof Techniques
description: "A summary of the formal mathematical methodologies used by computer scientists to guarantee the absolute correctness of algorithms, theorems, and system architectures."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Proof Techniques"
  subtitle="The Arsenal of Mathematical Certainty"
  tags={['Mathematics', 'Discrete Math', 'Logic', 'Theory']}
>

In software engineering, testing a program 10,000 times does not mathematically prove it is bug-free (it just proves you didn't find a bug yet). To guarantee absolute, infinite correctness, computer scientists rely on strict mathematical **Proof Techniques**.

## 1. Direct Proof
The most straightforward logical path. You start with known axioms and definitions, and apply strict algebraic rules until you reach the conclusion.
- **Example**: Prove that the sum of two Even numbers is Even.
- **Proof**: Let $A = 2x$ and $B = 2y$. The sum is $2x + 2y = 2(x+y)$. Because the result is a multiple of 2, it is mathematically Even.

## 2. Proof by Contrapositive
In logic, the statement "If P is true, then Q is true" ($P \\implies Q$) is mathematically identical to its contrapositive: "If Q is false, then P is false" ($\\neg Q \\implies \\neg P$).
Sometimes, it is mathematically easier to prove the negative reverse.
- **Example**: Prove that if $x^2$ is Even, then $x$ is Even.
- **Proof**: Instead of dealing with square roots, we prove the contrapositive: "If $x$ is Odd, then $x^2$ is Odd." Let $x = 2k + 1$. Then $x^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$. This is mathematically the definition of an Odd number. The contrapositive is true, therefore the original statement is true.

## 3. Proof by Contradiction
Assume the statement is False, and use logic to derive an impossible mathematical paradox (like $1=0$). This forces the assumption to be wrong, meaning the original statement must be True. (Used famously by Turing to prove the Halting Problem).

## 4. Mathematical Induction
The technique for proving a property holds for an infinite sequence (like $N=1, 2, 3...$). You prove the **Base Case** ($N=1$), and the **Inductive Step** (if $N=k$ is true, $N=k+1$ must mathematically follow). This is the only formal way to prove the absolute correctness of Recursive algorithms.

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
