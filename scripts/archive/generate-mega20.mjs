import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/14. Web Fundamentals/DOM/index.mdx': `---
title: The Document Object Model (DOM)
description: The programming interface for HTML and XML documents, representing the page as a logical tree of objects that can be manipulated by JavaScript.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The Document Object Model (DOM)">

When a browser downloads an HTML file, the raw text bytes are fundamentally useless to JavaScript. The browser's Rendering Engine parses that HTML and mathematically converts it into a massive, live, in-memory data structure: the **Document Object Model (DOM)**.

## 1. The Tree Architecture
The DOM is a classic Tree data structure. 
- The root node is the TICK1DocumentTICK1 object.
- Every HTML tag (like TICK1<body>TICK1 or TICK1<p>TICK1) becomes an **Element Node**.
- The text inside those tags becomes a **Text Node**.
- The attributes (like TICK1class="btn"TICK1) become properties on those objects.

Because it is a Tree, it inherits standard tree traversal properties: TICK1parentNodeTICK1, TICK1childNodesTICK1, TICK1nextSiblingTICK1.

## 2. The JavaScript Bridge
The DOM is *not* JavaScript. It is a Web API (usually written in C++ within the browser). 
JavaScript simply provides a bridge to interact with it. When you type TICK1document.getElementById('app')TICK1, the JS engine pauses, reaches across the bridge into the C++ DOM structure, finds the specific node, and returns a JavaScript object wrapper that allows you to manipulate it.

## 3. DOM Manipulation Costs
Traversing the bridge between JavaScript and the C++ DOM is computationally expensive.
If you run a TICK1forTICK1 loop 10,000 times, and inside that loop you update TICK1element.innerHTMLTICK1, the browser will likely freeze. 

<Callout icon="tip" title="The Virtual DOM">
Modern frameworks like React solved this performance nightmare by inventing the **Virtual DOM**. React creates a lightweight JavaScript copy of the C++ DOM. When data changes, React updates the fast JS copy, mathematically calculates the exact differences (diffing), and then reaches across the bridge to update the real C++ DOM exactly *once*.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CSSOM/index.mdx': `---
title: CSS Object Model (CSSOM)
description: The tree structure parallel to the DOM that contains all computed styling information for every node on the page.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="CSS Object Model (CSSOM)">

Just as HTML is parsed into the DOM tree, CSS is parsed into the **CSS Object Model (CSSOM)** tree. The Rendering Engine absolutely requires both trees to exist before it can draw a single pixel on the screen.

## 1. The Cascade and Inheritance
CSS rules are inherited hierarchically. If you apply TICK1font-size: 16pxTICK1 to the TICK1<body>TICK1, that rule must mathematically cascade down the CSSOM tree to every single child paragraph and span. 
This is why deeply nested CSS selectors (e.g., TICK1div.container ul li a spanTICK1) are computationally expensive. The browser must traverse the CSSOM tree backwards, verifying the parent hierarchy for every single span on the page to determine if the rule applies.

## 2. Render Blocking
The CSSOM is **Render-Blocking**. 
Because CSS rules can dramatically alter the geometry of the page (e.g., hiding a massive div), the browser will intentionally halt the rendering process and stare at a blank white screen until the CSSOM is completely built. 
If your HTML contains a TICK1<link rel="stylesheet" href="massive.css">TICK1 tag in the TICK1<head>TICK1, the browser will not paint anything until that massive file is fully downloaded and parsed.

## 3. Combining the Trees
Once the DOM and the CSSOM are fully built, the browser merges them together to create the **Render Tree**. 
The Render Tree only contains nodes that will actually be printed to the screen. If a DOM node has TICK1display: noneTICK1 in the CSSOM, it is mathematically excluded from the Render Tree, saving massive amounts of Layout and Paint calculations.

<Callout icon="warning" title="Critical CSS">
To fix render-blocking delays, advanced architectures use **Critical CSS**. They extract only the CSS required to style the "Above-the-Fold" content (the top of the page), inline it directly into the HTML TICK1<head>TICK1, and defer the downloading of the remaining CSS until later. This results in incredibly fast visual load times.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CORS/index.mdx': `---
title: Cross-Origin Resource Sharing (CORS)
description: The strict browser security mechanism that restricts a webpage from making HTTP requests to a different domain than the one that served it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Cross-Origin Resource Sharing (CORS)">

