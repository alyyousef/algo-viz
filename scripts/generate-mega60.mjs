import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/T-SQL/index.mdx': `---
title: T-SQL
description: Transact-SQL, Microsoft's proprietary extension to standard SQL, dominating the enterprise data space within SQL Server.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="T-SQL (Transact-SQL)">

T-SQL is Microsoft's proprietary mathematical extension to standard SQL, heavily used in Microsoft SQL Server and Azure SQL. It is the direct competitor to Oracle's PL/SQL.

## 1. Procedural Enhancements
Like PL/SQL, standard declarative SQL is often mathematically insufficient for complex business logic (like iterating through a cursor to calculate a moving average that depends on previous rows).
T-SQL adds imperative, mathematical programming features directly into the database engine:
- **Local Variables**: TICK1DECLARE @EmployeeCount INT;TICK1
- **Control Flow**: TICK1IF/ELSETICK1, TICK1WHILETICK1, and TICK1RETURNTICK1 statements.
- **TRY/CATCH**: Modern exception handling mathematically equivalent to C#, allowing developers to gracefully rollback transactions if a specific query fails.

## 2. Table-Valued Functions
One of T-SQL's most powerful mathematical features is the Table-Valued Function (TVF). 
A standard function returns a single value (a Scalar). A TVF returns an entire virtual Table. You can write a complex mathematical script that calculates the tax liability for all employees, and then you can mathematically TICK1JOINTICK1 the result of that function directly into another SQL query as if it were a physical table on the hard drive.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/XPath/index.mdx': `---
title: XPath
description: The XML Path Language, a World Wide Web Consortium standard for mathematically querying and navigating complex XML documents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="XPath">

Standardized by the W3C in 1999, XPath is a mathematical query language used to select nodes from an XML document. Before JSON dominated the internet, XML was the universal data transport format, and XPath was its query language.

## 1. Tree Navigation
An XML document is mathematically structured as a tree of nodes (Elements, Attributes, Text). XPath provides a concise syntax for traversing this tree, highly reminiscent of navigating a Unix file system.
- TICK1/TICK1 : Selects from the mathematical root node.
- TICK1//TICK1 : Selects nodes in the document from the current node that match the selection no matter where they are.
- TICK1@TICK1 : Selects attributes.

TICK3xpath
//bookstore/book[price>35.00]/title
TICK3
This mathematically reads as: "Find any bookstore anywhere in the document, find its books where the price is mathematically greater than 35.00, and return the title nodes."

## 2. Integration with XSLT
XPath is rarely used entirely on its own. It is the foundational mathematical engine behind **XSLT** (Extensible Stylesheet Language Transformations). A developer writes an XSLT script that uses XPath to mathematically find specific nodes in a source XML file, and then physically transforms them into a completely different format, like a rendered HTML webpage or a PDF document.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/XQuery/index.mdx': `---
title: XQuery
description: A deeply functional, Turing-complete language designed to mathematically query, transform, and construct XML data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="XQuery">

While XPath is used to *find* things in an XML document, XQuery (XML Query) is a fully functional programming language designed to *query and transform* XML data on a massive scale. It is mathematically to XML what SQL is to a relational database.

## 1. FLWOR Expressions
The mathematical heart of XQuery is the **FLWOR** (pronounced "flower") expression. It stands for For, Let, Where, Order by, Return.
TICK3xquery
for $book in doc("books.xml")//book
let $title := $book/title
where $book/price < 30
order by $title
return <cheap-book>{ $title }</cheap-book>
TICK3
This mathematical construct allows a developer to iterate over an XML document, mathematically bind variables (TICK1$titleTICK1), filter the data, sort it, and then dynamically construct completely brand new XML elements (TICK1<cheap-book>TICK1) out of thin air to return to the user.

## 2. The Native XML Database
Because XQuery is Turing-complete and mathematically optimized for tree traversal, it became the foundation of "Native XML Databases" (like MarkLogic or eXist-db). Instead of trying to mathematically force XML data into rigid SQL tables (Object-Relational Impedance Mismatch), these databases store the raw XML trees and execute XQuery directly against the disk.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/Bluespec/index.mdx': `---
title: Bluespec
description: A high-level hardware description language based on Haskell, utilizing mathematically provable atomic rules to design complex silicon chips.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bluespec (BSV)">

Developed originally at MIT in the early 2000s, Bluespec SystemVerilog (BSV) is a high-level Hardware Description Language (HDL). It was mathematically designed to solve the massive concurrency and race-condition nightmares associated with traditional Verilog.

