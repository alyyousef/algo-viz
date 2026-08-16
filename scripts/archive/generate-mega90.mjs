import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '49. Graphics, Game Development & Simulation/WebGL/index.mdx': `---
title: WebGL
description: A JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="WebGL"
  subtitle="Bringing hardware-accelerated 3D to the Browser"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/WebGL_Logo.svg/512px-WebGL_Logo.svg.png"
  description="WebGL is a direct JavaScript binding to OpenGL ES (Embedded Systems). It mathematically allows a web browser to bypass the CPU's DOM rendering and talk directly to the user's physical GPU."
  yearCreated={2011}
  creator="Khronos Group & Mozilla"
  isOpenSource={true}
  websiteUrl="https://www.khronos.org/webgl/"
>

Before 2011, if you wanted 3D graphics in a web browser, the user had to install a massive, highly insecure C++ plugin like **Adobe Flash** or the **Unity Web Player**.

**WebGL** mathematically integrated the GPU directly into the HTML5 \`<canvas>\` element.

<Callout icon="warning" title="The Brutal Low-Level API">
  WebGL is mathematically incredibly verbose. 
  
  Because it is a direct binding to OpenGL ES, drawing a simple rotating cube requires manually compiling GLSL Shaders from raw text strings, allocating Float32Arrays for vertex buffers, and executing massive matrix algebra equations in pure JavaScript. It takes about 200 lines of raw WebGL code just to draw a triangle.
</Callout>

## The Shift to WebGPU

While WebGL successfully brought 3D to the web, it is fundamentally tied to the architecture of OpenGL ES 2.0 (from 2007). It is single-threaded and struggles to handle massive AAA geometries. The entire industry is currently in a massive mathematical transition away from WebGL and toward its modern, explicit successor: **WebGPU**.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Three.js/index.mdx': `---
title: Three.js
description: A cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Three.js"
  subtitle="The absolute king of Web 3D"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/512px-Three.js_Icon.svg.png"
  description="Because raw WebGL is mathematically brutal and terrifying to write, Three.js was created as a high-level wrapper. It handles all the matrix math, shaders, and GPU memory allocation automatically."
  yearCreated={2010}
  creator="Ricardo Cabello (Mr.doob)"
  isOpenSource={true}
  websiteUrl="https://threejs.org/"
>

If you want to render a 3D car on a website, writing 2,000 lines of raw WebGL matrix algebra is a massive waste of time. 

**Three.js** provides a high-level Object-Oriented paradigm. You simply create a \`Scene\`, add a \`PerspectiveCamera\`, add a \`Mesh\` (geometry + material), and call \`renderer.render()\`. The library automatically calculates the projection matrices and dynamically compiles the exact GLSL shaders required for the GPU.

<Callout icon="success" title="React Three Fiber (R3F)">
  In the modern web ecosystem, **React Three Fiber (R3F)** is the absolute standard. 
  
  R3F mathematically maps Three.js objects directly into React Components. Instead of writing imperative \`scene.add(cube)\`, you write declarative JSX: \`<mesh><boxGeometry /><meshStandardMaterial color="hotpink" /></mesh>\`. This seamlessly integrates 3D rendering with React's state management.
</Callout>

## The Physics Problem

Three.js is purely a **Renderer**. It has no physics engine. If you drop a ball, it will not fall. If it hits a wall, it will pass right through it. To build a game in Three.js, you must mathematically bind it to a separate JavaScript physics engine (like Rapier or Cannon.js).

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Shaders (Vertex, Fragment, Compute)/index.mdx': `---
title: Shaders (Vertex, Fragment, Compute)
description: A type of computer program that was originally used for shading but now performs a variety of specialized functions in various fields of computer graphics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Shaders (Vertex, Fragment, Compute)">

A **Shader** is a tiny, highly specialized C-like program (written in GLSL or HLSL) that does not run on the CPU. It is mathematically compiled and executed directly on the GPU.

Because a GPU has 5,000 microscopic cores, the GPU can run 5,000 instances of a Shader simultaneously, in perfect mathematical parallel.

<Callout icon="info" title="The Two Rendering Shaders">
  The standard rendering pipeline requires two specific shaders:
  1. **Vertex Shader:** Runs exactly once for every 3D point (vertex) in the model. Its only job is mathematical translation: calculating exactly where this 3D point lands on the 2D screen using Matrix Multiplication.
  2. **Fragment (Pixel) Shader:** Runs exactly once for every single pixel on the screen. Its job is to mathematically calculate the final color of that pixel (applying textures, calculating lighting dot-products, and casting shadows).
</Callout>

## Compute Shaders

Historically, GPUs could only render graphics. **Compute Shaders** mathematically broke this restriction. 

