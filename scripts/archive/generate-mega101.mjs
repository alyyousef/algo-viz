import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '52. Web Performance & Browser Internals/Chromium/index.mdx': `---
title: Chromium
description: An open-source web browser project from which Google Chrome draws its source code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Chromium"
  subtitle="The engine of the modern web"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Chromium_Logo.svg/512px-Chromium_Logo.svg.png"
  description="Chromium is the colossal, open-source C++ project that powers Google Chrome, Microsoft Edge, Brave, Opera, Arc, and the entire Electron framework."
  yearCreated={2008}
  creator="Google"
  isOpenSource={true}
  websiteUrl="https://www.chromium.org/Home"
>

To understand web development, you must mathematically understand that "Chrome" is not a browser. **Chrome is just a proprietary UI wrapper around Chromium.**

Because Chromium is open-source, Microsoft mathematically gave up on building their own browser engine (EdgeHTML) in 2020 and completely replaced it with Chromium. Today, Chromium physically controls over 70% of global internet rendering.

<Callout icon="info" title="The Architecture">
  Chromium is not a single monolith. It is an architectural combination of two massive mathematical engines:
  1. **Blink:** The Rendering Engine (parses HTML/CSS and paints pixels).
  2. **V8:** The JavaScript Engine (compiles and executes JS).
</Callout>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Safari/index.mdx': `---
title: Safari
description: A graphical web browser developed by Apple.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Safari"
  subtitle="The Apple monopoly"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/512px-Safari_browser_logo.svg.png"
  description="Safari is the default web browser for all Apple operating systems. It is physically powered by the WebKit rendering engine and the JavaScriptCore engine."
  yearCreated={2003}
  creator="Apple"
  isOpenSource={false}
  websiteUrl="https://www.apple.com/safari/"
>

Safari occupies a mathematically unique position in web development. 

Because Apple strictly enforced a policy that *all* browsers on iOS (even Chrome for iOS and Firefox for iOS) must physically use the underlying Safari WebKit engine, WebKit essentially held a mathematical monopoly on the entire mobile web ecosystem for over a decade.

<Callout icon="warning" title="The New Internet Explorer?">
  Because Safari's release cycle is tied directly to macOS/iOS OS updates (rather than Chromium's fast 4-week release cycle), Safari is often biologically slower to implement new HTML/CSS standards, leading frustrated web developers to occasionally label it "The new Internet Explorer."
</Callout>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Firefox/index.mdx': `---
title: Firefox
description: A free and open-source web browser developed by the Mozilla Foundation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Firefox"
  subtitle="The last independent web engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/512px-Firefox_logo%2C_2019.svg.png"
  description="Firefox is the only major web browser that is not mathematically derived from Chromium or WebKit. It is the final guardian against an absolute Google/Apple engine monopoly."
  yearCreated={2004}
  creator="Mozilla"
  isOpenSource={true}
  websiteUrl="https://www.mozilla.org/en-US/firefox/new/"
>

Firefox is physically powered by the **Gecko** rendering engine and the **SpiderMonkey** JavaScript engine.

In 2017, Mozilla released **Firefox Quantum**, which mathematically rewrote massive portions of the browser in **Rust**, introducing unparalleled parallel CSS rendering (Stylo) to compete with Google Chrome's dominance.

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Rendering engines/index.mdx': `---
title: Rendering Engines
description: Software that draws text and images on the screen.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rendering Engines">

If you download an HTML file, it is just mathematically raw text. How does that text biologically become a physical, clickable button on your screen?

The **Rendering Engine** is the architectural heart of the browser responsible for the "Critical Rendering Path".

<Callout icon="tip" title="The Critical Rendering Path">
  1. **Parse HTML:** It converts HTML string into a physical memory tree called the **DOM** (Document Object Model).
  2. **Parse CSS:** It converts CSS strings into the **CSSOM** (CSS Object Model).
  3. **Render Tree:** It mathematically combines the DOM and CSSOM to calculate exactly which elements are visible.
  4. **Layout (Reflow):** It calculates the exact X/Y pixel coordinates of every node.
  5. **Paint:** It physically draws the pixels onto the computer monitor.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Blink/index.mdx': `---
title: Blink
description: The rendering engine used by Chromium.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Blink"
  subtitle="The Chromium rendering heart"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Chromium_Logo.svg/512px-Chromium_Logo.svg.png"
  description="Blink is the rendering engine developed by Google as part of the Chromium project. It mathematically parses HTML/CSS and calculates layout."
  yearCreated={2013}
  creator="Google"
  isOpenSource={true}
  websiteUrl="https://www.chromium.org/blink"
>

In the early days of Chrome, Google actually used Apple's WebKit engine. However, as Chrome's multi-process architecture became mathematically complex, Google forked WebKit in 2013 to create **Blink**.

