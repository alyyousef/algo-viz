import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Symmetric encryption/index.mdx': `---
title: Symmetric Encryption
description: The foundation of fast data confidentiality, utilizing a single shared secret key for both encryption and decryption.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Symmetric Encryption">

Symmetric Encryption is a mathematical process where the **exact same secret key** is used to both encrypt the plaintext into ciphertext, and decrypt the ciphertext back into plaintext. 

## 1. How It Works
Alice and Bob mathematically agree on a secret key (e.g., a 256-bit random string). 
When Alice sends a message, her computer runs a symmetric algorithm (like AES) using the secret key to scramble the data. When Bob receives it, his computer uses the identical key to reverse the math.

## 2. Block Ciphers vs Stream Ciphers

<ComparisonTable 
  headers={['Cipher Type', 'Mechanism', 'Primary Use Case']} 
  rows={[
    ['Block Cipher', 'Mathematically chunks data into fixed-size blocks (e.g., 128 bits) and encrypts each block sequentially using complex substitution and permutation networks.', 'Database encryption, file encryption, TLS (AES-GCM).'],
    ['Stream Cipher', 'Mathematically generates an infinite pseudo-random keystream based on the secret key. It then applies a bitwise XOR (TICK1^TICK1) between the plaintext and the keystream.', 'Real-time hardware encryption, ultra-low latency protocols (ChaCha20).']
  ]} 
/>

## 3. The Fatal Flaw: The Key Distribution Problem
Symmetric encryption is mathematically unbreakable (assuming a strong key length like 256-bit and a modern algorithm like AES). It is phenomenally fast and computationally cheap.

However, it suffers from a catastrophic logical flaw known as the **Key Distribution Problem**.
If Alice wants to securely talk to Bob over the internet, they must use the same key. But how does Alice securely send Bob the key in the first place? If she sends it over the internet, a hacker can intercept it. If a hacker intercepts the symmetric key, the entire encryption system is permanently compromised.

<Callout icon="tip" title="The Solution">
Symmetric encryption is almost never used alone over the internet. It is mathematically paired with **Asymmetric Encryption** (like RSA or Diffie-Hellman), which is used *exclusively* to securely establish the symmetric key over an insecure channel.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Asymmetric encryption/index.mdx': `---
title: Asymmetric Encryption (Public-Key)
description: The mathematical miracle that solved the Key Distribution Problem, allowing secure communication without a pre-shared secret.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Asymmetric Encryption">

Asymmetric Encryption (Public-Key Cryptography) was invented in the 1970s and mathematically solved the greatest problem in cryptography: how two strangers can securely communicate over a hostile network without ever meeting to exchange a secret key.

## 1. The Public and Private Key Pair
Instead of a single shared secret key, Asymmetric Encryption mathematically generates a **Key Pair** for every user:
1. **The Public Key**: Can be shouted from the rooftops. You can put it on your website, your Twitter bio, or hand it directly to hackers.
2. **The Private Key**: Must be guarded with your life. It never, ever leaves your physical device.

The mathematical miracle is this: **Data encrypted with the Public Key can ONLY be decrypted by the Private Key.** It mathematically cannot be decrypted by the Public Key that locked it.

## 2. How the Communication Works
If Alice wants to send a top-secret file to Bob:
1. Alice requests Bob's **Public Key**.
2. Alice uses Bob's Public Key to encrypt the file into ciphertext.
3. Alice sends the ciphertext to Bob over the open internet.
4. A hacker intercepts the ciphertext. The hacker *also* has Bob's Public Key, but it is mathematically useless for decryption.
5. Bob receives the ciphertext and uses his **Private Key** to decrypt it.

## 3. The Computational Cost
While Asymmetric Encryption (like RSA or ECC) is mathematically brilliant, it relies on massive, computationally heavy mathematical operations (like prime factorization or elliptic curve geometry).

As a result, Asymmetric Encryption is **1,000x to 10,000x slower** than Symmetric Encryption.

