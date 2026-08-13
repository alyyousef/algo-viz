import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/12. Linux & Shell Administration/Bash/index.mdx': `---
title: Bash
description: "The Bourne Again SHell, the default command-line interpreter for most Linux distributions and historically macOS."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Bash"
  icon="terminal"
>

**Bash (Bourne Again SHell)** is a Unix shell and command language written as a free software replacement for the original Bourne shell (TICK1shTICK1). For decades, it has been the absolute standard interface for interacting with Linux servers.

When you open a terminal on an Ubuntu server, the program waiting for you to type a command is Bash.

## Key Features

1. **Interactive Shell**: Bash interprets the commands you type (like TICK1lsTICK1, TICK1cdTICK1, TICK1pwdTICK1), parses the arguments, and executes the corresponding binary programs.
2. **Scripting Language**: Bash is a full Turing-complete programming language. You can write TICK1.shTICK1 files with TICK1ifTICK1 statements, TICK1forTICK1 loops, and variables to automate server administration tasks.
3. **Pipes and Redirection**: Bash perfectly implements the UNIX philosophy of connecting programs together. You can take the output of one command and "pipe" it (TICK1|TICK1) as the input to another command.

## Bash Scripts

A Bash script always starts with a "shebang" (TICK1#!/bin/bashTICK1) telling the OS which interpreter to use.

${TICK3}bash
#!/bin/bash
echo "Backing up database..."
tar -czvf db_backup_$(date +%F).tar.gz /var/lib/mysql
echo "Backup complete!"
${TICK3}

<Callout icon="warning" title="Bash Quirkiness">
Bash is famous for its archaic and unforgiving syntax. Missing a single space inside an TICK1if [ $var == "yes" ]TICK1 statement will cause a syntax error. For complex logic, many modern sysadmins prefer to write Python scripts rather than pure Bash.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/Shell/index.mdx': `---
title: Shell
description: "A computer program that exposes an operating system's services to a human user or other programs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Shell"
  icon="terminal"
>

In computing, a **Shell** is the outermost layer of an operating system. It is the interface that surrounds the OS Kernel (the core). The Kernel talks to the hardware, and the Shell talks to the Kernel on your behalf.

There are two main types of Shells:
1. **Graphical Shells (GUI)**: The Windows Desktop, the macOS Finder, and the GNOME desktop on Linux. You interact with them using a mouse.
2. **Command-Line Shells (CLI)**: Bash, Zsh, PowerShell, and Fish. You interact with them by typing text.

## The Shell vs. The Terminal Emulator

People often confuse these two terms:
- **The Shell (e.g., Bash)**: The actual program that understands the command TICK1ls -lTICK1 and asks the kernel to list files.
- **The Terminal Emulator (e.g., iTerm2, Windows Terminal)**: The graphical window that draws the text on your screen and sends your keystrokes to the Shell.

## Environment Variables

Shells maintain a state of variables that modify how programs behave. The most famous is the TICK1$PATHTICK1 variable. When you type TICK1nodeTICK1, the Shell looks through every directory listed in the TICK1$PATHTICK1 variable until it finds the TICK1nodeTICK1 binary executable.

<Callout icon="tip" title="POSIX Compliance">
POSIX (Portable Operating System Interface) is a standard to maintain compatibility between operating systems. A "POSIX-compliant shell" (like TICK1shTICK1 or Bash) guarantees that standard scripts will run the same way across any UNIX-like system.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/SSH/index.mdx': `---
title: SSH
description: "Secure Shell, a cryptographic network protocol for operating network services securely over an unsecured network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="SSH"
  icon="lock"
>

**SSH (Secure Shell)** is the standard protocol used by developers and sysadmins to log into remote servers securely. It replaces older, insecure protocols like Telnet (which sent passwords in plain text).

When you SSH into a server (e.g., TICK1ssh user@192.168.1.10TICK1), a secure, encrypted tunnel is established over Port 22. Any commands you type on your laptop are securely transmitted to the server and executed.

## Public Key Cryptography

While you *can* use a password with SSH, best practice mandates using **SSH Keys** (Public Key Cryptography).
1. You generate a key pair on your laptop (a private key and a public key).
2. You append your public key to the server's TICK1~/.ssh/authorized_keysTICK1 file.
3. When you connect, the server uses the public key to issue a cryptographic challenge that only your private key can solve. 
This makes brute-force password guessing impossible.

## More Than Just Terminals

SSH is incredibly versatile. It is the underlying transport mechanism for many other tools:
- **SCP / SFTP**: Securely copying files between computers.
- **Git**: When you TICK1git pushTICK1 to GitHub using the TICK1git@github.comTICK1 URL, you are pushing data over an SSH tunnel.
- **Port Forwarding (Tunneling)**: You can securely forward a local port on your laptop to a private database port inside a secure AWS VPC through an SSH "Jump host."

<Callout icon="warning" title="Keep Your Private Key Secret">
Your private key (usually TICK1~/.ssh/id_rsaTICK1 or TICK1~/.ssh/id_ed25519TICK1) is literally your digital identity. If a hacker steals this file, they have root access to every server you control. Never commit it to Git.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/curl/index.mdx': `---
title: curl
description: "A command-line tool and library for transferring data with URLs, supporting HTTP, HTTPS, FTP, and many other protocols."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="curl"
  icon="terminal"
>

**curl (Client URL)** is the Swiss Army knife of networking on the command line. Developed by Daniel Stenberg in 1997, it is installed on almost every computer, router, and IoT device on the planet.

Whenever you need to test an API, download a file, or inspect an HTTP header from the terminal, you use TICK1curlTICK1.

## Common Uses

**1. Making a simple GET request:**
${TICK3}bash
curl https://api.github.com/users/octocat
${TICK3}

**2. Sending JSON in a POST request:**
${TICK3}bash
curl -X POST https://api.example.com/login \\
     -H "Content-Type: application/json" \\
     -d '{"username":"admin", "password":"123"}'
${TICK3}

**3. Inspecting Headers:**
Using the TICK1-ITICK1 flag fetches only the HTTP headers, which is useful for debugging CORS issues or checking if a server is online without downloading the entire HTML body.
${TICK3}bash
curl -I https://google.com
${TICK3}

## libcurl
While TICK1curlTICK1 is the command-line tool, **libcurl** is the underlying C library. It is so rock-solid and feature-complete that thousands of other software applications (including PHP, video games, and cars) embed libcurl directly into their code to handle networking.

<Callout icon="tip" title="Piping to bash (The dangerous installation method)">
You will often see instructions like TICK1curl -sL https://example.com/install.sh | bashTICK1. This downloads a script and immediately executes it as root. While convenient, this is incredibly dangerous if you don't trust the source URL, as it gives the script full control of your machine.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/grep/index.mdx': `---
title: grep
description: "A command-line utility for searching plain-text data sets for lines that match a regular expression."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="grep"
  icon="search"
>

**grep (Global Regular Expression Print)** is one of the most powerful and frequently used tools in a sysadmin's arsenal. It is used to search through files (or the output of other commands) for specific text patterns.

## Basic Usage

Search for the word "ERROR" inside a log file:
${TICK3}bash
grep "ERROR" /var/log/syslog
${TICK3}

## The Power of Piping
TICK1grepTICK1 truly shines when combined with the pipe (TICK1|TICK1) operator. You can filter the output of *any* Linux command.

Find if the Nginx web server is currently running:
${TICK3}bash
ps aux | grep nginx
${TICK3}

Find all open ports, but only show port 80:
${TICK3}bash
netstat -tulpn | grep :80
${TICK3}

## Essential Flags
- TICK1-iTICK1 : Case-insensitive search (matches "Error", "ERROR", "error").
- TICK1-vTICK1 : **Invert match**. Show lines that *do not* contain the pattern (useful for filtering out noise).
- TICK1-rTICK1 : Recursive search. Look through all files in a directory and its subdirectories.
- TICK1-ETICK1 : Extended Regular Expressions. Allows complex regex searches like TICK1grep -E "(ERROR|WARNING)"TICK1.

<Callout icon="info" title="Modern Alternatives">
While TICK1grepTICK1 is installed everywhere, modern developers often use alternatives like **ripgrep (rg)** or **ack**, which are written in Rust/Perl and are significantly faster for searching massive codebases because they ignore TICK1.gitTICK1 folders and use multithreading.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/find/index.mdx': `---
title: find
description: "A command-line utility that searches one or more directory trees of a file system, locating files based on criteria."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="find"
  icon="search"
>

While TICK1grepTICK1 searches *inside* files, the **find** command searches for the *files themselves* within the directory structure.

It is incredibly flexible. You can search by file name, creation date, modification date, file size, or permissions.

## Common Examples

**1. Find by Name:**
Find all TICK1.configTICK1 files in the current directory and subdirectories.
${TICK3}bash
find . -name "*.config"
${TICK3}

**2. Find by Size:**
Find files larger than 100 Megabytes in the TICK1/var/logTICK1 directory.
${TICK3}bash
find /var/log -type f -size +100M
${TICK3}

**3. Find by Modification Time:**
Find files modified in the last 7 days.
${TICK3}bash
find /home/user -mtime -7
${TICK3}

## Executing Commands on Found Files
The true power of TICK1findTICK1 comes from the TICK1-execTICK1 flag. It allows you to run a command on every single file that matches your search criteria.

Find all files with a TICK1.tmpTICK1 extension and immediately delete them:
${TICK3}bash
find . -name "*.tmp" -exec rm {} \\;
${TICK3}
*(The TICK1{}TICK1 is a placeholder for the found file's name, and the TICK1\\;TICK1 terminates the exec command).*

<Callout icon="warning" title="Efficiency">
If you are searching a massive file system, TICK1findTICK1 can be slow because it actively crawls the disk. If you only need to search by filename, the TICK1locateTICK1 command is often faster because it queries a pre-built background database (though that database might be hours out of date).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/cron/index.mdx': `---
title: cron
description: "A time-based job scheduler in Unix-like operating systems used to set up commands or scripts to run periodically."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="cron"
  icon="clock"
>

**cron** is the standard Linux daemon (background process) responsible for scheduling tasks. If you need a script to run every night at 2:00 AM to back up a database, or every 5 minutes to check if a website is online, you use cron.

Users define their scheduled tasks in a file called a **crontab** (cron table).

## The Cron Expression Syntax

A cron expression consists of 5 asterisks followed by a command. The asterisks represent time units.

${TICK3}text
* * * * * command_to_execute
| | | | |
| | | | +---- Day of the week (0 - 7) (Sunday is 0 or 7)
| | | +------ Month (1 - 12)
| | +-------- Day of the month (1 - 31)
| +---------- Hour (0 - 23)
+------------ Minute (0 - 59)
${TICK3}

**Examples:**
- TICK10 2 * * * backup.shTICK1 : Run at 2:00 AM every day.
- TICK1*/5 * * * * check_health.shTICK1 : Run every 5 minutes.
- TICK10 0 1 * * generate_report.shTICK1 : Run at midnight on the first day of every month.

## Editing the Crontab
To edit your user's crontab, you run TICK1crontab -eTICK1. This opens the file in your default terminal editor (usually Nano or Vim).

<Callout icon="warning" title="The Path Problem">
The number one reason cron jobs fail is environment variables. When you run a script manually, you have your full Bash profile loaded (e.g., Node or Python paths). When cron runs the script in the background, it runs with a bare-minimum TICK1$PATHTICK1 environment. Always use absolute paths (e.g., TICK1/usr/bin/python3 /home/user/script.pyTICK1) inside cron jobs!
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/12. Linux & Shell Administration/systemd/index.mdx': `---
title: systemd
description: "A software suite that provides an array of system components for Linux operating systems, primarily serving as the init system to bootstrap user space and manage all processes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="systemd"
  icon="server"
>

**systemd** is the modern standard "init system" for Linux. It is the very first process (Process ID 1) that starts when the kernel finishes booting. Its job is to start all the other services (networking, SSH, databases, web servers) in the correct order.

It replaces older, slower init systems (like SysVinit) that started services sequentially using bash scripts. systemd uses socket activation and parallelization, allowing Linux servers to boot in seconds.

## Managing Services with systemctl

The primary tool for interacting with systemd is TICK1systemctlTICK1. If you deploy a Node.js API or an Nginx web server, you manage it via systemctl.

- TICK1sudo systemctl start nginxTICK1 : Start the server.
- TICK1sudo systemctl status nginxTICK1 : Check if it is running or crashed.
- TICK1sudo systemctl enable nginxTICK1 : Tell systemd to automatically start Nginx whenever the server reboots.

## Creating a systemd Service
To make your own application run as a background service, you create a TICK1.serviceTICK1 file (e.g., TICK1/etc/systemd/system/myapp.serviceTICK1).

${TICK3}ini
[Unit]
Description=My Node API

[Service]
ExecStart=/usr/bin/node /opt/myapp/server.js
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
${TICK3}
Because TICK1Restart=alwaysTICK1 is set, if your Node app crashes due to an exception, systemd will automatically restart it instantly.

<Callout icon="info" title="The systemd Controversy">
systemd is highly controversial among Linux purists. The UNIX philosophy states that programs should "do one thing and do it well." systemd ignores this entirely; it grew from an init system into a massive monolith that manages logging (journald), network configuration (networkd), time synchronization (timesyncd), and DNS. Despite the backlash, it has been adopted by almost every major distribution (Ubuntu, Debian, Fedora, Arch).
</Callout>

</ConceptTemplate>
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
