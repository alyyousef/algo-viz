import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/12. Linux & Shell Administration/systemd/index.mdx',
    content: `---
title: systemd
description: "A comprehensive system and service manager for Linux operating systems that handles boot processes, services, and system states."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="systemd">
      {children}
    </ConceptTemplate>
  )
}

**systemd** is the foundational init system and service manager for modern Linux distributions. Introduced to replace older systems like SysVinit and Upstart, systemd acts as PID 1 (the first process executed by the kernel upon booting) and manages the entirety of user space.

While controversial upon its release due to its monolithic nature and deviation from the Unix philosophy ("do one thing and do it well"), systemd is now the industry standard across almost all major enterprise Linux distributions (RHEL, Ubuntu, Debian).

## 1. Deep Dive & Mechanics

At its core, systemd is organized around **Units**. A unit is an object that systemd knows how to manage. The most common unit types are:
- **Service units (TICK1.serviceTICK1):** Defines how to manage a daemon or process.
- **Socket units (TICK1.socketTICK1):** Used for socket-based activation (starting a service only when an incoming connection hits a port).
- **Target units (TICK1.targetTICK1):** Used to group units and define system states (analogous to runlevels in SysVinit).
- **Timer units (TICK1.timerTICK1):** Replaces cron jobs by triggering units based on a schedule.

systemd heavily utilizes **cgroups** (Control Groups) to track processes. Unlike older init systems that lost track of child processes if a service double-forked, systemd assigns a unique cgroup to each service. If systemd is told to kill a service, it simply kills the entire cgroup, ensuring no orphaned processes are left running.

## 2. Mathematical / Theoretical Foundation

A major theoretical advantage of systemd is its resolution of the **Dependency Graph** through parallelization.

In SysVinit, services were started sequentially based on numbered scripts (e.g., TICK1S01networkTICK1, then TICK1S02sshTICK1). This $O(N)$ sequential startup wasted CPU cycles because the boot process blocked while waiting for I/O (like mounting a disk).

systemd parses all unit files, builds a Directed Acyclic Graph (DAG) of dependencies (using TICK1Requires=TICK1, TICK1Wants=TICK1, TICK1After=TICK1), and utilizes socket activation and D-Bus activation to start services in parallel. This mathematically minimizes the critical path of the boot process, resulting in drastically faster boot times.

## 3. Real-World Implementation

Here is an example of creating a custom systemd service file (e.g., TICK1/etc/systemd/system/myapp.serviceTICK1) to manage a Node.js web server.

TICK3ini
[Unit]
Description=My Custom Node.js Application
Documentation=https://example.com/docs
# Ensure the network is up before starting this service
After=network.target

[Service]
# Execute the process
ExecStart=/usr/bin/node /opt/myapp/server.js
# Automatically restart if it crashes
Restart=on-failure
RestartSec=5s
# Run as a specific, non-root user for security
User=appuser
Group=appgroup
# Ensure environment variables are loaded
EnvironmentFile=/opt/myapp/.env

[Install]
# This service should start during the normal multi-user boot state
WantedBy=multi-user.target
TICK3

To interact with this file:
TICK3bash
# Reload systemd to recognize the new file
sudo systemctl daemon-reload
# Start the service
sudo systemctl start myapp
# Enable the service to start automatically on boot
sudo systemctl enable myapp
# Check its logs
sudo journalctl -u myapp -f
TICK3

## 4. Visualizations

TICK3mermaid
architecture-beta
    group system(cloud)[systemd Architecture]

    service kernel(disk)[Linux Kernel] in system
    service pid1(server)[PID 1: systemd] in system
    service sshd(server)[sshd.service] in system
    service nginx(server)[nginx.service] in system
    service journal(database)[systemd-journald] in system

    kernel:T --> B:pid1
    pid1:T --> B:sshd
    pid1:T --> B:nginx
    sshd:R --> L:journal
    nginx:R --> L:journal
TICK3

## 5. Interview Prep

**Q: What is the difference between TICK1systemctl enableTICK1 and TICK1systemctl startTICK1?**
**A:** TICK1systemctl startTICK1 runs the service immediately for the current session, but if the server reboots, the service will not start automatically. TICK1systemctl enableTICK1 creates a symlink in the appropriate TICK1.targetTICK1 directory (usually TICK1/etc/systemd/system/multi-user.target.wants/TICK1), ensuring the service is automatically started on every boot.

**Q: How does systemd handle logging?**
**A:** systemd uses a component called TICK1journaldTICK1 to handle logging. It captures standard output, standard error, syslog, and kernel messages, storing them in an indexed, binary format. Administrators query these logs using the TICK1journalctlTICK1 command.

**Q: Explain socket activation in systemd.**
**A:** Socket activation allows systemd to listen on a specific port (like port 80) on behalf of a service. The actual service (like a web server) isn't started yet, saving RAM. When the first packet hits the port, systemd instantaneously starts the service and passes the socket file descriptor to it.

## 6. Production Use Cases

- **Process Management:** Ensuring critical applications (like databases or web servers) are automatically restarted if they crash, without relying on hacky bash wrapper scripts.
- **Security Sandboxing:** systemd allows administrators to lock down services without using complex SELinux rules. Using directives like TICK1PrivateTmp=yesTICK1 or TICK1ProtectSystem=strictTICK1, a service can be completely isolated from the rest of the filesystem.
- **Scheduled Tasks:** Using TICK1.timerTICK1 units instead of Cron. systemd timers are more accurate, support microsecond precision, and can easily run jobs relative to boot time, rather than just on wall-clock time.

<Callout icon="warning" title="The Systemd Monolith">
A common criticism of systemd is feature creep. It now manages DNS resolution (TICK1systemd-resolvedTICK1), time synchronization (TICK1systemd-timesyncdTICK1), network configurations (TICK1systemd-networkdTICK1), and user logins (TICK1systemd-logindTICK1). Critics argue this creates a single point of failure and violates the Unix philosophy.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/12. Linux & Shell Administration/tar/index.mdx',
    content: `---
