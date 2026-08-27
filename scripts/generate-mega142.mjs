import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Difference arrays/index.mdx': `---
title: Difference Arrays
description: "A mathematical array manipulation technique used to perform multiple range addition or subtraction updates on an array in strictly O(1) time per update."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Difference Arrays"
  subtitle="O(1) Range Updates"
  tags={['Algorithms', 'Techniques', 'Arrays', 'Mathematics']}
>

If you have an array of 100,000 zeroes, and a user commands: *"Add 5 to all indices from index 10 to index 90,000"*, a standard loop mathematically requires 90,000 operations (O(N)). If the user issues 1,000 of these commands, the Time Complexity degrades to a catastrophic O(N * Q).

## 1. The Mathematical Derivative
Instead of updating the actual array, you create a **Difference Array**, which stores the mathematical difference between adjacent elements (TICK1diff[i] = A[i] - A[i-1]TICK1).
To add 5 to the range [10, 90000], you perform exactly **two** mathematical operations in O(1) time:
1. TICK1diff[10] += 5TICK1 (This tells the system that starting at index 10, the values jump up by 5).
2. TICK1diff[90001] -= 5TICK1 (This tells the system that after index 90,000, the "jump" is canceled out).

## 2. The Prefix Sum Rebirth
After you process all 1,000 range updates in blazing fast O(1) time each, you must convert the Difference Array back into the actual array.
This is done mathematically by calculating the **Prefix Sum** of the Difference Array. As you sweep from left to right adding the values, the "+5" at index 10 mathematically cascades across the array, inflating all values by 5, until it hits the "-5" at index 90001, which mathematically cancels the cascade.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Digit DP/index.mdx': `---
title: Digit DP
description: "A highly specialized form of Dynamic Programming used to count the mathematical number of integers within a massive range [L, R] that satisfy a specific digit-based property."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Digit DP"
  subtitle="Counting Numbers by their Digits"
  tags={['Algorithms', 'Techniques', 'Dynamic Programming', 'Mathematics']}
>

Problem: *"How many numbers between 1 and 10^18 contain the digit '7' exactly three times?"*
A brute force O(N) approach is mathematically impossible, as counting to 10^18 takes a modern CPU over 30 years to finish.

## 1. The Mathematical Digits
Digit DP solves this by mathematically constructing the number digit by digit, from left to right, rather than iterating through the actual numbers.
Because 10^18 only has 18 digits, the algorithm mathematically only needs to make 18 decisions (O(log N)).
The DP State usually tracks three things:
1. **Index**: Which digit position are we currently placing? (0 to 18).
2. **Tight Bound**: Are we currently matching the maximum limit exactly? (If the limit is 500, and we place a '4', we are no longer "tight" and can place any digit 0-9 next. If we place a '5', we are "tight" and the next digit cannot exceed '0').
3. **Property State**: (e.g., How many 7s have we placed so far?)

## 2. Time Complexity
By memoizing these states, Digit DP collapses the 30-year 10^18 brute force into a calculation taking roughly TICK118 * 2 * 18 * 10TICK1 operations. The result returns mathematically instantly, achieving an astonishing Time Complexity of **O(log N)** relative to the upper bound.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Divide and conquer/index.mdx': `---
title: Divide and Conquer
description: "A fundamental algorithmic paradigm that mathematically breaks a massive problem down into two or more smaller sub-problems of the same type, solves them recursively, and combines their answers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Divide and Conquer"
  subtitle="Breaking Down Complexity"
  tags={['Algorithms', 'Techniques', 'Recursion', 'Mathematics']}
>

Divide and Conquer is the mathematical foundation of almost all high-performance algorithms, including Merge Sort, Quick Sort, Binary Search, and the Fast Fourier Transform.

## 1. The Three Mathematical Steps
1. **Divide**: Break the problem into strictly smaller sub-problems. (e.g., in Merge Sort, cut the 100-item array into two 50-item arrays).
2. **Conquer**: Recursively call the algorithm on the sub-problems. If the sub-problem is mathematically small enough (the "Base Case", e.g., an array of length 1), solve it directly.
3. **Combine**: Mathematically merge the solutions of the sub-problems to form the solution to the massive original problem.

