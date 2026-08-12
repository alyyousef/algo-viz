import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/12. Linux & Shell Administration/chgrp/index.mdx': `---
title: chgrp
description: The specific command-line utility used to change the Group ownership of a file or directory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="chgrp">

Every file in Linux is owned by a specific User and a specific Group. While the TICK1chownTICK1 command can change both, the **TICK1chgrpTICK1** command is a specialized utility designed exclusively to change the Group ownership of a file.

## Basic Usage

The syntax is extremely simple: TICK1chgrp [GROUP] [FILE]TICK1.

If you have a file named TICK1project.txtTICK1, and you want to hand ownership of it to the TICK1developersTICK1 group so your team can edit it:
TICK1sudo chgrp developers project.txtTICK1

<Callout icon="warning" title="Security Restrictions">
  Unlike Windows, you cannot just assign any group to a file. A standard user can only use TICK1chgrpTICK1 if they currently own the file **and** they are already a member of the target group. Otherwise, you must use TICK1sudoTICK1.
</Callout>

## Recursive Group Changes
If you have a massive directory containing thousands of files, you can use the TICK1-RTICK1 (Recursive) flag to instantly change the group of everything inside the folder:
TICK1sudo chgrp -R www-data /var/www/html/TICK1

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/chmod/index.mdx': `---
title: chmod
description: The fundamental command used to change the read, write, and execute permissions of files and directories.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="chmod">

The **TICK1chmodTICK1** (Change Mode) command is one of the most frequently used commands in Linux. It modifies the permission bits (Read, Write, Execute) for the Owner, Group, and Others.

## Octal (Numeric) Mode

The most common and fastest way to use TICK1chmodTICK1 is using Octal numbers, where:
- **4** = Read
- **2** = Write
- **1** = Execute

You provide a 3-digit number representing the Owner, the Group, and Others.

TICK3bash
# Owner gets Read/Write/Execute (7). Everyone else gets Read/Execute (5).
chmod 755 script.sh

# Owner gets Read/Write (6). Everyone else gets absolutely nothing (0).
chmod 600 private_key.pem
TICK3

## Symbolic Mode

If you don't want to calculate numbers, you can use symbolic math using TICK1uTICK1 (User), TICK1gTICK1 (Group), TICK1oTICK1 (Others), and TICK1aTICK1 (All).

- **Add Execute permission for everyone**: TICK1chmod +x script.shTICK1
- **Remove Write permission for Others**: TICK1chmod o-w public.txtTICK1
- **Explicitly set Group to Read-only**: TICK1chmod g=r public.txtTICK1

<Callout icon="warning" title="Directories and Execute">
  Remember that for a directory, the "Execute" bit means "Allow the user to CD into this directory". If you remove the Execute bit from a directory (TICK1chmod -xTICK1), no one will be able to open it, even if they have Read permission!
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/chown/index.mdx': `---
title: chown
description: The supreme command used to change the User and Group ownership of files and directories.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="chown">

The **TICK1chownTICK1** (Change Owner) command allows administrators to transfer ownership of a file from one user to another. Because giving files away can bypass disk quotas and security mechanisms, TICK1chownTICK1 usually requires Root (TICK1sudoTICK1) privileges.

## Syntax and Usage

You can use TICK1chownTICK1 to change just the user, or both the user and the group simultaneously using a colon (TICK1:TICK1).

- **Change just the User**:
  TICK1sudo chown alice database.sqlTICK1
- **Change the User and the Group simultaneously**:
  TICK1sudo chown alice:developers database.sqlTICK1

<Callout icon="info" title="The Shorthand Group Trick">
  If you type a colon but leave the group blank (e.g., TICK1sudo chown alice: database.sqlTICK1), Linux will automatically look up Alice's Primary Group and change the file's group ownership to match it.
</Callout>