title: tar
description: "Tape Archive: The standard Unix command-line utility for collecting multiple files and directories into a single archive file."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="tar">
      {children}
    </ConceptTemplate>
  )
}

**tar** (short for **Tape Archive**) is one of the oldest and most frequently used utilities in Unix-like operating systems. Originally developed in 1979 to write sequential data to magnetic tape drives, it is now universally used to bundle multiple files and directories into a single file—commonly known as a "tarball."

While TICK1tarTICK1 groups files together, it does **not** compress them by default. It relies on separate utilities like TICK1gzipTICK1 or TICK1bzip2TICK1 for compression, which is why you frequently see files ending in TICK1.tar.gzTICK1 or TICK1.tgzTICK1.

## 1. Deep Dive & Mechanics

When TICK1tarTICK1 creates an archive, it essentially concatenates the raw binary contents of the target files together, but it inserts **Header Blocks** before each file.

A standard POSIX tar header block is exactly 512 bytes long. It contains vital metadata about the file that follows:
- File name and path
- File size
- Ownership (UID, GID)
- Permissions (chmod values)
- Modification timestamp

Because of this structure, TICK1tarTICK1 preserves the exact filesystem state of the files. When the archive is extracted, the files are restored with their original permissions and ownership intact, making TICK1tarTICK1 the standard tool for system backups and source code distribution.

## 2. Mathematical / Theoretical Foundation

The time complexity of packing a tarball is $O(N)$, where $N$ is the total byte size of all files being archived, as it must perform sequential read/write operations.

However, because TICK1tarTICK1 is an unindexed sequential format (a legacy of tape drives), extracting a *single* file from a massive 50GB tarball has a time complexity of $O(N)$ in the worst case. The TICK1tarTICK1 utility must sequentially scan the 512-byte headers from the beginning of the file until it finds the requested file. Unlike zip files, there is no central directory at the end of the file pointing to byte offsets.

## 3. Real-World Implementation

The TICK1tarTICK1 command relies on a sequence of flags. The syntax is generally TICK1tar [options] [archive-file] [files-to-archive]TICK1.