<Callout icon="info" title="The Hybrid Architecture">
Because Asymmetric Encryption is so slow, it is never used to encrypt large files (like a 4GB movie). Instead, the internet uses a Hybrid Architecture (like TLS). Asymmetric Encryption is used *only* to securely transmit a tiny, 256-bit Symmetric Key. Once both parties have the Symmetric Key, they switch to blazing-fast Symmetric Encryption (AES) for the rest of the session.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/AES/index.mdx': `---
title: Advanced Encryption Standard (AES)
description: The mathematical breakdown of the gold-standard symmetric block cipher that secures the entire global internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Advanced Encryption Standard (AES)">

In 2001, the U.S. National Institute of Standards and Technology (NIST) adopted the Rijndael algorithm as the **Advanced Encryption Standard (AES)**. Today, it mathematically secures almost every encrypted byte on Earth, from TLS connections to classified military hard drives.

## 1. The Mathematical Engine
AES is a **Symmetric Block Cipher**. It ingests exactly 128 bits (16 bytes) of plaintext at a time and mathematically scrambles it across multiple "Rounds".

Depending on the key size, AES executes a specific number of rounds:
- **AES-128**: 10 rounds.
- **AES-192**: 12 rounds.
- **AES-256**: 14 rounds.

In each round, four complex mathematical transformations are applied to the 4x4 matrix of bytes:
1. **SubBytes**: A non-linear substitution step that swaps every byte using a strict mathematical lookup table (S-box), destroying linearity.
2. **ShiftRows**: Shifts the rows of the matrix, mathematically ensuring that data is diffused across columns.
3. **MixColumns**: A highly complex matrix multiplication step over a Galois Field, mathematically mixing the data vertically.
4. **AddRoundKey**: A bitwise XOR between the data matrix and the specific mathematical sub-key for that round.

## 2. Block Cipher Modes of Operation
Because AES mathematically only encrypts 128 bits at a time, you cannot just run it sequentially on a 10MB file without a "Mode of Operation."

<ComparisonTable 
  headers={['Mode', 'Mechanism', 'Security Assessment']} 
  rows={[
    ['ECB (Electronic Codebook)', 'Encrypts each 128-bit block completely independently.', 'CATASTROPHICALLY INSECURE. Identical plaintext blocks produce identical ciphertext blocks, leaving visual patterns (The famous "ECB Penguin"). Never use.'],
    ['CBC (Cipher Block Chaining)', 'XORs each plaintext block with the ciphertext of the previous block before encrypting.', 'Secure, but strictly sequential. Cannot be mathematically parallelized across CPU cores.'],
    ['GCM (Galois/Counter Mode)', 'Turns AES into a Stream Cipher using a counter. Mathematically includes an authentication tag (AEAD).', 'THE INDUSTRY STANDARD. Massively parallelizable and guarantees data has not been tampered with.']
  ]} 
/>

