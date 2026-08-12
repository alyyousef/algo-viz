import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Symmetric encryption/index.mdx': `---
title: Symmetric Encryption
description: A cryptographic algorithm that uses the exact same key to both encrypt and decrypt data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Symmetric Encryption">

Symmetric encryption (or secret-key cryptography) is the oldest and most straightforward encryption method. The core defining feature is that the **same key** is used for both encrypting the plaintext and decrypting the ciphertext.

<Callout icon="info" title="The Padlock Analogy">
  Think of symmetric encryption like a padlock on a diary. If Alice locks the diary with her physical key, Bob cannot read it unless Alice travels to Bob and physically hands him an identical copy of that exact same key.
</Callout>

## How it Works

The algorithm takes a plaintext message (e.g., "HELLO") and applies a complex mathematical transformation using the secret key (e.g., "MYSECRETKEY") to produce scrambled ciphertext (e.g., "X9QZP").

To reverse the process, the exact same mathematical transformation is run in reverse, requiring the exact same key. If a hacker intercepts the ciphertext but doesn't have the key, the math is designed to be virtually impossible to reverse.

## Block vs. Stream Ciphers

Symmetric algorithms are generally categorized into two types:
1. **Block Ciphers**: The algorithm splits the data into fixed-size chunks (e.g., 128-bit blocks) and encrypts each block independently. *Example: AES.*
2. **Stream Ciphers**: The algorithm encrypts data one bit or byte at a time, generating a continuous "keystream" that is XORed against the plaintext. *Example: ChaCha20.*

## Strengths and Weaknesses

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['Extremely Fast: Mathematically simple, easily accelerated by hardware CPUs.', 'The Key Distribution Problem: How do you safely get the secret key to the other person without someone stealing it in transit?'],
    ['High Security: Modern algorithms like AES-256 are currently unbroken.', 'Scalability: If 100 people need to talk to each other securely, you need 4,950 unique keys.'],
    ['Great for Data at Rest: Perfect for encrypting your local hard drive where you are both the sender and receiver.', 'No Non-Repudiation: Since both parties have the same key, you cannot prove *which* party encrypted a specific message.']
  ]}
/>

Because of the Key Distribution Problem, symmetric encryption is rarely used alone on the Internet. It is usually paired with Asymmetric Encryption (which solves key exchange) to form hybrid systems like TLS.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Asymmetric encryption/index.mdx': `---
title: Asymmetric Encryption
description: A cryptographic system that uses a mathematically linked pair of keys—one public and one private.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Asymmetric Encryption">

Asymmetric encryption (also known as Public-Key Cryptography) was a revolutionary breakthrough invented in the 1970s. It solves the massive flaw of symmetric encryption (the Key Distribution Problem) by using **two different keys** instead of one.

<Callout icon="success" title="The Key Pair">
  1. **Public Key**: Shared openly with the entire world. It is used to *encrypt* data.
  2. **Private Key**: Kept absolutely secret. It is the only thing in the universe that can *decrypt* data encrypted by the corresponding Public Key.
</Callout>

## How it Solves Key Exchange

Imagine Alice wants to receive a secure message from Bob across the public internet.

