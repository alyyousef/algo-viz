import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Ropes/index.mdx': `---
title: Ropes
description: "An advanced tree-like data structure used to efficiently store and manipulate extremely long strings of text, frequently utilized by modern text editors and word processors to handle massive documents without performance degradation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Ropes"
  subtitle="The Data Structure of Text Editors"
  tags={['Data Structures', 'Trees', 'Strings', 'Performance']}
>

If you open a 50-megabyte log file in Notepad, a standard String array mathematically struggles to insert a single character in the middle of the file, because it must shift 25 million characters over by one index, resulting in an O(N) operation that freezes the application.

## 1. The Binary Tree of Strings
A **Rope** solves this by representing the massive text file as a Binary Tree.
The "leaves" of the tree contain short mathematical segments of the text (e.g., arrays of 15 characters).
The "internal nodes" of the tree do not contain text; they contain an integer representing the mathematical "weight" (the sum of the lengths of all leaves in their left subtree).

## 2. O(log N) Text Manipulation
Because it is a tree, finding the 20 millionth character takes **O(log N)** time by mathematically traversing down the weights.
More importantly, inserting text in the middle of the document is insanely fast. You do not shift arrays. You simply split a leaf node into two, create a new leaf for the inserted text, and rebalance the local pointers. This allows massive IDEs (like VS Code or IntelliJ) to edit gigabyte-sized files without lagging.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/5. Data Structures/5.1 Linear/Strings/index.mdx': `---
title: Strings
description: "A fundamental linear data structure representing a mathematical sequence of characters, almost universally implemented as an immutable array of bytes or Unicode code points under the hood."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Strings"
  subtitle="The Sequence of Characters"
  tags={['Data Structures', 'Linear', 'Fundamentals', 'Memory']}
>

While a String appears to be a primitive type in many languages (like Python or JavaScript), it is mathematically a complex Data Structure—specifically, a one-dimensional array of characters.

