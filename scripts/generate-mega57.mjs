import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/Maple/index.mdx': `---
title: Maple
description: A massive, commercial computer algebra system used heavily in universities for symbolic mathematics, calculus, and equation solving.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Maple">

Developed at the University of Waterloo in 1980, Maple is a commercial Computer Algebra System (CAS). While languages like C or Fortran are designed to compute numerical answers (like TICK10.333333TICK1), Maple is designed to compute **Symbolic** answers (like TICK11/3TICK1 or TICK1sin(x)TICK1).

## 1. Symbolic Computation
If you ask a standard programming language to calculate the derivative of TICK1x^2TICK1, it cannot do it, because it only understands numbers, not algebra.
Maple's core engine mathematically parses the algebraic structure of the equation. You can type TICK1diff(x^2, x)TICK1, and Maple will mathematically manipulate the AST to return the exact symbolic answer: TICK12*xTICK1. It can perform symbolic integration, matrix inversions with variables, and solve complex differential equations without ever rounding a float.

## 2. The Programming Language
Underneath the graphical math interface, Maple is a dynamically typed, imperative programming language. It allows engineers to write complex mathematical scripts and loops. Interestingly, a massive portion of the Maple math library is mathematically written in the Maple language itself, allowing advanced users to read exactly how the system is computing an integral.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/MATLAB/index.mdx': `---
title: MATLAB
description: The industry standard for engineering and matrix mathematics, heavily utilized in aerospace, automotive, and signal processing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MATLAB">

Created by Cleve Moler in the late 1970s and commercialized by MathWorks, MATLAB (MATrix LABoratory) completely dominates the engineering world. It is a multi-paradigm numerical computing environment.

## 1. Matrices as First-Class Citizens
In most languages, performing a mathematical operation on an array requires a TICK1forTICK1 loop.
In MATLAB, the fundamental data type is the Matrix. 
If TICK1ATICK1 is a 1000x1000 matrix and TICK1BTICK1 is a 1000x1000 matrix, calculating the dot product is written simply as TICK1A * BTICK1. 
The MATLAB engine mathematically translates this into highly optimized, multithreaded BLAS and LAPACK C/Fortran libraries under the hood, allowing engineers to write clean mathematical formulas that execute at supercomputer speeds.

## 2. Simulink
MATLAB's true dominance in aerospace (NASA, SpaceX) comes from **Simulink**—a graphical extension for modeling complex dynamic systems. Engineers can mathematically draw a block diagram of a rocket engine or a car's anti-lock braking system, run the simulation over time, and then instruct MATLAB to automatically generate production-ready C or C++ code for the physical hardware controller.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/Octave/index.mdx': `---
title: Octave
description: The open-source, mathematically compatible alternative to MATLAB, designed for numerical computations and matrix algebra.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GNU Octave">

GNU Octave is a high-level programming language primarily intended for numerical computations. Its defining feature is its strict mathematical goal: to be syntactically completely compatible with MATLAB.

## 1. The MATLAB Alternative
A commercial MATLAB license can cost thousands of dollars, making it inaccessible for many students and independent researchers.
Octave provides a free, open-source mathematical engine. 
Because Octave mathematically implements the exact same syntax and functions as MATLAB (like TICK1plot()TICK1, TICK1inv()TICK1, and matrix multiplication TICK1A * BTICK1), a researcher can often take an academic script written in MATLAB and run it flawlessly in Octave without modifying a single line of code.

## 2. Limitations
While mathematically equivalent for core matrix operations and plotting, Octave lacks the massive ecosystem of specialized "Toolboxes" (e.g., specific libraries for 5G telecommunications or neural network design) and the graphical Simulink environment that makes MATLAB the standard in enterprise engineering.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/R/index.mdx': `---
title: R
description: The absolute standard for statistical computing, data analysis, and breathtaking data visualization in academia and industry.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="R">

Created by Ross Ihaka and Robert Gentleman in 1993, R is a programming language specifically designed by statisticians, for statisticians. It is the dominant language in bioinformatics, epidemiology, and data science.

