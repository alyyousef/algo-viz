import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/Event loop/index.mdx': `---
title: The Event Loop
description: The single-threaded execution model of JavaScript that manages asynchronous callbacks and promises without blocking the main thread.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The Event Loop">

JavaScript is fundamentally **Single-Threaded**. It has exactly one Call Stack and one Memory Heap. 
If a function takes 5 seconds to execute (e.g., a massive TICK1whileTICK1 loop), the entire browser tab freezes for 5 seconds. Users cannot click buttons, and CSS animations stop. 

So how does JavaScript make network requests that take 2 seconds without freezing the browser? The answer is the **Event Loop** and **Web APIs**.

## 1. The Architecture
When you execute TICK1setTimeout(cb, 2000)TICK1, the V8 JavaScript engine does *not* pause for 2 seconds. 
1. V8 hands the timer off to the **Browser Web API** (a separate thread written in C++).
2. V8 pops TICK1setTimeoutTICK1 off the Call Stack and continues running your other code immediately.
3. After 2 seconds, the Web API pushes the TICK1cbTICK1 (callback) into the **Callback Queue** (or Task Queue).

## 2. The Loop Mechanism
The **Event Loop** is a continuously running process with one extremely simple job:
1. Check the Call Stack. Is it empty?
2. If empty, check the Queues. Are there any callbacks waiting?
3. If yes, take the first callback and push it onto the Call Stack for execution.

If the Call Stack is NOT empty, the Event Loop does absolutely nothing. This is why a massive TICK1while(true)TICK1 loop permanently blocks callbacks from ever executing.

## 3. Macrotasks vs Microtasks
There is actually a strict priority system within the queues.

<ComparisonTable 
  headers={['Queue Type', 'Examples', 'Priority']} 
  rows={[
    ['Microtask Queue', 'Promises (TICK1.then()TICK1), TICK1MutationObserverTICK1, TICK1queueMicrotask()TICK1', 'Absolute Highest. The Event Loop will drain every single Microtask before moving on.'],
    ['Macrotask Queue (Task Queue)', 'TICK1setTimeoutTICK1, TICK1setIntervalTICK1, DOM Events (Clicks), Network Callbacks', 'Lowest. The Event Loop only processes ONE Macrotask, and then immediately checks the Microtask queue again.']
  ]} 
/>

<Callout icon="warning" title="Microtask Starvation">
If you write a Promise that continuously resolves and chains another Promise infinitely, you will flood the Microtask Queue. Because the Event Loop refuses to process Macrotasks (like UI rendering or clicks) until the Microtask Queue is completely empty, you will instantly freeze the browser tab, even though the code is fully asynchronous.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/Rendering engines/index.mdx': `---
title: Rendering Engines
description: The core C++ browser components responsible for parsing HTML/CSS, calculating layouts, and painting pixels to the user's screen.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Rendering Engines">

When a browser receives raw bytes over the network, it must convert that data into the beautiful buttons and text you see on screen. This monumental task is handled by the **Rendering Engine** (e.g., Blink for Chrome/Edge, WebKit for Safari, Gecko for Firefox).

## 1. The Critical Rendering Path
The engine follows a strict, mathematical pipeline to draw the screen:

1. **Parse HTML (DOM)**: The engine reads the raw HTML bytes, converts them into characters, identifies tags, and constructs the **Document Object Model (DOM) Tree**.
2. **Parse CSS (CSSOM)**: It concurrently reads the CSS and constructs the **CSS Object Model (CSSOM)**, determining the exact styling rules for every node.
3. **Render Tree**: The engine combines the DOM and CSSOM to create the Render Tree. *Crucially, nodes with TICK1display: noneTICK1 are excluded from the Render Tree.*
4. **Layout (Reflow)**: The engine calculates the exact geometric mathematical position and size (width, height, X/Y coordinates) of every node on the viewport.
5. **Paint**: The engine fills in the pixels (colors, shadows, text) onto separate visual layers.
6. **Composite**: The GPU takes the painted layers and flattens them together onto the screen.

## 2. Reflow vs Repaint
Performance drops happen when your JavaScript forces the Rendering Engine to redo its work.

- **Repaint**: Changing TICK1color: blueTICK1 to TICK1color: redTICK1. The element hasn't moved, so the engine skips Layout and just re-executes Paint and Composite. (Fast).
- **Reflow (Layout Thrashing)**: Changing an element's TICK1widthTICK1, TICK1heightTICK1, or TICK1marginTICK1. The engine must completely recalculate the geometry of that element, *and all of its children*, *and all of its siblings*. This triggers Layout -> Paint -> Composite. (Extremely Slow).

