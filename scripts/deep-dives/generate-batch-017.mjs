import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Web Components/index.mdx',
    content: `---
title: Web Components
description: "A suite of native browser technologies that allow developers to create encapsulated, reusable, and framework-agnostic custom HTML elements."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Web Components">
      {children}
    </ConceptTemplate>
  )
}

Historically, web developers relied on massive, monolithic frameworks (React, Angular, Vue) simply to encapsulate reusable UI logic. If you wanted a <DatePicker>, you had to pull in 500KB of JavaScript just to render it. Furthermore, a React <DatePicker> fundamentally could not be used inside an Angular application. 

**Web Components** solve this at the lowest architectural layer: the browser itself. By mathematically extending the browser's native DOM parser, developers can define their own custom HTML tags. These tags are completely framework-agnostic, natively encapsulated, and execute at bare-metal browser speeds without virtual DOM overhead.

## 1. Deep Dive & Mechanics

Web Components are not a single API, but rather an orchestration of three distinct mathematical browser specifications:

1. **Custom Elements:** The JavaScript API (TICK1customElements.define()TICK1) that allows you to mathematically register a new HTML tag (e.g., TICK1<my-button>TICK1) and bind it to a native ES6 Class.
2. **Shadow DOM:** The isolation engine. It mathematically guarantees that CSS and JavaScript inside the component cannot leak out, and global CSS cannot leak in. The component renders in a hidden, isolated DOM tree that is completely opaque to standard TICK1document.querySelectorTICK1 calls.
3. **HTML Templates:** The TICK1<template>TICK1 and TICK1<slot>TICK1 tags. The browser parses these tags into an inert mathematical memory structure. The contents are not rendered and scripts are not executed until the template is explicitly cloned and injected into the Shadow DOM, ensuring massive performance gains when rendering 1,000 instances of the same component.

## 2. Mathematical / Theoretical Foundation

The most critical mathematical concept in Web Components is the **Shadow Tree Encapsulation Boundary**.

When the browser's C++ rendering engine calculates the CSSOM (CSS Object Model), it performs a mathematical tree traversal. Normally, a global CSS rule like TICK1div { color: red; }TICK1 forces the engine to recalculate every TICK1<div>TICK1 in the entire document.

The Shadow DOM introduces a strict, mathematically impermeable boundary. When the C++ layout engine hits a **Shadow Root**, it completely halts CSS traversal from the outside in. This mathematical guarantee means that no matter how complex the global CSS of a WordPress or React site is, it physically cannot compute styles for the nodes inside the Shadow Tree. This encapsulation prevents "CSS Specificity Wars" entirely.

## 3. Real-World Implementation

Here is how you mathematically define a custom, encapsulated component completely free of frameworks.

TICK3javascript
class UserProfile extends HTMLElement {
  constructor() {
    super(); // Always call super first in constructor

    // 1. Mathematically attach a Shadow DOM tree to this element
    // 'open' means JavaScript outside can still mathematically query it if it explicitly tries
    this.attachShadow({ mode: 'open' });

    // 2. Define the encapsulated HTML and CSS
    const template = document.createElement('template');
    template.innerHTML = TICK1
      <style>
        /* This CSS is mathematically trapped inside the Shadow DOM */
        .card { 
          border: 1px solid #333; 
          padding: 1rem; 
          border-radius: 8px;
          background: #1a1a1a;
          color: white;
        }
        h2 { margin-top: 0; }
      </style>
      <div class="card">
        <!-- The <slot> is a mathematical placeholder for children passed from the outside -->
        <h2><slot name="username">Default User</slot></h2>
        <p><slot name="bio">No biography provided.</slot></p>
      </div>
    TICK1;

    // 3. Clone the inert template into active mathematical memory and append to Shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // 4. Mathematical lifecycle hook: Fires when the element is inserted into the real DOM
  connectedCallback() {
    console.log('User Profile mathematically injected into the layout engine.');
  }
}

// 5. Register the new tag with the browser's native HTML parser
customElements.define('user-profile', UserProfile);
TICK3

Once registered, you use it natively in HTML:
TICK3html
<user-profile>
  <span slot="username">Ada Lovelace</span>
  <span slot="bio">Mathematical pioneer and the first computer programmer.</span>
</user-profile>
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Global Light DOM
        Body[document.body] --> Div1[Standard div]
        Body --> CustomTag[user-profile element]
    end

    subgraph Shadow DOM (Encapsulated)
        ShadowRoot[#shadow-root] --> CardDiv[div class='card']
        CardDiv --> H2[h2]
        CardDiv --> P[p]
        
        H2 --> Slot1[slot name='username']
        P --> Slot2[slot name='bio']
    end

    CustomTag -.->|attachShadow| ShadowRoot

    classDef global fill:#1e40af,stroke:#60a5fa,stroke-width:2px;
    classDef shadow fill:#8b5cf6,stroke:#c4b5fd,stroke-width:2px;
    class Body,Div1,CustomTag global;
    class ShadowRoot,CardDiv,H2,P,Slot1,Slot2 shadow;
TICK3

## 5. Interview Prep

**Q: What is the difference between 'open' and 'closed' Shadow DOM?**
**A:** When you call TICK1attachShadow({ mode: 'open' })TICK1, the global JavaScript can still access the internal DOM via TICK1myElement.shadowRootTICK1. If you use TICK1{ mode: 'closed' }TICK1, the browser mathematically nullifies the TICK1shadowRootTICK1 property on the object, making it impossible for outside JavaScript to reach into the component (similar to native HTML elements like TICK1<video>TICK1).

**Q: Can Web Components replace React or Angular?**
**A:** Mathematically, they solve different problems. Web Components solve **encapsulation and reusability**. React solves **state management and declarative rendering**. While you *can* build an entire app using vanilla Web Components, updating the DOM when data changes is tedious. The modern architecture is to build a company's UI Design System (buttons, modals) in Web Components, and then drop those components into a React or Vue application to handle the high-level routing and state.

**Q: How do Web Components handle accessibility (a11y) inside the Shadow DOM?**
**A:** This is historically the most complex mathematical failure of Web Components. Because the Shadow DOM creates an impermeable boundary, screen readers initially struggled to associate labels in the Light DOM with inputs in the Shadow DOM. Modern solutions involve the TICK1ElementInternalsTICK1 API (AOM - Accessibility Object Model), allowing the custom element to mathematically broadcast its internal ARIA states directly to the OS accessibility tree.

## 6. Production Use Cases

- **Enterprise Micro-Frontends:** Massive corporations like Spotify and GitHub use Web Components extensively. Because different engineering teams use different frameworks (Team A uses React, Team B uses Vue), Web Components mathematically guarantee that the global "Navigation Bar" can be written once and dropped into any framework without dependency conflicts.
- **Cross-Framework UI Libraries:** Frameworks like **Lit** or **Stencil** compile down to native Web Components. Companies like Salesforce (Lightning Web Components) and Adobe (Spectrum Web Components) deploy their entire UI ecosystem using these native browser APIs, ensuring their design systems never become obsolete when a new JavaScript framework becomes trendy.

<Callout icon="warning" title="The SSR Problem">
Historically, Server-Side Rendering (SSR) mathematically failed with Web Components because the Shadow DOM required executing JavaScript (attachShadow) on the client. To solve this, the W3C introduced **Declarative Shadow DOM**. This allows servers to send a raw <template shadowroot="open"> tag inside the HTML, allowing the browser's C++ parser to construct the Shadow Tree before a single byte of JavaScript has downloaded.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebAssembly (Wasm)/index.mdx',
    content: `---
