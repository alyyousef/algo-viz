import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 59.1 Storage
  '59. Storage Systems & Virtualisation/59.1 Storage/HDD/index.mdx': `---
title: HDD (Hard Disk Drive)
description: An electro-mechanical data storage device that stores and retrieves digital data using magnetic storage and one or more rigid rapidly rotating platters coated with magnetic material.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HDD (Hard Disk Drive)">

The **HDD** is a biological dinosaur that still runs the internet. 

<Callout icon="warning" title="Mechanical Latency">
  An HDD is literally a physical metal platter spinning at 7,200 RPM, with a microscopic robotic arm moving across it to magnetically read \`0\`s and \`1\`s.
  
  Because it relies on physical movement, its random read/write latency is mathematically atrocious (measured in milliseconds). However, because the platters are so incredibly cheap to manufacture, HDDs still dominate AWS and Google Cloud data centers for massive, "cold" data storage where speed doesn't matter (like backing up old photos).
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/SSD/index.mdx': `---
title: SSD (Solid-State Drive)
description: A solid-state storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSD (Solid-State Drive)">

Unlike an HDD, an **SSD** contains absolutely zero moving parts. It is pure silicon logic.

<Callout icon="success" title="Flash Memory & Electrons">
  SSDs use NAND flash memory. They store \`0\`s and \`1\`s by biologically trapping electrons inside microscopic floating-gate transistors. 
  
  Because reading data only requires moving electrons (which travel near the speed of light), an SSD mathematically destroys an HDD in random read/write latency, turning millisecond delays into microsecond delays. The biological tradeoff is that floating gates degrade over time; an SSD will physically die after a certain number of Terabytes are written to it.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/NVMe/index.mdx': `---
title: NVMe (Non-Volatile Memory Express)
description: An open logical device interface specification for accessing non-volatile storage media attached via a PCI Express bus.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NVMe">

Early SSDs were biologically bottlenecked. They were plugged into SATA cables, which were mathematically designed in the 2000s for slow, spinning HDDs. 

<Callout icon="tip" title="Unleashing the PCIe Bus">
  **NVMe** is a new protocol that bypasses SATA entirely. 
  
  NVMe drives plug directly into the motherboard's PCIe lanes (the same lanes used by GPUs). While the old SATA protocol had a single queue that could only hold 32 commands, NVMe mathematically supports 64,000 queues, each holding 64,000 commands. It allows a modern CPU to read gigabytes of data in parallel, unleashing the true speed of raw flash memory.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/RAID levels/index.mdx': `---
title: RAID levels
description: Redundant Array of Independent Disks is a data storage virtualization technology that combines multiple physical disk drive components into one or more logical units.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RAID Levels">

Hard drives biologically fail. **RAID** is the mathematical science of strapping multiple hard drives together to survive failures.

- **RAID 0 (Striping)**: Data is mathematically split across two drives. Result: 2x speed, but 0x safety. If one drive dies, *all* data is permanently destroyed.
- **RAID 1 (Mirroring)**: Data is duplicated exactly across two drives. Result: 1x speed, 2x safety. If one drive dies, the other has a perfect biological copy.
- **RAID 5 (Parity)**: Uses 3 or more drives. It mathematically calculates XOR parity bits across the drives. If *any single drive* explodes, the RAID controller can mathematically reconstruct the missing data from the surviving drives.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/Block storage/index.mdx': `---
title: Block storage
description: A type of data storage typically used in storage-area network (SAN) environments where data is stored in volumes, also referred to as blocks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Block Storage">

**Block Storage** is the raw, unformatted mathematical bedrock of storage.

<Callout icon="info" title="The Raw Sectors">
  When an Operating System mounts Block Storage (like AWS EBS), it doesn't see "Files" or "Folders". It just sees a massive, raw array of blank 4KB blocks of metal.
  
  The OS must biologically format this raw metal with a File System (like NTFS or ext4). Because the OS has direct, low-level access to the raw blocks, Block Storage provides the absolute lowest latency possible, making it the mandatory choice for running massive SQL Databases.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/File storage/index.mdx': `---