**Common Flags:**
- TICK1-cTICK1: Create a new archive.
- TICK1-xTICK1: Extract an archive.
- TICK1-tTICK1: List the contents of an archive without extracting it.
- TICK1-vTICK1: Verbose output (show what files are being processed).
- TICK1-fTICK1: File flag (specify the name of the archive). This must usually be the *last* flag.
- TICK1-zTICK1: Compress the archive using TICK1gzipTICK1 (TICK1.tar.gzTICK1).
- TICK1-jTICK1: Compress the archive using TICK1bzip2TICK1 (TICK1.tar.bz2TICK1).

**Example: Creating a compressed backup**
TICK3bash
# Create a gzip-compressed archive named 'backup.tar.gz' containing the /etc and /var/log directories
tar -czvf backup.tar.gz /etc /var/log
TICK3

**Example: Extracting an archive**
TICK3bash
# Extract the contents into the current directory
tar -xzvf backup.tar.gz

# Extract into a specific target directory using -C
tar -xzvf backup.tar.gz -C /tmp/restore_folder/
TICK3

## 4. Visualizations

TICK3mermaid
architecture-beta
    group tar(disk)[Tarball File Structure]

    service h1(server)[512b Header: file1.txt] in tar
    service d1(document)[Raw Data: file1.txt] in tar
    service h2(server)[512b Header: script.sh] in tar
    service d2(document)[Raw Data: script.sh] in tar

    h1:R --> L:d1
    d1:R --> L:h2
    h2:R --> L:d2
TICK3

## 5. Interview Prep

**Q: What is the difference between TICK1tarTICK1 and TICK1zipTICK1?**
**A:** TICK1tarTICK1 is an archiver; it groups files but doesn't compress them. Compression (TICK1gzipTICK1) is applied to the entire resulting tarball. TICK1zipTICK1 is both an archiver and a compressor; it compresses each file individually and then groups them. Because TICK1tar.gzTICK1 compresses the whole archive as a single stream (solid compression), it generally achieves better compression ratios than TICK1zipTICK1, but TICK1zipTICK1 allows for faster extraction of single files via its central index.

**Q: How do you view the contents of a tarball without extracting it?**
**A:** You use the TICK1-tTICK1 (list) flag. For example: TICK1tar -tvf archive.tarTICK1. If it is gzipped, you use TICK1tar -tzvf archive.tar.gzTICK1.

**Q: Why does the TICK1-fTICK1 flag usually have to be at the end of the short flags?**
**A:** The TICK1-fTICK1 flag strictly expects the very next argument to be the filename of the archive. If you write TICK1tar -cvfz archive.tar /homeTICK1, the command will literally create a file named TICK1zTICK1, completely breaking the expected behavior. It should always be TICK1tar -cvfz archive.tarTICK1 or TICK1tar -zcvf archive.tarTICK1.

## 6. Production Use Cases

- **Software Distribution:** Almost all open-source source code and Linux binaries are distributed as TICK1.tar.gzTICK1 or TICK1.tar.xzTICK1 files because they preserve executable permissions (e.g., TICK1chmod +xTICK1 on a bash script).
- **Docker Image Layers:** When Docker pushes or pulls image layers to a registry, those layers are actually packaged and transported as tarballs.
- **System Backups:** Server administrators use cron jobs and TICK1tarTICK1 to snapshot massive databases or user directories, piping the output directly into TICK1gpgTICK1 for encryption before sending it to Amazon S3.

