import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Asymmetric encryption/index.mdx': `---
title: Asymmetric Encryption
description: The foundational cryptography protocol that utilizes mathematically linked public and private key pairs to securely exchange data across untrusted networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'
import { ComparisonTable } from '@/features/kb/components/ComparisonTable'

<ConceptTemplate title="Asymmetric Encryption">

In the early days of cryptography, Alice and Bob had to share the exact same secret key to encrypt and decrypt messages (Symmetric Encryption). The fatal flaw was the **Key Distribution Problem**: how do you securely send the secret key to someone across an unsecured internet without a hacker stealing it?

**Asymmetric Encryption** (Public-Key Cryptography) solved this by splitting the key into two mathematically linked, but fundamentally distinct parts: a **Public Key** and a **Private Key**.

## 1. The Two Keys

- **Public Key**: Handed out to everyone in the world. It can only **encrypt** data or **verify** signatures.
- **Private Key**: Kept absolutely secret. It can only **decrypt** data or **create** signatures.

<Callout icon="tip" title="The Padlock Analogy">
  Think of the Public Key as an open padlock that you distribute to anyone. Anyone can put their data in a box and snap your padlock shut (encrypt). However, once the padlock is closed, even the person who closed it cannot open it. Only you hold the physical key (the Private Key) that can unlock it (decrypt).
</Callout>

## 2. Core Workflows

There are two primary ways Asymmetric Encryption is used:

### A. Secure Communication (Encryption)
If Bob wants to send a secret message to Alice:
1. Bob fetches Alice's **Public Key**.
2. Bob encrypts the message using Alice's Public Key.
3. Bob sends the ciphertext over the internet.
4. Alice uses her perfectly secret **Private Key** to decrypt the message.

### B. Digital Signatures (Authentication)
If Alice wants to prove she wrote a message:
1. Alice encrypts a hash of the message using her **Private Key** (creating a signature).
2. She sends the message and the signature to Bob.
3. Bob uses Alice's **Public Key** to decrypt the signature. If it decrypts correctly, he knows with 100% mathematical certainty that the person who holds the Private Key (Alice) signed it.

## 3. Asymmetric vs. Symmetric

<ComparisonTable 
  headers={['Feature', 'Asymmetric Encryption', 'Symmetric Encryption']} 
  rows={[
    ['Keys', 'Two (Public and Private)', 'One (Shared Secret)'],
    ['Speed', 'Extremely Slow (Heavy Math)', 'Extremely Fast (Bitwise operations)'],
    ['Primary Use Case', 'Key Exchange, Digital Signatures (RSA, ECC)', 'Bulk Data Encryption (AES, ChaCha20)'],
    ['Key Exchange Problem', 'Solved (Public keys are public)', 'Fatal (Must securely share the key)']
  ]} 
/>

<Callout icon="warning" title="The Hybrid Approach (TLS)">
  Because Asymmetric encryption is incredibly slow, the modern internet (HTTPS/TLS) uses a **Hybrid System**. It uses Asymmetric Encryption (like RSA) purely to securely exchange a temporary Symmetric Key. Once both sides have the Symmetric Key, they switch to Symmetric Encryption (like AES) for the rest of the web session to stream data at high speeds.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/bcrypt/index.mdx': `---
title: bcrypt
description: The industry-standard, deliberately slow cryptographic hashing algorithm designed exclusively to safely store user passwords and defeat brute-force attacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="bcrypt">

Standard hashing algorithms like **MD5**, **SHA-1**, and **SHA-256** were designed for speed. They can hash gigabytes of data per second. 
When storing user passwords in a database, speed is a catastrophic vulnerability. A hacker who steals a database of SHA-256 password hashes can rent an array of GPUs and brute-force (guess) billions of passwords per second until they find the matches.

**bcrypt** is a cryptographic hashing algorithm designed in 1999 specifically for password storage. Its primary defining feature is that it is **deliberately, computationally slow**.

## 1. The Cost Factor (Work Factor)