## 2. The Master Theorem
The Time Complexity of any Divide and Conquer algorithm can usually be mathematically proven using the Master Theorem:
**T(n) = a * T(n/b) + f(n)**
- **a**: The number of sub-problems you spawn (e.g., 2 in Merge Sort).
- **b**: The factor by which the input shrinks (e.g., 2 in Merge Sort, because you cut it in half).
- **f(n)**: The mathematical cost of the "Combine" step (e.g., O(N) in Merge Sort).
Solving this equation mathematically proves why Merge Sort executes in exactly O(N log N) time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Dynamic programming (memoization/index.mdx': `---
title: Dynamic Programming (Memoization)
description: "An optimization technique that solves complex recursive problems by mathematically remembering (caching) the results of expensive function calls to prevent redundant calculations."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Memoization (Top-Down DP)"
  subtitle="Caching the Recursion Tree"
  tags={['Algorithms', 'Techniques', 'Dynamic Programming', 'Caching']}
>

This page was generated due to a parsing artifact in the scaffolding script.
For the full mathematical explanation, please refer to the primary **Dynamic Programming** page.

## 1. The Recursive Problem
In a naive recursive Fibonacci function (TICK1fib(n) = fib(n-1) + fib(n-2)TICK1), calculating TICK1fib(50)TICK1 mathematically requires evaluating TICK1fib(2)TICK1 hundreds of millions of times. This redundant recalculation causes a catastrophic exponential Time Complexity of O(2^N).

## 2. Top-Down Memoization
Memoization solves this mathematically. You create a Hash Map or Array cache.
Before the function calculates TICK1fib(N)TICK1, it checks the cache: *"Have I ever calculated this exact state before?"*
If YES, it mathematically instantly returns the cached value in O(1) time.
If NO, it performs the expensive recursion, but *saves* the answer to the cache before returning. This mathematically collapses the O(2^N) recursion tree into a straight line, solving the problem in exactly **O(N)** time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Greedy algorithms/index.mdx': `---
title: Greedy Algorithms
description: "A mathematical algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit without worrying about the future."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Greedy Algorithms"
  subtitle="Choosing the Immediate Best"
  tags={['Algorithms', 'Techniques', 'Optimization', 'Mathematics']}
>

A Greedy Algorithm never mathematically looks ahead. It makes the locally optimal choice at every step, hoping that these local choices mathematically sum up to a global optimum.

## 1. When Greedy Succeeds
Greedy algorithms are blisteringly fast (often O(N log N) due to sorting) and mathematically perfect for specific problems:
- **Dijkstra's Algorithm**: Always pick the shortest immediate edge.
- **Kruskal's MST**: Always pick the absolute cheapest edge in the graph.
- **Fractional Knapsack**: Always pick the item with the highest value-to-weight ratio.
If a problem exhibits the mathematical "Greedy Choice Property" and "Optimal Substructure", greedy algorithms are mathematically guaranteed to find the perfect solution.

## 2. When Greedy Fails
Greedy algorithms mathematically fail when immediate choices trap you into terrible long-term outcomes.
In the **0/1 Knapsack Problem** (where you cannot split items), picking the item with the highest value-to-weight ratio might physically block you from fitting two medium items that together have a higher total value. When a problem has interlocking constraints, Greedy fails, and you are mathematically forced to use Dynamic Programming.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Las Vegas algorithms/index.mdx': `---
title: Las Vegas Algorithms
description: "A class of randomized algorithms that are mathematically guaranteed to always produce the correct result, but their execution time is a random variable that depends on the roll of the dice."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Las Vegas Algorithms"
  subtitle="Gambling with Time, not Accuracy"
  tags={['Algorithms', 'Techniques', 'Randomization', 'Mathematics']}
>

In computer science, randomized algorithms are mathematically classified into two cities: Monte Carlo (gambles with accuracy) and Las Vegas (gambles with time).

## 1. The Mathematical Guarantee
A Las Vegas algorithm NEVER returns a wrong answer.
The most famous example is **Randomized Quicksort**.
To sort an array, the algorithm randomly picks a pivot. If it mathematically accidentally picks the absolute worst pivot every single time (the largest number), the algorithm will still correctly sort the array, but it will catastrophically degrade to O(N²) time.
However, mathematical probability dictates that picking the worst pivot consistently is virtually impossible. On average, it picks decent pivots, guaranteeing the correct answer in **O(N log N)** time. 

## 2. The Infinite Loop Risk
Because the time is random, a Las Vegas algorithm mathematically carries the risk of running infinitely long (if the dice roll terribly forever). However, the mathematical *Expected Time Complexity* is usually drastically faster than deterministic algorithms, making them the backbone of modern cryptography and data structure balancing (like Treaps).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Meet in the middle/index.mdx': `---
title: Meet in the Middle
description: "An advanced mathematical search technique used to solve problems where the search space is slightly too large for standard brute force, splitting the problem in half to drastically reduce exponential time complexities."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Meet in the Middle"
  subtitle="Halving Exponential Time"
  tags={['Algorithms', 'Techniques', 'Optimization', 'Mathematics']}
>

If you are asked to find a subset of numbers from an array of size 40 that sum to exactly TICK1XTICK1, a standard brute-force approach requires generating all subsets: **O(2^40)**. 
2^40 is roughly 1 trillion operations, which will mathematically cause the CPU to Time Out.

## 1. The Split
Meet in the Middle mathematically splits the array of 40 into two separate arrays of 20.
1. Generate all subsets for the left half: **O(2^20)**. Store their sums in an array and sort it.
2. Generate all subsets for the right half: **O(2^20)**.

## 2. The Meeting Point
For every subset sum TICK1YTICK1 in the right half, you need to find if there is a sum in the left half that equals TICK1X - YTICK1.
Because you mathematically sorted the left half's sums, you can simply use Binary Search (O(log N)) to find it!
The time complexity drops from a catastrophic O(2^40) down to **O(2^(N/2) * log(2^(N/2)))**, which evaluates to roughly 1 million operations. The algorithm mathematically finishes in 0.1 seconds instead of 10 minutes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Monte Carlo methods/index.mdx': `---
title: Monte Carlo Methods
description: "A broad class of computational algorithms that rely on repeated random sampling to mathematically estimate numerical results, commonly used when deterministic algorithms are computationally impossible."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Monte Carlo Methods"
  subtitle="Gambling for Accuracy"
  tags={['Algorithms', 'Techniques', 'Randomization', 'Mathematics']}
>

Unlike Las Vegas algorithms (which gamble on *time* but guarantee correctness), **Monte Carlo algorithms mathematically guarantee a fast execution time, but gamble on *accuracy*.**

## 1. Approximating Pi
Imagine you want to calculate Pi. A deterministic geometric formula might take infinite time.
A Monte Carlo method does this:
1. Mathematically draw a square, and draw a circle perfectly inscribed inside it.
2. Generate 1 million completely random (X,Y) coordinates inside the square.
3. Mathematically check how many coordinates landed inside the circle (using TICK1X² + Y² <= R²TICK1).
4. The ratio of (Points inside Circle) / (Total Points) mathematically approximates Pi/4.

## 2. The Law of Large Numbers
A Monte Carlo algorithm is mathematically wrong almost all the time. However, due to the Law of Large Numbers, the error margin shrinks as the number of random samples increases.
It is heavily used in Physics simulations, Artificial Intelligence (Monte Carlo Tree Search in AlphaGo), and predicting the stock market, where calculating the *exact* mathematical truth is physically impossible, but a highly probable estimate is sufficient.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Prefix sums/index.mdx': `---
title: Prefix Sums
description: "A foundational mathematical precomputation technique that creates an auxiliary array to instantly answer range sum queries (e.g., 'What is the sum from index L to R?') in strictly O(1) time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Prefix Sums"
  subtitle="O(1) Range Queries"
  tags={['Algorithms', 'Techniques', 'Arrays', 'Mathematics']}
>

If an analytics dashboard constantly queries a database for *"Total revenue from Day 15 to Day 400"*, a standard loop mathematically takes O(N) time. If there are 10,000 queries, the server slows to a crawl (O(N * Q)).

## 1. The Precomputation
You mathematically solve this by precomputing a **Prefix Sum Array** in a single O(N) pass.
Given an array TICK1A = [2, 4, 1, 5]TICK1.
The Prefix Sum array TICK1PTICK1 stores the cumulative sum up to that index: TICK1P = [2, 6, 7, 12]TICK1.
(Mathematically, TICK1P[i] = P[i-1] + A[i]TICK1).

## 2. The O(1) Mathematical Subtraction
When the dashboard asks for the sum from Index 1 to Index 3 (TICK1[4, 1, 5]TICK1):
Instead of looping, you use simple mathematical subtraction:
**Sum(L, R) = P[R] - P[L - 1]**
Sum(1, 3) = P[3] - P[0] = 12 - 2 = 10.
Every single massive range query now mathematically executes in exactly **O(1) time**. The technique effortlessly extends to 2D arrays (Prefix Sum Matrices) for instantly summing sub-rectangles in image processing and computer vision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Randomized algorithms/index.mdx': `---
title: Randomized Algorithms
description: "Algorithms that mathematically utilize a degree of randomness as part of their logic to reduce time or space complexity, deliberately breaking pathological worst-case inputs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Randomized Algorithms"
  subtitle="Breaking the Worst Case"
  tags={['Algorithms', 'Techniques', 'Randomization', 'Mathematics']}
>

In deterministic algorithms, a hacker can mathematically analyze the source code, find the absolute worst-case input, and send it to your server to cause a catastrophic Denial of Service (DoS) attack.

## 1. Breaking the Hacker's Math
If you use standard Quicksort (which always picks the last element as the pivot), a hacker can send an already-sorted list. The math forces Quicksort into its O(N²) worst-case scenario, crashing the server.
By making the algorithm **Randomized** (e.g., Quicksort picking a randomly generated index for the pivot), you mathematically destroy the hacker's ability to predict the system. The worst-case scenario still mathematically exists, but the probability of hitting it drops to practically zero.

## 2. Hashing and Prime Testing
Randomization is deeply embedded in computer science:
- **Hash Tables**: Many hash functions mathematically use random seeds to prevent hash-collision DoS attacks.
- **Miller-Rabin Primality Test**: Determining if a 100-digit number is prime deterministically takes too long. The Miller-Rabin test uses random numbers to mathematically *guess* if it is prime. By running the random test 40 times, the mathematical probability of it being wrong becomes less than the probability of the computer being struck by a cosmic ray.

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
