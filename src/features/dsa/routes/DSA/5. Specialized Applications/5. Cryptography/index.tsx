import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const primitives = [
  {
    title: 'Symmetric encryption (AES-GCM/ChaCha20-Poly1305)',
    detail:
      'Authenticated encryption (AEAD) gives confidentiality and integrity. Never reuse nonces; include associated data (AAD) such as headers in the MAC.',
  },
  {
    title: 'Hashing and MACs',
    detail:
      'SHA-2/SHA-3 for hashing; HMAC for keyed integrity. Use HKDF to stretch shared secrets into strong, labeled keys.',
  },
  {
    title: 'Public-key crypto',
    detail:
      'Elliptic curves (X25519/Ed25519) for key exchange and signatures; RSA for compatibility. Prefer modern curves and short key lifetimes.',
  },
  {
    title: 'Key derivation',
    detail:
      'PBKDF2/scrypt/Argon2 turn passwords into keys by adding work and memory cost. Always salt; size work factor for your threat model.',
  },
  {
    title: 'Randomness',
    detail:
      'Use CSPRNGs only; seed from the OS. Poor entropy breaks everything—never invent your own RNG.',
  },
]

const protocols = [
  {
    title: 'Key exchange and agreement',
    detail:
      'Ephemeral Diffie-Hellman (ECDHE/X25519) provides forward secrecy. Authenticate peers with certificates or pre-shared keys plus identity binding.',
  },
  {
    title: 'Authentication and signatures',
    detail:
      'Ed25519 or ECDSA for speed and short keys; RSA only when needed. Sign structured, canonicalized messages to prevent replay or confusion.',
  },
  {
    title: 'Transport security (TLS-like)',
    detail:
      'Mutual authentication when possible; validate cert chains and hostnames; pin roots cautiously. Use modern cipher suites and disable renegotiation pitfalls.',
  },
  {
    title: 'Nonce and IV management',
    detail:
      'AEAD nonces must be unique per key. Use counters or random 96-bit nonces with collision analysis; never repeat after key rotation.',
  },
  {
    title: 'Data at rest',
    detail:
      'Encrypt with AEAD; store keys in HSM/KMS; include versioned key IDs and per-object nonces. Add integrity tags over ciphertext and metadata.',
  },
]

const playbooks = [
  {
    title: 'Designing a secure API client',
    steps: [
      'Use HTTPS with cert validation and sane timeouts; pin service identities where allowed.',
      'Authenticate with short-lived tokens (JWT/OAuth) and refresh securely; avoid long-lived static secrets on devices.',
      'Encrypt and MAC request bodies where transport termination is untrusted; include replay protection (nonces/timestamps).',
    ],
  },
  {
    title: 'Secret handling in services',
    steps: [
      'Keep secrets out of logs and traces; redact by default.',
      'Fetch secrets from KMS at startup and cache minimally; rotate keys with dual-read/write during migration.',
      'Zeroize sensitive buffers when done; restrict access by role and environment.',
    ],
  },
  {
    title: 'Storing user passwords',
    steps: [
      'Use Argon2id or scrypt with per-user salt; set parameters for ~100ms server-side cost.',
      'Store algorithm parameters with the hash; migrate to stronger params opportunistically on login.',
      'Rate-limit authentication attempts and add multi-factor for high-risk actions.',
    ],
  },
  {
    title: 'Key rotation and lifecycle',
    steps: [
      'Tag ciphertext with key IDs; support decrypt-with-old/encrypt-with-new during rotation.',
      'Rotate symmetric keys regularly and on incident; rotate certificates before expiry with overlap.',
      'Audit key usage and revoke compromised credentials quickly; test recovery from lost keys.',
    ],
  },
]

const guardrails = [
  'Avoid custom crypto; use vetted libraries and modern primitives.',
  'Never reuse nonces or IVs with the same key; enforce uniqueness in code.',
  'Validate certificates and hostnames; reject downgrade attempts and weak cipher suites.',
  'Keep secrets out of client-side storage when possible; encrypt at rest and in transit by default.',
  'Run periodic pen tests and chaos drills for key loss, replay, and tampering scenarios.',
]

export default function CryptographyPage(): JSX.Element {
  return (
    <TopicLayout
      title="Cryptography"
      subtitle="Algorithms for secrecy and integrity"
      intro="Use well-tested primitives, manage keys carefully, and design protocols that fail safe. Most breaks come from misuse, not the math."
    >
      <TopicSection heading="Core primitives">
        <div className="grid gap-3 md:grid-cols-2">
          {primitives.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Protocol building blocks">
        <div className="grid gap-3 md:grid-cols-2">
          {protocols.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Operational playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {playbooks.map((play) => (
            <article key={play.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{play.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {play.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