## 1. Dataframes and Vectorization
Before Python had Pandas, R invented the modern **DataFrame**—a native mathematical structure representing a table of data (like Excel) built directly into the language.
R is heavily vectorized. If you have a column of 10 million ages, you do not mathematically write a loop to calculate the mean. You simply type TICK1mean(data$age)TICK1. The R engine (written in C and Fortran) handles the memory and calculation instantly. 

## 2. The Tidyverse and ggplot2
R's true power lies in its ecosystem, specifically the **Tidyverse**.
The Tidyverse is a collection of mathematically cohesive packages (like TICK1dplyrTICK1) that introduced the "Pipe" operator (TICK1%>%TICK1), allowing data manipulation to be written as a clean, readable sequence of verbs.
Furthermore, R possesses **ggplot2**, universally considered the most powerful data visualization library in the world. It is based on the mathematical "Grammar of Graphics," allowing users to map specific data variables directly to visual aesthetics (colors, shapes, axes) to generate publication-ready plots instantly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/SageMath/index.mdx': `---
title: SageMath
description: A massive open-source mathematics software system that mathematically unifies hundreds of open-source math packages under a Python interface.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SageMath">

Created by William Stein in 2005, SageMath was built with a specific mission: to create a viable, free, open-source alternative to Magma, Maple, Mathematica, and MATLAB.

## 1. The Python Umbrella
Instead of reinventing the wheel and writing a brand new mathematical language, SageMath made a brilliant architectural decision: **Use Python**.
SageMath is essentially a massive, highly customized Python environment. 
However, under the hood, SageMath mathematically acts as a conductor. It binds together nearly 100 distinct open-source mathematical packages (like NumPy, SciPy, Maxima for symbolic math, GAP for group theory, and R for statistics). When a user writes a Python command to invert a matrix in SageMath, the system mathematically routes the command to the specific C or Fortran library best suited for that specific operation.

## 2. Exact vs Approximate Math
Because it is a Computer Algebra System, SageMath alters Python's default behavior. If you type TICK11/3TICK1 in Python, you get TICK10.3333TICK1 (a floating-point approximation). In SageMath, TICK11/3TICK1 mathematically remains the exact rational fraction TICK11/3TICK1, preventing floating-point errors from compounding during complex algebraic research.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.4 Scientific - Numerical/Wolfram Language (Mathematica)/index.mdx': `---
title: Wolfram Language (Mathematica)
description: A deeply integrated, knowledge-based symbolic language that mathematically attempts to compute everything in the universe.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Wolfram Language (Mathematica)">

Created by Stephen Wolfram in 1988 as the core of **Mathematica**, the Wolfram Language is a profoundly unique, commercial, symbolic programming language. It powers the Wolfram Alpha computational search engine used by Siri.

## 1. The Knowledge-Based Paradigm
Most programming languages start empty. If you want the atomic weight of Gold or the population of France, you must find an API, parse the JSON, and store it.
The Wolfram Language is a **Knowledge-Based** language. It mathematically contains massive amounts of real-world data built directly into the compiler. You can write a single line of code that mathematically plots the GDP of France over the last 50 years, or calculates the orbital trajectory of Mars, without importing a single library.

## 2. Symbolic Everything
Like Lisp, the Wolfram Language is homoiconic. Everything is a symbolic expression. 
An equation, a photograph, an audio file, and the user interface itself are all mathematically represented as the exact same underlying tree structure (TICK1Head[arg1, arg2]TICK1). This allows a user to mathematically map a function over an array of images just as easily as mapping it over an array of integers, making it an unrivaled tool for exploratory research.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/AWK/index.mdx': `---
title: AWK
description: The legendary Unix command-line tool and programming language explicitly designed for mathematical text processing and data extraction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWK">

Created in 1977 at Bell Labs by Alfred **A**ho, Peter **W**einberger, and Brian **K**ernighan, AWK is a data-driven scripting language. It is a standard feature of every Unix and Linux operating system in existence.

## 1. Pattern-Action Architecture
AWK is not a general-purpose language like Python; it is designed specifically for processing tabular text (like CSV files or server logs).
The language mathematically operates on a **Pattern { Action }** loop. 
AWK automatically reads the input file line-by-line, mathematically splits the line into columns (accessed via TICK1$1TICK1, TICK1$2TICK1), and applies your logic.
TICK3awk
/ERROR/ { print $3 }
TICK3
This one line of code means: "If the line contains the text 'ERROR', mathematically print the third column." What would take 15 lines of boilerplate in Java takes 10 characters in AWK.

