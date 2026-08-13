import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/UX/index.mdx': `---
title: UX (User Experience)
description: "How a person feels when interacting with a system, encompassing all aspects of the end-user's interaction with the company, its services, and its products."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="User Experience (UX)">

**User Experience (UX)** is a broad, multidisciplinary field that goes far beyond just "making an app look nice." It is the holistic sum of every interaction a user has with a product, from the moment they discover it, to the onboarding process, to achieving their goal, to customer support.

If UI is the "saddle, stirrups, and reins," UX is the "feeling you get when riding the horse."

## UX vs UI

These terms are often used interchangeably in job titles (UI/UX Designer), but they represent entirely different disciplines.

<ComparisonTable 
  headers={['Focus', 'User Experience (UX)', 'User Interface (UI)']} 
  rows={[
    ['Goal', 'Solve the user\\'s underlying problem efficiently.', 'Make the solution visually appealing and interactive.'],
    ['Deliverables', 'Wireframes, User Journeys, Personas, Research Reports.', 'Mockups, Typography, Color Palettes, Animations.'],
    ['Analogy (House)', 'The structural floorplan: Where is the kitchen relative to the dining room?', 'The interior design: What color is the wallpaper in the kitchen?'],
    ['Core Question', '"Is this feature useful and intuitive?"', '"Is this feature beautiful and accessible?"']
  ]} 
/>

## The UX Design Process
Good UX is never created in a vacuum; it requires rigorous, continuous feedback from actual humans.

1. **Empathize (Research)**: Conduct user interviews and surveys. Find out *why* users are abandoning their shopping carts.
2. **Define (Analysis)**: Create User Personas (e.g., "Busy Bob") and map out their pain points.
3. **Ideate**: Brainstorm solutions. Should we add a 1-click checkout?
4. **Prototype**: Create low-fidelity wireframes or clickable prototypes (using tools like Figma).
5. **Test**: Put the prototype in front of real users. Watch them try to navigate it. Note where they get confused.
6. **Iterate**: Fix the confusing parts and test again.

<Callout icon="warning" title="The Trap of Aesthetics">
A product can have a stunning, award-winning UI and still have terrible UX. If a visually breathtaking website hides the "Cancel Subscription" button behind 7 nested menus to trick the user (a "Dark Pattern"), the resulting UX is incredibly frustrating and toxic.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/UI/index.mdx': `---
title: UI (User Interface)
description: "The specific visual and interactive elements—screens, buttons, toggles, icons—that a person uses to control a computer system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="User Interface (UI)">

If User Experience (UX) is the structural engineering of an app, **User Interface (UI)** is the interior design. It is the tangible, visual layer that the user actually sees, touches, and clicks.

UI Design encompasses typography, color theory, spacing, layout, and micro-interactions. Its primary goal is to guide the user's eye, communicate state, and make the digital experience aesthetically pleasing and structurally coherent.

## Core Pillars of UI Design

### 1. Visual Hierarchy
A user should instinctively know what the most important element on the screen is within 0.5 seconds of looking at it.
- **Size**: Larger text/buttons draw the eye first.
- **Color**: A bright primary color (e.g., a blue "Submit" button) stands out against a neutral background.
- **Whitespace**: Giving an element "breathing room" emphasizes its importance by separating it from the clutter.

### 2. Consistency
Users spend 99% of their time on *other* websites. When they arrive at yours, they expect things to work the way they do everywhere else (Jakob's Law).
- If your "Delete" button is red on one page, it must be red on all pages.
- If a magnifying glass icon means "Search", do not use it to mean "Zoom".

### 3. State Communication
A static interface is frustrating. The UI must instantly communicate what the system is doing.
- **Hover States**: A button changes color slightly when the mouse is over it, proving it is clickable.
- **Loading States**: A skeleton loader or spinner proves the app hasn't frozen while waiting for the database.
- **Error States**: Inline red text explaining exactly why a password was rejected.

<Callout icon="tip" title="Design Systems">
To maintain consistency across massive applications, companies build **Design Systems** (like Google's Material Design or Apple's Human Interface Guidelines). These are highly documented libraries of reusable UI components, ensuring that every engineer uses the exact same shade of blue and the exact same border radius.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Accessibility/index.mdx': `---
title: Accessibility (a11y)
description: "The inclusive practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities, situational disabilities, and socio-economic restrictions on bandwidth and speed."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Accessibility (a11y)">

**Accessibility**, often abbreviated as **a11y** (because there are 11 letters between the 'a' and the 'y'), is the practice of designing software so it is usable by everyone, including people with visual, auditory, motor, or cognitive disabilities.

It is not just a moral obligation; in many jurisdictions (like the EU and the US ADA), it is a strict legal requirement.

## Common Accessibility Barriers & Solutions

<ComparisonTable 
  headers={['Disability Type', 'Common Digital Barrier', 'Technical Solution']} 
  rows={[
    ['Visual (Blindness)', 'Cannot see images or layout. Rely entirely on Screen Reader software (VoiceOver, NVDA).', 'Use semantic HTML (TICK1<nav>TICK1, TICK1<button>TICK1 instead of TICK1<div onClick>TICK1). Always provide descriptive TICK1altTICK1 text for images.'],
    ['Visual (Color Blindness)', 'Important errors are communicated using only the color Red.', 'Never use color as the sole means of conveying information. Combine the red color with an explicit error icon (⚠) or text.'],
    ['Motor (Tremors/Paralysis)', 'Cannot use a mouse; rely entirely on keyboard navigation or voice control.', 'Ensure every interactive element can be reached using the TICK1TabTICK1 key. Maintain visible focus indicators (the blue outline around a focused button).'],
    ['Auditory (Deafness)', 'Information is only provided in a podcast or video format.', 'Provide accurate, synchronized closed captions for all video content and transcripts for audio.']
  ]} 
/>

## Semantic HTML is 90% of the Battle
The easiest way to make a website accessible is to simply use HTML exactly as it was intended. 

Screen readers are highly optimized to understand native HTML tags. If you build a custom dropdown menu out of generic TICK1<div>TICK1s and style it with CSS, the screen reader has no idea it's a menu. You must then manually add complex **ARIA (Accessible Rich Internet Applications)** attributes to explain the element's behavior to the screen reader.

<Callout icon="warning" title="Contrast Ratios">
A massive portion of the population has low vision. The Web Content Accessibility Guidelines (WCAG) dictate that text must have a strict contrast ratio against its background (usually 4.5:1 for normal text). Light gray text on a white background is one of the most common accessibility violations on the internet.
</Callout>

</ConceptTemplate>
`,

  "src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Fitts's law/index.mdx": `---
title: Fitts's Law
description: "A predictive model of human movement primarily used in human-computer interaction that predicts the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Fitts's Law">

Proposed by psychologist Paul Fitts in 1954 (long before the invention of the computer mouse), **Fitts's Law** is a mathematical model that dictates how long it takes a human to move a pointer (like a finger or a mouse cursor) to a specific target (like a button).

The law is surprisingly simple: **The time to acquire a target is a function of the distance to the target and the size of the target.**

## The Two Variables
1. **Distance**: The further away a button is from the user's current cursor position, the longer it takes to click it.
2. **Size**: The smaller the button is, the harder it is to click, because the user must slow down their hand movement to achieve precision (avoiding clicking outside the boundary).

## Applying Fitts's Law to UI Design

1. **Make Important Buttons Large**: The primary Call-To-Action (CTA) on a screen (like "Checkout") should be significantly larger than secondary actions (like "Cancel").
2. **Keep Related Actions Close**: If a user selects an item in a list, the "Edit" and "Delete" buttons should appear directly next to the item, not at the extreme top right corner of the monitor.
3. **The "Infinite Size" of Screen Edges**: In macOS, the menu bar is glued to the absolute top edge of the screen. Why? Because you cannot accidentally overshoot it. If you throw your mouse violently to the top of the screen, the cursor physically stops at the edge, resting perfectly on the menu bar. According to Fitts's Law, objects pinned to the very edge of the screen have effectively "infinite size" and are incredibly fast to click.

<Callout icon="tip" title="Mobile Thumb Zones">
Fitts's Law is critical in mobile design. The easiest place for a right-handed user to click is the bottom-left of the screen (closest to the thumb joint). The hardest place is the extreme top-left (requiring a dangerous stretch). This is why modern browsers put the URL bar at the bottom, and why the most important tabs are in a bottom navigation bar.
</Callout>

</ConceptTemplate>
`,

  "src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Nielsen's heuristics/index.mdx": `---
title: Nielsen's Heuristics
description: "10 broad rules of thumb for interaction design invented by Jakob Nielsen in 1994, which serve as the foundation of modern usability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Nielsen's 10 Usability Heuristics">

In 1994, Jakob Nielsen published 10 general principles for interaction design. They are called "heuristics" because they are broad rules of thumb, rather than specific, rigid guidelines. 

Despite being written decades before the invention of the smartphone, they remain the absolute gold standard for evaluating User Interfaces today.

## The 10 Heuristics (Summarized)

1. **Visibility of System Status**: The system should always keep users informed about what is going on (e.g., showing a progress bar when uploading a file).
2. **Match Between System and the Real World**: Speak the user's language. Use a Shopping Cart icon for e-commerce, not a floppy disk.
3. **User Control and Freedom**: Users often click things by mistake. Every action must have a clear "Emergency Exit" (e.g., an Undo button, or a way to easily cancel a wizard).
4. **Consistency and Standards**: Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions (e.g., links should be underlined or colored).
5. **Error Prevention**: Good error messages are important, but the best designs prevent problems from occurring in the first place (e.g., greying out the 'Submit' button until all required fields are filled).
6. **Recognition Rather than Recall**: Minimize the user's memory load. It is much easier to recognize an item in a dropdown list than it is to recall the exact spelling and type it into a blank text box.
7. **Flexibility and Efficiency of Use**: Accelerators—unseen by the novice user—may often speed up the interaction for the expert user. (e.g., allowing a power user to press \`Ctrl+S\` instead of clicking File -> Save).
8. **Aesthetic and Minimalist Design**: Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with the relevant units of information.
9. **Help Users Recognize, Diagnose, and Recover from Errors**: Error messages should be expressed in plain language (no error codes like "ERR_X99_DB"), precisely indicate the problem, and constructively suggest a solution.
10. **Help and Documentation**: Even though it is better if the system can be used without documentation, it may be necessary to provide help. It should be easy to search and focused on the user's task.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Cognitive load/index.mdx': `---
title: Cognitive Load
description: "The total amount of mental effort being used in the working memory, which in UX determines how easily a user can understand and navigate an interface."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Cognitive Load">

The human brain acts like a computer's RAM (Working Memory). It can only hold and process a very small amount of information at one time (roughly 5 to 7 "chunks" of information).

**Cognitive Load** is the amount of mental processing power required to use a product. If a User Interface requires too much thinking, the user's working memory overflows, they feel overwhelmed, and they abandon the app.

## Types of Cognitive Load in UX

<ComparisonTable 
  headers={['Type', 'Definition', 'UX Example']} 
  rows={[
    ['Intrinsic Cognitive Load', 'The inherent difficulty of the task itself. You cannot eliminate this.', 'Doing your taxes is inherently complex. You have to understand income, deductions, and tax brackets.'],
    ['Extraneous Cognitive Load', 'The mental effort caused by a bad interface or confusing design. This is what UX Designers try to eliminate.', 'The tax software uses a tiny, hard-to-read font, hides the "Next" button, and uses dense legal jargon instead of plain English.']
  ]} 
/>

## How to Reduce Cognitive Load

1. **Chunking**: Break massive tasks down into small, digestible bites. Instead of a single form with 50 questions, use a wizard that asks 5 questions per page across 10 pages.
2. **Remove Visual Clutter**: (Nielsen's 8th Heuristic). If an image, border, or text block doesn't help the user complete their immediate goal, delete it.
3. **Rely on Familiar Patterns**: If you invent a completely novel, experimental navigation system, the user has to spend mental energy just learning how to click around. If you use a standard top-nav bar, their brain uses zero energy to navigate, saving it all for the actual task.

<Callout icon="warning" title="Hick's Law">
Hick's Law states that **the time it takes to make a decision increases with the number and complexity of choices.** If a restaurant menu has 200 items, you will take 15 minutes to order. If a website shows 40 different pricing tiers on the signup page, the user will suffer analysis paralysis and leave.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Wireframing/index.mdx': `---
title: Wireframing
description: "A two-dimensional skeletal outline of a webpage or app, used early in the design process to establish structure, layout, and user flow."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Wireframing">

Before a software engineer writes a line of code, and before a UI designer picks a color palette, a UX designer draws a **Wireframe**.

A wireframe is the architectural blueprint of an interface. It consists entirely of greyscale boxes, lines, and placeholder text (Lorem Ipsum). It explicitly ignores colors, typography, and logos.

## Why are Wireframes Ugly on Purpose?
It is critical that wireframes look unfinished and rudimentary. 

If you show a client a highly polished, full-color mockup of a new dashboard, they will spend 20 minutes arguing with you about whether the button should be "Ocean Blue" or "Navy Blue". 

If you show them a greyscale wireframe, they are forced to focus exclusively on the **Structure** and the **Flow**:
- *"Should the sidebar be on the left or the right?"*
- *"Is the checkout button too far from the price?"*
- *"Does this screen actually solve the user's problem?"*

## Low vs High Fidelity

- **Low-Fidelity (Lo-Fi) Wireframes**: Often literally drawn on a whiteboard or a napkin with a Sharpie. They take seconds to create and are meant to be thrown away rapidly during brainstorming sessions.
- **Mid/High-Fidelity Wireframes**: Created in digital tools like Figma or Balsamiq. They have accurate spacing and proportions, and often include basic click-through prototyping (e.g., clicking a grey box on Screen A transitions the view to Screen B) to test the user journey before visual design begins.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/50. Human-Computer Interaction & UX/Usability testing/index.mdx': `---
title: Usability Testing
description: "A technique used in user-centered interaction design to evaluate a product by testing it on real users."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Usability Testing">

You are not your user. 

Because you designed the software (or wrote the code), you know exactly how it works. You intuitively know that clicking the gear icon opens the settings, because you put it there. 
When you release the software, you will be shocked to watch real users stare at the gear icon for 5 minutes, completely lost, unable to find the settings.

**Usability Testing** is the humbling process of putting your product in front of strangers and watching them attempt to use it.

## The Testing Process
1. **Recruit**: Find 5 real humans who match your target demographic (e.g., if you are building accounting software, don't test it on teenagers; test it on accountants).
2. **Assign Tasks**: Give the user a specific, goal-oriented task. *(e.g., "Imagine you want to change your billing address. Show me how you would do that.")*
3. **Observe, Do Not Guide**: This is the hardest part. The facilitator must stay completely silent. If the user gets stuck and asks, *"Do I click here?"*, the facilitator must reply, *"What do you think you should do?"*
4. **Think Aloud Protocol**: Ask the user to narrate their internal thoughts as they navigate. *(e.g., "I'm looking for a profile icon... I don't see one... maybe it's in the footer?")*

## Why Only 5 Users?
Jakob Nielsen famously proved that testing a UI with just **5 users** will uncover **85% of the core usability problems**. 

Testing with 15 users is a waste of time and money, because users 6 through 15 will just get stuck on the exact same confusing buttons that users 1 through 5 found. The correct methodology is to test with 5 users, fix the glaring problems, and then run a *new* test with 5 new users.

<Callout icon="tip" title="Qualitative vs Quantitative">
Usability testing is **Qualitative**. It tells you *why* users are confused. A/B Testing or Analytics are **Quantitative**. They tell you *that* 60% of users are dropping off at the checkout page, but they can't tell you that it's because the credit card form looks suspicious.
</Callout>

</ConceptTemplate>
`,
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
