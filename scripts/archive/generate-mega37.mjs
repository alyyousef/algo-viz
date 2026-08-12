import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebAssembly (Wasm)/index.mdx': `---
title: WebAssembly (Wasm)
description: A low-level binary instruction format that allows languages like C++, Rust, and Go to run inside the web browser at near-native speeds.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebAssembly (Wasm)">

For 25 years, JavaScript was the only programming language that could natively execute inside a web browser. 
While V8 makes JS incredibly fast, JS is fundamentally a dynamic, garbage-collected language. It can never achieve the raw, predictable performance of C++ required for 3D video games, physics simulations, or video encoding.

In 2017, the major browser vendors released **WebAssembly (Wasm)**.

## What is WebAssembly?

WebAssembly is **not** a programming language that you write by hand. It is a **binary compilation target**.

Instead of writing JS, you write a high-performance video encoder in Rust. You then run the Rust compiler, but instead of compiling to Windows TICK1.exeTICK1 or Linux TICK1.elfTICK1, you compile it to a TICK1.wasmTICK1 binary file.

You then load that TICK1.wasmTICK1 file into the browser using JavaScript. The browser's Wasm virtual machine executes the binary instructions at near-native CPU speeds.

## The Wasm Sandbox
WebAssembly does **not** replace JavaScript; they work together.
Wasm executes inside a completely isolated, secure sandbox. It mathematically **cannot** touch the DOM, and it cannot make HTTP requests. 
If Wasm needs to change the color of a button, it must pass a message back to JavaScript, and JavaScript updates the DOM.

**Typical Use Cases:**
- Porting legacy desktop apps to the web (e.g., AutoCAD, Figma).
- Heavy cryptographic calculations.
- Real-time video/audio processing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebGL and WebGPU/index.mdx': `---
title: WebGL and WebGPU
description: The low-level graphics APIs that allow the browser to communicate directly with the local machine's Graphics Processing Unit (GPU).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebGL and WebGPU">

By default, the browser uses the CPU to parse HTML and paint CSS. But if you want to render a massive, fully interactive 3D video game running at 60 FPS in a web tab, the CPU will instantly melt. You must offload the mathematical matrix transformations to the **GPU**.

## WebGL (Web Graphics Library)
Released in 2011, WebGL is a JavaScript API based on the ancient OpenGL ES 2.0 standard.
It allows you to write C-like "Shader" programs (GLSL) that execute directly on the user's GPU. 

While extremely powerful, the raw WebGL API is incredibly verbose and mathematically complex. To draw a single colored triangle requires hundreds of lines of boilerplate code. Therefore, 99% of developers use abstraction libraries like **Three.js** or **Babylon.js** which wrap WebGL in a clean, object-oriented API.

## The Future: WebGPU
WebGL is fundamentally based on OpenGL, which was designed in the 1990s. Modern GPUs (architected around DirectX 12, Vulkan, and Apple Metal) operate very differently today.

**WebGPU** is the modern successor to WebGL. 
- **Compute Shaders**: While WebGL can only render graphics, WebGPU exposes "Compute Shaders"—allowing you to use the user's GPU to perform massive parallel calculations (like training AI models or simulating fluid dynamics) completely unrelated to drawing pixels.
- **Lower Overhead**: WebGPU maps much closer to modern GPU architectures, drastically reducing CPU overhead and unlocking console-quality graphics inside the browser.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Canvas API/index.mdx': `---
title: Canvas API
description: An HTML element and JavaScript API used to draw 2D graphics, raster images, and animations directly onto a bitmap surface.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Canvas API">

The DOM is great for laying out buttons and text. But if you want to build an interactive charting library, a 2D platformer game (like Mario), or a photo editing tool, manipulating thousands of DOM TICK1<div>TICK1 nodes will cause the browser to crash.

HTML5 introduced the TICK1<canvas>TICK1 element to solve this.

## The Bitmap Surface

A Canvas is essentially a blank, rasterized bitmap image sitting on your webpage. It has absolutely no DOM nodes inside it. 
Using JavaScript, you acquire the **2D Context** of the canvas and mathematically draw pixels onto it.

TICK3javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a red rectangle
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 150, 100);
TICK3

