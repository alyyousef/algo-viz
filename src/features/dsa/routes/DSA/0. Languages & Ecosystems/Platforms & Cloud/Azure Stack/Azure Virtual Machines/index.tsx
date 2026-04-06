import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { JSX, MouseEvent } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type NarrativeSection = {
  id: string
  heading: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pageTitle = 'Azure Virtual Machines'
const pageSubtitle =
  'IaaS compute on Azure for custom operating systems, full host control, and workloads that need VM-level flexibility.'

const introParagraphs = [
  "Azure Virtual Machines are Azure's infrastructure-as-a-service compute offering for running Windows or Linux machines with a high degree of control over the operating system, installed software, storage layout, networking, and security posture. You choose the image, size, disks, network interfaces, access model, and availability strategy, while Azure provides the underlying physical infrastructure, regional capacity, and management APIs.",
  "The important architectural distinction is that Azure VMs are not a managed application platform. They are rented computers in Azure's control plane. That means they give you flexibility that App Service, Functions, or many platform services do not, but they also leave you responsible for patching, guest configuration, runtime hardening, backup strategy, and many day-two operational tasks that managed platforms absorb for you.",
  'This page treats Azure Virtual Machines as a platform-engineering topic: VM sizing, images, managed disks, ephemeral OS disks, networking, accelerated networking, availability sets, availability zones, scale sets, Trusted Launch, extensions, maintenance behavior, backup and disaster recovery, cost controls, and the design choices that usually determine whether a workload should run on raw VMs at all.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Azure Virtual Machines are general-purpose virtual servers running in Microsoft datacenters. You can deploy a single VM, a pair of VMs, or fleets of instances through Virtual Machine Scale Sets. The VM abstraction sits below managed application platforms and above physical hardware, giving you broad guest-level control without buying or racking servers yourself.',
      'This service is the right mental model when you need a machine, not just a runtime. You manage the guest operating system, bootstrap software, storage mounts, SSH or RDP access, update cadence, and application dependencies. Azure handles the host fabric, hypervisor, hardware replacement, and integration with the broader Azure resource model.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams choose Azure VMs when they need host-level flexibility, custom software stacks, lift-and-shift compatibility, specialized VM sizes, GPU or memory-heavy shapes, or workloads that do not fit a higher-level service. VMs are also the fallback when the organization wants Azure but the application is not ready to be replatformed yet.',
      'They are also common as building blocks under larger designs: domain controllers, jump hosts, self-hosted CI runners, network virtual appliances, stateful services, legacy enterprise software, custom databases, and migration landing zones. In other words, VMs are often the broadest compute escape hatch in Azure.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think of Azure VMs as flexible compute plus a set of surrounding architectural choices. The VM itself is only one part. The real design includes image strategy, managed identity, network placement, disks, backup policy, maintenance tolerance, patching, availability topology, and cost controls. If those pieces are vague, the VM design is not complete yet.',
      'The most common Azure VM failure mode is not that the VM cannot be created. It is that teams treat it like an isolated server and forget that cloud reliability and cost come from fleet-level choices such as zones, scale sets, disk types, maintenance handling, and automation. A VM is easy to launch. A VM estate is harder to operate well.',
    ],
  },
  {
    title: 'Core building blocks',
    paragraphs: [
      'A VM usually comes with a resource group, network interface, subnet placement, OS disk, optional data disks, access credentials or SSH keys, optional public IP, and a chosen image and size. Managed identity, extensions, backup registration, monitoring, and Update Manager often become part of the real operating baseline shortly after creation.',
      'Around that baseline, Azure gives you several scaling and availability options. You can spread instances across availability zones, group them in availability sets, or move to Virtual Machine Scale Sets when the workload needs centrally managed fleets, autoscale, or image-based horizontal growth.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      'Several current platform details matter. Microsoft documents Trusted Launch as the default state for newly created Gen2 VMs and scale sets. Ephemeral OS disks with NVMe placement are now generally available on supported v6 sizes. The Azure VM backup docs also note that the Enhanced policy supports newer disk offerings and more frequent backups than the older Standard policy.',
      'A concrete lifecycle deadline also matters right now: Microsoft states that Azure unmanaged disks are being retired on March 31, 2026. That means any remaining VHD-and-storage-account based VM estates need migration planning to managed disks immediately rather than treating the older model as indefinitely supported.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'VM for single-machine control',
    detail:
      'Use individual virtual machines when you need a standalone server with explicit control over image, disks, network interfaces, and administrative access.',
  },
  {
    title: 'Availability set for local high availability',
    detail:
      'Availability sets spread related VMs across update domains and fault domains in a region when zones are not the chosen pattern or not available.',
  },
  {
    title: 'Availability zones for stronger failure isolation',
    detail:
      'Zones spread VMs across physically separate datacenter locations in a region and are the stronger default when zonal support exists and the workload needs better resiliency.',
  },
  {
    title: 'Scale sets for fleet management',
    detail:
      'Virtual Machine Scale Sets are the right abstraction for large groups of similar VMs that need autoscale, centralized image rollout, and uniform operational control.',
  },
  {
    title: 'Managed disks as the default storage model',
    detail:
      'For modern Azure VM designs, managed disks are the normal disk model. They simplify storage management, support richer performance tiers, and avoid the retiring unmanaged-disk pattern.',
  },
]

