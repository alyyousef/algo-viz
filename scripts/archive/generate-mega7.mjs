import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '36. DevOps, CI-CD & Version Control/36.2 Version Control/Git/index.mdx': `---
title: Git
description: A distributed version control system that tracks changes in any set of computer files.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Git">

Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code during software development.

<Callout icon="success" title="The Linus Torvalds Creation">
  Git was created by Linus Torvalds in 2005 for the development of the Linux kernel. He famously wrote the initial prototype in just two weeks because he was frustrated by existing proprietary version control systems.
</Callout>

## The Three Trees Architecture

Git operates by moving files between three distinct areas (or "trees"):

<ComparisonTable 
  headers={['Area', 'Description', 'Command to Move To']}
  rows={[
    ['Working Directory', 'The actual files you see and edit on your hard drive.', '(Default state)'],
    ['Staging Area (Index)', 'A middle-ground where you prepare and group your modified files before committing them.', \`git add <file>\`],
    ['Local Repository', 'The \`.git\` folder where Git permanently stores the frozen snapshots (commits) of your project.', \`git commit\`]
  ]}
/>

</TechnologyTemplate>
`,
  '36. DevOps, CI-CD & Version Control/36.2 Version Control/GitFlow/index.mdx': `---
title: GitFlow
description: A strict branching model for Git, designed around the project release.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GitFlow">

GitFlow is a branching model for Git, created by Vincent Driessen. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team.

<Callout icon="warning" title="Is it too complex?">
  GitFlow is excellent for software with scheduled, explicit version releases (like iOS apps or boxed software). However, for modern web apps deployed 10 times a day (Continuous Deployment), GitFlow is often considered too heavy, and teams prefer **GitHub Flow** (just \`main\` and feature branches).
</Callout>

## The Branch Types

<ComparisonTable 
  headers={['Branch', 'Purpose', 'Lifetime']}
  rows={[
    ['main (master)', 'Stores the official release history. Every commit here is a production release.', 'Infinite'],
    ['develop', 'Serves as an integration branch for features. This is where active development happens.', 'Infinite'],
    ['feature/*', 'Created from \`develop\` to build a new feature. Merged back into \`develop\` when done.', 'Short-lived'],
    ['release/*', 'Created from \`develop\` when a release is imminent. Used for bug fixes and version bumps before merging into \`main\`.', 'Short-lived'],
    ['hotfix/*', 'Created directly from \`main\` to fix a critical production bug immediately.', 'Short-lived']
  ]}
/>

</TechnologyTemplate>
`,
  '65. Comparison Pages (Reference)/GitHub vs GitLab/index.mdx': `---
title: GitHub vs GitLab
description: A comparison of the two leading Git repository hosting and CI/CD platforms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GitHub vs GitLab">

While both platforms are built on top of the open-source Git version control system, GitHub (owned by Microsoft) and GitLab (an independent, open-core company) have evolved into massive, feature-rich DevOps platforms with distinct philosophies.

<Callout icon="info" title="The Core Philosophy Difference">
  **GitHub** started as a social network for code. Its primary focus is on open-source collaboration, community, and having the largest ecosystem of third-party integrations.
  
  **GitLab** started with the goal of being a "Single Application for the entire DevOps lifecycle". It built world-class CI/CD pipelines natively into the product years before GitHub did.
</Callout>

## Detailed Comparison

<ComparisonTable 
  headers={['Feature', 'GitHub', 'GitLab']}
  rows={[
    ['CI/CD System', 'GitHub Actions (Event-driven, heavily relies on community marketplace actions).', 'GitLab CI (Highly robust, heavily used in Enterprise, built-in container registry).'],
    ['Open Source / Self-Hosting', 'Proprietary software. You can pay for GitHub Enterprise Server to self-host.', 'Open-core. You can download the free Community Edition and self-host it entirely for free.'],
    ['Community', 'The undisputed king of Open Source. Almost every major open-source project lives here.', 'Smaller community, but highly focused on Enterprise DevOps teams.'],
    ['AI Integration', 'GitHub Copilot (tightly integrated, market leader).', 'GitLab Duo (rapidly catching up, focused on enterprise privacy).']
  ]}
/>

</TechnologyTemplate>
`,
  '36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/GitHub Actions/index.mdx': `---
title: GitHub Actions
description: A continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GitHub Actions">

GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.

<Callout icon="success" title="Event-Driven Automation">
  Unlike traditional CI tools that only run when code is pushed, GitHub Actions can be triggered by *any* GitHub event. You can run a script when an Issue is opened, when a PR is labeled, or when a new release is drafted.
</Callout>

## Core Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Workflow', 'A configurable automated process made up of one or more jobs. Defined in a YAML file in \`.github/workflows/\`.'],
    ['Event', 'A specific activity in a repository that triggers a workflow run (e.g., \`push\`, \`pull_request\`, \`schedule\`).'],
    ['Job', 'A set of steps in a workflow that execute on the same runner (server). Jobs run in parallel by default.'],
    ['Step', 'An individual task that can run commands (like \`npm test\`) or use an Action.'],
    ['Action', 'A reusable, standalone command that can be shared in the GitHub Marketplace (e.g., \`actions/checkout@v3\`).']
  ]}
/>

</TechnologyTemplate>
`,
  '12. Linux & Shell Administration/Permissions/index.mdx': `---
title: Linux File Permissions
description: The mechanism used to control access to files and directories in Linux/Unix systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Linux File Permissions">

Linux is a multi-user operating system, which means multiple users can access the same system simultaneously. To protect user data and system integrity, Linux employs a strict file permission and ownership model.

<Callout icon="error" title="Never use chmod 777">
  Running \`chmod 777 file.txt\` gives Read, Write, and Execute permissions to absolutely everyone on the system, including malicious guests. It is a massive security risk and should never be used as a lazy fix for permission denied errors.
</Callout>

## The Three Permission Types

<ComparisonTable 
  headers={['Permission', 'Symbol', 'Number', 'Meaning on File', 'Meaning on Directory']}
  rows={[
    ['Read', 'r', '4', 'Can view the contents of the file.', 'Can list the files inside the directory (\`ls\`).'],
    ['Write', 'w', '2', 'Can modify or delete the file.', 'Can create, delete, or rename files inside the directory.'],
    ['Execute', 'x', '1', 'Can run the file as a program or script.', 'Can \`cd\` into the directory and access files inside it.']
  ]}
/>

## The Three Ownership Classes

Every file has exactly three sets of these permissions, applied to:
1. **User (u):** The specific owner of the file.
2. **Group (g):** Other users who are members of the file's assigned group.
3. **Others (o):** Everyone else on the system.

</TechnologyTemplate>
`,
  '12. Linux & Shell Administration/Shell/index.mdx': `---
title: Linux Shell (Bash, Zsh)
description: A command-line interpreter that provides a traditional user interface for the Linux operating system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Linux Shell (Bash, Zsh)">

A shell is a computer program that exposes an operating system's services to a human user or other programs. In general, operating system shells use either a command-line interface (CLI) or graphical user interface (GUI), depending on a computer's role and particular operation.

<Callout icon="tip" title="Piping">
  The true power of the Linux shell is the Pipe operator (\`|\`). It takes the output of the command on the left and feeds it directly as input to the command on the right. 
  Example: \`cat server.log | grep "ERROR" | wc -l\` (Counts how many errors occurred).
</Callout>

## Popular Shells

<ComparisonTable 
  headers={['Shell', 'Description']}
  rows={[
    ['Bash (Bourne Again SHell)', 'The absolute standard. It is the default shell on almost every Linux distribution. If you write a bash script, it will run everywhere.'],
    ['Zsh (Z Shell)', 'Highly customizable, supports plugins and themes (Oh-My-Zsh). Now the default shell on macOS. Great for interactive daily use.'],
    ['Fish (Friendly Interactive Shell)', 'Incredible out-of-the-box auto-completion and syntax highlighting, but slightly non-compliant with standard Bash scripts.']
  ]}
/>

</TechnologyTemplate>
`,
  '12. Linux & Shell Administration/Processes/index.mdx': `---
title: Linux Processes
description: An instance of a computer program that is being executed by one or many threads.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Linux Processes">

In computing, a process is the instance of a computer program that is being executed by one or many threads. It contains the program code and its activity. Depending on the operating system (OS), a process may be made up of multiple threads of execution that execute instructions concurrently.

<Callout icon="info" title="The Init Process (PID 1)">
  When a Linux system boots, the kernel starts exactly one process, usually \`systemd\` or \`init\`, which is assigned Process ID (PID) 1. Every other process on the system is a child, grandchild, or descendant of PID 1.
</Callout>

## Managing Processes

<ComparisonTable 
  headers={['Command', 'Action']}
  rows={[
    ['ps', 'Lists the currently running processes for the current shell.'],
    ['top / htop', 'Provides a real-time, dynamic view of all running system processes, CPU usage, and memory consumption.'],
    ['kill <PID>', 'Sends a signal (default SIGTERM) to a process requesting it to shut down gracefully.'],
    ['kill -9 <PID>', 'Sends a SIGKILL signal, forcing the kernel to instantly terminate the process. The process cannot catch or ignore this signal.']
  ]}
/>

</TechnologyTemplate>
`,
  '12. Linux & Shell Administration/SSH/index.mdx': `---
title: Secure Shell (SSH)
description: A cryptographic network protocol for operating network services securely over an unsecured network.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Secure Shell (SSH)">

Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. Typical applications include remote command-line, login, and remote command execution, but any network service can be secured with SSH.

<Callout icon="success" title="Public Key Cryptography">
  SSH uses asymmetric cryptography. You generate a Public Key (which you put on the server) and a Private Key (which stays on your laptop). The server can encrypt a challenge using your Public Key, and ONLY your laptop can decrypt it, proving who you are without ever sending a password over the internet.
</Callout>

## Key Components

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['sshd', 'The SSH Daemon. This is the server software running on the remote Linux machine listening on Port 22 for incoming connections.'],
    ['~/.ssh/id_rsa', 'Your default Private Key. Keep this absolutely secret.'],
    ['~/.ssh/id_rsa.pub', 'Your default Public Key. You append the contents of this file to the remote server\\'s \`authorized_keys\` file.'],
    ['~/.ssh/authorized_keys', 'A file on the server listing the public keys of everyone allowed to log in as that user.']
  ]}
/>

</TechnologyTemplate>
`,
  '10. Operating Systems/Virtual memory/index.mdx': `---
title: Virtual Memory
description: A memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine".
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Virtual Memory">

Virtual memory is a memory management technique where secondary memory (Hard Drive / SSD) can be used as if it were a part of the main memory (RAM). Virtual memory is a common technique used in a computer's operating system (OS).

<Callout icon="tip" title="The Illusion of Infinite Memory">
  If you have 8GB of physical RAM, but open 200 Chrome tabs that require 16GB, the OS doesn't crash. It seamlessly moves the memory of the inactive tabs to the slow Hard Drive (Swap Space), keeping only the active tabs in fast RAM.
</Callout>

## How it Works (Paging)

<ComparisonTable 
  headers={['Term', 'Description']}
  rows={[
    ['Pages', 'The OS divides memory into equal-sized chunks called Pages (usually 4KB each).'],
    ['Page Table', 'A map maintained by the OS that translates a "Virtual Address" (what the program sees) to a "Physical Address" (where the data actually lives in RAM or on Disk).'],
    ['Page Fault', 'Occurs when a program tries to access a Page that is currently stored on the Hard Drive. The CPU halts the program, the OS loads the Page from Disk back into RAM, and then the program resumes.'],
    ['Thrashing', 'A catastrophic performance collapse where the system spends 99% of its time swapping pages between RAM and Disk, and 1% of its time actually executing code.']
  ]}
/>

</TechnologyTemplate>
`,
  '10. Operating Systems/Deadlocks (detection/index.mdx': `---
title: Deadlocks (Detection and Prevention)
description: A state in which each member of a group is waiting for another member, including itself, to take action.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Deadlocks (Detection and Prevention)">

In concurrent computing, a deadlock is a state in which each member of a group is waiting for another member, including itself, to take action, such as sending a message or more commonly releasing a lock.

<Callout icon="error" title="The Classic Example">
  Thread A acquires Lock 1. Thread B acquires Lock 2.
  Thread A then tries to acquire Lock 2 (blocks, waiting for B).
  Thread B then tries to acquire Lock 1 (blocks, waiting for A).
  Both threads are frozen forever. This is a Deadlock.
</Callout>

## The Coffman Conditions

A deadlock CANNOT occur unless ALL FOUR of these conditions are met simultaneously:

<ComparisonTable 
  headers={['Condition', 'Description', 'How to break it']}
  rows={[
    ['Mutual Exclusion', 'At least one resource must be held in a non-shareable mode (only one thread can use it at a time).', 'Use read-only data or lock-free data structures.'],
    ['Hold and Wait', 'A thread holding at least one resource is waiting to acquire additional resources held by other threads.', 'Force threads to request all required locks at the very beginning, all at once.'],
    ['No Preemption', 'A resource cannot be forcibly taken from a thread; the thread must release it voluntarily.', 'Allow the OS to forcefully kill a thread and steal its lock if it waits too long.'],
    ['Circular Wait', 'Thread A waits for B, B waits for C, C waits for A.', 'Enforce a strict Global Ordering of locks. (e.g., You must always acquire Lock 1 before Lock 2).']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMega7() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega7().catch(console.error)
