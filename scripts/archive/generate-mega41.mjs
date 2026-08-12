import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Core UI Frameworks/index.mdx': `---
title: Core UI Frameworks (React, Vue, Angular, Svelte, Solid)
description: The massive architectural shift from imperative DOM manipulation to declarative, state-driven UI frameworks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Core UI Frameworks">

Historically, rendering a list of users on a screen required manually querying the DOM (TICK1document.getElementByIdTICK1) and mathematically updating individual HTML nodes in a highly imperative manner. As applications grew into massive Single Page Applications (SPAs), this led to catastrophic spaghetti code.

The industry solved this by introducing **Declarative UI Frameworks**. You define what the UI *should* look like based on current data (State), and the framework mathematically handles updating the actual DOM for you.

## 1. React (The Global Standard)
Created by Facebook. React is not actually a framework; it's a library. It introduced two massive architectural paradigms:
1. **Component-Based Architecture**: Breaking the UI into reusable, isolated Javascript functions.
2. **The Virtual DOM**: Interacting with the real DOM is incredibly slow. React keeps a lightweight Javascript copy of the DOM in memory. When state changes, React mathematically calculates the "Diff" between the old Virtual DOM and the new Virtual DOM, and then executes a single, highly-optimized batch update to the real DOM.

## 2. Vue.js
Created by Evan You. Vue was designed to take the best parts of Angular and React. It uses a Virtual DOM like React but uses a mathematically "Reactive" state system. Instead of explicitly calling TICK1setStateTICK1, Vue uses Javascript Proxies to silently track when a variable is accessed or mutated, triggering automatic UI updates.

## 3. Angular
Created by Google. Unlike React, Angular is a massive, highly-opinionated **Framework**. It forces you to write in TypeScript and provides built-in routing, state, and HTTP clients. It historically utilized **Two-Way Data Binding** and complex decorators, making it the dominant choice for massive, strictly-architected enterprise applications.

## 4. Svelte (The Compiler Revolution)
Created by Rich Harris. Svelte completely shattered the industry by declaring: **"The Virtual DOM is pure overhead."**
Unlike React, Svelte does not ship a heavy framework runtime to the browser. Instead, Svelte is a **Compiler**. During the build step, it mathematically analyzes your code and compiles it down to tiny, highly-optimized, imperative Vanilla Javascript DOM updates.

## 5. SolidJS
Created by Ryan Carniato. Solid looks identical to React (using JSX and Signals), but like Svelte, it completely abandons the Virtual DOM. It compiles down to direct DOM nodes, making it the fastest Javascript framework in existence for raw performance benchmarks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Minimalist UI/index.mdx': `---
title: Minimalist UI (jQuery, HTMX, Alpine.js)
description: The legacy of imperative DOM manipulation, and the modern rebellion against the massive complexity of Single Page Applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Minimalist UI">

Not every website needs to be a 5MB React Single Page Application. If you are building a simple blog or an e-commerce landing page, shipping massive Javascript bundles is terrible for performance and SEO.

## 1. jQuery (The Historical King)
In the late 2000s, Javascript was a nightmare. Every browser (Internet Explorer, Firefox, Chrome) implemented the DOM API differently. 
**jQuery** mathematically solved this by providing a unified, incredibly simple API wrapper.
TICK3js
// Selecting an element and fading it out
$('#login-btn').fadeOut();
TICK3
jQuery became the most widely used library in history. Today, it is largely obsolete because native Javascript (ES6) absorbed all of its best features (like TICK1document.querySelectorTICK1 and TICK1fetchTICK1).

## 2. HTMX (The HTML Rebellion)
Created by Carson Gross, **HTMX** is a rapidly growing philosophy that violently rejects the complexity of React.
The core philosophy is: **HTML is already a great language, it's just missing features.** 

Instead of writing massive Javascript fetch requests to update the DOM, HTMX allows you to do it directly in HTML attributes:
TICK3html
<button 
  hx-post="/api/like-button" 
  hx-target="#like-count" 
  hx-swap="innerHTML">
  Like
</button>
TICK3
When clicked, HTMX automatically sends a POST request, takes the raw HTML the server sends back, and seamlessly injects it into the TICK1#like-countTICK1 div without a page reload.

## 3. Alpine.js
Often paired with Tailwind CSS, Alpine.js brings the reactive power of Vue directly into HTML without requiring a massive build step (Webpack/Vite). It is designed to sprinkle tiny bits of interactivity (like dropdowns and modals) into static HTML pages.

TICK3html
<div x-data="{ open: false }">
    <button @click="open = true">Open Dropdown</button>
    <ul x-show="open" @click.outside="open = false">
        <li>Settings</li>
    </ul>