## The Danger of Recursive Chown
Like TICK1chmodTICK1, TICK1chownTICK1 supports the TICK1-RTICK1 flag. Be extremely careful when using TICK1sudo chown -R user:group /*TICK1. A misplaced asterisk or slash will instantly destroy the operating system by reassigning ownership of core kernel binaries away from Root, permanently breaking the server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/cron/index.mdx': `---
title: cron
description: The legendary time-based job scheduler used to automate recurring background tasks on Unix systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="cron">

If you need a script to run every single night at 2:00 AM, you do not write a script with an infinite loop and a TICK1sleepTICK1 command. You use **TICK1cronTICK1**.

The TICK1crondTICK1 daemon wakes up every single minute, checks a set of configuration files called "crontabs", and executes any commands scheduled for that specific minute.

## The Crontab Syntax

You edit your user's scheduled jobs by typing TICK1crontab -eTICK1. 
The syntax consists of 5 time fields followed by the command to execute:

TICK3text
* * * * * command_to_execute
| | | | |
| | | | +-- Day of the Week (0 - 7) (Sunday=0 or 7)
| | | +---- Month (1 - 12)
| | +------ Day of the Month (1 - 31)
| +-------- Hour (0 - 23)
+---------- Minute (0 - 59)
TICK3

### Examples:
- **TICK10 2 * * * /backup.shTICK1**: Runs exactly at 2:00 AM every single day.
- **TICK1*/5 * * * * /monitor.shTICK1**: Runs every 5 minutes, 24/7.
- **TICK10 0 * * 5 /report.shTICK1**: Runs at midnight, only on Fridays.

<Callout icon="warning" title="Cron Environment Variables">
  TICK1cronTICK1 runs in a heavily stripped-down, non-interactive environment. It does NOT load your TICK1~/.bashrcTICK1 file. Therefore, commands that rely on your personal TICK1$PATHTICK1 variable will fail. Always use absolute paths in cron jobs (e.g., TICK1/usr/bin/node /home/user/script.jsTICK1).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/curl/index.mdx': `---
title: curl
description: The ubiquitous command-line tool and library for transferring data over network protocols, primarily HTTP/HTTPS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="curl">

**TICK1curlTICK1** (Client URL) is the Swiss Army knife of networking. It allows you to make HTTP requests, download files, and interact with REST APIs directly from your terminal. It is installed by default on almost every operating system on Earth, including Windows 10+.

## Basic HTTP Requests

By default, TICK1curlTICK1 executes a standard HTTP GET request and prints the raw response body to the terminal screen.
TICK1curl https://api.github.com/users/torvaldsTICK1

<Callout icon="info" title="Viewing Headers">
  If an API is failing and you need to debug the HTTP headers, use the TICK1-iTICK1 flag (include headers) or the TICK1-vTICK1 flag (verbose mode, which shows exactly what TICK1curlTICK1 is sending and receiving byte-by-byte).
</Callout>

## Advanced API Interaction

TICK1curlTICK1 can perfectly simulate a complex frontend JavaScript TICK1fetch()TICK1 call.

- **Send a POST request (TICK1-XTICK1)** with a JSON body (TICK1-dTICK1) and specific headers (TICK1-HTICK1):
TICK3bash
curl -X POST https://api.example.com/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "123"}'
TICK3

## Downloading Files
While TICK1wgetTICK1 is usually preferred for downloading files, you can use TICK1curl -OTICK1 to tell curl to save the remote file to your hard drive using its original file name instead of printing the binary gibberish to the screen.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/dmesg/index.mdx': `---
title: dmesg
description: A command that prints the kernel ring buffer, used primarily to diagnose hardware and driver issues.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="dmesg">

When a Linux system boots up, the Kernel initializes the CPU, RAM, hard drives, and USB ports long before the system logger (like TICK1journaldTICK1) is actually running.

To record these hyper-early boot messages, the Kernel stores them in a fixed-size chunk of memory called the **Ring Buffer**. The **TICK1dmesgTICK1** (Display Message) command reads and prints this buffer.

## When to use dmesg

TICK1dmesgTICK1 is the ultimate hardware debugging tool. Sysadmins use it when:
1. **A server crashes**: To see if the Kernel triggered an Out-Of-Memory (OOM) killer event right before the crash.
2. **Plugging in new hardware**: If you plug a new USB drive into a headless server, you run TICK1dmesg | tailTICK1 to immediately see exactly what device name the Kernel assigned to it (e.g., TICK1/dev/sdcTICK1).
3. **Driver Failures**: To see if a proprietary Nvidia graphics driver failed to initialize.

<Callout icon="warning" title="The Ring Buffer Overwrites Itself">
  The kernel ring buffer is fixed in size (usually around 16KB to 64KB). Once it fills up, the oldest messages are permanently deleted to make room for new ones. If a server has been running for 3 years, running TICK1dmesgTICK1 will no longer show you the boot messages.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/dnf/index.mdx': `---