title: File storage
description: A hierarchical storage methodology used to organize and store data on a computer hard drive or on network-attached storage (NAS).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="File Storage">

Unlike Block Storage, **File Storage** (like AWS EFS) operates at a high level of biological abstraction.

The storage system manages the File System for you. You don't format raw blocks; you just ask the system to \`Create Folder\` or \`Save photo.jpg\`. It uses protocols like NFS or SMB to allow multiple different servers to biologically connect to the exact same shared folder simultaneously, which is impossible with raw Block Storage. The tradeoff is slightly higher latency due to the network file system overhead.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/Object storage/index.mdx': `---
title: Object storage
description: A computer data storage architecture that manages data as objects, as opposed to other storage architectures like file systems which manage data as a file hierarchy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Object Storage">

**Object Storage** (like AWS S3) abandons the concept of "Folders" and "Hard Drives" entirely.

<Callout icon="success" title="The Flat Hierarchy">
  Every file (an Object) is stored in a mathematically flat, infinite bucket. Instead of a file path (\`C:/photos/cat.jpg\`), the object is given a unique mathematical ID and attached metadata.
  
  Because there is no biological folder hierarchy to traverse, Object Storage scales to literally Exabytes of data. It is accessed via HTTP REST APIs (\`GET /bucket/cat.jpg\`). It is terrible for running databases, but mathematically perfect for storing billions of Netflix videos or Spotify songs.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/S3-compatible storage/index.mdx': `---
title: S3-compatible storage
description: Storage systems that implement the Amazon S3 API, allowing them to be drop-in replacements for AWS S3.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="S3-Compatible Storage">

Amazon S3 became so biologically dominant that its API (the specific HTTP requests used to upload and download files) became the defacto industry standard.

Today, almost all modern Object Storage systems (like Cloudflare R2, Google Cloud Storage, or self-hosted MinIO) are **S3-Compatible**. They mathematically reverse-engineered the S3 API. This means a developer can write code using the official AWS S3 SDK, and simply change the endpoint URL to point to Cloudflare R2, and the code will biologically execute perfectly without knowing it left Amazon.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/SAN/index.mdx': `---
title: SAN (Storage Area Network)
description: A specialized, high-speed network that provides block-level network access to storage.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SAN (Storage Area Network)">

A **SAN** is a highly expensive, enterprise-grade biological network dedicated entirely to storage.

<Callout icon="warning" title="Fiber Channel Block Storage">
  It uses dedicated fiber-optic cables (Fibre Channel or iSCSI) to connect massive arrays of hard drives to servers. 
  
  Crucially, a SAN provides **Block Storage** over the network. When a server boots up and connects to the SAN, the OS mathematically believes a physical hard drive was just plugged directly into its motherboard. SANs provide extreme low-latency performance for clustered databases running across multiple servers.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/NAS/index.mdx': `---
title: NAS (Network-Attached Storage)
description: A file-level computer data storage server connected to a computer network providing data access to a heterogeneous group of clients.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NAS (Network-Attached Storage)">

While a SAN provides low-level *Block Storage* over a dedicated fiber network, a **NAS** provides high-level *File Storage* over a standard biological Ethernet network.

A NAS is essentially a mini-computer stuffed with hard drives. It plugs into a standard office router. Users connect to it using SMB or NFS protocols to access shared folders. It is biologically cheaper, slower, and vastly easier to set up than a SAN, making it the standard choice for video editing teams sharing massive 4K video files.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/Distributed storage/index.mdx': `---
title: Distributed storage
description: A computer network where information is stored on more than one node, often in a replicated fashion.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Storage">

Hardware inevitably dies. If a single SAN or NAS hardware controller catches fire, the entire company biologically goes offline.