</div>
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Meta-Frameworks/index.mdx': `---
title: The Meta-Frameworks (Next.js, Remix, Nuxt, Astro)
description: The architectural shift from client-side Single Page Applications to Server-Side Rendering (SSR) and Static Site Generation (SSG).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Meta-Frameworks">

When you build a standard React app (Vite/Create-React-App), it generates an entirely blank HTML file containing only TICK1<div id="root"></div>TICK1. 
The browser must download massive Megabytes of Javascript before it can mathematically construct the UI. 

This causes two catastrophic problems:
1. **Terrible SEO**: When Googlebot crawls the page, it sees a blank white screen and penalizes your ranking.
2. **Terrible Performance**: Users on slow 3G mobile networks stare at a white screen for 5 seconds waiting for JS to download.

To solve this, the industry invented **Meta-Frameworks** (Frameworks built on top of Frameworks).

## Server-Side Rendering (SSR)
Instead of constructing the HTML in the user's browser, a Meta-Framework runs a Node.js server. When a user requests a URL, the Node server executes the React code, mathematically computes the final HTML string, and sends fully populated HTML to the browser instantly.

## The Big Players

### 1. Next.js (React)
Created by Vercel. Next.js is the absolute industry standard for enterprise React applications. It pioneered **File-System Routing** (creating a TICK1page.tsxTICK1 file automatically creates a URL route). It seamlessly supports SSR, Static Site Generation (SSG), and the revolutionary new **React Server Components (RSC)** architecture.

### 2. Remix (React)
Created by the authors of React Router (now acquired by Shopify). Remix violently rejects SSG and focuses strictly on high-performance SSR. It relies heavily on native web standards (like standard HTTP Request/Response objects) and uses advanced mathematical caching to parallelize data fetching, eliminating waterfall network requests.

### 3. Nuxt (Vue)
The Vue equivalent to Next.js. It provides the exact same architectural benefits (SSR, File-System Routing, API routes) but is tailored perfectly for the Vue ecosystem.

### 4. Astro (The Island Architecture)
A modern framework that fundamentally altered the paradigm. Astro generates 100% pure, static HTML with zero Javascript shipped to the browser by default. 
If you need an interactive component (like a React Carousel), Astro utilizes **Island Architecture**—it mathematically hydrates *only* that specific carousel with Javascript, leaving the rest of the page as pure, blazing-fast HTML.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/State Management/index.mdx': `---
title: State Management (Redux, Zustand, MobX, XState)
description: The complex architectural patterns required to share data globally across hundreds of deeply nested UI components.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="State Management">

In a component-based architecture (like React), passing data (State) down through 10 layers of child components is called **Prop Drilling**. It creates unmaintainable spaghetti code.
To solve this, we extract the data into a Global Store that any component can access directly.

## 1. Redux (The Flux Architecture)
Created by Dan Abramov. For years, Redux was the absolute mandatory standard for React apps. It implements a strict unidirectional data flow called **Flux**.
- **State** is completely immutable. You cannot mathematically modify it directly.
- You must dispatch an **Action** (a string like TICK1"USER_LOGGED_IN"TICK1).
- A **Reducer** (a pure mathematical function) intercepts the action, copies the state, applies the change, and returns the new state.

**The Flaw**: Redux required a catastrophic amount of boilerplate code (Actions, Reducers, Types, Thunks) just to update a single boolean value. Today, it is largely wrapped in **Redux Toolkit (RTK)** to minimize this boilerplate.

## 2. Zustand (The Minimalist King)
German for "State". Created by Daishi Kato, Zustand is currently the most heavily favored state management library in the React ecosystem. 
It completely abandons Redux boilerplate. It uses modern React Hooks to create a tiny, mathematically flawless global store with zero providers required.

TICK3ts
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}))
TICK3

## 3. MobX (The Reactive Approach)
Unlike Redux's strict immutable paradigm, MobX encourages you to mathematically mutate state directly. It relies heavily on Object-Oriented Programming (Classes) and Javascript Proxies/Observables. When you change a property, MobX automatically triggers re-renders on the exact components observing that specific property.

## 4. XState (State Machines)
Instead of managing random variables (TICK1isLoadingTICK1, TICK1isErrorTICK1), XState mathematically models your application as a **Finite State Machine**. An application can only be in one state at a time (e.g., TICK1idleTICK1 -> TICK1loadingTICK1 -> TICK1successTICK1). This entirely prevents "impossible states" (like being TICK1isError: trueTICK1 and TICK1isSuccess: trueTICK1 simultaneously).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Data Fetching & Routing/index.mdx': `---
title: Data Fetching & Routing (TanStack, React Router)
description: The sophisticated architectures required to synchronize server state with the UI, manage HTTP caching, and orchestrate client-side URL navigation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Fetching & Routing">

