import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Reservoir sampling/index.mdx': `---
title: Reservoir Sampling
description: "A mathematical family of randomized algorithms for choosing a simple random sample of 'K' items from a massive population of 'N' items, where 'N' is either unknown or too large to fit into main memory."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Reservoir Sampling"
  subtitle="Sampling the Infinite Stream"
  tags={['Algorithms', 'Techniques', 'Randomization', 'Mathematics']}
>

Imagine you are reading a live, infinite stream of Twitter posts. Your manager asks you to save exactly 10 random posts to represent the whole day.
You cannot store all the posts in an array and pick 10 at the end, because you don't have enough RAM. You cannot just pick the first 10, because that isn't random.

## 1. The Mathematical Reservoir
Reservoir Sampling solves this elegantly in O(N) time and O(K) space.
1. Create a "Reservoir" array of size K (e.g., K = 10).
2. For the first 10 tweets you receive, mathematically put them all in the Reservoir.
3. When the 11th tweet arrives, you generate a random number TICK1RTICK1 between 1 and 11. If TICK1R <= 10TICK1, you evict the tweet at index TICK1RTICK1 in the reservoir and replace it with the new 11th tweet. If TICK1R == 11TICK1, you ignore the 11th tweet.
4. When the Nth tweet arrives, generate a random number TICK1RTICK1 between 1 and N. If TICK1R <= 10TICK1, replace.

## 2. The Probability Proof
It seems completely unfair to the early tweets, but mathematically, it is perfectly uniform.
By induction, you can mathematically prove that after N items have been processed, *every single item* (whether it arrived first or last) has an exact mathematical probability of **K / N** of being inside the Reservoir.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Sliding window/index.mdx': `---
title: Sliding Window
description: "A highly optimized algorithmic technique used to track a subset of data moving over a larger data structure (usually an array or string) to solve subset/subarray problems in linear O(N) time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Sliding Window"
  subtitle="O(N) Subarray Processing"
  tags={['Algorithms', 'Techniques', 'Arrays', 'Performance']}
>

If you are asked to find the "Maximum sum of any contiguous subarray of size 3" in TICK1[2, 1, 5, 1, 3, 2]TICK1.
A naive approach mathematically requires nested loops: Calculate [2,1,5], then [1,5,1], then [5,1,3]. This takes O(N * K) time.

## 1. The Moving Window
The Sliding Window mathematically realizes that recalculating the entire subset is redundant.
Between [2,1,5] and [1,5,1], the numbers [1,5] are completely unchanged!
Instead of recalculating, you mathematically create a "Window" of size 3.
You calculate the first window: TICK12 + 1 + 5 = 8TICK1.
To "slide" the window one step to the right, you just mathematically **subtract the element leaving the window (2), and add the new element entering the window (1)**.
TICK18 - 2 + 1 = 7TICK1.

## 2. Dynamic Windows
The window doesn't have to be a fixed size.
If asked to find the "Longest substring without repeating characters", you use two pointers (Left and Right) to represent the window. You mathematically expand the Right pointer until you hit a duplicate character. Then, you mathematically shrink the Left pointer until the duplicate is ejected from the window. Because each pointer only sweeps the array once, the Time Complexity is strictly **O(N)**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/tabulation)/index.mdx': `---
title: Tabulation
description: "An optimization technique."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Tabulation (Bottom-Up DP)"
  subtitle="Dynamic Programming Optimization"
  tags={['Algorithms', 'Techniques', 'Dynamic Programming']}
>

This page was generated due to a parsing artifact in the scaffolding script.

For the full mathematical explanation of Dynamic Programming, including **Top-Down Memoization** and **Bottom-Up Tabulation**, please refer to the primary **Dynamic Programming** page in this knowledge base.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.3 Algorithmic Techniques/Two pointers/index.mdx': `---
title: Two Pointers
description: "A mathematical algorithmic technique that utilizes two indices (pointers) to traverse a linear data structure simultaneously, typically moving towards each other or in the same direction, to solve problems in linear time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Two Pointers"
  subtitle="Simultaneous Array Traversal"
  tags={['Algorithms', 'Techniques', 'Arrays', 'Performance']}
>

If you are asked to find two numbers in a sorted array that sum exactly to a Target, a naive double TICK1forTICK1 loop takes O(N²) time.

## 1. The Squeezing Technique (Opposite Ends)
Because the array is mathematically sorted, you can place a **Left Pointer** at index 0 (the smallest number) and a **Right Pointer** at index N-1 (the largest number).
Add them together.
- If the TICK1Sum > TargetTICK1, the only mathematical way to reduce the sum is to move the Right Pointer one step to the left.
- If the TICK1Sum < TargetTICK1, you mathematically must move the Left Pointer one step to the right.
The pointers "squeeze" towards the middle, finding the exact pair in exactly **O(N)** time without any nested loops.