<Callout icon="tip" title="Hardware Acceleration">
To achieve butter-smooth 60fps animations, you should only ever animate TICK1transformTICK1 (e.g., TICK1translateXTICK1) and TICK1opacityTICK1. These properties completely bypass Layout and Paint, and are handed directly to the GPU for the **Composite** step, resulting in zero Main Thread CPU overhead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/Web Workers/index.mdx': `---
title: Web Workers
description: A browser API that allows JavaScript to spawn genuine OS-level background threads, enabling heavy computation without blocking the main UI thread.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Web Workers">

Because JavaScript is single-threaded, running a heavy mathematical computation (like processing a 50MB image, encrypting a massive string, or calculating Fibonacci) will freeze the browser tab. The user cannot scroll, click, or type.

**Web Workers** solve this by allowing you to spawn true, separate OS-level threads.

## 1. The Architectural Sandbox
When you spawn a Web Worker (TICK1new Worker('worker.js')TICK1), it runs in a completely isolated global context. 
Because true multithreading introduces catastrophic Race Conditions, the browser severely restricts the Worker:
- **No DOM Access**: The Worker cannot read or modify the HTML. TICK1document.getElementByIdTICK1 will throw an error.
- **No Window Access**: It has no access to the TICK1windowTICK1 object.

## 2. Message Passing (PostMessage)
Because the Main Thread and the Worker Thread do not share the same physical memory space, they cannot simply read each other's variables. 
They communicate via **Message Passing**.

1. The Main Thread serializes an object (via structured cloning) and sends it using TICK1worker.postMessage(data)TICK1.
2. The Worker receives the data via the TICK1onmessageTICK1 event, does the heavy math, and sends the result back via TICK1self.postMessage(result)TICK1.

## 3. SharedArrayBuffer (Advanced)
Serialization via TICK1postMessageTICK1 is slow for massive datasets (like 500MB of 3D rendering data). 
Modern browsers support **SharedArrayBuffer**, which actually allows the Main Thread and the Worker to physically share the exact same block of RAM. Because this introduces true multithreading Race Conditions, JavaScript introduced TICK1AtomicsTICK1 to enforce Mutex-like synchronization.

<Callout icon="info" title="Dedicated vs Shared Workers">
A standard Web Worker is tied to a single browser tab. If you close the tab, it dies. A **Shared Worker** can be accessed by multiple different tabs of the same website, allowing them to share a single websocket connection or compute pool.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/Service Workers/index.mdx': `---
title: Service Workers
description: A specialized background script acting as a programmable network proxy, enabling offline capabilities, push notifications, and advanced caching.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Service Workers">

A **Service Worker** is a specialized type of Web Worker. While normal Web Workers are used for heavy math, Service Workers are used for **Network Control**. 

They sit physically between your web application and the internet, acting as a programmable proxy server running entirely inside the user's browser.

## 1. The Superpowers
Service Workers are the foundational technology behind **Progressive Web Apps (PWAs)**.
- **Offline Mode**: If the user loses WiFi, the Service Worker can intercept the HTTP request for TICK1index.htmlTICK1 and instantly serve a cached version from the device's hard drive.
- **Push Notifications**: Because the Service Worker runs in the background (even when the tab is closed), it can receive push events from your server and trigger an OS-level notification.
- **Background Sync**: If a user sends a chat message while in a tunnel, the Service Worker holds it in a queue, waiting until the WiFi reconnects to seamlessly dispatch the HTTP request.

## 2. The Lifecycle
Service Workers have an incredibly strict, event-driven lifecycle to prevent breaking the live website.

<ComparisonTable 
  headers={['Phase', 'Action']} 
  rows={[
    ['1. Registration', 'The Main Thread calls TICK1navigator.serviceWorker.register()TICK1.'],
    ['2. Install Event', 'The worker downloads and caches critical static assets (HTML, CSS, Logos).'],
    ['3. Activate Event', 'The worker takes control. This is the perfect time to delete old cache versions to free up disk space.'],
    ['4. Fetch Event', 'The worker actively intercepts every single HTTP request made by the browser.']
  ]} 
/>

<Callout icon="warning" title="HTTPS Requirement">
Because Service Workers have god-tier proxy capabilities (they can intercept and modify every single network request, steal passwords, or inject malicious scripts), browsers strictly mandate that they can **only be registered on secure HTTPS connections** (with an exception for TICK1localhostTICK1 during development).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/Core Web Vitals/index.mdx': `---
title: Core Web Vitals
description: Google's standardized metrics for measuring real-world user experience on the web, directly impacting Search Engine Optimization (SEO) rankings.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Core Web Vitals">

