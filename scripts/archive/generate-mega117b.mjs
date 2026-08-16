import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 62.3 GitHub Ecosystem
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Repositories/index.mdx': `---
title: Repositories
description: The most basic element of GitHub. A repository contains all of the project files (including documentation), and stores each file's revision history.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Repositories">

A **Repository** (Repo) is a mathematical folder that contains your entire project.

<Callout icon="info" title="The Cloud Backup">
  While Git mathematically tracks file changes on your local biological computer, a GitHub Repository is the canonical cloud backup of those changes. 
  
  When 10 engineers are working on a project, they do not email Zip files to each other. They all mathematically \`git push\` and \`git pull\` from the exact same central GitHub Repository, ensuring that the biological team is always perfectly synchronized on the exact same codebase.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Branches/index.mdx': `---
title: Branches
description: A pointer to a snapshot of your changes in Git, allowing you to isolate development work without affecting other branches.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Branches">

If you want to build a new feature, you do not mathematically edit the \`main\` codebase directly. If your code breaks, the biological production server will crash.

Instead, you mathematically create a **Branch**. A branch is an exact biological clone of the codebase at a specific point in time. You can spend 3 weeks biologically writing messy, broken code on your \`feature-login\` branch. Because it is mathematically isolated, the \`main\` branch remains perfectly stable. Once your code is perfect, you mathematically merge the branch back into \`main\`.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Commits/index.mdx': `---
title: Commits
description: An individual change to a file (or set of files) in a Git repository, saved with a unique ID and a brief message describing the change.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Commits">

A **Commit** is a mathematical snapshot of your code.

When you type \`git commit -m "Fix login bug"\`, Git mathematically calculates a SHA-1 hash of the exact state of all your files. This creates a permanent, immutable biological save point. If you accidentally delete a critical file 3 weeks later, you can mathematically time-travel back to any previous commit hash and restore the project instantly.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Pull requests/index.mdx': `---
title: Pull requests
description: A method of submitting contributions to an open development project, letting you tell others about changes you've pushed to a branch in a repository.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pull Requests (PRs)">

A **Pull Request** is the biological gatekeeper of software engineering.

When you finish your work on a Branch, you mathematically cannot force it into \`main\`. You must open a Pull Request. This acts as a biological petition: *"I request that you pull my code into the main branch"*. It mathematically calculates the exact \`diff\` (additions in green, deletions in red). A Senior Engineer must biologically read your code, leave comments, and mathematically click "Approve" before your code is allowed to merge.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Issues/index.mdx': `---
title: Issues
description: A great way to keep track of tasks, enhancements, and bugs for your projects on GitHub.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Issues">

**Issues** are the native biological bug tracker built directly into GitHub.

If a user mathematically encounters a bug in your open-source library, they biologically open an Issue. They describe the error and paste the mathematical stack trace. The engineering team biologically discusses the bug inside the Issue's comment thread, tags it with mathematical labels (\`bug\`, \`high-priority\`), and eventually links a Pull Request to mathematically close the Issue once the bug is fixed.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Discussions/index.mdx': `---
title: Discussions
description: A collaborative communication forum for the community around an open source or internal project.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Discussions">

Historically, users would biologically flood the "Issues" tab with questions like *"How do I install this?"* or *"What if you added this massive feature?"*. This mathematically polluted the strict bug tracker.

**Discussions** act as a biological Reddit-style forum built directly into the repository. It gives the human community a place to biologically ask questions, vote in polls, and share ideas, keeping the mathematical Issues tab strictly reserved for actionable code bugs.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Actions/index.mdx': `---
title: Actions
description: A continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Actions">

**GitHub Actions** is the mathematical automation engine of GitHub.

<Callout icon="warning" title="Executing Code on GitHub's Servers">
  Instead of biologically running your tests on your laptop, you write a \`.github/workflows/test.yml\` file.
  
  Whenever you mathematically push a commit to GitHub, GitHub automatically spins up a virtual Linux server in the cloud, clones your code, runs \`npm test\`, and mathematically blocks the Pull Request if any tests fail. It biologically automates Continuous Integration (CI) and Deployment (CD) for free.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Projects/index.mdx': `---
title: Projects
description: An adaptable spreadsheet, task-board, and roadmapping tool that integrates with your issues and pull requests on GitHub.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Projects">

