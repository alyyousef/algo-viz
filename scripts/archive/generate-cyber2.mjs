import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Symmetric encryption/index.mdx': `---
title: Symmetric Encryption
description: A type of encryption where the same key is used to both encrypt and decrypt data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Symmetric Encryption">

Symmetric Encryption is the oldest and most widely used technique for securing data. In this method, the sender and the receiver share a single, identical secret key that is used for both encrypting the plaintext into ciphertext, and decrypting the ciphertext back into plaintext.

<Callout icon="warning" title="The Key Distribution Problem">
  The biggest flaw of symmetric encryption is key distribution. If you want to send a secure message to someone across the world, you have to somehow give them the secret key first. If a hacker intercepts the key while you are sharing it, the entire encryption is compromised.
</Callout>

## Common Algorithms

<ComparisonTable 
  headers={['Algorithm', 'Status', 'Description']}
  rows={[
    ['AES (Advanced Encryption Standard)', 'Industry Standard', 'The current global standard (AES-128, AES-192, AES-256). Used by banks, governments, and TLS.'],
    ['DES (Data Encryption Standard)', 'Obsolete', 'An old standard from the 1970s. Broken due to a short 56-bit key size.'],
    ['ChaCha20', 'Modern Alternative', 'A modern, highly secure, and extremely fast stream cipher. Often used on mobile devices to save battery.']
  ]}
/>

## Architecture

Symmetric encryption is incredibly fast compared to Asymmetric encryption, making it ideal for encrypting large amounts of data (like an entire hard drive or a streaming movie).

