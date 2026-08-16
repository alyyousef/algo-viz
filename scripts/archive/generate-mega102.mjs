import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '52. Web Performance & Browser Internals/LCP/index.mdx': `---
title: LCP (Largest Contentful Paint)
description: A Core Web Vital metric that reports the render time of the largest image or text block visible within the viewport.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Largest Contentful Paint (LCP)">

How long does it mathematically take for the "main" content of a webpage to load?

Google introduced **LCP** to measure exactly this. Instead of tracking when the entire DOM is finished loading (which is misleading), the browser's Rendering Engine mathematically calculates the exact millisecond that the *physically largest* element (usually a Hero Image or an \`<h1>\` tag) appears on the screen.

<Callout icon="warning" title="The 2.5 Second Rule">
  To pass Google's SEO requirements, your LCP must occur in **under 2.5 seconds** for 75% of your users.
  
  If your Hero Image is a massive 5MB uncompressed PNG, or if your React app requires downloading 2MB of JavaScript before it even starts rendering the \`<h1>\`, your LCP will biologically fail, and your Google Search ranking will plummet.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/FID/index.mdx': `---
title: FID (First Input Delay)
description: A Core Web Vital metric that measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="First Input Delay (FID)">

You load a website. You see a "Menu" button. You click it. Nothing happens for two seconds. You biological frustration peaks. 

This is **First Input Delay**. 

FID mathematically measures the exact millisecond delay between the user physically clicking their mouse, and the browser's Main Thread actually having the free CPU capacity to respond to that click.

<Callout icon="info" title="The Cause of FID">
  FID is almost exclusively caused by the Main Thread being biologically exhausted by heavy JavaScript execution. If React is mathematically parsing a 10,000-item array synchronously, the Event Loop is blocked. The browser records the physical mouse click, but cannot execute the \`onClick\` handler until the array parsing finishes.
  
  *Note: In March 2024, Google officially replaced FID with **INP (Interaction to Next Paint)** as the standard Core Web Vital metric.*
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/CLS/index.mdx': `---
title: CLS (Cumulative Layout Shift)
description: A Core Web Vital metric that measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cumulative Layout Shift (CLS)">

You are reading a news article on your phone. Suddenly, an advertisement loads at the top of the page. The text you were reading mathematically shifts down by 400 pixels, causing you to accidentally click on the ad. 

This is **Cumulative Layout Shift**, one of the most biologically infuriating UI errors in web development.

<Callout icon="success" title="How to Fix CLS">
  Google mathematically demands a CLS score of **less than 0.1**. 
  
  To fix this, developers must always explicitly declare the mathematical \`width\` and \`height\` attributes on all \`<img>\` and \`<iframe>\` tags. By explicitly defining the dimensions, the browser's Rendering Engine mathematically reserves the exact empty space on the screen *before* the image finishes downloading, ensuring zero layout shifting occurs when the image finally appears.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/INP/index.mdx': `---
title: INP (Interaction to Next Paint)
description: A Core Web Vital metric that assesses a page's overall responsiveness to user interactions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interaction to Next Paint (INP)">

In March 2024, Google officially replaced FID with **INP**.

FID was biologically flawed because it only measured the *delay* before the event handler started. It didn't measure how long the event handler itself took to execute, nor how long it took the browser to physically paint the resulting UI change.

<Callout icon="tip" title="The Total Time Metric">
  INP mathematically measures the entire lifecycle of a user interaction:
  1. The user clicks a button.
  2. The browser waits for the Event Loop to free up (Input Delay).
  3. The JavaScript \`onClick\` handler executes (Processing Time).
  4. The browser calculates the DOM changes and paints the new pixels (Presentation Delay).
  
  To pass, the entire mathematical process must complete in **under 200 milliseconds**.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/CSR/index.mdx': `---
title: CSR (Client-Side Rendering)
description: The process of rendering web pages directly in the browser using JavaScript.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Client-Side Rendering (CSR)">