1. Alice generates a Public/Private key pair.
2. Alice sends her Public Key to Bob (in plain text, she doesn't care who sees it).
3. Bob writes the message "SECRET" and encrypts it using Alice's Public Key.
4. Bob sends the ciphertext to Alice. Even if a hacker intercepts it, the hacker cannot decrypt it. *Even Bob cannot decrypt his own message once he encrypts it.*
5. Alice receives the ciphertext and decrypts it using her closely guarded Private Key.

<ArchitectureDiagram chart={\`
graph LR
  Bob[Bob's Plaintext] --> Encrypt[Encrypt with Alice's Public Key]
  Encrypt --> Ciphertext[Encrypted Ciphertext]
  Ciphertext --> Decrypt[Decrypt with Alice's Private Key]
  Decrypt --> Alice[Alice reads Plaintext]
\`} />

## The Mathematical Foundation

How is it possible to have a key that locks but cannot unlock? 

Asymmetric encryption relies on **one-way mathematical functions** (trapdoor functions). These are math problems that are incredibly easy for a computer to calculate in one direction, but practically impossible to reverse unless you possess a specific piece of secret information (the private key).

Common mathematical foundations:
- **Integer Factorization**: Multiplying two massive prime numbers is easy. Taking the result and figuring out what two primes created it is incredibly hard. *(Used by RSA).*
- **Discrete Logarithms & Elliptic Curves**: Even more complex math allowing for much smaller key sizes. *(Used by ECC).*

## The Downside: Speed

Asymmetric encryption is incredibly slow—often 100x to 1,000x slower than symmetric encryption. It requires massive CPU resources to multiply 2048-bit prime numbers. 

Therefore, in modern systems (like HTTPS), asymmetric encryption is only used for the first few milliseconds of a connection to safely exchange a *symmetric* session key. Once the symmetric key is securely shared, the slow asymmetric math is abandoned for the rest of the session.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/AES/index.mdx': `---
title: Advanced Encryption Standard (AES)
description: The global standard for symmetric block cipher encryption.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Advanced Encryption Standard (AES)">

The Advanced Encryption Standard (AES) is a symmetric block cipher chosen by the U.S. government in 2001 to protect classified information. It is implemented in software and hardware throughout the world to encrypt sensitive data.

<Callout icon="info" title="The Origins (Rijndael)">
  In 1997, the NIST announced a global competition to find a replacement for the aging, easily broken DES (Data Encryption Standard). Two Belgian cryptographers, Joan Daemen and Vincent Rijmen, submitted a cipher called "Rijndael" (a portmanteau of their names). It won the competition and was renamed AES.
</Callout>

## How AES Works (Block Cipher)

AES is a **symmetric** cipher, meaning it uses the exact same key to encrypt and decrypt. 
It is a **block** cipher, meaning it doesn't encrypt data one letter at a time; it chops the data into fixed 128-bit blocks (16 bytes) and encrypts each block independently.

AES supports three specific key lengths, which dictate the number of internal "rounds" (mathematical transformations) applied to the data:
- **AES-128**: 128-bit key, 10 rounds.
- **AES-192**: 192-bit key, 12 rounds.
- **AES-256**: 256-bit key, 14 rounds. (Often mandated for Top Secret government data).

### The Substitution-Permutation Network

During each "round," AES applies four distinct mathematical operations to scramble the 128-bit block:
1. **SubBytes**: Non-linear substitution (swapping bytes using a lookup table).
2. **ShiftRows**: Cyclically shifting the rows of the data matrix.
3. **MixColumns**: Combining the bytes in each column mathematically.
4. **AddRoundKey**: XORing the data with a piece of the secret key.

By repeating this chaos 10 to 14 times, the resulting ciphertext appears completely random and mathematically unrelated to the plaintext.

## AES Modes of Operation

Because AES only encrypts exactly 128 bits, we need a "Mode of Operation" to tell it how to handle a massive 1GB video file.

<ComparisonTable 
  headers={['Mode', 'Description', 'Verdict']}
  rows={[
    ['ECB (Electronic Codebook)', 'Encrypts every block identically. If two blocks have the same plaintext, they produce the same ciphertext. Creates visual patterns.', 'Insecure. Do not use.'],
    ['CBC (Cipher Block Chaining)', 'XORs the previous ciphertext block into the next plaintext block before encrypting. Requires an Initialization Vector (IV).', 'Secure, but cannot be parallelized (slow).'],
    ['GCM (Galois/Counter Mode)', 'Turns the block cipher into a stream cipher. Also provides built-in authentication (AEAD) to prove data wasn\\'t tampered with.', 'The modern gold standard. Used in TLS/HTTPS.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/RSA/index.mdx': `---
title: RSA (Rivest-Shamir-Adleman)
description: One of the first and most widely used public-key cryptosystems for secure data transmission.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="RSA (Rivest-Shamir-Adleman)">

RSA is an asymmetric cryptographic algorithm invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman. It was the first practical implementation of public-key cryptography and remains a cornerstone of internet security (like TLS and SSH) today.

<Callout icon="info" title="The Math of Primes">
  The entire security of RSA relies on the practical difficulty of factoring the product of two extremely large prime numbers. This is known as the "factoring problem."
</Callout>

## How RSA Works

RSA involves four steps: key generation, key distribution, encryption, and decryption.

### 1. Key Generation
1. Choose two distinct, massive prime numbers ($p$ and $q$). In modern RSA, these are often 1024 bits long each.
2. Multiply them together to find $n = p \\times q$. ($n$ is usually 2048 or 4096 bits long).
3. The value $n$ is published openly as part of the **Public Key**. 
4. Through complex modular arithmetic (involving Euler's totient function), a Public Exponent ($e$) and a Private Exponent ($d$) are calculated.
5. **The Public Key is ($n$, $e$). The Private Key is ($d$).** The primes $p$ and $q$ are permanently destroyed.

### 2. Encryption and Decryption
If Bob wants to send a message ($M$) to Alice:
- **Encryption**: Bob turns his text into a number ($M$), and calculates the ciphertext ($C$) using Alice's public key: $C = M^e \\pmod{n}$
- **Decryption**: Alice receives $C$ and applies her private key: $M = C^d \\pmod{n}$

*Because $d$ is mathematically derived from the destroyed primes $p$ and $q$, a hacker cannot calculate $d$ just by looking at the public $n$ unless they can factor $n$ back into $p$ and $q$.*

## Key Sizes and Performance

Factoring algorithms are getting faster, and computers are getting stronger. To maintain security, RSA keys have grown significantly over the decades.
- **512-bit**: Broken in 1999.
- **1024-bit**: Considered unsafe today by NIST.
- **2048-bit**: The current absolute minimum standard for the web.
- **4096-bit**: Highly secure, but computationally expensive.

As the key size doubles, decryption takes roughly 8 times longer. This performance bottleneck is why much of the modern web is migrating away from RSA toward Elliptic Curve Cryptography (ECC), which offers the same security with much smaller keys and faster math.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Hashing/index.mdx': `---
title: Hashing
description: A one-way mathematical function that maps data of arbitrary size to a fixed-size bit string.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Hashing">

A cryptographic hash function is a mathematical algorithm that takes an input (or 'message') of any size and produces a fixed-size string of bytes, known as the hash value, message digest, or simply the hash.

<Callout icon="warning" title="Hashing vs. Encryption">
  Encryption is a two-way function designed to be decrypted (reversed) using a key. **Hashing is a one-way function.** It is mathematically impossible to take a hash and "decrypt" it back into the original data. There is no key.
</Callout>

## The 4 Golden Rules of Hashing

For a hash function to be considered cryptographically secure, it must adhere to four strict properties:

<ComparisonTable 
  headers={['Property', 'Explanation']}
  rows={[
    ['Deterministic', 'The exact same input must ALWAYS produce the exact same output hash. (e.g., hash("apple") always yields "abc123X")'],
    ['Quick Computation', 'The algorithm must be capable of returning the hash of a massive file quickly.'],
    ['Pre-image Resistance (One-Way)', 'It should be computationally impossible to reverse engineer the original input if you only have the hash output.'],
    ['Collision Resistance', 'It should be computationally impossible to find two totally different inputs that accidentally produce the exact same output hash.']
  ]}
/>

## The Avalanche Effect

A crucial feature of a good hash function is the "Avalanche Effect." A microscopic change to the input should result in a completely unrecognizable and vastly different output.

Example (using SHA-256):
- Input: \`The quick brown fox jumps over the lazy dog\`
- Hash: \`d7a8fbb307d2809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592\`

- Input: \`The quick brown fox jumps over the lazy dog.\` (Added a period)
- Hash: \`ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c\`

Notice that adding a single period changed almost every single character in the resulting hash.

## Common Use Cases

1. **File Integrity**: When you download a Linux ISO, the website provides the SHA-256 hash. After downloading, you hash the file on your PC. If the hashes match exactly, you know the file wasn't corrupted or injected with malware during transit.
2. **Digital Signatures**: You don't encrypt an entire PDF to sign it; you hash the PDF and encrypt the tiny hash.
3. **Password Storage**: Databases should never store plaintext passwords. They store the hash of the password.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/SHA family/index.mdx': `---
title: SHA Family (Secure Hash Algorithm)
description: The prevailing suite of cryptographic hash functions published by the NIST.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="SHA Family (Secure Hash Algorithm)">

The Secure Hash Algorithm (SHA) is a family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST) as a U.S. Federal Information Processing Standard (FIPS). Over the decades, as computational power increased and cryptographic vulnerabilities were discovered, the family evolved.

## Evolution of the Family

### SHA-0 (1993)
The original version. It was withdrawn shortly after publication due to an undisclosed "significant flaw" and replaced by SHA-1.

### SHA-1 (1995)
Produced a 160-bit hash value. It was the absolute standard of the internet for over a decade, heavily used in SSL/TLS certificates and Git version control.
- **Status**: **BROKEN**. In 2017, Google researchers executed the first successful "collision attack" against SHA-1 (producing two different PDF files that resulted in the exact same SHA-1 hash). It is officially deprecated and insecure for cryptography.

### SHA-2 (2001)
A family of two similar hash functions with different block sizes: **SHA-256** and **SHA-512**. 
- **Status**: **SECURE**. This is the current global standard. SHA-256 is ubiquitous across the modern internet. It is used to secure HTTPS certificates, verify software downloads, and is the core hashing algorithm that runs the Bitcoin blockchain.

### SHA-3 (2015)
Produced by a public competition (won by an algorithm named Keccak). 
- **Status**: **SECURE**. Unlike SHA-1 and SHA-2, which use a Merkle-Damgård construction, SHA-3 uses a completely different internal structure called a "sponge construction." It was standardized not because SHA-2 was broken, but as a backup plan in case a catastrophic math flaw is ever discovered in the SHA-2 architecture.

## Visualizing the Output

Because hashes are raw binary data, they are almost always represented to humans as hexadecimal (hex) strings (using numbers 0-9 and letters a-f).

<ComparisonTable 
  headers={['Algorithm', 'Bit Length', 'Hex Character Length', 'Status']}
  rows={[
    ['MD5 (Not SHA)', '128 bits', '32 characters', 'Critically Broken'],
    ['SHA-1', '160 bits', '40 characters', 'Broken'],
    ['SHA-256', '256 bits', '64 characters', 'Highly Secure (Current Standard)'],
    ['SHA-512', '512 bits', '128 characters', 'Highly Secure (Used for extreme security)']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Password hashing/index.mdx': `---
title: Password Hashing
description: Specialized cryptographic hashing designed specifically to protect passwords stored in databases.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Password Hashing">

When a user creates an account, a secure application never stores their plaintext password (e.g., \`password123\`) in the database. If the database is breached, the hackers would immediately have everyone's passwords.

Instead, the application hashes the password and stores only the hash. When the user attempts to log in, the application hashes their input and checks if it matches the stored hash.

<Callout icon="error" title="Why standard hashes fail for passwords">
  Algorithms like **SHA-256** are explicitly designed to be **incredibly fast**. A modern GPU cluster can calculate *billions* of SHA-256 hashes per second. If a hacker steals a database of SHA-256 password hashes, they can simply brute-force them (guess every possible password, hash it, and see if it matches) in a matter of minutes.
</Callout>

## The Solution: Key Derivation Functions (KDFs)

To protect passwords, we do not use standard cryptographic hashes. We use specialized algorithms called **Key Derivation Functions (KDFs)** or Password Hashing Algorithms. 

These algorithms are intentionally designed to be **computationally expensive and slow**.

If an algorithm is designed to take exactly 0.5 seconds to compute:
- **For the user**: Logging in takes 0.5 seconds. They won't notice.
- **For the hacker**: Trying to guess 100 million dictionary words will take 1.5 years instead of 3 seconds. The brute-force attack is neutralized.

## Features of a Password Hashing Algorithm

Modern password hashing algorithms must include two features:

1. **Salting**: Automatically injecting a massive random string into the password before hashing it. This entirely prevents "Rainbow Table" attacks (pre-computed databases of billions of hashes).
2. **Work Factor (Cost)**: A configurable setting that determines how many thousands of iterations of math the CPU must do to generate the hash. As computers get faster in the future (Moore's Law), administrators simply increase the Work Factor to ensure the hash always takes 0.5 seconds to compute.

## Modern Password Algorithms

<ComparisonTable 
  headers={['Algorithm', 'Description']}
  rows={[
    ['PBKDF2', 'The oldest standard. Simply runs a fast algorithm (like SHA-256) thousands of times in a loop. Secure, but vulnerable to GPU/ASIC hardware acceleration.'],
    ['bcrypt', 'The industry workhorse since 1999. Incredibly resilient. It demands rapid random access to memory, making it highly resistant to GPU acceleration.'],
    ['scrypt', 'Designed to be explicitly "memory-hard". It requires massive amounts of RAM to compute, meaning hackers cannot run it efficiently on GPUs.'],
    ['Argon2', 'The winner of the 2015 Password Hashing Competition. The absolute cutting-edge standard. It allows you to configure CPU time, Memory cost, and Parallelism independently.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/bcrypt/index.mdx': `---
title: bcrypt
description: A robust, adaptive password-hashing function designed to resist hardware brute-force attacks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="bcrypt">

bcrypt is a password-hashing function designed in 1999 based on the Blowfish cipher. Despite its age, it remains one of the most widely recommended and utilized algorithms in the software industry for securely storing user passwords.

<Callout icon="success" title="The GPU Defense">
  Standard hashing algorithms (like SHA-256) rely purely on CPU cycles. Hackers realized they could use Graphics Processing Units (GPUs), which contain thousands of cores, to guess passwords millions of times faster. bcrypt was explicitly designed to be **memory-bound**. It constantly requires random reads and writes to RAM, neutralizing the advantage of GPUs and custom ASICs.
</Callout>

## Anatomy of a bcrypt Hash

A bcrypt output string isn't just a raw hash; it is a self-contained data structure containing all the metadata required to verify the password later. It always starts with \`$2a$\`, \`$2b$\`, or \`$2y$\`.

Example bcrypt string:
\`$2b$12$w3d4C.D/z4E6J8K0L2M4N.abc123DEF456ghi789JKL012mno345p\`

Let's break this 60-character string down into its 4 components:

1. **Algorithm Identifier (\`$2b$\`)**: Tells the system this is a bcrypt hash (specifically revision 'b').
2. **Work Factor / Cost (\`12\`)**: The computational cost parameter. The math is run $2^{12}$ (4,096) times. Every time you increment this number by 1, the hashing time doubles.
3. **The Salt (\`w3d4C.D/z4E6J8K0L2M4N.\`)**: The next 22 characters are the 128-bit cryptographically secure random salt that bcrypt automatically generated.
4. **The Hash (\`abc123DEF456ghi789JKL012mno345p\`)**: The final 31 characters are the actual computed hash output.

## Adaptive Security (Moore's Law)

The genius of bcrypt is the **Cost parameter**. 

In 2005, a cost of \`08\` might have taken a server 200 milliseconds to compute. By 2015, faster CPUs could compute a cost of \`08\` in 10 milliseconds, making brute-forcing easier. 

Because bcrypt is adaptive, administrators can simply increase the cost to \`12\` in their code. Now, new passwords will take 200 milliseconds on the new hardware. The algorithm scales perfectly with Moore's Law without requiring a fundamental rewrite of the cryptography.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Salting/index.mdx': `---
title: Salting
description: The practice of adding random data to an input before hashing it to defend against pre-computed attacks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Salting">

In cryptography, a **salt** is random data that is used as an additional input to a one-way function that hashes data, a password, or a passphrase. Salting is an absolute, non-negotiable requirement for securely storing passwords in modern databases.

<Callout icon="error" title="The Problem: Rainbow Tables">
  Because hash functions are deterministic, the password "password123" will ALWAYS generate the exact same hash (e.g., \`5e884898...\`). Hackers know this. Instead of cracking hashes on the fly, hackers generate **Rainbow Tables**: massive terabyte-sized databases where they pre-computed the hashes for every single dictionary word and common password combination. When they steal a database, they just look up the hash in their table and instantly get the password.
</Callout>

## How Salting Fixes the Problem

A salt is a cryptographically secure random string (e.g., \`8f4b2R9x\`) generated uniquely for *every single user* at the exact moment they create their account.

Instead of hashing just the password:
\`Hash( "password123" ) = 5e884898...\`

The system appends the salt to the password and hashes the combined string:
\`Hash( "password123" + "8f4b2R9x" ) = 9a2F4b7C...\`

### Defeating Rainbow Tables
Even if a hacker's Rainbow Table contains the hash for "password123", it does not contain the hash for "password1238f4b2R9x", because that specific random salt has never existed in the universe before. The pre-computed table is entirely useless. The hacker is forced to start from scratch and brute-force the hash one guess at a time.

### Defeating Identical Hashes
If two users both choose the terrible password "password123", without salting, the database will show two identical hashes. An attacker immediately knows they have the same password. With salting, because the salt is uniquely generated per user, identical passwords will result in completely different hashes in the database.

## Do Salts Need to be Secret?

**No.** Salts are not encryption keys; they are not secrets. The salt's only job is to ensure uniqueness, not secrecy. 

The salt is stored in plain text right next to the hash in the database. When the user logs in, the system retrieves their specific salt from the database, attaches it to the password attempt, and runs the hashing algorithm to see if it matches. (Modern algorithms like *bcrypt* automate this entirely by storing the salt directly inside the final hash string).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Digital signatures/index.mdx': `---
title: Digital Signatures
description: A mathematical scheme for verifying the authenticity and integrity of digital messages or documents.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Digital Signatures">

A digital signature is a mathematical technique used to validate the authenticity and integrity of a message, software, or digital document. It is the digital equivalent of a handwritten signature or stamped seal, but it offers far more inherent security.

<Callout icon="info" title="The Triad of Trust">
  Digital signatures provide three vital cryptographic guarantees:
  1. **Authentication**: Proves the sender is who they claim to be.
  2. **Integrity**: Proves the document was not altered in transit.
  3. **Non-repudiation**: The sender cannot later deny that they signed the document.
</Callout>

## How It Works (The Math)

Digital signatures rely on **Asymmetric Encryption** (Public/Private key pairs) and **Hashing**. 

However, they use asymmetric keys in reverse. Normally, you encrypt with a Public Key to ensure only the owner of the Private Key can read it (Confidentiality). 
With signatures, you **encrypt with the Private Key** so that anyone with the Public Key can verify it (Authenticity).

### Signing a Document (The Sender)
Alice wants to send a signed contract to Bob.
1. Alice uses a hashing algorithm (like SHA-256) on the contract to generate a tiny fixed-length hash.
2. Alice **encrypts that hash using her Private Key**. This encrypted hash is the "Digital Signature."
3. Alice sends the plain text contract AND the Digital Signature to Bob.

### Verifying the Document (The Receiver)
Bob receives the contract and the signature.
1. Bob uses Alice's openly available **Public Key to decrypt the signature**, revealing the hash Alice generated. (If it decrypts successfully, it *proves* Alice's Private Key signed it).
2. Bob runs the exact same hashing algorithm on the plain text contract he received, generating his own hash.
3. Bob compares his hash to Alice's decrypted hash. If they match exactly, it *proves* the contract was not altered by a single comma during transit.

<ArchitectureDiagram chart={\`
graph TD
  Doc[Document] --> HashAlg(Hashing Algorithm)
  HashAlg --> DocHash[Document Hash]
  DocHash --> Encrypt{Encrypt with Private Key}
  Encrypt --> Sig[Digital Signature]
\`} />

## Why Hash First?

Why not just encrypt the entire PDF with the private key? 
Asymmetric encryption (like RSA) is mathematically intense and incredibly slow. Encrypting a 50MB PDF document with a 2048-bit key would require excessive CPU time and RAM. 
Hashing the 50MB PDF down to a 256-bit string takes a fraction of a second. The CPU then only has to asymmetrically encrypt those 256 bits, which is instantaneous.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/PKI/index.mdx': `---
title: Public Key Infrastructure (PKI)
description: The framework of roles, policies, hardware, and software needed to manage digital certificates and public-key encryption.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Public Key Infrastructure (PKI)">

Public Key Infrastructure (PKI) is the complex ecosystem of hardware, software, policies, and procedures needed to create, manage, distribute, and revoke digital certificates. It is the foundational trust system that makes HTTPS and secure internet commerce possible.

<Callout icon="warning" title="The Problem PKI Solves">
  Asymmetric cryptography is great: Alice sends her Public Key to Bob so he can encrypt messages for her. But how does Bob know the Public Key actually belongs to Alice? A hacker (Mallory) could intercept the connection, hand Bob her own Public Key, and say, "Hi, I'm Alice, use this key." Bob would unknowingly encrypt data for the hacker. PKI solves this **authentication problem**.
</Callout>

## The Certificate Authority (CA)

At the heart of PKI is the **Certificate Authority (CA)**. A CA is a highly trusted, third-party organization (like DigiCert, Let's Encrypt, or GlobalSign) whose sole job is to verify identities and vouch for them.

Instead of Alice just sending a raw Public Key, she asks a CA to bind her identity to her Public Key.

1. Alice generates a key pair and sends her Public Key and her company ID to the CA.
2. The CA performs strict background checks (verifying she owns the domain name, checking corporate registry documents, etc.).
3. Once verified, the CA takes Alice's Public Key, wraps it in a document with her identity, and **Digitally Signs** the document using the CA's own highly-guarded Private Key.
4. This signed document is a **Digital Certificate**.

## The Chain of Trust

When Bob visits Alice's website, Alice hands Bob her Certificate. How does Bob know the CA's signature is real?

Every operating system (Windows, macOS) and web browser (Chrome, Firefox) comes pre-installed with a "Trust Store." This is a secure list containing the Public Keys of the top ~100 Certificate Authorities in the world (known as **Root CAs**). 

Bob's browser looks at Alice's certificate, sees it was signed by "DigiCert", pulls DigiCert's Public Key from its pre-installed Trust Store, and mathematically verifies the digital signature. Because the OS inherently trusts the Root CA, and the Root CA vouched for Alice, Bob's browser now mathematically trusts Alice.

## Revocation

If Alice's server is hacked and her Private Key is stolen, her certificate is compromised. PKI handles this via revocation. Alice notifies the CA, and the CA adds the certificate's serial number to a **Certificate Revocation List (CRL)** or updates their **OCSP** (Online Certificate Status Protocol) responder. When Bob's browser checks the certificate, it queries the CA, sees it is revoked, and immediately drops the connection.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Certificates/index.mdx': `---
title: Digital Certificates (X.509)
description: An electronic document used to prove the validity of a public key.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Digital Certificates (X.509)">

A digital certificate (or public key certificate) is an electronic document used to prove the ownership of a public key. The certificate includes information about the key, information about the identity of its owner, and the digital signature of an entity that has verified the certificate's contents (a Certificate Authority).

<Callout icon="info" title="The Digital Passport">
  Think of a digital certificate like a passport. It contains your face (Public Key), your name and nationality (Identity Information), and it is stamped and sealed by a trusted government entity (the Certificate Authority).
</Callout>

## The X.509 Standard

Almost all digital certificates on the internet follow a strict formatting standard known as **X.509**. When you click the padlock icon in your browser to view a website's certificate, you are looking at an X.509 data structure.

A standard X.509 certificate contains the following critical fields:
- **Version**: Usually v3.
- **Serial Number**: A unique identifier assigned by the CA to track or revoke the certificate.
- **Signature Algorithm**: The cryptographic algorithm used by the CA to sign the certificate (e.g., \`sha256RSA\`).
- **Issuer**: The distinguished name of the CA that issued and signed the certificate (e.g., \`Let's Encrypt Authority X3\`).
- **Validity Period**: Two dates defining when the certificate becomes active, and when it definitively expires (e.g., \`Not Before\`, \`Not After\`).
- **Subject**: The identity of the entity the certificate belongs to (e.g., \`Common Name (CN): www.google.com\`).
- **Subject Public Key Info**: The actual Public Key being vouched for, and the algorithm it uses (e.g., \`RSA 2048-bit\`).

## Types of Validation

When a company applies for a TLS/SSL certificate, the CA can perform different levels of background checks before signing it:

<ComparisonTable 
  headers={['Type', 'Acronym', 'Verification Level']}
  rows={[
    ['Domain Validation', 'DV', 'The CA only verifies that the applicant possesses technical control over the domain name (e.g., by asking them to place a specific file on the web server). Cheap, fast, fully automated.'],
    ['Organization Validation', 'OV', 'The CA verifies domain ownership AND verifies the actual legal existence of the organization by checking government business registries. Provides moderate trust.'],
    ['Extended Validation', 'EV', 'Requires a rigorous identity vetting process, including physical address checks and human phone calls. Used by banks and financial institutions for maximum trust.']
  ]}
/>

## Certificate Extensions (SAN)

Historically, a certificate was valid for a single domain name defined in the Subject Common Name (CN). Modern v3 certificates utilize the **Subject Alternative Name (SAN)** extension, which allows a single certificate to secure multiple domain names (e.g., \`example.com\`, \`www.example.com\`, and \`api.example.com\`) simultaneously.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/Diffie-Hellman/index.mdx': `---
title: Diffie-Hellman Key Exchange
description: A method of securely exchanging cryptographic keys over a public channel.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Diffie-Hellman Key Exchange">

The Diffie-Hellman (DH) key exchange was the first published public-key algorithm (invented by Whitfield Diffie and Martin Hellman in 1976). It solved a problem that had plagued cryptography for millennia: **How do two people, who have never met, agree on a secret key over a public network where everyone is listening?**

<Callout icon="success" title="The Paint Mixing Analogy">
  Imagine Alice and Bob want to agree on a secret color.
  1. They agree publicly on a common paint color (Yellow).
  2. They each choose a secret color (Alice chooses Red, Bob chooses Blue). They never reveal this to anyone.
  3. They mix their secret color with the public color. (Alice gets Orange. Bob gets Green).
  4. They exchange their mixed colors over the public internet. (A hacker intercepts Orange and Green, but un-mixing paint is practically impossible).
  5. Alice adds her secret Red to Bob's Green. Bob adds his secret Blue to Alice's Orange.
  6. **They both arrive at the exact same final color: Brown.** They now have a shared secret key.
</Callout>

## The Mathematics (Discrete Logarithms)

Instead of mixing paint, Diffie-Hellman mixes massive prime numbers using modular arithmetic. 
The system relies on the **Discrete Logarithm Problem**: it is computationally simple to calculate $g^x \\pmod{p}$, but if you are given the result, it is computationally impossible to figure out what $x$ was.

### The Protocol Steps:
1. **Public Agreement**: Alice and Bob publicly agree on a prime number ($p$) and a generator base ($g$). The hacker knows $p$ and $g$.
2. **Private Values**: Alice chooses a secret integer ($a$). Bob chooses a secret integer ($b$).
3. **Public Mixing**: 
   - Alice calculates $A = g^a \\pmod{p}$ and sends $A$ to Bob.
   - Bob calculates $B = g^b \\pmod{p}$ and sends $B$ to Alice.
4. **Shared Secret**:
   - Alice takes Bob's $B$ and calculates: $Secret = B^a \\pmod{p}$
   - Bob takes Alice's $A$ and calculates: $Secret = A^b \\pmod{p}$

Because of the associative properties of exponents, $(g^a)^b$ is exactly the same as $(g^b)^a$. They both independently calculate the exact same secret number, without ever transmitting it across the network.

## The Flaw: Man-in-the-Middle

While Diffie-Hellman brilliantly solves key exchange, it provides **zero authentication**. 

If a hacker intercepts the connection, they can intercept Alice's public mix, reply with their own mix pretending to be Bob, and establish a shared secret with Alice. They do the same with Bob, establishing a second shared secret. The hacker now secretly decrypts, reads, and re-encrypts all traffic passing between them.

To solve this, DH is almost always paired with Digital Signatures (like RSA or ECDSA) to authenticate the identities of the parties before exchanging the DH parameters.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/42. Cybersecurity Fundamentals/42.1 Cryptography/ECC/index.mdx': `---
title: Elliptic-Curve Cryptography (ECC)
description: An approach to public-key cryptography based on the algebraic structure of elliptic curves.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Elliptic-Curve Cryptography (ECC)">

Elliptic-Curve Cryptography (ECC) is a modern approach to public-key (asymmetric) cryptography. It provides the exact same level of security as older systems like RSA, but it uses vastly smaller key sizes, resulting in significantly faster computations and lower memory usage.

<Callout icon="success" title="The Replacement for RSA">
  For decades, the internet relied on RSA for secure connections. However, as computers got faster, RSA key sizes had to double and quadruple to remain secure (from 512-bit up to 4096-bit). This mathematical overhead became too slow for mobile devices and high-traffic web servers. ECC solved this performance crisis and is now the gold standard for modern TLS/HTTPS.
</Callout>

## The Mathematics of Curves

While RSA relies on the difficulty of factoring massive prime numbers, ECC relies on the **Elliptic Curve Discrete Logarithm Problem (ECDLP)**.

An elliptic curve is a specific type of mathematical graph, looking somewhat like a sideways bell curve. ECC relies on a strange geometric property of these curves:
1. You pick a starting point on the curve.
2. You draw a line through it, intersecting the curve at a new point, and reflect it across the axis.
3. You repeat this "dot and reflect" process $n$ times (where $n$ is your Private Key).
4. The final resting point on the graph is your Public Key.

**The Trapdoor:** If you know the starting point, the curve equation, and $n$, calculating the final point is incredibly fast. However, if a hacker only knows the starting point and the final point, it is computationally impossible to figure out how many times ($n$) you bounced around the curve to get there.

## Key Size Comparison

The math behind ECC is much harder to break than the factoring problem behind RSA. Therefore, an ECC key can be exponentially smaller while providing the exact same cryptographic strength.

<ComparisonTable 
  headers={['Security Level (Symmetric Equivalent)', 'RSA Key Size', 'ECC Key Size', 'Size Ratio']}
  rows={[
    ['80-bit (Legacy)', '1024-bit', '160-bit', '~ 1:6'],
    ['112-bit (Standard)', '2048-bit', '224-bit', '~ 1:9'],
    ['128-bit (Highly Secure)', '3072-bit', '256-bit', '~ 1:12'],
    ['256-bit (Top Secret / Military)', '15360-bit (Unusable)', '512-bit', '~ 1:30']
  ]}
/>

A 256-bit ECC key (often using the \`secp256r1\` curve) is the modern standard for securing websites, generating Bitcoin wallets, and signing secure messages on mobile devices.

</TechnologyTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
