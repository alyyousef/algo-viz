import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '55. Blockchain & Web3/Blockchain fundamentals/index.mdx': `---
title: Blockchain fundamentals
description: A decentralized, distributed, and oftentimes public, digital ledger consisting of records called blocks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Blockchain Fundamentals">

A Blockchain is mathematically nothing more than an incredibly inefficient, append-only Linked List.

If it is so inefficient, why use it? Because it solves the mathematical problem of **Trust**.

<Callout icon="info" title="The Byzantine Generals Problem">
  In a traditional database (like MySQL), the company that owns the server has absolute biological authority. They can mathematically edit your bank balance from $100 to $0 without your permission.
  
  A Blockchain mathematically removes the central authority. The database is copied across 10,000 different physical computers (nodes) owned by strangers. If one stranger tries to maliciously alter your bank balance to $0, the other 9,999 computers mathematically vote to reject the fraudulent change.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Distributed ledgers/index.mdx': `---
title: Distributed ledgers
description: A consensus of replicated, shared, and synchronized digital data geographically spread across multiple sites, countries, or institutions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Ledger Technology (DLT)">

A **Distributed Ledger** is the mathematical parent category of the Blockchain. 

While all Blockchains are distributed ledgers, *not* all distributed ledgers are blockchains.

<Callout icon="tip" title="Enterprise Private Ledgers">
  A public Blockchain (like Bitcoin) is completely open. Anyone can mathematically join the network.
  
  However, massive enterprises (like JPMorgan Chase) cannot biologically share their transaction data with the public. They use **Permissioned Distributed Ledgers** (like Hyperledger Fabric). The database is distributed across 5 different known banks, but the general public is mathematically locked out. It provides the cryptographic auditing of a blockchain without the privacy risks.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Hashing/index.mdx': `---
title: Hashing
description: The process of transforming any given key or a string of characters into another value.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cryptographic Hashing">

How do you mathematically guarantee that a block of data has not been secretly modified?

You run the data through a Cryptographic Hash Function (like **SHA-256**).