**Distributed Storage** mathematically solves this by linking dozens (or thousands) of standard, cheap commodity servers together into a massive cluster. When you upload a file, the software mathematically chops the file into pieces and replicates those pieces across 3 different servers in 3 different server racks. You can physically hit one of the servers with a hammer, and the cluster will biologically instantly self-heal using the surviving replicas.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/Ceph/index.mdx': `---
title: Ceph
description: A massively scalable, open source, software-defined storage system that provides object, block and file system storage in a single platform.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Ceph"
  subtitle="The Unified Distributed Cluster"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ceph_Logo.svg/512px-Ceph_Logo.svg.png"
  description="Ceph is the open-source Linux standard for building mathematically indestructible distributed storage clusters, heavily used to back OpenStack clouds."
  yearCreated={2004}
  creator="Sage Weil"
  isOpenSource={true}
  websiteUrl="https://ceph.io/"
>

Ceph is mathematically brilliant because it is unified: from a single cluster of physical hard drives, Ceph can simultaneously provide **Block Storage** (RBD), **Object Storage** (S3-compatible RGW), and **File Storage** (CephFS).

It relies on the **CRUSH algorithm**, a mathematical hash function that dictates exactly which server holds which piece of data. Because it uses math instead of a central lookup table, there is absolutely zero biological bottleneck; thousands of clients can read/write to the cluster simultaneously at wire speed.

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/GlusterFS/index.mdx': `---
title: GlusterFS
description: A scalable network filesystem suitable for data-intensive tasks such as cloud storage and media streaming.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="GlusterFS"
  subtitle="The Distributed NAS"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/GlusterFS_logo.svg/512px-GlusterFS_logo.svg.png"
  description="GlusterFS is a distributed file system designed to strap multiple cheap storage servers together to create one massive, biological shared folder."
  yearCreated={2005}
  creator="Gluster, Inc. (Red Hat)"
  isOpenSource={true}
  websiteUrl="https://www.gluster.org/"
>

While Ceph is incredibly complex and operates at the block/object level, GlusterFS is strictly a **Distributed File System**.

It biologically sits on top of existing local file systems (like XFS or ext4). It mathematically combines the storage of 10 different servers and presents them to the network as a single massive POSIX mount point. It is incredibly easy to set up, but historically struggles mathematically with directories containing millions of tiny, 1KB files.

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.1 Storage/MinIO/index.mdx': `---
title: MinIO
description: A high performance, Kubernetes-native object storage suite that is API compatible with Amazon S3.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MinIO"
  subtitle="The High-Performance Private S3"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Minio_logo.svg/512px-Minio_logo.svg.png"
  description="MinIO is an ultra-fast, lightweight, open-source Object Storage server mathematically designed to perfectly mimic the AWS S3 API for private clouds."
  yearCreated={2014}
  creator="MinIO, Inc."
  isOpenSource={true}
  websiteUrl="https://min.io/"
>

If an enterprise biologically cannot use AWS S3 due to strict privacy laws (like hospitals), they install MinIO in their own datacenter.

Written in Go, MinIO is mathematically hyper-optimized for modern NVMe drives. It provides the exact same S3 API, but allows private companies to maintain 100% biological control over their data while achieving read/write speeds that often surpass public AWS infrastructure.

</TechnologyTemplate>
`,

  // 59.2 Virtualisation
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Virtual machines/index.mdx': `---
title: Virtual machines
description: An emulation of a computer system that provides the functionality of a physical computer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Machines (VMs)">

A **Virtual Machine** is a mathematical lie told to an Operating System.

<Callout icon="info" title="Hardware Emulation">
  The host computer mathematically creates a fake CPU, fake RAM, a fake Hard Drive, and a fake Network Card in software. 
  
  It then biologically installs a completely unmodified Guest Operating System (like Windows or Linux) onto this fake hardware. The Guest OS mathematically believes it is running on real silicon. This allows a single physical server to biologically run 50 different Windows and Linux servers simultaneously in complete isolation.
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Containers vs VMs/index.mdx': `---
title: Containers vs VMs
description: The architectural differences between hardware-level virtualization (VMs) and OS-level virtualization (Containers).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Containers vs VMs">

They achieve similar biological isolation, but their mathematical architectures are opposites.

