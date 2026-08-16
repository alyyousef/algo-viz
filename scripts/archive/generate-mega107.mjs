import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Cloud cost management/index.mdx': `---
title: Cloud Cost Management (FinOps)
description: The practice of managing and optimizing the costs associated with cloud computing resources.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud Cost Management (FinOps)">

In a legacy data center, the CFO mathematically controlled the budget because a developer had to ask permission to physically buy a $10,000 Dell server.

In the Cloud-Native era, a junior developer can accidentally write a mathematical infinite loop in a Terraform script and dynamically provision 500 massive AWS EC2 instances, generating a $50,000 AWS bill over the weekend before anyone notices. 

<Callout icon="warning" title="The FinOps Philosophy">
  **FinOps** (Financial Operations) is the mathematical discipline that bridges Engineering, Finance, and Business. 
  
  It operates on the principle that cloud costs are a first-class engineering metric, just like CPU usage or API latency. Developers must take biological ownership of the cloud costs they generate, and architecture must be mathematically designed for financial efficiency, not just raw performance.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Tagging strategy/index.mdx': `---
title: Tagging strategy
description: A standardized system of applying metadata to cloud resources for tracking, management, and cost allocation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tagging Strategy">

If your company gets a $200,000 AWS bill at the end of the month, the CFO will biologically ask: *"Who spent this money?"*

If you just have 1,000 raw EC2 instances, it is mathematically impossible to know if the "Data Science" team or the "Frontend" team generated the cost. 