title: dnf (Dandified YUM)
description: The modern, dependency-resolving package manager used by Red Hat Enterprise Linux, Fedora, and CentOS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="dnf (Dandified YUM)">

For over a decade, Red Hat and CentOS systems used a package manager called TICK1yumTICK1. However, TICK1yumTICK1 was notoriously slow, consumed massive amounts of RAM, and had a poor dependency resolution algorithm.

In 2015, Fedora introduced **TICK1dnfTICK1** (Dandified YUM), a complete rewrite of YUM using a state-of-the-art C++ dependency solver called TICK1hawkeyTICK1. Today, TICK1dnfTICK1 is the absolute standard across the entire RHEL ecosystem.

## Basic Usage

TICK1dnfTICK1 works exactly like TICK1aptTICK1 in Debian/Ubuntu, but is often considered more stable and transaction-oriented.

- **TICK1sudo dnf updateTICK1**: Updates all software on the system.
- **TICK1sudo dnf install nginxTICK1**: Installs Nginx and automatically calculates and downloads all required dependencies.
- **TICK1sudo dnf remove httpdTICK1**: Uninstalls Apache.

<Callout icon="success" title="The History and Rollback Feature">
  Because TICK1dnfTICK1 treats every action as a strict transaction, it maintains a history log. 
  If you install a complex database cluster and it breaks your server, you can simply run TICK1dnf historyTICK1 to find the transaction ID, and then run TICK1dnf history undo <ID>TICK1 to completely roll back every single file and dependency installed during that specific command.
</Callout>

## Modules and Application Streams
A major feature of TICK1dnfTICK1 in RHEL 8+ is **AppStreams**. It allows the OS to host multiple versions of the same software (e.g., Node.js 14, 16, and 18) in the repository simultaneously. Sysadmins can use TICK1dnf module enable nodejs:18TICK1 to cleanly lock the server to a specific major version without dependency hell.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/environment variables/index.mdx': `---
title: Environment Variables
description: Dynamic key-value pairs stored in the shell's memory that define the behavior of the system and user-space applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Environment Variables">

When you type TICK1lsTICK1, how does the Shell know that the TICK1lsTICK1 binary is located in TICK1/usr/bin/lsTICK1? It uses an **Environment Variable**.

Environment Variables are simple Key-Value pairs that live in the background memory of your Shell. They are used to pass configuration data to applications without hardcoding values into scripts.

## Core Variables

You can view all current variables by running the TICK1envTICK1 or TICK1printenvTICK1 command.
- **TICK1$PATHTICK1**: A colon-separated list of directories. When you type a command, the shell searches these exact directories from left to right to find the binary.
- **TICK1$HOMETICK1**: The absolute path to your current user's home directory.
- **TICK1$USERTICK1**: Your current username.

<Callout icon="success" title="The Power of Export">
  If you set a variable like TICK1API_KEY=123TICK1 in Bash, it is only available to that specific shell. If you run a Python script, the script cannot see the TICK1API_KEYTICK1. 
  You must use the TICK1exportTICK1 command (TICK1export API_KEY=123TICK1). This forces Bash to pass a copy of the variable down to all child processes spawned from that terminal.
</Callout>

## Configuring Twelve-Factor Apps
Modern cloud applications (like Node.js or Docker containers) follow the "Twelve-Factor App" methodology, which mandates that ALL configuration (Database passwords, API endpoints, Port numbers) must be injected via Environment Variables at runtime, completely avoiding hardcoded configuration files.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/find/index.mdx': `---
title: find
description: The incredibly powerful, recursive search utility used to locate files and directories based on extreme edge-case criteria.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="find">

If you want to quickly locate a file by its name, you can use TICK1locateTICK1. However, if you need to execute a complex, hyper-specific query across the entire filesystem, you use **TICK1findTICK1**.

TICK1findTICK1 physically crawls the hard drive in real-time, checking the metadata of every single file against your conditions.

## Syntax and Conditions

The syntax is: TICK1find [starting_directory] [conditions]TICK1.

- **By Name**: TICK1find /var/log -name "*.log"TICK1
- **By Size**: TICK1find / -size +1GTICK1 (Finds all files larger than 1 Gigabyte).
- **By Age (Mtime)**: TICK1find /tmp -mtime +7TICK1 (Finds files modified more than 7 days ago).
- **By Permissions**: TICK1find /etc -perm 777TICK1 (Finds files with incredibly insecure permissions).

