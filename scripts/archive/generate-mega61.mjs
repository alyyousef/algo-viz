import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/42.1 Cryptography/TLS handshake/index.mdx': `---
title: The TLS Handshake
description: The complex cryptographic protocol that secures every HTTPS connection on the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The TLS Handshake">

Whenever you navigate to an \`https://\` website, your browser and the server must securely agree on an encryption key before sending any actual data. Because the internet is fundamentally public, they must agree on this secret key while sending messages across open, unencrypted channels that anyone can read.

This mathematical negotiation is called the **Transport Layer Security (TLS) Handshake**.

<Callout icon="success" title="The Hybrid Approach">
  The TLS handshake solves the core problem of cryptography by using **Asymmetric Encryption** (RSA or Elliptic Curves) to securely verify identity and exchange a shared secret, and then instantly switches to **Symmetric Encryption** (AES) using that shared secret for the rest of the connection because AES is thousands of times faster.
</Callout>

## TLS 1.3 Handshake Steps

TLS 1.3 revolutionized the protocol by cutting the handshake from two round-trips down to just one.

1. **Client Hello:** The browser sends supported cipher suites, a random byte string, and immediately mathematically guesses the key exchange protocol (e.g., sending an Elliptic Curve Diffie-Hellman public share).
2. **Server Hello & Certificate:** The server receives the client\\'s public share. It calculates the final shared secret, chooses the cipher suite, and sends its public share back, along with its digital certificate (to prove it is actually \`google.com\`).
3. **Secure Connection Established:** The browser verifies the certificate against its trusted Root CAs, calculates the same shared secret, and both parties begin encrypting HTTP traffic with AES.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/scrypt/index.mdx': `---
title: scrypt
description: A password-based key derivation function explicitly designed to be resistant to custom hardware attacks (ASICs).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="scrypt">

Older hashing algorithms like MD5 and SHA-256 are purely computational. An attacker can build custom silicon chips (ASICs) that calculate billions of SHA-256 hashes per second to brute-force a stolen password database.

**scrypt** (pronounced "ess-crypt") was designed specifically to defeat hardware brute-forcing by making the mathematical derivation process **memory-hard**.

<Callout icon="tip" title="The Memory Bottleneck">
  To calculate an scrypt hash, the algorithm forces you to generate a massive array of pseudo-random data in RAM, and then rapidly perform mathematical operations by jumping around that array unpredictably. While ASICs can do math quickly, adding gigabytes of ultra-fast RAM to a custom chip is astronomically expensive, rendering hardware brute-forcing economically impossible.
</Callout>

## Configuration Parameters

Developers configure scrypt using three primary parameters to perfectly balance user login speed against attacker difficulty:

