import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Linux/index.mdx': `---
title: Linux
description: The open-source, Unix-like operating system kernel that dominates the internet, smartphones, and supercomputers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Linux">

Created by Linus Torvalds in 1991 as a hobby project, **Linux** is arguably the most successful software project in human history. 

Crucially, Linux is *not* a full operating system; it is just a **Kernel**. It handles the core duties of talking to hardware, managing memory, and scheduling CPU time. A usable OS (like Ubuntu or Android) is created by taking the Linux Kernel and surrounding it with user-space software (like a desktop environment, GNU core utilities, and a package manager).

## The Monolithic Architecture

Unlike microkernels, Linux is a **Monolithic Kernel**. 
This means that Device Drivers, File Systems, and Networking Stacks all run directly in Kernel Space (Ring 0). 

<Callout icon="warning" title="The Tradeoff">
  Because everything runs in Ring 0, Linux is incredibly fast; there is no context-switching overhead when writing to a hard drive or sending a network packet. 
  However, this means that a bug in a graphics card driver can theoretically crash the entire operating system, whereas in a microkernel, only the driver would crash.
</Callout>

## Ubiquity

While Linux struggled to conquer the consumer desktop market (currently holding ~3-4% market share), it absolutely dominates everywhere else:
- **Smartphones**: Android is powered by the Linux Kernel.
- **Servers**: The vast majority of the global internet infrastructure runs on Linux.
- **Supercomputers**: 100% of the top 500 fastest supercomputers in the world run Linux.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Unix/index.mdx': `---
title: Unix
description: The ancient, incredibly influential operating system that defined modern computing paradigms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Unix">

Developed in 1969 at AT&T's Bell Labs by Ken Thompson and Dennis Ritchie, **Unix** is the granddaddy of modern operating systems. macOS, Linux, FreeBSD, and iOS all trace their philosophical (and sometimes literal) lineage directly back to Unix.

## The Unix Philosophy

Unix revolutionized computing not just through code, but through a strict engineering philosophy that remains highly relevant today:

1. **Everything is a file**: Hard drives, keyboards, network sockets, and mice are all exposed as simple text files. If you know how to read and write to a file, you know how to interact with the entire computer.
2. **Do one thing and do it well**: Instead of building massive, bloated software, build tiny, specialized tools (like TICK1grepTICK1, TICK1catTICK1, TICK1sedTICK1).
3. **Chain programs together**: Use **Pipes** (TICK1|TICK1) to stream the output of one tiny program directly into the input of another, creating complex behavior out of simple building blocks.

<Callout icon="info" title="Unix vs Unix-like">
  Today, "Unix" is a registered trademark. An OS can only legally call itself Unix if it passes the incredibly strict Single UNIX Specification (SUS) certification. macOS is legally Unix. Linux is mathematically a clone of Unix, but it is not certified, so it is referred to as "Unix-like".
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/FreeBSD/index.mdx': `---
title: FreeBSD
description: A complete, highly stable Unix-like operating system known for its exceptional networking stack and ZFS file system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="FreeBSD">

While Linux is just a kernel, **FreeBSD** is a complete operating system. The kernel, the device drivers, and the user-land utilities are all developed together in a single, cohesive source code repository by the same core team.

Descended directly from the Berkeley Software Distribution (BSD) created at UC Berkeley, FreeBSD is renowned for being incredibly stable and secure.

## Key Strengths

1. **The Network Stack**: Historically, FreeBSD had a much more robust and performant networking stack than Linux. Because of this, companies like Netflix built their massive global content delivery network (Open Connect) entirely on FreeBSD.
2. **ZFS**: FreeBSD offers native, first-class support for ZFS, arguably the most advanced and resilient file system ever created.
3. **Jails**: Decades before Docker containers existed on Linux, FreeBSD pioneered lightweight OS-level virtualization with **FreeBSD Jails**, allowing strict isolation of processes.

