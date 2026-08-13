import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Box Model & Positioning/index.mdx': `---
title: Box Model & Positioning
description: "The fundamental engine of CSS layout, describing how elements take up space and align on the screen."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Box Model & Positioning"
  icon="square"
>

Everything in CSS is a box. Understanding the **CSS Box Model** is the absolute prerequisite to building any web layout.

## The Box Model Layers

From the inside out, every element consists of:
1. **Content**: The actual text, image, or child elements.
2. **Padding**: Transparent space *inside* the element, pushing the border away from the content.
3. **Border**: The structural edge of the element.
4. **Margin**: Transparent space *outside* the element, pushing it away from other elements.

<Callout icon="warning" title="box-sizing: border-box">
By default, CSS uses TICK1box-sizing: content-boxTICK1. If you set a width of 100px and add 20px padding, the box becomes 140px wide on the screen, breaking your layouts. Modern developers apply TICK1box-sizing: border-boxTICK1 globally so that padding and borders are absorbed into the declared width.
</Callout>

## Positioning

The TICK1positionTICK1 property drastically alters how an element behaves within the document flow:
- **static** (default): The element flows naturally down the page. TICK1topTICK1, TICK1leftTICK1, TICK1z-indexTICK1 do nothing.
- **relative**: The element remains in the normal flow, but you can visually nudge it using TICK1topTICK1 and TICK1leftTICK1 without affecting surrounding elements. Crucially, it acts as an anchor point for absolute children.
- **absolute**: The element is ripped entirely out of the document flow. It positions itself relative to its closest TICK1position: relativeTICK1 ancestor.
- **fixed**: Ripped out of flow and positioned relative to the viewport. It stays on screen even when scrolling (e.g., sticky headers).
- **sticky**: A hybrid. It acts TICK1staticTICK1 until you scroll past a certain threshold, at which point it acts TICK1fixedTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Flexbox/index.mdx': `---
title: Flexbox
description: "Flexible Box Module, a one-dimensional layout model for distributing space and aligning items within a container."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Flexbox"
  icon="align-justify"
>

Before **Flexbox** (introduced around 2012), developers relied on massive hacks—like floats, clearfixes, and absolute positioning—just to align elements horizontally. Flexbox revolutionized CSS by providing a robust, one-dimensional layout engine.

## The Main Axis vs. Cross Axis

Flexbox is all about direction. When you set TICK1display: flex;TICK1 on a container, you define an axis.
- **Main Axis**: Controlled by TICK1justify-contentTICK1 (aligns items along the row or column).
- **Cross Axis**: Controlled by TICK1align-itemsTICK1 (aligns items perpendicular to the main axis).

## Centering a Div

The holy grail of CSS used to take 10 lines of complex code. With Flexbox, centering a div horizontally and vertically takes three lines:

${TICK3}css
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
}
${TICK3}

## Flex Items (The Children)
While the container dictates the overall layout, the children can dictate their own behavior:
- TICK1flex-growTICK1: How much of the leftover space this item should consume.
- TICK1flex-shrinkTICK1: How much this item should shrink if there isn't enough space.
- TICK1flex-basisTICK1: The default size before growing or shrinking.

<Callout icon="tip" title="The flex shorthand">
You'll often see TICK1flex: 1;TICK1 on a child element. This is shorthand for TICK1flex-grow: 1; flex-shrink: 1; flex-basis: 0%;TICK1. It tells the item to fill all available space equally.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Grid/index.mdx': `---
title: Grid
description: "CSS Grid Layout, a two-dimensional layout system tailored for complex webpage structuring."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Grid"
  icon="grid"
>

While Flexbox excels at **one-dimensional** layouts (a row of buttons, a column of text), **CSS Grid** is the ultimate tool for **two-dimensional** layouts (rows *and* columns simultaneously).

## Defining the Grid

You turn an element into a grid by setting TICK1display: grid;TICK1. You then define the structure using columns and rows.

${TICK3}css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar is 250px, Main takes the rest */
  grid-template-rows: 60px 1fr;     /* Header is 60px, Content takes the rest */
  gap: 16px;                        /* Spacing between cells */
}
${TICK3}

## The Fractional Unit (fr)
Grid introduced the TICK1frTICK1 unit, which represents a fraction of the available free space. If you define TICK1grid-template-columns: 1fr 2fr 1fr;TICK1, the browser divides the space into 4 chunks. The middle column gets twice as much space as the side columns.

## Placing Items
Unlike Flexbox where items naturally flow, Grid allows you to explicitly place an element anywhere on the grid, even overlapping them.

${TICK3}css
.header {
  grid-column: 1 / 3; /* Span from grid line 1 to grid line 3 */
  grid-row: 1;
}
${TICK3}

<Callout icon="info" title="Grid vs. Flexbox">
A common misconception is that Grid replaces Flexbox. They are meant to be used together! Use Grid for the macro-layout (the skeleton of the page: header, sidebar, main, footer). Use Flexbox for the micro-layout (aligning the icons and text inside a navigation bar).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Selectors & Specificity/index.mdx': `---
title: Selectors & Specificity
description: "The rule engine of CSS that determines exactly which styles are applied to an element when multiple conflicting rules exist."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Selectors & Specificity"
  icon="target"
