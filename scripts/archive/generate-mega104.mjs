import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '53. Authentication, Identity & Access/Auth0/index.mdx': `---
title: Auth0
description: An adaptable authentication and authorization platform.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Auth0"
  subtitle="Identity as a Service (IDaaS)"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Auth0_logo.svg/512px-Auth0_logo.svg.png"
  description="Auth0 mathematically popularized the concept of delegating authentication to a third-party cloud service. Instead of developers writing vulnerable login forms, Auth0 handles the entire cryptographic lifecycle."
  yearCreated={2013}
  creator="Eugenio Pace & Matias Woloski"
  isOpenSource={false}
  websiteUrl="https://auth0.com/"
>

Historically, if a startup needed a login system, a junior developer would mathematically attempt to write a BCrypt hashing algorithm, inevitably introduce a vulnerability, and get the database hacked.

<Callout icon="success" title="The Cloud Identity Abstraction">
  With Auth0, your frontend app biologically redirects the user to \`your-app.auth0.com\`. 
  
  The user enters their password securely on Auth0's mathematically hardened servers. Auth0 verifies the password, generates a signed **JWT**, and redirects the user back to your app. Your backend server simply verifies the JWT signature. You never touch, store, or see the user's password, completely removing the liability from your database.
</Callout>

*(Note: Auth0 was acquired by Okta in 2021 for $6.5 Billion).*

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/Identity providers (Okta/index.mdx': `---
title: Identity Providers (IdP) & Okta
description: A system entity that creates, maintains, and manages identity information for principals while providing authentication services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Identity Providers (Okta)"
  subtitle="The Enterprise SSO Standard"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Okta_logo.svg/512px-Okta_logo.svg.png"
  description="An Identity Provider (IdP) is the centralized mathematical authority in a corporation that dictates who you are. Okta is the undisputed global standard for enterprise IdPs."
  yearCreated={2009}
  creator="Todd McKinnon & Frederic Kerrest"
  isOpenSource={false}
  websiteUrl="https://www.okta.com/"
>

If an enterprise has 50,000 employees and 400 internal SaaS applications (Slack, Jira, Workday), managing 20,000,000 separate passwords is mathematically impossible.

<Callout icon="tip" title="The Single Source of Truth">
  **Okta** serves as the central directory. 
  
  When an HR manager fires an employee, they biologically click "Deactivate" exactly once inside Okta. Okta mathematically triggers an API cascade, instantly revoking that employee's access to all 400 applications simultaneously via SAML/OIDC. It is the architectural linchpin of enterprise security.
</Callout>

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/Keycloak)/index.mdx': `---
title: Keycloak
description: An open source identity and access management solution.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Keycloak"
  subtitle="The Open-Source Auth0 Alternative"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Keycloak_Logo.png/512px-Keycloak_Logo.png"
  description="While Auth0 and Okta charge massive enterprise SaaS fees, Keycloak is a free, mathematically powerful open-source Identity Provider developed by Red Hat."
  yearCreated={2014}
  creator="Red Hat"
  isOpenSource={true}
  websiteUrl="https://www.keycloak.org/"
>

Because Keycloak is open-source (written in Java), enterprises can physically host it on their own Kubernetes clusters. 

This is biologically mandatory for certain high-security organizations (like government agencies or defense contractors) that mathematically refuse to send their citizens' sensitive password hashes to an external cloud provider like Auth0. Keycloak provides standard OIDC, SAML, and OAuth 2.0 capabilities completely for free.

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/Active Directory/index.mdx': `---
title: Active Directory (AD)
description: A directory service developed by Microsoft for Windows domain networks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Active Directory"
  subtitle="The legacy king of enterprise networks"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
  description="Before cloud computing existed, Active Directory was the physical server sitting in an office closet that mathematically controlled every Windows laptop in the building."
  yearCreated={1999}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services"
>

In a classic Windows enterprise, when an employee types their password into their Windows laptop on Monday morning, the laptop does not check its local hard drive. It mathematically sends the password over the local ethernet cable to the **Active Directory (AD)** Domain Controller server.

<Callout icon="warning" title="Group Policy Objects">
  AD was not just for passwords. It utilized **GPOs**. 
  
  The IT Admin could mathematically define a policy: *"No employee in the 'Intern' group can change their desktop wallpaper."* When the intern logged in, AD physically downloaded this policy to the laptop and biologically locked the Windows UI.
</Callout>

*(Note: Today, legacy AD is heavily integrated with **Entra ID** (formerly Azure AD) to bridge on-premise networks with modern cloud SSO).*

</TechnologyTemplate>
`,
  '53. Authentication, Identity & Access/LDAP/index.mdx': `---
title: LDAP
description: Lightweight Directory Access Protocol is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LDAP (Lightweight Directory Access Protocol)">

If Active Directory is a database, **LDAP** is the mathematical language you use to query that database.