Historically, developers used Redux to store API data. This was a catastrophic architectural mistake. **Server Data is not Global UI State.** Server Data is inherently asynchronous, instantly becomes stale, and requires complex polling and caching logic.

## TanStack Query (React Query)
Created by Tanner Linsley, TanStack Query mathematically solved the "Server State" problem and rendered Redux largely obsolete for API calls.

Instead of writing massive TICK1useEffectTICK1 hooks to fetch data, you use TanStack Query.
TICK3ts
const { data, isLoading, isError } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos
})
TICK3

It automatically handles:
1. **Caching**: If you visit the Todos page again, it instantly shows the cached data while secretly fetching updates in the background.
2. **Deduplication**: If 5 components request the Todos simultaneously, it mathematically merges them into exactly 1 network request.
3. **Retry Logic**: It automatically retries failed network requests 3 times with exponential backoff.

## Client-Side Routing
In a traditional website, clicking a link causes a hard page refresh (the browser downloads a new HTML file). 
In a Single Page Application (SPA), the browser mathematically suppresses the hard refresh, updates the URL via the HTML5 History API, and Javascript instantly mounts a new component.

### 1. React Router
The undisputed historical king of SPA routing. Created by Remix (now Shopify). It utilizes a complex nested route architecture, allowing inner sections of a page (like a dashboard widget) to navigate independently of the outer layout.

### 2. TanStack Router
A massive modern challenger. It is built entirely around 100% Type-Safety. It ensures that if you link to a URL route that requires a TICK1?userId=123TICK1 search parameter, the TypeScript compiler will violently crash if you forget to provide it.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Forms & Validation/index.mdx': `---
title: Forms & Validation (React Hook Form, Formik)
description: The architectural patterns required to capture complex user input securely while minimizing devastating React re-render cycles.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Forms & Validation">

Building forms in modern SPAs is notoriously difficult. You must track the value of 20 different text inputs, run Regex validation in real-time, display localized error messages, and handle loading states—all without completely destroying the app's performance.

## The Performance Problem: Controlled Components
In standard React, developers build "Controlled Forms". Every time a user types a single character in the password field, React updates the State, which forces the *entire massive form component* to re-render. If you type 10 characters, the form re-renders 10 times. On a complex form with heavy UI, this causes massive keystroke latency.

## React Hook Form (The Uncontrolled Revolution)
React Hook Form mathematically solved this performance crisis. 
Instead of tracking every keystroke in React State, it uses **Uncontrolled Components**. It registers a standard HTML input using a Javascript TICK1refTICK1. 

When the user types, the DOM updates natively, but React does *not* re-render. The values are mathematically extracted directly from the DOM only when the form is actually submitted. This drastically reduces re-renders to near-zero.

TICK3ts
const { register, handleSubmit, formState: { errors } } = useForm();

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
    {errors.email && <span>Email is invalid</span>}
  </form>
);
TICK3

## Formik
Historically the most popular form library in React. It heavily popularized the standard architecture of managing form state, validation, and submission handlers in a unified object. However, because it relies on standard Controlled Components (triggering heavy re-renders on every keystroke), the industry has largely migrated away from Formik to React Hook Form.

## Schema Validation (Zod)
Instead of writing manual IF-statements for validation, the industry utilizes **Zod** (a TypeScript-first schema validation library). You mathematically define the exact shape of your data, and tools like React Hook Form natively integrate with Zod to enforce the rules.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Component Libraries/index.mdx': `---
title: Component Libraries & Storybook
description: The enterprise strategy of utilizing pre-built, highly-accessible UI systems and documenting them in isolated sandbox environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Component Libraries & Storybook">

Building a fully accessible, keyboard-navigable Dropdown or Date Picker from scratch is mathematically incredibly difficult. It requires strict adherence to complex W3C ARIA specifications. 
Instead of wasting thousands of hours reinventing the wheel, companies use Component Libraries.

## Headless UI vs Styled UI

### 1. Styled Libraries (Material UI, Ant Design)
These libraries ship massive amounts of pre-written CSS. 
**Material UI (MUI)** is the most widely used React library in the world. It provides thousands of components that strictly adhere to Google's Material Design specification. 
**The Flaw**: It is notoriously difficult to customize. Overriding MUI's internal CSS often requires ugly specificity hacks, resulting in every app looking exactly like a Google product.

### 2. Headless UI (Radix, HeadlessUI, Ark)
The modern architectural revolution. A Headless library provides the raw JavaScript logic, state management, and strict ARIA accessibility required for a complex component (like an Accordion), but ships **Zero CSS**.
You are mathematically forced to write your own CSS (usually Tailwind) to style it. This guarantees that your application remains 100% uniquely branded while benefiting from flawless accessibility logic. 

