import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Linux/index.mdx': `---
title: Linux
description: "A family of open-source Unix-like operating systems based on the Linux kernel, created by Linus Torvalds."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Linux"
  icon="linux"
  creator="Linus Torvalds"
  year={1991}
  website="https://www.kernel.org/"
>

**Linux** is not technically an operating system; it is a **Kernel**. It is the core program that manages the CPU, memory, and peripheral devices. When combined with GNU tools, desktop environments, and package managers, it forms what we colloquially call a "Linux Distribution" (or distro).

Linux is the undisputed king of the internet. While Windows dominates desktop PCs, Linux runs almost every web server, supercomputer, smartphone (Android is built on the Linux kernel), and smart appliance on Earth.

## Why Did Linux Win the Server War?

1. **Free and Open Source**: Unlike Windows Server, which costs thousands of dollars in licensing fees, Linux is completely free. Startups could spin up 100 servers without paying a dime in software licenses.
2. **Extreme Stability**: A well-configured Linux server can run for years without needing a reboot. It does not force automatic updates that break the system in the middle of the night.
3. **No GUI Required**: Linux is designed to be managed entirely via the Command Line Interface (CLI). By stripping away the Graphical User Interface (GUI), the OS uses almost zero RAM or CPU, leaving 99% of the server's resources for running the actual database or web application.

<Callout icon="tip" title="Everything is a File">
Linux inherited the UNIX philosophy that **"Everything is a file."** Hardware devices (like hard drives or webcams), network sockets, and system processes are all represented as text files in the file system. If you want to change the brightness of your screen, you literally just write a number into a specific text file.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Windows/index.mdx': `---
title: Windows
description: "A group of several proprietary graphical operating system families, all of which are developed and marketed by Microsoft."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Windows"
  icon="windows"
  creator="Microsoft"
  year={1985}
  website="https://www.microsoft.com/windows"
>

**Microsoft Windows** is the most widely used desktop operating system in the world. Originally built as a graphical shell on top of MS-DOS, modern Windows (since Windows NT) is a massive, incredibly complex OS designed to run on a near-infinite combination of hardware.

## The Blessing and Curse of Backwards Compatibility

Apple is famous for ruthlessly deleting legacy technologies. If an API is old, Apple removes it, breaking old apps but keeping macOS clean. 

Microsoft takes the exact opposite approach: **Absolute Backwards Compatibility**.
A program compiled for Windows 95 can, in many cases, still run perfectly on Windows 11 today. This is why enterprise businesses and hospitals love Windows; they know their expensive custom software won't break when they update the OS. 

However, this is also why Windows is massive and occasionally fragile: the operating system must ship with decades of legacy code, old registry structures, and deprecated APIs just to ensure a 25-year-old accounting program still works.

## DirectX and PC Gaming
Windows dominates the PC gaming industry thanks to **DirectX**, Microsoft's proprietary API for handling tasks related to multimedia and game programming. Because Microsoft deeply integrated DirectX into the OS and constantly courted game developers, almost all major PC games are built specifically for Windows.

<Callout icon="info" title="WSL (Windows Subsystem for Linux)">
Recognizing that web developers were fleeing to Mac and Linux, Microsoft introduced WSL. WSL embeds a literal Linux kernel directly inside Windows, allowing developers to run native Ubuntu terminal commands, Docker, and bash scripts seamlessly alongside their Windows GUI apps.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/macOS/index.mdx': `---
title: macOS
description: "A proprietary graphical operating system developed and marketed by Apple Inc. It is the primary operating system for Apple's Mac computers."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="macOS"
  icon="apple"
  creator="Apple"
  year={2001}
  website="https://www.apple.com/macos/"
>

**macOS** (formerly Mac OS X) is a POSIX-compliant UNIX operating system built on top of the open-source **Darwin** core. It is the operating system that powers Apple's desktop and laptop computers.

Because macOS is fundamentally UNIX, it became the darling of software developers in the 2010s. Developers could write and test code on a beautiful, stable GUI laptop, and the terminal commands (bash/zsh) perfectly matched the Linux servers where the code would eventually be deployed.

## The Walled Garden and Hardware Integration

Unlike Windows, which must support billions of different hardware combinations (resulting in driver conflicts and blue screens), macOS only runs on hardware designed by Apple. 

This tight integration allows macOS to achieve incredible battery life, perfectly calibrated trackpads, and features like "Handoff" (where you can copy text on an iPhone and paste it on a Mac). 

