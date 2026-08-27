import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/On-call practices/index.mdx': `---
title: On-Call Practices
description: The operational and psychological methodologies used to manage engineering rotations for responding to out-of-hours production incidents, prioritizing human well-being to prevent burnout while ensuring rapid system recovery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="On-Call Practices"
  subtitle="Sustainable Incident Response"
  tags={['SRE', 'Operations', 'Culture', 'Management']}
>

If an engineer is woken up by a PagerDuty alert at 3:00 AM every night for a week, they will mathematically burn out and resign. On-call practices are the SRE guidelines designed to prevent this attrition.

## 1. Alert Fatigue and Actionability
The most critical rule of on-call is: **Never page a human for something that does not require immediate human intervention.**
If CPU spikes to 95% but user latency remains unaffected, it is an anti-pattern to trigger a page. The system should page based strictly on **SLO violations** (e.g., "The user error rate has crossed 5%"). By ruthlessly deleting unactionable alerts, SREs eliminate "Alert Fatigue," ensuring that when a pager does go off, the engineer knows it is a legitimate mathematical emergency.

## 2. Compensation and Follow-the-Sun
Being on-call is a massive psychological burden. Modern SRE practices address this structurally:
- **Compensation**: Engineers must be financially compensated for the hours they carry the pager, regardless of whether it rings.
- **Follow-the-Sun**: Global companies eliminate 3:00 AM pages entirely by rotating the pager mathematically across time zones. When it is 3:00 AM in New York, the pager is held by the engineering team in Sydney, where it is 5:00 PM, guaranteeing that engineers only handle incidents during their normal biological waking hours.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Postmortems/index.mdx': `---
title: Postmortems
description: The rigorous, blameless written analysis conducted after a production incident, mathematically investigating the root cause, timeline, and architectural flaws to prevent the exact same failure from ever occurring again.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Postmortems"
  subtitle="The Blameless Analysis of Failure"
  tags={['SRE', 'Culture', 'Process', 'Continuous Improvement']}
>

A production outage is a highly expensive tuition fee paid by the company. The Postmortem is the mathematical process of extracting the educational value from that expensive tuition.

## 1. The Blameless Philosophy
The foundational rule of an SRE postmortem is that it must be **blameless**.
If the analysis concludes: *"Dave deleted the production database, therefore Dave is the problem,"* the organization learns nothing. The mathematically correct analysis is: *"Why did the system allow a human named Dave to execute a destructive command without a secondary automated safeguard?"* By removing the fear of punishment, engineers are incentivized to provide perfect, honest timelines of the outage.

## 2. The Five Whys and Action Items
The postmortem uses the **Five Whys** framework to drill down to the absolute mathematical root cause.
*Problem: The website went down.*
1. Why? The database locked up.
2. Why? The connection pool was exhausted.
3. Why? A new microservice opened too many connections.
4. Why? The load balancer routed 100% of traffic to it instead of 10%.
5. Why? The Terraform deployment script lacked a validation check for canary routing.
The outcome is not a reprimand. The outcome is a mathematical **Action Item**: *"Write a Terraform validation test to strictly enforce canary routing percentages."*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Reliability/index.mdx': `---
title: Reliability
description: The fundamental, overarching mathematical measurement of how consistently a system performs its intended function under expected and unexpected conditions without experiencing catastrophic failure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Reliability"
  subtitle="The Most Important Feature"
  tags={['SRE', 'Architecture', 'Quality', 'Metrics']}
>

Google SRE famously states: *"Reliability is the most important feature of any system."* If a web application has the most beautiful UI and the fastest algorithms in the world, but the server returns an HTTP 500 Error, the mathematical value of all other features is zero.