Imagine you are logged into your bank (TICK1bank.comTICK1). The browser holds your secure authentication cookie. 
You then open a malicious website (TICK1evil.comTICK1) in another tab. If a JavaScript script on TICK1evil.comTICK1 silently makes an HTTP TICK1POSTTICK1 request to TICK1api.bank.com/transferTICK1, the browser would automatically attach your bank cookie, and your money would be stolen.

**CORS** is the browser-level shield that prevents this exact catastrophe.

## 1. The Same-Origin Policy
By default, the browser enforces the **Same-Origin Policy (SOP)**. 
A JavaScript file loaded from TICK1https://my-app.comTICK1 can only make API requests to TICK1https://my-app.comTICK1. If it attempts to fetch data from TICK1https://api.other-app.comTICK1, the browser intercepts the request, blocks the JavaScript from reading the response, and throws a massive red CORS error in the console.

## 2. Bypassing SOP with CORS
What if your Frontend is hosted on TICK1my-app.comTICK1, but your legitimate Backend API is hosted on TICK1api.my-app.comTICK1? Because the subdomains differ, the browser blocks the request. 

To fix this, the Backend Server must explicitly whitelist the Frontend by sending specific HTTP Response Headers:
- TICK1Access-Control-Allow-Origin: https://my-app.comTICK1

When the browser sees this header, it relaxes the Same-Origin Policy and allows the JavaScript to read the data.

## 3. Preflight Requests (OPTIONS)
For "complex" requests (like a TICK1PUTTICK1 request, or a request with a custom TICK1AuthorizationTICK1 header), the browser is terrified of even sending the request to the backend. 
Before sending the real request, the browser automatically sends a hidden, invisible HTTP TICK1OPTIONSTICK1 request (the Preflight). 
It asks the backend: *"Hey, are you going to allow this TICK1PUTTICK1 request from this origin?"*
If the server responds positively, the browser then sends the real request.

<Callout icon="warning" title="CORS is a Browser Policy">
CORS does **not** protect your API from being hacked via tools like Postman, curl, or a Python script. Those tools simply ignore CORS. CORS only exists inside standard web browsers to protect end-users from malicious cross-site scripts.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Same-origin policy/index.mdx': `---
title: Same-Origin Policy (SOP)
description: The most critical security model in web browsers, strictly isolating documents, scripts, and data belonging to different origins.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Same-Origin Policy (SOP)">

The **Same-Origin Policy (SOP)** is the foundational security boundary of the modern web. Without it, the internet would be a lawless wasteland where any website could steal data from any other open tab.

## 1. Defining an "Origin"
An Origin is strictly defined as the mathematical combination of three things:
**Scheme + Hostname + Port**.

<ComparisonTable 
  headers={['URL being compared to: http://store.company.com/dir/page.html', 'Outcome', 'Reason']} 
  rows={[
    ['TICK1http://store.company.com/dir2/other.htmlTICK1', '✅ Same Origin', 'Only the path differs.'],
    ['TICK1https://store.company.com/dir/page.htmlTICK1', '❌ Different Origin', 'Different Scheme (HTTPS vs HTTP).'],
    ['TICK1http://news.company.com/dir/page.htmlTICK1', '❌ Different Origin', 'Different Hostname (news vs store).'],
    ['TICK1http://store.company.com:81/dir/page.htmlTICK1', '❌ Different Origin', 'Different Port (81 vs 80).']
  ]} 
/>

## 2. What does SOP restrict?
SOP places ironclad walls between different origins within the browser:
1. **DOM Access**: An iframe loading TICK1evil.comTICK1 cannot use JavaScript to read the DOM or keypresses of the parent window TICK1bank.comTICK1.
2. **Data Storage**: A script on TICK1origin-a.comTICK1 is mathematically barred from reading the LocalStorage, IndexedDB, or Cookies belonging to TICK1origin-b.comTICK1.
3. **Network Requests**: AJAX/Fetch requests to different origins are blocked from reading the response (unless relaxed by CORS headers).

## 3. Exceptions to SOP
SOP intentionally allows certain cross-origin interactions because the web would be unusable without them:
- **Linking**: You can freely embed TICK1<img src="different-origin.com/image.jpg">TICK1. 
- **Scripts**: You can load TICK1<script src="cdn.com/react.js">TICK1. (However, the script executes entirely within the context and permissions of the *hosting* page).

