import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  "src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Manacher's algorithm/index.mdx": `---
title: Manacher's Algorithm
description: "A brilliant linear-time algorithm designed specifically to find the longest palindromic substring within a given string in strict O(N) time, mathematically bypassing the quadratic time of center-expansion."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Manacher's Algorithm"
  subtitle="The Longest Palindromic Substring"
  tags={['Algorithms', 'Strings', 'Palindromes', 'Mathematics']}
>

A Palindrome is a string that reads the same forwards and backwards (e.g., "RACECAR").
If you want to find the longest palindrome inside a massive text, a naive "Expand Around Center" approach checks every single character and expands outwards, taking mathematically **O(N²)** time.

## 1. The Even-Length Problem
Palindromes can have an odd length (TICK1R-A-C-E-C-A-RTICK1, center is 'E') or an even length (TICK1A-B-B-ATICK1, center is between the B's).
Manacher's algorithm solves this by mathematically inserting a unique delimiter (like TICK1#TICK1) between every single character: TICK1#A#B#B#A#TICK1. Now, mathematically, *all* palindromes are odd-length, making the logic perfectly uniform.

## 2. Exploiting Palindromic Symmetry
The core genius of Manacher's is its mathematical exploitation of symmetry.
Imagine you have already found a massive palindrome from index 10 to 50 (Center = 30).
You are now calculating the palindrome at index 35.
Because index 35 is mathematically the "mirror image" of index 25 (relative to the center 30), Manacher's mathematically looks at the answer it previously calculated for index 25. If the palindrome at index 25 has length 5, the palindrome at index 35 is mathematically *guaranteed* to have at least length 5!
By copying the mirrored answers and only calculating the physical boundaries of the main palindrome, the algorithm never calculates the same character twice, completing in exactly **O(N)** time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Rabin-Karp/index.mdx': `---
title: Rabin-Karp Algorithm
description: "A string-searching algorithm that mathematically uses a Rolling Hash function to find one or more pattern strings in a massive text, primarily famous for its ability to search for multiple patterns simultaneously."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Rabin-Karp Algorithm"
  subtitle="Searching Strings with Hashes"
  tags={['Algorithms', 'Strings', 'Hashing', 'Mathematics']}
>

In a standard string search (like looking for "APPLE" inside a massive book), the algorithm compares characters one by one. The **Rabin-Karp algorithm** compares *Hashes* instead.

## 1. The Rolling Hash
Rabin-Karp converts the search pattern "APPLE" into a single mathematical integer (e.g., Hash = 4920).
It then creates a "Sliding Window" of length 5 at the beginning of the book, and calculates its Hash.
If the hashes don't match, the algorithm mathematically "rolls" the window one character to the right. The genius of the Rolling Hash (specifically the Rabin-Fingerprint) is that it does not recalculate the hash from scratch. It mathematically subtracts the integer value of the character leaving the window, multiplies by the base, and adds the integer value of the new character entering the window. This takes strictly **O(1)** time per shift.

## 2. Plagiarism Detection
Because the algorithm compares integers instead of strings, you can use a Hash Set to search for 1,000 different words simultaneously!
Rabin-Karp is the mathematical foundation of Plagiarism Detection software. It chops a student's essay into thousands of 5-word chunks, calculates their rolling hashes, and instantly compares them against a database of 10 billion known internet hashes in O(1) time per chunk.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/String matching/index.mdx': `---
title: String Matching
description: "The overarching class of mathematical algorithms tasked with finding one or more occurrences of a specific pattern string within a larger text string."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="String Matching"
  subtitle="The Search for Text"
  tags={['Algorithms', 'Strings', 'Fundamentals', 'Search']}
>

String matching (or String Searching) is one of the most heavily researched domains in computer science, forming the backbone of text editors, database queries, web search engines, and DNA sequencing.

## 1. The Naive Approach
The mathematical baseline is the Naive String Matcher.
It aligns the Pattern (length M) at index 0 of the Text (length N). If they match, it returns the index. If they mismatch, it shifts the Pattern exactly 1 character to the right and tries again.
Worst-case Time Complexity: **O(N * M)**. (e.g., Searching for "AAAAAB" inside a text of 1 million "A"s).

## 2. The Advanced Algorithms
To mathematically break the O(N * M) barrier, computer scientists developed highly specialized algorithms that pre-process either the Pattern or the Text:
- **KMP Algorithm**: Pre-processes the Pattern (O(M)) to know exactly how far to skip forward when a mismatch occurs. Total Time: O(N + M).
- **Boyer-Moore**: Pre-processes the Pattern (O(M)) to search right-to-left, mathematically skipping over characters that don't exist in the pattern. Best Case: O(N / M).
- **Suffix Trees / Suffix Arrays**: Pre-processes the massive *Text* (O(N)). Once built, you can search for *any* pattern of length M in exactly O(M) time, regardless of how massive the text is. This is the mathematical foundation of Google Search.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Suffix automaton/index.mdx': `---
title: Suffix Automaton
description: "A powerful, mathematically elegant deterministic finite automaton (DFA) that represents all possible substrings of a given string in an incredibly compact, linear-size data structure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Suffix Automaton"
  subtitle="The Ultimate Substring Machine"
  tags={['Algorithms', 'Strings', 'Automata', 'Advanced']}