<Callout icon="info" title="The Tar Bomb">
A "tar bomb" is a poorly created tarball that contains thousands of files at its root level, rather than encapsulating them inside a single top-level directory. If a user extracts it in their busy home directory (TICK1tar -xvf bomb.tarTICK1), thousands of files will vomit into their working directory, creating a massive mess. Always run TICK1tar -tvfTICK1 to inspect the archive first!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/12. Linux & Shell Administration/top/index.mdx',
    content: `---
title: top
description: "An interactive, real-time command-line utility for monitoring system processes, CPU utilization, and memory usage."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="top">
      {children}
    </ConceptTemplate>
  )
}

The **top** (Table of Processes) command is a classic Unix utility that provides a dynamic, real-time, refreshing view of the running system. It is the command-line equivalent of the Windows Task Manager or macOS Activity Monitor.

When a Linux server is sluggish or unresponsive, TICK1topTICK1 is almost always the very first command a sysadmin runs to identify rogue processes that are consuming CPU cycles or causing memory exhaustion.

## 1. Deep Dive & Mechanics

Unlike static commands like TICK1psTICK1 that simply read the system state once and exit, TICK1topTICK1 runs in an infinite loop (typically refreshing every 3 seconds). 

Under the hood, TICK1topTICK1 rapidly reads from the **procfs virtual filesystem** (specifically the TICK1/procTICK1 directory). In Linux, TICK1/procTICK1 is not a real directory on the hard drive; it is an interface into kernel memory. TICK1topTICK1 reads TICK1/proc/statTICK1 for global CPU statistics, TICK1/proc/meminfoTICK1 for RAM usage, and iterates through TICK1/proc/[PID]/statTICK1 to gather data on individual running processes. It then formats and sorts this data on the terminal using terminal escape sequences (ncurses).

## 2. Mathematical / Theoretical Foundation

Monitoring systems mathematically rely on **Sampling Rates**. TICK1topTICK1 does not capture every single microsecond of CPU activity; it samples the CPU ticks between its refresh intervals. 

If a process spikes to 100% CPU usage for 50 milliseconds and then sleeps, TICK1topTICK1 might miss it entirely due to the sampling interval (Nyquist-Shannon sampling theorem applies here—you cannot observe frequencies higher than half your sampling rate). For micro-burst analysis, tools like TICK1perfTICK1 or eBPF are required instead of TICK1topTICK1.

## 3. Real-World Implementation

To launch the utility, simply type:
TICK3bash
top
TICK3

The output is divided into two sections: the **Header** (global system stats) and the **Process List**.

**The Header explains:**
- **Uptime & Load Average:** TICK1load average: 0.15, 0.05, 0.01TICK1 (1-min, 5-min, and 15-min averages. A load of 1.0 means one CPU core is fully saturated).
- **Tasks:** Total processes, running, sleeping, stopped, zombie.
- **CPU States:** 
  - TICK1usTICK1: User space time.
  - TICK1syTICK1: System (Kernel) space time.
  - TICK1waTICK1: I/O Wait (Crucial metric: if this is high, your hard drive or network is bottlenecking the CPU).
  - TICK1idTICK1: Idle time.
- **Memory/Swap:** Total RAM, free, used, and buffer/cache.

**Interactive Commands (while TICK1topTICK1 is running):**
- TICK1PTICK1: Sort by CPU usage (default).
- TICK1MTICK1: Sort by Memory usage.
- TICK1kTICK1: Kill a process (prompts for the PID and the signal, default SIGTERM 15).
- TICK1rTICK1: Renice a process (change its scheduling priority).
- TICK11TICK1: Toggle viewing individual CPU cores vs total aggregate CPU.
- TICK1qTICK1: Quit the program.

## 4. Visualizations

TICK3mermaid
architecture-beta
    group linux(cloud)[Linux Operating System]

    service kernel(disk)[Kernel Space] in linux
    service proc(database)[/proc Virtual FS] in linux
    service top(server)[top Utility (User Space)] in linux
    service term(document)[Terminal Display] in linux

    kernel:R --> L:proc
    proc:R --> L:top
    top:R --> L:term
TICK3

## 5. Interview Prep

**Q: What does a high "I/O Wait" (TICK1waTICK1) percentage in TICK1topTICK1 indicate?**
**A:** It indicates that the CPU is sitting idle while waiting for input/output operations to complete. This usually means the system is severely bottlenecked by slow storage (like a struggling HDD or a maxed-out EBS volume on AWS), preventing the CPU from executing instructions.

**Q: In the memory section, what is the difference between "used" memory and "buff/cache"?**
**A:** "Used" memory is RAM actively allocated to applications. "Buff/cache" is RAM the Linux kernel is using to cache disk data for faster future reads. This is a good thing; Linux tries to use all available RAM for caching. If an application suddenly needs more RAM, the kernel will instantly free the cache to give it to the application.

**Q: What is a Zombie process, and how does TICK1topTICK1 show it?**
**A:** A zombie process (shown as TICK1ZTICK1 in the status column) is a process that has finished executing, but its parent process hasn't read its exit status yet (via the TICK1wait()TICK1 system call). It consumes no CPU or memory, but it holds a slot in the PID table. You cannot TICK1kill -9TICK1 a zombie; you must kill its parent to clear it.

## 6. Production Use Cases

- **Incident Response:** During an outage, running TICK1topTICK1 immediately reveals if a Java application has a memory leak (high %MEM) or if an infinite loop is locking a core (100% %CPU).
- **Performance Tuning:** Using the TICK1rTICK1 (renice) command directly within TICK1topTICK1 to lower the priority of a heavy backup script, ensuring the web server processes get CPU priority.

<Callout icon="info" title="Htop: The Modern Alternative">
While TICK1topTICK1 is installed universally, most developers install and use **htop**. TICK1htopTICK1 is a vastly improved, colorful, scrollable version of TICK1topTICK1 that visualizes CPU cores with bar graphs and allows tree-views of parent/child processes.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/12. Linux & Shell Administration/ufw/index.mdx',
    content: `---
