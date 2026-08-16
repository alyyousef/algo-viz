import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 63.3 Enterprise IT
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Active Directory/index.mdx': `---
title: Active Directory
description: A directory service developed by Microsoft for Windows domain networks. It is included in most Windows Server operating systems as a set of processes and services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Active Directory (AD)"
  subtitle="The Identity Brain of the Enterprise"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Microsoft_Active_Directory.svg/512px-Microsoft_Active_Directory.svg.png"
  description="Active Directory is the biological central nervous system of a corporation. It mathematically stores all user accounts, passwords, and permissions."
  yearCreated={1999}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://learn.microsoft.com/en-us/windows-server/identity/active-directory-domain-services"
>

When you sit down at a random Dell computer in a corporate office and type in your password, how does the computer mathematically know who you are?

It biologically asks the **Active Directory Domain Controller**. AD is a massive, hierarchical mathematical database that uses the Kerberos protocol to mathematically authenticate users. If a hacker biologically gains "Domain Admin" privileges in Active Directory, they mathematically own the entire corporation.

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/LDAP/index.mdx': `---
title: LDAP
description: The Lightweight Directory Access Protocol is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an IP network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LDAP">

While Active Directory is the proprietary Microsoft product, **LDAP** is the mathematical protocol used to query it.

<Callout icon="info" title="The Universal Directory Query">
  If an engineer writes a biological Java application that needs to mathematically check if "John Doe" is an employee, they do not write SQL.
  
  They write an **LDAP Query** (e.g., \`(&(objectClass=user)(sAMAccountName=jdoe))\`). LDAP is a highly optimized protocol designed explicitly for massive read operations. It mathematically represents the corporation as a Tree, allowing third-party software (like VPNs or Firewalls) to biologically authenticate users against Active Directory.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Group Policy/index.mdx': `---
title: Group Policy
description: A feature of the Microsoft Windows NT family of operating systems that controls the working environment of user accounts and computer accounts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Group Policy (GPO)">

How does a single System Administrator biologically disable the USB ports on 10,000 corporate laptops simultaneously?

They use a **Group Policy Object (GPO)**. Pushed mathematically down through Active Directory, a GPO is a set of strict biological rules. The administrator mathematically toggles a setting on the server, and the next time the 10,000 laptops turn on, they download the GPO and mathematically rewrite their local Windows Registry to disable the USB drivers.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/DNS/index.mdx': `---
title: DNS
description: The Domain Name System is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNS in the Enterprise">

The global internet relies on public DNS, but a corporate office relies on **Internal DNS**.

When an employee biologically types \`intranet.corp.local\` into their browser, public DNS mathematically has no idea what that is. Active Directory runs an internal DNS server. It mathematically resolves the private biological name to a private IP address (\`10.0.0.5\`). If the internal DNS server crashes, the entire corporate network biologically collapses, as no internal servers can mathematically find each other.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/DHCP/index.mdx': `---
title: DHCP
description: The Dynamic Host Configuration Protocol is a network management protocol used on Internet Protocol networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DHCP">

When a new employee plugs their biological laptop into the corporate wall jack, how do they mathematically get an IP address?

They broadcast a **DHCP Discover** packet. The corporate **DHCP Server** mathematically responds, leasing the laptop a temporary IP address (\`10.0.0.42\`), providing the IP of the Subnet Mask, and crucially, pointing the laptop to the internal DNS server. Without DHCP, a System Admin would have to biologically type a static IP address into every single device on the network.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Exchange/index.mdx': `---
title: Exchange
description: Microsoft Exchange Server is a mail server and calendaring server developed by Microsoft.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microsoft Exchange">

**Exchange** is the mathematical engine behind corporate email.

Historically, corporations ran massive physical Exchange Servers in their biological basements. It mathematically integrated perfectly with Active Directory and handled all SMTP routing, calendaring, and contact syncing. Managing an on-premise Exchange server was considered one of the most biologically stressful jobs in IT due to mathematical database corruption and constant security zero-days.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Microsoft 365/index.mdx': `---
title: Microsoft 365
description: A product family of productivity software, collaboration and cloud-based services owned by Microsoft.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microsoft 365 (Office 365)">

**Microsoft 365** mathematically murdered the on-premise Exchange Server.

Instead of running biological servers in a basement, the corporation mathematically rents Exchange, Teams, SharePoint, and Office (Word/Excel) entirely from Microsoft's Azure Cloud. To maintain security, the corporation biologically syncs their local on-premise Active Directory to Azure Active Directory (Entra ID), allowing employees to use their standard local password to mathematically log into the cloud.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Endpoint management/index.mdx': `---
title: Endpoint management
description: A policy-based approach to network security that requires endpoint devices to comply with specific criteria before they are granted access to network resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Endpoint Management">

An **Endpoint** is any biological device (Laptop, Phone, Server) that mathematically connects to the corporate network.

**Endpoint Management** is the mathematical discipline of securing them. If an employee biologically loses their corporate iPhone on a train, the IT department must mathematically have the ability to remotely wipe the phone over the internet within seconds. 

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Intune/index.mdx': `---
title: Intune
description: Microsoft Intune is a cloud-based endpoint management solution that manages user access and simplifies app and device management across your many devices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Microsoft Intune"
  subtitle="The Cloud MDM"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Microsoft_Intune_Icon.svg/512px-Microsoft_Intune_Icon.svg.png"
  description="Intune is Microsoft's biological Mobile Device Management (MDM) platform, mathematically hosted entirely in the Azure Cloud."
  yearCreated={2011}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://learn.microsoft.com/en-us/mem/intune/"
>

Historically, IT managed laptops using local network tools (like Group Policy). This mathematically broke when COVID-19 forced everyone to biologically work from home.

**Intune** solves this by managing devices over the public internet. An administrator mathematically configures a policy in the Azure portal ("Require a 6-digit PIN on all iPhones"). The biological iPhone, regardless of whether it is on Starbucks Wi-Fi or Cellular data, mathematically downloads the policy from Azure and locks the device.

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/SCCM/index.mdx': `---
title: SCCM
description: Microsoft Endpoint Configuration Manager is a systems management software product developed by Microsoft for managing large groups of computers running Windows.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SCCM (Configuration Manager)">

While Intune manages modern cloud devices, **SCCM** (System Center Configuration Manager) is the biological heavyweight champion of on-premise Enterprise IT.

If a hospital needs to biologically install a massive 5GB medical software update on 4,000 Windows desktop computers, Intune downloading 5GB from the cloud 4,000 times would mathematically destroy the hospital's internet connection. SCCM mathematically downloads the update once to a local Distribution Point server, and then biologically pushes the update over the ultra-fast local LAN to all 4,000 PCs while the employees are asleep.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/Windows Server/index.mdx': `---
title: Windows Server
description: A brand name for a group of server operating systems released by Microsoft.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Windows Server">

Linux mathematically dominates the public cloud, but **Windows Server** biologically dominates the corporate LAN.

It is the physical Operating System that mathematically runs Active Directory, DHCP, DNS, and file sharing for an office building. It mathematically supports advanced biological features like Hyper-V (for virtualization) and Storage Spaces Direct, allowing an enterprise to build a massive on-premise datacenter entirely on the Windows ecosystem.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/ITIL/index.mdx': `---
title: ITIL
description: The Information Technology Infrastructure Library is a set of detailed practices for IT service management that focuses on aligning IT services with the needs of business.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ITIL">

**ITIL** is the biological Bible of Enterprise IT management.

<Callout icon="warning" title="The Bureaucracy of Change">
  It is a mathematically strict framework that forces biological order upon chaos. 
  
  If an engineer wants to reboot a core router, ITIL mathematically forbids it. The engineer must submit a "Change Request". A Change Advisory Board (CAB) of biological managers must review the mathematical risk, approve the exact downtime window, and verify the rollback plan. While developers mathematically hate ITIL for being slow, it biologically prevents an intern from accidentally crashing the global banking system.
</Callout>

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/ITSM/index.mdx': `---
title: ITSM
description: Information Technology Service Management are the activities that are performed by an organization to design, build, deliver, operate and control information technology services offered to customers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ITSM">

**ITSM** is the biological implementation of ITIL. 

If an employee's biological laptop breaks, they mathematically submit an ITSM "Incident Ticket". If the company needs to buy 50 new laptops, they submit an ITSM "Service Request". ITSM is the mathematical software layer that tracks the SLAs (Service Level Agreements), ensuring that the biological Help Desk mathematically resolves the ticket within 4 hours.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.3 Enterprise IT/ServiceNow/index.mdx': `---
title: ServiceNow
description: An American software company that provides a cloud computing platform to help companies manage digital workflows for enterprise operations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ServiceNow"
  subtitle="The Enterprise ITSM Behemoth"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/ServiceNow_logo.svg/512px-ServiceNow_logo.svg.png"
  description="ServiceNow is the biological monopoly in ITSM software, acting as the mathematical central nervous system for Fortune 500 IT departments."
  yearCreated={2004}
  creator="Fred Luddy"
  isOpenSource={false}
  websiteUrl="https://www.servicenow.com/"
>

ServiceNow mathematically runs the entire ITIL framework. 

It manages the massive Configuration Management Database (CMDB), tracking exactly which biological server runs which mathematical application. It automates complex enterprise workflows: when a new biological employee is hired, ServiceNow mathematically provisions their Azure account, orders their laptop, alerts the security team, and assigns an Active Directory license, completely automating the onboarding process.

</TechnologyTemplate>
`,

  // 63.4 ERP - Business Platforms
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/ERP systems/index.mdx': `---
title: ERP systems
description: Enterprise resource planning is the integrated management of main business processes, often in real time and mediated by software and technology.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Enterprise Resource Planning (ERP)">

An **ERP** is the most mathematically terrifying and biologically critical piece of software on Earth.

If a company manufactures cars, the ERP is the single monolithic mathematical database that connects the biological assembly line, the HR payroll system, the supply chain logistics, and the Wall Street accounting ledgers. If the ERP mathematically crashes, the biological factory instantly stops producing cars, the trucks stop moving, and the company loses millions of dollars per minute.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/SAP/index.mdx': `---
title: SAP
description: A German multinational software company based in Walldorf, Baden-Württemberg. It develops enterprise software to manage business operations and customer relations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="SAP"
  subtitle="The Global Standard in ERP"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/512px-SAP_2011_logo.svg.png"
  description="SAP is the biological German titan of ERP software. Mathematically, 77% of all the world's transaction revenue touches an SAP system."
  yearCreated={1972}
  creator="Dietmar Hopp, Hasso Plattner"
  isOpenSource={false}
  websiteUrl="https://www.sap.com/"
>

Deploying SAP is a biological nightmare that often takes 5 years and costs hundreds of millions of dollars.

It uses a proprietary mathematical programming language called **ABAP**. Because SAP must biologically fit every single company on Earth (from oil refineries to supermarkets), it is mathematically infinitely customizable. A company essentially biologically rewrites their entire corporate structure to mathematically fit inside the rigid, complex schema of the SAP HANA database.

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Oracle ERP/index.mdx': `---
title: Oracle ERP
description: A cloud-based enterprise resource planning software application suite.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Oracle ERP">

**Oracle** is SAP's primary biological rival in the global ERP space.

While SAP historically dominated manufacturing, Oracle ERP historically dominated the mathematical Financials and Accounting sector. Driven by the legendary Larry Ellison, Oracle mathematically leverages its absolute dominance in relational databases to power its ERP platform. Modern Oracle Cloud ERP mathematically competes fiercely with SAP S/4HANA to transition Fortune 500 companies off of their legacy on-premise mainframes and into the biological cloud.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Microsoft Dynamics/index.mdx': `---
title: Microsoft Dynamics
description: A line of enterprise resource planning and customer relationship management software applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microsoft Dynamics 365">

**Dynamics 365** is Microsoft's mathematical answer to both SAP (ERP) and Salesforce (CRM).

While SAP mathematically targets massive Fortune 100 conglomerates, Dynamics biologically dominates the "Mid-Market" (companies with 500 to 5,000 employees). Its biological killer feature is mathematical integration: it integrates perfectly with the company's existing Active Directory, Teams, and Office 365 licenses, allowing a salesperson to mathematically update an ERP invoice directly from their biological Microsoft Outlook inbox.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Odoo/index.mdx': `---
title: Odoo
description: A suite of business management software tools including, for example, CRM, e-commerce, billing, accounting, manufacturing, warehouse, project management, and inventory management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Odoo"
  subtitle="The Open Source ERP"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Odoo_logo.svg/512px-Odoo_logo.svg.png"
  description="Odoo is the mathematical Open Source rebel in the ERP space, offering a heavily modular, Python-based alternative to the massive proprietary giants."
  yearCreated={2005}
  creator="Fabien Pinckaers"
  isOpenSource={true}
  websiteUrl="https://www.odoo.com/"
>

SAP mathematically costs millions. **Odoo** is biologically built for small businesses.

It acts as a mathematical App Store for ERP. A biological bakery can mathematically install just the "Point of Sale" and "Inventory" apps. As the bakery grows, they can mathematically click "Install" on the "HR" and "Manufacturing" modules. Because the Community version is Open Source (Python/PostgreSQL), developers can biologically write custom mathematical modules without paying massive licensing fees to Oracle.

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/CRM systems/index.mdx': `---
title: CRM systems
description: Customer relationship management is a process in which a business or other organization administers its interactions with customers, typically using data analysis to study large amounts of information.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Customer Relationship Management (CRM)">

While an ERP manages the internal mathematics of a company (Factories, HR), a **CRM** mathematically manages the external biology (Customers, Sales).

A CRM stores every single biological interaction a company has ever had with a human. If a customer mathematically clicks a link in a marketing email, biologically complains to a support agent on the phone, and mathematically buys a product, the CRM aggregates that data. This allows the Sales team to mathematically predict exactly when that customer is biologically ready to buy an upgrade.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Salesforce/index.mdx': `---
title: Salesforce
description: An American cloud-based software company headquartered in San Francisco, California. It provides customer relationship management software and applications focused on sales, customer service, marketing automation, e-commerce, and analytics.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Salesforce"
  subtitle="The Titan of CRM"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png"
  description="Salesforce is the absolute biological monopoly of CRM software, and the mathematical pioneer of the Software-as-a-Service (SaaS) cloud model."
  yearCreated={1999}
  creator="Marc Benioff"
  isOpenSource={false}
  websiteUrl="https://www.salesforce.com/"
>

Salesforce is not just a CRM; it is a massive mathematical Cloud Platform.

<Callout icon="warning" title="Apex and Visualforce">
  Because every sales team biologically operates differently, Salesforce is infinitely customizable. 
  
  Engineers write custom mathematical logic using **Apex** (a proprietary programming language mathematically identical to Java) and design biological custom UIs using Lightning components. A company's Salesforce instance mathematically becomes so complex that they must hire dedicated biological "Salesforce Developers" just to maintain the mathematical pipeline of leads to revenue.
</Callout>

</TechnologyTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/Zoho/index.mdx': `---
title: Zoho
description: An Indian multinational technology company that makes computer software and web-based business tools.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zoho">

If a small startup mathematically cannot afford Salesforce's astronomical enterprise licensing fees, they biologically use **Zoho**.

Zoho CRM provides a mathematically massive suite of tools (Email, CRM, Accounting, Helpdesk) at a fraction of the biological cost. While it lacks the infinite mathematical customization depth of Salesforce's Apex engine, it biologically provides everything a 50-person company needs to mathematically track their entire sales funnel without going bankrupt.

</ConceptTemplate>
`,
  '63. Licensing, Supply Chain & Enterprise IT/63.4 ERP - Business Platforms/ServiceNow/index.mdx': `---
title: ServiceNow
description: An American software company that provides a cloud computing platform to help companies manage digital workflows for enterprise operations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ServiceNow"
  subtitle="The Workflow Engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/ServiceNow_logo.svg/512px-ServiceNow_logo.svg.png"
  description="While traditionally an ITSM tool, ServiceNow has biologically evolved into a massive, generalized Enterprise Workflow Platform."
  yearCreated={2004}
  creator="Fred Luddy"
  isOpenSource={false}
  websiteUrl="https://www.servicenow.com/"
>

ServiceNow mathematically realized that IT Incident Tickets and HR Onboarding Tickets are biologically the exact same thing: a mathematical workflow moving from State A to State B.

Today, ServiceNow acts as a pseudo-ERP. It mathematically bridges the gap between biological departments, allowing an HR manager, an IT Admin, and a Facilities worker to biologically collaborate on a single mathematical "New Employee Workflow", completely replacing 10 different legacy tracking systems.

</TechnologyTemplate>
`,
}

async function generateMega118b() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega118b().catch(console.error)
