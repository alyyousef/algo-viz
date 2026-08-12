import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/HTML5 Architecture/index.mdx': `---
title: HTML5 Architecture
description: The structural foundation of the modern web, providing the core markup language used to build dynamic web applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTML5 Architecture">

**HTML (HyperText Markup Language)** is the structural bedrock of the internet. It is not a programming language; it is a declarative markup language that tells the browser how to structure content into a **DOM Tree**.

## The HTML5 Revolution
Released by the WHATWG, HTML5 completely revolutionized the web by shifting the focus from "static documents" to "dynamic applications."

It introduced:
1. **Semantic Tags**: Replacing thousands of meaningless TICK1<div>TICK1s with structural tags like TICK1<nav>TICK1, TICK1<article>TICK1, and TICK1<main>TICK1.
2. **Native Multimedia**: Native TICK1<video>TICK1 and TICK1<audio>TICK1 tags, finally killing Adobe Flash forever.
3. **The Web API Ecosystem**: HTML5 shipped alongside massive Javascript APIs like LocalStorage, WebSockets, and the Canvas API.

## The Boilerplate

Every valid HTML5 document strictly requires the following boilerplate:

TICK3html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My App</title>
  </head>
  <body>
    <!-- Visible content goes here -->
  </body>
</html>
TICK3

- TICK1<!DOCTYPE html>TICK1: This is not an HTML tag. It is a historical artifact that explicitly tells the browser rendering engine to run in "Standards Mode", preventing it from intentionally rendering the page incorrectly (Quirks Mode) to support IE6 from 2001.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/Semantic HTML & ARIA/index.mdx': `---
title: Semantic HTML & ARIA
description: The architectural practice of using tags that accurately describe their structural meaning, ensuring accessibility and SEO compliance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semantic HTML & ARIA">

Before HTML5, web developers suffered from **"div soup"**. Entire websites were built using generic TICK1<div>TICK1 elements for the header, the navigation, the footer, and the buttons. 

While a TICK1<div>TICK1 can be visually styled with CSS to *look* like a button, it mathematically *is not* a button. This completely destroys the experience for blind users relying on Screen Readers, and destroys SEO because Googlebot cannot understand the structure of the page.

## Core Semantic Tags
Semantic HTML solves this by providing specific tags that carry inherent structural meaning:
- TICK1<header>TICK1 / TICK1<footer>TICK1: Defines the top and bottom bounds of the page or article.
- TICK1<nav>TICK1: Explicitly wraps primary navigation links.
- TICK1<main>TICK1: The absolute most important tag. Tells the screen reader where the actual content begins, allowing users to skip past repetitive navigation bars.
- TICK1<article>TICK1: A completely independent, self-contained piece of content (like a blog post or a Tweet).

## ARIA (Accessible Rich Internet Applications)
Sometimes, modern web apps require complex UI components (like a modal dialog or a custom React dropdown) that have no semantic HTML equivalent.
In these cases, you use **ARIA attributes** to mathematically describe the component's state to the screen reader.

- TICK1aria-hidden="true"TICK1: Hides decorative SVG icons from the screen reader.
- TICK1aria-expanded="true"TICK1: Announces that the dropdown menu is currently open.
- TICK1role="dialog"TICK1: Tells the screen reader that the current TICK1<div>TICK1 is actually a modal popup that traps keyboard focus.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/Forms & Validation/index.mdx': `---
title: Forms & Input Validation
description: The native HTML mechanisms for capturing user input securely, including built-in browser validation and varied input types.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Forms & Input Validation">

The TICK1<form>TICK1 element is the primary mechanism for receiving user data. 

Before modern JavaScript frameworks (React/Vue) took over, HTML forms natively handled HTTP POST requests. When a user clicked "Submit", the browser would automatically gather all the input data, serialize it, and send a hard page-refresh POST request to the backend server.

Today, we almost always intercept this using JavaScript (TICK1e.preventDefault()TICK1) and send the data via TICK1fetch()TICK1.

## The <input> Ecosystem
HTML5 introduced powerful new input types that trigger specialized mobile keyboards on iOS and Android:
- TICK1<input type="email">TICK1: Triggers a mobile keyboard with the TICK1@TICK1 symbol.
- TICK1<input type="number">TICK1: Triggers the mobile numpad.
- TICK1<input type="date">TICK1: Triggers the native OS calendar picker.

## Native Browser Validation
You do not need massive Javascript libraries to perform basic validation. HTML5 includes native validation constraints that will block form submission and display localized error popups:
- TICK1requiredTICK1: The field cannot be empty.
- TICK1minlength="8"TICK1: Enforces a minimum character count.
- TICK1pattern="[0-9]{5}"TICK1: Enforces a strict Regex pattern (e.g., exactly 5 digits for a US ZIP code).