As covered in the Project Management section, **GitHub Projects** transforms raw GitHub Issues into a massive biological Agile Kanban board. 

It mathematically links directly to the code. If an engineer moves a Pull Request from \`Draft\` to \`Ready for Review\`, the associated Issue mathematically slides across the biological Kanban board automatically, completely eliminating the need for a separate Jira subscription.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Releases/index.mdx': `---
title: Releases
description: Deployments of software that are packaged and delivered to users, typically based on Git tags.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Releases">

When your code is mathematically ready for the public, you create a **Release**.

You biologically select a specific commit (via a Git Tag, like \`v1.0.0\`). GitHub mathematically packages the entire codebase into a downloadable \`.zip\` file. More importantly, GitHub Actions can automatically mathematically compile your C++ or Go code into a Windows \`.exe\` or Mac \`.dmg\` file and attach the biological binaries directly to the Release page for non-technical users to download.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Packages/index.mdx': `---
title: Packages
description: A package hosting service, fully integrated with GitHub, allowing you to host your software packages privately or publicly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Packages">

If you write a Node.js library, you usually publish it to the NPM registry. If you build a Docker image, you publish it to DockerHub.

**GitHub Packages** mathematically replaces all of them. It is a biological package registry built directly into GitHub. Your GitHub Actions CI/CD pipeline can mathematically compile your Java code and instantly publish the biological \`.jar\` file to GitHub Packages, allowing other repositories in your company to mathematically \`npm install\` or \`docker pull\` directly from GitHub's servers.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Codespaces/index.mdx': `---
title: Codespaces
description: A cloud-hosted development environment that's powered by Visual Studio Code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Codespaces">

Setting up a local biological development environment is a mathematical nightmare. It can take a new engineer 3 days to install the correct versions of Python, Docker, and PostgreSQL on their MacBook.

**Codespaces** abandons the local laptop. With one biological click, GitHub spins up a massive 32-core Linux server in the cloud, installs every dependency flawlessly, and opens a full version of VS Code directly in your biological web browser. You mathematically write code in the cloud, completely eliminating the "It works on my machine" biological excuse.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/Dependabot/index.mdx': `---
title: Dependabot
description: An automated tool that checks your dependency files for outdated requirements and opens individual pull requests for any it finds.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Dependabot">

If your project mathematically relies on an old version of the \`React\` library, and a massive biological security vulnerability is discovered in that version, you are in danger.

**Dependabot** is an automated mathematical robot that constantly scans your \`package.json\`. If a security flaw is detected in one of your dependencies, Dependabot biologically writes the code fix itself, mathematically opens a Pull Request on your repository, and politely asks you to click "Merge" to instantly patch the security hole.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/GitHub Pages/index.mdx': `---
title: GitHub Pages
description: A static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository and publishes a website.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub Pages">

If you build a biological documentation website (like Docusaurus or MkDocs), you mathematically need a server to host it.

**GitHub Pages** hosts static HTML/CSS files for mathematically free. You configure GitHub Actions to compile your Markdown into HTML, and GitHub Pages instantly biologically hosts that HTML on a public URL (\`https://yourname.github.io/project\`). It is the industry standard for hosting open-source documentation.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.3 GitHub Ecosystem/GitHub CLI/index.mdx': `---
title: GitHub CLI
description: A command-line tool that brings pull requests, issues, and other GitHub concepts to your terminal.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="GitHub CLI (gh)"
  subtitle="GitHub from the Terminal"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png"
  description="GitHub CLI is the official command-line tool that mathematically brings GitHub's biological UI features directly into your terminal."
  yearCreated={2020}
  creator="GitHub"
  isOpenSource={true}
  websiteUrl="https://cli.github.com/"
>

Biological developers hate clicking buttons in a web browser.

The standard \`git\` command only handles local math (\`commit\`, \`push\`). The **GitHub CLI** (\`gh\`) interacts directly with GitHub's biological servers. By typing \`gh pr create\`, an engineer can mathematically open a Pull Request, assign a reviewer, and merge the code without ever biologically touching their computer mouse or opening a web browser.

</TechnologyTemplate>
`,
}

async function generateMega117b() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega117b().catch(console.error)
