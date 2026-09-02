import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Zoho/index.mdx': `---
title: Zoho
description: "A comprehensive suite of online productivity tools and SaaS applications designed to run entire businesses, acting as a massive competitor to Google Workspace and Salesforce."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Zoho"
  subtitle="The All-in-One Business SaaS"
  tags={['Enterprise IT', 'SaaS', 'ERP', 'CRM']}
>

While tech giants like Microsoft and Google dominate the enterprise space, **Zoho** is a massive, highly successful underdog that provides almost every single software application a small-to-medium business (SMB) could possibly need, entirely from a single vendor.

## 1. The Zoho Ecosystem

Zoho's philosophy is "The Operating System for Business." Instead of buying Salesforce for CRM, Slack for chat, Google for email, and QuickBooks for accounting, a company can purchase **Zoho One**.
It includes over 50 integrated applications:
- **Zoho CRM**: Their flagship product, tracking sales pipelines and customer data.
- **Zoho Books**: Full double-entry accounting software.
- **Zoho Desk**: A customer support ticketing system (similar to Zendesk).
- **Zoho Creator**: A low-code platform allowing companies to build custom internal apps.

## 2. The Architectural Advantage (Integration)

In enterprise IT, integrating different SaaS platforms is a nightmare. If a salesperson closes a deal in Salesforce, an API webhook must trigger an invoice in QuickBooks, which must then trigger an email in Mailchimp. 
Because Zoho builds all 50 of their applications in-house on the same underlying architecture and database standards, they natively talk to each other without writing any complex middleware or API integrations. If you mark a deal as "Won" in Zoho CRM, the invoice is instantly and natively generated in Zoho Books.

## 3. Privacy and Bootstrap Culture

Zoho is famous in the tech industry for its highly unusual corporate structure. It is a massive, multi-billion dollar company that has taken exactly **zero dollars in venture capital funding** (completely bootstrapped). Because they are not beholden to Wall Street shareholders, they have a strict anti-surveillance privacy policy: they do not sell user data and they block third-party trackers entirely across all their products.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.2 Documentation/Swagger/index.mdx': `---
title: Swagger (OpenAPI)
description: "An open-source software framework backed by a massive ecosystem of tools that helps developers design, build, document, and consume RESTful Web services."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Swagger (OpenAPI)"
  subtitle="Standardizing REST APIs"
  tags={['Documentation', 'APIs', 'REST', 'Backend']}
>

In the past, backend developers would build a REST API and then manually type up a Word document explaining how the frontend developers should use it. This was error-prone, and the documentation instantly went out of date the moment the code changed.

**Swagger** (which evolved into the official **OpenAPI Specification**) solves this by treating API documentation as code.

## 1. The OpenAPI Specification

Instead of writing human-readable paragraphs, developers write a highly structured YAML or JSON file (TICK1swagger.yamlTICK1) that mathematically describes the entire API:
- Every single endpoint (e.g., TICK1GET /users/123TICK1).
- The exact shape of the JSON request body (e.g., must contain a string TICK1emailTICK1 and an integer TICK1ageTICK1).
- All possible HTTP response codes (200, 400, 404, 500).
- The exact authentication methods required (e.g., Bearer Token).

## 2. Swagger UI (Interactive Docs)

Once you have this YAML file, you feed it into **Swagger UI**. 
This tool autonomously generates a beautiful, interactive web page. Frontend developers can read the documentation, and more importantly, they can click a **"Try it out"** button to physically send a real HTTP request to the API directly from the documentation page, completely eliminating the need for Postman during initial testing.

## 3. Code Generation (The Holy Grail)

Because the API is mathematically defined in YAML, you can use **Swagger Codegen**.
You can feed the TICK1swagger.yamlTICK1 file into the generator, and it will autonomously write the exact TypeScript interfaces for the frontend, and the exact routing boilerplate for the Node.js backend. This guarantees that the frontend, backend, and documentation are mathematically identical and can never drift out of sync.

<Callout type="info" title="Swagger vs OpenAPI">
  The two terms are often used interchangeably, but technically: **OpenAPI** is the official, vendor-neutral specification (the YAML rules). **Swagger** refers to the suite of tooling (Swagger UI, Swagger Editor) built by SmartBear Software that implements that specification.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/ITSM/index.mdx': `---