## 1. Atomic Guarded Actions
In Verilog, if you have two independent blocks of hardware trying to write to the same memory register on the same clock cycle, it is mathematically catastrophic (a race condition). The engineer must manually wire complex multiplexers and arbitration logic.
Bluespec fundamentally alters this paradigm using **Atomic Guarded Actions**. 
You write hardware behavior as a set of logical Rules. The Bluespec compiler mathematically analyzes the rules at compile time. If two rules conflict, the compiler automatically generates the complex scheduling logic and multiplexers in hardware to ensure that the rules execute atomically, exactly as they would in a purely sequential software simulation.

## 2. The Haskell Influence
Bluespec's mathematical foundation is heavily derived from Haskell. It supports advanced functional programming concepts like strongly typed parameters, polymorphic functions, and pattern matching. You can mathematically write a generic "FIFO Queue" in Bluespec, and the compiler will synthesize it into flawless physical gates regardless of whether the data inside is an 8-bit integer or a massive custom struct.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/Chisel/index.mdx': `---
title: Chisel
description: An open-source hardware construction language embedded in Scala, famously used to design the revolutionary RISC-V processors at UC Berkeley.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Chisel">

Chisel (Constructing Hardware In a Scala Embedded Language) was developed at UC Berkeley. It is not a standalone compiler; it is a Domain-Specific Language (DSL) mathematically embedded entirely within Scala.

## 1. Hardware Generation, Not Description
Traditional HDLs (Verilog/VHDL) are Hardware *Description* Languages. You mathematically describe the exact logic gates you want.
Chisel is a Hardware *Construction* Language. You write a Scala program that, when executed, mathematically generates the hardware description (which is then compiled to Verilog).
Because it is Scala, you have the full power of Object-Oriented and Functional programming. You can write a Scala TICK1forTICK1 loop that mathematically generates 64 distinct Arithmetic Logic Units (ALUs) and wires them together dynamically, something that would take thousands of lines of copy-pasting in Verilog.

## 2. The RISC-V Connection
Chisel is most famous for being the language used to design the open-source **RISC-V** architecture at UC Berkeley (specifically the Rocket Chip generator). Because Chisel is mathematically so expressive, the Berkeley team was able to write an entire CPU generator that allows a user to dynamically specify cache sizes and pipeline stages, and the Chisel script will instantly compile a custom silicon design.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/MyHDL/index.mdx': `---
title: MyHDL
description: A brilliant Python library that allows software engineers to mathematically design and simulate hardware using standard Python code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MyHDL">

Created by Jan Decaluwe in 2004, MyHDL is a Python package that mathematically transforms Python into a Hardware Description Language. 

## 1. Python as Hardware
Designing hardware usually requires learning archaic languages like VHDL. MyHDL allows a software engineer to design physical logic gates using standard Python syntax.
You write standard Python functions (using generators and TICK1yieldTICK1 statements to mathematically represent clock cycles). Because it is standard Python, you can simulate and test your hardware design using standard Python testing frameworks (like TICK1pytestTICK1) and visualization libraries (like Matplotlib).

## 2. The Conversion Engine
Python itself is far too slow and dynamic to run on physical silicon.
Once you have tested your hardware mathematically in Python, you call a MyHDL conversion function. The MyHDL engine mathematically analyzes the Abstract Syntax Tree (AST) of your Python code and translates it directly into synthesizable Verilog or VHDL. This generated code can then be flashed onto an FPGA (Field Programmable Gate Array) or sent to a silicon foundry, allowing purely software-trained engineers to design physical microchips.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/SpinalHDL/index.mdx': `---
title: SpinalHDL
description: A modern, highly expressive hardware description language embedded in Scala, designed as a direct competitor and evolution of Chisel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SpinalHDL">

SpinalHDL, like Chisel, is a Domain-Specific Language mathematically embedded in Scala for designing hardware. It was created by Charles Papon to address some of the architectural frustrations hardware engineers experienced with Chisel.

## 1. Stronger Typing and Verification
While both use Scala, SpinalHDL mathematically enforces a much stricter type system than early versions of Chisel. 
In Verilog, if you accidentally connect a 32-bit wire to a 16-bit wire, the compiler might silently truncate the data, causing a catastrophic mathematical bug in the physical silicon. SpinalHDL performs rigorous, static mathematical checks during the Scala execution phase, completely preventing bit-width mismatches and clock domain crossing errors before the Verilog is ever generated.

