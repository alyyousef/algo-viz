import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Fish/index.mdx': `---
title: Fish
description: The Friendly Interactive Shell, a modern command-line shell focused heavily on user experience, syntax highlighting, and auto-suggestions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fish Shell">

Released in 2005 by Axel Liljencrantz, Fish (Friendly Interactive Shell) is a smart, user-friendly command-line shell for Unix-like operating systems. It was designed to fix the archaic, unintuitive user experience of Bash and Zsh.

## 1. Out-of-the-Box Experience
If you install Zsh, it mathematically does nothing special until you install a massive framework (like Oh My Zsh) and configure dozens of plugins. 
Fish is mathematically designed to be perfect out-of-the-box. The moment you launch it, it provides:
- **Real-time Syntax Highlighting**: If a command does not exist, it glows red. If it exists, it glows blue.
- **Intelligent Auto-Suggestions**: As you type, Fish mathematically searches your entire command history and subtly ghosts the rest of the command on the screen, allowing you to hit the Right Arrow key to instantly complete it.

## 2. Breaking POSIX Compliance
Bash and Zsh are strictly bound to the POSIX mathematical standard from the 1980s. This means they share the same terrifying scripting flaws (like variables requiring exact spacing around the equals sign). 
Fish made the controversial architectural decision to intentionally **break POSIX compatibility**. Its scripting language is clean, modern, and mathematically logical (e.g., you set variables using TICK1set x 5TICK1 instead of TICK1x=5TICK1), making writing complex shell scripts significantly safer, at the cost of not being able to run legacy Bash scripts directly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Ksh/index.mdx': `---
title: Ksh (KornShell)
description: A highly influential Unix shell that combined the scripting power of the Bourne shell with the interactive features of the C shell.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ksh (KornShell)">

Developed by David Korn at Bell Labs in the early 1980s, Ksh was a monumental leap forward in shell design, bridging the gap between developers writing complex scripts and users typing interactive commands.

## 1. The Best of Both Worlds
Before Ksh, Unix users had two choices:
1. **Bourne Shell (sh)**: Excellent for writing mathematical automation scripts, but terrible for interactive typing (no command history).
2. **C Shell (csh)**: Excellent for interactive typing (it had history and job control), but its scripting language was mathematically flawed and universally despised.

Ksh mathematically merged the two. It was fully backward-compatible with the Bourne shell (meaning old scripts ran perfectly), but it introduced Command History, Aliases, and Job Control (backgrounding/foregrounding processes) for interactive users.

## 2. Influence on Bash
Ksh was proprietary software owned by AT&T for a long time. Because the open-source GNU project could not legally use Ksh, they built **Bash** as a direct clone to mathematically replicate Ksh's features. Today, while Bash dominates Linux, Ksh remains the default shell on many enterprise UNIX systems, particularly IBM AIX and Oracle Solaris.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/PowerShell/index.mdx': `---
title: PowerShell
description: A revolutionary, object-oriented shell and scripting language developed by Microsoft to bring strict mathematical order to system administration.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PowerShell">

Released by Microsoft in 2006 (created by Jeffrey Snover), PowerShell completely upended the historical mathematical model of command-line shells. 

## 1. The Object-Oriented Pipe
In Bash, AWK, or any Unix shell, the "Pipe" (TICK1|TICK1) mathematically transfers **Strings**. 
If you run TICK1ps | grep "chrome"TICK1, the first command outputs a giant block of text, and the second command uses Regular Expressions to parse that text. If a column shifts by one space, the script mathematically crashes.
PowerShell pipes **.NET Objects**. 
If you run TICK1Get-Process | Where-Object {$_.Name -eq "chrome"}TICK1, the pipe does not transfer text. It mathematically transfers a strongly-typed, memory-mapped C# Object. You access the data exactly like you would in a C# program (TICK1Process.NameTICK1), completely eliminating the need for fragile text parsing.

## 2. Unprecedented System Access
Because PowerShell is built directly on top of the .NET Framework, it has mathematical access to the entire Windows operating system. A PowerShell script can instantiate C# classes, mathematically query the Windows Registry, manipulate Active Directory users, interact with COM objects (like Excel), and manage Azure Cloud infrastructure, making it the most powerful automation tool ever built for the Microsoft ecosystem.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Sed/index.mdx': `---
title: Sed
description: The Stream Editor, a legendary Unix utility designed to mathematically parse and transform text on the fly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sed (Stream Editor)">

Created by Lee E. McMahon at Bell Labs in 1974, Sed is one of the most powerful and heavily used text-processing tools in the Unix ecosystem. While AWK is designed for tabular columns, Sed is designed for mathematical string replacement.

