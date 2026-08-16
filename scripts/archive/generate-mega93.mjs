import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '50. Human-Computer Interaction & UX/Personas/index.mdx': `---
title: User Personas
description: Fictional characters created based upon research in order to represent the different user types that might use a service, product, site, or brand in a similar way.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Personas">

If a software team tries to design a product for "Everyone," they will mathematically design a product for "No One." 

**User Personas** are highly specific, data-driven fictional characters that represent the target demographic. They provide a psychological anchor for the engineering and design teams.

<Callout icon="warning" title="Data-Driven vs Stereotypes">
  A bad Persona is a stereotype: *"Bob is 40 and likes golf."* This provides absolutely zero actionable data for software architecture.
  
  A mathematically valid Persona is derived entirely from **User Research Data**: *"Sarah, 32, ICU Nurse. Needs to input patient data in under 5 seconds while wearing surgical gloves under heavy fluorescent lighting. High stress, zero tolerance for complex nested menus."* This Persona instantly dictates the exact physical sizing of the UI buttons and the color contrast required.
</Callout>

## The Empathy Metric

Engineers are inherently logical. Without a Persona, an engineer will assume the user has a dual-monitor setup with a mechanical keyboard. 

A Persona physically forces the engineering team into the psychological state of the user. If a developer is arguing for a complex 5-page settings menu, the UX designer can objectively ask: *"Does Sarah the ICU Nurse have time to click through 5 pages?"* The Persona mathematically terminates subjective arguments.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Journey mapping/index.mdx': `---
title: User Journey Mapping
description: A visual representation of the process that a person goes through to accomplish a goal, tied to a specific business or product.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Journey Mapping">

A single software screen is just a static snapshot. A **User Journey Map** mathematically tracks the user's emotional and physical state over the dimension of *Time*.

It maps the exact sequence of steps a user takes from the moment they realize they have a problem, to the moment the software solves it (or fails to).

<Callout icon="tip" title="The Emotional Graph">
  A proper Journey Map includes a **Y-Axis of Emotion**.
  
  For an e-commerce app:
  1. **Discovery:** User finds the shoe. (Emotion: High)
  2. **Selection:** User picks the size. (Emotion: Neutral)
  3. **Checkout:** User is suddenly forced to create an account. (Emotion: Catastrophic drop). 
  
  By graphing emotion, the design team can mathematically identify the exact moment the software causes frustration and prioritize engineering resources to fix that specific bottleneck.
</Callout>

## Omnichannel Journeys

A Journey Map does not start when the user opens the app. It starts when the user sees a billboard, downloads the app on their phone, continues on their laptop, and eventually calls Customer Support. It maps the total, holistic biological interaction with the entire corporate ecosystem.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Wireframing/index.mdx': `---
title: Wireframing
description: A visual guide that represents the skeletal framework of a website or application.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Wireframing">

A **Wireframe** is the architectural blueprint of a user interface. It contains absolutely zero colors, zero typography, and zero graphics. It is composed entirely of grey boxes and lines.

<Callout icon="info" title="The Psychology of Grey Boxes">
  If you show a CEO a fully colored, high-fidelity design, human psychology guarantees they will argue about the shade of blue you chose for the button.
  
  If you show a CEO a grey Wireframe, they are biologically forced to ignore aesthetics and focus entirely on the **Information Architecture**. *"Why is the Login button at the bottom?" "Where does the sidebar go?"* Wireframing mathematically prevents teams from wasting time on aesthetics before the structural logic is locked in.
</Callout>

## Lo-Fi vs Mid-Fi

- **Lo-Fi (Low Fidelity):** Literally drawn on a physical napkin or whiteboard with a Sharpie. Used for rapid, 10-second ideation during meetings.
- **Mid-Fi (Medium Fidelity):** Built in a tool like Figma or Balsamiq using strict geometric grids. It mathematically locks down the spatial dimensions and layout ratios before the UI Artists begin painting.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Prototyping (low-high fidelity)/index.mdx': `---
title: Prototyping
description: An early sample, model, or release of a product built to test a concept or process.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Prototyping">

A Wireframe is a static picture. A **Prototype** is a mathematically interactive simulation. 

You cannot test if a workflow is frustrating by staring at a JPEG. You must physically give the user a screen and tell them to click the buttons. Prototypes allow teams to identify massive logical failures without spending $100,000 on engineering code.

<Callout icon="success" title="The Spectrum of Fidelity">
  - **Paper Prototypes:** You literally draw the app screens on 5 pieces of paper. When the user taps a "button" with their finger, you manually swap the paper to the next screen. Brutally simple, mathematically effective.
  - **Clickable Prototypes (Figma/InVision):** High-fidelity images linked together with hot-spots. It feels like a real app, but contains zero backend logic.
  - **Coded Prototypes:** Actual HTML/React code, but hardcoded to fake the database interactions. Used for complex micro-interactions or physics testing.
</Callout>

## The "Fail Fast" Philosophy

