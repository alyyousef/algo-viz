import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/The Core Languages/index.mdx': `---
title: The Core Languages (JS, ES6+, TS)
description: The evolution of Javascript from a simple 10-day scripting language into a globally dominant, strongly-typed enterprise ecosystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Core Languages (JS, ES6+, TS)">

JavaScript was famously created by Brendan Eich in just 10 days in 1995. It was originally intended to be a simple, lightweight scripting language to make buttons clickable in the Netscape Navigator browser. 

Today, it is the most widely used programming language on Earth, powering everything from enterprise cloud backends to mobile applications.

## ES6 (ECMAScript 2015) - The Revolution
The language stagnated for years until the legendary **ES6 (ECMAScript 2015)** update. This single update fundamentally modernized Javascript, introducing:

1. **let & const**: Finally replacing the unpredictable, globally-scoped TICK1varTICK1.
2. **Arrow Functions**: TICK1const add = (a, b) => a + b;TICK1 - providing concise syntax and mathematically fixing the confusing TICK1thisTICK1 context.
3. **Promises & Async/Await**: Killing "Callback Hell" and providing a clean architecture for asynchronous HTTP requests.
4. **Destructuring & Spread Operators**: Allowing developers to extract object properties mathematically TICK1const { name } = user;TICK1.

## The TypeScript Paradigm Shift
Despite ES6, JavaScript still had a fatal flaw: **Dynamic Typing**. 
In a 1-million line codebase, a developer might accidentally pass a String into a function that expects an Array, and the application wouldn't crash until a user actually clicked a button in Production.

Microsoft solved this by creating **TypeScript**.
TypeScript is a strict syntactical superset of JavaScript. It adds **Static Type Checking** at compile-time.

TICK3ts
interface User {
  id: number;
  name: string;
}

// The compiler will violently crash if you pass a boolean here.
function greetUser(user: User) {
  console.log("Hello " + user.name);
}
TICK3

TypeScript does not run in the browser. It mathematically verifies the entire codebase for errors, and then compiles (stripping away the types) down into pure JavaScript. Today, TypeScript is considered the absolute industry standard for all professional web development.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/The Module Systems/index.mdx': `---
title: The Module Systems (CJS, ESM, AMD)
description: The historical nightmare of Javascript imports, leading to the ultimate triumph of native ES Modules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Module Systems (CJS, ESM)">

For the first 20 years of its existence, JavaScript had absolutely no native way to split code into multiple files. You simply loaded massive, global TICK1<script>TICK1 tags in your HTML file and hoped they loaded in the correct order without colliding.

To fix this, the community invented fragmented "Module Systems."

## The Legacy Systems

### CommonJS (CJS)
When Node.js was created in 2009 for backend servers, it needed a module system immediately. They invented **CommonJS**. It uses TICK1require()TICK1 and is entirely **synchronous**.
TICK3js
const fs = require('fs');
module.exports = { myFunction };
TICK3
CommonJS worked perfectly on the backend, but it was disastrous for browsers (which need to load files asynchronously over the network).

### AMD (Asynchronous Module Definition)
Used primarily by libraries like **RequireJS**, AMD was designed specifically for the browser. It used a massive, ugly wrapper function to load dependencies asynchronously before executing the code.
TICK3js
define(['dep1', 'dep2'], function (dep1, dep2) {
    return function () {};
});
TICK3

### UMD (Universal Module Definition)
A terrifying Frankenstein wrapper that attempted to detect if the code was running in Node (CJS) or a browser (AMD), and dynamically served both.

## ES Modules (ESM) - The Standard
In 2015, ECMAScript finally introduced a native, official module architecture built directly into the JavaScript language: **ESM**.

TICK3js
import { myFunction } from './utils.js';
export const myVariable = 42;
TICK3

ESM is asynchronous, statically analyzable (which allows Bundlers to mathematically perform "Tree-Shaking" to delete unused code), and natively supported by all modern browsers via TICK1<script type="module">TICK1.

**The Transition Nightmare**: For the last decade, the Javascript ecosystem has suffered immensely trying to migrate the billions of existing CommonJS packages over to ESM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/The Runtimes/index.mdx': `---
title: The Runtimes (Node.js, Deno, Bun)
description: The execution engines that allow JavaScript to run directly on operating systems outside of the browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Runtimes (Node.js, Deno, Bun)">

