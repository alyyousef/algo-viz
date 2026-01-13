import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'JavaScript launches in Netscape Navigator (1995)',
    detail:
      'Brendan Eich builds a scripting language in weeks to add interactivity to the web. It ships as LiveScript, then JavaScript, alongside HTML and CSS.',
  },
  {
    title: 'ECMAScript standardization begins (1997)',
    detail:
      'ECMA-262 codifies the language, enabling multiple engines (SpiderMonkey, V8, JavaScriptCore) to implement the same spec.',
  },
  {
    title: 'AJAX popularizes dynamic web apps (2004-2006)',
    detail:
      'XMLHttpRequest makes async data loading possible, shifting web apps from page reloads to interactive, data-driven experiences.',
  },
  {
    title: 'V8 + Node.js unlock server-side JS (2008-2009)',
    detail:
      'Google’s V8 engine and Node.js bring JavaScript to servers, enabling full-stack JS and a massive tooling ecosystem.',
  },
  {
    title: 'ES6 modernizes the language (2015)',
    detail:
      'let/const, classes, modules, arrow functions, and promises formalize modern JS patterns and unblock large-scale applications.',
  },
  {
    title: 'TypeScript and tooling reshape JS development (2016+)',
    detail:
      'Static typing, bundlers, and frameworks turn JavaScript into an ecosystem for building large, maintainable systems.',
  },
]

const mentalModels = [
  {
    title: 'JavaScript as a language + runtime combo',
    detail:
      'The language is defined by ECMAScript, but behavior also depends on the runtime (browser or Node.js) and its host APIs like DOM or fs.',
  },
  {
    title: 'Single-threaded, event-driven scheduling',
    detail:
      'JavaScript runs one call stack, while tasks are queued in event and microtask queues. Concurrency is handled by callbacks, promises, and async/await.',
  },
  {
    title: 'Objects all the way down',
    detail:
      'Nearly everything is an object or can be boxed into one. Prototypes provide inheritance and shared behavior without classical class hierarchies.',
  },
]

const corePillars = [
  {
    heading: 'Syntax and core constructs',
    bullets: [
      'Functions are first-class values: pass them around, store them, and compose them.',
      'Blocks, lexical scoping, and closures keep state private and enable modular design.',
      'Classes are syntactic sugar over prototypes; instances share behavior via the prototype chain.',
    ],
  },
  {
    heading: 'Type system and coercion',
    bullets: [
      'Dynamic typing means types are attached to values, not variables.',
      'Implicit coercion can be convenient but risky; strict comparisons (===) reduce surprises.',
      'Numbers are IEEE 754 doubles; BigInt handles integer precision beyond 2^53.',
    ],
  },
  {
    heading: 'Modules and packaging',
    bullets: [
      'ES modules use import/export and load asynchronously in browsers.',
      'CommonJS (require/module.exports) is common in Node and legacy tooling.',
      'Bundlers and build tools unify formats, optimize assets, and enable modern syntax.',
    ],
  },
  {
    heading: 'Runtime and APIs',
    bullets: [
      'The DOM and Web APIs (fetch, storage, canvas) power front-end capabilities.',
      'Node.js exposes file system, process, streams, and networking APIs.',
      'APIs are event-driven; listeners and callbacks drive UI and I/O workflows.',
    ],
  },
  {
    heading: 'Asynchrony and concurrency',
    bullets: [
      'Promises model future values; async/await makes async code read like sync.',
      'Microtasks (promises) run before macrotasks (timers, events), impacting ordering.',
      'Workers and Web Workers provide parallelism without blocking the main thread.',
    ],
  },
  {
    heading: 'Tooling ecosystem',
    bullets: [
      'TypeScript, ESLint, Prettier, and tests enforce reliability at scale.',
      'Frameworks (React, Vue, Svelte, Angular) provide structure for complex UIs.',
      'Package managers (npm, pnpm, yarn) coordinate dependency graphs and scripts.',
    ],
  },
]

const runtimeDetails = [
  {
    title: 'Call stack',
    detail:
      'Functions execute top to bottom. A deep stack can cause stack overflows; recursion limits vary by engine.',
  },
  {
    title: 'Event loop',
    detail:
      'After the stack clears, the event loop pulls tasks from the queue. Timers, DOM events, and I/O callbacks all compete here.',
  },
  {
    title: 'Microtask queue',
    detail:
      'Promise callbacks and mutation observers run before the next task. This is why resolved promises often run before setTimeout.',
  },
  {
    title: 'Rendering pipeline',
    detail:
      'In browsers, layout, paint, and compositing are scheduled around JS execution. Heavy JS blocks rendering and affects responsiveness.',
  },
]

const performanceNotes = [
  {
    title: 'JIT optimization and hidden classes',
    detail:
      'Engines create internal shapes for objects. Consistent property order helps inline caches and improves performance.',
  },
  {
    title: 'Garbage collection tradeoffs',
    detail:
      'Automatic memory management reduces leaks but can introduce pauses. Retaining references in closures or caches can keep memory alive.',
  },
  {
    title: 'DOM and layout costs',
    detail:
      'Reading layout values forces reflow. Batch DOM reads and writes to avoid layout thrashing and jank.',
  },
  {
    title: 'Async I/O and backpressure',
    detail:
      'Non-blocking I/O keeps servers responsive, but unbounded concurrency can overload databases or APIs.',
  },
]