<ArchitectureDiagram chart={\`
graph LR
  Sender[Sender]
  Plain1[Plaintext\\n"Hello"]
  Key1((Secret Key))
  Encrypt[Encryption Algorithm\\n(e.g. AES-256)]
  Cipher[Ciphertext\\n"x8F!q2"]
  
  Receiver[Receiver]
  Key2((Secret Key))
  Decrypt[Decryption Algorithm\\n(e.g. AES-256)]
  Plain2[Plaintext\\n"Hello"]
  
  Sender --> Plain1
  Plain1 --> Encrypt
  Key1 --> Encrypt
  Encrypt --> Cipher
  
  Cipher --> Decrypt
  Key2 --> Decrypt
  Decrypt --> Plain2
  Plain2 --> Receiver
  
  Key1 -. MUST BE IDENTICAL .-> Key2
\`} />

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Asymmetric encryption/index.mdx': `---
title: Asymmetric Encryption (Public-Key)
description: A type of encryption that uses two mathematically linked keys: a public key and a private key.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Asymmetric Encryption">

Asymmetric Encryption (or Public-Key Cryptography) was invented to solve the "Key Distribution Problem" of Symmetric Encryption. Instead of sharing a single secret key, every user generates a mathematically linked pair of keys: a **Public Key** (which is shared with the world) and a **Private Key** (which is kept absolutely secret).

<Callout icon="tip" title="The Core Principle">
  Data encrypted with the **Public Key** can ONLY be decrypted by the matching **Private Key**. 
  
  Therefore, if Alice wants to send a secret message to Bob, she encrypts it using *Bob's Public Key*. Now, only Bob (who holds his Private Key) can decrypt it!
</Callout>

## Common Algorithms

<ComparisonTable 
  headers={['Algorithm', 'How it works']}
  rows={[
    ['RSA (Rivest-Shamir-Adleman)', 'Relies on the mathematical difficulty of factoring the product of two massive prime numbers. Very common but slow.'],
    ['ECC (Elliptic Curve Cryptography)', 'Relies on the algebraic structure of elliptic curves. Provides the same security as RSA but with much smaller keys, making it faster.']
  ]}
/>

## Digital Signatures

Asymmetric encryption can also work in reverse to prove *identity*. If Alice encrypts a document with her *Private Key*, anyone in the world can decrypt it using her *Public Key*. While this doesn't keep the document secret, it proves mathematically that the document **must** have come from Alice, because only she holds her Private Key.

<ArchitectureDiagram chart={\`
graph LR
  Alice[Alice]
  Plain1[Plaintext\\n"Secret Data"]
  BobPub((Bob's\\nPublic Key))
  Encrypt[Encryption Algorithm\\n(e.g. RSA)]
  Cipher[Ciphertext\\n"a9K#zL"]
  
  Bob[Bob]
  BobPriv((Bob's\\nPrivate Key))
  Decrypt[Decryption Algorithm\\n(e.g. RSA)]
  Plain2[Plaintext\\n"Secret Data"]
  
  Alice --> Plain1
  Plain1 --> Encrypt
  BobPub --> Encrypt
  Encrypt --> Cipher
  
  Cipher --> Decrypt
  BobPriv --> Decrypt
  Decrypt --> Plain2
  Plain2 --> Bob
\`} />

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Hashing/index.mdx': `---
title: Hashing
description: A one-way mathematical function that converts any amount of data into a fixed-size string of characters.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Hashing">

Hashing is a cryptographic process that takes an input of any size (a single word, or a 10GB video file) and passes it through a mathematical algorithm to produce a fixed-size string of characters, called a **Hash** or **Digest**. 

<Callout icon="error" title="Hashing is NOT Encryption">
  Encryption is a two-way function (you can decrypt the ciphertext back into the original plaintext). 
  
  **Hashing is a one-way function.** It is mathematically impossible to reverse-engineer a hash back into its original input.
</Callout>

## Crucial Properties of a Hash Function

<ComparisonTable 
  headers={['Property', 'Description']}
  rows={[
    ['Deterministic', 'The same exact input will ALWAYS produce the exact same output hash.'],
    ['Avalanche Effect', 'Changing even a single pixel in a 5GB video file will result in a completely, radically different hash.'],
    ['Collision Resistant', 'It should be computationally infeasible to find two different inputs that produce the exact same output hash.']
  ]}
/>

## Common Use Cases

1. **Password Storage**: Websites should NEVER store your password in plain text. They hash your password and store the hash. When you log in, they hash what you typed and compare the two hashes.
2. **File Integrity Verification**: Downloading a Linux ISO? The provider will display the SHA-256 hash. After downloading, you can hash the file locally to ensure no files were corrupted or injected with malware during transit.
3. **Blockchain (Proof of Work)**: Bitcoin miners compete to find a specific hash value.

## Architecture: Password Verification

<ArchitectureDiagram chart={\`
graph TD
  User[User logs in\\nPassword: "Password123"]
  HashFunc[SHA-256 Hash Function]
  LoginHash[Computed Hash\\n"e6c3d..."]
  
  DB[(Database)]
  DBHash[Stored Hash\\n"e6c3d..."]
  
  Compare{Are they equal?}
  Accept[Login Successful]
  Reject[Login Failed]
  
  User --> HashFunc
  HashFunc --> LoginHash
  
  DB --> DBHash
  
  LoginHash --> Compare
  DBHash --> Compare
  
  Compare -- Yes --> Accept
  Compare -- No --> Reject
\`} />

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/42.2 Web Security/SQL injection/index.mdx': `---
title: SQL Injection (SQLi)
description: A web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SQL Injection (SQLi)">

SQL Injection (SQLi) is one of the oldest, most common, and most dangerous web vulnerabilities. It occurs when untrusted user input is directly concatenated into a dynamic SQL query without proper sanitization. This allows an attacker to manipulate the query, potentially reading sensitive data (like passwords or credit cards), modifying the database, or dropping tables entirely.

<Callout icon="warning" title="The Impact">
  A successful SQL injection attack can result in the unauthorized viewing of user lists, the deletion of entire tables, and in certain cases, the attacker gaining administrative rights to a database and executing OS commands on the server.
</Callout>

## How it works

Imagine an application with the following vulnerable authentication code:

\`\`\`sql
-- The developer wrote this:
SELECT * FROM users WHERE username = '\$username' AND password = '\$password';
\`\`\`

If an attacker enters \`admin' --\` into the username field, the query becomes:

\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '';
\`\`\`

Because \`--\` signifies a comment in SQL, the database ignores the password check entirely and logs the attacker in as the admin!

## The Solution: Prepared Statements (Parameterized Queries)

The industry standard defense against SQL injection is to use **Prepared Statements**. Instead of pasting strings together, the database compiles the query structure *before* inserting the user data.

<ComparisonTable 
  headers={['Approach', 'Code Example', 'Security']}
  rows={[
    ['String Concatenation (Vulnerable)', \`query("SELECT * FROM users WHERE id = " + userId)\`, '❌ Vulnerable. Input is treated as executable code.'],
    ['Prepared Statements (Secure)', \`query("SELECT * FROM users WHERE id = ?", [userId])\`, '✅ Secure. Input is strictly treated as a literal value (a string/integer), never as executable SQL commands.']
  ]}
/>

## Architecture of an Attack

<ArchitectureDiagram chart={\`
graph TD
  Attacker[Attacker]
  Input[Malicious Input\\n"' OR 1=1 --"]
  WebApp[Web Application\\n(Vulnerable Code)]
  DB[(Database)]
  Data[Sensitive Data Dump]
  
  Attacker -- Submits --> Input
  Input --> WebApp
  WebApp -- Executes: "SELECT * FROM users\\nWHERE id = '' OR 1=1 --" --> DB
  DB -- Returns all users --> WebApp
  WebApp --> Data
  Data --> Attacker
\`} />

</TechnologyTemplate>
`,
  '42. Cybersecurity Fundamentals/Zero trust/index.mdx': `---
title: Zero Trust Architecture
description: A security framework requiring all users to be authenticated, authorized, and continuously validated.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Zero Trust Architecture">

Zero Trust is a strategic cybersecurity model designed to protect modern digital environments by eliminating the concept of trust from an organization's network architecture. Its core motto is: **"Never trust, always verify."**

<Callout icon="info" title="The Death of the Perimeter">
  Historically, IT security was a "Castle and Moat" model. Once you bypassed the firewall (the moat) and entered the corporate network (the castle), you were trusted implicitly. 
  
  Zero Trust assumes the network is *already compromised* and that the moat is useless in a modern era of remote work, BYOD, and cloud apps.
</Callout>

## Core Principles of Zero Trust

<ComparisonTable 
  headers={['Principle', 'Description']}
  rows={[
    ['Verify Explicitly', 'Always authenticate and authorize based on all available data points (User identity, location, device health, service workload).'],
    ['Use Least Privilege Access', 'Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) policies. Give them exactly what they need, exactly when they need it, and nothing more.'],
    ['Assume Breach', 'Minimize blast radius by segmenting networks. Use end-to-end encryption. Use analytics to detect anomalous behavior in real-time.']
  ]}
/>

## Beyond the VPN

In a traditional setup, remote employees use a VPN to connect to the corporate network, gaining broad access. In a Zero Trust environment, VPNs are often replaced with Zero Trust Network Access (ZTNA) solutions, which grant access on a per-application basis, not a per-network basis.

<ArchitectureDiagram chart={\`
graph TD
  User[Remote Employee]
  Device[Laptop\\n(Checked for Antivirus/Updates)]
  
  Policy{Zero Trust Policy Engine}
  
  AppA[HR Application]
  AppB[Finance Application]
  AppC[Source Code Repo]
  
  User --> Device
  Device -- Requests Access to HR App --> Policy
  
  Policy -- Context: Identity Verified,\\nDevice Healthy,\\nLocation Normal --> AppA
  
  Policy -. Denies access to Finance\\n(Not Authorized) .-> AppB
  Policy -. Denies access to Repo\\n(Not Authorized) .-> AppC
\`} />

</TechnologyTemplate>
`,
}

async function generateCyber2() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateCyber2().catch(console.error)