<Callout icon="warning" title="Quantum Threat">
While RSA and ECC are mathematically destroyed by Quantum Computers, AES is remarkably resistant. Grover's Algorithm halves the effective key space of symmetric ciphers. Therefore, AES-128 is theoretically vulnerable to quantum attacks, but **AES-256 remains mathematically impenetrable even against theoretical quantum supercomputers**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/RSA/index.mdx': `---
title: RSA (Rivest-Shamir-Adleman)
description: The pioneering asymmetric encryption algorithm based on the mathematical impossibility of factoring massive prime numbers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="RSA">

Invented in 1977, **RSA** is the original and most famous Asymmetric (Public-Key) algorithm. It relies entirely on a specific mathematical asymmetry in number theory: **Prime Factorization**.

## 1. The Mathematical Foundation
It is computationally trivial for a computer to multiply two massive prime numbers together (TICK1p * q = nTICK1). 
However, if you are given only the massive 600-digit number TICK1nTICK1, there is no known efficient mathematical algorithm in existence to reverse-engineer which two primes were multiplied to create it. 

### Key Generation Process
1. Mathematically generate two massive, random prime numbers, TICK1pTICK1 and TICK1qTICK1.
2. Calculate the modulus TICK1n = p * qTICK1. (This TICK1nTICK1 forms the mathematical lock).
3. Calculate Carmichael's totient function TICK1λ(n)TICK1.
4. Choose an integer TICK1eTICK1 (often 65537) that is coprime to TICK1λ(n)TICK1. 
5. The **Public Key** is mathematically defined as TICK1(n, e)TICK1.
6. Calculate the modular multiplicative inverse of TICK1eTICK1 modulo TICK1λ(n)TICK1 to find TICK1dTICK1. 
7. The **Private Key** is mathematically defined as TICK1(n, d)TICK1.

## 2. Encryption and Decryption
Once the keys are mathematically established, encryption is simply modular exponentiation.

- **Encrypting (using Public Key)**: TICK1Ciphertext = (Message^e) mod nTICK1
- **Decrypting (using Private Key)**: TICK1Message = (Ciphertext^d) mod nTICK1

## 3. The Downfall of RSA
While mathematically beautiful, RSA is dying in modern systems for two reasons:

1. **Massive Key Sizes**: To maintain mathematical security against modern GPUs, an RSA key must be at least **2048 bits** (preferably 4096 bits). These massive keys consume huge amounts of bandwidth during TLS handshakes.
2. **Shor's Algorithm**: In 1994, Peter Shor published a quantum algorithm that mathematically solves prime factorization in polynomial time. Once a sufficiently large Quantum Computer is built, RSA is instantly and mathematically broken forever.

<Callout icon="tip" title="The Modern Replacement">
Modern systems have overwhelmingly replaced RSA with **Elliptic Curve Cryptography (ECC)**. ECC relies on the mathematical impossibility of traversing points on a 2D elliptic curve. A 256-bit ECC key is mathematically as secure as a massive 3072-bit RSA key, making it exponentially faster for servers and mobile devices.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Hashing/index.mdx': `---
title: Cryptographic Hashing
description: The mathematical one-way function that guarantees data integrity, turning infinite data into a fixed-size digital fingerprint.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Cryptographic Hashing">

A **Cryptographic Hash Function** is an essential mathematical algorithm that takes an input (or 'message') of absolute arbitrary length (from a 1-character password to a 50 Terabyte database) and mathematically squashes it into a fixed-size string of bytes (the 'hash' or 'digest').

**Crucially, hashing is NOT encryption.** Encryption is a two-way mathematical function (you can decrypt it). Hashing is a strict **one-way** mathematical function. Once data is hashed, it is mathematically impossible to reverse-engineer the original data from the hash.

## 1. The Core Mathematical Properties
For a hash function to be considered cryptographically secure, it must mathematically guarantee four properties:

1. **Deterministic**: The exact same input must always mathematically yield the exact same output hash.
2. **Quick to Compute**: The hardware must be able to calculate the hash rapidly.
3. **Pre-image Resistance (One-Way)**: Given a hash, it is mathematically infeasible to determine the original input.
4. **Collision Resistance**: It must be mathematically infeasible to find two completely different inputs that result in the exact same output hash.

## 2. The Avalanche Effect
A secure hash function must exhibit the **Avalanche Effect**. 
If you mathematically alter a single bit of a 1 Terabyte file, the resulting hash should be wildly, completely different from the original hash. You cannot use the hash to deduce "how close" two files are.

## 3. Real-World Applications

<ComparisonTable 
  headers={['Application', 'How Hashing is Used']} 
  rows={[
    ['Password Storage', 'Databases NEVER store plaintext passwords. They store the Hash of the password. When you log in, the system hashes your input and mathematically compares the two hashes.'],
    ['Data Integrity', 'When you download a Linux ISO, the website provides a SHA-256 hash. You hash the downloaded file on your CPU. If the hashes match exactly, the file was not corrupted or mathematically altered by a hacker.'],
    ['Blockchain (Bitcoin)', 'Bitcoin relies entirely on SHA-256. Miners mathematically burn electricity to find a hash output that starts with a specific number of zeroes (Proof of Work).']
  ]} 
/>

<Callout icon="warning" title="MD5 and SHA-1 are Broken">
Historically, developers used MD5 or SHA-1 for hashing. Both are now mathematically broken. Hackers can execute **Collision Attacks**, mathematically engineering a malicious virus file that outputs the exact same MD5 hash as a legitimate software update. Never use them.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Digital signatures/index.mdx': `---
title: Digital Signatures
description: Utilizing asymmetric cryptography in reverse to mathematically prove identity, authenticity, and non-repudiation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Digital Signatures">

