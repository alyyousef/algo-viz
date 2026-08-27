import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/Release engineering/index.mdx': `---
title: Release Engineering
description: The rigorous software engineering discipline concerned with the mathematical compilation, assembly, and delivery of software at scale, ensuring reproducibility and flawless transitions to production.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Release Engineering"
  subtitle="The Science of Delivering Code"
  tags={['DevOps', 'Release Management', 'Engineering', 'Architecture']}
>

While DevOps is a culture, Release Engineering is a strict, mathematical discipline. It focuses entirely on how code transforms from a developer's IDE into a hardened, immutable artifact running in production.

## 1. Immutable Artifacts and Versioning
The core mathematical tenet of Release Engineering is **Immutability**.
A Release Engineer ensures that when source code is compiled into a binary (like a Docker image or a JAR file), that exact binary is mathematically tagged (e.g., using Semantic Versioning TICK1v2.4.1TICK1). You never rebuild code for different environments. The exact TICK1v2.4.1TICK1 artifact that passed QA is the one pushed to Production. This eliminates the mathematical variable of "build drift."

## 2. Release Strategies
Release Engineers design the pipelines that execute the releases safely.
They implement mathematical safety nets like **Dark Launches** (deploying code that users cannot see), **Canary Releases** (routing 1% of traffic to the new version), and **Blue-Green Deployments** (maintaining two identical hardware environments to instantly toggle traffic). Their primary objective is to make the deployment of software a boring, mathematically deterministic, non-event rather than a terrifying midnight ritual.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.1 DevOps Culture & Practice/SRE/index.mdx': `---
title: Site Reliability Engineering (SRE)
description: A specialized engineering discipline pioneered by Google that applies mathematical software engineering principles to operations and infrastructure to ensure massive-scale systems remain highly available.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Site Reliability Engineering (SRE)"
  subtitle="Operations as Software Engineering"
  tags={['DevOps', 'SRE', 'Architecture', 'Reliability']}
>

According to Google, *"SRE is what happens when you ask a software engineer to design an operations team."* SREs use code and mathematical algorithms to manage infrastructure, replacing manual SysAdmin labor with automation.

## 1. SLIs, SLAs, and SLOs
SRE relies on strict mathematical definitions of reliability:
- **SLI (Service Level Indicator)**: A measurable metric (e.g., "99% of HTTP requests complete in under 200ms").
- **SLO (Service Level Objective)**: The internal mathematical goal (e.g., "We aim for 99.9% uptime this month").
- **SLA (Service Level Agreement)**: The legal contract with the customer (e.g., "If uptime drops below 99.5%, we will refund you $10,000"). SREs focus purely on the SLIs and SLOs.

## 2. Error Budgets
SREs use a mathematical concept called the **Error Budget** to balance feature velocity with system stability.
If your SLO is 99.9% uptime, you mathematically have 0.1% downtime permitted (about 43 minutes per month). This 43 minutes is your "Error Budget."
Developers can deploy features as fast as they want, *as long as they have Error Budget remaining*. If a buggy deployment burns through the 43 minutes in week one, all feature deployments are mathematically frozen. The Dev team must spend the rest of the month writing automated tests and fixing technical debt to restore system stability.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Bitbucket/index.mdx': `---
title: Bitbucket
description: A Git-based source code repository hosting service owned by Atlassian, mathematically integrated with Jira and Trello, optimized for enterprise team collaboration and CI/CD workflows.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Bitbucket"
  subtitle="Atlassian's Enterprise Git Platform"
  tags={['Version Control', 'Git', 'Atlassian', 'CI/CD']}
>

While GitHub dominates open-source, Bitbucket is heavily utilized in enterprise environments due to its mathematical and native integration with Atlassian's Jira.

## 1. Jira Integration
The primary advantage of Bitbucket is its mathematical linkage to project management.
If a developer creates a Git branch named TICK1feature/JIRA-492TICK1, Bitbucket automatically parses the ticket ID and mathematically links the code to the Jira board. When the developer opens a Pull Request, the Jira ticket automatically moves from "In Progress" to "In Review." This eliminates the manual administrative overhead of developers constantly updating tracking software.