Historically, developers measured performance using "Page Load Time" (when the TICK1window.onloadTICK1 event fired). This was fundamentally flawed. A page might technically finish "loading", but remain a blank white screen for 3 more seconds while JavaScript executed.

In 2020, Google introduced **Core Web Vitals**, a set of three user-centric metrics that measure how fast a page *feels*, not just how fast it loads.

## 1. Largest Contentful Paint (LCP)
**Measures: Loading Performance.**
LCP tracks how long it takes for the largest visual element (usually a hero image or a massive block of text) to physically paint onto the screen.
- **Target**: Under **2.5 seconds**.
- **How to fix**: Preload critical images, use CDNs, minimize Server Response Time (TTFB), and implement Server-Side Rendering (SSR).

## 2. Interaction to Next Paint (INP)
*(Replaced First Input Delay - FID in 2024)*.
**Measures: Interactivity & Responsiveness.**
When a user clicks a button, how long does the browser take to visually update the screen? INP measures the worst latency of *all* interactions across the entire lifespan of the page.
- **Target**: Under **200 milliseconds**.
- **How to fix**: The Main Thread is blocked. You must break up massive JavaScript tasks using TICK1setTimeoutTICK1, Web Workers, or reduce third-party analytics scripts.

## 3. Cumulative Layout Shift (CLS)
**Measures: Visual Stability.**
Have you ever tried to click a link, but an image suddenly loads in, pushing the link down, and you accidentally click an ad? That is a Layout Shift. CLS measures the mathematical distance elements unexpectedly move on screen.
- **Target**: Under **0.1**.
- **How to fix**: Always explicitly declare TICK1widthTICK1 and TICK1heightTICK1 attributes on TICK1<img>TICK1 tags. Reserve space for dynamic ads before they load. Never inject content above existing content.

<Callout icon="tip" title="The SEO Impact">
Core Web Vitals are an official Google Search ranking factor. If your competitor has slightly worse content, but vastly superior Web Vitals, they will outrank you. You can measure your Vitals using Google Lighthouse or the Chrome UX Report (CrUX) API.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/SSR/index.mdx': `---
title: Server-Side Rendering (SSR)
description: The architectural paradigm of generating the final HTML markup on the backend server for every request, prioritizing fast initial load and SEO.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Server-Side Rendering (SSR)">

In the modern SPA (Single Page Application) era, we shifted massive amounts of rendering logic into the browser. However, sending megabytes of JavaScript to a slow mobile phone results in catastrophic loading times. 

**Server-Side Rendering (SSR)** pulls the heavy lifting back to the Backend.

## 1. How It Works
1. The user's browser requests TICK1/dashboardTICK1.
2. The Node.js server intercepts the request.
3. The server queries the database, retrieves the user's data, and executes the React/Vue components *on the server's CPU*.
4. The server generates a fully populated, complete HTML string.
5. The server sends the HTML to the browser.
6. The browser instantly paints the fully formed UI to the screen (Extremely fast LCP).

## 2. The Hydration Phase
The HTML sent by the server is "dead." If the user clicks a button, nothing happens because the JavaScript hasn't loaded yet.
After the HTML is painted, the browser downloads the JavaScript bundle and attaches the event listeners (TICK1onClickTICK1) to the existing HTML elements. This process of bringing the dead HTML to life is called **Hydration**.

## 3. Why Use SSR?
- **Flawless SEO**: Search engine web crawlers (like Googlebot) are notoriously bad at waiting for JavaScript to execute. With SSR, the crawler receives the fully formed HTML immediately, ensuring perfect indexing.
- **Incredible First Contentful Paint (FCP)**: Users on slow 3G connections don't have to wait to download 3MB of JavaScript before seeing the content. The UI appears instantly.

<Callout icon="warning" title="The Server Cost">
SSR is incredibly expensive. In CSR (Client-Side Rendering), your server just serves a static TICK1index.htmlTICK1 from a cheap CDN. With SSR, every single incoming request forces your Node.js server to run heavy React rendering logic and database queries, requiring massive Horizontal Scaling to handle high traffic.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/CSR/index.mdx': `---
title: Client-Side Rendering (CSR)
description: The architecture where the browser downloads a massive JavaScript bundle and dynamically generates the entire UI on the user's local CPU.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Client-Side Rendering (CSR)">

Client-Side Rendering (CSR) is the default architecture for modern Single Page Applications (SPAs) built with raw React, Vue, or Angular. Instead of the server sending HTML, the server delegates all UI generation to the user's browser.

