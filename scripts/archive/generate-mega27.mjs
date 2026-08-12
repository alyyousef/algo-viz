import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/macOS/index.mdx': `---
title: macOS
description: Apple's primary desktop operating system, built on a certified Unix foundation (Darwin) with a highly polished proprietary GUI (Aqua).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="macOS">

**macOS** (formerly Mac OS X) is the operating system that powers Apple's Mac computers. It represents one of the most successful marriages of open-source engineering and closed-source proprietary design in software history.

## The Unix Foundation (Darwin)

Underneath the beautiful, user-friendly graphical interface, macOS is a hardcore, certified Unix operating system.

The core of macOS is called **Darwin**. Darwin is an open-source operating system created by Apple, heavily derived from **FreeBSD** and the **Mach microkernel**. 
Because it is a certified Unix OS, developers can open the macOS Terminal and natively use standard Unix utilities (like TICK1grepTICK1, TICK1bashTICK1, and TICK1sshTICK1) exactly as they would on Linux, without needing virtual machines or translation layers.

<Callout icon="success" title="The XNU Kernel">
  The specific kernel powering Darwin (and therefore macOS) is called **XNU** (X is Not Unix). 
  XNU is a highly unusual **Hybrid Kernel**. It attempts to combine the extreme speed of a Monolithic Kernel (like Linux) with the modular security of a Microkernel (Mach), resulting in a unique, highly performant architecture.
</Callout>

## The Proprietary Layers

While the Darwin foundation is open-source, everything sitting on top of it is closed-source and fiercely protected by Apple:
- **Aqua**: The iconic, hardware-accelerated graphical user interface.
- **Cocoa**: The massive, object-oriented API framework (originally written in Objective-C, now heavily transitioning to Swift) that developers use to write native Mac apps.
- **Metal**: Apple's proprietary, low-overhead hardware graphics API, designed as a direct competitor to Vulkan and DirectX.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/iOS/index.mdx': `---
title: iOS
description: The mobile operating system powering the iPhone, sharing its core XNU kernel with macOS but fundamentally redesigned for touch, battery life, and extreme security.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="iOS">

When Apple introduced the iPhone in 2007, Steve Jobs famously stated that it "runs OS X." This was true: **iOS** is fundamentally the exact same operating system as macOS, simply stripped down and hyper-optimized for mobile hardware.

## The Shared Foundation

iOS shares the exact same **Darwin foundation and XNU Hybrid Kernel** as macOS. It uses the same networking stack, the same file system (APFS), and the same core libraries.

However, the user-space layer is completely different. Where macOS uses the "Cocoa" framework for windowed, mouse-driven apps, iOS uses the **Cocoa Touch** framework, built entirely around multi-touch gestures, swipe physics, and single-window fullscreen applications.

<Callout icon="warning" title="The Walled Garden">
  Unlike macOS (where you can download any software from the internet), iOS is a completely closed ecosystem. The OS is cryptographically locked to only execute binaries that have been digitally signed by Apple. Unless you "Jailbreak" the device by exploiting a kernel vulnerability, the App Store is the only legal way to install software.
</Callout>

## Extreme Sandboxing

Because iOS is designed for consumer safety, its security model is significantly more restrictive than desktop OSs:
- **Application Sandboxing**: Every app is strictly confined to its own isolated container on the SSD. A flashlight app physically cannot browse your photo library unless you explicitly grant it permission via a secure OS-level prompt.
- **Background Execution**: In macOS, an app can run silently in the background forever. In iOS, the kernel will mercilessly freeze and kill background applications after a few seconds to preserve RAM and battery life, forcing developers to rely on Apple's Push Notification Service to receive updates.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/iPadOS/index.mdx': `---
title: iPadOS
description: A fork of iOS specifically optimized for tablet form factors, introducing desktop-class multitasking and peripheral support.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="iPadOS">

For the first nine years of its existence, the iPad ran the exact same operating system as the iPhone (iOS). However, as iPads gained powerful desktop-class processors (the M-series chips) and keyboard/mouse accessories, the single-window paradigm of iOS became a massive bottleneck.

