import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '53. Authentication, Identity & Access/Password authentication/index.mdx': `---
title: Password authentication
description: The process of verifying a user's identity using a secret string of characters.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Password Authentication">

The oldest and most mathematically flawed form of security in computer science.

In a password authentication system, the user claims an identity (Username) and provides a biological secret (Password). The server mathematically verifies if the secret matches the stored identity.

<Callout icon="warning" title="The Hashing Requirement">
  It is an absolute biological crime to store passwords in "Plain Text" in a database.
  
  Servers must mathematically **Hash** the password (using algorithms like \`bcrypt\` or \`Argon2\`) and add a mathematical **Salt** (random string) before saving it to the database. When the user logs in, the server hashes their input and mathematically compares the two hashes. Because hashing is a one-way mathematical function, even if a hacker steals the database, they cannot reverse-engineer the original passwords.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/Sessions/index.mdx': `---
title: Sessions (Stateful Authentication)
description: A method of authentication where the server stores the authentication state of a user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sessions (Stateful Authentication)">

HTTP is mathematically a **Stateless** protocol. If you log in on \`/login\`, and then navigate to \`/dashboard\`, the server has absolutely no biological memory of who you are.

To solve this, developers invented **Session-based Authentication**.

<Callout icon="info" title="The Architecture">
  1. **Login:** The user sends their username/password.
  2. **Session Creation:** The backend mathematically creates a "Session Object" in its RAM (or a Redis database) containing \`{ userId: 123, role: "admin" }\`.
  3. **The Cookie:** The backend sends a Set-Cookie header containing a random string: \`session_id=abcxyz\`.
  4. **Subsequent Requests:** Every time the browser makes a request, it biologically sends the \`session_id\` cookie. The backend looks up \`abcxyz\` in its Redis database, mathematically proves the user is logged in, and allows access.
</Callout>

This is highly secure but mathematically difficult to scale, because if you have 3 backend servers, you must synchronize the Session database across all of them.

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/JWT/index.mdx': `---
title: JWT (JSON Web Tokens)
description: A compact, URL-safe means of representing claims to be transferred between two parties.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JSON Web Tokens (JWT)">

JWT is the mathematical solution to the scaling problem of Session-based Authentication. It is a **Stateless** authentication mechanism.

Instead of the server storing the user's data in a Redis database, the server mathematically packages the data \`{ userId: 123 }\` into a JSON object, biologically signs it using a cryptographic Private Key, and gives it directly to the user.

<Callout icon="success" title="The Cryptographic Signature">
  A JWT consists of 3 mathematical parts separated by dots: \`Header.Payload.Signature\`.
  
  When the user sends the JWT back to the server, the server does not need to check a database. It simply uses its cryptographic key to mathematically verify the \`Signature\`. If the signature is valid, the server biologically trusts the \`Payload\`. 
  
  Because the server stores zero state in RAM, you can scale to 10,000 backend servers instantly.
</Callout>

<Callout icon="warning" title="The Invalidation Problem">
  Because JWTs are stateless, you mathematically cannot "delete" a JWT from the server to log a user out. Once a JWT is issued, it is valid until its mathematical expiration time (\`exp\`) is reached.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/OAuth 2.0/index.mdx': `---
title: OAuth 2.0
description: The industry-standard protocol for authorization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OAuth 2.0">

If you play a new mobile game, and it asks *"Allow this game to access your Google Contacts?"*, how do you do this safely?

If you biologically give the game your Google Password, the game could delete your email account. This is mathematically unacceptable. **OAuth 2.0** solves this.