<Callout icon="warning" title="Client-Side Validation is a UX Feature">
  HTML/Javascript validation is purely a User Experience (UX) feature to help legitimate users catch typos instantly. **It provides zero security.** A hacker can easily bypass the browser and send raw malicious HTTP requests via Postman. **All validation MUST be duplicated on the backend server.**
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/Metadata & SEO Tags/index.mdx': `---
title: Metadata & SEO Tags
description: Invisible HTML tags stored in the document head that dictate how the page is indexed by search engines and displayed on social media.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Metadata & SEO Tags">

The TICK1<head>TICK1 of an HTML document contains data *about* the data (Metadata). This information is invisible to the human user but is critical for Search Engines, Twitter, and Facebook.

## The Title and Description
The absolute most important tags for SEO. These directly control how your website appears in Google Search results.
TICK3html
<title>Buy Cheap Sneakers</title>
<meta name="description" content="Shop the best collection of affordable sneakers. Free shipping on all orders over $50.">
TICK3

## Open Graph (Social Media Tags)
When you paste a link into iMessage, Twitter, or Slack, the app instantly displays a rich preview card with a title, description, and hero image. This is powered by **Open Graph** tags (originally invented by Facebook).

TICK3html
<meta property="og:title" content="My Awesome Blog Post" />
<meta property="og:image" content="https://example.com/hero.jpg" />
<meta name="twitter:card" content="summary_large_image" />
TICK3

## Structured Data (Schema.org / JSON-LD)
To get "Rich Snippets" on Google (e.g., your recipe showing 5-star ratings and cooking time directly in the search results), you must inject mathematical **Structured Data** into the head. 
Today, this is done using JSON-LD (JSON for Linking Data) based on the TICK1Schema.orgTICK1 standard.

TICK3html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Perfect Chocolate Chip Cookies",
  "cookTime": "PT15M"
}
</script>
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/Media & Graphics/index.mdx': `---
title: Media & Graphics
description: The HTML architecture for embedding raster images, resolution-independent vector graphics (SVG), and streaming video.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Media & Graphics">

Embedding media is a core component of web performance. Serving a 5MB unoptimized image to a mobile user on a 3G connection will destroy your UX and your Google rankings.

## The <img> Tag and Responsive Images
To fix the performance problem, HTML introduced the TICK1srcsetTICK1 attribute. It allows you to provide 3 different sizes of the exact same image, and the browser's rendering engine will mathematically choose the smallest file that fits the user's screen.

TICK3html
<img 
  src="hero-fallback.jpg" 
  srcset="hero-small.jpg 400w, hero-medium.jpg 800w, hero-large.jpg 1200w" 
  alt="A scenic mountain" 
  loading="lazy" 
/>
TICK3
*Note: The TICK1loading="lazy"TICK1 attribute tells the browser to NOT download the image until the user actually scrolls down to it.*

## SVG (Scalable Vector Graphics)
Raster images (JPEG, PNG, WebP) are grids of colored pixels; if you zoom in, they become blurry. 
**SVG** is a mathematical, XML-based markup language that defines shapes, paths, and curves. It is resolution-independent—an SVG logo will look flawlessly crisp on a 1080p monitor and an 8K retina display. Furthermore, because SVG is written in XML, you can animate the shapes directly using CSS or Javascript.

## Video and Audio
HTML5 introduced native TICK1<video>TICK1 and TICK1<audio>TICK1 tags, supporting multiple source formats (like MP4 and WebM) to ensure cross-browser compatibility without relying on third-party plugins.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.1 HTML/Tables/index.mdx': `---
title: Tables & Tabular Data
description: The strictly structured HTML architecture used for displaying complex, multi-dimensional grid data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tables & Tabular Data">

In the late 1990s, before CSS was powerful, developers used massive, nested TICK1<table>TICK1 elements to build entire website layouts. This was a dark era. 

Today, you must **never** use tables for layout. Tables are strictly reserved for their mathematical purpose: displaying highly-structured, two-dimensional tabular data (like a spreadsheet or a pricing tier comparison).

## The Strict Hierarchy

Tables require a very specific, nested hierarchy of tags to be semantically valid and accessible.

1. TICK1<table>TICK1: The root container.
2. TICK1<thead>TICK1: Groups the header content (the column titles).
3. TICK1<tbody>TICK1: Groups the core data rows.
4. TICK1<tr>TICK1 (Table Row): Defines a horizontal row.
5. TICK1<th>TICK1 (Table Header): Defines a cell that acts as a label (bold text, centered by default).
6. TICK1<td>TICK1 (Table Data): Defines a standard data cell.