A Compute Shader has absolutely nothing to do with rendering a screen. It is a program that hijacks the GPU's 5,000 cores to run arbitrary mathematics. If you need to simulate 1 million particles of water flowing down a river, the CPU will crash. A Compute Shader calculates the physics for all 1 million particles simultaneously in 2 milliseconds.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Rendering pipelines/index.mdx': `---
title: Rendering Pipelines
description: The sequence of steps that a graphics API takes to transform 3D data into a 2D image on a screen.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rendering Pipelines">

You cannot just throw a 3D model at a GPU. The GPU requires the data to flow through a very strict, highly optimized mathematical assembly line called the **Rendering Pipeline**.

<Callout icon="warning" title="Forward vs Deferred Rendering">
  If you have a city with 1,000 streetlights, calculating the physics for 1,000 lights on every single pixel will instantly crash the GPU.
  
  - **Forward Rendering:** The legacy pipeline. It loops through every object, and for every object, loops through every light. Highly inefficient if there are more than 4 lights in the scene.
  - **Deferred Rendering:** The modern AAA pipeline. It renders all the 3D geometry *first* into massive, invisible textures (G-Buffers) without any light. Then, as a final 2D post-processing step, it calculates the lighting for the entire screen at once. This mathematically decouples the geometry from the lighting, allowing a game to render 10,000 lights simultaneously at 60 FPS.
</Callout>

## The Draw Call Bottleneck

The biggest enemy of a rendering pipeline is the **Draw Call**. 
A Draw Call is when the CPU commands the GPU to render an object. Because the CPU and GPU are physically separate chips, sending a command takes time. 

If you have a forest with 10,000 trees, sending 10,000 individual Draw Calls will completely bottleneck the CPU, causing the game to lag. Modern engines use **Instancing**—sending 1 single Draw Call that says, *"Here is the math for 1 tree, and here is an array of 10,000 XYZ coordinates. Draw them all yourself."*

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Game loops/index.mdx': `---
title: The Game Loop
description: The central, infinite while-loop that drives the execution, physics, and rendering of a video game.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Game Loop">

A standard web app is **Event-Driven**. It sits perfectly still, using 0% of the CPU, waiting for the user to click a button.

A Video Game is completely different. Even if the player drops the controller, the game must continue to mathematically calculate gravity, move the clouds, and render the screen 60 times a second. This is achieved via the infinite **Game Loop**.

<Callout icon="info" title="The Holy Trinity">
  Every Game Loop executes three distinct mathematical phases per frame:
  1. \`processInput()\`: Read the Xbox controller or Keyboard.
  2. \`update(deltaTime)\`: Move the player, calculate physics, check for bullet collisions.
  3. \`render()\`: Send the newly updated 3D coordinates to the GPU.
</Callout>

## Delta Time ($\Delta t$)

If a computer is extremely fast, the loop might run 120 times a second. If the computer is slow, the loop might run 30 times a second. 

If your code says \`player.x += 5\`, the fast computer moves the player twice as fast as the slow computer. This is a massive mathematical bug.

To fix this, you must multiply everything by **Delta Time** (the exact number of milliseconds since the last frame). 
\`player.x += speed * deltaTime\`. This mathematically guarantees that the player moves at the exact same physical speed across the screen, regardless of whether the game is running at 30 FPS or 144 FPS.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Entity-Component-System (ECS)/index.mdx': `---
title: Entity-Component-System (ECS)
description: An architectural pattern that is mostly used in game development, which follows the composition over inheritance principle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Entity-Component-System (ECS)">

In the 2000s, games used traditional Object-Oriented Programming (OOP). You had a \`class Player extends Character extends GameObject\`.

As games grew massive, OOP collapsed. If a \`Tree\` is a \`StaticObject\`, but you want the tree to magically walk, you mathematically cannot because it doesn't inherit from \`MovableObject\`. OOP created massive, rigid, terrifying inheritance hierarchies. 

The industry solved this by mathematically abandoning OOP and adopting **ECS (Entity-Component-System)**.

<Callout icon="success" title="The ECS Paradigm">
  - **Entity:** Just an empty ID number (\`Entity 45\`). It contains absolutely zero code.
  - **Component:** Pure, raw data with no logic. (\`PositionComponent {x, y}\`, \`HealthComponent {hp}\`).
  - **System:** The actual logic. A System mathematically queries the database: *"Give me every Entity that has both a Position and a Velocity."* It then loops through them and applies the physics.
</Callout>

## Cache-Locality (Data-Oriented Design)

The true mathematical power of ECS is **Memory Architecture**. 
In OOP, objects are randomly scattered across the RAM heap. When the CPU tries to calculate physics, it suffers massive Cache Misses. 

ECS mathematically packs all \`PositionComponents\` into a single, perfectly contiguous C++ array. The CPU can load 10,000 positions directly into its L1 Cache instantly and calculate the physics using SIMD (Single Instruction, Multiple Data) vectorized math, resulting in a 100x performance increase over traditional OOP.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Physics engines/index.mdx': `---
title: Physics Engines (Havok, PhysX)
description: Computer software that provides an approximate simulation of certain physical systems, such as rigid body dynamics, soft body dynamics, and fluid dynamics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Physics Engines">

