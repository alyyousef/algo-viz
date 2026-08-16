import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Internal developer platforms/index.mdx': `---
title: Internal Developer Platforms (IDP)
description: A layer on top of the tech and tooling an engineering organization uses, designed to reduce cognitive load on developers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Internal Developer Platforms (IDP)">

In the 2010s, the "DevOps" philosophy mandated that Developers should also be System Administrators ("You build it, you run it"). 

This biologically failed. Forcing a Frontend React developer to mathematically understand Kubernetes ingress controllers, Terraform state files, and AWS IAM roles created overwhelming cognitive overload, crippling productivity.

<Callout icon="success" title="Platform as a Product">
  **Platform Engineering** emerged to fix this. 
  
  An organization creates a dedicated "Platform Team" that builds an **Internal Developer Platform (IDP)**. The IDP mathematically abstracts away the underlying infrastructure. It treats the internal developers as *customers*, providing them with a simplified, paved road to deploy their code without ever needing to touch raw Kubernetes YAML files.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Developer experience (DX)/index.mdx': `---
title: Developer Experience (DX)
description: The overall experience developers have while creating, maintaining, or testing software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Developer Experience (DX)">

**Developer Experience (DX)** is the mathematical measurement of how biologically painful it is to work at your company.

If a new hire takes 3 weeks to get their local Docker environment running, your DX is catastrophically low. If they can push code to production on their first afternoon, your DX is exceptionally high.

<Callout icon="tip" title="Metrics of DX">
  Platform Engineers optimize for DX by measuring mathematical metrics:
  1. **Time to First Commit:** How fast can a new hire compile the codebase?
  2. **Lead Time for Changes:** How long does the CI/CD pipeline take?
  3. **Cognitive Load:** How many different CLI tools does a developer have to memorize to do their job?
  
  High DX directly correlates to mathematical reductions in developer burnout and employee turnover.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Golden paths/index.mdx': `---
title: Golden paths
description: The recommended, supported, and documented way to build and deploy software within an organization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Golden Paths">

If an enterprise has 500 developers, and you allow them to choose whatever technology they want, you will end up with 500 different microservices written in Haskell, Rust, Python, and Ruby, using 14 different databases. The biological cost to maintain this is infinite.

<Callout icon="success" title="The Paved Road">
  A **Golden Path** is the mathematically optimized, heavily supported "Paved Road" provided by the Platform Team.
  
  For example, the Golden Path might be: *"A Node.js API using PostgreSQL, deployed via GitHub Actions."*
  
  Developers are technically *allowed* to go off the path and use Haskell with MongoDB, but if they do, they get zero support from the Platform Team and must mathematically write their own Kubernetes manifests. Because humans are biologically lazy, 99% of developers will voluntarily choose the Golden Path, naturally creating architectural standardization across the entire corporation.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Self-service infrastructure/index.mdx': `---
title: Self-service infrastructure
description: An operating model where developers can provision the infrastructure they need without having to open IT tickets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Self-Service Infrastructure">

Historically, if a developer needed a new PostgreSQL database, they had to biologically open a Jira ticket and wait 3 weeks for the Database Administrator (DBA) to manually provision it.

This mathematically destroyed agility.

<Callout icon="tip" title="API-Driven Provisioning">
  Platform Engineering solves this via **Self-Service Infrastructure**.
  
  The Platform Team writes Terraform modules that mathematically define secure, compliant infrastructure. They expose these modules through a web portal or API. When the developer needs a database, they click a button in a UI. The system automatically executes the Terraform code, creates the AWS RDS instance, and mathematically injects the database credentials directly into the developer's application in exactly 4 minutes. Zero Jira tickets required.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Developer portals/index.mdx': `---
title: Developer portals
description: A centralized hub that provides a comprehensive view of an organization's software ecosystem and facilitates self-service capabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Internal Developer Portals">

When an enterprise reaches 1,000 microservices, a massive biological problem occurs: **Nobody knows where anything is.**

If you are a developer tasked with calling the "Billing API", you don't know who owns it, what the endpoints are, or where the documentation lives.

<Callout icon="success" title="The Software Catalog">
  An **Internal Developer Portal** is the mathematical UI layer for the Internal Developer Platform (IDP).
  
  It acts as a single, centralized Wikipedia and dashboard for the entire engineering organization. It mathematically catalogs every microservice, showing its Git repository, its CI/CD status, its owner (e.g., Team Alpha), its API documentation (Swagger), and its production health metrics, completely eliminating biological silos.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Backstage/index.mdx': `---
title: Backstage
description: An open platform for building developer portals.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Backstage"
  subtitle="The industry standard Developer Portal"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Backstage-logo.svg/512px-Backstage-logo.svg.png"
  description="Created internally by Spotify to manage their massive microservice sprawl, Backstage was open-sourced and became the absolute mathematical standard for building Internal Developer Portals."
  yearCreated={2020}
  creator="Spotify"
  isOpenSource={true}
  websiteUrl="https://backstage.io/"
>

Backstage is not a finished product; it is a mathematical *framework* (written in React and Node.js) for building your own portal.

<Callout icon="info" title="The Plugin Ecosystem">
  Backstage's true mathematical power is its Plugin architecture.
  
  It allows the Platform Team to embed third-party tools directly into the UI. A developer can open Backstage and simultaneously view their Kubernetes pod logs, their GitHub Pull Requests, their Datadog metrics, and their PagerDuty alerts, all in a single pane of glass without ever switching browser tabs.
</Callout>

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.2 Platform Engineering/Platform APIs/index.mdx': `---
title: Platform APIs
description: Interfaces that abstract underlying infrastructure and provide developers with programmable access to platform capabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Platform APIs">

If a developer portal (like Backstage) is the graphical UI of the Internal Developer Platform (IDP), the **Platform API** is the underlying mathematical engine.

A true platform must be mathematically programmable.

<Callout icon="warning" title="Automation over UI">
  While a junior developer might click a button in Backstage to provision a new microservice, a senior engineer will want to automate it.
  
  A Platform API exposes endpoints like \`POST /api/v1/provision-service\`. This allows the senior engineer to mathematically write a Python script that automatically scaffolds 10 new microservices simultaneously, registers them in the Software Catalog, and configures their CI/CD pipelines, proving that the Platform acts as a true Infrastructure-as-Software layer.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega106() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega106().catch(console.error)