## 2. The VexRiscv Processor
SpinalHDL's crowning achievement is the **VexRiscv** project—an award-winning, 32-bit RISC-V CPU designed entirely in SpinalHDL. The CPU is implemented as a mathematical framework of "Plugins." If you want to add a hardware multiplier or an instruction cache to the CPU, you just enable the plugin in Scala. SpinalHDL mathematically calculates the new pipeline routing and instantly generates a completely custom, highly optimized CPU core.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/SystemVerilog/index.mdx': `---
title: SystemVerilog
description: The massive, industry-standard superset of Verilog, combining hardware description with object-oriented verification frameworks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SystemVerilog">

Adopted as an IEEE standard in 2005, SystemVerilog was created to solve a massive mathematical crisis in the semiconductor industry: Verification. 
As microchips (like Intel CPUs or Nvidia GPUs) grew to contain billions of transistors, writing the hardware in Verilog was only 30% of the work; proving that the hardware mathematically worked without bugs was 70% of the work.

## 1. Hardware Description
For the actual design of physical logic gates, SystemVerilog mathematically extends old Verilog by adding strict C-like data types (TICK1intTICK1, TICK1enumTICK1, TICK1structTICK1), multidimensional arrays, and interfaces. This allows engineers to bundle 50 different wires (like a PCIe bus) into a single mathematical TICK1interfaceTICK1 object, drastically reducing the spaghetti-code wiring that plagued massive Verilog projects.

## 2. Object-Oriented Verification (UVM)
The true power of SystemVerilog lies in its verification features. It includes full Object-Oriented Programming (Classes, Inheritance, Polymorphism) and Constrained Random Generation.
Instead of manually writing tests to see if a CPU works, engineers use SystemVerilog to build massive OOP mathematical models (often using the Universal Verification Methodology - UVM). The system mathematically blasts the simulated chip with millions of randomized, highly-constrained inputs, aggressively hunting for edge-case silicon bugs before a billion-dollar fabrication run.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/Verilog/index.mdx': `---
title: Verilog
description: The foundational hardware description language that mathematically models electronic systems, widely used to design FPGAs and ASICs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Verilog">

Created in 1984 by Prabhu Goel and Phil Moorby, Verilog is a Hardware Description Language (HDL). It mathematically revolutionized the semiconductor industry by allowing engineers to design microchips by writing code, rather than physically drawing logic gates on massive sheets of paper.

## 1. Concurrent Execution
Standard programming languages (like C or Python) are mathematically sequential; line 1 executes, then line 2.
Hardware is mathematically concurrent. If you have 100 logic gates on a chip, and electricity hits them, all 100 gates evaluate simultaneously. 
Verilog models this physical reality using TICK1alwaysTICK1 blocks and Continuous Assignments (TICK1assignTICK1). When you write Verilog code, you are not writing a script; you are mathematically describing parallel, independent blocks of physical transistors that all execute at the exact same time when the system clock ticks.

## 2. Register-Transfer Level (RTL)
Verilog is primarily used at the Register-Transfer Level. You do not define physical transistors. You mathematically define the flow of binary signals (0s and 1s) between hardware registers (Flip-Flops) and the logical operations performed on those signals (like AND, OR, ADD). A "Synthesis Tool" then mathematically reads your Verilog code and automatically maps it to physical, microscopic silicon transistors for a specific foundry (like TSMC).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.7 Hardware - HDL/VHDL/index.mdx': `---
title: VHDL
description: A strictly typed, highly verbose hardware description language heavily utilized in defense, aerospace, and European semiconductor design.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="VHDL">

VHDL (VHSIC Hardware Description Language) was originally developed in 1983 under a massive mathematical mandate from the United States Department of Defense. They needed a standardized, rigorous language to mathematically document the behavior of complex ASIC microchips for military contractors.

## 1. Strong Typing and Verbosity
VHDL is heavily based on the Ada programming language. Unlike Verilog, which is famously "loose" (it will often silently allow you to connect wires of different sizes, leading to disastrous silicon bugs), VHDL is mathematically brutal. 
It is a strongly typed, incredibly verbose language. If you attempt to assign an integer to a bit-vector without an explicit mathematical conversion function, the VHDL compiler will halt immediately. This verbosity makes it harder to learn than Verilog, but it mathematically guarantees a much higher level of safety for mission-critical hardware (like flight controllers or pacemakers).

## 2. Entity and Architecture
VHDL mathematically separates hardware design into two distinct concepts:
- **Entity**: The black-box definition of the chip (What goes in, what comes out).
- **Architecture**: The internal mathematical logic (How it works).
This allows a defense contractor to mathematically define the Entity of a cryptoprocessor, and then seamlessly swap out three different internal Architectures (e.g., one optimized for speed, one optimized for low power) without altering the rest of the radar system.

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