bcrypt relies on the Blowfish cipher and introduces a mathematical parameter called the **Cost Factor** (often denoted as a two-digit number, like ${TICK1}10${TICK1} or ${TICK1}12${TICK1}).

The Cost Factor dictates how many iterations of the internal hashing loop are executed, scaling logarithmically ($2^{\\text{cost}}$ iterations). 
- A cost of 10 requires $2^{10}$ (1,024) iterations.
- A cost of 12 requires $2^{12}$ (4,096) iterations, taking 4 times longer.

<Callout icon="tip" title="Future-Proofing">
  As hardware gets faster (Moore's Law), bcrypt remains secure because developers can simply increment the Cost Factor in their code. If GPUs become twice as fast next year, you increase the cost factor by 1, doubling the mathematical work required, perfectly neutralizing the hardware upgrade.
</Callout>

## 2. Built-in Salting

A fatal flaw of early password storage was the failure to use a **Salt** (random data appended to a password before hashing). Without salts, two users with the password ${TICK1}password123${TICK1} would have the exact same database hash, and hackers could use pre-computed Rainbow Tables to crack them instantly.

bcrypt inherently forces the use of salts. The algorithm automatically generates a cryptographically secure 128-bit salt and bakes it directly into the final output string.

## 3. Anatomy of a bcrypt Hash

A standard bcrypt hash looks like this:
${TICK1}$2b$12$eImiTXuWVxfM37uY4JANjQ==.xyzABC1234567890qwertyuiopasdfg${TICK1}

- **${TICK1}$2b$${TICK1}**: The algorithm version identifier.
- **${TICK1}12$${TICK1}**: The Cost Factor (2^12 iterations).
- **${TICK1}eImiTXuWVxfM37uY4JANjQ==${TICK1}**: The 22-character randomly generated Salt.
- **${TICK1}.xyzABC...${TICK1}**: The actual 31-character hashed password output.

Because the algorithm version, cost, and salt are all stored in plain text inside the string, the authentication server has all the information it needs to re-hash the user's login attempt and compare the results, without needing a separate database column for the salt.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Diffie-Hellman/index.mdx': `---
title: Diffie-Hellman Key Exchange
description: A groundbreaking mathematical protocol allowing two parties to establish a shared secret over an insecure channel without ever transmitting the secret itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="Diffie-Hellman Key Exchange">

Before 1976, if Alice and Bob wanted to encrypt their communications using a symmetric key (like AES), they had to physically meet in a dark alley to hand off a briefcase containing the key. If they sent it over the wire, a spy could intercept it.

The **Diffie-Hellman Key Exchange (DH)** is a mathematical miracle. It allows Alice and Bob to shout numbers at each other across a crowded, wiretapped room, and through modular arithmetic, both arrive at the exact same secret number, while the spy listening to every word learns absolutely nothing.

## 1. The Paint Mixing Analogy

The easiest way to understand the math is through mixing paint:
1. Alice and Bob agree on a **Public Common Paint Color** (Yellow). The Spy also sees Yellow.
2. Alice picks a **Secret Color** (Red). Bob picks a **Secret Color** (Blue). They never reveal these.
3. Alice mixes her Red with the public Yellow, creating **Orange**.
4. Bob mixes his Blue with the public Yellow, creating **Green**.
5. Alice and Bob exchange their mixed colors in plain sight. The Spy intercepts Orange and Green. 
6. Alice takes Bob's Green and adds her secret Red. (Result: **Brown**).
7. Bob takes Alice's Orange and adds his secret Blue. (Result: **Brown**).

Alice and Bob now both share the secret color **Brown**. The Spy has Orange, Green, and Yellow, but it is chemically impossible to "unmix" paint to discover the original secret colors. The Spy cannot create Brown.

## 2. The Real Mathematics (Modular Arithmetic)

Instead of paint, Diffie-Hellman uses prime numbers and the **Discrete Logarithm Problem**.
It relies on the mathematical fact that $ (g^a)^b \\pmod p = (g^b)^a \\pmod p $.

1. Alice and Bob publicly agree on a prime modulus $p$ and a generator base $g$.
2. Alice selects a secret integer $a$. She computes $A = g^a \\pmod p$ and sends $A$ to Bob.
3. Bob selects a secret integer $b$. He computes $B = g^b \\pmod p$ and sends $B$ to Alice.
4. Alice computes $S = B^a \\pmod p$.
5. Bob computes $S = A^b \\pmod p$.

Both Alice and Bob now possess the exact same shared secret $S$. The Spy saw $p$, $g$, $A$, and $B$, but without knowing $a$ or $b$, calculating $S$ requires solving the discrete logarithm, which takes modern supercomputers billions of years.

<Callout icon="warning" title="The Man-in-the-Middle Flaw">
  Diffie-Hellman provides perfect secrecy against eavesdroppers, but it provides **zero authentication**. A hacker can intercept Alice's message, pretend to be Bob, and establish a shared key with Alice, while simultaneously establishing a second key with Bob. This is why modern TLS pairs Diffie-Hellman with **RSA or ECDSA Digital Signatures** to cryptographically prove the identities of the parties before exchanging keys.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Digital signatures/index.mdx': `---
title: Digital Signatures
description: The cryptographic mechanism that guarantees the authenticity, integrity, and non-repudiation of digital documents and network messages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="Digital Signatures">

A **Digital Signature** is the mathematical equivalent of a handwritten signature or a wax seal on an envelope. It uses Public-Key Cryptography to prove that a message originated from a specific person and that the message was not tampered with during transit.

They are the foundational security mechanism behind SSL/TLS Certificates, Software Updates, Cryptocurrency transactions, and secure emails.

## 1. The Three Guarantees

Digital Signatures provide three absolute cryptographic guarantees:
1. **Authentication**: Proves the sender is who they claim to be (because only they possess the Private Key).
2. **Integrity**: Proves the message was not altered by a hacker in transit. (If a single comma is changed, the signature verification mathematically fails).
3. **Non-Repudiation**: The sender cannot legally or mathematically deny having sent the message, as only their unique Private Key could have generated the signature.

## 2. How it Works (The Workflow)

Digital Signatures operate by running Asymmetric Encryption *in reverse*.

### Step 1: Signing (The Sender)
Alice wants to send a signed contract to Bob.
1. Alice runs the contract through a Hashing Algorithm (like SHA-256) to generate a fixed-length **Hash**.
2. Alice **encrypts** that Hash using her own secret **Private Key**. This encrypted hash is the "Digital Signature".
3. Alice sends the plain-text contract and the Digital Signature to Bob.

### Step 2: Verification (The Receiver)
1. Bob receives the document and the signature.
2. Bob runs the document through the exact same Hashing Algorithm (SHA-256) to generate his own Hash.
3. Bob uses Alice's publically available **Public Key** to **decrypt** the Digital Signature. 
4. Bob compares the Hash he generated with the Hash he just decrypted. If they are a 100% perfect match, the signature is valid.

<Callout icon="info" title="Why Hash first?">
  Asymmetric encryption (like RSA) is mathematically incredibly slow and has strict data size limits. You cannot encrypt a 500-page PDF using a Private Key. By hashing the PDF into a tiny 256-bit string first, the cryptography only has to encrypt the hash, taking milliseconds rather than hours.
</Callout>

## 3. Real-World Applications

- **HTTPS / SSL Certificates**: When you visit your bank's website, your browser verifies a Digital Signature from a Certificate Authority (like DigiCert) to ensure the server actually belongs to the bank.
- **Software Binaries**: When you download an iOS update or a Windows ${TICK1}.exe${TICK1}, the operating system verifies Apple's or Microsoft's digital signature to ensure a hacker didn't inject malware into the download.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/ECC/index.mdx': `---
title: ECC (Elliptic Curve Cryptography)
description: The modern successor to RSA, providing vastly superior cryptographic security using significantly smaller key sizes, making it ideal for mobile devices and modern web servers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'
import { ComparisonTable } from '@/features/kb/components/ComparisonTable'

<ConceptTemplate title="ECC (Elliptic Curve Cryptography)">

For decades, the internet relied on **RSA** for public-key encryption. RSA derives its security from the mathematical difficulty of factoring massively large prime numbers. However, as computers got faster, RSA keys had to grow exponentially larger (from 1024-bit, to 2048-bit, to 4096-bit) to remain secure, eating up CPU power and bandwidth on mobile devices.

**Elliptic Curve Cryptography (ECC)** is the modern replacement. It derives its security from the algebraic structure of elliptic curves over finite fields, offering massive security with incredibly tiny key sizes.

## 1. The Mathematics (The Point Addition Trapdoor)

An Elliptic Curve is a symmetric, swooping mathematical graph defined by the equation $y^2 = x^3 + ax + b$.

ECC relies on a "Trapdoor Function" (easy to do in one direction, practically impossible to reverse).
1. You pick a starting point on the curve (Point A).
2. You draw a tangent line, see where it intersects the curve, and reflect it across the X-axis to find Point B. 
3. You repeat this "bouncing" process $n$ times to land at a final Point Z.

- **Private Key**: The number of bounces ($n$).
- **Public Key**: The final coordinates (Point Z).

If a hacker intercepts Point Z and Point A, it is mathematically infeasible for them to determine how many times ($n$) you bounced around the curve to get there. Unlike prime factorization, there is no known shortcut algorithm for the Elliptic Curve Discrete Logarithm Problem.

## 2. The Size Advantage

Because the math behind ECC is so much harder to crack than RSA's prime factorization, it requires vastly smaller keys to achieve the exact same level of security.

<ComparisonTable 
  headers={['Security Level (Symmetric Equivalent)', 'RSA Key Size', 'ECC Key Size']} 
  rows={[
    ['112-bit (Minimum Secure)', '2048-bit', '224-bit'],
    ['128-bit (Standard)', '3072-bit', '256-bit'],
    ['192-bit (Top Secret)', '7680-bit', '384-bit'],
    ['256-bit (Quantum-resistant symmetric)', '15360-bit', '521-bit']
  ]} 
/>

A 256-bit ECC key offers the same security as a massive 3072-bit RSA key. 
This means ECC requires significantly less CPU power to generate, less battery drain on smartphones, and less network bandwidth to transmit during SSL/TLS handshakes.

<Callout icon="success" title="The Bitcoin Standard">
  ECC is so efficient that it is the exclusive cryptographic foundation of Bitcoin and Ethereum. Every single cryptocurrency wallet address is mathematically derived from an Elliptic Curve public key using the **secp256k1** curve standard.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/PKI/index.mdx': `---
title: PKI (Public Key Infrastructure)
description: The global hierarchical system of Certificate Authorities, digital certificates, and protocols that establishes cryptographic trust on the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="PKI (Public Key Infrastructure)">

Asymmetric encryption solves the problem of securely sending a secret over the internet. But it introduces a terrifying new vulnerability: **The Trust Problem**. 
If you download a public key that claims to belong to "Bank of America", how do you mathematically know a hacker sitting in a coffee shop didn't just generate that key five minutes ago and put the Bank's name on it?

**PKI (Public Key Infrastructure)** is the global administrative and cryptographic framework that binds Public Keys to actual, legally verified human identities and corporations using Digital Certificates.

## 1. The Components of PKI

- **Digital Certificate (X.509)**: An electronic passport. It is a text file containing an entity's name, their Public Key, the expiration date, and a Digital Signature from a Certificate Authority.
- **Certificate Authority (CA)**: A massive, highly secure, globally trusted corporation (like DigiCert, Let's Encrypt, or GlobalSign) whose sole job is to verify legal identities and issue signed Certificates.
- **Root Store**: A hardcoded list of pre-trusted CA Root Certificates physically baked into your Operating System (Windows, macOS) and web browser (Chrome, Firefox).

## 2. The Chain of Trust (Hierarchical Trust)

PKI relies on a top-down hierarchy of trust, heavily utilizing Digital Signatures.

1. **The Root CA**: The ultimate authority. The Root CA creates a Root Certificate and signs it *using its own private key* (Self-Signed). Microsoft and Apple review the CA's security practices, and if approved, inject this Root Certificate into the OS Root Store.
2. **The Intermediate CA**: The Root CA's private key is too valuable to use daily (if hacked, the internet collapses). Instead, the Root CA signs an "Intermediate Certificate" to do the daily work.
3. **The Leaf Certificate (End-Entity)**: When "Bank of America" wants a secure website, they pay a CA. The CA legally verifies the bank's incorporation papers. The CA then uses the Intermediate Private Key to digitally sign the Bank's Leaf Certificate.

## 3. The TLS Handshake (How your Browser Uses PKI)

When you type ${TICK1}https://bank.com${TICK1}:
1. The server sends your browser its Leaf Certificate and the Intermediate Certificate.
2. Your browser checks the signature on the Leaf Certificate using the Intermediate's Public Key.
3. Your browser checks the signature on the Intermediate Certificate using the Root CA's Public Key (which is hardcoded in your computer).
4. Because the math holds up perfectly down the entire chain, the green padlock appears, proving you are not talking to a hacker.

<Callout icon="error" title="Certificate Revocation">
  If a company's server is hacked and their Private Key is stolen, the Certificate is instantly compromised. PKI uses **CRLs (Certificate Revocation Lists)** and **OCSP (Online Certificate Status Protocol)** to broadcast to all browsers globally that the certificate is void, destroying the chain of trust before users are phished.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Post-quantum cryptography/index.mdx': `---
title: Post-Quantum Cryptography
description: The next generation of cryptographic algorithms designed to resist the devastating mathematical attacks of future large-scale quantum computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="Post-Quantum Cryptography (PQC)">

Currently, the entire internet (HTTPS, banking, VPNs, blockchains) is secured by asymmetric algorithms like **RSA** and **ECC**. These algorithms rely on mathematical problems (like prime factorization and elliptic curve logarithms) that are practically impossible for classical supercomputers to solve.

However, a sufficiently powerful **Quantum Computer** running **Shor's Algorithm** can mathematically shatter RSA and ECC in hours. **Post-Quantum Cryptography (PQC)** refers to a new class of cryptographic algorithms designed to run on normal, classical computers, but which rely on entirely different mathematical branches that even Quantum Computers cannot efficiently solve.

## 1. The Threat: Shor's and Grover's Algorithms

- **Shor's Algorithm**: A quantum algorithm that solves Prime Factorization and Discrete Logarithms exponentially faster than classical computers. It utterly destroys all currently deployed Asymmetric Encryption (RSA, Diffie-Hellman, ECC).
- **Grover's Algorithm**: A quantum search algorithm that quadraticly speeds up brute-force attacks against Symmetric Encryption (like AES) and Hash Functions (like SHA-256). 
  - *The Fix for Grover's*: Simply double the key size. AES-128 is vulnerable, but AES-256 is mathematically completely immune to quantum computers. 

## 2. The NIST Standardization

Realizing the apocalyptic threat of "Q-Day" (the day a cryptographically relevant quantum computer is turned on), the US National Institute of Standards and Technology (NIST) spent years running a global competition to select the new PQC standards. In 2024, they officially published the winners:

### Lattice-Based Cryptography
The absolute core of the new PQC era. It relies on the "Learning With Errors" (LWE) problem and the Shortest Vector Problem within multi-dimensional mathematical grids (lattices). Quantum computers cannot easily navigate these lattices.
- **ML-KEM (formerly CRYSTALS-Kyber)**: The new standard for Key Exchange (replacing Diffie-Hellman/RSA key establishment).
- **ML-DSA (formerly CRYSTALS-Dilithium)**: The primary new standard for Digital Signatures.

### Hash-Based Signatures
Relies entirely on the proven security of cryptographic hash functions rather than algebraic math.
- **SLH-DSA (formerly SPHINCS+)**: A backup Digital Signature standard. It produces massive signature files (kilobytes in size) and is slow, but its mathematical security is ironclad and deeply understood.

<Callout icon="warning" title="Harvest Now, Decrypt Later">
  Why are tech giants like Apple (iMessage PQ3) and Google (Chrome TLS) deploying PQC *today*, even though quantum computers don't exist yet? 
  Because nation-state intelligence agencies are currently vacuuming up and storing petabytes of encrypted internet traffic. They are simply waiting 10 years until they build a quantum computer to retroactively decrypt all the state secrets they harvested today. You must deploy PQC before the data is intercepted.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/RSA/index.mdx': `---
title: RSA (Rivest-Shamir-Adleman)
description: The original and most widely deployed Public-Key cryptographic system, deriving its unbreakable security from the mathematical impossibility of factoring massively large prime numbers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="RSA (Rivest-Shamir-Adleman)">

Invented in 1977, **RSA** was the first practical implementation of Asymmetric (Public-Key) Cryptography. For over 40 years, it has been the absolute backbone of internet security, responsible for securing SSL/TLS certificates, PGP emails, and secure SSH connections.

## 1. The Mathematics (Prime Factorization)

RSA is based on a mathematically elegant Trapdoor Function.
It is extremely easy for a computer to take two massive prime numbers and multiply them together. It is practically impossible for a computer to take the massive resulting number and figure out which two prime numbers created it.

1. **Key Generation**: 
   - Pick two randomly generated, gigantic prime numbers (e.g., $p$ and $q$, each hundreds of digits long).
   - Multiply them together to create the Modulus ($n = p \\times q$). 
   - Through Euler's Totient Function, calculate an exponent ($e$) for the Public Key, and an exponent ($d$) for the Private Key.
2. **The Public Key**: The numbers $(n, e)$. Handed to the world.
3. **The Private Key**: The numbers $(n, d)$. Kept strictly secret.

Because the Private Key $d$ is mathematically derived directly from the secret primes $p$ and $q$, a hacker who only has the Public Key $n$ must successfully factor $n$ back into $p$ and $q$ to steal the private key. For a 2048-bit RSA key, this would take classical supercomputers trillions of years.

## 2. How it Encrypts and Signs

RSA relies entirely on modular exponentiation.

- **To Encrypt a message ($M$)**: $ \\text{Ciphertext} = M^e \\pmod n $
- **To Decrypt the Ciphertext ($C$)**: $ \\text{Message} = C^d \\pmod n $

The math is perfectly symmetrical. You can also use it in reverse for **Digital Signatures**: encrypt a document hash with the Private Key ($d$), and anyone in the world can verify it using the Public Key ($e$).

<Callout icon="warning" title="The Death of RSA">
  While foundational, RSA is slowly being phased out of modern systems in favor of **ECC (Elliptic Curve Cryptography)**. Because computers are getting faster at factoring primes, RSA keys have had to grow to massive, bloated sizes (2048-bit or 4096-bit) to remain secure, which slows down TLS handshakes. Furthermore, a future Quantum Computer running Shor's Algorithm will effortlessly crack RSA's prime factorization in hours.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Salting/index.mdx': `---
title: Cryptographic Salting
description: A fundamental defense mechanism in password security that neutralizes pre-computed Rainbow Table attacks by appending random data to passwords before hashing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="Cryptographic Salting">

A naive authentication system stores user passwords by running them through a hashing algorithm (like SHA-256). 
The fatal flaw is that hashing algorithms are deterministic. If Alice and Bob both use the terrible password ${TICK1}password123${TICK1}, their database rows will contain the exact same cryptographic hash:
${TICK1}ef92b778bafe771e89245b89ea114...${TICK1}

## 1. The Threat: Rainbow Tables

Because humans are notoriously predictable, hackers don't waste time trying to crack hashes during a breach. They prepare years in advance. 
A **Rainbow Table** is a massive, multi-terabyte pre-computed database. The hacker runs the top 100 million most common passwords through SHA-256 and stores the mappings.
When they hack your database, they don't do any math. They just run a simple SQL ${TICK1}JOIN${TICK1} against their Rainbow Table, instantly decrypting 70% of your users' passwords in a fraction of a second.

## 2. The Solution: The Salt

A **Salt** is a cryptographically secure string of random characters generated uniquely for *each specific user* the moment they register an account.

Instead of hashing the password directly:
1. The server generates a random salt (e.g., ${TICK1}xQ9Lp2!${TICK1}).
2. The server concatenates the salt and the password: ${TICK1}password123xQ9Lp2!${TICK1}.
3. The server hashes the resulting, highly complex string.
4. The server stores **both** the Hash and the plaintext Salt in the database row.

<Callout icon="success" title="Destroying the Rainbow">
  Salting completely neutralizes Rainbow Tables. Even if a user's password is "123456", the resulting hashed string is completely unique to the universe because of the random salt. The hacker's pre-computed tables are entirely useless, forcing them to painfully brute-force every single user account one at a time.
</Callout>

## 3. Salt vs. Pepper

While a **Salt** is unique per user and stored plainly in the database, a **Pepper** is a single, global secret string applied to all passwords, but it is stored in a highly secure environment (like an AWS Key Management Service or a hardcoded environment variable) *completely separate from the database*.

If a hacker exploits a SQL Injection vulnerability to steal the user table, they get the hashes and the salts, but they cannot crack them because they do not have access to the application server's secret Pepper.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Zero-knowledge proofs/index.mdx': `---
title: Zero-Knowledge Proofs (ZKP)
description: A mind-bending cryptographic protocol that allows a prover to mathematically prove to a verifier that a statement is true, without revealing any actual information about the statement itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/Callout'

<ConceptTemplate title="Zero-Knowledge Proofs (ZKP)">

One of the most profound paradoxes in cybersecurity: How do you prove to a bouncer that you are over 21 years old, without showing them your ID, your birthdate, your name, or your address?

A **Zero-Knowledge Proof (ZKP)** is a cryptographic method that allows one party (the Prover) to mathematically guarantee to another party (the Verifier) that a specific statement is true, while conveying absolutely **zero additional information**.

## 1. The Ali Baba Cave Analogy

To intuitively understand how this is possible without math, cryptographers use the classic Ali Baba Cave analogy:

Imagine a circular cave with a locked magic door at the back. Alice (the Prover) claims she knows the secret password to open the door. Bob (the Verifier) wants proof, but Alice refuses to say the password out loud.
1. Bob waits outside. Alice walks into the cave and randomly chooses Path A or Path B to walk down, eventually stopping at the locked door.
2. Bob walks to the entrance and shouts a command: "Come out of Path B!"
3. If Alice actually knows the password, she can easily open the magic door and walk out of Path B, regardless of which path she originally entered.
4. If Alice is lying, she has a 50% chance of being trapped and exposed. 

They repeat this process 40 times. The mathematical probability of a liar getting lucky 40 times in a row is $0.5^{40}$ (practically zero). By the end, Bob is 100% convinced Alice knows the password, yet Alice never revealed the password to Bob.

## 2. Interactive vs. Non-Interactive (zk-SNARKs)

- **Interactive ZKPs**: Like the cave, require the Verifier to constantly challenge the Prover in real-time. This is slow and requires both parties to be online.
- **Non-Interactive ZKPs (zk-SNARKs / zk-STARKs)**: Through complex elliptic curve cryptography, the Prover can generate a single, tiny, mathematical "certificate of truth". The Verifier can instantly verify this certificate at any time without communicating with the Prover. 

## 3. Real-World Applications

ZKPs are currently revolutionizing privacy and scalability in the Web3 and financial sectors.

- **Privacy Coins (Zcash)**: You can prove to the blockchain that you have enough money to send a transaction, without the blockchain actually knowing your account balance or who you are sending the money to.
- **Ethereum zk-Rollups**: A Layer 2 network processes 10,000 transactions off-chain, and uses a single zk-SNARK proof to mathematically guarantee to the main Ethereum chain that all 10,000 transactions were valid, saving massive amounts of gas fees and processing time.
- **Identity Verification**: In the future, you could generate a ZKP from your digital passport that proves your citizenship to a website, without giving the website your actual passport number or name.

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