<Callout icon="warning" title="The Exec Flag (Danger!)">
  The true power of TICK1findTICK1 is the TICK1-execTICK1 flag, which allows you to execute a command on every single file it finds.
  
  TICK1find /var/log -name "*.old" -exec rm {} \;TICK1
  
  This command finds all TICK1.oldTICK1 files and instantly passes them (represented by TICK1{}TICK1) into the TICK1rmTICK1 command. Be extremely careful; running this as Root can delete thousands of files in milliseconds.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/fstab/index.mdx': `---
title: fstab (File System Table)
description: The critical system configuration file that dictates which hard drives are automatically mounted when the OS boots.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="fstab (File System Table)">

In Linux, plugging a hard drive into the motherboard does not make it usable. You must physically "mount" the drive's filesystem (e.g., TICK1/dev/sdb1TICK1) to an empty directory in the root tree (e.g., TICK1/mnt/databaseTICK1).

When the server reboots, all manual mounts are instantly forgotten. 
To make a mount permanent, you must declare it in **TICK1/etc/fstabTICK1**.

## The Syntax

The TICK1fstabTICK1 file uses a strict 6-column format:
TICK3text
# Device/UUID      Mount_Point   Type   Options    Dump   Pass
UUID=1a2b3c4d      /             ext4   defaults   0      1
/dev/sdb1          /mnt/data     xfs    defaults   0      2
10.0.0.5:/share    /mnt/nfs      nfs    ro         0      0
TICK3

1. **Device**: The physical partition (or uniquely generated UUID).
2. **Mount Point**: The directory where the drive should be attached.
3. **Type**: The filesystem format (EXT4, XFS, NFS).
4. **Options**: Mounting rules (e.g., TICK1roTICK1 for Read-Only, TICK1noexecTICK1 to ban running scripts from the drive).
5. **Dump & Pass**: Legacy fields for backup tools and filesystem checkers (TICK1fsckTICK1).

<Callout icon="warning" title="The Boot-Loop Danger">
  If you make a typo in TICK1/etc/fstabTICK1 (e.g., spelling TICK1ext4TICK1 as TICK1ex4TICK1), Linux will panic during the boot sequence because it cannot mount the drive, dropping the server into "Emergency Mode". You must always run TICK1mount -aTICK1 immediately after editing the file to test the syntax before you ever reboot.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/grep/index.mdx': `---
title: grep
description: The most famous Linux text processing tool, used to search streams of text for lines matching regular expressions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="grep">

**TICK1grepTICK1** (Global Regular Expression Print) is the ultimate search tool. It takes a stream of text (either from a file or piped from another command), scans every single line, and outputs only the lines that match your search pattern.

## Core Usage

You will use TICK1grepTICK1 thousands of times in your career to filter through massive, messy log files.

- **Basic Search**: TICK1grep "ERROR" /var/log/syslogTICK1 (Prints every line containing the word ERROR).
- **Case Insensitive (TICK1-iTICK1)**: TICK1grep -i "error" /var/log/syslogTICK1.
- **Invert Match (TICK1-vTICK1)**: TICK1grep -v "DEBUG" /var/log/syslogTICK1 (Prints everything EXCEPT lines containing DEBUG).
- **Recursive Directory Search (TICK1-rTICK1)**: TICK1grep -r "password123" /etc/TICK1 (Searches every single file inside the TICK1/etcTICK1 folder).

<Callout icon="success" title="Piping with Grep">
  The true power of TICK1grepTICK1 comes from the Unix Pipe (TICK1|TICK1). 
  If you run TICK1ps auxTICK1, it prints 500 running processes to your screen. 
  By running TICK1ps aux | grep nginxTICK1, you force the output of TICK1psTICK1 directly into TICK1grepTICK1, instantly filtering the screen to only show you the Nginx processes.
</Callout>

## Regular Expressions
TICK1grepTICK1 gets its name from Regular Expressions. You can use complex regex to find dynamic patterns, such as extracting IP addresses or valid email formats from a million-line database dump. (Using TICK1grep -ETICK1 or the TICK1egrepTICK1 alias enables Extended Regex for modern syntax).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/gzip/index.mdx': `---
title: gzip
description: The standard GNU compression utility used to heavily reduce the file size of text files and logs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="gzip">