## 1. Stream Processing
Sed is a non-interactive text editor. You do not open a file, move a cursor, and type. 
You mathematically provide Sed with a script (a set of commands), and Sed streams the file through those commands line-by-line in a single pass. Because it only ever holds one line of text in memory at a time (the "Pattern Space"), Sed can mathematically search and replace text inside a 500-Gigabyte log file using almost zero RAM.

## 2. The Substitution Command
The most universally used Sed command is mathematical substitution: TICK1s/old/new/gTICK1.
TICK3bash
echo "Hello World" | sed 's/World/Universe/'
TICK3
This mathematically replaces the first instance of "World" with "Universe". Sed supports highly complex Regular Expressions (Regex), allowing it to extract IP addresses, reformat dates, or delete specific XML tags across millions of files in seconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Tcl/index.mdx': `---
title: Tcl
description: The Tool Command Language, a highly embeddable, minimalist scripting language famous for its association with the Tk graphical toolkit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tcl (Tool Command Language)">

Created by John Ousterhout in 1988, Tcl (pronounced "Tickle") is a dynamic scripting language. It was explicitly designed not to be a standalone language, but rather a tiny, highly portable C library that could be mathematically embedded into other applications to give them scripting capabilities.

## 1. Everything is a String
Tcl's mathematical philosophy is extreme minimalism: **Everything is a string**.
There are no distinct integers, floats, or objects in Tcl's syntax. The command TICK1set x 5TICK1 mathematically creates a string "5". If you later do math on it (TICK1expr $x + 2TICK1), Tcl dynamically interprets the string as a number, performs the math, and returns the result as a string. This makes the language parser incredibly tiny and mathematically trivial to embed in C programs, network routers (like Cisco IOS), and hardware testing rigs.

## 2. The Tk Toolkit
Tcl is historically inseparable from **Tk**, the first truly cross-platform GUI toolkit. 
In the 1990s, writing a graphical window with a button required hundreds of lines of complex C code. With Tcl/Tk, you could mathematically generate a working graphical interface in three lines of code. It was so mathematically revolutionary that Python (Tkinter), Ruby, and Perl all adopted Tk as their standard GUI library.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.5 Scripting - Shell/Zsh/index.mdx': `---
title: Zsh
description: The Z Shell, a massively extensible Unix shell that is the default on macOS and heavily favored by power users.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zsh (Z Shell)">

Created by Paul Falstad in 1990, Zsh is a highly advanced, mathematically complex command-line shell. It is fully compatible with Bash (meaning your old Bash scripts will run flawlessly), but it incorporates the best features of Ksh, tcsh, and dozens of new innovations.

## 1. Extensibility and Oh My Zsh
Out of the box, Zsh looks exactly like Bash. However, its mathematical architecture allows for massive extensibility. 
This gave rise to **Oh My Zsh**, a community-driven framework that mathematically transforms the shell into a powerhouse. It provides hundreds of plugins that automatically detect if you are in a Git repository, mathematically showing your current branch and commit status directly in the prompt. It provides highly advanced, programmable tab-completion (e.g., hitting Tab after TICK1killTICK1 will graphically list the active processes to select from).

## 2. The New Standard
For decades, Bash was the undisputed default shell on all Unix systems. However, in 2019, Apple mathematically abandoned Bash due to a licensing dispute (Bash upgraded to the GPLv3 license, which Apple's legal department rejected). Consequently, Apple made Zsh the default mathematical shell for all Mac operating systems, skyrocketing its global usage among developers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/Cypher/index.mdx': `---
title: Cypher
description: A declarative graph query language designed specifically for Neo4j, allowing developers to mathematically query complex relationships via ASCII-art syntax.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cypher">

Created by Neo4j in 2011 (and later open-sourced), Cypher is to Graph Databases what SQL is to Relational Databases. It is mathematically designed to traverse incredibly complex webs of connected data (like social networks or fraud rings) in milliseconds.

## 1. ASCII Art Syntax
In a SQL database, finding "friends of friends" requires mathematically writing multiple expensive TICK1JOINTICK1 statements.
Cypher uses an intuitive, mathematical "ASCII Art" syntax to physically draw the graph relationships in the code.
- **Nodes** (Entities) are wrapped in parentheses: TICK1(p:Person)TICK1
- **Relationships** are drawn as arrows in brackets: TICK1-[:KNOWS]->TICK1

TICK3cypher
MATCH (john:Person {name: 'John'})-[:KNOWS]->(friend)-[:KNOWS]->(fof)
RETURN fof.name
TICK3
This one line mathematically instructs the Neo4j engine to find John, instantly jump to his friends, instantly jump to their friends, and return the names.

## 2. Graph Traversal Algorithms
Because the underlying data is mathematically stored as physical memory pointers (Index-Free Adjacency), Cypher can execute complex traversal algorithms—like finding the Shortest Path (Dijkstra) between two users, or running PageRank on a billion nodes—at speeds that would cause a traditional SQL database to mathematically freeze.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/Datalog/index.mdx': `---
title: Datalog
description: A purely declarative logic programming language derived from Prolog, heavily used in modern database theory and static code analysis.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Datalog">

Datalog is a declarative logic language mathematically derived from Prolog. While Prolog is a general-purpose programming language (that can mathematically get stuck in infinite loops), Datalog is strictly constrained. It is mathematically guaranteed that any Datalog query will terminate and return an answer.

## 1. Facts and Rules
Like Prolog, you do not write commands in Datalog. You mathematically declare a database of Facts, and a set of logical Rules.
- Fact: TICK1parent(john, mary).TICK1
- Rule: TICK1ancestor(X, Y) :- parent(X, Y).TICK1 (X is the ancestor of Y IF X is the parent of Y).
- Recursive Rule: TICK1ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).TICK1 (X is the ancestor of Y IF X is the parent of Z, AND Z is the ancestor of Y).

