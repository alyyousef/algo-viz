import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Browsers/index.mdx',
    content: `---
title: Browsers
description: "The immensely complex software systems that retrieve, present, and traverse information resources on the World Wide Web, acting as the modern operating system for the internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Browsers">
      {children}
    </ConceptTemplate>
  )
}

Modern web browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) are among the most mathematically and architecturally complex pieces of software ever written. A modern browser codebase (like Chromium) contains over 35 million lines of C++ code, making it physically larger and more complex than the entire Linux operating system kernel.

A browser is no longer a simple "document viewer." It is a heavily sandboxed, highly concurrent Virtual Machine. It mathematically acts as an abstraction layer between web applications (written in high-level HTML/CSS/JS) and the underlying host Operating System (Windows, macOS, Linux).

## 1. Deep Dive & Mechanics

At a high level, the architecture of a modern browser is divided into several highly distinct, deeply isolated processes:

1. **The Browser Process:** The supreme commander. It controls the "chrome" of the application (the address bar, back/forward buttons, bookmarks). More importantly, it handles all raw network requests and file access, because the underlying rendering processes are mathematically banned from touching the host OS directly.
2. **The Renderer Process (Blink / WebKit):** Responsible for parsing HTML, CSS, and executing JavaScript. Because web content is inherently untrusted and potentially malicious, the Renderer Process is mathematically trapped inside an extreme security sandbox. It cannot read local files or open raw network sockets. It must beg the Browser Process via Inter-Process Communication (IPC) for resources.
3. **The GPU Process:** Dedicated exclusively to taking mathematical rendering instructions from the Renderer Process and shipping them to the physical graphics card (GPU) for hardware acceleration.
4. **The Plugin / Extension Processes:** If you install an ad-blocker or a password manager, the browser spins up a completely separate mathematical process for it, ensuring that if the extension crashes, the main browser does not.

## 2. Mathematical / Theoretical Foundation

The most critical architectural shift in browser history was **Site Isolation (Project Fission)**.

Historically, a browser used a single Renderer process for a single tab. If Tab A loaded TICK1bank.comTICK1 and Tab B loaded TICK1evil.comTICK1, they ran in separate processes. However, if TICK1bank.comTICK1 embedded an iframe from TICK1evil.comTICK1, the browser historically ran that iframe inside TICK1bank.comTICK1's Renderer process.

In 2018, the **Spectre** CPU vulnerability mathematically broke the internet. Spectre proved that any malicious JavaScript could force the physical CPU to speculatively execute instructions, allowing the JavaScript to read the raw memory of the *entire process it was running inside*.

If TICK1evil.comTICK1 was in the same process as TICK1bank.comTICK1, it could mathematically extract your banking session tokens directly from RAM. 

To solve this, Google Chrome engineers implemented **Site Isolation**. Now, every single cross-origin iframe is mathematically ripped out of its parent's process and assigned its own dedicated, sandboxed OS process. If TICK1evil.comTICK1 tries to use Spectre, it can only steal data from its own isolated process, mathematically neutralizing the attack.

## 3. Real-World Implementation

Because the browser is an abstraction layer, web developers interact with its subsystems via the **BOM (Browser Object Model)** and specific JavaScript APIs.

TICK3javascript
// 1. The BOM (Window Object)
// The global context mathematically representing the browser window itself
console.log("Current URL:", window.location.href);
console.log("Screen resolution:", window.screen.width, "x", window.screen.height);

// 2. The Navigator Object
// Exposes the underlying hardware and browser capabilities
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => console.log("Latitude:", position.coords.latitude),
    (error) => console.error("Mathematical GPS failure:", error)
  );
}

// 3. Web Workers (Concurrency)
// JavaScript is strictly single-threaded in the main Renderer.
// If you need to do heavy math (like calculating Fibonacci to a billion), 
// you must mathematically spin up a Web Worker, which executes in a totally separate OS thread.
const worker = new Worker('heavy_math_worker.js');
worker.postMessage({ command: 'calculate' }); // Send data to the background thread
worker.onmessage = (event) => console.log("Result:", event.data);

// 4. Client-Side Storage
// The browser provides its own embedded mathematical databases
localStorage.setItem('theme', 'dark'); // Simple key-value (Synchronous, blocking)
const dbReq = indexedDB.open('myDatabase', 1); // Massive NoSQL database (Asynchronous)
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Host Operating System
        subgraph The Browser Application
            BP[Browser Process<br/>UI, Network, Storage]
            
            subgraph Security Sandbox 1
                RP1[Renderer Process<br/>bank.com]
            end
            
            subgraph Security Sandbox 2
                RP2[Renderer Process<br/>evil-ads.com iframe]
            end
            
            GP[GPU Process]
        end
        
        Hardware((Physical RAM / CPU))
    end
    
    BP <-->|IPC - Inter-Process Communication| RP1
    BP <-->|IPC| RP2
    RP1 -.->|Cannot touch direct hardware| Hardware
    RP1 -->|Render Commands| GP
    RP2 -->|Render Commands| GP
TICK3

## 5. Interview Prep

**Q: What is the event loop in a browser?**
**A:** Because JavaScript is single-threaded, the browser relies on a mathematical queuing system called the Event Loop. When an asynchronous event occurs (like a network fetch completing, or a user clicking a button), the browser pushes a callback function onto the Macrotask or Microtask queue. The Event Loop constantly spins, checking if the main Call Stack is empty. If it is empty, it mathematically pulls the next function off the queue and executes it. 

**Q: What is the difference between a Macrotask and a Microtask?**
**A:** They have distinct mathematical execution priorities. Microtasks (like TICK1Promise.then()TICK1 or TICK1MutationObserverTICK1) have absolute priority. The Event Loop will execute *every single* Microtask in the queue before it even looks at the Macrotask queue (which handles TICK1setTimeoutTICK1 or DOM clicks). If a developer writes a recursive Promise loop, the Microtask queue will mathematically never empty, completely freezing the browser tab.

**Q: How does a browser handle rendering an immensely massive DOM (e.g., 50,000 nodes)?**
**A:** Terribly. Every DOM node consumes memory in the C++ backend. When a layout change occurs, the browser mathematically traverses the entire tree. At 50,000 nodes, the CPU will physically choke, dropping framerates below 10fps. Developers must implement Virtualization (e.g., TICK1react-windowTICK1), where they only render the 20 nodes currently visible on the screen, mathematically recycling the DOM elements as the user scrolls.

## 6. Production Use Cases

- **Progressive Web Apps (PWAs):** Utilizing the browser's Service Worker API, companies like Twitter and Starbucks ship web applications that mathematically intercept network requests. If the user is on an airplane with no WiFi, the browser process serves the application directly from the local Cache API, allowing the web app to function perfectly offline like a native iOS/Android app.
- **Headless Browsers:** In CI/CD pipelines, engineers run **Puppeteer** or **Playwright**. These tools boot up a literal Chromium browser process on a Linux server, but mathematically disable the GPU and GUI (Headless mode). They then use IPC commands to script the browser to navigate to the company's website, click buttons, and assert that the UI mathematically works before deploying code to production.

<Callout icon="danger" title="The Memory Cost of Sandboxing">
The mathematical brilliance of Site Isolation and multi-process architecture comes at a severe hardware cost. Because every tab and iframe gets its own dedicated OS process, the browser must duplicate the V8 JavaScript Engine instance and the Blink rendering engine instance in RAM for every single tab. This is precisely why Google Chrome mathematically devours your laptop's RAM (often consuming gigabytes of memory just to keep 10 tabs open).
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/CORS/index.mdx',
    content: `---
