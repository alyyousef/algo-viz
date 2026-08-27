import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Scratch/index.mdx': `---
title: Scratch
description: A profoundly influential visual block-based programming language developed by MIT, used by millions of children worldwide to learn coding.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scratch">

Developed by the Lifelong Kindergarten Group at the MIT Media Lab, Scratch is arguably the most successful educational programming language in history. It allows users to create interactive stories, games, and animations without typing any raw syntax.

## 1. The Block Paradigm
Like Blockly (which powers modern versions of Scratch), users mathematically snap puzzle pieces together to form logic. 
The blocks are heavily typed visually. For example, a "Boolean" block has pointed edges, and can only fit into a pointed hole (like the condition of an TICK1ifTICK1 statement). A "Number" block has rounded edges. This prevents entire classes of compile-time syntax and type errors.

## 2. Event-Driven Concurrency
Scratch is fundamentally an event-driven, concurrent system.
Every "Sprite" (character) on the screen can have its own independent script. 
When the "Green Flag" (Start) is clicked, or when two sprites collide, multiple scripts across multiple sprites fire simultaneously. It introduces children to parallel processing, message broadcasting, and asynchronous events completely seamlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Simula/index.mdx': `---
title: Simula
description: The grandfather of Object-Oriented Programming, developed in the 1960s to mathematically simulate complex systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Simula">

Created in the 1960s by Ole-Johan Dahl and Kristen Nygaard at the Norwegian Computing Center, Simula (specifically Simula 67) is historically recognized as the first true Object-Oriented Programming (OOP) language.

