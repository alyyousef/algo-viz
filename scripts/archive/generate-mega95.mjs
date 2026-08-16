import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/Bash/index.mdx': `---
title: Bash (Bourne Again SHell)
description: A Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Bash"
  subtitle="The undisputed king of the Linux Terminal"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/512px-Bash_Logo_Colored.svg.png"
  description="Bash is the default command-line interface and scripting language for almost every Linux distribution on Earth. If you are interacting with a remote server, you are almost certainly speaking Bash."
  yearCreated={1989}
  creator="Brian Fox (GNU Project)"
  isOpenSource={true}
  websiteUrl="https://www.gnu.org/software/bash/"
>

A shell is a program that takes commands from the keyboard and mathematically passes them to the operating system's kernel to execute. 

Bash is not just an interactive prompt; it is a **Turing-complete programming language**. You can write massive \`.sh\` scripts with \`if\` statements, \`for\` loops, and variables to mathematically automate the deployment of an entire server infrastructure.

<Callout icon="warning" title="The Pipes Architecture">
  The core mathematical philosophy of Bash (and Unix) is **Pipes (\`|\`)**.
  
  Unix tools are designed to do exactly one thing perfectly. A Pipe takes the standard output (\`stdout\`) of Program A and mathematically injects it as the standard input (\`stdin\`) of Program B. 
  
  Example: \`ls -l | grep "txt" | wc -l\`. This mathematically lists files, filters only the text files, and counts how many there are, chaining three completely isolated C programs together instantly.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/Zsh/index.mdx': `---
title: Zsh (Z shell)
description: A Unix shell that can be used as an interactive login shell and as a command interpreter for shell scripting. Zsh is an extended Bourne shell with many improvements.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Zsh"
  subtitle="The modern, hyper-extensible shell"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Zsh.svg/512px-Zsh.svg.png"
  description="Zsh is a massive expansion of Bash. While Bash is focused on raw server compatibility, Zsh is focused entirely on Developer Experience (DX), offering unparalleled auto-completion and theming."
  yearCreated={1990}
  creator="Paul Falstad"
  isOpenSource={true}
  websiteUrl="https://www.zsh.org/"
>

In 2019, Apple mathematically abandoned Bash and made **Zsh** the default shell for macOS. 

<Callout icon="success" title="Oh My Zsh">
  Zsh's absolute dominance among frontend and full-stack developers is entirely due to the **Oh My Zsh** framework. 
  
  It allows developers to mathematically inject massive community-driven plugins into their terminal. Instead of typing \`git checkout -b\`, developers use the \`gcb\` alias. It also provides visual themes (like *Spaceship* or *Powerlevel10k*) that parse the current directory and instantly render Git branch status, Node.js versions, and AWS profiles directly into the terminal prompt.
</Callout>

## Path Expansion and Globbing

Zsh's native mathematical parsing is vastly superior to Bash. 
If you type \`cd /u/lo/b\`, Zsh will automatically expand it to \`cd /usr/local/bin\`. Its recursive globbing allows you to type \`ls **/*.js\` to instantly find every JavaScript file in every nested subdirectory without ever needing to use the complex \`find\` command.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/PowerShell/index.mdx': `---
title: PowerShell
description: A task automation and configuration management program from Microsoft, consisting of a command-line shell and the associated scripting language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="PowerShell"
  subtitle="The Object-Oriented Shell"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/PowerShell_5.0_icon.png/512px-PowerShell_5.0_icon.png"
  description="PowerShell is Microsoft's answer to Bash. However, instead of passing raw, unstructured text strings between commands, PowerShell mathematically passes structured .NET Objects."
  yearCreated={2006}
  creator="Microsoft"
  isOpenSource={true}
  websiteUrl="https://github.com/PowerShell/PowerShell"
>