## Core Technologies
- **Cocoa**: The native object-oriented API for macOS applications (historically written in Objective-C, now Swift).
- **Metal**: Apple's proprietary graphics API (their competitor to DirectX and Vulkan). By forcing developers to use Metal instead of cross-platform standards like OpenGL, Apple achieves better performance but alienates many game developers.

<Callout icon="warning" title="The Death of 32-bit">
In macOS Catalina (2019), Apple ruthlessly dropped all support for 32-bit applications. If you had an old 32-bit game or utility, it permanently stopped working. This aggressive forward-momentum keeps macOS lean and secure, but severely punishes users relying on unmaintained legacy software.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Ubuntu/index.mdx': `---
title: Ubuntu
description: "A popular, beginner-friendly Linux distribution based on Debian and composed mostly of free and open-source software."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Ubuntu"
  icon="ubuntu"
  creator="Canonical"
  year={2004}
  website="https://ubuntu.com/"
>

**Ubuntu** is arguably the most famous Linux distribution in the world. Built on top of Debian, it was created by Canonical with a singular mission: make Linux easy enough for a normal human being to use.

Before Ubuntu, installing Linux often involved manually compiling drivers and tweaking configuration files just to get Wi-Fi or sound working. Ubuntu shipped with a graphical installer, pre-installed proprietary drivers for common hardware, and a polished Desktop Environment.

## LTS (Long Term Support) Releases

Ubuntu releases a new version every 6 months (e.g., 23.04, 23.10), but every two years, they release an **LTS (Long Term Support)** version (e.g., 20.04 LTS, 22.04 LTS, 24.04 LTS).

Enterprise companies rely heavily on Ubuntu Server LTS because Canonical guarantees security updates for 5 years. When a company deploys a database on 24.04 LTS, they know the OS won't introduce breaking API changes for half a decade.

## Apt and Snap
Ubuntu inherits the TICK1aptTICK1 package manager from Debian, which is universally loved. However, Canonical has aggressively pushed **Snap**, their proprietary containerized packaging system. Snap allows apps to bundle all their dependencies together, but many power users hate it because Snap apps open slower, take up more disk space, and the Snap backend is closed-source.

<Callout icon="tip" title="The Default Cloud OS">
If you go to AWS, DigitalOcean, or Azure and click "Create a Server," the default option is almost always Ubuntu Server LTS. It is the de facto standard baseline for modern web deployment.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Debian/index.mdx': `---
title: Debian
description: "One of the oldest and most stable Linux distributions, famous for its strict adherence to free software philosophies."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Debian"
  icon="debian"
  creator="Ian Murdock"
  year={1993}
  website="https://www.debian.org/"
>

**Debian** is the grandfather of the modern Linux ecosystem. It is the rock-solid foundation upon which hundreds of other distributions (including Ubuntu, Linux Mint, and Kali Linux) are built.

## Extreme Stability

The Debian philosophy is built entirely around stability. When a new software package (like a new version of Python or a new Desktop GUI) is released, it enters Debian's "Unstable" branch. Then it moves to "Testing". It stays there, sometimes for *years*, until every single conceivable bug is fixed. Only then does it move into the "Stable" release.

Because of this intense vetting process:
1. **Debian Servers Never Crash**: It is arguably the most stable OS on the planet.
2. **Debian Software is Old**: If you install Debian Stable today, the version of Python or Node.js it ships with might be 2 or 3 years old. 

## The APT Package Manager
Debian introduced TICK1aptTICK1 (Advanced Package Tool) and the TICK1.debTICK1 file format. Before APT, installing software on Linux meant resolving dependencies manually (if App A needs Library B, and Library B needs Library C, you had to download and compile all three manually). APT automated this entirely, revolutionizing OS package management.

<Callout icon="info" title="Strictly Free Software">
The core Debian team refuses to include proprietary (closed-source) software in the main operating system. By default, Debian will not install closed-source Nvidia graphics drivers or proprietary Wi-Fi firmware. You have to explicitly opt-in to the "non-free" repositories to get them.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Arch Linux/index.mdx': `---
title: Arch Linux
description: "A lightweight and flexible Linux distribution that tries to keep it simple, offering a rolling release model aimed at competent Linux users."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Arch Linux"
  icon="archlinux"
  creator="Judd Vinet"
  year={2002}
  website="https://archlinux.org/"
>

"I use Arch, btw." This is the oldest meme in the Linux community. 

**Arch Linux** is a distribution designed for power users. When you install Ubuntu, it gives you a graphical installer, a pre-configured web browser, an office suite, and a desktop background. When you install Arch, it gives you a black screen with a blinking terminal cursor.

You, the user, must manually partition the hard drive, install a bootloader, configure the network, choose a kernel, and install a desktop environment. 