## 2. Bitbucket Pipelines
Bitbucket includes a native CI/CD orchestrator called **Bitbucket Pipelines**.
Instead of setting up a separate Jenkins server, developers write a mathematical TICK1bitbucket-pipelines.ymlTICK1 file in their repository. When code is pushed, Atlassian's cloud servers instantly spin up Docker containers, mathematically execute the unit tests, and deploy the application to AWS, providing a seamless, all-in-one DevOps experience.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Branches/index.mdx': `---
title: Branches
description: A fundamental concept in version control that creates a mathematically isolated line of development, allowing developers to build features or fix bugs without destabilizing the main codebase.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Branches"
  subtitle="Isolated Lines of Development"
  tags={['Version Control', 'Git', 'Collaboration', 'Engineering']}
>

If 50 developers simultaneously edit the exact same files in the TICK1mainTICK1 codebase, the project will mathematically collapse into a state of permanent syntax errors. Branches solve this by creating isolated, parallel universes.

## 1. The Mathematical Pointer
In Git, a branch is not a physical copy of the 5GB repository; it is simply a lightweight, 40-character mathematical pointer (a SHA-1 hash) pointing to a specific commit.
When you type TICK1git checkout -b feature-loginTICK1, Git creates a new pointer. You can now write code, delete files, and break the application entirely in your branch. Because your branch is mathematically isolated, the TICK1mainTICK1 branch (which production servers rely on) remains completely untouched and perfectly stable.

## 2. Merging the Timelines
Once your feature is complete and passes all automated tests, you must reintegrate it.
You issue a Pull Request to merge your branch back into TICK1mainTICK1. Git uses a mathematical algorithm (like the Three-Way Merge) to analyze the common ancestor commit, your new commits, and the current TICK1mainTICK1 commits. It mathematically stitches the lines of code together. If two developers edited the exact same line, Git mathematically halts and throws a "Merge Conflict," requiring a human to manually resolve the collision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Cherry-picking/index.mdx': `---
title: Cherry-picking
description: A surgical Git operation that mathematically extracts a single specific commit from one branch and applies it to another branch without merging the entire surrounding commit history.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Cherry-picking"
  subtitle="Surgical Commit Extraction"
  tags={['Version Control', 'Git', 'Advanced Operations', 'Engineering']}
>

Normally, when you merge a branch, you merge the *entire* mathematical history of that branch. However, there are scenarios where you only want one specific line of code without bringing along the rest of the garbage.

## 1. The Hotfix Scenario
Imagine you are working on a massive TICK1feature-v2TICK1 branch containing 50 commits. It is not ready for production.
Suddenly, a critical bug is discovered in production (TICK1mainTICK1). You realize that commit TICK1#a1b2c3dTICK1 in your feature branch actually contains the exact fix for this bug. You cannot merge the entire feature branch into TICK1mainTICK1 because it is unfinished.
Instead, you switch to TICK1mainTICK1 and run TICK1git cherry-pick a1b2c3dTICK1. Git mathematically calculates the exact diff of that single commit and surgically applies it to TICK1mainTICK1, fixing the production bug instantly.

## 2. Mathematical Re-hashing
When you Cherry-pick a commit, you are not moving the commit; you are mathematically duplicating it.
The new commit applied to TICK1mainTICK1 will have the exact same file changes and the exact same commit message, but because it has a different parent commit, Git mathematically calculates a completely **new SHA-1 hash** for it. They are mathematically two distinct objects in the Git database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Code reviews/index.mdx': `---
title: Code Reviews
description: A systematic, human-driven engineering practice where peers mathematically and logically scrutinize source code before it is merged into the main branch to ensure quality, security, and maintainability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Code Reviews"
  subtitle="Peer-Driven Quality Assurance"
  tags={['DevOps', 'Version Control', 'Culture', 'Engineering']}
>

Automated CI/CD pipelines can mathematically prove that code compiles and that unit tests pass. However, a machine cannot mathematically prove that a variable is named confusingly, or that a database query is vulnerable to a complex logical race condition.

## 1. The Pull Request Gate
Code Review occurs via a Pull Request (PR) or Merge Request (MR).
When a developer finishes a feature, they are mathematically blocked from merging it into TICK1mainTICK1. They must request a review from a senior engineer. The reviewer uses a web interface (like GitHub) to read the exact mathematical diff (lines added and removed). They look for architectural flaws, memory leaks, security vulnerabilities, and adherence to company style guides.

## 2. Knowledge Distribution
While bug-catching is important, the greatest mathematical value of Code Reviews is **Knowledge Transfer**.
If only one senior engineer understands the payment processing module, the company has a massive mathematical "Bus Factor" (if that engineer gets hit by a bus, the company dies). By forcing junior developers to review the senior engineer's code, and forcing the senior engineer to review the junior's code, knowledge of the complex systems is mathematically distributed across the entire engineering department.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Commits/index.mdx': `---
title: Commits
description: The fundamental, immutable unit of version control that mathematically snapshots the exact state of a project's files at a specific moment in time, permanently recorded in the repository history.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Commits"
  subtitle="Immutable Snapshots in Time"
  tags={['Version Control', 'Git', 'Data Structures', 'Engineering']}
>

A commit is not a "save file." In traditional computing, hitting Ctrl+S overwrites the previous file, destroying history. In Git, a commit is a mathematical, immutable snapshot of the entire project timeline.

## 1. The Cryptographic Hash
Every time a developer creates a commit, Git mathematically compresses all the modified files. 
It then gathers the author's name, the timestamp, the commit message, and a mathematical pointer to the previous (parent) commit. It feeds all of this data through the **SHA-1 hashing algorithm** to generate a unique 40-character hexadecimal string (e.g., TICK1f3a2b1...TICK1).
Because the parent commit hash is included in the new commit's hash calculation, the Git history is a mathematically unbroken cryptographic chain (a Merkle Tree). If a hacker secretly modifies a file from 3 years ago, the mathematical hashes of every subsequent commit will instantly break, alerting the system.