## 1. MTBF and MTTR
Reliability is mathematically quantified using two primary metrics:
- **MTBF (Mean Time Between Failures)**: How long does the system run perfectly before it crashes? (e.g., the system crashes once every 3 months).
- **MTTR (Mean Time To Recovery)**: When it does crash, how fast can you fix it? (e.g., it takes 5 minutes to restore service).
Traditional IT focused almost entirely on increasing MTBF (trying to build perfect, unbreakable servers). Modern Cloud SRE mathematically accepts that servers will eventually break, and therefore focuses heavily on decreasing MTTR (using automated failovers) to achieve high reliability.

## 2. The Cost Curve
Reliability is an asymptotic mathematical curve.
Achieving 99% reliability is cheap. Pushing from 99% to 99.9% costs $10,000. Pushing from 99.9% to 99.999% (Five Nines, equating to 5 minutes of downtime *per year*) requires multi-region active-active database replication and costs millions of dollars. SRE is the mathematical practice of determining exactly where on that cost curve the business actually needs to be.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Resilience engineering/index.mdx': `---
title: Resilience Engineering
description: The proactive architectural discipline of designing distributed systems that mathematically anticipate, absorb, and automatically recover from underlying hardware or software failures without impacting the end user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Resilience Engineering"
  subtitle="Designing for Inevitable Failure"
  tags={['SRE', 'Architecture', 'Design Patterns', 'Cloud']}
>

Reliability is the *outcome* (the system stays up). Resilience Engineering is the *mathematical method* used to achieve that outcome in a chaotic cloud environment where network cables are constantly cut and hard drives constantly fail.

## 1. Architectural Bulkheads
Resilience relies on the mathematical concept of **Bulkheads** (borrowed from ship design).
If a microservice handles both "User Logins" and "Generating PDF Invoices," and the PDF generator mathematically consumes 100% of the CPU and crashes, the entire service dies, preventing users from logging in. 
Resilience Engineering dictates separating these into distinct microservices (Bulkheads). If the PDF generator crashes, the Login service remains mathematically isolated and perfectly functional, degrading the user experience gracefully rather than catastrophically.

## 2. Circuit Breakers and Retries
When a microservice calls a slow database, if it blindly waits, it will mathematically exhaust its own connection pool and crash.
Resilience engineers implement **Circuit Breakers**. If the database fails 5 times in a row, the circuit breaker mathematically "trips" (opens). The microservice stops calling the database entirely and instantly returns a cached response or an error, saving its own CPU threads. Every 30 seconds, it sends a single test ping. When the database recovers, the circuit mathematically closes, and traffic resumes safely.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/RPO/index.mdx': `---
title: RPO (Recovery Point Objective)
description: A strict mathematical metric defining the maximum acceptable amount of data loss (measured in time) a business can endure during a catastrophic failure before severe financial or operational damage occurs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="RPO (Recovery Point Objective)"
  subtitle="Mathematical Data Loss Tolerance"
  tags={['SRE', 'Disaster Recovery', 'Databases', 'Metrics']}
>

If a datacenter is destroyed by an earthquake, how much data are you allowed to lose? The Recovery Point Objective (RPO) is the mathematical answer to this business question, dictating the entire database backup architecture.

## 1. High RPO (24 Hours)
If a blog has an RPO of 24 hours, the engineering architecture is mathematically cheap and simple.
An engineer configures a daily CRON job to dump the MySQL database to an AWS S3 bucket at 2:00 AM. If the server explodes at 1:00 AM the next day, they lose 23 hours of blog posts. The business mathematically accepts this loss, and the infrastructure cost remains incredibly low.

## 2. Zero RPO (Zero Data Loss)
If a financial banking application has an RPO of zero (no data loss is mathematically acceptable), daily backups are useless.
The architecture becomes exponentially more complex and expensive. The engineers must implement **Synchronous Cross-Region Replication**. When a user deposits $100, the primary database in New York writes the transaction, transmits it over fiber optic cables to the replica database in London, waits for London to mathematically acknowledge the write, and *then* tells the user the deposit was successful. If New York explodes a millisecond later, London has the exact mathematical data, achieving an RPO of zero at the cost of high latency and massive network expenses.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/RTO/index.mdx': `---
title: RTO (Recovery Time Objective)
description: A strict mathematical metric defining the maximum acceptable duration of time a system can be completely offline following a disaster before the business suffers catastrophic financial or reputational consequences.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="RTO (Recovery Time Objective)"
  subtitle="Mathematical Downtime Tolerance"
  tags={['SRE', 'Disaster Recovery', 'Architecture', 'Metrics']}
