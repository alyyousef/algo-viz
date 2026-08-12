import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/12. Linux & Shell Administration/Linux kernel/index.mdx': `---
title: Linux Kernel
description: The core foundation of the Linux OS that directly manages hardware, memory, and CPU scheduling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Linux Kernel">

The **Linux Kernel** is the absolute core of the Linux operating system. It acts as the bridge between the physical hardware (CPU, RAM, Hard Drives) and the user-space applications (Web Browsers, Databases). 

Without the kernel, your computer is just an inert block of silicon.

## Monolithic Architecture

Linux is a **Monolithic Kernel**. This means that almost all core OS services run in a single, massive, highly privileged memory space (Ring 0 / Kernel Space). 

This includes:
- **Device Drivers**: The code that tells the OS how to talk to a specific Nvidia graphics card or Realtek Wi-Fi chip.
- **File Systems**: The logic for reading/writing to EXT4, NTFS, or FAT32 partitions.
- **Network Stack**: The code that actually constructs TCP/IP packets.

<Callout icon="warning" title="Monolithic Trade-offs">
  Because everything runs in the same privileged space, Linux is incredibly fast; processes do not need to constantly cross boundaries to talk to the network card. However, a bug in a poorly written USB driver can theoretically crash the entire kernel, causing a system-wide "Kernel Panic".
</Callout>

## Interacting with the Kernel

User-space applications cannot talk to the hardware directly. If a Node.js server wants to read a file, it must ask the Kernel to do it via a **System Call (syscall)** (e.g., TICK1open()TICK1, TICK1read()TICK1). 

You can interact with kernel parameters at runtime using the TICK1/procTICK1 and TICK1/sysTICK1 virtual filesystems, or by using the TICK1sysctlTICK1 command.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Filesystem hierarchy standard/index.mdx': `---
title: Filesystem Hierarchy Standard (FHS)
description: The strict, standardized directory structure that dictates exactly where files must live on a Linux system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Filesystem Hierarchy Standard (FHS)">

Unlike Windows (which splits drives into TICK1C:\TICK1 and TICK1D:\TICK1), Linux uses a single, unified, upside-down tree structure starting at the **Root Directory (TICK1/TICK1)**. 

To ensure that software works across different Linux distributions, the **Filesystem Hierarchy Standard (FHS)** strictly defines what every folder in the root directory is used for.

## The Core Directories

Here are the most critical directories you must know as a Linux Administrator:

- TICK1/binTICK1: Essential user command binaries (e.g., TICK1lsTICK1, TICK1catTICK1, TICK1bashTICK1). 
- TICK1/bootTICK1: Static files required to boot the system, including the actual compiled Linux kernel (TICK1vmlinuzTICK1) and the GRUB bootloader.
- TICK1/devTICK1: Device nodes. In Linux, "Everything is a file". Your primary hard drive is exposed here as a file (e.g., TICK1/dev/sdaTICK1).
- TICK1/etcTICK1: System-wide configuration files (Host-specific). If you need to configure an Nginx server, the config file goes here.
- TICK1/homeTICK1: Personal directories for standard users (e.g., TICK1/home/aliceTICK1).
- TICK1/rootTICK1: The personal home directory for the all-powerful TICK1rootTICK1 superuser.
- TICK1/libTICK1: Shared C libraries (similar to TICK1.dllTICK1 files in Windows) required by the binaries in TICK1/binTICK1.
- TICK1/varTICK1: Variable data files that constantly change while the system is running (e.g., system logs in TICK1/var/logTICK1, or databases).
- TICK1/tmpTICK1: Temporary files. This directory is usually completely wiped empty every time the server reboots.

<Callout icon="info" title="The /usr Directory">
  The FHS is historically messy. Originally, TICK1/usrTICK1 stood for "User Services and Routines". Today, it acts as a secondary hierarchy. Most modern Linux distributions use systemd to physically symlink TICK1/binTICK1 directly to TICK1/usr/binTICK1 to clean up the ancient FHS design.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/LVM/index.mdx': `---