title: ufw
description: "Uncomplicated Firewall: A frontend configuration tool for iptables designed to make managing a Linux firewall intuitive and easy."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="ufw">
      {children}
    </ConceptTemplate>
  )
}

**UFW** (Uncomplicated Firewall) is the default firewall configuration tool for Ubuntu and is widely used across Debian-based distributions. 

The traditional Linux firewall tool, TICK1iptablesTICK1 (and its modern replacement TICK1nftablesTICK1), is incredibly powerful but has a notoriously complex and unforgiving syntax. UFW was created to provide a user-friendly, human-readable command-line interface for managing firewall rules, abstracting away the complex netfilter chains underneath.

## 1. Deep Dive & Mechanics

UFW is not a firewall itself; it is a **frontend wrapper**. 

When you issue a command like TICK1ufw allow 80TICK1, UFW parses this and dynamically generates the exact TICK1iptablesTICK1 or TICK1nftablesTICK1 rules required to modify the Linux kernel's **netfilter** framework. Netfilter is the actual packet filtering subsystem built directly into the Linux kernel.

By default, UFW operates on a **Default Deny (Incoming) / Default Allow (Outgoing)** policy. This is the industry standard for server security: no external traffic is allowed to connect to the server unless explicitly allowed, but the server itself can reach out to the internet to download updates or ping other servers.

## 2. Mathematical / Theoretical Foundation

Firewalls operate based on **Stateful Packet Inspection (SPI)** and **Boolean Logic**. 

When a network packet arrives at the network interface card (NIC), the kernel evaluates it against a sequential list of boolean rules (the Rule Chain) in $O(N)$ time. If the packet matches a rule (e.g., TICK1Destination Port == 22 && Protocol == TCPTICK1), the rule's target action (TICK1ACCEPTTICK1, TICK1DROPTICK1, TICK1REJECTTICK1) is executed instantly.

Because UFW configures a stateful firewall, it tracks connections. If an internal server initiates a request to Google over port 443, the firewall records this state. When Google's response packets arrive, the firewall mathematically correlates them to the existing state table and allows them through, even if inbound port 443 is blocked.

## 3. Real-World Implementation

UFW commands are highly semantic and read almost like plain English.

**Basic Setup & Enabling:**
TICK3bash
# 1. ALWAYS allow SSH before enabling the firewall, or you will lock yourself out!
sudo ufw allow ssh 
# (Alternatively: sudo ufw allow 22/tcp)

# 2. Enable the firewall
sudo ufw enable

# 3. Check the current status and numbered rules
sudo ufw status numbered
TICK3