<Callout icon="success" title="Multi-Process Architecture">
  Blink's greatest architectural advantage is how it physically isolates tabs. 
  
  If you open 10 tabs in Chrome, Blink mathematically spawns 10 separate OS-level rendering processes. If an infinite CSS animation crashes Tab 1, it is biologically impossible for it to crash Tab 2, ensuring unparalleled browser stability.
</Callout>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/WebKit/index.mdx': `---
title: WebKit
description: The web browser engine used by Safari, Mail, App Store, and many other macOS, iOS, and Linux applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="WebKit"
  subtitle="The Apple Engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/512px-Safari_browser_logo.svg.png"
  description="WebKit is the open-source rendering engine developed primarily by Apple. It mathematically powers all web views on iOS devices."
  yearCreated={2001}
  creator="Apple"
  isOpenSource={true}
  websiteUrl="https://webkit.org/"
>

WebKit was originally a mathematical fork of the KHTML engine from KDE Linux. 

Apple famously optimized WebKit to be incredibly biologically efficient regarding battery life and memory usage on mobile devices. Because Apple forces all iOS applications (including in-app browsers in Facebook and Twitter) to use \`WKWebView\`, WebKit is the undisputed king of mobile web rendering.

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Gecko/index.mdx': `---
title: Gecko
description: The browser engine developed by Mozilla.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Gecko"
  subtitle="The Mozilla Engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/512px-Firefox_logo%2C_2019.svg.png"
  description="Gecko is the open-source layout engine used by Firefox. It is the only mathematical counterweight preventing a complete Chromium/WebKit global duopoly."
  yearCreated={1997}
  creator="Mozilla"
  isOpenSource={true}
  websiteUrl="https://developer.mozilla.org/en-US/docs/Mozilla/Gecko"
>

Gecko was originally written for Netscape Navigator in 1997. It is a massive, mathematically complex C++ and Rust codebase.

<Callout icon="info" title="Project Quantum">
  In 2017, Mozilla integrated "Quantum", replacing major C++ components of Gecko with **Rust**. 
  
  Because Rust guarantees thread-safety, Gecko can mathematically calculate the CSS styles for hundreds of DOM elements simultaneously across multiple CPU cores, something that older single-threaded engines struggled to do without crashing.
</Callout>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/JavaScript engines/index.mdx': `---
title: JavaScript Engines
description: A software component that executes JavaScript code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JavaScript Engines">

While the **Rendering Engine** (Blink/WebKit) handles the DOM and CSS, the **JavaScript Engine** is mathematically responsible for executing \`console.log\` and \`fetch()\`.

In the 1990s, JS engines were simple **Interpreters**. They read the code line-by-line and executed it slowly. This was biologically fine when JS was only used for form validation.

<Callout icon="warning" title="JIT Compilation">
  Modern JavaScript Engines (like V8) are **Just-In-Time (JIT) Compilers**.
  
  They do not just interpret the code. As the code is running, a mathematical "Profiler" watches the functions. If a function is called 10,000 times, the engine dynamically compiles that specific function into raw, hyper-optimized machine code directly in RAM, achieving execution speeds rivaling C++.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/V8/index.mdx': `---
title: V8
description: Google's open source high-performance JavaScript and WebAssembly engine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="V8"
  subtitle="The engine that created Node.js"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/V8_JavaScript_engine_logo.svg/512px-V8_JavaScript_engine_logo.svg.png"
  description="V8 is the Google-developed JavaScript engine inside Chromium. It is so mathematically powerful that Ryan Dahl ripped it out of the browser and used it to invent Node.js."
  yearCreated={2008}
  creator="Google (Lars Bak)"
  isOpenSource={true}
  websiteUrl="https://v8.dev/"
>

When Google launched Chrome in 2008, their killer feature was Google Maps. But Google Maps required executing massive amounts of JavaScript, and existing browsers were biologically too slow.

Google hired Lars Bak, a virtual machine genius, to build **V8**. V8 introduced mathematical "Hidden Classes" and "Inline Caching" to dynamically compile JS into machine code. 

V8 is the reason JavaScript went from a toy browser language to a language capable of powering enterprise backend servers via Node.js.

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/SpiderMonkey/index.mdx': `---
title: SpiderMonkey
description: The first JavaScript engine, written by Brendan Eich at Netscape Communications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="SpiderMonkey"
  subtitle="The original JavaScript engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/512px-Firefox_logo%2C_2019.svg.png"
  description="SpiderMonkey is the very first JavaScript engine ever created. Today, it serves as the highly advanced JIT-compiling engine inside Mozilla Firefox."
  yearCreated={1995}
  creator="Brendan Eich (Netscape)"
  isOpenSource={true}
  websiteUrl="https://spidermonkey.dev/"
>

When Brendan Eich invented JavaScript in 10 days in 1995, he simultaneously wrote SpiderMonkey to physically execute it inside Netscape Navigator.