>

A Suffix Trie mathematically stores every single substring of a text. However, a Suffix Trie for a string of length N contains **O(N²)** nodes. For a 1-megabyte text file, the Trie would mathematically consume 1 Terabyte of RAM.

## 1. The Directed Acyclic Word Graph (DAWG)
A **Suffix Automaton** (also known as a DAWG) mathematically compresses the Suffix Trie into a strict **O(N)** size by merging equivalent states.
It mathematically guarantees that for a string of length N, the automaton will contain at most **2N - 1 states** and **3N - 4 transitions (edges)**.
This means you can represent all 500 billion possible substrings of a 1-million-character string using only a few million nodes in RAM.

## 2. Mathematical Power
The Suffix Automaton is built mathematically online (character by character) in exactly **O(N)** time.
Once built, it is infinitely more powerful than KMP or Boyer-Moore. It can solve practically any string problem in optimal time:
- "Does this word exist?" -> Traverse the automaton. O(Word Length).
- "How many times does this word appear?" -> Precompute node weights. O(Word Length).
- "Find the Longest Common Substring of two texts" -> Build automaton for Text A, trace Text B through it. O(Length of Text B).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Trie-based algorithms/index.mdx': `---
title: Trie-Based Algorithms
description: "A class of algorithms mathematically centered around the Trie (Prefix Tree) data structure, fundamentally used for ultra-fast string retrieval, autocomplete, and dictionary management."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Trie-Based Algorithms"
  subtitle="The Prefix Tree"
  tags={['Algorithms', 'Strings', 'Data Structures', 'Search']}
>

A **Trie** (pronounced "try", from re**trie**val) is a mathematical tree data structure where each node represents a single character. Unlike a binary search tree (where nodes store the whole string), a Trie mathematically stores the string implicitly by the *path* taken to reach a leaf node.

## 1. O(L) String Retrieval
If a database contains 10 million usernames, a Binary Search Tree can find a user in O(log N * L) time (where L is string length).
A Trie completely ignores how many users are in the database. To find the username "Alice" (length 5), you start at the Root, follow the 'A' edge, then 'l', 'i', 'c', 'e'.
The mathematical Time Complexity is strictly **O(L)**. It is entirely independent of N. Searching 10 million names is mathematically as fast as searching 10 names.

## 2. Autocomplete and Auto-Correction
Because a Trie mathematically groups all strings with the exact same prefix into the same branch, it is the fundamental data structure behind Google Search Autocomplete and mobile phone predictive text.
When you type "App", the algorithm navigates to the 'p' node. By running a simple BFS/DFS from that specific node, it mathematically retrieves all descendant leaves ("Apple", "Application", "Appetite") instantly, without scanning the rest of the English dictionary.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.4 String Algorithms/Z-algorithm/index.mdx': `---
title: Z-Algorithm
description: "A linear-time string matching algorithm that mathematically computes a Z-array, representing the length of the longest substring starting at index 'i' that is also a prefix of the entire string."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Z-Algorithm"
  subtitle="The Sibling of KMP"
  tags={['Algorithms', 'Strings', 'Mathematics', 'Performance']}
>

While KMP uses an LPS (Longest Prefix Suffix) array, the **Z-Algorithm** achieves the exact same O(N + M) string matching using a completely different mathematical construct: the Z-Array.