**Common Rule Configurations:**
TICK3bash
# Allow web traffic (HTTP and HTTPS)
sudo ufw allow http
sudo ufw allow https

# Allow a specific port and protocol
sudo ufw allow 5432/tcp

# Allow traffic only from a specific trusted IP address (e.g., a corporate VPN)
sudo ufw allow from 192.168.1.100

# Allow traffic from a specific IP to a specific port (e.g., MySQL)
sudo ufw allow from 10.0.0.5 to any port 3306

# Delete a rule using its number from 'ufw status numbered'
sudo ufw delete 3
TICK3

## 4. Visualizations

TICK3mermaid
architecture-beta
    group host(cloud)[Linux Server]

    service internet(server)[Internet]
    service kernel(disk)[Kernel Netfilter] in host
    service ssh(document)[Port 22: SSH] in host
    service web(document)[Port 80: HTTP] in host
    service db(document)[Port 3306: MySQL] in host

    internet:R --> L:kernel
    kernel:T --> B:ssh
    kernel:T --> B:web
    kernel:B --> T:db
TICK3
*(UFW configures Netfilter. Incoming packets to Port 22 and 80 are ACCEPTED, but packets to Port 3306 are DROPPED unless the origin IP matches a specific allow rule).*

## 5. Interview Prep

**Q: What is the difference between a firewall DROP and REJECT action?**
**A:** If a firewall is set to DROP, it simply deletes the incoming packet silently. The sender receives no response and their connection times out. If set to REJECT, the firewall actively sends back an ICMP error packet (like "Destination Port Unreachable") to the sender. DROP is generally preferred for internet-facing servers because it provides no information to port scanners and slows them down.

**Q: If you run TICK1ufw resetTICK1, what happens?**
**A:** It completely disables UFW and deletes all active rules, reverting the firewall to its factory default state. This will cut off all custom inbound access, potentially breaking production services.

**Q: Can UFW do rate limiting to prevent brute-force attacks?**
**A:** Yes. You can use the command TICK1ufw limit sshTICK1. This uses iptables' recent module to limit connection attempts. By default, UFW will block the IP if it attempts 6 or more connections within 30 seconds.

## 6. Production Use Cases

- **Securing VPS Deployments:** The absolute first step upon spinning up a DigitalOcean Droplet or AWS EC2 instance is configuring UFW to lock down all ports except 22, 80, and 443.
- **Database Isolation:** Using UFW on a database server to completely block the internet and only allow incoming traffic from the internal private IP addresses of the application servers.

