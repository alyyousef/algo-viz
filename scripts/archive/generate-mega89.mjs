import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '49. Graphics, Game Development & Simulation/Computer graphics fundamentals/index.mdx': `---
title: Computer Graphics Fundamentals
description: The core mathematical principles and physics used to generate digital imagery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computer Graphics Fundamentals">

A computer monitor is just a massive 2D grid of millions of tiny LED lights (pixels). **Computer Graphics** is the brutal mathematical process of calculating exactly what color each of those millions of pixels should be, 60 times every single second, to simulate a 3D universe.

<Callout icon="info" title="The Primitive: The Triangle">
  In 3D graphics, there are no spheres. There are no curved surfaces. 
  
  Every 3D model (whether it is a low-poly tree or an incredibly realistic human face) is mathematically constructed entirely out of flat **Triangles** (Polygons). A triangle is the absolute perfect mathematical shape because it is physically impossible for a triangle to bend; its three vertices are guaranteed to be perfectly planar.
</Callout>

## The Mathematics of the Camera

To render a 3D world onto a 2D screen, the GPU uses heavy linear algebra (Matrix Multiplication).
1. **Model Matrix:** Moves the 3D model into the world (e.g., placing the car on the road).
2. **View Matrix:** Moves the entire world relative to the Camera (if the camera moves forward, the math actually pulls the entire world backward).
3. **Projection Matrix:** Mathematically squashes the 3D coordinates into a 2D plane, applying perspective (objects further away become mathematically smaller).

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Computational geometry for graphics/index.mdx': `---
title: Computational Geometry for Graphics
description: The study of algorithms which can be stated in terms of geometry, forming the mathematical backbone of rendering physics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computational Geometry for Graphics">

If you fire a digital gun in a video game, how does the game mathematically know if the bullet hit the enemy, hit the wall, or missed entirely?

This is solved using **Computational Geometry** (specifically, Ray Casting and Intersection mathematics).

<Callout icon="warning" title="The Bounding Box Optimization">
  Checking if a straight line (a ray) intersects a highly detailed 3D enemy model composed of 50,000 triangles requires 50,000 complex mathematical intersection tests. Doing this for every bullet fired will instantly crash the CPU.
  
  Instead, the game mathematically wraps the complex enemy inside an invisible, simple shape: an **AABB (Axis-Aligned Bounding Box)** or a **Bounding Sphere**. The engine checks if the bullet intersects the simple box (1 calculation). If it misses, it skips the enemy entirely.
</Callout>

## Vectors and Dot Products

The absolute backbone of all lighting and geometry in graphics is the **Dot Product** and the **Cross Product**.

If you have a triangle representing the ground, its **Normal Vector** points straight up. If the sun's light ray is hitting the ground, the game mathematically calculates the Dot Product between the Light Vector and the Normal Vector. The result is a single number (Cosine) between 1 and 0, which perfectly calculates exactly how much light the pixel should receive.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Rasterisation/index.mdx': `---
title: Rasterisation
description: The task of taking an image described in a vector graphics format (shapes) and converting it into a raster image (a series of pixels).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rasterisation">

For the past 30 years, 99.9% of all video games have been rendered using a mathematical technique called **Rasterisation**.

Rasterisation is incredibly fast, but mathematically "fake." It does not simulate the physics of light. Instead, it is a pure geometric projection trick.

<Callout icon="success" title="How Rasterisation Works">
  1. The GPU projects the 3D triangles onto the 2D screen.
  2. For a specific triangle, the GPU mathematically checks exactly which 2D screen pixels are physically "inside" the borders of that triangle.
  3. The GPU "rasters" (fills in) those specific pixels with a color, using mathematical interpolation (Barycentric coordinates) to blend the colors across the surface.
</Callout>

## The Depth Buffer (Z-Buffer)

If there are two triangles (a tree and a house behind the tree), which one gets painted on the screen?

Because Rasterisation just rapidly paints triangles in whatever order they appear in memory, the house might accidentally overwrite the tree. To solve this, the GPU maintains a **Z-Buffer**. For every pixel, it mathematically records the "Depth" (Distance from the camera). If the GPU tries to paint a house pixel, but the Z-Buffer says a tree pixel is already there and is closer, the GPU discards the house pixel.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Ray tracing/index.mdx': `---
title: Ray Tracing
description: A rendering technique for generating an image by tracing the path of light as pixels in an image plane and simulating the effects of its encounters with virtual objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ray Tracing">

While Rasterisation is a fast, fake geometric trick, **Ray Tracing** is the literal mathematical simulation of physics.

In the real universe, a lightbulb shoots trillions of photons, they bounce off walls, and a tiny fraction of them eventually hit your eye. 

<Callout icon="tip" title="Shooting Backwards">
  Simulating trillions of photons from the lightbulb is mathematically impossible because 99% of them will never hit the camera lens; calculating them is a waste of GPU power.
  
  Therefore, Ray Tracing is mathematically executed **backwards**. 
  The GPU shoots a mathematical ray *out* of the camera lens, through the specific pixel on the screen, and into the 3D world. It mathematically checks what triangle the ray hits first. It then shoots a secondary ray from that triangle directly to the sun to see if it is in shadow.