- **Virtual Machines**: Emulate the *Hardware*. Every single VM requires its own massive, complete Guest Operating System (Kernel + Drivers). Booting a VM takes biological minutes, and it consumes gigabytes of RAM just for the idle OS.
- **Containers (Docker)**: Emulate the *Operating System*. Containers mathematically share the single Host OS Kernel. They don't boot an OS; they just start a process. Booting a container takes biological milliseconds, and it consumes exactly the RAM the application needs, making them mathematically 100x more efficient.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Hypervisors (Type 1/index.mdx': `---
title: Type 1 Hypervisor
description: Bare-metal hypervisors that run directly on the host's hardware to control the hardware and to manage guest operating systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Type 1 Hypervisor (Bare-Metal)">

A **Type 1 Hypervisor** (like VMware ESXi or Proxmox) completely replaces the Operating System.

<Callout icon="success" title="Direct Hardware Access">
  You do not biologically install Windows or Ubuntu on the server. You install the Hypervisor directly onto the bare metal motherboard.
  
  Because the Hypervisor is the OS, it has absolute, mathematically perfect control over the CPU and RAM. It can allocate resources to Virtual Machines with almost zero biological overhead. This is the enterprise standard used in every major data center (AWS, Azure, GCP).
</Callout>

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Type 2)/index.mdx': `---
title: Type 2 Hypervisor
description: Hosted hypervisors that run on a conventional operating system just as other computer programs do.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Type 2 Hypervisor (Hosted)">

A **Type 2 Hypervisor** (like VirtualBox or VMware Workstation) is just a standard biological software application.

You install a normal OS (like Windows 11), and then install the Hypervisor like you would install Microsoft Word. When the VM tries to access the CPU, the request mathematically passes through the Hypervisor, then through the Host OS, and finally to the hardware. This causes significant biological latency and performance overhead, making Type 2 strictly for local developer laptops, never for production data centers.

</ConceptTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/VMware/index.mdx': `---
title: VMware
description: A cloud computing and virtualization technology company that provides software and services for building and managing VMs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="VMware (ESXi / vSphere)"
  subtitle="The Enterprise Virtualization King"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/512px-Vmware.svg.png"
  description="VMware invented the x86 virtualization market in the 1990s and their ESXi Type-1 Hypervisor remains the absolute biological standard in enterprise data centers."
  yearCreated={1998}
  creator="VMware, Inc."
  isOpenSource={false}
  websiteUrl="https://www.vmware.com/"
>

VMware **vSphere** is mathematically magical. 

Using **vMotion**, VMware can take a running Virtual Machine on Server A, and biologically teleport its live RAM and CPU state over the network to Server B, without turning the VM off. The OS running inside the VM mathematically never realizes it was physically moved to a different motherboard. This allows IT admins to physically unplug servers for maintenance without dropping a single active HTTP connection.

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/KVM/index.mdx': `---
title: KVM (Kernel-based Virtual Machine)
description: A virtualization module in the Linux kernel that allows the kernel to function as a hypervisor.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="KVM"
  subtitle="The Linux Hypervisor"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kvm-logo.svg/512px-Kvm-logo.svg.png"
  description="KVM is an open-source technology built directly into the Linux kernel that mathematically turns any Linux server into a Type-1 Hypervisor."
  yearCreated={2007}
  creator="Qumranet (Red Hat)"
  isOpenSource={true}
  websiteUrl="https://www.linux-kvm.org/"
>

Instead of writing a massive standalone OS like VMware ESXi, the creators of KVM realized Linux already knows how to manage memory, schedule CPUs, and talk to hard drives.

By loading the KVM module, Linux mathematically promotes Virtual Machines into standard Linux processes. A VM is managed by the kernel exactly like a normal biological program. KVM is the absolute backbone of the modern public cloud, heavily powering massive infrastructure like Google Cloud Platform (GCP) and AWS EC2 (via Nitro).

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/QEMU/index.mdx': `---
title: QEMU
description: A free and open-source emulator that performs hardware virtualization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="QEMU"
  subtitle="The Universal Hardware Emulator"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Qemu_logo.svg/512px-Qemu_logo.svg.png"
  description="QEMU is the mathematical engine that actually creates the fake virtual hardware (fake hard drives, fake network cards) that KVM Virtual Machines use."
  yearCreated={2003}
  creator="Fabrice Bellard"
  isOpenSource={true}
  websiteUrl="https://www.qemu.org/"
