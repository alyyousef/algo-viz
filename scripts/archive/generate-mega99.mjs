import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Linters/index.mdx': `---
title: Linters
description: Tools that analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Linters">

A compiler tells you if your code is mathematically broken. A **Linter** tells you if your code is *biologically terrible*.

Linters are static analysis tools that parse your source code without running it. They mathematically enforce rules about variable naming, deprecated functions, and potential memory leaks.

<Callout icon="warning" title="The Origin of 'Lint'">
  The term "lint" comes from the physical fuzz (lint) trapped in sheep's wool. In 1978, a C programmer at Bell Labs wrote a tool that "picked the lint" out of C code—finding the tiny, microscopic bugs that the C compiler ignored, like unused variables or uninitialized pointers.
</Callout>

## Linting vs Formatting

It is critical to mathematically separate these two concepts:
- **Formatting** cares about *how the code looks* (tabs vs spaces, line lengths).
- **Linting** cares about *how the code behaves* (unused variables, infinite loops, deprecated APIs).

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Formatters/index.mdx': `---
title: Formatters
description: Tools that automatically rewrite code to adhere to a specific style guide, ensuring visual consistency across a codebase.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Formatters">

In the 2000s, software engineers wasted millions of hours arguing in code reviews about whether an \`if\` statement's bracket should be on the same line or the next line. 

**Code Formatters** mathematically destroyed these arguments. A formatter parses your code into an Abstract Syntax Tree (AST), completely ignores your original whitespace, and reprints the code using mathematically absolute, universally enforced styling rules.

<Callout icon="success" title="The Power of Automation">
  Modern developers never format their own code. They configure their text editors to run the formatter automatically **On Save**. You can write visually hideous, chaotic code, press \`Ctrl+S\`, and the formatter instantly snaps the code into perfect, architectural alignment.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/ESLint/index.mdx': `---
title: ESLint
description: A static code analysis tool for identifying problematic patterns found in JavaScript code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ESLint"
  subtitle="The absolute standard for JavaScript quality"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/512px-ESLint_logo.svg.png"
  description="ESLint is the mathematically ubiquitous linter for the entire JavaScript and TypeScript ecosystem. It prevents developers from doing things that are technically legal in JS, but biologically stupid."
  yearCreated={2013}
  creator="Nicholas C. Zakas"
  isOpenSource={true}
  websiteUrl="https://eslint.org/"
>

JavaScript is a notoriously forgiving language. It allows you to mathematically compare a String to an Array without throwing an error. 

ESLint solves this by enforcing strict rules. If you attempt to use the \`==\` operator instead of the strict \`===\` operator, ESLint will mathematically throw an error in your CI/CD pipeline, physically preventing the code from merging to production.

<Callout icon="tip" title="Plugin Architecture">
  ESLint's true power is its extensibility. 
  
  React developers install \`eslint-plugin-react-hooks\`. If a developer accidentally puts a \`useEffect\` hook inside an \`if\` statement (which mathematically breaks React's render cycle), ESLint detects it instantly and throws a fatal error before the code even runs.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Prettier/index.mdx': `---
title: Prettier
description: An opinionated code formatter.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Prettier"
  subtitle="The undisputed formatting dictator"
  logoUrl="https://prettier.io/icon.png"
  description="Prettier is an 'opinionated' code formatter for JavaScript, TypeScript, CSS, and HTML. It mathematically stops all arguments over code style by strictly enforcing one universal format."
  yearCreated={2017}
  creator="James Long"
  isOpenSource={true}
  websiteUrl="https://prettier.io/"
>

Before Prettier, developers used ESLint for both formatting *and* linting. This was mathematically chaotic, as ESLint's formatting rules were highly configurable and brittle.

<Callout icon="warning" title="The Opinionated Philosophy">
  Prettier is biologically arrogant by design. 
  
  It offers almost zero configuration options. You cannot tell Prettier to align your variables in a specific custom way. It mathematically parses your code and prints it back out exactly how *it* thinks it should look. By removing all choices, it eliminated 100% of code styling arguments across the entire global frontend ecosystem.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Pylint/index.mdx': `---