In 2019, Apple officially forked the OS into **iPadOS**.

## Bridging Mobile and Desktop

While the underlying XNU kernel and Cocoa Touch APIs remain identical to iOS, iPadOS introduced massive user-space changes designed to blur the line between a tablet and a Mac:

1. **Stage Manager**: A complex windowing system that allows users to resize and overlap multiple applications simultaneously, breaking away from the strict full-screen mobile paradigm.
2. **Desktop-Class Safari**: The OS intentionally spoofs its User-Agent to tell websites it is a macOS device, forcing servers to deliver the complex, desktop versions of websites (like Google Docs or WordPress) rather than mobile layouts.
3. **Peripheral Support**: Deep, native support for trackpads, mice, external 4K monitors, and external USB-C hard drives.

<Callout icon="info" title="The Developer Dilemma">
  Despite its "desktop" features, iPadOS still enforces the strict **iOS Walled Garden and Sandboxing rules**. Because developers cannot access the terminal, cannot compile code natively without restrictions, and must go through the App Store, many power users still view iPadOS as a "mobile" OS rather than a true macOS replacement.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/tvOS/index.mdx': `---
title: tvOS
description: The Apple OS designed for the living room, heavily focused on media consumption, the "10-foot UI", and strict storage limitations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="tvOS">

**tvOS** is the operating system that powers the Apple TV set-top box. Like all Apple operating systems, it is built on the Darwin/XNU core, but its user-space is entirely redesigned for the "10-foot interface"—meaning it is built to be viewed from 10 feet away and controlled entirely by a simple directional remote.

## The TVML Framework

While developers can build tvOS apps using standard Swift and SwiftUI, Apple introduced a unique framework for tvOS called **TVML (TV Markup Language)**. 

TVML allows developers to build rich, native-looking television apps (like Netflix or Hulu) using nothing but JavaScript and XML. The developer hosts the XML files on their own web server, and the tvOS device fetches and renders them as native UI components on the fly.

<Callout icon="warning" title="No Persistent Storage">
  Because the Apple TV has very little physical flash storage (e.g., 64GB), the OS enforces a radical storage rule: **Apps are not allowed to permanently save data to the hard drive.** 
  An app can download a 2GB movie cache, but the OS Kernel is allowed to instantly delete that cache without warning if the system needs space. All persistent data (like game save files) must be synced directly to iCloud.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/watchOS/index.mdx': `---
title: watchOS
description: Apple's most resource-constrained OS, utilizing extreme power-saving heuristics to run a Unix kernel on a microscopic battery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="watchOS">

**watchOS** powers the Apple Watch. It is a stunning engineering achievement: running a fully certified Unix-based operating system (Darwin/XNU) on a device with the battery capacity of a single AAA battery.

## Extreme Power Management

To ensure the watch lasts an entire day, watchOS is arguably the most draconian operating system Apple has ever built regarding background execution.

In standard iOS, an app might be allowed a few seconds to finish a task in the background. In watchOS, the moment the user drops their wrist (turning off the screen), the OS instantly suspends all running applications. The CPU drops into an ultra-low-power sleep state. 

<Callout icon="info" title="The ClockKit Framework">
  The only exception to this strict background rule is "Complications"—the tiny widgets on the watch face. Developers use a highly restricted API called **ClockKit**. The OS wakes the app up dozens of times a day for exactly a few milliseconds, asks it for the next 100 possible data updates (e.g., weather temperatures), caches them, and immediately kills the app again.
</Callout>