</Callout>

## The Mathematical Cost

Because a 4K monitor has 8.2 million pixels, Ray Tracing requires the GPU to mathematically calculate 8.2 million geometric vector intersections every single frame. This was historically so slow that it was only used in pre-rendered Pixar movies (taking 10 hours per frame). 

In 2018, NVIDIA released the **RTX** series GPUs, which contained dedicated, hardcoded silicon (RT Cores) specifically designed to solve the Ray-Triangle intersection math in hardware, making real-time Ray Tracing possible.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Path tracing/index.mdx': `---
title: Path Tracing
description: A computer graphics Monte Carlo method of rendering images of three-dimensional scenes such that the global illumination is faithful to reality.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Path Tracing">

If Ray Tracing is the simulation of a single light bounce, **Path Tracing** is the brutal mathematical simulation of *infinite* light bounces. It is the holy grail of photorealism.

<Callout icon="warning" title="Global Illumination">
  In the real world, if you shine a red flashlight at a white wall inside a dark room, the white wall turns red. But the light *bounces* off that wall and faintly illuminates the floor with a soft red glow. 
  
  Standard Rasterisation cannot do this. Path Tracing achieves this **Global Illumination** by shooting a ray out of the camera, hitting the floor, and then randomly scattering 100 secondary rays in a hemisphere to mathematically "gather" the ambient light bouncing off the red wall.
</Callout>

## Monte Carlo Integration

Because a ray could theoretically bounce forever, Path Tracing uses probability math (Monte Carlo Integration). The GPU randomly terminates the rays (Russian Roulette) to prevent infinite loops. 

Because the rays scatter randomly, the resulting image is mathematically highly inaccurate if you only shoot 1 ray per pixel (it looks like massive TV static/noise). To fix this, you must shoot thousands of rays per pixel and mathematically average them out, or use AI Denoising algorithms to blur the static into a clean image.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/OpenGL/index.mdx': `---
title: OpenGL
description: A cross-language, cross-platform application programming interface for rendering 2D and 3D vector graphics.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="OpenGL"
  subtitle="The legacy standard of 3D graphics"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/OpenGL_logo.svg/512px-OpenGL_logo.svg.png"
  description="Open Graphics Library (OpenGL) is an open, cross-platform API used to interact with a GPU to achieve hardware-accelerated rendering. It dominated the industry for 20 years."
  yearCreated={1992}
  creator="Silicon Graphics (Now Khronos Group)"
  isOpenSource={true}
  websiteUrl="https://www.opengl.org/"
>

Before OpenGL, every graphics card had its own proprietary programming language. If you wrote a game for an NVIDIA card, it physically would not boot on an ATI card. 

**OpenGL** created a mathematical abstraction layer. You write C++ OpenGL code, and the specific GPU Driver (written by NVIDIA or AMD) mathematically translates your OpenGL calls into the proprietary silicon instructions.

<Callout icon="error" title="The State Machine Problem">
  OpenGL is mathematically designed as a massive, global **State Machine**. 
  
  To draw a red triangle, you cannot just call \`Draw(triangle, red)\`. You must mathematically bind the Triangle data to the global state, then bind the Red Shader to the global state, then call \`glDrawArrays()\`. Because it is a global state machine, it is incredibly difficult to multi-thread. You generally cannot have 4 CPU cores sending OpenGL commands simultaneously, making it a severe bottleneck for modern, massive video games.
</Callout>

While still widely used for education and older software, OpenGL is officially deprecated by Apple and has been largely superseded by Vulkan.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Vulkan/index.mdx': `---
title: Vulkan
description: A low-overhead, cross-platform 3D graphics and computing API intended for high-performance real-time 3D graphics applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Vulkan"
  subtitle="The brutal, low-level successor to OpenGL"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vulkan_Logo.svg/512px-Vulkan_Logo.svg.png"
  description="Vulkan is a modern, explicit, low-overhead cross-platform API. It mathematically strips away the massive driver abstractions of OpenGL, giving the programmer absolute, terrifying control over the raw GPU memory."
  yearCreated={2016}
  creator="Khronos Group"
  isOpenSource={true}
  websiteUrl="https://www.vulkan.org/"
>

Because OpenGL was a global state machine with a massive driver hiding all the physics, the CPU wasted an immense amount of time just managing the OpenGL driver.

**Vulkan** destroyed the abstraction. 

<Callout icon="warning" title="The Explicit API">
  In OpenGL, drawing a triangle takes 50 lines of C++ code. The Driver handles memory allocation automatically.
  
  In Vulkan, drawing a triangle takes **1,000 lines of C++ code**. You must mathematically allocate the specific megabytes of VRAM yourself. You must manually orchestrate the synchronization barriers between the GPU and CPU. 
</Callout>

## Multi-Threading Mastery