Today, SpiderMonkey features a highly advanced mathematical architecture with multiple tiers of JIT compilers (the "Baseline" compiler for fast startup, and "IonMonkey" for deep, highly optimized machine-code generation).

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Event loop/index.mdx': `---
title: Event loop
description: The secret behind JavaScript's asynchronous concurrency model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Event Loop">

JavaScript is mathematically **Single-Threaded**. It only has one physical Call Stack. It can only execute one line of code at a time.

So, if JS is single-threaded, how can it execute a \`setTimeout\` for 5 seconds, whilst simultaneously rendering a UI animation, without freezing the browser? 

The answer is the **Event Loop**.

<Callout icon="success" title="The Architecture">
  1. **The Call Stack:** Executes your \`console.log\` statements.
  2. **Web APIs:** When you call \`fetch()\`, the Call Stack mathematically hands the network request off to the Browser's C++ threads (Web APIs) and continues executing.
  3. **The Callback Queue:** When the HTTP response returns 2 seconds later, the Web API pushes the \`.then()\` callback into the Queue.
  4. **The Event Loop:** This is an infinite biological loop. It constantly asks: *"Is the Call Stack empty?"* If yes, it grabs the first item from the Callback Queue and pushes it onto the Call Stack.
</Callout>

Understanding the Event Loop is the most mathematically critical requirement for senior JavaScript engineering.

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Web Workers/index.mdx': `---
title: Web Workers
description: A simple means for web content to run scripts in background threads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Workers">

Because JavaScript is single-threaded, if you attempt to calculate the 50,000th Fibonacci number on the main thread, the Event Loop mathematically freezes. The user cannot click buttons, and the screen biologically locks up.

**Web Workers** solve this by allowing you to spawn true, physical OS-level background threads.

<Callout icon="warning" title="No DOM Access">
  A Web Worker runs in a completely isolated mathematical memory space. 
  
  Because it is a separate thread, it is biologically banned from touching the \`document\` (DOM). It cannot update the UI directly. Instead, the Main Thread and the Worker communicate exclusively by sending mathematical string messages back and forth using \`postMessage()\`.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Service Workers/index.mdx': `---
title: Service Workers
description: Scripts that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Service Workers">

A **Service Worker** is a specialized type of Web Worker designed to act as a mathematical **Network Proxy** between the browser and the internet.

Service Workers are the architectural foundation of **PWAs (Progressive Web Apps)**.

<Callout icon="tip" title="Offline Support">
  Because the Service Worker mathematically intercepts every single \`fetch()\` request leaving the browser, it can return cached responses even if the computer's Wi-Fi is physically turned off. 
  
  This allows web developers to build websites that load instantly offline, intercept push notifications, and sync data in the background, making web apps biologically indistinguishable from native iOS/Android apps.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Memory profiling in browsers/index.mdx': `---
title: Memory profiling in browsers
description: The process of diagnosing memory leaks and understanding memory usage in web applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Memory Profiling">

JavaScript uses **Garbage Collection**. If a variable is no longer mathematically reachable by the root application, the V8 engine automatically deletes it from RAM.

However, if a React developer accidentally attaches an \`addEventListener\` to the \`window\` and forgets to call \`removeEventListener\` when the component unmounts, the DOM node is mathematically trapped in memory forever. This is a **Memory Leak**.

<Callout icon="warning" title="Heap Snapshots">
  To fix this, developers open Chrome DevTools, navigate to the **Memory** tab, and take a **Heap Snapshot**. 
  
  A Heap Snapshot mathematically freezes the V8 engine and dumps the exact byte-size of every single object, array, and DOM node currently in RAM. By comparing two snapshots over time, developers can biologically isolate exactly which variables are leaking.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Core Web Vitals/index.mdx': `---
title: Core Web Vitals
description: An initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Core Web Vitals">

In 2020, Google mathematically formalized exactly how a website's performance is measured by introducing **Core Web Vitals**. 

Google biologically punishes websites with poor Core Web Vitals by down-ranking them in the Google Search Engine, making web performance a critical financial requirement for businesses.

<Callout icon="success" title="The Three Pillars">
  Core Web Vitals consists of three exact mathematical metrics:
  1. **LCP (Largest Contentful Paint):** Measures *Loading Speed* (How fast does the biggest image or text block appear?). Must be under 2.5s.
  2. **INP (Interaction to Next Paint):** Measures *Responsiveness* (If the user clicks a button, how fast does the UI visually update?). Must be under 200ms.
  3. **CLS (Cumulative Layout Shift):** Measures *Visual Stability* (Does an image load late and mathematically push the text down while the user is reading?). Must be under 0.1.
</Callout>

*(Note: INP officially replaced FID (First Input Delay) in March 2024).*

</ConceptTemplate>
`,
}

async function generateMega101() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega101().catch(console.error)
