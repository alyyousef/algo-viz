import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Merges/index.mdx': `---
title: Merges
description: The mathematical operation in version control where two distinct lines of development (branches) are computationally synthesized into a single unified history, resolving conflicting modifications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Merges"
  subtitle="Synthesizing Parallel Timelines"
  tags={['Version Control', 'Git', 'Algorithms', 'Engineering']}
>

When a developer finishes working on an isolated feature branch, that code is useless until it is computationally integrated back into the main codebase. A Merge is the algorithm that achieves this.

## 1. Fast-Forward Merges
The simplest mathematical merge is a **Fast-Forward**. 
If you create a branch from TICK1mainTICK1, add 3 commits, and nobody else has touched TICK1mainTICK1 in the meantime, Git does not actually need to "merge" anything. It mathematically recognizes that your branch is a direct linear continuation of TICK1mainTICK1. Git simply moves the TICK1mainTICK1 pointer forward 3 steps to catch up with your branch. The resulting history is a perfect, straight line.

## 2. The 3-Way Merge Algorithm
If you branch from TICK1mainTICK1, and while you are working, a colleague pushes their own changes to TICK1mainTICK1, the timelines have mathematically diverged. A Fast-Forward is impossible.
Git executes a **3-Way Merge**. It computationally analyzes three specific points in time:
1. The common ancestor commit (where your branches split).
2. The tip of your branch.
3. The tip of TICK1mainTICK1.
Git mathematically compares the diffs. If you edited file A and your colleague edited file B, Git automatically synthesizes a new "Merge Commit" containing both changes. If you both edited the exact same line in file A, Git mathematically halts and throws a **Merge Conflict**, forcing human intervention.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Monorepos vs polyrepos/index.mdx': `---
title: Monorepos vs Polyrepos
description: A fundamental architectural debate concerning whether an organization's entire suite of diverse software projects should be housed in a single massive Git repository or split into hundreds of independent repositories.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Monorepos vs Polyrepos"
  subtitle="Repository Architecture at Scale"
  tags={['Version Control', 'Architecture', 'Git', 'Engineering']}
>

How a company organizes its code physically dictates its engineering culture. If a company has a frontend app, an iOS app, and 50 backend microservices, how many Git repositories should exist?

## 1. The Polyrepo Approach
The Polyrepo (Multi-repo) approach creates **one repository per project** (e.g., 52 total repositories).
- **Pros**: Strict mathematical isolation. A developer working on the iOS app pulls a tiny 50MB repository. The CI/CD pipelines are incredibly simple because a change in the backend repo only triggers the backend build.
- **Cons**: Dependency hell. If 10 microservices share a common authentication library, and you update that library, you must mathematically open 10 separate Pull Requests across 10 repositories to update the version numbers.

