import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.2 Web Security/Clickjacking/index.mdx': `---
title: Clickjacking
description: A UI redressing attack where an attacker tricks a user into clicking on a hidden, actionable element on a different website.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Clickjacking (UI Redressing)">

**Clickjacking** is an attack that mathematically tricks the victim's visual perception. 

The attacker creates a malicious website (e.g., \`free-ipads.com\`) that contains a large, enticing "Click Here to Win" button. However, the attacker mathematically embeds a transparent \`<iframe>\` of the victim's bank account directly *on top* of the "Win" button. When the user clicks to win, their mouse physically clicks the invisible "Transfer Funds" button inside the banking iframe.

<Callout icon="warning" title="Invisible Exploitation">
  Because the victim is already authenticated to their bank, the bank mathematically registers the click as a perfectly legitimate, authenticated action. The browser attaches the session cookies, and the transaction succeeds.
</Callout>

## The Mitigation: Frame Busting

1. **X-Frame-Options:** The legacy, but highly effective, mathematical HTTP header. A server can return \`X-Frame-Options: DENY\`, which tells the browser "Never allow this webpage to be rendered inside an iframe anywhere on the internet."
2. **Content Security Policy (CSP):** The modern approach. The server returns \`Content-Security-Policy: frame-ancestors 'self'\`, which mathematically instructs the browser that this page can only be framed by other pages on the exact same domain.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/CSP/index.mdx': `---
title: Content Security Policy (CSP)
description: An added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Content Security Policy (CSP)">

If a web server tells a browser to render a webpage, the browser blindly trusts everything the server sends. If an attacker injects a malicious \`<script src="hacker.com/malware.js"></script>\` into the page, the browser will mathematically execute it because it cannot distinguish between the developer's code and the attacker's code.

**Content Security Policy (CSP)** is a mathematical HTTP header that solves this. It acts as a strict whitelist, explicitly telling the browser exactly which domains are allowed to execute scripts, load images, or open WebSockets.

<Callout icon="success" title="The Ultimate XSS Defense">
  A strong CSP is the single most effective defense against XSS. If your CSP is \`default-src 'self'\`, and an attacker successfully injects a malicious script tag pointing to \`hacker.com\`, the browser will mathematically refuse to load it, completely neutralizing the attack.
</Callout>

## Core CSP Directives

<ComparisonTable 
  headers={['Directive', 'Example', 'Meaning']}
  rows={[
    ['default-src', \`'self'\`, 'The fallback whitelist. Only allow resources to be loaded from the exact same domain as the current webpage.'],
    ['script-src', \`'self' https://apis.google.com\`, 'Only allow JavaScript to execute if it comes from our own domain or Google\\'s API domain. Mathematically blocks all inline \`<script>\` blocks.'],
    ['img-src', \`*\`, 'Allow images to be loaded from absolutely anywhere on the internet (useful for user-generated content).']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/Command injection/index.mdx': `---
title: OS Command Injection
description: A critical vulnerability that allows an attacker to execute arbitrary operating system commands on the server that is running an application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OS Command Injection">

Sometimes, web applications need to interact with the underlying server. For example, a network diagnostic tool might take an IP address from the user and mathematically pass it to the server's \`ping\` command.

**Command Injection** occurs when the application takes unsanitized user input and blindly concatenates it into a shell command. 

<Callout icon="error" title="The Exploit">
  If the underlying code is \`system("ping -c 4 " + userInput)\`, an attacker can input: \`8.8.8.8; rm -rf /\`. 
  
  The shell mathematically interprets the semicolon (\`;\`) as the end of the first command, and instantly executes the second command, wiping the entire server.
</Callout>

## Prevention Methods

1. **Avoid Shell Commands:** The best defense is to never call out to the OS shell mathematically. Use built-in language libraries instead. (e.g., Instead of calling \`mkdir\`, use Node.js \`fs.mkdir()\`).
2. **Strict Whitelisting:** If you must use user input, validate it against a rigid mathematical regex. If the input is supposed to be an IP address, ensure it *only* contains numbers and periods.
3. **Parameterization:** Use APIs that safely separate the command from the arguments. In Node.js, using \`execFile('ping', ['-c', '4', userInput])\` ensures the input is mathematically treated as a literal string argument, not an executable shell operator.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/CORS vulnerabilities/index.mdx': `---
title: Cross-Origin Resource Sharing (CORS)
description: An HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Origin Resource Sharing (CORS)">

By default, web browsers strictly enforce the **Same-Origin Policy (SOP)**. If JavaScript running on \`frontend.com\` tries to make an API \`fetch()\` call to \`api.backend.com\`, the browser will mathematically block it because the domains do not match.

**CORS** is the mathematical mechanism that allows servers to punch a deliberate hole in the SOP, telling the browser: "It is safe to let \`frontend.com\` read this data."

<Callout icon="warning" title="The Wildcard Danger">
  The most common CORS vulnerability is a lazy configuration. If a developer sets \`Access-Control-Allow-Origin: *\`, they are mathematically telling the browser that *any website on the internet* is allowed to read data from their API using the victim's session cookies.
</Callout>

## The Preflight Request (OPTIONS)

Before the browser sends a complex request (like a POST with JSON data) across origins, it first mathematically sends a stealthy \`OPTIONS\` request, known as a **Preflight**. 

The browser asks the API: "Are you configured to accept a POST request from my origin?" If the API responds with the correct CORS headers, the browser mathematically releases the actual POST request. If not, the browser throws a CORS error in the console.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/ARP spoofing/index.mdx': `---
title: ARP Spoofing (ARP Poisoning)
description: A Man-in-the-Middle attack where a malicious actor sends falsified ARP (Address Resolution Protocol) messages over a local area network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARP Spoofing">

On a local network (like office WiFi), computers do not communicate using IP addresses; they mathematically use hardware MAC addresses. 

The **Address Resolution Protocol (ARP)** is how a computer asks the network: "Who has IP address 192.168.1.1? Please reply with your MAC address."

Because ARP was designed in the 1980s, it has absolutely zero mathematical authentication. Anyone can lie.

<Callout icon="error" title="The Poisoning Process">
  In an **ARP Spoofing** attack, the hacker's computer constantly shouts false ARP replies into the network:
  1. It tells the Victim: "I am the Router" (so the victim sends their web traffic to the hacker).
  2. It tells the Router: "I am the Victim" (so the router sends the web replies to the hacker).
  The hacker is now a perfect Man-in-the-Middle.
</Callout>

## Mitigation Strategies

<ComparisonTable 
  headers={['Strategy', 'Description']}
  rows={[
    ['Dynamic ARP Inspection (DAI)', 'A security feature built into enterprise network switches. The switch mathematically maintains a secure database of valid IP-to-MAC bindings and instantly drops any spoofed ARP packets.'],
    ['Static ARP Entries', 'Hardcoding the router\\'s MAC address into the operating system\\'s ARP cache. Mathematically secure, but impossible to manage at scale.'],
    ['VPN / TLS', 'While it doesn\\'t stop the spoofing itself, enforcing end-to-end encryption mathematically ensures that even if the attacker intercepts the traffic, they cannot read or alter it.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Ghidra/index.mdx': `---
title: Ghidra
description: A software reverse engineering (SRE) suite of tools developed by NSA's Research Directorate in support of the Cybersecurity mission.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ghidra">

When malware analysts discover a new virus, they don't get the clean, readable Python or C++ source code. They only get the compiled, mathematical 1s and 0s (machine code). 

**Ghidra** is a powerful reverse-engineering framework, released to the public by the NSA in 2019, designed to mathematically translate that machine code back into readable logic.

<Callout icon="tip" title="The Decompiler Advantage">
  Historically, analysts had to read raw Assembly language (IDA Pro), which is incredibly difficult. Ghidra's killer feature is its built-in **Decompiler**. It mathematically attempts to translate the assembly instructions back into high-level C-style code, massively speeding up malware analysis.
</Callout>

## Core Capabilities

1. **Disassembly:** Converting raw binary executables (like Windows \`.exe\` or Linux \`.elf\` files) into readable assembly instructions.
2. **Decompilation:** Mathematically reconstructing the original logic (if-statements, loops, variables) into pseudo-C code.
3. **Collaboration:** Unlike older tools, Ghidra was designed from day one to allow multiple analysts to mathematically work on the exact same binary simultaneously over a network, sharing their annotations and findings in real-time.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Cobalt Strike/index.mdx': `---
title: Cobalt Strike
description: A commercial threat emulation software used by Red Teams to simulate Advanced Persistent Threats (APTs) in enterprise networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cobalt Strike">

**Cobalt Strike** is the industry standard for high-end Red Teaming. While tools like Metasploit are designed for finding and exploiting mathematical vulnerabilities, Cobalt Strike focuses purely on "Post-Exploitation"—what happens *after* the attacker has already breached the first machine.

It is designed to mathematically emulate the stealth, lateral movement, and data exfiltration techniques used by elite nation-state hackers (APTs).

<Callout icon="warning" title="The Double-Edged Sword">
  Because Cobalt Strike is so effective at evading detection, cracked versions of it are heavily utilized by real-world ransomware gangs (like Conti and REvil). It is arguably the most common Command and Control (C2) framework used by modern threat actors.
</Callout>

## Core Features

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Beacons', 'The payload deployed to a compromised machine. Instead of maintaining a loud, permanent connection, Beacons mathematically "sleep" for hours, waking up briefly to ask the C2 server for new commands.'],
    ['Malleable C2', 'A feature that allows the Red Team to mathematically alter the network signature of the Beacons. They can make the malware traffic look exactly like harmless Amazon AWS API calls or Spotify streaming data to bypass the IPS.'],
    ['Lateral Movement', 'Built-in tools to quietly pivot from the initial compromised laptop into the Domain Controller without triggering EDR alerts.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/Authentication/index.mdx': `---
title: Authentication
description: The process of verifying the identity of a user, process, or device, often as a prerequisite to allowing access to resources in an information system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Authentication">

In the physical world, authentication is showing your passport at the border. In cybersecurity, **Authentication** is the mathematical process of proving that an entity (a human or a machine) is exactly who they claim to be.

It is the very first step in Identity and Access Management (IAM), occurring *before* Authorization.

<Callout icon="info" title="The Three Authentication Factors">
  Mathematical proof of identity relies on one or more of these three fundamental factors:
  1. **Knowledge:** Something you know (e.g., a Password, a PIN).
  2. **Possession:** Something you have (e.g., a Smartphone, a YubiKey hardware token).
  3. **Inherence:** Something you are (e.g., a Fingerprint, FaceID biometrics).
</Callout>

## Modern Authentication Paradigms

<ComparisonTable 
  headers={['Paradigm', 'Mechanism']}
  rows={[
    ['Single Sign-On (SSO)', 'The user authenticates once against a central mathematical Identity Provider (IdP) like Okta. The IdP then issues trusted cryptographic tokens (SAML/OIDC) to automatically log the user into all other corporate apps.'],
    ['Passwordless Authentication', 'Replacing passwords entirely with cryptographic possession. The user relies on their device\\'s secure enclave (like Apple FaceID or Windows Hello) to mathematically sign challenges from the server (WebAuthn/FIDO2).'],
    ['Machine-to-Machine (M2M)', 'Servers talking to servers. Uses mathematical mechanisms like Mutual TLS (mTLS) or API Keys rather than human passwords.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/Authorisation/index.mdx': `---
title: Authorization (Access Control)
description: The function of specifying access rights/privileges to resources related to information security and computer security in general.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Authorization (Access Control)">

If *Authentication* is verifying your identity at the front door of the building, **Authorization** is the mathematical process of determining which specific rooms inside the building your keycard can open.

Once a system knows exactly who you are, it must enforce strict mathematical rules to ensure you can only perform actions (Read, Write, Delete) on resources you are explicitly permitted to access.

<Callout icon="warning" title="The Golden Rule">
  The core tenet of Authorization is the **Principle of Least Privilege**. A user or system should mathematically be granted the absolute minimum level of access necessary to perform their job functions, and nothing more.
</Callout>

## Common Authorization Models

<ComparisonTable 
  headers={['Model', 'Acronym', 'Description']}
  rows={[
    ['Role-Based Access Control', 'RBAC', 'Access is mathematically granted based on the user\\'s job role (e.g., "Managers" can approve expenses, "Engineers" cannot). This is the most common model in enterprise software.'],
    ['Attribute-Based Access Control', 'ABAC', 'A much finer-grained model. Access is mathematically calculated dynamically based on attributes (e.g., "Allow access IF user=Manager AND time=BusinessHours AND location=Office").'],
    ['Discretionary Access Control', 'DAC', 'The owner of the data mathematically decides who gets access (e.g., Google Drive, where you can click "Share" and type a friend\\'s email).'],
    ['Mandatory Access Control', 'MAC', 'Used by the military. The system strictly enforces mathematical clearance levels (e.g., Top Secret). Even the owner of a document cannot override the system to share it with an unauthorized person.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/MFA/index.mdx': `---
title: Multi-Factor Authentication (MFA)
description: An authentication method that requires the user to provide two or more verification factors to gain access to a resource.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Factor Authentication (MFA)">

Because humans are mathematically terrible at choosing passwords, and hackers routinely steal them via phishing or massive database breaches, a password alone is no longer considered secure.

**Multi-Factor Authentication (MFA)** requires the user to present mathematically distinct pieces of evidence from at least two different categories (Knowledge, Possession, Inherence).

<Callout icon="success" title="The Effectiveness of MFA">
  According to Microsoft, enforcing MFA mathematically blocks 99.9% of all automated account compromise attacks. Even if a hacker has your password, they cannot log in without also physically stealing your phone.
</Callout>

## The Hierarchy of MFA Security

Not all MFA is created equal. Some methods are mathematically stronger than others:

<ComparisonTable 
  headers={['Method', 'Security Level', 'Vulnerabilities']}
  rows={[
    ['SMS Text Messages', 'Low', 'Highly vulnerable to SIM Swapping attacks (where the hacker tricks the telecom company into porting your phone number to their SIM card).'],
    ['Authenticator Apps (TOTP)', 'Medium', 'Apps like Google Authenticator mathematically generate a 6-digit code every 30 seconds. Vulnerable to advanced phishing (Adversary-in-the-Middle), where the fake website asks the user to type in the 6-digit code.'],
    ['Hardware Security Keys (FIDO2)', 'Maximum', 'Physical USB keys like a YubiKey. They mathematically bind the authentication challenge to the specific TLS certificate of the website. They are cryptographically immune to phishing.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega68() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega68().catch(console.error)