title: LVM (Logical Volume Manager)
description: An advanced storage framework that abstracts physical hard drives, allowing dynamic, on-the-fly resizing of disk partitions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LVM (Logical Volume Manager)">

Traditionally, when you install Linux, you format a physical hard drive into fixed partitions (e.g., a 50GB TICK1/TICK1 partition and a 100GB TICK1/homeTICK1 partition). If TICK1/TICK1 runs out of space, resizing it physically on the spinning disk is a dangerous, complicated nightmare requiring downtime.

**LVM (Logical Volume Manager)** solves this by abstracting the physical disks away from the operating system entirely.

## The Three Layers of LVM

LVM works by stacking three virtual concepts on top of each other:

1. **Physical Volumes (PV)**: You initialize raw physical hard drives (e.g., TICK1/dev/sdaTICK1, TICK1/dev/sdbTICK1) to be managed by LVM.
2. **Volume Groups (VG)**: You group multiple Physical Volumes together into a single, massive pool of storage. (e.g., combining two 1TB drives into a 2TB "StoragePool").
3. **Logical Volumes (LV)**: You carve out virtual "partitions" from the Volume Group. The OS formats these LVs (e.g., as EXT4) and mounts them.

<Callout icon="success" title="The Magic of Dynamic Resizing">
  If your database partition (an LV) runs out of space, you do not need to reboot. You simply physically plug a new hard drive into the server, add it to the Volume Group (VG), and run TICK1lvextendTICK1 to dynamically grow the database LV into the new space while the server is actively running.
</Callout>

## Snapshots
Because LVM intercepts all read/write commands, it supports instantaneous **Snapshots**. You can take a snapshot of a 1TB database Logical Volume in milliseconds. LVM will freeze the state, and any new writes to the database will simply be redirected to a new block of storage (Copy-on-Write), allowing for perfect, zero-downtime backups.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Shell/index.mdx': `---
title: The Shell
description: The command-line interpreter that acts as the primary interface between the user and the Linux Kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Shell">

The Linux Kernel does not understand English commands. If you type "make a new folder", the Kernel has no idea what you mean. 

A **Shell** is a user-space program whose entire job is to:
1. Accept human text input from the keyboard.
2. Parse that text into system calls and binary executions.
3. Pass those instructions to the Kernel.
4. Return the output back to the screen.

It is called a "Shell" because it wraps around the Kernel, hiding the extreme complexity of hardware interaction.

## Interactive vs Non-Interactive

A Shell operates in two primary modes:
- **Interactive Mode**: You open a Terminal window, type a command (like TICK1ls -laTICK1), press Enter, and the Shell waits for your next command. It maintains state (like your current directory).
- **Non-Interactive Mode**: You write a script (a text file containing a list of commands). The Shell reads the file from top to bottom, executes every command at lightning speed, and immediately exits.

<Callout icon="info" title="Terminal vs Shell">
  A **Terminal** (or Terminal Emulator) is just the graphical window that draws text on your screen (like iTerm2 or GNOME Terminal). The **Shell** (like Bash or Zsh) is the actual program running *inside* that window processing the commands. 
</Callout>

When you log into a Linux server via SSH, the system checks the TICK1/etc/passwdTICK1 file to see which specific Shell program is assigned to your user account, and immediately launches it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Bash/index.mdx': `---
title: Bash
description: The Bourne Again SHell, the undisputed, ubiquitous default command-line interpreter across almost all Linux distributions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bash">

**Bash** (Bourne Again SHell) was released in 1989 as a free software replacement for the original Unix Bourne shell (TICK1shTICK1). 

Today, Bash is the absolute standard. If you provision a server on AWS, boot up a Docker container, or log into a Raspberry Pi, you are almost certainly dropped into a Bash shell by default.

## Bash Scripting

Bash is not just an interactive command prompt; it is a fully-featured, albeit slightly weird, programming language. 
System Administrators use Bash scripts to automate server backups, deploy software, and parse log files.