Because there is no global state machine, Vulkan is perfectly designed for multi-core CPUs. Core 1 can build mathematical command buffers for the UI, while Core 2 builds command buffers for the lighting, and they can all be mathematically submitted to the GPU simultaneously. This results in massive frame-rate improvements in modern AAA games like *DOOM Eternal*.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/DirectX/index.mdx': `---
title: DirectX (Direct3D)
description: A collection of application programming interfaces for handling tasks related to multimedia, especially game programming and video, on Microsoft platforms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="DirectX (Direct3D)"
  subtitle="The absolute ruler of PC and Xbox gaming"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Directx_logo.svg/512px-Directx_logo.svg.png"
  description="DirectX is a proprietary suite of multimedia APIs created by Microsoft. Its 3D graphics component, Direct3D, is the industry standard for virtually all AAA PC games."
  yearCreated={1995}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://docs.microsoft.com/en-us/windows/win32/directx"
>

In the 1990s, if you built a PC game, it ran in MS-DOS. When Microsoft launched Windows 95, game developers refused to use it because the Windows OS physically blocked direct access to the graphics card, making games incredibly slow.

Microsoft created **DirectX** to give game developers a mathematical backdoor through the OS to access the raw GPU hardware.

<Callout icon="info" title="DirectX 11 vs DirectX 12">
  Just like the transition from OpenGL to Vulkan:
  - **DirectX 11:** A high-level, single-threaded, state-machine API. (Easy to write, high overhead).
  - **DirectX 12:** A brutal, low-level, multi-threaded explicit API. (Incredibly hard to write, massive performance). DX12 was mathematically required to unlock the multi-core potential of modern CPUs for PC and Xbox Series X games.
</Callout>

Because it is proprietary to Microsoft, DirectX mathematically cannot run natively on macOS, Linux, or PlayStation.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Metal/index.mdx': `---
title: Metal
description: A low-overhead, hardware-accelerated 3D graphic and compute shader application programming interface created by Apple.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Metal"
  subtitle="Apple's proprietary graphics lock-in"
  logoUrl="https://developer.apple.com/assets/elements/icons/metal/metal-64x64_2x.png"
  description="Metal is a low-overhead, explicit graphics API created exclusively for iOS, iPadOS, and macOS. It was designed to replace OpenGL on Apple devices."
  yearCreated={2014}
  creator="Apple Inc."
  isOpenSource={false}
  websiteUrl="https://developer.apple.com/metal/"
>

In 2014, Apple recognized that OpenGL was a mathematical bottleneck for mobile games on the iPhone. Instead of waiting for the Khronos Group to finish Vulkan, Apple built their own explicit, low-level API called **Metal**.

<Callout icon="error" title="The Fragmentation of Graphics">
  In 2018, Apple officially deprecated OpenGL and completely banned Vulkan from running natively on macOS and iOS. 
  
  This mathematically fractured the entire gaming industry. If a game studio writes a game engine today, they must write the rendering pipeline three separate times: **DirectX** for Windows/Xbox, **Vulkan** for Android/Linux, and **Metal** for Apple.
</Callout>

## Unified Memory Architecture (UMA)

Metal's greatest mathematical advantage is its integration with Apple Silicon (M1/M2/M3 chips). 
Unlike a PC (where the CPU and GPU have physically separate RAM chips, requiring slow PCIe data transfers), Apple's UMA mathematically shares the exact same physical RAM between the CPU and GPU. Metal allows the GPU to instantly read 3D geometry generated by the CPU without copying a single byte of memory.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/WebGPU/index.mdx': `---
title: WebGPU
description: A future web standard and JavaScript API for accelerated graphics and compute, aiming to provide modern 3D graphics and computation capabilities.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="WebGPU"
  subtitle="The future of graphics in the browser"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/WebGPU_logo.svg/512px-WebGPU_logo.svg.png"
  description="WebGPU is the modern successor to WebGL. It exposes the massive, low-level mathematical power of Vulkan, Metal, and DirectX 12 directly to JavaScript and WebAssembly in the browser."
  yearCreated={2023}
  creator="W3C (Apple, Google, Mozilla, Microsoft)"
  isOpenSource={true}
  websiteUrl="https://www.w3.org/TR/webgpu/"
>

Historically, if you wanted 3D graphics in a web browser, you used **WebGL**. However, WebGL is mathematically based on OpenGL ES from 2007. It is single-threaded, highly abstracted, and completely incapable of utilizing modern GPU compute power.

**WebGPU** is the massive, industry-wide standard created to fix this.

<Callout icon="success" title="The Universal Wrapper">
  Because Apple only allows Metal, and Windows relies on DirectX, WebGPU acts as a mathematical translation layer. 
  
  You write your WebGPU code in the browser once. If the user is on a Mac, Chrome translates the WebGPU math into Metal. If they are on Windows, Chrome translates it into DirectX 12. If they are on Android, it translates into Vulkan.
</Callout>

## Compute Shaders

The most important feature of WebGPU is the introduction of **Compute Shaders** to the web. 
Compute shaders allow JavaScript developers to hijack the GPU to run massive, highly parallel mathematics (like Artificial Intelligence matrices, physics simulations, or crypto hashing) that have absolutely nothing to do with rendering 3D graphics.

</TechnologyTemplate>
`,
}

async function generateMega89() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega89().catch(console.error)