>

CSS stands for **Cascading Style Sheets**. The "Cascade" is the algorithm the browser uses to decide which style wins when two different rules try to style the same element.

## The Specificity Hierarchy

When a conflict occurs, the browser calculates a specificity score based on the types of selectors used. From highest to lowest priority:

1. **Inline Styles**: TICK1<div style="color: red;">TICK1 (Almost always wins)
2. **IDs**: TICK1#header { color: blue; }TICK1
3. **Classes, Attributes, and Pseudo-classes**: TICK1.btnTICK1, TICK1[type="text"]TICK1, TICK1:hoverTICK1
4. **Elements and Pseudo-elements**: TICK1h1TICK1, TICK1divTICK1, TICK1::beforeTICK1

For example, TICK1#nav .linkTICK1 (1 ID, 1 Class) will override TICK1div ul li .linkTICK1 (3 Elements, 1 Class) because IDs carry vastly more weight.

## Advanced Selectors
- **Combinators**: 
  - TICK1div pTICK1 (Descendant: any TICK1pTICK1 inside a TICK1divTICK1)
  - TICK1div > pTICK1 (Direct child: only TICK1pTICK1 elements directly nested one level deep)
  - TICK1h1 + pTICK1 (Adjacent sibling: the TICK1pTICK1 immediately following an TICK1h1TICK1)
- **Pseudo-classes**: Target state. (e.g., TICK1:focusTICK1, TICK1:nth-child(2)TICK1, TICK1:not(.active)TICK1)
- **Pseudo-elements**: Target sub-parts of an element. (e.g., TICK1::beforeTICK1, TICK1::selectionTICK1)

<Callout icon="warning" title="The !important Nuclear Option">
Appending TICK1!importantTICK1 to a rule forces it to win over almost everything else, regardless of specificity. While tempting for quick fixes, overusing it destroys the cascade and makes your CSS impossible to maintain. Only use it when overriding third-party libraries.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Responsive Design/index.mdx': `---
title: Responsive Design
description: "The practice of building web pages that detect the visitor's screen size and orientation and change the layout accordingly."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Responsive Design"
  icon="smartphone"
>

In the early days of smartphones, developers built entirely separate websites for mobile devices (e.g., TICK1m.facebook.comTICK1). **Responsive Web Design (RWD)**, coined by Ethan Marcotte in 2010, changed the industry paradigm: build one HTML document, but use CSS to make it fluidly adapt to any screen.

## The Meta Viewport Tag
Responsive design literally does not work without this HTML tag in your TICK1<head>TICK1. It tells mobile browsers not to arbitrarily zoom out the page to fit a desktop layout onto a 4-inch screen.
${TICK3}html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${TICK3}

## Media Queries
Media queries allow you to apply CSS conditionally based on screen dimensions.

**Mobile-First Approach (Best Practice):**
Write your default CSS for mobile screens, then use TICK1min-widthTICK1 to add complexity as the screen gets larger.
${TICK3}css
/* Default: Mobile (stacked layout) */
.layout { display: block; }

