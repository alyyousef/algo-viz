import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 63.1 Licensing & Open Source
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Open source/index.mdx': `---
title: Open source
description: Software with source code that anyone can inspect, modify, and enhance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Open Source Software">

In the 1990s, Microsoft famously called Open Source a "cancer". Today, the entire biological internet runs on it.

**Open Source** is a mathematical paradigm shift. Instead of compiling code into unreadable binary \`.exe\` files and selling them, developers publish the raw biological source code online for free. It relies on the biological "Wisdom of Crowds": if 10,000 developers can read the code, bugs are mathematically found and fixed instantly. Massive corporations (like Google and Meta) heavily fund Open Source because it commoditizes their competitors and standardizes the industry.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Proprietary software/index.mdx': `---
title: Proprietary software
description: Software that is owned by an individual or a company (usually the one that developed it).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Proprietary Software">

**Proprietary Software** (Closed Source) is the mathematical opposite of Open Source.

You do not biologically buy Proprietary Software; you mathematically buy a *license to use it*. The creator (like Apple or Adobe) retains strict biological copyright. The code is compiled into binaries, and Reverse Engineering those binaries is legally forbidden. This mathematical secrecy guarantees revenue and protects intellectual property, but historically creates vendor lock-in and stifles biological innovation.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/MIT License/index.mdx': `---
title: MIT License
description: A permissive free software license originating at the Massachusetts Institute of Technology.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The MIT License">

If you write Open Source code, you must legally attach a license. The **MIT License** is the absolute biological gold standard of modern software.

<Callout icon="success" title="Do Whatever You Want">
  The MIT License is terrifyingly simple and **Permissive**. 
  
  It mathematically translates to: *"You can do absolutely anything you want with this code. You can modify it, you can sell it, you can use it in proprietary software. The only biological rule is that you must include my original copyright notice, and you mathematically cannot sue me if the code breaks."* Almost the entire JavaScript NPM ecosystem runs on the MIT License.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Apache 2.0/index.mdx': `---
title: Apache 2.0
description: A permissive free software license written by the Apache Software Foundation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache License 2.0">

The **Apache 2.0 License** is a permissive license heavily favored by massive enterprise corporations.

It is mathematically very similar to the MIT license (do whatever you want), but it includes a critical biological **Patent Grant**. If a massive company (like Google) releases an Open Source project under Apache 2.0, they mathematically grant you a free license to use any biological patents contained within that code. This legally prevents Google from ever suing you for patent infringement for using their Open Source software.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/BSD/index.mdx': `---
title: BSD
description: A family of permissive free software licenses, imposing minimal restrictions on the use and distribution of covered software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BSD License">

The **BSD License** (Berkeley Software Distribution) is the ancestor of modern permissive licenses.

It mathematically comes in multiple variants (2-Clause, 3-Clause). The famous biological "3-Clause BSD" is almost identical to MIT, but adds a strict **Non-Endorsement Clause**. It mathematically states: *"You can use my code, but you cannot legally use my biological name to advertise your product without my permission."*

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Copyleft/index.mdx': `---
title: Copyleft
description: The practice of granting the right to freely distribute and modify intellectual property with the requirement that the same rights be preserved in derivative works created from that property.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Copyleft">

**Copyleft** is the biological opposite of Copyright, and the mathematical opposite of Permissive licenses (like MIT).

A Permissive license allows a corporation to take Open Source code, mathematically modify it, and illegally hide the changes in a Proprietary binary. Copyleft mathematically destroys this. A Copyleft license states: *"You can use my code for free, but if you modify it and distribute it, you mathematically MUST release your new source code under this exact same Open Source license."* It biologically forces software to remain free forever.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/GPL/index.mdx': `---
title: GPL
description: The GNU General Public License is a series of widely used free software licenses that guarantee end users the freedom to run, study, share, and modify the software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GNU GPL">

The **GPL** (General Public License), written by Richard Stallman, is the most famous **Strong Copyleft** license in the world.

<Callout icon="warning" title="The Viral License">
  The GPL is mathematically viral. 
  
  If a corporation writes 1 million lines of Proprietary code, and they biologically \`import\` a single 10-line library licensed under the GPL, the GPL mathematically infects their entire codebase. The corporation is legally forced to open-source all 1 million lines of their Proprietary code. For this biological reason, enterprise lawyers strictly forbid engineers from ever importing GPL code into corporate projects.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/LGPL/index.mdx': `---
title: LGPL
description: The GNU Lesser General Public License is a free software license published by the Free Software Foundation, designed as a compromise between the strong copyleft GPL and permissive licenses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LGPL (Lesser GPL)">

Because the standard GPL was biologically too viral, the Free Software Foundation created the **LGPL**.

The LGPL is a **Weak Copyleft** license. It mathematically allows a Proprietary codebase to \`import\` and link to an LGPL library *without* infecting the proprietary code. However, if the developer biologically modifies the LGPL library itself, they must open-source those specific modifications. It is the perfect mathematical compromise for Open Source libraries that want corporate adoption.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/MPL/index.mdx': `---
title: MPL
description: The Mozilla Public License is a free and open source software license developed and maintained by the Mozilla Foundation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mozilla Public License (MPL)">