<Callout icon="info" title="The Permissive License">
  Unlike Linux (which uses the strict copyleft GPL license), FreeBSD uses the highly permissive **BSD License**. This allows companies to take FreeBSD, heavily modify it, and sell it as a closed-source product. 
  For example, Sony's PlayStation OS and Apple's macOS/iOS are heavily derived from FreeBSD code.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/NetBSD/index.mdx': `---
title: NetBSD
description: A highly portable BSD Unix variant famous for running on virtually any hardware architecture in existence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NetBSD">

Like FreeBSD, **NetBSD** is a complete, open-source operating system descended from the original Berkeley Software Distribution (BSD). 

However, while FreeBSD focuses on performance and enterprise stability, NetBSD is laser-focused on **Clean Code and Extreme Portability**.

## "Of course it runs NetBSD"

NetBSD's unofficial motto is *"Of course it runs NetBSD"*. The codebase is so beautifully abstracted that the OS can be compiled to run on almost anything with a CPU. 

It currently supports over 50 different hardware architectures, including:
- Standard x86 and ARM processors.
- Ancient Motorola 68k Macs from the 1980s.
- The Sega Dreamcast gaming console.
- Amiga computers.
- VAX mainframes.

<Callout icon="success" title="The Value of Portability">
  By forcing the codebase to run on highly obscure, weird hardware architectures, the NetBSD developers are forced to write exceptionally clean, strictly standards-compliant C code. This makes NetBSD highly attractive for embedded systems development, particularly in aerospace and industrial control systems.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Debian/index.mdx': `---
title: Debian
description: The grandfather of Linux distributions, renowned for its legendary stability and massive software repository.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Debian">

Created in 1993, **Debian** is one of the oldest and most influential Linux distributions in existence. It is not owned by any corporation; it is developed entirely by a massive, global democratic community of volunteers.

## Stability Above All Else

Debian is famous for its extreme, almost paranoid focus on stability. 

Software packages in Debian go through a rigorous, multi-year testing pipeline (moving from *Experimental*, to *Unstable*, to *Testing*, and finally to *Stable*). By the time a piece of software reaches the "Debian Stable" release, it may be 3 years old, but it is virtually guaranteed to never crash.

<Callout icon="info" title="The APT Package Manager">
  Debian pioneered the TICK1aptTICK1 (Advanced Package Tool) system and the TICK1.debTICK1 package format, which revolutionized how software was installed on Linux by automatically resolving and downloading dependency libraries.
</Callout>

## The Universal OS

Debian refers to itself as the "Universal Operating System" because it serves as the foundational bedrock for hundreds of other Linux distributions. 
**Ubuntu**, **Kali Linux**, and **Linux Mint** are all directly built on top of Debian.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Fedora/index.mdx': `---
title: Fedora
description: A bleeding-edge Linux distribution sponsored by Red Hat, serving as the testing ground for enterprise software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fedora">

**Fedora** is a highly popular, fast-moving Linux distribution sponsored by Red Hat (IBM). 

Unlike Debian, which values ancient stability, Fedora is a **Bleeding-Edge** distribution. It is usually the very first major distribution to adopt radical new Linux technologies (like the Wayland display server, Systemd, or the PipeWire audio system).

## The Upstream Relationship

Fedora serves a very specific purpose in the enterprise ecosystem: it is the upstream testing ground for **Red Hat Enterprise Linux (RHEL)**.

1. New software and kernel features are introduced and battle-tested in Fedora.
2. Every few years, Red Hat takes a snapshot of Fedora, stabilizes it, freezes the features, and releases it as RHEL.
3. RHEL is then sold to Fortune 500 companies with 10-year paid support contracts.

<Callout icon="success" title="The Developer's Choice">
  Because Fedora always has the newest compilers, programming languages, and kernel features, while still remaining relatively stable and backed by a major corporation, it is widely considered one of the best Linux distributions for software developers. Linus Torvalds famously uses Fedora on his personal workstations.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Arch Linux/index.mdx': `---
title: Arch Linux
description: A minimalist, rolling-release Linux distribution that forces you to build your OS from scratch.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Arch Linux">

**Arch Linux** is a notoriously difficult, highly minimalist Linux distribution aimed strictly at power users. 