## 1. Immutability
In most modern languages (Java, C#, Python, JS), Strings are mathematically **Immutable**.
Once the string TICK1"HELLO"TICK1 is created in RAM, it cannot be physically altered.
If you execute TICK1str = str + " WORLD"TICK1, the CPU does not append " WORLD" to the existing memory block. It mathematically allocates a completely new, larger block of RAM, copies "HELLO" into it, copies " WORLD" into it, and abandons the original string to the Garbage Collector.

## 2. The String Builder (Mutable Strings)
Because concatenation in a loop (TICK1for (int i=0; i<1000; i++) str += i;TICK1) mathematically generates O(N^2) memory allocation overhead, developers must use a Mutable String data structure (like TICK1StringBuilderTICK1 in Java/C#).
A TICK1StringBuilderTICK1 is backed by a dynamic array. It pre-allocates extra RAM (capacity). When you append text, it writes directly into the empty RAM slots, keeping the mathematical complexity at a blisteringly fast amortized O(1).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Eclipse/index.mdx': `---
title: Eclipse
description: "A historically significant, open-source Integrated Development Environment (IDE) primarily used for Java development, famous for its massive plugin ecosystem and workspace-centric architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Eclipse"
  subtitle="The Classic Java Workspace"
  tags={['IDE', 'Java', 'Tooling', 'Open Source']}
>

Released by IBM in 2001 and eventually donated to an open-source foundation, Eclipse mathematically dominated the enterprise Java ecosystem for over a decade before IntelliJ IDEA took the crown.

## 1. The Workspace Paradigm
Eclipse utilizes a rigid **Workspace** architecture. When you boot Eclipse, you must mathematically select a physical folder on your hard drive (the Workspace). Eclipse stores all its metadata, compiler settings, and project indexes in a hidden TICK1.metadataTICK1 folder inside that workspace.
This allows a developer to mathematically group dozens of related Java Microservices into a single visual window, compiling them simultaneously.

## 2. The Plugin Architecture (OSGi)
Eclipse was not built just for Java; it was built as a universal mathematical platform.
It is powered by **Equinox**, an implementation of the OSGi framework. Everything in Eclipse is a plugin. If you want to write C++ (CDT) or Python (PyDev), you simply load the respective plugins. While incredibly powerful, this architecture historically made Eclipse famously memory-heavy and prone to sluggish performance (often requiring the developer to mathematically tweak the TICK1eclipse.iniTICK1 JVM arguments).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Emacs/index.mdx': `---
title: Emacs
description: "A legendary, highly extensible text editor and computing environment, mathematically infamous for its reliance on chorded keyboard shortcuts and its deeply integrated Lisp programming language."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Emacs"
  subtitle="The Lisp Machine Editor"
  tags={['Editor', 'Tooling', 'Linux', 'Lisp']}
>

Created by Richard Stallman in the 1970s, Emacs is the protagonist in the legendary "Editor War" against Vim.

## 1. The Emacs Lisp Architecture
Vim is a text editor; Emacs is mathematically an operating system that happens to include a text editor.
The absolute core of Emacs is written in C, but 95% of its functionality is written in **Emacs Lisp (Elisp)**. 
Because the editor itself is a running Lisp machine, a developer can mathematically modify the source code of the editor *while the editor is running*, without recompiling. You can turn Emacs into an email client, a web browser, a tetris game, or a psychoanalyst chatbot (M-x doctor) simply by evaluating Lisp functions.

## 2. Chorded Keybindings
Unlike Vim's modal editing, Emacs mathematically relies on "chording" (pressing multiple modifier keys simultaneously).
- TICK1C-x C-sTICK1 (Control-X, followed by Control-S) to save.
- TICK1M-xTICK1 (Meta/Alt-X) to execute a mathematical command.
This heavy reliance on the Control key historically led to the joke that Emacs stands for "Escape Meta Alt Control Shift", and is infamous for causing "Emacs Pinky" (RSI in the left pinky finger).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/PyCharm/index.mdx': `---
title: PyCharm
description: "The industry-standard Integrated Development Environment (IDE) specifically engineered for Python development, created by JetBrains, featuring deep mathematical code analysis and seamless virtual environment integration."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PyCharm"
  subtitle="The Premier Python IDE"
  tags={['IDE', 'Python', 'JetBrains', 'Tooling']}
>

Because Python is a dynamically typed language, it is mathematically incredibly difficult for an IDE to provide accurate autocomplete (because the IDE does not know what type a variable is until runtime). JetBrains built PyCharm to solve this.

## 1. Advanced Static Analysis
PyCharm contains a massive, highly optimized mathematical inference engine.
It reads your Python code, scans the type hints (PEP 484), analyzes docstrings, and mathematically deduces the variable types. This allows PyCharm to provide Java-level autocomplete, instant refactoring (Rename Variable across 50 files), and real-time error highlighting in a language that historically lacked it.

## 2. Ecosystem Integration
PyCharm mathematically wraps the entire Python ecosystem into a single GUI:
- It automatically detects and manages Virtual Environments (TICK1venvTICK1, TICK1condaTICK1, TICK1pipenvTICK1).
- It provides a visual GUI for installing TICK1pipTICK1 packages.
- The Professional edition mathematically integrates directly with Jupyter Notebooks, Docker, and SQL databases, allowing Data Scientists to run Pandas dataframes and inspect PostgreSQL tables without ever leaving the editor window.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Sublime Text/index.mdx': `---
title: Sublime Text
description: "A proprietary, lightning-fast cross-platform text editor that revolutionized modern coding in the 2010s by introducing mathematical multi-cursor editing, a distraction-free UI, and a powerful Python API."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Sublime Text"
  subtitle="The Speed King of Editors"
  tags={['Editor', 'Tooling', 'Productivity', 'C++']}
>

Before VS Code existed, Sublime Text mathematically dominated the web development industry. Built entirely in C++ with a custom UI toolkit, it is renowned for its blistering, sub-millisecond mathematical rendering speed.

## 1. Multiple Selections
Sublime Text's greatest contribution to software engineering was popularizing **Multiple Selections (Multi-Cursor Editing)**.
Instead of writing a complex Regex find-and-replace, a developer can hold TICK1CtrlTICK1 and click in 15 different places on the screen, mathematically spawning 15 independent blinking cursors. Typing one word instantly injects the text into all 15 locations simultaneously, drastically increasing editing speed.

## 2. The Command Palette
Sublime Text also popularized the **Command Palette** (TICK1Ctrl+Shift+PTICK1).
Instead of mathematically digging through 10 layers of mouse menus to find "Toggle Word Wrap", the developer opens the Command Palette and types "wrap". The fuzzy-search algorithm mathematically finds the command instantly. This paradigm was so successful it was later copied by VS Code, Atom, and modern OS interfaces (like macOS Spotlight).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/WebStorm/index.mdx': `---
title: WebStorm
description: "A powerful, commercial Integrated Development Environment (IDE) built by JetBrains, mathematically tailored for modern JavaScript, TypeScript, and front-end web development ecosystems."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="WebStorm"
  subtitle="The IDE for the Modern Web"
  tags={['IDE', 'JavaScript', 'JetBrains', 'Web']}
>

While VS Code (a free text editor) is the most popular tool for web development, WebStorm is a paid, full-fledged IDE mathematically designed to provide a heavier, more strictly integrated experience for complex enterprise front-end projects.

## 1. Zero-Configuration Intelligence
The mathematical selling point of WebStorm is that it "Just Works" out of the box.
If you open a React, Angular, or Vue project, WebStorm mathematically analyzes the TICK1package.jsonTICK1. It instantly configures ESLint, Prettier, Jest, and Webpack integrations without the developer needing to install 15 different third-party plugins (which is required in VS Code). The indexing engine mathematically tracks references across the entire codebase, making complex refactoring extremely safe.

## 2. Deep Refactoring and Debugging
WebStorm contains the JetBrains visual debugger. 
Instead of polluting code with TICK1console.log()TICK1, developers mathematically click the gutter to place a breakpoint. WebStorm seamlessly attaches via WebSockets to Chrome or Node.js. When the breakpoint is hit, the developer can inspect the exact mathematical RAM state, evaluate JavaScript expressions on the fly, and step through asynchronous Promises visually.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Bubble sort/index.mdx': `---
title: Bubble Sort
description: "A mathematically simple but highly inefficient sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bubble Sort"
  subtitle="The Simplest, Slowest Sort"
  tags={['Algorithms', 'Sorting', 'Fundamentals', 'Big O']}
>

Bubble Sort is the first algorithm taught in computer science because its mathematical logic perfectly mimics human intuition, but it is almost never used in production software due to its catastrophic performance.

## 1. The Mathematical Mechanism
The algorithm starts at index 0. It compares TICK1array[0]TICK1 and TICK1array[1]TICK1. If they are out of order, it swaps them.
It then compares TICK1array[1]TICK1 and TICK1array[2]TICK1, swapping if necessary.
As it sweeps from left to right, the largest number in the array mathematically "bubbles" to the absolute right side of the list.
The algorithm must repeat this entire sweep **N** times to guarantee the array is sorted.

## 2. Time Complexity
Because it uses two nested TICK1forTICK1 loops (one to do the sweep, and one to repeat the sweep N times), the mathematical Time Complexity is **O(N²)**.
If you have an array of 100,000 users, Bubble Sort requires roughly 10,000,000,000 mathematical operations to sort them, freezing the CPU. Its only mathematical advantage is that its Space Complexity is **O(1)**, as it sorts the array purely in-place without requiring extra RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Bucket sort/index.mdx': `---
title: Bucket Sort
description: "A mathematically optimized distribution sorting algorithm that divides elements into several distinct 'buckets', sorts each bucket individually, and then concatenates them back together."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bucket Sort"
  subtitle="Divide, Sort, and Conquer"
  tags={['Algorithms', 'Sorting', 'Performance', 'Mathematics']}
>

When data is uniformly distributed across a known range (like sorting human ages from 1 to 100), Bucket Sort mathematically bypasses the O(N log N) limitation of standard comparison sorts (like Merge Sort).

## 1. The Distribution Phase
1. **Create Buckets**: The algorithm mathematically allocates an array of empty arrays (Buckets). For example, 10 buckets representing ranges (0-9, 10-19, 20-29...).
2. **Scatter**: It iterates through the input data exactly once. If it sees the number TICK142TICK1, it calculates the index TICK1Math.floor(42 / 10) = 4TICK1, and drops it into Bucket #4.

## 2. The Sorting Phase
Once the data is scattered, each individual bucket is sorted using a fast mathematical algorithm (usually Insertion Sort). Because the buckets are mathematically guaranteed to be in order relative to each other (everything in Bucket 4 is > everything in Bucket 3), the final step simply concatenates Bucket 1, 2, 3, etc., together.
If the data is perfectly uniform, the Time Complexity approaches an incredible **O(N + K)** (where K is the number of buckets), though it mathematically requires **O(N + K)** extra memory to store the buckets.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/6. Algorithms/6.1 Searching & Sorting/Counting sort/index.mdx': `---
title: Counting Sort
description: "An incredibly fast, integer-based sorting algorithm that operates in O(N) linear time by mathematically avoiding direct element comparisons, relying instead on tallying the frequency of each unique number."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Counting Sort"
  subtitle="The Non-Comparison Linear Sort"
  tags={['Algorithms', 'Sorting', 'Performance', 'Mathematics']}
>

Computer Science mathematically proves that any "Comparison-based Sort" (like Quicksort or Mergesort, which use TICK1a < bTICK1) cannot possibly run faster than O(N log N).
Counting Sort cheats. It mathematically performs zero comparisons.

## 1. The Tallying Mechanism
Counting Sort only works if the data consists of integers within a known, small mathematical range (e.g., sorting 1,000,000 test scores ranging from 0 to 100).
1. Create a "Count Array" of size 101, filled with zeros.
2. Iterate through the input array. If the student scored 95, go to index 95 in the Count Array and mathematically increment the value by 1.
3. After one O(N) pass, the Count Array is fully populated. (e.g., Index 95 holds the value 50, meaning 50 students scored a 95).

## 2. Reconstructing the Sorted Array
To generate the final sorted list, the algorithm simply loops through the Count Array from index 0 to 100. If index 95 has the value 50, it mathematically prints the number "95" fifty times in a row.
The Time Complexity is an astonishing **O(N + K)**.
The catastrophic mathematical flaw: If you try to sort two numbers, TICK11TICK1 and TICK11,000,000,000TICK1, Counting Sort is forced to allocate a RAM array of 1 billion empty zeros, instantly crashing the server with an O(K) Out of Memory Error.

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