Historically, JavaScript was locked inside a cage: the web browser. It could not read local computer files, it could not open network ports, and it could not run as a background service.

## Node.js (The Pioneer)
In 2009, Ryan Dahl took Google Chrome's blazing-fast **V8 JavaScript Engine**, ripped it out of the browser, and strapped it to a C++ architecture that gave it full OS access. This created **Node.js**.

Node.js revolutionized the industry. For the first time ever, developers could write their frontend UI in Javascript, and their backend API in Javascript. It introduced an asynchronous, Event-Driven, non-blocking I/O model that was capable of handling tens of thousands of concurrent connections (drastically outperforming traditional Ruby and PHP servers).

## Deno (The Secure Successor)
Years later, Ryan Dahl realized Node.js had massive architectural flaws: 
1. It lacked security (any Node package could secretly delete your entire hard drive).
2. It relied on a centralized TICK1package.jsonTICK1 and the TICK1node_modulesTICK1 folder.

He created **Deno** (written in Rust) to fix this. Deno is secure by default (requiring explicit permissions to read files or access the network), natively supports TypeScript out-of-the-box without transpilers, and imports URLs directly (like the browser) instead of using TICK1node_modulesTICK1.

## Bun (The Speed Demon)
Created by Jarred Sumner, **Bun** is the newest runtime. Instead of Google's V8, it uses Apple's **JavaScriptCore** engine. It is written in Zig and is mathematically hyper-optimized for extreme performance. 
Bun is designed to be a completely unified ecosystem: it acts as a runtime, a package manager (replacing TICK1npmTICK1), and a bundler (replacing TICK1WebpackTICK1), executing significantly faster than Node.js.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Package Managers/index.mdx': `---
title: Package Managers (npm, Yarn, pnpm)
description: The tools designed to resolve, download, and manage the massive dependency trees of open-source Javascript libraries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Package Managers">

Modern applications rely on thousands of open-source libraries (React, Lodash, Tailwind). Managing the exact version numbers and deep dependencies of these libraries requires a **Package Manager**.

## npm (Node Package Manager)
The default package manager that ships with Node.js. It created the infamous **TICK1node_modulesTICK1** folder—a massive, endlessly deep directory containing all your downloaded code.
Historically, npm was extremely slow, lacked deterministic lockfiles, and if 10 different projects on your computer all used React, npm would download and copy React 10 separate times, consuming massive amounts of hard drive space.

## Yarn (The Facebook Fix)
In 2016, Facebook grew tired of npm's failures and released **Yarn**. 
Yarn introduced the **Lockfile** (TICK1yarn.lockTICK1), which mathematically guaranteed that if Developer A installed a package, Developer B would get the *exact same* cryptographic hash version. It also downloaded packages in parallel, drastically increasing installation speeds. (npm eventually copied all these features).

## pnpm (Performant NPM)
The current industry pinnacle. **pnpm** mathematically solved the hard drive space issue by using a global **content-addressable store** and OS-level **Symlinks** (Hard Links).

If you have 100 projects on your computer that use React, pnpm downloads React exactly once to a hidden folder on your OS (TICK1~/.pnpm-storeTICK1). It then creates instantaneous symbolic links in your TICK1node_modulesTICK1 that point to the global store. 
This makes pnpm astronomically faster than npm and saves gigabytes of disk space.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Transpilers & Compilers/index.mdx': `---
title: Transpilers & Compilers (Babel, SWC, esbuild)
description: The build tools that mathematically transform futuristic TypeScript and React JSX into older JavaScript that legacy browsers can understand.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Transpilers & Compilers">

When React introduced **JSX** (writing HTML directly inside Javascript), browsers had no idea how to read it. They would instantly crash with a Syntax Error. 
Furthermore, when ES6 released, developers wanted to use new features like Arrow Functions, but users on older browsers (Internet Explorer) couldn't run them.

We needed a tool to "Transpile" (Translate + Compile) the futuristic code back down into older, highly-compatible JavaScript.

