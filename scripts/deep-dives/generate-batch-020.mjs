import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/CSSOM/index.mdx',
    content: "---" + "\\n" +
"title: CSSOM (CSS Object Model)" + "\\n" +
'description: "The mathematical tree structure that represents all CSS styles parsed by the browser, determining exactly how every node in the DOM should be visually rendered."' + "\\n" +
"---" + "\\n" +
"import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'" + "\\n" +
"import { Callout } from '@/features/kb/components/mdx/Callout'" + "\\n" +
"" + "\\n" +
"export default function Layout({ children }) {" + "\\n" +
"  return (" + "\\n" +
"    <ConceptTemplate title=\"CSS Object Model (CSSOM)\">" + "\\n" +
"      {children}" + "\\n" +
"    </ConceptTemplate>" + "\\n" +
"  )" + "\\n" +
"}" + "\\n" +
"" + "\\n" +
"The Document Object Model (DOM) mathematically structures the *content* of a webpage. The **CSS Object Model (CSSOM)** mathematically structures the *style* of a webpage." + "\\n" +
"" + "\\n" +
"When a browser downloads an HTML file, it encounters CSS (either inline, in TICK1<style>TICK1 tags, or in external TICK1.cssTICK1 files). The browser physically cannot use raw text to calculate geometry. It must parse the CSS into an immense, deeply nested C++ tree in memory. This tree is the CSSOM." + "\\n" +
"" + "\\n" +
"## 1. Deep Dive & Mechanics" + "\\n" +
"" + "\\n" +
"The most critical architectural aspect of the CSSOM is that its construction is **Render Blocking**." + "\\n" +
"" + "\\n" +
"If the browser is parsing HTML and hits a TICK1<link rel=\"stylesheet\" href=\"style.css\">TICK1 tag, the HTML parser does not stop. The DOM continues to be built. However, the browser **mathematically refuses to render a single pixel to the screen** until the TICK1style.cssTICK1 file is downloaded and the entire CSSOM tree is fully constructed." + "\\n" +
"" + "\\n" +
"Why? Because if the browser painted the DOM *before* the CSSOM was ready, you would see a Flash of Unstyled Content (FOUC). A millisecond later, the CSSOM would finish, forcing the browser to mathematically recalculate the Layout of the entire page and repaint everything, which is incredibly expensive and visually jarring." + "\\n" +
"" + "\\n" +
"## 2. Mathematical / Theoretical Foundation" + "\\n" +
"" + "\\n" +
"The CSSOM computes the final, absolute style of a node via a mathematical process called **The Cascade**." + "\\n" +
"" + "\\n" +
"A single TICK1<p>TICK1 tag might be targeted by dozens of conflicting CSS rules. The CSSOM resolves these conflicts using a strict mathematical formula known as **Specificity**." + "\\n" +
"Specificity is calculated as a 3-digit vector: TICK1(A, B, C)TICK1" + "\\n" +
"- **A:** Number of ID selectors (TICK1#headerTICK1)" + "\\n" +
"- **B:** Number of Class selectors, Attributes, and Pseudo-classes (TICK1.activeTICK1, TICK1[type=\"text\"]TICK1, TICK1:hoverTICK1)" + "\\n" +
"- **C:** Number of Tag selectors and Pseudo-elements (TICK1h1TICK1, TICK1::beforeTICK1)" + "\\n" +
"" + "\\n" +
"If Rule 1 has specificity TICK1(1, 0, 0)TICK1 and Rule 2 has specificity TICK1(0, 2, 5)TICK1, the CSSOM mathematically compares the vectors from left to right. TICK11 > 0TICK1, so Rule 1 wins entirely. The TICK12TICK1 and TICK15TICK1 in Rule 2 are mathematically irrelevant." + "\\n" +
"" + "\\n" +
"## 3. Real-World Implementation" + "\\n" +
"" + "\\n" +
"You can mathematically read and manipulate the CSSOM directly using JavaScript." + "\\n" +
"" + "\\n" +
"TICK3javascript" + "\\n" +
"// 1. Reading Computed Styles" + "\\n" +
"// If an element has width: 50%, JS cannot use element.style.width to find the pixel width." + "\\n" +
"// You must mathematically query the CSSOM for the final computed layout." + "\\n" +
"const box = document.getElementById('my-box');" + "\\n" +
"const computed = window.getComputedStyle(box);" + "\\n" +
"console.log('Absolute mathematical width:', computed.width); // '450px'" + "\\n" +
"" + "\\n" +
"// 2. Manipulating the CSSOM directly (High Performance)" + "\\n" +
"// Instead of altering inline styles on 10,000 DOM nodes," + "\\n" +
"// you can inject a new mathematical rule directly into the CSSOM tree." + "\\n" +
"const sheet = document.styleSheets[0]; // Grab the first stylesheet in the CSSOM" + "\\n" +
"sheet.insertRule('.dark-mode { background: #000; color: #fff; }', sheet.cssRules.length);" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 4. Visualizations" + "\\n" +
"" + "\\n" +
"TICK3mermaid" + "\\n" +
"graph TD" + "\\n" +
"    subgraph CSS Object Model (CSSOM)" + "\\n" +
"        Body[body<br/>font-size: 16px] --> Div[div.container<br/>width: 100%]" + "\\n" +
"        Div --> P[p<br/>color: red]" + "\\n" +
"        Div --> Span[span<br/>display: none]" + "\\n" +
"    end" + "\\n" +
"" + "\\n" +
"    subgraph DOM Tree" + "\\n" +
"        DOM_Body[body] --> DOM_Div[div.container]" + "\\n" +
"        DOM_Div --> DOM_P[p]" + "\\n" +
"        DOM_Div --> DOM_Span[span]" + "\\n" +
"    end" + "\\n" +
"" + "\\n" +
"    subgraph Render Tree" + "\\n" +
"        RT_Body[body<br/>font:16px] --> RT_Div[div<br/>width:100%]" + "\\n" +
"        RT_Div --> RT_P[p<br/>color:red]" + "\\n" +
"        Note[Note: The 'span' is mathematically deleted<br/>from the Render Tree because<br/>CSSOM says display: none!] -.-> RT_Div" + "\\n" +
"    end" + "\\n" +
"" + "\\n" +
"    Body -.-> RT_Body" + "\\n" +
"    DOM_Body -.-> RT_Body" + "\\n" +
"    Div -.-> RT_Div" + "\\n" +
"    DOM_Div -.-> RT_Div" + "\\n" +
"    P -.-> RT_P" + "\\n" +
"    DOM_P -.-> RT_P" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 5. Interview Prep" + "\\n" +
"" + "\\n" +
"**Q: Why does putting TICK1<script>TICK1 tags in the TICK1<head>TICK1 block rendering?**" + "\\n" +
"**A:** Because JavaScript has the ability to mathematically alter the CSSOM (via TICK1document.styleSheetsTICK1). If the browser hits a TICK1<script>TICK1, it is forced to completely halt parsing the DOM. Furthermore, it must mathematically wait for the CSSOM to finish building before it can even execute the script, because the script might ask for TICK1getComputedStyleTICK1. This creates a catastrophic performance bottleneck." + "\\n" +
"" + "\\n" +
"**Q: What is CSS-in-JS (like Styled Components) mathematically doing?**" + "\\n" +
"**A:** Historically, CSS-in-JS libraries did not use CSS files. They generated dynamic CSS strings at runtime in JavaScript and mathematically injected them into the CSSOM using a TICK1<style>TICK1 tag in the head. This causes massive runtime performance overhead because the browser has to re-parse the CSSOM every time a React component renders. Modern libraries (like Tailwind or CSS Modules) extract the CSS at compile-time to avoid this runtime CSSOM thrashing." + "\\n" +
"" + "\\n" +
"## 6. Production Use Cases" + "\\n" +
"" + "\\n" +
"- **Critical CSS (Performance):** Massive production sites (like Amazon) mathematically analyze their pages during the CI/CD build process to determine exactly which CSS rules are required to paint the very top of the page (Above the Fold). They inline this \"Critical CSS\" directly into a TICK1<style>TICK1 tag in the HTML. This allows the browser to instantly build a tiny CSSOM and paint the screen in 200ms, while asynchronously downloading the massive 2MB TICK1main.cssTICK1 file in the background." + "\\n" +
"" + "\\n" +
"<Callout icon=\"danger\" title=\"The getComputedStyle Thrashing\">" + "\\n" +
"Never call `window.getComputedStyle()` inside a loop or an animation frame if you can avoid it. When you query this function, you are forcing the browser's C++ engine to mathematically guarantee that the CSSOM is perfectly synchronized with the DOM. If you modified a style one millisecond before calling it, the browser will completely freeze the main thread and execute a Synchronous Layout Reflow to answer your query, decimating your framerate." + "\\n" +
"</Callout>"
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Cookies/index.mdx',
    content: "---" + "\\n" +