/* Tablet and up */
@media (min-width: 768px) {
  .layout { display: flex; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .layout { display: grid; }
}
${TICK3}

## Relative Units
Responsive design relies heavily on avoiding fixed TICK1pxTICK1 values in favor of:
- **TICK1%TICK1**: Percentage of the parent container.
- **TICK1vwTICK1 / TICK1vhTICK1**: Viewport Width / Viewport Height (1vw is 1% of the screen width).
- **TICK1remTICK1**: Root em. Relative to the default font size of the HTML document (great for accessibility scaling).

<Callout icon="info" title="Container Queries">
A massive recent addition to CSS is **Container Queries** (TICK1@containerTICK1). Instead of altering a component based on the *entire screen size*, you can alter it based on the *size of its parent container*. This is a game-changer for building reusable React/Vue components that look good anywhere on the page.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Variables & Tokens/index.mdx': `---
title: Variables & Tokens
description: "CSS Custom Properties, providing dynamic, cascading variables native to the browser without requiring a preprocessor."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Variables & Tokens"
  icon="code"
>

For years, developers had to use tools like Sass or LESS to use variables. Today, **CSS Custom Properties** (native CSS variables) are universally supported and are significantly more powerful because they exist in the browser at runtime.

## Defining and Using Variables

Variables are prefixed with two dashes (TICK1--TICK1). They are usually defined on the TICK1:rootTICK1 pseudo-class so they are globally accessible.

${TICK3}css
:root {
  --primary-color: #3b82f6;
  --spacing-md: 16px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
}
${TICK3}

## Design Tokens and Theming
Variables are the foundation of modern **Design Systems** and **Dark Mode**. Because native CSS variables cascade, you can change a variable's value on a specific container or state, and the UI updates instantly without rewriting classes.

${TICK3}css
:root {
  --bg-color: #ffffff;
  --text-color: #111827;
}

/* Dark Mode Implementation */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --text-color: #f8fafc;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
${TICK3}

<Callout icon="tip" title="JavaScript Interaction">
Because they exist in the DOM at runtime, JavaScript can read and write CSS variables effortlessly. This is how you implement dynamic drag-and-drop elements or scroll-linked animations: TICK1element.style.setProperty('--mouse-x', event.clientX + 'px')TICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Animations & Transforms/index.mdx': `---
title: Animations & Transforms
description: "Moving, scaling, rotating, and animating DOM elements smoothly using hardware-accelerated CSS properties."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Animations & Transforms"
  icon="play"
>

Modern CSS provides powerful tools to create fluid, hardware-accelerated motion without writing a single line of JavaScript.

## Transforms (Static Changes)
The TICK1transformTICK1 property alters the visual appearance of an element without affecting the document flow (it won't push other elements out of the way).
- TICK1translate(x, y)TICK1: Moves the element.
- TICK1scale(n)TICK1: Enlarges or shrinks.
- TICK1rotate(deg)TICK1: Spins the element.

## Transitions (A to B)
TICK1transitionTICK1 is used to smoothly interpolate between states (like a hover effect).

${TICK3}css
.btn {
  background-color: blue;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: red;
  transform: scale(1.1);
}
${TICK3}

## Keyframe Animations (Complex Sequences)
For continuous animations or complex multi-step sequences, you use TICK1@keyframesTICK1.

${TICK3}css
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.loading-dot {
  animation: pulse 2s infinite linear;
}
${TICK3}

<Callout icon="warning" title="Performance & The GPU">
You should only ever animate TICK1transformTICK1 and TICK1opacityTICK1. Animating properties like TICK1widthTICK1, TICK1marginTICK1, or TICK1box-shadowTICK1 forces the browser to recalculate the entire page layout on every single frame, causing severe lag on mobile devices. Transforms are offloaded directly to the device's GPU for silky smooth 60FPS motion.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Tailwind CSS/index.mdx': `---
title: Tailwind CSS
description: "A utility-first CSS framework that allows rapid UI development by composing low-level utility classes directly in the HTML."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Tailwind CSS"
  icon="feather"
>

**Tailwind CSS** represents a massive paradigm shift in how developers write CSS. Instead of creating semantic class names (TICK1.profile-cardTICK1) and writing custom CSS in a separate file, Tailwind provides thousands of atomic "utility classes" (TICK1flexTICK1, TICK1p-4TICK1, TICK1text-centerTICK1) that you apply directly in your HTML/JSX.

## The Utility-First Workflow

Instead of:
${TICK3}css
/* The old way */
.btn-primary {
  display: flex;
  padding: 16px 32px;
  background-color: blue;
  border-radius: 8px;
}
${TICK3}

You write:
${TICK3}html
<!-- The Tailwind way -->
<button class="flex px-8 py-4 bg-blue-500 rounded-lg">Submit</button>
${TICK3}

## Why it took over the industry
1. **No Context Switching**: You don't have to constantly flip between TICK1index.tsxTICK1 and TICK1styles.cssTICK1.
2. **No Naming Fatigue**: You don't waste time inventing names like TICK1.outer-wrapper-innerTICK1.
3. **Dead Code Elimination**: Traditional CSS files grow forever because developers are terrified to delete rules. Tailwind compiles your codebase at build-time, parsing your HTML and outputting a CSS file containing *only* the classes you actually used (often resulting in CSS payloads under 10KB).
4. **Built-in Design System**: It forces you to use a standardized scale for spacing, typography, and colors, preventing UI inconsistencies.

<Callout icon="info" title="The Backlash">
When people first see Tailwind, they often hate it, claiming it looks like inline styles and clutters the HTML. However, in an era where we build UIs using component frameworks (React, Vue, Svelte), the "messy" HTML is encapsulated inside small, reusable components anyway. Once developers try it, they rarely go back.
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