## Accessibility Importance
If you build a table using CSS Grid and thousands of TICK1<div>TICK1 elements, a blind user's Screen Reader will just read a massive, confusing list of random numbers. 
By using genuine TICK1<th>TICK1 and TICK1<td>TICK1 tags, the Screen Reader can mathematically map the data, announcing: *"Column: Price, Row: Pro Tier, Value: $99/mo"*.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Box Model & Positioning/index.mdx': `---
title: Box Model & Positioning
description: The absolute core mathematical model of CSS layout, defining how every element calculates its physical size and placement on the screen.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Box Model & Positioning">

Every single element on a web page, regardless of whether it's a circle or a triangle visually, is mathematically calculated by the browser as a rectangular **Box**.

## The Box Model
The physical size of an element is calculated by combining four layers:
1. **Content**: The actual text or image (width/height).
2. **Padding**: Transparent space *inside* the border, pushing the border away from the content.
3. **Border**: The physical line surrounding the padding.
4. **Margin**: Transparent space *outside* the border, pushing other elements away.

<Callout icon="warning" title="The box-sizing Revolution">
  Historically, if you set TICK1width: 100px; padding: 20px; border: 5px;TICK1, the browser would add them together, making the box 150px wide. This caused layouts to violently explode. 
  Today, every modern website applies a global reset: TICK1* { box-sizing: border-box; }TICK1. This forces the browser to mathematically absorb the padding and border into the 100px width, guaranteeing the element never grows larger than 100px.
</Callout>

## Positioning
The TICK1positionTICK1 property dictates how an element behaves within the document flow.
- **static** (Default): The element flows naturally down the page.
- **relative**: The element remains in the natural flow, but can be nudged using TICK1top/left/right/bottomTICK1 relative to its original position.
- **absolute**: The element is **completely violently ripped out of the normal document flow**. It hovers above the page and aligns itself mathematically to its nearest TICK1relativeTICK1 parent container.
- **fixed**: Ripped out of the flow and anchored to the physical screen (the viewport). Even if the user scrolls down, a TICK1fixedTICK1 header remains locked to the top of the glass.
- **sticky**: Acts like TICK1relativeTICK1 until the user scrolls past it, at which point it instantly switches to TICK1fixedTICK1 and locks to the top of the screen.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Selectors & Specificity/index.mdx': `---
title: Selectors & Specificity
description: The pattern-matching engine of CSS and the complex mathematical scoring algorithm that resolves styling conflicts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Selectors & Specificity">

CSS stands for Cascading Style Sheets. The "Cascade" is a complex mathematical algorithm the browser uses to decide which style wins when multiple conflicting rules apply to the exact same HTML element.

## The Specificity Score

When a conflict occurs, the browser calculates a 3-column score: TICK1(ID, CLASS, TAG)TICK1. The highest score wins.

1. **Tag Selectors** (TICK1divTICK1, TICK1pTICK1, TICK1h1TICK1): Lowest power. Score: TICK1(0, 0, 1)TICK1.
2. **Class Selectors** (TICK1.btnTICK1, TICK1.headerTICK1): Medium power. Score: TICK1(0, 1, 0)TICK1.
3. **ID Selectors** (TICK1#login-formTICK1): Extreme power. Score: TICK1(1, 0, 0)TICK1.

If you write:
TICK3css
/* Score: (0, 0, 1) */
button { color: red; } 

/* Score: (0, 1, 0) - This Wins! */
.submit-btn { color: blue; } 
TICK3

Because the Class selector has a higher mathematical score, the button will be blue, regardless of which order the rules are written in the file.

## The Nuclear Option (!important)
If you append TICK1!importantTICK1 to a rule (e.g., TICK1color: green !important;TICK1), it mathematically bypasses the entire specificity scoring system and instantly wins. 

Using TICK1!importantTICK1 is generally considered a massive anti-pattern and a sign of architectural failure. If you use it, you break the Cascade, making the codebase nearly impossible to override or maintain in the future.

## Combinators
CSS allows complex pattern matching:
- **Descendant** (TICK1div pTICK1): Selects *any* paragraph inside the div, no matter how deeply nested.
- **Direct Child** (TICK1div > pTICK1): Selects *only* paragraphs that are immediate, first-generation children of the div.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Flexbox/index.mdx': `---
title: Flexbox Layout
description: A powerful, one-dimensional layout engine designed to align, distribute, and perfectly center elements within a container.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Flexbox Layout">

Before Flexbox (released around 2012), centering a TICK1<div>TICK1 vertically inside a container was famously one of the most agonizing, mathematically difficult tasks in web development (involving floating boxes and negative margins).

**Flexbox (Flexible Box Module)** solved this instantly. It is a one-dimensional layout engine, meaning it aligns items either in a horizontal Row, OR a vertical Column (but not both simultaneously).

## The Parent Container (Flex Container)
To activate Flexbox, you must apply TICK1display: flex;TICK1 to the parent container. This instantly turns all direct children into "Flex Items".

## The Two Axes
Flexbox math operates on a Main Axis and a Cross Axis.

If TICK1flex-direction: rowTICK1 (the default):
- **Main Axis** is horizontal (Left to Right). Controlled by TICK1justify-contentTICK1.
- **Cross Axis** is vertical (Top to Bottom). Controlled by TICK1align-itemsTICK1.

To perfectly center a box dead in the middle of a container:
TICK3css
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
}
TICK3