**TICK1gzipTICK1** (GNU zip) is a single-file compression utility. It uses the DEFLATE algorithm, which is incredibly efficient at compressing raw text, logs, and database SQL dumps.

In the Linux ecosystem, TICK1gzipTICK1 is overwhelmingly the default compression format, recognizable by the TICK1.gzTICK1 file extension.

## How it works

Unlike the Windows TICK1.zipTICK1 format (which can bundle 100 files into a single archive), TICK1gzipTICK1 can only compress **one single file at a time**.

If you run TICK1gzip backup.sqlTICK1:
1. It compresses the file.
2. It renames it to TICK1backup.sql.gzTICK1.
3. It permanently deletes the original TICK1backup.sqlTICK1 file to save space.

To decompress it, you run TICK1gunzip backup.sql.gzTICK1.

<Callout icon="info" title="Tarballs (.tar.gz)">
  Because TICK1gzipTICK1 can only compress single files, sysadmins use the TICK1tarTICK1 command to bundle 100 files together into one massive solid block (an archive), and then pipe that block through TICK1gzipTICK1. 
  This results in the famous TICK1.tar.gzTICK1 (or TICK1.tgzTICK1) "Tarball", which is the Linux equivalent of a Windows Zip file.
</Callout>

## zcat and zgrep
A massive benefit of TICK1gzipTICK1 is the ability to read files without decompressing them to the hard drive. 
If you have a 5GB compressed log file (TICK1syslog.2.gzTICK1), you do not need to extract it to search it. You can simply use TICK1zgrep "ERROR" syslog.2.gzTICK1, which decompresses the text directly into RAM and searches it on the fly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/htop/index.mdx': `---
title: htop
description: An interactive, colorful, and heavily upgraded process viewer that serves as the modern replacement for the classic 'top' command.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="htop">

While the ancient TICK1topTICK1 command is installed on every Linux system, it is visually messy and difficult to use. 
**TICK1htopTICK1** is a third-party, ncurses-based task manager that sysadmins almost immediately install on fresh servers.

It provides a live, continuously updating dashboard of the server's vitals.

## The Interface

When you run TICK1htopTICK1, the screen splits into two main sections:
1. **The Header**: Displays beautiful ASCII bar graphs representing CPU utilization (for every single CPU core), RAM usage, and Swap space usage.
2. **The Process List**: A sortable list of every running process, showing exactly who owns it, how much RAM it is consuming (RES/VIRT), and its CPU percentage.

<Callout icon="success" title="Interactive Management">
  The biggest advantage of TICK1htopTICK1 over TICK1topTICK1 is interactivity. You can use your keyboard arrows (or your mouse!) to scroll through the process list, press F6 to instantly sort by Memory usage, select a rogue database query, and press F9 to instantly kill it—all without typing a single PID number.
</Callout>

## Tree View
By pressing F5 in TICK1htopTICK1, you enable **Tree View**. This visually nests child processes under their parent processes. This is absolutely critical for debugging web servers like Nginx or Apache, allowing you to see the main master process and all of its spawned worker threads.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/init systems/index.mdx': `---
title: Init Systems
description: The absolute first process (PID 1) that the Linux kernel launches, responsible for booting every other service on the machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Init Systems">

When you turn on a Linux server, the BIOS loads the Bootloader, the Bootloader loads the Kernel, and the Kernel initializes the CPU and RAM.

Once the hardware is ready, the Kernel launches exactly one single user-space program: **The Init System**. 
The Init system is assigned **PID 1**, and its job is to launch every other background service (Networking, SSH, Web Servers, Desktop GUIs) required to make the OS usable.

## SysVinit (The Old Guard)

For decades, Linux used **SysVinit** (System V). 
SysVinit used a series of bash scripts stored in TICK1/etc/init.d/TICK1. It booted the system sequentially, one script at a time. If the networking script took 10 seconds to start, the SSH script had to wait 10 seconds before it could run. This made booting incredibly slow.

## systemd (The Modern Standard)

In the 2010s, the Linux ecosystem underwent a massive, highly controversial shift to **systemd**.