**Digital Signatures** are the mathematical equivalent of a physical signature, but infinitely more secure. They mathematically guarantee three things:
1. **Authentication**: The sender is exactly who they claim to be.
2. **Data Integrity**: The message was not mathematically altered in transit.
3. **Non-Repudiation**: The sender cannot mathematically deny sending the message later.

## 1. Reversing Asymmetric Encryption
In normal Asymmetric Encryption, you encrypt with a Public Key, and decrypt with a Private Key.
Digital Signatures mathematically invert this paradigm: **You encrypt with the Private Key, and verify with the Public Key.**

Because *only* you possess your Private Key, if someone can successfully decrypt a message using your Public Key, it mathematically proves that *you* must have been the one to encrypt it.

## 2. The Step-by-Step Mathematical Process
Encrypting a 5GB PDF document with a slow RSA Private Key would take hours. Therefore, Digital Signatures combine Hashing and Asymmetric Encryption.

**Signing (Alice's Computer):**
1. Alice writes a contract (a PDF).
2. Alice mathematically runs the PDF through a Hash Function (like SHA-256), resulting in a tiny 256-bit string.
3. Alice encrypts *only the 256-bit Hash* using her **Private Key**. This encrypted hash is the **Digital Signature**.
4. Alice sends the original plaintext PDF and the Digital Signature to Bob.

**Verifying (Bob's Computer):**
1. Bob receives the PDF and the Digital Signature.
2. Bob mathematically runs the exact same Hash Function (SHA-256) on the plaintext PDF to generate his own local hash.
3. Bob uses Alice's **Public Key** to decrypt the Digital Signature, revealing the hash Alice calculated.
4. Bob mathematically compares his local hash with Alice's decrypted hash.

### The Conclusion:
- If the hashes match perfectly, the signature is mathematically valid. The file is un-tampered, and Alice definitely sent it.
- If a hacker changed a single comma in the PDF, Bob's local hash would change (Avalanche Effect), the hashes would mathematically fail to match, and the signature is rejected.

<Callout icon="info" title="JWTs (JSON Web Tokens)">
Modern web architecture relies on Digital Signatures for authentication. When you log in, the server generates a JSON object (JWT) containing your User ID, and signs it using the Server's Private Key. The JWT is stored in your browser cookies. On subsequent requests, the server mathematically verifies the signature on the JWT, proving you are authenticated without needing to query a database.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Zero-knowledge proofs/index.mdx': `---
title: Zero-Knowledge Proofs (ZKP)
description: The advanced mathematical protocol allowing one party to prove they know a secret without actually revealing the secret itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Zero-Knowledge Proofs (ZKP)">

A **Zero-Knowledge Proof (ZKP)** is a highly advanced mathematical protocol that sounds like magic: It allows a "Prover" to mathematically convince a "Verifier" that they possess a specific secret piece of information, **without ever revealing the information itself.**

## 1. The Core Mathematical Properties
For a protocol to be considered a mathematically valid Zero-Knowledge Proof, it must satisfy three absolute conditions:

1. **Completeness**: If the Prover genuinely knows the secret, they can mathematically convince the Verifier with 100% probability.
2. **Soundness**: If the Prover is lying (they do not know the secret), the mathematical probability of them tricking the Verifier approaches zero exponentially.
3. **Zero-Knowledge**: After the protocol finishes, the Verifier mathematically learns absolutely nothing about the secret itself (other than the fact that the Prover knows it).

## 2. Interactive vs Non-Interactive
Historically, ZKPs were **Interactive**. The Verifier would issue a mathematical "challenge", the Prover would calculate a response, and this ping-pong would repeat 50 times until the mathematical probability of the Prover guessing correctly was one-in-a-trillion.

Modern cryptography utilizes **Non-Interactive Zero-Knowledge Proofs (NIZK)**, specifically **zk-SNARKs** (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge). 
Through incredibly complex elliptic curve pairings, the Prover can generate a single, tiny mathematical certificate (the proof). The Verifier can independently verify this certificate in milliseconds, entirely offline, without any ping-pong interaction.

## 3. Real-World Applications

- **Privacy-Preserving Blockchain (Zcash)**: In standard Bitcoin, the entire world can view the exact balance of your wallet. Using zk-SNARKs, a crypto network can mathematically verify that a transaction is perfectly valid (the sender has enough money) without revealing the sender's identity, the receiver's identity, or the amount sent.
- **Identity Verification**: Proving to a bartender that you are over 21 years old, without revealing your exact birthdate, your name, or your address.
- **Layer 2 Rollups (zk-Rollups)**: Scaling Ethereum by batching 10,000 transactions off-chain, and posting a single tiny mathematical zk-Proof to the main chain, guaranteeing that all 10,000 transactions were executed validly.

<Callout icon="warning" title="The Trusted Setup Problem">
Many zk-SNARK systems require a "Trusted Setup", a mathematical initialization event where random numbers (Toxic Waste) are generated to create the proving keys. If the scientists who generated these numbers collude and save them, they can mathematically forge fake proofs forever (e.g., printing infinite fake crypto). The industry is heavily researching zk-STARKs to eliminate this mathematical vulnerability.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/SHA family/index.mdx': `---
title: The SHA Family (Secure Hash Algorithms)
description: The evolution of NIST-standardized hash functions from the broken SHA-1 to the modern mathematical standards of SHA-2 and SHA-3.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="The SHA Family">

The **Secure Hash Algorithm (SHA)** family is a set of cryptographic hash functions published by the United States National Institute of Standards and Technology (NIST). They form the mathematical backbone of global digital signatures, certificates, and blockchain networks.

## 1. SHA-1 (The Fallen Standard)
Designed by the NSA in 1995, SHA-1 produces a 160-bit hash. For a decade, it secured the entire internet (SSL certificates).

However, by the mid-2000s, cryptographers discovered mathematical weaknesses. In 2017, Google executed a devastating **SHAttered attack**, generating two completely different PDF files that mathematically resulted in the exact same SHA-1 hash. 
**SHA-1 is mathematically compromised and strictly forbidden in modern systems.**

## 2. SHA-2 (The Current Global Standard)
Published in 2001, the SHA-2 family consists of multiple mathematical variants, most notably **SHA-256** and **SHA-512** (named after the bit-length of their output).

Despite being built on a similar mathematical structure to SHA-1 (the Merkle-Damgård construction), the increased bit-length and modified mathematical constants make SHA-2 completely secure against all known computational attacks.
- **SHA-256** mathematically secures the Bitcoin network and is the standard for most JWTs and digital signatures today.

## 3. SHA-3 (The Backup Plan)
In 2007, NIST was terrified that because SHA-2 shared structural similarities with SHA-1, it might also fall to mathematical cryptanalysis. NIST hosted a global competition to design a replacement. The winner (Keccak) was standardized as **SHA-3**.

SHA-3 uses a wildly different mathematical architecture called the **Sponge Construction**. It "absorbs" the input data into a massive internal state matrix, scrambles it using complex permutations, and then "squeezes" out the hash.

<ComparisonTable 
  headers={['Algorithm', 'Architecture', 'Current Status']} 
  rows={[
    ['SHA-1', 'Merkle-Damgård', 'Broken (Collisions found). Do not use.'],
    ['SHA-2 (SHA-256)', 'Merkle-Damgård', 'Secure. The absolute industry standard.'],
    ['SHA-3', 'Sponge Construction', 'Secure. Kept as a mathematical failsafe in case SHA-2 is ever broken.']
  ]} 
/>

<Callout icon="tip" title="Don't Hash Passwords with SHA">
While SHA-256 is incredible for data integrity, it is a catastrophic choice for hashing passwords. SHA-256 is mathematically designed to be as fast as possible on hardware (GPUs can calculate billions of hashes per second). This allows hackers to trivially brute-force user passwords. Passwords must be hashed using slow, memory-hard mathematical algorithms like **Argon2** or **Bcrypt**.
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