## Babel (The JS Pioneer)
**Babel** was the undisputed king of transpilation for nearly a decade. 
It parsed your React JSX and ES6 code into an Abstract Syntax Tree (AST), mathematically transformed the nodes, and spat out ugly, highly compatible ES5 code. 

**The Flaw**: Babel was written in Javascript. As codebases grew to millions of lines, Babel would often take 5+ minutes just to compile the application. Javascript was simply too slow for heavy compiler mathematics.

## The Systems Language Revolution
To fix the compilation speed crisis, developers began rewriting JavaScript tooling in low-level, hyper-optimized Systems Languages.

### 1. esbuild (Written in Go)
Created by Evan Wallace, esbuild shocked the industry by compiling code **10x to 100x faster than Babel**. Because it was written in Go, it could heavily utilize CPU multi-threading and shared memory architectures that Node.js could not.

### 2. SWC (Speedy Web Compiler - Written in Rust)
Created by Next.js (Vercel), SWC is a Rust-based compiler designed specifically as a drop-in replacement for Babel. It performs the exact same AST transformations but operates at near-native CPU speeds.

Today, nearly all modern frameworks (Next.js, Vite) have completely abandoned Babel in favor of esbuild or SWC.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Legacy Bundlers/index.mdx': `---
title: Legacy Bundlers (Webpack, Rollup, Parcel)
description: The heavy architectural tools used to traverse dependency graphs and mathematically combine thousands of JS files into a single production asset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Legacy Bundlers">

Browsers historically punished you for making too many HTTP requests. If your app consisted of 500 separate Javascript files, the browser would have to make 500 slow network requests to load the page.
To solve this, developers created **Bundlers**—tools that spider through your code, read the TICK1importTICK1 statements, and mathematically stitch everything together into one massive TICK1bundle.jsTICK1 file.

## Webpack (The Monolith)
For years, **Webpack** was the absolute standard. It viewed everything (Javascript, CSS, Images, SVGs) as a module. 
Webpack was incredibly powerful, allowing for **Code Splitting** (breaking the massive bundle into smaller chunks that only load when the user visits a specific page). 

**The Flaw**: Webpack configuration files (TICK1webpack.config.jsTICK1) were notoriously horrifying. They were massive, impossible to read, and broke constantly. Additionally, because Webpack was written in Javascript, building a large enterprise app could take 10+ minutes.

## Rollup (The Library King)
Created by Rich Harris (creator of Svelte), Rollup focused strictly on Javascript (ignoring CSS/Images). 
Rollup pioneered **Tree-Shaking**—a mathematical algorithm that statically analyzes your ESM imports and aggressively deletes any unused functions from the final output, producing incredibly tiny bundle sizes. 
Because of this, Rollup became the industry standard for bundling open-source NPM libraries (like React components), while Webpack remained the standard for web applications.

## Parcel
Parcel attempted to solve the Webpack configuration nightmare by offering a "Zero Configuration" bundler. It worked brilliantly out-of-the-box, automatically detecting HTML/CSS/JS without a massive config file, though it struggled to gain Webpack's enterprise market share.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Modern Build Tools/index.mdx': `---
title: Modern Build Tools (Vite, Turbopack)
description: The next-generation architecture that abandons heavy bundling during development in favor of instant, unbundled ESM delivery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Modern Build Tools">

The Webpack era created a catastrophic developer experience problem. In a large app, if a developer changed a single CSS color, they would have to wait 30 seconds for Webpack to re-bundle the entire application before the browser would update.

Evan You (creator of Vue) realized that modern browsers had finally implemented native support for ES Modules (TICK1<script type="module">TICK1).

## Vite (The French word for "Quick")
Vite completely revolutionized frontend development by entirely abandoning the concept of bundling during development.

When you start a Vite dev server:
1. It does **not** bundle your code.
2. It uses blazing-fast **esbuild** (written in Go) to instantly pre-compile your npm dependencies.
3. It serves your source code directly to the browser as native ESM over HTTP.
4. If you edit a file, Vite uses **HMR (Hot Module Replacement)** to instantly swap out exactly that one module in the browser via WebSockets in milliseconds.

The result: A Vite dev server starts in 100 milliseconds, regardless of whether your app has 10 files or 10,000 files. (Note: For Production, Vite still heavily bundles the code using Rollup for optimal network performance).

## Turbopack
Created by Tobias Koppers (the original creator of Webpack) at Vercel. 
Turbopack is billed as the "Rust-based successor to Webpack". Instead of abandoning bundling like Vite, it relies on incredibly complex, heavily-cached incremental Rust compilation to achieve extreme speed, specifically optimized for massive Next.js architectures.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Monorepos/index.mdx': `---
title: Monorepo Tooling (Nx, Turborepo, Lerna)
description: Enterprise architecture systems designed to manage dozens of separate applications and packages within a single Git repository.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monorepo Tooling">