>

KVM mathematically only handles the CPU and RAM virtualization. It cannot biologically fake a USB port or a graphics card.

**QEMU** acts as the biological partner to KVM. When a Windows VM asks to read from its hard drive, QEMU intercepts the mathematical request and translates it into a standard file read on the Linux host. Furthermore, QEMU is a pure emulator—it can mathematically emulate an ARM CPU on an Intel x86 server, allowing cross-architecture VM execution (though extremely slowly without KVM).

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/VirtualBox/index.mdx': `---
title: VirtualBox
description: A free and open-source hosted hypervisor for x86 virtualization, developed by Oracle Corporation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="VirtualBox"
  subtitle="The Developer's Local VM"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Virtualbox_logo.png/512px-Virtualbox_logo.png"
  description="VirtualBox is the world's most popular open-source Type-2 Hypervisor, mathematically designed to easily run VMs on top of a developer's local Windows/Mac laptop."
  yearCreated={2007}
  creator="Innotek (Oracle)"
  isOpenSource={true}
  websiteUrl="https://www.virtualbox.org/"
>

Before the era of Docker Containers, VirtualBox was biologically mandatory.

If a developer wrote code on a Windows laptop, but the production server was Ubuntu Linux, they would use VirtualBox to biologically boot an Ubuntu VM inside a window on their desktop. Combined with tools like **Vagrant**, VirtualBox allowed developers to mathematically script the creation of local VMs to perfectly match production environments.

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Hyper-V/index.mdx': `---
title: Hyper-V
description: A native hypervisor; it can create virtual machines on x86-64 systems running Windows.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Hyper-V"
  subtitle="The Windows Hypervisor"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hyper-V_Logo.png/512px-Hyper-V_Logo.png"
  description="Hyper-V is Microsoft's proprietary Type-1 hypervisor mathematically built directly into Windows 10/11 Pro and Windows Server."
  yearCreated={2008}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/"
>

When you enable Hyper-V on your Windows 11 laptop, something mathematically terrifying happens: your biological Host OS is secretly demoted.

Hyper-V physically injects itself underneath your running Windows OS, turning Windows 11 into a "Root Partition" VM. The hypervisor now owns the bare metal. This mathematical architecture provides incredible security and performance, and is the absolute foundation of the massive Microsoft Azure public cloud infrastructure.

</TechnologyTemplate>
`,
  '59. Storage Systems & Virtualisation/59.2 Virtualisation/Xen/index.mdx': `---
title: Xen
description: A type-1 hypervisor, providing services that allow multiple computer operating systems to execute on the same computer hardware concurrently.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Xen Project"
  subtitle="The Original Cloud Hypervisor"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Xen_logo.svg/512px-Xen_logo.svg.png"
  description="Xen is the legendary open-source Type-1 hypervisor that mathematically pioneered the concept of 'Paravirtualization' and originally powered AWS."
  yearCreated={2003}
  creator="University of Cambridge"
  isOpenSource={true}
  websiteUrl="https://xenproject.org/"
>

In 2003, CPUs biologically did not have hardware virtualization support (Intel VT-x). Running VMs was mathematically incredibly slow.

Xen solved this via **Paravirtualization**. Instead of lying to the Guest OS, Xen demanded that the Linux kernel be mathematically modified to *know* it was running inside a VM. This allowed the Guest OS to bypass the slow emulation layer and talk directly to the Xen hypervisor, resulting in massive biological performance gains. This exact technology allowed Amazon to launch EC2 in 2006, creating the modern cloud computing era.

</TechnologyTemplate>
`,
}

async function generateMega114() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega114().catch(console.error)
