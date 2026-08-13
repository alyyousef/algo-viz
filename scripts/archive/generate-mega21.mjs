import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/53. Authentication, Identity & Access/OAuth 2.0/index.mdx': `---
title: OAuth 2.0
description: The industry-standard protocol for authorization, allowing users to grant third-party applications secure, delegated access to their resources without sharing passwords.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="OAuth 2.0">

Before **OAuth 2.0**, if you wanted a new app to read your Gmail contacts, you had to type your actual Google password into the app. This was a catastrophic security risk because the new app now had god-level access to your entire Google account.

OAuth 2.0 solved this by introducing **Delegated Authorization** via Access Tokens.

## 1. The Core Roles
The OAuth specification defines four distinct entities:
1. **Resource Owner (You)**: The human user who owns the data.
2. **Client (The App)**: The third-party application requesting access to your data (e.g., a CRM app).
3. **Authorization Server**: The secure identity provider that issues tokens (e.g., Google's login server).
4. **Resource Server**: The API holding the actual data (e.g., Google Contacts API).

## 2. The Authorization Code Flow
This is the most secure and common flow for web applications.

1. **The Redirect**: The Client redirects you to Google's Authorization Server (TICK1https://accounts.google.com/authTICK1).
2. **The Consent**: You log into Google and see a prompt: *"App X wants to read your contacts."* You click "Allow".
3. **The Code**: Google redirects you back to the Client with a temporary **Authorization Code** in the URL.
4. **The Token Exchange**: The Client takes that Code, attaches its own secret API key, and makes a hidden backend HTTP request to Google to exchange the Code for an **Access Token**.
5. **The API Call**: The Client uses the Access Token to securely fetch your contacts from the Resource Server.

## 3. OAuth is NOT Authentication
<Callout icon="warning" title="The Biggest Misconception">
OAuth 2.0 is strictly an **Authorization** protocol (granting access). It is explicitly *not* an Authentication protocol (proving who you are). It provides no standard way for the Client to get your email address or verify your identity. If you want Authentication, you must use **OpenID Connect (OIDC)**, which is built on top of OAuth 2.0.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/OpenID Connect/index.mdx': `---
title: OpenID Connect (OIDC)
description: A standardized authentication layer built on top of the OAuth 2.0 protocol, providing identity verification and user profiles via ID Tokens.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="OpenID Connect (OIDC)">

Because OAuth 2.0 only provided *Access Tokens* (keys to a door), developers started hacking the protocol to perform Authentication (figuring out who holds the key). This led to fractured, insecure implementations.

In 2014, **OpenID Connect (OIDC)** was released. It sits directly on top of OAuth 2.0 and introduces a standardized way to prove identity: the **ID Token**.

## 1. The ID Token (JWT)
When you use "Sign in with Google", you are using OIDC. 
Alongside the standard OAuth Access Token, the server also returns an **ID Token**.

The ID Token is always a cryptographically signed **JSON Web Token (JWT)**. When the Client decodes it, it finds standardized profile information (claims) about the user:
- TICK1subTICK1: The unique user ID.
- TICK1emailTICK1: The user's email address.
- TICK1nameTICK1: The user's full name.
- TICK1expTICK1: When the token expires.

## 2. OIDC vs OAuth 2.0

<ComparisonTable 
  headers={['Protocol', 'Purpose', 'Token Type', 'Analogy']} 
  rows={[
    ['OAuth 2.0', 'Authorization (What can you do?)', 'Access Token (Opaque String)', 'A hotel keycard. It opens room 402, but the door doesn\\'t know your name.'],
    ['OpenID Connect', 'Authentication (Who are you?)', 'ID Token (JWT)', 'A driver\\'s license. It proves your identity, age, and name.']
  ]} 
/>

## 3. The UserInfo Endpoint
Sometimes the ID Token doesn't contain enough information (to keep the JWT payload small). OIDC standardizes the TICK1/userinfoTICK1 API endpoint. The Client can take the standard OAuth Access Token it received, make a request to TICK1/userinfoTICK1, and retrieve extended profile details (like the user's profile picture or phone number).

<Callout icon="tip" title="Implementation">
If you are building an application and want users to "Log In with Apple/Google/Microsoft", you must look for an identity provider that explicitly supports the **OIDC standard**. Never attempt to build custom authentication directly on top of raw OAuth 2.0.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/JWT/index.mdx': `---
title: JSON Web Tokens (JWT)
description: A compact, URL-safe, cryptographically signed token standard used heavily in modern web authentication to securely transmit information as a JSON object.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="JSON Web Tokens (JWT)">

A **JSON Web Token (JWT)** is the backbone of modern stateless authentication. It allows a server to verify a user's identity without ever having to look up a session ID in a database.

## 1. The Three-Part Structure
A JWT looks like a long string of gibberish: TICK1xxxx.yyyy.zzzzTICK1. It is composed of three Base64Url-encoded parts separated by periods:

1. **Header (xxxx)**: Contains metadata, such as the algorithm used to sign the token (e.g., TICK1{"alg": "HS256", "typ": "JWT"}TICK1).
2. **Payload (yyyy)**: The actual JSON data (Claims). This contains the user ID (TICK1subTICK1), role (TICK1adminTICK1), and expiration time (TICK1expTICK1).
3. **Signature (zzzz)**: The cryptographic hash of the Header + Payload + a Secret Key known only to the backend server.

## 2. Stateless Verification
When a user logs in, the server generates a JWT and signs it using its Secret Key. It sends the JWT to the browser.
On the next request, the browser sends the JWT back to the server.

The server does **not** query the database. It simply takes the Header and Payload from the incoming JWT, recalculates the hash using its Secret Key, and compares it to the Signature on the token. 
If they match, the token is perfectly authentic and mathematically proven to be untampered with.

## 3. The Revocation Problem
Because JWTs are stateless, they are completely autonomous. If a hacker steals a JWT, they can impersonate the user until the token's TICK1expTICK1 (expiration time) is reached. 
You cannot simply "delete" the session from the database, because the server doesn't check the database!

To fix this, architects use **Short-Lived Access Tokens (e.g., 15 minutes)** paired with **Long-Lived Refresh Tokens**. If an Access Token is stolen, it becomes useless in 15 minutes. The Refresh Token is stored securely (usually as an HttpOnly Cookie) and used to generate new Access Tokens.

<Callout icon="warning" title="JWTs are NOT Encrypted">
A standard JWT is only Base64 encoded, meaning anyone can trivially decode the Payload and read the JSON data. **Never put passwords, credit card numbers, or PII inside a JWT payload.** If you need absolute secrecy, you must use JWE (JSON Web Encryption), which encrypts the payload entirely.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/SSO/index.mdx': `---
title: Single Sign-On (SSO)
description: An authentication paradigm allowing a user to log in once with a single set of credentials to access multiple independent software applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Single Sign-On (SSO)">

In a corporate environment, a single employee might use Gmail, Salesforce, Slack, Jira, and Workday. Forcing them to memorize 5 different strong passwords results in password fatigue, sticky notes on monitors, and massive security vulnerabilities.

**Single Sign-On (SSO)** solves this. The user logs into a central Identity Provider (IdP) exactly once, and is automatically authenticated across all 5 applications.

## 1. The Architecture
SSO relies on a strict trust relationship between two parties:
- **Identity Provider (IdP)**: The central authority that holds the passwords and verifies the user (e.g., Okta, Microsoft Entra ID, Ping Identity).
- **Service Provider (SP)**: The application the user actually wants to use (e.g., Salesforce).

When the user attempts to access Salesforce, Salesforce redirects them to Okta. The user logs into Okta. Okta then sends a cryptographically signed token back to Salesforce declaring: *"I mathematically guarantee this user is John Doe."* Salesforce trusts Okta and grants access.

## 2. Common SSO Protocols

<ComparisonTable 
  headers={['Protocol', 'Format', 'Primary Use Case']} 
  rows={[
    ['SAML 2.0', 'XML', 'The legacy enterprise standard. Used heavily by massive B2B corporate applications and older internal networks.'],
    ['OIDC (OpenID Connect)', 'JSON (JWT)', 'The modern standard. Much lighter and easier to implement for modern web and mobile applications.'],
    ['Kerberos', 'Tickets', 'Strictly used for internal OS-level authentication within Windows Active Directory networks.']
  ]} 
/>

## 3. Benefits and Risks
- **Benefits**: Massively reduces IT support tickets for forgotten passwords. Allows IT to instantly revoke an ex-employee's access to all 50 corporate apps with a single click in the IdP.
- **Risks**: The IdP becomes a **Single Point of Failure**. If Okta goes offline, your entire company is completely locked out of every single application. Furthermore, if a hacker breaches the IdP, they gain instant, unfettered access to the user's entire digital life (hence why MFA is mandatory for IdPs).

<Callout icon="tip" title="Enterprise Readiness">
If you are building a B2B SaaS application, implementing SAML/OIDC SSO is not an optional feature. Fortune 500 companies will flat-out refuse to purchase your software unless it integrates natively with their central Identity Provider.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/RBAC/index.mdx': `---
title: Role-Based Access Control (RBAC)
description: A security paradigm that restricts system access based on the predefined roles assigned to individual users within an organization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Role-Based Access Control (RBAC)">

Once a user is Authenticated (we know who they are), we must determine what they are Authorized to do. 
The most widely adopted authorization architecture in software engineering is **Role-Based Access Control (RBAC)**.

## 1. The Matrix
In a naive system, you might assign permissions directly to users (e.g., "Give User John permission to delete databases"). If John moves to a new team, you have to manually audit and remove 50 specific permissions. This scales terribly.

In RBAC, you introduce an intermediate abstraction layer: **The Role**.
1. **Permissions** are assigned to **Roles** (e.g., The TICK1DBA_RoleTICK1 has the TICK1delete_dbTICK1 permission).
2. **Users** are assigned to **Roles** (e.g., John is assigned the TICK1DBA_RoleTICK1).

If John moves to Marketing, you simply revoke the TICK1DBA_RoleTICK1 and grant the TICK1Marketing_RoleTICK1.

## 2. Principle of Least Privilege
RBAC is heavily designed around the Principle of Least Privilege. Users should only be assigned the absolute minimum roles necessary to perform their daily job functions. 
A common pattern is having a "Base User" role with read-only access, and temporarily escalating to an "Admin" role only when executing dangerous operations.

## 3. RBAC vs ABAC
While RBAC is industry standard, it lacks granular context. 
If you need a rule like: *"Doctors can only view patient records IF the patient is assigned to them AND it is during hospital working hours,"* RBAC fails completely (you would need thousands of micro-roles).

For this, architects graduate to **Attribute-Based Access Control (ABAC)**, which evaluates boolean logic policies dynamically based on User Attributes, Resource Attributes, and Environmental context (like IP address or Time of day).

<Callout icon="tip" title="JWT Implementation">
In modern microservices, the user's RBAC roles are often embedded directly inside the JWT Payload (e.g., TICK1"roles": ["editor", "admin"]TICK1). The backend API gateway simply decodes the JWT, checks if TICK1"admin"TICK1 exists in the array, and either allows the request or throws a TICK1403 ForbiddenTICK1 error.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/MFA/index.mdx': `---
title: Multi-Factor Authentication (MFA)
description: A security mechanism requiring users to provide two or more distinct verification factors to gain access to a resource, drastically mitigating credential theft.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Multi-Factor Authentication (MFA)">

Passwords are fundamentally broken. They are reused across websites, leaked in massive data breaches, guessed via brute force, or stolen via phishing emails. 

**Multi-Factor Authentication (MFA)** solves this by forcing the attacker to compromise multiple independent dimensions of security simultaneously to breach an account.

## 1. The Three Factors
True MFA must combine two or more of the following distinct categories. (Combining two passwords is just Two-Step Verification, not MFA).

<ComparisonTable 
  headers={['Factor Type', 'Definition', 'Examples']} 
  rows={[
    ['Knowledge (Something you know)', 'Information memorized by the user.', 'Passwords, PIN codes, Security Questions (deprecated).'],
    ['Possession (Something you have)', 'A physical or cryptographic object held by the user.', 'Smartphones (Authenticator Apps), SMS Codes, YubiKey hardware tokens.'],
    ['Inherence (Something you are)', 'A biological metric unique to the user.', 'Fingerprint scans (TouchID), Facial recognition (FaceID), Retina scans.']
  ]} 
/>

## 2. The SMS Vulnerability (SIM Swapping)
Historically, the most common MFA was sending a 6-digit code via SMS text message. 
**This is now considered highly insecure.**
Attackers perform "SIM Swapping" by calling the victim's telecom provider, pretending to be the victim, and tricking the customer service rep into porting the phone number to the attacker's SIM card. The attacker now receives all of the victim's MFA SMS codes directly.

## 3. Time-Based One-Time Passwords (TOTP)
The modern software standard for MFA is **TOTP** (e.g., Google Authenticator, Authy).
When setting up TOTP, the server and your phone securely share a secret cryptographic seed (usually via a QR code). 
Both the server and your phone independently run a hashing algorithm combining the secret seed with the *current Unix timestamp*. Every 30 seconds, a new 6-digit code is generated simultaneously on both devices. Because it relies purely on math and time, TOTP works entirely offline and is immune to SIM swapping.

<Callout icon="warning" title="Phishing Susceptibility">
While TOTP is immune to SIM swapping, it is still vulnerable to **Real-Time Phishing (AiTM - Adversary in the Middle)**. If a user is tricked into logging into a fake website (TICK1g00gle.comTICK1), the attacker simply asks for the 6-digit TOTP code, immediately forwards it to the real Google, and intercepts the session cookie. Only hardware security keys (FIDO2/WebAuthn) can defeat real-time phishing.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/WebAuthn/index.mdx': `---
title: WebAuthn (FIDO2)
description: The official W3C web standard for passwordless, phishing-resistant authentication utilizing public-key cryptography and hardware authenticators.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="WebAuthn (FIDO2)">

Despite MFA and TOTP, sophisticated attackers still breach accounts using real-time proxy phishing pages. 
**WebAuthn** (part of the FIDO2 project) was engineered to completely eradicate passwords and neutralize phishing permanently by moving authentication from the user's brain to cryptographic hardware.

## 1. Public-Key Cryptography
WebAuthn relies entirely on Asymmetric Cryptography (Public/Private Keys).
During registration, the user's hardware device (like a YubiKey, Apple TouchID, or Windows Hello) generates a mathematically linked keypair.
1. The **Public Key** is sent to the backend server and saved in the database.
2. The **Private Key** is permanently burned into the secure enclave (TPM) of the hardware device. It never leaves the device.

## 2. The Authentication Ceremony (The Challenge)
When the user attempts to log in, there is no password box.
1. The server generates a random string of bytes (a cryptographic Challenge) and sends it to the browser.
2. The browser passes the Challenge to the hardware authenticator (prompting the user to scan their fingerprint or tap their YubiKey).
3. The hardware uses the burned-in Private Key to digitally sign the Challenge, and sends the Signature back to the server.
4. The server uses the stored Public Key to mathematically verify the Signature. If it matches, the user is authenticated.

## 3. Perfect Phishing Resistance
WebAuthn is the only protocol mathematically immune to phishing. 
When the browser asks the hardware device to sign the challenge, it strictly binds the signature to the **Origin URL**. 
If a user is tricked onto TICK1g00gle.comTICK1, the hardware device signs the challenge for TICK1g00gle.comTICK1. When the attacker forwards that signature to the real TICK1google.comTICK1, the real server detects the Origin mismatch and instantly rejects the login. The phishing attack catastrophically fails.

<Callout icon="tip" title="Platform vs Roaming Authenticators">
WebAuthn supports two types of devices: **Platform Authenticators** (built directly into the laptop, like a MacBook's TouchID or Windows Hello camera) and **Roaming Authenticators** (USB devices like YubiKeys that you carry on your keychain and plug into any computer).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/53. Authentication, Identity & Access/Passkeys/index.mdx': `---
title: Passkeys
description: The consumer-friendly evolution of WebAuthn, allowing cryptographic private keys to be securely synced across devices via cloud ecosystems (Apple, Google, Microsoft).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Passkeys">

WebAuthn (FIDO2) is a cryptographic masterpiece, but it had a massive consumer UX flaw: if you registered your MacBook's TouchID as your authenticator, the Private Key was physically trapped inside that laptop. If you dropped the laptop in a lake, you lost your Private Key and were permanently locked out of your accounts.

**Passkeys** solve this by making WebAuthn keys syncable across your devices.

## 1. The Cloud Sync Paradigm
A Passkey is fundamentally just a WebAuthn credential (a Private Key). However, instead of being permanently locked to one piece of hardware, the Private Key is stored securely within a **Platform Credential Manager** (like Apple iCloud Keychain, Google Password Manager, or 1Password).

If you create a Passkey on your iPhone for Amazon, iCloud seamlessly encrypts and syncs that Private Key to your iPad and MacBook. You can now log into Amazon from any of your Apple devices using FaceID, with zero setup.

## 2. Cross-Ecosystem Authentication
What if you create an iCloud Passkey on your iPhone, but you want to log into Amazon on a public Windows PC?
Passkeys support a protocol called **CTAP2 (Client to Authenticator Protocol)**. 
1. The Windows PC displays a QR code on the screen.
2. You scan the QR code with your iPhone's camera.
3. Your iPhone establishes a localized, secure Bluetooth/WiFi Direct connection with the Windows PC.
4. Your iPhone uses FaceID to sign the cryptographic challenge and passes the signature back to the Windows PC, logging you in.

## 3. Passkeys vs Passwords

<ComparisonTable 
  headers={['Feature', 'Passwords', 'Passkeys']} 
  rows={[
    ['Security', 'Terrible. Easily guessed, phished, or leaked in server breaches.', 'Perfect. Cryptographically strong and completely immune to phishing.'],
    ['Server Breaches', 'Catastrophic. Hackers steal the password hashes.', 'Harmless. Servers only hold the Public Key, which is useless to attackers.'],
    ['User Experience', 'Frustrating. Requires memorizing complex strings or managing password managers.', 'Seamless. Requires only a quick FaceID or Fingerprint scan.']
  ]} 
/>

<Callout icon="warning" title="The Walled Garden Problem">
Currently, syncing Passkeys *across* ecosystems is challenging. A Passkey created in iCloud does not automatically sync to your Google Account. While QR-code roaming works, the industry is still working on seamless credential export APIs to prevent users from being locked into a single tech giant's ecosystem.
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