## 1. The Z-Array
For any string S, the Z-Array stores a number at every index TICK1iTICK1.
That number represents the length of the longest substring starting at index TICK1iTICK1 that perfectly matches the absolute beginning (the prefix) of string S.
For the string TICK1"aabcaabxaaaz"TICK1:
The Z-value at index 4 (the second 'a') is **3**, because the substring "aab" exactly matches the prefix "aab" at the start of the string.

## 2. The "Z-Box" Optimization
To build the Z-Array in O(N) time, the algorithm mathematically maintains a "Z-Box" [Left, Right] representing the right-most prefix match it has found so far.
When evaluating a new index TICK1iTICK1, if TICK1iTICK1 is mathematically inside the Z-Box, the algorithm looks at the previously computed mirror-image value inside the box. Just like Manacher's Algorithm for palindromes, it mathematically copies the old answer to avoid redundant character comparisons, guaranteeing strict linear time complexity.
To search for a Pattern in a Text, you simply concatenate them: TICK1Pattern + "$" + TextTICK1, and run the Z-algorithm. Any Z-value equal to the length of the Pattern is a confirmed match!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/Bit tricks/index.mdx': `---
title: Bit Tricks
description: "A collection of clever mathematical operations that exploit the low-level binary representation of integers to perform tasks like checking parity, swapping variables, or isolating bits in a single CPU cycle."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bit Tricks"
  subtitle="Hardware-Level Optimization"
  tags={['Algorithms', 'Bit Manipulation', 'Performance', 'Low Level']}
>

Bit tricks bypass standard algebraic arithmetic (like TICK1+TICK1, TICK1-TICK1, TICK1*TICK1, TICK1%TICK1) and mathematically manipulate the raw 1s and 0s inside the CPU registers using bitwise operators (TICK1&TICK1, TICK1|TICK1, TICK1^TICK1, TICK1<<TICK1, TICK1>>TICK1), executing in a single clock cycle.

## 1. The Most Famous Mathematical Tricks
- **Check if a number is Even/Odd**: TICK1(x & 1)TICK1. If 1, it's Odd. If 0, it's Even. (Blisteringly faster than TICK1x % 2 == 0TICK1).
- **Multiply/Divide by 2**: TICK1(x << 1)TICK1 multiplies by 2. TICK1(x >> 1)TICK1 divides by 2.
- **Swap two variables without a temporary variable**:
  TICK3cpp
  x = x ^ y;
  y = x ^ y;
  x = x ^ y;
  TICK3
- **Check if a number is an exact Power of 2**: TICK1(x & (x - 1)) == 0TICK1. (Because powers of 2 in binary are a single 1 followed by zeroes, e.g., TICK11000TICK1. Subtracting 1 flips the bits to TICK10111TICK1. The bitwise AND of TICK11000 & 0111TICK1 is mathematically exactly 0).