## Canvas vs SVG
- **SVG (Scalable Vector Graphics)**: SVGs are XML-based. Every circle or line in an SVG is a real DOM node. SVGs are resolution-independent and perfect for logos, but terrible for rendering 10,000 moving particles (because maintaining 10,000 DOM nodes destroys performance).
- **Canvas**: Canvas is immediate-mode rendering. Once you draw a red square, the canvas completely forgets it's a "square"—it just remembers the red pixels. This makes it blisteringly fast for rendering tens of thousands of dynamic sprites per frame.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebRTC/index.mdx': `---
title: WebRTC (Real-Time Communication)
description: A massive, complex open-source project and API that enables direct, peer-to-peer audio, video, and data streaming between browsers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebRTC (Real-Time Communication)">

If you want to build a video conferencing app like Zoom or Google Meet entirely inside a web browser, HTTP and WebSockets are entirely the wrong tools. They route all traffic through a central backend server, which introduces massive latency and requires the company to pay thousands of dollars in bandwidth costs.

To solve this, Google open-sourced **WebRTC**.

## The Peer-to-Peer Architecture

WebRTC allows Browser A (Alice) to connect *directly* to Browser B (Bob) over UDP, completely bypassing the backend server. The video stream flows directly from Alice's laptop to Bob's laptop.

However, establishing a direct P2P connection over the modern internet is incredibly difficult because of **NATs and Firewalls**.

### The Signaling & Traversal Process
1. **Signaling Server**: Alice and Bob still need a central WebSocket server just to find each other (to exchange IP addresses and encryption keys). Once they shake hands, the central server steps away.
2. **STUN Servers**: Because Alice's laptop is hidden behind her home Wi-Fi router (NAT), she doesn't know her own public IP. She pings a public STUN server, which replies: *"Your public IP is 198.51.100.4"*. She sends this IP to Bob.
3. **TURN Servers**: In corporate environments, strict firewalls physically block P2P UDP traffic. If the direct connection fails, WebRTC silently falls back to a TURN server—a massive, expensive cloud relay that forcefully proxies the video traffic through standard HTTPS ports.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Web Components/index.mdx': `---
title: Web Components & Shadow DOM
description: A suite of native browser APIs allowing developers to create custom, encapsulated HTML tags without relying on frameworks like React or Vue.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Components & Shadow DOM">

React, Vue, and Angular became wildly popular because they introduced the concept of **Component-Based Architecture**. 
However, the W3C recognized that component architecture shouldn't require downloading a 100KB JavaScript framework. It should be built natively into the browser. 

This resulted in **Web Components**.

## The Three Core APIs

1. **Custom Elements**: Allows you to define your own HTML tags via JavaScript. You can tell the browser that whenever it sees TICK1<my-cool-button>TICK1, it should execute a specific JS class.
2. **HTML Templates**: The TICK1<template>TICK1 tag allows you to write HTML that the browser parses, but refuses to render until explicitly instructed by JavaScript.
3. **The Shadow DOM**: The absolute most important piece of the puzzle.

## The Shadow DOM (Style Encapsulation)

In traditional web development, CSS is global. If you write TICK1p { color: red }TICK1, every single paragraph on the entire page turns red. This makes building reusable widgets (like a Video Player) terrifying, because the host website's CSS might bleed in and destroy the widget's layout.

The **Shadow DOM** solves this by creating a hidden, completely isolated DOM tree attached to an element.
- CSS written inside the Shadow DOM cannot leak out.
- CSS written on the main page cannot leak into the Shadow DOM.
- JavaScript TICK1document.querySelectorAllTICK1 from the main page cannot pierce the Shadow boundary.

This is exactly how the native TICK1<video>TICK1 tag works—the play buttons and volume sliders are actually hidden inside a Shadow DOM!

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Hardware APIs/index.mdx': `---
title: Hardware APIs (Bluetooth, USB, NFC)
description: Experimental, highly restricted browser APIs that allow web applications to communicate directly with physical hardware devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hardware APIs (Bluetooth, USB, NFC)">

Historically, if a medical company wanted to build software that communicated with a specialized heart-rate monitor via Bluetooth, they were forced to write a native desktop application in C# or Swift.