TICK3bash
#!/bin/bash
# A simple Bash script

USERNAME="Admin"

if [ "$USERNAME" == "Admin" ]; then
    echo "Welcome back, $USERNAME. The system load is:"
    uptime
else
    echo "Access Denied."
fi
TICK3

<Callout icon="warning" title="The Shebang">
  The first line of almost every bash script is TICK1#!/bin/bashTICK1 (The Shebang). This tells the operating system exactly which interpreter binary it must use to execute the subsequent lines of text in the file.
</Callout>

## Configuration Files

When a user logs into a Bash shell, Bash automatically executes specific hidden configuration files in their home directory to set up their environment (like setting aliases or exporting PATH variables).
- **TICK1~/.bash_profileTICK1**: Executed only once when the user initially logs in.
- **TICK1~/.bashrcTICK1**: Executed every single time the user opens a new terminal window.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Zsh/index.mdx': `---
title: Zsh (Z Shell)
description: A highly advanced, wildly customizable shell that acts as a modern replacement for Bash, featuring powerful auto-completion.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zsh (Z Shell)">

**Zsh (Z Shell)** is an extended shell that takes everything good about Bash and heavily supercharges it for interactive desktop use. 

While Bash is the king of headless servers, Zsh has become the undisputed king of developer laptops. In 2019, Apple officially abandoned Bash and made Zsh the default shell for all new macOS installations.

## Killer Features

Zsh is massively popular due to three main features that Bash lacks out of the box:

1. **Advanced Auto-Completion**: In Bash, pressing TAB completes file names. In Zsh, pressing TAB can complete Git branches, TICK1npmTICK1 scripts, and complex Docker arguments, complete with a navigable, interactive menu.
2. **Path Expansion**: You don't have to type TICK1cd /usr/local/binTICK1. You can just type TICK1cd /u/l/bTICK1, hit TAB, and Zsh will instantly expand it.
3. **Spelling Correction**: If you accidentally type TICK1git statsuTICK1, Zsh will automatically intercept the command and ask: *“zsh: correct 'statsu' to 'status' [nyae]?”*

<Callout icon="success" title="Oh My Zsh">
  The primary reason Zsh became so popular is **Oh My Zsh**, a massive open-source, community-driven framework for managing Zsh configurations. It provides hundreds of beautiful, heavily customized terminal themes and pre-configured plugins (like coloring command outputs) that take seconds to install.
</Callout>

## Configuration
Like Bash uses TICK1~/.bashrcTICK1, Zsh uses **TICK1~/.zshrcTICK1** for user-specific configuration. Zsh is highly backward-compatible; almost any script written for Bash will run perfectly in Zsh.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Users/index.mdx': `---
title: Users
description: The fundamental identity and permission entities in Linux, governed by the UID system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Users">

Linux is fundamentally a multi-user operating system. The concept of "Users" is deeply baked into the Linux Kernel to ensure extreme isolation and security.

## The User ID (UID)

The Linux Kernel does not understand human names like "alice" or "bob". It only understands integers. Every user is assigned a unique **UID (User ID)**.

- **UID 0 (Root)**: The superuser. UID 0 has absolute, unrestricted power over the entire system. It can bypass all permission checks, overwrite the kernel in memory, and instantly delete the entire hard drive.
- **UID 1 - 999 (System Users)**: Accounts created specifically for software to run securely. For example, the Nginx web server runs as a system user so that if it gets hacked, the hacker doesn't get Root access. These users usually cannot log in.
- **UID 1000+ (Human Users)**: Standard accounts created for actual humans to log into the system.

<Callout icon="info" title="The /etc/passwd File">
  The mapping between human names and UIDs is stored in plain text in TICK1/etc/passwdTICK1. 
  A line looks like this: TICK1alice:x:1001:1001:Alice Smith:/home/alice:/bin/bashTICK1. 
  (The "x" means the actual encrypted password hash is securely stored in a different file called TICK1/etc/shadowTICK1, which only Root can read).