>

While RPO answers "How much data can we lose?", the Recovery Time Objective (RTO) mathematically answers "How long can we afford to be completely offline while we try to fix it?"

## 1. The Cost of Speed
If an internal HR system has an RTO of 48 hours, the Disaster Recovery architecture is mathematically simple.
If the server dies, the IT team has 2 days to order a new physical server, wait for FedEx to deliver it, install Linux, and restore from a backup. The cost is low.
If an e-commerce site generates $10,000 per minute, the RTO must be 1 minute. You cannot wait for FedEx. You are mathematically forced into a "Hot Standby" architecture.

## 2. Active-Passive vs Active-Active
To achieve near-zero RTO, engineers utilize distinct mathematical routing architectures:
- **Active-Passive (Warm Standby)**: Production runs in AWS Virginia. A duplicate set of servers runs in AWS Ohio, but they are scaled down and receiving zero traffic. If Virginia dies, an automated script scales up Ohio and flips the DNS. RTO: 5 to 10 minutes.
- **Active-Active (Hot Standby)**: Both Virginia and Ohio are fully scaled up, taking 50% of the traffic mathematically via a global load balancer. If Virginia dies, the load balancer instantly routes 100% of traffic to Ohio. RTO: 3 seconds. The mathematical cost is doubling your monthly AWS bill.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/Runbooks/index.mdx': `---
title: Runbooks
description: Highly structured, explicit mathematical manuals containing step-by-step procedures that on-call engineers use to diagnose and resolve specific production incidents rapidly, minimizing cognitive load during high-stress outages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Runbooks (Playbooks)"
  subtitle="Algorithmic Incident Resolution"
  tags={['SRE', 'Operations', 'Documentation', 'Process']}
>

When a junior engineer is paged at 3:00 AM because the "Redis Cluster is OOM (Out of Memory)", their brain is mathematically impaired by sleep deprivation. They cannot invent a solution on the fly. They need an explicit algorithm to follow.

## 1. The Mathematical Flowchart
A Runbook is an algorithmic flowchart.
It explicitly states:
1. Run TICK1redis-cli info memoryTICK1 to verify the mathematical OOM state.
2. Check the Datadog dashboard (Link provided) to see if a specific microservice is writing too much data.
3. If yes, temporarily disable the microservice using this specific API call (Curl command provided).
4. If no, scale the Redis cluster by executing this specific Terraform command.
By providing exact, copy-pasteable mathematical commands, the Runbook eliminates guesswork and drastically reduces the Mean Time To Recovery (MTTR).

## 2. Executable Runbooks
The modern evolution of SRE is the **Executable Runbook**.
Instead of a static Wiki page, tools like Jupyter Notebooks or specialized SRE platforms (like PagerDuty Process Automation) allow the Runbook to be code. The engineer clicks a button in the Runbook, and the platform mathematically executes the diagnostic scripts against the production server automatically, presenting the results directly in the document.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/SLAs/index.mdx': `---
title: SLAs (Service Level Agreements)
description: Legally binding mathematical contracts between a service provider and a customer, stipulating the exact level of reliability expected and the financial penalties (credits) incurred if the provider fails to meet that standard.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SLAs (Service Level Agreements)"
  subtitle="The Legal Mathematics of Reliability"
  tags={['SRE', 'Business', 'Contracts', 'Metrics']}
>

While SLIs and SLOs are internal engineering metrics, the Service Level Agreement (SLA) is the mathematical document drafted by lawyers and signed by executives.