<Callout icon="danger" title="The SSH Lockout Risk">
The most common mistake junior sysadmins make is typing TICK1sudo ufw enableTICK1 over an SSH connection *before* explicitly allowing port 22. The moment they hit enter, the default deny policy kicks in, the SSH pipe drops, and they are permanently locked out of their server!
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/12. Linux & Shell Administration/umask/index.mdx',
    content: `---
title: umask
description: "User file-creation mode mask: A Unix mechanism that determines the default file permissions for newly created files and directories."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="umask">
      {children}
    </ConceptTemplate>
  )
}

In Unix-like systems, when a process creates a new file or directory, the system needs to know what permissions to assign to it. **umask** (user mask) is the command and environmental setting that controls these default permissions.

Unlike TICK1chmodTICK1, which explicitly *adds* or *sets* permissions on existing files, TICK1umaskTICK1 acts as a **filter that subtracts permissions** at the exact moment a file is born. It is a critical component of system security, preventing files from being created with overly permissive access rights.

## 1. Deep Dive & Mechanics

When a program (like TICK1touchTICK1, TICK1mkdirTICK1, or a text editor) creates a file, it requests a base permission level from the kernel. 
- By default, Linux assigns a base permission of **666 (rw-rw-rw-)** for files.
- By default, Linux assigns a base permission of **777 (rwxrwxrwx)** for directories.

The kernel then applies the current shell's TICK1umaskTICK1 value to these base permissions to calculate the final permissions. The umask is typically defined in octal format, such as TICK1022TICK1 or TICK1027TICK1.

The calculation is a bitwise operation. Conceptually, you can think of it as subtraction: 
**Final Permission = Base Permission - umask**

## 2. Mathematical / Theoretical Foundation

Mathematically, umask is applied via a bitwise AND operation with the bitwise NOT of the mask: 
$Final = Base \\ \\& \\ (\\sim umask)$

Let's look at the standard umask of **022**:
- Base directory permission: **777** (rwxrwxrwx)
- Umask: **022** (----w--w-)
- Calculation: $777 - 022 = 755$ (rwxr-xr-x)
- *Result: The owner has full access, but group and others can only read and execute, not write.*

Let's apply the same umask to a file:
- Base file permission: **666** (rw-rw-rw-)
- Umask: **022** (----w--w-)
- Calculation: $666 - 022 = 644$ (rw-r--r--)
- *Result: The owner can read/write, but group and others can only read.*

## 3. Real-World Implementation

You can check your current umask by simply typing the command in the terminal:
TICK3bash
$ umask
0022
TICK3

To change the umask for the current session, provide the new octal value:
TICK3bash
# Set a very strict umask where only the owner has any access
$ umask 077

# Create a file and check its permissions
$ touch top_secret.txt
$ ls -l top_secret.txt
-rw------- 1 user user 0 Oct 15 10:00 top_secret.txt
TICK3

Because running TICK1umaskTICK1 only affects the current shell session, system administrators make it permanent by adding it to the user's profile scripts:
TICK3bash
# Append to ~/.bashrc for a specific user
echo "umask 027" >> ~/.bashrc

# Or configure it system-wide in /etc/profile or /etc/login.defs
TICK3

## 4. Visualizations

TICK3mermaid
flowchart TD
    A[Process Creates File] -->|Requests Base 666| B(Kernel evaluates request)
    C[Current User Umask: 022] -->|Filter Applied| B
    B -->|666 AND NOT 022| D[Final File Created]
    D --> E[Permissions: 644 rw-r--r--]
TICK3

## 5. Interview Prep

**Q: Why do new files default to a base of 666 instead of 777?**
**A:** Linux places a high priority on security. Files are never created with execution privileges (the 'x' bit, represented by 1) by default, regardless of the umask. If you want a script to be executable, you must explicitly run TICK1chmod +xTICK1 on it after creation. Only directories receive the execute bit by default (777), because the execute bit on a directory is required to allow a user to TICK1cdTICK1 into it.

**Q: If the base file permission is 666, and I set the umask to 033, what is the final file permission?**
**A:** This is a trick question meant to test if you understand the bitwise logic vs simple subtraction. 
Base 666 is TICK1rw-rw-rw-TICK1.
Umask 033 is TICK1----wx-wxTICK1.
Because files don't have execute permissions to begin with, subtracting the execute bit does nothing. The write bit (2) is subtracted. The final permission is TICK1rw-r--r--TICK1 (644), exactly the same as if the umask was 022.

**Q: Where is the global default umask set in a modern Linux system?**
**A:** It is typically defined in TICK1/etc/login.defsTICK1 for new users, or handled by PAM (Pluggable Authentication Modules) via TICK1pam_umask.soTICK1 which reads from TICK1/etc/profileTICK1.

## 6. Production Use Cases

- **Shared Servers:** On corporate servers where multiple users share a machine, setting the umask to TICK1027TICK1 ensures that newly created files can be read by the user's group, but are completely hidden (no read, write, or execute) from other unrelated users on the system.
- **Security Compliance:** Security frameworks like CIS (Center for Internet Security) or PCI-DSS mandate strict default umask settings (typically TICK1027TICK1 or TICK1077TICK1) across all servers to ensure accidental data exposure does not occur when developers create log files or database dumps.

<Callout icon="shield" title="The Principle of Least Privilege">
Umask is a perfect example of the Principle of Least Privilege. By defaulting to a restrictive mask, the system ensures that users must consciously and explicitly grant access to their data via TICK1chmodTICK1, rather than relying on them to secure it after the fact.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '\`\`\`')
      .replace(/TICK1/g, '\`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