## Independent Execution
Historically, watchOS was purely an extension of iOS; apps actually ran their code on the iPhone and just streamed the UI over Bluetooth to the watch. 
Modern watchOS applications are fully native—the Swift code executes directly on the watch's internal CPU, allowing the watch to function perfectly even when the iPhone is left at home.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Windows/index.mdx': `---
title: Windows
description: The dominant desktop operating system on Earth, powered by the incredibly robust, proprietary Windows NT Kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Windows">

Microsoft **Windows** is the undisputed king of the consumer and enterprise desktop market, holding roughly 70% global market share. 

While the early versions of Windows (Windows 95, 98) were famously unstable graphical shells built on top of the ancient DOS operating system, modern Windows (XP, 7, 10, 11) is built on an entirely different foundation: the **Windows NT Kernel**.

## The NT Kernel Architecture

The NT (New Technology) Kernel is a proprietary, highly advanced **Hybrid Kernel**. 

Unlike Linux (which is heavily focused on the POSIX/Unix philosophy), the NT architecture is completely unique:
1. **The Registry**: Instead of storing configuration in thousands of scattered text files (like Linux's TICK1/etcTICK1 directory), Windows stores all OS and Application configuration in a massive, centralized, hierarchical binary database called the Windows Registry.
2. **Drive Letters**: Instead of a single root filesystem tree (TICK1/TICK1), Windows abstracts physical drives into distinct lettered volumes (TICK1C:\TICK1, TICK1D:\TICK1).
3. **The Win32 API**: The massive C-based API that has maintained incredible backward compatibility. A program written for Windows 95 using Win32 will often still execute perfectly on Windows 11.

<Callout icon="success" title="The WSL Revolution">
  Recognizing the massive popularity of Linux for software development, Microsoft introduced **WSL2 (Windows Subsystem for Linux)**. Rather than trying to emulate Linux, Windows 11 now literally ships with a real, Microsoft-compiled Linux kernel running seamlessly alongside the NT kernel inside a lightweight hypervisor, allowing developers to run native Ubuntu directly inside Windows.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Windows Server/index.mdx': `---
title: Windows Server
description: The enterprise-grade variant of Windows, dominating corporate IT infrastructure through Active Directory and Group Policy.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Windows Server">

While Linux absolutely dominates the global internet infrastructure (web servers, databases, cloud computing), **Windows Server** completely dominates internal corporate IT networks. 

If you walk into a Fortune 500 company, a hospital, or a university, the network managing the employees' laptops is almost certainly powered by Windows Server.

## The Power of Active Directory

The killer feature of Windows Server is **Active Directory (AD)**. 

Active Directory is a massive, centralized database that stores information about every single user, computer, and printer in a corporation. When an employee sits down at a random laptop in the office and logs in, that laptop talks directly to the Windows Server to cryptographically verify their password and permissions.

<Callout icon="info" title="Group Policy Objects (GPO)">
  Combined with AD, Windows Server offers **Group Policy**. This allows a single System Administrator to push out a rule from a central server to 10,000 laptops simultaneously. (e.g., "Force the desktop wallpaper to be the company logo", or "Disable USB ports to prevent data theft"). This level of centralized, out-of-the-box management is extremely difficult to replicate on Linux.
</Callout>

## Server Core

Historically, Windows Servers were mocked by Linux admins because they required a full graphical user interface (GUI) to manage, wasting precious RAM. 
Microsoft fixed this by introducing **Windows Server Core**—a stripped-down installation option that boots directly to a command prompt. It is managed entirely via the powerful, object-oriented **PowerShell** scripting language.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Ubuntu/index.mdx': `---
title: Ubuntu
description: The most famous Linux distribution on Earth, heavily responsible for making Linux accessible to normal human beings.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ubuntu">

Funded by Canonical Ltd. and first released in 2004, **Ubuntu** is the most widely known Linux distribution in the world. 

Before Ubuntu, installing Linux on a laptop was a brutal, highly technical process. Ubuntu's explicit goal was "Linux for Human Beings." It provided a beautiful graphical installer, automatically configured Wi-Fi drivers, and shipped with a fully functional desktop environment out of the box.

## The Debian Foundation

Ubuntu is heavily based on **Debian**. 
Canonical takes the massive, notoriously slow-moving Debian software repository, aggressively updates the software to newer versions, polishes the user interface, and releases it on a strict, predictable schedule.

<Callout icon="success" title="The LTS Release Cycle">
  Ubuntu's immense popularity in the enterprise world is due to its **LTS (Long Term Support)** cycle. 
  Every 2 years (in April of even-numbered years, like 22.04 or 24.04), Canonical releases an LTS version. They mathematically guarantee that they will provide free security patches for that specific OS version for **5 years**. This allows companies to build massive server farms without fearing sudden, breaking OS upgrades.
