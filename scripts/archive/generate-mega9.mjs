import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '65. Comparison Pages (Reference)/JavaScript vs TypeScript/index.mdx': `---
title: JavaScript vs TypeScript
description: A comparison between the dynamic web language and its strictly typed superset.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="JavaScript vs TypeScript">

TypeScript is a syntactic superset of JavaScript, developed by Microsoft, which adds static typing to the language. Every valid JavaScript file is a valid TypeScript file, but TypeScript requires a compiler (\`tsc\`) to strip away the types and output raw JavaScript for the browser to run.

<Callout icon="success" title="The Industry Standard">
  TypeScript has essentially won the enterprise web development war. Catching type errors at compile-time (in VS Code) rather than at runtime (crashing in the user's browser) saves thousands of hours of debugging.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Feature', 'JavaScript', 'TypeScript']}
  rows={[
    ['Typing', 'Dynamic. A variable can be a string, and then changed to a number later.', 'Static. If a variable is declared as a \`string\`, assigning a number throws an error.'],
    ['Execution', 'Runs directly in any web browser or Node.js.', 'Must be compiled/transpiled down to JavaScript first.'],
    ['Learning Curve', 'Easy for beginners to pick up and prototype quickly.', 'Steeper. Requires understanding Interfaces, Generics, and Union types.'],
    ['Refactoring', 'Dangerous in large codebases. Changing an object property might silently break code 10 files away.', 'Extremely safe. The compiler instantly highlights every file where the changed property was used.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/Next.js vs React/index.mdx': `---
title: Next.js vs React
description: Understanding the difference between a UI Library and a full Meta-Framework.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Next.js vs React">

A common point of confusion for beginners is the relationship between React and Next.js. You do not use one *or* the other; you use React *inside* Next.js.

<Callout icon="info" title="Library vs Framework">
  **React** is just a library for rendering UI components. It doesn't care about routing, server-side rendering, or API endpoints.
  
  **Next.js** is a full Framework built *on top* of React. It provides the routing, the server, image optimization, and backend API routes out of the box.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Feature', 'React (Client-Side)', 'Next.js (Meta-Framework)']}
  rows={[
    ['Rendering', 'Client-Side Rendering (CSR). The browser downloads a blank HTML file and uses JS to draw the page.', 'Server-Side Rendering (SSR) and Static Site Generation (SSG). The server pre-builds the HTML.'],
    ['SEO (Search Engines)', 'Poor. Web crawlers often see a blank page before the JS executes.', 'Excellent. Crawlers instantly see the fully rendered HTML.'],
    ['Routing', 'Requires third-party libraries like \`react-router-dom\`.', 'Built-in App Router (file-system based routing).'],
    ['Backend', 'No backend. You must build a separate Node/Express server.', 'Includes Server Actions and API Routes, allowing you to write backend code in the same project.']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/React vs Angular/index.mdx': `---
title: React vs Angular
description: A comparison of two of the most popular web development technologies.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="React vs Angular">

React (created by Meta) and Angular (created by Google) represent two entirely different philosophies for building large-scale web applications.

<Callout icon="tip" title="The Core Difference">
  React is unopinionated. It only handles the View layer. You must choose your own router, state manager, and form library.
  
  Angular is a heavily opinionated, "batteries-included" framework. It comes with an official router, HTTP client, and form validator built-in.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'React', 'Angular']}
  rows={[
    ['Architecture', 'Library (View-focused). Uses Virtual DOM.', 'Full MVC Framework. Uses Real DOM with Zone.js (historically, moving to Signals).'],
    ['Language', 'JavaScript / TypeScript (JSX).', 'Strictly TypeScript.'],
    ['Data Binding', 'One-way data binding (State flows down to UI).', 'Two-way data binding (UI inputs automatically update State).'],
    ['Learning Curve', 'Moderate (Understanding Hooks takes time).', 'Steep (Requires learning RxJS, Dependency Injection, and Decorators).']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/React vs Vue/index.mdx': `---
title: React vs Vue
description: Comparing the giant of the web with its most elegant challenger.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="React vs Vue">

While React dominates the corporate enterprise market, Vue.js (created by Evan You) has built a massive, passionate following by combining the best ideas from both Angular and React into a highly elegant, developer-friendly framework.

<Callout icon="success" title="The Vue Philosophy">
  Vue is designed to be incrementally adoptable. You can drop Vue into a single HTML file via a script tag just to add some interactivity, or you can use it to build a massive Single Page Application.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'React', 'Vue.js']}
  rows={[
    ['Reactivity System', 'Manual. You must explicitly call \`setState()\` or use \`useState\` hooks to trigger a re-render.', 'Automatic. Vue uses Proxies to track dependencies. You just mutate a variable (\`count++\`) and Vue updates the UI.'],
    ['Component Style', 'Everything is JavaScript (JSX). HTML and CSS are written inside JS functions.', 'Single-File Components (\`.vue\`). Clearly separates \`<template>\`, \`<script>\`, and \`<style>\` into familiar blocks.'],
    ['Ecosystem', 'Massive, fragmented, community-driven.', 'Smaller, but highly cohesive. The core team officially maintains the Router and State Management (Pinia).']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/Angular vs Vue/index.mdx': `---
title: Angular vs Vue
description: Comparing the heavy enterprise framework with the lightweight progressive framework.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Angular vs Vue">

When comparing Angular and Vue, you are generally comparing an architecture designed for massive, 50-person enterprise teams against an architecture designed for rapid, highly productive development.

<Callout icon="warning" title="Boilerplate">
  Angular requires significant boilerplate. Creating a simple component often involves multiple files, dependency injection, and decorators. Vue can achieve the same result in 10 lines of code in a single file.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'Angular', 'Vue.js']}
  rows={[
    ['Target Audience', 'Large Enterprise apps, banks, complex internal dashboards.', 'Startups, medium-sized apps, highly interactive frontends.'],
    ['Structure', 'Strict and rigid. Every Angular app looks exactly the same, making it easy for new devs to navigate.', 'Flexible and progressive.'],
    ['Reactivity', 'Historically used dirty-checking via Zone.js. Now shifting to Signals.', 'Proxy-based reactivity. Inherently highly performant.']
  ]}