## 1. The Birth of the Object
Before Simula, languages like Fortran and C were procedural; data and the functions that acted on that data were mathematically completely separate.
Because Dahl and Nygaard were building complex mathematical simulations (e.g., simulating a busy airport or a queue of ships), they needed a way to bind data (a Ship's weight) and behavior (a Ship moving) together. 
Simula invented the **Class**, the **Object**, **Inheritance**, and **Virtual Procedures**—the exact concepts that form the foundation of C++, Java, and C# today.

## 2. The Legacy
While Simula was too slow and memory-intensive to conquer the commercial world in the 1960s, a young Bjarne Stroustrup used Simula during his PhD. Recognizing its architectural brilliance but its poor performance, he created "C with Classes," which eventually became **C++**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.10 Educational - Historical - Esoteric/Smalltalk/index.mdx': `---
title: Smalltalk
description: A radically pure object-oriented programming language and environment created at Xerox PARC that shaped modern computing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Smalltalk">

Developed at Xerox PARC by Alan Kay, Dan Ingalls, and Adele Goldberg in the 1970s, Smalltalk took the concepts invented by Simula and pushed them to their absolute mathematical limit. 

## 1. Pure Object Orientation
In languages like Java, there are "primitive" types (TICK1intTICK1, TICK1booleanTICK1) that are not objects.
In Smalltalk, **everything is an object**. Numbers are objects. Classes are objects. Even the TICK1ifTICK1 statement is not a language keyword; it is a method mathematically invoked on a Boolean object.
Instead of calling functions, Smalltalk objects communicate exclusively by passing messages.

## 2. The Live Environment
Smalltalk is not just a language; it is a "living" Graphical User Interface.
When you code in Smalltalk, you do not write a text file, compile it, and run it. You modify objects mathematically in real-time while the program is running. You can inspect memory, change class definitions, and rewrite the debugger itself without ever restarting the system. It fundamentally inspired the MVC (Model-View-Controller) architecture and modern IDEs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/AsciiDoc/index.mdx': `---
title: AsciiDoc
description: A mature, highly capable plain-text markup language used heavily for writing technical documentation, books, and articles.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AsciiDoc">

AsciiDoc is a lightweight markup language, similar to Markdown, but mathematically much stricter and vastly more feature-rich. While Markdown was designed for simple web formatting (bold, italics, links), AsciiDoc was designed for writing complete, structurally complex books and enterprise documentation.

## 1. Markdown vs AsciiDoc
Markdown has no formal standard (leading to dozens of conflicting flavors like CommonMark and GFM). It lacks native support for complex tables, document inclusions, or advanced cross-referencing.
AsciiDoc solves this mathematically. It natively supports:
- Multi-page documents with automatic Table of Contents generation.
- Highly complex tables with merged cells and varying column widths.
- Admonitions (Note, Warning, Tip) built directly into the syntax.

## 2. The Toolchain (Asciidoctor)
The modern processor for AsciiDoc is **Asciidoctor** (written in Ruby). It mathematically parses AsciiDoc files and can compile them directly into HTML5, DocBook, PDF, and EPUB formats perfectly, making it the industry standard for O'Reilly tech books and Spring Framework documentation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/EJS/index.mdx': `---
title: EJS
description: Embedded JavaScript templating, a simple templating language that lets you generate HTML markup with plain JavaScript.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="EJS (Embedded JavaScript)">

EJS is one of the most popular and straightforward templating engines for Node.js and Express applications. It allows developers to dynamically mathematically inject JavaScript variables directly into HTML files.

## 1. Syntax and Execution
Unlike strict templating languages (like Handlebars) that heavily restrict what logic you can write, EJS allows raw, mathematically complete JavaScript loops and conditionals directly inside the template.
- TICK1<% %>TICK1 : Executes JavaScript logic (e.g., TICK1forTICK1 loops, TICK1ifTICK1 statements) without outputting anything to the HTML.
- TICK1<%= %>TICK1 : Evaluates the JavaScript and mathematically outputs the escaped result into the HTML (preventing XSS attacks).
- TICK1<%- %>TICK1 : Evaluates and outputs the raw, unescaped HTML (dangerous if used with user input).

## 2. The Tradeoff
Because EJS allows raw JavaScript, it is incredibly powerful. However, it violates the architectural principle of separating Logic from View. A poorly written EJS template can quickly degenerate into a tangled mess of complex database queries mathematically mixed directly into HTML tables.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Handlebars/index.mdx': `---
title: Handlebars
description: A highly popular, logic-less templating engine built to keep view templates clean and strictly separated from application logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Handlebars">

Handlebars is a widely used templating engine (an extension of Mustache). Its core mathematical philosophy is that templates should be "logic-less". You should not be writing complex TICK1forTICK1 loops or mathematical equations inside your HTML.

## 1. The "Logic-Less" Philosophy
In Handlebars, you use double curly braces (hence the name) to mathematically bind variables: TICK1{{ title }}TICK1.
If you need to iterate over an array of users, you use a block helper: TICK1{{#each users}} ... {{/each}}TICK1.
Crucially, you mathematically *cannot* write TICK1{{ user.age + 5 }}TICK1. Handlebars physically prevents you from doing math or executing raw JavaScript inside the template. The server must do all calculations before passing the final data object to Handlebars.

## 2. Helpers
If you mathematically *must* process data in the template (e.g., formatting a date), you register a custom "Helper" function in your server code. The template can then cleanly call that helper: TICK1{{formatDate user.birthDate}}TICK1. This rigorously enforces the Model-View-Controller separation of concerns.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/HCL/index.mdx': `---
title: HCL
description: HashiCorp Configuration Language, a structured declarative language used primarily for defining infrastructure as code (IaC) via Terraform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HCL (HashiCorp Configuration Language)">

HCL is a declarative configuration language developed by HashiCorp. It was mathematically designed to bridge the gap between machine-readable JSON and human-readable configuration files. It is the core language powering **Terraform**.

## 1. Declarative Infrastructure
HCL is not an imperative programming language. You do not write TICK1createServer()TICK1. 
You mathematically declare the desired end-state of your cloud architecture.
TICK3hcl
resource "aws_instance" "web" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}
TICK3
The Terraform engine mathematically compares this HCL declaration against the actual state of AWS, calculates the difference (the graph), and executes the necessary API calls to make reality match the HCL file.

## 2. Advanced Features
While it looks like simple JSON or INI, HCL is mathematically robust. It supports variables, string interpolation, TICK1for_eachTICK1 loops for dynamically generating multiple resources, and strict typing, making it vastly superior to JSON for complex infrastructure topologies.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/INI/index.mdx': `---
title: INI
description: An incredibly simple, widely used configuration file format that uses sections and key-value pairs for basic application settings.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="INI (Initialization File)">

The INI format was the standard mathematical way to configure applications in 16-bit and 32-bit Windows operating systems before the Windows Registry took over. Despite its age, its extreme simplicity keeps it heavily used today (e.g., TICK1.gitconfigTICK1 files, Docker configs).

## 1. Structure
INI files have mathematically almost no syntax overhead. 
They consist of three elements:
- **Sections**: Denoted by square brackets TICK1[Network]TICK1.
- **Properties**: Simple key-value pairs TICK1port = 8080TICK1.
- **Comments**: Lines starting with a semicolon TICK1; This is a commentTICK1.

## 2. Limitations
Because INI is so simple, it mathematically fails at complex data representations.
It does not natively support arrays, nested objects, or boolean types (a boolean is just the string "true" or "1", which the application must manually parse). 
Because there is no formal, universal standard for INI, different parsers handle edge cases (like multiline strings) differently, which has largely driven the industry toward YAML and TOML for complex configuration.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/Jinja2/index.mdx': `---
title: Jinja2
description: A fast, expressive, and extensible templating engine for Python, heavily used in Flask, Django, and Ansible.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Jinja2">

Jinja2 is the premier templating engine for the Python ecosystem. It was heavily inspired by Django's templating system but operates completely independently. It is famously used by the Flask web framework and the Ansible configuration management tool.

## 1. Syntax and Power
Like Handlebars, Jinja2 uses double braces TICK1{{ variable }}TICK1 for output and TICK1{% if x %}TICK1 for logic.
However, Jinja2 mathematically strikes a balance between "Logic-Less" and "Full Programming". It allows advanced operations directly in the template:
- **Filters**: Using a pipe mathematically transform data (e.g., TICK1{{ user.name | capitalize }}TICK1).
- **Macros**: You can mathematically define reusable HTML functions (like a Button component) directly inside the template file.

## 2. Template Inheritance
Jinja2's most powerful architectural feature is Inheritance.
You can create a mathematically complete TICK1base.htmlTICK1 template with a header and footer, and define a TICK1{% block content %}TICK1. 
Child templates simply declare TICK1{% extends "base.html" %}TICK1 and inject their specific HTML into the content block, drastically reducing code duplication across large web applications.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.11 Configuration - Markup - Templating Languages/JSON/index.mdx': `---
title: JSON
description: JavaScript Object Notation, the undisputed universal standard for transmitting structured data across the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JSON (JavaScript Object Notation)">

Created by Douglas Crockford in the early 2000s, JSON is a lightweight, text-based, language-independent data interchange format. It mathematically annihilated XML to become the absolute backbone of modern REST APIs and web services.

## 1. Syntax and Simplicity
JSON is mathematically a subset of JavaScript. It supports exactly six data types: 
Strings, Numbers, Booleans, Null, Arrays, and Objects.
Its brilliance lies in its strict limitations. 
- Keys *must* be wrapped in double quotes. 
- Trailing commas are mathematically illegal. 
- It cannot contain functions or binary data.

Because it is so simple and mathematically rigid, writing a blazingly fast JSON parser in any language (C, Python, Rust) is trivial.

## 2. JSON vs XML
In the 1990s, the world used XML (Extensible Markup Language). XML required opening and closing tags for every single value (TICK1<name>John</name>TICK1). It was bloated, computationally expensive to parse, and deeply unreadable.
JSON mathematically stripped away the tags, using curly braces and brackets. It reduced payload sizes over the network by massive margins and mathematically mapped perfectly to the native Object structures of almost every modern programming language.

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