const fitGuide = [
  {
    title: 'Need full operating-system control and custom software installation',
    choice: 'Azure Virtual Machines are the natural fit.',
  },
  {
    title: 'Need to lift and shift a legacy application that expects a server',
    choice: 'Azure VMs are often the landing zone, at least initially.',
  },
  {
    title: 'Need autoscaling fleets of similar instances',
    choice:
      'Use Azure VMs through Virtual Machine Scale Sets rather than manual one-off instances.',
  },
  {
    title: 'Need managed web hosting rather than machine management',
    choice: 'App Service or another higher-level service is usually better.',
  },
  {
    title: 'Need event-driven or scale-to-zero behavior more than server control',
    choice: 'Functions or Container Apps may fit better than VMs.',
  },
  {
    title: 'Need a broad escape hatch for software that does not fit PaaS',
    choice: "VMs remain Azure's most flexible general compute option.",
  },
]

const keyTakeaways = [
  'Azure Virtual Machines give maximum control but also maximum operational responsibility compared with managed Azure compute services.',
  'Sizing, disk type, image strategy, networking, and availability topology are the core design variables.',
  'Managed disks are the modern default and unmanaged disks are being retired on March 31, 2026.',
  'Availability zones and scale sets are the preferred building blocks for higher availability and scale in modern VM estates.',
  'Trusted Launch, patching, backup, and maintenance handling are not optional afterthoughts; they are part of the baseline architecture.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-sizing',
    heading: 'Sizing, VM Families, and Capacity Planning',
    paragraphs: [
      'Azure VM sizes define vCPU count, memory, temporary storage, network bandwidth, and access to specialized hardware such as GPUs or high-throughput storage paths. Microsoft groups sizes into families such as general purpose, compute optimized, memory optimized, storage optimized, GPU, and high performance compute. The choice is not cosmetic. It determines cost, performance shape, quota consumption, and sometimes regional availability constraints.',
      'Right-sizing a VM is both a cost and reliability exercise. Over-sizing burns money continuously. Under-sizing causes CPU saturation, memory pressure, disk bottlenecks, or unstable application behavior that teams often misdiagnose as software defects. Mature teams size from observed workload behavior, not by guessing high and hoping the problem disappears.',
      'You should also plan for quota and capacity. A design can be logically correct but still fail at deployment or scale-up if the chosen size is constrained in the target region or subscription. Good Azure VM planning includes alternative sizes, quota review, and a realistic expectation of what happens during zonal or regional pressure.',
    ],
  },
  {
    id: 'core-images',
    heading: 'Images, Golden Images, and Bootstrapping Strategy',
    paragraphs: [
      'Every VM starts from an image. Azure Marketplace images, custom managed images, Azure Compute Gallery images, and specialized images all serve different operational patterns. Marketplace images are the fastest way to start, but large estates usually standardize on a curated image pipeline instead of configuring every machine from scratch after boot.',
      'The image strategy is one of the most important architectural decisions in a VM platform. If teams rely on long cloud-init or post-boot scripts for everything, deployments become slow and drift-prone. If they rely on curated base images plus a small amount of runtime configuration, provisioning becomes faster, more repeatable, and easier to secure.',
      'Azure Compute Gallery matters here because it supports image versioning and sharing at scale. Once VM fleets become important, images should be treated as versioned platform artifacts, not as one-time setup conveniences.',
    ],
  },
  {
    id: 'core-disks',
    heading: 'Managed Disks, Disk Types, Performance, and Ephemeral OS Disks',
    paragraphs: [
      'Managed disks are the default storage model for Azure VMs. Microsoft documents several disk types including Standard HDD, Standard SSD, Premium SSD, Premium SSD v2, and Ultra Disk, each with different performance, latency, and pricing profiles. Disk design should reflect workload behavior: boot volume, database log volume, data volume, cache sensitivity, and snapshot or backup needs all matter.',
      'Performance planning means looking beyond raw capacity. IOPS, throughput, host caching, bursting behavior, and attachment limits influence real application performance. Many VM issues that appear to be compute problems are actually disk bottlenecks caused by the wrong SKU or a poor separation of OS and data paths.',
      'Ephemeral OS disks are a special case. They store the OS disk on local VM storage instead of remote managed storage and can speed reimage operations for stateless or easily recreated nodes. They are powerful for scale sets and disposable infrastructure, but they are the wrong choice for machines whose OS disk must survive host redeployment or local hardware loss.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking, NIC Design, NSGs, Load Balancing, and Accelerated Networking',
    paragraphs: [
      'Azure VMs live inside virtual networks through one or more network interfaces. The network design includes subnet placement, private IP strategy, optional public IP exposure, DNS resolution, network security groups, user-defined routes, firewall integration, and often load balancer placement. The VM itself is rarely the networking design; it is a consumer of it.',
      'Accelerated networking is a key performance feature for supported VM sizes and images. Microsoft documents that it enables single root I/O virtualization to reduce latency, jitter, and CPU overhead on networking workloads. For modern production systems with significant east-west or north-south traffic, it should be considered part of the baseline design rather than an obscure optimization.',
      'The safest default is private-first networking. Public IPs, open management ports, and broad inbound rules should be used only with clear reason and compensating controls such as Bastion, just-in-time access, or hardened jump paths. Cloud networking mistakes are often more damaging than VM sizing mistakes because they widen attack surface directly.',
    ],
  },
  {
    id: 'core-availability',
    heading: 'Availability Sets, Availability Zones, and Failure Domains',
    paragraphs: [
      'High availability for Azure VMs is an explicit design choice. Availability sets distribute VMs across fault domains and update domains to reduce simultaneous infrastructure and planned-maintenance impact. Availability zones distribute VMs across physically separate datacenter zones within a region and offer a stronger isolation story when supported by the workload and region.',
      'In modern designs, zones are usually the stronger default for important production workloads because they offer clearer physical separation. Availability sets still matter for compatibility, older architectures, or regions and designs where zones are not the chosen model. The critical point is that launching two VMs in one region without either pattern is not a high-availability strategy.',
      'Load balancing, replicated state, quorum behavior, and disk architecture still matter. Azure can spread VMs across failure domains, but it cannot make a stateful application resilient by itself. You still design the application and data layer for failover and consistency.',
    ],
  },
  {
    id: 'core-scale-sets',
    heading: 'Virtual Machine Scale Sets and Fleet Operations',
    paragraphs: [
      'Virtual Machine Scale Sets are the Azure abstraction for managing large sets of similar VMs. Microsoft documents support for autoscale, zonal spreading, rolling upgrades, and orchestration across uniform or flexible deployment models. Scale sets are what turn VM usage from single-server operations into fleet management.',
      'This matters because many workloads are not really single-VM systems. Web front ends, API tiers, worker pools, self-hosted runner farms, and many batch fleets are better thought of as horizontally managed groups of instances. If the architecture needs image-based growth or automated replacement, scale sets are usually the right construct instead of hand-maintained independent VMs.',
      'Scale sets do not remove operational responsibility. They simply give you better fleet primitives. You still own image versions, safe rollout sequencing, instance health signals, application warm-up, scale rules, and how the workload handles replacement or reimage events.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Trusted Launch, Encryption, Managed Identity, and Secure Access',
    paragraphs: [
      'Security on Azure VMs starts before login. Microsoft documents Trusted Launch as the modern security baseline for Gen2 virtual machines, including secure boot and virtual TPM support. New VM estates should assume Trusted Launch unless there is a clear compatibility reason not to. A stronger default image posture is one of the easiest improvements you can make in IaaS.',
      'Guest access also needs discipline. SSH keys should replace password logins for Linux where possible. Windows administration should be limited through hardened paths such as Azure Bastion, just-in-time VM access, or tightly constrained management networks. Managed identity should be used for Azure resource access instead of embedding credentials inside startup scripts or configuration files.',
      'Disk encryption, Key Vault integration, Defender for Cloud recommendations, and extension governance all matter as well. In Azure VMs, security is not just one feature. It is the sum of image hygiene, network exposure, guest hardening, secret handling, and control-plane policy.',
    ],
  },
  {
    id: 'core-extensions',
    heading: 'Extensions, Bootstrap Automation, and Guest Configuration',
    paragraphs: [
      'VM extensions let Azure install or configure capabilities inside the guest after deployment. Common examples include Custom Script, Azure Monitor Agent, Dependency Agent, DSC, and extension-based integration with backup, security, or configuration tooling. Extensions are useful, but they should be treated as controlled automation hooks rather than a place to dump unlimited bootstrap logic.',
      'The best VM bootstrap model is layered. Use a curated image for the stable foundation. Use cloud-init or a small startup script for environment-specific configuration. Use extensions for targeted platform integrations. When every machine relies on a huge chain of fragile extension steps, provisioning becomes slow, hard to debug, and difficult to reproduce.',
      'Extensions also carry governance implications. Because they can execute privileged operations inside the guest, organizations should know which extensions are approved and how extension rollout is audited and monitored.',
    ],
  },
  {
    id: 'core-maintenance',
    heading: 'Patching, Maintenance, Reboots, and Update Management',
    paragraphs: [
      'Azure handles host maintenance, but you still handle most guest maintenance. That includes OS patching, application patching, image refresh, and validation that the workload survives restarts or reimages cleanly. Many teams underestimate this difference when they move from PaaS or containers to VMs.',
      'Microsoft documents several maintenance behaviors and options, including scheduled events, maintenance windows, maintenance configurations, live migration in some cases, and Azure Update Manager for orchestrating OS patching at scale. The operational question is not whether maintenance happens. It is whether your system is designed to absorb it without outage.',
      'A mature VM platform assumes reboots happen. It assumes instances get patched, hosts get serviced, and manual recovery may be necessary when the guest is misconfigured. If your application cannot tolerate any restart or replacement, that is a workload-architecture problem that VM settings alone will not solve.',
    ],
  },
  {
    id: 'core-backup',
    heading: 'Backup, Snapshots, Disaster Recovery, and State Protection',
    paragraphs: [
      "Azure Backup provides VM-level protection, and Microsoft's current docs highlight the Enhanced policy as the richer model for many modern scenarios. Backups, however, are only one part of resilience. You also need to know whether your recovery design depends on crash-consistent recovery, application-consistent recovery, disk snapshots, replication, or a separate disaster recovery plan such as Azure Site Recovery.",
      'The right backup model depends on the workload. Stateless nodes may need no VM backup at all if they are image-recreated. Stateful line-of-business VMs may need frequent backup plus tested restore procedures. Databases often need application-aware backup strategies beyond generic VM capture. Treating every VM as equivalent is usually a recovery-design mistake.',
      'The key operational rule is simple: if you have not tested restore, you do not have a proven backup strategy. Azure gives strong backup primitives, but restore time, dependency recreation, DNS cutover, and application correctness remain engineering concerns you must validate yourself.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Controls, Reservations, Spot, and Rightsizing',
    paragraphs: [
      'Azure VM cost depends on size, region, operating system licensing, attached disks, network egress, backup, and any surrounding services such as load balancers or Bastion. Compute charges are the visible part, but storage and operational add-ons matter too. Cost discipline begins with choosing the smallest size that meets performance needs and reevaluating it over time.',
      'Microsoft provides several cost levers including Azure Hybrid Benefit for eligible Windows Server and SQL Server licensing, Reserved VM Instances, Savings Plans, and Spot VMs for interruptible workloads. Spot is powerful for batch or disposable worker patterns, but it is the wrong choice for machines that cannot tolerate eviction.',
      'The biggest long-term VM cost problem is drift. Machines are launched for temporary reasons, left oversized, rarely reviewed, and gradually become permanent spend. Mature platforms use tagging, inventory review, power scheduling where appropriate, and clear ownership to keep VM estates from silently expanding.',
    ],
  },
  {
    id: 'core-compare',
    heading: 'Azure VMs versus Higher-Level Azure Compute Services',
    paragraphs: [
      'Azure Virtual Machines should be compared against App Service, AKS, Functions, Container Apps, and managed databases before they are chosen by habit. VMs win when you need machine-level control, custom software, special drivers, or migration compatibility. They lose when the real need is simply to run HTTP code, scheduled jobs, or standard containers with minimal operational burden.',
      'This is why VMs are both essential and dangerous. They can run almost anything, which makes them the safest technical fallback. But because they can run almost anything, teams overuse them for workloads that would be cheaper, safer, and easier on a managed platform. The right question is not can it run on a VM. The right question is should this workload be a VM at all.',
      'In practical platform design, VMs are the general-purpose base layer. They are not the default recommendation for every new service. When a higher-level service can meet the requirement cleanly, the higher-level service usually produces a smaller long-term operations burden.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Golden-image plus light bootstrap',
    detail:
      'Bake common software and hardening into a shared image, then apply only environment-specific configuration at boot time.',
  },
  {
    title: 'Private-first VM networking',
    detail:
      'Keep application VMs on private addresses, publish traffic through load balancers or gateways, and expose direct management paths only when necessary.',
  },
  {
    title: 'Zones or scale sets for production tiers',
    detail:
      'Spread important production workloads across availability zones and use scale sets when the workload is really a fleet rather than a pet server.',
  },
  {
    title: 'Stateless nodes with ephemeral or replaceable roots',
    detail:
      'Use ephemeral OS disks or image-based rebuilds for instances that can be recreated quickly and do not need durable OS-disk state.',
  },
  {
    title: 'Managed identity everywhere possible',
    detail:
      'Let the VM authenticate to Azure services through managed identity instead of storing secrets in scripts or local files.',
  },
  {
    title: 'Separate OS and data concerns',
    detail:
      'Keep data on explicit managed disks or managed data services rather than treating the OS disk like the permanent home for application state.',
  },
]

const operationalChecklist = [
  'Choose a supported VM family and size based on measured workload behavior, not guesswork.',
  'Standardize on managed disks and identify any remaining unmanaged disks before the March 31, 2026 retirement date.',
  'Decide explicitly between availability sets, zones, and scale sets instead of assuming one VM equals sufficient reliability.',
  'Use private networking by default and minimize direct public exposure of management ports.',
  'Enable Trusted Launch for supported Gen2 workloads unless a compatibility constraint prevents it.',
  'Use managed identity, monitoring agents, backup policy, and update management as baseline controls, not optional extras.',
  'Document image ownership and how base images are refreshed and versioned.',
  'Test restart, redeploy, restore, and scale-out behavior before calling the workload production ready.',
  'Tag every VM with owner, environment, and lifecycle information so cost and cleanup remain tractable.',
  'Prefer higher-level services when host-level control is not actually required.',
]

const pitfalls = [
  'Launching VMs without deciding whether the workload should actually be on a managed platform instead.',
  'Treating two VMs in one region without zones or availability sets as a real high-availability design.',
  'Using the wrong disk type and then debugging storage bottlenecks as if they were application problems.',
  'Leaving management ports publicly exposed because it was convenient during setup.',
  'Relying on large brittle startup scripts instead of image discipline and small bootstrap steps.',
  'Ignoring host and guest maintenance until the first forced reboot becomes an outage.',
  'Keeping important state on the OS disk of machines that are meant to be replaceable.',
  'Skipping backup restore tests and assuming snapshot existence alone proves recoverability.',
  'Overusing self-managed VMs for workloads that could run more safely on App Service, Functions, or managed databases.',
  'Letting VM inventories drift without ownership, lifecycle tags, or rightsizing reviews.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-linux-vm',
    title: 'Create a basic Linux VM with SSH and managed identity',
    code: `az vm create \\
  --resource-group rg-platform-prod \\
  --name vm-api-01 \\
  --image Ubuntu2204 \\
  --size Standard_D4s_v5 \\
  --admin-username azureuser \\
  --generate-ssh-keys \\
  --public-ip-sku Standard \\
  --assign-identity \\
  --vnet-name vnet-prod \\
  --subnet app-sn \\
  --nsg app-nsg`,
    explanation:
      'This is the basic IaaS pattern: choose the image and size, place the VM in the right subnet, use SSH keys instead of password login, and assign a managed identity from day one so downstream Azure access does not require embedded secrets.',
  },
  {
    id: 'ex-data-disk',
    title: 'Attach a premium data disk to a running VM',
    code: `az vm disk attach \\
  --resource-group rg-platform-prod \\
  --vm-name vm-api-01 \\
  --name vm-api-01-data01 \\
  --new \\
  --size-gb 256 \\
  --sku Premium_LRS`,
    explanation:
      'Separating OS and application data is a core VM design habit. This example adds a managed premium data disk instead of overloading the OS disk with durable application state.',
  },
  {
    id: 'ex-spot',
    title: 'Create a Spot VM for interruptible batch work',
    code: `az vm create \\
  --resource-group rg-batch \\
  --name vm-worker-spot-01 \\
  --image Ubuntu2204 \\
  --size Standard_D8s_v5 \\
  --priority Spot \\
  --max-price -1 \\
  --eviction-policy Deallocate \\
  --admin-username azureuser \\
  --generate-ssh-keys`,
    explanation:
      'Spot pricing can dramatically reduce cost for disposable or checkpoint-friendly workloads. The tradeoff is eviction risk, so this pattern only fits batch or resilient worker scenarios, not critical stateful servers.',
  },
  {
    id: 'ex-scale-set',
    title: 'Create a zonal scale set for a stateless web tier',
    code: `az vmss create \\
  --resource-group rg-web-prod \\
  --name vmss-web-prod \\
  --image Ubuntu2204 \\
  --vm-sku Standard_D4s_v5 \\
  --instance-count 3 \\
  --zones 1 2 3 \\
  --upgrade-policy-mode rolling \\
  --load-balancer lb-web-prod \\
  --orchestration-mode Flexible`,
    explanation:
      'Once a workload is really a fleet, scale sets are usually the right abstraction. This example spreads instances across zones and manages them as a web tier rather than as three unrelated pet machines.',
  },
]

const glossaryTerms = [
  {
    term: 'Managed Disk',
    definition:
      'An Azure-managed virtual disk resource attached to a VM or scale set, with Azure handling the underlying storage-account mechanics.',
  },
  {
    term: 'Ephemeral OS Disk',
    definition:
      'An OS disk stored on local VM storage instead of remote Azure Storage, intended for fast-rebuild or disposable VM patterns.',
  },
  {
    term: 'Availability Set',
    definition:
      'A grouping that distributes VMs across update domains and fault domains to reduce correlated platform impact.',
  },
  {
    term: 'Availability Zone',
    definition:
      'A physically separate datacenter zone within an Azure region used for stronger failure-domain isolation.',
  },
  {
    term: 'Scale Set',
    definition:
      'An Azure resource for deploying and managing fleets of similar VMs with scaling and rolling-update capabilities.',
  },
  {
    term: 'Trusted Launch',
    definition:
      'A security model for supported Gen2 VMs that includes secure boot and virtual TPM features.',
  },
  {
    term: 'Accelerated Networking',
    definition:
      'A VM networking feature using SR-IOV to lower latency and CPU overhead for supported VM sizes.',
  },
  {
    term: 'Azure Compute Gallery',
    definition:
      'A service for sharing and versioning custom VM images across subscriptions or regions.',
  },
  {
    term: 'Spot VM',
    definition:
      'A discounted Azure VM that can be evicted when Azure capacity is needed elsewhere.',
  },
  {
    term: 'Extension',
    definition:
      'An Azure-managed mechanism for running configuration or agent installation actions inside the VM guest.',
  },
  {
    term: 'Temporary Disk',
    definition:
      'Local nonpersistent storage on some VM sizes that can be lost during maintenance, redeploy, or host movement.',
  },
  {
    term: 'Azure Hybrid Benefit',
    definition:
      'A licensing benefit that lets eligible customers apply existing Windows Server or SQL Server licenses to reduce Azure VM cost.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/virtual-machines/overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/availability',
  'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/accelerated-networking-overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/overview',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/maintenance-and-updates',
  'https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/windows/unmanaged-disks-deprecation',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/azure-hybrid-benefit-linux',
  'https://learn.microsoft.com/en-us/azure/virtual-machines/windows/hybrid-use-benefit-licensing',
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-sizing', label: 'Sizing and Families' },
    { id: 'core-images', label: 'Images' },
    { id: 'core-disks', label: 'Disks' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-availability', label: 'Availability' },
    { id: 'core-scale-sets', label: 'Scale Sets' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-extensions', label: 'Extensions' },
    { id: 'core-maintenance', label: 'Maintenance' },
    { id: 'core-backup', label: 'Backup and DR' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-vm-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-vm-help-page .win98-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.azure-vm-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.azure-vm-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-vm-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-vm-help-page .win98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.azure-vm-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-vm-help-page .win98-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.azure-vm-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-vm-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-vm-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-vm-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-vm-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-vm-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-vm-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-vm-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-vm-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-vm-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-vm-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-vm-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-vm-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-vm-help-page .win98-content p,
.azure-vm-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-vm-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-vm-help-page .win98-content ul,
.azure-vm-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-vm-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-vm-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-vm-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-vm-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-vm-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-vm-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-vm-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureVirtualMachinesPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromSearch(location.search))

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const url = new URL(window.location.href)
    const nextSearch = new URLSearchParams(url.search)
    const shouldClearHash = url.hash.length > 0
    if (nextSearch.get('tab') !== activeTab || shouldClearHash) {
      nextSearch.set('tab', activeTab)
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel])

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)
    if (!currentHash) {
      return
    }

    const container = contentRef.current
    const target = document.getElementById(currentHash)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })
  }, [activeTab])

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) {
      return
    }

    setActiveTab(tabId)
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })

    const url = new URL(window.location.href)
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="azure-vm-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main ref={contentRef} className="win98-content">
            <h1 className="win98-doc-title">{pageTitle}</h1>
            <p className="win98-doc-subtitle">{pageSubtitle}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="win98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="win98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-model" className="win98-section">
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="win98-divider" />

                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-ops-checklist" className="win98-section">
                  <h2 className="win98-heading">Operational Checklist</h2>
                  <ul>
                    {operationalChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="win98-section">
                    <h2 className="win98-heading">{example.title}</h2>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-sources" className="win98-section">
                  <h2 className="win98-heading">Primary Sources</h2>
                  <p>
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure Virtual Machines features, retirement dates,
                    pricing options, and size availability can change, so production decisions
                    should always be revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