When you boot the Arch Linux installation drive, you are not greeted by a beautiful graphical installer. You are dropped into a blank black terminal. You must manually partition your hard drive, format the filesystems, mount them, install the base kernel, configure the bootloader, and manually install a graphical desktop if you want one.

## Rolling Release

Arch Linux uses a **Rolling Release** model. Unlike Ubuntu or Debian (which release a massive OS upgrade every 2 years), Arch has no versions. You install it once, and run TICK1pacman -SyuTICK1 to continuously download the absolute newest software updates every single day. 

<Callout icon="warning" title="Bleeding Edge Danger">
  Because Arch pushes software updates directly from the developers to your computer within hours of their release, things occasionally break. Arch users are expected to read the wiki and manually fix their systems when an update causes an issue.
</Callout>

## The Arch Wiki and AUR

Arch is famous for two things:
1. **The Arch Wiki**: Arguably the greatest, most comprehensive documentation of Linux systems on the internet, widely used even by non-Arch users.
2. **The AUR (Arch User Repository)**: A massive, community-driven software repository that contains installation scripts for virtually every piece of software ever written for Linux.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Alpine Linux/index.mdx': `---
title: Alpine Linux
description: An ultra-lightweight, security-oriented Linux distribution that dominates the Docker container ecosystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Alpine Linux">

**Alpine Linux** is an independent, non-commercial Linux distribution designed for one thing: **Extreme Minimalism**.

A standard Ubuntu installation requires roughly 2 Gigabytes of disk space. A base Alpine Linux installation requires exactly **5 Megabytes**.

## How is it so small?

Alpine achieves this microscopic footprint by completely abandoning the standard GNU utilities that power 99% of Linux distributions.
1. It replaces the massive GNU C Library (TICK1glibcTICK1) with the tiny TICK1musl libcTICK1.
2. It replaces the massive GNU Coreutils (cat, grep, ls) with **BusyBox**, a single, tiny executable file that emulates hundreds of Unix commands.

<Callout icon="success" title="The King of Containers">
  Because it is so incredibly small and fast to boot, Alpine Linux is the undisputed king of Docker containers. If you pull a Node.js or Python image from Docker Hub, it is almost certainly running Alpine Linux under the hood to minimize network bandwidth and attack surface.
</Callout>

## Security First
Beyond size, Alpine is heavily focused on security. The kernel is patched with an unofficial security port, and all user-space binaries are compiled as Position Independent Executables (PIE) with stack-smashing protection enabled by default.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Gentoo/index.mdx': `---
title: Gentoo Linux
description: A source-based Linux distribution where every single piece of software must be manually compiled from C code by your CPU.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gentoo Linux">

**Gentoo** takes the difficulty of Arch Linux and multiplies it by ten. 

In almost all Linux distributions, when you install a web browser, you are downloading a pre-compiled binary file. In Gentoo, when you install a web browser, the package manager (Portage) downloads the raw C++ source code and forces your CPU to manually compile the entire browser from scratch.

## The Power of USE Flags

Why would anyone do this? By compiling everything locally, Gentoo allows you to use **USE Flags** to perfectly tailor every piece of software to your exact needs.

If you are building a server with no monitor, you can set the TICK1-XTICK1 and TICK1-waylandTICK1 USE flags. When Gentoo compiles your software, it will physically strip out all graphical interface code from every single program, resulting in incredibly lightweight, secure, and hyper-optimized binaries that run 2% faster.

<Callout icon="warning" title="The Compilation Tax">
  The downside to Gentoo is time. Installing a complex program like Firefox or Chromium on Gentoo might take 6 to 12 hours of your CPU running at 100% capacity just to compile the source code into a usable application.
</Callout>

Because of its extreme flexibility, Gentoo is often used as a base to build *other* operating systems, most notably **ChromeOS**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Kali Linux/index.mdx': `---
title: Kali Linux
description: A specialized Debian-based distribution pre-loaded with hundreds of advanced penetration testing and ethical hacking tools.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kali Linux">