## 2. The Atomic Unit of Work
A commit should be **Atomic**—it should represent one single logical change.
If you fix a login bug and change the CSS color of the footer, those should be two mathematically distinct commits. If the CSS change accidentally breaks the mobile layout, the DevOps team can mathematically revert the CSS commit without affecting the login bug fix.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Git hooks/index.mdx': `---
title: Git Hooks
description: Automated, custom shell scripts that mathematically trigger at specific phases of the Git execution lifecycle (e.g., pre-commit, pre-push) to enforce local quality standards and prevent bad code from leaving a developer's machine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Git Hooks"
  subtitle="Local Automated Enforcement"
  tags={['Version Control', 'Git', 'Automation', 'Engineering']}
>

While a CI server protects the remote TICK1mainTICK1 branch, it wastes time and compute resources if a developer pushes code with obvious syntax errors. Git Hooks move mathematical validation left, executing directly on the developer's laptop before the code is ever pushed.

## 1. The Pre-Commit Hook
When a developer types TICK1git commitTICK1, the Git engine mathematically pauses and looks for an executable script in the TICK1.git/hooks/pre-commitTICK1 directory.
If this script exists, Git executes it. A standard pre-commit hook will run a Linter (like ESLint or Prettier) and a code formatter. If the script exits with a mathematical error code (e.g., TICK1exit 1TICK1 because a variable is undefined), Git physically aborts the commit process. The developer is mathematically prevented from committing broken code to their local history.

## 2. Security and Secret Scanning
A common use case for the **pre-push hook** is secret scanning.
Before the code is transmitted to GitHub, the hook uses regex to mathematically scan the code diff for AWS Access Keys or database passwords. If a human accidentally committed a secret, the hook catches it and aborts the push, preventing a catastrophic mathematical security breach before the data ever touches the internet.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/GitLab/index.mdx': `---
title: GitLab
description: A comprehensive, single-application DevOps platform that provides highly integrated Git repository management, issue tracking, and a massive, mathematically native CI/CD orchestration engine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="GitLab"
  subtitle="The All-in-One DevOps Platform"
  tags={['Version Control', 'Git', 'CI/CD', 'Platform']}
>

Historically, a company had to stitch together GitHub (for code), Jira (for tickets), Jenkins (for CI/CD), and SonarQube (for security). GitLab was engineered to mathematically unify the entire DevOps lifecycle into a single monolithic application.

## 1. Native CI/CD Superiority
While GitHub relies on Actions and Atlassian relies on Bitbucket Pipelines, GitLab CI is widely considered an industry gold standard for complex mathematical pipelines.
It uses a highly advanced TICK1.gitlab-ci.ymlTICK1 file capable of executing massive parallel DAGs (Directed Acyclic Graphs). It natively manages Kubernetes clusters, auto-scales GitLab Runners (the servers that execute the code), and mathematically handles complex multi-project pipeline triggers (e.g., when the backend repo builds successfully, automatically trigger the frontend repo build).

## 2. Self-Hosting and Ultimate Control
A massive mathematical advantage of GitLab over GitHub is the ability to self-host the open-source Core edition.
For military, healthcare, or financial institutions with extreme data compliance laws, pushing proprietary code to Microsoft's (GitHub's) cloud is illegal. These institutions can install GitLab on their own physically air-gapped internal servers, retaining 100% mathematical ownership over their source code and CI/CD infrastructure.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Mercurial/index.mdx': `---
title: Mercurial
description: A distributed version control system designed for extreme performance and scalability, mathematically prioritizing a cleaner, safer, and more user-friendly command interface compared to Git.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Mercurial"
  subtitle="The Elegant Alternative to Git"
  tags={['Version Control', 'Tooling', 'Engineering', 'Legacy']}
>

In the mid-2000s, Git and Mercurial (often abbreviated as TICK1hgTICK1) fought a massive war to replace Subversion (SVN) as the world's dominant version control system. While Git mathematically won the market share (largely due to GitHub), Mercurial remains a masterpiece of software engineering.

## 1. Mathematical Simplicity and Safety
Linus Torvalds designed Git to expose the complex mathematical graph theory of the repository directly to the user, making it incredibly powerful but notoriously difficult to learn.
Mercurial took the opposite approach. It abstracted the mathematical complexity behind a clean, intuitive command-line interface. More importantly, Mercurial is mathematically engineered to be **safe**. By default, it physically prevents users from executing commands that would alter history or destroy commits (unlike Git, where TICK1git push --forceTICK1 can mathematically obliterate a colleague's work).

## 2. Massive Enterprise Scale
While open-source developers chose Git, massive tech giants (like Facebook/Meta) originally chose Mercurial. 
Facebook's monolithic codebase was so mathematically massive (terabytes of text) that standard Git commands took 10 minutes to execute. Mercurial's underlying mathematical architecture handled this scale significantly better at the time, leading Facebook to heavily modify and rely on Mercurial for years before eventually building custom internal systems.

</TechnologyTemplate>
`
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
