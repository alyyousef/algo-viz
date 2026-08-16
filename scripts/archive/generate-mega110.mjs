import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '55. Blockchain & Web3/Tokens (ERC-20/index.mdx': `---
title: Tokens (ERC-20)
description: A standard for creating and issuing smart contracts on the Ethereum blockchain that can be used to implement tokens.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ERC-20 Tokens">

If you want to create your own cryptocurrency (like "BobCoin"), you biologically do not need to build your own blockchain like Bitcoin. 

You can mathematically launch it as a **Token** on top of Ethereum using the **ERC-20** standard.

<Callout icon="success" title="The Standardized API">
  ERC-20 is mathematically nothing more than an interface standard. 
  
  It dictates that your Smart Contract must implement 6 specific mathematical functions (e.g., \`totalSupply()\`, \`balanceOf()\`, \`transfer()\`). Because all tokens mathematically share this exact same API, cryptocurrency exchanges (like Coinbase) can instantly list your token without writing any custom code. BobCoin mathematically lives inside a mapping of \`{ Address: Balance }\` within a single Ethereum smart contract.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/ERC-721/index.mdx': `---
title: ERC-721
description: A free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ERC-721 (Non-Fungible Tokens)">

ERC-20 tokens are mathematically **Fungible**. Every single BobCoin is identical to every other BobCoin. 

But what if you want to mathematically represent a unique piece of digital art, or the deed to a physical house?