title: Cross-Origin Resource Sharing (CORS)
description: "A crucial HTTP-header based security mechanism that allows a server to mathematically dictate which external origin domains are permitted to read its responses."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Cross-Origin Resource Sharing (CORS)">
      {children}
    </ConceptTemplate>
  )
}

If you are a web developer, you have undoubtedly encountered the dreaded error: TICK1Access to fetch at 'api.example.com' from origin 'localhost:3000' has been blocked by CORS policy.TICK1

CORS is not a bug. It is a critical mathematical security feature implemented by the web browser to protect users. Without CORS, the modern internet would be an apocalyptic wasteland of stolen data. To understand CORS, you must first understand the foundational law it modifies: the **Same-Origin Policy (SOP)**.

## 1. Deep Dive & Mechanics

**The Same-Origin Policy (SOP):**
This is a mathematical rule hardcoded into every web browser. It states that JavaScript executing on TICK1https://bank.comTICK1 is only allowed to read network data from TICK1https://bank.comTICK1. If a user visits TICK1https://evil.comTICK1, and that site executes TICK1fetch('https://bank.com/api/balance')TICK1, the browser will mathematically execute the request, the server will process it (using the user's saved banking cookies!), but the browser will **block the malicious JavaScript from reading the response**.

**CORS (Cross-Origin Resource Sharing):**
SOP is incredibly secure, but mathematically too restrictive. What if TICK1bank.comTICK1 *wants* to allow their official mobile-web portal at TICK1https://bank-portal.comTICK1 to read data from their API?

