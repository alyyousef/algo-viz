export const cryptoPages = [
  {
    rel: '42.1 Cryptography/AES/index.mdx',
    title: 'Advanced Encryption Standard (AES)',
    description:
      'NIST block cipher that encrypts 128-bit blocks with 128, 192, or 256-bit keys and underpins TLS, disk encryption, and most modern AEAD modes.',
    body: `
**AES** is a symmetric block cipher: the same secret key encrypts and decrypts. It won the NIST contest in 2001 as Rijndael and replaced aging 56-bit DES. You almost never call the raw block function yourself. You use an authenticated mode such as GCM through a reviewed library.

## 1. Deep Dive and Mechanics

AES works on a 4-by-4 byte state. A key schedule expands the master key into round keys. Each round except the last applies SubBytes, ShiftRows, MixColumns, and AddRoundKey. Round counts are 10, 12, or 14 for 128, 192, and 256-bit keys.

**Modes matter more than the S-box.** Electronic Codebook repeats identical ciphertext for identical blocks. CBC hides patterns but needs a random IV and padding. GCM turns AES into a counter stream and adds a GHASH authentication tag so tampering is detected.

**Implementation traps.** Reuse of a GCM nonce with the same key is catastrophic. ECB is never acceptable for data at rest. Home-grown padding oracles appear when you decrypt then check integrity in the wrong order.

<Callout icon="warning" title="Never roll your own AES">
Call a maintained library and an AEAD mode. The hard bugs are nonce reuse, padding oracles, and side channels, not the S-box math.
</Callout>

## 2. Mathematical / Theoretical Foundation

AES is a substitution-permutation network over GF(2^8). Confusion comes from the nonlinear S-box. Diffusion comes from ShiftRows and MixColumns. Security claims are empirical: no practical break of full AES-128 is known. Grover search would square-root the key space, which is why long-lived systems prefer AES-256.

<ComparisonTable
  headers={['Mode', 'Auth tag', 'Parallel encrypt', 'Use today']}
  rows={[
    ['ECB', 'No', 'Yes', 'Never for real data'],
    ['CBC', 'No', 'Decrypt only', 'Legacy only'],
    ['CTR', 'No', 'Yes', 'Only inside AEAD'],
    ['GCM', 'Yes', 'Yes', 'Default for TLS and disks'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

key = AESGCM.generate_key(bit_length=256)
aes = AESGCM(key)
nonce = os.urandom(12)
token = aes.encrypt(nonce, b'secret payload', b'aad-context')
plain = aes.decrypt(nonce, token, b'aad-context')
TICK3

Store the nonce beside the ciphertext. Never increment a counter in an ad-hoc way across processes without a uniqueness scheme.

## 4. Visualizations

TICK3mermaid
flowchart LR
    P[Plaintext block] --> SB[SubBytes]
    SB --> SR[ShiftRows]
    SR --> MC[MixColumns]
    MC --> ARK[AddRoundKey]
    K[Round key] --> ARK
    ARK --> C[Ciphertext block]
TICK3

## 5. Interview Prep

**Q: Why is ECB unsafe even with AES-256?**
**A:** Identical blocks encrypt to identical ciphertext, so structure leaks. Key length does not fix that.

**Q: AES-GCM vs AES-CBC-then-HMAC?**
**A:** GCM is one-pass AEAD and parallel. Encrypt-then-MAC with CBC is older, sequential, and easy to get in the wrong order.

**Q: What happens if a GCM nonce repeats?**
**A:** The keystream repeats and GHASH can leak the authentication key. Treat nonce uniqueness as a hard invariant.

## 6. Production Use Cases

- **TLS 1.3** record protection with AES-GCM or AES-CCM.
- **Full-disk and volume encryption** (BitLocker, FileVault, LUKS).
- **Application envelopes** for tokens and field-level encryption in databases.

<Callout icon="tip" title="Prefer 256-bit keys for long-lived archives">
AES-128 is still strong against classical attacks. AES-256 is the conservative choice when data must stay secret for decades.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Argon2/index.mdx',
    title: 'Argon2',
    description:
      'PHC-winning memory-hard password hash with Argon2id as the default for new password stores.',
    body: `
**Argon2** won the Password Hashing Competition in 2015. It is designed so that guessing a password costs a lot of RAM and time, which blunts GPU and ASIC farms that crush SHA-256 loops. **Argon2id** is the usual production variant: hybrid data-independent and data-dependent memory access.

## 1. Deep Dive and Mechanics

You configure three knobs: **memory** (m), **time/iterations** (t), and **parallelism** (p). The algorithm fills a large memory matrix, then mixes it so an attacker who wants to try millions of guesses must either provision that RAM per guess or thrash to disk.

**Variants.** Argon2d is data-dependent and stronger against GPU cracking but theoretically more exposed to side channels. Argon2i is data-independent and better on that axis. Argon2id mixes both and is the RFC 9106 recommendation for password hashing.

**Parameters are a product decision.** Pick m and t so a legitimate login stays under your latency budget on production hardware, then lock those values in the stored string so you can raise them later.

<Callout icon="info" title="Store the full encoded hash">
A good library string embeds algorithm, version, m, t, p, salt, and digest. Verification then needs no extra columns.
</Callout>

## 2. Mathematical / Theoretical Foundation

Password hashing is not collision resistance. The goal is a **one-way, salted, parameterized KDF** whose cost function is memory-hard. The theoretical aim is that the best parallel attack still pays roughly the same memory-time product as the defender. That is a different game from SHA-256, which is cheap and highly parallel.

<ComparisonTable
  headers={['KDF', 'Memory-hard', 'Default role', 'Watch-out']}
  rows={[
    ['Argon2id', 'Yes', 'New password stores', 'Tune m and t per host'],
    ['scrypt', 'Yes', 'Legacy / some wallets', 'Older parameter culture'],
    ['bcrypt', 'Partial', 'Huge installed base', '72-byte password cap'],
    ['PBKDF2-HMAC-SHA256', 'No', 'FIPS boxes', 'Needs huge iteration counts'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from argon2 import PasswordHasher

ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
stored = ph.hash('correct-horse-battery')
ph.verify(stored, 'correct-horse-battery')
TICK3

On verify failure, raise a generic auth error. Do not distinguish unknown user from bad password in the API response.

## 4. Visualizations

TICK3mermaid
flowchart TD
    P[Password] --> S[Unique salt]
    S --> F[Fill memory matrix]
    F --> M[Mix blocks t times]
    M --> D[Encoded digest]
TICK3

## 5. Interview Prep

**Q: Why not hash passwords with SHA-256?**
**A:** SHA-256 is fast. Attackers hash billions of guesses per second. Password KDFs exist to make each guess expensive.

**Q: Argon2id vs bcrypt?**
**A:** Argon2id is memory-hard and has no 72-byte truncation. bcrypt is fine for existing stores; new systems should pick Argon2id.

**Q: What do you do when you raise memory_cost?**
**A:** Rehash on successful login. Keep verifying the old encoded parameters until every active user has a new string.

## 6. Production Use Cases

- **Web and API password vaults** with per-user salts.
- **Disk and backup passphrases** when you wrap a data key.
- **Secret stretching** before you feed a low-entropy secret into a KMS envelope.

<Callout icon="tip" title="Benchmark on the real login box">
Laptop numbers lie. Measure p95 hash time on the smallest production instance you will actually run.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Asymmetric encryption/index.mdx',
    title: 'Asymmetric Encryption',
    description:
      'Public-key encryption where anyone can seal data to a public key and only the matching private key can open it.',
    body: `
**Asymmetric encryption** uses a key pair. The public key can be shared. The private key stays secret. Anyone can encrypt to you; only you can decrypt. Digital signatures flip the direction: only you can sign, anyone can verify. Real systems mix both with symmetric bulk encryption because public-key ops are slow.

## 1. Deep Dive and Mechanics

Classic RSA encryption raises a message to the public exponent modulo n. Modern practice wraps a random AES key with RSA-OAEP or, more often, uses **ECDH to agree a shared secret** and then AES-GCM. Pure encrypt-this-file-with-RSA is a smell except for tiny key-wrapping payloads.

**Trust is the hard part.** A public key without a binding to an identity is just a number. Certificates, TOFU, and out-of-band fingerprints exist to answer whether this key really belongs to Alice.

**Forward secrecy.** Static RSA key-transport means a stolen private key decrypts old recordings. Ephemeral Diffie-Hellman, as in TLS 1.3, agrees a fresh secret so yesterday's ciphertext stays sealed.

<Callout icon="warning" title="Do not encrypt large blobs with RSA">
RSA message length is bounded by the modulus minus padding. Encrypt a symmetric key, then encrypt the file with AES-GCM.
</Callout>

## 2. Mathematical / Theoretical Foundation

Security rests on trapdoor functions: easy to compute, hard to invert without a secret. RSA uses factoring and the RSA problem. Diffie-Hellman and ECC use discrete logs in carefully chosen groups. Padding such as OAEP or PSS is not cosmetic; raw RSA is malleable and leaking.

<ComparisonTable
  headers={['Job', 'Asymmetric primitive', 'Symmetric partner']}
  rows={[
    ['Confidentiality', 'RSA-OAEP or ECDH', 'AES-GCM'],
    ['Integrity and authorship', 'RSA-PSS or ECDSA', 'Hash of the message'],
    ['Key agreement', 'ECDHE', 'HKDF then AEAD'],
    ['Identity binding', 'X.509 or SSH TOFU', 'None by itself'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

priv = rsa.generate_private_key(public_exponent=65537, key_size=2048)
pub = priv.public_key()
wrapped = pub.encrypt(
    b'session-key-32-bytes-go-here!!',
    padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None),
)
plain = priv.decrypt(
    wrapped,
    padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None),
)
TICK3

Prefer library high-level hybrid helpers when they exist. Hand-rolled hybrids miss AAD and key-derivation details.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant S as Sender
    participant R as Recipient
    S->>R: Request public key or cert
    S->>S: Generate AES session key
    S->>R: RSA-OAEP wrap of session key
    S->>R: AES-GCM ciphertext
    R->>R: Unwrap then decrypt
TICK3

## 5. Interview Prep

**Q: Why is TLS not just RSA encryption?**
**A:** TLS agrees keys, authenticates the server, and then uses symmetric AEAD for records. RSA is one possible piece, and TLS 1.3 dropped static RSA key transport.

**Q: Public encrypt versus private sign?**
**A:** Opposite directions and different paddings. Never reuse one RSA key for both jobs.

**Q: What does forward secrecy buy you?**
**A:** Compromise of today's private key should not decrypt yesterday's recorded sessions.

## 6. Production Use Cases

- **TLS and SSH** session setup.
- **S/MIME and age-style** file sealing.
- **Key wrapping** inside KMS and envelope encryption.

<Callout icon="tip" title="Separate encryption keys from signing keys">
Different algorithms, different paddings, different compromise stories. Issue two keys.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Certificates/index.mdx',
    title: 'Certificates',
    description:
      'X.509 bindings of a public key to an identity, signed by a issuer, that make TLS and code signing scalable.',
    body: `
A **certificate** is a signed statement: this public key belongs to this name, until this date, under these usages. On the web that name is a DNS name. The signature comes from a Certification Authority that browsers or your private PKI already trust. Without certificates, every client would have to pin every server key by hand.

## 1. Deep Dive and Mechanics

An X.509 v3 certificate carries subject, subject public key, issuer, validity window, serial, and extensions: SAN, key usage, EKU, AIA, CRL/OCSP pointers. Browsers match the hostname against SAN, check the time window, walk the chain to a trust anchor, and check revocation when they can.

**Chain building.** The leaf is signed by an intermediate. The intermediate is signed by a root in the trust store. Name constraints and path-length constraints stop a rogue intermediate from minting arbitrary names.

**Lifecycle.** Issue, deploy, renew before expiry, revoke on compromise. Short-lived certs (hours to days) shrink the revocation problem. ACME automates the web PKI loop.

<Callout icon="warning" title="Hostname mismatch is a hard fail">
A perfectly valid cert for the wrong name is an impersonation. Always verify SAN against the name you intended to reach.
</Callout>

## 2. Mathematical / Theoretical Foundation

A cert is a signature over a TBSCertificate encoding. Verification is public-key signature verification plus a policy: allowed roots, required EKUs, name constraints. The crypto proves the issuer attested the binding. It does not prove the issuer did good identity checks. That is a process problem (CABF baseline requirements, your RA).

<ComparisonTable
  headers={['Field', 'Job', 'Common failure']}
  rows={[
    ['SAN', 'Names the cert covers', 'Missing name, only CN set'],
    ['EKU', 'TLS server vs code sign vs email', 'Wrong purpose accepted'],
    ['Validity', 'Not-before / not-after', 'Clock skew, forgotten renew'],
    ['AKI / SKI', 'Chain building hints', 'Broken intermediate chain'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
openssl x509 -in leaf.pem -noout -text -certopt no_pubkey,no_sigdump
openssl verify -CAfile roots.pem -untrusted intermediates.pem leaf.pem
TICK3

In application code, use the platform TLS stack and its default trust store unless you are pinning a private CA. Do not parse X.509 with regex.

## 4. Visualizations

TICK3mermaid
flowchart BT
    Leaf[Leaf cert for app.example] --> Int[Intermediate CA]
    Int --> Root[Trust-anchor root]
    Client[Client trust store] --> Root
TICK3

## 5. Interview Prep

**Q: Why do we still have intermediates?**
**A:** Roots stay offline. Intermediates sign daily issuance. Compromise of an intermediate is painful; compromise of a root is catastrophic.

**Q: Cert pinning vs public CA?**
**A:** Pinning shrinks the trusted set (good for mobile apps talking to your API). It also makes rotation and incident response harder. Public CA plus Certificate Transparency is the web default.

**Q: What is a leaf versus a CA cert?**
**A:** Basic Constraints CA=true marks issuers. Clients must reject a leaf that tries to sign other certs.

## 6. Production Use Cases

- **HTTPS** server identity on the public internet.
- **mTLS** service-to-service identity in a mesh.
- **Code signing and document signing** with a different EKU.

<Callout icon="tip" title="Automate renewal at 60 percent of lifetime">
Humans forget 90-day certs. ACME or your internal issuer API should renew unattended and fail the deploy if the new chain does not verify.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Diffie-Hellman/index.mdx',
    title: 'Diffie-Hellman',
    description:
      'Key-agreement protocol that lets two parties derive a shared secret over an untrusted channel without sending the secret itself.',
    body: `
**Diffie-Hellman (DH)** is key agreement, not encryption. Two parties pick private scalars, publish public group elements, and both compute the same shared secret. An eavesdropper who sees only the public values cannot cheaply recover that secret if the group is well chosen. **ECDHE** is the elliptic-curve, ephemeral form used in TLS 1.3.

## 1. Deep Dive and Mechanics

Classic finite-field DH: agree on a prime p and generator g. Alice sends g^a mod p. Bob sends g^b mod p. Shared secret is g^(ab) mod p. Elliptic-curve DH replaces exponentiation with scalar multiplication on a curve such as X25519.

**Ephemeral versus static.** Ephemeral keys (the E in ECDHE) are generated per session and discarded. That is forward secrecy. Static DH keys persist and need authentication, or you have an unauthenticated agreement and a MITM can run DH twice.

**Authentication is separate.** DH alone does not name anyone. TLS binds DH to a certificate signature so you agree a secret with the owner of that name.

<Callout icon="warning" title="Safe groups only">
Tiny primes, non-safe primes, or reused broken parameters (historical export DH, Logjam-class groups) collapse the discrete-log hardness. Use named modern groups.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hardness is the Computational Diffie-Hellman problem, which sits on the discrete logarithm problem in the group. CDH does not automatically give you a key you can feed to AES; you still run a KDF (HKDF) on the shared secret. Finite-field DH needs large primes (2048+ bits). ECDH on 256-bit curves gives similar classical strength with smaller messages.

<ComparisonTable
  headers={['Variant', 'Group', 'Forward secrecy', 'Where you see it']}
  rows={[
    ['Static FF-DH', 'Mod p', 'No', 'Legacy IPsec'],
    ['DHE', 'Mod p ephemeral', 'Yes', 'Older TLS'],
    ['ECDHE P-256', 'NIST prime curve', 'Yes', 'TLS, JWT ECDH-ES'],
    ['X25519', 'Montgomery curve', 'Yes', 'TLS 1.3, SSH, Signal'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes

alice = x25519.X25519PrivateKey.generate()
bob = x25519.X25519PrivateKey.generate()
shared = alice.exchange(bob.public_key())
key = HKDF(algorithm=hashes.SHA256(), length=32, salt=None, info=b'tls-like').derive(shared)
TICK3

Never use the raw DH secret as an AES key. Always extract-and-expand with a KDF and a transcript-bound info string.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: A_pub = X25519(a)
    B->>A: B_pub = X25519(b)
    A->>A: shared = X25519(a, B_pub)
    B->>B: shared = X25519(b, A_pub)
    A->>A: AES key = HKDF(shared)
    B->>B: AES key = HKDF(shared)
TICK3

## 5. Interview Prep

**Q: DH versus RSA key transport?**
**A:** RSA transport encrypts a premaster to the server cert key. DH agrees a new secret. Ephemeral DH gives forward secrecy; static RSA transport does not.

**Q: Why HKDF after DH?**
**A:** The shared field element is not uniform key material and is not bound to the handshake transcript until you derive with context.

**Q: What is a MITM against anonymous DH?**
**A:** The network runs DH with Alice and DH with Bob, then decrypts and re-encrypts. Signatures or a pre-shared identity stop that.

## 6. Production Use Cases

- **TLS 1.3** and QUIC handshake key schedule.
- **Signal / Double Ratchet** root key updates.
- **SSH** key exchange (curve25519-sha256).

<Callout icon="tip" title="Prefer X25519 unless you are in a NIST-only box">
It is fast, has simpler APIs, and avoids many ECC implementation foot-guns. FIPS environments often require P-256 instead.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Digital signatures/index.mdx',
    title: 'Digital Signatures',
    description:
      'Public-key proofs that a holder of a private key attested a specific message digest, used for TLS, software updates, and documents.',
    body: `
A **digital signature** is not encryption. The signer hashes a message and applies a private-key operation. Anyone with the public key can verify that that exact digest was attested and that the bits were not altered. Non-repudiation in the legal sense is a policy overlay; the crypto only proves key possession at signing time.

## 1. Deep Dive and Mechanics

Pipeline: canonicalize the bytes, hash them, sign the digest with RSA-PSS, ECDSA, Ed25519, or a post-quantum scheme. Verification recomputes the hash and runs the public-key check. If the hash does not match, the signature is invalid even if the math on a different digest would pass.

**What is signed matters.** Sign the transcript, the artifact digest, or a structured statement (JWT payload). Signing "whatever bytes I was handed" without a type prefix invites cross-protocol surprises.

**Keys and padding.** Raw RSA PKCS#1 v1.5 signatures have a long history of implementation bugs. PSS and Ed25519 are the modern defaults. Do not use one key for both signing and decryption.

<Callout icon="error" title="Never verify then parse untrusted structure carelessly">
Check the signature over the exact bytes you will parse. Canonicalization bugs (XML DSig, JSON key reordering) are classic bypasses.
</Callout>

## 2. Mathematical / Theoretical Foundation

EUF-CMA (existential unforgeability under chosen-message attack) is the usual goal: an adversary who can obtain signatures on messages they choose still cannot produce a valid signature on a new message. Hash-then-sign reduces that to the hash being collision-resistant and the trapdoor scheme being sound. Deterministic Ed25519 avoids the catastrophic nonce reuse that wrecked some ECDSA deployments.

<ComparisonTable
  headers={['Scheme', 'Digest', 'Notes']}
  rows={[
    ['RSA-PSS', 'SHA-256', 'Flexible key size, larger sigs'],
    ['ECDSA P-256', 'SHA-256', 'Needs good nonce generation'],
    ['Ed25519', 'Internal SHA-512', 'Det. signatures, small keys'],
    ['Dilithium / ML-DSA', 'SHAKE', 'Post-quantum signatures'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

key = Ed25519PrivateKey.generate()
msg = b'artifact-sha256:deadbeef'
sig = key.sign(msg)
key.public_key().verify(sig, msg)
TICK3

Verify before you trust the artifact. On failure, do not fallback to "unsigned is ok" in production paths.

## 4. Visualizations

TICK3mermaid
flowchart LR
    M[Message bytes] --> H[Hash]
    H --> S[Sign with private key]
    S --> V[Verify with public key]
    M --> V
    V --> OK[Accept or reject]
TICK3

## 5. Interview Prep

**Q: Is a signature confidential?**
**A:** No. It is public verifiability. Combine with encryption if the payload must stay secret.

**Q: Why hash first?**
**A:** Public-key schemes operate on small field elements. A collision-resistant hash compresses arbitrary messages and prevents some algebraic tricks.

**Q: HMAC versus digital signature?**
**A:** HMAC needs a shared secret (symmetric). Signatures are transferable: a third party can verify without learning a shared key.

## 6. Production Use Cases

- **TLS certificates** (issuer signs the leaf).
- **Software update** pipelines (cosign, Sigstore, OS package managers).
- **JWT and document** signing when a verifier is not the signer.

<Callout icon="tip" title="Bind a purpose string into what you sign">
Prefix the message with a context label so a signature meant for "email" cannot be replayed as "payment".
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/ECC/index.mdx',
    title: 'Elliptic Curve Cryptography (ECC)',
    description:
      'Public-key cryptography on elliptic curves that matches RSA strength with much smaller keys, used in TLS, JWT, and mobile devices.',
    body: `
**ECC** builds public-key schemes on the group of points of an elliptic curve over a finite field. A 256-bit curve roughly matches a 3072-bit RSA modulus for classical security, which is why phones, IoT, and TLS prefer it. You use ECC through ECDH, ECDSA, or Ed25519, not by adding points by hand.

## 1. Deep Dive and Mechanics

A private key is a scalar. The public key is that scalar times a standard base point. ECDH multiplies your scalar by the peer public point to get a shared point. ECDSA signs a hash with a per-message nonce. Ed25519 (Edwards curve) wraps this in a safer, deterministic API.

**Curve choice is a compatibility and safety choice.** P-256 is the FIPS default. X25519 / Ed25519 are preferred in greenfield systems. Brainpool and obscure curves add complexity. Super-singular or tiny curves are a red flag.

**Implementation hazards.** Invalid-curve attacks, missing point validation, and ECDSA nonce reuse have all produced real breaks. Use a library that refuses off-curve points.

<Callout icon="warning" title="Validate peer public keys">
If the API lets you import raw coordinates, the library must check the point is on the curve and not the identity. Skip that and DH secrets become attacker-controlled.
</Callout>

## 2. Mathematical / Theoretical Foundation

The group law is geometric chord-and-tangent, implemented with field arithmetic. Security is the elliptic-curve discrete log problem. Not every curve is hard: the order must have a large prime factor, the embedding degree must resist MOV-style transfers, and the twist should be strong. Named curves published by CFRG and NIST already encode those checks.

<ComparisonTable
  headers={['Curve / API', 'Job', 'Typical bit security']}
  rows={[
    ['P-256 + ECDSA/ECDH', 'FIPS TLS, JWT', '128-class'],
    ['P-384', 'Higher assurance US gov', '192-class'],
    ['X25519', 'Key agreement', '128-class'],
    ['Ed25519', 'Signatures', '128-class'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes

key = ec.generate_private_key(ec.SECP256R1())
sig = key.sign(b'hello', ec.ECDSA(hashes.SHA256()))
key.public_key().verify(sig, b'hello', ec.ECDSA(hashes.SHA256()))
TICK3

Prefer Ed25519 when you control both ends. Use P-256 when a partner or a FIPS module requires it.

## 4. Visualizations

TICK3mermaid
flowchart LR
    D[Private scalar d] --> Mul[Scalar multiply G]
    G[Base point G] --> Mul
    Mul --> Q[Public point Q]
    Q --> ECDH[ECDH with peer]
    D --> ECDH
    ECDH --> K[Shared secret then HKDF]
TICK3

## 5. Interview Prep

**Q: Why is ECC smaller than RSA?**
**A:** The best generic attacks on well-chosen curves are close to sqrt of the group order. Factoring has sub-exponential algorithms, so RSA needs much larger numbers for the same classical security level.

**Q: ECDSA nonce reuse — what breaks?**
**A:** Two signatures with the same nonce leak the private key via algebra. Ed25519 is deterministic to avoid that class of bug.

**Q: Is ECC quantum-safe?**
**A:** No. Shor's algorithm breaks ECC and RSA. Plan a PQC migration for long-lived confidentiality.

## 6. Production Use Cases

- **TLS 1.3** ECDHE and certificate signatures.
- **Mobile and smart-card** identity where RSA-4096 is too slow.
- **Blockchain and COSE/JOSE** signing ecosystems.

<Callout icon="tip" title="Treat curve IDs as part of the protocol">
A peer that suddenly offers a toy curve is not being clever. Negotiate a small allowlist.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/HMAC/index.mdx',
    title: 'HMAC',
    description:
      'Keyed-hash message authentication code that proves integrity and authenticity when two parties already share a secret.',
    body: `
**HMAC** (Hash-based Message Authentication Code) mixes a secret key with a hash function so that anyone who does not know the key cannot forge a tag. It is the workhorse of API tokens, webhook signatures, and HKDF. It is not a digital signature: verifiers must hold the same secret, so they can also forge tags.

## 1. Deep Dive and Mechanics

HMAC is defined as H((k xor opad) || H((k xor ipad) || message)). The nested construction survived length-extension attacks that wreck naive key||message hashes with Merkle-Damgard functions such as SHA-256.

**Compare tags in constant time.** A byte-by-byte early exit lets attackers recover the tag. Use the language's dedicated compare.

**Key hygiene.** Generate keys with a CSPRNG. Do not use a password as an HMAC key without a KDF. Rotate keys and include a key id in the message so verifiers can try the right one.

<Callout icon="info" title="HMAC authenticates, it does not encrypt">
A tagged plaintext is still readable. For confidentiality plus integrity use AEAD, or encrypt then HMAC with separate keys.
</Callout>

## 2. Mathematical / Theoretical Foundation

HMAC is proven secure if the compression function of H is a PRF (or under weaker related assumptions). Length-extension resistance is the practical reason we do not use SHA-256(key || msg). SHA-3 and BLAKE2 have dedicated MAC modes, but HMAC-SHA-256 remains the interoperability default.

<ComparisonTable
  headers={['Construction', 'Shared secret', 'Transferable verify', 'Use']}
  rows={[
    ['HMAC', 'Yes', 'No', 'APIs, cookies, HKDF'],
    ['AES-GCM tag', 'Yes (enc key)', 'No', 'AEAD records'],
    ['Ed25519', 'No', 'Yes', 'Public verify'],
    ['SHA-256 alone', 'No', 'n/a', 'Integrity vs random corruption only'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import hmac
import hashlib
import secrets

key = secrets.token_bytes(32)
msg = b'id=42&exp=1893456000'
tag = hmac.new(key, msg, hashlib.sha256).digest()
ok = hmac.compare_digest(tag, hmac.new(key, msg, hashlib.sha256).digest())
TICK3

Sign a canonical encoding (sorted query string, or a length-prefixed blob). Do not concatenate fields without delimiters.

## 4. Visualizations

TICK3mermaid
flowchart LR
    K[Secret key] --> Inner[Inner hash]
    M[Message] --> Inner
    Inner --> Outer[Outer hash with opad]
    K --> Outer
    Outer --> T[Auth tag]
TICK3

## 5. Interview Prep

**Q: Why not SHA-256(key || message)?**
**A:** Merkle-Damgard length extension lets an attacker append data and compute a new hash without the key. HMAC's nested pad kills that.

**Q: HMAC vs JWT asymmetric alg?**
**A:** HS256 is HMAC: every verifier is a potential forger. RS256/EdDSA lets you publish a verify key.

**Q: How long should the key be?**
**A:** At least the hash output size (32 bytes for SHA-256), from a CSPRNG.

## 6. Production Use Cases

- **Webhook and callback** signing (Stripe-style).
- **Session cookies** and CSRF tokens when you already have a server secret.
- **HKDF** extract/expand in TLS and Signal.

<Callout icon="tip" title="Put a key id next to the tag">
Rotation without downtime means the verifier can select k1 or k2. Silent dual-key windows beat a flag day.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Hashing/index.mdx',
    title: 'Hashing',
    description:
      'One-way fixed-length fingerprints used for integrity, commitments, and as building blocks of HMACs and signatures.',
    body: `
A **cryptographic hash** maps arbitrary bytes to a fixed digest. It should be easy to compute, hard to invert, and hard to find two inputs with the same output. Hashes detect accidental or malicious change. They are not encryption, and they are not a password KDF by themselves.

## 1. Deep Dive and Mechanics

You feed a stream of bytes into a compression function. Merkle-Damgard designs (SHA-256) pad the message and iterate a block cipher-like function. Sponge designs (SHA-3, SHAKE) absorb then squeeze. The digest is a commitment to those exact bytes.

**What hashing does not do.** It does not hide the input if the input is guessable (passwords, short IDs). It does not bind a key unless you use HMAC or a keyed mode. It does not prove who created the file unless you also sign.

**Truncation.** Shortening a digest reduces collision work. Do not truncate below the security level you claim.

<Callout icon="warning" title="MD5 and SHA-1 are retired for security">
Both have practical collisions. Keep them only for talking to fossils, and never for signatures or integrity of untrusted data.
</Callout>

## 2. Mathematical / Theoretical Foundation

Three classical properties: preimage resistance, second-preimage resistance, and collision resistance. Birthday bound says a 256-bit hash has about 128-bit collision strength. Length extension is an extra Merkle-Damgard foot-gun: given H(m) you may compute H(m || pad || extra) without m. Sponges and HMAC avoid that.

<ComparisonTable
  headers={['Function', 'Output', 'Status']}
  rows={[
    ['MD5', '128 bit', 'Broken collisions'],
    ['SHA-1', '160 bit', 'Broken collisions'],
    ['SHA-256', '256 bit', 'Standard workhorse'],
    ['SHA-3-256 / SHAKE', '256+ bit', 'Sponge alternative'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import hashlib

digest = hashlib.sha256(b'artifact-bytes').hexdigest()
TICK3

For files, hash in streaming chunks so you do not load the whole blob. Compare published checksums with a constant-time compare if the digest is a secret; for public checksums a normal compare is fine.

## 4. Visualizations

TICK3mermaid
flowchart LR
    B[Input bytes] --> Pad[Pad / absorb]
    Pad --> Comp[Compression or sponge]
    Comp --> D[Fixed digest]
TICK3

## 5. Interview Prep

**Q: Hash versus encryption?**
**A:** Encryption is reversible with a key. A hash is one-way and keyless. Different jobs.

**Q: Why do we hash before signing?**
**A:** Public-key ops are small-input. A collision-resistant hash compresses the document and is part of the EUF-CMA story.

**Q: Can I store passwords as SHA-256?**
**A:** No. Use Argon2id, scrypt, or bcrypt with a unique salt. Fast hashes lose to GPU guessing.

## 6. Production Use Cases

- **Artifact integrity** (container layers, packages, backups).
- **Content addressing** (git, IPFS-style stores).
- **Building block** for HMAC, HKDF, Merkle trees, and signatures.

<Callout icon="tip" title="Always name the algorithm next to the digest">
A bare hex string ages badly. Store sha256: and the hex so migrators and verifiers do not guess.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Homomorphic encryption/index.mdx',
    title: 'Homomorphic Encryption',
    description:
      'Encryption that lets you compute on ciphertexts so a server can process data it cannot read.',
    body: `
**Homomorphic encryption (HE)** lets someone compute on encrypted values and return an encrypted result that decrypts to the function of the plaintexts. The server never sees the data in the clear. Partially homomorphic schemes support one operation (addition or multiplication). Fully homomorphic encryption (FHE) supports both, hence arbitrary circuits, at a steep cost.

## 1. Deep Dive and Mechanics

A typical FHE loop: encrypt under a public key, send ciphertexts, evaluate gates or arithmetic, optionally refresh via bootstrapping when noise grows, and decrypt on the client. Noise is the central engineering object. Each operation adds noise; bootstrapping resets it by homomorphically decrypting.

**Schemes you will hear.** Paillier adds. ElGamal multiplies. BFV/BGV do modular arithmetic. CKKS does approximate real arithmetic for ML. TFHE/FHEW bootstrap quickly for boolean circuits.

**Not a drop-in TLS replacement.** Ciphertexts are huge, circuits must be known up front or expressed as a program, and side channels plus access patterns still leak. HE is for narrow, high-value compute-on-blind-data jobs.

<Callout icon="info" title="HE hides values, not traffic shape">
If the server sees you queried "the record at index 17", encryption of the payload does not hide that index. Combine with ORAM or batching if access pattern is sensitive.
</Callout>

## 2. Mathematical / Theoretical Foundation

Modern FHE is lattice-based, usually Learning With Errors. Ciphertexts are noisy ring elements. Correctness holds while noise stays below a modulus threshold. Security reduces to lattice problems believed hard even for quantum computers (with parameter care). CKKS drops exactness for scale-invariant approximate arithmetic, which matches neural-net inference.

<ComparisonTable
  headers={['Scheme class', 'Operations', 'Typical fit']}
  rows={[
    ['Paillier', 'Add', 'Simple tallies'],
    ['BFV / BGV', 'Exact add and mul', 'Integer circuits'],
    ['CKKS', 'Approx add and mul', 'Encrypted ML scores'],
    ['TFHE', 'Boolean + fast bootstrap', 'Small encrypted FSM'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Sketch: client encrypts features, server evaluates a linear model, client decrypts.
# Use a maintained HE library (Microsoft SEAL, OpenFHE, tfhe-rs) rather than raw lattices.

def encrypted_dot(enc_x, enc_w, he_add, he_mul, enc_bias):
    acc = enc_bias
    for x_i, w_i in zip(enc_x, enc_w):
        acc = he_add(acc, he_mul(x_i, w_i))
    return acc
TICK3

The real work is parameter selection (poly degree, moduli chain) so the circuit depth fits before bootstrap.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C->>C: Encrypt x under pk
    C->>S: Ciphertexts
    S->>S: Evaluate f without sk
    S->>C: Encrypt(f(x))
    C->>C: Decrypt with sk
TICK3

## 5. Interview Prep

**Q: FHE vs secure enclaves?**
**A:** Enclaves trust hardware and a vendor attestation story. FHE trusts math and parameters. Enclaves are faster; FHE has a smaller trusted computing base.

**Q: FHE vs MPC?**
**A:** MPC splits trust across parties who interact. FHE can be non-interactive after setup: one server evaluates. Hybrids exist.

**Q: Why is CKKS popular for ML?**
**A:** Neural nets tolerate approximate arithmetic. Exact BFV pays more for that workload.

## 6. Production Use Cases

- **Privacy-preserving analytics** on encrypted medical or financial features.
- **Encrypted scoring** where a vendor hosts the model.
- **Research and government** pilots; still niche at internet scale.

<Callout icon="tip" title="Start with the circuit, then pick a scheme">
If you only need sums, Paillier or even a simple additive MAC may suffice. FHE is for when the function is rich and the server is untrusted.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Key management/index.mdx',
    title: 'Key Management',
    description:
      'The lifecycle of generating, storing, rotating, using, and destroying cryptographic keys without leaking them into app memory and logs.',
    body: `
**Key management** is why most crypto fails in production. Algorithms are standardized. Keys get checked into git, copied onto laptops, never rotated, and logged in plaintext. A key-management system (KMS, HSM, or vault) generates keys, enforces who can use them, and keeps raw key bytes out of application disks.

## 1. Deep Dive and Mechanics

Lifecycle: generate in a trusted module, assign an id and purpose, distribute or wrap for use, rotate on a schedule or after incident, revoke, then destroy. **Envelope encryption** is the usual cloud pattern: a KMS master key wraps data keys; data keys encrypt objects; you store the wrapped data key beside the ciphertext.

**Separation of duties.** The app can call Decrypt or GenerateDataKey. It cannot export the master key. IAM policies plus audit logs answer who used which key when.

**Rotation.** Changing a master key does not rewrite the world if you use envelopes: new data keys are wrapped with the new master; old ciphertexts still unwrap until you re-encrypt. Application-level keys (JWT HMAC, webhook secrets) need dual-key windows.

<Callout icon="error" title="A key in source control is already compromised">
Rotate it. Scan history. Treat every copy (CI logs, AMIs, crash dumps) as leaked. Prevention is pre-commit secret scanning plus a vault.
</Callout>

## 2. Mathematical / Theoretical Foundation

Kerckhoffs's principle: the system should remain safe if everything but the key is public. Key entropy must match the algorithm (256-bit AES keys from a CSPRNG, not from a passphrase without a KDF). Compromise-resilience is about **cryptoperiods** and **forward secrecy**: limit how much ciphertext one key protects and how long that key lives.

<ComparisonTable
  headers={['Store', 'Exportable key', 'Typical use']}
  rows={[
    ['HSM', 'No', 'Roots, CAs, payment keys'],
    ['Cloud KMS', 'Rarely', 'Envelope masters'],
    ['Vault / PKCS11', 'Policy-gated', 'App secrets'],
    ['Env var on VM', 'Yes', 'Last resort, rotate often'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Envelope pattern with a KMS-shaped client
def encrypt_field(kms, plaintext: bytes) -> tuple[str, bytes, bytes]:
    data_key, wrapped = kms.generate_data_key(key_id='alias/app-cmk')
    nonce, blob = aes_gcm_encrypt(data_key, plaintext)
    wipe(data_key)
    return wrapped, nonce, blob
TICK3

Wipe is best-effort in managed languages. Prefer libraries that keep data keys in the KMS or in an enclave when the threat model demands it.

## 4. Visualizations

TICK3mermaid
flowchart LR
    MK[Master key in KMS] --> Wrap[Wrap data key]
    DK[Data key] --> Wrap
    DK --> Enc[AES-GCM encrypt object]
    Wrap --> Store[Store wrapped key + ciphertext]
    Enc --> Store
TICK3

## 5. Interview Prep

**Q: Why not one AES key for the whole database?**
**A:** Blast radius and rotation pain. Per-object or per-tenant data keys plus a master wrap limit the damage of a single leak.

**Q: KMS versus storing keys in the app?**
**A:** KMS gives access control, audit, hardware backing, and rotation APIs. The app still must authenticate to KMS.

**Q: What do you rotate after a laptop with prod creds is stolen?**
**A:** The creds, every secret those creds could read, and any data keys those secrets could unwrap — then review logs.

## 6. Production Use Cases

- **S3 / GCS / Azure** server-side encryption with customer-managed keys.
- **Field-level** encryption in payments and health apps.
- **Code-signing and TLS** keys in an HSM.

<Callout icon="tip" title="Give every key a purpose and an owner">
Signing keys, wrapping keys, and telemetry HMAC keys should never be interchangeable. Purpose binding stops confused-deputy use.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/PKI/index.mdx',
    title: 'Public Key Infrastructure (PKI)',
    description:
      'The issuers, policies, and revocation machinery that bind names to public keys at internet or enterprise scale.',
    body: `
**PKI** is the operational system around public keys: who is allowed to issue, how identity is checked, how clients find trust anchors, and how a leaked key is retired. X.509 certificates are the usual artifact. The hard parts are registration authority processes, revocation, and surviving a compromised intermediate.

## 1. Deep Dive and Mechanics

Roles: **root CA** (offline, trust anchor), **intermediate CA** (online issuer), **registration authority** (identity checks), **leaf** (server, client, or code). Clients ship a trust store. They build a path from leaf to a trusted root, check names, usages, and policy OIDs.

**Public web PKI** adds Certificate Transparency logs, CAA DNS records, and CABF rules. **Private PKI** (your company CA, SPIFFE) uses the same math with your own roots and automated issuers (cert-manager, AWS PCA, Venafi).

**Revocation.** CRLs scale poorly. OCSP stapling pushes status onto the server. Short-lived certificates (hours) make revocation less critical because the leaf dies soon anyway.

<Callout icon="warning" title="A private root in every developer trust store is a fleet problem">
Treat internal roots like production secrets. Distribute them with device management, not wiki attachments.
</Callout>

## 2. Mathematical / Theoretical Foundation

PKI is a tree (sometimes a forest) of signature verifications plus a name constraint policy. Path validation is specified in RFC 5280 and is famously easy to implement wrong (missing CA bit checks, accepting v1 intermediates, ignoring name constraints). That is why you use the platform verifier.

<ComparisonTable
  headers={['Model', 'Trust anchors', 'Revocation story']}
  rows={[
    ['Web PKI', 'Browser / OS roots', 'CT + OCSP + short life'],
    ['Enterprise CA', 'Company root', 'CRL / OCSP / MDM wipe'],
    ['mTLS mesh', 'Mesh issuer', 'Workload SVID rotation'],
    ['TOFU / pin', 'First key seen', 'Manual rotation'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
openssl crl2pkcs7 -nocrl -certfile chain.pem | openssl pkcs7 -print_certs -noout
# Issue via ACME or your internal API; do not keep the root key on the CA VM.
TICK3

In Kubernetes, cert-manager plus an external issuer keeps private keys in a CSI driver or HSM, not in a Secret that every pod can read.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Policy[RA identity checks] --> Issue[Intermediate signs leaf]
    Root[Offline root] --> Issue
    Issue --> Leaf[Leaf cert]
    Leaf --> Client[Path validate + name check]
    Status[OCSP / short TTL] --> Client
TICK3

## 5. Interview Prep

**Q: Why not one self-signed cert per service forever?**
**A:** No scalable identity, no revocation, no rotation story, and every client must pin every peer. PKI amortizes trust into a small set of anchors.

**Q: What does Certificate Transparency add?**
**A:** Public append-only logs of issued certs so domain owners can spot unauthorized issuance.

**Q: How does mTLS PKI differ from public HTTPS?**
**A:** Both ends present certs. Names are SPIFFE IDs or internal DNS. Roots are yours. Rotation is frequent and automated.

## 6. Production Use Cases

- **Public HTTPS** via Let's Encrypt or a commercial CA.
- **Internal HTTPS and VPN** device certs.
- **Service mesh** workload identities.

<Callout icon="tip" title="Keep the root air-gapped">
Ceremony-sign a few intermediates, then power the root down. If the online intermediate burns, you can replace it without replacing every client trust store.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Password hashing/index.mdx',
    title: 'Password Hashing',
    description:
      'Slow, salted, one-way KDFs that store login secrets so a leaked database is not a plaintext password dump.',
    body: `
**Password hashing** turns a user secret into a stored verifier that is expensive to guess and useless across sites. You never store plaintext. You never store a fast hash of the password alone. You store a unique salt plus a memory-hard or iterated digest, then compare in constant time at login.

## 1. Deep Dive and Mechanics

At registration: generate a CSPRNG salt, run Argon2id (or bcrypt/scrypt), store the encoded string. At login: load that string, run the same KDF, compare. On success, optionally **rehash** if your parameters have increased.

**Threat model.** Attackers steal the table and run offline guesses. Salts stop rainbow tables and force per-user work. Slow KDFs cap guesses per second. A unique pepper (server-side secret in a KMS) adds a second factor if the DB leaks without the app secret.

**UX still matters.** Rate-limit online guesses. Offer a password manager-friendly long secret. Do not silently truncate.

<Callout icon="error" title="SHA-256 of a password is not password hashing">
Fast hashes plus a stolen table equal a race the defender loses. Use a password KDF.
</Callout>

## 2. Mathematical / Theoretical Foundation

A password has maybe 20-40 bits of real entropy. A 256-bit hash does not add entropy; it only hides the exact string. The defense is **work factor**: each guess costs memory-time so the expected cost of searching the password distribution exceeds the value of the account. That is economics, not collision resistance.

<ComparisonTable
  headers={['Method', 'Salt', 'Cost knob', 'Use']}
  rows={[
    ['Argon2id', 'Yes', 'm, t, p', 'New stores'],
    ['bcrypt', 'Yes', 'cost 10-14', 'Existing stores'],
    ['scrypt', 'Yes', 'N, r, p', 'Some wallets'],
    ['SHA-256(password)', 'Often no', 'None', 'Never'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()

def register(pw: str) -> str:
    return ph.hash(pw)

def login(stored: str, pw: str) -> bool:
    try:
        ph.verify(stored, pw)
        return True
    except VerifyMismatchError:
        return False
TICK3

## 4. Visualizations

TICK3mermaid
flowchart TD
    PW[Password] --> Salt[CSPRNG salt]
    Salt --> KDF[Argon2id]
    Pepper[Optional KMS pepper] --> KDF
    KDF --> Store[Encoded verifier]
    Store --> Verify[Constant-time verify at login]
TICK3

## 5. Interview Prep

**Q: Salt versus pepper?**
**A:** Salt is unique per user and stored with the hash. Pepper is a global secret stored elsewhere so a DB-only leak is incomplete.

**Q: Why rehash on login?**
**A:** You cannot decrypt old verifiers. When you raise cost, you upgrade the hash the next time the user presents the password.

**Q: Can I encrypt passwords so I can email them back?**
**A:** No. That means you can read them. Reset via a one-time token instead.

## 6. Production Use Cases

- **Human login** for apps and VPNs.
- **Passphrase wrapping** of local data keys.
- **Migration** from legacy SHA-1 stores via on-login upgrade.

<Callout icon="tip" title="Fail closed on verifier parse errors">
A corrupt hash string is not "let them in". Log a security event and force a reset.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Post-quantum cryptography/index.mdx',
    title: 'Post-Quantum Cryptography',
    description:
      'Algorithms designed to survive quantum computers that would break RSA and ECC, now being standardized as ML-KEM and ML-DSA.',
    body: `
**Post-quantum cryptography (PQC)** replaces primitives that Shor's algorithm would break (RSA, DH, ECC) with schemes believed hard for both classical and quantum machines. NIST has standardized **ML-KEM** (Kyber) for key encapsulation and **ML-DSA** (Dilithium) for signatures, plus SLH-DSA (SPHINCS+) as a conservative hash-based signature.

## 1. Deep Dive and Mechanics

Harvest-now-decrypt-later is the urgent threat: an adversary records TLS today and waits for a large quantum computer. Confidentiality must migrate first. Signatures can wait longer unless your artifacts must verify for decades without re-signing.

**Hybrid handshakes.** TLS deployments often combine X25519 with ML-KEM so the session is safe if either algorithm holds. That hedges against a surprise cryptanalytic break of a new lattice scheme.

**Engineering costs.** Public keys and ciphertexts are larger (kilobytes, not 32 bytes). Implementation quality and side channels are still maturing. Do not invent your own Kyber.

<Callout icon="info" title="AES-256 and SHA-384 already have a quantum story">
Grover weakens symmetric primitives by about half the key bits. Double the key / digest if you need margin. The emergency is public-key, not AES.
</Callout>

## 2. Mathematical / Theoretical Foundation

ML-KEM security is tied to Module-LWE on lattices. ML-DSA is Module-SIS / Fiat-Shamir with aborts. SPHINCS+ uses only hash functions and huge signatures. Code-based (Classic McEliece) has large public keys and a long history. Security proofs are reductions to average-case lattice problems; parameters are chosen with quantum-aware cost models.

<ComparisonTable
  headers={['Role', 'Broken by Shor', 'PQC stand-in']}
  rows={[
    ['Key agreement', 'ECDHE / RSA KEM', 'ML-KEM, often hybrid'],
    ['Signatures', 'ECDSA / RSA-PSS', 'ML-DSA or SLH-DSA'],
    ['Symmetric bulk', 'AES-128 ( Grover )', 'AES-256'],
    ['Hashing', 'SHA-256 still ok', 'SHA-384 / SHA-512 if paranoid'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual hybrid encapsulate: classical ECDH plus a PQC KEM, then HKDF-combine.
def hybrid_shared(ecdh_secret: bytes, mlkem_shared: bytes) -> bytes:
    return hkdf_sha256(ikm=ecdh_secret + mlkem_shared, info=b'tls13-hybrid')
TICK3

Use a library that tracks NIST OIDs (OpenSSL 3.5+, boringssl experiments, liboqs). Pin algorithm IDs in protocols so peers cannot silently downgrade.

## 4. Visualizations

TICK3mermaid
flowchart LR
    C[Client hello] --> H[Hybrid: X25519 + ML-KEM]
    S[Server] --> H
    H --> K[HKDF session keys]
    K --> Rec[AEAD records]
TICK3

## 5. Interview Prep

**Q: Why hybrid instead of PQC-only?**
**A:** New schemes may have classical breaks. Hybrid remains safe if either half holds. Cost is extra bytes.

**Q: Does Grover kill AES-128 tomorrow?**
**A:** A cryptographically relevant quantum computer large enough for Grover on AES is a different (and still speculative) machine than one that runs Shor on RSA. Still, long-lived secrets should use AES-256.

**Q: What should I migrate first?**
**A:** Recorded confidentiality: VPN, TLS, disk backup wrapping. Then certificates and code signing as ecosystems support it.

## 6. Production Use Cases

- **Browser and CDN** hybrid TLS experiments.
- **National and financial** systems with decade-long secrecy requirements.
- **Firmware signing** roadmaps toward ML-DSA or hash-based signatures.

<Callout icon="tip" title="Inventory every place you terminate public-key crypto">
You cannot migrate what you cannot find: TLS libraries, JWTs, S/MIME, SSH CAs, firmware, and vendor appliances.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/RSA/index.mdx',
    title: 'RSA',
    description:
      'The classic public-key scheme based on modular exponentiation and factoring, still widely used for signatures and legacy key transport.',
    body: `
**RSA** publishes a modulus n = p q and a public exponent e (usually 65537). The private exponent d inverts e modulo phi(n). Encryption and signatures are modular exponentiation with padding. Raw RSA is unsafe. Modern use is **RSA-OAEP** for wrapping small secrets and **RSA-PSS** for signatures, at 2048 bits or larger.

## 1. Deep Dive and Mechanics

Keygen picks two large primes, builds n, and computes d. Private operations use the Chinese Remainder Theorem with p and q for speed. Public operations are fast because e is small.

**Padding is the product.** OAEP adds randomness and hashing so the same plaintext does not wrap to the same ciphertext and so algebraic relations do not survive. PSS does the same job for signatures. PKCS#1 v1.5 encryption is deprecated; v1.5 signatures persist but PSS is preferred.

**TLS 1.3 dropped static RSA key transport.** Servers still present RSA certificates for signatures. New designs prefer ECDSA/Ed25519 and, soon, ML-DSA.

<Callout icon="warning" title="Do not implement RSA from a textbook">
Textbook RSA is deterministic and malleable. Use a library OAEP/PSS API and a 2048-bit or 3072-bit modulus.
</Callout>

## 2. Mathematical / Theoretical Foundation

Correctness is e d ≡ 1 (mod lcm(p-1, q-1)). Security is related to factoring n and to the RSA problem (eth roots mod n). There is no proof they are equivalent in all cases. Quantum computers running Shor break both. Classically, 2048-bit n is the current floor; 3072-bit matches 128-bit symmetric more honestly.

<ComparisonTable
  headers={['Mode', 'Job', 'Status']}
  rows={[
    ['Raw / textbook', 'None', 'Broken in practice'],
    ['PKCS#1 v1.5 enc', 'Key wrap', 'Avoid'],
    ['RSA-OAEP', 'Key wrap', 'OK if you must'],
    ['RSA-PSS', 'Signatures', 'OK, large keys'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
sig = key.sign(b'artifact', padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH), hashes.SHA256())
key.public_key().verify(sig, b'artifact', padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH), hashes.SHA256())
TICK3

## 4. Visualizations

TICK3mermaid
flowchart LR
    P[Primes p and q] --> N[Modulus n]
    P --> D[Private d]
    N --> Pub[Public n, e]
    D --> Priv[Private op]
    Pub --> PubOp[Public op]
TICK3

## 5. Interview Prep

**Q: Why is e = 65537 common?**
**A:** It is a prime with a low Hamming weight, so verification is fast, and it avoids tiny-e disasters like e = 3 without OAEP.

**Q: RSA vs ECC?**
**A:** Same jobs, bigger RSA keys and slower private ops. ECC is preferred unless a standard or HSM forces RSA.

**Q: Can I encrypt a file with RSA?**
**A:** Only a tiny blob. Hybrid: wrap an AES key with OAEP, encrypt the file with AES-GCM.

## 6. Production Use Cases

- **Legacy TLS certificates** that still sign with RSA.
- **JWT RS256** in enterprise identity.
- **HSM-backed** payment and document signing.

<Callout icon="tip" title="Plan an ECC or PQC exit">
RSA-2048 will limp along, but new protocols should not add more of it. Inventory now.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/SHA family/index.mdx',
    title: 'SHA Family',
    description:
      'NIST secure hash algorithms from SHA-1 through SHA-2 and SHA-3, and which members are still safe to deploy.',
    body: `
The **SHA family** is NIST's lineup of cryptographic hash functions. **SHA-1** is retired. **SHA-2** (SHA-256, SHA-384, SHA-512) is the internet default. **SHA-3** is a different sponge construction standardized as a backup and as SHAKE extendable-output functions. Pick SHA-256 unless a standard names something else.

## 1. Deep Dive and Mechanics

SHA-256 processes 512-bit blocks with 64 rounds of a compression function. SHA-512 uses 1024-bit blocks and 64-bit words; it is often faster on 64-bit CPUs even if you then truncate to 256 bits (SHA-512/256). SHA-3-256 uses Keccak: absorb into a state, squeeze a digest. SHAKE128/256 output arbitrary length.

**Protocol names.** TLS 1.3's HKDF uses SHA-256 or SHA-384. Git historically used SHA-1 and is migrating. Bitcoin uses double SHA-256. None of that makes SHA-1 acceptable in new signatures.

<Callout icon="error" title="SHA-1 collisions are practical">
Chosen-prefix collisions have been demonstrated. Do not accept SHA-1 signatures or certs. Do not use SHA-1 for new integrity checks of untrusted data.
</Callout>

## 2. Mathematical / Theoretical Foundation

SHA-2 is Merkle-Damgard and inherits length-extension: given H(m) an attacker can compute H(m || pad || x) without m. That is why HMAC exists. SHA-3's sponge is not length-extendable in that way. Collision security is about half the digest length (birthday bound). Preimage security is close to the full digest length.

<ComparisonTable
  headers={['Member', 'Bits', 'Use today']}
  rows={[
    ['SHA-1', '160', 'Compat only, never security'],
    ['SHA-256', '256', 'Default'],
    ['SHA-384 / SHA-512', '384 / 512', 'TLS 1.3, high margin'],
    ['SHA-3-256 / SHAKE256', '256+', 'XOFs, backup primitive'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import hashlib

def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def shake256_bytes(data: bytes, n: int) -> bytes:
    return hashlib.shake_256(data).digest(n)
TICK3

For password storage, do not use any SHA member alone. Wrap a password KDF instead.

## 4. Visualizations

TICK3mermaid
flowchart TD
    In[Message] --> SHA2[SHA-2 MD construction]
    In --> SHA3[SHA-3 sponge]
    SHA2 --> D2[SHA-256 digest]
    SHA3 --> D3[SHA-3 or SHAKE output]
TICK3

## 5. Interview Prep

**Q: SHA-256 vs SHA-3-256?**
**A:** Different designs, similar security targets. SHA-256 wins on interoperability and hardware. SHA-3 is the conservative alternative and SHAKE is handy as an XOF.

**Q: Why does HMAC-SHA-256 exist if SHA-256 is a hash?**
**A:** A hash is not a MAC. HMAC adds a key and stops length extension.

**Q: Is SHA-512/256 better than SHA-256?**
**A:** Same collision strength, sometimes faster on 64-bit hosts, and it avoids length-extension onto a raw SHA-256 value in some constructions. Still use HMAC when you need a MAC.

## 6. Production Use Cases

- **TLS, JWT, git-like** content addressing.
- **Firmware images** and package checksums.
- **HKDF** inside key schedules.

<Callout icon="tip" title="Say SHA-256, not SHA-2, in APIs">
SHA-2 is a family. Protocols need an exact OID or name so both ends match.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Salting/index.mdx',
    title: 'Salting',
    description:
      'Per-secret random prefixes that make identical passwords hash to different verifiers and kill precomputed rainbow tables.',
    body: `
A **salt** is a unique, non-secret random value mixed into a password hash. Two users with the same password must not share a verifier. Attackers cannot build one rainbow table that covers your whole database. Salts do not make a weak password strong; they stop bulk precomputation and identical-hash clustering.

## 1. Deep Dive and Mechanics

Generate at least 16 bytes from a CSPRNG per registration or password change. Feed salt and password into Argon2id / bcrypt / scrypt. Store both (usually in one encoded string). At verify, read the salt back; never ask the user for it.

**Salt is not a pepper.** Salts live next to the hash. Peppers live in a KMS. Salts must be unique; they need not be secret. Reusing one global salt is a common bug that restores rainbow-table economics.

**Do not invent encoding.** Library strings already include algorithm, salt, parameters, and digest.

<Callout icon="warning" title="Username is a bad salt">
Usernames repeat across sites and get renamed. Use CSPRNG bytes. Uniqueness matters more than cleverness.
</Callout>

## 2. Mathematical / Theoretical Foundation

Without a salt, an attacker precomputes H(p) for a dictionary once and matches every row. With a unique salt s, they must compute H(s, p) per row. Work scales with users times guesses. A salt does not increase password entropy. It multiplies the attacker's per-database cost.

<ComparisonTable
  headers={['Ingredient', 'Secret', 'Unique per user', 'Job']}
  rows={[
    ['Salt', 'No', 'Yes', 'Kill precomputation'],
    ['Pepper', 'Yes', 'No', 'Survive DB-only leak'],
    ['Password', 'Yes', 'n/a', 'Human secret'],
    ['Work factor', 'No', 'Policy', 'Slow each guess'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import os
from hashlib import scrypt

def hash_pw(password: str) -> tuple[bytes, bytes]:
    salt = os.urandom(16)
    digest = scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)
    return salt, digest
TICK3

Prefer argon2's PasswordHasher, which generates and encodes the salt for you.

## 4. Visualizations

TICK3mermaid
flowchart LR
    PW[Same password] --> H1[KDF with salt A]
    PW --> H2[KDF with salt B]
    H1 --> V1[Verifier 1]
    H2 --> V2[Verifier 2]
TICK3

## 5. Interview Prep

**Q: Should salts be secret?**
**A:** No. They must be unique and unpredictable at generation time. Secrecy is the pepper's job.

**Q: How long should a salt be?**
**A:** 16+ bytes of CSPRNG. Birthday collisions among salts should be implausible at your user count.

**Q: Can I salt SHA-256 and call it done?**
**A:** You stopped rainbow tables, not GPU guessing. You still need a slow memory-hard KDF.

## 6. Production Use Cases

- **Every password column** in a user table.
- **API key stretching** when you store a hash of the key.
- **Backup passphrases** with a stored salt in the header.

<Callout icon="tip" title="Rotate salt only when the password changes">
You cannot resalt without the plaintext. Upgrade parameters on successful login instead.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Symmetric encryption/index.mdx',
    title: 'Symmetric Encryption',
    description:
      'Shared-secret encryption where the same key seals and opens data, used for almost all bulk ciphertext on the internet.',
    body: `
**Symmetric encryption** uses one secret key for both directions. It is fast, suitable for gigabytes, and the workhorse under TLS, disks, and application envelopes. The modern unit is **AEAD**: a mode that outputs ciphertext plus an authentication tag and optionally binds extra associated data (AAD).

## 1. Deep Dive and Mechanics

A block cipher (AES) plus a mode (GCM, ChaCha20-Poly1305) produces a keystream or a permutation of blocks and a tag. You must supply a **unique nonce** per key. Decrypt verifies the tag before returning plaintext. If the tag fails, treat the message as hostile; do not "try to repair" it.

**Key distribution** is the historic pain. You either pre-share keys (API secrets, disk keys in KMS) or agree them with DH and then switch to symmetric for the session.

**Do not invent modes.** No custom XOR schemes, no ECB, no CBC without a MAC in the right order.

<Callout icon="warning" title="UnAuthenticated encryption is a bug">
CBC or CTR alone lets attackers flip bits in predictable ways. Always use AEAD or encrypt-then-MAC with independent keys.
</Callout>

## 2. Mathematical / Theoretical Foundation

IND-CPA asks that ciphertexts hide plaintext from an eavesdropper. IND-CCA / AEAD asks that they also resist chosen-ciphertext tampering. Nonce reuse in GCM fails both. Information-theoretically, a one-time pad is perfect if the key is random, as long as the message, and never reused — which is why it is impractical. Computational AEAD is the engineering substitute.

<ComparisonTable
  headers={['Primitive', 'Auth', 'Nonce rule', 'Use']}
  rows={[
    ['AES-GCM', 'Yes', 'Unique per key', 'TLS, storage'],
    ['ChaCha20-Poly1305', 'Yes', 'Unique per key', 'Mobile, software TLS'],
    ['AES-CBC', 'No', 'Random IV', 'Legacy only'],
    ['XOR with password', 'No', 'n/a', 'Never'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from cryptography.hazmat.primitives.ciphers.aead import ChaCha20Poly1305
import os

key = os.urandom(32)
aead = ChaCha20Poly1305(key)
nonce = os.urandom(12)
ct = aead.encrypt(nonce, b'payload', b'route=/v1/orders')
pt = aead.decrypt(nonce, ct, b'route=/v1/orders')
TICK3

AAD binds context (tenant id, path) so a ciphertext cannot be replayed onto a different operation.

## 4. Visualizations

TICK3mermaid
flowchart LR
    PT[Plaintext] --> AEAD[AES-GCM or ChaCha20-Poly1305]
    K[Shared key] --> AEAD
    N[Nonce] --> AEAD
    A[AAD] --> AEAD
    AEAD --> CT[Ciphertext plus tag]
TICK3

## 5. Interview Prep

**Q: Symmetric vs asymmetric?**
**A:** Symmetric is fast and needs a shared secret. Asymmetric is slow and solves bootstrapping and signatures. Real systems use both.

**Q: Why is nonce uniqueness so important?**
**A:** Repeated GCM nonces leak the auth key and the XOR of plaintexts. Design a uniqueness scheme before you ship.

**Q: Can I use the same key for HMAC and AES?**
**A:** Derive two keys with HKDF. Key reuse across algorithms is a classic foot-gun.

## 6. Production Use Cases

- **TLS record layer** after the handshake.
- **Disk and backup** encryption.
- **Application field** encryption with KMS-wrapped data keys.

<Callout icon="tip" title="Prefer ChaCha20-Poly1305 on low-end CPUs without AES-NI">
Same security goal as AES-GCM, better software performance. On servers with AES-NI, GCM is usually faster.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/TLS handshake/index.mdx',
    title: 'TLS Handshake',
    description:
      'How TLS 1.3 agrees authenticated session keys in one round trip and then protects application bytes with AEAD.',
    body: `
The **TLS handshake** authenticates the server (and optionally the client), negotiates algorithms, and derives AEAD keys so the rest of the connection is confidential and tamper-evident. **TLS 1.3** is the version you should deploy: fewer messages, mandatory forward secrecy, old ciphers gone.

## 1. Deep Dive and Mechanics

ClientHello carries supported cipher suites, key shares (X25519 / P-256 / ML-KEM hybrids), and SNI. ServerHello picks the group, returns its key share, and sends the certificate plus a signature over the transcript. Both sides run HKDF to get handshake and application traffic secrets. Application data can start after that one round trip (1-RTT). Optional 0-RTT replayable early data exists and should stay off unless you understand idempotency.

**What the handshake must prevent.** Downgrade to weak suites, impersonation without a valid cert, and silent stripping of authentication. Finished messages MAC the transcript so an on-path attacker cannot tweak offers after keys are in play.

**Certificates.** The client validates the chain, time, hostname, and usage. Pinning and CT are extra policy.

<Callout icon="warning" title="TLS in front of HTTP is not optional seasoning">
Without a verified handshake you have no server identity. A cleartext or blindly accepted cert is a MITM waiting to happen.
</Callout>

## 2. Mathematical / Theoretical Foundation

TLS 1.3's key schedule is a sequence of HKDF-Extract/Expand steps bound to the transcript hash. Security proofs (in the computational model) argue that if the DH group, signatures, HKDF, and AEAD are sound, the record keys are secret from a network adversary. 0-RTT is outside that guarantee because those keys are replayable.

<ComparisonTable
  headers={['Version', 'Forward secrecy', 'Handshake RTTs', 'Deploy']}
  rows={[
    ['TLS 1.0 / 1.1', 'Optional', '2', 'Disable'],
    ['TLS 1.2', 'If DHE/ECDHE', '2', 'Only if 1.3 impossible'],
    ['TLS 1.3', 'Yes', '1', 'Default'],
    ['QUIC / HTTP3', 'Yes (TLS 1.3 crypto)', '0-1', 'Modern edge'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import ssl
import socket

ctx = ssl.create_default_context()
ctx.minimum_version = ssl.TLSVersion.TLSv1_3
with socket.create_connection(('example.com', 443)) as sock:
    with ctx.wrap_socket(sock, server_hostname='example.com') as tls:
        cert = tls.getpeercert()
        tls.sendall(b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n')
TICK3

Never set CERT_NONE in production. Always pass the hostname you intend.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: ClientHello + key share
    S->>C: ServerHello + key share
    S->>C: Certificate + CertificateVerify
    S->>C: Finished
    C->>S: Finished
    C->>S: AEAD application data
TICK3

## 5. Interview Prep

**Q: What does SNI leak?**
**A:** The target hostname in the first ClientHello is often still cleartext unless Encrypted Client Hello is deployed. Certs after ServerHello are encrypted in 1.3.

**Q: Why disable TLS 1.0?**
**A:** Old ciphers, BEAST-class history, no modern AEAD mandate, compliance requirements.

**Q: mTLS versus TLS?**
**A:** mTLS adds a client certificate so the server authenticates the caller with PKI, not only a password or bearer token.

## 6. Production Use Cases

- **HTTPS** for browsers and APIs.
- **Database and mesh** connections (don't run Postgres in cleartext across a VPC you do not fully trust).
- **Mail (STARTTLS)** with strict verification, not opportunistic.

<Callout icon="tip" title="Terminate TLS in one well-tested library">
Language defaults plus a modern version floor beat a custom handshake. Keep openssl / boringssl patched.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/Zero-knowledge proofs/index.mdx',
    title: 'Zero-Knowledge Proofs',
    description:
      'Protocols that prove a statement is true without revealing the secret witness behind it.',
    body: `
A **zero-knowledge proof (ZKP)** lets a prover convince a verifier that a statement is true without handing over the witness. Classic example: prove you know a discrete log, or that a transaction is well-formed, without revealing the key or the amounts. SNARKs and STARKs made this practical enough for blockchains and some identity products.

## 1. Deep Dive and Mechanics

Properties: **completeness** (honest prover wins), **soundness** (cheater fails except with tiny probability), **zero knowledge** (the transcript could have been simulated without the witness). Interactive proofs use challenges. Fiat-Shamir turns them non-interactive with a hash.

**SNARK vs STARK.** SNARKs are small and fast to verify; many need a trusted setup. STARKs are larger, hash-based, and transparent. Both compile a program into a circuit or AIR and prove satisfiability.

**Not magic privacy.** The statement itself can leak (prove I am over 18 still reveals that fact). Public inputs are public. Side channels around proving time still exist.

<Callout icon="info" title="ZK proves a circuit, not your English claim">
If the circuit is wrong, the proof is a precise lie. Audit the gadget, not only the proving system brand.
</Callout>

## 2. Mathematical / Theoretical Foundation

Interactive ZK is a 1980s complexity-theory object (GMR). Modern succinct proofs use polynomial commitments (KZG, FRI), pairings or hashes, and argument systems that are computationally sound rather than statistically sound. Knowledge soundness (extraction) is what you want for "prover knows a witness", not just "statement is true".

<ComparisonTable
  headers={['Family', 'Trusted setup', 'Proof size', 'Typical use']}
  rows={[
    ['Sigma protocols', 'No', 'Small', 'Auth, identity'],
    ['Groth16 SNARK', 'Yes per circuit', 'Tiny', 'Many L2s'],
    ['PLONK / Halo-style', 'Universal or none', 'Small', 'General circuits'],
    ['STARKs', 'No', 'Larger', 'Scalable rollups'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual API: prove that age >= 18 given a signed credential, without sending the birthday.
def prove_over_18(credential, circuit) -> bytes:
    witness = {'dob': credential.dob, 'sig': credential.issuer_sig}
    public = {'issuer_pk': credential.issuer_pk, 'today': today()}
    return circuit.prove(witness, public)
TICK3

Production systems use audited circuits (circom, Noir, Leo, Cairo) and carefully version the verifying key.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant P as Prover
    participant V as Verifier
    P->>P: Witness + public statement
    P->>V: Succinct proof
    V->>V: Check proof against public inputs
    V->>V: Accept or reject
TICK3

## 5. Interview Prep

**Q: ZK vs homomorphic encryption?**
**A:** HE lets a server compute on secrets. ZK lets you prove a property of secrets. Sometimes you combine them.

**Q: Why does trusted setup scare people?**
**A:** Toxic waste from the ceremony could forge proofs if not destroyed. Multi-party ceremonies reduce that risk. Transparent schemes avoid it.

**Q: Are ZK logins a replacement for passwords?**
**A:** They can prove possession of a credential. You still need issuance, revocation, and device binding.

## 6. Production Use Cases

- **Rollups** proving correct state transitions.
- **Anonymous credentials** and age checks.
- **Private solvency** or compliance attestations.

<Callout icon="tip" title="Keep public inputs minimal">
Every public input is a leak and a coupling. Put only what the verifier must bind.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/bcrypt/index.mdx',
    title: 'bcrypt',
    description:
      'Battle-tested password hash based on Blowfish with an explicit cost factor and a huge installed base.',
    body: `
**bcrypt** is a password KDF derived from the Blowfish cipher. It has been in production since the late 1990s, is widely supported, and is still acceptable for existing stores. New systems should prefer Argon2id, but you will inherit bcrypt for years. Know its cost parameter and its **72-byte password limit**.

## 1. Deep Dive and Mechanics

The encoded string looks like TICK1$2b$12$salt....hash...TICK1. The 12 is the cost: 2^12 expensive Blowfish setups. Raise cost as hardware improves. Salt is embedded. Verification uses the same string.

**72-byte cap.** bcrypt silently uses only the first 72 bytes of the password. Long passphrases and some language encodings can truncate. If you must keep bcrypt, pre-hash with SHA-256 only if you understand the double-hash ecosystem — many teams instead migrate to Argon2id.

**Cost 10-12** is a common starting band for interactive login in 2020s hardware; measure on your boxes.

<Callout icon="warning" title="Watch the 72-byte truncation">
Password managers can emit long secrets. Truncation makes two different secrets collide. Test with long inputs.
</Callout>

## 2. Mathematical / Theoretical Foundation

bcrypt's expensive key setup is not memory-hard in the Argon2 sense. GPUs still attack it better than they attack Argon2id at high memory. Its strength is the tunable 2^cost loop and the lack of embarrassing implementation history compared with rolling your own SHA loop. Blowfish's 32-bit nature also makes some ASIC stories different from SHA-256.

<ComparisonTable
  headers={['KDF', 'Memory-hard', 'Max password', 'Recommendation']}
  rows={[
    ['bcrypt', 'No', '72 bytes', 'Maintain, do not start new'],
    ['scrypt', 'Yes', 'Large', 'OK if already in use'],
    ['Argon2id', 'Yes', 'Large', 'New stores'],
    ['PBKDF2', 'No', 'Large', 'FIPS constraint only'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import bcrypt

hashed = bcrypt.hashpw(b'secret', bcrypt.gensalt(rounds=12))
ok = bcrypt.checkpw(b'secret', hashed)
TICK3

On success, if rounds is below your current policy, rehash and store the new string.

## 4. Visualizations

TICK3mermaid
flowchart TD
    PW[Password bytes] --> Cap[First 72 bytes]
    Cap --> Exp[Expensive Blowfish setup 2^cost]
    Salt[Embedded salt] --> Exp
    Exp --> Enc[Encoded 2b string]
TICK3

## 5. Interview Prep

**Q: Why is bcrypt still everywhere?**
**A:** It arrived early, is simple, and is "good enough" if cost is kept modern. Inertia plus compatibility.

**Q: bcrypt vs Argon2id in an interview?**
**A:** Say Argon2id for new work (memory-hard, no 72-byte cap). Say bcrypt is fine to keep with a cost bump and a migration plan.

**Q: What does a cost bump do to attackers?**
**A:** Each +1 doubles defender and attacker CPU time. Memory-hard KDFs also raise RAM cost.

## 6. Production Use Cases

- **Legacy user tables** in Rails, Django, Node apps.
- **On-login migration** from bcrypt to Argon2id.
- **Low-dependency** environments where bcrypt is the only audited binding.

<Callout icon="tip" title="Log the cost you verify, not the password">
Metrics on hash time and cost distribution tell you when to rotate parameters. Never log the secret.
</Callout>
`,
  },
  {
    rel: '42.1 Cryptography/scrypt/index.mdx',
    title: 'scrypt',
    description:
      'Memory-hard password KDF by Percival, used in some wallets and older stores, ancestor of the Argon2 design space.',
    body: `
**scrypt** (Colin Percival, 2009) was designed so that cracking passwords needs lots of RAM, not just ASICs that grind SHA-256. It feeds PBKDF2-HMAC-SHA256 around a large ROMix memory array. You will meet it in older services and in cryptocurrency wallet encryption. New password stores should still prefer Argon2id, which won a later open competition.

## 1. Deep Dive and Mechanics

Parameters: **N** (CPU/memory cost, power of two), **r** (block size), **p** (parallelization), plus a salt. Memory use is roughly 128 * N * r bytes. Common interactive starting points look like N=2^14, r=8, p=1 (about 16 MiB) — measure before you copy numbers.

**DoS risk.** If you let clients pick N, they can exhaust your login workers. Server policy owns parameters. Store them in the encoded verifier.

**Wallets.** Bitcoin Core-style wallet encryption historically used scrypt. Those parameters are a different threat model (offline file, user-chosen passphrase) than a high-QPS web login.

<Callout icon="info" title="scrypt is still a real KDF">
It is not obsolete in the MD5 sense. It is simply no longer the default recommendation for greenfield password tables.
</Callout>

## 2. Mathematical / Theoretical Foundation

ROMix is sequentially memory-hard: the next block depends on a random-looking earlier block, so you cannot easily trade memory for cheap parallelism. The original paper targets the memory-time product. Argon2 later refined side-channel and GPU trade-off stories, which is why PHC picked it.

<ComparisonTable
  headers={['KDF', 'Year', 'Memory-hard', 'Default now']}
  rows={[
    ['PBKDF2', '2000', 'No', 'FIPS only'],
    ['scrypt', '2009', 'Yes', 'Legacy / wallets'],
    ['bcrypt', '1999', 'Limited', 'Legacy web'],
    ['Argon2id', '2015', 'Yes', 'New web'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import os
from hashlib import scrypt

salt = os.urandom(16)
verifier = scrypt(b'correct-horse', salt=salt, n=2**14, r=8, p=1, dklen=32)
TICK3

Use hmac.compare_digest when you store a raw digest. Prefer libraries that emit a single encoded string with parameters.

## 4. Visualizations

TICK3mermaid
flowchart LR
    PW[Password] --> PBK1[PBKDF2 init]
    Salt[Salt] --> PBK1
    PBK1 --> RO[ROMix large V array]
    RO --> PBK2[PBKDF2 finish]
    PBK2 --> DK[Derived key]
TICK3

## 5. Interview Prep

**Q: Why memory-hard?**
**A:** Custom hashing chips have lots of compute and little RAM per core. Forcing large RAM per guess raises attacker capital cost.

**Q: scrypt vs Argon2id?**
**A:** Same goal. Argon2id is newer, better parameterized, and the current default. scrypt is fine to keep if already deployed.

**Q: What happens if N is not a power of two?**
**A:** The algorithm requires it. Libraries should reject bad N rather than silently rounding.

## 6. Production Use Cases

- **Wallet and backup** passphrase stretching.
- **Inherited web** password columns.
- **KDF for wrapping** a data key when Argon2 is unavailable.

<Callout icon="tip" title="Cap wall-clock time on the login path">
A huge N protects stolen dumps and wrecks your p99 latency. Split "interactive login" parameters from "offline archive" parameters.
</Callout>
`,
  },
]
