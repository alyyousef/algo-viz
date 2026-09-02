import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Commits/index.mdx': `---
title: Commits
description: "An individual change to a file (or set of files) in a Git repository, saved with a unique ID and a brief message describing the change."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="GitHub Commits"
  subtitle="The Atomic Unit of Version Control"
  tags={['Git', 'GitHub', 'Version Control', 'Software Engineering']}
>

A **Commit** is a mathematical snapshot of your code at a specific point in time. It is the fundamental building block of version control systems like Git.

## 1. The Anatomy of a Commit

When you create a commit, Git mathematically calculates a SHA-1 hash (a 40-character string like TICK1a1b2c3d4...TICK1) representing the exact state of all your files. This hash makes the commit immutable and verifiable.

A commit contains:
- **The Code Changes (Diff)**: Exactly what lines were added, modified, or deleted compared to the previous commit.
- **The Metadata**: Who made the change (Author), when it was made (Timestamp), and the parent commit(s).
- **The Commit Message**: A human-readable description of *why* the change was made.

## 2. Best Practices for Commit Messages

A good commit message is crucial for maintaining a healthy project history.

<Callout type="tip" title="The Seven Rules of a Great Commit Message">
1. Separate the subject from the body with a blank line.
2. Limit the subject line to 50 characters.
3. Capitalize the subject line.
4. Do not end the subject line with a period.
5. Use the imperative mood in the subject line (e.g., "Add feature", not "Added feature" or "Adds feature").
6. Wrap the body at 72 characters.
7. Use the body to explain *what* and *why* vs. *how*.
</Callout>

## 3. Atomic Commits

Professional software teams enforce **Atomic Commits**. This means a single commit should represent exactly one logical change.
If you fix a bug in the login system and also add a new button to the dashboard, those should be two separate commits. 
Why? Because if the dashboard button breaks production, you can instantly revert its specific commit (TICK1git revert <hash>TICK1) without accidentally reverting the login bug fix.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Projects/index.mdx': `---
title: GitHub Projects
description: "A highly customizable project management tool integrated directly into GitHub, allowing teams to track issues, pull requests, and ideas in kanban boards or spreadsheets."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GitHub Projects"
  subtitle="Integrated Project Management"
  tags={['GitHub', 'Project Management', 'Agile', 'Kanban']}
>

**GitHub Projects** is a powerful planning and tracking tool built natively into GitHub. It serves as a modern alternative to external tools like Jira or Trello, specifically optimized for software development teams.

## 1. Core Mechanics

Instead of duplicating data across a codebase and a separate project management tool, GitHub Projects pulls live data directly from your repositories.

- **Dynamic Items**: A task on a Project board isn't just text; it is natively linked to a GitHub Issue or Pull Request. If a PR is merged, the associated task can automatically move to the "Done" column.
- **Views**: Teams can visualize the exact same data in multiple ways:
  - **Kanban Boards**: Drag-and-drop columns (e.g., Todo, In Progress, Review, Done).
  - **Table/Spreadsheet**: A dense, sortable list of tasks, perfect for backlog grooming.
  - **Roadmap**: A Gantt-chart timeline view for planning large features over months.

## 2. Custom Fields

Unlike simple issue trackers, GitHub Projects allows infinite customization through Custom Fields. You can add fields for:
- **Priority**: High, Medium, Low.
- **T-Shirt Size**: Estimate effort (S, M, L, XL).
- **Target Date**: When the task must be completed.
- **Iteration**: Assigning tasks to specific 2-week Sprint cycles.

## 3. Automation

GitHub Projects includes a built-in workflow engine to automate tedious project management tasks. 
For example, you can set a rule: *When an Issue is closed, automatically change its Status field to "Done" and remove it from the "Current Sprint" iteration.* This ensures the project board perfectly reflects the actual state of the codebase with zero manual administrative work.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/GitHub Pages/index.mdx': `---
title: GitHub Pages
description: "A static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="GitHub Pages"
  subtitle="Free Static Hosting"
  tags={['GitHub', 'Hosting', 'Web Development', 'CI/CD']}
>

**GitHub Pages** is a free, native web hosting service provided by GitHub. It allows developers to instantly publish static websites directly from a GitHub repository, completely bypassing the need to configure web servers or databases.

## 1. How It Works

GitHub Pages only hosts **Static Content** (HTML, CSS, JavaScript, images). It cannot run server-side languages like PHP, Python, or Node.js databases natively.