CORS is the mathematical loophole. It is a strict negotiation between the browser and the server using HTTP Headers. 

When TICK1bank-portal.comTICK1 attempts to fetch data from TICK1api.bank.comTICK1, the browser says, "Wait, these are different origins." The browser intercepts the request and says to the server: "Hey, this request is coming from TICK1bank-portal.comTICK1. Do you allow this?" 

If the server explicitly replies with the HTTP header TICK1Access-Control-Allow-Origin: https://bank-portal.comTICK1, the browser mathematically unlocks the response, allowing the JavaScript to read the data.

## 2. Mathematical / Theoretical Foundation

The most complex mathematical mechanism of CORS is the **Preflight Request (OPTIONS)**.

If a cross-origin request is "Simple" (e.g., a basic GET request with no special headers), the browser fires the request immediately, but mathematically hides the response until the CORS headers are validated.

However, if the request is "Complex"—meaning it could mathematically alter data on the server (e.g., a TICK1DELETETICK1 request, or a TICK1POSTTICK1 with TICK1Content-Type: application/jsonTICK1, or passing custom TICK1AuthorizationTICK1 headers)—the browser realizes that firing the request blindly is too dangerous.

Before the actual request is sent, the browser halts the JavaScript thread and fires a covert, automatic HTTP TICK1OPTIONSTICK1 request to the server. This is the **Preflight**. The browser mathematically asks: "I want to send a DELETE request with these specific headers. Will you accept this?"

The server must parse this Preflight, run a mathematical regex check on the Origin, and respond with TICK1204 No ContentTICK1 and the appropriate TICK1Access-Control-Allow-MethodsTICK1 headers. Only if the Preflight succeeds will the browser physically dispatch the real DELETE request.

## 3. Real-World Implementation

CORS is strictly a server-side configuration. You cannot mathematically "fix" CORS from the frontend JavaScript (unless you use a proxy server to trick the browser).

Here is how you properly implement a highly secure CORS mathematical firewall in a Node.js / Express backend.

TICK3javascript
const express = require('express');
const cors = require('cors');
const app = express();

// 1. Define the mathematical whitelist of allowed Origins
const whitelist = [
  'https://www.my-production-app.com',
  'https://staging.my-production-app.com',
  'http://localhost:3000' // Mathematical exception for local developer testing
];

// 2. Configure the CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    // If the origin is in the whitelist, or if there is no origin 
    // (e.g., a server-to-server curl request, which bypasses browsers completely)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // mathematically approve the request
      callback(null, true); 
    } else {
      // mathematically reject and block the request
      callback(new Error('Not allowed by CORS mathematical policy')); 
    }
  },
  
  // 3. Mathematical capabilities negotiation
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP verbs
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Mathematically allow the browser to send secure cookies cross-origin
  maxAge: 86400 // Cache the Preflight OPTIONS response in the browser for 24 hours to save latency
};

// Apply the mathematical firewall to all routes
app.use(cors(corsOptions));