Developed and maintained by Offensive Security, **Kali Linux** is not designed for daily desktop use or web servers. It is a highly specialized tactical weapon used exclusively by Cybersecurity professionals, Penetration Testers, and Ethical Hackers.

## The Arsenal

Kali is essentially a standard Debian Linux installation, but it comes pre-configured with over 600 advanced security tools, categorized for specific phases of a cyber attack:
- **Information Gathering**: Nmap, Wireshark, Maltego
- **Vulnerability Analysis**: OpenVAS, Nikto
- **Web Applications**: Burp Suite, SQLmap
- **Password Attacks**: Hashcat, John the Ripper
- **Exploitation**: Metasploit Framework

<Callout icon="info" title="The Custom Kernel">
  Aside from the software, Kali includes a heavily modified Linux kernel patched for wireless injection. This allows Kali users to use specific Wi-Fi adapters to inject packets into networks they are not connected to, a critical requirement for auditing wireless security protocols like WPA2.
</Callout>

## Usage Model

Kali is rarely installed permanently on a hard drive. It is designed to be highly ephemeral. Security engineers usually boot Kali from a live USB stick or run it inside a temporary Virtual Machine, execute their attack simulation, generate a report, and immediately delete the VM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/CentOS Stream/index.mdx': `---
title: CentOS Stream
description: The midstream enterprise Linux distribution that sits directly between the bleeding-edge Fedora and the rock-solid RHEL.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CentOS Stream">

To understand **CentOS Stream**, you must understand the Red Hat enterprise ecosystem.

Historically, Red Hat released RHEL (a paid, enterprise OS). The community would take the RHEL source code, strip out the trademarks, and release it for free as **CentOS**. It was a 1:1 bug-for-bug clone of RHEL, used by millions of servers worldwide.

## The Great Shift

In 2020, Red Hat controversially killed traditional CentOS and replaced it with **CentOS Stream**. 

Instead of being a downstream clone of RHEL, CentOS Stream was moved *upstream*.
1. **Fedora**: Bleeding-edge features (Alpha testing).
2. **CentOS Stream**: Stabilized features preparing for enterprise (Beta testing).
3. **RHEL**: The final, frozen, paid enterprise product.

<Callout icon="warning" title="The Impact">
  Because CentOS Stream is effectively a rolling beta test for RHEL, it is no longer a 1:1 clone. It receives updates *before* RHEL does. This terrified enterprise sysadmins who relied on traditional CentOS for rock-solid, unchanging server stability, leading to the creation of Rocky Linux and AlmaLinux.
</Callout>

Despite the controversy, CentOS Stream is heavily used by massive hyperscalers (like Meta/Facebook) who actually *want* enterprise stability combined with a slightly faster update cadence.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/AlmaLinux/index.mdx': `---
title: AlmaLinux
description: A community-driven, 1:1 enterprise-grade clone of RHEL created to fill the void left by the death of traditional CentOS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AlmaLinux">

When Red Hat controversially discontinued traditional CentOS in 2020 (replacing it with the rolling-release CentOS Stream), the enterprise server world panicked. Millions of servers relied on the free, rock-solid, 10-year lifecycle of CentOS.

**AlmaLinux** was rapidly created by the web hosting company CloudLinux to fill this exact void.

## The Bug-For-Bug Promise

Like Rocky Linux, AlmaLinux's singular goal is to be a 100% bug-for-bug compatible drop-in replacement for Red Hat Enterprise Linux (RHEL). 

If a piece of enterprise database software is certified to run on RHEL 9, it is mathematically guaranteed to run identically on AlmaLinux 9. 

<Callout icon="info" title="The Non-Profit Foundation">
  To ensure AlmaLinux can never be bought out or corporately shifted (like CentOS was), it is governed by the AlmaLinux OS Foundation, an independent 501(c)(6) non-profit organization. It is funded by heavyweights like AMD, AWS, and Microsoft to ensure the internet always has a free enterprise OS.
</Callout>

## The Source Code Pivot