In the modern React/Vue era, **Client-Side Rendering** became the default architectural paradigm for Single Page Applications (SPAs).

When a user navigates to a CSR website, the server does not send them a populated HTML document. It mathematically sends them a completely blank HTML file containing only a single \`<div id="root"></div>\` and a massive \`<script src="bundle.js">\` tag.

<Callout icon="warning" title="The Performance Trade-off">
  **Pros:** Once the JS bundle is downloaded, navigating between pages is mathematically instantaneous because the browser never has to request a new HTML file from the server.
  
  **Cons:** The initial page load (LCP) is biologically terrible. The user stares at a blank white screen until the massive JavaScript bundle physically finishes downloading, parsing, and executing in the V8 engine to construct the DOM from scratch.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/SSR/index.mdx': `---
title: SSR (Server-Side Rendering)
description: The ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Server-Side Rendering (SSR)">

To solve the biological nightmare of the CSR "blank white screen", frameworks like Next.js introduced modern **Server-Side Rendering**.

Instead of making the user's laptop execute the React code, a Node.js server physically executes the React components on the backend. The server mathematically calculates the final HTML string and sends a fully-formed, visually complete HTML document directly to the browser.

<Callout icon="success" title="The SEO Advantage">
  Because the browser receives raw, populated HTML immediately, the **First Contentful Paint (FCP)** is mathematically instantaneous. 
  
  Furthermore, Google's SEO web crawlers (which historically struggled to execute heavy JavaScript) can easily read the raw HTML text, dramatically improving Search Engine indexing.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/SSG/index.mdx': `---
title: SSG (Static Site Generation)
description: The process of generating a full static HTML website based on raw data and a set of templates at build time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Static Site Generation (SSG)">

SSR is mathematically fast for the user, but biologically expensive for the server. If 100,000 users visit a blog post, the Node.js server must physically execute React and query the database 100,000 times to generate the exact same HTML document.

**Static Site Generation** solves this by shifting the rendering to **Build Time**.

<Callout icon="tip" title="Compile-Time Rendering">
  When the developer runs \`npm run build\` on their laptop (or in CI/CD), the build system (Next.js/Gatsby/Astro) mathematically queries the database *once*, generates 500 physical \`.html\` files, and uploads them to a static CDN.
  
  When a user visits the site, there is zero backend computation. The CDN just serves the raw HTML file in 5 milliseconds. It is the absolute pinnacle of web performance.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/ISR/index.mdx': `---
title: ISR (Incremental Static Regeneration)
description: An architecture that allows you to create or update static pages after you've built your site.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Incremental Static Regeneration (ISR)">

SSG is mathematically perfect for speed, but what if you have an e-commerce site with 2,000,000 products? Running \`npm run build\` to generate 2 million HTML files would take 4 hours. If a price changes, you'd have to rebuild the entire site.

Next.js invented **ISR** to mathematically solve this scaling problem.

<Callout icon="success" title="Stale-While-Revalidate">
  With ISR, you can mathematically tell Next.js: *"Generate this product page at build time, but revalidate it every 60 seconds."*
  
  When a user visits, they instantly get the cached static HTML. If 60 seconds have passed, Next.js triggers a background Node.js thread to rebuild the HTML for *just that one page* and silently updates the CDN cache. You get the biological speed of SSG with the dynamic real-time data of SSR.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Hydration/index.mdx': `---
title: Hydration
description: The process of using client-side JavaScript to add application state and interactivity to server-rendered HTML.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hydration">

When you use Server-Side Rendering (SSR), the server sends a fully populated HTML document. The user sees the UI instantly. But there is a biological catch: **The UI is dead.**

