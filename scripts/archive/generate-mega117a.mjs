import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 62.1 Project Management
  '62. Software Project Management & Documentation/62.1 Project Management/Agile/index.mdx': `---
title: Agile
description: A set of practices intended to improve the effectiveness of software development professionals, teams, and organizations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agile Methodology">

Before Agile, software was built using the **Waterfall** model: engineers would spend 2 years biologically writing code without ever showing it to the customer, only to mathematically realize at launch that the customer wanted something completely different.

<Callout icon="success" title="Iterative Delivery">
  **Agile** is a biological paradigm shift. 
  
  Instead of launching once every 2 years, the engineering team mathematically chops the software into tiny, independent features. They build, test, and launch a small feature every 2 weeks. They show it to the customer immediately, get biological feedback, and adjust their trajectory. Agile physically assumes that requirements will change, and optimizes the team to pivot instantly.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Scrum/index.mdx': `---
title: Scrum
description: An agile framework for developing, delivering, and sustaining complex products, with an initial emphasis on software development.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scrum Framework">

Agile is just a biological philosophy. **Scrum** is the strict mathematical framework used to actually implement it.

Scrum breaks work into rigid 2-week timeboxes called **Sprints**. The team biologically commits to finishing exactly 10 tasks in those 2 weeks. Every morning, they hold a 15-minute "Daily Standup" to mathematically track progress and unblock each other. At the end of the 2 weeks, they mathematically *must* deliver working software to the customer, and they hold a "Retrospective" to biologically discuss how to improve the next Sprint.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Kanban/index.mdx': `---
title: Kanban
description: A lean method to manage and improve work across human systems by balancing demands with available capacity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Kanban">

While Scrum uses rigid 2-week timeboxes, **Kanban** is a continuous, fluid biological flow.

Originating from Toyota's manufacturing plants, Kanban visually maps work on a board with columns (e.g., \`To Do\`, \`In Progress\`, \`Testing\`, \`Done\`). The core mathematical rule of Kanban is **WIP Limits** (Work In Progress). A team might mathematically forbid having more than 3 tickets in the \`In Progress\` column. This biologically forces developers to finish old tasks before starting new ones, mathematically eliminating context-switching and bottlenecking.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Epics/index.mdx': `---
title: Epics
description: A large body of work that can be broken down into a number of smaller stories, sometimes called "Issues" in Jira or GitLab.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Epics">

You cannot biologically complete "Build a new Payment System" in 2 weeks.

In Agile, a massive project is mathematically defined as an **Epic**. The Product Manager biologically writes the high-level business goal of the Epic. The engineering team then mathematically slices the Epic down into 50 tiny, independent **User Stories** (e.g., "Add Stripe API", "Build UI Button"). These individual stories are then scheduled into 2-week Sprints, allowing the team to gradually build the massive Epic piece by piece.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/User stories/index.mdx': `---
title: User stories
description: An informal, natural language description of one or more features of a software system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Stories">

A **User Story** is the atomic biological unit of Agile work.

It is explicitly NOT a mathematical technical specification. Instead of writing "Update the SQL schema to include a bio column", a Product Manager writes a biological sentence from the perspective of the customer: *"As a User, I want to add a bio to my profile, so that other people can learn about me."* This mathematically forces the engineer to focus on the biological *value* they are delivering to the human, rather than just the code.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Story points/index.mdx': `---
title: Story points
description: An arbitrary measure used by Scrum teams to determine the effort required to implement a user story.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Story Points">

Humans are biologically terrible at estimating time. If you ask an engineer "How many hours will this take?", they will mathematically be wrong 90% of the time.

<Callout icon="info" title="Abstract Effort">
  Agile abandons hours. Instead, teams estimate using **Story Points**, which are mathematical abstractions of *complexity* and *effort*, often using the Fibonacci sequence (1, 2, 3, 5, 8).
  
  A "1" is trivial. An "8" is a massive architectural unknown. Over time, the team mathematically measures their "Velocity"—e.g., they biologically complete an average of 40 Story Points per Sprint. This allows the business to mathematically predict delivery dates without ever tracking individual hours.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Backlogs/index.mdx': `---
title: Backlogs
description: A prioritized list of work for the development team that is derived from the roadmap and its requirements.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Backlog">

The **Backlog** is the mathematical graveyard of good ideas.