<Callout icon="success" title="The Foundational Metric">
  A **Tagging Strategy** is the absolute foundation of FinOps. 
  
  Every single cloud resource (VMs, S3 buckets, Databases) must be mathematically tagged with metadata (e.g., \`Team: Backend\`, \`Environment: Production\`, \`Project: Project-X\`). 
  
  By enforcing mandatory tagging (usually via automated Terraform policies), the AWS Billing Dashboard can mathematically group costs. The CFO can see exactly that Team Backend spent $150,000 and the Data Science team spent $50,000, enabling precise accountability.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Cost allocation/index.mdx': `---
title: Cost allocation
description: The process of assigning incurred cloud costs to the specific business units, projects, or teams responsible for them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cost Allocation">

Once a strict Tagging Strategy is implemented, the finance team can perform **Cost Allocation**.

Cost allocation is the mathematical process of dividing the massive aggregate AWS invoice and biologically charging the individual departments (marketing, engineering, sales) against their internal budgets. 

<Callout icon="info" title="The Shared Resources Problem">
  Cost allocation is mathematically easy for isolated EC2 servers (just look at the tag). 
  
  However, it becomes incredibly difficult for **Shared Resources** like a massive Kubernetes cluster. If 5 different teams run microservices on the same 10 EC2 nodes, who pays the bill? FinOps tools must mathematically hook into the K8s API, measure the exact CPU and RAM usage of each team's specific containers, and allocate the fractional cost of the underlying EC2 nodes accordingly.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Budgets/index.mdx': `---
title: Budgets
description: Predefined financial thresholds set for cloud spending over a specific period.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud Budgets">

In the cloud, resources are theoretically infinite. If you don't constrain them, the mathematical spending potential is infinite.

**Budgets** are the biological constraints placed on engineering teams.

<Callout icon="tip" title="Proactive Constraints">
  A cloud budget is not just a spreadsheet; it is a mathematical rule configured directly in the cloud provider (e.g., AWS Budgets).
  
  You can set a hard limit: *"Team Alpha is allowed $5,000 per month."*
  If Team Alpha provisions resources that mathematically project to exceed $5,000 by the 25th of the month, the cloud provider will automatically trigger a PagerDuty alert to the Engineering Manager, forcing them to halt deployments or shut down idle testing environments before the invoice is finalized.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Cost anomaly detection/index.mdx': `---
title: Cost anomaly detection
description: Machine learning-based monitoring systems that identify unexpected spikes in cloud spending in real-time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cost Anomaly Detection">

If a junior developer accidentally exposes an AWS Access Key on GitHub, hackers will biologically steal it within 4 seconds and spin up 500 massive GPU servers to mine Bitcoin. 

If you wait for the end-of-the-month invoice to notice, your company is mathematically bankrupt.

<Callout icon="warning" title="Algorithmic Defense">
  **Cost Anomaly Detection** uses Machine Learning to establish a mathematical baseline of your normal daily spending patterns (e.g., spending $100/day on EC2, mostly between 9 AM and 5 PM).
  
  If the API mathematically detects a sudden spike of $500 in a single hour at 3:00 AM on a Sunday, the ML algorithm flags it as a severe anomaly and triggers critical Slack/SMS alerts instantly, allowing engineers to biologically kill the compromised servers before the bill reaches $10,000.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Rightsizing/index.mdx': `---
title: Rightsizing
description: The process of matching cloud instance types and sizes to the workload performance and capacity requirements at the lowest possible cost.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rightsizing">

Engineers are biologically prone to over-provisioning. If they are unsure how much RAM a Java application needs, they will simply request a massive \`t3.2xlarge\` instance (32GB RAM) "just to be safe." 

If the application actually only uses 4GB of RAM, you are mathematically wasting 87% of the server's cost every single month.

<Callout icon="success" title="The Optimization Phase">
  **Rightsizing** is the core optimization phase of FinOps. 
  
  Automated tools (like AWS Compute Optimizer) mathematically analyze the historical CPU and RAM utilization of every server over a 30-day period. If the CPU rarely exceeds 15%, the tool biologically recommends downgrading the server to a \`t3.large\`. Rightsizing requires zero architectural changes and often results in immediate 40% mathematical cost reductions.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Reserved instances/index.mdx': `---
title: Reserved instances
description: A cloud pricing model where customers commit to a specific instance type and region for a term in exchange for significant discounts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reserved Instances (RIs)">

By default, cloud computing uses **On-Demand** pricing. You pay mathematically by the hour, but you pay the absolute highest premium rate for the biological privilege of being able to cancel at any second.

<Callout icon="tip" title="The 1-Year Commitment">
  If you have a production database that you *know* will mathematically run 24/7/365 for the next year, paying On-Demand prices is financial malpractice.
  
  You can mathematically purchase a **Reserved Instance (RI)**. You biologically sign a contract with AWS saying: *"I promise to pay for this specific server type for the next 12 months."* In exchange for giving AWS mathematical revenue certainty, they give you an automatic **40% to 70% discount** on the hourly rate.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Savings plans/index.mdx': `---
title: Savings plans
description: A flexible pricing model that offers lower prices on compute usage in exchange for a commitment to a consistent amount of usage (measured in $/hour) for a 1 or 3 year term.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Savings Plans">

Reserved Instances (RIs) were mathematically inflexible. If you bought an RI for a Linux server in New York, you couldn't biologically move it to London or switch it to a Windows server without losing your discount.

AWS introduced **Savings Plans** to fix this.

<Callout icon="success" title="Financial Flexibility">
  Instead of committing to a specific *server type*, a Savings Plan requires you to mathematically commit to a specific *dollar amount*.
  
  You sign a contract saying: *"I promise to spend exactly $100/hour on compute for the next 3 years."* 
  
  AWS grants you massive 50% discounts on *all* compute. If you migrate your architecture from legacy EC2 instances to Serverless Lambda, or move your data center from New York to Tokyo, the mathematical discount biologically follows you. It is the modern standard for enterprise cloud discounts.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Forecasting/index.mdx': `---
title: Forecasting
description: The practice of predicting future cloud computing spend based on historical trends, upcoming projects, and business growth metrics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Forecasting">

The CFO mathematically requires predictability. If the engineering cloud bill is $100,000 this month, the CFO needs to know biologically if it will be $110,000 or $300,000 six months from now in order to secure corporate funding.

<Callout icon="info" title="The Prediction Math">
  **Forecasting** mathematically combines historical data with business projections. 
  
  If the application costs $0.10 to serve 1 user, and the Marketing Team predicts user growth of 200,000 over the next quarter, the FinOps team can mathematically forecast an exact cloud budget increase of $20,000. It transforms the cloud bill from a biological "black box surprise" into a predictable financial instrument.
</Callout>

</ConceptTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.3 FinOps/Unit economics/index.mdx': `---
title: Unit economics
description: The practice of measuring cloud spend against a specific business metric (e.g., cost per transaction, cost per active user).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud Unit Economics">

The absolute Holy Grail of FinOps is **Unit Economics**.

If your AWS bill increases from $100,000 to $150,000, is that biologically "bad"? You cannot mathematically answer that question using only raw dollars.

<Callout icon="success" title="The True Value Metric">
  If the bill went up because a developer left an idle server running, it is mathematically bad. 
  
  But if the bill went up because your startup acquired 50,000 new paying customers, it is mathematically *fantastic*. 
  
  **Unit Economics** measures the cost *per business unit*. Instead of tracking "$150,000 total", you track: **"$0.05 per API transaction"** or **"$2.10 per Active User"**. If the total bill goes up, but the Cost Per User mathematically goes *down*, the engineering team is successfully optimizing the architecture for hyper-growth.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega107() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega107().catch(console.error)