/>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Event loop/index.mdx': `---
title: The Event Loop
description: The secret to how JavaScript achieves asynchronous behavior on a single thread.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="The Event Loop">

JavaScript is strictly a single-threaded language. It can only execute one line of code at a time. However, it can perform asynchronous operations (like waiting 5 seconds for a network request) without freezing the entire browser. This magic is handled by the Event Loop.

<Callout icon="info" title="The Golden Rule">
  **Never block the main thread.** If you run a \`while(true)\` loop in JavaScript, the Event Loop gets stuck. The browser cannot render pixels, handle clicks, or process network responses until that loop finishes.
</Callout>

## How it Works

<ComparisonTable 
  headers={['Component', 'Role']}
  rows={[
    ['Call Stack', 'Where your synchronous JS code actually runs. Functions are pushed on and popped off.'],
    ['Web APIs', 'Provided by the Browser (or Node C++). \`setTimeout\` and \`fetch\` happen here, totally separate from the JS thread.'],
    ['Callback Queue (Task Queue)', 'When a Web API finishes (e.g., the 5 seconds are up), it pushes the callback function into this queue.'],
    ['The Event Loop', 'A continuous loop that looks at the Call Stack. If the Call Stack is EMPTY, it takes the first item from the Callback Queue and pushes it onto the Call Stack to execute.']
  ]}
/>

</TechnologyTemplate>
`,
  '45. Parallel & Concurrent Computing/Promises/index.mdx': `---
title: Promises (Async/Await)
description: An object representing the eventual completion or failure of an asynchronous operation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Promises (Async/Await)">

A Promise in JavaScript represents a value that may not be available yet, but will be resolved at some point in the future (or rejected with an error). It is the modern replacement for "Callback Hell".

<Callout icon="success" title="Async / Await">
  Introduced in ES2017, \`async/await\` is syntactic sugar on top of Promises. It allows you to write asynchronous, non-blocking code that *looks* exactly like synchronous, top-to-bottom code.
</Callout>

## The Three States of a Promise

<ComparisonTable 
  headers={['State', 'Description', 'Action']}
  rows={[
    ['Pending', 'The initial state. The operation has not completed yet.', 'Waiting...'],
    ['Fulfilled', 'The operation completed successfully.', 'Triggers the \`.then()\` block.'],
    ['Rejected', 'The operation failed (e.g., Network Error).', 'Triggers the \`.catch()\` block.']
  ]}
/>

## Microtask Queue

Promises have higher priority than standard \`setTimeout\` callbacks. When a Promise resolves, its \`.then()\` callback is pushed to the **Microtask Queue**, which the Event Loop empties completely before looking at the standard Task Queue.

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/DOM-based)/index.mdx': `---
title: DOM-based XSS
description: A form of Cross-Site Scripting where the vulnerability exists in the client-side code rather than the server-side code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="DOM-based XSS">

