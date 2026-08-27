import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/External sorting/index.mdx': `---
title: External Sorting
description: "A class of sorting algorithms that can handle massive amounts of data that do not fit into a computer's main memory (RAM), mathematically relying on auxiliary storage like hard drives and a K-way merge process."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="External Sorting"
  subtitle="Sorting Beyond the Limits of RAM"
  tags={['Algorithms', 'Sorting', 'Big Data', 'Memory']}
>

If you have a 100-Gigabyte log file that you need to sort by timestamp, but your server only has 8 Gigabytes of RAM, a standard Quicksort will mathematically crash the server with an OutOfMemory (OOM) error.

## 1. The Chunking Phase
External Sorting solves this by mathematically chunking the data.
1. The CPU reads the first 8GB of the file into RAM.
2. It uses a fast in-memory algorithm (like Quicksort) to sort just those 8GB.
3. It mathematically writes the sorted 8GB back to the hard drive as a temporary file (TICK1chunk1.tmpTICK1).
4. It repeats this process until the 100GB file is split into thirteen 8GB sorted temporary files.

## 2. The K-Way Merge Phase
Now, the CPU mathematically opens 13 file pointers, one for each chunk.
It reads the *first element* from each of the 13 chunks into RAM (using almost zero memory). It mathematically compares those 13 elements, picks the absolute smallest one, writes it to the final TICK1output.txtTICK1 file, and advances the pointer of the chunk that won. This K-way merge mathematically guarantees the final 100GB file is perfectly sorted while utilizing only a tiny fraction of the system's RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Heap sort/index.mdx': `---
title: Heapsort
description: "A mathematically elegant, comparison-based sorting algorithm that utilizes a binary heap data structure to continuously extract the largest (or smallest) element, guaranteeing an O(N log N) worst-case time complexity."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Heapsort"
  subtitle="Sorting via Priority Queues"
  tags={['Algorithms', 'Sorting', 'Trees', 'Performance']}
>

While Quicksort is usually faster in practice, Quicksort has a mathematical Achilles' heel: its worst-case performance degrades to O(N²). Heapsort provides a mathematical guarantee that it will *never* degrade past O(N log N).

## 1. Building the Heap (Heapify)
The algorithm conceptually treats the flat array as a Complete Binary Tree.
In Phase 1, it runs a mathematical TICK1heapify()TICK1 function from the bottom up. This function mathematically guarantees that every parent node is larger than its children (creating a Max-Heap). This initial phase takes O(N) time. The absolute largest number in the array is now sitting at the root (index 0).

## 2. Extract and Sift
In Phase 2, the algorithm swaps the root (the largest number) with the very last element in the array, effectively locking that largest number into its final sorted position.
Because the root is now a small number, the heap is mathematically violated. The algorithm executes a TICK1siftDown()TICK1 operation to push the small number down the tree, taking O(log N) time, until the *second* largest number bubbles up to the root. It repeats this extraction N times, resulting in a perfectly sorted array in O(N log N) time, utilizing O(1) auxiliary space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Insertion sort/index.mdx': `---
title: Insertion Sort
description: "A simple sorting algorithm that builds the final sorted array one item at a time by mathematically taking the next element and 'inserting' it into its correct position among the already-sorted elements."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Insertion Sort"
  subtitle="How Humans Sort Playing Cards"
  tags={['Algorithms', 'Sorting', 'Fundamentals', 'Big O']}
>

Insertion sort is mathematically identical to how a human sorts a hand of playing cards. You hold the sorted cards in your left hand, pick up a new card with your right hand, and slide it into the correct position in your left hand.

## 1. The Mathematical Mechanism
The algorithm conceptually splits the array into a "sorted" left side and an "unsorted" right side.
Initially, the first element (index 0) is considered sorted.
It looks at index 1. If it is smaller than index 0, it shifts index 0 to the right and *inserts* index 1 at the beginning.
It then looks at index 2, mathematically comparing it backward against the sorted left side, shifting larger elements rightward until it finds the exact spot where index 2 belongs.

## 2. Performance and Use Cases
The worst-case Time Complexity is **O(N²)** (if the array is completely backwards).
However, Insertion Sort has a massive mathematical advantage: if the array is *already mostly sorted*, its Time Complexity drops to **O(N)**. Because it has extremely low overhead, modern algorithms like Tim Sort mathematically switch to Insertion Sort when the sub-arrays get very small (e.g., < 32 elements).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Introsort/index.mdx': `---
title: Introsort
description: "A highly optimized hybrid sorting algorithm that mathematically begins with Quicksort but switches to Heapsort if the recursion depth exceeds a certain level, combining the best aspects of both algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Introsort"
  subtitle="The Best of Both Worlds"
  tags={['Algorithms', 'Sorting', 'Performance', 'Advanced']}
>