Invented in 1993, LDAP is a protocol that operates over TCP/IP. It allows an application (like a company's internal wiki) to biologically ask the central server: *"Does a user with the ID 'jdoe' exist, and is their password 'password123'?"*

<Callout icon="info" title="The Tree Structure">
  LDAP mathematically stores data in a hierarchical tree.
  A user's identity is defined by a **Distinguished Name (DN)**, such as:
  \`cn=John Doe,ou=Engineering,dc=example,dc=com\`
  
  This rigid structure makes it incredibly fast to query large enterprise hierarchies, which is why almost every modern Identity Provider (including Okta and Keycloak) still supports LDAP synchronization for legacy applications.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/Kerberos/index.mdx': `---
title: Kerberos
description: A computer-network authentication protocol that works on the basis of tickets to allow nodes communicating over a non-secure network to prove their identity to one another in a secure manner.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kerberos">

Invented at MIT in the 1980s, **Kerberos** is the mathematical cryptography protocol that actually powers Microsoft Active Directory. 

It was named after the three-headed dog from Greek mythology because the protocol mathematically requires exactly three biological entities to function securely: the Client, the Server, and the Key Distribution Center (KDC).

<Callout icon="success" title="The Ticket-Granting Ticket (TGT)">
  When you log into your Windows laptop in the morning, you don't actually authenticate with the File Server. 
  
  You authenticate with the KDC. The KDC mathematically issues you a "Ticket-Granting Ticket" (TGT). For the rest of the day, whenever you try to access a printer or a shared drive, your laptop silently presents this cryptographic Ticket. Because passwords are mathematically never transmitted over the network after the initial login, Kerberos is biologically immune to packet-sniffing replay attacks.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/MFA/index.mdx': `---
title: MFA (Multi-Factor Authentication)
description: An electronic authentication method in which a user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Factor Authentication (MFA)">

Because humans are biologically terrible at creating passwords (and often reuse \`Password123!\` across 50 websites), passwords alone are mathematically insufficient for security.

**MFA** requires the user to prove their identity using multiple, independent mathematical factors.

<Callout icon="tip" title="The Three Factors">
  To biologically prove who you are, you must provide two of the following:
  1. **Knowledge:** Something you *know* (A password or PIN).
  2. **Possession:** Something you *have* (A smartphone app, an SMS code, or a YubiKey).
  3. **Inherence:** Something you *are* (A biometric fingerprint or FaceID scan).
  
  If a hacker sitting in Russia guesses your password (Knowledge), they mathematically cannot log in because they do not physically possess your iPhone in their hand (Possession).
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/TOTP/index.mdx': `---
title: TOTP (Time-based One-Time Password)
description: A computer algorithm that generates a one-time password (OTP) that uses the current time as a source of uniqueness.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Time-based One-Time Password (TOTP)">

SMS (Text Message) based MFA is biologically flawed because hackers can execute "SIM Swapping" attacks to hijack your phone number. 

The mathematical solution is **TOTP** (used by Google Authenticator and Authy).

<Callout icon="success" title="The Mathematical Seed">
  When you enable TOTP, the server shows you a QR Code. This QR code contains a cryptographic **Secret Seed**. Your phone's authenticator app scans and saves this seed.
  
  Every 30 seconds, both your phone AND the server mathematically combine the Secret Seed with the **current Unix Timestamp**, run it through an HMAC-SHA1 hashing algorithm, and generate a 6-digit number (e.g., \`482 194\`). 
  
  Because the math is synchronized by the clock, your phone generates the exact same number as the server *without ever connecting to the internet*. It is mathematically unhackable via SIM swapping.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/WebAuthn/index.mdx': `---
title: WebAuthn
description: A web standard published by the World Wide Web Consortium (W3C) for passwordless authentication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebAuthn">

**WebAuthn** is the mathematical standard designed to completely eradicate passwords from the internet forever.

Instead of typing a password, WebAuthn allows a website to communicate directly with your device's biological hardware (e.g., Apple TouchID, Windows Hello, or a physical YubiKey).

<Callout icon="info" title="Public Key Cryptography">
  When you register on a website using WebAuthn, your device's secure hardware chip mathematically generates a Public/Private key pair. 
  
  It sends the Public Key to the server and permanently locks the Private Key inside your laptop's hardware. When you log in, the server sends a mathematical "challenge." Your laptop prompts you for a fingerprint. The fingerprint unlocks the hardware chip, which signs the challenge with the Private Key. 
  
  Because the Private Key physically cannot leave the laptop, WebAuthn is biologically **100% immune to Phishing attacks**. Even if a user is tricked into a fake website, the hardware chip will refuse to sign the challenge for the wrong domain.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/Passkeys/index.mdx': `---
title: Passkeys
description: A password replacement that provides faster, easier, and more secure sign-ins to websites and apps across a user's devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Passkeys">

While WebAuthn is mathematically perfect, it had a massive UX flaw: If you generated a key on your iPhone, you biologically couldn't log into the same website from your Windows laptop, because the Private Key was trapped inside the iPhone's hardware.

**Passkeys** are the consumer-friendly evolution of WebAuthn created by Apple, Google, and Microsoft.

<Callout icon="success" title="The Cloud Sync Abstraction">
  A Passkey is mathematically just a WebAuthn Private Key, but with one critical difference: **It is synced to the cloud.**
  
  If you create a Passkey on your iPhone, Apple mathematically encrypts it and syncs it via iCloud Keychain to your iPad and Mac. You can now use biometric FaceID to log into the website across all your devices seamlessly. It brings the unphishable mathematical security of WebAuthn to the masses without the biological friction of being locked to a single piece of hardware.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega104() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega104().catch(console.error)