## Flex Item Properties
You can give mathematical flexibility to the child items themselves:
- TICK1flex-grow: 1TICK1: Tells the item to consume all available empty space in the container.
- TICK1flex-shrink: 0TICK1: Explicitly forbids the browser from crushing the item if the screen gets too small.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Grid/index.mdx': `---
title: CSS Grid Layout
description: The ultimate two-dimensional layout architecture, allowing complex rows and columns to be defined mathematically without nested divs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CSS Grid Layout">

While Flexbox is perfect for aligning items in a single row (like a Navigation bar), it is terrible at building complex page architectures (like a dashboard with a sidebar, header, and main content area). 

**CSS Grid** is the ultimate two-dimensional layout engine. It allows you to mathematically define both Rows AND Columns simultaneously.

## The Grid Blueprint
Instead of writing complex math on the child elements, CSS Grid allows you to define a structural blueprint entirely on the parent container.

TICK3css
.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr; /* Two columns: A fixed 200px sidebar, and the rest (1fr) */
  grid-template-rows: 60px 1fr;     /* Two rows: A fixed 60px header, and the rest (1fr) */
  gap: 20px;                        /* Perfect spacing between all items */
}
TICK3

## The Fractional Unit (fr)
Grid introduced the TICK1frTICK1 (fractional) unit. It is incredibly powerful. 
If you write TICK1grid-template-columns: 1fr 2fr 1frTICK1, the browser calculates the total available width, divides it into 4 equal slices, gives 1 slice to the left column, 2 slices to the middle column (making it twice as big), and 1 slice to the right.

## Grid Areas (The Holy Grail)
Grid allows you to name sections of your layout visually using strings, creating the most readable layout code in history:

TICK3css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main  ads"
    "footer footer footer";
}

.header-child { grid-area: header; }
TICK3
The child element will instantly span across the entire top of the grid.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Responsive Design/index.mdx': `---
title: Responsive Design & Media Queries
description: The architectural philosophy and CSS mechanics required to ensure web applications automatically adapt to smartphones, tablets, and 4K monitors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Responsive Design & Media Queries">

In the early 2000s, companies built two entirely separate websites: TICK1www.example.comTICK1 for desktops, and TICK1m.example.comTICK1 for flip-phones. This was a maintenance nightmare.

In 2010, Ethan Marcotte coined **Responsive Web Design**. The philosophy dictates that there should be exactly one HTML codebase, and CSS should mathematically fluidly adapt the layout based on the user's screen size.

## Media Queries
The core technology behind Responsive Design is the **Media Query**. It acts as an IF-statement in CSS.

TICK3css
/* Mobile-First Base Styles */
.sidebar {
  display: none; 
}

/* Tablet & Desktop Override */
@media (min-width: 768px) {
  .sidebar {
    display: block; 
  }
}
TICK3

## Mobile-First Architecture
Modern web development strictly adheres to the "Mobile-First" philosophy. 
You write the default CSS targeting the narrowest smartphone screen (stacking elements vertically). Then, you use TICK1min-widthTICK1 media queries to progressively enhance the layout as the screen gets wider (converting the vertical stack into a horizontal CSS Grid).

This is drastically more performant because smartphones (which have weaker CPUs) do not have to download and parse complex desktop layout rules only to override them.

## The Viewport Meta Tag
If you forget this tag, Responsive Design will completely fail:
TICK3html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
TICK3
Without this, iPhones will assume your website is a legacy 1999 desktop site, and will violently zoom out, rendering the text at an unreadable microscopic size.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Container Queries/index.mdx': `---
title: Container Queries
description: The next evolution of Responsive Design, allowing elements to adapt based on the size of their parent container rather than the global viewport.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Container Queries">