When you enable GitHub Pages on a repository, GitHub provisions a URL (usually TICK1https://<username>.github.io/<repository-name>TICK1). Any code pushed to the designated branch (often TICK1gh-pagesTICK1 or TICK1mainTICK1) is automatically served to the public web via GitHub's global Content Delivery Network (CDN).

## 2. Jekyll Integration

While you can write raw HTML, GitHub Pages natively integrates with **Jekyll**, a Ruby-based static site generator. 
If you push Markdown files to your repository, GitHub's servers will automatically run Jekyll behind the scenes, convert your Markdown into styled HTML, and publish the resulting website. This is how millions of developers host their technical blogs and documentation.

## 3. Modern CI/CD Workflows

Historically, GitHub Pages only supported serving files from a specific branch. With the advent of **GitHub Actions**, the paradigm has shifted.
You can now build a React, Vue, or Next.js (Static Export) application using a GitHub Actions workflow, and the action will automatically push the compiled TICK1distTICK1 or TICK1buildTICK1 folder directly to GitHub Pages servers.

<Callout type="info" title="Custom Domains">
  While the default URL is TICK1github.ioTICK1, GitHub Pages allows you to route a custom domain (e.g., TICK1www.myproject.comTICK1) to your repository for free, automatically providing and renewing SSL certificates (HTTPS) via Let's Encrypt.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Issues/index.mdx': `---
title: GitHub Issues
description: "The built-in bug tracker and task management system for GitHub repositories, allowing users to report bugs, request features, and discuss code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GitHub Issues"
  subtitle="Native Bug Tracking & Discussions"
  tags={['GitHub', 'Project Management', 'Bug Tracking', 'Open Source']}
>

**GitHub Issues** are the primary communication channel for any GitHub repository. They function as a lightweight, developer-focused ticketing system used to track bugs, request new features, or discuss major architectural changes before writing code.

## 1. The Anatomy of an Issue

An Issue consists of:
- **Title & Description**: Written in GitHub Flavored Markdown, allowing developers to embed code snippets, images, and tables.
- **Labels**: Color-coded tags used to categorize the issue (e.g., TICK1bugTICK1, TICK1enhancementTICK1, TICK1good first issueTICK1, TICK1wontfixTICK1).
- **Assignees**: The specific developer(s) responsible for resolving the issue.
- **Milestones**: Grouping issues together toward a specific release target (e.g., "v2.0 Beta").

## 2. Issue Templates

In large open-source projects, users often submit useless bug reports like "It doesn't work." 
To prevent this, maintainers create **Issue Templates** (stored in TICK1.github/ISSUE_TEMPLATE/TICK1). When a user clicks "New Issue", they are forced to fill out a structured form asking for their Operating System, exact steps to reproduce the bug, and the expected vs. actual behavior.

## 3. Cross-Referencing

The true power of GitHub Issues is their tight integration with the codebase.
If a developer creates a Pull Request and writes TICK1Fixes #42TICK1 in the description, GitHub automatically creates a hyperlink between the PR and Issue #42. Furthermore, the exact moment the PR is merged into the main branch, GitHub will autonomously close the Issue, ensuring the bug tracker is always perfectly synchronized with the codebase.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Releases/index.mdx': `---
title: GitHub Releases
description: "A feature for packaging and delivering software iterations to users, providing downloadable binaries, release notes, and version history."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="GitHub Releases"
  subtitle="Shipping Software to Users"
  tags={['GitHub', 'Deployment', 'CI/CD', 'Open Source']}
>

While Git commits track the microscopic changes in a codebase, **GitHub Releases** provide macroscopic checkpoints. They are official packages of software distributed to end-users, representing a stable, deployable version of the project.

## 1. Tags and Releases

Releases are fundamentally built on top of Git **Tags**. 
When a codebase reaches a stable point, a developer creates a Git Tag (e.g., TICK1v1.4.2TICK1), which is an immutable pointer to a specific commit. 
A GitHub Release is simply a web UI wrapper around that Tag, adding:
- **Release Notes**: Markdown documentation explaining what changed (new features, bug fixes, breaking changes).
- **Binary Assets**: Compiled, executable files (e.g., TICK1app-windows.exeTICK1, TICK1app-linux.tar.gzTICK1) that users can download without needing to compile the source code themselves.

## 2. Semantic Versioning

Most GitHub Releases follow **Semantic Versioning (SemVer)**, formatted as TICK1MAJOR.MINOR.PATCHTICK1.
- **MAJOR**: Incompatible API changes.
- **MINOR**: Adding functionality in a backward-compatible manner.
- **PATCH**: Backward-compatible bug fixes.

## 3. Automation (Drafting Releases)

Writing release notes manually is tedious. Modern repositories automate this using GitHub Actions. 
Tools like **Release Please** or GitHub's native **Generate Release Notes** button can scan all the Pull Requests merged since the last release and automatically generate a perfect Markdown changelog, categorizing PRs into "Features", "Fixes", and "Maintenance".

<Callout type="success" title="The Release Workflow">
  In a professional CI/CD pipeline, publishing a GitHub Release acts as a trigger. When the Release is published, an automated pipeline immediately takes the code, builds the Docker image, and deploys it to the production servers, treating the GitHub Release as the ultimate source of truth.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Discussions/index.mdx': `---
title: GitHub Discussions
description: "A collaborative communication forum for the community around an open source or internal project, separating Q&A from actionable bug reports."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GitHub Discussions"
  subtitle="Community Forums for Code"
  tags={['GitHub', 'Community', 'Open Source', 'Collaboration']}
>

Historically, open-source maintainers had a massive problem: users would open GitHub Issues to ask "How do I use this?" or "What do you think about adding X?". This clogged up the Issue tracker, which is supposed to be strictly for actionable bugs and planned features.

**GitHub Discussions** solves this by providing a dedicated, forum-like space within the repository.

## 1. Structure and Features

Discussions look and feel like a modern forum (similar to Reddit or StackOverflow).
- **Categories**: Maintainers can create categories like "Q&A", "Show and Tell", "Ideas", and "General".
- **Mark as Answer**: In the Q&A category, if a user asks a question and someone provides the solution, the maintainer or author can "Mark as Answer." This highlights the solution at the top of the thread, turning the repository into a self-serve knowledge base.
- **Threading**: Unlike Issues which are a single flat list of comments, Discussions support threaded replies, keeping conversations organized.

## 2. Converting Issues to Discussions

If a user mistakenly opens a GitHub Issue to ask a question, a maintainer can click a single button to convert the Issue into a Discussion. This instantly moves the thread out of the backlog and into the forum, keeping the Issue tracker clean while still helping the user.

## 3. Community Engagement

For massive open-source projects (like Next.js or Tailwind CSS), Discussions act as the central hub for the community. Users can showcase projects they've built, vote on RFCs (Requests for Comments) for upcoming architecture changes, and help each other debug code, offloading support burden from the core maintainers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.1 Project Management/Backlogs/index.mdx': `---
title: The Product Backlog
description: "An ordered, centralized list of everything that is known to be needed in the product, serving as the single source of requirements for any changes to be made."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="The Product Backlog"
  subtitle="The Master To-Do List"
  tags={['Project Management', 'Agile', 'Scrum', 'Product Management']}
>

In Agile software development, the **Product Backlog** is the ultimate source of truth for what a team needs to build. It is a prioritized list of features, bug fixes, technical debt, and knowledge acquisition (research) required to build the product.

## 1. Ownership and Prioritization

The Backlog is exclusively owned by the **Product Owner (PO)**. 
While anyone (developers, users, stakeholders) can add items to the backlog, the Product Owner has the final say on priority. 
Items at the top of the backlog must be highly detailed, estimated, and ready to be worked on immediately. Items at the very bottom are often vague ideas ("Add AI integration") that won't be analyzed until they move up in priority.

## 2. Backlog Grooming (Refinement)

A backlog is a living document. If left unmanaged, it becomes a graveyard of thousands of outdated ideas.
Teams hold regular **Backlog Grooming** sessions where they:
- **Delete** irrelevant items.
- **Break down** massive features into smaller, manageable chunks (Epics into User Stories).
- **Estimate** the effort required for the top items using Story Points.
- **Re-prioritize** based on shifting business needs.

## 3. Sprint Backlog vs Product Backlog

- **Product Backlog**: The master list of *everything*.
- **Sprint Backlog**: A small subset of items pulled from the top of the Product Backlog that the engineering team commits to completing during the current 2-week Sprint. Once the Sprint starts, the Sprint Backlog is locked, protecting developers from changing requirements.

<Callout type="warning" title="The Icebox">
  Many teams maintain an "Icebox" or "Someday/Maybe" list separate from the active backlog. If an idea is good but not relevant for the next 6-12 months, it goes in the Icebox to prevent it from cluttering the active Product Backlog.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.1 Project Management/Roadmaps/index.mdx': `---
title: Product Roadmaps
description: "A high-level visual summary that maps out the vision and direction of a software product offering over time."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Product Roadmaps"
  subtitle="The Strategic Timeline"
  tags={['Project Management', 'Strategy', 'Product Management']}
>

If the Backlog is the microscopic list of daily tasks, the **Product Roadmap** is the macroscopic, strategic vision. It is a high-level visual summary that communicates the "Why" and the "When" of what the team is building over the next several quarters or years.

## 1. Purpose of a Roadmap

A roadmap is primarily a communication tool.
- **For the Engineering Team**: It provides context. Instead of just coding random features, they see how their current work fits into the grand vision of the company.
- **For the Sales/Marketing Team**: It tells them what features they can promise to customers and when to plan marketing campaigns.
- **For Stakeholders/Investors**: It proves the team has a coherent strategy for market dominance.

## 2. Types of Roadmaps

- **Timeline/Gantt Roadmaps**: Traditional roadmaps that plot specific features against hard dates (e.g., "Q3: Launch Mobile App"). These are risky in software, as strict deadlines often lead to technical debt.
- **Now / Next / Later Roadmaps**: A modern Agile approach. It avoids hard dates. 
  - **Now**: Things actively being worked on (high detail).
  - **Next**: Things coming in a few months (medium detail).
  - **Later**: Long-term strategic goals (low detail).
- **Outcome-Driven Roadmaps**: Instead of listing features ("Add Social Login"), they list business outcomes ("Reduce checkout friction by 20%"). This gives engineering the freedom to find the best technical solution to the business problem.

## 3. The Danger of Feature Factories

A common anti-pattern in project management is treating the roadmap as a guaranteed contract rather than a strategic guide. If a company rigidly sticks to a 12-month roadmap despite changing market conditions or user feedback, they become a "Feature Factory"—blindly shipping code that no one actually wants, simply because it was on the roadmap.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.1 Project Management/User stories/index.mdx': `---
title: User Stories
description: "An informal, general explanation of a software feature written from the perspective of the end user, focusing on the value it provides."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="User Stories"
  subtitle="Requirements from the User's Perspective"
  tags={['Project Management', 'Agile', 'Scrum']}
>

In Agile methodologies, a **User Story** is the smallest unit of work. Instead of writing a highly technical requirement like "Update database schema to support OAuth2 tokens," a User Story describes the feature strictly from the perspective of the human being who will use it.

## 1. The Standard Format

Almost all User Stories follow a strict Mad-Libs style template to ensure the focus remains on business value:

**"As a [persona], I want to [action], so that [benefit/value]."**

- *As a frequent shopper, I want to save my credit card information, so that I can check out faster in the future.*
- *As a database admin, I want an automated daily backup script, so that I don't lose data during a server crash.*

## 2. Acceptance Criteria

A User Story is just a conversation starter. It must be paired with **Acceptance Criteria**: a checklist of specific conditions that must be mathematically true for the story to be considered "Done."

For the credit card story, Acceptance Criteria might include:
- Must securely encrypt the card via Stripe API.
- User must be able to delete a saved card.
- User must not be able to see the full card number (only the last 4 digits).

## 3. INVEST Principle

A good User Story follows the **INVEST** acronym:
- **I**ndependent: Can be developed in isolation without relying on other stories.
- **N**egotiable: Not a rigid contract; developers can suggest better ways to achieve the goal.
- **V**aluable: Delivers actual value to the customer or business.
- **E**stimable: Small enough that the team can reasonably guess how long it will take.
- **S**mall: Can be completed within a single Sprint.
- **T**estable: The Acceptance Criteria can be definitively verified.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/62. Software Project Management & Documentation/62.1 Project Management/Epics/index.mdx': `---
title: Epics
description: "A large body of work that can be broken down into a number of smaller, manageable user stories."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Epics"
  subtitle="The Macro-Level User Story"
  tags={['Project Management', 'Agile', 'Scrum']}
>

In Agile project management, an **Epic** is a massive chunk of work that shares a common strategic objective. Because it is too large to be completed in a single Sprint, it is mathematically broken down into dozens of smaller, bite-sized **User Stories**.

## 1. Hierarchy of Agile Planning

To understand Epics, you must understand the hierarchy:
1. **Initiative/Theme**: A massive company-wide goal (e.g., "Enter the Mobile Market").
2. **Epic**: A large feature set within that theme (e.g., "Build the iOS User Profile System").
3. **User Story**: A specific piece of the Epic (e.g., "As a user, I want to upload an avatar").
4. **Task/Sub-task**: Technical steps for developers (e.g., "Configure AWS S3 bucket for images").

## 2. When to Use an Epic

If a product manager writes a User Story and the engineering team estimates it will take 3 months to build, that is not a User Story; that is an Epic. 

By declaring it an Epic, the team is forced into a refinement session. They must slice the massive 3-month feature vertically into 1-week stories. This allows the team to ship the highest-value parts of the Epic first, rather than waiting 3 months to deliver anything.

<Callout type="info" title="Tracking Epics">
  In tools like Jira or GitHub Projects, Epics act as folders. As developers complete the individual User Stories inside the Epic, a progress bar slowly fills up, giving management a clear, mathematically accurate view of when the massive feature will actually be finished.
</Callout>

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Fix MDX brace parsing issues inside math blocks
    finalContent = finalContent.replace(/\\\\\\{/g, '\\\\lbrace ').replace(/\\\\\\}/g, '\\\\rbrace ')
    
    // Enforce Unix line endings
    finalContent = finalContent.replace(/\r\n/g, '\n')
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