The **MPL** is another incredibly popular **Weak Copyleft** license, biologically sitting perfectly between Apache 2.0 and the GPL.

Unlike the LGPL (which cares about mathematical "linking"), the MPL is entirely **file-based**. If a Proprietary codebase contains 100 files, and 1 file is licensed under MPL, the viral effect is mathematically trapped inside that single file. You can keep the other 99 files Proprietary, but if you biologically edit the 1 MPL file, you must publish the source code for that specific file.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Creative Commons/index.mdx': `---
title: Creative Commons
description: One of several public copyright licenses that enable the free distribution of an otherwise copyrighted "work".
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Creative Commons (CC)">

While MIT and GPL are mathematically designed for source code, they are biologically terrible for images, videos, and music.

**Creative Commons** provides licenses for non-software media. A photographer can license an image as \`CC BY\` (You can use it if you biologically credit me), \`CC BY-NC\` (You can use it, but mathematically not for commercial profit), or \`CC0\` (Public Domain, mathematically destroying all copyright entirely).

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/SPDX/index.mdx': `---
title: SPDX
description: Software Package Data Exchange is an open standard for communicating software bill of material information, including components, licenses, copyrights, and security references.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SPDX">

When a legal team biologically audits a codebase, they mathematically cannot read 10,000 different \`LICENSE.txt\` files.

**SPDX** (Software Package Data Exchange) is a strict mathematical standard that defines an exact string format for licenses (e.g., \`MIT\`, \`Apache-2.0\`, \`GPL-3.0-only\`). Developers biologically place a specific comment at the top of their source code (e.g., \`// SPDX-License-Identifier: MIT\`). This allows automated compliance tools to mathematically scan the entire codebase and instantly flag if an engineer accidentally imported a viral GPL file.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Software supply chain integrity/index.mdx': `---
title: Software supply chain integrity
description: The practice of ensuring that the software components, libraries, and tools used to build an application have not been tampered with or compromised.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Supply Chain Integrity">

Modern software is not biologically written; it is mathematically assembled. A simple React app imports 2,000 Open Source libraries from NPM.

**Supply Chain Integrity** is the terrifying realization that you mathematically trust 2,000 random strangers on the internet. If a malicious hacker compromises the laptop of just one maintainer in Iowa, they can mathematically inject malware into a tiny NPM library. When your Enterprise CI/CD pipeline biologically runs \`npm install\`, that malware is mathematically pulled directly into your Fortune 500 servers.

</ConceptTemplate>
`,

  // 63.2 Supply-Chain Security
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/SBOM/index.mdx': `---
title: SBOM
description: A software bill of materials is a list of components in a piece of software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SBOM (Software Bill of Materials)">

In 2021, the Log4Shell vulnerability mathematically compromised the entire internet. Corporations biologically panicked because they didn't even know if their software used Log4j.

<Callout icon="success" title="The Ingredients List">
  The US Government legally mandated the **SBOM**. 
  
  An SBOM is a mathematical JSON file (often using the SPDX or CycloneDX format) that acts as the biological ingredients list on the back of a cereal box. It mathematically lists every single Open Source library, version number, and nested sub-dependency used to build the software. If a new vulnerability is discovered tomorrow, a company can instantly mathematically query their SBOM to see if they are infected.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/SCA (Software Composition Analysis)/index.mdx': `---
title: SCA (Software Composition Analysis)
description: An automated process that identifies the open source components in a codebase and evaluates them for security, license compliance, and code quality.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Composition Analysis (SCA)">

An SBOM is just a static JSON file. **SCA** is the active biological tool that reads it.

SCA tools mathematically scan a company's codebase, identify the 500 Open Source libraries being used, and mathematically cross-reference those libraries against the National Vulnerability Database (NVD). If it biologically detects that you are using \`express@4.16.0\` (which has a known mathematical vulnerability), the SCA tool automatically blocks the CI/CD pipeline and alerts the security team.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/CVEs/index.mdx': `---
title: CVEs
description: Common Vulnerabilities and Exposures is a database of publicly disclosed information security issues.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CVE (Common Vulnerabilities and Exposures)">

When a biological security researcher mathematically discovers a bug in Open Source software that allows hackers to steal data, they do not just post it on Twitter.

They mathematically register it with the **CVE Database**. The vulnerability is assigned a strict biological ID (e.g., \`CVE-2021-44228\`). This global dictionary allows security tools, SCA scanners, and enterprise firewalls to mathematically synchronize their defenses. A CVE acts as the biological wanted poster for a specific software bug.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/CVSS scoring/index.mdx': `---
title: CVSS scoring
description: The Common Vulnerability Scoring System is a free and open industry standard for assessing the severity of computer system security vulnerabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CVSS Scoring">

Not all CVEs are biologically equal. A bug that crashes a server is bad; a bug that allows remote code execution without a password is mathematically catastrophic.

