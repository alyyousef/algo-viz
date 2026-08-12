import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/CSS Preprocessors/index.mdx': `---
title: CSS Preprocessors (Sass, Less, Stylus)
description: The first major evolution of CSS tooling, introducing variables, nesting, and mathematical functions to styling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CSS Preprocessors">

In the late 2000s, writing pure CSS was a nightmare. The language lacked variables, you couldn't write functions, and you had to rewrite massive selector chains repeatedly. 
To solve this, developers created **Preprocessors**—new styling languages that compiled mathematically down into standard CSS before being shipped to the browser.

## The Big Three

### 1. Sass / SCSS (Syntactically Awesome Style Sheets)
The absolute king of preprocessors, primarily utilizing the TICK1.scssTICK1 syntax. It brought programmable logic to CSS.
- **Variables**: TICK1$primary-color: #3bbfce;TICK1 (Note: This predates native CSS Custom Properties).
- **Nesting**: You could nest selectors hierarchically, avoiding massive repetition.
- **Mixins**: Reusable blocks of code that could accept arguments.

TICK3scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
TICK3

### 2. Less (Leaner Style Sheets)
Heavily popularized by the original Bootstrap framework. It functioned very similarly to Sass but was written natively in Javascript (whereas original Sass was Ruby-based). It used TICK1@TICK1 for variables instead of TICK1$TICK1.

### 3. Stylus
The most minimalist preprocessor. It allowed developers to completely omit colons, semicolons, and curly braces if they desired, relying strictly on python-esque indentation.

## Modern Relevance
Today, native CSS has caught up. We have native CSS Variables, and native CSS Nesting is now universally supported in modern browsers. 
Because of this, the usage of heavy preprocessors like Sass has significantly declined in favor of PostCSS and Tailwind.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/PostCSS/index.mdx': `---
title: PostCSS (The CSS Babel)
description: A powerful Javascript-based tool that mathematically transforms CSS via an ecosystem of plugins, most notably Autoprefixer.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PostCSS">

Unlike Sass or Less, **PostCSS is not a preprocessor or a language.** You do not write "PostCSS syntax." 
Instead, PostCSS is a Javascript tool that parses standard CSS into an Abstract Syntax Tree (AST), allows plugins to mathematically modify the AST, and then strings it back into CSS.

Because of this, PostCSS is often referred to as the **"Babel of CSS"**.

## The Plugin Ecosystem

The true power of PostCSS comes entirely from its massive plugin ecosystem.

### Autoprefixer
This is the most famous and widely used PostCSS plugin in the world. 
Historically, if a developer wanted to use a cutting-edge CSS feature (like Flexbox or Grid), they had to manually write "Vendor Prefixes" to support older browsers (e.g., TICK1-webkit-TICK1, TICK1-moz-TICK1).

Autoprefixer completely automates this. You write pure, standard, futuristic CSS. Autoprefixer mathematically analyzes your code, checks the TICK1caniuse.comTICK1 database, and automatically injects exactly the right vendor prefixes required for your specific browser target list.

TICK3css
/* You write this: */
.example { display: flex; }