## 1. The Lifecycle
1. The browser requests TICK1/appTICK1.
2. The server instantly returns a nearly empty HTML file: TICK1<div id="root"></div>TICK1 alongside a massive \`<script>\` tag.
3. The browser stares at a blank white screen.
4. The browser downloads the 2MB JavaScript bundle.
5. The browser executes the JavaScript, which boots up React, queries the backend API for JSON data, and finally injects the generated DOM elements into the TICK1#rootTICK1 div.

## 2. SSR vs CSR

<ComparisonTable 
  headers={['Metric', 'Client-Side Rendering (CSR)', 'Server-Side Rendering (SSR)']} 
  rows={[
    ['Initial Load Time (LCP)', 'Extremely Slow. Users stare at a blank screen or spinner while JS downloads.', 'Extremely Fast. Users see the populated HTML instantly.'],
    ['Subsequent Navigation', 'Blazingly Fast. Clicking a link just swaps local React components instantly.', 'Slower. Clicking a link requires a full network round-trip to the server.'],
    ['Server Costs', 'Near Zero. You can host CSR apps for free on AWS S3 or Vercel Edge Networks.', 'High. Requires expensive Node.js CPU compute for every request.'],
    ['SEO Capability', 'Terrible. Crawlers see a blank TICK1<div id="root">TICK1.', 'Perfect. Crawlers see the fully rendered HTML.']
  ]} 
/>

## 3. When to use CSR
Despite its SEO flaws, CSR is the absolute best choice for **Highly Interactive, Authenticated Applications** (e.g., Spotify, Figma, Discord, Admin Dashboards). 
Because these apps are hidden behind a login screen, SEO does not matter. The user only pays the heavy load penalty once upon logging in, and from then on, the app feels like a lightning-fast native desktop application with zero page refreshes.

<Callout icon="tip" title="Code Splitting">
To mitigate the brutal initial load time of CSR, architects use **Code Splitting**. Instead of forcing the user to download the entire 5MB app at launch, Webpack splits the code into smaller chunks. The user only downloads the JavaScript required for the *Login Screen*, and the *Settings Page* JS is lazily downloaded in the background.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/52. Web Performance & Browser Internals/V8/index.mdx': `---
title: V8 Engine
description: Google's ultra-high-performance open-source JavaScript and WebAssembly engine, written in C++, powering Chrome and Node.js.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="V8 Engine">

Historically, JavaScript was a slow, interpreted scripting language meant to make buttons bounce. In 2008, Google released **V8**, fundamentally changing computer science by compiling JavaScript down to raw machine code at runtime, birthing modern Web Apps and Node.js.

## 1. The Just-In-Time (JIT) Pipeline
V8 does not interpret JavaScript line-by-line. It uses a complex dual-compiler architecture known as JIT.

1. **Ignition (The Interpreter)**: V8 parses your JS into an Abstract Syntax Tree (AST) and generates **Bytecode**. Ignition executes this bytecode quickly.
2. **The Profiler**: While Ignition is running, a background thread watches the code. If it notices a specific function is being called thousands of times (a "Hot" function), it flags it.
3. **TurboFan (The Optimizing Compiler)**: TurboFan takes the hot Bytecode, applies extreme mathematical optimizations based on the Profiler's assumptions, and compiles it directly into highly optimized **Machine Code**.

## 2. Hidden Classes & Inline Caching
JavaScript is dynamically typed (TICK1let x = 5; x = "hello"TICK1). This is a nightmare for CPU performance because the memory layout constantly shifts.
V8 solves this using **Hidden Classes (Shapes)**. 
When you create an object TICK1{ name: "John", age: 30 }TICK1, V8 secretly creates a C++ struct mapping the memory offsets. If you create 1,000 identical objects, V8 reuses the exact same Hidden Class. 

**Inline Caching**: If TurboFan sees a function TICK1getAge(user)TICK1 called 50 times with the same Hidden Class, it mathematically hardcodes the memory offset into the machine code, skipping the property lookup entirely.

## 3. Deoptimization (Bailing Out)
What happens if you break TurboFan's assumptions? 
If TurboFan assumed TICK1getAge(user)TICK1 always receives an object with TICK1ageTICK1 as an integer, and you suddenly pass it an object where TICK1ageTICK1 is a string, TurboFan panics. The highly optimized machine code crashes.
V8 throws away the machine code (Deoptimization), falls back to the slow Ignition bytecode, and your application's performance plummets.

<Callout icon="warning" title="Performance Rule">
To keep V8 running at blazing speeds, **write predictable JavaScript**. Always initialize object properties in the same order. Do not dynamically add or delete properties (TICK1delete obj.propTICK1 destroys the Hidden Class). Monomorphic functions (functions that always receive the exact same data shapes) run infinitely faster than polymorphic functions.
</Callout>

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