If you stack 10 digital boxes on top of each other, calculating the exact mathematical friction, gravity, and resting force required to ensure they don't visually sink into each other or violently explode is incredibly difficult. 

Game developers do not write this math themselves. They use a **Physics Engine**.

<Callout icon="warning" title="Continuous vs Discrete Collision">
  - **Discrete Collision:** The engine checks for collisions once per frame. If a bullet is traveling 2,000 mph, in Frame 1 it is in front of the wall, and in Frame 2 it is behind the wall. The engine never mathematically detects the collision, and the bullet ghosts through the wall.
  - **Continuous Collision Detection (CCD):** The engine mathematically sweeps the bullet's entire trajectory over the frame, calculating the exact microsecond it intersected the wall geometry. Brutally expensive on the CPU, but required for fast-moving objects.
</Callout>

## Rigid Body Dynamics

The vast majority of game physics is **Rigid Body**. The engine mathematically assumes the object is made of unbreakable titanium. It calculates mass, center of gravity, and torque, but the object cannot bend or dent. 

Simulating **Soft Body Dynamics** (jello, cloth, or a car physically denting) requires massive finite-element mathematics and is usually only utilized in highly specialized simulation games (like *BeamNG.drive*).

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Game AI (Pathfinding, Behavior Trees, FSM)/index.mdx': `---
title: Game AI (Pathfinding, Behavior Trees, FSM)
description: Techniques used in computer and video games to produce the illusion of intelligence in the behavior of non-player characters (NPCs).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Game AI (Behavior Trees & NavMeshes)">

"Game AI" has absolutely nothing to do with Machine Learning or Large Language Models. True Machine Learning is mathematically unpredictable; if you use an LLM to control an enemy boss, it might randomly decide to walk off a cliff. 

Game AI is highly structured, predictable mathematical decision-making designed purely to be fun for the player.

<Callout icon="info" title="Decision Architectures">
  - **Finite State Machines (FSM):** The legacy approach. The enemy has 3 states: \`Patrol\`, \`Chase\`, \`Attack\`. It mathematically transitions between them based on distance. FSMs become an unmanageable spaghetti nightmare if you have 50 states.
  - **Behavior Trees:** The modern AAA standard (invented for *Halo 2*). It is a hierarchical tree of nodes (Selectors and Sequences). It mathematically evaluates the tree from top to bottom every frame. If the enemy is being shot at, the "Take Cover" branch evaluates to True, overriding the "Patrol" branch.
</Callout>

## The NavMesh and A*

To mathematically walk around a room, the enemy does not use raw level geometry. The engine pre-calculates a **NavMesh (Navigation Mesh)**—an invisible layer of simplified polygons painted over the floor. 

The enemy uses the **A* (A-Star)** pathfinding algorithm to mathematically calculate the shortest path across the NavMesh polygons, completely avoiding walls and obstacles.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Multiplayer netcode/index.mdx': `---
title: Multiplayer Netcode
description: The synchronization of state between multiple clients and a server in a multiplayer game over a network with inherent latency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multiplayer Netcode">

If you build a local Single Player game, when the player presses 'Jump', the character jumps. 

If you build a Multiplayer game, when the player presses 'Jump', the client mathematically sends a UDP packet to a server in Virginia. 50 milliseconds later, the server verifies the jump. 50 milliseconds after that, the server tells the client to jump. 

A 100-millisecond delay on a button press makes the game physically unplayable. Solving this paradox is the realm of **Netcode**.

<Callout icon="error" title="Client-Side Prediction">
  To fix the delay, the client mathematically **cheats**. 
  
  When the player presses 'Jump', the local game immediately executes the jump animation on the screen, assuming the server will approve it. Simultaneously, it sends the request to the server. If the server eventually replies, *"No, you were actually stunned 10 milliseconds ago,"* the client mathematically snaps the player back to the ground (Rubberbanding).
</Callout>

## Rollback Netcode vs Lockstep

- **Deterministic Lockstep:** Used in RTS games (StarCraft). Every client waits until every other client sends their inputs for Frame 1 before executing Frame 1. If one player has bad internet, the entire game pauses for everyone.
- **Rollback Netcode (GGPO):** Used in Fighting Games. The game constantly predicts what the opponent will do. If the opponent does something unexpected, the game mathematically rewinds the simulation 5 frames, applies the real input, and fast-forwards back to the present instantly. It is incredibly difficult to program but results in zero perceived latency.

</ConceptTemplate>
`,
}

async function generateMega90() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega90().catch(console.error)