/* Autoprefixer compiles it to: */
.example {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
TICK3

### Tailwind CSS
Tailwind CSS itself is actually just a massive PostCSS plugin! When you write TICK1@tailwind utilities;TICK1, the Tailwind PostCSS plugin scans all your HTML files, mathematically generates only the utility classes you actually used, and injects them into the final CSS file.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Component Frameworks/index.mdx': `---
title: Component Frameworks (Bootstrap & Foundation)
description: The era of massive, pre-built CSS frameworks that provided ready-to-use UI components and grid systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Component Frameworks">

Before modern CSS Grid and Flexbox were universally supported, building a responsive layout was a mathematically horrifying experience involving TICK1float: left;TICK1 and clearing hacks. 

To standardize web development, massive Component-Based CSS Frameworks emerged.

## Bootstrap (The King of the 2010s)
Created by Twitter, Bootstrap was the most influential CSS framework in history. It provided a mathematically perfect **12-Column Responsive Grid System**. 
By simply applying classes like TICK1col-md-6TICK1, a developer could instantly create a complex layout that automatically stacked vertically on mobile phones.

Bootstrap also provided a massive suite of pre-designed components: Navbar, Modals, Cards, and Buttons. 
TICK3html
<button class="btn btn-primary">Save Changes</button>
TICK3

The primary flaw of Bootstrap was **The "Bootstrap Look."** Because millions of websites used it without heavy customization, the entire internet started looking exactly the same. Furthermore, overriding Bootstrap's heavily specific CSS required massive amounts of TICK1!importantTICK1 hacks.

## Foundation
Created by ZURB, Foundation was the primary competitor to Bootstrap. It was heavily favored by enterprise developers because it was slightly more modular, structurally agnostic, and was the first framework to aggressively push the "Mobile-First" design philosophy.

## Bulma
A modern alternative that arrived later. Unlike Bootstrap (which historically required heavy jQuery/Javascript dependencies for its dropdowns and modals), Bulma was purely CSS-based and built entirely on the modern Flexbox architecture.

## The Modern Decline
Today, component frameworks have massively declined. The 12-column grid is now natively solvable in 3 lines of pure CSS Grid. Furthermore, companies prefer building their own custom Design Systems using React/Vue components styled with Tailwind CSS, rather than fighting against Bootstrap's opinionated defaults.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Scoped CSS/index.mdx': `---
title: Scoped CSS (Modules & CSS-in-JS)
description: The architectural shift driven by React to mathematically scope styling locally to a specific component, preventing global CSS leaks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scoped CSS (Modules & CSS-in-JS)">

The greatest architectural flaw of standard CSS is that everything operates in a single, global namespace.
If Developer A writes TICK1.card { padding: 20px; }TICK1 on the homepage, and Developer B writes TICK1.card { padding: 50px; }TICK1 on the dashboard, the entire application will catastrophically explode due to a global cascade collision.

When the industry shifted to Component-Based Architecture (React/Vue), they needed a way to strictly **Scope** CSS locally to a single component.

## 1. CSS Modules
A CSS Module is just a standard CSS file (e.g., TICK1Button.module.cssTICK1).
However, during the Webpack/Vite build process, the compiler mathematically hashes the class names to guarantee they are globally unique.

TICK3css
/* Button.module.css */
.btn { background: red; }
TICK3
TICK3tsx
import styles from './Button.module.css';

// Renders as: <button class="_btn_a89bc">
export const Button = () => <button className={styles.btn}>Click</button>
TICK3
This flawlessly solves the global collision problem while allowing developers to write standard CSS.

## 2. CSS-in-JS (Styled Components / Emotion)
Instead of writing separate CSS files, CSS-in-JS literally embeds the CSS directly inside the Javascript file using Tagged Template Literals.

TICK3tsx
import styled from 'styled-components';

const StyledButton = styled.button\TICK1
  background-color: \${props => props.primary ? 'blue' : 'gray'};
  padding: 10px;
\TICK1;

export const App = () => <StyledButton primary>Save</StyledButton>
TICK3

**The Architectural Advantage**: You have absolute mathematical access to Javascript variables. You can pass React state or props directly into the CSS logic.
**The Architectural Flaw**: The browser has to download, parse, and execute heavy Javascript to mathematically generate the CSS at runtime, which drastically hurts performance and Time-To-Interactive (TTI) compared to static CSS files.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/15. HTML & CSS/15.2 CSS/Tailwind CSS/index.mdx': `---
title: Tailwind CSS (Utility-First)
description: The modern industry-standard styling architecture that completely abandons semantic classes in favor of low-level, composable utility classes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tailwind CSS">

Historically, the industry believed in **"Separation of Concerns"**. You write your HTML structure in one file, and you write your semantic CSS (TICK1.author-bio-cardTICK1) in a completely separate file. 

As codebases scaled to millions of lines, this became a maintenance disaster. You had thousands of CSS files containing slightly varying shades of blue, and developers were terrified to delete old CSS code out of fear that it might break something on a forgotten page.

## The Utility-First Revolution
Created by Adam Wathan, **Tailwind CSS** violently rejected this philosophy. Instead of semantic classes, Tailwind provides thousands of mathematically precise, low-level **Utility Classes** that map directly to single CSS properties.

TICK3html
<div class="flex items-center justify-center p-4 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
  <h1 class="text-white text-xl font-bold">Hello World</h1>
</div>
TICK3

### The Architectural Triumphs
1. **Zero Context Switching**: You style the component exactly where you write the markup. You never have to open a separate CSS file.
2. **Absolute Deletion Safety**: If you delete the React Component, the styling is instantly deleted with it. You never accumulate dead CSS.
3. **Mathematical Design Constraints**: Because you must use Tailwind's predefined spacing scale (TICK1p-4TICK1, TICK1p-8TICK1) and color palettes (TICK1blue-500TICK1), your UI achieves mathematical consistency across the entire company.
4. **Infinite Scalability**: The final CSS file size mathematically plateaus. No matter how many thousands of pages you build, you are just reusing the exact same ~3,000 utility classes.

### The Backlash
Many developers initially hate Tailwind, claiming it looks like "inline styles" and creates horrifyingly ugly HTML files (TICK1div class="w-full h-full flex flex-col md:flex-row..."TICK1). 
However, because modern development is Component-Based (React/Vue), this ugly markup is encapsulated inside a reusable TICK1<ProductCard>TICK1 component and is never duplicated. 

Tailwind is currently the most dominant and rapidly growing styling architecture in the global tech industry.

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