<Callout icon="info" title="The Unique Identifier">
  **ERC-721** introduced the mathematical concept of Non-Fungibility.
  
  Instead of a balance mapping (\`Alice has 50 coins\`), an ERC-721 contract maintains a mapping of unique IDs (\`Alice owns Token #402\`). Every single token mathematically has a unique ID, making it impossible to mutually interchange them.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/ERC-1155)/index.mdx': `---
title: ERC-1155
description: A multi-token standard that allows a single smart contract to manage multiple token types.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ERC-1155 (Multi-Token Standard)">

In a massive video game, you might have Fungible tokens (10,000 Gold Coins) and Non-Fungible tokens (1 Unique Excalibur Sword). 

Historically, you would have to deploy two separate Smart Contracts (an ERC-20 and an ERC-721). 

<Callout icon="tip" title="The Multi-Token Efficiency">
  **ERC-1155** (invented by Enjin) mathematically combines both standards into a single contract.
  
  You can mint 10,000 Gold Coins and 1 Excalibur Sword in a single mathematical transaction, drastically reducing the Gas fees and completely unifying the gaming inventory system into one highly optimized Smart Contract.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/NFTs/index.mdx': `---
title: NFTs
description: A unique digital identifier that is recorded on a blockchain, and is used to certify ownership and authenticity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NFTs (Non-Fungible Tokens)">

An **NFT** is the biological consumer term for an ERC-721 or ERC-1155 token.

While the general public associates NFTs with expensive JPEGs of monkeys, the mathematical reality is far more profound.

<Callout icon="warning" title="The Pointer Flaw">
  An NFT almost never mathematically stores the actual JPEG image on the blockchain, because saving a 5MB image to the Ethereum database would cost $50,000 in Gas fees.
  
  Instead, the NFT mathematically stores a **URI Pointer** (a URL string) to an external server or IPFS node where the image actually lives. You do not mathematically own the JPEG; you mathematically own a cryptographically signed receipt that points to the JPEG.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/DeFi/index.mdx': `---
title: DeFi
description: Decentralized finance offers financial instruments without relying on intermediaries such as brokerages, exchanges, or banks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DeFi (Decentralized Finance)">

If you want to borrow $10,000 from a bank, you must biologically prove your identity, provide a credit score, and sign physical papers. The bank mathematically takes a 5% cut for their labor.

**DeFi** mathematically replaces the entire biological bank with a Smart Contract.

<Callout icon="success" title="Automated Market Makers">
  In DeFi protocols like Aave or Uniswap, the code mathematically holds $1 Billion in liquidity provided by anonymous strangers. 
  
  If you deposit $20,000 of Bitcoin into the Smart Contract as collateral, the contract mathematically evaluates the price via an Oracle, and instantly loans you $10,000 in Stablecoins. There are zero humans involved, zero credit checks, and the transaction settles globally in 12 seconds.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/DAOs/index.mdx': `---
title: DAOs
description: A decentralized autonomous organization is an organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DAOs (Decentralized Autonomous Organizations)">

How do you biologically manage a corporation without a CEO, a Board of Directors, or a legal jurisdiction?

You form a **DAO**.

<Callout icon="info" title="Mathematical Governance">
  A DAO is a corporation where the bylaws are mathematically hard-coded into an Ethereum Smart Contract.
  
  The Smart Contract holds the corporate treasury (e.g., $500 Million). To spend that money, users who hold "Governance Tokens" must mathematically submit an on-chain vote. If 51% of tokens vote "Yes", the Smart Contract automatically, autonomously executes the transfer of funds. Human executives are mathematically replaced by cryptographic consensus.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Wallets/index.mdx': `---
title: Wallets
description: A software program or hardware device that stores the public and private keys required to interact with a blockchain network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Crypto Wallets">

The term "Wallet" is biologically inaccurate. A wallet does not physically hold your money. Your money mathematically exists on the public blockchain.

A **Wallet** (like MetaMask or Ledger) is simply a mathematical Key Management system.

<Callout icon="warning" title="The Private Key">
  A Wallet generates and mathematically stores your **Private Key** (usually represented as a 12-word Seed Phrase). 
  
  When you want to send money, the Wallet uses your Private Key to mathematically sign the transaction before broadcasting it to the network. If you biologically lose your Seed Phrase, the cryptography guarantees that you mathematically lose access to the funds forever. There is no "Forgot Password" button in Web3.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Web3.js-Ethers.js/index.mdx': `---
title: Web3.js & Ethers.js
description: JavaScript libraries that allow developers to interact with a local or remote Ethereum node using HTTP, IPC or WebSocket.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Web3.js & Ethers.js"
  subtitle="The Frontend bridges to the Blockchain"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png"
  description="These are the standard JavaScript SDKs mathematically required to connect a React web application (the Frontend) to an Ethereum Smart Contract (the Backend)."
  yearCreated={2015}
  creator="Ethereum Foundation / RicMoo"
  isOpenSource={true}
  websiteUrl="https://docs.ethers.org/v6/"
>

If a user visits your React website and wants to click a "Mint NFT" button, React mathematically cannot talk directly to the Ethereum blockchain.

The user must install a browser extension (like MetaMask). **Ethers.js** mathematically detects MetaMask (via the \`window.ethereum\` object), constructs the exact hexadecimal payload required to call the \`mint()\` function on the Smart Contract, and prompts the user's wallet to mathematically sign the transaction.

</TechnologyTemplate>
`,
  '55. Blockchain & Web3/Oracles (Chainlink)/index.mdx': `---
title: Oracles (Chainlink)
description: A decentralized oracle network that provides reliable, tamper-proof inputs and outputs for complex smart contracts on any blockchain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Oracles (Chainlink)">

A Smart Contract is mathematically blind. It biologically cannot execute an HTTP \`fetch()\` request to the internet. 

If a Smart Contract is a DeFi lending protocol, it needs to know the current price of Apple Stock to execute a liquidation. How does it get this data?

<Callout icon="success" title="The Oracle Solution">
  It uses an **Oracle** (like Chainlink). 
  
  An Oracle is a decentralized network of off-chain servers that biologically read the internet (e.g., checking Bloomberg for the Apple Stock price). They reach a mathematical consensus on the price, and then mathematically write that price *into* the blockchain as a transaction. The Smart Contract can now safely read the data locally from the blockchain.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Layer 2 solutions/index.mdx': `---
title: Layer 2 solutions
description: A secondary framework or protocol that is built on top of an existing blockchain system to solve transaction speed and scaling difficulties.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Layer 2 Solutions (L2)">

Ethereum (Layer 1) can mathematically only process ~15 transactions per second globally. During high demand, Gas fees biologically skyrocket to $100 per transaction, making the network completely unusable.

**Layer 2 (L2)** solves this via mathematical off-chain scaling.

<Callout icon="info" title="The Execution Shift">
  Instead of executing the transaction on the slow, expensive Ethereum mainnet, users mathematically execute their transactions on a faster, cheaper secondary network (the L2). 
  
  The L2 network mathematically bundles thousands of these transactions together, compresses them, and periodically submits a single mathematical proof back down to the Ethereum Layer 1, inheriting Ethereum's absolute security while achieving 100x faster speeds.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Sidechains/index.mdx': `---
title: Sidechains
description: A separate blockchain that runs in parallel to mainnet and operates independently.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sidechains">

A **Sidechain** (like Polygon PoS) is often confused with a Layer 2, but it is mathematically fundamentally different.

<Callout icon="warning" title="Independent Security">
  A True Layer 2 mathematically relies on Ethereum for its security. If the Layer 2 nodes all shut down, you can still mathematically extract your funds from Ethereum.
  
  A Sidechain is biologically its own distinct blockchain. It has its own miners, its own consensus mechanism, and its own security model. It simply maintains a two-way "Bridge" to Ethereum. If the Sidechain gets hacked, your money is mathematically gone forever, regardless of how secure Ethereum is.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Rollups (optimistic/index.mdx': `---
title: Optimistic Rollups
description: A type of layer-2 scaling solution that assumes transactions are valid by default and only runs computation via a fraud proof in the event of a challenge.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Optimistic Rollups">

An **Optimistic Rollup** (like Arbitrum or Optimism) is a specific mathematical implementation of a Layer 2.

<Callout icon="tip" title="Innocent Until Proven Guilty">
  The Rollup mathematically executes 10,000 transactions off-chain and submits the final state to Ethereum.
  
  It is called "Optimistic" because it mathematically *assumes* the transactions are valid. It does not provide cryptographic proof upfront. However, there is a 7-day "Challenge Period". If a biological validator catches a fraudulent transaction, they can mathematically submit a "Fraud Proof" to Ethereum. The Rollup is rolled back, and the malicious actor's financial stake is mathematically slashed.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/zk)/index.mdx': `---
title: zk-Rollups
description: A layer 2 scaling solution that uses zero-knowledge proofs to bundle hundreds of transactions off-chain and generate a cryptographic proof of validity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zero-Knowledge Rollups (zk-Rollups)">

While Optimistic Rollups require a 7-day waiting period for biological fraud challenges, **zk-Rollups** use pure, terrifying mathematics to guarantee absolute immediate security.

<Callout icon="success" title="Zero-Knowledge Proofs (ZKPs)">
  A zk-Rollup (like zkSync or Starknet) executes 10,000 transactions off-chain.
  
  Instead of assuming they are valid, the L2 mathematically generates a **SNARK** (a Zero-Knowledge Proof). This is a tiny mathematical equation that biologically proves that all 10,000 transactions were executed correctly, without actually revealing the data of the transactions. 
  
  When Ethereum receives the SNARK, it can mathematically verify the proof in 5 milliseconds. Because the math is absolute, there is no 7-day challenge period. Withdrawals are instant.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Cross-chain bridges/index.mdx': `---
title: Cross-chain bridges
description: Protocols that connect two blockchains to enable interactions between them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Chain Bridges">

If you have 10 Bitcoin, and you want to use them in an Ethereum DeFi protocol, you face a biological physics problem: The Bitcoin network and the Ethereum network mathematically cannot communicate with each other.

You must use a **Cross-Chain Bridge**.

<Callout icon="warning" title="The Locking Mechanism">
  A Bridge mathematically works like this:
  1. You send 10 BTC to a specific Smart Contract on the Bitcoin network. The contract mathematically "Locks" your BTC.
  2. A centralized (or decentralized) Oracle network detects this.
  3. The Oracle tells an Ethereum Smart Contract to mathematically "Mint" 10 Wrapped Bitcoin (WBTC) on the Ethereum network.
  
  Bridges are the absolute weakest biological link in Web3. If a hacker finds a bug in the Ethereum minting contract, they can mint 50,000 WBTC out of thin air, completely crashing the ecosystem. Bridges account for over $2 Billion in mathematical hacks to date.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega110() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega110().catch(console.error)
