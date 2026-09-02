import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.2 Supply-Chain Security/Dependabot/index.mdx': `---
title: Dependabot
description: "An automated dependency management tool by GitHub that scans repositories for outdated packages and automatically creates pull requests to update them."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Dependabot"
  subtitle="Automated Supply-Chain Security"
  tags={['Security', 'DevSecOps', 'GitHub', 'Dependencies']}
>

Modern software is rarely built from scratch; it heavily relies on open-source packages (NPM, PyPI, Maven). However, if one of those thousands of dependencies contains a security vulnerability (like the infamous Log4j flaw), your entire application is compromised.

**Dependabot** is an automated tool integrated natively into GitHub that solves the massive logistical nightmare of keeping dependencies secure and up to date.

## 1. How It Works

Dependabot operates in two distinct modes:

### Security Updates
Dependabot constantly cross-references your project's TICK1package-lock.jsonTICK1 or TICK1requirements.txtTICK1 against the **GitHub Advisory Database** (a live feed of known vulnerabilities). 
If it detects that you are using a vulnerable version of a library (e.g., TICK1lodash@4.17.15TICK1), Dependabot automatically branches your code, bumps the version to the patched release (TICK1lodash@4.17.21TICK1), and opens a Pull Request.

### Version Updates
Even if there are no security flaws, keeping dependencies fully updated prevents "dependency hell" later. You can configure a TICK1dependabot.ymlTICK1 file to instruct Dependabot to scan your repository weekly. It will individually test every single dependency and open automated PRs for any new non-breaking releases, ensuring your codebase never falls years behind.

## 2. CI/CD Integration

Dependabot is completely useless if developers are afraid to merge its Pull Requests for fear of breaking the app.
The true power of Dependabot is unlocked when combined with **Automated Testing (CI)**. When Dependabot opens a PR, GitHub Actions automatically runs your unit tests. If the tests pass, developers know with mathematical certainty that the library upgrade is safe, allowing them to merge the PR in seconds.

<Callout type="info" title="Auto-Merge">
  Some advanced teams configure GitHub Actions to automatically merge Dependabot PRs if they are minor/patch versions and the test suite passes, completely removing humans from the dependency update loop.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/BSD/index.mdx': `---
title: BSD Licenses
description: "A family of highly permissive free software licenses, imposing minimal restrictions on the use and redistribution of covered software."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="BSD Licenses"
  subtitle="Permissive Open Source"
  tags={['Licensing', 'Open Source', 'Legal', 'BSD']}
>

The **BSD (Berkeley Software Distribution) Licenses** are a family of permissive open-source licenses. Unlike "copyleft" licenses (like the GPL) which aggressively force derived works to also be open-source, the BSD license is incredibly loose. It essentially says: *"You can do whatever you want with this code, including using it in closed-source commercial products, as long as you keep this copyright notice."*

## 1. The Variants

There are three primary versions of the BSD license:

### The 2-Clause BSD (Simplified)
The most permissive variant. It only requires two things:
1. If you distribute the source code, you must include the original copyright notice.
2. If you distribute compiled binaries, you must include the copyright notice in the documentation.