Modern Chromium-based browsers (Chrome, Edge) have introduced powerful APIs to bring hardware control to the Web. 
*(Note: Apple's Safari vehemently opposes these APIs due to security/fingerprinting concerns, so they are not universally supported).*

## The APIs

- **Web Bluetooth**: Allows a web page to scan for nearby Bluetooth Low Energy (BLE) devices, pair with them, and read/write GATT characteristics. (e.g., A web app reading data from a smartwatch).
- **WebUSB**: Allows direct communication with USB devices plugged into the computer. (e.g., Flashing firmware onto an Arduino microcontroller directly from a browser tab).
- **WebNFC**: Allows Android browsers to read and write to NFC tags simply by tapping the phone against them.

## The Security Model
Giving a webpage access to your physical USB ports is an extreme security risk. 
To mitigate this, the browser strictly enforces:
1. The site **must** be served over HTTPS.
2. The site **cannot** scan for devices silently in the background. It must be triggered by a direct user gesture (like clicking a "Connect Device" button).
3. The browser will spawn an OS-level prompt forcing the human user to explicitly select the specific hardware device they want to grant the website access to.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/OS APIs/index.mdx': `---
title: OS Integration APIs
description: Powerful APIs that allow web applications to interact with the underlying Operating System, providing native-like utility and context.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OS Integration APIs">

To make Progressive Web Apps (PWAs) indistinguishable from native apps, the browser acts as a bridge, exposing controlled subsets of the underlying OS to JavaScript.

## Geolocation API
Allows the web app to request the user's physical latitude and longitude. 
- On a desktop computer, this is usually triangulated via Wi-Fi networks and IP addresses (low accuracy).
- On a mobile device, the browser asks the OS to activate the physical GPS chip for high-accuracy tracking (essential for mapping apps).
- *Requires explicit user permission via an OS prompt.*

## Web Notifications API
Allows the web app to trigger system-level notifications.
- Instead of showing a fake HTML popup inside the webpage, it triggers the native Windows 11/macOS/Android notification center. 
- When combined with a **Service Worker**, the backend server can wake up the app and trigger a Push Notification even if the browser tab is completely closed.

## Additional Integrations
- **Web Share API**: Triggers the native OS share sheet (e.g., AirDrop on iOS, Nearby Share on Android) instead of building custom sharing modals.
- **Contact Picker API**: Allows the user to select contacts from their phone's native address book and pass them to the web app.
- **Wake Lock API**: Prevents the screen from dimming or locking while the web app is running (critical for recipe apps or e-readers).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Web Audio API/index.mdx': `---
title: Web Audio API
description: A high-level JavaScript API for processing, synthesizing, and routing audio in web applications with extremely low latency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Web Audio API">

If you just want to play an MP3 file, the standard HTML TICK1<audio>TICK1 tag is perfectly sufficient. 
But if you want to build a fully-functional DJ mixing board, a piano synthesizer, or a 3D spatial audio engine for a video game, you must use the **Web Audio API**.

## The Audio Routing Graph

The Web Audio API is built around the concept of an **Audio Context** and a routing graph. 
You create nodes, configure them, and wire them together (just like plugging physical guitar pedals into an amplifier).

1. **Source Nodes**: The origin of the sound. This can be an MP3 file, a live microphone feed via WebRTC, or a mathematical oscillator generating a Sine wave.
2. **Processing Nodes**: You route the source through effect nodes.
   - TICK1BiquadFilterNodeTICK1 (for Equalization / Bass boost)
   - TICK1ConvolverNodeTICK1 (for Reverb / Echo)
   - TICK1GainNodeTICK1 (for Volume control)
3. **Destination Node**: You finally route the signal to the TICK1audioContext.destinationTICK1, which connects to the user's physical speakers.

## AudioWorklets
Historically, audio processing was done on the main JavaScript thread. If the webpage was busy calculating React state, the audio would stutter and crackle. 
Modern Web Audio uses **AudioWorklets**—allowing you to run complex custom audio DSP (Digital Signal Processing) code in a dedicated, isolated background thread, guaranteeing zero-latency, glitch-free audio synthesis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebXR/index.mdx': `---
title: WebXR (VR & AR)
description: The modern web standard designed to render 3D scenes to Virtual Reality headsets and Augmented Reality mobile devices directly from the browser.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebXR (VR & AR)">

**WebXR** (Web Extended Reality) is the unified API that replaces the deprecated WebVR. It bridges the gap between the web browser and specialized stereoscopic hardware like the Meta Quest, Apple Vision Pro, and AR-capable smartphones.

## How it Works

WebXR does not draw graphics itself. It acts as the mathematical bridge between **WebGL** and the physical headset.

1. **Session Request**: The webpage asks the browser to initiate an "immersive-vr" or "immersive-ar" session. (This usually triggers a prompt asking the user to put on their headset).
2. **Tracking & Poses**: The WebXR API constantly polls the physical hardware to get the exact XYZ coordinates and rotation of the user's head and hands (controllers) at 90 frames per second.
3. **Stereo Rendering**: The webpage feeds these coordinates into a WebGL framework (like Three.js). The framework must calculate and render the 3D scene *twice*—once from the perspective of the left eye, and once for the right eye.
4. **Frame Presentation**: The dual-rendered frame is sent back through WebXR to the physical headset displays.

## Augmented Reality (AR)
In an TICK1immersive-arTICK1 session, WebXR also provides:
- **Hit Testing**: Mathematically calculating where the user's camera is pointing relative to the physical floor, allowing you to "place" a virtual IKEA sofa onto a real-world rug.
- **Environment Blending**: Using the device's passthrough cameras to composite the WebGL graphics seamlessly over the real world.

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