TICK1systemdTICK1 is not just an init system; it is a massive suite of tools that manages the entire operating system.
- **Parallel Booting**: It maps out the dependency tree of services and boots them all simultaneously, drastically reducing boot times.
- **Unit Files**: Instead of messy bash scripts, services are defined using strict, declarative TICK1.serviceTICK1 files.
- **Process Tracking**: TICK1systemdTICK1 uses cgroups to track processes. If a web server crashes, TICK1systemdTICK1 knows immediately and can automatically restart it.

<Callout icon="warning" title="The systemd Controversy">
  TICK1systemdTICK1 was heavily criticized by Unix purists because it violates the "Unix Philosophy" (Do one thing and do it well). TICK1systemdTICK1 swallowed the init system, system logging (journald), cron jobs (systemd-timers), and network management (systemd-networkd) into one massive, complex monolith. Despite the arguments, TICK1systemdTICK1 won the war and is the default on almost all major distributions today.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/iptables/index.mdx': `---
title: iptables
description: The classic, deeply integrated Linux firewall utility used to filter network packets directly inside the Kernel.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="iptables">

**TICK1iptablesTICK1** is a user-space utility that configures the **Netfilter** module built directly into the Linux Kernel. It is the grandfather of all modern Linux firewalls.

Every single network packet that enters, leaves, or routes through a Linux machine is intercepted by Netfilter and passed through the rules defined by TICK1iptablesTICK1.

## Tables and Chains

TICK1iptablesTICK1 is incredibly complex because it is designed around multiple Tables and Chains:
1. **The Filter Table**: Used for standard firewall duties (Allow/Drop packets).
   - **INPUT Chain**: Traffic coming into the server (e.g., someone trying to load your website).
   - **OUTPUT Chain**: Traffic leaving the server (e.g., the server downloading an update).
   - **FORWARD Chain**: Traffic passing through the server (used if the server is acting as a router).
2. **The NAT Table**: Used to modify IP addresses (Network Address Translation), heavily used by Docker to map ports.

<Callout icon="info" title="Modern Abstractions (UFW / Firewalld)">
  Because the raw TICK1iptablesTICK1 syntax is notoriously difficult to memorize and prone to catastrophic mistakes (like instantly locking yourself out of SSH), modern distributions use frontend abstractions. Ubuntu uses **UFW** (Uncomplicated Firewall) and RHEL uses **firewalld**. These tools provide simple human syntax (e.g., TICK1ufw allow 80TICK1) and translate it into raw TICK1iptablesTICK1 rules in the background.
</Callout>

## The Shift to nftables
While TICK1iptablesTICK1 dominated for 20 years, it suffers from performance issues when handling massive lists of rules. The Linux kernel has officially deprecated it in favor of a newer, faster subsystem called **nftables**. However, TICK1iptablesTICK1 syntax is so ingrained in enterprise scripts that almost all modern systems provide an TICK1iptablesTICK1 translation layer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/journalctl/index.mdx': `---
title: journalctl
description: The incredibly powerful command-line tool used to query the centralized binary logs managed by systemd's journald.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="journalctl">

Historically, Linux services dumped their logs into plain text files scattered across TICK1/var/logTICK1. You had to use TICK1grepTICK1 and TICK1awkTICK1 to manually piece together what happened when a server crashed.

When TICK1systemdTICK1 took over Linux, it introduced **systemd-journald**, a background daemon that intercepts all logs from the Kernel, the Bootloader, and every single service, storing them in a centralized, highly indexed, **binary** format.

You cannot read binary logs with TICK1catTICK1. You must use the **TICK1journalctlTICK1** command.

## Querying the Journal

Because the logs are indexed, TICK1journalctlTICK1 allows you to perform hyper-specific database-like queries instantly:

- **View logs for a specific service**: 
  TICK1journalctl -u nginx.serviceTICK1
- **View logs since the last reboot**: 
  TICK1journalctl -bTICK1
- **View logs within a specific timeframe**: 
  TICK1journalctl --since "2024-10-18 08:00:00" --until "1 hour ago"TICK1
- **Follow logs in real-time (like tail -f)**: 
  TICK1journalctl -u sshd.service -fTICK1

<Callout icon="success" title="Structured Metadata">
  Because the journal intercepts the logs directly from the execution environment, it automatically attaches massive amounts of hidden metadata to every log line. You can query logs by the exact PID (TICK1_PID=1234TICK1), the exact user UID, or even the specific executable path, making debugging drastically easier than parsing plain text syslog files.
</Callout>

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