If the user clicks a React \`<button>\`, nothing mathematically happens, because the JavaScript Event Listeners haven't been attached yet.

<Callout icon="warning" title="The Hydration Process">
  After the browser renders the static HTML, it downloads the React JS bundle. React then executes on the client, mathematically maps its Virtual DOM against the physical HTML DOM already on the screen, and silently attaches all the \`onClick\` handlers. 
  
  This process of "bringing the dead HTML to life" is called **Hydration**.
</Callout>

Optimizing hydration (Partial Hydration, Resumability) is currently the absolute hardest mathematical problem in modern frontend framework design (solved by frameworks like Astro and Qwik).

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Lazy loading/index.mdx': `---
title: Lazy loading
description: The practice of delaying load or initialization of resources or objects until they're actually needed to improve performance and save system resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lazy Loading">

If a user visits your homepage, and you have an Image Gallery mathematically located at the absolute bottom of the page (10,000 pixels down), why should the browser download those images immediately?

**Lazy Loading** is the architectural practice of deferring the mathematical execution or downloading of resources until the user physically scrolls them into the Viewport.

<Callout icon="tip" title="Native HTML Lazy Loading">
  Historically, developers had to write complex Intersection Observer JavaScript to achieve this. 
  
  Today, it is built directly into the Chromium/WebKit rendering engines. You simply add \`<img src="heavy.png" loading="lazy" />\`. The browser mathematically calculates the scroll position and only opens the network connection when the image is about to biologically enter the screen.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Code splitting/index.mdx': `---
title: Code splitting
description: The process of splitting code into various bundles which can then be loaded on demand or in parallel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Code Splitting">

If your React application has 50 different routes (Dashboard, Settings, Profile), Webpack will biologically bundle all 50 routes into a single massive \`bundle.js\` file (e.g., 4MB). 

If a user just wants to visit the Login page, they are mathematically forced to download the code for the Settings page, crippling the LCP metric.

<Callout icon="success" title="Dynamic Imports">
  **Code Splitting** solves this. Using dynamic imports (\`import('./Settings.js')\`), the bundler mathematically slices the application into 50 separate, tiny \`.js\` files (chunks).
  
  When the user visits the Login page, they only download \`login-chunk.js\` (50KB). The browser biologically loads it instantly. Only when they physically click the "Settings" link does the browser execute a network request to fetch \`settings-chunk.js\`.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Tree shaking/index.mdx': `---
title: Tree shaking
description: A term commonly used in the JavaScript context for dead-code elimination.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tree Shaking">

Imagine you import the massive \`lodash\` utility library, which contains 300 different mathematical functions. But in your code, you only actually use one function: \`lodash.debounce()\`.

If your bundler includes the entire 300-function library in your final \`bundle.js\`, you are wasting massive amounts of bandwidth.

<Callout icon="info" title="Dead-Code Elimination">
  **Tree Shaking** is a mathematical static analysis technique. 
  
  Modern bundlers (like Rollup and Vite) treat your codebase like a physical tree. They "shake" the tree. Because you used ES6 \`import { debounce } from 'lodash'\`, the bundler mathematically maps the exact execution path. It realizes the other 299 functions are biologically unreachable (dead code) and physically deletes them from the final compiled bundle.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Image optimisation/index.mdx': `---
title: Image optimisation
description: The process of delivering images in the right format, dimension, and resolution while keeping the smallest possible size.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image Optimisation">

Images mathematically account for over 60% of all data transferred on the modern web. If your JavaScript bundle is heavily optimized to 50KB, but you render a 4MB uncompressed PNG as a background image, you have completely failed at Web Performance.

<Callout icon="tip" title="Modern Formats">
  Modern image optimization requires abandoning legacy formats (JPEG, PNG).
  
  Google mathematically invented **WebP**, and later the industry developed **AVIF**. These next-generation formats use advanced mathematical compression algorithms to reduce a 1MB JPEG down to a visually identical 150KB AVIF file, drastically improving the LCP metric. 
  
  Additionally, responsive \`<picture>\` tags are used to ensure a mobile phone downloads a 400px width version, while a 4K monitor downloads a 2000px width version.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Caching strategies/index.mdx': `---
title: Caching strategies
description: Techniques used to store copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Caching Strategies">