## 2. Isolating and Clearing Bits
- **Turn OFF the rightmost 1-bit**: TICK1x = x & (x - 1)TICK1 (Used in Brian Kernighan's algorithm to count set bits).
- **Isolate the rightmost 1-bit**: TICK1x = x & (-x)TICK1 (Mathematically relies on Two's Complement representation; heavily used in Fenwick Trees).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/Bitmasking/index.mdx': `---
title: Bitmasking
description: "A powerful mathematical data representation technique where individual bits within a single integer are used as boolean flags to represent the presence or absence of items in a set."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bitmasking"
  subtitle="Compressing Arrays into Integers"
  tags={['Algorithms', 'Bit Manipulation', 'Data Structures', 'Performance']}
>

If a video game character has 8 possible status effects (Poison, Stun, Silence, etc.), you could store them in an array of 8 booleans (which mathematically takes 8 bytes of RAM).
**Bitmasking** stores them all in a single 8-bit integer (1 byte of RAM).

## 1. The Binary Mask
Imagine the integer TICK15TICK1. In binary, 5 is TICK100000101TICK1.
Reading from right to left (index 0 to 7), the bit at index 0 is 1 (True), index 1 is 0 (False), and index 2 is 1 (True).
This single integer mathematically represents an exact subset of the status effects!

## 2. Interacting with the Mask
You modify the mask using Bitwise Operators and Bit Shifting (TICK1<<TICK1):
- **Set a Flag (Turn ON)**: To inflict Status #4, you use Bitwise OR: TICK1mask = mask | (1 << 4)TICK1.
- **Clear a Flag (Turn OFF)**: To cure Status #4, you use Bitwise AND with a NOT: TICK1mask = mask & ~(1 << 4)TICK1.
- **Check a Flag**: To see if Status #4 is active: TICK1if ((mask & (1 << 4)) > 0)TICK1.
Because the CPU can execute these bitwise operations in hardware, Bitmasking mathematically guarantees absolute maximum performance and minimal memory footprint, making it the standard for low-level system flags (like Linux file permissions: TICK1chmod 777TICK1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/Bitwise operators/index.mdx': `---
title: Bitwise Operators
description: "The fundamental hardware-level instructions (AND, OR, XOR, NOT, Shifts) that mathematically manipulate individual binary bits within integers, serving as the foundation of all digital logic circuits."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bitwise Operators"
  subtitle="The Algebra of the CPU"
  tags={['Algorithms', 'Bit Manipulation', 'Fundamentals', 'Low Level']}
>

While software engineers think in Base-10 (Decimal) and algebra, the CPU physically consists of microscopic transistors that only understand Base-2 (Binary). Bitwise operators are the exact mathematical gates used to manipulate those transistors.

## 1. The Logical Operators
These operators mathematically compare two integers bit-by-bit.
- **AND ( TICK1&TICK1 )**: Returns 1 *only* if both bits are 1. (Used to mask/extract specific bits).
- **OR ( TICK1|TICK1 )**: Returns 1 if *either* bit is 1. (Used to set/turn on specific bits).
- **XOR ( TICK1^TICK1 )**: Returns 1 if the bits are *different*. (Used to toggle bits. Mathematically, TICK1A ^ A = 0TICK1, which is a powerful property for finding missing numbers).
- **NOT ( TICK1~TICK1 )**: Inverts every single bit. (0 becomes 1, 1 becomes 0. In Two's Complement math, TICK1~x = -x - 1TICK1).

## 2. The Shift Operators
These operators physically move the bits left or right inside the CPU register.
- **Left Shift ( TICK1<<TICK1 )**: Shifts all bits to the left, padding the right with zeroes. TICK1(5 << 1)TICK1 mathematically shifts TICK10101TICK1 to TICK11010TICK1 (10). This is equivalent to multiplying by 2^N.
- **Right Shift ( TICK1>>TICK1 )**: Shifts bits to the right. This is equivalent to integer division by 2^N. (Note: Java has both TICK1>>TICK1 for Signed shift which preserves negative numbers, and TICK1>>>TICK1 for Unsigned logical shift).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.5 Bit Manipulation/Gray code/index.mdx': `---
title: Gray Code
description: "A specialized mathematical ordering of the binary numeral system wherein two successive values differ in only one single bit, famously used to prevent hardware race conditions in digital sensors."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Gray Code"
  subtitle="The Reflected Binary Code"
  tags={['Algorithms', 'Bit Manipulation', 'Hardware', 'Mathematics']}
>

In standard Binary counting (0, 1, 2, 3), the transition from 3 to 4 looks like this:
TICK1011TICK1 (3) -> TICK1100TICK1 (4).
Mathematically, **three distinct bits physically flipped at the exact same time**. 

## 1. The Hardware Race Condition
In mechanical engineering and digital sensors (like a rotating dial), transistors do not flip at the exact mathematical same picosecond. If a sensor transitions from 3 to 4, it might read TICK1011 -> 111 -> 101 -> 100TICK1 as the bits settle. For a fraction of a millisecond, the sensor reads "7" and "5", causing a catastrophic software error.
Frank Gray patented **Gray Code** in 1953 to mathematically solve this.

## 2. The One-Bit Guarantee
In a Gray Code sequence, every adjacent number mathematically differs by exactly **ONE** bit.
Standard: TICK100, 01, 10, 11TICK1
Gray Code: TICK100, 01, 11, 10TICK1
Because only one bit physically flips at any given time, intermediate states mathematically cannot exist.
The conversion is blisteringly fast using bitwise operators:
- **Binary to Gray**: TICK1gray = num ^ (num >> 1)TICK1.

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