</Callout>

## Snaps vs Flatpaks

Recently, Ubuntu has aggressively pushed its proprietary package management system called **Snap**. 
Unlike traditional TICK1.debTICK1 packages (which scatter files across the OS), a Snap is a massive, containerized zip file that contains the application *and all of its dependencies*. This prevents "Dependency Hell", but is highly controversial in the Linux community because Canonical maintains strict, closed-source control over the Snap Store server backend.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/RHEL/index.mdx': `---
title: RHEL (Red Hat Enterprise Linux)
description: The massive, multi-billion dollar corporate titan of the Linux server world, providing ultimate stability and certified support.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RHEL (Red Hat Enterprise Linux)">

While Ubuntu dominates the cloud startup ecosystem, **RHEL (Red Hat Enterprise Linux)** dominates the traditional Fortune 500 corporate datacenter. 

Developed by Red Hat (now owned by IBM), RHEL is a commercial, closed-subscription operating system. You do not just download it for free; you pay Red Hat thousands of dollars for a support contract.

## Why Pay for Linux?

Since Linux is fundamentally free and open-source, why do banks and airlines pay IBM billions of dollars for RHEL?

1. **The 10-Year Guarantee**: When Red Hat releases a version of RHEL (like RHEL 8), they guarantee to support it with security patches for an astonishing **10 Years**. A bank can install RHEL on a mainframe and literally not touch the OS architecture for a decade.
2. **Backporting**: If a critical security flaw is found in the Linux kernel in 2025, Red Hat engineers will manually rewrite the fix and "backport" it into the ancient 2018 kernel running on RHEL 8, ensuring the server stays secure without *ever* changing its behavior or breaking legacy apps.
3. **The Throat to Choke**: If a hospital's database goes down, they cannot sue the open-source community. They need a phone number they can call at 3:00 AM, where an IBM engineer is legally obligated by an SLA contract to fix the problem immediately.

<Callout icon="info" title="SELinux (Security-Enhanced Linux)">
  RHEL is heavily associated with **SELinux**, an incredibly powerful (and notoriously difficult to configure) Mandatory Access Control system originally developed by the NSA. SELinux mathematically restricts what a compromised application can do, ensuring that even if a hacker takes over your web server, they cannot read the rest of the hard drive.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Rocky Linux/index.mdx': `---
title: Rocky Linux
description: A wildly popular, 1:1 bug-for-bug clone of RHEL, created by the original founder of CentOS to restore free enterprise stability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rocky Linux">

To understand Rocky Linux, you have to understand the death of CentOS. 
For 15 years, if a company wanted the incredible 10-year stability of RHEL, but didn't want to pay Red Hat thousands of dollars for the support contract, they simply installed **CentOS** (a free, community-compiled, 1:1 clone of RHEL). 

In 2020, Red Hat controversially killed traditional CentOS. The corporate world was furious. 
Gregory Kurtzer, the original founder of CentOS, immediately announced a new project: **Rocky Linux**.

## The Successor

Rocky Linux (named in honor of late CentOS co-founder Rocky McGaugh) is exactly what CentOS used to be: a 100% bug-for-bug compatible, free downstream clone of Red Hat Enterprise Linux.

<Callout icon="success" title="The Enterprise Migration">
  Because Rocky is bug-for-bug compatible with RHEL, the migration process is incredibly simple. A SysAdmin can take a server running RHEL 8 or CentOS 8, run a simple bash script provided by the Rocky team, and the server will seamlessly transform into a Rocky Linux 8 server without requiring a reboot or data wipe.
</Callout>

Alongside AlmaLinux, Rocky Linux has massively succeeded in replacing CentOS in datacenters around the world, backed by a massive community and a strong legal structure to ensure it cannot be bought and killed by IBM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Oracle Linux/index.mdx': `---
title: Oracle Linux
description: Oracle's highly optimized, aggressive RHEL clone, featuring a custom kernel designed specifically to run massive database workloads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Oracle Linux">

**Oracle Linux** is an enterprise-class operating system developed by the database giant Oracle. 