DOM Based XSS (or as it is called in some texts, "type-0 XSS") is an XSS attack wherein the attack payload is executed as a result of modifying the DOM "environment" in the victim's browser used by the original client side script, so that the client side code runs in an "unexpected" manner.

<Callout icon="error" title="The Danger of innerHTML">
  If your JavaScript reads the URL (\`window.location.hash\`) and directly injects it into the page using \`element.innerHTML = hash;\`, an attacker can send a link with \`#<script>alert(1)</script>\`. The server never even sees the malicious payload; the attack happens entirely within the victim's browser.
</Callout>

## Prevention

<ComparisonTable 
  headers={['Method', 'Description']}
  rows={[
    ['Use textContent', 'Always use \`element.textContent\` instead of \`innerHTML\` when inserting user data. \`textContent\` safely treats the input as raw text, never as executable HTML.'],
    ['Modern Frameworks', 'React, Vue, and Angular automatically escape all variables by default, making DOM XSS extremely difficult unless you explicitly bypass their security (e.g., using React\\'s \`dangerouslySetInnerHTML\`).']
  ]}
/>

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Core Node/Event loop/index.mdx': `---
title: The Node.js Event Loop
description: How Node.js handles asynchronous I/O despite being single-threaded.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="The Node.js Event Loop">

Node.js is an asynchronous event-driven JavaScript runtime. While the browser's Event Loop handles UI events and timers, the Node.js Event Loop is heavily optimized for massive concurrent I/O (File System, Networking, Databases).

<Callout icon="info" title="The libuv Library">
  Node.js relies on a C library called **libuv** to handle the actual multithreading. When you make a database query in Node, the JS thread passes the work to libuv, which maintains a hidden thread pool (default 4 threads) to do the heavy lifting in the background.
</Callout>

## The Phases of the Node Event Loop

Unlike the browser, Node's Event Loop has distinct phases it loops through continuously:

<ComparisonTable 
  headers={['Phase', 'What it executes']}
  rows={[
    ['Timers', 'Executes callbacks scheduled by \`setTimeout()\` and \`setInterval()\`.'],
    ['Pending Callbacks', 'Executes I/O callbacks deferred to the next loop iteration (TCP errors, etc).'],
    ['Poll', 'Retrieves new I/O events; executes I/O related callbacks (almost all incoming requests).'],
    ['Check', 'Executes \`setImmediate()\` callbacks.'],
    ['Close Callbacks', 'Executes close events, e.g., \`socket.on('close', ...)\`']
  ]}
/>

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Core Node/Streams/index.mdx': `---
title: Node.js Streams
description: Objects that let you read data from a source or write data to a destination in continuous fashion.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Node.js Streams">

Streams are a core concept in Node.js for handling reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.

<Callout icon="success" title="The Memory Problem">
  If you need to serve a 10GB video file to a user, \`fs.readFile()\` will attempt to load all 10GB into RAM at once, instantly crashing your server. 
  
  Streams solve this. A \`ReadStream\` reads the file in tiny 64KB chunks and sends them to the user one chunk at a time, keeping your RAM usage practically at zero.
</Callout>

## Types of Streams

<ComparisonTable 
  headers={['Stream Type', 'Description', 'Example']}
  rows={[
    ['Readable', 'Streams from which data can be read.', \`fs.createReadStream()\`, \`http.IncomingMessage\` (request).'],
    ['Writable', 'Streams to which data can be written.', \`fs.createWriteStream()\`, \`http.ServerResponse\` (response).'],
    ['Duplex', 'Streams that are both Readable and Writable.', \`net.Socket\` (TCP connection).'],
    ['Transform', 'Duplex streams that can modify or transform the data as it is written and read.', \`zlib.createGzip\` (compressing data on the fly).']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega9() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega9().catch(console.error)