The **CVSS** (Common Vulnerability Scoring System) assigns a mathematical score from 0.0 to 10.0 to every CVE.
- **Low (0.1 - 3.9)**: Hard to exploit, biological impact is minor.
- **Critical (9.0 - 10.0)**: Mathematically trivial to exploit over the internet, total biological system takeover. Log4Shell scored a perfect 10.0.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Dependabot/index.mdx': `---
title: Dependabot
description: A tool built into GitHub that automatically checks your dependency files for outdated requirements and opens individual pull requests for any it finds.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dependabot">

As discussed in the GitHub section, **Dependabot** is the biological manifestation of SCA and CVE tracking.

It mathematically monitors your \`package.json\`. The millisecond a new CVE is published to the global database, Dependabot biologically calculates if your project is affected. If it is, it automatically mathematically writes the code to upgrade the package and opens a Pull Request.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Dependency scanning/index.mdx': `---
title: Dependency scanning
description: The automated process of identifying known security vulnerabilities in the external dependencies included in an application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dependency Scanning">

**Dependency Scanning** is the overarching mathematical workflow that executes SCA tools in CI/CD pipelines.

<Callout icon="warning" title="The False Positive Nightmare">
  While Dependency Scanning is biologically critical, it suffers from severe mathematical noise. 
  
  A scanner might flag an NPM package as "Critical" because of a RegEx vulnerability. However, if the biological codebase never actually calls that specific RegEx function, the vulnerability is mathematically impossible to exploit. Engineers often biologically suffer from "Alert Fatigue," ignoring massive lists of false-positive Dependency Scan warnings.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Software signing/index.mdx': `---
title: Software signing
description: The process of digitally signing executables and scripts to confirm the software author and guarantee that the code has not been altered or corrupted.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Signing">

How does your biological Mac mathematically know that the Google Chrome installer actually came from Google, and not a Russian hacker?

**Software Signing** uses Asymmetric Cryptography. Google mathematically hashes the Chrome \`.dmg\` file and signs the hash with their Private Key. When you download it, Apple macOS mathematically verifies the signature using Google's Public Key. If a hacker biologically altered even a single byte of the Chrome installer during the download, the mathematical signature instantly fails, and macOS blocks the installation.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Sigstore/index.mdx': `---
title: Sigstore
description: An open-source project and service for signing, verifying, and protecting software components.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Sigstore"
  subtitle="Let's Encrypt for Software Signing"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sigstore_logo.svg/512px-Sigstore_logo.svg.png"
  description="Sigstore mathematically eliminates the nightmare of managing biological private keys for Software Signing."
  yearCreated={2021}
  creator="Linux Foundation"
  isOpenSource={true}
  websiteUrl="https://www.sigstore.dev/"
>

Historically, if an Open Source developer wanted to mathematically sign their code, they had to generate a GPG Private Key and biologically store it on a USB drive. If they lost the drive, or a hacker stole it, the supply chain was destroyed.

**Sigstore** abandons long-lived keys. It issues mathematically ephemeral, short-lived certificates tied directly to an OpenID Connect identity (like your GitHub login). You biologically log in, Sigstore issues a 10-minute certificate, you sign the code, and the mathematical certificate is appended to an immutable Transparency Log (Rekor) to prove exactly who signed it and when.

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Reproducible builds/index.mdx': `---
title: Reproducible builds
description: A set of software development practices that create an independently-verifiable path from source code to the binary code used by computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reproducible Builds">

If you download Open Source code and biologically compile it, and the author compiles the exact same code, the resulting binary \`.exe\` files will mathematically have different hashes.

Why? Because the compiler injects biological metadata (like the exact timestamp of the compile, or the specific OS path). This is a security nightmare, because you mathematically cannot verify if the author's binary matches the Open Source code. **Reproducible Builds** strips all non-deterministic biological variables from the compiler, mathematically guaranteeing that the exact same source code will *always* produce the exact same binary hash, bit-for-bit.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Snyk/index.mdx': `---
title: Snyk
description: A developer security platform integrating directly into development tools, workflows, and automation pipelines to find and fix vulnerabilities.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Snyk"
  subtitle="The Enterprise SCA Behemoth"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Snyk_Logo.svg/512px-Snyk_Logo.svg.png"
  description="Snyk is the biological industry standard SCA tool, built specifically to catch developers before they mathematically deploy vulnerable Open Source dependencies."
  yearCreated={2015}
  creator="Guy Podjarny"
  isOpenSource={false}
  websiteUrl="https://snyk.io/"
>

Snyk mathematically scans your codebase, container images, and Infrastructure as Code (Terraform). 

Unlike older security tools that were biologically designed for Security Operations Centers (SOCs), Snyk is built for the Developer. It integrates directly into the IDE and Pull Requests, mathematically intercepting and fixing vulnerabilities before the code is ever merged into the \`main\` branch.

</TechnologyTemplate>
`,
}

async function generateMega118a() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega118a().catch(console.error)