It is a massive list of every single User Story, bug fix, and technical debt item the company biologically wants to build. The Product Manager's biological job is to ruthlessly rank this list mathematically, putting the highest-value items at the absolute top. During Sprint Planning, the engineers only look at the top 10 items. Items at the bottom of the Backlog are mathematically ignored and usually never get built.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Sprint planning/index.mdx': `---
title: Sprint planning
description: An event in Scrum that kicks off the sprint, where the team defines what can be delivered in the sprint and how that work will be achieved.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sprint Planning">

**Sprint Planning** is the biological negotiation between the Business and the Engineers.

At the start of the 2-week Sprint, the Product Manager presents the top items from the Backlog. The Engineers biologically read the tickets, ask clarifying questions, and assign mathematical Story Points to them. Once the total Story Points hit the team's historical mathematical Capacity (e.g., 40 points), they biological stop pulling in work. They "lock" the Sprint, guaranteeing the business that those specific 40 points of work will be delivered in 2 weeks.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Release planning/index.mdx': `---
title: Release planning
description: The process of determining what features and functionality will be delivered in upcoming releases, mapping user stories to specific versions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Release Planning">

While a Sprint is a strict 2-week mathematical cycle, a **Release** is the biological event of actually giving the software to the customers.

Modern CI/CD allows teams to release mathematically every 10 minutes. However, enterprise companies (like Apple launching iOS 18) biologically group hundreds of User Stories together into a massive, heavily marketed Release. Release Planning is the biological process of looking at the team's Story Point Velocity and mathematically projecting exactly which calendar month the Epic will be finished.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Roadmaps/index.mdx': `---
title: Roadmaps
description: A strategic plan that defines a goal or desired outcome and includes the major steps or milestones needed to reach it.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Product Roadmaps">

A **Roadmap** is a high-level biological map of the future. 

It does not contain mathematical User Stories or specific Story Points. It contains massive Epics scheduled across Quarters (Q1, Q2, Q3). The biological goal of the roadmap is to align the Engineering team with the Sales and Marketing teams. It allows Marketing to mathematically know that "The New AI Feature" will be ready in Q3, so they can biologically begin preparing ad campaigns 6 months in advance.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/RACI matrices/index.mdx': `---
title: RACI matrices
description: A matrix used to clarify roles and responsibilities for cross-functional or departmental projects and processes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RACI Matrix">

When 50 biological humans are working on a massive software project, chaos ensures when a server crashes and nobody knows who is mathematically allowed to reboot it.

The **RACI Matrix** solves this. It maps every task to four biological letters:
- **R (Responsible)**: The engineer writing the code.
- **A (Accountable)**: The manager who gets biologically fired if the code breaks (Only 1 person).
- **C (Consulted)**: The security team who must be mathematically asked before the code ships.
- **I (Informed)**: The marketing team who just needs an email when the code ships.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Jira/index.mdx': `---
title: Jira
description: A proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Jira"
  subtitle="The Enterprise Agile Behemoth"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Jira_%28Software%29_logo.svg/512px-Jira_%28Software%29_logo.svg.png"
  description="Jira is the absolute biological monopoly in enterprise software project management, used by almost every Fortune 500 company to track Agile Sprints."
  yearCreated={2002}
  creator="Atlassian"
  isOpenSource={false}
  websiteUrl="https://www.atlassian.com/software/jira"
>

Jira is mathematically infinitely customizable. 

