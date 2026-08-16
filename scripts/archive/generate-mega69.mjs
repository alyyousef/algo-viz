import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '42. Cybersecurity Fundamentals/Threats/index.mdx': `---
title: Threats
description: Any circumstance or event with the potential to adversely impact organizational operations through an information system via unauthorized access, destruction, disclosure, or modification of information.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cybersecurity Threats">

In the lexicon of cybersecurity, terms like "Threat," "Vulnerability," and "Risk" are often used interchangeably by laymen, but they have distinct mathematical definitions.

A **Threat** is *what* you are defending against. It is the external actor or event that possesses the intent and capability to cause harm. A threat exploits a vulnerability to cause a negative impact.

<Callout icon="warning" title="The Threat Equation">
  Risk = Threat × Vulnerability × Impact
  
  If there is a massive Threat (a hurricane), but you have zero Vulnerability (your datacenter is in a bunker in Ohio), your Risk is zero. If you have a massive Vulnerability (a zero-day flaw in your web server), but zero Threat (the server is completely disconnected from the internet), your Risk is also zero.
</Callout>

## Categorization of Threat Actors

Threat actors are typically categorized by their motivation, funding, and mathematical sophistication:

<ComparisonTable 
  headers={['Threat Actor', 'Motivation', 'Sophistication Level']}
  rows={[
    ['Script Kiddies', 'Notoriety, boredom, vandalism.', 'Low. They do not write their own code; they mathematically blindly run tools downloaded from the internet (like Low Orbit Ion Cannon).'],
    ['Hacktivists', 'Political or social change. (e.g., Anonymous).', 'Medium. Usually rely on massive DDoS attacks or website defacement to embarrass a target.'],
    ['Cybercriminals', 'Financial gain.', 'High. Highly organized syndicates running Ransomware-as-a-Service (RaaS) operations, pulling in billions of dollars.'],
    ['Advanced Persistent Threats (APTs)', 'Espionage, intellectual property theft, cyberwarfare.', 'Extreme. State-sponsored hackers (e.g., NSA, Fancy Bear). They have unlimited funding, develop their own mathematical zero-days, and can remain hidden in a network for years.']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/Risk assessment/index.mdx': `---
title: Risk Assessment
description: The process of identifying, analyzing, and evaluating risk in an organization's IT infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Risk Assessment">

In the business world, perfect security is mathematically impossible without going bankrupt. The goal of a CISO is not to eliminate risk, but to manage it.

A **Risk Assessment** is the formal, mathematical process of identifying the assets your company owns, the threats against those assets, the vulnerabilities those assets possess, and the potential financial impact if a breach occurs.

<Callout icon="success" title="Risk Treatment Options">
  Once a risk is mathematically quantified, the business has four choices:
  1. **Mitigate:** Implement security controls to reduce the risk (e.g., buying a firewall).
  2. **Transfer:** Buy cybersecurity insurance to shift the financial burden.
  3. **Avoid:** Shut down the vulnerable system entirely.
  4. **Accept:** Acknowledge the risk exists, but mathematically decide that the cost of fixing it is higher than the cost of a breach.
</Callout>

## Quantitative vs. Qualitative Assessment

<ComparisonTable 
  headers={['Methodology', 'Description', 'Example']}
  rows={[
    ['Qualitative Risk Assessment', 'Subjective, scenario-based evaluation using a matrix (High/Medium/Low). Faster to perform but less precise.', 'Risk = Likelihood (Medium) × Impact (High) = High Risk.'],
    ['Quantitative Risk Assessment', 'Purely mathematical evaluation using hard dollar amounts. Difficult to calculate accurately, but easier for the Board of Directors to understand.', 'SLE (Single Loss Expectancy: $10k) × ARO (Annual Rate of Occurrence: 5) = ALE (Annual Loss Expectancy: $50,000).']
  ]}
/>

</ConceptTemplate>
`,
  '42. Cybersecurity Fundamentals/Security frameworks (NIST, ISO 27001, CIS Controls)/index.mdx': `---
title: Security Frameworks (NIST, ISO 27001, CIS)
description: Documented processes that define policies and procedures around the implementation and ongoing management of information security controls.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Security Frameworks">

Building a cybersecurity program from scratch based purely on intuition is mathematically guaranteed to result in massive blind spots.

**Security Frameworks** provide established, mathematically rigorous blueprints for how to secure an organization. They offer a comprehensive checklist of controls that have been battle-tested by governments and global enterprises.

<Callout icon="tip" title="Compliance vs. Security">
  Being "Compliant" with a framework does not mathematically mean you are 100% "Secure." Compliance is a baseline; it proves to auditors and customers that you are doing the bare minimum required by industry standards. Security is the actual ongoing operational battle.
</Callout>

## The "Big Three" Frameworks

<ComparisonTable 
  headers={['Framework', 'Origin', 'Focus & Characteristics']}
  rows={[
    ['NIST Cybersecurity Framework (CSF)', 'US Government', 'The gold standard for the US private sector. Divided into five core mathematical functions: Identify, Protect, Detect, Respond, Recover. Highly flexible and risk-based.'],
    ['ISO/IEC 27001', 'International', 'The globally recognized standard for an Information Security Management System (ISMS). Focuses heavily on mathematical policies, governance, and continuous improvement. Organizations can actually get "Certified" in ISO 27001.'],
    ['CIS Controls', 'Center for Internet Security', 'A highly prescriptive, prioritized list of 18 specific technical controls. It mathematically tells you *exactly* what to do first (e.g., Control #1: Maintain an inventory of enterprise assets).']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega69() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega69().catch(console.error)