<Callout icon="tip" title="PostMessage">
If you legitimately need two different origins to communicate (e.g., a secure payment iframe communicating with the parent e-commerce site), you must use the strict TICK1window.postMessage()TICK1 API. This allows controlled, explicitly verified message passing across the SOP boundary.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Cookies/index.mdx': `---
title: HTTP Cookies
description: Small pieces of data sent by the server and stored in the user's browser, fundamentally enabling stateful sessions over the stateless HTTP protocol.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="HTTP Cookies">

The HTTP protocol is fundamentally **stateless**. The server has no memory of past requests. If you login on Request 1, the server will completely forget who you are on Request 2. 
**Cookies** were invented in 1994 by Netscape to solve this, introducing State to the Web.

## 1. How Cookies Work
1. **Setting the Cookie**: You send your username and password. The server validates them and sends back an HTTP Response Header: TICK1Set-Cookie: session_id=abc123TICK1.
2. **Browser Storage**: The browser intercepts this header and silently saves the TICK1session_idTICK1 onto the hard drive, tying it to the domain (e.g., TICK1amazon.comTICK1).
3. **Automatic Transmission**: For every single subsequent HTTP request the browser makes to TICK1amazon.comTICK1 (even for images or CSS), it automatically attaches the header: TICK1Cookie: session_id=abc123TICK1. The server reads this and remembers who you are.

## 2. Critical Security Flags
Because cookies are automatically attached to requests, they are highly vulnerable to attack vectors like XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery). 

To secure them, you must append strict flags when setting the cookie:
- TICK1HttpOnlyTICK1: Mathematically prevents client-side JavaScript (TICK1document.cookieTICK1) from reading the cookie. This utterly defeats XSS attacks trying to steal the session token.
- TICK1SecureTICK1: Forces the browser to *only* send the cookie over encrypted HTTPS connections, preventing packet-sniffing on public WiFi.
- TICK1SameSite=StrictTICK1: Prevents the browser from sending the cookie if the request originated from a different domain. This absolutely obliterates CSRF attacks.

## 3. Size and Limitations
Cookies are small. They are strictly limited to **4 Kilobytes** of data per cookie, and usually max out at ~50 cookies per domain. 
Furthermore, because they are sent back and forth on *every single request*, storing massive amounts of data in a cookie will severely bloat your network bandwidth and destroy web performance.

<Callout icon="warning" title="Third-Party Cookies">
A First-Party cookie is set by the domain you are currently visiting. A Third-Party cookie is set by an iframe or tracking pixel (like Facebook Ads) embedded on that page. Due to severe privacy concerns (cross-site tracking), modern browsers (Safari, Firefox, and soon Chrome) are aggressively blocking all Third-Party cookies by default.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/LocalStorage/index.mdx': `---
title: LocalStorage
description: A synchronous Web Storage API allowing web applications to persistently store simple key-value string data directly in the browser across sessions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="LocalStorage">

While Cookies are heavily tied to HTTP requests and servers, **LocalStorage** is a pure Client-Side storage mechanism. It allows JavaScript to save data directly into the browser's hard drive without ever sending it to the backend server.

## 1. Persistent Key-Value Storage
LocalStorage is incredibly simple. It operates as a synchronous dictionary (Key-Value store). 
- TICK1localStorage.setItem('theme', 'dark')TICK1
- TICK1const theme = localStorage.getItem('theme')TICK1

Critically, LocalStorage is **persistent**. If the user closes the tab, closes the browser, or restarts their computer, the data remains perfectly intact forever (until explicitly deleted by JavaScript or the user clearing their browser cache).

## 2. Architecture & Limitations
<ComparisonTable 
  headers={['Property', 'Details']} 
  rows={[
    ['Capacity', 'Significantly larger than Cookies. Usually 5MB to 10MB per origin.'],
    ['Data Types', 'Strictly Strings. If you want to store a JSON object, you must use TICK1JSON.stringify()TICK1 and TICK1JSON.parse()TICK1.'],
    ['Network Overhead', 'Zero. Unlike cookies, LocalStorage data is never automatically attached to HTTP requests.'],
    ['Synchronous Blocking', 'The API is entirely synchronous. Reading a massive 5MB string from LocalStorage will physically block the Main Thread and drop frame rates.']
  ]} 
/>

## 3. Security Vulnerabilities (XSS)
LocalStorage is inherently vulnerable to **Cross-Site Scripting (XSS)**. 
Because LocalStorage is universally accessible by any JavaScript running on the domain, if a hacker manages to inject a malicious script onto your page, they can trivially execute TICK1console.log(localStorage.getItem('jwt_token'))TICK1 and steal the user's authentication credentials. 