Introsort (Introspective Sort) is the default sorting algorithm used by the C++ Standard Library (TICK1std::sortTICK1) and the .NET Framework, because it mathematically eliminates the weaknesses of standalone algorithms.

## 1. The Quicksort Gamble
Quicksort is mathematically the fastest general-purpose sort (O(N log N)), but it is a gamble. If it repeatedly picks a terrible "Pivot" (e.g., if the data is already sorted), the recursion tree becomes completely unbalanced, and the performance catastrophically degrades to O(N²), causing a Stack Overflow.

## 2. The Introspective Switch
Introsort solves this by mathematically tracking the recursion depth.
It starts by running standard Quicksort. However, it passes a mathematical counter down the recursive calls, usually initialized to TICK12 * log(N)TICK1.
If the recursion goes deeper than that counter, Introsort mathematically realizes: *"I am hitting Quicksort's worst-case scenario."* It instantly aborts the Quicksort algorithm and switches to **Heapsort** for the remaining sub-arrays. Because Heapsort mathematically guarantees O(N log N) worst-case performance, Introsort achieves the blistering average speed of Quicksort with the mathematical safety net of Heapsort.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Linear search/index.mdx': `---
title: Linear Search
description: "The simplest mathematical search algorithm, which finds the position of a target value within a list by sequentially checking each element from the beginning until a match is found."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Linear Search"
  subtitle="The Brute Force Approach"
  tags={['Algorithms', 'Searching', 'Fundamentals', 'Big O']}
>

Linear Search (or Sequential Search) is the mathematical equivalent of looking for a word in a dictionary by reading every single page starting from page 1.

## 1. The Algorithm
You are given an array: TICK1[14, 5, 29, 3, 99]TICK1 and a target: TICK13TICK1.
The algorithm starts at index 0.
TICK1Is 14 == 3? No.TICK1
TICK1Is 5 == 3? No.TICK1
TICK1Is 29 == 3? No.TICK1
TICK1Is 3 == 3? Yes. Return index 3.TICK1