"title: Cookies" + "\\n" +
'description: "Small mathematical chunks of state data that a web server commands the browser to store and automatically attach to all future HTTP requests."' + "\\n" +
"---" + "\\n" +
"import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'" + "\\n" +
"import { Callout } from '@/features/kb/components/mdx/Callout'" + "\\n" +
"" + "\\n" +
"export default function Layout({ children }) {" + "\\n" +
"  return (" + "\\n" +
"    <ConceptTemplate title=\"HTTP Cookies\">" + "\\n" +
"      {children}" + "\\n" +
"    </ConceptTemplate>" + "\\n" +
"  )" + "\\n" +
"}" + "\\n" +
"" + "\\n" +
"HTTP is a **mathematically stateless** protocol. When you send a request to TICK1amazon.comTICK1, the server processes it and forgets you immediately. If you send another request one second later, the server has no idea who you are. " + "\\n" +
"" + "\\n" +
"To build modern web applications (like shopping carts or login sessions), we must mathematically simulate state on top of this stateless protocol. The original, foundational mechanism for this is the **HTTP Cookie**." + "\\n" +
"" + "\\n" +
"When you log in, the server responds with a special HTTP header: TICK1Set-Cookie: session_id=123TICK1. The browser's C++ engine intercepts this header, stores the string in its internal database, and mathematically binds it to the server's domain. For every subsequent request you make to TICK1amazon.comTICK1, the browser automatically, silently injects the header TICK1Cookie: session_id=123TICK1 into the outbound request." + "\\n" +
"" + "\\n" +
"## 1. Deep Dive & Mechanics" + "\\n" +
"" + "\\n" +
"Cookies are not just strings; they are highly complex security tokens governed by strict mathematical attributes:" + "\\n" +
"" + "\\n" +
"1. **Domain:** By default, a cookie set by TICK1api.github.comTICK1 is only sent back to TICK1api.github.comTICK1. You can mathematically expand this to include subdomains by setting TICK1Domain=.github.comTICK1, but you can NEVER set a cookie for a domain you do not own (e.g., TICK1Domain=google.comTICK1). The browser will aggressively reject it." + "\\n" +
"2. **Path:** Restricts the cookie to a specific URL route (e.g., TICK1Path=/adminTICK1)." + "\\n" +
"3. **Expires / Max-Age:** If neither is set, the cookie is a \"Session Cookie\" and is mathematically destroyed the moment the user closes the browser window." + "\\n" +
"" + "\\n" +
"## 2. Mathematical / Theoretical Foundation" + "\\n" +
"" + "\\n" +
"The most critical evolution in Cookie mechanics is the defense against **Cross-Site Scripting (XSS)** and **Cross-Site Request Forgery (CSRF)**." + "\\n" +
"" + "\\n" +
"If a cookie contains your banking authentication token, and an attacker injects TICK1<script>alert(document.cookie)</script>TICK1 into the page (XSS), they can mathematically extract your token and steal your account." + "\\n" +
"" + "\\n" +
"To defeat this, engineers introduced the **HttpOnly** flag. If the server sends TICK1Set-Cookie: session=123; HttpOnlyTICK1, the browser mathematically encrypts the cookie away from the V8 JavaScript engine. TICK1document.cookieTICK1 will return a blank string. The browser will still attach the cookie to network requests, but JavaScript physically cannot touch it." + "\\n" +
"" + "\\n" +
"To defeat CSRF, engineers introduced the **SameSite** flag. Historically, if you were logged into your bank, and you visited TICK1evil.comTICK1, TICK1evil.comTICK1 could submit a hidden TICK1<form action=\"bank.com/transfer\">TICK1. The browser would see a request going to TICK1bank.comTICK1 and blindly attach your authentication cookie, executing the transfer! " + "\\n" +
"By setting TICK1SameSite=StrictTICK1, the browser mathematically verifies the Origin of the request. If the request did not originate from the bank's own URL, the browser explicitly drops the cookie from the request, neutralizing the attack." + "\\n" +
"" + "\\n" +
"## 3. Real-World Implementation" + "\\n" +
"" + "\\n" +
"Here is how a production Node.js/Express server mathematically issues a secure, unhackable authentication cookie." + "\\n" +
"" + "\\n" +
"TICK3javascript" + "\\n" +
"app.post('/api/login', (req, res) => {" + "\\n" +
"  // 1. Authenticate user in the database" + "\\n" +
"  const token = generateSecureJWT(req.body.username, req.body.password);" + "\\n" +
"" + "\\n" +
"  // 2. Mathematically construct the Set-Cookie header with maximum security flags" + "\\n" +
"  res.cookie('auth_token', token, {" + "\\n" +
"    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 Week in milliseconds" + "\\n" +
"    httpOnly: true, // Mathematically ban JavaScript from reading this token (Stops XSS)" + "\\n" +
"    secure: true,   // Mathematically ban the browser from sending this cookie over unencrypted HTTP" + "\\n" +
"    sameSite: 'strict', // Mathematically ban the browser from sending this on cross-site requests (Stops CSRF)" + "\\n" +
"    domain: 'mycompany.com' // Allow the cookie to be sent to api.mycompany.com and app.mycompany.com" + "\\n" +
"  });" + "\\n" +
"" + "\\n" +
"  res.json({ success: true });" + "\\n" +
"});" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 4. Visualizations" + "\\n" +
"" + "\\n" +
"TICK3mermaid" + "\\n" +
"sequenceDiagram" + "\\n" +
"    participant Client as User Browser" + "\\n" +
"    participant Server as Web Server" + "\\n" +
"" + "\\n" +
"    Note over Client, Server: 1. Initial Authentication" + "\\n" +
"    Client->>Server: POST /login (username, password)" + "\\n" +
"    Server-->>Client: 200 OK<br/>Set-Cookie: session=abc; HttpOnly; Secure" + "\\n" +
"    " + "\\n" +
"    Note over Client: Browser engine intercepts header<br/>and saves 'session=abc' in internal DB" + "\\n" +
"" + "\\n" +
"    Note over Client, Server: 2. Subsequent Authenticated Request" + "\\n" +
"    Client->>Server: GET /dashboard<br/>Cookie: session=abc" + "\\n" +
"    Note over Server: Server reads Cookie header,<br/>validates 'abc', and returns private data." + "\\n" +
"    Server-->>Client: 200 OK (Dashboard Data)" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 5. Interview Prep" + "\\n" +
"" + "\\n" +
"**Q: What is the difference between Cookies, LocalStorage, and SessionStorage?**" + "\\n" +
"**A:** LocalStorage is a massive (5MB) JavaScript-accessible database that persists forever, but it is mathematically completely ignored by HTTP requests. Cookies are tiny (4KB), but they are intrinsically tied to the HTTP protocol and are sent to the server on *every single request*. SessionStorage is exactly like LocalStorage, but the browser mathematically deletes it the moment the tab is closed." + "\\n" +
"" + "\\n" +
"**Q: What are Third-Party Cookies and why are they dying?**" + "\\n" +
"**A:** A First-Party cookie is set by the domain you are currently looking at (e.g., TICK1nytimes.comTICK1). If TICK1nytimes.comTICK1 embeds an advertisement from TICK1facebook.comTICK1, the browser downloads the ad and Facebook sets a cookie for TICK1facebook.comTICK1. Because you are on NYTimes, the Facebook cookie is a \"Third-Party Cookie.\" If you then go to TICK1cnn.comTICK1, Facebook's ad loads again, reads its cookie, and mathematically realizes you visited both sites. Apple (Safari) and Mozilla (Firefox) have completely banned Third-Party cookies to protect privacy, and Google Chrome is phasing them out." + "\\n" +
"" + "\\n" +
"## 6. Production Use Cases" + "\\n" +
"" + "\\n" +
"- **Server-Side Rendering (SSR) Authentication:** If you build a Next.js or Remix application, you MUST use Cookies for authentication. If you store a JWT in LocalStorage, the Node.js server mathematically cannot see it during the SSR phase, meaning it cannot pre-render an authenticated dashboard. Because Cookies are sent at the raw HTTP layer, the Next.js server receives the cookie, authenticates it, and renders the HTML before sending it to the client." + "\\n" +
"- **A/B Testing and Analytics:** When a user hits a landing page, the server generates a random number (TICK1group=ATICK1) and sets a Cookie. For the next 30 days, every time that user loads the site, the browser sends TICK1group=ATICK1 to the server, mathematically guaranteeing the user receives a consistent UI experience without requiring them to log in." + "\\n" +
"" + "\\n" +
"<Callout icon=\"warning\" title=\"The Cookie Payload Penalty\">" + "\\n" +
"Because Cookies are attached to EVERY SINGLE HTTP request to that domain, they create a massive mathematical penalty for performance. If you store 4KB of JSON data in a Cookie, and your webpage requests 50 images from your domain, you are uploading 200KB of redundant HTTP Header data on a single page load. Never store heavy state in Cookies; only store lightweight session identifiers." + "\\n" +
"</Callout>"
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/DOM/index.mdx',
    content: "---" + "\\n" +