app.post('/api/secure-data', (req, res) => {
  res.json({ message: 'CORS handshake successful. Data delivered.' });
});
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant JS as Frontend JS (evil.com)
    participant Browser as User's Browser
    participant Server as API Server (bank.com)

    Note over JS, Server: Complex Request (POST + application/json)
    
    JS->>Browser: fetch('bank.com/api', { method: 'POST', json })
    
    Note over Browser: Browser halts request, initiates Preflight
    Browser->>Server: HTTP OPTIONS (Origin: evil.com, Method: POST)
    
    Note over Server: Server checks whitelist
    Server-->>Browser: 403 Forbidden (No Access-Control-Allow-Origin)
    
    Note over Browser: Browser mathematically destroys the request
    Browser-->>JS: Error: CORS policy blocked request
    
    Note over Browser: The actual POST request was NEVER sent to the server.
TICK3

## 5. Interview Prep

**Q: How do you bypass CORS?**
**A:** You mathematically cannot bypass it in the browser. It is enforced by the C++ engine. However, CORS only applies to *browsers*. If you spin up a Node.js server, Python script, or use Postman/curl, there is no browser engine to enforce the rule, so the request succeeds instantly. Therefore, to bypass CORS in local development, you spin up a local Proxy Server (like Webpack DevServer). The browser talks to the local Proxy (Same-Origin, no CORS block), and the Proxy talks to the remote API (Server-to-Server, no CORS enforcement).

**Q: Why is using TICK1Access-Control-Allow-Origin: *TICK1 dangerous?**
**A:** The asterisk is a mathematical wildcard that allows literally any website on earth to read data from your API. While this is acceptable for completely public APIs (like a public weather API), if you use it on an API that handles user authentication, you have mathematically turned off the browser's security system, allowing attackers to perform CSRF (Cross-Site Request Forgery) attacks easily.

**Q: What is the TICK1Access-Control-Allow-CredentialsTICK1 header?**
**A:** By default, cross-origin requests strip out all cookies and HTTP authentication tokens. This mathematically prevents an attacker on TICK1evil.comTICK1 from using your active session. If you *want* cookies to be sent cross-origin, the client must set TICK1credentials: 'include'TICK1, and the server MUST respond with TICK1Access-Control-Allow-Credentials: trueTICK1. Importantly, the server mathematically cannot use the wildcard TICK1*TICK1 for the Origin if credentials are allowed; it must explicitly echo the specific domain.

## 6. Production Use Cases

- **Microservice Architectures:** Modern applications separate their architecture (e.g., TICK1app.company.comTICK1 for the React frontend, and TICK1api.company.comTICK1 for the Node backend). Because the subdomains differ, they are mathematically treated as Cross-Origin. The API must explicitly configure CORS to allow the specific frontend subdomain to read data.
- **Third-Party Integrations:** If you embed a Stripe checkout script on your website, that script is executing on your domain, but fetching data from TICK1api.stripe.comTICK1. Stripe's servers use complex CORS algorithms to mathematically ensure that the request is coming from a registered merchant domain before allowing the transaction to proceed.