The fastest mathematical network request is the one that never happens.

**Caching** is the biological science of storing files locally on the user's hard drive so the browser doesn't have to download them again.

<Callout icon="warning" title="Cache-Control Headers">
  Caching is mathematically controlled by HTTP Headers. 
  
  If your server sends \`Cache-Control: max-age=31536000\`, the browser mathematically locks that file on the user's hard drive for exactly one year. If the user refreshes the page, the browser instantly loads the file from the local SSD (0ms) instead of the internet (150ms).
  
  *However*, if you deploy a bugfix to that JS file, the user's browser will stubbornly ignore it and load the broken cached version. To fix this, bundlers mathematically inject a hash into the filename (\`main.a8f2c.js\`), forcing the browser to download the new file.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/CDN usage/index.mdx': `---
title: CDN usage
description: A geographically distributed network of proxy servers and their data centers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Content Delivery Network (CDN)">

The Speed of Light is a biological and mathematical limitation of physics. 

If your Node.js server is physically located in a data center in New York, and a user in Tokyo attempts to download a 2MB image, the electrical signals must mathematically travel across the bottom of the Pacific Ocean. This physically takes 200 milliseconds of absolute latency.

<Callout icon="success" title="Edge Computing">
  A **CDN** (like Cloudflare or AWS CloudFront) solves the physics problem. 
  
  A CDN company places physical hard drives in 300 different cities around the globe. You upload your image to the CDN. The CDN mathematically duplicates the image to all 300 hard drives. When the user in Tokyo requests the image, they biologically download it from a server physically located *inside Tokyo*, reducing the latency from 200ms down to 5ms.
</Callout>

</ConceptTemplate>
`,
  '52. Web Performance & Browser Internals/Compression (Brotli/index.mdx': `---
title: Compression (Brotli)
description: A generic-purpose lossless compression algorithm developed by Google.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Brotli"
  subtitle="Google's Mathematical Compression Engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Chromium_Logo.svg/512px-Chromium_Logo.svg.png"
  description="Brotli is a modern data compression algorithm mathematically engineered by Google specifically for the web, replacing the legacy Gzip algorithm."
  yearCreated={2013}
  creator="Google (Jyrki Alakuijala and Zoltán Szabadka)"
  isOpenSource={true}
  websiteUrl="https://github.com/google/brotli"
>

Before a server sends an HTML or JS file over the network, it mathematically compresses it to save bandwidth.

<Callout icon="success" title="The Built-in Dictionary">
  Brotli achieves significantly better compression ratios than Gzip because it has a biological "cheat code". 
  
  Google hard-coded a 120KB static dictionary of the most common web words (like \`<script>\`, \`function\`, \`</body>\`) directly into the Chromium and WebKit browser engines. When Brotli compresses the file on the server, it replaces those words with tiny mathematical pointers. The browser uses its built-in dictionary to instantly decompress them, reducing file sizes by up to 20% more than Gzip.
</Callout>

</TechnologyTemplate>
`,
  '52. Web Performance & Browser Internals/Gzip)/index.mdx': `---
title: Compression (Gzip)
description: A file format and a software application used for file compression and decompression.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Gzip"
  subtitle="The legacy standard of web compression"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/512px-Tux.svg.png"
  description="Gzip is the foundational mathematical compression algorithm that powered the entire internet for two decades before the invention of Brotli."
  yearCreated={1992}
  creator="Jean-loup Gailly and Mark Adler"
  isOpenSource={true}
  websiteUrl="https://www.gnu.org/software/gzip/"
>

Gzip is mathematically based on the DEFLATE algorithm, which is a combination of LZ77 and Huffman coding. 

While Brotli is now the industry standard for compressing static web assets (HTML/CSS/JS), Gzip is still universally supported by 100.0% of all web browsers globally. It remains the absolute fallback compression method for legacy systems and API JSON payloads.

</TechnologyTemplate>
`,
}

async function generateMega102() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega102().catch(console.error)