The Datalog engine mathematically processes these rules and dynamically generates a virtual database of all possible ancestors.

## 2. Modern Resurgence
For decades, Datalog was just an academic mathematical curiosity. Today, it powers some of the most advanced systems in the world. **Datomic** (a revolutionary immutable database created by the author of Clojure) uses Datalog as its primary query language. Furthermore, AWS uses Datalog mathematically under the hood to analyze and verify complex IAM security policies.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/DAX/index.mdx': `---
title: DAX
description: Data Analysis Expressions, the mathematical formula language created by Microsoft to power Power BI, Excel Power Pivot, and SQL Server Analysis Services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DAX (Data Analysis Expressions)">

Created by Microsoft in 2010, DAX is a functional, mathematical formula language. If you look at a DAX formula, it looks almost exactly like a standard Microsoft Excel formula (e.g., TICK1SUM(Table[Column])TICK1), but its underlying architecture is completely different.

## 1. Columnar Memory Architecture
An Excel formula mathematically calculates data cell-by-cell. 
DAX calculates data **Column-by-Column**. 
DAX operates on top of the VertiPaq engine—an in-memory, highly compressed columnar database. When you run a DAX formula on a dataset of 100 million rows, the engine mathematically vectorizes the calculation across the entire column simultaneously in RAM, returning answers in fractions of a second.

## 2. Evaluation Context
The most complex and powerful mathematical concept in DAX is the **Evaluation Context** (specifically Row Context and Filter Context).
Unlike SQL, where a TICK1WHERETICK1 clause is explicitly written in the query, DAX calculates formulas dynamically based on what the user is looking at in the Power BI dashboard. If the user clicks a visual chart representing "Year 2023," the DAX engine mathematically applies an invisible Filter Context to all underlying data tables before calculating the TICK1SUMTICK1, allowing non-technical business users to slice and dice massive datasets dynamically without writing database queries.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/GraphQL/index.mdx': `---
title: GraphQL
description: A revolutionary data query and manipulation language developed by Facebook, fundamentally altering how frontends mathematically request data from APIs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GraphQL">

Created by Facebook in 2012 and open-sourced in 2015, GraphQL is a query language for APIs. It was mathematically designed to solve the two biggest architectural flaws of standard REST APIs: **Over-fetching** and **Under-fetching**.

## 1. The Client Dictates the Shape
In a traditional REST API, if a mobile app hits the TICK1/users/1TICK1 endpoint, the server mathematically decides what JSON to return. It might return 50 fields (Over-fetching, wasting mobile data), or it might not include the user's friends, forcing the app to make a second HTTP request to TICK1/users/1/friendsTICK1 (Under-fetching, causing UI lag).

In GraphQL, there is only one endpoint. The frontend mathematically sends a query describing the exact shape of the data it wants:
TICK3graphql
{
  user(id: 1) {
    name
    friends {
      name
    }
  }
}
TICK3
The server mathematically traverses its Graph and returns exactly those fields, in that exact nested JSON structure, nothing more and nothing less.

## 2. The Strongly Typed Schema
GraphQL is mathematically strict. Before a server can accept a query, the backend developers must define a rigid Schema using the GraphQL Schema Definition Language (SDL). This schema defines exactly what objects exist (TICK1UserTICK1, TICK1PostTICK1) and what types their fields are (TICK1StringTICK1, TICK1IntTICK1). If the frontend requests a field that does not exist in the mathematical schema, the GraphQL engine rejects the query before executing any backend code.

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