</Callout>

## User Management Commands
- TICK1useradd <name>TICK1: Creates a new user.
- TICK1usermod -aG <group> <name>TICK1: Modifies a user (e.g., adding them to a new group).
- TICK1userdel <name>TICK1: Deletes a user.
- TICK1su <name>TICK1: Switch User. Allows you to instantly switch your current terminal session to become another user, assuming you know their password.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Groups/index.mdx': `---
title: Groups
description: The mechanism Linux uses to organize multiple users and grant them collective permissions to files and hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Groups">

Managing permissions for 100 individual users is a nightmare. Linux simplifies this using **Groups**.

A Group is simply a collection of Users. Instead of granting 5 different developers permission to read a specific log file, you create a TICK1developersTICK1 group, grant the group permission to read the file, and add all 5 users to that group.

## The Group ID (GID)

Just like Users have UIDs, Groups have **GIDs (Group IDs)**.

When a user is created, Linux usually creates a "Primary Group" with the exact same name and ID as the user. (e.g., User TICK1aliceTICK1 is placed into the primary group TICK1aliceTICK1). Any file Alice creates will be owned by both her UID and her primary GID.

Users can also belong to multiple "Secondary Groups".
For example, if Alice needs to run Docker containers, you add her to the TICK1dockerTICK1 secondary group.

<Callout icon="info" title="The /etc/group File">
  Group memberships are defined in TICK1/etc/groupTICK1. 
  A line looks like this: TICK1docker:x:998:alice,bobTICK1. 
  This means the TICK1dockerTICK1 group has GID 998, and Alice and Bob are members.
</Callout>

## The Power of the "wheel" Group
In many Linux distributions, there is a special group called TICK1wheelTICK1 (or TICK1sudoTICK1 in Ubuntu). Any human user added to this specific group is allowed to temporarily execute commands as the Root superuser by prefixing their commands with the TICK1sudoTICK1 command.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Permissions/index.mdx': `---
title: Standard Permissions
description: The classic Unix Read, Write, and Execute bits that govern exactly who can interact with a file.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Standard Permissions">

Every single file and directory in Linux has a strict set of permissions that dictate exactly what can be done to it. 

If you run TICK1ls -lTICK1, you will see a 10-character permission string on the far left, looking something like this: **TICK1-rwxr-xr--TICK1**

## The Permission Triads

The 10 characters are broken down into a type indicator, followed by three sets of "Triads" (groups of 3 characters):
1. **Type**: The very first character. TICK1-TICK1 means it's a file. TICK1dTICK1 means it's a directory.
2. **User (Owner)**: The permissions for the specific User who owns the file.
3. **Group**: The permissions for anyone in the Group that owns the file.
4. **Others**: The permissions for every single other person on the server.

Inside each Triad, there are three possible bits:
- **r (Read)**: Can view the contents of the file. (For directories: can list the files inside).
- **w (Write)**: Can modify the file. (For directories: can create/delete files inside).
- **x (Execute)**: Can run the file as a program. (For directories: can TICK1cdTICK1 into the directory).

<Callout icon="success" title="Numeric (Octal) Notation">
  Permissions are commonly represented as a 3-digit Octal number, where **Read=4**, **Write=2**, and **Execute=1**. 
  - TICK1chmod 755 script.shTICK1 gives the Owner (4+2+1=7) full control, while giving the Group (4+0+1=5) and Others (4+0+1=5) read and execute only.
  - TICK1chmod 600 key.pemTICK1 gives the Owner (4+2=6) read/write, and completely locks out everyone else (0, 0).
</Callout>

## The Root Exception
The TICK1rootTICK1 user entirely ignores these permission strings. The kernel grants Root the ability to read, write, or delete any file on the system, regardless of what the permission bits say.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/ACLs/index.mdx': `---
title: ACLs (Access Control Lists)
description: An advanced permission extension that allows fine-grained, per-user access control beyond the classic Owner/Group/Other triads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ACLs (Access Control Lists)">