Like Rocky Linux and AlmaLinux, Oracle Linux is essentially a 1:1 clone of Red Hat Enterprise Linux (RHEL). However, while Rocky's goal is to perfectly mimic RHEL, Oracle's goal is to *beat* RHEL at its own game, specifically in the database sector.

## The Unbreakable Enterprise Kernel (UEK)

The standout feature of Oracle Linux is the **UEK (Unbreakable Enterprise Kernel)**. 

When you install Oracle Linux, you are actually given a choice of two different Linux Kernels:
1. **The Red Hat Compatible Kernel (RHCK)**: A perfectly identical copy of the RHEL kernel, guaranteeing 100% bug-for-bug compatibility.
2. **The UEK**: A custom, heavily modified kernel developed by Oracle. 

<Callout icon="info" title="Why build the UEK?">
  Because Red Hat guarantees 10-year stability, the RHEL kernel is often vastly outdated. Oracle's UEK tracks much closer to the modern Linux mainline, injecting cutting-edge performance tweaks specifically designed to make massive Oracle Databases and cloud infrastructure run faster.
</Callout>

## Ksplice Zero-Downtime Updates

Oracle Linux is famous for fully integrating **Ksplice**. Ksplice is an astonishing technology that allows a SysAdmin to apply critical security patches directly to the running Linux Kernel in RAM, *without requiring a reboot*. 
For a massive banking database that cannot afford 5 minutes of reboot downtime, Ksplice is an invaluable feature.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/openSUSE/index.mdx': `---
title: openSUSE
description: The German engineering marvel of the Linux world, famous for its powerful YaST configuration tool and the Btrfs filesystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="openSUSE">

**openSUSE** (sponsored by the German software company SUSE) is one of the oldest and most respected Linux distributions in the world, serving as the upstream testing ground for the enterprise-grade SUSE Linux Enterprise Server (SLES).

## Leap vs Tumbleweed

openSUSE brilliantly splits its operating system into two completely different products to satisfy different users:
1. **openSUSE Leap**: A rock-solid, incredibly stable release that shares its core codebase directly with SLES. It is perfect for servers and conservative desktop users.
2. **openSUSE Tumbleweed**: A bleeding-edge, rolling-release distribution (similar to Arch Linux) that provides the absolute newest software every single day, heavily favored by software developers.

<Callout icon="success" title="The YaST Control Center">
  The crown jewel of openSUSE is **YaST (Yet another Setup Tool)**. In most Linux distributions, you must memorize terminal commands to configure the firewall, set up a network drive, or manage users. YaST provides an incredibly powerful, centralized GUI (and an equivalent terminal UI) that allows users to fully configure every aspect of the OS from a single dashboard.
</Callout>

## Btrfs and Instant Rollbacks

openSUSE was one of the first major distributions to adopt the **Btrfs** filesystem by default. 
Because Btrfs supports Copy-on-Write snapshots, openSUSE automatically takes a snapshot of the entire OS every time you install an update. If an update catastrophically breaks your system, you simply reboot, select the "Snapshot" option in the bootloader, and instantly rewind the entire computer to 5 minutes ago.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/NixOS/index.mdx': `---
title: NixOS
description: A wildly innovative, declarative operating system where the entire machine is generated from a single configuration file.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NixOS">

**NixOS** is not just another Linux distribution; it is a fundamental rethinking of how operating systems should work. It applies the concepts of Functional Programming to operating system management.

In a normal OS like Ubuntu, if you install Nginx, it drops files into TICK1/usr/binTICK1 and TICK1/etc/nginxTICK1. If you uninstall it, some configuration files might be left behind. Over years, the OS becomes a messy, mutated state of broken dependencies.

## Declarative Configuration

NixOS solves this by being **Declarative**. The entire operating system is defined by a single text file (TICK1configuration.nixTICK1).

You write exactly what you want in that file:
TICK3nix
environment.systemPackages = [ pkgs.firefox pkgs.git ];
services.nginx.enable = true;
TICK3

When you run TICK1nixos-rebuild switchTICK1, the Nix package manager reads that file and mathematically generates the *exact* OS state described. Nothing else exists.