### The 3-Clause BSD (New/Revised)
It contains the same rules as the 2-Clause, but adds a **Non-Endorsement Clause**: 
You cannot use the name of the original author or contributors to endorse or promote your derived product without prior written permission. (e.g., You can use code from UC Berkeley, but you can't advertise your app as "Powered by UC Berkeley").

### The 4-Clause BSD (Original)
Historically, it included an "Advertising Clause" requiring all advertising materials for derived works to display an acknowledgment of the original developers. This became a logistical nightmare for large projects (imagine an OS having to list 10,000 contributors in every TV commercial), so it was largely deprecated in 1999.

## 2. Why Corporations Love BSD

Corporate entities heavily favor permissive licenses like BSD, MIT, and Apache over the GPL. 
If a company uses GPL code, they are legally forced to release their own proprietary modifications to the public. If they use BSD code, they can take the open-source code, modify it, compile it, and sell it as a million-dollar proprietary enterprise product without ever giving their source code back to the community (e.g., Apple taking the open-source BSD kernel and turning it into macOS).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Windows Server/index.mdx': `---
title: Windows Server
description: "A group of operating systems designed by Microsoft that supports enterprise-level management, data storage, applications, and communications."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Windows Server"
  subtitle="The Enterprise OS Backbone"
  tags={['Enterprise IT', 'Operating Systems', 'Microsoft', 'Infrastructure']}
>

**Windows Server** is the enterprise-grade line of operating systems created by Microsoft. Unlike the consumer versions of Windows (Windows 10/11) which are optimized for gaming, web browsing, and personal productivity, Windows Server is engineered for maximum uptime, network management, and massive multi-user resource handling.

## 1. Core Capabilities (Roles)

When you install Windows Server, it acts as a blank slate. IT Administrators configure specific **Server Roles** depending on what the business needs:

- **Active Directory Domain Services (AD DS)**: The absolute cornerstone of Microsoft enterprise networks. It manages identities, allowing thousands of employees to log in to any computer on the network using a single username and password.
- **DNS & DHCP**: Manages the dynamic assignment of IP addresses and the routing of domain names within the corporate intranet.
- **File and Storage Services**: Acts as a massive, redundant central hard drive for the company, managing file permissions (e.g., "Only HR can access this folder").
- **Hyper-V**: Microsoft's native Type-1 Hypervisor, allowing the physical server to be sliced into dozens of smaller Virtual Machines.
- **IIS (Internet Information Services)**: Microsoft's native web server, used to host ASP.NET web applications for the enterprise.

## 2. Windows Server Core

Historically, Windows Server was famous for having a full Graphical User Interface (GUI), unlike Linux which was managed via terminal. 
However, GUIs consume massive amounts of RAM and introduce huge security attack vectors. 
Microsoft introduced **Windows Server Core**, a headless version of the OS that boots strictly to a Command Prompt/PowerShell terminal. It consumes a fraction of the resources, requires fewer reboots, and is managed entirely remotely.

## 3. The Cloud Transition

With the rise of the cloud, physical Windows Servers sitting in office basements are becoming rare. However, the OS itself is still heavily used. Enterprises simply lease Windows Server Virtual Machines hosted on **Microsoft Azure** or AWS (EC2), allowing them to utilize Active Directory and IIS without maintaining physical hardware.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Endpoint management/index.mdx': `---
title: Endpoint Management
description: "The practice of centrally authenticating and managing the fleet of devices (laptops, phones, tablets) that access a corporate network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Endpoint Management"
  subtitle="Securing the Corporate Fleet"
  tags={['Enterprise IT', 'Security', 'MDM', 'Infrastructure']}
>

An **Endpoint** is any physical device that connects to the corporate network (an employee's laptop, an iPad, a warehouse barcode scanner, or a smartphone). 
If a company has 10,000 employees, the IT department cannot manually configure 10,000 laptops. **Unified Endpoint Management (UEM)** is the software architecture used to centrally secure, deploy, and monitor this massive fleet.

## 1. Mobile Device Management (MDM)

MDM is the core technology behind Endpoint Management. Tools like **Microsoft Intune**, **Jamf** (for Apple), and **VMware Workspace ONE** allow IT admins to mathematically enforce policies across thousands of devices simultaneously from a single web dashboard.

Capabilities include:
- **Zero-Touch Deployment**: A new employee receives a shrink-wrapped MacBook. The moment they connect to Wi-Fi, the MDM automatically takes control, downloads corporate VPN software, configures email profiles, and enforces a lock-screen password policy.
- **Remote Wipe**: If an employee leaves their laptop in a taxi, the IT admin clicks a button to cryptographically shred the hard drive, protecting company secrets.
- **Patch Management**: Forcing all 10,000 laptops to silently install the latest Windows/macOS security updates at 2:00 AM.

## 2. BYOD (Bring Your Own Device)

Modern Endpoint Management must handle the **BYOD** nightmare. Employees want to check corporate email on their personal iPhones. 
IT cannot legally or ethically take full control of an employee's personal device to wipe it. 
Modern UEM uses **Containerization** (like Android Work Profile or iOS User Enrolment). It creates a cryptographically isolated "Corporate Bubble" on the personal phone. The IT admin can wipe the Corporate Bubble (deleting the email and VPN apps) without touching the employee's personal photos or texts.

<Callout type="warning" title="The Security Perimeter">
  Historically, the security perimeter was the physical office building (The Firewall). Today, because of remote work, the perimeter has completely dissolved. The Endpoint *is* the new perimeter. If an endpoint is compromised in a coffee shop, the entire corporate network is at risk, making Endpoint Management the absolute most critical layer of modern IT security.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Exchange/index.mdx': `---
title: Microsoft Exchange
description: "An enterprise-grade email, calendaring, and contact management server developed by Microsoft, serving as the communication backbone for global businesses."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Microsoft Exchange"
  subtitle="The Enterprise Email Engine"
  tags={['Enterprise IT', 'Email', 'Microsoft', 'Communications']}
>

**Microsoft Exchange Server** is the heavy-duty engine that powers corporate email. If you have ever used Microsoft Outlook at a large company, Outlook was simply the client UI; Exchange was the massive database server doing all the actual processing behind the scenes.

## 1. Beyond Standard Email (IMAP/POP3)

Consumer email protocols like IMAP or POP3 are incredibly simple: they just sync text files (emails) from a server to a phone.
Exchange uses a proprietary protocol (MAPI/RPC) because it is far more than just email. It is a fully integrated relational database of communications.

Exchange handles:
- **Global Address Lists (GAL)**: The ability to type "John" in an email and have the server instantly query the entire company directory to find "John Smith (VP of Engineering)".
- **Free/Busy Calendaring**: When scheduling a meeting, Exchange calculates the exact times that 12 different attendees are mutually free, and allows you to book a physical conference room as a resource.
- **Shared Mailboxes**: Allowing the "support@company.com" email to be viewed and replied to by 50 different agents simultaneously without data collisions.

## 2. On-Premises vs. Cloud

Historically, IT departments had to buy massive physical servers to run **Exchange On-Premises**. 
This was notoriously one of the most difficult, stressful jobs in IT. If the Exchange server went down, the entire multi-billion dollar company instantly ground to a halt. Maintaining the massive databases, managing spam filters, and configuring complex DNS records (MX, SPF, DKIM) required dedicated teams.

### Exchange Online (Microsoft 365)
Today, the vast majority of companies have completely abandoned physical Exchange servers. They use **Exchange Online** (bundled into Microsoft 365). 
Microsoft hosts the massive, redundant Exchange databases in their Azure data centers. The enterprise simply pays a monthly subscription fee per user, entirely offloading the catastrophic risk of server downtime to Microsoft.

## 3. Integration with Active Directory

Exchange is totally dependent on Active Directory (AD). It does not have its own user accounts. When a new employee is created in AD, Exchange simply attaches a "mailbox attribute" to that existing identity. This ensures that the moment an employee is fired and their AD account is disabled, their email access is simultaneously and instantly severed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Creative Commons/index.mdx': `---
title: Creative Commons
description: "A set of public copyright licenses that enable the free distribution of an otherwise copyrighted work, primarily used for media, art, and documentation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Creative Commons (CC)"
  subtitle="Open Source for Media and Art"
  tags={['Licensing', 'Copyright', 'Media', 'Legal']}
>

While the GPL and MIT licenses were specifically mathematically designed for software source code, they do not work well for photographs, music, videos, or written articles. 

**Creative Commons (CC)** is an international non-profit organization that provides standardized, easy-to-understand licenses specifically designed for creative media. It allows creators to legally share their work with the public while retaining specific levels of control.

## 1. The Building Blocks

All CC licenses are built by combining four specific conditional modules:

- **BY (Attribution)**: The core of almost all CC licenses. You can use the work, but you MUST give appropriate credit to the original author.
- **SA (ShareAlike)**: The "Copyleft" module. If you remix or alter the work (e.g., using a CC song in your YouTube video), you must license your *new* video under the exact same terms.
- **NC (NonCommercial)**: You can use the work for free, but you cannot use it to make money (e.g., you can't put a CC-NC photo on a t-shirt and sell it).
- **ND (NoDerivatives)**: You can share the exact, unmodified original work, but you are legally prohibited from remixing, altering, or building upon it.

## 2. Common Combinations

By snapping these modules together, creators define exact legal permissions:
- **CC BY**: The most permissive. Do whatever you want, even commercially, just credit the author. (Wikipedia uses a variant of this).
- **CC BY-NC-SA**: You can remix it, you must credit the author, you must share your remix under the same license, and you *cannot* make money off it.
- **CC0 (Public Domain Dedication)**: The creator mathematically relinquishes all copyright, dedicating the work entirely to the public domain. No attribution is required whatsoever.

## 3. Usage in the Tech Industry

In software engineering, CC licenses are heavily used for **Documentation** and **Assets**. 
If a developer builds a video game, the C++ code is licensed under the MIT License, but the 3D models, sound effects, and the wiki documentation are licensed under CC-BY.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/DHCP/index.mdx': `---
title: DHCP
description: "Dynamic Host Configuration Protocol, the network management protocol used to dynamically assign IP addresses and other network configuration parameters to devices."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="DHCP"
  subtitle="Dynamic IP Address Assignment"
  tags={['Networking', 'Enterprise IT', 'Infrastructure', 'Protocols']}
>

The **Dynamic Host Configuration Protocol (DHCP)** is a fundamental networking service. Without DHCP, a network administrator would have to manually walk up to every single computer, phone, and printer in an office and manually type in a unique, non-overlapping IP address. 

DHCP automates this completely. When a device connects to a network, the DHCP server dynamically hands it a mathematical configuration lease, allowing it to communicate with the internet instantly.

## 1. The DORA Process

When a laptop connects to Wi-Fi, it runs a 4-step handshake known as **DORA**:

1. **Discover**: The laptop yells blindly into the local network (via a broadcast MAC address): *"Is there a DHCP server out there? I need an IP address!"*
2. **Offer**: The DHCP server hears the yell, checks its pool of available IP addresses, and replies: *"I am a DHCP server. I can offer you the IP address 192.168.1.50."*
3. **Request**: The laptop replies: *"I accept the offer for 192.168.1.50."* (This step exists because there might be multiple DHCP servers on a network, and the laptop is officially requesting the specific offer it liked best).
4. **Acknowledge (ACK)**: The server finalizes the transaction, officially registering the IP address to the laptop's MAC address in its database, and hands over the Subnet Mask, Default Gateway (Router IP), and DNS Servers.

## 2. Leases

DHCP does not give away IP addresses forever; it **leases** them. 
A standard office lease might be 8 days. If the laptop is shut down and taken home, the lease eventually expires. The DHCP server reclaims TICK1192.168.1.50TICK1 and puts it back into the available pool for another device to use. This mathematically prevents the network from permanently running out of IP addresses.

<Callout type="info" title="DHCP Reservations">
  Sometimes you *do* want a device to have the exact same IP address forever (like a networked office printer or a server). Instead of disabling DHCP on the printer, the IT admin creates a **DHCP Reservation**. The server is mathematically instructed: *"Whenever you see the MAC address of this specific printer, ALWAYS give it 192.168.1.100, and never give that IP to anyone else."*
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Microsoft 365/index.mdx': `---
title: Microsoft 365
description: "A comprehensive suite of cloud-based productivity apps, enterprise mobility, and security services developed by Microsoft, operating on a SaaS model."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Microsoft 365"
  subtitle="The Modern Enterprise Cloud"
  tags={['Enterprise IT', 'SaaS', 'Microsoft', 'Cloud']}
>

**Microsoft 365** (formerly Office 365) is the dominant Software as a Service (SaaS) platform in the corporate world. It represents Microsoft's massive strategic shift away from selling shrink-wrapped CDs of Word and Excel, toward a unified, cloud-hosted subscription model that encompasses productivity, identity, and security.

## 1. The Core Pillars

Microsoft 365 is far more than just "Word in a web browser." It is a massive ecosystem:

- **Productivity Apps**: Word, Excel, PowerPoint, natively syncing files to the cloud.
- **Exchange Online**: The backbone of corporate email, completely hosted in Azure.
- **SharePoint & OneDrive**: Massive, secure document management systems allowing real-time collaboration on files (the corporate alternative to Google Drive).
- **Microsoft Teams**: The central hub for chat, video conferencing, and VoIP telephony (the primary competitor to Slack and Zoom).

## 2. The Identity Backbone: Entra ID

The true power of Microsoft 365 is its identity system: **Microsoft Entra ID** (formerly Azure Active Directory).
Every M365 subscription is backed by Entra ID. This is a massive cloud-based directory of all employees. It provides **Single Sign-On (SSO)**. An employee logs into their M365 account once, and they are cryptographically authenticated to access their email, Teams, and thousands of third-party SaaS apps (like Salesforce or GitHub) without needing separate passwords.

## 3. Security and Compliance

Enterprise IT departments pay premium subscriptions (like the E5 License) not for Word, but for the integrated security suite:
- **Intune**: Endpoint management for laptops and phones.
- **Defender**: Enterprise-grade antivirus and cloud threat analytics.
- **Data Loss Prevention (DLP)**: Mathematical rules that prevent employees from accidentally (or maliciously) emailing credit card numbers or trade secrets outside the corporate domain.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.1 Licensing & Open Source/Apache 2.0/index.mdx': `---
title: Apache License 2.0
description: "A permissive free software license written by the Apache Software Foundation that specifically includes an express grant of patent rights."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Apache License 2.0"
  subtitle="Permissive Licensing with Patent Protection"
  tags={['Licensing', 'Open Source', 'Legal', 'Apache']}
>

The **Apache License 2.0** is one of the most popular and professional open-source licenses in the world (used by Android, Kubernetes, and TensorFlow). Like MIT and BSD, it is a "permissive" license, meaning you can use the code in closed-source commercial products without giving your modifications back to the community.

However, Apache 2.0 solves massive corporate legal loopholes that older permissive licenses ignored.

## 1. The Patent Grant (The Killer Feature)

The MIT license grants the right to use the *copyright* of the code. But modern software is heavily patented. 
A malicious corporation could release open-source code under MIT, wait for millions of startups to use it, and then sue them all for *patent* infringement, since the MIT license only covers copyright.

**Apache 2.0 explicitly grants a perpetual, worldwide patent license.** If a corporation licenses their software under Apache 2.0, they mathematically surrender the right to sue users for patent infringement regarding that specific code. 
Furthermore, it includes a "Patent Retaliation" clause: If *you* try to sue the creators for patent infringement, your license to use the software is instantly terminated.

## 2. State Changes (Modifications)

Unlike the MIT license, which just requires you to keep the copyright notice, Apache 2.0 adds a layer of traceability. 
If you modify an Apache 2.0 licensed file, you must include a prominent notice stating that *you altered the file*. This protects the reputation of the original creators, ensuring that if you inject a massive bug into the code and sell it, users know the bug was your fault, not the original authors'.

## 3. Trademarks

Apache 2.0 explicitly states that it does *not* grant you the right to use the original creator's trademarks, logos, or names. You can legally take the Android source code and build your own phone, but you are strictly forbidden from calling it an "Android" phone or using the green robot logo.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Group Policy/index.mdx': `---
title: Group Policy (GPO)
description: "A feature of the Microsoft Windows NT family of operating systems that mathematically controls the working environment of user accounts and computer accounts."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Group Policy (GPO)"
  subtitle="Centralized Windows Configuration"
  tags={['Enterprise IT', 'Windows', 'Security', 'Active Directory']}
>

In a corporate environment with 5,000 Windows laptops, the IT department cannot manually configure settings on each device. They need to mathematically enforce security rules (like "Disable the Control Panel" or "Force a screensaver lock after 5 minutes"). 

They accomplish this using **Group Policy Objects (GPOs)**, a technology deeply integrated into Windows Server and Active Directory.

## 1. How It Works

A Group Policy Object is essentially a massive database of registry keys and configuration scripts hosted on the central Domain Controller (the Active Directory server).

When a corporate laptop boots up and connects to the network, the local Windows OS silently contacts the Domain Controller and downloads all the GPOs assigned to it. The OS then mathematically applies thousands of registry edits to enforce the corporate rules before the user even reaches the login screen.

## 2. Granular Targeting (OUs)

GPOs can be targeted with surgical precision using **Organizational Units (OUs)**.
- You can apply a GPO to the "Marketing" OU that automatically installs Adobe Photoshop and mounts the shared Marketing network drive.
- You can apply a different GPO to the "Kiosks" OU that disables USB drives, hides the Start Menu, and forces the computer to only run a single web browser application.

## 3. The Shift to MDM

Group Policy is a legacy technology designed for physical offices where laptops are directly wired into a Domain Controller. It struggles heavily with remote work (if an employee hasn't connected to the corporate VPN in a month, their laptop hasn't downloaded the latest security GPOs).

Modern enterprises are migrating away from legacy on-premises Group Policy toward cloud-based **MDM (Mobile Device Management)** solutions like Microsoft Intune, which can push configuration policies to laptops over the open internet, regardless of where the employee is physically located.

<Callout type="warning" title="GPUpdate">
  If you have ever worked helpdesk IT, you know the command TICK1gpupdate /forceTICK1. Because Windows only checks for new GPOs periodically (usually every 90 minutes), this terminal command mathematically forces the PC to contact the server and download the latest policies immediately, usually fixing bizarre configuration bugs.
</Callout>

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
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