## 2. The Slow/Fast Technique (Same Direction)
Used famously in "Floyd's Cycle-Finding Algorithm" (The Tortoise and the Hare) to detect infinite loops in a Linked List.
You mathematically place a Slow pointer and a Fast pointer at the start.
The Slow pointer moves 1 step per tick. The Fast pointer moves 2 steps.
If the Linked List contains a cycle (a circle), the math guarantees that the Fast pointer will eventually "lap" the Slow pointer from behind, meaning they will equal each other. If the Fast pointer hits a TICK1nullTICK1, there is no cycle. Time Complexity: O(N), Space Complexity: O(1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Aho-Corasick/index.mdx': `---
title: Aho-Corasick Algorithm
description: "A highly complex string-searching algorithm that mathematically constructs a finite state machine to locate multiple target keywords simultaneously within a massive block of text in strictly linear time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Aho-Corasick Algorithm"
  subtitle="The Multi-Pattern Search"
  tags={['Algorithms', 'Strings', 'Automata', 'Advanced']}
>

If you want to find the word "Cat" in a 1,000-page book, you can use KMP. But what if you want to find "Cat", "Dog", "Bird", and "Horse" simultaneously? Running KMP four times is mathematically inefficient.

## 1. The Trie + Finite State Machine
Aho-Corasick solves this by combining a **Trie** (Prefix Tree) with an **Automaton**.
1. It mathematically builds a Trie containing all your target dictionary words.
2. It then adds **Failure Links** to the Trie.
If the algorithm is halfway through matching "Horse" but suddenly reads a 'u', it mathematically knows "Horse" has failed. Instead of starting the search over from the beginning, the Failure Link mathematically instantly teleports the algorithm to the prefix of another word (e.g., "House") that might still be valid based on the characters just read.

## 2. Mathematical Performance
Because the algorithm mathematically never moves backward in the massive text string, it processes the text in a single, continuous sweep.
The Time Complexity is **O(N + M + Z)**, where N is the length of the text, M is the length of all dictionary words combined, and Z is the number of matches found. Aho-Corasick is the mathematical foundation of modern intrusion detection systems (like Snort) and antivirus scanners, which must search network packets for 100,000 virus signatures simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Boyer-Moore/index.mdx': `---
title: Boyer-Moore Algorithm
description: "An incredibly fast string-searching algorithm that mathematically skips large sections of the text by comparing the search pattern from right-to-left and utilizing a bad-character shift table."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Boyer-Moore Algorithm"
  subtitle="The Speed of Skipping"
  tags={['Algorithms', 'Strings', 'Performance', 'Mathematics']}
>

Boyer-Moore is the standard mathematical string-search algorithm used in modern text editors (like the TICK1Ctrl+FTICK1 function). It is mathematically famous because the *longer* the word you are searching for, the *faster* the algorithm runs.

## 1. Right-to-Left Comparison
Unlike standard algorithms that check strings from left-to-right (TICK1[H][E][L][L][O]TICK1), Boyer-Moore aligns the pattern with the text but starts checking at the mathematically **right-most** character.
If you are searching for "HELLO" (length 5), you align it at index 0 of the text, but you mathematically check index 4 first.

## 2. The Bad Character Rule
If the character at index 4 in the text is 'Z', Boyer-Moore mathematically realizes something profound: The letter 'Z' does not exist *anywhere* in the word "HELLO".
Therefore, it is mathematically impossible for the word "HELLO" to start at index 0, 1, 2, 3, or 4.
The algorithm instantly **skips** the pattern a full 5 spaces forward.
By utilizing two precomputed mathematical tables (the Bad Character rule and the Good Suffix rule), the best-case Time Complexity is an astonishing **O(N / M)**, meaning it mathematically skips over the vast majority of the text without ever reading it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Edit distance - Levenshtein/index.mdx': `---
title: Levenshtein Distance
description: "A string metric for measuring the exact mathematical difference between two sequences, defined as the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one word into the other."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Levenshtein Distance"
  subtitle="The Mathematics of Spell Check"
  tags={['Algorithms', 'Strings', 'Dynamic Programming', 'Mathematics']}
>

Invented by Vladimir Levenshtein in 1965, this metric is the mathematical foundation of every modern spell-checker and fuzzy-search algorithm.

## 1. The Three Operations
To transform the word TICK1"KITTEN"TICK1 into TICK1"SITTING"TICK1, what is the mathematical minimum number of edits required?
1. **S**itten (Substitute K for S)
2. Sitt**i**n (Substitute E for I)
3. Sittin**g** (Insert G)
The Levenshtein Distance is exactly **3**.

## 2. The Dynamic Programming Matrix
Brute-forcing every possible combination of inserts and deletes is mathematically catastrophic (O(3^N)).
Instead, engineers use a 2D Dynamic Programming matrix.
The matrix compares all prefixes of Word A against all prefixes of Word B.
If the current characters match, the mathematical cost is 0. If they do not match, the algorithm mathematically checks the three adjacent cells in the matrix (which represent the cost of an Insert, Delete, or Substitute from previous prefixes), picks the minimum of the three, and adds +1 cost. The final cell in the matrix contains the absolute minimum distance, computed in exactly **O(N * M)** time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/KMP/index.mdx': `---
title: KMP Algorithm
description: "The Knuth-Morris-Pratt algorithm is a linear-time string searching algorithm that mathematically bypasses redundant character comparisons by precomputing a Longest Prefix Suffix (LPS) array."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="KMP Algorithm"
  subtitle="String Searching without Backtracking"
  tags={['Algorithms', 'Strings', 'Mathematics', 'Performance']}
>

In a naive string search, if you are looking for "ABCABD" inside "ABCABCABCABD", and you fail at the last letter 'D', you must mathematically start all over from the 2nd character of the text. This backtracking leads to a worst-case Time Complexity of O(N * M).

## 1. The LPS Array (Pi Table)
The KMP algorithm mathematically eliminates backtracking. It guarantees that the text pointer *never* moves backward.
It achieves this by precomputing an LPS (Longest Prefix Suffix) array for the search pattern.
The LPS mathematically analyzes the pattern for symmetry. For the pattern "ABCA", the LPS notes that the prefix "A" is identical to the suffix "A".

## 2. Skipping the Redundancy
If the search fails at the 'D' in "ABCABD", the algorithm does not reset.
It mathematically checks the LPS array. The LPS array says: *"You just matched 'ABCA' before failing. I know mathematically that the 'A' at the end of that match can act as the 'A' at the start of a new match."*
The algorithm instantly shifts the pattern forward, maintaining its place in the massive text block. Because the text pointer only ever moves to the right, the search is mathematically guaranteed to finish in strictly **O(N + M)** time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Longest common subsequence/index.mdx': `---
title: Longest Common Subsequence (LCS)
description: "A classic mathematical computer science problem used to find the longest sequence that can be derived from two strings by deleting some characters without changing the mathematical order of the remaining characters."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Longest Common Subsequence (LCS)"
  subtitle="The Foundation of Git Diff"
  tags={['Algorithms', 'Strings', 'Dynamic Programming', 'Mathematics']}
>

A "Subsequence" is mathematically different from a "Substring". A substring must be perfectly contiguous (no gaps). A subsequence allows gaps, as long as the mathematical order remains intact.
For TICK1"ABCDEF"TICK1 and TICK1"ACEG"TICK1, the Longest Common Subsequence is TICK1"ACE"TICK1.

## 1. The DNA Sequence Problem
LCS is heavily utilized in bioinformatics to mathematically compare two strands of DNA to find evolutionary similarities, and in software engineering to generate the TICK1git diffTICK1 between two versions of a text file.

## 2. Dynamic Programming Solution
Finding the LCS via brute-force recursion results in an exponential O(2^N) time complexity.
It is standardly solved using a 2D Dynamic Programming matrix.
- If the characters at TICK1A[i]TICK1 and TICK1B[j]TICK1 match, the mathematical sequence length increases by 1: TICK1DP[i][j] = 1 + DP[i-1][j-1]TICK1.
- If they do not match, the algorithm mathematically inherits the best sequence found so far by checking the cell above it and the cell to its left: TICK1DP[i][j] = Math.max(DP[i-1][j], DP[i][j-1])TICK1.
This elegantly collapses the exponential problem into a polynomial **O(N * M)** time complexity, making it trivial to process files with thousands of lines.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Longest common substring/index.mdx': `---
title: Longest Common Substring
description: "A string-processing algorithm that finds the longest mathematically contiguous string of characters that is present in two or more input strings."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Longest Common Substring"
  subtitle="Finding Contiguous Matches"
  tags={['Algorithms', 'Strings', 'Dynamic Programming', 'Advanced']}
>

While Longest Common Subsequence (LCS) allows mathematical gaps, **Longest Common Substring** demands absolute contiguous perfection.
For TICK1"ABABC"TICK1 and TICK1"BABCA"TICK1, the longest common substring is TICK1"BABC"TICK1 (length 4).

## 1. The Dynamic Programming Approach
The DP solution is mathematically almost identical to the Subsequence (LCS) matrix, but with one critical change.
If TICK1A[i]TICK1 and TICK1B[j]TICK1 do NOT match, a Subsequence matrix copies the max from adjacent cells (inheriting the score).
A Substring matrix mathematically forces the score to **0**.
Because the match must be contiguous, any mismatch mathematically breaks the chain instantly. The algorithm simply scans the entire 2D matrix at the end and finds the absolute highest number. Time Complexity: **O(N * M)**.

## 2. Generalized Suffix Trees
For two strings, O(N * M) DP is fine. But what if you need to find the longest common substring across 1,000 massive documents?
Engineers mathematically concatenate all 1,000 documents together (separated by unique sentinel characters like TICK1$TICK1 or TICK1#TICK1) and build a **Generalized Suffix Tree**.
Once the tree is built (which can mathematically be done in O(N) time using Ukkonen's Algorithm), you simply find the deepest internal node in the tree that contains leaves from every single document. This achieves a mind-blowing mathematical Time Complexity of **O(N)** for the entire process.

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
