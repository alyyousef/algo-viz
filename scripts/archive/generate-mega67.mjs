import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.2 Web Security/OWASP Top 10/index.mdx': `---
title: OWASP Top 10
description: The industry-standard awareness document outlining the most critical security risks to web applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OWASP Top 10">

The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation dedicated to software security. Their flagship publication, the **OWASP Top 10**, is universally recognized as the canonical list of the most dangerous and prevalent web application vulnerabilities.

It is updated every few years (most recently in 2021) based on massive amounts of data collected from cybersecurity firms worldwide.

<Callout icon="warning" title="The Regulatory Standard">
  The OWASP Top 10 is not just advice; it is a regulatory benchmark. Frameworks like PCI-DSS explicitly mandate that developers be trained on the OWASP Top 10 and that applications are mathematically tested against these specific vulnerabilities before going to production.
</Callout>

## The 2021 Top 10 List

1. **A01: Broken Access Control:** Users acting outside of their intended mathematical permissions.
2. **A02: Cryptographic Failures:** Storing passwords in plaintext, or using deprecated algorithms like MD5.
3. **A03: Injection:** Malicious data being sent to an interpreter (like SQLi or XSS).
4. **A04: Insecure Design:** Missing security controls at the architectural level.
5. **A05: Security Misconfiguration:** Default passwords left unchanged, verbose error messages.
6. **A06: Vulnerable and Outdated Components:** Using old npm packages with known CVEs.
7. **A07: Identification and Authentication Failures:** Weak password policies, lack of MFA.
8. **A08: Software and Data Integrity Failures:** Deserialization flaws, CI/CD pipeline compromise.
9. **A09: Security Logging and Monitoring Failures:** Not logging critical events, allowing attackers to remain hidden.
10. **A10: Server-Side Request Forgery (SSRF):** Forcing the server to make arbitrary HTTP requests on the attacker's behalf.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Broken access control/index.mdx': `---
title: Broken Access Control
description: A vulnerability where users are able to access data or perform actions outside of their intended permissions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Broken Access Control">

According to the OWASP Top 10 (2021), **Broken Access Control** is the single most critical and common vulnerability on the internet. 

While *Authentication* proves who you are, *Authorization* (Access Control) dictates what you are allowed to do. If the web server mathematically fails to enforce these boundaries, a standard user might be able to view another user's private data, or worse, execute Administrator-level commands.

<Callout icon="tip" title="Insecure Direct Object Reference (IDOR)">
  The most famous form of Broken Access Control is IDOR. Imagine you log into your bank and the URL is \`bank.com/account?id=1234\`. What happens if you mathematically change the URL to \`id=1235\`? If the server just blindly serves the data without checking if YOU own account 1235, that is a critical IDOR vulnerability.
</Callout>

## Prevention Strategies

1. **Deny by Default:** Unless a route is explicitly marked as public, it should mathematically deny access to everyone.
2. **Server-Side Enforcement:** Never trust the client. Even if you hide the "Delete User" button in the React frontend, an attacker can mathematically craft the API request using Postman. The backend API must verify permissions on every single request.
3. **Use UUIDs instead of Integers:** If database IDs are sequential integers (1, 2, 3), they are easily guessable. If they are random UUIDs (\`550e8400-e29b-41d4-a716-446655440000\`), it is mathematically impossible for an attacker to guess another user's ID to attempt an IDOR attack.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Authentication flaws/index.mdx': `---
title: Authentication Flaws
description: Vulnerabilities in how a web application identifies and verifies its users, allowing attackers to compromise passwords, keys, or session tokens.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Authentication Flaws">

Authentication is the front door to an application. If the mathematical implementation of the login system is flawed, attackers can simply walk through the front door disguised as legitimate users, bypassing all internal firewalls and IDS sensors.

<Callout icon="warning" title="Credential Stuffing">
  The most common authentication attack today is Credential Stuffing. Hackers take billions of leaked username/password combinations from previous breaches (like the Yahoo breach) and mathematically automate scripts to try those exact combinations on *your* website, hoping users reused their passwords.
