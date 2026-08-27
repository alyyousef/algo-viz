import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/LaTeX/index.mdx': `---
title: LaTeX
description: A high-quality typesetting system mathematically designed for the production of technical and scientific documentation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LaTeX">

Developed in the 1980s by Leslie Lamport (built on top of Donald Knuth's TeX), LaTeX is the undisputed global standard for publishing scientific, mathematical, and academic papers.

## 1. What You See Is What You Mean
Unlike Microsoft Word (a WYSIWYG editor where you format text visually), LaTeX is a WYSIWYM (What You See Is What You Mean) editor. 
You write plain text infused with commands.
TICK3latex
The quadratic formula is given by:
\\begin{equation}
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\\end{equation}
TICK3
You then run the LaTeX compiler, which mathematically calculates the optimal kerning, line breaks, and typographical spacing to generate a flawless PDF. The human focuses purely on the *structure* of the document; the compiler handles the *design*.

## 2. Unmatched Mathematical Typesetting
Word processors mathematically fail at complex equations. LaTeX was explicitly built by mathematicians to render equations perfectly. Its algorithms for calculating the bounding boxes of integrals and fractions are so mathematically superior that modern engines (like MathJax on the web) simply emulate LaTeX syntax.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Liquid/index.mdx': `---
title: Liquid
description: An open-source, logic-less template language created by Shopify, used extensively in e-commerce and static site generators.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Liquid">

Created by Shopify in 2006 (written in Ruby), Liquid is a safe, customer-facing template language. It is designed so that non-programmers can build beautiful storefronts without the ability to mathematically execute malicious code or crash the Shopify servers.

## 1. Safety First
Because Shopify allows millions of merchants to upload custom code to their servers, the templating language *must* be sandboxed.
Liquid mathematically prohibits server-side execution, database queries, or infinite loops. A user can only access the specific data objects (like TICK1product.priceTICK1) that the server explicitly provides.

## 2. Syntax: Tags, Objects, and Filters
Liquid uses three mathematical constructs:
- **Objects**: TICK1{{ product.title }}TICK1 outputs data.
- **Tags**: TICK1{% if user.logged_in %}TICK1 executes logic.
- **Filters**: TICK1{{ "hello" | upcase }}TICK1 mathematically modifies the output (converting to "HELLO").

Beyond Shopify, Liquid powers Jekyll, the static site generator that drove the initial explosion of GitHub Pages.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Markdown/index.mdx': `---
title: Markdown
description: A profoundly popular, lightweight markup language designed to be easy to read and write in plain text while seamlessly compiling to HTML.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Markdown">

Created by John Gruber in 2004, Markdown revolutionized how humans write on the web. Before Markdown, writing a blog post required writing raw HTML (TICK1<strong>Bold</strong>TICK1), which was mathematically impossible to read natively.

## 1. Human-Readable Syntax
Markdown was designed so that the raw text file looks like the intended output.
- TICK1**Bold**TICK1
- TICK1*Italic*TICK1
- TICK1# Heading 1TICK1
- TICK1[Link Text](https://example.com)TICK1

A standard Markdown compiler (like marked.js) mathematically parses this text via Regular Expressions and generates the equivalent HTML tags.

## 2. The Fragmentation Problem
Because Gruber never provided a strict mathematical BNF grammar for Markdown, the language fragmented. 
How many spaces constitute a list indentation? What happens if you nest a blockquote in a list? Different compilers guessed differently.
This led to the creation of **CommonMark** (a mathematically rigorous, unambiguous specification of Markdown) and **GitHub Flavored Markdown (GFM)**, which added tables, task lists, and strikethroughs to the standard.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Mustache/index.mdx': `---
title: Mustache
description: The original "logic-less" templating language that inspired Handlebars and fundamentally changed web UI architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mustache">

Mustache (named because the curly braces TICK1{{ }}TICK1 look like a sideways mustache) is a web template system with implementations in Ruby, JavaScript, Python, C++, and almost every other major language. 

## 1. Absolute Logic-Less Design
Mustache is mathematically stricter than Handlebars. 
In Handlebars, you can write custom Helpers to execute logic. Mustache explicitly forbids this. 
You cannot have TICK1if/elseTICK1 statements. You only have "Sections" (TICK1{{#person}} ... {{/person}}TICK1). If the TICK1personTICK1 object is false or null, the section is not rendered. If it is an array, the section mathematically loops over the array. 
This forces the backend developer to pre-calculate every single boolean flag (e.g., TICK1show_person_divTICK1) before handing the data to Mustache.

## 2. Architectural Impact
By mathematically forcing developers to remove logic from the View layer, Mustache practically trained an entire generation of developers on the strict Model-View-Controller (MVC) paradigm, paving the way for modern state-driven frameworks like React and Vue.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Pug/index.mdx': `---
title: Pug
description: A high-performance, indentation-sensitive HTML templating engine for Node.js (formerly known as Jade).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pug">

Pug (originally named Jade until a trademark dispute) is a templating engine for Node.js that mathematically eliminates the need to write HTML tags and closing brackets, relying entirely on Python-style indentation.

## 1. Indentation as Syntax
Writing HTML is mathematically redundant. You open a TICK1<div>TICK1, write content, and must remember to close the TICK1</div>TICK1.
In Pug, you just write the tag name and indent.
TICK3pug
div.container
  h1 Hello World
  p.description This is Pug.
TICK3
The compiler mathematically tracks the indentation levels. When the indentation decreases, it automatically injects the closing HTML tags. This drastically reduces file size and prevents structural HTML errors.

## 2. JavaScript Integration
Unlike Mustache, Pug is fully programmable. It supports TICK1ifTICK1, TICK1elseTICK1, TICK1eachTICK1 loops, and variable interpolation directly, compiling down to a highly optimized JavaScript function that mathematically concatenates strings at blazing speeds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/reStructuredText/index.mdx': `---
title: reStructuredText
description: A highly standardized, extensible plain-text markup language, serving as the official documentation standard for the Python ecosystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="reStructuredText (reST)">

reStructuredText (often abbreviated as reST) is a plaintext markup syntax heavily utilized in the Python community. It is the core language processed by the **Sphinx** documentation generator.

## 1. Markdown's Stricter Cousin
While Markdown is lightweight, reST is mathematically heavy and rigorous. 
It supports complex directives and roles. 
Instead of just making text bold, you can mathematically tag text with domain-specific meaning: TICK1:math:\`E=mc^2\`TICK1 or TICK1:pep:\`8\`TICK1. 

## 2. The Sphinx Ecosystem
Sphinx mathematically parses reST files and can pull documentation strings (docstrings) directly out of Python source code to automatically generate massive, cross-referenced technical manuals. It is capable of generating HTML, LaTeX, and PDF formats, making it the backbone of TICK1docs.python.orgTICK1 and nearly all major Python libraries.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/TOML/index.mdx': `---
title: TOML
description: Tom's Obvious, Minimal Language, a highly readable configuration format designed to map flawlessly to a hash table.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TOML">

Created by Tom Preston-Werner (co-founder of GitHub), TOML was designed to be a mathematically unambiguous, easily readable alternative to YAML and JSON for configuration files. It is the official configuration format for Rust (Cargo), Python (pyproject.toml), and Go.

## 1. Fixing INI and YAML
- **INI** is too simple. It lacks data types and arrays.
- **YAML** is mathematically too complex. Its reliance on strict indentation and implicit typing (where the string "no" might accidentally be parsed as a Boolean TICK1falseTICK1) causes catastrophic deployment errors.

TOML looks like INI, but is mathematically strict. 
Strings must be quoted. Booleans are strictly TICK1trueTICK1 or TICK1falseTICK1. It natively supports arrays TICK1ports = [8000, 8001]TICK1 and inline tables. It mathematically guarantees that any TOML file will parse predictably into a standard Dictionary/Hash Table in any programming language.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/XML/index.mdx': `---
title: XML
description: eXtensible Markup Language, the immensely powerful, tag-based data format that defined Enterprise computing in the 2000s.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="XML (eXtensible Markup Language)">

Before JSON became the standard for web APIs, XML ruled the enterprise world. It is a markup language similar to HTML, but unlike HTML (which has predefined tags like TICK1<h1>TICK1), XML allows developers to mathematically define their own tags.

## 1. The Power of Validation (XSD)
JSON's greatest weakness is schema validation. If an API expects an integer and receives a string, it often crashes at runtime.
XML solved this mathematically using **XML Schema Definition (XSD)**. 
An XSD file is a mathematically rigorous contract that defines exactly what tags are allowed in an XML file, in what order, and what data types they must contain. The XML parser mathematically guarantees the data is valid before the application ever touches it.

## 2. XPath and XSLT
XML is not just a data format; it is an ecosystem.
- **XPath**: A query language that mathematically traverses the XML tree (e.g., TICK1/bookstore/book[price>35]TICK1), allowing precise data extraction without writing code.
- **XSLT**: A functional language that can mathematically transform an XML document into a completely different XML, HTML, or PDF document.

While largely abandoned for modern web APIs due to its massive verbosity and parsing overhead, XML remains the backbone of enterprise SOAP services, SVG graphics, and Android layouts.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/YAML/index.mdx': `---
title: YAML
description: YAML Ain't Markup Language, a highly readable data serialization standard heavily utilized in DevOps and CI/CD pipelines.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="YAML">

YAML was explicitly designed to be easily readable by humans. It completely drops the brackets and braces of JSON, replacing them with Python-style semantic indentation. It is the undisputed configuration standard for Docker, Kubernetes, GitHub Actions, and Ansible.

## 1. Readability vs Complexity
While a YAML file looks beautifully clean, the YAML 1.2 specification is mathematically massive and incredibly complex.
- It supports **Anchors and Aliases** (TICK1&TICK1 and TICK1*TICK1), allowing you to define a block of data once and mathematically copy-paste it elsewhere in the file.
- It supports multi-line strings with complex folding rules (TICK1>TICK1 vs TICK1|TICK1).

## 2. The "Norway Problem"
YAML's attempt to be "helpful" can cause catastrophic mathematical failures. 
In older YAML parsers, if you configured an array of countries like TICK1[GB, FR, NO]TICK1, the parser would see "NO", mathematically assume you meant the Boolean TICK1falseTICK1, and corrupt the data. 
Because indentation strictly defines the mathematical structure of the data, a single misplaced space character can completely destroy a Kubernetes cluster deployment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.2 Functional/Agda/index.mdx': `---
title: Agda
description: A dependently typed functional programming language and interactive theorem prover.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agda">

Agda is not just a programming language; it is a mathematical proof assistant. It is a purely functional language closely related to Haskell, but it features a **Dependent Type System**.

## 1. Dependent Types
In standard languages (Java, Rust, Haskell), types (like TICK1StringTICK1 or TICK1IntTICK1) and values (like TICK1"Hello"TICK1 or TICK15TICK1) exist in completely separate mathematical universes. 
In Agda, types can mathematically depend on values. 
You can define a type called TICK1Vector A nTICK1, which means "an array of type A, with exactly length n".
If you write an TICK1appendTICK1 function, its mathematical signature is:
TICK1append : Vector A n -> Vector A m -> Vector A (n + m)TICK1
If your code accidentally returns an array of length TICK1n + m - 1TICK1, the code will mathematically fail to compile. The compiler mathematically proves that your logic is flawless before execution.

## 2. Interactive Theorem Proving
Agda developers do not write code in isolation. They use an interactive Emacs or VSCode mode. The developer writes the mathematical type signature (the Theorem), and the Agda compiler interactively helps them write the code (the Proof) to satisfy it, turning programming into a rigorous mathematical dialogue.

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