In Linux/Bash, if you run a command to list processes, the output is a literal wall of text. If you want to kill a process that is using 5GB of RAM, you must use complex RegEx (\`awk\`/\`sed\`) to mathematically parse the text string, extract the PID column, and pass it to the \`kill\` command. This is incredibly brittle.

<Callout icon="tip" title="The .NET Pipeline">
  In PowerShell, everything is a **.NET Object**. 
  
  If you run \`Get-Process\`, it does not output text. It outputs an array of \`System.Diagnostics.Process\` objects. You can mathematically pipe this directly into a filter: \`Get-Process | Where-Object WorkingSet -gt 5GB | Stop-Process\`. 
  
  Because you are querying strongly-typed Object properties instead of parsing raw text, PowerShell scripts are mathematically bulletproof.
</Callout>

## Cross-Platform Expansion

Historically, PowerShell was locked into Windows. Microsoft mathematically rewrote it in .NET Core (PowerShell Core 6.0+) and open-sourced it. Today, PowerShell runs natively on macOS and Linux, allowing DevOps engineers to write a single object-oriented script that manages an entire multi-OS cloud infrastructure.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/tmux/index.mdx': `---
title: tmux
description: A terminal multiplexer for Unix-like operating systems. It allows multiple terminal sessions to be accessed simultaneously in a single window.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="tmux (Terminal Multiplexer)">

If you SSH into a remote Linux server and start a massive 10-hour database migration, what happens if your laptop's WiFi drops for 1 second? 
The SSH connection breaks, the Bash session is mathematically terminated by the Linux kernel, and your 10-hour migration instantly dies.

This is solved by **tmux**.

<Callout icon="success" title="The Detachable Session">
  When you run \`tmux\`, it mathematically creates a virtual terminal session running in the background of the server. 
  
  If your WiFi drops, the SSH connection dies, but the \`tmux\` session continues running safely on the server. When you reconnect, you simply type \`tmux attach\`, and you are mathematically dropped right back into the exact same screen, with your migration still running perfectly.
</Callout>

## Window Splitting (Panes)

Beyond safety, tmux is a window manager for the terminal. It allows you to mathematically split a single black terminal screen into 4 distinct physical panes (e.g., one pane running the Node.js server, one running a Docker log tail, one running \`htop\`, and one running Vim). You navigate between them entirely using the keyboard (Prefix: \`Ctrl+B\`).

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/screen/index.mdx': `---
title: GNU Screen
description: A terminal multiplexer, a software application that can be used to multiplex several virtual consoles, allowing a user to access multiple separate login sessions inside a single terminal window.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GNU Screen">

Before \`tmux\` existed, there was **GNU Screen**. 

Released in 1987, it was the original mathematical architecture that allowed Unix users to detach and reattach terminal sessions to prevent catastrophic data loss during dial-up modem disconnections.

<Callout icon="warning" title="Screen vs Tmux">
  Today, \`tmux\` has mathematically defeated \`screen\` in almost every metric. Tmux has a cleaner codebase, uses a client-server architecture, and has vastly superior window-splitting capabilities. 
  
  However, \`screen\` is still biologically burned into the muscle memory of veteran System Administrators. Its primary advantage today is that it is often pre-installed on legacy, air-gapped mainframes where you cannot \`apt install tmux\`.
</Callout>

## Serial Port Communication

One highly specific mathematical use-case where \`screen\` still dominates is interfacing with raw hardware. 
If an embedded engineer plugs a Raspberry Pi or a Cisco Router into their laptop via a USB-to-Serial cable, they can use \`screen /dev/tty.usbserial 115200\` to open a direct, low-level hardware communication pipe.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/awk/index.mdx': `---
title: AWK
description: A domain-specific language designed for text processing and typically used as a data extraction and reporting tool.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWK">

**AWK** (named after its creators Aho, Weinberger, and Kernighan) is not a simple command. It is a massive, Turing-complete mathematical programming language built directly into the Unix terminal.

It is specifically engineered to process columnar text data (like CSV files or server logs).

<Callout icon="info" title="The Architecture of AWK">
  If you have a 10-Gigabyte Nginx access log, and you want to extract only the IP Addresses (Column 1) of users who hit a 404 error (Column 9), writing a Python script will be slow.
  
  In AWK, it is a single mathematical line:
  \`awk '$9 == "404" { print $1 }' access.log\`
  
  AWK automatically streams the file line by line, splits every line by whitespace into variables (\`$1\`, \`$2\`, etc.), mathematically evaluates the \`if\` condition, and prints the result in milliseconds.
</Callout>

## The Begin and End Blocks

AWK allows you to execute mathematical logic before and after the file is parsed. 
If you want to sum up the total bytes transferred in a massive log file (Column 10):
\`awk 'BEGIN { sum=0 } { sum += $10 } END { print "Total Bytes:", sum }' access.log\`
It is an absolute powerhouse of data engineering.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/sed/index.mdx': `---
title: sed (Stream Editor)
description: A Unix utility that parses and transforms text, using a simple, compact programming language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="sed (Stream Editor)">

**sed** is a brutal, mathematical text-transformation engine. 

While a normal text editor requires you to open a file, press \`Ctrl+F\`, type a word, and click "Replace", \`sed\` performs this action purely via the terminal pipeline, allowing you to mathematically mutate text on the fly.

<Callout icon="tip" title="The Substitution Command">
  The most common mathematical use of \`sed\` is the **Substitution (\`s\`)** command.
  
  \`echo "Hello World" | sed 's/World/Universe/'\`
  Output: \`Hello Universe\`
  
  The syntax is strictly \`s/FIND/REPLACE/FLAGS\`. 
  If you add the \`g\` (global) flag, it mathematically replaces every instance on the line, not just the first one.
</Callout>

## In-Place Editing

If you have a massive JSON config file and need to change the database port from \`5432\` to \`3306\` during an automated Docker deployment, you cannot open VS Code. 

You execute an **In-Place (\`-i\`)** substitution:
\`sed -i 's/5432/3306/g' config.json\`
The file is mathematically mutated on the hard drive instantly.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/grep/index.mdx': `---
title: grep
description: A command-line utility for searching plain-text data sets for lines that match a regular expression.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="grep (Global Regular Expression Print)">

**grep** is the absolute foundation of Linux text searching. Its only job is to mathematically scan a file (or a data stream) and print every line that matches a specific pattern.

<Callout icon="success" title="Regular Expressions (Regex)">
  While you can search for exact words (\`grep "error" log.txt\`), grep's true mathematical power lies in its native support for **Regular Expressions**.
  
  \`grep -E "^[0-9]{3}-[0-9]{4}$" data.txt\`
  This command mathematically scans a 5-million-line file and instantly extracts every single line that perfectly matches the structure of a phone number.
</Callout>

## Modern Replacements: ripgrep (rg)

While \`grep\` is installed everywhere, it was written in the 1970s and is strictly single-threaded. 

The modern software industry has largely adopted **ripgrep (\`rg\`)**. Written in Rust, \`ripgrep\` mathematically splits the search query across every CPU core simultaneously and automatically ignores files specified in your \`.gitignore\`. It is often 10x to 50x faster than GNU grep when searching massive, multi-gigabyte codebases.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/find/index.mdx': `---
title: find
description: A command-line utility that searches one or more directory trees of a file system, locates files based on some user-specified criteria, and applies a user-specified action on each matched file.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="find">

In Windows, if you want to find a file, you type its name in the search bar. 

In Linux, **\`find\`** is a massive, mathematically rigid querying engine that can search for files based on physical hardware properties, not just names.

<Callout icon="warning" title="Querying by Metadata">
  \`find\` interacts directly with the Linux filesystem inodes. You can execute brutal mathematical queries:
  - Find all files modified in the exact last 7 days: \`find . -mtime -7\`
  - Find all files larger than 1 Gigabyte: \`find . -size +1G\`
  - Find all files owned by the user 'root': \`find . -user root\`
</Callout>

## The \`-exec\` Flag

The most dangerous and powerful feature of \`find\` is the **\`-exec\`** flag. It mathematically takes every file it finds and executes an arbitrary bash command on it.

\`find . -name "*.log" -mtime +30 -exec rm {} \\;\`
This command mathematically finds every log file older than 30 days and instantly permanently deletes them. It is the foundation of automated server cleanup scripts.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/xargs/index.mdx': `---
title: xargs
description: A command on Unix and most Unix-like operating systems used to build and execute command lines from standard input.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="xargs">

**xargs** is the mathematical bridge of the Linux Terminal. 

Most commands (like \`grep\` or \`sed\`) happily accept piped input (\`|\`). However, some commands (like \`rm\` or \`mkdir\`) absolutely refuse to read from a pipe. They only accept command-line arguments.

If you run: \`find . -name "*.tmp" | rm\`, it mathematically fails. \`rm\` ignores the pipe.

<Callout icon="tip" title="Bridging the Pipe">
  To fix this, you inject **xargs**. 
  
  \`find . -name "*.tmp" | xargs rm\`
  
  \`xargs\` mathematically intercepts the stream of text from the pipe, splits it into individual arguments, and physically reconstructs the command as \`rm file1.tmp file2.tmp file3.tmp\` before executing it.
</Callout>

## Parallel Execution

Modern DevOps engineers use \`xargs\` for its **Parallel (\`-P\`)** flag. 
If you have 100 high-resolution images to compress using \`ffmpeg\`, doing it sequentially takes an hour. 
\`cat images.txt | xargs -P 8 -I {} ffmpeg -i {} output.mp4\`
This mathematically forces \`xargs\` to spawn 8 parallel CPU threads, processing 8 images simultaneously, completely saturating the hardware and dropping processing time to 5 minutes.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/jq/index.mdx': `---
title: jq
description: A lightweight and flexible command-line JSON processor.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="jq">

\`grep\`, \`awk\`, and \`sed\` were invented in the 1970s to parse flat, line-based text. 
Modern APIs do not return flat text. They return massively nested **JSON** objects. Using \`awk\` to parse a 10-level deep JSON object is a mathematical nightmare.

**\`jq\`** is the modern solution. It is \`sed\` specifically engineered for JSON.

<Callout icon="success" title="The Object Query Architecture">
  If an API returns: \`{ "users": [ { "name": "Alice" }, { "name": "Bob" } ] }\`
  
  You can pipe it into \`jq\`:
  \`curl https://api.example.com/data | jq '.users[].name'\`
  
  \`jq\` mathematically parses the raw string into an actual JSON AST (Abstract Syntax Tree), navigates directly into the \`users\` array, and extracts the \`name\` keys, outputting pure, clean text:
  \`"Alice"\`
  \`"Bob"\`
</Callout>

## JSON Mutation

\`jq\` is not just a reader. You can mathematically mutate JSON on the fly. You can add new keys, map over arrays, or delete passwords from a JSON stream before saving it to a log file. It is the absolute standard tool for any DevOps engineer working with REST APIs or Kubernetes config maps.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/yq/index.mdx': `---
title: yq
description: A portable command-line YAML, JSON, XML, CSV and properties processor.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="yq">

If \`jq\` is the mathematical engine for JSON, **\`yq\`** is the engine for **YAML**.

With the absolute dominance of Kubernetes, GitHub Actions, and Docker Compose, modern infrastructure is defined almost entirely in highly sensitive, indentation-dependent YAML files.

<Callout icon="warning" title="The Indentation Problem">
  You cannot use \`sed\` to mutate a YAML file. If \`sed\` accidentally injects exactly 1 extra space of whitespace, the entire Kubernetes cluster mathematically crashes due to a YAML parsing error.
</Callout>

## Safe YAML Mutation

\`yq\` solves this by parsing the YAML into memory, applying the mutation, and writing it back out with mathematically perfect indentation.

If you need a CI/CD pipeline to automatically update the Docker image tag in a Kubernetes deployment file before pushing it:
\`yq -i '.spec.template.spec.containers[0].image = "nginx:1.21"' deployment.yaml\`

This mathematically guarantees the YAML structure remains physically intact, making it an indispensable tool for GitOps workflows.

</ConceptTemplate>
`,
}

async function generateMega95() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega95().catch(console.error)