title: Pylint
description: A static code analysis tool for the Python programming language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Pylint"
  subtitle="The strict Python teacher"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="Pylint is one of the oldest and most rigid linters in the Python ecosystem. It mathematically enforces both logic checks and strict PEP-8 style guidelines."
  yearCreated={2003}
  creator="Sylvain Thénault"
  isOpenSource={true}
  websiteUrl="https://pylint.org/"
>

If you write a Python function and name it \`CalculateTax\`, Pylint will mathematically throw an error. Why? Because the official Python PEP-8 specification states that functions *must* be named using \`snake_case\` (\`calculate_tax\`).

<Callout icon="info" title="The 10.0 Scoring System">
  Pylint is famous for its brutal scoring system. 
  
  When you run Pylint on your codebase, it calculates a mathematical grade out of 10.0. If you have unused variables, missing docstrings, or lines that are too long, Pylint will biologically shame you by outputting: \`Your code has been rated at 4.52/10\`.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Flake8/index.mdx': `---
title: Flake8
description: A wrapper around PyFlakes, pycodestyle, and McCabe scripts for Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Flake8"
  subtitle="The fast Python linter"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="Flake8 is the historical competitor to Pylint. Instead of doing deep, slow mathematical type inference, Flake8 focuses on blazing-fast style and syntax checking."
  yearCreated={2010}
  creator="Tarek Ziadé"
  isOpenSource={true}
  websiteUrl="https://flake8.pycqa.org/"
>

Pylint is mathematically heavy; it practically executes your code to check for complex inheritance errors. 