## 1. The Financial Penalty
An SLA translates technical reliability into mathematical financial risk.
For example, AWS provides an SLA for Amazon S3 guaranteeing 99.9% uptime. If AWS suffers an outage and S3 mathematically drops to 99.0% uptime for a given month, the SLA contract mandates that AWS must mathematically calculate and issue a 10% financial service credit back to every affected customer. If it drops below 95%, they owe a 100% credit.

## 2. SLA vs SLO
Because the SLA carries massive financial penalties, the engineering team's internal SLO (Service Level Objective) must mathematically be stricter than the legal SLA.
If the lawyers sign an SLA of 99.9%, the engineering team will internally target an SLO of 99.95%. This creates a mathematical buffer zone. If an outage occurs and the system drops to 99.92%, the engineers have missed their internal goal and will freeze deployments (Error Budgets), but they have mathematically avoided triggering the catastrophic financial penalties of the SLA.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/SLIs/index.mdx': `---
title: SLIs (Service Level Indicators)
description: The specific, quantitative mathematical metrics chosen by engineers to accurately measure the actual performance and reliability of a service from the perspective of the end user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SLIs (Service Level Indicators)"
  subtitle="Mathematical Performance Measurement"
  tags={['SRE', 'Metrics', 'Monitoring', 'Observability']}
>

You cannot manage what you cannot mathematically measure. A Service Level Indicator (SLI) is the absolute foundational metric upon which all SRE practices (SLOs, SLAs, and Error Budgets) are built.

## 1. The Mathematical Ratio
An SLI is almost always expressed as a mathematical ratio representing a percentage of success:
TICK1(Number of Successful Events / Total Number of Events) * 100TICK1

If an API receives 1,000 HTTP requests in a minute, and 999 return a 200 OK, the Availability SLI is mathematically **99.9%**.

## 2. Choosing the Right SLI
The hardest part of SRE is choosing an SLI that mathematically represents the *user's* pain.
If you use "Server CPU usage < 80%" as an SLI, it is a mathematical failure. The user does not care about your CPU. They care if the page loads. 
Therefore, Google SRE defines standard SLIs:
- **Availability SLI**: The proportion of HTTP requests that do not return a 5xx error.
- **Latency SLI**: The proportion of HTTP requests that successfully complete in under 200 milliseconds.
If these specific mathematical indicators drop, you know for a fact the user is suffering.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/39. Web Servers, Proxies & Observability/39.3 Site Reliability Engineering/SLOs/index.mdx': `---
title: SLOs (Service Level Objectives)
description: The specific mathematical target values set for an SLI, representing the optimal balance of reliability that keeps users happy without unnecessarily slowing down the velocity of feature development.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SLOs (Service Level Objectives)"
  subtitle="The Target of Reliability"
  tags={['SRE', 'Metrics', 'Goals', 'Management']}
>

If the SLI is the mathematical speedometer (telling you that you are going 65 mph), the Service Level Objective (SLO) is the speed limit sign (dictating that your target is exactly 65 mph). 

## 1. Setting the Target
An SLO is an internal agreement between the Product Manager and the Engineering team.
They look at the SLI (e.g., Latency: % of requests under 200ms) and establish a mathematical target: *"Our SLO is that 99% of all requests must complete in under 200ms over a rolling 30-day window."*
This mathematical target defines exactly what "success" looks like for the engineering team.

## 2. The Danger of 100%
The most critical rule of setting an SLO is that the mathematical target must **never be 100%**.
If a Product Manager demands 100% uptime, they are demanding the impossible. Hard drives mathematically fail. Networks mathematically drop packets. Setting a 100% SLO guarantees failure and prevents the team from ever deploying new code. 
By setting an SLO of 99.9%, the business mathematically acknowledges that 0.1% failure is perfectly acceptable. This 0.1% delta directly creates the **Error Budget**, giving developers the mathematical freedom to push new code and take risks.

</ConceptTemplate>
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