const realWorldUses = [
  {
    context: 'Interactive web UIs',
    detail:
      'JavaScript handles events, state, and dynamic rendering for SPAs, dashboards, and data-heavy web applications.',
  },
  {
    context: 'APIs and server logic',
    detail:
      'Node.js powers REST and GraphQL APIs, real-time services, and serverless functions with fast iteration cycles.',
  },
  {
    context: 'Tooling and automation',
    detail:
      'Build pipelines, linters, and CLI tools are often written in JS/TS because it is ubiquitous and easy to distribute.',
  },
  {
    context: 'Cross-platform apps',
    detail:
      'Electron, React Native, and Tauri use JavaScript to ship desktop and mobile apps with shared logic.',
  },
  {
    context: 'Data visualization',
    detail:
      'Libraries like D3, Three.js, and charting frameworks leverage the canvas and WebGL for rich visuals.',
  },
  {
    context: 'Edge and distributed runtimes',
    detail:
      'Deno, Bun, and edge runtimes run JS near users to reduce latency and make deployments portable.',
  },
]

const examples = [
  {
    title: 'Event loop ordering',
    code: `console.log('A')

setTimeout(() => console.log('B'), 0)

Promise.resolve().then(() => console.log('C'))

console.log('D')`,
    explanation:
      'Output: A, D, C, B. The promise resolves into the microtask queue, which runs before the next macrotask (the timer).',
  },
  {
    title: 'Closures for encapsulation',
    code: `function createCounter() {
  let count = 0
  return {
    inc() { count += 1; return count },
    value() { return count }
  }
}

const counter = createCounter()
counter.inc() // 1`,
    explanation:
      'The inner functions keep access to count even after createCounter returns. This is the backbone of privacy in JS.',
  },
  {
    title: 'Async/await with fetch',
    code: `async function loadUser(id) {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) throw new Error('Network error')
  return await response.json()
}`,
    explanation:
      'Async/await wraps promise chains into readable, linear control flow with try/catch for error handling.',
  },
  {
    title: 'Prototype delegation',
    code: `const animal = { speak() { return '...' } }
const dog = Object.create(animal)
dog.speak = function() { return 'woof' }

dog.speak() // 'woof'
Object.getPrototypeOf(dog) === animal // true`,
    explanation:
      'Objects delegate property lookups to their prototype. This is the core of JS inheritance.',
  },
]

const pitfalls = [
  'Using == for comparisons. Coercion rules are complex; prefer === unless you intentionally want coercion.',
  'Accidentally capturing stale values in closures, especially inside loops or async callbacks.',
  'Mutating shared objects in state management, leading to unpredictable UI updates and bugs.',
  'Ignoring promise rejections, which can crash Node processes or create silent browser failures.',
  'Blocking the main thread with heavy computations, which freezes UI and harms responsiveness.',
  'Confusing CommonJS and ES modules, causing import/export errors or duplicated dependencies.',
]

const decisionGuidance = [
  'Choose JavaScript when you need maximum reach in browsers and fast iteration for UI and UX experiments.',
  'Adopt TypeScript for large codebases, shared components, and API-heavy applications to prevent runtime bugs.',
  'Use async/await for I/O-heavy logic; reserve workers for CPU-bound tasks that can block the UI.',
  'Prefer immutable state patterns when building UIs to make rendering predictable and debuggable.',
  'Bundle and tree-shake production builds; ship minimal JS to reduce load time and improve UX.',
]

const advancedInsights = [
  {
    title: 'Stable object shapes',
    detail:
      'Create objects with the same property order and avoid deleting properties. It helps engines keep inline caches hot.',
  },
  {
    title: 'Module graph performance',
    detail:
      'Deep dependency trees increase build time and bundle size. Splitting code and using dynamic imports keep apps fast.',
  },
  {
    title: 'Streaming and backpressure',
    detail:
      'Node streams allow incremental processing of large data. Respect backpressure to avoid memory spikes.',
  },
  {
    title: 'Security boundaries',
    detail:
      'In browsers, the same-origin policy and Content Security Policy limit execution. Understanding them is essential for safe web apps.',
  },
]

const takeaways = [
  'JavaScript is both a language and a runtime ecosystem; real behavior depends on the host environment.',
  'The event loop is the heart of JS concurrency. Mastering it prevents race conditions and UI jank.',
  'Tooling and type systems turn JavaScript into a scalable platform for large apps.',
  'Performance hinges on patterns: stable object shapes, batched DOM work, and async I/O.',
]

export default function JavaScriptPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">JavaScript</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The language that powers interactive web experiences and modern full-stack apps</div>
              <p className="win95-text">
                JavaScript is the only language that runs natively in every browser, and it now powers servers, tooling, and
                cross-platform apps. It blends a flexible syntax with a single-threaded event loop, giving it a unique programming
                model. This page covers how JavaScript works, what makes it powerful, and how to avoid its sharp edges.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                JavaScript is defined by the ECMAScript specification, but its real-world behavior depends on the runtime that hosts it.
                In browsers, JavaScript manipulates the DOM and handles user events. In Node.js, it manages servers, files, and networks.
                The language is dynamic and flexible, so structure and reliability come from patterns, tooling, and discipline.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: core pillars</legend>
            <div className="win95-grid win95-grid-3">
              {corePillars.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Runtime model: event loop and scheduling</legend>
            <div className="win95-grid win95-grid-2">
              {runtimeDetails.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance and scaling considerations</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                JavaScript is fast when you lean into its strengths: asynchronous I/O, predictable object shapes, and minimal DOM work.
                It slows down when you block the main thread or build overly large bundles.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

