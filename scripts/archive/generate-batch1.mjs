import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '6. Cloud Computing/Azure/index.mdx': `---
title: Microsoft Azure
description: Microsoft's public cloud computing platform.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Microsoft Azure">

Microsoft Azure is a cloud computing platform operated by Microsoft for application management via global data centers. It provides software as a service (SaaS), platform as a service (PaaS) and infrastructure as a service (IaaS).

<Callout icon="tip" title="Enterprise Integration">
  Azure's biggest strength is its deep integration with the existing Microsoft enterprise ecosystem (Active Directory, Windows Server, .NET, Office 365), making it the default choice for many legacy enterprises migrating to the cloud.
</Callout>

## Core Compute Services

<ComparisonTable 
  headers={['Service', 'Type', 'Equivalent in AWS']}
  rows={[
    ['Azure Virtual Machines', 'IaaS / VMs', 'Amazon EC2'],
    ['Azure Kubernetes Service (AKS)', 'Containers (CaaS)', 'Amazon EKS'],
    ['Azure Functions', 'Serverless (FaaS)', 'AWS Lambda']
  ]}
/>

## Architecture (Standard Hub and Spoke)

<ArchitectureDiagram chart={\`
graph TD
  User((User)) --> AFD(Azure Front Door)
  AFD --> AppGateway(Application Gateway)
  
  subgraph Hub VNet
    AppGateway --> Firewall(Azure Firewall)
    Firewall --> VPN(VPN Gateway to On-Prem)
  end
  
  subgraph Spoke VNet 1 (Prod)
    Firewall --> AKS(Azure Kubernetes Service)
    AKS --> SQL[(Azure SQL Database)]
  end
  
  subgraph Spoke VNet 2 (Dev)
    Firewall --> VM(Dev VMs)
  end
\`} />

## Active Directory Integration

Azure Active Directory (Azure AD) is heavily utilized for identity and access management (IAM). It allows single sign-on (SSO) across Azure services and external applications.

<pre className="bin98-codebox">
<code>
# Azure CLI: Login to Azure
az login

# Azure CLI: Create a resource group
az group create --name myResourceGroup --location eastus

# Azure CLI: Create a basic Virtual Machine
az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image Ubuntu2204 \\
  --admin-username azureuser \\
  --generate-ssh-keys
</code>
</pre>

</TechnologyTemplate>
`,
  '6. Cloud Computing/GCP/index.mdx': `---
title: Google Cloud Platform (GCP)
description: Suite of cloud computing services provided by Google.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Google Cloud Platform (GCP)">

Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube.

<Callout icon="info" title="Data Analytics and AI Leader">
  GCP is widely recognized as the industry leader in machine learning, artificial intelligence, and big data analytics, largely due to products like BigQuery, TensorFlow, and custom TPU (Tensor Processing Unit) hardware.
</Callout>

## Core Compute Services

<ComparisonTable 
  headers={['Service', 'Type', 'Equivalent in AWS']}
  rows={[
    ['Compute Engine (GCE)', 'IaaS / VMs', 'Amazon EC2'],
    ['Google Kubernetes Engine (GKE)', 'Containers (CaaS)', 'Amazon EKS'],
    ['Cloud Run', 'Serverless Containers', 'AWS Fargate']
  ]}
/>

## Architecture (Data Analytics Pipeline)

<ArchitectureDiagram chart={\`
graph LR
  subgraph Ingestion
    PubSub(Cloud Pub/Sub)
  end
  
  subgraph Processing
    Dataflow(Cloud Dataflow)
  end
  
  subgraph Storage & Analytics
    BigQuery[(BigQuery)]
    GCS[(Cloud Storage)]
  end
  
  subgraph Presentation
    Looker(Looker / Data Studio)
  end
  
  PubSub -->|Streaming Events| Dataflow
  Dataflow -->|Cleaned Data| BigQuery
  Dataflow -->|Raw Backup| GCS
  BigQuery --> Looker
\`} />

## Cloud Run & GKE

Google originally developed Kubernetes (Borg), and GKE is considered the most mature managed Kubernetes service. **Cloud Run** takes containerization a step further by offering fully serverless container execution.

<pre className="bin98-codebox">
<code>
# gcloud CLI: Authenticate
gcloud auth login

# Set active project
gcloud config set project my-gcp-project

# Deploy a container to Cloud Run
gcloud run deploy my-service \\
  --image gcr.io/my-project/my-image \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated
</code>
</pre>

</TechnologyTemplate>
`,
  '6. Cloud Computing/OCI/index.mdx': `---
title: Oracle Cloud Infrastructure (OCI)
description: Cloud computing platform offered by Oracle Corporation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Oracle Cloud Infrastructure (OCI)">

Oracle Cloud Infrastructure (OCI) is a deep and broad platform of public cloud services that enables customers to build and run a wide range of applications in a scalable, secure, highly available, and high-performance environment.

<Callout icon="error" title="Market Position">
  While not as large as the "Big 3" (AWS, Azure, GCP), OCI has carved out a massive niche for enterprises migrating extreme-performance legacy Oracle databases (Exadata) to the cloud, offering highly competitive pricing on bandwidth and compute.
</Callout>

## Core Compute Services

<ComparisonTable 
  headers={['Service', 'Description']}
  rows={[
    ['Compute Instances', 'Bare metal and virtual machine instances.'],
    ['OKE (Oracle Kubernetes Engine)', 'Fully managed, scalable, and highly available service for deploying containerized applications.'],
    ['Autonomous Database', 'Fully automated, self-driving database service optimized for transaction processing or data warehousing.']
  ]}
/>

## Typical Architecture

<ArchitectureDiagram chart={\`
graph TD
  subgraph VCN [Virtual Cloud Network]
    LB(Load Balancer)
    
    subgraph App Subnet
      App1(App Server 1)
      App2(App Server 2)
    end
    
    subgraph Data Subnet
      ADW[(Autonomous Data Warehouse)]
    end
    
    LB --> App1
    LB --> App2
    App1 --> ADW
    App2 --> ADW
  end
  
  Internet((Internet)) --> LB
\`} />

## Pricing Advantage

OCI is known for its aggressive pricing strategy, particularly regarding outbound data transfer (egress), which is notoriously expensive on AWS. OCI provides the first 10 TB of egress per month for free.

</TechnologyTemplate>
`,
  '0. Computer Science Fundamentals/Operating Systems/Windows/index.mdx': `---
title: Microsoft Windows
description: Proprietary graphical operating system developed by Microsoft.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Microsoft Windows">

Microsoft Windows is a group of several proprietary graphical operating system families, all of which are developed and marketed by Microsoft. It is the dominant operating system in the personal computer market.

<Callout icon="info" title="NT Kernel">
  Modern versions of Windows (Windows 10, Windows 11, Windows Server) are based on the **Windows NT** kernel, a hybrid kernel that was originally designed for high reliability and security in enterprise environments.
</Callout>

## File System & Registry

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['NTFS', 'New Technology File System. The primary file system of Windows, supporting large files, permissions, and journaling.'],
    ['Windows Registry', 'A hierarchical database that stores low-level settings for the OS and for applications that opt to use the registry.'],
    ['Win32 API', 'The core C-based application programming interface (API) for creating Windows applications.']
  ]}
/>

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  subgraph User Mode
    App(Application Processes)
    Sub(Subsystems e.g. Win32, POSIX)
    App --> Sub
  end
  
  subgraph Kernel Mode
    Exec(Executive Services: I/O, IPC, Memory)
    Kernel(Microkernel)
    HAL(Hardware Abstraction Layer)
    
    Sub --> Exec
    Exec --> Kernel
    Kernel --> HAL
  end
  
  HAL --> HW[Hardware]
\`} />

## PowerShell vs Command Prompt

<pre className="bin98-codebox">
<code>
# Command Prompt (cmd.exe) - Legacy, batch processing
dir C:\\Users\\Public

# PowerShell - Modern, object-oriented shell based on .NET
Get-ChildItem -Path "C:\\Users\\Public" | Where-Object { $_.Extension -eq ".txt" }
</code>
</pre>

</TechnologyTemplate>
`,
  '0. Computer Science Fundamentals/Operating Systems/macOS/index.mdx': `---
title: macOS
description: Proprietary graphical operating system developed by Apple.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="macOS">

macOS (previously Mac OS X and later OS X) is a proprietary graphical operating system developed and marketed by Apple Inc. It is the primary operating system for Apple's Mac computers.

<Callout icon="tip" title="Unix Certified">
  macOS is built on top of **Darwin**, an open-source Unix operating system. macOS 10.5 Leopard and later are certified as fully compliant Unix systems (Single UNIX Specification). This makes it highly popular among software developers.
</Callout>

## Architecture (XNU Kernel)

macOS uses the XNU kernel (X is Not Unix). It is a hybrid kernel that combines the Mach microkernel with components from FreeBSD and a C++ API called I/O Kit for device drivers.

<ArchitectureDiagram chart={\`
graph TD
  subgraph User Space
    Aqua(Aqua GUI)
    Cocoa(Cocoa / Swift APIs)
    POSIX(POSIX API / Bash / Zsh)
    
    Aqua --> Cocoa
  end
  
  subgraph Kernel Space (XNU)
    Mach(Mach Microkernel - IPC, Scheduling)
    BSD(BSD Layer - POSIX, Networking, VFS)
    IOKit(I/O Kit - Device Drivers)
    
    Cocoa --> Mach
    Cocoa --> BSD
    POSIX --> BSD
  end
  
  Mach --> HW[Apple Silicon / Intel HW]
  BSD --> HW
  IOKit --> HW
\`} />

## File System

<ComparisonTable 
  headers={['File System', 'Status', 'Description']}
  rows={[
    ['HFS+', 'Legacy', 'Mac OS Extended. Used for decades until macOS High Sierra.'],
    ['APFS', 'Current', 'Apple File System. Optimized for solid-state drives (SSDs) and features cloning, snapshots, and strong encryption.']
  ]}
/>

## Common Developer Tools

<pre className="bin98-codebox">
<code>
# Install Homebrew (The missing package manager for macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install a package via Homebrew
brew install node

# Search for processes
top -o cpu
</code>
</pre>

</TechnologyTemplate>
`,
  '0. Computer Science Fundamentals/Operating Systems/Unix/index.mdx': `---
title: Unix
description: Family of multitasking, multiuser computer operating systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Unix">

Unix is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, developed in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others.

<Callout icon="info" title="The Unix Philosophy">
  "Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface." — Doug McIlroy
</Callout>

## The Unix Family Tree

Unix is not a single operating system today, but rather a specification and a historical family tree.

<ArchitectureDiagram chart={\`
graph TD
  Research[Research Unix - 1970s]
  
  Research --> BSD(Berkeley Software Distribution - BSD)
  Research --> SysV(System V)
  
  BSD --> FreeBSD(FreeBSD)
  BSD --> NetBSD(NetBSD)
  BSD --> Darwin(Darwin / macOS)
  
  SysV --> Solaris(Solaris)
  SysV --> AIX(AIX)
  SysV --> HPUX(HP-UX)
  
  Minix(Minix - Independent Clone) --> Linux(Linux - Independent Clone, Unix-like)
\`} />

## Key Characteristics

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Multi-user', 'Designed from the ground up to support multiple users simultaneously logging in and running processes.'],
    ['Piping', 'The ability to chain small utilities together using \`|\` (e.g., \`ls -l | grep ".txt"\`).'],
    ['Hierarchical File System', 'A single root directory (\`/\`) from which all files and devices branch off.'],
    ['Shell', 'A command-line interpreter (like \`sh\`, \`csh\`, \`bash\`) that provides a user interface to the OS.']
  ]}
/>

## Standard POSIX Utilities

<pre className="bin98-codebox">
<code>
# View the manual page for a command
man awk

# Find files modified in the last 7 days
find /var/log -type f -mtime -7

# Display free disk space
df -h
</code>
</pre>

</ConceptTemplate>
`,
}

async function writeBatch1() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Updated ${relativePath} with rich content.`)
  }
}

writeBatch1().catch(console.error)