An enterprise can create complex, custom biological workflows (e.g., \`Code Review -> Security Audit -> QA Signoff -> Deployment\`). It automatically calculates Agile Velocity charts, Burn-down charts, and integrates directly with GitHub to automatically move tickets to "Done" when a Pull Request is merged. However, its immense power often leads to biological bloat, making it notoriously slow and complex for small startups.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Linear/index.mdx': `---
title: Linear
description: A modern issue tracking tool designed to streamline software development with a focus on speed, keyboard shortcuts, and minimalist design.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Linear"
  subtitle="The Lightning-Fast Issue Tracker"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Linear_logo.svg/512px-Linear_logo.svg.png"
  description="Linear is the modern, hyper-fast biological alternative to Jira, heavily favored by Silicon Valley startups for its minimalist design and keyboard-first workflow."
  yearCreated={2019}
  creator="Linear"
  isOpenSource={false}
  websiteUrl="https://linear.app/"
>

Jira is mathematically powerful but biologically slow. **Linear** was built purely for speed.

It natively runs as a fast local desktop app using a local SQLite database, syncing mathematically in the background. An engineer can create a ticket, assign it, and link it to an Epic entirely using biological keyboard shortcuts in 2 seconds. It forces strict, opinionated Agile workflows, explicitly preventing the biological customization bloat that ruins Jira instances.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/Trello/index.mdx': `---
title: Trello
description: A web-based, Kanban-style, list-making application.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Trello"
  subtitle="The Pure Kanban Board"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8fc/Trello_logo.svg/512px-Trello_logo.svg.png"
  description="Trello is a lightweight, strictly visual Kanban tool mathematically stripped of all complex Agile reporting, perfect for small biological teams."
  yearCreated={2011}
  creator="Fog Creek Software (Atlassian)"
  isOpenSource={false}
  websiteUrl="https://trello.com/"
>

Trello mathematically abandons Sprints, Story Points, and Epics. 

It provides nothing but raw, biological Kanban columns and drag-and-drop cards. It is mathematically the easiest project management tool to learn, making it heavily used not just by junior developers, but by marketing teams, HR departments, and people organizing their personal groceries. It was biologically acquired by Atlassian (the creators of Jira) in 2017.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.1 Project Management/GitHub Projects/index.mdx': `---
title: GitHub Projects
description: An adaptable spreadsheet, task-board, and roadmapping tool that integrates seamlessly with GitHub issues and pull requests.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="GitHub Projects"
  subtitle="Code-Native Task Tracking"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png"
  description="GitHub Projects mathematically merges the Agile Kanban board directly into the Git repository, allowing developers to track work without ever leaving GitHub."
  yearCreated={2016}
  creator="GitHub (Microsoft)"
  isOpenSource={false}
  websiteUrl="https://github.com/features/issues"
>

Why use Jira if all your biological code is already in GitHub?

**GitHub Projects** turns standard GitHub Issues into mathematical Kanban cards. Because it is physically connected to the codebase, the automation is mathematically flawless. When an engineer pushes a biological commit with the message \`Fixes #42\`, GitHub automatically merges the code, closes Issue #42, and visually drags the card to the "Done" column on the Project Board.

</TechnologyTemplate>
`,

  // 62.2 Documentation
  '62. Software Project Management & Documentation/62.2 Documentation/README/index.mdx': `---
title: README
description: A document containing information about the other files in a directory or archive of computer software, typically the first file a user reads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="README.md">

The **README** is the biological front door of every single codebase on Earth.

Written in Markdown, it is mathematically the first thing rendered when a user navigates to a GitHub repository. A perfect biological README must instantly explain: What this software mathematically does, how to biologically install it (\`npm install\`), and a quick 3-line example of how to execute the code. If a massive open-source project lacks a README, it will mathematically receive zero biological users.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Technical specifications/index.mdx': `---
title: Technical specifications
description: A document that defines a set of requirements that a product or assembly must meet or exceed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Technical Specifications (Tech Specs)">

Before a Senior Engineer writes a single line of code, they biologically write a **Tech Spec**.

<Callout icon="warning" title="Planning Before Coding">
  A Tech Spec mathematically describes exactly *how* a feature will be built. 
  
  It documents the exact new SQL database columns that must be added, the JSON schemas of the new API endpoints, and the mathematical Edge Cases (e.g., "What happens if a user clicks the button twice in 100 milliseconds?"). The biological engineering team debates and approves this Google Doc *before* writing the code, mathematically preventing catastrophic architectural rewrites later.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/ADRs (Architecture Decision Records)/index.mdx': `---
title: ADRs (Architecture Decision Records)
description: A short text file in a format similar to an Alexandrian pattern that describes a set of architectural decisions for a specific project.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Architecture Decision Records (ADRs)">

When a new engineer joins a company, they biologically look at the codebase and ask: *"Why on earth did you choose to use MongoDB instead of PostgreSQL?"*

An **ADR** is a mathematical markdown file committed directly to the Git repository that biologically answers this exact question. It permanently documents the context, the mathematical alternatives considered, and the exact biological reason the Senior Engineers made a massive architectural decision on a specific date. It mathematically preserves institutional memory.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/API documentation/index.mdx': `---
title: API documentation
description: Technical content that delivers instructions about how to effectively use and integrate with an API.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="API Documentation">

If you build the most mathematically powerful REST API in the world, but biologically fail to document how to use it, it is mathematically worthless.

**API Documentation** (like Stripe's legendary docs) provides developers with the exact HTTP methods, the required JSON payloads, the exact mathematical data types of the responses, and the specific HTTP error codes they might biologically encounter. The industry standard is to automatically generate this documentation directly from the code using OpenAPI.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Architecture documentation/index.mdx': `---
title: Architecture documentation
description: Documentation that describes the high-level structure of a software system, often including diagrams of its components and their interactions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Architecture Documentation">

**Architecture Documentation** is the biological map of a distributed system.

Instead of documenting exact JSON payloads, it mathematically documents how 50 different microservices biologically talk to each other over Kafka and AWS SQS. It relies heavily on visual mathematics: sequence diagrams, C4 Models, and network flowcharts. This documentation is biologically required for Site Reliability Engineers (SREs) who need to instantly mathematically understand the system when a server crashes at 3:00 AM.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/OpenAPI/index.mdx': `---
title: OpenAPI
description: A specification for machine-readable interface files for describing, producing, consuming, and visualizing RESTful web services.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="OpenAPI (Swagger)"
  subtitle="The Mathematical Blueprint of REST APIs"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/OpenAPI_Logo.svg/512px-OpenAPI_Logo.svg.png"
  description="OpenAPI is a strict mathematical specification that biologically defines exactly how a REST API behaves using a single YAML or JSON file."
  yearCreated={2010}
  creator="SmartBear Software"
  isOpenSource={true}
  websiteUrl="https://www.openapis.org/"
>

Writing API documentation in a biological Microsoft Word document is a mathematical disaster, because it instantly becomes outdated when the code changes.

Instead, developers write an **OpenAPI YAML file**. This file mathematically defines the routes (\`/users\`), the required inputs, and the exact JSON schemas. Once this file exists, biological magic happens: tools instantly auto-generate beautiful interactive HTML documentation web pages, and can even mathematically auto-generate the exact Python and TypeScript client SDKs needed to talk to the API.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Swagger/index.mdx': `---
title: Swagger
description: A suite of tools for API developers from SmartBear Software, built around the OpenAPI Specification.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Swagger UI">

**Swagger** is the biological toolset that renders the mathematical OpenAPI specification.

When you navigate to a company's API documentation and see a beautiful, interactive web page where you can actually biologically click an "Execute" button to send real HTTP requests directly from the browser, you are looking at **Swagger UI**. It mathematically parses the \`openapi.yaml\` file and dynamically renders the HTML interface, making API exploration biologically effortless for developers.

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/JSDoc/index.mdx': `---
title: JSDoc
description: A markup language used to annotate JavaScript source code files. Using comments containing JSDoc, programmers can add documentation describing the application programming interface of the code they're creating.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JSDoc">

Before TypeScript brought strict mathematics to JavaScript, **JSDoc** was the biological hack to add types.

<Callout icon="info" title="Documentation as Code">
  JSDoc is a standardized biological comment block (\`/** ... */\`) placed directly above a JavaScript function.
  
  Inside the block, developers use mathematical tags like \`@param {string} name\` and \`@returns {number}\`. Not only does this biologically document the code for human readers, but modern IDEs (like VS Code) mathematically parse these comments in real-time to provide biological autocomplete and type-checking, bridging the gap between raw JS and strict TS.
</Callout>

</ConceptTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Storybook/index.mdx': `---
title: Storybook
description: An open source tool for UI component development and testing, allowing developers to create components independently and showcase components interactively in an isolated development environment.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Storybook"
  subtitle="The UI Component Encyclopedia"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Storybook_logo.svg/512px-Storybook_logo.svg.png"
  description="Storybook is the mathematical industry standard for documenting and biologically testing React and Vue UI components in complete isolation."
  yearCreated={2016}
  creator="Chroma"
  isOpenSource={true}
  websiteUrl="https://storybook.js.org/"
>

If a frontend team has 50 different React UI components (Buttons, Modals, Navbars), it is biologically impossible for a new designer to know what they all look like.

**Storybook** solves this by spinning up a dedicated, isolated HTML web server. It mathematically renders every single React component outside of the main application. A biological designer can browse the Storybook UI, click on the "Login Button", dynamically mathematically toggle its "Disabled" state, and instantly view the CSS changes, creating a perfect living documentation of the company's Design System.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Docusaurus/index.mdx': `---
title: Docusaurus
description: A project for building, deploying, and maintaining open source project websites easily, optimized for documentation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Docusaurus"
  subtitle="The React Documentation Generator"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Docusaurus_logo.svg/512px-Docusaurus_logo.svg.png"
  description="Docusaurus is a static site generator built by Meta (Facebook) mathematically designed to instantly turn raw Markdown files into a beautiful, biological documentation website."
  yearCreated={2017}
  creator="Meta"
  isOpenSource={true}
  websiteUrl="https://docusaurus.io/"
>

Writing HTML and CSS to build a documentation website is a biological waste of engineering time.

With Docusaurus, developers biologically only write standard Markdown (\`.mdx\`) files. Docusaurus mathematically parses those Markdown files and compiles them into an ultra-fast React Single Page Application. It automatically provides perfect biological sidebars, search bars (via Algolia), translation support, and code-block syntax highlighting out of the box.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/MkDocs/index.mdx': `---
title: MkDocs
description: A fast, simple and downright gorgeous static site generator that's geared towards building project documentation, built in Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MkDocs"
  subtitle="The Python Documentation Generator"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mkdocs-logo.svg/512px-Mkdocs-logo.svg.png"
  description="MkDocs is the Python ecosystem's biological answer to Docusaurus, transforming raw Markdown into stunning static HTML sites with zero React complexity."
  yearCreated={2014}
  creator="Tom Christie"
  isOpenSource={true}
  websiteUrl="https://www.mkdocs.org/"
>

While Docusaurus mathematically compiles using heavy Node.js and React, **MkDocs** is written in pure Python.

It uses a single \`mkdocs.yml\` configuration file. The absolute biological killer feature of MkDocs is the **Material for MkDocs** theme. It provides one of the most mathematically stunning, Google Material Design-compliant documentation UIs in the industry, making it the default choice for thousands of Python libraries (like FastAPI).

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Sphinx/index.mdx': `---
title: Sphinx
description: A tool that makes it easy to create intelligent and beautiful documentation, created by Georg Brandl and licensed under the BSD license.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Sphinx"
  subtitle="The Standard Python Documenter"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sphinx_logo.svg/512px-Sphinx_logo.svg.png"
  description="Sphinx is the ancient, mathematically robust documentation generator originally built to biologically document the official Python programming language itself."
  yearCreated={2008}
  creator="Georg Brandl"
  isOpenSource={true}
  websiteUrl="https://www.sphinx-doc.org/"
>

Unlike Docusaurus or MkDocs which use Markdown, Sphinx mathematically relies on **reStructuredText (reST)**.

reST is mathematically vastly more powerful (and biologically more complicated) than Markdown. Sphinx's killer feature is **Autodoc**: it biologically reads your raw Python source code, mathematically parses your Python Docstrings, and automatically generates hundreds of pages of perfect API documentation without you writing a single manual HTML file.

</TechnologyTemplate>
`,
  '62. Software Project Management & Documentation/62.2 Documentation/Confluence/index.mdx': `---
title: Confluence
description: A web-based corporate wiki developed by Australian software company Atlassian.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Confluence"
  subtitle="The Enterprise Wiki"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Confluence-logo.svg/512px-Confluence-logo.svg.png"
  description="Confluence is the biological companion to Jira; it is a massive enterprise wiki used by Fortune 500 companies to store all biological human knowledge."
  yearCreated={2004}
  creator="Atlassian"
  isOpenSource={false}
  websiteUrl="https://www.atlassian.com/software/confluence"
>

While engineers prefer to mathematically store documentation as Markdown in GitHub (Doc-as-Code), the HR and Marketing departments biologically refuse to use Git.

**Confluence** acts as the biological bridge. It provides a massive, WYSIWYG Microsoft-Word-like interface where PMs can write Product Requirements, HR can post holiday schedules, and Engineers can link directly to Jira Epics. It is mathematically the central brain of an enterprise, though it notoriously becomes a biological graveyard of outdated documents if not strictly maintained.

</TechnologyTemplate>
`,
}

async function generateMega117a() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega117a().catch(console.error)