In 2023, Red Hat aggressively restricted public access to the RHEL source code, trying to kill downstream clones like AlmaLinux. In response, AlmaLinux brilliantly pivoted from being a "downstream clone of RHEL" to an "Application Binary Interface (ABI) compatible fork", utilizing CentOS Stream source code to build an OS that perfectly mimics RHEL without violating Red Hat's paywalls.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Embedded Linux/index.mdx': `---
title: Embedded Linux
description: Highly customized, stripped-down variants of the Linux kernel designed to run on resource-constrained microcontrollers and IoT devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Embedded Linux">

**Embedded Linux** is not a specific distribution you can download. It is a category encompassing the use of the Linux kernel in highly specialized, resource-constrained devices like Wi-Fi routers, Smart TVs, automotive infotainment systems, and IoT refrigerators.

## The Constraints

A desktop Linux OS expects gigabytes of RAM and a fast SSD. An Embedded Linux device might only have **16 Megabytes of RAM** and a tiny 8MB Flash storage chip. 

To make Linux fit into these constraints, embedded engineers must brutally strip the OS down to its absolute bare minimum:
- **Custom Kernels**: The kernel is recompiled to strip out support for 99% of hardware (if the device doesn't have a screen, all graphics drivers are deleted).
- **BusyBox**: Heavy GNU utilities are replaced with the microscopic BusyBox binary.
- **musl libc**: The heavy standard C library is replaced with an ultra-lightweight alternative.

<Callout icon="success" title="Real-Time Requirements">
  Many embedded systems (like robotic arms or anti-lock brakes) require **Real-Time Operating System (RTOS)** capabilities, meaning the OS must mathematically guarantee it will respond to a hardware sensor within 2 milliseconds. Standard Linux cannot do this. Embedded engineers often apply the TICK1PREEMPT_RTTICK1 patch to the Linux kernel to give it strict, deterministic real-time capabilities.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Buildroot/index.mdx': `---
title: Buildroot
description: A simple, highly efficient tool used by embedded engineers to automatically generate a microscopic, custom Linux OS from scratch.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Buildroot">

When an engineer builds a custom Smart Thermostat, they cannot just install Ubuntu on it. They need an Embedded Linux OS perfectly tailored to their specific, weird hardware. 

**Buildroot** is an automation tool designed specifically to generate these microscopic, custom Linux operating systems from scratch.

## How It Works

Buildroot is essentially a giant collection of Makefiles. The engineer opens a menu (similar to the Linux kernel menuconfig), selects exactly what CPU architecture they are using, and checks boxes for exactly which software they want (e.g., "Add an SSH server", "Add SQLite").

When the engineer types TICK1makeTICK1, Buildroot will:
1. Download a Cross-Compiler toolchain (so your x86 laptop can compile code for an ARM thermostat).
2. Download the source code for the Linux Kernel and BusyBox.
3. Compile everything from scratch.
4. Output a single, tiny, 10-Megabyte binary Image file that can be flashed directly onto the thermostat's memory chip.

<Callout icon="info" title="Buildroot vs Yocto">
  Buildroot is designed for **Simplicity**. It builds a single, static filesystem image. It does not support package managers (like TICK1aptTICK1). Once the OS is flashed to the device, it cannot be easily updated. For highly complex devices that require over-the-air package updates (like a Tesla car), engineers use the much heavier **Yocto Project**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Android/index.mdx': `---
title: Android
description: The world's most widely used operating system, utilizing the Linux kernel beneath a massive Java-based user space.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Android">

Developed by Google, **Android** is the most widely used operating system on Earth, powering billions of smartphones, tablets, and televisions. 