## 2. The Monorepo Approach
Pioneered by Google, Facebook, and Twitter, the Monorepo houses **every project in the entire company in a single, massive repository**.
- **Pros**: Atomic cross-project commits. You can update the shared authentication library and update all 10 microservices in a *single mathematical commit*. If the CI tests pass, you are mathematically guaranteed that the entire company's codebase is compatible.
- **Cons**: Extreme scale issues. Google's Monorepo is terabytes in size. Standard Git mathematically breaks at this scale. A Monorepo requires massive investment in specialized build systems (like Bazel) that can mathematically determine exactly which subsets of the massive repo need to be recompiled when a single file changes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Pull requests/index.mdx': `---
title: Pull Requests
description: A collaborative mechanism utilized in platforms like GitHub and GitLab that allows developers to propose mathematical code changes, initiate peer review, and run automated CI validation before merging.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Pull Requests (PRs)"
  subtitle="The Gateway to the Mainline"
  tags={['Version Control', 'Git', 'Collaboration', 'CI/CD']}
>

A Pull Request (known as a Merge Request in GitLab) is not a native Git command. It is a web-based, collaborative wrapper built on top of Git to enforce mathematical quality gates.

## 1. The Collaborative Diff
When a developer pushes a branch to GitHub, they open a PR.
The PR mathematically calculates the exact diff between the developer's branch and the target TICK1mainTICK1 branch. It presents this diff in a human-readable web interface, allowing senior engineers to leave comments directly on specific lines of code.

## 2. The Automated Quality Gate
The greatest power of a PR is its role as a mathematical gatekeeper.
When a PR is opened, Webhooks instantly notify the CI/CD pipeline (e.g., Jenkins). The pipeline runs unit tests and security scans against the proposed code.
The branch is physically blocked from merging unless two mathematical conditions are met:
1. The CI pipeline returns a TICK1SuccessTICK1 exit code.
2. A human reviewer clicks the TICK1ApproveTICK1 button.
This mathematical lock prevents junior developers from accidentally destroying production by forcefully pushing broken code directly to the TICK1mainTICK1 branch.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Rebasing/index.mdx': `---
title: Rebasing
description: A mathematically complex Git operation that rewrites commit history by transplanting an entire branch onto a new base commit, resulting in a perfectly linear, conflict-free project timeline.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Rebasing"
  subtitle="Rewriting Mathematical History"
  tags={['Version Control', 'Git', 'Algorithms', 'Advanced Operations']}
>

Standard merging leaves a messy, web-like history of branches splitting and rejoining. Rebasing solves this by mathematically rewriting time to make it appear as if you wrote all your code *after* your colleagues finished theirs.