<Callout icon="success" title="The Avalanche Effect">
  If you hash the entire text of the Harry Potter book, it generates exactly 64 random characters (e.g., \`4f8b...\`). 
  
  If a hacker changes a *single comma* on page 300, and re-hashes the book, the resulting 64 characters will be mathematically completely different (e.g., \`9a2c...\`).
  
  In a Blockchain, Block 2 contains the mathematical Hash of Block 1. Block 3 contains the Hash of Block 2. If a hacker tries to biologically alter a transaction in Block 1, the Hash changes, instantly invalidating the entire mathematical chain forever.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Merkle trees/index.mdx': `---
title: Merkle trees
description: A tree in which every leaf node is labelled with the cryptographic hash of a data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Merkle Trees">

A single Bitcoin block might contain 4,000 transactions. How does a node mathematically verify that Transaction #238 is valid without biologically downloading all 4,000 transactions?

They use a **Merkle Tree**.

<Callout icon="info" title="The Root Hash">
  A Merkle Tree is a mathematical binary tree of hashes.
  1. You hash every transaction individually (the leaves).
  2. You combine Hash 1 and Hash 2, and hash them together.
  3. You repeat this all the way up the tree until you get a single, 64-character **Merkle Root**.
  
  This Root is stored in the Block Header. To prove Transaction #238 is valid, you only need to download 12 specific hashes (the mathematical path up the tree) instead of all 4,000 transactions. This mathematically enables **Lightweight Wallets** on mobile phones.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Consensus mechanisms (PoW/index.mdx': `---
title: Consensus mechanisms (PoW)
description: Proof of work is a form of cryptographic zero-knowledge proof in which one party proves to others that a certain amount of a specific computational effort has been expended.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Proof of Work (PoW)">

If 10,000 anonymous strangers on the internet are maintaining a database, who gets to decide what data is written to the next block?

If anyone can write, a hacker could simply create 50,000 fake computers to instantly outvote the network (a Sybil Attack).

<Callout icon="warning" title="Thermodynamic Security">
  **Proof of Work** mathematically solves this by tying voting power to physics.
  
  To write a block to the Bitcoin network, you must mathematically guess a random number (a Nonce) that generates a specific SHA-256 hash. Because hashing is random, the only way to find the number is to biologically burn massive amounts of electricity guessing trillions of times per second. 
  
  A hacker cannot create 50,000 fake computers; they must physically purchase 50,000 real GPUs and pay the electric bill.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/PoS/index.mdx': `---
title: PoS
description: Proof of stake is a type of consensus mechanism used by blockchain networks to achieve distributed consensus.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Proof of Stake (PoS)">

Proof of Work mathematically secures the network, but it biologically burns as much electricity as the entire country of Argentina.

**Proof of Stake (PoS)** is the mathematically superior, energy-efficient successor used by Ethereum.

<Callout icon="success" title="Financial Security">
  Instead of burning electricity to prove you are honest, you mathematically lock up a massive financial deposit (a "Stake")—for example, 32 ETH ($100,000).
  
  The network randomly selects you to write the next block. If you write an honest block, you are paid a reward. If you attempt to write a malicious, fraudulent transaction, the network mathematically executes a **Slashing Penalty** and instantly deletes your $100,000 deposit from existence. You are kept honest by pure biological financial terror.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/DPoS/index.mdx': `---
title: DPoS
description: Delegated Proof of Stake is a consensus mechanism in which users can vote for delegates who will be responsible for validating transactions and creating new blocks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Delegated Proof of Stake (DPoS)">

Standard PoS is mathematically highly decentralized, but relatively slow because you still have to wait for thousands of nodes to agree.

**Delegated Proof of Stake (DPoS)** mathematically sacrifices extreme decentralization for extreme speed.

<Callout icon="info" title="The Representative Democracy">
  In DPoS (used by EOS or Tron), the thousands of network users mathematically vote for a very small number of "Delegates" (e.g., 21 master nodes).
  
  Because there are only exactly 21 physical servers writing blocks, the network can mathematically process 4,000 transactions per second (compared to Ethereum's 15 TPS). If a Delegate acts maliciously, the users biologically vote them out in the next cycle and replace them.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/PBFT)/index.mdx': `---
title: PBFT
description: Practical Byzantine Fault Tolerance is an algorithm that optimizes Byzantine Fault Tolerance for primary (or master) node systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Practical Byzantine Fault Tolerance (PBFT)">

Unlike PoW or PoS (which are public blockchains), what consensus mechanism do you use for a Private Enterprise blockchain where all nodes are known entities?

You use **PBFT**.

<Callout icon="tip" title="The Mathematical Two-Thirds Majority">
  PBFT mathematically assumes that nodes might fail or be compromised by a virus, but it does not require burning electricity or locking up financial stakes.
  
  Instead, the nodes mathematically send messages back and forth in a strict multi-phase voting protocol (Pre-prepare, Prepare, Commit). The protocol mathematically guarantees that as long as **less than 1/3** of the nodes are malicious, the network will biologically reach absolute consensus. It is blazingly fast but mathematically cannot scale beyond ~100 nodes due to the massive network traffic of the voting phases.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Bitcoin/index.mdx': `---
title: Bitcoin
description: The first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Bitcoin (BTC)"
  subtitle="The genesis of Decentralized Finance"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/512px-Bitcoin.svg.png"
  description="Invented in 2008 by the anonymous Satoshi Nakamoto, Bitcoin mathematically proved that digital scarcity could exist without a central bank."
  yearCreated={2009}
  creator="Satoshi Nakamoto"
  isOpenSource={true}
  websiteUrl="https://bitcoin.org/"
>

Bitcoin is mathematically designed to be slow, rigid, and stupid. 

<Callout icon="warning" title="Turing Incompleteness">
  Unlike modern blockchains, Bitcoin is mathematically **Turing Incomplete**. 
  
  You cannot write complex "Smart Contracts" on Bitcoin. You cannot easily loop code. This was a deliberate biological design choice by Satoshi. By making the scripting language incredibly limited, the attack surface is mathematically minimized to near-zero. It does exactly one thing—transfer value securely—and it does it perfectly.
</Callout>

</TechnologyTemplate>
`,
  '55. Blockchain & Web3/Ethereum/index.mdx': `---
title: Ethereum
description: A decentralized, open-source blockchain with smart contract functionality.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Ethereum (ETH)"
  subtitle="The World Computer"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/512px-Ethereum_logo_2014.svg.png"
  description="If Bitcoin is a decentralized calculator, Ethereum is a decentralized MacBook. It introduced the mathematical concept of Smart Contracts."
  yearCreated={2015}
  creator="Vitalik Buterin"
  isOpenSource={true}
  websiteUrl="https://ethereum.org/"
>

Ethereum mathematically solved Bitcoin's limitation by inventing the **EVM (Ethereum Virtual Machine)**.

<Callout icon="success" title="The World Computer">
  The EVM is a **Turing Complete** virtual computer that runs simultaneously across 10,000 physical servers globally.
  
  Developers can write mathematical logic (e.g., *"If Alice's flight is delayed, automatically send her $500"*). Once this code is deployed to Ethereum, it cannot be biologically stopped, paused, or censored by any government or corporation on Earth.
</Callout>

</TechnologyTemplate>
`,
  '55. Blockchain & Web3/Smart contracts/index.mdx': `---
title: Smart contracts
description: Computer programs or transaction protocols which are intended to automatically execute, control or document legally relevant events and actions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Smart Contracts">

The term "Smart Contract" is biologically misleading. They are not legally binding, and they are not inherently "smart".

They are simply mathematical **Backend APIs deployed to a Blockchain**.

<Callout icon="info" title="The Vending Machine Metaphor">
  A smart contract is a mathematical vending machine.
  
  It is a piece of code holding state and functions. You send a specific cryptographic transaction to its address (inserting a coin), the code executes exactly as written (releasing a soda), and mathematically updates its internal database. Because it is deployed on a blockchain, the code is **Immutable**—once deployed, not even the original developer can edit the code to steal your money.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/Solidity/index.mdx': `---
title: Solidity
description: An object-oriented, high-level language for implementing smart contracts.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Solidity"
  subtitle="The language of Ethereum"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solidity_logo.svg/512px-Solidity_logo.svg.png"
  description="Solidity is a statically-typed, curly-brace programming language mathematically designed to target the Ethereum Virtual Machine (EVM)."
  yearCreated={2014}
  creator="Gavin Wood"
  isOpenSource={true}
  websiteUrl="https://soliditylang.org/"
>

Solidity looks biologically similar to JavaScript or C++, but its mathematical execution environment is terrifying.

If you write a bug in a React application, a user's screen goes blank. If you write a bug in a Solidity contract, a hacker biologically steals $50,000,000 from your users, and because the blockchain is immutable, the money is mathematically gone forever with zero legal recourse.

</TechnologyTemplate>
`,
  '55. Blockchain & Web3/Gas optimisation/index.mdx': `---
title: Gas optimisation
description: The practice of reducing the amount of computational effort (gas) required to execute smart contracts on the Ethereum network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gas Optimisation">

Because Ethereum is a global, shared computer, space is mathematically limited. If a developer wrote an infinite \`while(true)\` loop, it would crash the entire global network.

To prevent this, Ethereum invented **Gas**.

<Callout icon="warning" title="The Financial Cost of Math">
  Every single mathematical operation in Solidity costs real biological money.
  
  Adding two numbers costs 3 Gas. Writing a string to the database costs 20,000 Gas. The user must mathematically pay this Gas fee in ETH to execute your contract.
  
  **Gas Optimisation** is the discipline of rewriting code to be mathematically cheaper. For example, storing an array of 50 integers in the EVM database might cost a user $400 in transaction fees. Moving that logic off-chain or packing the integers into a single \`uint256\` can reduce the fee to $5.
</Callout>

</ConceptTemplate>
`,
  '55. Blockchain & Web3/MEV/index.mdx': `---
title: MEV
description: Maximal Extractable Value refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Maximal Extractable Value (MEV)">

When you submit a transaction to Ethereum (e.g., buying a token on Uniswap), it does not mathematically execute instantly. It biologically sits in a public waiting room called the **Mempool**.

<Callout icon="warning" title="The Front-Running Crisis">
  Because the Mempool is public, predatory bots mathematically scan it. 
  
  If a bot sees you are about to buy $100,000 of a token (which will biologically drive the price up), the bot mathematically executes a transaction to buy the token *first*, by paying a higher Gas bribe to the miner. The bot buys the token, your transaction executes (driving the price up), and the bot instantly sells the token back to you for a massive profit.
  
  This invisible mathematical theft is known as **MEV (Maximal Extractable Value)**, and it drains billions of dollars from retail users every year.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega109() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega109().catch(console.error)