<Callout icon="warning" title="Never Store Secrets">
You must never store highly sensitive information (like JWT Access Tokens, Passwords, or PII) in LocalStorage. For secure authentication sessions, always use HTTP-Only, Secure cookies, which are mathematically immune to XSS token theft.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/SessionStorage/index.mdx': `---
title: SessionStorage
description: A volatile, tab-specific Web Storage API identical to LocalStorage, but automatically cleared the moment the browser tab is closed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="SessionStorage">

**SessionStorage** shares the exact same API and 5MB capacity as LocalStorage (TICK1setItemTICK1, TICK1getItemTICK1), but its architectural lifespan and isolation scope are fundamentally different.

## 1. The Lifespan (Volatility)
LocalStorage lives forever. **SessionStorage is volatile.** 
The data only survives for the duration of the "Page Session". 
- If the user reloads the page, the data survives.
- If the user closes the specific browser Tab, the data is instantly and permanently destroyed by the browser.

## 2. Tab-Level Isolation
LocalStorage is tied to the Origin (Domain). If you open 5 tabs of TICK1amazon.comTICK1, all 5 tabs physically share the exact same LocalStorage database. If Tab A updates a value, Tab B can instantly read it.

**SessionStorage is tied to the specific Tab.**
If you open 5 tabs of TICK1amazon.comTICK1, you spawn 5 completely isolated, parallel SessionStorage databases. Tab A is mathematically barred from reading the SessionStorage of Tab B, even though they share the exact same origin.

## 3. Use Cases
Because of its strict isolation, SessionStorage is the perfect tool for maintaining state that should not leak across multiple windows.
- **Multi-Tab Workflows**: Imagine a user booking two different flights simultaneously in two different tabs. If you store the "current_flight_id" in LocalStorage, Tab A will overwrite Tab B's data, causing a catastrophic booking error. SessionStorage mathematically prevents this collision.
- **Form Data Recovery**: Saving a long draft of an email so it survives an accidental page refresh, but vanishes when the user successfully closes the tab.

<Callout icon="tip" title="Duplicating Tabs">
There is one exception to the Tab Isolation rule: If a user right-clicks a tab and selects "Duplicate Tab" (or uses a TICK1target="_blank"TICK1 link), modern browsers will deeply clone the existing SessionStorage into the new tab. However, from that exact millisecond onward, the two databases diverge and become isolated.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/IndexedDB/index.mdx': `---
title: IndexedDB
description: A massive, asynchronous, transactional, NoSQL database built directly into modern web browsers for storing complex structural data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="IndexedDB">

Cookies hold 4KB. LocalStorage holds 5MB of raw strings. 
What if you are building an offline-first web application (like Google Docs or a massive 3D game) and you need to store 500 Megabytes of complex JavaScript objects, images, and binary Blobs directly on the user's hard drive?

You use **IndexedDB**.

## 1. The Architecture
IndexedDB is a genuine NoSQL database embedded in the browser engine.
- **Object Stores**: Instead of SQL tables, it uses Object Stores (similar to MongoDB Collections).
- **Complex Data Types**: You don't need to TICK1JSON.stringify()TICK1. IndexedDB natively stores raw JavaScript Objects, Arrays, Dates, and even massive binary TICK1ArrayBufferTICK1 and TICK1BlobTICK1 objects (perfect for caching HD videos or audio files).
- **Indexes**: You can create high-performance indexes on specific object properties (e.g., rapidly searching for all users where TICK1age > 18TICK1 without scanning the entire database).

## 2. Asynchronous and Transactional
Because reading 500MB of data would instantly freeze the Main UI Thread, the IndexedDB API is strictly **Asynchronous**. It relies entirely on callbacks and Promises to execute queries in the background.

Furthermore, it guarantees **ACID-compliant Transactions**. 
If you execute a massive database update across multiple Object Stores, and step 4 fails, the entire transaction automatically rolls back. The database is never left in a corrupted, half-written state.

## 3. The API Nightmare
IndexedDB is notoriously one of the most painful, low-level, and complex APIs in web development. A simple query requires opening connections, handling version upgrades, spawning transactions, and attaching multiple event listeners.

<Callout icon="tip" title="Abstraction Libraries">
No senior engineer uses the raw IndexedDB API in production. You should absolutely always use a modern, Promise-based abstraction library like **LocalForage**, **Dexie.js**, or **Idb**. These wrappers compress 50 lines of complex transaction boilerplate into a single beautiful TICK1await db.users.add({name: "John"})TICK1 line.
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