The mathematical purpose of a prototype is to fail. If a prototype succeeds instantly, you didn't need a prototype. The goal is to build a fake app in 2 days, watch 5 users completely misunderstand how to use it, and fix the design before handing it to a team of 10 developers who take 3 months to build the real thing.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Usability testing/index.mdx': `---
title: Usability Testing
description: A technique used in user-centered interaction design to evaluate a product by testing it on users.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Usability Testing">

**Usability Testing** is the brutal, objective reality check of the UX world. It is the mathematical process of placing a user in a room, handing them a prototype, and watching them fail.

<Callout icon="error" title="The Observer Effect">
  If you ask a user, *"Do you like this app?"*, they will mathematically lie to you to avoid hurting your feelings.
  
  Usability Testing is not a survey. It is observational. You do not ask if they like the app; you give them a task (*"Buy a pair of red shoes"*), and you physically measure:
  1. **Time on Task:** Did it take 30 seconds or 5 minutes?
  2. **Error Rate:** Did they click the wrong button?
  3. **Completion Rate:** Did they give up completely?
</Callout>

## The "Think Aloud" Protocol

The industry standard methodology is the **Think Aloud** protocol. 
The researcher forces the user to narrate every single thought in their head as they use the app. *"I'm looking for a search bar. I don't see one. I assume it's in this hamburger menu. Oh, it's not here. Now I'm frustrated."* This provides a direct, unedited psychological transcript of the Information Architecture's failure points.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Design systems/index.mdx': `---
title: Design Systems
description: A collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Design Systems">

If a massive company has 500 developers working on 20 different apps, how do you mathematically guarantee that every single 'Submit' button on every single app is the exact same shade of blue, with the exact same 4px border radius?

You cannot rely on communication. You must engineer a **Design System**.

<Callout icon="info" title="The Single Source of Truth">
  A Design System is not just a UI Kit in Figma. It is a strictly version-controlled mathematical architecture that bridges Design and Code.
  
  1. **Design Tokens:** The raw math. (\`color-primary: #0070f3\`, \`spacing-md: 16px\`).
  2. **Component Library:** The actual React/Vue code. A developer never writes \`<button>\`. They import \`<PrimaryButton>\` directly from the internal NPM package.
  3. **Documentation:** The rules. (e.g., *"Never use the PrimaryButton twice on the same screen."*)
</Callout>

## Atomic Design

Invented by Brad Frost, **Atomic Design** is the chemical mathematics of Design Systems:
- **Atoms:** The smallest indivisible units (A raw text input, a single icon, a color hex code).
- **Molecules:** Grouping Atoms together (A text input + a label + a search icon = A Search Bar).
- **Organisms:** Grouping Molecules together (A Search Bar + a Navigation Menu + a Logo = A Header).
- **Templates / Pages:** The final assembled layout.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Accessibility/index.mdx': `---
title: Digital Accessibility (a11y)
description: The inclusive practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities, situational disabilities, and socio-economic restrictions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital Accessibility (a11y)">

**Accessibility** (numeronym: **a11y**) is not a nice-to-have feature. In many countries, it is a strict legal requirement. 

It is the mathematical and architectural discipline of ensuring that a software system is 100% usable by humans with visual, motor, auditory, or cognitive disabilities.

<Callout icon="warning" title="The Screen Reader Reality">
  If a blind user visits a website, they cannot see the UI. They use a **Screen Reader** (like VoiceOver or NVDA) which mathematically reads the HTML DOM aloud.
  
  If a developer builds a button using a \`<div>\` with an \`onClick\` handler instead of a native \`<button>\` tag, the Screen Reader will mathematically assume it is just plain text. The blind user will physically not know the button exists, rendering the software completely broken. This is why **Semantic HTML** is a critical engineering requirement.
</Callout>

## The Curb Cut Effect

The greatest psychological truth of Accessibility is the **Curb Cut Effect**.
When cities physically cut slopes into sidewalks (Curb Cuts) to help people in wheelchairs, they discovered it massively helped people pushing strollers, people on bicycles, and people carrying heavy luggage. 

Designing software for extreme disabilities mathematically improves the UX for everyone. (e.g., High contrast text helps visually impaired users, but it also helps a 20-year-old trying to read their phone outside in the glaring sun).

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/WCAG guidelines/index.mdx': `---
title: WCAG Guidelines
description: Web Content Accessibility Guidelines are part of a series of web accessibility guidelines published by the Web Accessibility Initiative of the World Wide Web Consortium.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WCAG Guidelines">

The **Web Content Accessibility Guidelines (WCAG)** are the strict, internationally recognized mathematical standards for Digital Accessibility.

If a company is sued for discrimination because a blind user cannot use their app, the court of law mathematically evaluates the software against the WCAG 2.1 AA standard.

<Callout icon="tip" title="The POUR Principles">
  The entire WCAG specification is mathematically organized into 4 absolute principles (POUR):
  1. **Perceivable:** The user must be able to perceive the information. (If there is an image, there must be text \`alt\` data for a screen reader).
  2. **Operable:** The user must be able to operate the interface. (The entire website must be 100% navigable using only the \`Tab\` key on a keyboard, without a mouse).
  3. **Understandable:** The text must be readable and predictable.
  4. **Robust:** The code must be mathematically valid standard HTML so assistive technologies can parse it without crashing.
</Callout>

## The Mathematics of Color Contrast

WCAG is not subjective. It dictates strict mathematical ratios. 
To pass WCAG AA standards, normal text must have a mathematical contrast ratio of exactly **4.5:1** against its background. If a designer chooses a light grey text (\`#999\`) on a white background, the ratio is \`2.8:1\`. The design mathematically fails the legal accessibility requirement and must be rejected by the engineering team.

</ConceptTemplate>
`,
}

async function generateMega93() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega93().catch(console.error)