Historically, if a company had a Web App, a Mobile App, and a shared UI Library, they put them in 3 separate Git repositories (Polyrepo). This was a nightmare. If you updated the UI library, you had to publish it to NPM, update the version in the Web App repo, and deploy.

A **Monorepo** solves this by putting all 3 applications in a single Git repository. They can instantly share code locally without publishing to NPM.

However, if you have 50 applications in one repo, running TICK1npm run testTICK1 will take 4 hours. You need Monorepo Tooling.

## 1. Lerna (The Legacy Tool)
The original monorepo tool. It simply helped version and publish multiple packages simultaneously. However, it was slow and lacked advanced mathematical build caching.

## 2. Nx (The Enterprise Standard)
Created by former Google Angular engineers, Nx treats your repository as a massive Directed Acyclic Graph (DAG). 
If you edit a deeply nested utility function, Nx mathematically calculates exactly which apps depend on that function, and it will **only rebuild and test those specific apps**, ignoring the rest of the repo. 
It also utilizes **Remote Caching**—if Developer A builds the app on their laptop, the compiled output is sent to a cloud server. If Developer B tries to build the exact same code, Nx instantly downloads the cached result in 2 seconds instead of compiling it locally.

## 3. Turborepo (The Modern Challenger)
Acquired by Vercel, Turborepo is written in Rust. It functions very similarly to Nx (DAG mapping + Remote Caching) but is heavily optimized for zero-configuration, seamless integration with Next.js, and uses highly readable JSON configuration files.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/16. JavaScript Ecosystem & Tooling/Code Quality/index.mdx': `---
title: Code Quality (ESLint, Prettier)
description: The automated static analysis tools that mathematically enforce stylistic consistency and prevent logical errors before execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Code Quality (ESLint, Prettier)">

In a team of 50 developers, everyone has different opinions on coding style. Some prefer single quotes, some prefer double quotes. Some prefer 2 spaces, some prefer tabs. 

Without automated tooling, Pull Request reviews devolve into bitter arguments over indentation, wasting thousands of hours of expensive engineering time. 

The industry mathematically solved this using a strict separation of concerns:

## 1. Prettier (The Code Formatter)
Prettier is an "opinionated" code formatter. It does not care about logic or bugs. Its only job is visual spacing.
When you press Save in your editor, Prettier rips your code apart into an Abstract Syntax Tree (AST), deletes all of your personal formatting, and reprints it using a strict set of mathematical rules. 

TICK3js
// You write this ugly mess:
foo(arg1,arg2,
arg3,arg4);

// Prettier instantly formats it on Save:
foo(
  arg1,
  arg2,
  arg3,
  arg4
);
TICK3
It completely eliminates all team debates about formatting.

## 2. ESLint (The Logic Linter)
While Prettier handles formatting, ESLint analyzes your actual Javascript logic to mathematically prevent bugs.

ESLint scans the AST for dangerous patterns:
- TICK1no-unused-varsTICK1: You declared a variable but never used it.
- TICK1eqeqeqTICK1: You used TICK1==TICK1 instead of the strict TICK1===TICK1.
- TICK1react-hooks/exhaustive-depsTICK1: You forgot to include a variable in a React TICK1useEffectTICK1 dependency array, which will cause a stale closure bug in Production.

## The Synergy
Today, these tools are run automatically on "pre-commit hooks" using a tool called **Husky**. The system will literally forbid the developer from committing their code to Git unless Prettier has formatted it and ESLint reports zero errors.

</ConceptTemplate>
`,
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