## The Rolling Release Model
Unlike Ubuntu or Debian, which release massive updates every few years, Arch uses a **Rolling Release** model. 
When a new version of the Linux Kernel or the GNOME desktop drops, Arch users get it immediately (usually within days). There is no "Arch Linux 2024." There is only Arch, and it updates daily.

- **Pros**: You always have the absolute newest software, compilers, and features.
- **Cons**: Because packages aren't tested together for years (like in Debian), an update can occasionally break your entire system, requiring you to drop into a terminal and fix it manually.

## The AUR (Arch User Repository)
Arch's greatest strength is the AUR. In Ubuntu, if a package isn't in the official store, you have to add shady PPAs or compile from source. The AUR is a massive, community-driven repository that contains a script to automatically download and build *literally any software that exists for Linux*. If someone wrote a program yesterday, it's in the AUR today.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/iOS/index.mdx': `---
title: iOS
description: "Apple's mobile operating system, originally created for the iPhone, known for its strict security, fluid animations, and absolute ecosystem control."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="iOS"
  icon="apple"
  creator="Apple"
  year={2007}
  website="https://www.apple.com/ios/"
>

Originally called "iPhone OS", **iOS** revolutionized the world in 2007 by proving that a mobile device didn't need a physical keyboard or a stylus—it just needed a multi-touch capacitive screen and an operating system built natively for fingers.

Under the hood, iOS shares its core foundation (Darwin/UNIX) with macOS, but the User Interface layer is entirely different.

## The Walled Garden
iOS is famous for its strict, uncompromising security model:
1. **Sandboxing**: Every app is strictly isolated in a "sandbox." App A cannot look at the files or memory of App B.
2. **The App Store Monopoly**: Until very recently (and only due to EU legislation), the *only* way to install software on an iPhone was through Apple's App Store, subject to their strict review guidelines and 30% revenue cut.
3. **No Background Processing**: To preserve battery life, iOS aggressively kills apps running in the background. Unlike Android, you cannot easily run an app that constantly mines crypto or tracks location without the OS noticing and terminating it.

## The UI Standard
iOS set the standard for fluid mobile interfaces. Apple enforces strict Human Interface Guidelines (HIG), ensuring that scrolling feels physical (rubber-banding effects) and that buttons are large enough for thumbs. Developers build iOS apps using **Swift** and **SwiftUI**.

<Callout icon="info" title="The Forking of iOS">
As Apple's hardware evolved, they forked iOS to create specialized OSes: **iPadOS** (added mouse support and multitasking for larger screens), **watchOS** (for the Apple Watch), and **tvOS** (for Apple TV).
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/11. Operating Systems & Platforms (Distributions & Products)/Android/index.mdx': `---
title: Android
description: "An open-source mobile operating system based on a modified version of the Linux kernel, developed primarily by Google."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Android"
  icon="android"
  creator="Google (originally Android Inc.)"
  year={2008}
  website="https://www.android.com/"
>

**Android** is the most widely used operating system in the world, powering over 70% of all smartphones globally. 

Unlike iOS, which Apple keeps locked to their own hardware, Android is open-source (AOSP - Android Open Source Project). Google builds the core OS and gives it away for free to Samsung, Motorola, Xiaomi, and other manufacturers to put on their phones.

## Architecture

1. **The Linux Kernel**: At the very bottom, Android runs a heavily modified Linux kernel to handle memory, power management, and hardware drivers.
2. **The JVM (ART)**: Android apps are historically written in Java (and now Kotlin). Instead of running native machine code, Android uses the Android Runtime (ART) to compile and run bytecode. This ensures that an app written for a phone with a Qualcomm Snapdragon chip will also run on a phone with a MediaTek chip.

## Openness vs Fragmentation

- **The Pros**: Sideloading. You do not need the Google Play Store to install an app; you can just download an APK file from the internet and install it. Android allows true background services, custom home screen launchers, and complete file system access.
- **The Cons**: Fragmentation. Because Samsung and Motorola modify the OS heavily (adding their own UI skins like "One UI"), it takes months for them to update their phones when Google releases a new version of Android. Developers have to write code that accommodates thousands of different screen sizes, hardware combinations, and OS versions simultaneously.

<Callout icon="warning" title="Google Mobile Services (GMS)">
While Android itself is open-source, the services that make it actually useful (Google Maps, Google Play Store, Push Notifications) are closed-source and owned by Google. If a manufacturer (like Huawei) is banned from using GMS, their Android phones become essentially useless to Western consumers, proving that Google maintains an iron grip on the "open" ecosystem.
</Callout>

</TechnologyTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