**Shadcn UI** is the current industry pinnacle of this. It uses Radix under the hood, but instead of installing it as an NPM package, you literally copy and paste the raw React code into your project, giving you absolute ownership over the component.

## Storybook (Component Isolation)
In a massive enterprise codebase with 500 components, developers often struggle to find existing buttons, leading to duplicated code.

**Storybook** is an isolated Sandbox environment that runs completely separately from your main application. 
It mathematically renders a catalog of every single UI component in your system, allowing designers and developers to visually click, hover, and test the components without needing to navigate through a complex login flow in the actual app.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Animation/index.mdx': `---
title: Animation (Framer Motion, GSAP)
description: The advanced Javascript architectures used to execute buttery-smooth, physics-based animations at 60 frames per second.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Animation (Framer Motion, GSAP)">

While basic CSS Transitions and Keyframes are sufficient for simple hover effects, they completely fall apart when orchestrating massive, multi-step, scroll-linked animations or animating components mounting and unmounting from the DOM.

## 1. Framer Motion (The Physics Engine)
Created by Matt Perry, Framer Motion is the absolute standard for React animation.
Instead of dealing with rigid CSS durations (like TICK10.3sTICK1), Framer Motion is built on a mathematical **Spring Physics** engine. You define mass, stiffness, and damping, resulting in fluid, organic animations that mimic the real world.

Crucially, it introduced the TICK1<AnimatePresence>TICK1 wrapper, mathematically solving the hardest problem in React: animating a component *out* of the DOM just before it gets violently unmounted by state changes.

TICK3tsx
<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 100 }}
>
  Hello
</motion.div>
TICK3

## 2. GSAP (GreenSock Animation Platform)
Before modern React existed, GSAP was the undisputed king of web animation, and it remains the most powerful library in existence for raw timeline orchestration.

GSAP completely bypasses CSS and uses highly-optimized Javascript math via TICK1requestAnimationFrameTICK1 to manipulate DOM properties directly at 60+ FPS. 
It is explicitly designed for building massive "Scrollytelling" websites (like the Apple iPhone landing pages) where the entire page's animation state is mathematically linked to the user's scrollbar position (via the ScrollTrigger plugin).

## 3. Lottie
Created by Airbnb. Lottie is an architecture that mathematically exports complex Adobe After Effects animations as tiny JSON files. The Lottie web player parses the JSON and renders the animation using high-performance SVGs, allowing designers to ship Hollywood-level animations directly to the browser with zero coding required.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/17. Frontend Frameworks, Libraries & State Management/Data Visualization & 3D/index.mdx': `---
title: Data Visualization & 3D (D3.js, Three.js)
description: The highly specialized mathematical libraries used to render complex SVG charts and interactive WebGL 3D environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Visualization & 3D">

When standard HTML divs are mathematically insufficient to represent massive datasets or complex geometries, we shift to the Canvas API, SVGs, and WebGL.

## 1. D3.js (Data-Driven Documents)
Created by Mike Bostock (at the New York Times), D3 is the absolute bedrock of web data visualization.
D3 is not a "charting library" (it doesn't have a TICK1<BarChart>TICK1 component). Instead, it is a low-level mathematical engine that takes massive JSON arrays of data, computes the complex geometric scales (mapping a $1,000,000 salary to a 50px high pixel coordinate), and binds the data directly to SVG DOM elements.

**The Flaw**: D3 aggressively mutates the DOM natively. This completely conflicts with React's Virtual DOM architecture.

## 2. Recharts & Chart.js
To solve the D3 conflict, developers created high-level wrappers.
- **Recharts**: The most popular React charting library. It uses D3 under the hood strictly for the mathematical scaling calculations, but allows React to handle the actual rendering of the SVG DOM nodes, flawlessly respecting the Virtual DOM.
- **Chart.js**: A highly popular vanilla JS library that renders entirely onto an HTML5 TICK1<canvas>TICK1 element instead of using SVGs, making it incredibly performant for massive datasets (like plotting 50,000 stock market ticks).

## 3. Three.js (The WebGL Wrapper)
Writing raw WebGL (Web Graphics Library) to render a 3D cube in the browser requires hundreds of lines of horrifyingly complex C-style GLSL shader code and heavy matrix multiplication math.

**Three.js** is a massive Javascript abstraction layer over WebGL. It provides human-readable APIs for Cameras, Lighting, Geometries, and Materials. 
In the React ecosystem, this is dominated by **React Three Fiber (R3F)**, which brilliantly maps Three.js instances directly to React Components, allowing you to render a 3D spinning box using declarative JSX:

TICK3tsx
<Canvas>
  <ambientLight />
  <mesh rotation={[10, 10, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
</Canvas>
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