<Callout icon="tip" title="Delegated Authorization">
  OAuth 2.0 is an **Authorization** protocol, not an Authentication protocol. It is mathematically designed to grant a third-party application limited access to a user's resources without exposing the user's password.
  
  Instead of a password, Google mathematically issues an **Access Token** to the game. The Access Token has restricted "Scopes" (e.g., \`read:contacts\`). If the game attempts to use that token to read emails, the Google API mathematically rejects it.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/OpenID Connect/index.mdx': `---
title: OpenID Connect (OIDC)
description: An identity layer on top of the OAuth 2.0 protocol.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OpenID Connect (OIDC)">

OAuth 2.0 was mathematically designed for *Authorization* (granting access to APIs), not *Authentication* (proving who a user actually is).

When developers biologically hijacked OAuth 2.0 to build "Log in with Google" buttons, they ran into severe security flaws because OAuth doesn't standardize how to transmit a user's profile data.

**OpenID Connect (OIDC)** was mathematically invented to fix this.

<Callout icon="success" title="The ID Token">
  OIDC is just OAuth 2.0 with one mathematical addition: **The ID Token**.
  
  When you click "Log in with Google", OIDC executes a standard OAuth 2.0 flow, but alongside the Access Token, Google returns a mathematically signed **JWT** called an ID Token. This token contains the user's exact identity (\`name\`, \`email\`, \`profile_picture\`), completely standardizing "Social Login" across the entire internet.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/SAML/index.mdx': `---
title: SAML
description: Security Assertion Markup Language is an open standard for exchanging authentication and authorization data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SAML (Security Assertion Markup Language)">

While consumer websites use OAuth and OIDC to log in with Google, massive enterprise corporations use **SAML**.

Invented in 2002, SAML is a mathematically rigid, XML-based protocol used almost exclusively for Enterprise Single Sign-On (SSO).

<Callout icon="warning" title="The XML Architecture">
  In a SAML flow, a user visits an application (the **Service Provider** or SP). The SP biologically redirects the user to the company's internal login server (the **Identity Provider** or IdP).
  
  After the user logs in, the IdP generates a massive, cryptographically signed XML document called an **Assertion**, which mathematically proves the user's identity, and POSTs it back to the SP. It is notoriously difficult to configure, but remains the absolute backbone of enterprise security.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/SSO/index.mdx': `---
title: SSO (Single Sign-On)
description: An authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Single Sign-On (SSO)">

If an enterprise employee uses Salesforce, Slack, Jira, and GitHub, forcing them to biologically memorize 4 different passwords is a mathematical security nightmare. They will inevitably write them on a sticky note.

**Single Sign-On (SSO)** mathematically unifies authentication.

<Callout icon="success" title="The Hub and Spoke Model">
  The corporation buys an **Identity Provider (IdP)** like Okta. 
  
  The employee logs into Okta exactly once in the morning. When they navigate to Salesforce, Salesforce mathematically redirects them to Okta. Okta silently confirms they are already logged in, and instantly redirects them back to Salesforce with a valid token. The user never sees a login screen again for the rest of the day.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/Identity federation/index.mdx': `---
title: Identity federation
description: An agreement that can be made between multiple enterprises to let subscribers use the same identification data to obtain access to the networks of all enterprises in the group.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Identity Federation">

**Identity Federation** is the mathematical extension of SSO across entirely different organizations.

If you work for Company A, and you need to access a portal hosted by Company B, you do not want to biologically create a new account in Company B's database.

<Callout icon="tip" title="Establishing Mathematical Trust">
  Company B mathematically "trusts" Company A's Identity Provider. 
  
  When you try to access Company B, they redirect you back to Company A's login server. You log in using your normal employee credentials. Company A generates a cryptographically signed SAML Assertion and sends it to Company B. Company B mathematically verifies the signature and grants you access, even though your identity physically does not exist in their database.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/RBAC/index.mdx': `---
title: RBAC (Role-Based Access Control)
description: A policy-neutral access-control mechanism defined around roles and privileges.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Role-Based Access Control (RBAC)">

Once a user is Authenticated (we know who they are), we must mathematically calculate their **Authorization** (what are they allowed to do?).

**RBAC** is the industry standard for mapping permissions.

<Callout icon="info" title="The Role Abstraction">
  Instead of mathematically assigning 50 individual permissions to Alice (e.g., \`can_read_db\`, \`can_delete_user\`), you create a **Role** called \`Admin\`. 
  
  You assign the 50 permissions to the \`Admin\` role. Then, you biologically assign Alice the role of \`Admin\`. If Alice leaves the company, you just remove her from the role, instantly revoking all 50 permissions. It mathematically prevents security oversights by utilizing group theory.
</Callout>

</ConceptTemplate>
`,
  '53. Authentication, Identity & Access/ABAC/index.mdx': `---
title: ABAC (Attribute-Based Access Control)
description: An access control paradigm whereby access rights are granted to users through the use of policies which combine attributes together.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Attribute-Based Access Control (ABAC)">

RBAC is mathematically flawed for highly complex enterprise requirements. 

What if the policy is: *"A doctor can only read a medical record IF they are the assigned doctor for that specific patient, AND they are accessing it from a hospital IP address, AND it is during their scheduled shift."*

RBAC mathematically cannot handle \`IF\` conditions. **ABAC** can.

<Callout icon="success" title="The Mathematical Ruleset">
  ABAC replaces static Roles with dynamic mathematical **Policies**. 
  
  It evaluates multiple attributes in real-time:
  1. **Subject Attributes:** (User is a Doctor)
  2. **Resource Attributes:** (Patient ID matches Assigned Patient ID)
  3. **Environment Attributes:** (Time is 2:00 PM, IP is 192.168.1.1)
  
  If the mathematical equation returns \`True\`, access is granted. ABAC is the absolute pinnacle of granular enterprise authorization.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega103() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega103().catch(console.error)