## 1. The Rebase Algorithm
Imagine you branch from TICK1mainTICK1 at Commit A. You write Commits B and C. Meanwhile, a colleague pushes Commit D to TICK1mainTICK1.
If you execute TICK1git rebase mainTICK1 while on your branch, Git performs a mathematical illusion:
1. It temporarily saves your Commits B and C to memory.
2. It mathematically moves the starting point of your branch forward to Commit D.
3. It re-applies your Commits B and C on top of D, mathematically generating entirely new SHA-1 hashes for them (let's call them B' and C').
The result is a perfectly linear history: A -> D -> B' -> C'. When you eventually merge this into TICK1mainTICK1, it is guaranteed to be a simple Fast-Forward merge.

## 2. The Golden Rule of Rebasing
Rebasing is incredibly dangerous because it mathematically destroys existing commits and replaces them with clones.
**The Golden Rule:** *Never rebase a branch that has been pushed to a public server and shared with other developers.*
If you rebase a shared branch, you rewrite the mathematical history. When your colleagues try to pull, their local Git clients will mathematically panic because the timeline they were working on has been retroactively erased and replaced.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Stashing/index.mdx': `---
title: Stashing
description: A localized Git mechanism that temporarily shelves uncommitted, modified files in a mathematical stack, allowing a developer to cleanly switch branches without losing their current work-in-progress.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Stashing"
  subtitle="The Temporary Shelf"
  tags={['Version Control', 'Git', 'Workflow', 'Productivity']}
>

Developers frequently encounter a workflow interruption: you are halfway through writing a complex new feature, your code does not compile yet, and suddenly your boss demands you switch branches to fix a critical production bug immediately.

## 1. The Interruption Problem
You cannot commit your current code, because committing broken code violates the mathematical integrity of the repository. But you cannot switch branches, because Git will mathematically block you, warning that your uncommitted changes will be overwritten by the new branch.

## 2. The LIFO Stack
Git solves this with TICK1git stashTICK1.
When executed, Git takes all your currently modified (but uncommitted) files and mathematically compresses them into a temporary hidden commit. It then reverts your working directory to a perfectly clean state, matching the last official commit. 
You are now free to switch branches, fix the bug, and commit. When you return to your original feature branch, you execute TICK1git stash popTICK1. Git mathematically retrieves the shelved changes from the top of the LIFO (Last-In-First-Out) stack and reapplies them to your working directory, allowing you to resume exactly where you left off.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/SVN/index.mdx': `---
title: Subversion (SVN)
description: A centralized legacy version control system that relies on a single, authoritative master server, meaning developers must have a continuous network connection to commit code or view history.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Subversion (SVN)"
  subtitle="Centralized Version Control"
  tags={['Version Control', 'Legacy', 'Centralized', 'Engineering']}
>

Before Git revolutionized the industry, Apache Subversion (SVN) was the global standard for version control. It fundamentally differs from Git in its mathematical architecture regarding decentralization.

## 1. The Central Server Bottleneck
Git is *Distributed* (every developer has a full 5GB mathematical clone of the entire repository history on their laptop). 
SVN is *Centralized*. A developer's laptop only contains a single snapshot of the current files. The mathematical history (all past commits) exists *only* on the central SVN server. 
Therefore, in SVN, if you are on an airplane without Wi-Fi, you are mathematically incapable of committing code, viewing a file's history, or switching branches, because all those operations require a network request to the central server.

## 2. The Merging Nightmare
SVN's mathematical branching and merging algorithms were notoriously weak. 
Because tracking branch divergence computationally required constant communication with the central server, developers avoided branching. Instead, massive teams worked directly on the "trunk" (main branch), leading to constant breakages. When branches were used, merging them back together often resulted in catastrophic, unresolvable conflicts, a trauma that drove the industry's rapid migration to Git in the 2010s.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Tags/index.mdx': `---
title: Tags
description: Static, immutable mathematical pointers in a Git repository designed specifically to permanently mark milestone commits, such as official software release versions (e.g., v1.0.0).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Tags"
  subtitle="Permanent Milestone Markers"
  tags={['Version Control', 'Git', 'Release Management', 'Engineering']}
>

While a Branch is a pointer that automatically moves forward every time a new commit is added, a Tag is a mathematical pointer that is explicitly designed to **never move**.

## 1. Semantic Versioning Markers
When a software team officially releases version 2.4.1 to production, they need a mathematical guarantee that they can look back 5 years from now and see the exact codebase that was released that day. 
They find the exact commit hash that passed QA and execute TICK1git tag v2.4.1TICK1. This creates an immutable reference. If a bug is discovered in production a year later, the DevOps team can execute TICK1git checkout v2.4.1TICK1 to instantly revert their local repository to the exact mathematical state of the release, completely ignoring the thousands of commits that have occurred since.

## 2. Annotated vs. Lightweight
Git supports two mathematical types of tags:
- **Lightweight**: Just a pointer to a commit hash.
- **Annotated**: A full Git object. It contains a timestamp, a message (like release notes), and the tagger's name, and it is mathematically hashed and stored in the Git database. Annotated tags can also be cryptographically signed with a GPG key, providing absolute mathematical proof that the release was authorized by a specific senior engineer and not maliciously injected by a hacker.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.2 Version Control/Trunk-based development/index.mdx': `---
title: Trunk-Based Development
description: A high-velocity branching model where all developers merge their code into a single central branch (the trunk) multiple times a day, mathematically minimizing merge conflicts and enabling Continuous Deployment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Trunk-Based Development"
  subtitle="The Prerequisite for True CI/CD"
  tags={['DevOps', 'Version Control', 'Workflow', 'Agile']}
>

The "GitFlow" workflow dictates that developers create long-lived feature branches, merge them into a TICK1developTICK1 branch, which merges into a TICK1releaseTICK1 branch, which merges into TICK1mainTICK1. This creates mathematical overhead, delays integration, and results in catastrophic merge conflicts.

## 1. The Mathematical Elimination of Divergence
Trunk-Based Development is the aggressive alternative utilized by elite DevOps teams.
Developers are forbidden from creating long-lived feature branches. Instead, they must merge their code directly into the TICK1mainTICK1 branch (the trunk) multiple times a single day. 
Because the code is integrated constantly in tiny increments, the mathematical divergence between a developer's laptop and the production codebase never exceeds a few hours of work. Merge conflicts become mathematically impossible or trivially small.

## 2. Reliance on Feature Flags
If a developer must merge code to TICK1mainTICK1 today, but the feature will take 3 weeks to build, how is the codebase kept stable?
Trunk-Based Development relies entirely on **Feature Flags**. The unfinished code is merged and deployed to production daily, but it is mathematically wrapped in a toggle that hides it from users. This allows the code to be continuously integrated and tested without breaking the live product, enabling true Continuous Deployment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Argo CD/index.mdx': `---
title: Argo CD
description: A declarative, GitOps-based continuous delivery tool specifically engineered for Kubernetes, mathematically automating the deployment of applications by reconciling cluster state with Git repositories.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Argo CD"
  subtitle="The GitOps Engine for Kubernetes"
  tags={['DevOps', 'Kubernetes', 'GitOps', 'CI/CD']}
>

Traditional CI/CD tools (like Jenkins) push deployments by executing commands against external servers. Argo CD flips this mathematical model; it lives *inside* the Kubernetes cluster and pulls configuration from Git.

## 1. The Mathematical Reconciliation Loop
Argo CD is the physical manifestation of the **GitOps** philosophy.
An engineer stores Kubernetes YAML manifests (or Helm charts) in a Git repository. Argo CD continuously polls this repository. It mathematically calculates the diff between the Desired State (the code in Git) and the Live State (what is actually running in the cluster).
If a developer merges a PR changing a deployment from 3 replicas to 5, Argo CD detects the "OutOfSync" mathematical state. It automatically executes a synchronization loop, scaling the pods in Kubernetes to exactly match the Git repository, requiring zero external scripts or API tokens in the CI pipeline.

## 2. Self-Healing Infrastructure
Because Argo CD is a constant mathematical loop, it protects against manual interference.
If a rogue SysAdmin manually runs TICK1kubectl delete deployment frontendTICK1 directly on the cluster, Argo CD instantly detects that the Live State no longer matches the Git state. Within seconds, it mathematically self-heals, recreating the frontend deployment automatically to enforce compliance with the Git source of truth.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/36. DevOps, CI-CD & Version Control/36.3 CI-CD Platforms/Azure Pipelines/index.mdx': `---
title: Azure Pipelines
description: A cloud-hosted CI/CD orchestration service by Microsoft Azure, capable of building, testing, and deploying any language to any cloud or on-premises environment using mathematically robust YAML configurations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Azure Pipelines"
  subtitle="Microsoft's Enterprise CI/CD Engine"
  tags={['DevOps', 'Azure', 'CI/CD', 'Platform']}
>

Part of the Azure DevOps suite, Azure Pipelines is a massive, enterprise-grade orchestration engine. Unlike AWS CodePipeline (which is deeply tied to AWS), Azure Pipelines is mathematically agnostic—it is heavily used to deploy Linux containers to AWS and Google Cloud.

## 1. Cross-Platform Agent Architecture
When a pipeline runs, it requires a physical machine (an Agent) to compile the code.
Azure Pipelines provides a massive pool of Microsoft-hosted mathematical agents covering Windows, macOS, and Linux. This is highly unique; if you are building an iOS app, Azure Pipelines automatically provisions a pristine macOS server in the cloud, compiles your Swift code, signs it, and mathematically destroys the server when finished, requiring zero Apple hardware management from the DevOps team.

## 2. Advanced Multi-Stage YAML
Enterprise deployments are not simple scripts; they are complex mathematical graphs.
Azure Pipelines uses TICK1azure-pipelines.ymlTICK1 to define multi-stage deployments. It natively supports mathematical **Manual Approval Gates**. For example, code can automatically build, test, and deploy to Staging. The pipeline then mathematically halts, sending an email to the QA Director. The pipeline will physically wait (for up to 30 days) for the Director to click "Approve" in the Azure dashboard before continuing the deployment graph to the Production environment.

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