## 2. Time Complexity
The worst-case mathematical Time Complexity is **O(N)**. If the target is the very last element in a 1-billion-item database (or if it doesn't exist at all), the CPU must perform 1 billion comparisons.
While highly inefficient compared to Binary Search (O(log N)), Linear Search has one critical mathematical advantage: **It does not require the data to be sorted.** If data is constantly changing and the cost of sorting it (O(N log N)) is too high, Linear Search is mathematically the only option.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Radix sort/index.mdx': `---
title: Radix Sort
description: "A non-comparative sorting algorithm that sorts data with integer keys by mathematically grouping keys by the individual digits which share the same significant position and value."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Radix Sort"
  subtitle="Sorting by Digits"
  tags={['Algorithms', 'Sorting', 'Mathematics', 'Advanced']}
>

Like Counting Sort, Radix Sort mathematically bypasses the O(N log N) barrier by completely avoiding direct TICK1a < bTICK1 comparisons. It is heavily used for sorting massive datasets of fixed-length integers (like Social Security Numbers or IP addresses).

## 1. The Least Significant Digit (LSD)
Imagine sorting: TICK1[170, 045, 075, 090, 802, 024, 002, 066]TICK1.
Radix Sort mathematically processes the numbers one digit column at a time, starting from the rightmost digit (the ones place).
1. **Pass 1 (Ones Place)**: It groups the numbers by their last digit. (170 and 090 go into Bucket 0. 802 and 002 go into Bucket 2). It flattens the buckets.
2. **Pass 2 (Tens Place)**: It groups the new list by the middle digit.
3. **Pass 3 (Hundreds Place)**: It groups the list by the first digit.

## 2. Mathematical Performance
Because it uses Counting Sort as a subroutine for each column, it mathematically sorts the array without comparing the whole numbers.
The Time Complexity is **O(d * (N + b))**, where **d** is the number of digits (3 in the example above) and **b** is the base (10 for decimal). If the number of digits is small, Radix Sort mathematically executes in strictly linear O(N) time, completely destroying Quicksort in benchmark speed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Selection sort/index.mdx': `---
title: Selection Sort
description: "An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist building up from left to right, and an unsorted sublist occupying the rest of the list."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Selection Sort"
  subtitle="Finding the Minimum"
  tags={['Algorithms', 'Sorting', 'Fundamentals', 'Big O']}
>

Selection sort is mathematically intuitive but terribly inefficient. It works by constantly searching the unsorted section for the absolute smallest number.

## 1. The Mathematical Mechanism
1. The algorithm starts at index 0. It assumes index 0 is the smallest.
2. It mathematically scans the *entire rest of the array* to see if there is a smaller number.
3. If it finds a smaller number (e.g., at index 5), it swaps index 0 with index 5. Now, the absolute smallest number in the entire array is locked into index 0.
4. It moves to index 1, and repeats the scan for the remaining unsorted right side.

## 2. Time Complexity
Because it must mathematically scan the entire remaining array for every single index, it requires two nested loops.
The Time Complexity is **O(N²)** in all cases (Best, Average, and Worst). Even if the array is already perfectly sorted, Selection Sort is mathematically too stupid to realize it; it will still scan the entire array N times, making it strictly worse than Insertion Sort for almost all real-world applications.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Shell sort/index.mdx': `---
title: Shellsort
description: "A highly optimized variation of Insertion Sort that mathematically allows the exchange of items that are far apart, drastically reducing the time required to move small elements to the beginning of the array."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Shellsort"
  subtitle="Bridging the Gap"
  tags={['Algorithms', 'Sorting', 'Performance', 'Mathematics']}
>

Invented by Donald Shell in 1959, Shellsort mathematically solves the primary flaw of Insertion Sort. In standard Insertion Sort, if the smallest number is at the very end of the array, it must be shifted one single space at a time, resulting in O(N²) operations.

## 1. The Mathematical Gap
Shellsort introduces the concept of a **Gap**.
Instead of comparing adjacent elements (gap = 1), it might start with a gap of 4.
It compares index 0 with index 4, and swaps them if necessary. Then index 1 with index 5.
This allows a small number at the end of the array to mathematically "leap" massive distances towards the front of the array in a single swap.

## 2. Gap Sequences
After the array is "4-sorted", the algorithm mathematically shrinks the gap (e.g., to 2), and performs another pass.
Finally, it sets the gap to 1 (which is mathematically identical to standard Insertion Sort). However, because the massive leaps have already moved the elements roughly into place, the final Insertion Sort executes at blistering speed.
The Time Complexity heavily depends on the mathematical "Gap Sequence" chosen (e.g., Knuth's sequence, Sedgewick's sequence), but it generally averages around **O(N^1.5)**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Ternary search/index.mdx': `---
title: Ternary Search
description: "A mathematical divide-and-conquer algorithm that finds the position of a target value within a sorted array, or finds the maximum/minimum of a unimodal function, by dividing the search space into three parts."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Ternary Search"
  subtitle="Dividing by Three"
  tags={['Algorithms', 'Searching', 'Divide and Conquer', 'Mathematics']}
>

Binary Search mathematically divides the array into two halves. Ternary Search mathematically divides the array into three thirds.

## 1. The Mechanism
Given a sorted array and a target value:
1. The algorithm calculates two mathematical midpoints: TICK1mid1TICK1 (at 33%) and TICK1mid2TICK1 (at 66%).
2. It compares the target to TICK1mid1TICK1 and TICK1mid2TICK1.
3. Based on the comparisons, it mathematically discards two-thirds of the array, recursively focusing only on the one-third that might contain the target.

## 2. Why is Binary Search More Popular?
Intuitively, eliminating 66% of the array seems mathematically superior to eliminating 50%.
However, to split the array into three parts, Ternary Search requires **more comparisons** per step than Binary Search.
- Binary Search: O(log₂ N) steps, 1 comparison per step.
- Ternary Search: O(log₃ N) steps, 2 comparisons per step.
Mathematically, the extra comparisons in Ternary Search make it slightly slower than Binary Search on modern CPUs. However, Ternary Search is heavily used in advanced calculus and machine learning to find the absolute peak of a **Unimodal Function** (a curve that goes up, hits a peak, and goes down) without needing derivatives.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Tim sort/index.mdx': `---
title: Timsort
description: "A highly sophisticated hybrid sorting algorithm derived from Merge Sort and Insertion Sort, mathematically designed to perform optimally on many kinds of real-world data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Timsort"
  subtitle="The Engine of Python and Java"
  tags={['Algorithms', 'Sorting', 'Performance', 'Python']}
>

Created by Tim Peters in 2002 for the Python programming language, Timsort is mathematically so efficient that it replaced Quicksort and Mergesort as the default sorting algorithm in Python, Java, and Android.

## 1. Exploiting Natural Runs
Timsort is mathematically based on a real-world observation: data given to a sorting algorithm is rarely completely random. It usually contains sub-sections that are already sorted (called "Natural Runs").
Timsort scans the array looking for these Runs. If it finds a Run that is too small (e.g., less than 32 elements), it uses **Insertion Sort** to mathematically boost the size of the Run. (Insertion Sort is the fastest algorithm in existence for tiny arrays).

## 2. Merging the Runs
Once the entire array is partitioned into a series of mathematically optimal Runs, Timsort utilizes the combining logic of **Merge Sort** to stitch them together.
By recognizing what is already sorted, and seamlessly swapping between Insertion Sort (for the micro level) and Merge Sort (for the macro level), Timsort achieves a worst-case Time Complexity of **O(N log N)**, but a mind-blowing best-case complexity of **O(N)**.

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