Flake8 is just a fast wrapper around three tools:
1. **PyFlakes:** Checks for logical errors (unused imports, syntax errors).
2. **pycodestyle:** Checks for PEP-8 formatting compliance.
3. **McCabe:** Calculates the mathematical Cyclomatic Complexity of your functions (warning you if a function has too many \`if/else\` branches).

Because it is so fast, Flake8 became the absolute standard for Python CI/CD pipelines until the recent invention of Ruff.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Black/index.mdx': `---
title: Black
description: The uncompromising Python code formatter.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Black"
  subtitle="The Prettier of Python"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="Black is the 'uncompromising' code formatter for Python. It mathematically applies the exact same philosophical dictatorial control to Python that Prettier applied to JavaScript."
  yearCreated={2018}
  creator="Łukasz Langa"
  isOpenSource={true}
  websiteUrl="https://black.readthedocs.io/"
>

*"Any color you like, as long as it's black."* - Henry Ford.

<Callout icon="success" title="Zero Configuration">
  Black mathematically refuses to let you configure it. 
  
  If you use single quotes (\`'string'\`), Black will maliciously rewrite them to double quotes (\`"string"\`). If your function parameters exceed 88 characters, Black will mathematically snap them onto multiple lines. By being completely unyielding, it forced the entire global Python ecosystem into visual consistency.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Ruff/index.mdx': `---
title: Ruff
description: An extremely fast Python linter and code formatter, written in Rust.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Ruff"
  subtitle="The Rust-powered absolute destroyer of Python tools"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="Ruff mathematically replaced Flake8, Black, isort, and Pylint overnight. Written in pure Rust, it runs 10x to 100x faster than legacy Python tools, executing deep linting and formatting on massive codebases in milliseconds."
  yearCreated={2022}
  creator="Astral"
  isOpenSource={true}
  websiteUrl="https://docs.astral.sh/ruff/"
>

Historically, checking Python code required running 4 different tools (Flake8, Black, isort, Bandit), all written in Python, which took mathematically massive amounts of time on large Monorepos.

<Callout icon="tip" title="The Consolidation">
  Ruff re-engineered the rules of all those tools natively in Rust. 
  
  You type \`ruff check .\`. It mathematically spins up parallel threads on every CPU core, parses the Abstract Syntax Tree, formats the code perfectly (replicating Black), sorts the imports, and lints for thousands of errors, finishing in 0.1 seconds. It is one of the fastest architectural paradigm shifts in the history of the Python ecosystem.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/SonarQube/index.mdx': `---
title: SonarQube
description: An open-source platform developed by SonarSource for continuous inspection of code quality.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="SonarQube"
  subtitle="The Enterprise Security Scanner"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/SonarQube_Logo.svg/512px-SonarQube_Logo.svg.png"
  description="While ESLint and Ruff run locally on a developer's laptop, SonarQube is a massive enterprise server that mathematically scans the entire codebase during CI/CD to identify security vulnerabilities, code smells, and technical debt."
  yearCreated={2007}
  creator="SonarSource"
  isOpenSource={true}
  websiteUrl="https://www.sonarsource.com/products/sonarqube/"
>

SonarQube is fundamentally focused on **Security and Architecture**.

If an enterprise developer accidentally hardcodes an AWS Secret Key into a Java file, local linters might miss it. When the code is pushed, the SonarQube server mathematically intercepts the Pull Request, scans the code using deep Static Application Security Testing (SAST), detects the leaked key, and biologically blocks the merge.

<Callout icon="warning" title="Technical Debt Metrics">
  SonarQube calculates mathematical 'Technical Debt'. It analyzes duplicated code, complex functions, and test coverage, and visually tells management: *"This repository will mathematically require exactly 14 days of refactoring to fix its structural architecture."*
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Pre-commit hooks/index.mdx': `---
title: Pre-commit hooks
description: Scripts executed by Git before a commit is finalized to enforce code quality standards.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pre-commit hooks">

If a team configures ESLint and Prettier, but a junior developer forgets to run them before typing \`git commit\`, the broken code mathematically enters the repository.

**Pre-commit hooks** solve this.

<Callout icon="success" title="The Git Checkpoint">
  Git has a physical, hidden directory (\`.git/hooks\`). 
  
  Tools like **Husky** or **pre-commit** mathematically inject a script into this folder. When a developer types \`git commit\`, Git physically pauses. It runs the linter and the formatter. If the linter finds an error, the script throws an exit code of \`1\`, and Git biologically aborts the commit, physically forcing the developer to fix the code before it can be saved.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Static analysis/index.mdx': `---
title: Static Analysis
description: The analysis of computer software that is performed without actually executing programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static Analysis">

**Static Analysis** is the mathematical foundation behind all linters, formatters, and type checkers.

Instead of running the program (Dynamic Analysis) to see if it crashes, Static Analysis mathematically reads the raw text, converts it into an **Abstract Syntax Tree (AST)**, and analyzes the theoretical control flow to definitively prove whether a bug exists.

<Callout icon="info" title="The Halting Problem">
  Static Analysis has a hard biological limitation: **The Halting Problem**, proved by Alan Turing. 
  
  It is mathematically impossible for an algorithm to look at a piece of code and know with 100% certainty exactly what it will do at runtime. Therefore, static analysis tools must rely on heuristics, and they occasionally generate "False Positives" (flagging perfectly safe code as dangerous).
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Debuggers/index.mdx': `---
title: Debuggers
description: Computer programs used to test and debug other programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Debuggers">

A **Debugger** is the most powerful weapon a software engineer possesses. It allows a developer to mathematically freeze time.

Instead of printing variables to the console (\`console.log\`), a debugger allows you to set a **Breakpoint**. When the CPU hits that line of code, it biologically pauses the entire application.

<Callout icon="tip" title="Memory Inspection">
  While the application is frozen, the developer can mathematically peer directly into the computer's RAM. You can see the exact values of every variable, inspect the Call Stack to see exactly which functions called which functions, and step through the code one single CPU instruction at a time.
</Callout>

Famous debuggers include **GDB** (GNU Debugger for C/C++), **LLDB** (LLVM Debugger), and the visual debuggers built directly into Chrome DevTools and Visual Studio.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.4 Code Quality Tools/Profilers/index.mdx': `---
title: Profilers
description: Dynamic code analysis tools that measure the memory or time complexity of a program, the usage of particular instructions, or the frequency and duration of function calls.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Profilers">

If your web application is slow, how do you know what to fix? Guessing is biologically inefficient.

A **Profiler** mathematically records the exact performance of your application while it is running.

<Callout icon="warning" title="Flame Graphs">
  Profilers generate mathematical visual charts called **Flame Graphs**.
  
  The width of the flame represents the exact amount of CPU milliseconds a specific function consumed. If you profile your app and see that the \`calculatePhysics()\` function is consuming 85% of the total CPU width, you know exactly where to focus your mathematical optimization efforts, completely eliminating guesswork.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega99() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega99().catch(console.error)
