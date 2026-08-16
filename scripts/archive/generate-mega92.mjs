import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '50. Human-Computer Interaction & UX/HCI/index.mdx': `---
title: Human-Computer Interaction (HCI)
description: A multidisciplinary field of study focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Human-Computer Interaction (HCI)">

For the first 40 years of computing, computers were mathematically brutal. If you wanted to use a computer, you had to learn exactly how the computer's CPU processed punch cards. 

**Human-Computer Interaction (HCI)** completely inverted this paradigm. It is the scientific discipline that argues: *"The human should not adapt to the computer. The computer must be mathematically designed to adapt to the human."*

<Callout icon="info" title="A Multidisciplinary Science">
  HCI is not just programming. It is the intersection of three massive fields:
  1. **Computer Science:** What can the hardware and software mathematically execute?
  2. **Cognitive Psychology:** How does the human brain process visual information, memory, and spatial awareness?
  3. **Industrial Design:** How does the physical hardware (mouse, touchscreen, VR headset) biologically interface with the human hand?
</Callout>

## The Evolution of HCI

- **1970s (CLI):** Command Line Interfaces. The human had to memorize strict, unforgiving mathematical syntax.
- **1980s (WIMP):** Windows, Icons, Menus, Pointer. Invented by Xerox PARC, this paradigm shifted HCI from syntax memorization to visual, spatial recognition.
- **2000s (Touch):** The iPhone removed the abstract proxy of the mouse. The human mathematically interacts directly with the geometry of the screen.
- **2020s (Spatial Computing):** Augmented Reality and Neural Interfaces (BCI) mathematically integrating computing directly into the human physical environment.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/UX/index.mdx': `---
title: User Experience (UX)
description: How a person feels when interfacing with a system. It incorporates all aspects of the end-user's interaction with the company, its services, and its products.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Experience (UX)">

**User Experience (UX)** is not making things look pretty. It is the brutal, systematic engineering of human emotion and friction.

If a user opens an app, clicks a button, and the app takes 3 seconds to load, the user mathematically feels frustration. UX is the discipline of identifying that frustration and architecting a system to eliminate it.

<Callout icon="warning" title="UX is NOT UI">
  The biggest misconception in the industry is confusing UX (Experience) with UI (Interface).
  
  - **UI** is the saddle, the stirrups, and the reins.
  - **UX** is the feeling of riding the horse. 
  
  If a website has beautiful, breathtaking graphics (Great UI) but mathematically forces the user to click through 15 pages just to cancel a subscription, the UX is an absolute, engineered disaster (Dark Patterns).
</Callout>

## The ROI of UX

UX is not art; it is mathematics and economics. 
If an e-commerce checkout page is mathematically confusing, 30% of users will abandon their carts. By applying UX research to remove 1 form field, a company can mathematically increase annual revenue by $500,000. Good UX is invisible; bad UX physically costs money.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/UI/index.mdx': `---
title: User Interface (UI) Design
description: The design of user interfaces for machines and software, such as computers, home appliances, mobile devices, and other electronic devices, with the focus on maximizing usability and the user experience.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Interface (UI) Design">

If UX is the architectural blueprint of a house, **User Interface (UI) Design** is the physical drywall, the paint, the doorknobs, and the light switches.

It is the physical or digital layer where the biological human actually mathematically intersects with the computer's logic.

<Callout icon="tip" title="Affordance and Signifiers">
  The core of UI is rooted in the psychology of **Affordance**.
  - **Affordance:** The physical property of an object that tells you how to use it. A physical button "affords" pushing. A slider "affords" dragging.
  - **Signifier:** Because digital screens are perfectly flat glass, there are no true physical affordances. UI Designers must use mathematical **Signifiers** (drop shadows, gradients, hover states) to visually fake depth, tricking the human brain into understanding that a specific clump of pixels can be clicked.
</Callout>

## Skeuomorphism vs Flat Design