"title: Document Object Model (DOM)" + "\\n" +
'description: "The fundamental, language-agnostic programming interface that mathematically represents an HTML document as a hierarchical tree of highly interactive nodes."' + "\\n" +
"---" + "\\n" +
"import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'" + "\\n" +
"import { Callout } from '@/features/kb/components/mdx/Callout'" + "\\n" +
"" + "\\n" +
"export default function Layout({ children }) {" + "\\n" +
"  return (" + "\\n" +
"    <ConceptTemplate title=\"Document Object Model (DOM)\">" + "\\n" +
"      {children}" + "\\n" +
"    </ConceptTemplate>" + "\\n" +
"  )" + "\\n" +
"}" + "\\n" +
"" + "\\n" +
"When a server sends a web page to a browser, it sends raw, unstructured text strings (TICK1<html><body>Hello</body></html>TICK1). JavaScript physically cannot operate on raw text strings to build complex applications." + "\\n" +
"" + "\\n" +
"The browser's C++ engine intercepts this text and mathematically parses it into a massive, object-oriented data structure called the **Document Object Model (DOM)**. The DOM converts every HTML tag, every piece of text, and every attribute into a distinct Node object in memory. This tree is the absolute mathematical foundation of all frontend engineering." + "\\n" +
"" + "\\n" +
"## 1. Deep Dive & Mechanics" + "\\n" +
"" + "\\n" +
"The DOM is not a JavaScript feature. It is a Web API provided by the browser (written in C++ or Rust) that exposes bindings to JavaScript." + "\\n" +
"" + "\\n" +
"The DOM is structured as a mathematically strict tree graph:" + "\\n" +
"1. **Document Node:** The absolute root of the mathematical tree (TICK1window.documentTICK1)." + "\\n" +
"2. **Element Nodes:** Represent HTML tags (TICK1<body>TICK1, TICK1<div>TICK1, TICK1<a>TICK1). These nodes contain structural APIs like TICK1appendChild()TICK1 or TICK1getAttribute()TICK1." + "\\n" +
"3. **Text Nodes:** The literal text inside an Element Node. Mathematically, text is not a property of a TICK1<p>TICK1 tag; it is an entirely separate child Node of the TICK1<p>TICK1 element." + "\\n" +
"4. **Attribute Nodes:** Deprecated as standalone nodes in modern specs, but historically represented TICK1idTICK1 or TICK1classTICK1." + "\\n" +
"" + "\\n" +
"## 2. Mathematical / Theoretical Foundation" + "\\n" +
"" + "\\n" +
"The most computationally complex mathematical operation in the DOM is **Traversing and Live Collections**." + "\\n" +
"" + "\\n" +
"Historically, methods like TICK1document.getElementsByTagName('div')TICK1 returned an TICK1HTMLCollectionTICK1. This is not an array; it is a **Live mathematical binding** to the C++ engine. If you query the DOM for 10 divs, and then you use JavaScript to add an 11th div to the page, the TICK1HTMLCollectionTICK1 mathematically mutates itself instantly to contain 11 items." + "\\n" +
"" + "\\n" +
"This live binding caused catastrophic infinite loops in early web development:" + "\\n" +
"TICK3javascript" + "\\n" +
"const divs = document.getElementsByTagName('div');" + "\\n" +
"// INFINITE LOOP: The length mathematically increases by 1 every iteration!" + "\\n" +
"for (let i = 0; i < divs.length; i++) {" + "\\n" +
"  document.body.appendChild(document.createElement('div')); " + "\\n" +
"}" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"Modern specifications introduced TICK1document.querySelectorAll()TICK1, which mathematically returns a **Static NodeList**. It takes a snapshot of the DOM at that exact millisecond. If the DOM changes later, the NodeList mathematically ignores the change, making it immensely safer and faster for functional programming." + "\\n" +
"" + "\\n" +
"## 3. Real-World Implementation" + "\\n" +
"" + "\\n" +
"Because crossing the boundary between the V8 JavaScript engine and the Blink C++ DOM engine is mathematically slow, modern frameworks (like React) abstract the DOM away entirely." + "\\n" +
"" + "\\n" +
"However, under the hood, React eventually executes these raw, fundamental DOM manipulation commands:" + "\\n" +
"" + "\\n" +
"TICK3javascript" + "\\n" +
"// 1. Mathematically query the DOM tree for a specific node" + "\\n" +
"const container = document.getElementById('app-root');" + "\\n" +
"" + "\\n" +
"// 2. Instantiate a raw C++ Element Node in memory (Not yet attached to the tree)" + "\\n" +
"const newDiv = document.createElement('div');" + "\\n" +
"newDiv.className = 'card';" + "\\n" +
"" + "\\n" +
"// 3. Instantiate a Text Node and attach it to the Element Node" + "\\n" +
"const text = document.createTextNode('Hello, DOM!');" + "\\n" +
"newDiv.appendChild(text);" + "\\n" +
"" + "\\n" +
"// 4. Using DocumentFragments for immense performance" + "\\n" +
"// If we need to add 1,000 items, appending them one by one triggers 1,000 Layout Reflows." + "\\n" +
"// A DocumentFragment is a mathematical \"ghost node\" that exists only in RAM." + "\\n" +
"const fragment = document.createDocumentFragment();" + "\\n" +
"for (let i = 0; i < 1000; i++) {" + "\\n" +
"  const item = document.createElement('li');" + "\\n" +
"  item.textContent = \`Item \${i}\`; // A safe alternative to text nodes" + "\\n" +
"  fragment.appendChild(item);" + "\\n" +
"}" + "\\n" +
"" + "\\n" +
"// 5. Mathematically mutate the live DOM tree exactly ONCE, triggering a single Reflow" + "\\n" +
"container.appendChild(fragment);" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 4. Visualizations" + "\\n" +
"" + "\\n" +
"TICK3mermaid" + "\\n" +
"graph TD" + "\\n" +
"    Doc[Document Node] --> HTML[Element: HTML]" + "\\n" +
"    HTML --> Head[Element: HEAD]" + "\\n" +
"    HTML --> Body[Element: BODY]" + "\\n" +
"    " + "\\n" +
"    Head --> Title[Element: TITLE]" + "\\n" +
"    Title --> TText(Text: 'My Page')" + "\\n" +
"    " + "\\n" +
"    Body --> H1[Element: H1]" + "\\n" +
"    H1 --> H1Text(Text: 'Welcome')" + "\\n" +
"    " + "\\n" +
"    Body --> Div[Element: DIV]" + "\\n" +
"    Div --> Attr(Attribute: class='container') -.-> Div" + "\\n" +
"    Div --> P[Element: P]" + "\\n" +
"    P --> PText(Text: 'This is the DOM.')" + "\\n" +
"" + "\\n" +
"    classDef textNode fill:#f97316,stroke:#c2410c;" + "\\n" +
"    class TText,H1Text,PText textNode;" + "\\n" +
"TICK3" + "\\n" +
"" + "\\n" +
"## 5. Interview Prep" + "\\n" +
"" + "\\n" +
"**Q: What is the Virtual DOM and why do React/Vue use it?**" + "\\n" +
"**A:** Mathematically, updating a property on a JavaScript object takes nanoseconds. Updating a property on a DOM Node requires crossing the IPC boundary into C++, which triggers a Layout engine recalculation, taking milliseconds. React builds a \"Virtual DOM\" (a massive JSON tree of pure JavaScript objects). When state changes, React updates the Virtual JSON tree instantly, mathematically diffs it against the old JSON tree, and then surgically issues the exact minimum number of real C++ DOM updates required (e.g., TICK1element.textContent = 'new'TICK1)." + "\\n" +
"" + "\\n" +
"**Q: What is the difference between TICK1innerHTMLTICK1 and TICK1textContentTICK1?**" + "\\n" +
"**A:** TICK1textContentTICK1 mathematically accesses only the Text Nodes within an element. It is incredibly fast and immune to security vulnerabilities. TICK1innerHTMLTICK1 invokes the browser's heavy C++ HTML Parser. If you pass TICK1element.innerHTML = '<b>text</b>'TICK1, the browser must tokenize the string, instantiate a new TICK1<b>TICK1 Element Node, and attach it. If the string contains TICK1<script>TICK1, you have introduced a catastrophic XSS vulnerability." + "\\n" +
"" + "\\n" +
"## 6. Production Use Cases" + "\\n" +
"" + "\\n" +
"- **Web Scraping and Automation:** Tools like Puppeteer or Cheerio exist purely to parse massive HTML strings into a DOM tree in backend memory, allowing engineers to mathematically query it (TICK1document.querySelectorAll('.price')TICK1) to extract data from target websites." + "\\n" +
"- **Rich Text Editors (WYSIWYG):** Applications like Google Docs or Notion mathematically hijack the DOM. Instead of using standard TICK1<textarea>TICK1 elements (which cannot render bold text or images), they use TICK1<div contenteditable=\"true\">TICK1. They then intercept every single keystroke, calculate exactly where the cursor is in the DOM tree, and manually instantiate and inject TICK1<b>TICK1 or TICK1<span>TICK1 nodes to format the text in real-time." + "\\n" +
"" + "\\n" +
"<Callout icon=\"warning\" title=\"The Memory Leak Threat\">" + "\\n" +
"In Single Page Applications (SPAs), memory leaks are primarily caused by mathematical DOM \"Detachment.\" If you use `document.getElementById('modal')`, save it to a global variable, and then remove the modal from the screen using `modal.remove()`, the C++ engine physically cannot Garbage Collect the memory. Even though the Node is removed from the visible tree, your global JavaScript variable still holds a mathematical pointer to it, permanently burning RAM until the tab is closed." + "\\n" +
"</Callout>"
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