<ComparisonTable 
  headers={['Parameter', 'Function']}
  rows={[
    ['N (Cost)', 'The CPU/Memory cost parameter. It must be a power of 2. Doubling N doubles both the required compute time and the required RAM.'],
    ['r (Block Size)', 'Specifies the block size of the underlying hash functions, affecting memory bandwidth utilization.'],
    ['p (Parallelization)', 'Determines how many independent mathematical threads can run concurrently. Useful for servers with multiple cores.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Key management/index.mdx': `---
title: Key Management
description: The administrative and mathematical lifecycle of cryptographic keys, the most critical vulnerability in any secure system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Key Management">

Bruce Schneier famously said, *"Cryptography is usually bypassed, not penetrated."* You can use military-grade AES-256 encryption, but if a developer accidentally commits the decryption key to a public GitHub repository, your entire system is compromised.

**Key Management** is the secure administration of cryptographic keys over their entire lifecycle: generation, exchange, storage, use, revocation, and destruction.

<Callout icon="warning" title="Hardware Security Modules (HSMs)">
  For absolute top-tier security (like banking systems or Root Certificate Authorities), keys are generated inside physical tamper-proof appliances called HSMs. The keys literally never leave the hardware. To sign a transaction, the server sends the data into the HSM, the HSM mathematically signs it internally, and outputs the signature. If someone tries to open the HSM with a screwdriver, it mathematically zeroes out its own RAM.
</Callout>

## Key Management Best Practices

<ComparisonTable 
  headers={['Practice', 'Description']}
  rows={[
    ['Key Rotation', 'Cryptographic keys should be replaced periodically. If a key is compromised silently, rotation ensures the attacker only has a limited window of access.'],
    ['Separation of Duties', 'The person who encrypts the data should not be the same person who holds the key to decrypt it. Modern systems use cloud KMS (Key Management Service) to handle this.'],
    ['Envelope Encryption', 'You generate a Data Encryption Key (DEK) to encrypt your 10GB database. You then use a master Key Encryption Key (KEK) stored in a secure vault to encrypt the DEK. You store the encrypted DEK next to the database.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Homomorphic encryption/index.mdx': `---
title: Homomorphic Encryption
description: The holy grail of cryptography that allows computers to perform mathematical operations on data without ever decrypting it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Homomorphic Encryption">

In traditional systems, data is encrypted at rest (on the hard drive) and in transit (over TLS). However, if a cloud provider needs to calculate the average salary of your employees, you must provide them the key to decrypt the data into RAM, exposing it to potential hackers or malicious cloud admins.

**Homomorphic Encryption** is a revolutionary mathematical scheme that allows a computer to perform calculations directly on ciphertext. 

<Callout icon="success" title="The Magic of FHE">
  If $E(x)$ is the encryption function, Fully Homomorphic Encryption (FHE) guarantees that $E(2) + E(3) = E(5)$. You send encrypted numbers to the cloud, the cloud does complex math on the gibberish, and sends gibberish back. Only you, holding the private key, can decrypt the result to see the final answer. The cloud never sees your data.
</Callout>

## The Performance Bottleneck

<ComparisonTable 
  headers={['Type', 'Capability', 'Performance']}
  rows={[
    ['Partially Homomorphic', 'Can perform ONLY addition OR ONLY multiplication, but not both.', 'Very fast. RSA is inherently partially homomorphic for multiplication.'],
    ['Somewhat Homomorphic', 'Can perform both addition and multiplication, but only for a limited number of mathematical operations before the "noise" destroys the data.', 'Moderate speed, heavily researched.'],
    ['Fully Homomorphic (FHE)', 'Can evaluate an infinite number of operations, allowing any arbitrary computer program to run on encrypted data.', 'Astronomically slow. Currently, FHE operations can be 10,000x to 1,000,000x slower than plaintext operations, limiting practical use.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/HMAC/index.mdx': `---
title: Hash-based Message Authentication Code (HMAC)
description: A specific type of cryptographic checksum that mathematically proves both the integrity and authenticity of a message.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hash-based Message Authentication Code (HMAC)">

A standard hash (like SHA-256) proves that a message hasn\\'t changed (Integrity). However, if an attacker intercepts your message "Pay Alice $10" and its hash, they can change the message to "Pay Bob $1000", generate a brand new SHA-256 hash, and forward it. The receiver won\\'t know it was tampered with.

**HMAC** solves this by mathematically combining a standard cryptographic hash function with a secret cryptographic key that only the sender and receiver know.

<Callout icon="info" title="The HMAC Guarantee">
  An HMAC proves **Integrity** (the message wasn\\'t altered) AND **Authenticity** (the message definitely came from someone holding the secret key). It is universally used in API authentication, including JSON Web Tokens (JWT) and AWS API requests.
</Callout>

## The Mathematical Construction

You cannot just append a secret key to a message and hash it (\`Hash(Key + Message)\`), because this is vulnerable to mathematical "length extension attacks."

HMAC uses a brilliant two-pass mathematical structure defined in RFC 2104:
$HMAC(K, m) = H((K \\oplus opad) \\parallel H((K \\oplus ipad) \\parallel m))$

1. The Key ($K$) is XORed with an inner pad ($ipad$).
2. The message ($m$) is appended, and the whole thing is hashed ($H$).
3. The original Key ($K$) is XORed with an outer pad ($opad$).
4. The result of step 2 is appended, and hashed again.

This mathematical sandwich completely immunizes HMAC against length extension vulnerabilities.

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.1 Cryptography/Argon2/index.mdx': `---
title: Argon2
description: The winner of the Password Hashing Competition, representing the absolute gold standard in secure password storage.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Argon2">

Designed by Alex Biryukov, Daniel Dinu, and Dmitry Khovratovich, **Argon2** won the grueling, multi-year Password Hashing Competition in 2015. It is officially recommended by OWASP and NIST as the most secure algorithm for hashing user passwords in a database.

Like scrypt, Argon2 is memory-hard, making it mathematically devastating to brute-force using custom ASICs or massive GPU clusters.

<Callout icon="success" title="Side-Channel Resistance">
  Older memory-hard algorithms were vulnerable to "cache-timing attacks", where a hacker on the same physical server (e.g., in a shared AWS environment) could mathematically deduce your password by monitoring how your CPU accessed the CPU cache. Argon2i was specifically designed to make its memory access patterns completely independent of the password, rendering these attacks impossible.
</Callout>

## The Three Variants

<ComparisonTable 
  headers={['Variant', 'Design Goal', 'Primary Use Case']}
  rows={[
    ['Argon2d', 'Maximizes resistance against GPU cracking by using highly unpredictable, data-dependent memory access.', 'Cryptocurrency mining or backend systems isolated from side-channel attackers.'],
    ['Argon2i', 'Maximizes resistance against side-channel cache-timing attacks by using completely predictable memory access.', 'Password hashing on shared cloud servers.'],
    ['Argon2id', 'A hybrid approach. It acts like Argon2i for the first pass to defeat side-channel attacks, then switches to Argon2d to defeat GPU cracking.', 'The industry standard. If you don\\'t know which to use, use Argon2id.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Wireshark/index.mdx': `---
title: Wireshark
description: The world's most widely-used network protocol analyzer, capable of inspecting data at a microscopic packet level.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Wireshark">

Wireshark is the undisputed king of network protocol analyzers. It captures live network traffic passing through your computer\\'s network interface card (NIC) and allows you to mathematically inspect every single byte of every single packet across hundreds of different protocols.

<Callout icon="warning" title="Promiscuous Mode">
  By default, a network card ignores packets that aren\\'t addressed specifically to its MAC address. Wireshark places the card into **Promiscuous Mode**, forcing it to capture ALL packets traveling across the local network segment.
</Callout>

## Primary Use Cases

<ComparisonTable 
  headers={['Use Case', 'Description']}
  rows={[
    ['Malware Analysis', 'Security researchers use Wireshark to watch exactly what servers a virus attempts to contact (Command and Control) after infecting a machine.'],
    ['Troubleshooting', 'If a web application is randomly dropping connections, engineers use Wireshark to mathematically analyze the TCP handshake to see if the server is sending RST (Reset) packets.'],
    ['Protocol Reverse Engineering', 'Hackers use Wireshark to capture the traffic between a mobile game and its server, allowing them to decipher the undocumented API and write custom bots.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Nmap/index.mdx': `---
title: Nmap (Network Mapper)
description: The industry-standard open-source utility for network discovery and security auditing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Nmap (Network Mapper)">

Nmap is a free and open-source utility used by network administrators and penetration testers to discover hosts and services on a computer network. It does this by sending mathematically crafted packets to target machines and analyzing the highly specific ways the targets respond.

<Callout icon="info" title="The Hollywood Hacker Tool">
  Nmap is so ubiquitous in real-world hacking that it has been featured in movies like *The Matrix Reloaded*, *The Bourne Ultimatum*, and *Snowden* as the primary tool used by the protagonists.
</Callout>

## Core Capabilities

<ComparisonTable 
  headers={['Scan Type', 'Flag', 'Mechanism']}
  rows={[
    ['TCP SYN Scan (Stealth)', '\`-sS\`', 'Sends a SYN packet. If the server replies with SYN/ACK, Nmap knows the port is open, but immediately sends an RST to tear down the connection before it fully opens. This avoids logging on older systems.'],
    ['Version Detection', '\`-sV\`', 'Once a port is found, Nmap sends specific probes (like an HTTP GET request to a weird port) and matches the response against a massive database to mathematically deduce exactly what software (e.g., Apache 2.4.41) is running.'],
    ['OS Detection', '\`-O\`', 'Different operating systems implement the TCP/IP stack slightly differently. By sending malformed packets and analyzing the mathematically unique quirks in the response (TCP Sequence generation, Window size), Nmap can guess the exact OS version.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Metasploit/index.mdx': `---
title: Metasploit Framework
description: The world's most used penetration testing framework, containing thousands of weaponized exploits.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Metasploit Framework">

Owned by Rapid7, the Metasploit Framework is a massive, open-source Ruby project that provides information about security vulnerabilities and aids in penetration testing and IDS signature development.

It essentially standardizes exploitation. Instead of a hacker having to write a custom Python script for every new vulnerability, Metasploit provides a unified interface to point, click, and fire weaponized code.

<Callout icon="warning" title="The Meterpreter Payload">
  The true power of Metasploit is **Meterpreter**. When you successfully exploit a machine, instead of getting a dumb command shell, Metasploit injects Meterpreter entirely into the victim\\'s RAM. It provides advanced commands to dump passwords, take screenshots, pivot into other networks, and completely evade hard-drive anti-virus scans.
</Callout>

## Core Terminology

<ComparisonTable 
  headers={['Term', 'Description']}
  rows={[
    ['Exploit', 'The actual code that takes advantage of a mathematical flaw in the target system (e.g., a buffer overflow in an old Windows SMB service).'],
    ['Payload', 'The code that the exploit delivers and executes on the target machine (e.g., "Connect back to my IP address and give me a command shell").'],
    ['Auxiliary', 'Modules that don\\'t execute payloads, but perform useful tasks like port scanning, brute-forcing FTP passwords, or sniffing network traffic.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/42.6 Security Tools/Burp Suite/index.mdx': `---
title: Burp Suite
description: The industry-standard interception proxy used by web application penetration testers and bug bounty hunters.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Burp Suite">

Developed by PortSwigger, Burp Suite is the definitive tool for web application security testing. It sits as a "Man-in-the-Middle" proxy between your web browser and the target server.

Normally, when you click "Submit" on a webpage, the browser instantly sends the HTTP request. With Burp Suite intercepting, the request is paused on your screen. You can mathematically alter hidden fields, tamper with cookies, or rewrite JSON before allowing the request to travel to the server.

<Callout icon="success" title="The Bug Bounty Gold Standard">
  Almost every major web vulnerability (SQL Injection, Cross-Site Scripting, Insecure Direct Object References) found in modern bug bounty programs is discovered using Burp Suite to manipulate requests in ways the frontend developers never anticipated.
</Callout>

## Core Tools

<ComparisonTable 
  headers={['Tool', 'Function']}
  rows={[
    ['Proxy', 'The core feature. Intercepts, inspects, and modifies HTTP/HTTPS traffic in real-time.'],
    ['Repeater', 'Allows a hacker to take a captured HTTP request, tweak a specific parameter, and manually resend it to the server hundreds of times to test how the server reacts to malformed math or logic.'],
    ['Intruder', 'A highly customizable brute-forcer. You define a payload position in the HTTP request (e.g., the \`id=123\` parameter) and Intruder automatically fires thousands of requests substituting payloads from a dictionary to find vulnerabilities.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega61() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega61().catch(console.error)