title: WebAssembly (Wasm)
description: "A mathematically rigid, binary instruction format designed as a portable, high-performance compilation target, bringing near-native execution speeds to the web browser."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="WebAssembly (Wasm)">
      {children}
    </ConceptTemplate>
  )
}

For over 20 years, JavaScript was the only programming language mathematically capable of executing natively in a web browser. While JavaScript engines (like Google's V8) became phenomenally fast via Just-In-Time (JIT) compilation, JavaScript's dynamic, garbage-collected nature makes it mathematically unsuited for CPU-intensive tasks like 3D video rendering, physics simulations, or real-time audio DSP.

**WebAssembly (Wasm)** shatters this monopoly. It is not a programming language you write by hand. It is a low-level, binary compilation target. You write code in high-performance languages like **C++, Rust, or Zig**, and the compiler mathematically translates that code into a compact binary format (TICK1.wasmTICK1). The browser's virtual machine then executes this binary at near-native hardware speed.

## 1. Deep Dive & Mechanics

WebAssembly operates on a fundamentally different mathematical architecture than JavaScript.

1. **Stack Machine:** Wasm executes instructions on a stack-based virtual machine. It pushes numbers onto a stack, mathematically operates on them, and pops the result. This maps beautifully to modern CPU architectures (x86, ARM), allowing the browser to compile the Wasm binary into raw machine code in milliseconds.
2. **Linear Memory:** JavaScript allocates objects in a chaotic heap managed by a Garbage Collector. Wasm is mathematically simpler. It requests a single, contiguous block of raw memory (an TICK1ArrayBufferTICK1) from the browser. The Wasm module treats this buffer exactly like physical RAM, reading and writing bytes at specific mathematical offsets using raw pointers. There is zero garbage collection overhead.
3. **The Sandbox:** Despite its raw power, Wasm cannot execute arbitrary system calls. It is mathematically trapped in a secure sandbox. It cannot touch the DOM, it cannot read files, and it cannot open network sockets directly. To do anything outside its mathematical box, it must explicitly call out to JavaScript functions passed into its environment.

## 2. Mathematical / Theoretical Foundation

The greatest mathematical victory of WebAssembly is **Predictable Performance**.

In JavaScript, an array of numbers TICK1[1, 2, 3]TICK1 might be optimized by the JIT compiler into an array of 32-bit integers. But if you accidentally push a string (TICK1arr.push("hello")TICK1), the V8 engine mathematically panics. It must throw away the highly optimized machine code, de-optimize the array back into a slow dictionary of pointers, and restart execution. This causes massive, unpredictable lag spikes.

WebAssembly provides **Mathematical Determinism**. 
Because Wasm is statically typed at compile time (an TICK1i32TICK1 is strictly a 32-bit integer), the browser's compiler knows the exact mathematical footprint of every instruction before execution begins. There is no de-optimization. The performance graph of a Wasm module is a perfectly flat line, guaranteeing stable 60 FPS in 3D gaming or glitch-free 44.1kHz audio processing.

## 3. Real-World Implementation

Here is how you execute a WebAssembly module compiled from Rust or C++ inside a standard JavaScript application.

TICK3javascript
// 1. Fetch the raw .wasm binary file over the network
// WebAssembly.instantiateStreaming mathematically streams the binary and compiles it 
// simultaneously, resulting in blazing fast startup times.
const wasmModule = await WebAssembly.instantiateStreaming(
  fetch('physics_engine.wasm'), 
  {
    // 2. The Import Object: This is how we mathematically inject JavaScript functions 
    // into the Wasm sandbox so it can communicate with the outside world.
    env: {
      console_log: (pointer) => {
        console.log("Wasm says memory address:", pointer);
      }
    }
  }
);

// 3. Extract the mathematically optimized functions exported by the Wasm module
const { calculate_gravity, memory } = wasmModule.instance.exports;

// 4. Execute the raw binary function
// This executes in the browser's Wasm VM at near-native C++ speeds.
const result = calculate_gravity(9.81, 100);
console.log("Calculated force:", result);

// 5. Direct Memory Access
// Wasm's linear memory is exposed to JS as a raw ArrayBuffer.
// We can mathematically manipulate the exact bytes Wasm is using.
const rawBytes = new Uint8Array(memory.buffer);
console.log("Byte at memory address 0:", rawBytes[0]);
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph The Development Phase
        Rust[Rust / C++ Code] -->|LLVM Compiler| Wasm[physics.wasm Binary]
    end

    subgraph The Browser Execution Environment (V8)
        Wasm -->|Streaming Compile| MachineCode[Raw x86/ARM Machine Code]
        
        subgraph JS Context
            JS[JavaScript UI Thread]
        end
        
        MachineCode <-->|Function Calls| JS
        MachineCode <-->|Direct Pointers| SharedMem[Linear Memory ArrayBuffer]
        JS <-->|TypedArrays| SharedMem
    end

    Note over SharedMem: Linear Memory is the only way <br/>Wasm and JS can mathematically share <br/>large datasets (like image pixels).
TICK3

## 5. Interview Prep

**Q: Is WebAssembly going to replace JavaScript?**
**A:** No. Wasm is mathematically terrible at manipulating the DOM. If Wasm wants to change a TICK1<div>TICK1 color, it must pass a string across the boundary to JavaScript, which then updates the DOM. This boundary crossing is mathematically slow. JavaScript remains the king of UI and DOM manipulation. Wasm is designed exclusively for heavy mathematical computation (image processing, physics, cryptography). They are complementary.

**Q: What is WASI (WebAssembly System Interface)?**
**A:** The most disruptive evolution of Wasm. If Wasm is a secure, incredibly fast, portable binary, why limit it to the web browser? WASI mathematically defines a set of system calls (like reading files or opening sockets) for Wasm executing *outside* the browser. This allows a Wasm binary to run natively on a Linux server, a Mac laptop, or an IoT device without changing a single line of code, posing a massive threat to Docker containers.

**Q: How does Wasm handle strings?**
**A:** It mathematically doesn't. Wasm only understands four types: 32-bit and 64-bit integers, and 32-bit and 64-bit floats. If you want to pass the string "Hello" from JavaScript to Wasm, JavaScript must mathematically encode the string into UTF-8 bytes, copy those bytes into Wasm's Linear Memory array, and pass Wasm the integer memory address (pointer) of where the string starts.

## 6. Production Use Cases

- **Figma (Design Tool):** Figma's entire 2D rendering engine is written in C++ and compiled to WebAssembly. This allows them to execute complex mathematical layout algorithms and vector math directly in the browser, achieving native application speed that would be completely impossible in pure JavaScript.
- **AutoCAD and Photoshop on the Web:** Companies with 30 years of legacy C++ codebases (millions of lines of code) cannot rewrite their applications in JavaScript. WebAssembly allowed Adobe and Autodesk to literally run their native C++ desktop compilers, target Wasm, and ship Photoshop directly to the web browser with near-zero code rewrites.

<Callout icon="success" title="The Death of Plugins">
Historically, bringing native performance to the browser required deeply insecure, mathematically flawed plugins like Java Applets, ActiveX, or Adobe Flash. Because these plugins had direct access to the OS kernel, they caused decades of catastrophic security breaches. WebAssembly provides better performance than Flash while remaining mathematically locked inside the browser's V8 security sandbox.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebGL and WebGPU/index.mdx',
    content: `---
title: WebGL and WebGPU
description: "Low-level JavaScript APIs that expose the massive, parallel processing power of the system's Graphics Processing Unit (GPU) directly to the web browser."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="WebGL and WebGPU">
      {children}
    </ConceptTemplate>
  )
}

The standard HTML DOM and the 2D Canvas API execute on the CPU (Central Processing Unit). A CPU has a few very fast, highly intelligent cores (e.g., 8 cores). It is mathematically designed to do one complex task very quickly. However, rendering a 3D scene requires calculating the lighting, shadow, and color of 4 million individual pixels simultaneously, 60 times a second. A CPU will mathematically choke on this.

A GPU (Graphics Processing Unit) has thousands of slow, "dumb" cores. It is mathematically designed to do millions of simple calculations in massive parallel. **WebGL** (and its modern successor, **WebGPU**) are the mathematical bridges that allow JavaScript to take a massive array of numbers and ship them directly to the GPU for parallel execution.

## 1. Deep Dive: WebGL vs WebGPU

**WebGL (Web Graphics Library):**
Released in 2011, WebGL is a JavaScript binding to **OpenGL ES 2.0** (a C-based graphics API designed in the 1990s). WebGL is essentially a massive, complex mathematical state machine. You bind buffers, set global state flags, and execute draw calls. Because it was designed for an older era of single-core CPUs, WebGL forces the browser's single JavaScript thread to do heavy mathematical validation before every draw call, causing a severe CPU bottleneck.

**WebGPU:**
The modern revolution, enabled in browsers around 2023. WebGPU completely throws away OpenGL. It is a modern API designed to map directly to the architecture of modern graphics cards (Vulkan, Apple Metal, DirectX 12). It mathematically removes the CPU overhead by allowing the developer to pre-compile the entire rendering pipeline. Furthermore, it introduces **Compute Shaders**, allowing the GPU to be used for general-purpose mathematical calculations (like running Artificial Intelligence models) rather than just drawing triangles.

## 2. Mathematical / Theoretical Foundation

The absolute core of both APIs is the **Shader Architecture**.

JavaScript does not run on the GPU. You cannot write a JavaScript TICK1forTICK1 loop to color pixels. Instead, you must write **Shaders**—tiny, highly specialized programs written in a C-like mathematical language (GLSL for WebGL, or WGSL for WebGPU). These shaders are compiled by the browser and mathematically injected directly into the physical GPU hardware.

The mathematical pipeline works in two primary stages:
1. **The Vertex Shader:** Executed once for every 3D point (vertex) in your model. Its only mathematical job is to multiply the 3D coordinate TICK1(x, y, z)TICK1 by a massive 4x4 Transformation Matrix, calculating exactly where that 3D point lands on the flat 2D screen.
2. **The Fragment (Pixel) Shader:** After the GPU connects the vertices into a triangle, the Fragment Shader is executed simultaneously across thousands of GPU cores for every single pixel *inside* that triangle. Its mathematical job is to calculate the final color of that pixel, factoring in light vectors, shadow maps, and textures.

## 3. Real-World Implementation

Because raw WebGL requires ~200 lines of complex mathematical boilerplate just to draw a single triangle, 99% of web developers use an abstraction library like **Three.js** or **Babylon.js**.

Here is how Three.js mathematically abstracts the WebGL pipeline to render a spinning 3D cube.

TICK3javascript
import * as THREE from 'three';

// 1. Create the mathematical universe (Scene) and the Camera
const scene = new THREE.Scene();
// Camera(Field of View, Aspect Ratio, Near Clipping, Far Clipping)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 2. Initialize the WebGL Renderer and inject its <canvas> into the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Define the mathematical Geometry (Vertices) and the Material (Shaders)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 4. Combine them into a Mesh and mathematically place it in the Scene
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Mathematically pull the camera back so we aren't inside the cube
camera.position.z = 5;

// 5. The Render Loop (executed 60 times per second)
function animate() {
  requestAnimationFrame(animate);

  // Mathematically rotate the Transform Matrix of the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Execute the massive WebGL state machine to push the data to the GPU
  renderer.render(scene, camera);
}

animate();
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph CPU (JavaScript Main Thread)
        JS[Three.js Application] --> Buffers[Create TypedArrays Float32Array]
        Buffers --> State[Bind WebGL State]
        State --> DrawCall[Execute ctx.drawArrays]
    end

    subgraph GPU (Massive Parallel Execution)
        DrawCall --> Vertex[Vertex Shader Executes]
        
        Vertex --> Rasterization[Rasterizer converts math triangles to pixels]
        
        Rasterization --> Frag1[Fragment Shader Pixel 1]
        Rasterization --> Frag2[Fragment Shader Pixel 2]
        Rasterization --> Frag3[Fragment Shader Pixel 3]
        Rasterization --> FragN[Fragment Shader Pixel 4,000,000]
        
        Frag1 --> FrameBuffer[Frame Buffer]
        Frag2 --> FrameBuffer
        Frag3 --> FrameBuffer
        FragN --> FrameBuffer
    end
    
    FrameBuffer --> Screen((Computer Monitor))
TICK3

## 5. Interview Prep

**Q: What is a "Compute Shader" in WebGPU?**
**A:** This is the most mathematically disruptive feature of WebGPU. In WebGL, the GPU is strictly locked into a graphics pipeline (Vertex -> Fragment -> Screen). If you wanted to use the GPU to calculate physics or run a Neural Network, you had to mathematically trick the GPU by encoding your numbers as RGB pixel colors, running a Fragment shader, and reading the colors back. **WebGPU Compute Shaders** allow you to bypass the graphics pipeline entirely. You write a WGSL script that simply says: "Take this array of 10 million numbers, execute this mathematical equation on all of them in parallel, and return the result."

**Q: Why do WebGL and WebGPU use TICK1Float32ArrayTICK1 instead of standard JavaScript Arrays?**
**A:** A standard JavaScript array (TICK1[1.5, 2.0]TICK1) is mathematically bloated. The V8 engine wraps each number in an object with metadata, pointers, and prototype chains. The GPU physically cannot understand this structure; it only understands raw, contiguous binary bytes. TICK1Float32ArrayTICK1 allocates a mathematically pure, contiguous block of C-style memory. The browser can take this exact block of memory and instantly DMA (Direct Memory Access) blast it over the PCIe bus to the GPU VRAM with zero parsing overhead.

**Q: What is Z-Fighting?**
**A:** A classic mathematical floating-point precision error in 3D rendering. When two polygons are mathematically placed at the exact same Z-depth (or incredibly close to each other very far from the camera), the GPU's depth buffer rounds off the floating-point decimals. The GPU mathematically cannot determine which polygon is in front, causing them to aggressively flicker back and forth on the screen.

## 6. Production Use Cases

- **Browser-Based Machine Learning:** TensorFlow.js relies heavily on WebGL (and is rapidly porting to WebGPU). When a user runs a facial recognition AI model in the browser, TensorFlow translates the massive matrix multiplications into WebGL Shaders, allowing the laptop's GPU to process the neural network 100x faster than the JavaScript CPU thread.
- **Immersive Experiences:** Automotive configurators (like configuring a Porsche on their website) or real-estate architectural walkthroughs utilize WebGL. By streaming highly optimized geometry and 4K textures to the GPU, websites can render photorealistic, ray-traced materials (glass, metallic car paint) in real-time within the browser.

<Callout icon="info" title="The Security Threat of the GPU">
Because WebGL provides a direct mathematical pipe to the hardware GPU, it is a massive security vulnerability vector. If a developer writes an infinite loop inside a GLSL Fragment Shader (while(true){}), the GPU cores will physically lock up. Historically, this would crash the entire operating system and force a hard reboot. Modern browsers implement intense mathematical validation and timeout watchdog timers to instantly kill the WebGL context if the GPU stalls for more than a few milliseconds.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '```')
      .replace(/TICK1/g, '`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