- **Skeuomorphism (2007-2013):** UI that mathematically mimics physical reality (e.g., Apple's old Notes app looked like a physical yellow legal pad with ripped paper). This was required to teach humans how to use touchscreens.
- **Flat Design / Material Design (2014-Present):** Once humans mathematically understood touchscreens, UI stripped away the fake leather textures, focusing entirely on pure geometric typography, bold colors, and spatial elevation (shadows) to convey hierarchy.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Cognitive load/index.mdx': `---
title: Cognitive Load
description: The total amount of mental effort being used in the working memory, which is critical in user interface design.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cognitive Load">

The human brain is a biological CPU. Its RAM (Working Memory) is mathematically incredibly limited. The average human can only hold about **7 (plus or minus 2)** discrete items in their working memory at one time.

**Cognitive Load** is the amount of mathematical processing power a software interface demands from the user's brain. 

<Callout icon="error" title="Intrinsic vs Extraneous Load">
  - **Intrinsic Load:** The unavoidable mental effort required to do the task. (e.g., filing your taxes is intrinsically complex. The math cannot be removed).
  - **Extraneous Load:** The completely unnecessary mental effort caused by terrible UI design. (e.g., forcing the user to memorize a 16-digit account number on Page 1, because Page 2 requires them to type it in). Good UX mathematically minimizes Extraneous Load to zero.
</Callout>

## Hick's Law

**Hick's Law** states that the time it takes for a human to make a decision mathematically increases logarithmically with the number of choices provided.

If a TV remote has 50 buttons, the user's cognitive load spikes, and they freeze. If you hide 45 of those buttons in an on-screen menu, leaving only the 5 essential buttons on the physical remote (like the Apple TV remote), you mathematically reduce cognitive load and increase usability.

</ConceptTemplate>
`,
  "50. Human-Computer Interaction & UX/Fitts's law/index.mdx": `---
title: Fitts's Law
description: A predictive model of human movement primarily used in human-computer interaction and ergonomics, which predicts that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fitts's Law">

**Fitts's Law** is a brutal, unyielding mathematical formula that predicts human biological movement. 

The law states: *The time it takes to move your mouse (or finger) to a target depends mathematically on the Distance to the target, and the Size of the target.*

<Callout icon="success" title="The Mathematics of Clicks">
  The formula is: \`T = a + b * log2(2D / W)\`
  - \`T\` = Time to complete the movement.
  - \`D\` = Distance from the starting point to the target.
  - \`W\` = Width of the target.
  
  **The UX Translation:** Make important buttons bigger, and put them closer to where the user's mouse currently is. 
</Callout>

## The Magic of the Screen Edge

Fitts's Law explains why the Mac OS Menu Bar is at the absolute top of the screen, and the Windows Start Menu is in the absolute bottom corner. 

Because the mouse cursor physically cannot leave the monitor, the edge of the screen is mathematically **infinitely large**. If a user violently throws their mouse to the bottom-left, the cursor mathematically stops exactly on the Start Menu. It requires absolutely zero precision, making it the fastest possible button to click on the entire screen.

</ConceptTemplate>
`,
  "50. Human-Computer Interaction & UX/Nielsen's heuristics/index.mdx": `---
title: Nielsen's Heuristics
description: Ten broad rules of thumb for interaction design developed by Jakob Nielsen, widely used for usability inspections.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Nielsen's 10 Usability Heuristics">

In 1994, Jakob Nielsen published 10 mathematical "Rules of Thumb" for Interface Design. Decades later, they remain the absolute gold standard for identifying UI/UX flaws.

<Callout icon="info" title="The Core Heuristics">
  Here are 4 of the most critical heuristics:
  1. **Visibility of System Status:** The system must always tell the user what is happening. If a file is uploading, mathematically show a progress bar. Do not leave the user guessing if the app crashed.
  2. **Match Between System and Real World:** Use words, phrases, and concepts familiar to the user. Do not use internal database error codes (\`Error 0x80040154\`). Use human language (*"We couldn't connect to the internet"*).
  3. **User Control and Freedom:** Humans make mistakes constantly. Every single action must have a mathematical "Emergency Exit" (e.g., an "Undo" button).
  4. **Consistency and Standards:** Users spend 99% of their time on *other* websites. Your website should mathematically work exactly like those other websites. Do not invent a new shape for a checkbox.
</Callout>

## Heuristic Evaluation

When a company hires a UX Consultant, the consultant does not randomly click around. They perform a **Heuristic Evaluation**. They systematically mathematically grade every single screen in the app against Nielsen's 10 rules, generating an objective, quantifiable report of the software's usability failures.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Interaction design/index.mdx': `---
title: Interaction Design (IxD)
description: The practice of designing interactive digital products, environments, systems, and services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interaction Design (IxD)">

While UI Design focuses on the static pixels, **Interaction Design (IxD)** focuses purely on the dimension of **Time**. 

It is the mathematical study of the "Conversation" between the human and the machine. When the human takes an action, exactly how does the machine respond?

<Callout icon="tip" title="The 5 Dimensions of IxD">
  Gillian Crampton Smith defined the 5 Dimensions of Interaction Design:
  1. **Words:** (Button labels, text). Should be simple to understand.
  2. **Visual Representations:** (Typography, diagrams, icons).
  3. **Physical Objects / Space:** (Is the user using a mouse at a desk, or their thumb on a shaking train?)
  4. **Time:** (Micro-animations, loading states). Does the button mathematically depress instantly when clicked?
  5. **Behavior:** The culmination of the previous 4. How does the system react to the user?
</Callout>

## Micro-Interactions

The absolute pinnacle of IxD is the **Micro-Interaction**. 

If you 'Like' a post on Twitter, the heart icon doesn't just instantly turn red. It mathematically explodes into a tiny, 200-millisecond particle animation. This provides instantaneous, visceral dopamine feedback to the human brain, confirming that the machine successfully mathematically received their input.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/Information architecture/index.mdx': `---
title: Information Architecture (IA)
description: The structural design of shared information environments; the art and science of organizing and labeling websites, intranets, online communities, and software to support usability and findability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Information Architecture (IA)">

If a software application has 10,000 distinct features, how do you organize them so a brand-new user can mathematically find the exact feature they need in less than 3 clicks?

This is the discipline of **Information Architecture (IA)**. It is the structural skeleton of the software.

<Callout icon="warning" title="Mental Models">
  IA is entirely based on the user's **Mental Model**. 
  
  If you are building an online grocery store, do you put "Tomatoes" in the "Vegetables" category or the "Fruits" category? Biologically, a tomato is a fruit. But the human *Mental Model* mathematically associates tomatoes with salads (Vegetables). If you put tomatoes under "Fruits", the user's cognitive load spikes, and the Information Architecture has failed.
</Callout>

## IA Methodologies

- **Card Sorting:** You write down 50 features on 50 physical index cards. You hand them to a user and say, "Group these cards into piles that make sense to you." If 90% of users group "Billing" and "Change Password" together, you mathematically know to create an "Account Settings" dropdown.
- **Tree Testing:** You mathematically strip away all UI graphics and present the user with a pure text-based tree of your menus. You ask them to find a specific item. If they click down the wrong branch, your IA is mathematically broken.

</ConceptTemplate>
`,
  '50. Human-Computer Interaction & UX/User research (Interviews, Surveys, Usability Studies)/index.mdx': `---
title: User Research
description: The systematic study of target users and their requirements, to add realistic contexts and insights to design processes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="User Research (UXR)">

The absolute golden rule of software engineering is: **You are not your user.**

A developer mathematically understands how the database works; therefore, they are biologically incapable of evaluating if the UI is confusing to a normal human. To bridge this gap, companies must perform rigorous **User Research**.

<Callout icon="info" title="Quantitative vs Qualitative">
  - **Quantitative (Math):** "What are people doing?" (Surveys, A/B Testing, Google Analytics). You can mathematically prove that 40% of users drop off at Page 3. But the math cannot tell you *why*.
  - **Qualitative (Emotion):** "Why are people doing it?" (User Interviews, Usability Studies). You sit down with 5 users and watch them use the app. You physically watch them get confused by a specific button label.
</Callout>

## The Usability Study

In a professional **Usability Study**, the researcher gives the user a specific task (e.g., "Try to reset your password"). 

The researcher physically does not help them. The researcher asks the user to "Think Aloud" (narrate their internal monologue). The session is mathematically recorded (screen capture + eye tracking). The goal is to identify the exact friction points where the user's mental model mathematically conflicts with the software's Information Architecture.

</ConceptTemplate>
`,
}

async function generateMega92() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega92().catch(console.error)
