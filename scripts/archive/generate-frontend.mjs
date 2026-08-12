import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '17. Frontend Frameworks, Libraries & State Management/React/index.mdx': `---
title: React
description: A JavaScript library for building user interfaces.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="React">

React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.

<Callout icon="info" title="It's a Library, not a Framework">
  React only handles the View layer of an application. It does not dictate how you handle routing, state management, or data fetching. This makes it highly flexible but often requires developers to piece together their own "stack" (e.g., React + React Router + Redux).
</Callout>

## The Virtual DOM

React's claim to fame is the Virtual DOM. Instead of interacting with the browser's slow DOM API directly every time data changes, React creates an in-memory representation of the DOM. 

When state changes, React compares the new Virtual DOM with a snapshot of the old one (a process called **Reconciliation**) and computes the exact minimal set of changes needed to update the real DOM.

<ArchitectureDiagram chart={\`
graph TD
  State[State Changes]
  VDOM1[Virtual DOM\\n(Old Snapshot)]
  VDOM2[Virtual DOM\\n(New Snapshot)]
  Diff[Diffing Algorithm]
  RealDOM[Real Browser DOM]
  
  State --> VDOM2
  VDOM1 -. compared to .-> VDOM2
  VDOM2 --> Diff
  Diff -- Minimal Updates --> RealDOM
\`} />

## Components & Hooks

Modern React is built entirely around functional components and Hooks.

<ComparisonTable 
  headers={['Hook', 'Purpose', 'Common Use Case']}
  rows={[
    ['useState', 'Holds mutable state for a component.', 'Counters, Form inputs, Toggles.'],
    ['useEffect', 'Performs side effects.', 'Fetching data, setting up subscriptions or timers.'],
    ['useMemo', 'Caches a calculated value between renders.', 'Preventing expensive math calculations on every render.'],
    ['useRef', 'Holds a mutable value that does not trigger a re-render.', 'Accessing raw DOM elements (e.g. focusing an input).']
  ]}
/>

## Example: A Functional Component

\`\`\`jsx
import { useState, useEffect } from 'react';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This side effect runs when the component mounts or userId changes
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Dependency array

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-card">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

</TechnologyTemplate>
`,
  '17. Frontend Frameworks, Libraries & State Management/Vue/index.mdx': `---
title: Vue
description: The Progressive JavaScript Framework.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Vue">

Vue is an open-source model–view–viewmodel (MVVM) front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You and is maintained by him and the rest of the active core team members.

<Callout icon="tip" title="The Middle Ground">
  Vue is often described as the perfect middle ground between Angular (highly structured, steep learning curve) and React (highly flexible, relies heavily on JavaScript). Vue provides an elegant templating syntax while remaining incredibly lightweight.
</Callout>

## The Composition API vs Options API

Vue 3 introduced the Composition API, fundamentally changing how Vue components are authored to solve logic-reuse problems found in large Vue 2 codebases.

<ComparisonTable 
  headers={['Paradigm', 'How it works', 'Pros']}
  rows={[
    ['Options API', 'Group logic by option type (data, methods, mounted).', 'Very easy to read for beginners. Highly structured.'],
    ['Composition API', 'Group logic by feature using setup().', 'Excellent TypeScript support and logic reuse (Composables).']
  ]}
/>

## Example: Single-File Component (SFC)

Vue's signature feature is the Single-File Component, containing HTML, JS, and scoped CSS in a single \`.vue\` file.

\`\`\`html
<script setup>
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)
const increment = () => count.value++

// Computed property
const isEven = computed(() => count.value % 2 === 0)
</script>

<template>
  <button @click="increment">
    Count is: {{ count }}
  </button>
  <p>The count is {{ isEven ? 'even' : 'odd' }}</p>
</template>

<style scoped>
button {
  font-weight: bold;
  color: blue;
}
</style>
\`\`\`

## Reactivity System

Unlike React's explicit \`setState\`, Vue uses JavaScript Proxies to automatically track dependencies. If you mutate a ref, Vue instantly knows exactly which components rely on that ref and updates them efficiently.

</TechnologyTemplate>
`,
  '17. Frontend Frameworks, Libraries & State Management/Svelte/index.mdx': `---
title: Svelte
description: Cybernetically enhanced web apps.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Svelte">

Svelte is a free and open-source front end component framework and language created by Rich Harris. Unlike traditional frameworks like React and Vue, which do the bulk of their work in the browser, Svelte shifts that work into a **compile step** that happens when you build your app.

<Callout icon="warning" title="No Virtual DOM">
  Svelte does not use a Virtual DOM. Instead, it compiles your code into tiny, framework-less vanilla JavaScript that surgically updates the DOM exactly when the state changes.
</Callout>

## Why Compile?

By moving the framework to the compiler, Svelte achieves two massive benefits:
1. **Zero Runtime:** There is no heavy "Svelte engine" shipped to the user's browser. Bundle sizes are drastically smaller.
2. **Performance:** Updating the DOM via compiled direct DOM references is generally faster than running a Virtual DOM diffing algorithm.

<ArchitectureDiagram chart={\`
graph TD
  Source[Svelte Component\\n(.svelte)]
  Compiler[Svelte Compiler\\n(Build Step)]
  
  subgraph Browser
    Vanilla[Pure Vanilla JS\\ndocument.createElement()]
    DOM[Real Browser DOM]
  end
  
  Source --> Compiler
  Compiler -- Output --> Vanilla
  Vanilla -- Surgical Updates --> DOM
\`} />

## Example: Built-in Reactivity

Svelte's syntax is arguably the most concise of all modern frameworks. State is just a standard JavaScript variable (using \`let\`), and reactivity is triggered on assignment.

\`\`\`html
<script>
  let count = 0;
  
  // A reactive statement (computed property)
  $: doubled = count * 2;

  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>

<style>
  button {
    background: #ff3e00;
    color: white;
  }
</style>
\`\`\`

</TechnologyTemplate>
`,
  '17. Frontend Frameworks, Libraries & State Management/Next.js/index.mdx': `---
title: Next.js
description: The React Framework for the Web.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Next.js">

Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering (SSR) and generating static websites. 

<Callout icon="tip" title="Solving React's SEO Problem">
  Traditional React apps render completely in the browser (Client-Side Rendering), meaning search engine bots often see a blank HTML page. Next.js pre-renders the HTML on the server, ensuring instant loads and perfect SEO.
</Callout>

## The App Router (Next.js 13+)

Modern Next.js utilizes the **App Router**, which introduces React Server Components (RSC) to the ecosystem.

<ComparisonTable 
  headers={['Component Type', 'Where it Runs', 'Capabilities']}
  rows={[
    ['Server Component (Default)', 'Runs only on the server.', 'Can connect directly to databases. Zero JS shipped to client. Cannot use \`useState\` or \`onClick\`.'],
    ['Client Component', 'Runs on server (for initial HTML) and hydrates on client.', 'Full interactivity (\`useState\`, \`useEffect\`). Requires \`"use client"\` directive.']
  ]}
/>

## Rendering Strategies

Next.js is famous for allowing you to mix and match rendering strategies on a per-route basis.

<ArchitectureDiagram chart={\`
graph TD
  Route[Next.js Route]
  
  SSG[Static Site Generation (SSG)\\nRendered at Build Time]
  SSR[Server-Side Rendering (SSR)\\nRendered per Request]
  ISR[Incremental Static Regeneration (ISR)\\nRe-rendered in background]
  
  Route -. can be .-> SSG
  Route -. can be .-> SSR
  Route -. can be .-> ISR
  
  SSG -- Cached globally --> CDN
  ISR -- Cached globally --> CDN
  SSR -- Sent directly --> Browser
\`} />

## Example: Server Component Data Fetching

Because Server Components run securely on the server, you can write async components and fetch data directly without needing \`useEffect\` or an external API endpoint.

\`\`\`jsx
// app/users/page.tsx
// This is a Server Component by default

import db from '@/lib/db';

export default async function UsersPage() {
  // Fetch directly from the database!
  const users = await db.query('SELECT * FROM users');

  return (
    <main>
      <h1>User Directory</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

</TechnologyTemplate>
`,
  '16. JavaScript Ecosystem & Tooling/Webpack/index.mdx': `---
title: Webpack
description: A static module bundler for modern JavaScript applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Webpack">

Webpack is a static module bundler for modern JavaScript applications. When Webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

<Callout icon="warning" title="The Vite Era">
  While Webpack was the undisputed king of bundlers for nearly a decade, it is notoriously slow and difficult to configure. Modern projects increasingly use **Vite**, which leverages native ES Modules to start instantly, regardless of project size.
</Callout>

## How it works

Browsers don't natively understand JSX, TypeScript, SASS, or images imported as variables. Webpack uses **Loaders** to translate these files into valid browser-compatible JavaScript and CSS.

<ArchitectureDiagram chart={\`
graph LR
  Index[index.js]
  App[App.tsx]
  Style[styles.scss]
  Logo[logo.svg]
  
  Webpack{Webpack\\n+ Loaders}
  
  BundleJS[main.bundle.js]
  BundleCSS[styles.bundle.css]
  
  Index --> Webpack
  App --> Webpack
  Style --> Webpack
  Logo --> Webpack
  
  Webpack -- Transpiles & Bundles --> BundleJS
  Webpack -- Extracts --> BundleCSS
\`} />

## Core Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Entry', 'The starting point(s) where Webpack begins building its internal dependency graph (e.g., \`src/index.js\`).'],
    ['Output', 'Where Webpack emits the bundles it creates and how to name them (e.g., \`dist/bundle.js\`).'],
    ['Loaders', 'Transform files before they are added to the bundle (e.g., \`babel-loader\`, \`sass-loader\`).'],
    ['Plugins', 'Perform wider tasks like bundle optimization, asset management, and injection of environment variables.']
  ]}
/>

## Example Configuration

A basic \`webpack.config.js\` that transpiles JSX using Babel and extracts CSS.

\`\`\`javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Transpile React/JSX
      },
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS to file
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' })
  ],
};
\`\`\`

</TechnologyTemplate>
`,
}

async function generateFrontend() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateFrontend().catch(console.error)