## 2. The Precursor to Perl
AWK introduced associative arrays (hash maps) and regular expressions into standard scripting. Because it was so mathematically efficient at data extraction, it heavily inspired Larry Wall to create **Perl**, which eventually gave rise to the entire modern scripting ecosystem (Python, Ruby, PHP).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Bash/index.mdx': `---
title: Bash
description: The Bourne Again Shell, the default command-line interface and scripting language for almost every Linux and Unix system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bash">

Released in 1989 by Brian Fox for the GNU Project, Bash is a command processor and scripting language. It is the literal environment you interact with when you open a terminal in Linux, MacOS (historically), or WSL.

## 1. The Unix Philosophy in Action
Bash is mathematically designed to tie other programs together. 
Instead of providing massive internal libraries for math or JSON parsing, Bash relies on the Unix Philosophy: "Write programs that do one thing and do it well."
Bash mathematically connects these programs using **Pipes** (TICK1|TICK1).
TICK3bash
cat server.log | grep "404" | wc -l
TICK3
Bash mathematically takes the output of the TICK1catTICK1 command, streams it into the input of TICK1grepTICK1, and streams that output into TICK1wcTICK1 to count the lines. This creates an incredibly powerful data-processing pipeline out of independent C programs.

## 2. Scripting Quirks
While incredible for moving files and launching programs, Bash is a notoriously dangerous programming language for complex logic. Variables are untyped strings by default, whitespace is mathematically critical (TICK1if [ $x = 1 ]TICK1 requires exact spacing), and failing to wrap a variable in double quotes can mathematically cause entire arrays to be parsed incorrectly, leading to catastrophic server bugs. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Batch/index.mdx': `---
title: Batch
description: The original scripting language for MS-DOS and Windows, used for basic task automation and system administration.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Batch (.bat)">

Batch (files ending in TICK1.batTICK1 or TICK1.cmdTICK1) is the command-line scripting language natively interpreted by TICK1cmd.exeTICK1 in Microsoft Windows. It has its roots all the way back to MS-DOS in 1981.

## 1. Legacy Automation
Unlike Bash, which is a fully Turing-complete programming language with advanced scoping rules, Batch is fundamentally just a text file containing a list of DOS commands (like TICK1DIRTICK1 or TICK1COPYTICK1) that execute top-to-bottom.
It mathematically lacks basic programming structures. To do a TICK1whileTICK1 loop, you must use TICK1GOTOTICK1 statements to jump to mathematical labels in the text file, exactly like Assembly language. 

## 2. The Persistence of .bat
Despite Microsoft releasing **PowerShell** (a vastly superior, object-oriented, deeply integrated scripting language) to replace it, Batch remains heavily used.
Because every single Windows machine in the world can run a TICK1.batTICK1 file instantly without adjusting security execution policies, IT administrators still rely on Batch files to mathematically execute simple software installations, map network drives, and bootstrap massive build environments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Expect/index.mdx': `---
title: Expect
description: A specialized automation language designed specifically to mathematically interact with programs that demand human interaction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Expect">

Created in 1990 by Don Libes as an extension to the Tcl scripting language, Expect solves a very specific, historically frustrating mathematical problem: automating interactive command-line programs.

## 1. Automating the Un-Automatable
Many Unix tools (like TICK1sshTICK1, TICK1ftpTICK1, or TICK1passwdTICK1) are mathematically designed to prevent automation. They refuse to read passwords from a piped text file; they mathematically demand that a human physically type on a keyboard (by directly reading the TTY terminal device).
Expect mathematically creates a fake, virtual terminal (a PTY). The target program believes it is talking to a human.

## 2. The Dialogue Loop
Expect scripts are written as a mathematical dialogue:
TICK3expect
spawn ssh user@server
expect "password:"
send "my_secret_password\\r"
expect "$"
send "reboot\\r"
TICK3
The script mathematically waits for the exact string ("password:"), simulates the human typing the password, waits for the prompt ("$"), and executes a command. Before modern configuration management tools like Ansible existed, Expect was the absolute backbone of automated server administration.

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