For a decade, Media Queries (TICK1@mediaTICK1) were the only way to build responsive layouts. However, Media Queries have a massive architectural flaw: they can only check the width of the **entire screen (the viewport)**.

In modern Component-Based Architecture (React/Vue), you build reusable widgets (like a TICK1ProductCardTICK1). 
If you put the TICK1ProductCardTICK1 in a wide main section, it should look horizontal. If you put that exact same TICK1ProductCardTICK1 into a narrow sidebar, it should look vertical. A Media Query cannot solve this, because the global screen size hasn't changed!

## The Solution: @container

Released in 2022, **Container Queries** solve this massive problem. They allow a component to query the width of its *immediate parent container*, rather than the global screen.

1. First, you must explicitly declare the parent as a container:
TICK3css
.sidebar {
  container-type: inline-size;
}
TICK3

2. Then, you write a container query inside the child component:
TICK3css
.product-card {
  display: flex; /* Default Horizontal */
}

/* IF the parent container is narrower than 400px, snap to vertical */
@container (max-width: 400px) {
  .product-card {
    flex-direction: column;
  }
}
TICK3

This revolutionizes component reusability. The TICK1ProductCardTICK1 is now 100% context-aware and will perfectly adapt its layout regardless of where you place it in the DOM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Variables & Tokens/index.mdx': `---
title: CSS Variables & Design Tokens
description: The native mechanism for defining dynamic, reusable values (colors, spacing) to ensure absolute design consistency and enable Dark Mode.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CSS Variables & Design Tokens">

Historically, if a company's brand color was TICK1#ff0000TICK1, developers had to manually type TICK1#ff0000TICK1 on 5,000 different buttons, borders, and text elements. If the CEO decided to rebrand to blue, it required a massive, error-prone find-and-replace operation.

Preprocessors like Sass solved this with static variables, but **CSS Custom Properties (CSS Variables)** brought this natively to the browser with one massive advantage: they are dynamic and can be manipulated by Javascript in real-time.

## The Syntax
Variables are typically declared on the root element (TICK1:rootTICK1) to make them globally accessible. They must be prefixed with two dashes TICK1--TICK1.

TICK3css
:root {
  --brand-primary: #ff0000;
  --spacing-md: 16px;
}

.btn {
  background-color: var(--brand-primary);
  padding: var(--spacing-md);
}
TICK3

## Design Tokens & Dark Mode
CSS Variables are the architectural foundation of **Design Tokens**—the strict mathematical constants (colors, typography, spacing) that define a company's Design System.

Because CSS Variables are dynamic, implementing a complex **Dark Mode** takes exactly 3 lines of code. You don't have to rewrite the button classes; you simply overwrite the variable definitions!

TICK3css
/* Default Light Mode */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

/* Dark Mode Override */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #121212;
    --text-color: #ffffff;
  }
}
TICK3
The browser instantly recalculates the entire page, swapping the colors flawlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Animations & Transforms/index.mdx': `---
title: Animations, Transitions & Transforms
description: The high-performance CSS APIs utilized to smoothly animate elements using hardware-accelerated GPU processing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Animations, Transitions & Transforms">

Historically, animating a dropdown menu or a loading spinner required heavy Javascript loops (TICK1setIntervalTICK1). This was catastrophically bad for performance because it blocked the main CPU thread.

CSS introduced native Animation APIs that offload the complex math directly to the GPU, guaranteeing a buttery-smooth 60 Frames Per Second (FPS).

## The Big Three

### 1. Transforms
The TICK1transformTICK1 property allows you to mathematically manipulate the visual rendering of an element without disrupting the DOM layout.
- TICK1transform: translateX(50px)TICK1 (Moves it right)
- TICK1transform: scale(1.5)TICK1 (Makes it larger)
- TICK1transform: rotate(45deg)TICK1 (Spins it)

*Crucial rule: Translating an element is 100x faster than animating its TICK1margin-leftTICK1, because translating happens on the GPU and does not trigger a browser Layout Reflow.*

### 2. Transitions
A Transition tells the browser to automatically interpolate the frames between State A and State B when an interaction occurs.
TICK3css
.btn {
  background-color: blue;
  transition: background-color 0.3s ease-in-out;
}
.btn:hover {
  background-color: red;
}
TICK3
When hovered, the browser automatically generates all the purple frames in between over 300 milliseconds.

### 3. Keyframe Animations
While Transitions require a user interaction (like a hover), Keyframes allow you to define complex, multi-step, infinitely looping animations.
TICK3css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
TICK3

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
