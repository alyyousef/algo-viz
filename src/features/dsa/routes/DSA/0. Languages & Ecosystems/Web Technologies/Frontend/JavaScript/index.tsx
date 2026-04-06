import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
      "Google's V8 engine and Node.js bring JavaScript to servers, enabling full-stack JS and a massive tooling ecosystem.",
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
  {
    title: 'ES modules and modern browsers converge (2017+)',
    detail:
      'Native modules, async/await, and better tooling make JS more reliable and scalable in the browser.',
  },
  {
    title: 'Edge runtimes and new engines (2020+)',
    detail:
      'Deno, Bun, and edge runtimes extend JavaScript into new deployment models with faster cold starts.',
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
  {
    title: 'State flows through references',
    detail:
      'Objects and arrays are passed by reference; mutation affects all holders unless you copy intentionally.',
  },
  {
    title: 'The DOM is a separate model',
    detail:
      'DOM APIs are not part of the language spec; they are host objects that can be slow or async.',
  },
  {
    title: 'The module graph is the app',
    detail:
      'Imports define dependency boundaries and load order; bundling and splitting shape runtime cost.',
  },
]

const corePillars = [
  {
    heading: 'Syntax and core constructs',
    bullets: [
      'Functions are first-class values: pass them around, store them, and compose them.',
      'Blocks, lexical scoping, and closures keep state private and enable modular design.',
      'Classes are syntactic sugar over prototypes; instances share behavior via the prototype chain.',
      'Destructuring, default parameters, and rest/spread reduce boilerplate.',
    ],
  },
  {
    heading: 'Type system and coercion',
    bullets: [
      'Dynamic typing means types are attached to values, not variables.',
      'Implicit coercion can be convenient but risky; strict comparisons (===) reduce surprises.',
      'Numbers are IEEE 754 doubles; BigInt handles integer precision beyond 2^53.',
      'Truthy and falsy values drive control flow; be explicit when correctness matters.',
    ],
  },
  {
    heading: 'Modules and packaging',
    bullets: [
      'ES modules use import/export and load asynchronously in browsers.',
      'CommonJS (require/module.exports) is common in Node and legacy tooling.',
      'Bundlers and build tools unify formats, optimize assets, and enable modern syntax.',
      'Tree-shaking removes unused exports to reduce bundle size.',
    ],
  },
  {
    heading: 'Runtime and APIs',
    bullets: [
      'The DOM and Web APIs (fetch, storage, canvas) power front-end capabilities.',
      'Node.js exposes file system, process, streams, and networking APIs.',
      'APIs are event-driven; listeners and callbacks drive UI and I/O workflows.',
      'Permissions and origin rules limit what browser code can access.',
    ],
  },
  {
    heading: 'Asynchrony and concurrency',
    bullets: [
      'Promises model future values; async/await makes async code read like sync.',
      'Microtasks (promises) run before macrotasks (timers, events), impacting ordering.',
      'Workers and Web Workers provide parallelism without blocking the main thread.',
      'AbortController cancels fetches and long-running async work.',
    ],
  },
  {
    heading: 'Tooling ecosystem',
    bullets: [
      'TypeScript, ESLint, Prettier, and tests enforce reliability at scale.',
      'Frameworks (React, Vue, Svelte, Angular) provide structure for complex UIs.',
      'Package managers (npm, pnpm, yarn) coordinate dependency graphs and scripts.',
      'Vite and modern bundlers speed up dev builds and production output.',
    ],
  },
  {
    heading: 'Browser platform APIs',
    bullets: [
      'fetch and streams enable efficient network and data handling.',
      'Storage APIs (localStorage, IndexedDB) cover persistence needs.',
      'Service workers power offline support and caching strategies.',
    ],
  },
  {
    heading: 'Testing and reliability',
    bullets: [
      'Unit, integration, and e2e tests validate logic and UI behavior.',
      'Runtime error boundaries and logging help catch production issues.',
      'Feature flags and gradual rollouts reduce release risk.',
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
  {
    title: 'Task prioritization',
    detail:
      'Different queues (microtasks, timers, rendering) influence responsiveness; long tasks delay everything.',
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
  {
    title: 'Bundle size and parse time',
    detail:
      'Large bundles slow down parse and execution on low-end devices; split code and lazy-load routes.',
  },
  {
    title: 'Long tasks and responsiveness',
    detail:
      'Work over 50ms blocks input; break heavy loops into chunks or move work to workers.',
  },
]

const languageMechanics = [
  {
    title: 'Scope and hoisting',
    detail:
      'var is function-scoped and hoisted; let/const are block-scoped with temporal dead zone behavior.',
  },
  {
    title: 'this binding rules',
    detail:
      'this depends on call-site; arrow functions capture lexical this and avoid rebinding surprises.',
  },
  {
    title: 'Strict mode',
    detail:
      'Strict mode removes silent failures and changes defaults like this in functions.',
  },
  {
    title: 'Equality semantics',
    detail:
      'Use === for predictable comparisons; Object.is handles edge cases like NaN.',
  },
]

const browserPlatform = [
  {
    title: 'DOM and events',
    detail:
      'The DOM provides document structure; events capture user input and lifecycle signals.',
  },
  {
    title: 'Network and storage',
    detail:
      'fetch, WebSocket, and IndexedDB cover async data needs and local persistence.',
  },
  {
    title: 'Graphics and media',
    detail:
      'Canvas, WebGL, audio, and video APIs enable rich interactive experiences.',
  },
  {
    title: 'Workers and performance',
    detail:
      'Web Workers and Worklets run compute-heavy tasks off the main thread.',
  },
]

const securityNotes = [
  {
    title: 'Same-origin policy',
    detail:
      'Browser security isolates origins; CORS controls cross-origin access.',
  },
  {
    title: 'XSS prevention',
    detail:
      'Escape user input, avoid innerHTML when possible, and use CSP to limit script sources.',
  },
  {
    title: 'Dependency hygiene',
    detail:
      'Audit packages and lock versions to avoid supply chain issues.',
  },
  {
    title: 'Permissions and APIs',
    detail:
      'Powerful APIs (clipboard, geolocation) require user consent and careful UX.',
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
  {
    context: 'Automation and scripting',
    detail:
      'Node scripts automate builds, migrations, and DevOps workflows.',
  },
  {
    context: 'Real-time collaboration',
    detail:
      'WebSockets and CRDT libraries enable shared cursors, documents, and live editing.',
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
  {
    title: 'Safe object cloning',
    code: `const original = { user: { id: 1 }, tags: ['a'] }
const copy = structuredClone(original)

copy.user.id = 2
original.user.id // 1`,
    explanation:
      'structuredClone creates deep copies without shared references in modern runtimes.',
  },
  {
    title: 'Module import pattern',
    code: `// math.js
export const add = (a, b) => a + b

// app.js
import { add } from './math.js'
add(2, 3) // 5`,
    explanation:
      'ES modules provide explicit dependencies and enable tree-shaking.',
  },
  {
    title: 'Abortable async work',
    code: `const controller = new AbortController()

fetch('/api/data', { signal: controller.signal })
  .catch((err) => console.error(err.name))

controller.abort()`,
    explanation:
      'AbortController cancels fetch requests and prevents stale work from completing.',
  },
]

const pitfalls = [
  'Using == for comparisons. Coercion rules are complex; prefer === unless you intentionally want coercion.',
  'Accidentally capturing stale values in closures, especially inside loops or async callbacks.',
  'Mutating shared objects in state management, leading to unpredictable UI updates and bugs.',
  'Ignoring promise rejections, which can crash Node processes or create silent browser failures.',
  'Blocking the main thread with heavy computations, which freezes UI and harms responsiveness.',
  'Confusing CommonJS and ES modules, causing import/export errors or duplicated dependencies.',
  'Leaking memory via long-lived listeners or global caches.',
  'Shipping large bundles without code splitting or tree-shaking.',
]

const decisionGuidance = [
  'Choose JavaScript when you need maximum reach in browsers and fast iteration for UI and UX experiments.',
  'Adopt TypeScript for large codebases, shared components, and API-heavy applications to prevent runtime bugs.',
  'Use async/await for I/O-heavy logic; reserve workers for CPU-bound tasks that can block the UI.',
  'Prefer immutable state patterns when building UIs to make rendering predictable and debuggable.',
  'Bundle and tree-shake production builds; ship minimal JS to reduce load time and improve UX.',
  'Favor native platform APIs over heavy libraries when they meet your needs.',
  'Use strict linting and formatting to reduce variability across teams.',
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
  {
    title: 'Long task monitoring',
    detail:
      'The Performance API helps track main-thread blocking and interaction latency.',
  },
  {
    title: 'Interop with WebAssembly',
    detail:
      'Wasm complements JS for heavy computation while JS manages UI and orchestration.',
  },
]

const takeaways = [
  'JavaScript is both a language and a runtime ecosystem; real behavior depends on the host environment.',
  'The event loop is the heart of JS concurrency. Mastering it prevents race conditions and UI jank.',
  'Tooling and type systems turn JavaScript into a scalable platform for large apps.',
  'Performance hinges on patterns: stable object shapes, batched DOM work, and async I/O.',
  'Security, accessibility, and reliability depend on disciplined patterns and testing.',
  'Modern APIs and modules reduce the need for heavy frameworks in many cases.',
]

const debuggingWorkflow = [
  {
    title: 'Use DevTools',
    detail:
      'Inspect network, sources, and performance profiles to find hot paths and errors.',
  },
  {
    title: 'Log intentionally',
    detail:
      'Structured logs and error boundaries make production issues diagnosable.',
  },
  {
    title: 'Reproduce with tests',
    detail:
      'Capture bugs in unit or integration tests to prevent regressions.',
  },
  {
    title: 'Measure performance',
    detail:
      'Profile long tasks and bundle sizes before and after changes.',
  },
]

const productionChecklist = [
  {
    title: 'Performance',
    detail:
      'Code-split, tree-shake, and keep the main thread responsive.',
  },
  {
    title: 'Reliability',
    detail:
      'Handle errors, timeouts, and retries for network operations.',
  },
  {
    title: 'Security',
    detail:
      'Use CSP, sanitize inputs, and keep dependencies patched.',
  },
  {
    title: 'Observability',
    detail:
      'Capture errors and metrics to track real user impact.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Syntax, types, functions, and objects.',
  },
  {
    step: 'Browser APIs',
    detail: 'DOM, events, fetch, storage, and media.',
  },
  {
    step: 'Asynchrony',
    detail: 'Promises, async/await, and the event loop.',
  },
  {
    step: 'Production JS',
    detail: 'Tooling, performance, security, and testing.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'Event Loop', definition: 'Scheduler that processes tasks and callbacks in JavaScript runtimes.' },
  { term: 'Microtask', definition: 'High-priority queue for Promise callbacks and async continuations.' },
  { term: 'Macrotask', definition: 'Queue for timers, events, and I/O callbacks.' },
  { term: 'Closure', definition: 'Function retaining access to lexical scope after outer function returns.' },
  { term: 'Prototype Chain', definition: 'Delegation path used for property lookup on objects.' },
  { term: 'Hoisting', definition: 'Compile-time binding behavior where declarations are processed before execution.' },
  { term: 'Tree-shaking', definition: 'Build optimization removing unused module exports.' },
  { term: 'JIT', definition: 'Just-in-time compilation strategy used by engines like V8.' },
  { term: 'Structured Clone', definition: 'Built-in deep copy algorithm for transferable/serializable data.' },
  { term: 'CSP', definition: 'Content Security Policy restricting script and resource execution origins.' },
]

const jsHelpStyles = `
.js98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.js98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.js98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.js98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.js98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.js98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.js98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.js98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.js98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.js98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.js98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.js98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.js98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.js98-toc-list li {
  margin: 0 0 8px;
}

.js98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.js98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.js98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.js98-section {
  margin: 0 0 22px;
}

.js98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.js98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.js98-content p,
.js98-content li,
.js98-content th,
.js98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.js98-content p {
  margin: 0 0 10px;
}

.js98-content ul,
.js98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.js98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.js98-content th,
.js98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.js98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.js98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.js98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .js98-main {
    grid-template-columns: 1fr;
  }

  .js98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-mechanics', label: 'Language Mechanics' },
    { id: 'core-platform', label: 'Browser Platform APIs' },
    { id: 'core-runtime', label: 'Runtime and Scheduling' },
    { id: 'core-performance', label: 'Performance and Scaling' },
    { id: 'core-security', label: 'Security and Safety' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function JavaScriptPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `JavaScript (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'JavaScript',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="js98-help-page">
      <style>{jsHelpStyles}</style>
      <div className="js98-window" role="presentation">
        <header className="js98-titlebar">
          <span className="js98-title-text">JavaScript</span>
          <div className="js98-title-controls">
            <button className="js98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="js98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="js98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`js98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="js98-main">
          <aside className="js98-toc" aria-label="Table of contents">
            <h2 className="js98-toc-title">Contents</h2>
            <ul className="js98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="js98-content">
            <h1 className="js98-doc-title">JavaScript</h1>
            <p>
              JavaScript is the only language that runs natively in every browser, and it now powers servers, tooling, and
              cross-platform apps. It blends a flexible syntax with a single-threaded event loop, giving it a unique programming
              model. This page covers how JavaScript works and how to avoid its sharp edges.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="js98-section">
                  <h2 className="js98-heading">Overview</h2>
                  <p>
                    JavaScript is defined by ECMAScript, but real behavior depends on the host runtime. In browsers, JavaScript
                    manipulates the DOM and handles user events. In Node.js, it manages servers, files, and networks.
                  </p>
                </section>
                <hr className="js98-divider" />
                <section id="bp-history" className="js98-section">
                  <h2 className="js98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="js98-section">
                  <h2 className="js98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="js98-section">
                  <h2 className="js98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-pillars" className="js98-section">
                  <h2 className="js98-heading">How It Works: Core Pillars</h2>
                  {corePillars.map((block) => (
                    <div key={block.heading}>
                      <h3 className="js98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-mechanics" className="js98-section">
                  <h2 className="js98-heading">Language Mechanics</h2>
                  {languageMechanics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-platform" className="js98-section">
                  <h2 className="js98-heading">Browser Platform APIs</h2>
                  {browserPlatform.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-runtime" className="js98-section">
                  <h2 className="js98-heading">Runtime Model: Event Loop and Scheduling</h2>
                  {runtimeDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="js98-section">
                  <h2 className="js98-heading">Performance and Scaling Considerations</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    JavaScript is fast when you lean into asynchronous I/O, predictable object shapes, and minimal DOM work.
                    It slows down when you block the main thread or ship oversized bundles.
                  </p>
                </section>
                <section id="core-security" className="js98-section">
                  <h2 className="js98-heading">Security and Safety</h2>
                  {securityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-uses" className="js98-section">
                  <h2 className="js98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging" className="js98-section">
                  <h2 className="js98-heading">Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="js98-section">
                  <h2 className="js98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-production" className="js98-section">
                  <h2 className="js98-heading">Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="js98-section">
                  <h2 className="js98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="js98-section">
                  <h2 className="js98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning" className="js98-section">
                  <h2 className="js98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="js98-section">
                <h2 className="js98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="js98-subheading">{example.title}</h3>
                    <div className="js98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="js98-section">
                <h2 className="js98-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