<Callout icon="danger" title="The False Sense of Security">
CORS is explicitly **NOT** a backend security mechanism to protect your server. It is a frontend mechanism to protect the user's browser. If you configure CORS properly, it prevents a malicious website from executing JavaScript in the victim's browser to steal their data. It does absolutely nothing to prevent an attacker from opening a terminal and running a raw TICK1curlTICK1 command against your API. You must still authenticate and rate-limit every request on the server.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/CSP/index.mdx',
    content: `---
title: Content Security Policy (CSP)
description: "A profound HTTP header that mathematically restricts exactly which resources the browser is allowed to execute or load, neutralizing the threat of Cross-Site Scripting (XSS)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Content Security Policy (CSP)">
      {children}
    </ConceptTemplate>
  )
}

For two decades, the most catastrophic mathematical vulnerability on the web has been **Cross-Site Scripting (XSS)**. 

If an attacker can trick a website into rendering a malicious string like TICK1<script>stealTokens()</script>TICK1, the browser has no mathematical way of knowing that the script is malicious. The browser's C++ engine simply assumes that if the script was delivered in the HTML payload from the server, the server intended for it to execute.

**Content Security Policy (CSP)** fundamentally changes this architecture. It is an HTTP Header sent by the server that acts as an unbreachable mathematical whitelist. The server explicitly tells the browser: "Only execute JavaScript that was downloaded from TICK1https://scripts.mydomain.comTICK1. If you see an inline TICK1<script>TICK1 tag directly in the HTML, or a script from TICK1evil.comTICK1, mathematically destroy it and throw an error."

## 1. Deep Dive & Mechanics

CSP is enforced at the deepest layer of the browser's parsing engine. When the browser receives the HTTP Response, it parses the TICK1Content-Security-PolicyTICK1 header before it even begins constructing the DOM.

The policy is composed of **Directives**. Each directive mathematically governs a specific type of resource:
- TICK1script-srcTICK1: Where JavaScript can be loaded from.
- TICK1style-srcTICK1: Where CSS can be loaded from.
- TICK1img-srcTICK1: Where images can be loaded from.
- TICK1connect-srcTICK1: Where the browser is allowed to send network requests (fetch, WebSockets).
- TICK1default-srcTICK1: The mathematical fallback if a specific directive is not defined.

If the HTML parser hits a resource that violates the active directive, the engine mathematically intervenes, drops the request into the void, logs an error to the console, and optionally fires an automated JSON report to the company's security servers.

## 2. Mathematical / Theoretical Foundation

The most mathematically secure configuration of CSP is the **Nonce-based Architecture**.

Historically, administrators tried to secure websites using Domain Whitelists (e.g., TICK1script-src 'self' https://trusted.comTICK1). However, security researchers proved this mathematically flawed. If TICK1trusted.comTICK1 (like a CDN) hosted an outdated, vulnerable script (like an old version of jQuery), an attacker could inject a script tag pointing to that exact vulnerable URL. Because the domain was mathematically whitelisted, the browser allowed the attack to execute.

Modern "Strict CSP" utilizes **Cryptographic Nonces (Number Used Once)**.

When the server renders the HTML, it generates a mathematically random, unguessable string (e.g., TICK1c3BvYm9zTICK1).
1. It injects this string into the HTTP Header: TICK1Content-Security-Policy: script-src 'nonce-c3BvYm9z' 'strict-dynamic'TICK1
2. It injects this exact string into every valid script tag in the HTML: TICK1<script nonce="c3BvYm9z" src="app.js"></script>TICK1

When the attacker manages to inject TICK1<script>evil()</script>TICK1, they mathematically cannot know what the random nonce is for that specific page load. Because their script tag lacks the matching cryptographic nonce, the browser's C++ engine instantly incinerates the malicious script.

## 3. Real-World Implementation

Implementing a basic CSP in a Node.js/Express application is typically done using security middleware like **Helmet**. 

Here is how you mathematically define a robust, modern security policy.

TICK3javascript
const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');
const app = express();

// Middleware to generate a mathematically random cryptographic nonce for every single HTTP request
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Configure Helmet to inject the Content-Security-Policy HTTP Header
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // The default fallback: only allow resources from our own domain
      defaultSrc: ["'self'"],
      
      // Scripts: Require the cryptographic nonce, and prevent ALL inline <script> tags
      scriptSrc: [
        "'self'",
        (req, res) => "'nonce-" + res.locals.nonce + "'",
        // 'strict-dynamic' allows trusted scripts to load other scripts dynamically
        "'strict-dynamic'",
      ],
      
      // Styles: Allow our domain and Google Fonts
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      
      // Images: Allow our domain, AWS S3, and inline base64 data URIs
      imgSrc: ["'self'", 'data:', 'https://my-bucket.s3.amazonaws.com'],
      
      // Connections: Where can the app send fetch() requests?
      connectSrc: ["'self'", 'https://api.mycompany.com'],
      
      // Reporting: If an attacker tries to inject a script and the browser blocks it, 
      // the browser will automatically POST a JSON forensic report to this endpoint
      reportUri: '/api/security-audit/csp-violation',
    },
  })
);

app.get('/', (req, res) => {
  // The server renders the HTML, injecting the exact same nonce into the valid script tag
  res.send(TICK1
    <!DOCTYPE html>
    <html>
      <head>
        <title>Secure Banking</title>
      </head>
      <body>
        <h1>Secure Dashboard</h1>
        <!-- This script is mathematically authorized to execute -->
        <script nonce="TICK1 + res.locals.nonce + TICK1" src="/app.js"></script>
        
        <!-- If an attacker injected this, the browser will mathematically block it! -->
        <script>alert('Stealing cookies!');</script>
      </body>
    </html>
  TICK1);
});
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Server
        Headers[Generates HTTP Header:<br/>CSP: script-src 'nonce-xyz']
        HTML[Generates HTML:<br/>script nonce='xyz']
    end

    subgraph Browser Engine (C++ Parser)
        ParseHeader[Parse CSP Header]
        ParseHeader --> Store[Store Nonce 'xyz' in Memory]
        
        Store --> ReadHTML[Read incoming HTML stream]
        ReadHTML --> Check1{Found valid script<br/>nonce='xyz'}
        Check1 -->|Matches Math| Exec[Execute App.js]
        
        ReadHTML --> Check2{Found injected script<br/>No nonce!}
        Check2 -->|Fails Math| Destroy[Block Execution!]
        Destroy --> Report[POST violation report to Server]
    end

    Headers --> ParseHeader
    HTML --> ReadHTML
TICK3

## 5. Interview Prep

**Q: What is the TICK1'unsafe-inline'TICK1 directive?**
**A:** It is a mathematical surrender. Adding TICK1'unsafe-inline'TICK1 to your TICK1script-srcTICK1 tells the browser to allow raw TICK1<script>TICK1 tags and inline TICK1onclick=""TICK1 attributes to execute. This completely defeats the primary purpose of CSP, re-opening the application to massive XSS vulnerabilities. You should mathematically refactor your application to use external JS files and EventListeners instead of inline scripts.

**Q: What is the TICK1Content-Security-Policy-Report-OnlyTICK1 header?**
**A:** When deploying CSP to a massive legacy enterprise application (like a 10-year-old React codebase), turning on Strict CSP will likely mathematically break the entire website because you missed some valid inline scripts. The TICK1Report-OnlyTICK1 header tells the browser's C++ engine: "Run the math, block nothing, but if you *would* have blocked something, send a JSON report." Engineers use this for weeks to monitor the reports, fix the code, and only switch to the enforcing header when the errors drop to zero.

**Q: Can CSP mitigate Clickjacking?**
**A:** Yes. Clickjacking involves an attacker embedding your banking website inside an invisible TICK1<iframe>TICK1 on their malicious site, tricking the user into clicking buttons on your site. The TICK1frame-ancestors 'none'TICK1 directive inside a CSP mathematically commands the browser to refuse to render the page if it is enclosed within any iframe, completely neutralizing the attack.

## 6. Production Use Cases

- **Zero-Trust Security Architectures:** Banks and fintech startups implement incredibly strict Nonce-based CSPs. Even if a junior developer accidentally introduces an XSS vulnerability via a vulnerable NPM package (like a flawed markdown parser that doesn't sanitize inputs), the attacker's injected payload is mathematically rendered inert by the browser's CSP engine, saving the company from a catastrophic data breach.
- **Automated Security Telemetry:** Massive engineering organizations like Netflix and Google use the TICK1reportUriTICK1 directive to pipe thousands of violation JSON blobs into Elasticsearch/Kibana dashboards. If a new deployment introduces a broken library that tries to use TICK1eval()TICK1 (which CSP mathematically blocks by default), the security team's dashboards instantly spike with errors, allowing them to roll back the deployment in minutes.

<Callout icon="info" title="The Death of eval()">
By default, the mathematical execution of TICK1eval()TICK1, TICK1setTimeout(string)TICK1, and TICK1new Function(string)TICK1 is entirely banned by a standard CSP. These functions take a raw string and execute it as JavaScript, which is incredibly dangerous. Unless you explicitly add TICK1'unsafe-eval'TICK1 to your policy, the browser's V8 engine will intercept and block any attempt to compile a dynamic string into executable code.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '```')
      .replace(/TICK1/g, '`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