The classic Unix permission system (Owner, Group, Others) is incredibly fast and simple, but it is highly inflexible.

Imagine you have a file owned by Alice. You want to give Bob *Read* access, and you want to give Charlie *Read/Write* access. 
Under standard permissions, you cannot do this. A file can only have **one** owning Group. You would have to create complex, overlapping custom groups just to share one file.

**Access Control Lists (ACLs)** solve this by allowing you to attach a list of specific users and their specific permissions directly to a single file.

## Managing ACLs

When ACLs are enabled on a filesystem, you use two commands to manage them:

1. **TICK1getfacl <file>TICK1**: Displays the ACLs on a file.
2. **TICK1setfacl -m u:charlie:rw <file>TICK1**: Modifies the ACL. This specific command explicitly grants the user TICK1charlieTICK1 read/write permissions to the file, regardless of what the standard Group/Other permissions are.

<Callout icon="warning" title="The ACL Indicator">
  If you run TICK1ls -lTICK1 on a file that has an ACL applied to it, you will see a tiny TICK1+TICK1 symbol at the very end of the 10-character permission string (e.g., TICK1-rw-r--r--+TICK1). This plus sign is a critical warning to sysadmins that the standard permission string is lying to them, and they must run TICK1getfaclTICK1 to see the real permissions.
</Callout>

## Default ACLs on Directories
A massive feature of ACLs is "Default ACLs" on directories. You can configure a directory so that any new file created inside it *automatically* inherits a specific ACL (e.g., "Any file created in the TICK1/sharedTICK1 folder automatically grants Read/Write to the QA Team"), entirely overriding the user's standard TICK1umaskTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Processes/index.mdx': `---
title: Processes
description: A running instance of a program, heavily managed by the Linux kernel via PIDs, Signals, and scheduling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Processes">

In Linux, a binary sitting on your hard drive (like TICK1/bin/lsTICK1) is just a static file. 
When you execute that binary, the Kernel loads it into RAM and creates a **Process**.

A Process is a living, breathing entity. The Kernel assigns it an isolated chunk of memory, tracks what files it has open, and decides exactly how many milliseconds of CPU time it gets per second.

## The Process ID (PID)

Every single process is assigned a unique integer called a **PID (Process ID)**. 
- **PID 1**: The very first process that starts when the computer boots (usually TICK1systemdTICK1). 
- Every other process on the computer is a "Child" spawned by PID 1 (or by another child). If a Parent process is killed, all of its Children are usually killed as well.

<Callout icon="info" title="Background vs Foreground">
  If you run a script in the terminal, it runs in the "Foreground" and blocks you from typing anything else. 
  If you append an ampersand (TICK1&TICK1) to the command (e.g., TICK1./backup.sh &TICK1), the Shell detaches the process, letting it run invisibly in the "Background" so you can keep using the terminal.
</Callout>

## Managing Processes

Sysadmins constantly monitor and manipulate running processes:
- TICK1ps auxTICK1: Takes a static snapshot of every single process running on the entire system.
- TICK1topTICK1 / TICK1htopTICK1: Provides a live, updating, interactive dashboard showing which processes are consuming the most CPU and RAM.
- TICK1kill <PID>TICK1: Sends a software **Signal** (usually SIGTERM) to a process, politely asking it to save its data and shut down. TICK1kill -9 <PID>TICK1 (SIGKILL) forces the kernel to instantly execute the process without warning.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/SSH/index.mdx': `---
title: SSH (Secure Shell)
description: The ubiquitous, cryptographically secure protocol used by administrators to remotely control Linux servers over the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSH (Secure Shell)">

Before 1995, sysadmins logged into remote servers using protocols like Telnet. Telnet sent every keystroke (including the root password) over the internet in plain text, meaning anyone on the network could trivially intercept it.