<Callout icon="success" title="Generations and Rollbacks">
  Because packages in NixOS are stored in isolated, cryptographically hashed directories (e.g., TICK1/nix/store/a5b8...-firefox-110TICK1) rather than a global TICK1/usr/binTICK1 folder, the OS physically cannot suffer from Dependency Hell. 
  Every time you change the config file, NixOS creates a new "Generation". If the new configuration breaks your computer, you simply reboot into Generation 4, and your OS is mathematically identical to how it was yesterday.
</Callout>

## The Learning Curve
While NixOS is arguably the most robust Linux distribution ever created, its learning curve is notoriously vertical. Users must learn the completely custom, highly complex **Nix language** to do even simple tasks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Yocto Project/index.mdx': `---
title: Yocto Project
description: A massive, highly complex enterprise framework used to build custom embedded Linux distributions for smart cars, rockets, and IoT.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Yocto Project">

While *Buildroot* is a simple tool for generating a single, static embedded OS, the **Yocto Project** is a massive, enterprise-grade framework for generating highly complex, updateable Embedded Linux distributions.

If you are building a cheap smart thermostat, you use Buildroot. If you are building the infotainment system for a $100,000 BMW, or the flight computer for a SpaceX rocket, you use Yocto.

## The Recipe System (BitBake)

Yocto does not provide an operating system; it provides the *tools* to build one. The core engine of Yocto is a build tool called **BitBake**. 

BitBake reads thousands of "Recipes". A Recipe is a text file that tells Yocto:
1. Where to download a specific piece of software (like Python or an Audio driver).
2. Exactly how to compile it for a specific hardware architecture (like an ARM Cortex-A53).
3. Where to place the resulting binary in the final OS image.

<Callout icon="warning" title="The Compilation Nightmare">
  Because Yocto builds an entire OS (including the cross-compiler toolchain, the kernel, and thousands of user-space packages) entirely from raw C/C++ source code, the build process is brutally slow. A fresh Yocto build for a Smart Car might take 12 hours and consume 100 Gigabytes of SSD space just for the temporary compilation files.
</Callout>

## Layers

Yocto's superpower is **Layers**. You can stack recipes on top of each other. 
- Intel provides a "Hardware Layer" (BSP) containing drivers for their CPU.
- Qt provides a "UI Layer" containing graphical libraries.
- Your company provides the "Application Layer" containing your proprietary car software.
Yocto mathematically merges these layers together to spit out the final, highly customized Linux Operating System.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/OpenBSD/index.mdx': `---
title: OpenBSD
description: A Unix-like operating system renowned worldwide for its extreme, paranoid focus on proactive cybersecurity and cryptography.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OpenBSD">

**OpenBSD** is a free, open-source Unix-like operating system descended from the Berkeley Software Distribution (BSD). 

While FreeBSD focuses on enterprise performance, OpenBSD has exactly one goal: **Extreme, Uncompromising Security**. 

Its famous slogan was *"Only two remote holes in the default install, in a heck of a long time!"* (referring to a 20+ year track record of near-perfect security).

## Proactive Security

The OpenBSD developers do not wait for hackers to report bugs. They actively practice **Code Auditing**. The team reads through the entire multi-million line C codebase, line by line, aggressively searching for and fixing potential buffer overflows and memory leaks before they can be exploited.

<Callout icon="success" title="Pioneering Mitigations">
  OpenBSD is usually the very first operating system to invent and deploy major security features that eventually become standard across Windows and Linux. 
  They pioneered **W^X (Write XOR Execute)** memory protection, **Address Space Layout Randomization (ASLR)**, and aggressive privilege separation. If a security feature exists to make hacking harder, OpenBSD likely invented it.
</Callout>

## The OpenSSH Legacy

Even if you have never used OpenBSD, you rely on their code every single day. 

The OpenBSD project created and maintains **OpenSSH**—the cryptographic software suite used to securely log into almost every single Linux server, router, and cloud virtual machine on the entire internet. They also develop LibreSSL and the PF firewall, proving that their obsessive focus on clean, secure code benefits the entire global software ecosystem.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    // This entirely avoids JSON/regex parsing issues.
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