</Callout>

## Common Authentication Vulnerabilities

<ComparisonTable 
  headers={['Vulnerability', 'Description', 'Mitigation']}
  rows={[
    ['Weak Password Policies', 'Allowing users to set passwords like \`password123\`, which can be mathematically cracked in milliseconds.', 'Enforce length requirements (min 12 chars), and block known breached passwords using services like HaveIBeenPwned.'],
    ['Lack of Rate Limiting', 'Allowing an attacker to attempt 50,000 different passwords on the login screen in a single minute (Brute Force).', 'Implement CAPTCHAs, temporary account lockouts after 5 failed attempts, and mathematical IP-based rate limiting.'],
    ['Improper Session Invalidation', 'When a user clicks "Log Out," the frontend deletes the cookie, but the backend doesn\\'t actually destroy the mathematical session token in the database.', 'Ensure the backend strictly invalidates tokens on logout or timeout.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/XXE/index.mdx': `---
title: XML External Entity (XXE)
description: A severe vulnerability occurring when weakly configured XML parsers process XML input containing a reference to an external entity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="XML External Entity (XXE)">

Many older enterprise applications (and modern APIs like SOAP) communicate using XML instead of JSON. The XML specification includes a legacy feature called **Entities**, which act like variables. 

An **External Entity** allows the XML document to mathematically fetch data from a local file path or a URL and inject it into the document as it parses. If a server allows a user to upload XML and blindly parses it, an attacker can use XXE to steal files off the server.

<Callout icon="tip" title="The /etc/passwd Attack">
  An attacker uploads this payload: \`<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]><user>&xxe;</user>\`. If the XML parser is vulnerable, it will mathematically read the sensitive Linux password file from the hard drive and embed the text into the API response!
</Callout>

## The Impact of XXE

1. **Local File Disclosure:** The attacker can read sensitive configuration files, stealing AWS API keys or database passwords stored on the disk.
2. **Server-Side Request Forgery (SSRF):** Instead of pointing the entity at a local file (\`file://\`), the attacker points it at an internal IP address (\`http://192.168.1.50\`). The server will make an HTTP request to that internal machine, allowing the attacker to scan the private network behind the firewall.
3. **Billion Laughs Attack (DoS):** A Denial of Service attack where the attacker defines mathematical entities that expand exponentially. 10 entities that each call 10 other entities can crash the server's RAM in milliseconds.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/SSRF/index.mdx': `---
title: Server-Side Request Forgery (SSRF)
description: A vulnerability where an attacker tricks the server into making an HTTP request to an arbitrary domain of the attacker's choosing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Server-Side Request Forgery (SSRF)">

Modern web applications frequently need to fetch data from other URLs (e.g., fetching a profile picture from a URL the user provides). 

If the application does not mathematically validate the user's URL before fetching it, an attacker can supply an internal IP address (like \`http://127.0.0.1\` or \`http://localhost/admin\`). The server will dutifully make the request. Because the request is mathematically originating from *the server itself*, it bypasses the firewall and can access internal-only admin panels.

<Callout icon="warning" title="The Capital One Breach">
  The infamous 2019 Capital One breach, which exposed 100 million credit card applications, was executed via SSRF. The attacker exploited an SSRF vulnerability to query the AWS internal metadata service (\`http://169.254.169.254\`), which mathematically returned the master IAM credentials for the server.
</Callout>

## Types of SSRF

<ComparisonTable 
  headers={['Type', 'Description']}
  rows={[
    ['In-Band SSRF', 'The attacker provides a URL, the server makes the request, and returns the full HTTP response back to the attacker on the screen (e.g., returning the contents of the internal admin dashboard).'],
    ['Blind SSRF', 'The server makes the request, but does NOT return the result to the attacker. The attacker must mathematically infer if the port is open by timing how long the server takes to respond.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Session hijacking/index.mdx': `---
title: Session Hijacking
description: The exploitation of a valid computer session—sometimes also called a session key—to gain unauthorized access to information or services in a computer system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Session Hijacking">

Because HTTP is a mathematically stateless protocol, web applications use Session Cookies or JWTs (JSON Web Tokens) to remember who you are after you log in. This token is essentially your temporary digital passport.

If an attacker can mathematically steal your Session Cookie, they do not need your username, your password, or your 2FA code. They can simply inject the cookie into their own browser and instantly become you.

<Callout icon="tip" title="The Firesheep Era">
  In the early 2010s, a browser extension called Firesheep made session hijacking terrifyingly easy. If you were on public WiFi, it would mathematically sniff the unencrypted HTTP traffic, grab the Facebook session cookies of everyone in the coffee shop, and let the attacker click a button to log into their accounts. This forced the entire internet to adopt HTTPS.
</Callout>

## How Sessions are Hijacked

1. **Cross-Site Scripting (XSS):** If an attacker can inject malicious JavaScript into a page you visit, they can execute \`document.cookie\` and mathematically send your session token to their server. (Mitigation: Set the \`HttpOnly\` flag on the cookie).
2. **Packet Sniffing:** Intercepting unencrypted traffic over HTTP. (Mitigation: Force HTTPS everywhere and use the \`Secure\` flag on the cookie).
3. **Session Fixation:** The attacker forces the victim to log in using a specific session ID that the attacker already mathematically knows.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Security headers/index.mdx': `---
title: HTTP Security Headers
description: Mathematical directives sent by the server in the HTTP response to tell the user's browser how to behave securely.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP Security Headers">

Modern web browsers (Chrome, Firefox, Safari) contain massive amounts of built-in mathematical security features to protect users from XSS, Clickjacking, and MITM attacks. However, these features are often turned off by default to ensure backwards compatibility with older websites.

**HTTP Security Headers** are the mechanism developers use to explicitly instruct the browser to turn these defensive features on.

<Callout icon="success" title="The Easiest Security Win">
  Implementing security headers requires zero changes to the application code. They are simply mathematical key-value pairs added to the Nginx config or the Express backend middleware (like the \`helmet\` package in Node.js), providing massive defense-in-depth for free.
</Callout>

## The Critical Headers

<ComparisonTable 
  headers={['Header', 'Purpose']}
  rows={[
    ['Strict-Transport-Security (HSTS)', 'Mathematically forces the browser to ONLY ever communicate with the domain over HTTPS, permanently preventing SSL-Stripping MITM attacks.'],
    ['Content-Security-Policy (CSP)', 'The ultimate defense against XSS. Tells the browser exactly which domains are allowed to load JavaScript, preventing attackers from executing inline scripts.'],
    ['X-Frame-Options', 'Defends against Clickjacking by mathematically telling the browser that this website is never allowed to be rendered inside an \`<iframe>\` on a malicious site.'],
    ['X-Content-Type-Options', 'Set to \`nosniff\`. Prevents the browser from mathematically guessing the MIME type of a file, stopping attackers from disguising a malicious HTML file as an innocent image upload.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Insecure deserialization/index.mdx': `---
title: Insecure Deserialization
description: A vulnerability occurring when untrusted data is used to abuse the logic of an application, often leading to Remote Code Execution (RCE).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Insecure Deserialization">

**Serialization** is the mathematical process of taking a complex object in memory (like a Java User object) and converting it into a flat string of bytes so it can be saved to a database or sent over a network. **Deserialization** is putting it back together.

**Insecure Deserialization** occurs when an application receives serialized data from the user and blindly deserializes it without mathematically verifying its contents.

<Callout icon="warning" title="The Equifax Breach">
  Insecure Deserialization is incredibly dangerous because it almost always leads to full Remote Code Execution (RCE). The devastating 2017 Equifax breach, which compromised the financial data of 147 million Americans, was caused by an insecure deserialization flaw in the Apache Struts framework.
</Callout>

## How the Attack Works

1. The developer serializes a \`User\` object and sends it to the browser as a cookie (e.g., \`{ "role": "user", "isAdmin": false }\` converted to Base64).
2. The attacker decodes the Base64, mathematically changes the payload to \`{ "role": "admin", "isAdmin": true }\`, and re-serializes it.
3. When the server deserializes the modified payload, it blindly instantiates the object in memory, instantly granting the attacker administrative privileges.
4. **Advanced RCE:** If the attacker understands the mathematical structure of the backend language (Java, Python Pickle, PHP), they can craft a malicious object that mathematically executes a shell command (like \`whoami\` or \`rm -rf /\`) the exact millisecond the server attempts to instantiate the object.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Directory traversal/index.mdx': `---
title: Directory Traversal (Path Traversal)
description: A web security vulnerability that allows an attacker to read arbitrary files on the server that is running an application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Directory Traversal (Path Traversal)">

Web servers are mathematically designed to only serve files from a specific, public folder (the "web root", like \`/var/www/html\`).

A **Directory Traversal** vulnerability occurs when a developer writes code that takes user input to construct a file path, but fails to properly sanitize the input. By injecting "dot-dot-slash" (\`../\`) sequences, the attacker can mathematically command the server to traverse *up* and out of the web root, accessing private operating system files.

<Callout icon="tip" title="The Classic Payload">
  If a website loads an image via \`website.com/loadImage?file=logo.png\`, an attacker will mathematically manipulate the URL to: \`website.com/loadImage?file=../../../../etc/passwd\`. If vulnerable, the server will travel up 4 directories to the root of the Linux filesystem, read the sensitive password file, and return it to the attacker's browser.
</Callout>

## Mitigation Strategies

1. **Never Trust User Input:** Avoid passing user-supplied input directly to filesystem APIs at all costs.
2. **Whitelist Valid Files:** If the user must select a file (e.g., choosing a language file), strictly mathematically map their input to an internal hardcoded array (e.g., \`1 = en.txt\`, \`2 = fr.txt\`) rather than accepting a raw filename.
3. **Use Safe Path APIs:** Modern backend languages have built-in APIs (like \`path.basename()\` in Node.js) that mathematically strip out directory traversal characters (\`../\`) before the filesystem attempts to read the file.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/XSS (Stored, Reflected, DOM-based)/index.mdx': `---
title: Cross-Site Scripting (XSS)
description: A highly prevalent vulnerability where an attacker injects malicious client-side JavaScript into a trusted website.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Site Scripting (XSS)">

Normally, browsers rely on the **Same-Origin Policy (SOP)**: JavaScript loaded from \`google.com\` cannot mathematically access data on \`bank.com\`. 

**Cross-Site Scripting (XSS)** bypasses this. The attacker tricks the vulnerable website into delivering the malicious JavaScript to the victim's browser. Because the browser mathematically believes the script came from the trusted website, the script is allowed to steal the victim's session cookies or log their keystrokes.

<Callout icon="warning" title="The MySpace Samy Worm">
  In 2005, a hacker named Samy exploited a Stored XSS vulnerability in MySpace. Anyone who viewed his profile mathematically executed his hidden JavaScript, which forced their account to add him as a friend and copy the virus to their own profile. It infected over 1 million users in 20 hours.
</Callout>

## The Three Types of XSS

<ComparisonTable 
  headers={['Type', 'Mechanism', 'Danger Level']}
  rows={[
    ['Stored (Persistent)', 'The attacker injects the malicious JS into a database (e.g., a forum comment). When *any* user loads that page, the server mathematically serves the malware from the database to their browser.', 'Extreme. Can infect millions of passive users without any interaction.'],
    ['Reflected', 'The attacker mathematically embeds the JS into a malicious URL parameter. They must trick the victim into clicking the link. The server reads the URL and immediately reflects the JS back into the HTML response.', 'High. Requires social engineering to trick the victim into clicking the link.'],
    ['DOM-based', 'The vulnerability exists entirely in the frontend client-side JavaScript. The malicious payload never even reaches the backend server. It mathematically exploits flawed logic in frameworks like jQuery or React.', 'High. Invisible to backend security systems and WAFs.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega67() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega67().catch(console.error)