**SSH (Secure Shell)** was invented to solve this. It creates a cryptographically secure, encrypted tunnel between your laptop and a remote server. Today, SSH operates on **Port 22** and is the absolute foundation of modern cloud infrastructure management.

## Public Key Authentication

While you *can* log in via SSH using a password, it is highly discouraged due to brute-force attacks. The enterprise standard is **Public Key Authentication**.

1. You run TICK1ssh-keygenTICK1 on your laptop, generating two cryptographically linked files: a **Private Key** (which you never share) and a **Public Key**.
2. You append your Public Key to the remote server's TICK1~/.ssh/authorized_keysTICK1 file.
3. When you run TICK1ssh user@serverTICK1, the server sends a mathematical puzzle that can *only* be solved if you possess the Private Key. 
4. Your laptop solves the puzzle in milliseconds, proving your identity, and the server lets you in without ever transmitting a password.

<Callout icon="warning" title="Disabling Root Login">
  A fundamental security practice on all public-facing Linux servers is modifying the TICK1/etc/ssh/sshd_configTICK1 file to set TICK1PermitRootLogin noTICK1. This prevents hackers from directly brute-forcing the Root account. Admins must log in as a standard user first, and then use TICK1sudoTICK1.
</Callout>

## SSH Tunneling (Port Forwarding)
Because SSH creates an unbreakable encrypted tunnel, you can force other network traffic through it. Using SSH Local Port Forwarding, you can securely access a private database running on a remote cloud server as if the database was running on TICK1localhostTICK1 on your laptop.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/SCP/index.mdx': `---
title: SCP (Secure Copy Protocol)
description: A legacy command-line tool used to securely transfer files between computers over an encrypted SSH connection.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SCP (Secure Copy Protocol)">

When managing a remote Linux server, you often need to upload a configuration file or download a backup archive. 
**SCP (Secure Copy Protocol)** is a simple command-line tool that transfers files over the network using the exact same encrypted tunnel and authentication methods as SSH.

## Basic Syntax

SCP uses a syntax very similar to the standard local TICK1cpTICK1 (copy) command, but it allows you to specify remote network targets using the TICK1user@host:/pathTICK1 format.

- **Upload a file to a server**: 
  TICK1scp backup.tar.gz root@192.168.1.50:/var/backups/TICK1
- **Download a file from a server**: 
  TICK1scp root@192.168.1.50:/var/log/nginx/error.log ./TICK1
- **Upload a whole directory recursively (-r)**: 
  TICK1scp -r ./website_build/ root@192.168.1.50:/var/www/html/TICK1

<Callout icon="warning" title="The Deprecation of SCP">
  While SCP is famous and ubiquitous, it is technically **deprecated** by modern standards due to fundamental flaws in its underlying RCP protocol (it has no resuming capability, poor performance on high-latency networks, and subtle security vulnerabilities regarding file names). 
  Modern Linux distributions heavily encourage admins to use **SFTP** or **Rsync** instead.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/awk/index.mdx': `---
title: awk
description: A wildly powerful, programmable command-line tool used exclusively for text processing and data extraction from columns.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="awk">

**awk** (named after its creators Aho, Weinberger, and Kernighan) is not just a command; it is an entire, Turing-complete programming language designed specifically for parsing and manipulating structured text data directly in the terminal.

While tools like TICK1grepTICK1 are used to find entire *lines* of text, TICK1awkTICK1 is the absolute master of extracting and calculating data from **Columns** (fields).

## The Power of Columns

By default, TICK1awkTICK1 assumes that your text is separated by spaces or tabs. It assigns the first column to the variable TICK1$1TICK1, the second to TICK1$2TICK1, and the entire line to TICK1$0TICK1.

If you run TICK1ls -lTICK1, it outputs a messy string with file sizes in the 5th column. 
You can pipe that output into TICK1awkTICK1 to print just the file sizes and the file names:
TICK1ls -l | awk '{ print $5, $9 }'TICK1