While it is technically a "Linux Distribution" (because it uses the Linux Kernel to talk to the phone's hardware), it shares absolutely zero user-space DNA with desktop Linux. 

## The Architecture Stack

Android is built in highly distinct layers:
1. **The Linux Kernel**: Handles memory management, CPU scheduling, and hardware drivers (camera, bluetooth).
2. **Hardware Abstraction Layer (HAL)**: C/C++ libraries that allow the higher levels to talk to proprietary hardware without knowing the specific driver details.
3. **Android Runtime (ART)**: A highly specialized Virtual Machine designed for low-power mobile devices. 
4. **The Framework**: The massive Java/Kotlin API that provides UI buttons, location services, and notifications.

<Callout icon="success" title="The Application Sandbox">
  In desktop Linux, apps generally share the same user permissions. In Android, every single application is assigned its own unique Linux User ID (UID). Because the Linux Kernel strictly isolates memory between different users, this guarantees that a malicious flashlight app physically cannot read the RAM of your banking app.
</Callout>

## Dalvik to ART
Historically, Android compiled Java code into Dalvik bytecode and interpreted it Just-In-Time (JIT) while the app was running, which drained battery. Modern Android uses **ART (Android Runtime)**, which performs Ahead-Of-Time (AOT) compilation—translating the app into native machine code the moment you install it from the Play Store, resulting in massive performance gains.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/ChromeOS/index.mdx': `---
title: ChromeOS
description: A hyper-secure, web-first operating system built by Google on top of Gentoo Linux, designed entirely around the Chrome web browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ChromeOS">

**ChromeOS** is a proprietary operating system developed by Google, primarily found on inexpensive Chromebooks. It is fundamentally a heavily modified version of **Gentoo Linux**.

## The Web-First Philosophy

When ChromeOS launched, its entire philosophy was: *"Everything is a website."* 
The OS had virtually no native applications. The user interface was literally just the Google Chrome web browser. If you wanted to write a document, you used Google Docs. If you wanted to listen to music, you used a web player. 

Because the OS was just a browser and a kernel, it was incredibly fast, booted in 5 seconds, and was immune to 99% of traditional desktop malware, making it massively popular in the education sector.

<Callout icon="info" title="The Container Revolution">
  As the OS matured, users demanded real apps. Google brilliantly solved this without compromising security by using **Containers and Virtual Machines**:
  - ChromeOS can now run full Android apps seamlessly in an isolated Android container (ARC).
  - ChromeOS can run full desktop Linux applications (like VS Code) inside a lightweight virtual machine (Crostini).
</Callout>

## Verified Boot Security

ChromeOS is arguably the most secure consumer OS on the market due to **Verified Boot**. Every time you turn on a Chromebook, a dedicated hardware security chip mathematically verifies the cryptographic signature of the OS Kernel. If a virus manages to modify even a single byte of the core OS, the hardware will refuse to boot and automatically redownload a fresh copy of the OS from Google.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/HarmonyOS/index.mdx': `---
title: HarmonyOS
description: Huawei's highly ambitious distributed operating system, designed to break away from Android and unify all smart devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HarmonyOS">

**HarmonyOS** (Hongmeng OS) is a proprietary operating system developed by Huawei. It was rapidly accelerated into production after US trade sanctions blocked Huawei from using Google's Android services.

However, HarmonyOS is not just a phone OS; it is an incredibly ambitious **Distributed Operating System** designed for the "Internet of Everything".

## The Distributed Bus

The core philosophy of HarmonyOS is seamless hardware collaboration. 
Through a technology called the **Distributed Virtual Bus**, HarmonyOS treats multiple physical devices as a single super-device. 
- You can play a mobile game on your phone, and seamlessly swipe it up to your Smart TV to use the TV as a display, while your phone instantly transforms into the game controller.
- Your phone's camera can be exposed directly as a hardware peripheral to your laptop.

<Callout icon="warning" title="The Microkernel Transition">
  The initial versions of HarmonyOS (running on smartphones) were heavily based on the Android Open Source Project (AOSP) Linux kernel to maintain app compatibility. However, with **HarmonyOS NEXT**, Huawei completely stripped out all AOSP and Linux code, moving to a proprietary **Microkernel** architecture. It no longer supports Android APKs, relying entirely on its own native application ecosystem.
</Callout>

## Unification

Unlike Android (phones) and WearOS (watches) which are distinct codebases, HarmonyOS is designed to scale dynamically. The exact same OS core can be deployed on a smart watch with 128MB of RAM, a smartphone with 8GB of RAM, and a Smart Car dashboard, providing a completely unified development ecosystem.

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