title: ITSM (IT Service Management)
description: "The strategic approach to designing, delivering, managing, and improving the way IT is used within an organization, ensuring IT services align with business needs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="ITSM (IT Service Management)"
  subtitle="Running IT as a Business"
  tags={['Enterprise IT', 'ITIL', 'Management', 'ServiceNow']}
>

Historically, the IT department was viewed simply as "the people who fix the printers." **ITSM** is the massive paradigm shift that treats IT as a formal Service Provider to the rest of the business, applying strict processes, metrics, and workflows to every technological action.

## 1. ITIL (The Framework)

ITSM is the *concept*, but **ITIL** (Information Technology Infrastructure Library) is the actual *framework*. It is a set of books detailing the exact best practices for running an IT department. ITIL categorizes all IT work into highly structured "Processes".

## 2. Core ITSM Processes

- **Incident Management**: How do we restore normal service operation as quickly as possible? (e.g., The Wi-Fi is down, fix it *now*, figure out why later).
- **Problem Management**: The root-cause analysis. (e.g., The Wi-Fi has gone down 4 times this month. Let's dig into the switch logs to find out the underlying architectural flaw so it never happens again).
- **Change Management**: A highly bureaucratic process to prevent self-inflicted damage. If a network engineer wants to update the firewall on a Friday afternoon, they must submit a "Change Request". A Change Advisory Board (CAB) reviews the risk, the rollout plan, and the rollback plan before approving it.
- **Service Request Management**: Standard, predictable requests (e.g., "I need a new laptop", "Reset my password").

## 3. ServiceNow

You cannot run ITSM on sticky notes. The undisputed king of ITSM software is **ServiceNow**. 
It is a massive enterprise SaaS platform that digitizes the entire ITIL framework. When an employee spills coffee on their laptop, they go to the ServiceNow portal, submit a ticket, and the platform autonomously routes the ticket to the correct hardware technician, tracks the SLA (Service Level Agreement) timer, and updates the corporate inventory database when a replacement is issued.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Oracle ERP/index.mdx': `---
title: Oracle ERP
description: "A massive, enterprise-grade suite of cloud applications that manage core business processes like finance, supply chain, and human resources for global corporations."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Oracle ERP"
  subtitle="The Giant of Enterprise Software"
  tags={['Enterprise IT', 'ERP', 'SaaS', 'Databases']}
>

An **ERP (Enterprise Resource Planning)** system is the central nervous system of a massive corporation. It is a single, unified database that tracks everything: the exact amount of raw steel in a warehouse, the payroll of 100,000 employees, and the global financial accounting ledgers.

Alongside SAP, **Oracle ERP** is one of the largest and most complex business software platforms in existence, used by Fortune 500 companies to run their global operations.

## 1. The Centralized Database

Before ERPs, a company's HR department used one software, Accounting used another, and Manufacturing used a third. At the end of the month, humans had to manually reconcile spreadsheets.
Oracle ERP forces the entire massive corporation onto a single, relational Oracle SQL database. 
When Manufacturing uses raw steel to build a car, the database instantly and autonomously subtracts the steel from inventory, updates the financial ledger for Cost of Goods Sold, and alerts the supply chain module to order more steel from vendors.

## 2. Oracle Cloud (SaaS Transition)

Historically, installing Oracle ERP was a multi-year, multi-million dollar nightmare. Companies bought massive physical servers and hired armies of consultants to install the software on-premises. 
Today, Oracle has heavily transitioned to **Oracle Fusion Cloud ERP**. The software is hosted on Oracle's own cloud infrastructure as a SaaS product. This provides automatic quarterly updates, AI-driven analytics, and removes the need for companies to maintain physical hardware.

## 3. The Implementation Reality

Oracle ERP is not something you download and just start using. Because it forces a company to standardize their global business processes into Oracle's specific database schemas, implementation usually takes 1 to 3 years. It requires massive Change Management, as employees must completely un-learn decades of bad habits and undocumented spreadsheet workflows to fit into the strict mathematical rules of the ERP system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/60. Search, Retrieval & Recommender Systems/Personalisation/index.mdx': `---
title: Personalization
description: "The application of machine learning algorithms to tailor a product, interface, or content feed to the specific historical preferences of an individual user."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Personalization"
  subtitle="Algorithmic Curation"
  tags={['Recommender Systems', 'Machine Learning', 'Data Science', 'UX']}
>

In the early days of the web, every user who visited Yahoo.com saw the exact same front page. Today, if 100 million users open TikTok or Netflix, they see 100 million completely unique, dynamically generated interfaces. This is **Personalization**.

## 1. Collaborative Filtering

The most famous algorithm for personalization is **Collaborative Filtering** (famously used by Amazon's "Customers who bought this also bought...").
It does not look at the actual item; it looks at user behavior.
If User A and User B both like Movies 1, 2, and 3, the algorithm mathematically maps them as "Neighbors" in a high-dimensional vector space. If User A then watches and likes Movie 4, the algorithm will autonomously recommend Movie 4 to User B, assuming their tastes remain correlated.

## 2. Content-Based Filtering

Instead of looking at other users, **Content-Based Filtering** looks deeply at the metadata of the items themselves. 
If a user listens to a song on Spotify, the algorithm analyzes the song's audio features (BPM, acousticness, genre tags). It then searches the database for other songs with mathematically similar feature vectors and recommends them to the user. This solves the "Cold Start" problem (recommending a brand new song that nobody else has listened to yet).

## 3. The Filter Bubble

While personalization massively increases user engagement metrics (retention, click-through rates), it introduces severe societal architecture problems. 
By feeding a user strictly what they want to see (to maximize engagement), personalization algorithms inadvertently create **Filter Bubbles** and Echo Chambers. The algorithm quickly learns that showing a user inflammatory political content they agree with yields a high CTR, mathematically driving users toward polarization and extremism simply as a byproduct of optimizing a reward function.

<Callout type="success" title="Exploration vs. Exploitation">
  The best personalization systems balance **Exploitation** (showing you more of what they mathematically know you like) with **Exploration** (randomly showing you something completely new to see if your tastes have expanded). Without exploration, the algorithm gets trapped in a local optimum.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Proprietary software/index.mdx': `---
title: Proprietary Software
description: "Computer software for which the software's publisher or another person retains intellectual property rights, usually copyright of the source code, preventing users from modifying or studying it."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Proprietary Software"
  subtitle="Closed-Source Code"
  tags={['Licensing', 'Enterprise IT', 'Legal', 'Business']}
>

**Proprietary Software** (often called Closed-Source Software) is the traditional business model of the tech industry. When a user buys a video game or a copy of Microsoft Word, they are not buying the software; they are buying a restrictive *license* to use the compiled binaries. The actual source code (the human-readable C++ or Java) remains heavily guarded as a corporate trade secret.

## 1. End-User License Agreements (EULA)

When you install proprietary software, you are forced to agree to a **EULA**. 
This legally binding contract explicitly strips away rights. Standard EULAs almost universally forbid:
- **Reverse Engineering**: You cannot decompile the binary code to see how it works.
- **Modification**: You cannot alter the software to fix a bug or add a feature yourself.
- **Redistribution**: You cannot give a copy to your friend.
- **Benchmarking**: Many enterprise databases legally forbid you from publishing performance tests comparing their speed to a competitor.

## 2. Vendor Lock-In

Because proprietary software is a black box, corporations often design it using highly undocumented, proprietary file formats (e.g., the original TICK1.docTICK1 format before Office Open XML).
This creates massive **Vendor Lock-in**. If a company stores 10 years of financial data in a proprietary system, they cannot easily switch to a competitor, because the competitor's software cannot read the proprietary database format. The vendor can then extract exorbitant licensing fees indefinitely.

## 3. Open Core (The Modern Hybrid)

Completely closed proprietary software is dying outside of consumer products. The modern enterprise model is **Open Core**. 
Companies like GitLab, Elastic, and MongoDB open-source the core of their software (allowing the community to inspect it, run it for free, and contribute bug fixes). However, they keep advanced enterprise features (like Single Sign-On, High-Availability clustering, or advanced security audits) strictly proprietary, charging massive licensing fees for the "Enterprise Edition".

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/58. Information Theory & Signal Processing/Coding theory/index.mdx': `---
title: Coding Theory
description: "The mathematical study of the properties of codes and their respective fitness for specific applications, focusing heavily on data compression and error correction."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Coding Theory"
  subtitle="The Math of Data Transmission"
  tags={['Information Theory', 'Mathematics', 'Algorithms', 'Networking']}
>

In computer science, a "Code" is not just a programming language. **Coding Theory** (pioneered by Claude Shannon and Richard Hamming) is the deep mathematical study of how we encode information into bits (1s and 0s) to achieve two massive, often contradictory goals: Compression and Error Correction.

## 1. Source Coding (Data Compression)

Source Coding algorithms attempt to mathematically squash data to use the absolute minimum number of bits possible, removing all redundancy.
- **Huffman Coding**: A famous algorithm that looks at the frequency of characters. Instead of giving every letter 8 bits, it assigns very short codes (like TICK101TICK1) to common letters like 'E', and very long codes to rare letters like 'Z'.
- **LZ77 (ZIP/GZIP)**: Finds repeated sequences of data (like the word "algorithm" appearing 10 times in a file) and replaces them with a tiny pointer to the first occurrence.

## 2. Channel Coding (Error Correction)

While Source Coding removes redundancy, Channel Coding mathematically *adds* redundancy. 
If you beam a compressed photo from a satellite to Earth, cosmic radiation will flip random bits from 1 to 0 (noise). If the file is perfectly compressed, flipping one bit destroys the entire image.
Channel Coding algorithms (like **Hamming Codes**, **Reed-Solomon Codes**, and **Parity Bits**) interlace mathematical checksums throughout the data. If the satellite transmission gets slightly corrupted, the receiver's computer can use the mathematical relationships of the checksums to not only detect the error, but actively calculate exactly which bit was flipped and repair it.

<Callout type="info" title="The Fundamental Tradeoff">
  This is the core tension of Information Theory. You want maximum compression (Source Coding) to save bandwidth, but if you compress too much, a single flipped bit destroys the data. You must carefully add back exact mathematical redundancies (Channel Coding) to ensure the data survives the noisy physical world.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.2 Documentation/API documentation/index.mdx': `---
title: API Documentation
description: "The technical manual that provides comprehensive instructions on how to effectively use and integrate with a software API, detailing endpoints, parameters, and authentication."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="API Documentation"
  subtitle="The Developer Experience (DX)"
  tags={['Documentation', 'APIs', 'Software Engineering', 'Developer Experience']}
>

A REST API, no matter how brilliantly engineered, is completely useless if no one knows how to call it. **API Documentation** is the user interface for developers. It is the technical reference manual explaining exactly what endpoints exist, what data they require, and what errors they return.

## 1. The Anatomy of Great API Docs

High-quality API documentation (like Stripe or Twilio) always contains specific structural elements:
- **Authentication**: Explicit, copy-pasteable instructions on how to get an API key and how to pass it in the HTTP Headers (e.g., TICK1Authorization: Bearer <token>TICK1).
- **The Endpoint Reference**: A list of all URIs (e.g., TICK1POST /v1/customersTICK1).
- **Request Parameters**: A strict table detailing every required and optional field, the exact data type (String, Integer, Boolean), and whether the field goes in the URL path, query string, or JSON body.
- **Copy-Paste Examples**: The most critical feature. Great docs provide real-world code snippets (in cURL, Python, Node.js) that developers can copy, paste into their terminal, and see a successful 200 OK response within 30 seconds.

## 2. Tools of the Trade

Writing API docs by hand in Markdown is highly discouraged, as it instantly goes out of sync with the backend code.
The industry standard is to use the **OpenAPI Specification (Swagger)**. Developers annotate their backend code, and tools like **Redoc** or **Swagger UI** automatically generate beautiful, perfectly accurate documentation websites directly from the source code.

<Callout type="success" title="Stripe: The Gold Standard">
  Stripe's API documentation is widely considered the absolute gold standard in the tech industry. They pioneered the "Three-Pane Layout": Concept navigation on the left, detailed endpoint explanations in the center, and dynamic, interactive code snippets specifically tailored to the developer's exact API key on the right.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.2 Documentation/README/index.mdx': `---
title: The README
description: "The foundational markdown file placed in the root of a repository that serves as the entry point and primary instruction manual for a software project."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="The README"
  subtitle="The Front Page of Your Codebase"
  tags={['Documentation', 'GitHub', 'Software Engineering', 'Open Source']}
>

The TICK1README.mdTICK1 is the single most important file in any codebase. Whether it is a massive open-source framework on GitHub or a private microservice in a corporate repository, the README is the first thing any developer sees. It serves as the front page, the elevator pitch, and the setup manual.

## 1. The Core Structure

A professional README should almost always contain the following sections:

1. **Title & Badges**: The name of the project, followed by dynamic shields indicating the build status (Passing/Failing), code coverage percentage, and the software license.
2. **The "Elevator Pitch"**: One or two sentences explaining exactly what the project does and *why* it exists. (e.g., "A blazingly fast in-memory database designed to replace Redis").
3. **Prerequisites**: What the developer must have installed before touching the code (e.g., Node.js v18+, Docker, PostgreSQL).
4. **Local Setup Instructions**: The exact, copy-pasteable terminal commands required to clone the repository, install dependencies, and spin up the development server (e.g., TICK1npm install && npm run devTICK1).
5. **Usage Examples**: A 10-line code snippet showing the absolute simplest way to use the library in production.

## 2. The Bus Factor

In corporate environments, the primary purpose of a README is mitigating the **Bus Factor** (the risk that the only senior engineer who knows how the microservice works gets hit by a bus).
If a new junior engineer is hired, they should be able to read the README and have the complex Dockerized microservice running on their local MacBook within 15 minutes, without ever having to tap a senior engineer on the shoulder to ask for help.

## 3. Markdown and Aesthetics

Because it is rendered natively by GitHub, developers use **GitHub Flavored Markdown** to make the README visually appealing. This includes embedding architecture diagrams (via Mermaid.js), syntax-highlighted code blocks, tables, and animated GIFs demonstrating the user interface.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/CVEs/index.mdx': `---
title: CVEs (Common Vulnerabilities and Exposures)
description: "A standardized dictionary of publicly known cybersecurity vulnerabilities and exposures, providing a unique identifier for every major security flaw."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="CVEs (Common Vulnerabilities and Exposures)"
  subtitle="The Global Dictionary of Hacks"
  tags={['Security', 'DevSecOps', 'Cybersecurity', 'Infrastructure']}
>

Before 1999, if a researcher found a massive security hole in Microsoft Windows, they might call it "The Windows Buffer Bug." A firewall company might call it "MS-99-Hack." This made it impossible for IT departments to coordinate defenses because everyone was using different names.

The **CVE System** (maintained by MITRE) solved this by creating a highly standardized, globally recognized dictionary of vulnerabilities.

## 1. The Naming Convention

Every publicly disclosed vulnerability receives a unique ID, formatted as TICK1CVE-YYYY-NNNNNNTICK1 (e.g., TICK1CVE-2014-0160TICK1).
When a researcher discovers a new bug, they submit it to a CVE Numbering Authority (CNA). Once verified, the ID is locked in globally. Now, every single antivirus scanner, firewall, and IT patching system on Earth uses that exact same ID to track the flaw.

## 2. CVSS (The Scoring System)

A CVE is just a name. To know how terrified an IT department should be, the CVE is paired with a **CVSS (Common Vulnerability Scoring System)** score, ranging from 0.0 to 10.0.
The score is mathematically calculated based on:
- **Attack Vector**: Can the hacker exploit this remotely over the internet, or do they need physical access to the server?
- **User Interaction**: Does the victim need to click a malicious link, or does it happen autonomously?
- **Impact**: Does the hack just crash the system (Availability), or does it allow the hacker to steal the database (Confidentiality) and rewrite code (Integrity)?

<Callout type="warning" title="Critical Vulnerabilities">
  A CVSS score of 9.0 to 10.0 is considered "Critical". The infamous **Log4Shell** vulnerability (CVE-2021-44228) scored a perfect 10.0 because a hacker could take full remote control of almost any Java server on the internet simply by sending a specific string of text in a chat box, requiring absolutely zero authentication.
</Callout>

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Fix MDX brace parsing issues inside math blocks
    finalContent = finalContent.replace(/\\\\\\{/g, '\\\\lbrace ').replace(/\\\\\\}/g, '\\\\rbrace ')
    
    // Enforce Unix line endings
    finalContent = finalContent.replace(/\r\n/g, '\n')
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