<Callout icon="success" title="Advanced Parsing (Field Separators)">
  The TICK1/etc/passwdTICK1 file uses colons (TICK1:TICK1) to separate its columns, not spaces. 
  You can use the TICK1-FTICK1 flag to tell TICK1awkTICK1 exactly what the delimiter is. 
  To print a clean list of all usernames (Column 1) on the system, you simply run: 
  TICK1awk -F ':' '{ print $1 }' /etc/passwdTICK1
</Callout>

## Mathematical Processing
Because TICK1awkTICK1 is a programming language, it can do math on the fly. 
You can pipe a list of file sizes into TICK1awkTICK1 and have it add them all up, maintaining a running TICK1sumTICK1 variable, and then use the special TICK1ENDTICK1 block to print the total calculated size in bytes when it finishes reading the input.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/at/index.mdx': `---
title: at
description: A command-line utility used to schedule a script or command to be executed exactly once at a specific time in the future.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="at">

While the famous TICK1cronTICK1 utility is used to schedule scripts that run *repeatedly* (e.g., every Tuesday at 3 AM), the **TICK1atTICK1** command is designed to schedule a script to run exactly **one single time** in the future.

This is highly useful for sysadmins executing one-off maintenance tasks when they do not want to stay awake until midnight.

## Usage and Syntax

The TICK1atTICK1 command reads from Standard Input. You specify the time, type the commands you want to run, and then press TICK1Ctrl+DTICK1 to save the job.

TICK3bash
$ at midnight
warning: commands will be executed using /bin/sh
at> systemctl restart nginx
at> <Ctrl+D>
job 3 at Wed Oct 18 00:00:00 2024
TICK3

The time parser in TICK1atTICK1 is incredibly flexible and understands human-readable syntax. You can type:
- TICK1at 4:00 PMTICK1
- TICK1at now + 2 hoursTICK1
- TICK1at 9:00 AM next fridayTICK1

<Callout icon="info" title="The atq and atrm Commands">
  Once a job is scheduled, the background TICK1atdTICK1 daemon takes over. 
  You can view all currently pending jobs by running the TICK1atqTICK1 command. 
  If you realize you made a mistake and want to cancel job #3 before midnight arrives, you simply run TICK1atrm 3TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/apk)/index.mdx': `---
title: apk (Alpine Package Manager)
description: The lightning-fast, ultra-lightweight package manager built specifically for Alpine Linux and heavily used in Docker containers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="apk (Alpine Package Manager)">

The **apk (Alpine Package Keeper)** is the default package manager for Alpine Linux. 

Because Alpine Linux is overwhelmingly used as the foundational base image for Docker containers, TICK1apkTICK1 is one of the most frequently executed package managers in the world, usually seen inside TICK1DockerfileTICK1 build scripts.

## The Design Philosophy

While Debian's TICK1aptTICK1 and RHEL's TICK1dnfTICK1 are massive, complex pieces of software written in Python or C++, TICK1apkTICK1 is designed with the exact same philosophy as Alpine itself: **Extreme Minimalism and Speed**. 

TICK1apkTICK1 is compiled as a tiny, statically-linked binary. It executes instantly, consumes virtually no RAM, and does not leave bloated cache files on the hard drive (unless explicitly requested).

<Callout icon="success" title="Common Docker Usage">
  When building a Docker image, you want the image to be as small as possible. The most common TICK1apkTICK1 command you will see is:
  TICK1apk add --no-cache curl python3TICK1
  The TICK1--no-cacheTICK1 flag brilliantly downloads the packages into RAM, installs them, and discards the repository index immediately, ensuring your Docker image doesn't waste 20MB of disk space storing a text list of package names.
</Callout>

## Basic Commands
- **TICK1apk updateTICK1**: Fetches the latest list of available software from the Alpine repositories.
- **TICK1apk add <package>TICK1**: Installs a new piece of software.
- **TICK1apk del <package>TICK1**: Removes a piece of software.
- **TICK1apk info <package>TICK1**: Displays details about what exactly an installed package is doing.

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
